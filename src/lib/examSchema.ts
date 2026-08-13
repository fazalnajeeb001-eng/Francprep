import { getHdIllustration } from "./hdIllustrationAssets";

export type ExamType = "TCF_CANADA" | "TEF_CANADA";
export type ExamMode = "PRACTICE" | "EXAM";
export type SectionType = "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  text: string;
  questionPrompt?: string;
  options: string[];
  optionImages?: string[];
  mainImage?: string;
  hasSpokenOptions?: boolean;
  correctIndex: number;
  explanation: string;
  hint?: string;
  transcript?: string;
  transcriptEnglish?: string;
  passage?: string;
  passageEnglish?: string;
  questionInAudio?: boolean;
  perQuestionTimerSeconds?: number;
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
  code: string; // e.g. "TCF-PRAC-01" or "TCF-EXAM-01"
  description: string;
  totalDurationMins: number;
  isSamplePaper: boolean;
  published: boolean;
  recommendedMode?: ExamMode;
  sections: ExamSection[];
}

// ─── HELPER TO GENERATE AUTHENTIC FULL-LENGTH QUESTION ARRAYS (39/40 ITEMS) ───
export interface ListeningTopicItem {
  level: string;
  title: string;
  text: string;
  opt: string[];
  ans: number;
  tr: string;
  en: string;
  hint?: string;
  q?: string;
}

function getRichListeningTopics(): ListeningTopicItem[] {
  const topics: ListeningTopicItem[] = [];
  const cities = ["Montréal", "Québec", "Ottawa", "Vancouver", "Toronto", "Halifax", "Calgary", "Winnipeg", "Moncton", "Edmonton"];
  const bakeries = ["Boulangerie Saint-Laurent", "Pâtisserie Royale", "Boulangerie du Marché", "Les Douceurs du Village", "Au Bon Pain"];
  const bakeryItems = ["croissants aux amandes", "baguettes tradition", "tartes aux pommes", "pains au chocolat", "gâteaux au citron"];
  const discounts = ["30% de réduction", "une réduction de 50%", "un produit offert", "2$ de rabais"];
  const weatherTypes = ["fortes pluies", "grand soleil", "chutes de neige", "vent violent", "orages isolés"];
  const doctors = ["Dr Tremblay", "Dr Roy", "Dr Gagnon", "Dr Bouchard", "Dr Gauthier"];
  const mechanics = ["Auto Expert", "Garage Gagnon", "Mécanique du Boulevard", "Service Auto Laval"];
  const repairs = ["freinage et vidange", "changement des pneus d'hiver", "remplacement de la batterie", "contrôle technique annuel"];

  for (let i = 0; i < 390; i++) {
    const qNum = (i % 39) + 1;
    const city = cities[i % cities.length];

    if (qNum <= 7) {
      if (qNum === 1) {
        const platform = (i % 6) + 1;
        const time = `${7 + (i % 5)}h${15 * (i % 4) === 0 ? "00" : 15 * (i % 4)}`;
        topics.push({
          level: "A1",
          title: `Annonce Gare A1 N°${i + 1} à ${city}`,
          text: `Chers voyageurs, attention s'il vous plaît. Le train N°${1000 + i * 7} à destination de ${city}, départ initialement prévu à ${time}, partira exceptionnellement de la voie ${platform}. Veuillez procéder à l'embarquement immédiat.`,
          opt: [
            `Départ de la voie ${platform} à ${time}`,
            `Annulation complète du train N°${1000 + i * 7}`,
            `Arrivée en retard de 2 heures`,
            `Changement de destination pour Toronto`
          ],
          ans: 0,
          tr: `Chers voyageurs, attention s'il vous plaît. Le train N°${1000 + i * 7} à destination de ${city} partira de la voie ${platform}.`,
          en: `Dear passengers, attention please. Train N°${1000 + i * 7} to ${city} will depart from platform ${platform}.`,
          hint: `⚠️ Trap Alert: Identify departure platform (${platform}) and time (${time}).`
        });
      } else if (qNum === 2) {
        const bakery = bakeries[i % bakeries.length];
        const item = bakeryItems[i % bakeryItems.length];
        const disc = discounts[i % discounts.length];
        topics.push({
          level: "A1",
          title: `Annonce Commerce A1 N°${i + 1}`,
          text: `Bonjour! Aujourd'hui à la ${bakery}, profitez d'une promotion spéciale sur les ${item}: ${disc} sur votre commande jusqu'à 18h.`,
          opt: [
            `Promotion spéciale (${disc}) sur les ${item}`,
            `Fermeture annuelle de la boulangerie`,
            `Livraison gratuite à domicile uniquement`,
            `Changement des horaires du week-end`
          ],
          ans: 0,
          tr: `Bonjour! Aujourd'hui à la ${bakery}, profitez d'une promotion spéciale de ${disc} sur les ${item}.`,
          en: `Hello! Today at ${bakery}, enjoy a special promotion of ${disc} on ${item}.`,
          hint: `⚠️ Trap Alert: Identify the discounted item (${item}) and reduction (${disc}).`
        });
      } else if (qNum === 3) {
        const wType = weatherTypes[i % weatherTypes.length];
        const temp = `${12 + (i % 15)}°C`;
        topics.push({
          level: "A1",
          title: `Météo A1 N°${i + 1} à ${city}`,
          text: `Bulletin météo pour ${city}: prévoyez des ${wType} cet après-midi avec une température moyenne de ${temp}. Couvrez-vous bien et prévoyez vos déplacements.`,
          opt: [
            `Prévision de ${wType} et température de ${temp}`,
            `Canicule extrême et sécheresse prolongée`,
            `Aucun changement de météo annoncé`,
            `Fermeture des routes métropolitaines`
          ],
          ans: 0,
          tr: `Bulletin météo pour ${city}: ${wType} prévues cet après-midi avec une température de ${temp}.`,
          en: `Weather report for ${city}: ${wType} expected this afternoon with a temperature of ${temp}.`,
          hint: `⚠️ Trap Alert: Identify weather condition (${wType}) and temperature (${temp}).`
        });
      } else if (qNum === 4) {
        const hours = `${6 + (i % 2)}h30 - 10h00`;
        topics.push({
          level: "A1",
          title: `Hôtel A1 N°${i + 1} à ${city}`,
          text: `Bienvenue à l'Hôtel Royal de ${city}. Le petit-déjeuner buffet est servi tous les matins en salle à manger de ${hours}. Le code wifi est affiché à la réception.`,
          opt: [
            `Petit-déjeuner buffet servi de ${hours}`,
            `Fermeture du service de restauration`,
            `Changement obligatoire de chambre`,
            `Piscine municipale fermée`
          ],
          ans: 0,
          tr: `Bienvenue à l'Hôtel Royal. Le petit-déjeuner est servi tous les matins de ${hours}.`,
          en: `Welcome to Hôtel Royal. Breakfast is served every morning from ${hours}.`,
          hint: `⚠️ Trap Alert: Identify breakfast service hours (${hours}).`
        });
      } else if (qNum === 5) {
        const time = `${9 + (i % 8)}h00`;
        topics.push({
          level: "A1",
          title: `Message Voicemail A1 N°${i + 1}`,
          text: `Bonjour, ici le secrétariat. Votre rendez-vous médical est confirmé pour demain à ${time}. En cas d'empêchement, veuillez nous joindre avant 17h.`,
          opt: [
            `Confirmation du rendez-vous médical à ${time}`,
            `Annulation définitive de la consultation`,
            `Changement d'adresse du cabinet`,
            `Report du rendez-vous à la semaine prochaine`
          ],
          ans: 0,
          tr: `Votre rendez-vous médical est confirmé pour demain à ${time}.`,
          en: `Your medical appointment is confirmed for tomorrow at ${time}.`,
          hint: `⚠️ Trap Alert: Identify confirmed appointment time (${time}).`
        });
      } else if (qNum === 6) {
        const rayon = (i % 8) + 1;
        topics.push({
          level: "A1",
          title: `Annonce Supermarché A1 N°${i + 1}`,
          text: `Annonce magasin: Retrouvez nos fruits et légumes frais en promotion exceptionnelle aujourd'hui au rayon N°${rayon}. Profitez de nos offres du jour.`,
          opt: [
            `Promotions sur les fruits et légumes au rayon ${rayon}`,
            `Fermeture exceptionnelle des caisses automatiques`,
            `Arrivée de nouveaux produits d'entretien`,
            `Fermeture du supermarché à 16h`
          ],
          ans: 0,
          tr: `Annonce magasin: Promotions sur les fruits et légumes au rayon N°${rayon}.`,
          en: `Store announcement: Special offers on fresh fruits and vegetables in aisle ${rayon}.`,
          hint: `⚠️ Trap Alert: Identify promotion location (rayon ${rayon}).`
        });
      } else {
        const gate = (i % 25) + 1;
        const flight = `AC${300 + (i * 13) % 600}`;
        topics.push({
          level: "A1",
          title: `Annonce Vol A1 N°${i + 1}`,
          text: `Annonce aéroport: Les passagers du vol ${flight} à destination de Paris sont priés de se rendre immédiatement à la porte d'embarquement N°${gate}.`,
          opt: [
            `Embarquement du vol ${flight} à la porte ${gate}`,
            `Annulation du vol pour des raisons météo`,
            `Retard de bagages en soute`,
            `Changement de terminal de départ`
          ],
          ans: 0,
          tr: `Les passagers du vol ${flight} sont priés de se rendre à la porte N°${gate}.`,
          en: `Passengers on flight ${flight} please proceed to gate N°${gate}.`,
          hint: `⚠️ Trap Alert: Identify gate number (${gate}) and flight code (${flight}).`
        });
      }
    } else if (qNum <= 15) {
      const doc = doctors[i % doctors.length];
      const mech = mechanics[i % mechanics.length];
      const rep = repairs[i % repairs.length];
      const cost = `${150 + (i % 10) * 20}$`;

      if (qNum <= 11) {
        topics.push({
          level: "A2",
          title: `Rendez-vous Médical A2 N°${i + 1}`,
          text: `Bonjour, ici le cabinet du ${doc}. Votre bilan médical annuel est disponible. Merci de rappeler le secrétariat pour convenir d'un créneau d'explication.`,
          opt: [
            `Bilan disponible et rappel du secrétariat demandé`,
            `Annulation urgente de la consultation`,
            `Résultats d'analyse envoyés par courrier`,
            `Obligation de refaire les examens sanguins`
          ],
          ans: 0,
          tr: `Bonjour, ici le cabinet du ${doc}. Votre bilan médical est prêt.`,
          en: `Hello, this is ${doc}'s clinic. Your medical results are ready.`,
          hint: `⚠️ Trap Alert: Identify the request to contact the medical secretary.`
        });
      } else {
        topics.push({
          level: "A2",
          title: `Garage Auto A2 N°${i + 1}`,
          text: `Bonjour, ici votre garage ${mech}. Votre véhicule est prêt suite aux travaux de ${rep}. La facture totale s'élève à ${cost}. Vous pouvez récupérer votre voiture avant 19h.`,
          opt: [
            `Véhicule prêt après travaux de ${rep} (${cost})`,
            `Impossibilité d'effectuer la réparation requise`,
            `Délai supplémentaire d'une semaine nécessaire`,
            `Fermeture du garage pour congé annuel`
          ],
          ans: 0,
          tr: `Votre véhicule est prêt suite aux travaux de ${rep}. Facture: ${cost}.`,
          en: `Your vehicle is ready after ${rep} work. Total bill: ${cost}.`,
          hint: `⚠️ Trap Alert: Identify repair status (${rep}) and total amount (${cost}).`
        });
      }
    } else if (qNum <= 25) {
      const b1Variant = (Math.floor(i / 39) + (qNum - 16)) % 10;
      const b1Topics = [
        {
          title: `Reportage Écologie Urbaine B1 N°${i + 1} à ${city}`,
          text: `Selon un récent sondage réalisé à ${city}, l'aménagement de nouvelles pistes cyclables sécurisées et l'extension du réseau de transports collectifs rencontrent l'adhésion d'une large majorité de citoyens soucieux de réduire leur empreinte carbone.`,
          opt: [
            `Approbation citoyenne des nouvelles pistes cyclables et transports`,
            `Refus massif des habitants face aux travaux d'aménagement`,
            `Augmentation brutale des tarifs de transport en commun`,
            `Suppression définitive du réseau de vélos en libre-service`
          ],
          ans: 0,
          tr: `Un sondage montre l'adhésion des citoyens pour les pistes cyclables et transports à ${city}.`,
          en: `A survey shows citizen approval for bike lanes and transit in ${city}.`,
          hint: `⚠️ Trap Alert: Focus on overall public sentiment ('adhésion d'une large majorité').`
        },
        {
          title: `Chronique Travail & Société B1 N°${i + 1}`,
          text: `Une étude menée auprès d'entreprises québécoises révèle que l'expérimentation de la semaine de 4 jours a permis de réduire l'épuisement professionnel de 35% tout en maintenant un niveau de productivité équivalent.`,
          opt: [
            `Baisse de l'épuisement professionnel et maintien de la productivité`,
            `Effondrement de la productivité des employés de bureau`,
            `Obligation de réaliser des heures supplémentaires le week-end`,
            `Hausse importante du taux de démission au sein des équipes`
          ],
          ans: 0,
          tr: `La semaine de 4 jours réduit l'épuisement professionnel sans baisser la productivité.`,
          en: `The 4-day workweek reduces burnout without lowering productivity.`,
          hint: `⚠️ Trap Alert: Identify both benefits (reduced burnout) and steady metric (maintained productivity).`
        },
        {
          title: `Chronique Culture B1 N°${i + 1} à ${city}`,
          text: `Le festival annuel de musique indépendante de ${city} mettra à l'honneur cette année des artistes régionaux émergents, afin de promouvoir la diversité culturelle et le développement de la scène locale.`,
          opt: [
            `Valorisation des artistes régionaux et de la scène culturelle locale`,
            `Annulation des concerts en raison de contraintes budgétaires`,
            `Invitation exclusive d'artistes internationaux renommés`,
            `Fermeture définitive de la grande salle de spectacle municipale`
          ],
          ans: 0,
          tr: `Le festival de ${city} met en valeur les artistes régionaux et la culture locale.`,
          en: `The ${city} festival highlights regional artists and local culture.`,
          hint: `⚠️ Trap Alert: Note the main objective ('promouvoir la diversité culturelle et locale').`
        },
        {
          title: `Reportage Consommation B1 N°${i + 1}`,
          text: `De plus en plus de familles adoptent l'achat en vrac dans les supermarchés spécialisés. Cette pratique permet non seulement d'économiser sur le budget alimentaire, mais contribue aussi à éliminer les emballages plastiques jetables.`,
          opt: [
            `Économies financières et réduction des déchets plastiques jetables`,
            `Augmentation significative des dépenses alimentaires mensuelles`,
            `Disparition complète des magasins d'alimentation générale`,
            `Obligation d'acheter uniquement des produits surgelés industriels`
          ],
          ans: 0,
          tr: `L'achat en vrac permet d'économiser et d'éliminer les emballages plastiques.`,
          en: `Bulk buying saves money and reduces plastic packaging waste.`,
          hint: `⚠️ Trap Alert: Identify the double advantage (budget savings + eco impact).`
        },
        {
          title: `Initiative Citoyenne B1 N°${i + 1} à ${city}`,
          text: `À ${city}, un réseau de bénévoles a mis en place un service d'entraide téléphonique et de visites à domicile pour accompagner les personnes âgées isolées pendant la période hivernale.`,
          opt: [
            `Soutien bénévole et visites de convivialité pour séniors isolés`,
            `Fermeture des centres communautaires de quartier`,
            `Paiement obligatoire d'une cotisation mensuelle de santé`,
            `Remplacement des travailleurs sociaux par des robots automatisés`
          ],
          ans: 0,
          tr: `Un réseau bénévole accompagne les personnes âgées isolées à ${city}.`,
          en: `A volunteer network assists isolated seniors in ${city}.`,
          hint: `⚠️ Trap Alert: Identify target audience (personnes âgées isolées) and nature of service.`
        },
        {
          title: `Dossier Tourisme Écoresponsable B1 N°${i + 1}`,
          text: `Le tourisme vert connaît un essor remarquable dans les parcs nationaux. Les voyageurs privilégient désormais les hébergements en bois certifiés et les déplacements en transports doux sans voiture individuelle.`,
          opt: [
            `Engouement pour les hébergements durables et transports doux`,
            `Baisse de fréquentation des espaces naturels protégés`,
            `Construction de grands complexes hôteliers sur les berges`,
            `Interdiction totale d'accès aux randonneurs en été`
          ],
          ans: 0,
          tr: `Le tourisme vert privilégie les hébergements écologiques et les mobilités douces.`,
          en: `Green tourism favors eco-lodges and sustainable mobility.`,
          hint: `⚠️ Trap Alert: Recognize sustainable choices ('hébergements certifiés', 'transports doux').`
        },
        {
          title: `Reportage Éducation B1 N°${i + 1}`,
          text: `Les bibliothèques publiques de la région ont généralisé le prêt de livres numériques et de tablettes éducatives, facilitant l'accès à la lecture pour les étudiants résidant en zone rurale.`,
          opt: [
            `Accès démocratisé à la lecture numérique en milieu rural`,
            `Suppression des collections de livres physiques dans les établissements`,
            `Augmentation des frais d'inscription aux bibliothèques`,
            `Fermeture nocturne des espaces de travail étudiants`
          ],
          ans: 0,
          tr: `Le prêt numérique en bibliothèque facilite la lecture pour les jeunes ruraux.`,
          en: `Digital library lending expands reading access for rural students.`,
          hint: `⚠️ Trap Alert: Identify key demographic benefit ('accès à la lecture en zone rurale').`
        },
        {
          title: `Chronique Logement B1 N°${i + 1} à ${city}`,
          text: `Le co-logement intergénérationnel gagne du terrain à ${city}. Des étudiants partagent l'appartement de personnes âgées en échange d'une présence rassurante et d'un loyer modéré.`,
          opt: [
            `Partage de logement solidaire entre étudiants et personnes âgées`,
            `Augmentation incontrôlée des loyers du secteur privé`,
            `Expulsion systématique des jeunes locataires du centre-ville`,
            `Obligation légale de vivre uniquement dans des résidences universitaires`
          ],
          ans: 0,
          tr: `Le co-logement permet aux étudiants de vivre chez des séniors à loyer modéré.`,
          en: `Intergenerational housing pairs students with seniors for affordable rent.`,
          hint: `⚠️ Trap Alert: Identify mutual benefit (reassuring presence + moderate rent).`
        },
        {
          title: `Santé & Bien-être B1 N°${i + 1}`,
          text: `Des entreprises canadiennes adoptent le programme 'Pause Active'. Les salariés sont invités à pratiquer dix minutes d'étirements collectifs au milieu de la journée pour lutter contre la sédentarité.`,
          opt: [
            `Mise en place d'exercices physiques quotidiens contre la sédentarité`,
            `Suppression des pauses déjeuner pour les employés du secteur privé`,
            `Obligation de souscrire à une assurance maladie sportive individuelle`,
            `Fermeture des cantines d'entreprise durant l'après-midi`
          ],
          ans: 0,
          tr: `Le programme 'Pause Active' propose des étirements quotidiens en entreprise.`,
          en: `The 'Pause Active' program encourages daily stretching at work.`,
          hint: `⚠️ Trap Alert: Identify initiative purpose ('lutter contre la sédentarité').`
        },
        {
          title: `Initiative Environnement B1 N°${i + 1} à ${city}`,
          text: `La municipalité de ${city} lance une vaste campagne de végétalisation des façades et des toits d'immeubles afin d'absorber l'eau de pluie et réduire l'effet d'îlot de chaleur urbain.`,
          opt: [
            `Végétalisation des bâtiments pour réduire la chaleur et l'eau de pluie`,
            `Destruction des espaces verts existants au centre-ville`,
            `Interdiction de planter des arbres dans les cours d'école`,
            `Taxation supplémentaire sur les propriétaires de jardins privatifs`
          ],
          ans: 0,
          tr: `La végétalisation des bâtiments à ${city} réduit la chaleur et gère les eaux.`,
          en: `Greening buildings in ${city} reduces heat islands and manages rainwater.`,
          hint: `⚠️ Trap Alert: Focus on dual environmental target (rainwater absorption + heat reduction).`
        }
      ];
      topics.push({ level: "B1", ...b1Topics[b1Variant] });
    } else if (qNum <= 33) {
      const b2Variant = (Math.floor(i / 39) + (qNum - 26)) % 8;
      const b2Topics = [
        {
          title: `Chronique Économie & Écologie B2 N°${i + 1}`,
          text: `L'accélération de la transition énergétique dans le secteur industriel canadien suscite un débat approfondi. Si les investissements dans les technologies propres créent de nouvelles opportunités d'emploi, le coût de réadaptation des infrastructures traditionnelles demeure une préoccupation majeure pour les entreprises.`,
          opt: [
            `Opportunités d'emploi mais coût élevé de réadaptation des infrastructures`,
            `Disparition complète des emplois industriels traditionnels`,
            `Baisse spectaculaire des investissements dans le secteur vert`,
            `Abrogation des réglementations environnementales en vigueur`
          ],
          ans: 0,
          tr: `La transition énergétique offre des emplois mais impose des coûts d'infrastructure.`,
          en: `The energy transition offers jobs but imposes high infrastructure costs.`,
          hint: `⚠️ Trap Alert: Identify the nuanced duality (employment growth vs infrastructure cost).`
        },
        {
          title: `Débat Santé & Technologie B2 N°${i + 1}`,
          text: `L'intégration de l'intelligence artificielle dans l'imagerie médicale révolutionne la précision des diagnostics précoces. Toutefois, plusieurs comités d'éthique mettent en garde contre le risque de déshumanisation du colloque singulier entre le médecin et son patient.`,
          opt: [
            `Haute précision médicale nuancée par le risque de déshumanisation du soin`,
            `Remplacement intégral et immédiat du corps médical par des algorithmes`,
            `Inutilité constatée de l'intelligence artificielle en milieu hospitalier`,
            `Interdiction stricte des outils informatiques dans les hôpitaux publics`
          ],
          ans: 0,
          tr: `L'IA en imagerie médicale améliore les diagnostics mais inquiète quant à la relation humaine.`,
          en: `AI in medical imaging enhances diagnostics but raises human relation concerns.`,
          hint: `⚠️ Trap Alert: Identify main ethical tension (diagnostic gain vs loss of human touch).`
        },
        {
          title: `Dossier Climat & Tourisme B2 N°${i + 1}`,
          text: `Face au réchauffement climatique, les stations de ski québécoises investissent massivement dans la neige de culture. Bien que cette technologie sécurise la saison touristique, la forte consommation d'eau et d'électricité pose la question de sa durabilité écologique à long terme.`,
          opt: [
            `Garantie économique de la saison touristique face au coût environnemental`,
            `Fermeture définitive des domaines skiables à travers le pays`,
            `Interdiction fédérale de produire de la neige artificielle en hiver`,
            `Conversion complète des montagnes en parcs d'attractions estivaux`
          ],
          ans: 0,
          tr: `La neige de culture sécurise le tourisme mais consomme beaucoup d'eau et d'énergie.`,
          en: `Artificial snow secures tourism revenue but consumes significant water and power.`,
          hint: `⚠️ Trap Alert: Identify the trade-off (tourism revenue vs resource consumption).`
        },
        {
          title: `Chronique Urbanisme B2 N°${i + 1}`,
          text: `La pérennisation du télétravail transforme le paysage de l'immobilier d'entreprise. La conversion des tours de bureaux inoccupées en logements résidentiels est présentée comme une solution d'avenir, malgré la complexité des normes architecturales de sécurité.`,
          opt: [
            `Reconversion de bureaux vacants en logements freinée par la complexité technique`,
            `Obligation pour tous les salariés de retravailler en présentiel cinq jours sur cinq`,
            `Démolition systématique des immeubles de bureaux dans les grands centres`,
            `Baisse spectaculaire de la demande de logements en centre-ville`
          ],
          ans: 0,
          tr: `La reconversion des bureaux vacants en logements fait face à des contraintes techniques.`,
          en: `Converting vacant office towers to residential housing faces technical hurdles.`,
          hint: `⚠️ Trap Alert: Identify opportunity (housing creation) vs obstacle (architectural norms).`
        },
        {
          title: `Débat Éducation & Emploi B2 N°${i + 1}`,
          text: `La montée en puissance des micro-certifications en ligne bouscule le monopole des diplômes universitaires traditionnels. Les recruteurs apprécient l'agilité de ces formations courtes, bien que certains universitaires dénoncent le risque de marchandisation de l'enseignement.`,
          opt: [
            `Agilité des formations courtes saluée par les entreprises malgré les réserves académiques`,
            `Disparition complète des universités publiques au profit de plateformes privées`,
            `Refus catégorique des recruteurs de reconnaître les diplômes en ligne`,
            `Obligation de détenir un doctorat pour accéder à tout emploi du secteur tertiaire`
          ],
          ans: 0,
          tr: `Les micro-certifications séduisent les employeurs mais suscitent des réserves universitaires.`,
          en: `Micro-credentials appeal to employers but spark debate among academics.`,
          hint: `⚠️ Trap Alert: Note opposing viewpoints (recruiter agility vs academic skepticism).`
        },
        {
          title: `Dossier Industrie Textile B2 N°${i + 1}`,
          text: `Le gouvernement envisage de durcir les réglementations contre l'obsolescence programmée dans le secteur de la mode rapide. Les industriels mettent en avant le risque d'augmentation des prix de vente pour les consommateurs à faible revenu.`,
          opt: [
            `Encadrement écologique du textile confronté au risque de hausse des prix`,
            `Interdiction totale de vendre des vêtements neufs en magasin`,
            `Baisse généralisée des exigences de qualité sur les textiles fabriqués`,
            `Fermeture des frontières commerciales pour tous les produits vestimentaires`
          ],
          ans: 0,
          tr: `Le durcissement écologique dans le textile fait craindre une hausse des prix.`,
          en: `Tightening environmental rules in fashion raises concerns over consumer price hikes.`,
          hint: `⚠️ Trap Alert: Identify conflict between regulatory rigor and consumer purchasing power.`
        },
        {
          title: `Chronique Ville Connectée B2 N°${i + 1}`,
          text: `Le déploiement des réseaux de capteurs intelligents permet d'optimiser le trafic automobile et la collecte des déchets urbains. Néanmoins, les associations de défense des droits civiques réclament un encadrement strict de la gestion des données personnelles.`,
          opt: [
            `Efficacité de la gestion urbaine intelligente associée à des exigences de confidentialité`,
            `Abandon pur et simple de l'utilisation des technologies dans les services publics`,
            `Vente commerciale incontrôlée des données citoyennes aux entreprises privées`,
            `Suppression des feux de circulation dans l'ensemble des agglomérations`
          ],
          ans: 0,
          tr: `Les capteurs intelligents améliorent les services urbains mais posent des questions de vie privée.`,
          en: `Smart sensors optimize city services but raise privacy governance questions.`,
          hint: `⚠️ Trap Alert: Highlight balance between urban efficiency and data privacy rights.`
        },
        {
          title: `Débat Économie du Travail B2 N°${i + 1}`,
          text: `Le statut de travailleur indépendant des livreurs de plateformes numériques fait l'objet de vives contestations judiciaires. Les syndicats revendiquent l'accès aux droits sociaux classiques, tandis que les plateformes défendent la flexibilité horaire plébiscitée par une partie des coursiers.`,
          opt: [
            `Revendication de protection sociale complète face au maintien de la flexibilité horaire`,
            `Interdiction définitive du travail indépendant dans le secteur de la livraison`,
            `Suppression de toute rémunération horaire au profit du bénévolat`,
            `Nationalisation immédiate de l'ensemble des plateformes de livraison rapide`
          ],
          ans: 0,
          tr: `Les coursiers réclament une protection sociale sans renoncer à la flexibilité.`,
          en: `Platform couriers seek social security rights while maintaining scheduling flexibility.`,
          hint: `⚠️ Trap Alert: Identify core dispute (social safety net vs scheduling autonomy).`
        }
      ];
      topics.push({ level: "B2", ...b2Topics[b2Variant] });
    } else if (qNum <= 37) {
      const c1Variant = (Math.floor(i / 39) + (qNum - 34)) % 10;
      const c1Topics = [
        {
          title: `Conférence Académique C1 N°${i + 1}`,
          text: `L'émergence des technologies quantiques en ingénierie de l'information impose une redéfinition fondamentale des architectures cryptographiques. La cohérence des q-bits et la réduction des erreurs algorithmiques constituent les défis centraux de la recherche contemporaine.`,
          opt: [
            `Défis majeurs liés à la cohérence quantique et aux architectures cryptographiques`,
            `Abandon définitif des recherches sur l'informatique quantique`,
            `Adoption universelle et immédiate sans aucune contrainte technique`,
            `Remplacement intégral des systèmes informatiques traditionnels par analogie`
          ],
          ans: 0,
          tr: `L'informatique quantique nécessite de redéfinir les architectures cryptographiques.`,
          en: `Quantum computing requires redefining cryptographic architectures.`,
          hint: `⚠️ Trap Alert: Identify high-register academic vocabulary (cohérence, architectures).`
        },
        {
          title: `Colloque Bioéthique & Génétique C1 N°${i + 1}`,
          text: `Les récentes percées accomplies par l'outil de réécriture génomique CRISPR-Cas9 ouvrent des perspectives thérapeutiques inédites pour les maladies héréditaires rares. Cependant, la communauté scientifique internationale s'accorde sur l'exigence d'un moratoire strict concernant les modifications transmissibles de la lignée germinale humaine.`,
          opt: [
            `Potentiel thérapeutique majeur soumis à un moratoire éthique sur la lignée germinale`,
            `Autorisation inconditionnelle de toutes les manipulations génétiques embryonnaires`,
            `Inefficacité thérapeutique démontrée des ciseaux moléculaires en cancérologie`,
            `Abandon des recherches biochimiques au profit de la médecine conventionnelle`
          ],
          ans: 0,
          tr: `CRISPR-Cas9 offre des thérapies prometteuses mais exige un moratoire sur les modifications germinales.`,
          en: `CRISPR-Cas9 opens therapeutic avenues but demands a strict moratorium on germline edits.`,
          hint: `⚠️ Trap Alert: Distinguish somatic therapies (approved) from germline edits (restricted).`
        },
        {
          title: `Séminaire Neurosciences C1 N°${i + 1}`,
          text: `Les recherches contemporaines sur la neuroplasticité cérébrale chez les adultes apprenant une seconde langue démontrent une réorganisation fonctionnelle significative des réseaux cortex-sous-corticaux. La maîtrise tardive dépend davantage de la densité du réseau d'interconnexions axonales que de l'âge biologique strict de l'apprenant.`,
          opt: [
            `Réorganisation neuroplastique tardive dépendant de la densité des connexions nerveuses`,
            `Impossibilité biologique absolue d'acquérir une seconde langue après la puberté`,
            `Absence totale de modification de la structure cérébrale lors de l'apprentissage linguistique`,
            `Dégradation irréversible des compétences linguistiques en langue maternelle`
          ],
          ans: 0,
          tr: `La neuroplasticité permet l'apprentissage tardif d'une langue via la densité neuronale.`,
          en: `Neuroplasticity enables late language acquisition through axonal network density.`,
          hint: `⚠️ Trap Alert: Focus on scientific thesis (neural network density over biological age).`
        },
        {
          title: `Conférence Sociologie Urbaine C1 N°${i + 1}`,
          text: `La gentrification accélérée des faubourgs historiques s'accompagne d'une marchandisation du patrimoine culturel. Si la réhabilitation du bâti attire des capitaux privés, elle tend à fragiliser le tissu social d'origine par l'éviction progressive des classes populaires.`,
          opt: [
            `Valorisation immobilière contrastant avec l'éviction des populations d'origine`,
            `Enrichissement uniforme et harmonieux de toutes les couches de la population`,
            `Baisse spectaculaire des investissements locatifs dans les zones patrimoniales`,
            `Conservation intacte des structures démographiques et commerciales locales`
          ],
          ans: 0,
          tr: `La réhabilitation urbaine attire des capitaux mais provoque l'éviction des résidents historiques.`,
          en: `Urban gentrification attracts investment while displacing longstanding working-class residents.`,
          hint: `⚠️ Trap Alert: Identify sociological contrast (architectural upgrade vs resident displacement).`
        },
        {
          title: `Dossier Économie Monétaire C1 N°${i + 1}`,
          text: `La conduite des politiques monétaires contemporaines impose aux banques centrales un arbitrage complexe entre le resserrement du crédit pour contenir l'inflation et le maintien des investissements productifs indispensables à la transition écologique.`,
          opt: [
            `Arbitrage monétaire délicat entre contrôle de l'inflation et soutien des investissements vertueux`,
            `Suppression immédiate des taux d'intérêt directeurs au niveau mondial`,
            `Disparition de toute monnaie fiduciaire au profit des échanges de troc`,
            `Mise en place d'une planification économique rigide sans aucune flexibilité de marché`
          ],
          ans: 0,
          tr: `Les banques centrales doivent équilibrer la lutte anti-inflation et le financement écologique.`,
          en: `Central banks must balance inflation control with financing the green transition.`,
          hint: `⚠️ Trap Alert: Focus on policy dilemma (inflation control vs productive green investments).`
        },
        {
          title: `Colloque Droit International C1 N°${i + 1}`,
          text: `L'amplification des déplacements de populations engendrés par le dérèglement climatique révèle les lacunes de la Convention de Genève de 1951, qui ne reconnaît pas juridiquement le statut de réfugié environnemental.`,
          opt: [
            `Inadaptation du cadre juridique actuel face au statut des déplacés environnementaux`,
            `Adoption d'un traité universel garantissant des indemnités financières automatiques`,
            `Baisse générale du nombre de migrants climatiques recensés dans le monde`,
            `Obligation pour chaque citoyen de résider définitivement dans son pays de naissance`
          ],
          ans: 0,
          tr: `Le droit international actuel ne reconnaît pas encore le statut de réfugié climatique.`,
          en: `International law currently lacks legal recognition for environmental refugees.`,
          hint: `⚠️ Trap Alert: Identify legal gap (1951 Geneva Convention limitations).`
        },
        {
          title: `Séminaire Ergonomie Cognitive C1 N°${i + 1}`,
          text: `La surabondance des notifications numériques génère une fragmentation permanente de la charge attentionnelle, altérant la mémoire de travail et diminuant la capacité d'analyse en profondeur chez les professionnels du savoir.`,
          opt: [
            `Fragmentation de l'attention et diminution de la capacité d'analyse approfondie`,
            `Augmentation exceptionnelle des facultés de mémorisation à long terme`,
            `Disparition complète du stress professionnel grâce aux outils de communication`,
            `Obligation de bannir tous les ordinateurs des environnements de travail administratifs`
          ],
          ans: 0,
          tr: `La surabondance de notifications nuit à la mémoire de travail et à l'analyse réflexive.`,
          en: `Overabundant digital notifications fragment attention and degrade deep analytical focus.`,
          hint: `⚠️ Trap Alert: Identify cognitive impact (attention fragmentation & analytical decline).`
        },
        {
          title: `Conférence Biomimétisme C1 N°${i + 1}`,
          text: `L'intégration des principes du biomimétisme dans le secteur de la construction permet de développer des matériaux autosuffisants capables de capter le dioxyde de carbone ambiant tout en régulant la température des bâtiments.`,
          opt: [
            `Développement de matériaux constructifs intelligents inspirés de la nature`,
            `Interdiction d'utiliser le bois et le béton dans l'architecture contemporaine`,
            `Hausse dramatique de la consommation énergétique des constructions neuves`,
            `Remplacement des architectes par des systèmes informatiques entièrement automatisés`
          ],
          ans: 0,
          tr: `Le biomimétisme produit des matériaux de construction capables de capter le CO2.`,
          en: `Biomimicry enables building materials that capture CO2 and self-regulate temperature.`,
          hint: `⚠️ Trap Alert: Identify innovative dual function (carbon capture + thermal regulation).`
        },
        {
          title: `Colloque Linguistique C1 N°${i + 1}`,
          text: `L'uniformisation des canaux de communication globaux accélère la régression des dialectes régionaux et des langues minoritaires, menaçant de faire disparaître une part irremplaçable du patrimoine intangible de l'humanité.`,
          opt: [
            `Menace d'extinction pesant sur les langues minoritaires sous l'effet de l'uniformisation globale`,
            `Revitalisation spontanée et universelle des parlers régionaux oubliés`,
            `Création d'une langue unique mondiale obligatoire pour tous les échanges commerciaux`,
            `Abandon définitif de l'apprentissage des langues vivantes dans les écoles`
          ],
          ans: 0,
          tr: `L'uniformisation mondiale accélère la disparition des langues minoritaires.`,
          en: `Global standardization accelerates the decline of endangered regional minority languages.`,
          hint: `⚠️ Trap Alert: Identify cultural risk (loss of intangible human linguistic heritage).`
        },
        {
          title: `Conférence Économie Comportementale C1 N°${i + 1}`,
          text: `Les interventions fondées sur la théorie de l'incitation douce (ou 'nudge') cherchent à orienter les choix individuels vers des comportements favorables à la santé publique ou à l'environnement, sans recourir à la contrainte réglementaire ou fiscale.`,
          opt: [
            `Orientation bienveillante des choix citoyens sans recourir à la coercition légale`,
            `Imposition de sanctions financières dures pour tout comportement non écologique`,
            `Suppression complète de toute forme de réglementation en matière de santé publique`,
            `Obligation légale de suivre un régime alimentaire fixé par le gouvernement`
          ],
          ans: 0,
          tr: `La théorie du nudge oriente les comportements de manière douce sans contrainte fiscale.`,
          en: `Nudge theory gently guides public behavior without regulatory coercion or taxes.`,
          hint: `⚠️ Trap Alert: Highlight non-coercive mechanism (gentle nudges vs mandates/taxes).`
        }
      ];
      topics.push({ level: "C1", ...c1Topics[c1Variant] });
    } else {
      const c2Variant = (Math.floor(i / 39) + (qNum - 38)) % 10;
      const c2Topics = [
        {
          title: `Épistémologie & Culture C2 N°${i + 1}`,
          text: `La saturation de l'espace public numérique par des flux d'informations générés algorithmiquement risque d'altérer les mécanismes traditionnels de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle et réflexive.`,
          opt: [
            `Risque de substitution de l'analyse factuelle par l'immédiateté émotionnelle`,
            `Perfectionnement exceptionnel et harmonieux du débat démocratique`,
            `Disparition totale des moyens de communication électroniques`,
            `Obligation légale d'utiliser uniquement la presse papier`
          ],
          ans: 0,
          tr: `Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.`,
          en: `Algorithmic flows risk replacing factual analysis with emotional immediacy.`,
          hint: `⚠️ Trap Alert: Identify abstract philosophical thesis ('substituer l'immédiateté à l'analyse').`
        },
        {
          title: `Esthétique & Philosophie C2 N°${i + 1}`,
          text: `L'émergence des œuvres d'art générées par réseaux de neurones artificiels remet en question les fondements métaphysiques de la création. En dissociant la production esthétique de la subjectivité de l'artiste, l'intelligence artificielle ébranle la notion même d'authenticité et d'intentionnalité poétique.`,
          opt: [
            `Remise en cause de l'authenticité par dissociation entre art et subjectivité humaine`,
            `Consécration définitive du statut d'auteur pour les programmes informatiques`,
            `Restauration des canons esthétiques de l'Antiquité classique`,
            `Disparition complète des galeries et des musées d'art contemporain`
          ],
          ans: 0,
          tr: `L'IA artistique bouscule le concept d'authenticité en séparant l'art de l'intention de l'auteur.`,
          en: `AI-generated art challenges authenticity by disconnecting creation from human subjectivity.`,
          hint: `⚠️ Trap Alert: Identify philosophical thesis (disruption of artistic authenticity & intent).`
        },
        {
          title: `Philosophie des Sciences C2 N°${i + 1}`,
          text: `L'illusion d'une neutralité empirique pure dans l'exploitation des données de masse dissimule les présupposés théoriques qui président à la conception des algorithmes d'apprentissage automatique, réintroduisant subrepticement les biais cognitifs de leurs concepteurs.`,
          opt: [
            `Illusion de neutralité masquant l'inscription des biais conceptuels au cœur des algorithmes`,
            `Garantie d'une vérité scientifique absolue et exempte de tout préjugé humain`,
            `Abandon définitif du traitement informatique de la donnée dans les laboratoires`,
            `Remplacement universel de l'expérimentation biologique par des simulations virtuelles`
          ],
          ans: 0,
          tr: `L'exploitation empirique du Big Data dissimule les biais conceptuels des algorithmes.`,
          en: `Big Data empiricism conceals algorithmic bias and embedded designer assumptions.`,
          hint: `⚠️ Trap Alert: Identify epistemological critique (illusory neutrality vs embedded bias).`
        },
        {
          title: `Philosophie du Langage C2 N°${i + 1}`,
          text: `La déconstruction de la fixité sémantique dans la théorie de la déconstruction post-structuraliste remet en cause le paradigme de la représentation directe, affirmant que le sens d'un texte s'élabore dans le jeu inépuisable des renvois intertextuels.`,
          opt: [
            `Remise en question de la fixité du sens au profit d'un jeu inépuisable de renvois`,
            `Affirmation de la clarté univoque et définitive de tout énoncé linguistique`,
            `Disparition totale de la capacité des individus à communiquer oralement`,
            `Obligation de traduire l'ensemble de la littérature mondiale dans une langue artificielle`
          ],
          ans: 0,
          tr: `Le post-structuralisme remet en cause la fixité sémantique du texte.`,
          en: `Post-structuralism challenges fixed semantic meaning in favor of open intertextuality.`,
          hint: `⚠️ Trap Alert: Focus on linguistic thesis (fluidity of meaning vs fixed representation).`
        },
        {
          title: `Éthique & Robotique C2 N°${i + 1}`,
          text: `La délégation des décisions d'engagement létal à des systèmes d'armes autonomes induit une dilution de la responsabilité morale et juridique, créant un vide éthique quant à l'imputabilité des violations du droit international humanitaire.`,
          opt: [
            `Dilution de la responsabilité morale engendrée par la décision létale automatisée`,
            `Perfectionnement exceptionnel des mécanismes de justice militaire internationale`,
            `Interdiction universelle et immédiate de toute recherche militaire technologique`,
            `Remplacement intégral des diplomates par des agents conversationnels automatisés`
          ],
          ans: 0,
          tr: `L'automatisation des décisions militaires crée une dilution de la responsabilité éthique.`,
          en: `Automated military engagement dilutes moral responsibility and accountability.`,
          hint: `⚠️ Trap Alert: Identify ethical void (dilution of moral and legal accountability).`
        },
        {
          title: `Neuro-éthique & Philosophie C2 N°${i + 1}`,
          text: `Le développement des interfaces cerveau-machine bidirectionnelles pose la question de l'intégrité de la conscience individuelle, menaçant de brouiller la frontière entre la souveraineté du sujet pensant et l'influence des données exogènes.`,
          opt: [
            `Menace sur l'intégrité de la conscience et la souveraineté du sujet pensant`,
            `Éradication complète et définitive de toutes les affections neurologiques dégénératives`,
            `Suppression du besoin de sommeil chez l'ensemble des êtres humains`,
            `Interdiction stricte de toute forme d'imagerie cérébrale dans les hôpitaux`
          ],
          ans: 0,
          tr: `Les interfaces cerveau-machine posent la question de la souveraineté de la pensée.`,
          en: `Brain-computer interfaces raise profound concerns regarding mental sovereignty and autonomy.`,
          hint: `⚠️ Trap Alert: Focus on existential question (individual mental sovereignty).`
        },
        {
          title: `Sociologie du Temps C2 N°${i + 1}`,
          text: `L'accélération sociale de la modernité tardive engendre une forme d'aliénation temporelle, où la compression du présent prive l'individu de la capacité de s'inscrire dans une trajectoire biographique cohérente et réfléchie.`,
          opt: [
            `Aliénation temporelle et perte de capacité à construire une trajectoire biographique`,
            `Harmonie parfaite entre le rythme de vie individuel et les exigences de la société`,
            `Retour généralisé aux modes de vie préindustriels dans les grandes métropoles`,
            `Allongement significatif du temps consacré à la contemplation et aux loisirs`
          ],
          ans: 0,
          tr: `L'accélération sociale prive l'individu de la capacité de construire son temps.`,
          en: `Social acceleration produces temporal alienation, undermining coherent self-narratives.`,
          hint: `⚠️ Trap Alert: Identify sociological concept (temporal alienation & narrative fragmentation).`
        },
        {
          title: `Écologie Politique & Ontologie C2 N°${i + 1}`,
          text: `L'affranchissement des limites de la biosphère par l'idéologie du progrès indéfini se heurte désormais à la finitude des ressources planétaires, imposant un changement de paradigme ontologique quant à notre relation à la nature.`,
          opt: [
            `Impasse de la croissance indéfinie imposant la refonte de notre rapport au vivant`,
            `Découverte de ressources énergétiques infinies assurant la pérennité du modèle industriel`,
            `Colonisation immédiate des planètes du système solaire par l'espèce humaine`,
            `Abandon de toute préoccupation environnementale par les instances internationales`
          ],
          ans: 0,
          tr: `La finitude des ressources terrestres exige une refonte de notre rapport à la nature.`,
          en: `Planetary finitude exposes the myth of infinite growth, demanding an ontological shift.`,
          hint: `⚠️ Trap Alert: Focus on core thesis (planetary limits vs myth of infinite growth).`
        },
        {
          title: `Épistémologie des Données C2 N°${i + 1}`,
          text: `La prépondérance des modèles prédictifs fondés sur des corrélations statistiques substitue l'efficacité opérationnelle à la quête de causalité explicative, remplaçant la compréhension scientifique par la gestion des probabilités.`,
          opt: [
            `Substitution de la gestion des probabilités à la recherche des causes explicatives`,
            `Triomphe de la méthode scientifique cartésienne traditionnelle`,
            `Incapacité totale des systèmes informatiques à traiter les prévisions financières`,
            `Rétablissement du monopole des sciences humaines sur la recherche médicale`
          ],
          ans: 0,
          tr: `Les modèles statistiques privilégient la prédiction probabilitiste à l'explication causale.`,
          en: `Predictive models substitute statistical correlation for explanatory causal understanding.`,
          hint: `⚠️ Trap Alert: Identify epistemological shift (statistical probability vs causal explanation).`
        },
        {
          title: `Phénoménologie Numérique C2 N°${i + 1}`,
          text: `L'immersion dans des espaces de réalité virtuelle modifie le rapport corporalité-espace, instaurant une présence spectrale où l'expérience sensible se trouve déconnectée des contraintes de l'ancrage physique traditionnel.`,
          opt: [
            `Reconfiguration de l'expérience corporelle déconnectée de l'ancrage physique`,
            `Renforcement de la perception tactile directe du monde matériel environnant`,
            `Disparition irréversible de l'intérêt pour les arts visuels et la musique`,
            `Obligation de porter un équipement immersif pour toute activité quotidienne`
          ],
          ans: 0,
          tr: `La réalité virtuelle déconnecte l'expérience sensible de l'ancrage physique.`,
          en: `Virtual reality reconfigures bodily experience, disconnecting perception from physical grounding.`,
          hint: `⚠️ Trap Alert: Identify phenomenological shift (spectral presence vs physical grounding).`
        }
      ];
      topics.push({ level: "C2", ...c2Topics[c2Variant] });
    }
  }

  return topics;
}

