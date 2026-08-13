import { getHdIllustration } from "./hdIllustrationAssets";
import { getPracticeQuestionTranslation } from "./practiceListeningTranslations";
import { translateOptionMaster } from "./masterOptionsDictionary";
import { getAuthenticB2Item, getAuthenticC1C2Item } from "./authenticListeningAdvancedBank";
import { getQuestionGuidance } from "./practiceGuidanceBank";

export type ExamType = "TCF_CANADA" | "TEF_CANADA";
export type ExamMode = "PRACTICE" | "EXAM";
export type SectionType = "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  level?: string;
  speakingRate?: number;
  text: string;
  questionPrompt?: string;
  questionPromptEnglish?: string;
  options: string[];
  optionsEnglish?: string[];
  optionImages?: string[];
  mainImage?: string;
  hasSpokenOptions?: boolean;
  correctIndex: number;
  explanation: string;
  hint?: string;
  trapAlert?: string;
  trapAlertEn?: string;
  audioCoach?: string;
  audioCoachEn?: string;
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

function getDrawingPropositions(sceneIdx: number): { opt: string[]; optEn: string[]; ans: number; type: string } {
  const optionsList = [
    // Scene 0: P1Q1 (SPEECH_ACT - Train Station Platform) [tcf_p1_q1.png]
    {
      opt: ["Pardon monsieur, à quelle heure arrive le train sur ce quai ?","L'addition s'il vous plaît, nous allons régler par carte bancaire.","Où se trouvent les cabines d'essayage pour essayer ce pantalon ?","Deux places pour la séance de vingt heures, s'il vous plaît."],
      optEn: ["Excuse me sir, what time does the train arrive at this platform?","The check please, we will pay by credit card.","Where are the fitting rooms to try on these pants?","Two tickets for the eight o'clock movie screening, please."],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 1: P1Q2 (SCENE_DESCRIPTION - Bakery Storefront) [tcf_p1_q2.png]
    {
      opt: ["Un mécanicien répare une voiture dans un garage.","Un client achète du pain et des croissants dans une boulangerie.","Des passagers montent à bord d'un avion sur la piste.","Une femme fait du sport sur un tapis de course."],
      optEn: ["A mechanic is repairing a car inside a garage.","A customer is buying bread and croissants in a bakery.","Passengers are boarding an airplane on the tarmac.","A woman is exercising on a treadmill."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 2: P1Q3 (SPEECH_ACT - Airport Boarding Lounge) [tcf_p1_q3.png]
    {
      opt: ["Avez-vous une table libre pour quatre personnes en terrasse ?","Pourriez-vous me prescrire un sirop pour la toux ?","Mon vol pour Montréal est-il bien prévu à l'heure à cette porte d'embarquement ?","Je cherche le rayon des produits laitiers et des œufs frais."],
      optEn: ["Do you have an available table for four people on the terrace?","Could you prescribe me a cough syrup?","Is my flight to Montreal scheduled on time at this boarding gate?","I am looking for the dairy products and fresh eggs aisle."],
      ans: 2,
      type: "SPEECH_ACT"
    },
    // Scene 3: P1Q4 (SCENE_DESCRIPTION - Doctor Medical Consultation) [tcf_p1_q4.png]
    {
      opt: ["Un médecin écoute et conseille une patiente assise dans son cabinet de consultation.","Un serveur prend la commande de clients au restaurant.","Un facteur dépose une lettre dans une boîte postale.","Des musiciens répètent un morceau dans une salle de concert."],
      optEn: ["A doctor is listening to and advising a patient seated in his consultation office.","A waiter is taking customer orders at a restaurant.","A mail carrier is dropping a letter into a mailbox.","Musicians are rehearsing a piece in a concert hall."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 4: P2Q1 (SPEECH_ACT - Supermarket Checkout Counter) [tcf_p2_q1.png]
    {
      opt: ["Bonjour, je vais régler mes courses par carte bancaire sans contact, s'il vous plaît.","Où se trouve le quai pour prendre le train vers Québec ?","Pourriez-vous me couper les cheveux un peu plus court sur les côtés ?","Deux billets pour la pièce de théâtre de ce soir, s'il vous plaît."],
      optEn: ["Hello, I will pay for my groceries with contactless debit card, please.","Where is the platform to catch the train to Quebec City?","Could you cut my hair a bit shorter on the sides?","Two tickets for tonight's theater play, please."],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 5: P2Q2 (SCENE_DESCRIPTION - Bus Stop in the Rain) [tcf_p2_q2.png]
    {
      opt: ["Des skieurs descendent une piste de montagne enneigée.","Une femme avec un parapluie attend le bus sous l'abribus pendant qu'un autobus arrive.","Un cuisinier prépare un repas dans une cuisine de restaurant.","Un client essaie une paire de chaussures dans un magasin."],
      optEn: ["Skiers are heading down a snowy mountain slope.","A woman with an umbrella is waiting under a bus shelter as a bus arrives.","A cook is preparing a meal in a restaurant kitchen.","A customer is trying on a pair of shoes in a store."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 6: P2Q3 (SPEECH_ACT - Terrace Cafe) [tcf_p2_q3.png]
    {
      opt: ["Pouvez-vous vérifier la pression des pneus de ma voiture ?","Mon passeport expire dans deux mois, puis-je voyager ?","Garçon, nous prendrons deux cafés crème et un verre d'eau, s'il vous plaît.","Je cherche des timbres pour envoyer une carte postale à l'étranger."],
      optEn: ["Could you check the tire pressure on my car?","My passport expires in two months, can I travel?","Waiter, we will have two white coffees and a glass of water, please.","I am looking for stamps to send a postcard abroad."],
      ans: 2,
      type: "SPEECH_ACT"
    },
    // Scene 7: P2Q4 (SCENE_DESCRIPTION - Metro Ticket Vending Machine) [tcf_p2_q4.png]
    {
      opt: ["Un voyageur achète un titre de transport sur un distributeur automatique dans une station de métro.","Des clients dégustent des pâtisseries dans un salon de thé.","Un médecin examine un patient dans un hôpital.","Un jardinier arrose des fleurs dans un parc public."],
      optEn: ["A commuter is purchasing a transit ticket on an automated vending machine inside a subway station.","Customers are tasting pastries in a tea room.","A doctor is examining a patient in a hospital.","A gardener is watering flowers in a public park."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 8: P3Q1 (SPEECH_ACT - Supermarket Produce Aisle) [tcf_p3_q1.png]
    {
      opt: ["Combien coûte le kilo de ces belles tomates fraîches ?","À quelle heure part le prochain vol pour Paris ?","Avez-vous une chambre d'hôtel avec vue sur la mer ?","Je souhaite faire réparer le frein arrière de mon vélo."],
      optEn: ["How much does a kilogram of these fresh tomatoes cost?","What time does the next flight to Paris depart?","Do you have a hotel room with a sea view?","I would like to have the rear brake of my bicycle repaired."],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 9: P3Q2 (SCENE_DESCRIPTION - Airport Baggage Carousel) [tcf_p3_q2.png]
    {
      opt: ["Des spectateurs assistent à une projection de film au cinéma.","Des voyageurs attendent et récupèrent leurs valises autour du tapis roulant de l'aéroport.","Un facteur distribue le courrier dans un immeuble résidentiel.","Des étudiants prennent des notes dans un amphithéâtre universitaire."],
      optEn: ["Spectators are watching a movie screening at the cinema.","Travelers are waiting for and collecting their suitcases around the airport baggage carousel.","A mail carrier is delivering mail in a residential building.","Students are taking notes in a university lecture hall."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 10: P3Q3 (SPEECH_ACT - Bakery Pastry Counter) [tcf_p3_q3.png]
    {
      opt: ["Pourriez-vous me faire le plein d'essence sans plomb ?","Je prendrai deux croissants au beurre et cette tartelette aux fruits, s'il vous plaît.","Avez-vous des médicaments contre le mal de tête ?","Où se trouve la porte d'embarquement numéro douze ?"],
      optEn: ["Could you fill up the tank with unleaded gasoline?","I will take two butter croissants and this fruit tartlet, please.","Do you have any medication for headaches?","Where is boarding gate number twelve located?"],
      ans: 1,
      type: "SPEECH_ACT"
    },
    // Scene 11: P3Q4 (SCENE_DESCRIPTION - Tourist with City Map at Street Corner) [tcf_p3_q4.png]
    {
      opt: ["Un jeune homme consulte un plan de ville au coin d'une rue pour trouver son chemin.","Un cuisinier découpe des légumes sur une planche en bois.","Un mécanicien gonfle les pneus d'un camion dans un atelier.","Une cliente essaie des lunettes devant une vitrine."],
      optEn: ["A young man is consulting a city map at a street corner to find his way.","A cook is cutting vegetables on a wooden cutting board.","A mechanic is inflating truck tires in a workshop.","A customer is trying on glasses in front of a storefront."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 12: P4Q1 (SPEECH_ACT - Medical Clinic Consultation) [tcf_p4_q1.png]
    {
      opt: ["Docteur, j'ai des douleurs au dos depuis quelques jours, pouvez-vous m'examiner ?","Un billet aller-retour pour Montréal en seconde classe, s'il vous plaît.","Combien coûte cette paire de bottes d'hiver en vitrine ?","Je voudrais commander une pizza quatre fromages à emporter."],
      optEn: ["Doctor, I have had back pain for a few days, could you examine me?","A round-trip ticket to Montreal in standard class, please.","How much does this pair of winter boots in the window cost?","I would like to order a four-cheese pizza for takeout."],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 13: P4Q2 (SCENE_DESCRIPTION - Library Book Return Counter) [tcf_p4_q2.png]
    {
      opt: ["Des passagers s'enregistrent pour un vol international.","Un lecteur rend des livres à la bibliothécaire au comptoir d'une bibliothèque.","Des athlètes s'entraînent sur une piste d'athlétisme.","Un boulanger prépare de la pâte à pain dans son fournil."],
      optEn: ["Passengers are checking in for an international flight.","A reader is returning books to the librarian at a library service desk.","Athletes are training on a running track.","A baker is preparing bread dough in his bakehouse."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 14: P4Q3 (SPEECH_ACT - Metro Ticket Vending Machine) [tcf_p4_q3.png]
    {
      opt: ["Pouvez-vous me couper les pointes et faire un brushing ?","Je sélectionne sur l'écran tactile pour acheter mon titre de transport mensuel.","Avez-vous une chambre calme avec salle de bain privée ?","Quel est le plat du jour aujourd'hui au menu ?"],
      optEn: ["Could you trim my ends and do a blowout hairstyle?","I am selecting on the touchscreen to buy my monthly transit pass.","Do you have a quiet room with a private bathroom?","What is the daily special on today's menu?"],
      ans: 1,
      type: "SPEECH_ACT"
    },
    // Scene 15: P4Q4 (SCENE_DESCRIPTION - Open-Air Farmers Market) [tcf_p4_q4.png]
    {
      opt: ["Des clients choisissent des fruits et légumes frais sur les étals d'un marché en plein air.","Un automobiliste fait laver sa voiture dans une station automatique.","Des voyageurs montent les marches d'un escalier mécanique.","Un serveur nettoie des verres derrière le comptoir d'un bar."],
      optEn: ["Customers are choosing fresh fruits and vegetables at stalls in an open-air market.","A driver is getting their car washed at an automated car wash.","Travelers are going up the steps of an escalator.","A bartender is cleaning glasses behind a bar counter."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 16: P5Q1 (SPEECH_ACT - Auto Repair Garage) [tcf_p5_q1.png]
    {
      opt: ["Le moteur fait un bruit anormal sous le capot, pouvez-vous vérifier les bougies et l'huile ?","Deux timbres pour l'Europe et une enveloppe matelassée, s'il vous plaît.","Où se trouve le rayon des pantalons et des chemises pour hommes ?","Pouvez-vous me prêter ce livre pour trois semaines ?"],
      optEn: ["The engine is making an unusual noise under the hood, could you check the spark plugs and oil?","Two stamps for Europe and a padded envelope, please.","Where is the men's trousers and shirts department located?","Could you lend me this book for three weeks?"],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 17: P5Q2 (SCENE_DESCRIPTION - Airport Check-In Counter) [tcf_p5_q2.png]
    {
      opt: ["Un client commande un café au comptoir d'un bistrot.","Un passager présente son passeport à l'agente au comptoir d'enregistrement de l'aéroport.","Un vendeur emballe un bouquet de fleurs chez le fleuriste.","Un policier contrôle les papiers d'un automobiliste sur la route."],
      optEn: ["A customer is ordering a coffee at a bistro counter.","A passenger is presenting his passport to the agent at an airport check-in desk.","A florist is wrapping a bouquet of flowers in a flower shop.","A police officer is inspecting a driver's documents on the road."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 18: P5Q3 (SPEECH_ACT - Supermarket Cashier Checkout) [tcf_p5_q3.png]
    {
      opt: ["À quelle heure ferme le musée des beaux-arts ce soir ?","Avez-vous besoin d'un sac pour ranger vos courses alimentaires ?","Puis-je essayer cette veste en cuir dans la cabine du fond ?","Pouvez-vous m'indiquer le chemin pour rejoindre la mairie ?"],
      optEn: ["What time does the fine arts museum close tonight?","Do you need a grocery bag to pack your food items?","May I try on this leather jacket in the fitting room at the back?","Could you tell me the directions to reach the city hall?"],
      ans: 1,
      type: "SPEECH_ACT"
    },
    // Scene 19: P5Q4 (SCENE_DESCRIPTION - Clothing Store Mirror Fitting) [tcf_p5_q4.png]
    {
      opt: ["Une cliente essaie un manteau d'hiver devant un miroir dans une boutique de vêtements.","Une femme fait réparer sa bicyclette dans un atelier associatif.","Des spectateurs applaudissent à la fin d'une pièce de théâtre.","Un facteur dépose des colis dans un casier postal."],
      optEn: ["A customer is trying on a winter coat in front of a mirror in a clothing boutique.","A woman is getting her bicycle repaired in a community workshop.","Audience members are applauding at the end of a theatrical play.","A postal worker is placing parcels into a parcel locker."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 20: P6Q1 (SPEECH_ACT - Restaurant Dining Table Service) [tcf_p6_q1.png]
    {
      opt: ["Voici vos deux plats chauds, bon appétit à vous deux !","Pourriez-vous me peser ce paquet pour un envoi express ?","Avez-vous ce modèle de baskets de sport en pointure 42 ?","Combien coûte le plein d'essence pour cette voiture ?"],
      optEn: ["Here are your two hot entrees, enjoy your meal to both of you!","Could you weigh this package for express shipping?","Do you have this sneaker model in shoe size 42?","How much does a full tank of gas cost for this vehicle?"],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 21: P6Q2 (SCENE_DESCRIPTION - Shoe Store Fitting) [tcf_p6_q2.png]
    {
      opt: ["Un cuisinier dresse des assiettes gastronomiques en cuisine.","Un client essaie une paire de chaussures en cuir aidé par une vendeuse dans un magasin.","Un voyageur composte son billet à l'entrée du train.","Un étudiant consulte des dictionnaires dans une bibliothèque."],
      optEn: ["A chef is plating gourmet dishes in a restaurant kitchen.","A customer is trying on a pair of leather shoes assisted by a sales clerk in a store.","A commuter is validating their train ticket at the station entrance.","A student is consulting dictionaries in a library."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 22: P6Q3 (SPEECH_ACT - Fitness Gym Workout) [tcf_p6_q3.png]
    {
      opt: ["Quel est le prix de cette boîte de chocolats artisanaux ?","Je termine ma série sur ce tapis de course dans deux minutes si vous voulez la machine.","Pouvez-vous me couper les cheveux plus court sur la nuque ?","À quelle heure décolle le vol vers Vancouver ce soir ?"],
      optEn: ["What is the price of this box of artisanal chocolates?","I am finishing my workout set on this treadmill in two minutes if you want the machine.","Could you cut my hair shorter on the back of the neck?","What time does the flight to Vancouver take off tonight?"],
      ans: 1,
      type: "SPEECH_ACT"
    },
    // Scene 23: P6Q4 (SCENE_DESCRIPTION - Cinema Box Office) [tcf_p6_q4.png]
    {
      opt: ["Des clients font la queue au guichet pour acheter des places de cinéma.","Des randonneurs marchent le long d'un lac en montagne.","Un mécanicien change la roue d'un véhicule utilitaire.","Une coiffeuse fait un shampoing à une cliente dans un salon."],
      optEn: ["Customers are waiting in line at the box office to purchase cinema tickets.","Hikers are walking along a mountain lake trail.","A mechanic is replacing a wheel on a utility vehicle.","A hairdresser is shampooing a client's hair in a salon."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 24: P7Q1 (SPEECH_ACT - Parisian Taxi Stand) [tcf_p7_q1.png]
    {
      opt: ["Bonjour chauffeur, pouvez-vous m'emmener à l'aéroport international, s'il vous plaît ?","Une baguette pas trop cuite et deux croissants, s'il vous plaît.","Puis-je essayer cette paire de chaussures en taille 41 ?","Où se trouve la pharmacie de garde la plus proche ?"],
      optEn: ["Hello driver, could you take me to the international airport, please?","A lightly baked baguette and two croissants, please.","May I try on this pair of shoes in size 41?","Where is the nearest on-duty pharmacy located?"],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 25: P7Q2 (SCENE_DESCRIPTION - Bookstore Aisles) [tcf_p7_q2.png]
    {
      opt: ["Un mécanicien répare une voiture dans un garage.","Un client feuillette des livres devant les étagères d'une librairie.","Des passagers montent dans un train à la gare.","Un médecin ausculte un patient dans son cabinet."],
      optEn: ["A mechanic is repairing a car in a garage.","A customer is browsing books in front of bookstore shelves.","Passengers are boarding a train at the railway station.","A doctor is examining a patient in his clinic."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 26: P7Q3 (SPEECH_ACT - Optician Shop) [tcf_p7_q3.png]
    {
      opt: ["Une table pour deux personnes en terrasse, s'il vous plaît.","Puis-je essayer cette monture noire devant le miroir pour voir si elle me va bien ?","Quel est le prix du billet de train pour Montréal ?","Pouvez-vous me couper les cheveux plus court sur les côtés ?"],
      optEn: ["A table for two on the terrace, please.","May I try on these black frames in front of the mirror to see if they suit me?","What is the train ticket price to Montreal?","Could you cut my hair shorter on the sides?"],
      ans: 1,
      type: "SPEECH_ACT"
    },
    // Scene 27: P7Q4 (SCENE_DESCRIPTION - Museum Art Gallery) [tcf_p7_q4.png]
    {
      opt: ["Des visiteurs contemplent des tableaux exposés sur les murs d'un musée.","Des clients font leurs courses dans un supermarché.","Un serveur apporte des boissons à des clients au café.","Des voyageurs attendent un bus sous un abribus."],
      optEn: ["Visitors are admiring paintings displayed on museum gallery walls.","Customers are doing their grocery shopping in a supermarket.","A waiter is bringing drinks to customers at a cafe.","Commuters are waiting for a bus under a bus shelter."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 28: P8Q1 (SPEECH_ACT - Ice Cream Parlor) [tcf_p8_q1.png]
    {
      opt: ["Une glace deux boules vanille et fraise avec un peu de chantilly, s'il vous plaît.","Je souhaite renouveler mon abonnement de transport mensuel.","Avez-vous une boîte de pansements stériles et de l'alcool ?","Pourriez-vous vérifier la batterie de mon véhicule ?"],
      optEn: ["A two-scoop vanilla and strawberry ice cream with whipped cream, please.","I would like to renew my monthly transit pass.","Do you have a box of sterile bandages and rubbing alcohol?","Could you check the battery on my car?"],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 29: P8Q2 (SCENE_DESCRIPTION - Open-Air Organic Market) [tcf_p8_q2.png]
    {
      opt: ["Un automobiliste fait le plein d'essence à la station-service.","Des passants achètent des fruits et légumes frais sur un marché de rue.","Une cliente essaie une robe dans une boutique de mode.","Des spectateurs achètent des billets au guichet du théâtre."],
      optEn: ["A motorist is filling up with gas at a gas station.","Passersby are buying fresh fruits and vegetables at an open-air street market.","A customer is trying on a dress in a fashion boutique.","Spectators are purchasing tickets at a theater box office."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 30: P8Q3 (SPEECH_ACT - Railway Information Counter) [tcf_p8_q3.png]
    {
      opt: ["Je voudrais commander une formule déjeuner avec boisson.","Bonjour madame, pouvez-vous m'indiquer le quai de correspondance pour le prochain train ?","Combien coûte cette paire de lunettes de soleil ?","Puis-je avoir un rendez-vous avec le médecin pour demain matin ?"],
      optEn: ["I would like to order a lunch meal with beverage.","Hello madam, could you tell me the connecting platform for the next train?","How much does this pair of sunglasses cost?","May I have an appointment with the doctor for tomorrow morning?"],
      ans: 1,
      type: "SPEECH_ACT"
    },
    // Scene 31: P8Q4 (SCENE_DESCRIPTION - Laundromat) [tcf_p8_q4.png]
    {
      opt: ["Une cliente charge du linge dans une machine à laver automatique.","Des voyageurs enregistrent leurs valises à l'aéroport.","Un cuisinier fait cuire des steaks sur une grille.","Des enfants jouent au ballon dans la cour d'école."],
      optEn: ["A customer is loading laundry into an automatic washing machine.","Travelers are checking in their suitcases at the airport.","A cook is grilling steaks on a grill.","Children are playing ball in a schoolyard."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 32: P9Q1 (SPEECH_ACT - Jewelry Boutique) [tcf_p9_q1.png]
    {
      opt: ["Pourriez-vous me montrer cette montre argentée exposée dans la vitrine ?","Un café noir et un croissant pur beurre, s'il vous plaît.","À quelle heure arrive le train en provenance de Québec ?","Où se trouve la cabine d'essayage pour essayer ce manteau ?"],
      optEn: ["Could you show me this silver watch displayed inside the glass case?","A black coffee and a pure butter croissant, please.","What time does the train arriving from Quebec City get in?","Where is the fitting room to try on this coat?"],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 33: P9Q2 (SCENE_DESCRIPTION - Cafeteria Sandwich Counter) [tcf_p9_q2.png]
    {
      opt: ["Un chauffeur de taxi attend des clients devant la gare.","Une employée prépare un sandwich frais derrière le comptoir d'une cafétéria.","Un photographe prend des clichés dans un studio photo.","Un facteur distribue des lettres dans des boîtes postales."],
      optEn: ["A taxi driver is waiting for customers outside the train station.","An employee is preparing a fresh sandwich behind a cafeteria counter.","A photographer is taking shots in a photo studio.","A mail carrier is delivering letters into mailboxes."],
      ans: 1,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 34: P9Q3 (SPEECH_ACT - Hardware Tool Store) [tcf_p9_q3.png]
    {
      opt: ["Deux billets pour la séance de cinéma de vingt heures.","Je cherche une boîte de vis et des chevilles adaptées pour fixer une étagère au mur.","Quel est le montant de l'addition pour la table numéro cinq ?","Mon ordonnance médicale est-elle prête à la pharmacie ?"],
      optEn: ["Two tickets for the eight o'clock movie screening.","I am looking for a box of screws and wall anchors to mount a shelf on the wall.","What is the check amount for table number five?","Is my medical prescription ready at the pharmacy?"],
      ans: 1,
      type: "SPEECH_ACT"
    },
    // Scene 35: P9Q4 (SCENE_DESCRIPTION - Alpine Ski Resort) [tcf_p9_q4.png]
    {
      opt: ["Des skieurs en tenue d'hiver ajustent leur matériel au bas des pistes.","Des baigneurs profitent du soleil sur une plage en été.","Un serveur apporte un plateau de boissons dans un restaurant.","Un garagiste effectue la vidange d'une voiture."],
      optEn: ["Skiers in winter gear are adjusting their equipment at the base of the slopes.","Swimmers are enjoying the sunshine on a beach in summer.","A server is carrying a tray of drinks in a restaurant.","A mechanic is changing the oil on a car."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 36: P10Q1 (SPEECH_ACT - University Amphitheater) [tcf_p10_q1.png]
    {
      opt: ["Excusez-moi professeur, pourriez-vous réexpliquer la formule écrite au tableau ?","Il me faut de la monnaie pour payer l'horodateur de stationnement.","Mon chat ne mange plus depuis deux jours, pouvez-vous l'examiner ?","Je voudrais acheter un jeu de cordes pour guitare acoustique."],
      optEn: ["Excuse me professor, could you please re-explain the formula written on the board?","I need some coins to pay for the parking meter.","My cat hasn't eaten for two days, can you examine him?","I would like to buy a set of acoustic guitar strings."],
      ans: 0,
      type: "SPEECH_ACT"
    },
    // Scene 37: P10Q2 (SCENE_DESCRIPTION - Veterinary Clinic) [tcf_p10_q2.png]
    {
      opt: ["Un coiffeur rase la barbe d'un client au coupe-choux.","Un automobiliste règle son péage à une barrière d'autoroute.","Un mécanicien remplace une roue crevée sur un utilitaire.","Un vétérinaire en blouse ausculte un chat posé sur une table de consultation."],
      optEn: ["A barber is shaving a customer's beard with a straight razor.","A driver is paying toll at a highway toll booth.","A mechanic is replacing a flat tire on a van.","A veterinarian in a white coat is examining a cat on an examination table."],
      ans: 3,
      type: "SCENE_DESCRIPTION"
    },
    // Scene 38: P10Q3 (SPEECH_ACT - Musical Instrument Store) [tcf_p10_q3.png]
    {
      opt: ["Avez-vous des manuels d'histoire pour les cours universitaires ?","Ce médicament pour animal est-il délivré sans ordonnance ?","Un ticket de stationnement pour deux heures dans cette zone, s'il vous plaît.","Puis-je accorder cette guitare acoustique et la tester quelques minutes ?"],
      optEn: ["Do you have history textbooks for university courses?","Is this pet medication available without a prescription?","A two-hour parking ticket for this street zone, please.","May I tune this acoustic guitar and test it out for a few minutes?"],
      ans: 3,
      type: "SPEECH_ACT"
    },
    // Scene 39: P10Q4 (SCENE_DESCRIPTION - Street Parking Meter) [tcf_p10_q4.png]
    {
      opt: ["Un automobiliste insère de la monnaie dans un horodateur sur le trottoir.","Un cuisinier fait griller des aliments sur une plaque chauffante.","Un serveur nettoie les verres au bar d'un bistrot.","Un marin décharge des caisses de poissons d'un chalutier."],
      optEn: ["A motorist is inserting coins into a sidewalk parking meter.","A cook is grilling food on a hot griddle plate.","A server is wiping glasses at a bistro bar.","A fisherman is unloading crates of fish from a trawler."],
      ans: 0,
      type: "SCENE_DESCRIPTION"
    },
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


export function getB2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  q: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
  optionsEnglish?: string[];
  questionPromptEnglish?: string;
} {
  const item = getAuthenticB2Item(sceneIdx);
  return {
    opt: [...item.optionsFr],
    ans: item.ans,
    title: item.title,
    text: item.qFr,
    q: item.qFr,
    tr: item.audioFr,
    en: item.audioEn,
    hint: item.hint,
    level: item.level,
    optionsEnglish: [...item.optionsEn],
    questionPromptEnglish: item.qEn
  };
}

export function getC1C2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  q: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
  optionsEnglish?: string[];
  questionPromptEnglish?: string;
} {
  const item = getAuthenticC1C2Item(sceneIdx);
  return {
    opt: [...item.optionsFr],
    ans: item.ans,
    title: item.title,
    text: item.qFr,
    q: item.qFr,
    tr: item.audioFr,
    en: item.audioEn,
    hint: item.hint,
    level: item.level,
    optionsEnglish: [...item.optionsEn],
    questionPromptEnglish: item.qEn
  };
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


export const QUESTION_PROMPT_ENGLISH_MAP: Record<string, string> = {
  "Pourquoi la personne laisse-t-elle ce message téléphonique ?": "Why is the person leaving this phone message?",
  "Quel argument principal est formulé pour justifier une réorientation stratégique ?": "What primary argument is put forward to justify a strategic policy pivot?",
  "Quel avantage principal présente cette nouvelle habitude d'achat ?": "What is the main advantage of this new purchasing habit?",
  "Quel compromis fiscal est privilégié dans ce débat municipal ?": "What tax compromise is favored in this municipal debate?",
  "Quel conseil est préconisé par les spécialistes de santé ?": "What advice is recommended by health specialists?",
  "Quel est l'objectif ou le message central de ce document sonore ?": "What is the central objective or message of this audio document?",
  "Quel est l'objectif principal de cet événement culturel ?": "What is the primary objective of this cultural event?",
  "Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?": "What is the main outcome of the 4-day workweek trial?",
  "Quel est le sujet principal de ce message sonore ?": "What is the main topic of this audio message?",
  "Quel risque systémique majeur est identifié par l'économiste ?": "What major systemic risk is identified by the economist?",
  "Quelle approche technique est privilégiée par les ingénieurs municipaux ?": "What technical approach is favored by municipal engineers?",
  "Quelle condition technique est jugée indispensable pour valider ce projet ?": "What technical condition is deemed essential to approve this project?",
  "Quelle est la consigne communiquée aux clients ?": "What instruction is communicated to customers?",
  "Quelle est la mesure prioritaire défendue lors de cette concertation ?": "What is the priority measure advocated during this consultation?",
  "Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?": "What is the reaction of most citizens to these new developments?",
  "Quelle est la tendance observée sur le marché immobilier local ?": "What trend is observed in the local real estate market?",
  "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?": "What is the central thesis developed by the speaker during this presentation?",
  "Quelle information importante est annoncée aux voyageurs ?": "What important information is announced to passengers?",
  "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?": "What major warning is expressed regarding these intervention technologies?",
  "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?": "What conceptual shift does the researcher highlight in their analysis?",
  "Quelle offre spéciale est proposée aux clients ?": "What special offer is being proposed to customers?",
  "Quelle orientation d'urbanisme est préconisée par les experts ?": "What urban planning direction is recommended by experts?",
  "Quelle préoccupation principale est exprimée concernant ces outils numériques ?": "What primary concern is expressed regarding these digital management tools?",
  "Quelle revendication majeure est portée par les représentants des travailleurs ?": "What major demand is brought forward by worker representatives?",
  "Quelle stratégie environnementale est mise en avant dans cette allocution ?": "What environmental strategy is highlighted in this address?",
  "Quelle thèse épistémologique est défendue par la linguiste ?": "What epistemological thesis is defended by the linguist?",
  "Quelles sont les prévisions météorologiques annoncées ?": "What weather forecast is announced?",
  "Écoutez les 4 propositions, choisissez celle qui correspond à l'image.": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image."
};

export function translateOptionToEnglish(opt: string): string {
  if (!opt) return "";
  return translateOptionMaster(opt);
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
    const { options, correctIndex, correctText, optionImages, optionsEnglish: shuffledOptionsEn } = shuffleOptions(topicOpt, topicAns, seed, rawImages, (t as any).optionsEnglish);

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

    const questionId = `${prefix}-lis-${i}`;
    const practiceTr = getPracticeQuestionTranslation(questionId);

    const speakingRate = i <= 7 ? 0.85 : i <= 15 ? 0.92 : i <= 25 ? 1.00 : i <= 33 ? 1.15 : i <= 36 ? 1.25 : 1.30;

    const optionsEn0 = shuffledOptionsEn?.[0] || (t as any).optionsEnglish?.[0] || translateOptionToEnglish(options[0]);
    const optionsEn1 = shuffledOptionsEn?.[1] || (t as any).optionsEnglish?.[1] || translateOptionToEnglish(options[1]);
    const optionsEn2 = shuffledOptionsEn?.[2] || (t as any).optionsEnglish?.[2] || translateOptionToEnglish(options[2]);
    const optionsEn3 = shuffledOptionsEn?.[3] || (t as any).optionsEnglish?.[3] || translateOptionToEnglish(options[3]);

    let questionPromptEn = QUESTION_PROMPT_ENGLISH_MAP[questionTextPrompt] || (t as any).questionPromptEnglish;
    if (!questionPromptEn) {
      questionPromptEn = questionTextPrompt;
    }

    const passageTextEn = (t.en || "").replace(/^(?:Speaker|Locut(?:eur|rice))\s*\d*:\s*/gm, "").trim();
    const passageSpeakerLabelEn = isMaleSpeaker ? "Speaker" : "Speaker";
    const announcerLabelEn = "Announcer";
    let spokenEnglishTranslation = t.en;

    if (i <= 4) {
      fullSpokenTranscript = `${announcerLabel}: Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\n... Proposition A : ${options[0]}.\n... Proposition B : ${options[1]}.\n... Proposition C : ${options[2]}.\n... Proposition D : ${options[3]}.`;
      spokenEnglishTranslation = `${announcerLabelEn}: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: ${optionsEn0}.\n... Option B: ${optionsEn1}.\n... Option C: ${optionsEn2}.\n... Option D: ${optionsEn3}.`;
    } else if (isSpokenOptionQuestion) {
      fullSpokenTranscript = `${passageSpeakerLabel}: ${passageBodyText}\n${announcerLabel}: Écoutez la question et les 4 réponses. Question N°${i} : ${questionTextPrompt}\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`;
      spokenEnglishTranslation = `${passageSpeakerLabelEn}: ${passageTextEn}\n${announcerLabelEn}: Listen to the question and the 4 options. Question N°${i}: ${questionPromptEn}\n... A: ${optionsEn0}.\n... B: ${optionsEn1}.\n... C: ${optionsEn2}.\n... D: ${optionsEn3}.`;
    } else if (isQuestionInAudio) {
      fullSpokenTranscript = `${passageSpeakerLabel}: ${passageBodyText}\n${announcerLabel}: Écoutez la question. Question N°${i} : ${questionTextPrompt}`;
      spokenEnglishTranslation = `${passageSpeakerLabelEn}: ${passageTextEn}\n${announcerLabelEn}: Listen to the question. Question N°${i}: ${questionPromptEn}`;
    } else {
      // Q30-Q39
      fullSpokenTranscript = passageBodyText;
      spokenEnglishTranslation = (i >= 26 && i <= 33) ? t.en : (t.en.startsWith("Speaker:") ? t.en : `Speaker: ${passageTextEn}`);
    }

    const finalQuestionPromptEnglish = (i <= 4 ? "Look at the image. Listen to the 4 options and choose the one that corresponds to the image." : ((t as any).questionPromptEnglish || questionPromptEn));
    const finalOptionsEnglish = (t as any).optionsEnglish || [optionsEn0, optionsEn1, optionsEn2, optionsEn3];
    const finalTranscriptEnglish = spokenEnglishTranslation;
    const finalPassageEnglish = passageTextEn;

    const guidance = getQuestionGuidance(i, itemLevel, questionTextPrompt, correctText, passageBodyText);

    qList.push({
      id: questionId,
      questionNumber: i,
      level: itemLevel,
      speakingRate,
      hasSpokenOptions: isSpokenOptionQuestion || i <= 4,
      questionPrompt: questionTextPrompt,
      questionPromptEnglish: finalQuestionPromptEnglish,
      text: i <= 4
        ? "Écoutez les 4 propositions, choisissez celle qui correspond à l'image."
        : questionTextPrompt,
      options,
      optionsEnglish: finalOptionsEnglish,
      optionImages,
      mainImage,
      correctIndex,
      explanation: guidance.detailedExplanation,
      hint: guidance.combinedHint,
      trapAlert: guidance.trapAlert,
      trapAlertEn: guidance.trapAlertEn,
      audioCoach: guidance.audioCoach,
      audioCoachEn: guidance.audioCoachEn,
      transcript: fullSpokenTranscript,
      transcriptEnglish: finalTranscriptEnglish,
      passage: passageBodyText,
      passageEnglish: finalPassageEnglish,
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
        : `Full-length standardized TCF test simulator paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 119 Mins).`,
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
    // Standardized 20-Point Scale Cutoffs for Writing & Speaking (CEFR Rubric)
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
