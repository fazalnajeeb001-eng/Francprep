import { getOfficialLineArtSvg } from "./lineArtIllustrations";

export type ExamType = "TCF_CANADA" | "TEF_CANADA";
export type ExamMode = "PRACTICE" | "EXAM";
export type SectionType = "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: string[];
  optionImages?: string[];
  mainImage?: string;
  mainImageSvg?: string;
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
      const c1Variant = (Math.floor(i / 39) + (qNum - 34)) % 4;
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
        }
      ];
      topics.push({ level: "C1", ...c1Topics[c1Variant] });
    } else {
      const c2Variant = (Math.floor(i / 39) + (qNum - 38)) % 2;
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
  const topics: ReadingTopicItem[] = [];
  const cities = ["Montréal", "Québec", "Ottawa", "Vancouver", "Toronto", "Calgary"];

  for (let i = 0; i < 390; i++) {
    const qNum = (i % 39) + 1;
    const city = cities[i % cities.length];

    if (qNum <= 7) {
      topics.push({
        level: "A1",
        q: "Quel est l'objet principal de cette annonce ?",
        text: `Vente de garage le samedi 15 mai à ${city}. Vêtements, meubles et livres en parfait état. Adresse : 124 rue Principale, de 9h à 16h.`,
        opt: ["Une vente de garage de meubles et livres", "L'ouverture d'un nouveau magasin de vêtements", "Une fête de quartier municipale", "La fermeture d'une bibliothèque"],
        ans: 0,
        passEn: `Garage sale on Saturday May 15 in ${city}. Clothes, furniture, and books in perfect condition.`
      });
    } else if (qNum <= 15) {
      topics.push({
        level: "A2",
        q: "Quelle est la consigne principale donnée dans ce courriel ?",
        text: `Chers employés, nous vous rappelons que les travaux de rénovation du parking principal débuteront lundi. Veuillez utiliser le stationnement B.`,
        opt: ["Utiliser le stationnement B à partir de lundi", "Stationner gratuitement dans la rue", "Venir au travail uniquement en transport en commun", "Payer les frais de stationnement d'avance"],
        ans: 0,
        passEn: `Dear employees, please note that main parking renovation starts Monday. Please use Parking B.`
      });
    } else if (qNum <= 25) {
      topics.push({
        level: "B1",
        q: `Selon l'article, quel est le bénéfice majeur de cette initiative à ${city} ?`,
        text: `Le programme municipal d'embellissement urbain à ${city} a permis de planter plus de 5 000 arbres cette année, contribuant à rafraîchir le centre-ville.`,
        opt: ["La réduction des îlots de chaleur grâce aux 5 000 arbres", "L'augmentation des tarifs de stationnement en centre-ville", "La fermeture complète des axes routiers principaux", "La création d'un nouveau centre commercial"],
        ans: 0,
        passEn: `The urban greening program in ${city} planted over 5,000 trees this year, helping cool the city center.`
      });
    } else if (qNum <= 33) {
      topics.push({
        level: "B2",
        q: "Quelle est l'analyse clé développée par l'auteur concernant l'économie numérique ?",
        text: `L'essor du télétravail redéfinit l'aménagement du territoire canadien. Si la décentralisation favorise le dynamisme des régions périphériques, elle pose d'importants défis d'infrastructures.`,
        opt: ["La redéfinition du territoire et les défis d'infrastructures régionales", "L'abandon total des bureaux en centre-ville", "La baisse généralisée de la productivité des salariés", "L'obligation légale du retour au travail en présentiel"],
        ans: 0,
        passEn: `The rise of remote work redefines Canadian territorial planning. While decentralization boosts regional dynamism, it poses infrastructure challenges.`
      });
    } else {
      topics.push({
        level: "C1",
        q: "Quelle est la thèse centrale formulée par les chercheurs dans cette étude académique ?",
        text: `L'analyse des modèles climatologiques récents démontre une corrélation directe entre la préservation des zones humides boréales et la régulation des événements météorologiques extrêmes.`,
        opt: ["Rôle crucial des zones humides boréales dans la régulation climatique", "Inefficacité totale des politiques de conservation environnementale", "Nécessité d'industrialiser les territoires du Nord canadien", "Disparition irréversible de tous les écosystèmes aquatiques"],
        ans: 0,
        passEn: `Analysis of climatological models demonstrates a direct correlation between boreal wetland preservation and extreme weather event regulation.`
      });
    }
  }

  return topics;
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
    { opt: ["Option A: Quai de gare avec voyageurs", "Option B: Rue piétonne enneigée", "Option C: Terrasse de café", "Option D: Parc municipal"], ans: 0 },
    { opt: ["Option A: Entrée du supermarché", "Option B: Boulangerie artisanale", "Option C: Station de métro", "Option D: Arrêt de bus"], ans: 1 },
    { opt: ["Option A: Horloge de la gare", "Option B: Distributeur automatique", "Option C: Panneau d'affichage", "Option D: Guichet d'accueil"], ans: 0 },
    { opt: ["Option A: Camion de livraison", "Option B: Voiture électrique", "Option C: Vélo en libre-service", "Option D: Autobus urbain"], ans: 0 }
  ];
  return optionsList[sceneIdx % optionsList.length];
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

function generateListeningQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
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
    const t = customizeListeningTopicForPaper(rawT, i, prefix, seedOffset);

    const isQuestionInAudio = i <= 29;

    let rawImages: string[] | undefined = undefined;
    let mainImage: string | undefined = undefined;
    let mainImageSvg: string | undefined = undefined;

    if (i <= 4) {
      mainImageSvg = getOfficialLineArtSvg(i, seedOffset);
    }

    let topicOpt = t.opt;
    let topicAns = t.ans;

    if (i <= 4) {
      const sceneIdx = ((seedOffset % 10) * 4) + (i - 1);
      const props = getDrawingPropositions(sceneIdx);
      topicOpt = props.opt;
      topicAns = props.ans;
    }

    const seed = seedOffset * 100 + i;
    const { options, correctIndex, correctText, optionImages } = shuffleOptions(topicOpt, topicAns, seed, rawImages);

    const itemLevel = t.level || "A1";
    const specificHint = (t as any).hint || `Level ${itemLevel} Listening Guidance: Focus on the speaker's main intent and tone. Pay attention to key transition words (e.g. "cependant", "en revanche") to identify the correct message without guessing.`;

    let questionTextPrompt = (t as any).q;
    if (!questionTextPrompt) {
      const lowerTitle = (t.title || '').toLowerCase();
      if (lowerTitle.includes('gare') || lowerTitle.includes('aéroport') || lowerTitle.includes('bus') || lowerTitle.includes('vol')) {
        questionTextPrompt = "Quelle est l'information essentielle concernant le lieu, le quai ou la porte d'embarquement ?";
      } else if (lowerTitle.includes('supermarché') || lowerTitle.includes('magasin') || lowerTitle.includes('boutique') || lowerTitle.includes('pizzeria')) {
        questionTextPrompt = "Quel est le lieu où se trouve la personne ou la promotion annoncée ?";
      } else if (lowerTitle.includes('météo')) {
        questionTextPrompt = "Quel conseil ou prévision météorologique est annoncé pour la journée ?";
      } else if (lowerTitle.includes('livraison') || lowerTitle.includes('colis') || lowerTitle.includes('rendez-vous') || lowerTitle.includes('mécanicien')) {
        questionTextPrompt = "Quelle est la date, l'heure ou la consigne exacte transmise dans ce message ?";
      } else if (lowerTitle.includes('sécurité') || lowerTitle.includes('incendie') || lowerTitle.includes('copropriété') || lowerTitle.includes('entreprise')) {
        questionTextPrompt = "Quelle consigne de sécurité ou quel changement d'organisation devez-vous suivre ?";
      } else {
        questionTextPrompt = "Quel est l'élément ou le message principal à retenir de ce document sonore ?";
      }
    }

    const isMaleSpeaker = i % 2 === 1;
    const passageSpeakerLabel = isMaleSpeaker ? "Locuteur" : "Locutrice";
    const announcerLabel = isMaleSpeaker ? "Annonceuse" : "Annonceur";

    const isSpokenOptionQuestion = (i >= 5 && i <= 8);

    let fullSpokenTranscript = isQuestionInAudio
      ? (isSpokenOptionQuestion
        ? `${passageSpeakerLabel}: ${t.tr}\n${announcerLabel}: Écoutez la question et les 4 réponses. Question N°${i} : ${questionTextPrompt}\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`
        : `${passageSpeakerLabel}: ${t.tr}\n${announcerLabel}: Écoutez la question. Question N°${i} : ${questionTextPrompt}`)
      : t.tr;

    if (i <= 4 && mainImageSvg) {
      fullSpokenTranscript = `${announcerLabel}: Consigne : Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`;
    }

    const speakingRate = i <= 7 ? 0.85 : i <= 15 ? 0.92 : i <= 25 ? 1.00 : i <= 33 ? 1.15 : 1.30;

    let spokenEnglishTranslation = t.en;
    if (i <= 4 && mainImageSvg) {
      spokenEnglishTranslation = `Instruction: Listen to the 4 options. Choose the option that corresponds to the image.\n• Option A: ${options[0]}\n• Option B: ${options[1]}\n• Option C: ${options[2]}\n• Option D: ${options[3]}`;
    } else if (isSpokenOptionQuestion) {
      spokenEnglishTranslation = `${t.en}\nInstruction: Listen to the audio document, question N°${i}, and 4 spoken options.\n• Option A: ${options[0]}\n• Option B: ${options[1]}\n• Option C: ${options[2]}\n• Option D: ${options[3]}`;
    }

    qList.push({
      id: `${prefix}-lis-${i}`,
      questionNumber: i,
      level: itemLevel,
      speakingRate,
      hasSpokenOptions: isSpokenOptionQuestion || (i <= 4 && !!mainImageSvg),
      text: i <= 4 && mainImageSvg
        ? "Écoutez les 4 propositions, choisissez celle qui correspond à l'image."
        : isSpokenOptionQuestion
        ? `Écoutez le document sonore, la question audio N°${i} et les 4 réponses. Cochez la bonne réponse.`
        : isQuestionInAudio
        ? `Écoutez le document sonore et la question audio N°${i}. Choisissez la bonne option.`
        : `${t.text}`,
      options,
      optionImages,
      mainImage,
      mainImageSvg,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${itemLevel}]: The spoken document confirms "${correctText}".`,
      hint: specificHint,
      transcript: fullSpokenTranscript,
      transcriptEnglish: spokenEnglishTranslation,
      questionInAudio: isQuestionInAudio,
      perQuestionTimerSeconds: 15
    });
  }
  return qList;
}

function generateReadingQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
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