const LISTENING_TOPICS = getRichListeningTopics();

export interface ReadingTopicItem {
  level: string;
  q: string;
  text: string;
  opt: string[];
  ans: number;
  passEn: string;
  hint?: string;
}

function getRichReadingTopics(): ReadingTopicItem[] {
  return [
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "Une fête de quartier réservée aux enfants",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 1,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Commander leur pain par téléphone la veille",
      "Présenter le coupon avant 11h00 en boulangerie",
      "Payer l'ensemble de leurs achats par carte bancaire"
    ],
    "ans": 2,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Une augmentation des tarifs d'entrée municipaux",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Des travaux d'entretien et de nettoyage des bassins"
    ],
    "ans": 3,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 17h00",
      "Le samedi à 19h30",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 0,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La réparation gratuite de vos appareils électroniques",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 1,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Les propriétaires de commerces uniquement",
      "Uniquement les cyclistes professionnels",
      "Tous les résidents et habitants du quartier",
      "Seuls les membres élus du conseil municipal"
    ],
    "ans": 2,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En passant par une agence de voyage locale",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En achetant au guichet ou directement en ligne"
    ],
    "ans": 3,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Utiliser le stationnement B pendant les travaux",
      "Garer son véhicule gratuitement dans la rue",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 0,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Car la patiente n'a pas transmis ses documents",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 1,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La vente définitive d'anciens romans à bas prix",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques",
      "La livraison à domicile des journaux quotidiens"
    ],
    "ans": 2,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Rendre leurs bagages au service de consignes",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Se diriger vers le quai 7 pour l'embarquement à 14h35"
    ],
    "ans": 3,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Trouver un autre étudiant pour remplacer sa place",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 0,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Présenter les résultats financiers du trimestre",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 1,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Rester impérativement chez soi toute la journée de mardi",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Confier les clés au concierge en cas d'absence pour l'inspection",
      "Changer soi-même les piles du détecteur de fumée"
    ],
    "ans": 2,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un certificat médical attestant d'une bonne santé",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un CV à jour et une lettre de motivation"
    ],
    "ans": 3,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "La création d'un vaste complexe commercial en périphérie",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 0,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Une préférence marquée pour les produits importés à bas coût",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 1,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Financer la construction de nouvelles autoroutes payantes",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Réduire les embouteillages aux heures de pointe et la pollution",
      "Supprimer définitivement les lignes de bus interurbaines"
    ],
    "ans": 2,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "La diminution du nombre d'heures de travail hebdomadaires légales",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "L'exigence accrue de flexibilité et de formules de télétravail"
    ],
    "ans": 3,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 0,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 1,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "Le refus systématique des clients d'utiliser des services automatisés",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "La nécessité de former le personnel aux nouvelles compétences informatiques",
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat"
    ],
    "ans": 2,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La nécessité d'acheter un équipement sportif très coûteux",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La prévention des maladies cardiovasculaires et la réduction du stress"
    ],
    "ans": 3,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 0,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 1,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure",
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions"
    ],
    "ans": 2,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "Le coût de production du solaires rend la décarbonation économiquement inviable",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière"
    ],
    "ans": 3,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 0,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 1,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires",
      "Prioriser le profit financier à court terme au détriment de toute réglementation"
    ],
    "ans": 2,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux"
    ],
    "ans": 3,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 0,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 1,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal",
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre"
    ],
    "ans": 2,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "L'acceptation unanime des décisions automatisées par la communauté juridique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique"
    ],
    "ans": 3,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 0,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 1,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire",
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées"
    ],
    "ans": 2,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "L'observation expérimentale directe est totalement indépendante du cadre théorique",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible"
    ],
    "ans": 3,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "Une fête de quartier réservée aux enfants",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 1,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Commander leur pain par téléphone la veille",
      "Présenter le coupon avant 11h00 en boulangerie",
      "Payer l'ensemble de leurs achats par carte bancaire"
    ],
    "ans": 2,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Une augmentation des tarifs d'entrée municipaux",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Des travaux d'entretien et de nettoyage des bassins"
    ],
    "ans": 3,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 17h00",
      "Le samedi à 19h30",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 0,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La réparation gratuite de vos appareils électroniques",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 1,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Les propriétaires de commerces uniquement",
      "Uniquement les cyclistes professionnels",
      "Tous les résidents et habitants du quartier",
      "Seuls les membres élus du conseil municipal"
    ],
    "ans": 2,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En passant par une agence de voyage locale",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En achetant au guichet ou directement en ligne"
    ],
    "ans": 3,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Utiliser le stationnement B pendant les travaux",
      "Garer son véhicule gratuitement dans la rue",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 0,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Car la patiente n'a pas transmis ses documents",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 1,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La vente définitive d'anciens romans à bas prix",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques",
      "La livraison à domicile des journaux quotidiens"
    ],
    "ans": 2,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Rendre leurs bagages au service de consignes",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Se diriger vers le quai 7 pour l'embarquement à 14h35"
    ],
    "ans": 3,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Trouver un autre étudiant pour remplacer sa place",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 0,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Présenter les résultats financiers du trimestre",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 1,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Rester impérativement chez soi toute la journée de mardi",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Confier les clés au concierge en cas d'absence pour l'inspection",
      "Changer soi-même les piles du détecteur de fumée"
    ],
    "ans": 2,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un certificat médical attestant d'une bonne santé",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un CV à jour et une lettre de motivation"
    ],
    "ans": 3,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "La création d'un vaste complexe commercial en périphérie",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 0,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Une préférence marquée pour les produits importés à bas coût",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 1,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Financer la construction de nouvelles autoroutes payantes",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Réduire les embouteillages aux heures de pointe et la pollution",
      "Supprimer définitivement les lignes de bus interurbaines"
    ],
    "ans": 2,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "La diminution du nombre d'heures de travail hebdomadaires légales",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "L'exigence accrue de flexibilité et de formules de télétravail"
    ],
    "ans": 3,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 0,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 1,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "Le refus systématique des clients d'utiliser des services automatisés",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "La nécessité de former le personnel aux nouvelles compétences informatiques",
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat"
    ],
    "ans": 2,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La nécessité d'acheter un équipement sportif très coûteux",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La prévention des maladies cardiovasculaires et la réduction du stress"
    ],
    "ans": 3,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 0,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 1,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure",
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions"
    ],
    "ans": 2,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "Le coût de production du solaires rend la décarbonation économiquement inviable",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière"
    ],
    "ans": 3,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 0,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 1,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires",
      "Prioriser le profit financier à court terme au détriment de toute réglementation"
    ],
    "ans": 2,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux"
    ],
    "ans": 3,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 0,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 1,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal",
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre"
    ],
    "ans": 2,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "L'acceptation unanime des décisions automatisées par la communauté juridique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique"
    ],
    "ans": 3,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 0,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 1,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire",
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées"
    ],
    "ans": 2,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "L'observation expérimentale directe est totalement indépendante du cadre théorique",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible"
    ],
    "ans": 3,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "Une fête de quartier réservée aux enfants",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 1,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Commander leur pain par téléphone la veille",
      "Présenter le coupon avant 11h00 en boulangerie",
      "Payer l'ensemble de leurs achats par carte bancaire"
    ],
    "ans": 2,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Une augmentation des tarifs d'entrée municipaux",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Des travaux d'entretien et de nettoyage des bassins"
    ],
    "ans": 3,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 17h00",
      "Le samedi à 19h30",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 0,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La réparation gratuite de vos appareils électroniques",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 1,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Les propriétaires de commerces uniquement",
      "Uniquement les cyclistes professionnels",
      "Tous les résidents et habitants du quartier",
      "Seuls les membres élus du conseil municipal"
    ],
    "ans": 2,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En passant par une agence de voyage locale",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En achetant au guichet ou directement en ligne"
    ],
    "ans": 3,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Utiliser le stationnement B pendant les travaux",
      "Garer son véhicule gratuitement dans la rue",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 0,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Car la patiente n'a pas transmis ses documents",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 1,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La vente définitive d'anciens romans à bas prix",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques",
      "La livraison à domicile des journaux quotidiens"
    ],
    "ans": 2,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Rendre leurs bagages au service de consignes",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Se diriger vers le quai 7 pour l'embarquement à 14h35"
    ],
    "ans": 3,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Trouver un autre étudiant pour remplacer sa place",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 0,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Présenter les résultats financiers du trimestre",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 1,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Rester impérativement chez soi toute la journée de mardi",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Confier les clés au concierge en cas d'absence pour l'inspection",
      "Changer soi-même les piles du détecteur de fumée"
    ],
    "ans": 2,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un certificat médical attestant d'une bonne santé",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un CV à jour et une lettre de motivation"
    ],
    "ans": 3,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "La création d'un vaste complexe commercial en périphérie",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 0,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Une préférence marquée pour les produits importés à bas coût",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 1,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Financer la construction de nouvelles autoroutes payantes",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Réduire les embouteillages aux heures de pointe et la pollution",
      "Supprimer définitivement les lignes de bus interurbaines"
    ],
    "ans": 2,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "La diminution du nombre d'heures de travail hebdomadaires légales",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "L'exigence accrue de flexibilité et de formules de télétravail"
    ],
    "ans": 3,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 0,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 1,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "Le refus systématique des clients d'utiliser des services automatisés",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "La nécessité de former le personnel aux nouvelles compétences informatiques",
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat"
    ],
    "ans": 2,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La nécessité d'acheter un équipement sportif très coûteux",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La prévention des maladies cardiovasculaires et la réduction du stress"
    ],
    "ans": 3,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 0,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 1,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure",
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions"
    ],
    "ans": 2,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "Le coût de production du solaires rend la décarbonation économiquement inviable",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière"
    ],
    "ans": 3,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 0,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 1,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires",
      "Prioriser le profit financier à court terme au détriment de toute réglementation"
    ],
    "ans": 2,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux"
    ],
    "ans": 3,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 0,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 1,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal",
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre"
    ],
    "ans": 2,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "L'acceptation unanime des décisions automatisées par la communauté juridique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique"
    ],
    "ans": 3,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 0,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 1,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire",
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées"
    ],
    "ans": 2,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "L'observation expérimentale directe est totalement indépendante du cadre théorique",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible"
    ],
    "ans": 3,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "Une fête de quartier réservée aux enfants",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 1,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Commander leur pain par téléphone la veille",
      "Présenter le coupon avant 11h00 en boulangerie",
      "Payer l'ensemble de leurs achats par carte bancaire"
    ],
    "ans": 2,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Une augmentation des tarifs d'entrée municipaux",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Des travaux d'entretien et de nettoyage des bassins"
    ],
    "ans": 3,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 17h00",
      "Le samedi à 19h30",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 0,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La réparation gratuite de vos appareils électroniques",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 1,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Les propriétaires de commerces uniquement",
      "Uniquement les cyclistes professionnels",
      "Tous les résidents et habitants du quartier",
      "Seuls les membres élus du conseil municipal"
    ],
    "ans": 2,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En passant par une agence de voyage locale",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En achetant au guichet ou directement en ligne"
    ],
    "ans": 3,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Utiliser le stationnement B pendant les travaux",
      "Garer son véhicule gratuitement dans la rue",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 0,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Car la patiente n'a pas transmis ses documents",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 1,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La vente définitive d'anciens romans à bas prix",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques",
      "La livraison à domicile des journaux quotidiens"
    ],
    "ans": 2,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Rendre leurs bagages au service de consignes",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Se diriger vers le quai 7 pour l'embarquement à 14h35"
    ],
    "ans": 3,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Trouver un autre étudiant pour remplacer sa place",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 0,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Présenter les résultats financiers du trimestre",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 1,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Rester impérativement chez soi toute la journée de mardi",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Confier les clés au concierge en cas d'absence pour l'inspection",
      "Changer soi-même les piles du détecteur de fumée"
    ],
    "ans": 2,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un certificat médical attestant d'une bonne santé",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un CV à jour et une lettre de motivation"
    ],
    "ans": 3,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "La création d'un vaste complexe commercial en périphérie",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 0,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Une préférence marquée pour les produits importés à bas coût",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 1,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Financer la construction de nouvelles autoroutes payantes",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Réduire les embouteillages aux heures de pointe et la pollution",
      "Supprimer définitivement les lignes de bus interurbaines"
    ],
    "ans": 2,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "La diminution du nombre d'heures de travail hebdomadaires légales",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "L'exigence accrue de flexibilité et de formules de télétravail"
    ],
    "ans": 3,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 0,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 1,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "Le refus systématique des clients d'utiliser des services automatisés",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "La nécessité de former le personnel aux nouvelles compétences informatiques",
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat"
    ],
    "ans": 2,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La nécessité d'acheter un équipement sportif très coûteux",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La prévention des maladies cardiovasculaires et la réduction du stress"
    ],
    "ans": 3,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 0,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 1,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure",
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions"
    ],
    "ans": 2,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "Le coût de production du solaires rend la décarbonation économiquement inviable",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière"
    ],
    "ans": 3,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 0,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 1,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires",
      "Prioriser le profit financier à court terme au détriment de toute réglementation"
    ],
    "ans": 2,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux"
    ],
    "ans": 3,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 0,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 1,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal",
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre"
    ],
    "ans": 2,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "L'acceptation unanime des décisions automatisées par la communauté juridique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique"
    ],
    "ans": 3,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 0,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 1,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire",
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées"
    ],
    "ans": 2,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "L'observation expérimentale directe est totalement indépendante du cadre théorique",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible"
    ],
    "ans": 3,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "Une fête de quartier réservée aux enfants",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 1,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Commander leur pain par téléphone la veille",
      "Présenter le coupon avant 11h00 en boulangerie",
      "Payer l'ensemble de leurs achats par carte bancaire"
    ],
    "ans": 2,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Une augmentation des tarifs d'entrée municipaux",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Des travaux d'entretien et de nettoyage des bassins"
    ],
    "ans": 3,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 17h00",
      "Le samedi à 19h30",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 0,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La réparation gratuite de vos appareils électroniques",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 1,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Les propriétaires de commerces uniquement",
      "Uniquement les cyclistes professionnels",
      "Tous les résidents et habitants du quartier",
      "Seuls les membres élus du conseil municipal"
    ],
    "ans": 2,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En passant par une agence de voyage locale",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En achetant au guichet ou directement en ligne"
    ],
    "ans": 3,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Utiliser le stationnement B pendant les travaux",
      "Garer son véhicule gratuitement dans la rue",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 0,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Car la patiente n'a pas transmis ses documents",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 1,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La vente définitive d'anciens romans à bas prix",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques",
      "La livraison à domicile des journaux quotidiens"
    ],
    "ans": 2,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Rendre leurs bagages au service de consignes",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Se diriger vers le quai 7 pour l'embarquement à 14h35"
    ],
    "ans": 3,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Trouver un autre étudiant pour remplacer sa place",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 0,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Présenter les résultats financiers du trimestre",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 1,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Rester impérativement chez soi toute la journée de mardi",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Confier les clés au concierge en cas d'absence pour l'inspection",
      "Changer soi-même les piles du détecteur de fumée"
    ],
    "ans": 2,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un certificat médical attestant d'une bonne santé",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un CV à jour et une lettre de motivation"
    ],
    "ans": 3,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "La création d'un vaste complexe commercial en périphérie",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 0,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Une préférence marquée pour les produits importés à bas coût",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 1,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Financer la construction de nouvelles autoroutes payantes",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Réduire les embouteillages aux heures de pointe et la pollution",
      "Supprimer définitivement les lignes de bus interurbaines"
    ],
    "ans": 2,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "La diminution du nombre d'heures de travail hebdomadaires légales",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "L'exigence accrue de flexibilité et de formules de télétravail"
    ],
    "ans": 3,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 0,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 1,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "Le refus systématique des clients d'utiliser des services automatisés",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "La nécessité de former le personnel aux nouvelles compétences informatiques",
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat"
    ],
    "ans": 2,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La nécessité d'acheter un équipement sportif très coûteux",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La prévention des maladies cardiovasculaires et la réduction du stress"
    ],
    "ans": 3,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 0,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 1,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure",
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions"
    ],
    "ans": 2,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "Le coût de production du solaires rend la décarbonation économiquement inviable",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière"
    ],
    "ans": 3,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 0,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 1,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires",
      "Prioriser le profit financier à court terme au détriment de toute réglementation"
    ],
    "ans": 2,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux"
    ],
    "ans": 3,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 0,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 1,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal",
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre"
    ],
    "ans": 2,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "L'acceptation unanime des décisions automatisées par la communauté juridique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique"
    ],
    "ans": 3,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 0,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 1,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire",
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées"
    ],
    "ans": 2,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "L'observation expérimentale directe est totalement indépendante du cadre théorique",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible"
    ],
    "ans": 3,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "Une fête de quartier réservée aux enfants",
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 2,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Payer l'ensemble de leurs achats par carte bancaire",
      "Commander leur pain par téléphone la veille",
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Présenter le coupon avant 11h00 en boulangerie"
    ],
    "ans": 3,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Des travaux d'entretien et de nettoyage des bassins",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Une augmentation des tarifs d'entrée municipaux"
    ],
    "ans": 0,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 19h30",
      "Le samedi à 17h00",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 1,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La réparation gratuite de vos appareils électroniques",
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 2,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Seuls les membres élus du conseil municipal",
      "Uniquement les cyclistes professionnels",
      "Les propriétaires de commerces uniquement",
      "Tous les résidents et habitants du quartier"
    ],
    "ans": 3,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En achetant au guichet ou directement en ligne",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En passant par une agence de voyage locale"
    ],
    "ans": 0,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Garer son véhicule gratuitement dans la rue",
      "Utiliser le stationnement B pendant les travaux",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 1,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Car la patiente n'a pas transmis ses documents",
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 2,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La livraison à domicile des journaux quotidiens",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "La vente définitive d'anciens romans à bas prix",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques"
    ],
    "ans": 3,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Se diriger vers le quai 7 pour l'embarquement à 14h35",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Rendre leurs bagages au service de consignes"
    ],
    "ans": 0,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Trouver un autre étudiant pour remplacer sa place",
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 1,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Présenter les résultats financiers du trimestre",
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 2,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Changer soi-même les piles du détecteur de fumée",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Rester impérativement chez soi toute la journée de mardi",
      "Confier les clés au concierge en cas d'absence pour l'inspection"
    ],
    "ans": 3,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un CV à jour et une lettre de motivation",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un certificat médical attestant d'une bonne santé"
    ],
    "ans": 0,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La création d'un vaste complexe commercial en périphérie",
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 1,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une préférence marquée pour les produits importés à bas coût",
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 2,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Supprimer définitivement les lignes de bus interurbaines",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Financer la construction de nouvelles autoroutes payantes",
      "Réduire les embouteillages aux heures de pointe et la pollution"
    ],
    "ans": 3,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "L'exigence accrue de flexibilité et de formules de télétravail",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "La diminution du nombre d'heures de travail hebdomadaires légales"
    ],
    "ans": 0,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 1,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 2,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "Le refus systématique des clients d'utiliser des services automatisés",
      "La nécessité de former le personnel aux nouvelles compétences informatiques"
    ],
    "ans": 3,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La prévention des maladies cardiovasculaires et la réduction du stress",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La nécessité d'acheter un équipement sportif très coûteux"
    ],
    "ans": 0,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 1,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 2,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure"
    ],
    "ans": 3,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "Le coût de production du solaires rend la décarbonation économiquement inviable"
    ],
    "ans": 0,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 1,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 2,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Prioriser le profit financier à court terme au détriment de toute réglementation",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires"
    ],
    "ans": 3,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école"
    ],
    "ans": 0,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 1,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 2,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal"
    ],
    "ans": 3,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "L'acceptation unanime des décisions automatisées par la communauté juridique"
    ],
    "ans": 0,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 1,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 2,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire"
    ],
    "ans": 3,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "L'observation expérimentale directe est totalement indépendante du cadre théorique"
    ],
    "ans": 0,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "Une fête de quartier réservée aux enfants",
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 2,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Payer l'ensemble de leurs achats par carte bancaire",
      "Commander leur pain par téléphone la veille",
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Présenter le coupon avant 11h00 en boulangerie"
    ],
    "ans": 3,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Des travaux d'entretien et de nettoyage des bassins",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Une augmentation des tarifs d'entrée municipaux"
    ],
    "ans": 0,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 19h30",
      "Le samedi à 17h00",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 1,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La réparation gratuite de vos appareils électroniques",
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 2,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Seuls les membres élus du conseil municipal",
      "Uniquement les cyclistes professionnels",
      "Les propriétaires de commerces uniquement",
      "Tous les résidents et habitants du quartier"
    ],
    "ans": 3,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En achetant au guichet ou directement en ligne",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En passant par une agence de voyage locale"
    ],
    "ans": 0,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Garer son véhicule gratuitement dans la rue",
      "Utiliser le stationnement B pendant les travaux",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 1,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Car la patiente n'a pas transmis ses documents",
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 2,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La livraison à domicile des journaux quotidiens",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "La vente définitive d'anciens romans à bas prix",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques"
    ],
    "ans": 3,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Se diriger vers le quai 7 pour l'embarquement à 14h35",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Rendre leurs bagages au service de consignes"
    ],
    "ans": 0,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Trouver un autre étudiant pour remplacer sa place",
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 1,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Présenter les résultats financiers du trimestre",
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 2,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Changer soi-même les piles du détecteur de fumée",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Rester impérativement chez soi toute la journée de mardi",
      "Confier les clés au concierge en cas d'absence pour l'inspection"
    ],
    "ans": 3,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un CV à jour et une lettre de motivation",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un certificat médical attestant d'une bonne santé"
    ],
    "ans": 0,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La création d'un vaste complexe commercial en périphérie",
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 1,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une préférence marquée pour les produits importés à bas coût",
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 2,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Supprimer définitivement les lignes de bus interurbaines",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Financer la construction de nouvelles autoroutes payantes",
      "Réduire les embouteillages aux heures de pointe et la pollution"
    ],
    "ans": 3,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "L'exigence accrue de flexibilité et de formules de télétravail",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "La diminution du nombre d'heures de travail hebdomadaires légales"
    ],
    "ans": 0,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 1,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 2,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "Le refus systématique des clients d'utiliser des services automatisés",
      "La nécessité de former le personnel aux nouvelles compétences informatiques"
    ],
    "ans": 3,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La prévention des maladies cardiovasculaires et la réduction du stress",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La nécessité d'acheter un équipement sportif très coûteux"
    ],
    "ans": 0,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 1,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 2,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure"
    ],
    "ans": 3,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "Le coût de production du solaires rend la décarbonation économiquement inviable"
    ],
    "ans": 0,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 1,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 2,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Prioriser le profit financier à court terme au détriment de toute réglementation",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires"
    ],
    "ans": 3,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école"
    ],
    "ans": 0,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 1,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 2,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal"
    ],
    "ans": 3,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "L'acceptation unanime des décisions automatisées par la communauté juridique"
    ],
    "ans": 0,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 1,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 2,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire"
    ],
    "ans": 3,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "L'observation expérimentale directe est totalement indépendante du cadre théorique"
    ],
    "ans": 0,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "Une fête de quartier réservée aux enfants",
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 2,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Payer l'ensemble de leurs achats par carte bancaire",
      "Commander leur pain par téléphone la veille",
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Présenter le coupon avant 11h00 en boulangerie"
    ],
    "ans": 3,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Des travaux d'entretien et de nettoyage des bassins",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Une augmentation des tarifs d'entrée municipaux"
    ],
    "ans": 0,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 19h30",
      "Le samedi à 17h00",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 1,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La réparation gratuite de vos appareils électroniques",
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 2,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Seuls les membres élus du conseil municipal",
      "Uniquement les cyclistes professionnels",
      "Les propriétaires de commerces uniquement",
      "Tous les résidents et habitants du quartier"
    ],
    "ans": 3,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En achetant au guichet ou directement en ligne",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En passant par une agence de voyage locale"
    ],
    "ans": 0,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Garer son véhicule gratuitement dans la rue",
      "Utiliser le stationnement B pendant les travaux",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 1,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Car la patiente n'a pas transmis ses documents",
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 2,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La livraison à domicile des journaux quotidiens",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "La vente définitive d'anciens romans à bas prix",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques"
    ],
    "ans": 3,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Se diriger vers le quai 7 pour l'embarquement à 14h35",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Rendre leurs bagages au service de consignes"
    ],
    "ans": 0,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Trouver un autre étudiant pour remplacer sa place",
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 1,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Présenter les résultats financiers du trimestre",
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 2,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Changer soi-même les piles du détecteur de fumée",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Rester impérativement chez soi toute la journée de mardi",
      "Confier les clés au concierge en cas d'absence pour l'inspection"
    ],
    "ans": 3,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un CV à jour et une lettre de motivation",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un certificat médical attestant d'une bonne santé"
    ],
    "ans": 0,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La création d'un vaste complexe commercial en périphérie",
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 1,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une préférence marquée pour les produits importés à bas coût",
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 2,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Supprimer définitivement les lignes de bus interurbaines",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Financer la construction de nouvelles autoroutes payantes",
      "Réduire les embouteillages aux heures de pointe et la pollution"
    ],
    "ans": 3,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "L'exigence accrue de flexibilité et de formules de télétravail",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "La diminution du nombre d'heures de travail hebdomadaires légales"
    ],
    "ans": 0,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 1,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 2,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "Le refus systématique des clients d'utiliser des services automatisés",
      "La nécessité de former le personnel aux nouvelles compétences informatiques"
    ],
    "ans": 3,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La prévention des maladies cardiovasculaires et la réduction du stress",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La nécessité d'acheter un équipement sportif très coûteux"
    ],
    "ans": 0,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 1,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 2,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure"
    ],
    "ans": 3,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "Le coût de production du solaires rend la décarbonation économiquement inviable"
    ],
    "ans": 0,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 1,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 2,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Prioriser le profit financier à court terme au détriment de toute réglementation",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires"
    ],
    "ans": 3,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école"
    ],
    "ans": 0,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 1,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 2,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal"
    ],
    "ans": 3,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "L'acceptation unanime des décisions automatisées par la communauté juridique"
    ],
    "ans": 0,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 1,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 2,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire"
    ],
    "ans": 3,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "L'observation expérimentale directe est totalement indépendante du cadre théorique"
    ],
    "ans": 0,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "Une fête de quartier réservée aux enfants",
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 2,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Payer l'ensemble de leurs achats par carte bancaire",
      "Commander leur pain par téléphone la veille",
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Présenter le coupon avant 11h00 en boulangerie"
    ],
    "ans": 3,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Des travaux d'entretien et de nettoyage des bassins",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Une augmentation des tarifs d'entrée municipaux"
    ],
    "ans": 0,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 19h30",
      "Le samedi à 17h00",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 1,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La réparation gratuite de vos appareils électroniques",
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 2,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Seuls les membres élus du conseil municipal",
      "Uniquement les cyclistes professionnels",
      "Les propriétaires de commerces uniquement",
      "Tous les résidents et habitants du quartier"
    ],
    "ans": 3,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En achetant au guichet ou directement en ligne",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En passant par une agence de voyage locale"
    ],
    "ans": 0,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Garer son véhicule gratuitement dans la rue",
      "Utiliser le stationnement B pendant les travaux",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 1,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Car la patiente n'a pas transmis ses documents",
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 2,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La livraison à domicile des journaux quotidiens",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "La vente définitive d'anciens romans à bas prix",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques"
    ],
    "ans": 3,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Se diriger vers le quai 7 pour l'embarquement à 14h35",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Rendre leurs bagages au service de consignes"
    ],
    "ans": 0,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Trouver un autre étudiant pour remplacer sa place",
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 1,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Présenter les résultats financiers du trimestre",
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 2,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Changer soi-même les piles du détecteur de fumée",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Rester impérativement chez soi toute la journée de mardi",
      "Confier les clés au concierge en cas d'absence pour l'inspection"
    ],
    "ans": 3,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un CV à jour et une lettre de motivation",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un certificat médical attestant d'une bonne santé"
    ],
    "ans": 0,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La création d'un vaste complexe commercial en périphérie",
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 1,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une préférence marquée pour les produits importés à bas coût",
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 2,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Supprimer définitivement les lignes de bus interurbaines",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Financer la construction de nouvelles autoroutes payantes",
      "Réduire les embouteillages aux heures de pointe et la pollution"
    ],
    "ans": 3,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "L'exigence accrue de flexibilité et de formules de télétravail",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "La diminution du nombre d'heures de travail hebdomadaires légales"
    ],
    "ans": 0,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 1,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 2,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "Le refus systématique des clients d'utiliser des services automatisés",
      "La nécessité de former le personnel aux nouvelles compétences informatiques"
    ],
    "ans": 3,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La prévention des maladies cardiovasculaires et la réduction du stress",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La nécessité d'acheter un équipement sportif très coûteux"
    ],
    "ans": 0,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 1,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 2,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure"
    ],
    "ans": 3,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "Le coût de production du solaires rend la décarbonation économiquement inviable"
    ],
    "ans": 0,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 1,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 2,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Prioriser le profit financier à court terme au détriment de toute réglementation",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires"
    ],
    "ans": 3,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école"
    ],
    "ans": 0,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 1,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 2,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal"
    ],
    "ans": 3,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "L'acceptation unanime des décisions automatisées par la communauté juridique"
    ],
    "ans": 0,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 1,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 2,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire"
    ],
    "ans": 3,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "L'observation expérimentale directe est totalement indépendante du cadre théorique"
    ],
    "ans": 0,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel est l'objet principal de cette affichette ?",
    "text": "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    "opt": [
      "Une fête de quartier réservée aux enfants",
      "L'ouverture d'un nouveau centre commercial",
      "Une vente de garage d'objets d'occasion au parc",
      "La fermeture d'une bibliothèque municipale"
    ],
    "ans": 2,
    "passEn": "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Que doivent faire les clients intéressés par cette offre ?",
    "text": "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    "opt": [
      "Payer l'ensemble de leurs achats par carte bancaire",
      "Commander leur pain par téléphone la veille",
      "Acheter au moins cinq gâteaux pour avoir le café",
      "Présenter le coupon avant 11h00 en boulangerie"
    ],
    "ans": 3,
    "passEn": "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quelle est la raison de la fermeture temporaire de la piscine ?",
    "text": "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    "opt": [
      "Des travaux d'entretien et de nettoyage des bassins",
      "L'organisation d'une compétition de natation",
      "Un manque temporaire de personnel qualifié",
      "Une augmentation des tarifs d'entrée municipaux"
    ],
    "ans": 0,
    "passEn": "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "À quelle heure le magasin ferme-t-il le samedi ?",
    "text": "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    "opt": [
      "Le samedi à 19h30",
      "Le samedi à 17h00",
      "Le samedi à 20h00",
      "Le samedi à midi"
    ],
    "ans": 1,
    "passEn": "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Quel service est proposé gratuitement aux résidents ?",
    "text": "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    "opt": [
      "La réparation gratuite de vos appareils électroniques",
      "La livraison à domicile de nouveaux meubles",
      "La ramassage gratuit des meubles et électroménagers",
      "La vente d'outils de jardinage d'occasion"
    ],
    "ans": 2,
    "passEn": "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Qui est invité à participer à cette réunion d'information ?",
    "text": "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    "opt": [
      "Seuls les membres élus du conseil municipal",
      "Uniquement les cyclistes professionnels",
      "Les propriétaires de commerces uniquement",
      "Tous les résidents et habitants du quartier"
    ],
    "ans": 3,
    "passEn": "Neighborhood Council: All residents invited to the public info meeting on bike lanes.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A1",
    "q": "Comment peut-on réserver sa place pour le spectacle ?",
    "text": "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    "opt": [
      "En achetant au guichet ou directement en ligne",
      "En envoyant un courrier postal à la mairie",
      "En se présentant le soir même sans billet",
      "En passant par une agence de voyage locale"
    ],
    "ans": 0,
    "passEn": "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website.",
    "hint": "Reading Guidance [Level A1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consignes principale concernant le stationnement ?",
    "text": "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    "opt": [
      "Garer son véhicule gratuitement dans la rue",
      "Utiliser le stationnement B pendant les travaux",
      "Venir au bureau uniquement en transport en commun",
      "Régler d'avance des frais de réservation"
    ],
    "ans": 1,
    "passEn": "HR Notice: Staff parking under renovation starting Monday. Please use Parking B.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    "text": "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    "opt": [
      "Car la patiente n'a pas transmis ses documents",
      "Parce que la clinique est en rénovation complète",
      "En raison de sa participation obligatoire à un colloque",
      "Par suite d'une fermeture exceptionnelle du centre"
    ],
    "ans": 2,
    "passEn": "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    "text": "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    "opt": [
      "La livraison à domicile des journaux quotidiens",
      "L'ouverture de la salle d'étude 24h sur 24 en semaine",
      "La vente définitive d'anciens romans à bas prix",
      "L'accès gratuit au prêt d'audiolibres et de livres numériques"
    ],
    "ans": 3,
    "passEn": "Community Library: Free access to digital e-books and audiobooks for members.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Que doivent faire les passagers du train de 14h15 ?",
    "text": "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    "opt": [
      "Se diriger vers le quai 7 pour l'embarquement à 14h35",
      "Échanger gratuitement leur billet au guichet principal",
      "Attendre l'arrivée du train suivant sur le quai 3",
      "Rendre leurs bagages au service de consignes"
    ],
    "ans": 0,
    "passEn": "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    "text": "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    "opt": [
      "Trouver un autre étudiant pour remplacer sa place",
      "Envoyer une demande écrite au moins 14 jours avant le premier cours",
      "Présenter un certificat médical d'incapacité",
      "Payer des frais administratifs d'annulation de 50$"
    ],
    "ans": 1,
    "passEn": "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    "text": "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    "opt": [
      "Présenter les résultats financiers du trimestre",
      "Suivre une formation obligatoire en sécurité du travail",
      "Participer au nettoyage des berges et à la plantation d'arbres",
      "Rencontrer de nouveaux clients potentiels de la région"
    ],
    "ans": 2,
    "passEn": "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    "text": "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    "opt": [
      "Changer soi-même les piles du détecteur de fumée",
      "Acheter un nouvel extincteur individuel pour le logement",
      "Rester impérativement chez soi toute la journée de mardi",
      "Confier les clés au concierge en cas d'absence pour l'inspection"
    ],
    "ans": 3,
    "passEn": "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "A2",
    "q": "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    "text": "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    "opt": [
      "Un CV à jour et une lettre de motivation",
      "Une copie certifiée de leur diplôme universitaire",
      "Trois lettres de recommandation d'anciens employeurs",
      "Un certificat médical attestant d'une bonne santé"
    ],
    "ans": 0,
    "passEn": "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30.",
    "hint": "Reading Guidance [Level A2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    "text": "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    "opt": [
      "La création d'un vaste complexe commercial en périphérie",
      "La baisse des températures urbaines grâce à la plantation d'arbres",
      "L'interdiction totale de la circulation automobile au centre-ville",
      "L'augmentation importante des tarifs de stationnement municipal"
    ],
    "ans": 1,
    "passEn": "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    "text": "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    "opt": [
      "Une préférence marquée pour les produits importés à bas coût",
      "Une désaffection progressive des marchés d'agriculteurs locaux",
      "Une hausse nette de l'achat de produits alimentaires régionaux",
      "Un désintérêt général pour la provenance des produits consommés"
    ],
    "ans": 2,
    "passEn": "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    "text": "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    "opt": [
      "Supprimer définitivement les lignes de bus interurbaines",
      "Augmenter la vitesse maximale autorisée sur les autoroutes",
      "Financer la construction de nouvelles autoroutes payantes",
      "Réduire les embouteillages aux heures de pointe et la pollution"
    ],
    "ans": 3,
    "passEn": "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    "text": "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    "opt": [
      "L'exigence accrue de flexibilité et de formules de télétravail",
      "Le retour généralisé au travail obligatoire en présentiel continu",
      "L'abandon complet de toute forme de contrat à durée indéterminée",
      "La diminution du nombre d'heures de travail hebdomadaires légales"
    ],
    "ans": 0,
    "passEn": "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    "text": "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    "opt": [
      "L'augmentation des frais administratifs pour l'ensemble des usagers",
      "Une facilitation des démarches couplée à un risque de fracture numérique",
      "L'obligation d'acheter du matériel informatique haut de gamme",
      "La suppression totale de tous les guichets administratifs du pays"
    ],
    "ans": 1,
    "passEn": "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    "text": "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    "opt": [
      "L'absence d'infrastructures hôtelières dans les grandes métropoles",
      "Le coût très élevé des voyages en avion vers l'étranger",
      "La recherche d'authenticité et le respect de l'environnement",
      "L'interdiction légale de voyager durant les mois d'été"
    ],
    "ans": 2,
    "passEn": "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    "text": "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    "opt": [
      "L'interdiction réglementaire d'automatiser les tâches de secrétariat",
      "Le coût inabordable des ordinateurs pour les petites structures",
      "Le refus systématique des clients d'utiliser des services automatisés",
      "La nécessité de former le personnel aux nouvelles compétences informatiques"
    ],
    "ans": 3,
    "passEn": "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    "text": "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    "opt": [
      "La prévention des maladies cardiovasculaires et la réduction du stress",
      "L'obligation de s'inscrire dans une salle de sport spécialisée",
      "La guérison immédiate de toutes les maladies chroniques majeures",
      "La nécessité d'acheter un équipement sportif très coûteux"
    ],
    "ans": 0,
    "passEn": "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    "text": "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    "opt": [
      "Le rationnement strict de l'eau potable durant tout l'hiver",
      "L'installation de récupérateurs d'eau de pluie pour l'arrosage",
      "La fermeture définitive des réseaux de distribution d'eau potable",
      "L'interdiction totale de posséder un jardin en milieu urbain"
    ],
    "ans": 1,
    "passEn": "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B1",
    "q": "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    "text": "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    "opt": [
      "Réserver l'accès aux expositions aux seuls experts d'art",
      "Générer d'importants profits financiers pour la municipalité",
      "Favoriser la mixité sociale et renforcer les liens communautaires",
      "Remplacer l'enseignement des arts dans les écoles publiques"
    ],
    "ans": 2,
    "passEn": "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties.",
    "hint": "Reading Guidance [Level B1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    "text": "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    "opt": [
      "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions",
      "Le travail à distance provoque le déclin économique irréversible des villes moyennes",
      "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise",
      "Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure"
    ],
    "ans": 3,
    "passEn": "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    "text": "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    "opt": [
      "La transition vers le vert déplace une partie de la pollution vers l'extraction minière",
      "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques",
      "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES",
      "Le coût de production du solaires rend la décarbonation économiquement inviable"
    ],
    "ans": 0,
    "passEn": "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    "text": "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    "opt": [
      "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie",
      "La surinformation provoque une saturation cognitive néfaste au sens critique",
      "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique",
      "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"
    ],
    "ans": 1,
    "passEn": "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    "text": "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    "opt": [
      "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises",
      "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays",
      "L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages",
      "Les usagers refusent catégoriquement de trier leurs emballages en plastique"
    ],
    "ans": 2,
    "passEn": "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    "text": "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    "opt": [
      "Prioriser le profit financier à court terme au détriment de toute réglementation",
      "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques",
      "Déléguer l'ensemble des politiques environnementales à des intervenants externes",
      "Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires"
    ],
    "ans": 3,
    "passEn": "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    "text": "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    "opt": [
      "L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux",
      "La mondialisation améliore automatiquement la conservation des traditions locales",
      "Les traditions régionales sont devenues obsolètes et sans valeur économique",
      "Les jeunes générations refusent d'apprendre des langues étrangères à l'école"
    ],
    "ans": 0,
    "passEn": "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    "text": "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    "opt": [
      "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes",
      "Adapter les infrastructures urbaines et financer le soutien à la dépendance",
      "Fermer les centres de soins de longue durée en zone rurale",
      "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"
    ],
    "ans": 1,
    "passEn": "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "B2",
    "q": "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    "text": "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    "opt": [
      "Augmenter considérablement le coût des légumes pour les consommateurs",
      "Remplacer intégralement la production des exploitations agricoles rurales",
      "Renforcer la sécurité alimentaire locale et recréer de la biodiversité",
      "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"
    ],
    "ans": 2,
    "passEn": "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity.",
    "hint": "Reading Guidance [Level B2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    "text": "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    "opt": [
      "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre",
      "L'inefficacité fondamentale des algorithmes de modélisation informatique",
      "La séparation nécessaire entre la séquestration du carbone et le climat",
      "L'intégration systémique de la dynamique hydrologique et du couvert végétal"
    ],
    "ans": 3,
    "passEn": "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    "text": "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    "opt": [
      "La reproduction de biais systémiques sous couvert d'une neutralité technologique",
      "L'impossibilité technique d'écrire des programmes informatiques complexes",
      "La baisse généralisée des coûts d'instruction des procédures administratives",
      "L'acceptation unanime des décisions automatisées par la communauté juridique"
    ],
    "ans": 0,
    "passEn": "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C1",
    "q": "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    "text": "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    "opt": [
      "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence",
      "La persistance de la capacité de remaniement synaptique à l'âge adulte",
      "L'inutilité de l'apprentissage tardif pour la prévention de la démence",
      "L'impossibilité de mesurer précisément les modifications neuronales en IRM"
    ],
    "ans": 1,
    "passEn": "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches.",
    "hint": "Reading Guidance [Level C1]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    "text": "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    "opt": [
      "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique",
      "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme",
      "L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente",
      "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"
    ],
    "ans": 2,
    "passEn": "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    "text": "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    "opt": [
      "La nécessité de supprimer toute constitution écrite dans les démocraties modérées",
      "La supériorité absolue du droit positif sur toute considération de justice morale",
      "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires",
      "L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire"
    ],
    "ans": 3,
    "passEn": "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  },
  {
    "level": "C2",
    "q": "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    "text": "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    "opt": [
      "Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible",
      "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits",
      "Toutes les théories scientifiques passées possédaient une validité absolue et égale",
      "L'observation expérimentale directe est totalement indépendante du cadre théorique"
    ],
    "ans": 0,
    "passEn": "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality.",
    "hint": "Reading Guidance [Level C2]: Focus on identifying main thesis and eliminating extreme distractors."
  }
];
}

const READING_TOPICS = getRichReadingTopics();

function getTargetLevel(questionNumber: number): string {
  if (questionNumber <= 7) return "A1";
  if (questionNumber <= 15) return "A2";
  if (questionNumber <= 25) return "B1";
  if (questionNumber <= 33) return "B2";
  if (questionNumber <= 37) return "C1";
  return "C2";
}

function customizeListeningTopicForPaper(topic: ListeningTopicItem, _qNum: number, _prefix: string, _seedOffset: number): ListeningTopicItem {
  return { ...topic };
}

function getDrawingPropositions(sceneIdx: number): { opt: string[]; ans: number } {
  const optionsList = [
    // 0: Train Station Platform
    { opt: ["Des voyageurs attendent l'arrivée du train sur le quai.", "Des clients boivent un café à la terrasse d'un bistrot.", "Un homme fait des achats dans un supermarché.", "Des promeneurs marchent dans un parc enneigé."], ans: 0 },
    // 1: Hotel Reception Desk
    { opt: ["Une personne commande un plat au restaurant.", "Un client s'adresse au réceptionniste à l'accueil de l'hôtel.", "Un passager monte dans un taxi devant la gare.", "Une femme achète un billet au guichet du cinéma."], ans: 1 },
    // 2: Bakery Storefront
    { opt: ["Un mécanicien répare une voiture au garage.", "Un médecin examine un patient dans son cabinet.", "Une cliente achète du pain et des viennoiseries à la boulangerie.", "Un jardinier taille des arbres dans un jardin public."], ans: 2 },
    // 3: Airport Gate & Plane
    { opt: ["Les passagers s'installent dans une salle d'embarquement à l'aéroport.", "Des skieurs descendent une piste enneigée en montagne.", "Des étudiants travaillent au calme dans une bibliothèque.", "Un facteur dépose des lettres dans une boîte aux lettres."], ans: 0 },
    // 4: Metro Ticket Machine
    { opt: ["Des cyclistes roulent sur une piste cyclable.", "Une personne achète un titre de transport à un distributeur automatique du métro.", "Un serveur apporte des boissons sur un plateau.", "Des enfants jouent sur un terrain de football."], ans: 1 },
    // 5: Doctor Office
    { opt: ["Un client demande un renseignement dans une banque.", "Un peintre réalise un tableau dans un atelier.", "Un patient est en consultation chez le médecin.", "Un cuisinier prépare un repas dans une cuisine."], ans: 2 },
    // 6: Outdoor Terrace Cafe
    { opt: ["Des clients sont installés à la terrasse d'un café.", "Des voyageurs attendent leur vol dans un aéroport.", "Un mécanicien vérifie le niveau d'huile d'un véhicule.", "Une personne dépose son sac à la consigne automatique."], ans: 0 },
    // 7: Bus Stop & Street
    { opt: ["Des randonneurs marchent le long d'une rivière.", "Des personnes attendent l'arrivée du bus à un arrêt en ville.", "Un homme répare son vélo sur le trottoir.", "Des clients font la queue devant un guichet de théâtre."], ans: 1 },
    // 8: Supermarket Grocery Aisle
    { opt: ["Un voyageur enregistre ses bagages à l'aéroport.", "Une femme choisit des fruits et légumes au supermarché.", "Un coiffeur coupe les cheveux d'un client dans un salon.", "Des nageurs se baignent dans une piscine municipale."], ans: 1 },
    // 9: Library Reading Room
    { opt: ["Un policier dirige la circulation à un carrefour.", "Des personnes lisent et étudient silencieusement dans une bibliothèque.", "Un chauffeur livre des colis à un domicile.", "Des musiciens jouent du piano lors d'un concert."], ans: 1 },
    // 10: Car Repair Garage
    { opt: ["Un mécanicien inspecte le moteur d'une voiture dans un garage.", "Un serveur essuie les tables d'un restaurant.", "Des touristes prennent des photos devant un monument historique.", "Un barbier taille la barbe d'un client."], ans: 0 },
    // 11: Pharmacy Counter
    { opt: ["Un boulanger prépare des tartes aux pommes.", "Une personne achète des médicaments au comptoir d'une pharmacie.", "Un photographe prend un portrait en studio.", "Des athlètes s'entraînent sur une piste de course."], ans: 1 },
    // 12: Post Office Counter
    { opt: ["Un homme envoie un colis recommandé au guichet de la poste.", "Un marin pilote un bateau sur le fleuve.", "Une couturière coud un vêtement dans son atelier.", "Des spectateurs applaudissent à la fin d'un film."], ans: 0 },
    // 13: Clothing Store
    { opt: ["Un serveur prend la commande d'une table en terrasse.", "Un mécanicien change les pneus d'un camion.", "Une cliente essaie un manteau dans un magasin de vêtements.", "Un professeur donne un cours devant un tableau vert."], ans: 2 },
    // 14: Train Dining Car
    { opt: ["Des voyageurs mangent dans le wagon-restaurant d'un train.", "Des enfants font du vélo dans la cour de récréation.", "Un fermier nourrit des animaux dans une ferme.", "Un dentiste soigne les dents d'un enfant."], ans: 0 },
    // 15: Airport Baggage Claim
    { opt: ["Un pompier éteint un feu de forêt.", "Des passagers récupèrent leurs bagages sur le tapis roulant à l'aéroport.", "Un jardinier plante des fleurs dans une serre.", "Un guide explique l'histoire d'un château."], ans: 1 },
    // 16: Hair Salon
    { opt: ["Une cliente se fait coiffer dans un salon de coiffure.", "Un livreur transporte des cartons dans un monte-charge.", "Un garde surveille les œuvres d'un musée.", "Un ingénieur travaille devant son ordinateur de bureau."], ans: 0 },
    // 17: Gas Station
    { opt: ["Un conducteur fait le plein de carburant à une station-service.", "Un serveur sert des tasses de thé dans un salon.", "Des randonneurs montent vers le sommet d'une colline.", "Un horloger répare un réveil mécanique."], ans: 0 },
    // 18: Public Park Bench
    { opt: ["Un policier vérifie les papiers d'un chauffeur.", "Deux personnes discutent assises sur un banc dans un parc public.", "Un cuisinier découpe de la viande en cuisine.", "Des étudiants écoutent une conférence à l'université."], ans: 1 },
    // 19: Bank Teller Counter
    { opt: ["Un maçon construit un mur de briques.", "Un client effectue un dépôt d'argent au guichet d'une banque.", "Un marin amarre son navire au port.", "Un photographe développe des clichés dans une chambre noire."], ans: 1 },
    // 20: Florist Shop
    { opt: ["Une fleuriste compose un bouquet de fleurs fraîches dans sa boutique.", "Un mécanicien nettoie le pare-brise d'une automobile.", "Un chauffeur de bus valide les tickets des voyageurs.", "Un violoniste répète son morceau de musique."], ans: 0 },
    // 21: Shoe Store
    { opt: ["Un serveur verse du vin dans des verres.", "Un client essaie une paire de chaussures dans un magasin.", "Un électricien répare un tableau électrique.", "Un pêcheur attrape un poisson sur un lac."], ans: 1 },
    // 22: Gym Sports Center
    { opt: ["Des personnes font du sport et s'entraînent dans une salle de gym.", "Un steward sert des repas aux passagers d'un avion.", "Un cordonnier répare une botte en cuir.", "Un vétérinaire examine un chien sur une table."], ans: 0 },
    // 23: Cinema Ticket Booth
    { opt: ["Un serveur prépare des cafés au comptoir.", "Des spectateurs achètent leurs billets au guichet d'un cinéma.", "Un facteur livre un paquet dans un immeuble.", "Un boulanger périt la pâte à pain."], ans: 1 },
    // 24: Taxi Stand
    { opt: ["Des passagers montent à bord d'un taxi à une station en ville.", "Des jardiniers arrosent les fleurs d'un jardin public.", "Un infirmier prend la tension d'un patient.", "Un peintre applique de la peinture sur une façade."], ans: 0 },
    // 25: Bookstore
    { opt: ["Un client parcourt des ouvrages sur les étagères d'une librairie.", "Un mécanicien vérifie les freins d'une motocyclette.", "Un maître-nageur surveille une plage surveillée.", "Un chauffeur charge du fret dans une camionnette."], ans: 0 },
    // 26: Optician Shop
    { opt: ["Un charpentier fabrique un meuble en bois.", "Un client choisit une monture de lunettes chez un opticien.", "Un arbitre siffle une faute pendant un match.", "Un contrôleur vérifie les billets dans le train."], ans: 1 },
    // 27: Museum Art Gallery
    { opt: ["Des visiteurs admirent des tableaux accrochés dans une galerie de musée.", "Un cuisinier dresse des assiettes pour le service du soir.", "Un fermier ramasse des légumes dans son potager.", "Un coiffeur applique une coloration capillaire."], ans: 0 },
    // 28: Ice Cream Parlor Stand
    { opt: ["Des clients achètent des glaces auprès d'un marchand ambulant.", "Un serrurier remplace la serrure d'une porte d'entrée.", "Un pompier inspecte un extincteur de sécurité.", "Un comptable vérifie des factures sur un ordinateur."], ans: 0 },
    // 29: Outdoor Fruit Market
    { opt: ["Un plongeur explore les fonds marins.", "Des consommateurs achètent des fruits frais sur un marché en plein air.", "Un réparateur ajuste la chaîne d'une bicyclette.", "Un hôte d'accueil accueille des visiteurs dans une exposition."], ans: 1 },
    // 30: Train Ticket Counter
    { opt: ["Un usager demande un itinéraire au guichet d'information de la gare.", "Un couturier dessine le patron d'une robe.", "Un ouvrier manœuvre une grue sur un chantier.", "Un serveur sert des desserts dans un salon de thé."], ans: 0 },
    // 31: Laundromat Dry Cleaner
    { opt: ["Un mécanicien fait la vidange d'un moteur.", "Une personne lave son linge dans une laverie automatique.", "Un journaliste interviewe un passant dans la rue.", "Un boulanger enfourne des tartes aux cerises."], ans: 1 },
    // 32: Jewelry Store
    { opt: ["Un client regarde des bijoux exposés dans la vitrine d'une bijouterie.", "Un steward ferme les coffres à bagages d'un avion.", "Un agriculteur conduit un tracteur dans un champ.", "Un plombier répare une fuite sous un évier."], ans: 0 },
    // 33: Fast Food Cafeteria Counter
    { opt: ["Un serveur prépare un sandwich derrière le comptoir d'une cafétéria.", "Un déménageur transporte un meuble lourd dans les escaliers.", "Un maître d'hôtel accueille les clients à l'entrée du restaurant.", "Un botaniste étudie des plantes sous une serre."], ans: 0 },
    // 34: Hardware Store Tools
    { opt: ["Un peintre dessine un modèle dans son atelier.", "Un bricoleur choisit des outils dans un magasin de bricolage.", "Un marin dresse la voile d'un voilier.", "Un masseur prodigue un soin dans un spa."], ans: 1 },
    // 35: Ski Resort Snow Street
    { opt: ["Des skieurs s'équipent au pied des pistes enneigées d'une station.", "Un serveur apporte l'addition aux clients en salle.", "Un guichetier vend des billets de loterie dans un kiosque.", "Un technicien répare une ligne téléphonique."], ans: 0 },
    // 36: University Lecture Hall
    { opt: ["Un photographe ajuste son objectif d'appareil photo.", "Des étudiants écoutent attentivement un cours dans un grand amphithéâtre.", "Un serveur essuie le comptoir en fin de journée.", "Un facteur distribue le courrier dans les boîtes."], ans: 1 },
    // 37: Pet Clinic Vet Office
    { opt: ["Un mécanicien contrôle la pression des pneus d'une berline.", "Un vétérinaire osculte un chat sur une table d'examen.", "Un barbier rase le visage d'un client au rasoir.", "Un conducteur paie au péage d'une autoroute."], ans: 1 },
    // 38: Music Store Guitars
    { opt: ["Un musicien essaie une guitare dans un magasin d'instruments.", "Un boulanger prépare des croissants au beurre.", "Un jardinier tond la pelouse d'une grande propriété.", "Un bagagiste transporte des valises sur un chariot."], ans: 0 },
    // 39: Parking Meter Street
    { opt: ["Un automobiliste paie son stationnement à un horodateur dans la rue.", "Un cuisinier fait revenir des légumes dans une poêle.", "Un serveur débarrasse les assiettes d'une table.", "Un marin nettoie le pont d'un navire de pêche."], ans: 0 }
  ];
  return optionsList[sceneIdx % optionsList.length];
}

export function getA1A2Propositions(sceneIdx: number): {
  level: string;
  title: string;
  text: string;
  opt: string[];
  ans: number;
  tr: string;
  en: string;
  hint: string;
} {
  const cities = ["Montréal", "Québec", "Ottawa", "Vancouver", "Toronto", "Calgary", "Sherbrooke", "Trois-Rivières", "Gatineau", "Moncton"];
  const p = Math.floor(sceneIdx / 11) + 1;
  const qNum = (sceneIdx % 11) + 5;
  const city = cities[(p - 1) % cities.length];

  if (qNum === 5) {
    return {
      level: "A1",
      title: `Annonce Transport A1 P${p}Q5`,
      text: `Annonce gare de ${city} : Le train express N°${400 + p * 12} à destination de la gare centrale partira exceptionnellement de la voie ${p + 1} à ${10 + p}h15.`,
      opt: [
        `Départ du train express pour la gare centrale de ${city} voie ${p + 1} à ${10 + p}h15`,
        `Annulation complète du trajet vers ${city} en raison d'un problème technique`,
        `Changement de destination du train vers la gare du Nord à ${10 + p}h15`,
        `Fermeture temporaire du guichet de vente des billets de la gare de ${city}`
      ],
      ans: 0,
      tr: `Annonce gare de ${city} : Le train express N°${400 + p * 12} partira voie ${p + 1} à ${10 + p}h15.`,
      en: `Station announcement in ${city}: Express train N°${400 + p * 12} departs track ${p + 1} at ${10 + p}:15.`,
      hint: `⚠️ Trap Alert: Identify track number (voie ${p + 1}) and departure time (${10 + p}h15).`
    };
  } else if (qNum === 6) {
    return {
      level: "A1",
      title: `Annonce Magasin A1 P${p}Q6`,
      text: `Annonce supermarché à ${city} : Offre spéciale aujourd'hui au rayon n°${p}. Pour deux articles achetés, le troisième est à moitié prix jusqu'à 19h.`,
      opt: [
        `Offre promotionnelle au rayon n°${p} à ${city} avec le 3e article à demi-prix`,
        `Fermeture exceptionnelle du magasin de ${city} en raison de travaux`,
        `Arrivée de nouveaux produits d'entretien écologiques au rayon n°${p}`,
        `Distribution gratuite de cartes de fidélité à l'accueil du magasin de ${city}`
      ],
      ans: 0,
      tr: `Annonce supermarché : Offre spéciale au rayon n°${p}, le 3e article est à demi-prix.`,
      en: `Store announcement: Special offer in aisle ${p}, 3rd item at half price.`,
      hint: `⚠️ Trap Alert: Note promotion deal (3rd item half price in aisle ${p}).`
    };
  } else if (qNum === 7) {
    return {
      level: "A1",
      title: `Annonce Météo A1 P${p}Q7`,
      text: `Bulletin météo pour ${city} : Des rafales de vent accompagnées de fortes pluies sont prévues en fin d'après-midi. La température sera de ${12 + p}°C.`,
      opt: [
        `Prévision de vent fort et pluie à ${city} avec une température de ${12 + p}°C`,
        `Vague de chaleur et soleil radieux toute la journée sur ${city}`,
        `Chute de neige abondante à ${city} bloquant la circulation routière`,
        `Aucun changement climatique annoncé pour le week-end à ${city}`
      ],
      ans: 0,
      tr: `Bulletin météo pour ${city} : Pluie et vent prévus avec ${12 + p}°C.`,
      en: `Weather forecast for ${city}: Rain and strong wind expected with ${12 + p}°C.`,
      hint: `⚠️ Trap Alert: Focus on weather condition (pluie/vent) and temperature (${12 + p}°C).`
    };
  } else if (qNum === 8) {
    return {
      level: "A2",
      title: `Message Médical A2 P${p}Q8`,
      text: `Bonjour, ici le secrétariat médical du docteur Tremblay à ${city}. Nous vous rappellons votre rendez-vous de suivi fixé à mardi prochain à ${8 + p}h30. Merci d'apporter votre carte de santé.`,
      opt: [
        `Rappel du rendez-vous médical de suivi à ${city} fixé à mardi à ${8 + p}h30`,
        `Annulation définitive de la consultation médicale du docteur Tremblay`,
        `Changement d'adresse du cabinet médical de quartier à ${city}`,
        `Demande d'envoi des résultats d'analyse médicale par courrier`
      ],
      ans: 0,
      tr: `Bonjour, ici le secrétariat médical. Votre rendez-vous de suivi est mardi à ${8 + p}h30.`,
      en: `Hello, medical office calling. Your follow-up appointment is Tuesday at ${8 + p}:30.`,
      hint: `⚠️ Trap Alert: Identify confirmed day (mardi) and time (${8 + p}h30).`
    };
  } else if (qNum === 9) {
    return {
      level: "A2",
      title: `Message Garage Auto A2 P${p}Q9`,
      text: `Bonjour, votre garage automobile de ${city} vous informe que la révision de votre véhicule et le remplacement des freins sont terminés. Le montant total est de ${180 + p * 15}$. Vous pouvez passer avant 18h.`,
      opt: [
        `Véhicule prêt au garage de ${city} après révision et freins pour un montant de ${180 + p * 15}$`,
        `Retard des travaux au garage de ${city} en raison d'une pièce manquante`,
        `Obligation de laisser la voiture au garage de ${city} tout le week-end`,
        `Fermeture annuelle du garage automobile de ${city} dès ce soir`
      ],
      ans: 0,
      tr: `Votre véhicule est prêt suite aux travaux de révision. Total: ${180 + p * 15}$.`,
      en: `Your car is ready after brake replacement and service. Total: $${180 + p * 15}.`,
      hint: `⚠️ Trap Alert: Identify completion status and total bill ($${180 + p * 15}).`
    };
  } else if (qNum === 10) {
    return {
      level: "A2",
      title: `Message Livraison Colis A2 P${p}Q10`,
      text: `Bonjour, le service de livraison vous informe que votre colis n°${8000 + p * 37} est disponible au guichet automatique de la rue Principale à ${city}. Votre code d'accès est le ${4000 + p * 11}.`,
      opt: [
        `Colis n°${8000 + p * 37} disponible en consignes automatiques à ${city} avec le code ${4000 + p * 11}`,
        `Impossibilité de livrer le colis n°${8000 + p * 37} en raison d'une adresse erronée`,
        `Retour du colis n°${8000 + p * 37} à l'expéditeur d'origine à ${city}`,
        `Paiement obligatoire de frais de douane supplémentaires pour le colis`
      ],
      ans: 0,
      tr: `Votre colis n°${8000 + p * 37} est disponible. Code d'accès: ${4000 + p * 11}.`,
      en: `Your parcel N°${8000 + p * 37} is ready in the locker. Access code: ${4000 + p * 11}.`,
      hint: `⚠️ Trap Alert: Identify access code (${4000 + p * 11}) and pickup location.`
    };
  } else if (qNum === 11) {
    return {
      level: "A2",
      title: `Message Agence Immobilière A2 P${p}Q11`,
      text: `Bonjour, l'agence immobilière de ${city} vous confirme la visite de l'appartement 3 pièces prévue ce jeudi à ${10 + p}h00. Le point de rendez-vous est fixé devant l'immeuble.`,
      opt: [
        `Confirmation de la visite de l'appartement à ${city} ce jeudi à ${10 + p}h00`,
        `Annulation du rendez-up car le logement à ${city} a déjà été loué`,
        `Augmentation du montant du loyer mensuel demandé pour l'appartement`,
        `Report de la visite de l'appartement à ${city} à la fin du mois prochain`
      ],
      ans: 0,
      tr: `L'agence vous confirme la visite de l'appartement ce jeudi à ${10 + p}h00.`,
      en: `Real estate agency confirms apartment viewing this Thursday at ${10 + p}:00 AM.`,
      hint: `⚠️ Trap Alert: Identify confirmed visit day (jeudi) and time.`
    };
  } else if (qNum === 12) {
    return {
      level: "A2",
      title: `Message Salon de Coiffure A2 P${p}Q12`,
      text: `Bonjour, le salon de coiffure de ${city} vous informe que votre coiffeuse habituelle sera absente vendredi. Nous vous proposons d'avancer votre rendez-vous à jeudi à ${9 + p}h.`,
      opt: [
        `Proposition de modifier le rendez-vous au salon de ${city} à jeudi à ${9 + p}h en raison d'une absence`,
        `Confirmation du rendez-vous de vendredi au salon de ${city} sans aucun changement`,
        `Fermeture définitive du salon de coiffure de ${city} pour travaux`,
        `Offre d'une réduction exceptionnelle sur les soins capillaires au salon`
      ],
      ans: 0,
      tr: `Changement de rendez-vous proposé à jeudi à ${9 + p}h suite à une absence.`,
      en: `Hair salon proposes moving appointment to Thursday at ${9 + p} AM due to staff absence.`,
      hint: `⚠️ Trap Alert: Identify proposed alternative slot (jeudi) and reason (absence).`
    };
  } else if (qNum === 13) {
    return {
      level: "A2",
      title: `Message Club de Sport A2 P${p}Q13`,
      text: `Bonjour, l'équipe du centre sportif de ${city} vous informe que la séance d'entraînement de natation de ce samedi est déplacée au bassin extérieur à partir de ${8 + p}h.`,
      opt: [
        `Changement de lieu et d'horaire pour l'entraînement de natation à ${city} ce samedi à ${8 + p}h`,
        `Annulation définitive de l'inscription au club de sport de ${city}`,
        `Augmentation de la cotisation annuelle pour les membres du club de sport`,
        `Fermeture des vestiaires du centre sportif de ${city} pour travaux d'assainissement`
      ],
      ans: 0,
      tr: `L'entraînement de natation de samedi est déplacé au bassin extérieur à ${8 + p}h.`,
      en: `Saturday swimming practice moved to outdoor pool at ${8 + p} AM.`,
      hint: `⚠️ Trap Alert: Identify change of location (bassin extérieur) and start time.`
    };
  } else if (qNum === 14) {
    return {
      level: "A2",
      title: `Message Médiathèque A2 P${p}Q14`,
      text: `Bonjour, la bibliothèque municipale de ${city} vous informe que le livre d'histoire que vous avez réservé est arrivé. Vous avez jusqu'à samedi ${10 + p}h pour venir le récupérer.`,
      opt: [
        `Ouvrage réservé disponible à la bibliothèque de ${city} à retirer avant samedi ${10 + p}h`,
        `Obligation de payer une amende pour retard de restitution à la bibliothèque`,
        `Perte définitive de l'ouvrage emprunté par la médiathèque de ${city}`,
        `Rappel de la date de renouvellement de la carte d'abonné de la bibliothèque`
      ],
      ans: 0,
      tr: `Votre livre réservé est disponible à la bibliothèque jusqu'à samedi ${10 + p}h.`,
      en: `Reserved book is available at the library until Saturday at ${10 + p} AM.`,
      hint: `⚠️ Trap Alert: Identify pickup deadline (samedi) for reserved item.`
    };
  } else {
    return {
      level: "A2",
      title: `Message Recrutement Emploi A2 P${p}Q15`,
      text: `Bonjour, le service des ressources humaines de l'entreprise à ${city} a bien reçu votre candidature. Nous souhaiterions vous proposer un entretien téléphonique lundi à ${11 + p}h30.`,
      opt: [
        `Proposition d'entretien téléphonique préalable avec l'entreprise de ${city} lundi à ${11 + p}h30`,
        `Refus immédiat de la candidature transmise à l'entreprise de ${city}`,
        `Demande d'envoi d'une lettre de recommandation imprimée à l'entreprise`,
        `Convocation à un examen écrit dans les locaux de l'entreprise de ${city}`
      ],
      ans: 0,
      tr: `Le service RH vous propose un entretien téléphonique lundi à ${11 + p}h30.`,
      en: `HR offers a phone interview next Monday at ${11 + p}:30 AM.`,
      hint: `⚠️ Trap Alert: Identify format of interview (téléphonique) and proposed time.`
    };
  }
}

export function getB1Propositions(sceneIdx: number): {
  level: string;
  title: string;
  text: string;
  opt: string[];
  ans: number;
  tr: string;
  en: string;
  hint: string;
} {
  const cities = ["Montréal", "Québec", "Ottawa", "Vancouver", "Toronto", "Calgary", "Sherbrooke", "Trois-Rivières", "Gatineau", "Moncton"];
  const p = Math.floor(sceneIdx / 10) + 1;
  const qNum = (sceneIdx % 10) + 16;
  const city = cities[(p - 1) % cities.length];

  if (qNum === 16) {
    return {
      level: "B1",
      title: `Reportage Écologie Urbaine B1 P${p}Q16`,
      text: `Selon un récent sondage réalisé à ${city}, l'aménagement de nouvelles pistes cyclables sécurisées et l'extension des voies réservées aux bus rencontrent l'adhésion de ${65 + p * 2}% des citoyens soucieux de réduire les émissions de carbone. Les autorités municipales envisagent d'accélérer le calendrier des travaux dès le prochain trimestre afin d'encourager les mobilités douces et de fluidifier durablement la circulation dans l'hypercentre.`,
      opt: [
        `Approbation par ${65 + p * 2}% des citoyens de ${city} des nouvelles pistes cyclables et bus`,
        `Refus massif des habitants de ${city} face aux récents travaux d'aménagement routier`,
        `Augmentation brutale des tarifs de transport en commun dans la ville de ${city}`,
        `Suppression définitive du réseau de vélos en libre-service par la municipalité`
      ],
      ans: 0,
      tr: `Locuteur: Un sondage montre l'adhésion de ${65 + p * 2}% des citoyens pour les mobilités douces à ${city}.`,
      en: `A survey shows ${65 + p * 2}% citizen approval for bike lanes and bus transit in ${city}.`,
      hint: `⚠️ Trap Alert: Focus on overall public sentiment (${65 + p * 2}% approval) and main infrastructure goal.`
    };
  } else if (qNum === 17) {
    return {
      level: "B1",
      title: `Chronique Travail & Société B1 P${p}Q17`,
      text: `Une étude approfondie menée auprès d'entreprises de la région de ${city} révèle que l'expérimentation de la semaine de 4 jours a permis de réduire le niveau d'épuisement professionnel de ${30 + p}% tout en maintenant la productivité globale. La majorité des dirigeants interrogés confirment une baisse significative de l'absentéisme et un engagement accru des salariés.`,
      opt: [
        `Réduction de l'épuisement professionnel de ${30 + p}% et maintien de la productivité à ${city}`,
        `Effondrement dramatique de la productivité globale des employés de bureau`,
        `Obligation pour les salariés de ${city} de réaliser des heures supplémentaires le week-end`,
        `Hausse importante du taux de démission volontaire au sein des entreprises`
      ],
      ans: 0,
      tr: `Locutrice: La semaine de 4 jours à ${city} réduit l'épuisement de ${30 + p}% sans baisser la productivité.`,
      en: `The 4-day workweek in ${city} reduces burnout by ${30 + p}% without lowering productivity.`,
      hint: `⚠️ Trap Alert: Identify both benefits (reduced burnout by ${30 + p}%) and steady productivity.`
    };
  } else if (qNum === 18) {
    return {
      level: "B1",
      title: `Chronique Culture B1 P${p}Q18`,
      text: `Le festival annuel de musique émergente de la métropole de ${city} mettra à l'honneur cette année ${10 + p * 3} groupes régionaux d'une grande diversité stylistique. Les organisateurs souhaitent ainsi promouvoir le dynamisme artistique local et offrir une vitrine professionnelle aux jeunes talents émergents de la région.`,
      opt: [
        `Valorisation de ${10 + p * 3} groupes régionaux et de la scène musicale locale à ${city}`,
        `Annulation des spectacles en raison de restrictions budgétaires municipales`,
        `Invitation exclusive d'artistes internationaux renommés au détriment des locaux`,
        `Fermeture définitive de la principale salle de spectacle de la ville de ${city}`
      ],
      ans: 0,
      tr: `Locuteur: Le festival de ${city} met en valeur ${10 + p * 3} groupes locaux et la culture régionale.`,
      en: `The ${city} festival highlights ${10 + p * 3} regional music groups and local culture.`,
      hint: `⚠️ Trap Alert: Note the main artistic goal (promoting ${10 + p * 3} local emerging groups).`
    };
  } else if (qNum === 19) {
    return {
      level: "B1",
      title: `Reportage Consommation B1 P${p}Q19`,
      text: `De plus en plus de foyers de ${city} adoptent l'achat en vrac dans les épiceries écoresponsables du quartier. Cette pratique solidaire permet non seulement de réduire les dépenses alimentaires annuelles de ${15 + p}%, mais contribue également de manière concrète à éliminer les déchets plastiques à usage unique.`,
      opt: [
        `Économies de ${15 + p}% sur le budget alimentaire et élimination des emballages plastiques à ${city}`,
        `Augmentation significative des dépenses mensuelles consacrées à l'alimentation`,
        `Disparition complète des commerces de proximité dans le centre-ville de ${city}`,
        `Obligation légale d'acheter uniquement des produits alimentaires industriels surgelés`
      ],
      ans: 0,
      tr: `Locutrice: L'achat en vrac à ${city} permet d'économiser ${15 + p}% et d'éliminer le plastique.`,
      en: `Bulk buying in ${city} saves ${15 + p}% on groceries and eliminates plastic packaging.`,
      hint: `⚠️ Trap Alert: Identify the double advantage (saving ${15 + p}% + eco-friendly packaging reduction).`
    };
  } else if (qNum === 20) {
    return {
      level: "B1",
      title: `Initiative Citoyenne B1 P${p}Q20`,
      text: `À ${city}, un réseau de bénévoles a mis en place un service de soutien téléphonique et d'accompagnement pour soutenir plus de ${100 + p * 20} personnes âgées isolées durant les mois d'hiver.`,
      opt: [
        `Soutien bénévole et visites de convivialité pour ${100 + p * 20} séniors isolés à ${city}`,
        `Fermeture définitive des centres communautaires d'accueil de quartier`,
        `Paiement obligatoire d'une cotisation mensuelle de santé par les usagers`,
        `Remplacement intégral des intervenants sociaux par des systèmes automatiques`
      ],
      ans: 0,
      tr: `Locuteur: Un réseau bénévole accompagne ${100 + p * 20} personnes âgées isolées à ${city}.`,
      en: `A volunteer network assists ${100 + p * 20} isolated seniors in ${city}.`,
      hint: `⚠️ Trap Alert: Identify target demographic (${100 + p * 20} isolated seniors) and volunteer service.`
    };
  } else if (qNum === 21) {
    return {
      level: "B1",
      title: `Tourisme Écoresponsable B1 P${p}Q21`,
      text: `Le tourisme vert connaît un essor de ${20 + p * 2}% dans les espaces naturels autour de ${city}. Les visiteurs privilégient les gîtes écologiques en bois et les déplacements à vélo ou en navette électrique.`,
      opt: [
        `Engouement de ${20 + p * 2}% pour les hébergements écologiques et mobilités douces à ${city}`,
        `Baisse marquée de la fréquentation touristique des espaces naturels protégés`,
        `Construction de complexes hôteliers en béton sur les rives des lacs régionaux`,
        `Interdiction totale d'accès aux sentiers de randonnée pendant la saison estivale`
      ],
      ans: 0,
      tr: `Locutrice: Le tourisme vert à ${city} progresse de ${20 + p * 2}% en favorisant les mobilités douces.`,
      en: `Green tourism around ${city} grew by ${20 + p * 2}%, favoring eco-lodges and soft mobility.`,
      hint: `⚠️ Trap Alert: Recognize eco-friendly choices (wooden lodges, bikes, electric shuttles).`
    };
  } else if (qNum === 22) {
    return {
      level: "B1",
      title: `Reportage Éducation B1 P${p}Q22`,
      text: `Les bibliothèques publiques de la région de ${city} ont étendu leur service de prêt de tablettes et de livres numériques à ${15 + p} communes rurales, facilitant l'accès à l'information et à la lecture.`,
      opt: [
        `Accès démocratisé à la lecture numérique dans ${15 + p} communes rurales près de ${city}`,
        `Suppression de la totalité des collections de livres papier dans les établissements`,
        `Augmentation considérable des tarifs d'inscription annuelle à la bibliothèque`,
        `Fermeture définitive des espaces de travail étudiants durant la période des examens`
      ],
      ans: 0,
      tr: `Locuteur: Le prêt numérique s'étend à ${15 + p} communes rurales autour de ${city}.`,
      en: `Digital lending expands to ${15 + p} rural communities around ${city}.`,
      hint: `⚠️ Trap Alert: Identify main geographical benefit (${15 + p} rural communities).`
    };
  } else if (qNum === 23) {
    return {
      level: "B1",
      title: `Chronique Logement B1 P${p}Q23`,
      text: `Le co-logement intergénérationnel se développe à ${city}. Plus de ${50 + p * 10} étudiants partagent l'appartement de personnes âgées en échange d'une présence bienveillante et d'un loyer très modéré.`,
      opt: [
        `Partage de logement solidaire pour ${50 + p * 10} étudiants et séniors à ${city}`,
        `Augmentation incontrôlée des loyers d'habitation dans le secteur privé`,
        `Expulsion des jeunes locataires des logements du centre-ville de ${city}`,
        `Obligation légale de résider uniquement dans des cités universitaires fermées`
      ],
      ans: 0,
      tr: `Locutrice: Le co-logement réunit ${50 + p * 10} étudiants et séniors à ${city} pour un loyer modéré.`,
      en: `Intergenerational housing pairs ${50 + p * 10} students with seniors in ${city} for affordable rent.`,
      hint: `⚠️ Trap Alert: Identify mutual benefit (student affordable rent + senior presence).`
    };
  } else if (qNum === 24) {
    return {
      level: "B1",
      title: `Santé & Bien-être B1 P${p}Q24`,
      text: `À ${city}, ${10 + p * 2} entreprises ont introduit la pause d'activité physique guidée. Les salariés consacrent 15 minutes chaque midi à des étirements collectifs pour prévenir les risques liés à la sédentarité.`,
      opt: [
        `Mise en place d'exercices physiques quotidiens dans ${10 + p * 2} entreprises de ${city}`,
        `Suppression complète de la pause déjeuner pour l'ensemble des employés`,
        `Obligation de souscrire à un abonnement sportif individuel payant`,
        `Fermeture des restaurants d'entreprise pendant l'après-midi`
      ],
      ans: 0,
      tr: `Locuteur: Des étirements quotidiens sont organisés dans ${10 + p * 2} entreprises à ${city}.`,
      en: `Daily stretching breaks are adopted by ${10 + p * 2} companies in ${city}.`,
      hint: `⚠️ Trap Alert: Identify health program goal (countering sedentary work habits).`
    };
  } else {
    return {
      level: "B1",
      title: `Initiative Environnement B1 P${p}Q25`,
      text: `La municipalité de ${city} a inauguré la végétalisation de ${20 + p * 5} toitures et façades d'immeubles publics afin de réguler la température urbaine et de capter l'eau de pluie.`,
      opt: [
        `Végétalisation de ${20 + p * 5} bâtiments publics pour réduire la chaleur à ${city}`,
        `Destruction des parcs et espaces verts existants au cœur de la ville`,
        `Interdiction de planter des arbres dans les cours des établissements scolaires`,
        `Taxation supplémentaire sur les propriétaires disposant d'un jardin privé`
      ],
      ans: 0,
      tr: `Locutrice: La végétalisation de ${20 + p * 5} bâtiments à ${city} réduit les îlots de chaleur.`,
      en: `Greening ${20 + p * 5} buildings in ${city} reduces urban heat and manages rainwater.`,
      hint: `⚠️ Trap Alert: Focus on environmental targets (heat island reduction + rainwater capture).`
    };
  }
}


function getB2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  q: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
} {
  switch (sceneIdx % 80) {
    case 0:
      return {
        opt: [
          "La mise en place d'un étiquetage obligatoire des contenus générés par algorithme à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Régulation de l'IA générative dans les médias de Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant régulation de l'ia générative dans les médias de montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la mise en place d'un étiquetage obligatoire des contenus générés par algorithme à montréal.",
        en: "Speaker 1: The debate concerning régulation de l'ia générative dans les médias de montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la mise en place d'un étiquetage obligatoire des contenus générés par algorithme à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 1:
      return {
        opt: [
          "La péréquation des recettes fiscales communales entre Montréal et ses villes dortoirs",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Taxation du télétravail transfrontalier interprovincial à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant taxation du télétravail transfrontalier interprovincial à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la péréquation des recettes fiscales communales entre montréal et ses villes dortoirs.",
        en: "Speaker 1: The debate concerning taxation du télétravail transfrontalier interprovincial à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la péréquation des recettes fiscales communales entre montréal et ses villes dortoirs.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 2:
      return {
        opt: [
          "La réduction des émissions toxiques tout en développant le réseau de tramway à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des véhicules thermiques dans l'hypercentre de Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction des véhicules thermiques dans l'hypercentre de montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la réduction des émissions toxiques tout en développant le réseau de tramway à montréal.",
        en: "Speaker 1: The debate concerning interdiction des véhicules thermiques dans l'hypercentre de montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la réduction des émissions toxiques tout en développant le réseau de tramway à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 3:
      return {
        opt: [
          "L'obligation pour les conditionneurs d'utiliser 40% de matières recyclées à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Quotas de plastique recyclé dans l’agroalimentaire à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant quotas de plastique recyclé dans l’agroalimentaire à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure l'obligation pour les conditionneurs d'utiliser 40% de matières recyclées à montréal.",
        en: "Speaker 1: The debate concerning quotas de plastique recyclé dans l’agroalimentaire à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains l'obligation pour les conditionneurs d'utiliser 40% de matières recyclées à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 4:
      return {
        opt: [
          "Une prise en charge de 35% des coûts d'équipement photovoltaïque pour les propriétaires de Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Subventions aux installations solaires raccordées à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant subventions aux installations solaires raccordées à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure une prise en charge de 35% des coûts d'équipement photovoltaïque pour les propriétaires de montréal.",
        en: "Speaker 1: The debate concerning subventions aux installations solaires raccordées à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains une prise en charge de 35% des coûts d'équipement photovoltaïque pour les propriétaires de montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 5:
      return {
        opt: [
          "Le développement du sentiment citoyen et l'aménagement d'espaces verts collectifs à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Service civique environnemental obligatoire pour les jeunes à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant service civique environnemental obligatoire pour les jeunes à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure le développement du sentiment citoyen et l'aménagement d'espaces verts collectifs à montréal.",
        en: "Speaker 1: The debate concerning service civique environnemental obligatoire pour les jeunes à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains le développement du sentiment citoyen et l'aménagement d'espaces verts collectifs à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 6:
      return {
        opt: [
          "La dénonciation par les syndicats des risques de surmenage et d'intrusion dans la vie privée à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Contrôle algorithmique de la cadence de travail à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant contrôle algorithmique de la cadence de travail à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la dénonciation par les syndicats des risques de surmenage et d'intrusion dans la vie privée à montréal.",
        en: "Speaker 1: The debate concerning contrôle algorithmique de la cadence de travail à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la dénonciation par les syndicats des risques de surmenage et d'intrusion dans la vie privée à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 7:
      return {
        opt: [
          "La pénalisation de la fast-fashion au profit d'ateliers textiles locaux durables à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Ecotaxe sur l'habillement synthétique importé à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant ecotaxe sur l'habillement synthétique importé à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la pénalisation de la fast-fashion au profit d'ateliers textiles locaux durables à montréal.",
        en: "Speaker 1: The debate concerning ecotaxe sur l'habillement synthétique importé à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la pénalisation de la fast-fashion au profit d'ateliers textiles locaux durables à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 8:
      return {
        opt: [
          "Le plafonnement à 90 jours de location annuelle pour préserver le logement locatif à Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Responsabilité juridique des plateformes d'hébergement touristique à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant responsabilité juridique des plateformes d'hébergement touristique à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure le plafonnement à 90 jours de location annuelle pour préserver le logement locatif à québec.",
        en: "Speaker 1: The debate concerning responsabilité juridique des plateformes d'hébergement touristique à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains le plafonnement à 90 jours de location annuelle pour préserver le logement locatif à québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 9:
      return {
        opt: [
          "La tarification de la congestion pour financer l'électrification du réseau d'autobus de Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Péage urbain dynamique à l'entrée de la ville de Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant péage urbain dynamique à l'entrée de la ville de québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure la tarification de la congestion pour financer l'électrification du réseau d'autobus de québec.",
        en: "Speaker 1: The debate concerning péage urbain dynamique à l'entrée de la ville de québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains la tarification de la congestion pour financer l'électrification du réseau d'autobus de québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 10:
      return {
        opt: [
          "La gratuité des volumes vitaux suivie d'une surtaxe sur le gaspillage d'eau à Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Tarification progressive de l'eau potable résidentielle à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant tarification progressive de l'eau potable résidentielle à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure la gratuité des volumes vitaux suivie d'une surtaxe sur le gaspillage d'eau à québec.",
        en: "Speaker 1: The debate concerning tarification progressive de l'eau potable résidentielle à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains la gratuité des volumes vitaux suivie d'une surtaxe sur le gaspillage d'eau à québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 11:
      return {
        opt: [
          "L'obligation pour les bailleurs d'isoler les bâtiments avant toute révision de loyer à Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de rénovation thermique pour les passoires énergétiques à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant obligation de rénovation thermique pour les passoires énergétiques à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure l'obligation pour les bailleurs d'isoler les bâtiments avant toute révision de loyer à québec.",
        en: "Speaker 1: The debate concerning obligation de rénovation thermique pour les passoires énergétiques à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains l'obligation pour les bailleurs d'isoler les bâtiments avant toute révision de loyer à québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 12:
      return {
        opt: [
          "La fixation d'un loyer de référence au mètre carré pour freiner la spéculation immobilière à Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Encadrement des loyers dans le secteur privé de Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant encadrement des loyers dans le secteur privé de québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure la fixation d'un loyer de référence au mètre carré pour freiner la spéculation immobilière à québec.",
        en: "Speaker 1: The debate concerning encadrement des loyers dans le secteur privé de québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains la fixation d'un loyer de référence au mètre carré pour freiner la spéculation immobilière à québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 13:
      return {
        opt: [
          "L'intégration sous conditions d'efficacité des thérapies complémentaires au régime de Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Remboursement des soins de médecine alternative par la santé publique à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant remboursement des soins de médecine alternative par la santé publique à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure l'intégration sous conditions d'efficacité des thérapies complémentaires au régime de québec.",
        en: "Speaker 1: The debate concerning remboursement des soins de médecine alternative par la santé publique à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains l'intégration sous conditions d'efficacité des thérapies complémentaires au régime de québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 14:
      return {
        opt: [
          "La suppression des réclames pour les lignes réalisables en moins de 3 heures de train depuis Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction de la publicité pour les vols aériens courts à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction de la publicité pour les vols aériens courts à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure la suppression des réclames pour les lignes réalisables en moins de 3 heures de train depuis québec.",
        en: "Speaker 1: The debate concerning interdiction de la publicité pour les vols aériens courts à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains la suppression des réclames pour les lignes réalisables en moins de 3 heures de train depuis québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 15:
      return {
        opt: [
          "Le retour des bouteilles réutilisables dans tous les supermarchés de la région de Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Déploiement de la consigne en verre consignée à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant déploiement de la consigne en verre consignée à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure le retour des bouteilles réutilisables dans tous les supermarchés de la région de québec.",
        en: "Speaker 1: The debate concerning déploiement de la consigne en verre consignée à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains le retour des bouteilles réutilisables dans tous les supermarchés de la région de québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 16:
      return {
        opt: [
          "L'augmentation de la productivité horaire constatée dans les entreprises pilotes d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Semaine de travail de 32 heures sans perte de salaire à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant semaine de travail de 32 heures sans perte de salaire à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'augmentation de la productivité horaire constatée dans les entreprises pilotes d'ottawa.",
        en: "Speaker 1: The debate concerning semaine de travail de 32 heures sans perte de salaire à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'augmentation de la productivité horaire constatée dans les entreprises pilotes d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 17:
      return {
        opt: [
          "L'approvisionnement exclusif auprès des fermes régionales entourant la ville d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Introduction de repas 100% biologiques et locaux dans les cantines d'Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant introduction de repas 100% biologiques et locaux dans les cantines d'ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'approvisionnement exclusif auprès des fermes régionales entourant la ville d'ottawa.",
        en: "Speaker 1: The debate concerning introduction de repas 100% biologiques et locaux dans les cantines d'ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'approvisionnement exclusif auprès des fermes régionales entourant la ville d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 18:
      return {
        opt: [
          "Le passage au vaisselle lavable et réutilisable dans tous les fast-foods d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des emballages plastiques à usage unique pour la restauration à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction des emballages plastiques à usage unique pour la restauration à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure le passage au vaisselle lavable et réutilisable dans tous les fast-foods d'ottawa.",
        en: "Speaker 1: The debate concerning interdiction des emballages plastiques à usage unique pour la restauration à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains le passage au vaisselle lavable et réutilisable dans tous les fast-foods d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 19:
      return {
        opt: [
          "L'autorisation d'accès limitée aux véhicules transportant au moins trois occupants à Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des voies réservées au covoiturage sur autoroute à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant développement des voies réservées au covoiturage sur autoroute à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'autorisation d'accès limitée aux véhicules transportant au moins trois occupants à ottawa.",
        en: "Speaker 1: The debate concerning développement des voies réservées au covoiturage sur autoroute à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'autorisation d'accès limitée aux véhicules transportant au moins trois occupants à ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 20:
      return {
        opt: [
          "Le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Régulation des trottinettes électriques en libre-service à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant régulation des trottinettes électriques en libre-service à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à ottawa.",
        en: "Speaker 1: The debate concerning régulation des trottinettes électriques en libre-service à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 21:
      return {
        opt: [
          "La préservation de la biodiversité locale contre le grignotage immobilier autour d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'une réserve naturelle périurbaine protégée à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création d'une réserve naturelle périurbaine protégée à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure la préservation de la biodiversité locale contre le grignotage immobilier autour d'ottawa.",
        en: "Speaker 1: The debate concerning création d'une réserve naturelle périurbaine protégée à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains la préservation de la biodiversité locale contre le grignotage immobilier autour d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 22:
      return {
        opt: [
          "L'octroi d'une prime de transition pour le raccordement au réseau de chaleur d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Aide financière au remplacement des chaudières au fioul à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant aide financière au remplacement des chaudières au fioul à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'octroi d'une prime de transition pour le raccordement au réseau de chaleur d'ottawa.",
        en: "Speaker 1: The debate concerning aide financière au remplacement des chaudières au fioul à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'octroi d'une prime de transition pour le raccordement au réseau de chaleur d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 23:
      return {
        opt: [
          "L'interdiction d'envoyer des courriels professionnels le week-end aux employés d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Droit à la déconnexion numérique après les heures de bureau à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant droit à la déconnexion numérique après les heures de bureau à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'interdiction d'envoyer des courriels professionnels le week-end aux employés d'ottawa.",
        en: "Speaker 1: The debate concerning droit à la déconnexion numérique après les heures de bureau à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'interdiction d'envoyer des courriels professionnels le week-end aux employés d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 24:
      return {
        opt: [
          "La collecte séparée des biodéchets ménagers dans tous les quartiers de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Mise en place du compostage obligatoire pour les ménages de Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant mise en place du compostage obligatoire pour les ménages de toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la collecte séparée des biodéchets ménagers dans tous les quartiers de toronto.",
        en: "Speaker 1: The debate concerning mise en place du compostage obligatoire pour les ménages de toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la collecte séparée des biodéchets ménagers dans tous les quartiers de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 25:
      return {
        opt: [
          "La préservation du sommeil des riverains par l'arrêt des atterrissages entre 23h et 6h à Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des vols de nuit à l'aéroport métropolitain de Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction des vols de nuit à l'aéroport métropolitain de toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la préservation du sommeil des riverains par l'arrêt des atterrissages entre 23h et 6h à toronto.",
        en: "Speaker 1: The debate concerning interdiction des vols de nuit à l'aéroport métropolitain de toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la préservation du sommeil des riverains par l'arrêt des atterrissages entre 23h et 6h à toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 26:
      return {
        opt: [
          "L'absorption des eaux de pluie et le rafraîchissement des immeubles neufs de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Installation systématique de toitures végétalisées sur les neufs à Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant installation systématique de toitures végétalisées sur les neufs à toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure l'absorption des eaux de pluie et le rafraîchissement des immeubles neufs de toronto.",
        en: "Speaker 1: The debate concerning installation systématique de toitures végétalisées sur les neufs à toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains l'absorption des eaux de pluie et le rafraîchissement des immeubles neufs de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 27:
      return {
        opt: [
          "La distribution d'un crédit annuel pour l'achat de livres et billets de théâtre à Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'un chèque culture annuel pour la jeunesse de Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création d'un chèque culture annuel pour la jeunesse de toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la distribution d'un crédit annuel pour l'achat de livres et billets de théâtre à toronto.",
        en: "Speaker 1: The debate concerning création d'un chèque culture annuel pour la jeunesse de toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la distribution d'un crédit annuel pour l'achat de livres et billets de théâtre à toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 28:
      return {
        opt: [
          "La production maraîchère locale en circuit court sur les toits d'immeubles de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des fermes urbaines verticales en centre-ville de Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant développement des fermes urbaines verticales en centre-ville de toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la production maraîchère locale en circuit court sur les toits d'immeubles de toronto.",
        en: "Speaker 1: The debate concerning développement des fermes urbaines verticales en centre-ville de toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la production maraîchère locale en circuit court sur les toits d'immeubles de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 29:
      return {
        opt: [
          "L'attribution d'un bonus réparation pour prolonger la durée de vie des appareils à Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien financier aux réparateurs d'appareils électroniques à Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant soutien financier aux réparateurs d'appareils électroniques à toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure l'attribution d'un bonus réparation pour prolonger la durée de vie des appareils à toronto.",
        en: "Speaker 1: The debate concerning soutien financier aux réparateurs d'appareils électroniques à toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains l'attribution d'un bonus réparation pour prolonger la durée de vie des appareils à toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 30:
      return {
        opt: [
          "La baisse des accidents mortels et du niveau sonore dans les rues de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Limitation à 30 km/h de la vitesse de circulation en zone résidentielle à Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant limitation à 30 km/h de la vitesse de circulation en zone résidentielle à toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la baisse des accidents mortels et du niveau sonore dans les rues de toronto.",
        en: "Speaker 1: The debate concerning limitation à 30 km/h de la vitesse de circulation en zone résidentielle à toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la baisse des accidents mortels et du niveau sonore dans les rues de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 31:
      return {
        opt: [
          "L'imposition de quotas de représentation équilibrée au sein des directions d'entreprises de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de parité hommes-femmes dans les conseils d'administration à Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant obligation de parité hommes-femmes dans les conseils d'administration à toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure l'imposition de quotas de représentation équilibrée au sein des directions d'entreprises de toronto.",
        en: "Speaker 1: The debate concerning obligation de parité hommes-femmes dans les conseils d'administration à toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains l'imposition de quotas de représentation équilibrée au sein des directions d'entreprises de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 32:
      return {
        opt: [
          "La desserte automatique des zones industrielles excentrées de la région de Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Déploiement des navettes autonomes électriques sans chauffeur à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant déploiement des navettes autonomes électriques sans chauffeur à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure la desserte automatique des zones industrielles excentrées de la région de vancouver.",
        en: "Speaker 1: The debate concerning déploiement des navettes autonomes électriques sans chauffeur à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains la desserte automatique des zones industrielles excentrées de la région de vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 33:
      return {
        opt: [
          "La prise en charge des urgences animales pour les propriétaires sous le seuil de pauvreté à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Financement des centres de soins vétérinaires publics à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant financement des centres de soins vétérinaires publics à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure la prise en charge des urgences animales pour les propriétaires sous le seuil de pauvreté à vancouver.",
        en: "Speaker 1: The debate concerning financement des centres de soins vétérinaires publics à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains la prise en charge des urgences animales pour les propriétaires sous le seuil de pauvreté à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 34:
      return {
        opt: [
          "Le gel des prix de l'énergie hivernale pour éviter la précarité énergétique à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Plafonnement des tarifs d'électricité pendant les vagues de froid à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant plafonnement des tarifs d'électricité pendant les vagues de froid à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure le gel des prix de l'énergie hivernale pour éviter la précarité énergétique à vancouver.",
        en: "Speaker 1: The debate concerning plafonnement des tarifs d'électricité pendant les vagues de froid à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains le gel des prix de l'énergie hivernale pour éviter la précarité énergétique à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 35:
      return {
        opt: [
          "L'aménagement d'axes cyclables sécurisés et séparés reliant les banlieues à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création de pistes de super-cyclisme éclairées la nuit à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création de pistes de super-cyclisme éclairées la nuit à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure l'aménagement d'axes cyclables sécurisés et séparés reliant les banlieues à vancouver.",
        en: "Speaker 1: The debate concerning création de pistes de super-cyclisme éclairées la nuit à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains l'aménagement d'axes cyclables sécurisés et séparés reliant les banlieues à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 36:
      return {
        opt: [
          "L'offre systématique d'une alternative végétale équilibrée dans les restaurants municipaux de Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de menus végétariens quotidiens dans la restauration collective à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant obligation de menus végétariens quotidiens dans la restauration collective à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure l'offre systématique d'une alternative végétale équilibrée dans les restaurants municipaux de vancouver.",
        en: "Speaker 1: The debate concerning obligation de menus végétariens quotidiens dans la restauration collective à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains l'offre systématique d'une alternative végétale équilibrée dans les restaurants municipaux de vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 37:
      return {
        opt: [
          "La protection des milieux marins et fluviaux en amont du traitement des eaux à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des produits cosmétiques contenant des microplastiques à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction des produits cosmétiques contenant des microplastiques à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure la protection des milieux marins et fluviaux en amont du traitement des eaux à vancouver.",
        en: "Speaker 1: The debate concerning interdiction des produits cosmétiques contenant des microplastiques à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains la protection des milieux marins et fluviaux en amont du traitement des eaux à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 38:
      return {
        opt: [
          "L'accompagnement des jeunes diplômés par des retraités bénévoles expérimentés à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement du mentorat intergénérationnel dans les universités de Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant développement du mentorat intergénérationnel dans les universités de vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure l'accompagnement des jeunes diplômés par des retraités bénévoles expérimentés à vancouver.",
        en: "Speaker 1: The debate concerning développement du mentorat intergénérationnel dans les universités de vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains l'accompagnement des jeunes diplômés par des retraités bénévoles expérimentés à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 39:
      return {
        opt: [
          "La mise à disposition d'outils numériques modernes dans les équipements publics de Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Légalisation des espaces de travail partagés dans les bibliothèques de Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant légalisation des espaces de travail partagés dans les bibliothèques de vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure la mise à disposition d'outils numériques modernes dans les équipements publics de vancouver.",
        en: "Speaker 1: The debate concerning légalisation des espaces de travail partagés dans les bibliothèques de vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains la mise à disposition d'outils numériques modernes dans les équipements publics de vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 40:
      return {
        opt: [
          "L'installation de caméras mobiles et la hausse des amendes forfaitaires à Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Renforcement des sanctions contre les dépôts sauvages de déchets à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant renforcement des sanctions contre les dépôts sauvages de déchets à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure l'installation de caméras mobiles et la hausse des amendes forfaitaires à calgary.",
        en: "Speaker 1: The debate concerning renforcement des sanctions contre les dépôts sauvages de déchets à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains l'installation de caméras mobiles et la hausse des amendes forfaitaires à calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 41:
      return {
        opt: [
          "L'octroi de parcelles cultivables gratuites aux associations de quartier de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création de jardins partagés au pied des ensembles résidentiels à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création de jardins partagés au pied des ensembles résidentiels à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure l'octroi de parcelles cultivables gratuites aux associations de quartier de calgary.",
        en: "Speaker 1: The debate concerning création de jardins partagés au pied des ensembles résidentiels à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains l'octroi de parcelles cultivables gratuites aux associations de quartier de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 42:
      return {
        opt: [
          "La création d'un tarif postal préférentiel pour l'envoi de livres par les commerces de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien aux librairies indépendantes face à la vente en ligne à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant soutien aux librairies indépendantes face à la vente en ligne à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure la création d'un tarif postal préférentiel pour l'envoi de livres par les commerces de calgary.",
        en: "Speaker 1: The debate concerning soutien aux librairies indépendantes face à la vente en ligne à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains la création d'un tarif postal préférentiel pour l'envoi de livres par les commerces de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 43:
      return {
        opt: [
          "Le remplacement des vieux poêles par des foyers à granules hautement performants à Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction du chauffage au bois individuel non certifié à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction du chauffage au bois individuel non certifié à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure le remplacement des vieux poêles par des foyers à granules hautement performants à calgary.",
        en: "Speaker 1: The debate concerning interdiction du chauffage au bois individuel non certifié à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains le remplacement des vieux poêles par des foyers à granules hautement performants à calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 44:
      return {
        opt: [
          "L'accès nocturne aux gymnases pour encourager la pratique sportive chez les travailleurs de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Extension des horaires d'ouverture des équipements sportifs municipaux à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant extension des horaires d'ouverture des équipements sportifs municipaux à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure l'accès nocturne aux gymnases pour encourager la pratique sportive chez les travailleurs de calgary.",
        en: "Speaker 1: The debate concerning extension des horaires d'ouverture des équipements sportifs municipaux à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains l'accès nocturne aux gymnases pour encourager la pratique sportive chez les travailleurs de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 45:
      return {
        opt: [
          "La reconnaissance comptable des heures d'engagement associatif dans le régime de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Mise en place d'un passeport bénévole valorisable pour la retraite à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant mise en place d'un passeport bénévole valorisable pour la retraite à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure la reconnaissance comptable des heures d'engagement associatif dans le régime de calgary.",
        en: "Speaker 1: The debate concerning mise en place d'un passeport bénévole valorisable pour la retraite à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains la reconnaissance comptable des heures d'engagement associatif dans le régime de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 46:
      return {
        opt: [
          "L'information transparente des acheteurs sur la consommation d'énergie des logements de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de bilans thermiques gratuits avant toute vente immobilière à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant obligation de bilans thermiques gratuits avant toute vente immobilière à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure l'information transparente des acheteurs sur la consommation d'énergie des logements de calgary.",
        en: "Speaker 1: The debate concerning obligation de bilans thermiques gratuits avant toute vente immobilière à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains l'information transparente des acheteurs sur la consommation d'énergie des logements de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 47:
      return {
        opt: [
          "La réservation de wagons sans téléphone pour préserver la tranquillité des usagers à Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des zones de silence dans les transports publics de Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant développement des zones de silence dans les transports publics de calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure la réservation de wagons sans téléphone pour préserver la tranquillité des usagers à calgary.",
        en: "Speaker 1: The debate concerning développement des zones de silence dans les transports publics de calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains la réservation de wagons sans téléphone pour préserver la tranquillité des usagers à calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 48:
      return {
        opt: [
          "La baisse des prix de stationnement pour les résidents et la hausse pour les visiteurs à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Régulation des tarifs des parkings souterrains du centre de Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant régulation des tarifs des parkings souterrains du centre de bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure la baisse des prix de stationnement pour les résidents et la hausse pour les visiteurs à bordeaux.",
        en: "Speaker 1: The debate concerning régulation des tarifs des parkings souterrains du centre de bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains la baisse des prix de stationnement pour les résidents et la hausse pour les visiteurs à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 49:
      return {
        opt: [
          "La fourniture d'outils et de conseils techniques gratuits pour entretenir sa bicyclette à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'ateliers municipaux d'auto-réparation de vélos à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création d'ateliers municipaux d'auto-réparation de vélos à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure la fourniture d'outils et de conseils techniques gratuits pour entretenir sa bicyclette à bordeaux.",
        en: "Speaker 1: The debate concerning création d'ateliers municipaux d'auto-réparation de vélos à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains la fourniture d'outils et de conseils techniques gratuits pour entretenir sa bicyclette à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 50:
      return {
        opt: [
          "L'extinction des panneaux lumineux nocturnes pour économiser l'électricité à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des écrans publicitaires vidéo énergivores dans les rues de Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction des écrans publicitaires vidéo énergivores dans les rues de bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'extinction des panneaux lumineux nocturnes pour économiser l'électricité à bordeaux.",
        en: "Speaker 1: The debate concerning interdiction des écrans publicitaires vidéo énergivores dans les rues de bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'extinction des panneaux lumineux nocturnes pour économiser l'électricité à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 51:
      return {
        opt: [
          "Le versement d'une allocation mensuelle conditionnée au suivi d'une formation à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Expérimentation du revenu d'autonomie pour les jeunes de 18 à 25 ans à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant expérimentation du revenu d'autonomie pour les jeunes de 18 à 25 ans à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure le versement d'une allocation mensuelle conditionnée au suivi d'une formation à bordeaux.",
        en: "Speaker 1: The debate concerning expérimentation du revenu d'autonomie pour les jeunes de 18 à 25 ans à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains le versement d'une allocation mensuelle conditionnée au suivi d'une formation à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 52:
      return {
        opt: [
          "L'installation de prises publiques sur les parkings de tous les supermarchés de Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Multiplication des bornes de recharge rapide pour véhicules électriques à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant multiplication des bornes de recharge rapide pour véhicules électriques à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'installation de prises publiques sur les parkings de tous les supermarchés de bordeaux.",
        en: "Speaker 1: The debate concerning multiplication des bornes de recharge rapide pour véhicules électriques à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'installation de prises publiques sur les parkings de tous les supermarchés de bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 53:
      return {
        opt: [
          "L'aide financière aux particuliers pour l'arrosage écologique des jardins à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Subvention à l'achat de cuves de récupération d'eau de pluie à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant subvention à l'achat de cuves de récupération d'eau de pluie à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'aide financière aux particuliers pour l'arrosage écologique des jardins à bordeaux.",
        en: "Speaker 1: The debate concerning subvention à l'achat de cuves de récupération d'eau de pluie à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'aide financière aux particuliers pour l'arrosage écologique des jardins à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 54:
      return {
        opt: [
          "L'établissement d'une bande sanitaire de protection sans produits chimiques autour de Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Encadrement de l'utilisation des pesticides à proximité des habitations de Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant encadrement de l'utilisation des pesticides à proximité des habitations de bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'établissement d'une bande sanitaire de protection sans produits chimiques autour de bordeaux.",
        en: "Speaker 1: The debate concerning encadrement de l'utilisation des pesticides à proximité des habitations de bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'établissement d'une bande sanitaire de protection sans produits chimiques autour de bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 55:
      return {
        opt: [
          "L'organisation d'une grande foire dédiée aux objets d'occasion sur la place centrale de Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'un marché mensuel du réemploi et de la seconde main à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création d'un marché mensuel du réemploi et de la seconde main à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'organisation d'une grande foire dédiée aux objets d'occasion sur la place centrale de bordeaux.",
        en: "Speaker 1: The debate concerning création d'un marché mensuel du réemploi et de la seconde main à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'organisation d'une grande foire dédiée aux objets d'occasion sur la place centrale de bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 56:
      return {
        opt: [
          "La couverture des espaces de stationnement commerciaux par des panneaux solaires à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation d'ombrières photovoltaïques sur les grand parkings de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant obligation d'ombrières photovoltaïques sur les grand parkings de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure la couverture des espaces de stationnement commerciaux par des panneaux solaires à lyon.",
        en: "Speaker 1: The debate concerning obligation d'ombrières photovoltaïques sur les grand parkings de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains la couverture des espaces de stationnement commerciaux par des panneaux solaires à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 57:
      return {
        opt: [
          "La collecte et le reconditionnement des meubles usagés par des chantiers d'insertion à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des ressourceries de quartier pour le réemploi à Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant développement des ressourceries de quartier pour le réemploi à lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure la collecte et le reconditionnement des meubles usagés par des chantiers d'insertion à lyon.",
        en: "Speaker 1: The debate concerning développement des ressourceries de quartier pour le réemploi à lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains la collecte et le reconditionnement des meubles usagés par des chantiers d'insertion à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 58:
      return {
        opt: [
          "La vente exclusivement en vrac ou en filet réutilisable sur les marchés de Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des emballages individuels pour les fruits et légumes à Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction des emballages individuels pour les fruits et légumes à lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure la vente exclusivement en vrac ou en filet réutilisable sur les marchés de lyon.",
        en: "Speaker 1: The debate concerning interdiction des emballages individuels pour les fruits et légumes à lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains la vente exclusivement en vrac ou en filet réutilisable sur les marchés de lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 59:
      return {
        opt: [
          "L'accès illimité aux expositions temporaires et permanentes pour un tarif annuel fixe à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'une carte d'abonnement universelle pour tous les musées de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création d'une carte d'abonnement universelle pour tous les musées de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure l'accès illimité aux expositions temporaires et permanentes pour un tarif annuel fixe à lyon.",
        en: "Speaker 1: The debate concerning création d'une carte d'abonnement universelle pour tous les musées de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains l'accès illimité aux expositions temporaires et permanentes pour un tarif annuel fixe à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 60:
      return {
        opt: [
          "L'autorisation donnée aux restaurateurs d'installer des bacs de plantes aromatiques à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Légalisation des terrasses végétalisées sur le domaine public de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant légalisation des terrasses végétalisées sur le domaine public de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure l'autorisation donnée aux restaurateurs d'installer des bacs de plantes aromatiques à lyon.",
        en: "Speaker 1: The debate concerning légalisation des terrasses végétalisées sur le domaine public de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains l'autorisation donnée aux restaurateurs d'installer des bacs de plantes aromatiques à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 61:
      return {
        opt: [
          "La mise à disposition de terrains municipaux à prix coûtant pour construire solidaire à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien aux coopératives d'habitation à coût abordable à Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant soutien aux coopératives d'habitation à coût abordable à lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure la mise à disposition de terrains municipaux à prix coûtant pour construire solidaire à lyon.",
        en: "Speaker 1: The debate concerning soutien aux coopératives d'habitation à coût abordable à lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains la mise à disposition de terrains municipaux à prix coûtant pour construire solidaire à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 62:
      return {
        opt: [
          "L'équipement systématique des classes en capteurs de CO2 et purificateurs d'air à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Renforcement du contrôle de la qualité de l'air dans les écoles de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant renforcement du contrôle de la qualité de l'air dans les écoles de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure l'équipement systématique des classes en capteurs de co2 et purificateurs d'air à lyon.",
        en: "Speaker 1: The debate concerning renforcement du contrôle de la qualité de l'air dans les écoles de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains l'équipement systématique des classes en capteurs de co2 et purificateurs d'air à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 63:
      return {
        opt: [
          "Le transport alternatif des citoyens par bateau électrique pour désengorger les ponts de Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Mise en place de navettes fluviales régulières sur les cours d'eau de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant mise en place de navettes fluviales régulières sur les cours d'eau de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure le transport alternatif des citoyens par bateau électrique pour désengorger les ponts de lyon.",
        en: "Speaker 1: The debate concerning mise en place de navettes fluviales régulières sur les cours d'eau de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains le transport alternatif des citoyens par bateau électrique pour désengorger les ponts de lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 64:
      return {
        opt: [
          "La limitation des dimanches travaillés assortie d'une majoration salariale obligatoire à Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Encadrement des ouvertures dominicales des grands magasins à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant encadrement des ouvertures dominicales des grands magasins à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure la limitation des dimanches travaillés assortie d'une majoration salariale obligatoire à toulouse.",
        en: "Speaker 1: The debate concerning encadrement des ouvertures dominicales des grands magasins à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains la limitation des dimanches travaillés assortie d'une majoration salariale obligatoire à toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 65:
      return {
        opt: [
          "La mise à disposition de véhicules en libre-service dans chaque station de métro de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'un réseau métropolitain d'auto-partage de voitures électriques à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création d'un réseau métropolitain d'auto-partage de voitures électriques à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure la mise à disposition de véhicules en libre-service dans chaque station de métro de toulouse.",
        en: "Speaker 1: The debate concerning création d'un réseau métropolitain d'auto-partage de voitures électriques à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains la mise à disposition de véhicules en libre-service dans chaque station de métro de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 66:
      return {
        opt: [
          "Le soutien financier aux agriculteurs pour préserver la biodiversité et les sols autour de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Subvention à la plantation de haies bocagères sur les terres agricoles près de Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant subvention à la plantation de haies bocagères sur les terres agricoles près de toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure le soutien financier aux agriculteurs pour préserver la biodiversité et les sols autour de toulouse.",
        en: "Speaker 1: The debate concerning subvention à la plantation de haies bocagères sur les terres agricoles près de toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains le soutien financier aux agriculteurs pour préserver la biodiversité et les sols autour de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 67:
      return {
        opt: [
          "Le blocage automatique des numéros d'entreprises non inscrites sur la liste rouge à Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction du démarchage téléphonique commercial non sollicité à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction du démarchage téléphonique commercial non sollicité à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure le blocage automatique des numéros d'entreprises non inscrites sur la liste rouge à toulouse.",
        en: "Speaker 1: The debate concerning interdiction du démarchage téléphonique commercial non sollicité à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains le blocage automatique des numéros d'entreprises non inscrites sur la liste rouge à toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 68:
      return {
        opt: [
          "L'utilisation de la chaleur des déchets pour chauffer les logements collectifs de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Extension du réseau de chauffage urbain issu de l'incinération à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant extension du réseau de chauffage urbain issu de l'incinération à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure l'utilisation de la chaleur des déchets pour chauffer les logements collectifs de toulouse.",
        en: "Speaker 1: The debate concerning extension du réseau de chauffage urbain issu de l'incinération à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains l'utilisation de la chaleur des déchets pour chauffer les logements collectifs de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 69:
      return {
        opt: [
          "L'accès gratuit à l'eau potable fraîche pour les promeneurs et sportifs de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de bornes fontaines d'eau potable dans tous les parcs de Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant obligation de bornes fontaines d'eau potable dans tous les parcs de toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure l'accès gratuit à l'eau potable fraîche pour les promeneurs et sportifs de toulouse.",
        en: "Speaker 1: The debate concerning obligation de bornes fontaines d'eau potable dans tous les parcs de toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains l'accès gratuit à l'eau potable fraîche pour les promeneurs et sportifs de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 70:
      return {
        opt: [
          "La mise à disposition d'ateliers partagés pour les jeunes créateurs et artisans de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien à la création de tiers-lieux d'artisanat d'art à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant soutien à la création de tiers-lieux d'artisanat d'art à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure la mise à disposition d'ateliers partagés pour les jeunes créateurs et artisans de toulouse.",
        en: "Speaker 1: The debate concerning soutien à la création de tiers-lieux d'artisanat d'art à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains la mise à disposition d'ateliers partagés pour les jeunes créateurs et artisans de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 71:
      return {
        opt: [
          "L'aménagement de ralentisseurs sécurisés pour protéger les enfants aux abords des classes de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Mise en place de coussins berlinois pour freiner les voitures devant les écoles de Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant mise en place de coussins berlinois pour freiner les voitures devant les écoles de toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure l'aménagement de ralentisseurs sécurisés pour protéger les enfants aux abords des classes de toulouse.",
        en: "Speaker 1: The debate concerning mise en place de coussins berlinois pour freiner les voitures devant les écoles de toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains l'aménagement de ralentisseurs sécurisés pour protéger les enfants aux abords des classes de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 72:
      return {
        opt: [
          "La gratuité totale des bus et tramways pour les étudiants et demandeurs d'emploi de Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Tarification solidaire des transports en commun selon les revenus à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant tarification solidaire des transports en commun selon les revenus à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure la gratuité totale des bus et tramways pour les étudiants et demandeurs d'emploi de nantes.",
        en: "Speaker 1: The debate concerning tarification solidaire des transports en commun selon les revenus à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains la gratuité totale des bus et tramways pour les étudiants et demandeurs d'emploi de nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 73:
      return {
        opt: [
          "L'intervention spécialisée contre les maltraitances et l'abandon d'animaux domestiques à Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'une brigade municipale de protection des animaux à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant création d'une brigade municipale de protection des animaux à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure l'intervention spécialisée contre les maltraitances et l'abandon d'animaux domestiques à nantes.",
        en: "Speaker 1: The debate concerning création d'une brigade municipale de protection des animaux à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains l'intervention spécialisée contre les maltraitances et l'abandon d'animaux domestiques à nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 74:
      return {
        opt: [
          "La restriction temporaire de la combustion du bois non performant pour assainir l'air de Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des feux de cheminée ouverts en période de pic de pollution à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant interdiction des feux de cheminée ouverts en période de pic de pollution à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure la restriction temporaire de la combustion du bois non performant pour assainir l'air de nantes.",
        en: "Speaker 1: The debate concerning interdiction des feux de cheminée ouverts en période de pic de pollution à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains la restriction temporaire de la combustion du bois non performant pour assainir l'air de nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 75:
      return {
        opt: [
          "La surveillance et l'analyse hebdomadaire des eaux pour permettre la nage estivale à Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des zones de baignade naturelle sécurisées sur la rivière à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant développement des zones de baignade naturelle sécurisées sur la rivière à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure la surveillance et l'analyse hebdomadaire des eaux pour permettre la nage estivale à nantes.",
        en: "Speaker 1: The debate concerning développement des zones de baignade naturelle sécurisées sur la rivière à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains la surveillance et l'analyse hebdomadaire des eaux pour permettre la nage estivale à nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 76:
      return {
        opt: [
          "Le recyclage obligatoire des vêtements usagés pour éviter le jet à la poubelle à Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de tri des déchets textiles dans les bornes d'apport volontaire à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant obligation de tri des déchets textiles dans les bornes d'apport volontaire à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure le recyclage obligatoire des vêtements usagés pour éviter le jet à la poubelle à nantes.",
        en: "Speaker 1: The debate concerning obligation de tri des déchets textiles dans les bornes d'apport volontaire à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains le recyclage obligatoire des vêtements usagés pour éviter le jet à la poubelle à nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 77:
      return {
        opt: [
          "Le financement accompagné des projets professionnels des personnes exclues des banques à Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien au micro-crédit pour les créateurs de micro-entreprises locales à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant soutien au micro-crédit pour les créateurs de micro-entreprises locales à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure le financement accompagné des projets professionnels des personnes exclues des banques à nantes.",
        en: "Speaker 1: The debate concerning soutien au micro-crédit pour les créateurs de micro-entreprises locales à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains le financement accompagné des projets professionnels des personnes exclues des banques à nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 78:
      return {
        opt: [
          "L'amélioration de la propreté et du paysage urbain dans le centre historique de Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Installation de conteneurs enterrés pour supprimer les bacs roulants à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant installation de conteneurs enterrés pour supprimer les bacs roulants à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure l'amélioration de la propreté et du paysage urbain dans le centre historique de nantes.",
        en: "Speaker 1: The debate concerning installation de conteneurs enterrés pour supprimer les bacs roulants à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains l'amélioration de la propreté et du paysage urbain dans le centre historique de nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 79:
      return {
        opt: [
          "La co-construction des équipements publics avec la participation active des habitants de Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Organisation de consultations citoyennes obligatoires avant tout grand projet à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?",
        tr: "Locuteur 1: Le débat concernant organisation de consultations citoyennes obligatoires avant tout grand projet à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure la co-construction des équipements publics avec la participation active des habitants de nantes.",
        en: "Speaker 1: The debate concerning organisation de consultations citoyennes obligatoires avant tout grand projet à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains la co-construction des équipements publics avec la participation active des habitants de nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    default:
      return {
        opt: ["Option A", "Option B", "Option C", "Option D"],
        ans: 0,
        title: "Sujet B2",
        text: "Écoutez le document et choisissez la bonne réponse.",
        tr: "Transcription B2",
        en: "B2 Transcript",
        hint: "Conseil B2",
        level: "B2"
      };
  }
}



function getC1C2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  q: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
} {
  switch (sceneIdx % 60) {
    case 0:
      return {
        opt: [
          "La réduction de l'libre arbitre individuel sous l'influence des bulles de filtres algorithmiques",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'impact des algorithmes de prédiction comportementale sur l'autonomie décisionnelle à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à l'impact des algorithmes de prédiction comportementale sur l'autonomie décisionnelle à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la réduction de l'libre arbitre individuel sous l'influence des bulles de filtres algorithmiques.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning l'impact des algorithmes de prédiction comportementale sur l'autonomie décisionnelle à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la réduction de l'libre arbitre individuel sous l'influence des bulles de filtres algorithmiques.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 1:
      return {
        opt: [
          "L'obligation de rapatrier les infrastructures d'hébergement informatique sur le territoire national",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La souveraineté numérique et le stockage des données publiques stratégiques à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à la souveraineté numérique et le stockage des données publiques stratégiques à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'obligation de rapatrier les infrastructures d'hébergement informatique sur le territoire national.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning la souveraineté numérique et le stockage des données publiques stratégiques à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'obligation de rapatrier les infrastructures d'hébergement informatique sur le territoire national.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 2:
      return {
        opt: [
          "Le risque d'effets secondaires irréversibles sur la pluviométrie régionale globale",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'éthique de la géo-ingénierie solaire face au réchauffement climatique à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à l'éthique de la géo-ingénierie solaire face au réchauffement climatique à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le risque d'effets secondaires irréversibles sur la pluviométrie régionale globale.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning l'éthique de la géo-ingénierie solaire face au réchauffement climatique à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le risque d'effets secondaires irréversibles sur la pluviométrie régionale globale.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 3:
      return {
        opt: [
          "La remise en cause du principe du déterminisme absolu au profit d'une approche probabiliste",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Épistémologie des modèles prédictifs complexes en mécanique quantique à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à épistémologie des modèles prédictifs complexes en mécanique quantique à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la remise en cause du principe du déterminisme absolu au profit d'une approche probabiliste.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning épistémologie des modèles prédictifs complexes en mécanique quantique à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la remise en cause du principe du déterminisme absolu au profit d'une approche probabiliste.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 4:
      return {
        opt: [
          "La dépendance fondamentale de la pensée conceptuelle aux structures linguistiques locales",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La déconstruction du concept d'universalité dans la philosophie du langage à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à la déconstruction du concept d'universalité dans la philosophie du langage à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la dépendance fondamentale de la pensée conceptuelle aux structures linguistiques locales.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning la déconstruction du concept d'universalité dans la philosophie du langage à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la dépendance fondamentale de la pensée conceptuelle aux structures linguistiques locales.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 5:
      return {
        opt: [
          "Le risque d'éviction des banques commerciales traditionnelles au profit de la banque centrale",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Macroéconomie monétaire et transition vers les monnaies numériques de banque centrale à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à macroéconomie monétaire et transition vers les monnaies numériques de banque centrale à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le risque d'éviction des banques commerciales traditionnelles au profit de la banque centrale.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning macroéconomie monétaire et transition vers les monnaies numériques de banque centrale à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le risque d'éviction des banques commerciales traditionnelles au profit de la banque centrale.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 6:
      return {
        opt: [
          "L'attribution d'une responsabilité pénale aux concepteurs des logiciels de ciblage",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'évolution des normes juridiques face à l'autonomie des systèmes d'armes à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à l'évolution des normes juridiques face à l'autonomie des systèmes d'armes à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'attribution d'une responsabilité pénale aux concepteurs des logiciels de ciblage.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning l'évolution des normes juridiques face à l'autonomie des systèmes d'armes à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'attribution d'une responsabilité pénale aux concepteurs des logiciels de ciblage.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 7:
      return {
        opt: [
          "La création de sanctuaires marins d'interdiction totale de pêche industrielle",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La préservation de la biodiversité marine dans les zones économiques exclusives à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à la préservation de la biodiversité marine dans les zones économiques exclusives à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la création de sanctuaires marins d'interdiction totale de pêche industrielle.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning la préservation de la biodiversité marine dans les zones économiques exclusives à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la création de sanctuaires marins d'interdiction totale de pêche industrielle.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 8:
      return {
        opt: [
          "La précarisation des statuts professionnels déguisés sous la qualification d'indépendants",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Les mutations sociologiques du travail à l'ère de la plateforme collaborative à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à les mutations sociologiques du travail à l'ère de la plateforme collaborative à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la précarisation des statuts professionnels déguisés sous la qualification d'indépendants.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning les mutations sociologiques du travail à l'ère de la plateforme collaborative à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la précarisation des statuts professionnels déguisés sous la qualification d'indépendants.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 9:
      return {
        opt: [
          "L'impossibilité de réduire l'expérience phénoménale subjective à de simples calculs informatiques",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'aporie de la conscience artificielle dans la philosophie de l'esprit à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à l'aporie de la conscience artificielle dans la philosophie de l'esprit à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'impossibilité de réduire l'expérience phénoménale subjective à de simples calculs informatiques.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning l'aporie de la conscience artificielle dans la philosophie de l'esprit à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'impossibilité de réduire l'expérience phénoménale subjective à de simples calculs informatiques.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 10:
      return {
        opt: [
          "La démonstration que toute observation empirique est pré-orientée par un cadre théorique",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La critique du positivisme logique dans l'histoire des théories scientifiques à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à la critique du positivisme logique dans l'histoire des théories scientifiques à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la démonstration que toute observation empirique est pré-orientée par un cadre théorique.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning la critique du positivisme logique dans l'histoire des théories scientifiques à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la démonstration que toute observation empirique est pré-orientée par un cadre théorique.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 11:
      return {
        opt: [
          "Le risque de paralysie des filières de transition énergétique par goulot d'étranglement mondial",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La géopolitique des terres rares et la dépendance industrielle technologique à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à la géopolitique des terres rares et la dépendance industrielle technologique à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le risque de paralysie des filières de transition énergétique par goulot d'étranglement mondial.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning la géopolitique des terres rares et la dépendance industrielle technologique à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le risque de paralysie des filières de transition énergétique par goulot d'étranglement mondial.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 12:
      return {
        opt: [
          "L'intégration de la ventilation naturelle et du végétal dans la conception architecturale",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'urbanisme bio-climatique et la résilience des métropoles du XXIe siècle à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à l'urbanisme bio-climatique et la résilience des métropoles du xxie siècle à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'intégration de la ventilation naturelle et du végétal dans la conception architecturale.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning l'urbanisme bio-climatique et la résilience des métropoles du xxie siècle à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'intégration de la ventilation naturelle et du végétal dans la conception architecturale.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 13:
      return {
        opt: [
          "Le dépassement du biais partisan par l'institution de jurés citoyens décisionnaires",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Les théories de la démocratie délibérative et les tirages au sort citoyens à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à les théories de la démocratie délibérative et les tirages au sort citoyens à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le dépassement du biais partisan par l'institution de jurés citoyens décisionnaires.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning les théories de la démocratie délibérative et les tirages au sort citoyens à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le dépassement du biais partisan par l'institution de jurés citoyens décisionnaires.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 14:
      return {
        opt: [
          "La stricte distinction entre thérapie génique réparatrice et eugénisme d'amélioration",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La régulation de la génétique médicale et l'édition du génome humain à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à la régulation de la génétique médicale et l'édition du génome humain à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la stricte distinction entre thérapie génique réparatrice et eugénisme d'amélioration.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning la régulation de la génétique médicale et l'édition du génome humain à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la stricte distinction entre thérapie génique réparatrice et eugénisme d'amélioration.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 15:
      return {
        opt: [
          "L'illusion du passage du temps absolu au sein du continuum espace-temps quadridimensionnel",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Ontologie du temps et relativité générale dans la physique contemporaine à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à ontologie du temps et relativité générale dans la physique contemporaine à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'illusion du passage du temps absolu au sein du continuum espace-temps quadridimensionnel.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning ontologie du temps et relativité générale dans la physique contemporaine à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'illusion du passage du temps absolu au sein du continuum espace-temps quadridimensionnel.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 16:
      return {
        opt: [
          "La fragmentation de la narration visant à déstabiliser l'illusion d'une vérité unique",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'esthétique de la déconstruction dans la littérature post-moderne à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à l'esthétique de la déconstruction dans la littérature post-moderne à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la fragmentation de la narration visant à déstabiliser l'illusion d'une vérité unique.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning l'esthétique de la déconstruction dans la littérature post-moderne à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la fragmentation de la narration visant à déstabiliser l'illusion d'une vérité unique.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 17:
      return {
        opt: [
          "La détection d'activités cérébrales prédictives antérieures à la prise de conscience de la décision",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Neurobiologie de la décision et libre arbitre à la lumière de l'imagerie médicale à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à neurobiologie de la décision et libre arbitre à la lumière de l'imagerie médicale à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la détection d'activités cérébrales prédictives antérieures à la prise de conscience de la décision.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning neurobiologie de la décision et libre arbitre à la lumière de l'imagerie médicale à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la détection d'activités cérébrales prédictives antérieures à la prise de conscience de la décision.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 18:
      return {
        opt: [
          "Les tensions interculturelles liées à la revalorisation des espaces agricoles périurbains",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Le renouvellement de la sociologie rurale face aux néo-ruraux à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à le renouvellement de la sociologie rurale face aux néo-ruraux à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur les tensions interculturelles liées à la revalorisation des espaces agricoles périurbains.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning le renouvellement de la sociologie rurale face aux néo-ruraux à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on les tensions interculturelles liées à la revalorisation des espaces agricoles périurbains.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 19:
      return {
        opt: [
          "L'obligation d'expliquer le fonctionnement interne des réseaux de neurones décisionnels",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La transparence algorithmique dans l'attribution des crédits bancaires à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la transparence algorithmique dans l'attribution des crédits bancaires à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'obligation d'expliquer le fonctionnement interne des réseaux de neurones décisionnels.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la transparence algorithmique dans l'attribution des crédits bancaires à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'obligation d'expliquer le fonctionnement interne des réseaux de neurones décisionnels.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 20:
      return {
        opt: [
          "L'imposition d'une taxe carbone globale sur les carburants lourds de la flotte internationale",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La fiscalité environnementale des transports maritimes transocéaniques à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la fiscalité environnementale des transports maritimes transocéaniques à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'imposition d'une taxe carbone globale sur les carburants lourds de la flotte internationale.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la fiscalité environnementale des transports maritimes transocéaniques à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'imposition d'une taxe carbone globale sur les carburants lourds de la flotte internationale.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 21:
      return {
        opt: [
          "La rupture du dilemme du prisonnier par l'instauration de sanctions commerciales réciproques",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie des jeux appliqués aux négociations climatiques mondiales à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la théorie des jeux appliqués aux négociations climatiques mondiales à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la rupture du dilemme du prisonnier par l'instauration de sanctions commerciales réciproques.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la théorie des jeux appliqués aux négociations climatiques mondiales à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la rupture du dilemme du prisonnier par l'instauration de sanctions commerciales réciproques.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 22:
      return {
        opt: [
          "L'ancrage corporel irréductible de toute appréhension subjective du monde environnant",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La phénoménologie de la perception spatiale chez Maurice Merleau-Ponty à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la phénoménologie de la perception spatiale chez maurice merleau-ponty à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'ancrage corporel irréductible de toute appréhension subjective du monde environnant.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la phénoménologie de la perception spatiale chez maurice merleau-ponty à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'ancrage corporel irréductible de toute appréhension subjective du monde environnant.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 23:
      return {
        opt: [
          "L'encadrement des flux financiers non bancaires pour prévenir un risque systémique global",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La régulation prudentielle des systèmes bancaires ombre (Shadow Banking) à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la régulation prudentielle des systèmes bancaires ombre (shadow banking) à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'encadrement des flux financiers non bancaires pour prévenir un risque systémique global.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la régulation prudentielle des systèmes bancaires ombre (shadow banking) à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'encadrement des flux financiers non bancaires pour prévenir un risque systémique global.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 24:
      return {
        opt: [
          "La reconversion des friches en lieux de création artistique et d'innovation sociale",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La patrimonialisation des paysages industriels déclassés à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la patrimonialisation des paysages industriels déclassés à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la reconversion des friches en lieux de création artistique et d'innovation sociale.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la patrimonialisation des paysages industriels déclassés à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la reconversion des friches en lieux de création artistique et d'innovation sociale.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 25:
      return {
        opt: [
          "La démonstration de la viabilité des gestions communautaires sans appropriation privée",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'analyse économique des biens communs selon Elinor Ostrom à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à l'analyse économique des biens communs selon elinor ostrom à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la démonstration de la viabilité des gestions communautaires sans appropriation privée.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning l'analyse économique des biens communs selon elinor ostrom à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la démonstration de la viabilité des gestions communautaires sans appropriation privée.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 26:
      return {
        opt: [
          "La nécessité de séparer étanchément les réseaux opérationnels d'Internet",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La cybersécurité des infrastructures critiques d'approvisionnement en eau à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la cybersécurité des infrastructures critiques d'approvisionnement en eau à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la nécessité de séparer étanchément les réseaux opérationnels d'internet.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la cybersécurité des infrastructures critiques d'approvisionnement en eau à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la nécessité de séparer étanchément les réseaux opérationnels d'internet.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 27:
      return {
        opt: [
          "Le redéploiement de la notion d'identité individuelle face aux prothèses cognitives",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La métaphysique du sujet pensant à l'ère de l'intelligence hybride à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la métaphysique du sujet pensant à l'ère de l'intelligence hybride à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le redéploiement de la notion d'identité individuelle face aux prothèses cognitives.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la métaphysique du sujet pensant à l'ère de l'intelligence hybride à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le redéploiement de la notion d'identité individuelle face aux prothèses cognitives.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 28:
      return {
        opt: [
          "La réduction de la complexité argumentative au profit de slogans émotionnels répétitifs",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La sémiotique du discours politique dans les médias d'information en continu à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la sémiotique du discours politique dans les médias d'information en continu à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la réduction de la complexité argumentative au profit de slogans émotionnels répétitifs.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la sémiotique du discours politique dans les médias d'information en continu à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la réduction de la complexité argumentative au profit de slogans émotionnels répétitifs.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 29:
      return {
        opt: [
          "La succession de longues périodes de stase et d'épisodes de spéciation très rapides",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La dynamique des équilibres ponctués dans la biologie de l'évolution à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la dynamique des équilibres ponctués dans la biologie de l'évolution à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la succession de longues périodes de stase et d'épisodes de spéciation très rapides.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la dynamique des équilibres ponctués dans la biologie de l'évolution à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la succession de longues périodes de stase et d'épisodes de spéciation très rapides.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 30:
      return {
        opt: [
          "Le risque de biais de confirmation dans la publication des résultats cliniques",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'éthique de la recherche scientifique financée par des fonds privés à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à l'éthique de la recherche scientifique financée par des fonds privés à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le risque de biais de confirmation dans la publication des résultats cliniques.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning l'éthique de la recherche scientifique financée par des fonds privés à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le risque de biais de confirmation dans la publication des résultats cliniques.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 31:
      return {
        opt: [
          "L'archivage numérique et l'immersion linguistique scolaire précoce des jeunes enfants",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La préservation des langues autochtones menacées d'extinction à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à la préservation des langues autochtones menacées d'extinction à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'archivage numérique et l'immersion linguistique scolaire précoce des jeunes enfants.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning la préservation des langues autochtones menacées d'extinction à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'archivage numérique et l'immersion linguistique scolaire précoce des jeunes enfants.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 32:
      return {
        opt: [
          "Le déploiement accéléré des corridors de recharge à hydrogène vert",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La transition écologique des flottes de transport de marchandises par camion à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à la transition écologique des flottes de transport de marchandises par camion à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le déploiement accéléré des corridors de recharge à hydrogène vert.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning la transition écologique des flottes de transport de marchandises par camion à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le déploiement accéléré des corridors de recharge à hydrogène vert.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 33:
      return {
        opt: [
          "La tension permanente entre l'intention originelle des rédacteurs et l'interprétation vivante",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'herméneutique des textes juridiques constitutionnels à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à l'herméneutique des textes juridiques constitutionnels à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la tension permanente entre l'intention originelle des rédacteurs et l'interprétation vivante.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning l'herméneutique des textes juridiques constitutionnels à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la tension permanente entre l'intention originelle des rédacteurs et l'interprétation vivante.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 34:
      return {
        opt: [
          "Le rejet de la métaphore de l'esprit comme simple programme d'ordinateur désincarné",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La philosophie des sciences cognitives et l'embodiment (incarnation) à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à la philosophie des sciences cognitives et l'embodiment (incarnation) à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le rejet de la métaphore de l'esprit comme simple programme d'ordinateur désincarné.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning la philosophie des sciences cognitives et l'embodiment (incarnation) à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le rejet de la métaphore de l'esprit comme simple programme d'ordinateur désincarné.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 35:
      return {
        opt: [
          "L'orientation des choix individuels par la modification subtile de l'environnement décisionnel",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'économie comportementale et l'effet Nudge dans la santé publique à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à l'économie comportementale et l'effet nudge dans la santé publique à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'orientation des choix individuels par la modification subtile de l'environnement décisionnel.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning l'économie comportementale et l'effet nudge dans la santé publique à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'orientation des choix individuels par la modification subtile de l'environnement décisionnel.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 36:
      return {
        opt: [
          "Le fossé mesuré entre les intentions écologiques déclarées et les actes d'achat réels",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La sociologie de la consommation responsable et le greenwashing à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à la sociologie de la consommation responsable et le greenwashing à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le fossé mesuré entre les intentions écologiques déclarées et les actes d'achat réels.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning la sociologie de la consommation responsable et le greenwashing à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le fossé mesuré entre les intentions écologiques déclarées et les actes d'achat réels.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 37:
      return {
        opt: [
          "Le déploiement de la fibre optique associé à un accompagnement humain de proximité",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'accessibilité universelle de la culture numérique dans les territoires ruraux à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à l'accessibilité universelle de la culture numérique dans les territoires ruraux à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le déploiement de la fibre optique associé à un accompagnement humain de proximité.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning l'accessibilité universelle de la culture numérique dans les territoires ruraux à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le déploiement de la fibre optique associé à un accompagnement humain de proximité.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 38:
      return {
        opt: [
          "L'invocabilité directe du principe de précaution devant les juridictions administratives",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La protection constitutionnelle du droit à un environnement sain à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à la protection constitutionnelle du droit à un environnement sain à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'invocabilité directe du principe de précaution devant les juridictions administratives.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning la protection constitutionnelle du droit à un environnement sain à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'invocabilité directe du principe de précaution devant les juridictions administratives.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 39:
      return {
        opt: [
          "Le basculement discontinu d'un paradigme dominant vers un nouveau cadre conceptuel",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie des révolutions scientifiques selon Thomas Kuhn à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à la théorie des révolutions scientifiques selon thomas kuhn à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le basculement discontinu d'un paradigme dominant vers un nouveau cadre conceptuel.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning la théorie des révolutions scientifiques selon thomas kuhn à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le basculement discontinu d'un paradigme dominant vers un nouveau cadre conceptuel.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 40:
      return {
        opt: [
          "La structuration inconsciente de nos pensées quotidiennes par des schémas corporels",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'analyse linguistique de la métaphore conceptuelle selon Lakoff et Johnson à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à l'analyse linguistique de la métaphore conceptuelle selon lakoff et johnson à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la structuration inconsciente de nos pensées quotidiennes par des schémas corporels.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning l'analyse linguistique de la métaphore conceptuelle selon lakoff et johnson à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la structuration inconsciente de nos pensées quotidiennes par des schémas corporels.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 41:
      return {
        opt: [
          "La création d'institutions supranationales dotées d'un pouvoir de sanction contraignant",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La gouvernance globale des biens publics mondiaux à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à la gouvernance globale des biens publics mondiaux à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la création d'institutions supranationales dotées d'un pouvoir de sanction contraignant.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning la gouvernance globale des biens publics mondiaux à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la création d'institutions supranationales dotées d'un pouvoir de sanction contraignant.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 42:
      return {
        opt: [
          "La quantification financière de la captation du carbone et de la purification de l'eau",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'évaluation économique des services écosystémiques rendus par la forêt à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à l'évaluation économique des services écosystémiques rendus par la forêt à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la quantification financière de la captation du carbone et de la purification de l'eau.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning l'évaluation économique des services écosystémiques rendus par la forêt à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la quantification financière de la captation du carbone et de la purification de l'eau.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 43:
      return {
        opt: [
          "La relocalisation des cultures céréalières et maraîchères autour des bassins de vie",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La souveraineté alimentaire régionale et la réduction des dépendances d'importation à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à la souveraineté alimentaire régionale et la réduction des dépendances d'importation à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la relocalisation des cultures céréalières et maraîchères autour des bassins de vie.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning la souveraineté alimentaire régionale et la réduction des dépendances d'importation à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la relocalisation des cultures céréalières et maraîchères autour des bassins de vie.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 44:
      return {
        opt: [
          "Le renforcement du statut d'immunité pénale et la prise en charge des frais de justice",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La protection des lanceurs d'alerte dans les affaires de corruption industrielle à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à la protection des lanceurs d'alerte dans les affaires de corruption industrielle à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le renforcement du statut d'immunité pénale et la prise en charge des frais de justice.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning la protection des lanceurs d'alerte dans les affaires de corruption industrielle à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le renforcement du statut d'immunité pénale et la prise en charge des frais de justice.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 45:
      return {
        opt: [
          "La mise en évidence de la fabrication sociale des faits scientifiques en laboratoire",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'épistémologie du constructivisme social en sociologie des sciences à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à l'épistémologie du constructivisme social en sociologie des sciences à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la mise en évidence de la fabrication sociale des faits scientifiques en laboratoire.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning l'épistémologie du constructivisme social en sociologie des sciences à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la mise en évidence de la fabrication sociale des faits scientifiques en laboratoire.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 46:
      return {
        opt: [
          "La formalisation mathématique des notions de possibilité, de nécessité et de contingence",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La logique modale et la philosophie du langage formel à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à la logique modale et la philosophie du langage formel à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la formalisation mathématique des notions de possibilité, de nécessité et de contingence.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning la logique modale et la philosophie du langage formel à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la formalisation mathématique des notions de possibilité, de nécessité et de contingence.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 47:
      return {
        opt: [
          "L'instabilité intrinsèque des périodes de prospérité générant des bulles d'endettement",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie des cycles financiers longs d'Hyman Minsky à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à la théorie des cycles financiers longs d'hyman minsky à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'instabilité intrinsèque des périodes de prospérité générant des bulles d'endettement.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning la théorie des cycles financiers longs d'hyman minsky à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'instabilité intrinsèque des périodes de prospérité générant des bulles d'endettement.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 48:
      return {
        opt: [
          "La création de déserts administratifs pour les populations éloignées des outils numériques",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'impact de la numérisation des services publics sur la précarité administrative à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à l'impact de la numérisation des services publics sur la précarité administrative à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la création de déserts administratifs pour les populations éloignées des outils numériques.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning l'impact de la numérisation des services publics sur la précarité administrative à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la création de déserts administratifs pour les populations éloignées des outils numériques.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 49:
      return {
        opt: [
          "Le démontage et le recyclage systématique des métaux rares des avions en fin de vie",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La valorisation de l'économie circulaire dans l'industrie aéronautique à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la valorisation de l'économie circulaire dans l'industrie aéronautique à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le démontage et le recyclage systématique des métaux rares des avions en fin de vie.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la valorisation de l'économie circulaire dans l'industrie aéronautique à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le démontage et le recyclage systématique des métaux rares des avions en fin de vie.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 50:
      return {
        opt: [
          "La priorité absolue accordée à l'eau potable au détriment des loisirs et de l'irrigation",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La gestion économe de la ressource en eau en période de sécheresse sévère à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la gestion économe de la ressource en eau en période de sécheresse sévère à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la priorité absolue accordée à l'eau potable au détriment des loisirs et de l'irrigation.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la gestion économe de la ressource en eau en période de sécheresse sévère à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la priorité absolue accordée à l'eau potable au détriment des loisirs et de l'irrigation.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 51:
      return {
        opt: [
          "La dénonciation de la soumission de la raison humaine à la seule logique de rendement technologique",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie critique de l'École de Francfort et la rationalité instrumentale à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la théorie critique de l'école de francfort et la rationalité instrumentale à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la dénonciation de la soumission de la raison humaine à la seule logique de rendement technologique.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la théorie critique de l'école de francfort et la rationalité instrumentale à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la dénonciation de la soumission de la raison humaine à la seule logique de rendement technologique.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 52:
      return {
        opt: [
          "La preuve expérimentale de la non-localité fondamentale de l'univers physique",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La physique quantique et l'intrication à grande distance à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la physique quantique et l'intrication à grande distance à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la preuve expérimentale de la non-localité fondamentale de l'univers physique.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la physique quantique et l'intrication à grande distance à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la preuve expérimentale de la non-localité fondamentale de l'univers physique.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 53:
      return {
        opt: [
          "La maximisation de la situation des membres les plus désavantagés de la société",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La philosophie politique de la justice distributive selon John Rawls à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la philosophie politique de la justice distributive selon john rawls à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la maximisation de la situation des membres les plus désavantagés de la société.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la philosophie politique de la justice distributive selon john rawls à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la maximisation de la situation des membres les plus désavantagés de la société.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 54:
      return {
        opt: [
          "La transformation des anciens hangars en espaces culturels et scientifiques intégrés",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La réhabilitation du patrimoine maritime et fluvial portuaire à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à la réhabilitation du patrimoine maritime et fluvial portuaire à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la transformation des anciens hangars en espaces culturels et scientifiques intégrés.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning la réhabilitation du patrimoine maritime et fluvial portuaire à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la transformation des anciens hangars en espaces culturels et scientifiques intégrés.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 55:
      return {
        opt: [
          "L'intégration de clauses sociales contraignantes dans tous les marchés de la ville",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La promotion de l'économie sociale et solidaire dans la commande publique à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à la promotion de l'économie sociale et solidaire dans la commande publique à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'intégration de clauses sociales contraignantes dans tous les marchés de la ville.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning la promotion de l'économie sociale et solidaire dans la commande publique à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'intégration de clauses sociales contraignantes dans tous les marchés de la ville.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 56:
      return {
        opt: [
          "Le ralentissement naturel des crues par la réhumidification des marais et vallées",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La prévention des risques d'inondation par la restauration des zones humides à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à la prévention des risques d'inondation par la restauration des zones humides à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le ralentissement naturel des crues par la réhumidification des marais et vallées.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning la prévention des risques d'inondation par la restauration des zones humides à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le ralentissement naturel des crues par la réhumidification des marais et vallées.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 57:
      return {
        opt: [
          "La reconnaissance d'autres modes de relation au vivant non centrés sur l'exceptionnalisme humain",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'anthropologie de la nature et le dépassement du dualisme nature/culture selon Philippe Descola à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à l'anthropologie de la nature et le dépassement du dualisme nature/culture selon philippe descola à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la reconnaissance d'autres modes de relation au vivant non centrés sur l'exceptionnalisme humain.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning l'anthropologie de la nature et le dépassement du dualisme nature/culture selon philippe descola à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la reconnaissance d'autres modes de relation au vivant non centrés sur l'exceptionnalisme humain.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 58:
      return {
        opt: [
          "L'émergence de propriétés globales imprévisibles à partir d'interactions locales simples",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie des systèmes complexes auto-organisés en écologie globale à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à la théorie des systèmes complexes auto-organisés en écologie globale à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'émergence de propriétés globales imprévisibles à partir d'interactions locales simples.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning la théorie des systèmes complexes auto-organisés en écologie globale à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'émergence de propriétés globales imprévisibles à partir d'interactions locales simples.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 59:
      return {
        opt: [
          "L'impératif catégorique de préserver l'existence d'une vie humaine authentique sur Terre",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'éthique de la responsabilité pour les générations futures selon Hans Jonas à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à l'éthique de la responsabilité pour les générations futures selon hans jonas à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'impératif catégorique de préserver l'existence d'une vie humaine authentique sur terre.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning l'éthique de la responsabilité pour les générations futures selon hans jonas à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'impératif catégorique de préserver l'existence d'une vie humaine authentique sur terre.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    default:
      return {
        opt: ["Option A", "Option B", "Option C", "Option D"],
        ans: 0,
        title: "Conférence C1-C2",
        text: "Écoutez l'exposé et choisissez la bonne réponse.",
        tr: "Transcription C1-C2",
        en: "C1-C2 Transcript",
        hint: "Conseil C1-C2",
        level: "C1"
      };
  }
}


function shuffleOptions(
  options: string[],
  correctIndex: number,
  seed: number = 0,
  optionImages?: string[]
): { options: string[]; correctIndex: number; correctText: string; optionImages?: string[] } {
  const originalCorrectText = options[correctIndex] || options[0] || "";
  const indexed = options.map((opt, idx) => ({ opt, isCorrect: idx === correctIndex, img: optionImages?.[idx] }));

  // Deterministic pseudo-random shuffle based on seed
  for (let i = indexed.length - 1; i > 0; i--) {
    const pseudoRandom = Math.abs(Math.sin(seed + i * 997) * 10000);
    const j = Math.floor((pseudoRandom - Math.floor(pseudoRandom)) * (i + 1));
    const temp = indexed[i];
    indexed[i] = indexed[j];
    indexed[j] = temp;
  }

  const shuffledOptions = indexed.map((item) => item.opt);
  const newCorrectIndex = indexed.findIndex((item) => item.isCorrect);
  const shuffledImages = optionImages ? indexed.map((item) => item.img || "") : undefined;

  return {
    options: shuffledOptions,
    correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0,
    correctText: originalCorrectText,
    optionImages: shuffledImages
  };
}

export function translateOptionToEnglish(opt: string): string {
  if (!opt) return "";
  const trimmed = opt.trim();

  const dict: Record<string, string> = {
  "Des voyageurs attendent l'arrivée du train sur le quai.": "Passengers are waiting for the train to arrive on the platform.",
  "Des clients boivent un café à la terrasse d'un bistrot.": "Customers are drinking coffee on a bistro terrace.",
  "Un homme fait des achats dans un supermarché.": "A man is shopping in a supermarket.",
  "Des promeneurs marchent dans un parc enneigé.": "Walkers are walking in a snowy park.",
  "Une personne commande un plat au restaurant.": "A person is ordering a dish at a restaurant.",
  "Un client s'adresse au réceptionniste à l'accueil de l'hôtel.": "A customer is speaking with the receptionist at the hotel front desk.",
  "Un passager monte dans un taxi devant la gare.": "A passenger is getting into a taxi in front of the station.",
  "Une femme achète un billet au guichet du cinéma.": "A woman is buying a ticket at the cinema box office.",
  "Un mécanicien répare une voiture au garage.": "A mechanic is repairing a car in a garage.",
  "Un médecin examine un patient dans son cabinet.": "A doctor is examining a patient in a medical office.",
  "Une cliente achète du pain et des viennoiseries à la boulangerie.": "A customer is buying bread and pastries at the bakery.",
  "Un jardinier taille des arbres dans un jardin public.": "A gardener is trimming trees in a public park.",
  "Les passagers s'installent dans une salle d'embarquement à l'aéroport.": "Passengers are sitting in an airport boarding lounge.",
  "Des skieurs descendent une piste enneigée en montagne.": "Skiers are going down a snowy slope in the mountains.",
  "Des étudiants travaillent au calme dans une bibliothèque.": "Students are working quietly in a library.",
  "Un facteur dépose des lettres dans une boîte aux lettres.": "A mail carrier is depositing letters into a mailbox.",
  "Des cyclistes roulent sur une piste cyclable.": "Cyclists are riding on a bicycle path.",
  "Une personne achète un titre de transport à un distributeur automatique du métro.": "A person is purchasing a transit ticket at an automated metro ticket machine.",
  "Un serveur apporte des boissons sur un plateau.": "A waiter is bringing drinks on a tray.",
  "Des enfants jouent sur un terrain de football.": "Children are playing on a soccer field.",
  "Un client demande un renseignement dans une banque.": "A customer is asking for information at a bank.",
  "Un peintre réalise un tableau dans un atelier.": "A painter is creating a painting in an art studio.",
  "Un patient est en consultation chez le médecin.": "A patient is in consultation at the doctor's office.",
  "Un cuisinier prépare un repas dans une cuisine.": "A cook is preparing a meal in a kitchen.",
  "Des clients sont installés à la terrasse d'un café.": "Customers are seated at the terrace of an outdoor café.",
  "Des voyageurs attendent leur vol dans un aéroport.": "Travelers are waiting for their flight at an airport.",
  "Un mécanicien vérifie le niveau d'huile d'un véhicule.": "A mechanic is checking the oil level of a vehicle.",
  "Une personne dépose son sac à la consigne automatique.": "A person is leaving their bag at an automated luggage locker.",
  "Des randonneurs marchent le long d'une rivière.": "Hikers are walking along a river.",
  "Des personnes attendent l'arrivée du bus à un arrêt en ville.": "People are waiting for the bus to arrive at a city bus stop.",
  "Un homme répare son vélo sur le trottoir.": "A man is repairing his bicycle on the sidewalk.",
  "Des clients font la queue devant un guichet de théâtre.": "Customers are lining up in front of a theater ticket booth.",
  "Un voyageur enregistre ses bagages à l'aéroport.": "A traveler is checking in luggage at the airport.",
  "Une femme choisit des fruits et légumes au supermarché.": "A woman is choosing fruits and vegetables in a supermarket.",
  "Un coiffeur coupe les cheveux d'un client dans un salon.": "A hairdresser is cutting a customer's hair in a salon.",
  "Des nageurs se baignent dans une piscine municipale.": "Swimmers are swimming in a municipal pool.",
  "Un policier dirige la circulation à un carrefour.": "A police officer is directing traffic at an intersection.",
  "Des personnes lisent et étudient silencieusement dans une bibliothèque.": "People are reading and studying quietly in a library.",
  "Un chauffeur livre des colis à un domicile.": "A driver is delivering packages to a residence.",
  "Des musiciens jouent du piano lors d'un concert.": "Musicians are playing piano during a concert.",
  "Un mécanicien inspecte le moteur d'une voiture dans un garage.": "A mechanic is inspecting a car engine in a repair garage.",
  "Un serveur essuie les tables d'un restaurant.": "A waiter is wiping tables at a restaurant.",
  "Des touristes prennent des photos devant un monument historique.": "Tourists are taking photos in front of a historic monument.",
  "Un barbier taille la barbe d'un client.": "A barber is trimming a client's beard.",
  "Un boulanger prépare des tartes aux pommes.": "A baker is preparing apple pies.",
  "Une personne achète des médicaments au comptoir d'une pharmacie.": "A person is buying medications at a pharmacy counter.",
  "Un photographe prend un portrait en studio.": "A photographer is taking a portrait in a studio.",
  "Des athlètes s'entraînent sur une piste de course.": "Athletes are training on a running track.",
  "Un homme envoie un colis recommandé au guichet de la poste.": "A man is sending a registered parcel at the post office counter.",
  "Un marin pilote un bateau sur le fleuve.": "A sailor is piloting a boat on the river.",
  "Une couturière coud un vêtement dans son atelier.": "A seamstress is sewing a garment in her workshop.",
  "Des spectateurs applaudissent à la fin d'un film.": "Spectators are applauding at the end of a movie.",
  "Un serveur prend la commande d'une table en terrasse.": "A waiter is taking an order at an outdoor table.",
  "Un mécanicien change les pneus d'un camion.": "A mechanic is changing the tires of a truck.",
  "Une cliente essaie un manteau dans un magasin de vêtements.": "A customer is trying on a coat in a clothing store.",
  "Un professeur donne un cours devant un tableau vert.": "A teacher is giving a lesson in front of a chalkboard.",
  "Des voyageurs mangent dans le wagon-restaurant d'un train.": "Travelers are eating in the dining car of a train.",
  "Des enfants font du vélo dans la cour de récréation.": "Children are riding bikes in the schoolyard.",
  "Un fermier nourrit des animaux dans une ferme.": "A farmer is feeding animals on a farm.",
  "Un dentiste soigne les dents d'un enfant.": "A dentist is treating a child's teeth.",
  "Un pompier éteint un feu de forêt.": "A firefighter is extinguishing a forest fire.",
  "Des passagers récupèrent leurs bagages sur le tapis roulant à l'aéroport.": "Passengers are retrieving their luggage from the baggage carousel at the airport.",
  "Un jardinier plante des fleurs dans une serre.": "A gardener is planting flowers in a greenhouse.",
  "Un guide explique l'histoire d'un château.": "A tour guide is explaining the history of a castle.",
  "Une cliente se fait coiffer dans un salon de coiffure.": "A client is getting her hair styled in a hair salon.",
  "Un livreur transporte des cartons dans un monte-charge.": "A delivery person is transporting boxes in a freight elevator.",
  "Un garde surveille les œuvres d'un musée.": "A security guard is watching over artwork in a museum.",
  "Un ingénieur travaille devant son ordinateur de bureau.": "An engineer is working at a desktop computer.",
  "Un conducteur fait le plein de carburant à une station-service.": "A driver is filling up fuel at a gas station.",
  "Un serveur sert des tasses de thé dans un salon.": "A server is serving cups of tea in a lounge.",
  "Des randonneurs montent vers le sommet d'une colline.": "Hikers are climbing toward a hilltop summit.",
  "Un horloger répare un réveil mécanique.": "A watchmaker is repairing a mechanical alarm clock.",
  "Un policier vérifie les papiers d'un chauffeur.": "A police officer is checking a driver's documents.",
  "Deux personnes discutent assises sur un banc dans un parc public.": "Two people are chatting while sitting on a bench in a public park.",
  "Un cuisinier découpe de la viande en cuisine.": "A chef is slicing meat in a kitchen.",
  "Des étudiants écoutent une conférence à l'université.": "Students are listening to a lecture at the university.",
  "Un client effectue un dépôt d'argent au guichet d'une banque.": "A customer is making a cash deposit at a bank teller counter.",
  "Une fleuriste arrose des bouquets de roses.": "A florist is watering rose bouquets.",
  "Un mécanicien remplace une batterie de voiture.": "A mechanic is replacing a car battery.",
  "Des spectateurs assistent à une pièce de théâtre.": "Spectators are attending a theater play.",
  "Une fleuriste compose un bouquet de fleurs fraîches dans sa boutique.": "A florist is arranging a bouquet of fresh flowers in her shop.",
  "Un menuisier rabote une planche de chêne.": "A carpenter is planing an oak board.",
  "Un électricien installe un plafonnier dans un salon.": "An electrician is installing a ceiling light in a living room.",
  "Un passager valide son ticket de tramway.": "A passenger is validating a tram ticket.",
  "Un client essaie une paire de chaussures dans un magasin.": "A customer is trying on a pair of shoes in a store.",
  "Un boulanger enfourne des baguettes au four.": "A baker is putting baguettes into the oven.",
  "Un serveur nettoie le comptoir d'un bar.": "A bartender is cleaning the bar counter.",
  "Des enfants font de la balançoire dans un parc.": "Children are swinging on swings in a park.",
  "Des personnes font du sport et s'entraînent dans une salle de gym.": "People are exercising and working out in a gym.",
  "Un facteur trie le courrier dans un centre postal.": "A postal worker is sorting mail in a postal center.",
  "Un cuisinier goûte une soupe dans une marmite.": "A chef is tasting soup from a pot.",
  "Un chauffeur attend à un feu de signalisation.": "A driver is waiting at a traffic light.",
  "Des spectateurs achètent leurs billets au guichet d'un cinéma.": "Moviegoers are buying tickets at a cinema box office.",
  "Un pompiste nettoie le pare-brise d'une automobile.": "A gas station attendant is cleaning a car windshield.",
  "Un étudiant emprunte un manuel à la bibliothèque.": "A student is borrowing a textbook from the library.",
  "Une femme paie son ticket de parking à la borne.": "A woman is paying for her parking ticket at the machine.",
  "Des passagers montent à bord d'un taxi à une station en ville.": "Passengers are boarding a taxi at a downtown taxi stand.",
  "Des jardiniers arrosent les fleurs d'un jardin public.": "Gardeners are watering flowers in a public park.",
  "Un maître-nageur surveille une plage surveillée.": "A lifeguard is watching over a designated beach.",
  "Un chauffeur charge du fret dans une camionnette.": "A driver is loading cargo into a delivery van.",
  "Un client parcourt des ouvrages sur les étagères d'une librairie.": "A customer is browsing books on the shelves of a bookstore.",
  "Un charpentier fabrique un meuble en bois.": "A carpenter is building wooden furniture.",
  "Un arbitre siffle une faute pendant un match.": "A referee is blowing the whistle during a game.",
  "Un contrôleur vérifie les billets dans le train.": "A conductor is checking tickets on the train.",
  "Un client choisit une monture de lunettes chez un opticien.": "A customer is selecting eyeglass frames at an optical store.",
  "Des visiteurs admirent des tableaux accrochés dans une galerie de musée.": "Visitors are admiring paintings hanging in an art museum gallery.",
  "Un cuisinier dresse des assiettes pour le service du soir.": "A chef is plating meals for evening service.",
  "Une infirmière prend la tension artérielle d'un patient.": "A nurse is taking a patient's blood pressure.",
  "Des touristes photographient une sculpture dans un monument.": "Tourists are photographing a sculpture in a monument.",
  "Un horloger règle les aiguilles d'une montre de collection.": "A watchmaker is adjusting the hands of a vintage watch.",
  "Un jardinier ramasse les feuilles mortes avec un râteau.": "A gardener is raking dead leaves with a rake.",
  "Des clients achètent des glaces auprès d'un marchand ambulant.": "Customers are buying ice cream from a street vendor.",
  "Un réparateur change l'écran cassé d'un téléphone.": "A repair technician is replacing a cracked phone screen.",
  "Un photographe animalier observe des oiseaux dans les marais.": "A wildlife photographer is observing birds in the wetlands.",
  "Une caissière scanne des articles sur un tapis roulant.": "A cashier is scanning items on a checkout conveyor belt.",
  "Des consommateurs achètent des fruits frais sur un marché en plein air.": "Consumers are purchasing fresh fruits at an outdoor market.",
  "Un cycliste gonfle les roues de son vélo de course.": "A cyclist is pumping the tires of a racing bicycle.",
  "Un serveur prend la commande d'une table en salle.": "A server is taking an order from a dining room table.",
  "Des ouvriers peignent des lignes blanches sur la chaussée.": "Workers are painting white lines on the roadway.",
  "Un usager demande un itinéraire au guichet d'information de la gare.": "A traveler is requesting route directions at the station information desk.",
  "Un pharmacien explique le dosage d'un traitement à un patient.": "A pharmacist is explaining medication dosage to a patient.",
  "Un paysagiste plante des arbustes le long d'une allée piétonne.": "A landscaper is planting shrubs along a pedestrian walkway.",
  "Des skieurs prennent le télésiège vers le sommet de la montagne.": "Skiers are taking the chairlift toward the mountain summit.",
  "Une personne lave son linge dans une laverie automatique.": "A person is washing laundry in a self-service laundromat.",
  "Un boulanger pétrit de la pâte à pain dans un pétrin.": "A baker is kneading bread dough in a mixer.",
  "Un chauffeur de bus attend les passagers à un terminus.": "A bus driver is waiting for passengers at a terminal stop.",
  "Un mécanicien teste les amortisseurs d'une berline.": "A mechanic is testing the shock absorbers of a sedan.",
  "Un client regarde des bijoux exposés dans la vitrine d'une bijouterie.": "A customer is looking at jewelry displayed in a jewelry store showcase.",
  "Un chef d'orchestre dirige des musiciens lors d'une répétition.": "A conductor is leading musicians during a rehearsal.",
  "Un agriculteur moissonne un champ de blé au coucher du soleil.": "A farmer is harvesting a wheat field at sunset.",
  "Des enfants nourrissent des canards au bord d'un étang.": "Children are feeding ducks at the edge of a pond.",
  "Un serveur prépare un sandwich derrière le comptoir d'une cafétéria.": "A server is preparing a sandwich behind a cafeteria food counter.",
  "Un livreur vérifie l'adresse de livraison sur son smartphone.": "A courier is checking the delivery address on a smartphone.",
  "Une bibliothécaire range des dictionnaires sur une étagère haute.": "A librarian is shelving dictionaries on a top shelf.",
  "Un technicien remplace une ampoule sur un lampadaire de rue.": "A technician is replacing a bulb on a street lamp.",
  "Un bricoleur choisit des outils dans un magasin de bricolage.": "A handyman is selecting tools in a hardware home-improvement store.",
  "Un poissonnier dispose des poissons frais sur un lit de glace.": "A fishmonger is arranging fresh fish on a bed of ice.",
  "Un agent de sécurité contrôle les sacs à l'entrée d'un salon.": "A security guard is checking bags at the entrance of a convention.",
  "Un professeur anime un débat entre étudiants dans une salle de cours.": "A professor is moderating a student debate in a classroom.",
  "Des skieurs s'équipent au pied des pistes enneigées d'une station.": "Skiers are gearing up at the base of snowy slopes in a ski resort.",
  "Un pompier inspecte une borne d'incendie dans une ruelle.": "A firefighter is inspecting a fire hydrant in an alley.",
  "Une caissière rend la monnaie à un client dans une librairie.": "A cashier is handing change back to a customer in a bookstore.",
  "Un barista prépare un café espresso avec une machine professionnelle.": "A barista is brewing an espresso with a professional espresso machine.",
  "Des étudiants écoutent attentivement un cours dans un grand amphithéâtre.": "Students are attentively listening to a lecture in a large amphitheater hall.",
  "Un fleuriste taille les tiges de fleurs pour un mariage.": "A florist is trimming flower stems for a wedding.",
  "Un maçon pose des briques pour construire un muret.": "A bricklayer is laying bricks to build a low wall.",
  "Des coureurs s'échauffent sur la ligne de départ d'un marathon.": "Runners are warming up on the starting line of a marathon.",
  "Un vétérinaire osculte un chat sur une table d'examen.": "A veterinarian is examining a cat on an examination table.",
  "Un guide touristique fait visiter les ruines d'un château médiéval.": "A tour guide is leading a tour of medieval castle ruins.",
  "Un employé de voirie balaie les feuilles mortes sur le trottoir.": "A sanitation worker is sweeping dead leaves on the sidewalk.",
  "Des passagers montent à bord d'un ferry au port.": "Passengers are boarding a ferry at the harbor.",
  "Un musicien essaie une guitare dans un magasin d'instruments.": "A musician is trying out a guitar in a musical instruments store.",
  "Un sommelier conseille un client sur le choix d'un vin.": "A sommelier is advising a customer on wine selection.",
  "Un photographe fait des réglages sur son trépied.": "A photographer is adjusting settings on a camera tripod.",
  "Des bénévoles distribuent des repas chauds dans un refuge.": "Volunteers are distributing hot meals in a shelter.",
  "Un automobiliste paie son stationnement à un horodateur dans la rue.": "A driver is paying for parking at a curbside parking meter.",
  "Un coiffeur peigne les cheveux d'un enfant assis sur un siège haut.": "A hairdresser is combing a child's hair sitting in a booster chair.",
  "Un menuisier vernit une table en bois massif dans son atelier.": "A woodworker is varnishing a solid wood table in a workshop.",
  "Des enfants dessinent à la craie sur le sol de la cour.": "Children are drawing with chalk on the schoolyard ground.",
  "Un mécanicien nettoie le pare-brise d'une automobile.": "A mechanic is cleaning the windshield of an automobile.",
  "Un violoniste répète son morceau de musique.": "A violinist is rehearsing a musical piece.",
  "Un chauffeur de bus valide les tickets des voyageurs.": "A bus driver is validating passengers' tickets.",
  "Un électricien répare un tableau électrique.": "An electrician is repairing an electrical panel.",
  "Un serveur verse du vin dans des verres.": "A server is pouring wine into glasses.",
  "Un pêcheur attrape un poisson sur un lac.": "A fisherman is catching a fish on a lake.",
  "Un boulanger périt la pâte à pain.": "A baker is kneading bread dough.",
  "Un boulanger pétrit la pâte à pain.": "A baker is kneading bread dough.",
  "Un serveur prépare des cafés au comptoir.": "A server is making coffee at the counter.",
  "Un facteur livre un paquet dans un immeuble.": "A mail carrier is delivering a package in an apartment building.",
  "Un mécanicien vérifie les freins d'une motocyclette.": "A mechanic is checking motorcycle brakes.",
  "Un serveur sert des desserts dans un salon de thé.": "A server is serving desserts in a tea room.",
  "Un couturier dessine le patron d'une robe.": "A dressmaker is drawing a dress pattern.",
  "Un ouvrier manœuvre une grue sur un chantier.": "A construction worker is operating a crane on a job site.",
  "Un boulanger enfourne des tartes aux cerises.": "A baker is putting cherry pies into the oven.",
  "Un mécanicien fait la vidange d'un moteur.": "A mechanic is changing engine oil.",
  "Un journaliste interviewe un passant dans la rue.": "A journalist is interviewing a passerby in the street.",
  "Un serveur apporte l'addition aux clients en salle.": "A server is bringing the bill to dining room customers.",
  "Un technicien répare une ligne téléphonique.": "A technician is repairing a telephone line.",
  "Un guichetier vend des billets de loterie dans un kiosque.": "A ticket clerk is selling lottery tickets in a kiosk.",
  "Un photographe ajuste son objectif d'appareil photo.": "A photographer is adjusting the camera lens.",
  "Un facteur distribue le courrier dans les boîtes.": "A mail carrier is delivering mail into mailboxes.",
  "Un serveur essuie le comptoir en fin de journée.": "A server is wiping the counter at the end of the day.",
  "Un barbier rase le visage d'un client au rasoir.": "A barber is shaving a client's face with a razor.",
  "Un conducteur paie au péage d'une autoroute.": "A driver is paying at a highway toll booth.",
  "Un mécanicien contrôle la pression des pneus d'une berline.": "A mechanic is checking sedan tire pressure.",
  "Un marin nettoie le pont d'un navire de pêche.": "A sailor is cleaning the deck of a fishing vessel.",
  "Un cuisinier fait revenir des légumes dans une poêle.": "A cook is sautéing vegetables in a skillet.",
  "Un serveur débarrasse les assiettes d'une table.": "A server is clearing plates from a table."
  };

  if (dict[trimmed]) return dict[trimmed];

  // Try matching without trailing punctuation
  const cleanKey = trimmed.replace(/[.]+$/, "").trim();
  for (const [k, v] of Object.entries(dict)) {
    if (k.replace(/[.]+$/, "").trim() === cleanKey) {
      return v;
    }
  }

  // Common spoken option templates (Q5-Q8)
  if (/^l'augmentation des tarifs/i.test(trimmed)) return "An increase in rates";
  if (/^la fermeture/i.test(trimmed)) return "The closure of the facility";
  if (/^une promotion/i.test(trimmed)) return "A special store promotion";
  if (/^des travaux/i.test(trimmed)) return "Renovation and maintenance work";
  if (/^un retard/i.test(trimmed)) return "A transportation delay";

  return trimmed;
}

export function ensureInterrogativeQuestion(qNum: number, t: any): string {
  if (t.q && typeof t.q === "string" && t.q.trim().endsWith("?")) {
    return t.q.trim();
  }

  const title = (t.title || "").toLowerCase();

  // A1/A2 (Q1 - Q15)
  if (qNum <= 15) {
    if (title.includes("gare") || title.includes("train")) return "Quelle information importante est annoncée aux voyageurs ?";
    if (title.includes("commerce") || title.includes("boulangerie") || title.includes("magasin")) return "Quelle offre spéciale est proposée aux clients ?";
    if (title.includes("météo")) return "Quelles sont les prévisions météorologiques annoncées ?";
    if (title.includes("hôtel") || title.includes("restaurant")) return "Quelle est la consigne communiquée aux clients ?";
    if (title.includes("voicemail") || title.includes("message") || title.includes("secrétariat")) return "Pourquoi la personne laisse-t-elle ce message téléphonique ?";
    if (title.includes("garage") || title.includes("auto") || title.includes("mécanique")) return "Quelle est la raison de l'appel du garage automobile ?";
    if (title.includes("salon") || title.includes("coiffure")) return "Pour quel motif le salon de coiffure contacte-t-il le client ?";
    if (title.includes("bibliothèque")) return "Quelle information est transmise par la bibliothèque municipale ?";
    if (title.includes("livraison") || title.includes("colis") || title.includes("relais")) return "Où le destinataire doit-il récupérer son colis ?";
    if (title.includes("médecin") || title.includes("santé") || title.includes("cabinet")) return "Quelle recommandation est donnée par le médecin ?";
    return "Quel est le sujet principal de ce message sonore ?";
  }

  // B1 (Q16 - Q25)
  if (qNum <= 25) {
    if (title.includes("écologie") || title.includes("piste") || title.includes("sondage")) return "Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?";
    if (title.includes("travail") || title.includes("semaine") || title.includes("société")) return "Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?";
    if (title.includes("culture") || title.includes("festival") || title.includes("musique")) return "Quel est l'objectif principal de cet événement culturel ?";
    if (title.includes("consommation") || title.includes("vrac")) return "Quel avantage principal présente cette nouvelle habitude d'achat ?";
    if (title.includes("transport") || title.includes("tarif")) return "Changement majeur annoncé pour le réseau de transport public ?";
    if (title.includes("santé") || title.includes("prévention")) return "Quel conseil est préconisé par les spécialistes de santé ?";
    if (title.includes("logement") || title.includes("immobilier")) return "Quelle est la tendance observée sur le marché immobilier local ?";
    if (title.includes("technologie") || title.includes("numérique")) return "Quel est l'impact principal décrit dans ce reportage ?";
    return "Quel est l'objectif ou le message central de ce document sonore ?";
  }

  // B2 (Q26 - Q33)
  if (qNum <= 33) {
    if (title.includes("débat") || title.includes("société") || title.includes("livreur")) return "Quel est le principal point de désaccord abordé dans ce débat ?";
    if (title.includes("économie") || title.includes("entreprise") || title.includes("capteur")) return "Quelle analyse économique ou technique est présentée par l'intervenant ?";
    if (title.includes("éducation") || title.includes("université")) return "Quelle réforme éducative est préconisée dans cette intervention ?";
    if (title.includes("environnement") || title.includes("climat")) return "Quel enjeu environnemental majeur est mis en avant ?";
    return "Quelle idée essentielle le locuteur cherche-t-il à démontrer ?";
  }

  // C1/C2 (Q34 - Q39)
  if (title.includes("quantique") || title.includes("cryptographie")) return "Selon le conférencier, quel est le défi technique majeur de cette nouvelle technologie ?";
  if (title.includes("crispr") || title.includes("bioéthique")) return "Quelle exigence éthique la communauté scientifique internationale met-elle en avant ?";
  if (title.includes("neuroplasticité") || title.includes("langue")) return "De quel facteur dépend principalement l'apprentissage tardif d'une seconde langue ?";
  if (title.includes("gentrification") || title.includes("urbain")) return "Quelle conséquence sociale le sociologue associe-t-il à ce phénomène de réhabilitation ?";
  if (title.includes("nudge") || title.includes("comportemental")) return "Par quel moyen la théorie de l'incitation douce cherche-t-elle à orienter les choix citoyens ?";
  if (title.includes("épistémologie") || title.includes("algorithme")) return "Quel risque majeur l'intervenant identifie-t-il dans la délibération citoyenne contemporaine ?";
  if (title.includes("art") || title.includes("intelligence artificielle")) return "En quoi l'émergence des œuvres générées par IA remet-elle en cause le concept traditionnel d'art ?";

  return "Quelle est la thèse centrale développée par le conférencier ?";
}

export function generateListeningQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  const usedIndices = new Set<number>();

  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingIndices: number[] = [];

    LISTENING_TOPICS.forEach((t, idx) => {
      if (t.level === targetLevel || (targetLevel === "C2" && t.level === "C1")) {
        matchingIndices.push(idx);
      }
    });

    const pool = matchingIndices.length > 0
      ? matchingIndices
      : LISTENING_TOPICS.map((_, idx) => idx);

    let chosenIdx = pool[(i - 1 + seedOffset) % pool.length];
    if (usedIndices.has(chosenIdx)) {
      const unused = pool.find((idx) => !usedIndices.has(idx));
      if (unused !== undefined) {
        chosenIdx = unused;
      } else {
        const globalUnused = LISTENING_TOPICS.findIndex((_, idx) => !usedIndices.has(idx));
        if (globalUnused !== -1) chosenIdx = globalUnused;
      }
    }
    usedIndices.add(chosenIdx);
    const rawT = LISTENING_TOPICS[chosenIdx];
    let t = customizeListeningTopicForPaper(rawT, i, prefix, seedOffset);

    const isQuestionInAudio = i <= 29;

    let rawImages: string[] | undefined = undefined;
    let mainImage: string | undefined = undefined;

    if (i <= 4) {
      const paperNumMatch = prefix.match(/\d+/);
      const paperNum = paperNumMatch ? parseInt(paperNumMatch[0], 10) : ((seedOffset % 10) + 1);
      mainImage = getHdIllustration(paperNum, i);
    }

    let topicOpt = t.opt;
    let topicAns = t.ans;

    if (i <= 4) {
      const paperNumMatch = prefix.match(/\d+/);
      const paperIdx = paperNumMatch ? (parseInt(paperNumMatch[0], 10) - 1) % 10 : 0;
      const sceneIdx = (paperIdx * 4) + (i - 1);
      const props = getDrawingPropositions(sceneIdx);
      topicOpt = props.opt;
      topicAns = props.ans;
    } else if (i >= 5 && i <= 15) {
      const paperNumMatch = prefix.match(/\d+/);
      const paperIdx = paperNumMatch ? (parseInt(paperNumMatch[0], 10) - 1) % 10 : (seedOffset % 10);
      const a1a2Idx = (paperIdx * 11) + (i - 5);
      const a1a2 = getA1A2Propositions(a1a2Idx);
      topicOpt = a1a2.opt;
      topicAns = a1a2.ans;
      t = { ...t, title: a1a2.title, text: a1a2.text, q: a1a2.q, tr: a1a2.tr, en: a1a2.en, hint: a1a2.hint, level: a1a2.level };
    } else if (i >= 16 && i <= 25) {
      const paperNumMatch = prefix.match(/\d+/);
      const paperIdx = paperNumMatch ? (parseInt(paperNumMatch[0], 10) - 1) % 10 : (seedOffset % 10);
      const b1Idx = (paperIdx * 10) + (i - 16);
      const b1 = getB1Propositions(b1Idx);
      topicOpt = b1.opt;
      topicAns = b1.ans;
      t = { ...t, title: b1.title, text: b1.text, q: b1.q, tr: b1.tr, en: b1.en, hint: b1.hint, level: b1.level };
    } else if (i >= 26 && i <= 33) {
      const paperNumMatch = prefix.match(/\d+/);
      const paperIdx = paperNumMatch ? (parseInt(paperNumMatch[0], 10) - 1) % 10 : (seedOffset % 10);
      const b2Idx = (paperIdx * 8) + (i - 26);
      const b2 = getB2Propositions(b2Idx);
      topicOpt = b2.opt;
      topicAns = b2.ans;
      const b2PassageText = (b2.tr || "").replace(/^Locut(?:eur|rice)\s*\d*:\s*/gm, "");
      t = { ...t, title: b2.title, text: b2PassageText, q: b2.text, tr: b2.tr, en: b2.en, hint: b2.hint, level: b2.level };
    } else if (i >= 34 && i <= 39) {
      const paperNumMatch = prefix.match(/\d+/);
      const paperIdx = paperNumMatch ? (parseInt(paperNumMatch[0], 10) - 1) % 10 : (seedOffset % 10);
      const c1c2Idx = (paperIdx * 6) + (i - 34);
      const c1c2 = getC1C2Propositions(c1c2Idx);
      topicOpt = c1c2.opt;
      topicAns = c1c2.ans;
      const c1c2PassageText = (c1c2.tr || "").replace(/^Locut(?:eur|rice)\s*\d*:\s*/gm, "") || c1c2.text;
      t = { ...t, title: c1c2.title, text: c1c2PassageText, q: c1c2.text || "Selon le conférencier, quelle est la thèse centrale ?", tr: c1c2.tr || c1c2.text, en: c1c2.en, hint: c1c2.hint, level: c1c2.level };
    }

    const seed = seedOffset * 100 + i;
    const { options, correctIndex, correctText, optionImages } = shuffleOptions(topicOpt, topicAns, seed, rawImages);

    const itemLevel = t.level || "A1";
    const specificHint = (t as any).hint || `Level ${itemLevel} Listening Guidance: Focus on the speaker's main intent and tone. Pay attention to key transition words (e.g. "cependant", "en revanche") to identify the correct message without guessing.`;

    let questionTextPrompt = ensureInterrogativeQuestion(i, t);

    const isMaleSpeaker = i % 2 === 1;
    const passageSpeakerLabel = isMaleSpeaker ? "Locuteur" : "Locutrice";
    const announcerLabel = isMaleSpeaker ? "Annonceuse" : "Annonceur";

    const isSpokenOptionQuestion = (i >= 5 && i <= 8);

    const passageBodyText = t.text || t.tr;

    let fullSpokenTranscript = isQuestionInAudio
      ? (isSpokenOptionQuestion
        ? `${passageSpeakerLabel}: ${passageBodyText}\n${announcerLabel}: Écoutez la question et les 4 réponses. Question N°${i} : ${questionTextPrompt}\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`
        : `${passageSpeakerLabel}: ${passageBodyText}\n${announcerLabel}: Écoutez la question. Question N°${i} : ${questionTextPrompt}`)
      : passageBodyText;

    if (i <= 4) {
      fullSpokenTranscript = `${announcerLabel}: Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\n... Proposition A : ${options[0]}.\n... Proposition B : ${options[1]}.\n... Proposition C : ${options[2]}.\n... Proposition D : ${options[3]}.`;
    }

    const speakingRate = i <= 7 ? 0.85 : i <= 15 ? 0.92 : i <= 25 ? 1.00 : i <= 33 ? 1.15 : 1.30;

    const optionsEn0 = translateOptionToEnglish(options[0]);
    const optionsEn1 = translateOptionToEnglish(options[1]);
    const optionsEn2 = translateOptionToEnglish(options[2]);
    const optionsEn3 = translateOptionToEnglish(options[3]);

    let spokenEnglishTranslation = t.en;
    const passageSpeakerLabelEn = isMaleSpeaker ? "Speaker" : "Speaker";
    const announcerLabelEn = "Announcer";

    if (i <= 4) {
      fullSpokenTranscript = `${announcerLabel}: Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\n... Proposition A : ${options[0]}.\n... Proposition B : ${options[1]}.\n... Proposition C : ${options[2]}.\n... Proposition D : ${options[3]}.`;
      spokenEnglishTranslation = `${announcerLabelEn}: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: ${optionsEn0}.\n... Option B: ${optionsEn1}.\n... Option C: ${optionsEn2}.\n... Option D: ${optionsEn3}.`;
    } else if (isSpokenOptionQuestion) {
      fullSpokenTranscript = `${passageSpeakerLabel}: ${passageBodyText}\n${announcerLabel}: Écoutez la question et les 4 réponses. Question N°${i} : ${questionTextPrompt}\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`;
      spokenEnglishTranslation = `${passageSpeakerLabelEn}: ${t.en}\n${announcerLabelEn}: Listen to the question and the 4 options. Question N°${i}: ${questionTextPrompt}\n... A: ${optionsEn0}.\n... B: ${optionsEn1}.\n... C: ${optionsEn2}.\n... D: ${optionsEn3}.`;
    } else if (isQuestionInAudio) {
      fullSpokenTranscript = `${passageSpeakerLabel}: ${passageBodyText}\n${announcerLabel}: Écoutez la question. Question N°${i} : ${questionTextPrompt}`;
      spokenEnglishTranslation = `${passageSpeakerLabelEn}: ${t.en}\n${announcerLabelEn}: Listen to the question. Question N°${i}: ${questionTextPrompt}`;
    } else {
      fullSpokenTranscript = passageBodyText;
      spokenEnglishTranslation = t.en;
    }

    qList.push({
      id: `${prefix}-lis-${i}`,
      questionNumber: i,
      level: itemLevel,
      speakingRate,
      hasSpokenOptions: isSpokenOptionQuestion || i <= 4,
      questionPrompt: questionTextPrompt,
      text: i <= 4
        ? "Écoutez les 4 propositions, choisissez celle qui correspond à l'image."
        : questionTextPrompt,
      options,
      optionImages,
      mainImage,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${itemLevel}]: The spoken document confirms "${correctText}".`,
      hint: specificHint,
      transcript: fullSpokenTranscript,
      transcriptEnglish: spokenEnglishTranslation,
      questionInAudio: isQuestionInAudio,
      perQuestionTimerSeconds: i <= 10 ? 15 : i <= 26 ? 20 : 25
    });
  }
  return qList;
}

export function generateReadingQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  const usedIndices = new Set<number>();

  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingIndices: number[] = [];

    READING_TOPICS.forEach((t, idx) => {
      if (t.level === targetLevel || (targetLevel === "C2" && t.level === "C1")) {
        matchingIndices.push(idx);
      }
    });

    const pool = matchingIndices.length > 0
      ? matchingIndices
      : READING_TOPICS.map((_, idx) => idx);

    let chosenIdx = pool[(i - 1 + seedOffset) % pool.length];
    if (usedIndices.has(chosenIdx)) {
      const unused = pool.find((idx) => !usedIndices.has(idx));
      if (unused !== undefined) {
        chosenIdx = unused;
      } else {
        const globalUnused = READING_TOPICS.findIndex((_, idx) => !usedIndices.has(idx));
        if (globalUnused !== -1) chosenIdx = globalUnused;
      }
    }
    usedIndices.add(chosenIdx);
    const t = READING_TOPICS[chosenIdx];

    const { options, correctIndex, correctText } = shuffleOptions(t.opt, t.ans);

    const specificHint = (t as any).hint || `Level ${t.level} Reading Guidance: Scan paragraph 1 and 2 for synonyms and key thematic terms. Eliminate distractor options containing extreme words like "toujours" or "jamais" unless explicitly in the passage.`;

    qList.push({
      id: `${prefix}-read-${i}`,
      questionNumber: i,
      passage: `[Document ${i} - Niveau ${t.level}] ${t.text}`,
      passageEnglish: t.passEn,
      text: `Question ${i} : ${t.q}`,
      options,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${t.level}]: The text states "${correctText}".`,
      hint: specificHint
    });
  }
  return qList;
}

// ─── LAZY GETTER EXPORTS FOR SAMPLE PAPERS (0 TDZ / INITIALIZATION ERRORS) ───
export function getSampleTcfPaper1(): ExamPaper {
  return getExamRegistry()[0];
}

export function getSampleTcfPaper2(): ExamPaper {
  return getExamRegistry()[1];
}

export function getSampleTefPaper1(): ExamPaper {
  return getExamRegistry()[10];
}

export function getSampleTefPaper2(): ExamPaper {
  return getExamRegistry()[11];
}

// ─── DYNAMIC GENERATOR FOR 10 UNIQUE TCF CANADA PAPERS & 10 UNIQUE TEF CANADA PAPERS ───

export const TCF_WRITING_SUITE = [
  [
    {
      title: "Tâche 1 : Message court (Problème de chauffage)",
      prompt: "Vous louez un appartement au Québec. Le système de chauffage ne fonctionne plus en plein hiver. Rédigez un courriel au propriétaire (60 à 120 mots) pour expliquer la situation et demander une réparation urgente.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Propriétaire,\n\nJe vous écris en urgence afin de vous signaler un problème majeur dans l'appartement que je loue au 45 rue Saint-Denis. Depuis hier soir, le système de chauffage central est totalement en panne et la température intérieure a chuté de manière préoccupante en raison des températures négatives extérieures.\n\nEn conséquence, je vous saurais gré d'intervenir dans les plus brefs délais ou d'envoyer un technicien qualifié dès aujourd'hui pour procéder aux réparations nécessaires. Je reste joignable par téléphone à tout moment pour faciliter l'accès au logement.\n\nEn vous remerciant vivement pour votre réactivité et votre compréhension, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Compte-rendu (Récit de voyage au Canada)",
      prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour à l'étranger (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Lors de mon récent séjour au Québec, j'ai vécu une aventure mémorable en assistant au traditionnel Carnaval d'hiver de la ville de Québec. Dès mon arrivée dans le Vieux-Québec, la cité historique était magnifiquement recouverte d'un manteau de neige féerique et illuminée de mille feux.\n\nPendant mon séjour, j'ai eu la chance d'admirer d'impressionnantes sculptures sur glace réalisées par des artistes internationaux et d'assister à la spectaculaire course de canot sur le fleuve Saint-Laurent glacé. L'atmosphère était chaleureuse et festive, malgré les températures froides.\n\nEn outre, cette immersion culturelle exceptionnelle m'a permis d'échanger avec des habitants accueillants et d'enrichir considérablement mes connaissances régionales. Bien que le climat fût rigoureux, je garde un souvenir impérissable de cette escapade nordique et je recommande chaleureusement cette destination féerique !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Transports gratuits)",
      prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La gratuité totale des transports en commun fait aujourd'hui l'objet d'un débat passionné au sein des métropoles contemporaines.\n\nD'un côté, les partisans de cette mesure soutiennent avec raison qu'elle favoriserait la transition écologique en incitant massivement les citoyens à délaisser leur véhicule individuel au profit du bus ou du métro, réduisant ainsi la pollution urbaine et l'empreinte carbone. De surcroît, elle constituerait une avancée sociale majeure pour les ménages à faibles revenus en augmentant directement leur pouvoir d'achat.\n\nD'un autre côté, certains économistes soulignent le coût financier considérable pour les collectivités locales. Sans recettes tarifaires, la rénovation, la sécurité et la modernisation des infrastructures risqueraient d'être compromises à long terme.\n\nEn conclusion, bien que la gratuité soit séduisante sur le plan environnemental et social, il me semble préférable de privilégier une tarification sociale adaptée aux revenus afin de garantir la pérennité et la qualité du réseau de transport public."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande d'informations (Atelier culinaire)",
      prompt: "Vous souhaitez vous inscrire à un atelier de cuisine régionale au Québec. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Directeur,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'atelier de cuisine québécoise prévu le mois prochain dans votre établissement. Passionné par la gastronomie régionale, je souhaiterais m'y inscrire avec enthousiasme.\n\nPourriez-vous m'indiquer la grille tarifaire ainsi que les éventuels prérequis techniques ? De plus, j'aimerais savoir si le matériel culinaire est fourni sur place ou s'il convient d'apporter notre propre équipement personnel.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Article de témoignage (Festival culturel)",
      prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Lors de mon dernier séjour au Canada, j'ai eu l'immense privilège de participer au prestigieux Festival International de Jazz de Montréal. Dès mon arrivée sur la place des Festivals, j'ai été immédiatement émerveillé par l'atmosphère festive et l'énergie vibrante des milliers de spectateurs réunis.\n\nPendant trois jours consécutifs, j'ai pu assister à des concerts en plein air mémorables et découvrir des artistes locaux pétris de talent. La diversité des styles musicaux présentés et la convivialité légendaire des Québécois ont rendu cette expérience absolument inoubliable.\n\nEn outre, les dégustations culinaires proposées sur place ont agréablement complété cette escapade. Je recommande vivement cet événement culturel à quiconque souhaite s'immerger dans l'âme musicale montréalaise. C'est une expérience festive d'une richesse exceptionnelle que vous ne regretterez pas !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Langues à l'école)",
      prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'opportunité d'imposer l'apprentissage obligatoire des langues étrangères dès le niveau primaire suscite d'intenses débats éducatifs et sociétaux à travers le monde.\n\nD'une part, les défenseurs de cette mesure soulignent à juste titre la plasticité cérébrale exceptionnelle des jeunes enfants, qui favorise une assimilation naturelle et intuitive des phonèmes et structures linguistiques complexe. De surcroît, une maîtrise précoce des langues étrangères constitue un atout culturel et professionnel indiscutable dans une société globale hautement interconnectée.\n\nD'autre part, les détracteurs mettent en garde contre le risque d'une surcharge des programmes scolaires qui pourrait entraver l'acquisition fondamentale des compétences de base en langue maternelle et en mathématiques.\n\nEn somme, bien que ces réserves soient parfaitement légitimes, je demeure convaincu que l'apprentissage précoce des langues demeure un levier d'ouverture culturelle et d'épanouissement personnel indispensable, à condition toutefois d'adapter une pédagogie ludique au rythme d'apprentissage de chaque élève."
    }
  ],
  [
    {
      title: "Tâche 1 : Message formel (Inscription au club de sport)",
      prompt: "Vous désirez vous inscrire à un club de sport à Montréal. Écrivez un courriel à l'administration (60 à 120 mots) pour demander des précisions sur les abonnements.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Madame, Monsieur,\n\nJe vous adresse ce courriel afin d'obtenir des informations précises concernant les modalités d'inscription à votre complexe sportif à Montréal pour la saison à venir.\n\nPourriez-vous m'indiquer la diversité des formules d'abonnement disponibles ainsi que les horaires d'ouverture des installations en semaine et le week-end ? Par ailleurs, j'aimerais savoir si une séance d'essai gratuite est envisageable avant tout engagement annuel.\n\nEn vous remerciant pour vos précisions, je vous prie de recevoir mes salutations respectueuses."
    },
    {
      title: "Tâche 2 : Compte-rendu (Action bénévole)",
      prompt: "Rédigez un court article pour le bulletin d'information de votre quartier (120 à 150 mots) résumant une journée d'action bénévole.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Samedi dernier, notre quartier a été le théâtre d'une magnifique journée de solidarité consacrée au nettoyage environnemental des berges du parc local. Plus de soixante citoyens enthousiastes de tous âges se sont rassemblés dès le matin munis de gants robustes et de bacs de collecte écologiques.\n\nGrâce à un effort collectif remarquable et à une organisation logistique sans faille, nous avons réussi à récolter plus de trois cents kilos de déchets plastiques et recyclables. Cette journée inspirante s'est ensuite clôturée chaleureusement autour d'un grand pique-nique partagé riche en échanges bienveillants entre voisins.\n\nEn conclusion, cette initiative citoyenne démontre avec force qu'un engagement local concret peut préserver notre cadre de vie commun. Une expérience humaine profondément gratifiante à renouveler impérativement dans les mois à venir !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Télétravail à 100%)",
      prompt: "Le télétravail à 100% est-il bénéfique pour l'épanouissement des salariés et la cohésion d'équipe ? Donnez votre opinion (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La généralisation du télétravail à temps plein transforme aujourd'hui en profondeur l'organisation contemporaine du monde professionnel.\n\nD'un côté, les avantages pour les employés sont indiscutables : élimination des trajets quotidiens stressants, réduction des dépenses de transport et meilleure conciliation entre vie privée et obligations professionnelles. De surcroît, de nombreux salariés rapportent une concentration accrue dans la réalisation de leurs tâches complexes et une autonomie renforcée au quotidien.\n\nCependant, un isolement professionnel prolongé risque d'affaiblir la cohésion d'équipe, d'entraver le transfert informel de connaissances et de détériorer le sentiment d'appartenance à l'entreprise. En outre, la frontière entre sphère personnelle et vie professionnelle devient parfois floue.\n\nEn conclusion, bien que le travail à distance offre une flexibilité appréciable, le modèle hybride combinant harmonieusement présentiel et distanciel me paraît être l'équation optimale pour concilier le bien-être individuel des salariés et la performance collective à long terme."
    }
  ],
  [
    {
      title: "Tâche 1 : Courriel de réclamation (Achat en ligne défectueux)",
      prompt: "Vous avez commandé du matériel informatique mais vous avez reçu un article défectueux. Écrivez au service client (60 à 120 mots) pour réclamer un échange.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Responsable du Service Client,\n\nJe vous écris suite à la réception de ma commande N°84920 contenant un ordinateur portable. À ma grande surprise, l'écran présente un défaut d'affichage majeur dès l'allumage.\n\nLe matériel étant sous garantie, je sollicite par la présente un échange standard ou le remboursement intégral de mon achat. Pourriez-vous me transmettre la procédure de retour ainsi que le bon d'expédition prépayé ?\n\nDans l'attente d'une prise en charge rapide de ma réclamation, veuillez agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Récit personnel (Changement de carrière)",
      prompt: "Dans une lettre à un ami collègue (120 à 150 mots), expliquez les raisons qui vous ont poussé à changer de domaine professionnel.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Cher Julien,\n\nJe prends enfin le temps de t'écrire pour partager avec toi une grande nouvelle : j'ai officiellement décidé de réorienter ma carrière professionnelle vers le secteur passionnant des éco-technologies.\n\nAprès dix années stimulantes dans le domaine financier, je ressentais le besoin fondamental de donner davantage de sens à mon quotidien et de contribuer activement à des projets d'innovation durable. J'ai donc suivi avec succès une formation intensive de six mois en gestion de projets environnementaux.\n\nBien que cette transition exige de sortir de ma zone de confort et de relever de nouveaux défis, je me sens immensément motivé par cette aventure. En outre, la diversité des projets me stimule énormément. J'espère que nous pourrons nous retrouver très prochainement pour en discuter de vive voix !\n\nAmicalement,\nMarc"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Interdiction des véhicules à essence)",
      prompt: "Les gouvernements devraient-ils interdire la vente de véhicules thermiques neufs d'ici 2035 ? Présentez votre argumentation (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'interdiction projetée de la vente de véhicules thermiques neufs d'ici 2035 suscite d'intenses débats entre impératifs écologiques vitaux et réalités socio-économiques.\n\nD'une part, les partisans de cette législation rappellent à juste titre que le secteur des transports constitue l'un des principaux émetteurs de gaz à effet de serre. Interdire les moteurs à essence apparaît donc comme une étape indispensable pour accélérer la décarbonation globale de l'économie et assainir durablement la qualité de l'air urbain au bénéfice de la santé publique.\n\nD'autre part, les opposants mettent en avant le coût financier élevé des véhicules électriques et l'insuffisance actuelle des infrastructures de recharge rapide. De surcroît, les répercussions sur l'emploi dans l'industrie automobile classique sont préoccupantes pour de nombreuses régions industrielles.\n\nEn conclusion, bien que la transition vers la mobilité électrique soit inéluctable, sa réussite dépendra d'un soutien financier équitable aux ménages modestes et d'un investissement massif dans les réseaux énergétiques."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande de renseignements (Bibliothèque municipale)",
      prompt: "Écrivez à la bibliothèque municipale de votre ville (60 à 120 mots) pour vous renseigner sur les horaires et le prêt numérique.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Madame la Bibliothécaire,\n\nJe vous adresse ce courriel afin de me renseigner sur les conditions d'adhésion et les services numériques offerts par la bibliothèque municipale.\n\nPourriez-vous me préciser les documents justificatifs requis pour l'établissement de la carte d'usager ainsi que le tarif annuel pour les résidents ? De plus, j'aimerais savoir si votre catalogue de livres numériques est accessible à distance depuis une tablette personnelle.\n\nEn vous remerciant pour vos informations, je vous prie d'agréer l'expression de mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Témoignage (Intégration au Québec)",
      prompt: "Racontez vos premiers mois d'installation au Canada dans un billet de blog (120 à 150 mots) en donnant des conseils pratiques aux nouveaux arrivants.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Installé à Montréal depuis maintenant six mois, je souhaite partager mon expérience d'intégration avec les futurs arrivants. Le choc culturel et climatique initial s'est très rapidement dissipé grâce à l'accueil d'une bienveillance remarquable réservé au quotidien par les Québécois.\n\nDès les premières semaines de mon arrivée, je me suis inscrit à des ateliers de réseautage professionnel et j'ai exploré avec passion les différents quartiers de la métropole. Bien que les démarches administratives exigent de la rigueur et de la patience, l'environnement social offre des perspectives d'épanouissement remarquables.\n\nUn conseil fondamental aux futurs immigrants : n'hésitez surtout pas à aller spontanément au-devant des gens et à participer aux activités communautaires locales. C'est la clé absolue d'une intégration harmonieuse, enrichissante et réussie !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Intelligence Artificielle et Emploi)",
      prompt: "L'intelligence artificielle représente-t-elle une menace ou une opportunité majeure pour le marché du travail de demain ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'essor fulgurant des technologies d'intelligence artificielle suscite aujourd'hui de profondes inquiétudes quant à la pérennité du marché de l'emploi mondial.\n\nD'un côté, les détracteurs soulignent à juste titre le risque d'une automatisation massive qui pourrait supprimer de nombreux postes administratifs et techniques, créant une précarité inédite pour les travailleurs dont les tâches sont répétitives et prévisibles.\n\nD'un autre côté, les défenseurs de l'IA rappellent opportunément que chaque révolution technologique génère de nouveaux métiers spécialisés et libère les humains des contraintes exécutives au profit d'activités créatives, stratégiques et relationnelles. De surcroît, l'IA constitue un multiplicateur de productivité sans précédent pour les entreprises modernes du XXIe siècle.\n\nEn somme, l'intelligence artificielle ne doit pas être redoutée mais encadrée par des politiques gouvernementales et institutionnelles très ambitieuses de formation continue afin de garantir une transition numérique inclusive et équitable pour l'ensemble des travailleurs."
    }
  ],
  [
    {
      title: "Tâche 1 : Message d'absence (Congé exceptionnel)",
      prompt: "Écrivez un message à votre responsable hiérarchique (60 à 120 mots) pour demander une autorisation d'absence exceptionnelle de 3 jours.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur le Directeur,\n\nJe vous adresse ce courriel afin de solliciter une autorisation d'absence exceptionnelle de trois jours, du 12 au 14 du mois prochain, pour des raisons familiales impérieuses.\n\nJ'ai pris soin d'avancer mes dossiers en cours et de planifier l'intérim de mes projets avec mon collègue Thomas afin d'éviter tout retard de livraison. Je resterai joignable par courriel en cas d'urgence absolue.\n\nEn vous remerciant par avance pour votre compréhension, je vous prie d'agréer mes salutations respectueuses."
    },
    {
      title: "Tâche 2 : Critique culturelle (Exposition d'art)",
      prompt: "Rédigez une critique d'une exposition culturelle ou d'un musée récent auquel vous avez assisté (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Le week-end dernier, j'ai eu le plaisir de visiter la nouvelle exposition immersive consacrée à l'impressionnisme au Musée des Beaux-Arts. Dès l'entrée dans la grande galerie, les projections numériques géantes accompagnées d'une symphonie captivante transportent immédiatement le visiteur au cœur même des œuvres magistrales.\n\nLa scénographie audacieuse et l'éclairage méticuleusement étudié mettent en valeur la texture et la richesse des nuances chromatiques de chaque toile. Ce parcours sensoriel novateur offre ainsi une perspective totalement renouvelée sur l'histoire de l'art classique.\n\nEn outre, la section interactive proposée à la fin du parcours constitue un ajout très ludique. Une visite culturelle incontournable que je recommande chaleureusement à tous les passionnés d'art !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Écrans et réseaux sociaux)",
      prompt: "Faut-il réglementer strictement l'utilisation des téléphones portables et des réseaux sociaux chez les jeunes adolescents ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'omniprésence des smartphones et des plateformes numériques dans le quotidien des adolescents soulève aujourd'hui d'importantes interrogations quant aux risques d'addiction.\n\nD'un côté, les partisans d'une réglementation stricte mettent en garde avec fermeté contre les méfaits du cyberharcèlement, la perturbation du sommeil et la baisse de l'attention scolaire entraînées par l'exposition excessive aux écrans.\n\nD'un autre côté, interdire autoritairement ces technologies semble illusoire à l'ère du numérique. Les réseaux sociaux constituent également d'épatants espaces d'apprentissage interactif, de création artistique et de socialisation pour la jeunesse contemporaine.\n\nEn conclusion, plus qu'une interdiction coercitive, il convient de privilégier une véritable éducation aux médias numériques dès le collège pour accompagner les adolescents vers un usage responsable et équilibré."
    }
  ],
  [
    {
      title: "Tâche 1 : Invitation (Fête des voisins)",
      prompt: "Invitez vos voisins de quartier (60 à 120 mots) à une fête communautaire que vous organisez le mois prochain.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Chers Voisins,\n\nAfin de renforcer les liens de convivialité au sein de notre résidence, j'ai le plaisir de vous inviter à notre traditionnelle fête des voisins qui se tiendra le samedi 15 du mois prochain à partir de 18 heures dans le jardin collectif.\n\nChacun est invité à apporter une spécialité culinaire ou une boisson à partager. Ce sera l'occasion idéale d'accueillir les nouveaux résidents et d'échanger un moment chaleureux.\n\nMerci de bien vouloir me confirmer votre présence avant le 10 afin d'organiser au mieux cet événement !"
    },
    {
      title: "Tâche 2 : Récit d'initiative (Jardin collectif)",
      prompt: "Décrivez la création d'un jardin collectif dans votre quartier (120 à 150 mots) et son impact sur la vie de quartier.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Au printemps dernier, les résidents de notre quartier se sont mobilisés avec enthousiasme pour transformer un terrain vague abandonné en un magnifique jardin potager communautaire. Grâce au précieux soutien municipal et à l'implication de bénévoles de tous âges, nous avons aménagé des parcelles de culture biologiques écologiques.\n\nAujourd'hui, cet espace vert est devenu un véritable lieu de rassemblement intergénérationnel dynamique où voisins échangent conseils d'horticulture, graines et légumes frais dans une atmosphère extrêmement conviviale.\n\nEn outre, ce projet exemplaire a sensiblement renforcé la cohésion sociale de notre communauté. Une réussite citoyenne remarquable qui a revitalisé notre quartier et que nous souhaitons prolonger durablement !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Semaine de 4 jours)",
      prompt: "La semaine de travail de 4 jours devrait-elle être généralisée à l'ensemble des entreprises ? Argumentez votre position (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Le passage à la semaine de travail de quatre jours sans diminution de salaire s'impose actuellement comme une expérimentation sociale majeure.\n\nD'un côté, les organisations ayant mis en œuvre ce modèle constatent une baisse spectaculaire du niveau d'épuisement professionnel, une diminution de l'absentéisme et un regain notable de productivité chez les salariés, ce qui compense amplement la journée non travaillée.\n\nCependant, plusieurs secteurs d'activité essentiels comme la santé publique, les transports et les services de secours peineraient à financer la réorganisation complexe des plannings et les recrutements compensatoires nécessaires.\n\nEn conclusion, bien que la semaine de quatre jours offre un équilibre personnel précieux, sa généralisation doit s'effectuer avec flexibilité et s'adapter aux réalités spécifiques de chaque secteur d'activité."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande de réservation (Chalet à la montagne)",
      prompt: "Écrivez un courriel à un propriétaire de chalet (60 à 120 mots) pour réserver un séjour en famille pendant les vacances d'hiver.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur,\n\nJe vous adresse ce courriel afin de me renseigner sur la disponibilité de votre chalet à Mont-Tremblant pour la semaine du 10 au 17 février pour une famille de cinq personnes.\n\nPourriez-vous me confirmer le tarif total de la location ainsi que le montant du dépôt de garantie ? De plus, j'aimerais savoir si le chalet dispose d'un espace de rangement sécurisé pour les équipements de ski.\n\nDans l'attente de vos précisions, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Témoignage (Formation professionnelle)",
      prompt: "Racontez une formation continue récente que vous avez suivie (120 à 150 mots) et expliquez ses apports concrets.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "J'ai récemment suivi une formation continue intensive consacrée au marketing numérique et à l'analyse des médias sociaux. Durant deux semaines particulièrement stimulantes, des formateurs expérimentés nous ont enseigné les dernières méthodologies d'optimisation de campagnes web et de stratégie de contenu.\n\nGrâce aux cas pratiques traités en équipe et aux outils modernes manipulés en atelier, j'ai pu acquérir des compétences techniques immédiatement transposables dans mon activité quotidienne. Cela m'a permis d'augmenter le taux d'engagement en ligne de mon entreprise de plus de trente pour cent.\n\nEn outre, cette expérience m'a donné un véritable élan professionnel. Une formation hautement enrichissante que je recommande vivement à tout professionnel souhaitant faire évoluer sa carrière !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Consommation de produits locaux)",
      prompt: "Acheter exclusivement des produits alimentaires locaux et de saison est-il un objectif réaliste pour tous les ménages ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La promotion du locavorisme, qui préconise la consommation exclusive de denrées alimentaires produites localement, suscite un intérêt croissant face aux défis écologiques contemporains.\n\nD'une part, privilégier les circuits de distribution courts permet de soutenir concrètement l'économie agricole régionale et de réduire de manière drastique les émissions de carbone liées au transport international des marchandises.\n\nD'autre part, exiger le 100% local se heurte à des contraintes budgétaires majeures pour les ménages à revenus modestes, les produits issus d'exploitations locales étant souvent plus coûteux. De surcroît, la variété alimentaire en période hivernale s'avère restreinte sous les climats nordiques.\n\nEn somme, bien que la consommation locale représente un idéal vertueux, elle doit s'inscrire dans une démarche pragmatique sans devenir une contrainte financière inaccessible."
    }
  ],
  [
    {
      title: "Tâche 1 : Remerciement formel (Fin de stage)",
      prompt: "Rédigez un courriel de remerciement à votre maître de stage (60 à 120 mots) à la fin de votre période en entreprise.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Directeur,\n\nAlors que mon stage au sein de votre entreprise touche à sa fin, je tiens à vous exprimer ma sincère gratitude pour l'accueil chaleureux et la confiance que vous m'avez accordés tout au long de ces trois mois.\n\nCette expérience professionnelle m'a permis d'approfondir mes connaissances pratiques et de développer des compétences solides en gestion de projets. Je remercie également toute l'équipe pour sa disponibilité et ses précieux conseils.\n\nEn vous souhaitant une excellente continuation, je vous prie d'agréer l'expression de mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Récit d'événement (Marathon de Montréal)",
      prompt: "Décrivez votre participation ou votre soutien lors d'un événement sportif populaire (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Dimanche dernier, j'ai eu l'immense bonheur de participer au Marathon de Montréal aux côtés de milliers de coureurs passionnés venus du monde entier. Le parcours pittoresque sillonnait les plus emblématiques quartiers de la métropole sous les encouragements vifs d'une foule nombreuse et enthousiaste.\n\nBien que la seconde moitié du parcours ait exigé un effort physique particulièrement intense, l'énergie collective formidable et les fanfares musicales réparties le long du trajet m'ont transcendé jusqu'à la ligne d'arrivée.\n\nEn outre, cette épreuve exigeante m'a permis de dépasser mes limites personnelles. Franchir l'arrivée après quarante-deux kilomètres d'effort reste un moment d'intense fierté et une aventure sportive inoubliable !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Quotas touristiques)",
      prompt: "Faut-il imposer des quotas stricts d'accès à certains sites naturels et patrimoniaux pour protéger la planète ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Face aux dégradations entraînées par le surtourisme de masse, la mise en place de quotas d'accès aux sites naturels et patrimoniaux suscite d'importants débats.\n\nD'un côté, les écologistes soulignent à juste titre que la surfréquentation touristique détruit irréversiblement les écosystèmes fragiles, accélère l'érosion des monuments historiques et nuit à la quiétude des résidents locaux. Limiter le nombre de visiteurs quotidiens constitue donc le seul moyen efficace de préserver ces trésors pour les générations futures.\n\nD'un autre côté, les acteurs économiques redoutent des baisses de revenus dévastatrices et dénoncent une mesure inégalitaire qui risquerait de réserver la culture aux publics privilégiés.\n\nEn conclusion, bien que la régulation des flux touristiques soit devenue indispensable, elle doit s'accompagner d'une promotion active du tourisme écoresponsable."
    }
  ],
  [
    {
      title: "Tâche 1 : Proposition de partenariat (Association locale)",
      prompt: "Proposez un partenariat commercial à un commerce de quartier au nom de votre association étudiante (60 à 120 mots).",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Gérant,\n\nAu nom de l'association étudiante de l'Université de Montréal, je vous écris afin de vous proposer un partenariat commercial à l'occasion de notre rentrée universitaire.\n\nNous souhaiterions offrir à nos 500 membres des réductions exclusives dans votre établissement en échange d'une visibilité prioritaire sur nos réseaux sociaux et nos supports de communication.\n\nSeriez-vous disponible la semaine prochaine pour une courte rencontre afin d'échanger sur cette opportunité mutually bénéfique ?\n\nDans l'attente de votre réponse, veuillez agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Résumé de conférence (Développement durable)",
      prompt: "Rédigez le compte-rendu d'une conférence publique sur la transition écologique (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Hier soir, l'Hôtel de Ville accueillait une conférence captivante consacrée aux stratégies de transition écologique dans les grandes métropoles. Trois experts renommés ont présenté des solutions innovantes axées sur la rénovation thermique des bâtiments et la mobilité douce.\n\nLes intervenants ont insisté sur l'urgence d'une action concertée entre citoyens, entreprises et collectivités territoriales pour atteindre la neutralité carbone d'ici 2050.\n\nCette présentation claire et inspirante s'est conclue par un débat passionnant avec le public, démontrant une prise de conscience collective prometteuse pour notre avenir urbain !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Université gratuite)",
      prompt: "L'accès aux études supérieures devrait-il être entièrement gratuit et financé par l'État pour tous les étudiants ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Le débat sur la gratuité totale de l'enseignement supérieur ravive les discussions autour de l'égalité des chances et du financement public.\n\nD'une part, garantir la gratuité universitaire permettrait d'éliminer les barrières financières qui freinent l'accès des jeunes issus de milieux défavorisés aux diplômes du supérieur, favorisant ainsi une méritocratie réelle et la mobilité sociale.\n\nD'autre part, la gratuité universelle représenterait un coût budgétaire colossal pour l'État, risquant de dégrader la qualité des infrastructures et du corps professoral sans financement privé complémentaire.\n\nEn conclusion, l'accès à l'université doit être garanti à tous, mais une gratuité ciblée sous forme de bourses sociales élevées me semble plus équitable qu'une gratuité aveugle bénéficiant également aux ménages aisés."
    }
  ]
];

let _cachedRegistry: ExamPaper[] | null = null;

export function getExamRegistry(): ExamPaper[] {
  if (_cachedRegistry) return _cachedRegistry;
  const registry: ExamPaper[] = [];

  // Generate 10 TCF Canada Papers (5 Practice Mode Papers + 5 Real Exam Mode Papers)
  for (let i = 1; i <= 10; i++) {
    const isPractice = i <= 5;
    const paperNum = isPractice ? i : i - 5;
    const numStr = `0${paperNum}`;
    const writingSet = TCF_WRITING_SUITE[i - 1];

    // Different question pool seed offset for Real Exam Mode to guarantee ZERO cheating
    const seedOffset = isPractice ? (i * 3) : (i * 7 + 13);

    registry.push({
      id: isPractice ? `tcf-canada-practice-paper-${paperNum}` : `tcf-canada-official-exam-paper-${paperNum}`,
      title: isPractice ? `TCF Canada Guided Practice Paper ${paperNum}` : `TCF Canada Official Real Exam Paper ${paperNum}`,
      code: isPractice ? `TCF-PRAC-${numStr}` : `TCF-EXAM-${numStr}`,
      type: "TCF_CANADA",
      recommendedMode: isPractice ? "PRACTICE" : "EXAM",
      description: isPractice
        ? `Guided practice paper with step-by-step hints, audio transcripts, and 2-attempt answer validation (84 Items / 119 Mins).`
        : `Strict official FEI test-center exam paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 119 Mins).`,
      totalDurationMins: 119,
      isSamplePaper: isPractice,
      published: true,
      sections: [
        {
          type: "COMPREHENSION_ORALE",
          title: "Compréhension Orale (Listening)",
          description: "Listen to French audio clips and answer multiple-choice questions (39 Questions / 35 Mins).",
          durationMins: 35,
          totalQuestions: 39,
          questions: generateListeningQuestions(39, `tcf${i}`, seedOffset)
        },
        {
          type: "COMPREHENSION_ECRITE",
          title: "Compréhension Écrite (Reading)",
          description: "Read French articles, emails, administrative notices, and academic texts (39 Questions / 60 Mins).",
          durationMins: 60,
          totalQuestions: 39,
          questions: generateReadingQuestions(39, `tcf${i}`, seedOffset)
        },
        {
          type: "EXPRESSION_ECRITE",
          title: "Expression Écrite (Writing)",
          description: "Compose short messages, social articles, and argumentative essays (3 Tasks / 60 Mins).",
          durationMins: 60,
          totalQuestions: 3,
          writingTasks: writingSet.map((wt, idx) => ({
            id: `tcf${i}-w${idx + 1}`,
            taskNumber: idx + 1,
            title: wt.title,
            prompt: wt.prompt,
            wordCountMin: wt.min,
            wordCountMax: wt.max,
            timeLimitMins: wt.time,
            guidedTips: ["Introduction claire", "Présenter 2 arguments développés", "Conclusion synthétique avec prise de position"],
            sampleResponse: wt.sampleResponse
          }))
        },
        {
          type: "EXPRESSION_ORALE",
          title: "Expression Orale (Speaking)",
          description: "Interactive oral interaction with AI examiner feedback (3 Tasks / 12 Mins).",
          durationMins: 12,
          totalQuestions: 3,
          speakingTasks: [
            {
              id: `tcf${i}-spk-1`,
              taskNumber: 1,
              title: "Tâche 1 : Entretien dirigé (Personal Presentation)",
              scenario: "Présentez-vous à l'examinateur. Parlez de votre parcours professionnel, de vos centres d'intérêt et de vos motivations pour vous installer au Canada.",
              prepTimeMins: 0,
              speakingTimeMins: 2,
              keyPhrases: ["Je m'appelle...", "Actuellement, je travaille en tant que...", "Mon objectif principal au Canada est..."]
            },
            {
              id: `tcf${i}-spk-2`,
              taskNumber: 2,
              title: "Tâche 2 : Exercice en interaction (Recherche d'informations)",
              scenario: `Vous souhaitez obtenir des informations sur un service public au Québec (Sujet épreuve ${i}). Posez au moins 5 questions à l'examinateur sur les conditions d'accès, tarifs et démarches.`,
              prepTimeMins: 1,
              speakingTimeMins: 3.5,
              keyPhrases: ["Quels sont les documents requis ?", "Combien coûte l'inscription ?", "Est-il possible de faire les démarches en ligne ?"]
            },
            {
              id: `tcf${i}-spk-3`,
              taskNumber: 3,
              title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
              scenario: `Exprimez et défendez votre opinion à l'examinateur sur l'impact de la numérisation des services publics dans la société actuelle.`,
              prepTimeMins: 1,
              speakingTimeMins: 4.5,
              keyPhrases: ["Selon moi...", "D'un côté..., mais d'un autre côté...", "Pour conclure, je dirais que..."]
            }
          ]
        }
      ]
    });
  }

  // Generate 10 TEF Canada Papers (5 Practice Mode Papers + 5 Real Exam Mode Papers)
  for (let i = 1; i <= 10; i++) {
    const isPractice = i <= 5;
    const paperNum = isPractice ? i : i - 5;
    const numStr = `0${paperNum}`;

    // Distinct seed offset for Real Exam Mode
    const seedOffset = isPractice ? (i * 4) : (i * 9 + 17);

    registry.push({
      id: isPractice ? `tef-canada-practice-paper-${paperNum}` : `tef-canada-official-exam-paper-${paperNum}`,
      title: isPractice ? `TEF Canada Guided Practice Paper ${paperNum}` : `TEF Canada Official Real Exam Paper ${paperNum}`,
      code: isPractice ? `TEF-PRAC-${numStr}` : `TEF-EXAM-${numStr}`,
      type: "TEF_CANADA",
      recommendedMode: isPractice ? "PRACTICE" : "EXAM",
      description: isPractice
        ? `Guided practice paper tailored for TEF Canada Paris Chamber of Commerce (CCI) standards with hints and transcripts (84 Items / 135 Mins).`
        : `Strict official CCI test-center exam paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 135 Mins).`,
      totalDurationMins: 135,
      isSamplePaper: isPractice,
      published: true,
      sections: [
        {
          type: "COMPREHENSION_ORALE",
          title: "Compréhension Orale (Listening)",
          description: "Audio passages, public announcements, and conversations (40 Questions / 40 Mins).",
          durationMins: 40,
          totalQuestions: 40,
          questions: generateListeningQuestions(40, `tef${i}`, seedOffset)
        },
        {
          type: "COMPREHENSION_ECRITE",
          title: "Compréhension Écrite (Reading)",
          description: "Press articles, administrative documents, and synthesis questions (40 Questions / 60 Mins).",
          durationMins: 60,
          totalQuestions: 40,
          questions: generateReadingQuestions(40, `tef${i}`, seedOffset)
        },
        {
          type: "EXPRESSION_ECRITE",
          title: "Expression Écrite (Writing)",
          description: "Section A (Fait divers article) and Section B (Argumentative letter) (2 Tasks / 60 Mins).",
          durationMins: 60,
          totalQuestions: 2,
          writingTasks: [
            {
              id: `tef${i}-w1`,
              taskNumber: 1,
              title: "Section A : Article de Fait Divers (Newspaper Continuation)",
              prompt: `Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un événement inattendu a perturbé le centre-ville de Montréal (Sujet épreuve ${i})...'`,
              wordCountMin: 80,
              wordCountMax: 120,
              timeLimitMins: 25,
              guidedTips: ["Employer le passé composé et l'imparfait", "Décrire la réaction des passants et des secours", "Conclure par un retour au calme"]
            },
            {
              id: `tef${i}-w2`,
              taskNumber: 2,
              title: "Section B : Lettre d'opinion persuasive (Letter to Editor / Mayor)",
              prompt: `Rédigez une lettre d'opinion au journal local (200 mots minimum) pour exprimer votre accord ou désaccord sur l'aménagement de nouvelles pistes cyclables au détriment des voies de stationnement.`,
              wordCountMin: 200,
              wordCountMax: 250,
              timeLimitMins: 35,
              guidedTips: ["Salutation formelle", "Présenter 2 arguments environnementaux et de sécurité", "Conclure par une formule de politesse adaptée"]
            }
          ]
        },
        {
          type: "EXPRESSION_ORALE",
          title: "Expression Orale (Speaking)",
          description: "Section A (Information Gathering) and Section B (Persuasive Argumentation) (2 Tasks / 15 Mins).",
          durationMins: 15,
          totalQuestions: 2,
          speakingTasks: [
            {
              id: `tef${i}-spk-1`,
              taskNumber: 1,
              title: "Section A : Demande d'informations (10 Questions)",
              scenario: `Vous voyez une annonce pour une offre d'emploi ou un service à mi-temps. Appelez le responsable pour poser au moins 10 questions précises sur le poste (Épreuve ${i}).`,
              prepTimeMins: 0,
              speakingTimeMins: 5,
              keyPhrases: ["Quelles sont les compétences requises ?", "Quel est le salaire horaire proposé ?", "Quand commence le contrat ?"]
            },
            {
              id: `tef${i}-spk-2`,
              taskNumber: 2,
              title: "Section B : Convaincre un ami (Persuasive Speaking)",
              scenario: `Un ami hésite à s'inscrire à une aventure sportive ou culturelle ce week-end. Convainquez-le d'accepter cette opportunité avec vous (Épreuve ${i}).`,
              prepTimeMins: 1,
              speakingTimeMins: 10,
              keyPhrases: ["Pense à tous les bénéfices !", "Je m'occupe de la logistique.", "C'est le moment idéal de tenter l'expérience."]
            }
          ]
        }
      ]
    });
  }

  _cachedRegistry = registry;
  return registry;
}

export interface NCLCScoreResult {
  nclcLevel: number; // 1 to 12
  cefrEquivalent: string; // A1, A2, B1, B2, C1, C2
  expressEntryPoints: number; // CLB points for Express Entry
  statusMessage: string;
  isNCLC7TargetReached: boolean;
}

export function calculateNCLCScore(pctScore: number, _examType: ExamType, sectionType?: SectionType): NCLCScoreResult {
  const pct = Math.max(0, Math.min(100, pctScore));
  let nclcLevel = 0;
  let cefrEquivalent = "Unrated";
  let expressEntryPoints = 0;
  let isNCLC7TargetReached = false;

  if (pct === 0) {
    nclcLevel = 0;
    cefrEquivalent = "Unrated";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
  } else if (sectionType === "EXPRESSION_ECRITE" || sectionType === "EXPRESSION_ORALE") {
    // Official 20-Point Scale Cutoffs for Writing & Speaking (FEI / Paris Standards)
    if (pct >= 90.0) { // 18-20 / 20 (C2 Mastery)
      nclcLevel = 10;
      cefrEquivalent = "C2";
      expressEntryPoints = 34;
      isNCLC7TargetReached = true;
    } else if (pct >= 80.0) { // 16-17 / 20 (C1 Advanced)
      nclcLevel = 9;
      cefrEquivalent = "C1";
      expressEntryPoints = 31;
      isNCLC7TargetReached = true;
    } else if (pct >= 70.0) { // 14-16 / 20 (B2 Upper Vantage)
      nclcLevel = 8;
      cefrEquivalent = "B2";
      expressEntryPoints = 23;
      isNCLC7TargetReached = true;
    } else if (pct >= 60.0) { // 12-13 / 20 (B2 Target Benchmark)
      nclcLevel = 7;
      cefrEquivalent = "B2";
      expressEntryPoints = 17;
      isNCLC7TargetReached = true;
    } else if (pct >= 50.0) { // 10-11 / 20 (B1 Intermediate)
      nclcLevel = 6;
      cefrEquivalent = "B1";
      expressEntryPoints = 12;
      isNCLC7TargetReached = false;
    } else if (pct >= 40.0) { // 8-9 / 20 (B1 Threshold)
      nclcLevel = 5;
      cefrEquivalent = "B1";
      expressEntryPoints = 6;
      isNCLC7TargetReached = false;
    } else if (pct >= 25.0) { // 5-7 / 20 (A2 Elementary)
      nclcLevel = 4;
      cefrEquivalent = "A2";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    } else { // 1-4 / 20 (A1 Beginner)
      nclcLevel = 3;
      cefrEquivalent = "A1";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    }
  } else {
    // Official 39-Item Scale Cutoffs for Listening & Reading
    if (pct >= 89.7) { // 35-39 / 39 (C2 Mastery)
      nclcLevel = 10;
      cefrEquivalent = "C2";
      expressEntryPoints = 34;
      isNCLC7TargetReached = true;
    } else if (pct >= 82.0) { // 32-34 / 39 (NCLC 9 C1 Advanced - 31 CRS Points)
      nclcLevel = 9;
      cefrEquivalent = "C1";
      expressEntryPoints = 31;
      isNCLC7TargetReached = true;
    } else if (pct >= 69.2) { // 27-31 / 39 (NCLC 8 B2 Upper - 23 CRS Points)
      nclcLevel = 8;
      cefrEquivalent = "B2";
      expressEntryPoints = 23;
      isNCLC7TargetReached = true;
    } else if (pct >= 58.9) { // 23-27 / 39 (NCLC 7 B2 Target Benchmark for Express Entry - 17 CRS Points)
      nclcLevel = 7;
      cefrEquivalent = "B2";
      expressEntryPoints = 17;
      isNCLC7TargetReached = true;
    } else if (pct >= 46.1) { // 18-22 / 39 (NCLC 6 B1 Intermediate - 12 CRS Points)
      nclcLevel = 6;
      cefrEquivalent = "B1";
      expressEntryPoints = 12;
      isNCLC7TargetReached = false;
    } else if (pct >= 35.8) { // 14-17 / 39 (NCLC 5 B1 Threshold - 6 CRS Points)
      nclcLevel = 5;
      cefrEquivalent = "B1";
      expressEntryPoints = 6;
      isNCLC7TargetReached = false;
    } else if (pct >= 25.6) { // 10-13 / 39 (NCLC 4 A2 Elementary - 0 CRS Points)
      nclcLevel = 4;
      cefrEquivalent = "A2";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    } else { // < 10 / 39 (NCLC 3 A1 - 0 CRS Points)
      nclcLevel = 3;
      cefrEquivalent = "A1";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    }
  }

  const statusMessage = pct === 0
    ? `⚠️ No questions attempted or 0% score recorded. Please complete the test questions in each section to receive a diagnostic NCLC rating.`
    : isNCLC7TargetReached
    ? `🎉 Excellent! Score achieves NCLC ${nclcLevel} (${cefrEquivalent}) — Meets Canadian Express Entry PR Benchmark!`
    : `💪 NCLC ${nclcLevel} (${cefrEquivalent}) recorded. Aim for 23/39 (58.9%+) to hit the official NCLC 7 (B2) immigration benchmark.`;

  return {
    nclcLevel,
    cefrEquivalent,
    expressEntryPoints,
    statusMessage,
    isNCLC7TargetReached
  };
}
