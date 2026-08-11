import fs from 'fs';

console.log("=== ⚙️ Generating 80 Completely Unique B2 Debate & Complex Topic Scenarios ===");

const cities = ["Montréal", "Québec", "Ottawa", "Toronto", "Vancouver", "Calgary", "Bordeaux", "Lyon", "Toulouse", "Nantes"];

const b2Topics = [
  // Paper 1 (Q26-Q33)
  { title: "Régulation de l'IA générative dans les médias de Montréal", opt: "La mise en place d'un étiquetage obligatoire des contenus générés par algorithme à Montréal", ans: 0 },
  { title: "Taxation du télétravail transfrontalier interprovincial à Montréal", opt: "La péréquation des recettes fiscales communales entre Montréal et ses villes dortoirs", ans: 0 },
  { title: "Interdiction des véhicules thermiques dans l'hypercentre de Montréal", opt: "La réduction des émissions toxiques tout en développant le réseau de tramway à Montréal", ans: 0 },
  { title: "Quotas de plastique recyclé dans l’agroalimentaire à Montréal", opt: "L'obligation pour les conditionneurs d'utiliser 40% de matières recyclées à Montréal", ans: 0 },
  { title: "Subventions aux installations solaires raccordées à Montréal", opt: "Une prise en charge de 35% des coûts d'équipement photovoltaïque pour les propriétaires de Montréal", ans: 0 },
  { title: "Service civique environnemental obligatoire pour les jeunes à Montréal", opt: "Le développement du sentiment citoyen et l'aménagement d'espaces verts collectifs à Montréal", ans: 0 },
  { title: "Contrôle algorithmique de la cadence de travail à Montréal", opt: "La dénonciation par les syndicats des risques de surmenage et d'intrusion dans la vie privée à Montréal", ans: 0 },
  { title: "Ecotaxe sur l'habillement synthétique importé à Montréal", opt: "La pénalisation de la fast-fashion au profit d'ateliers textiles locaux durables à Montréal", ans: 0 },

  // Paper 2 (Q26-Q33)
  { title: "Responsabilité juridique des plateformes d'hébergement touristique à Québec", opt: "Le plafonnement à 90 jours de location annuelle pour préserver le logement locatif à Québec", ans: 0 },
  { title: "Péage urbain dynamique à l'entrée de la ville de Québec", opt: "La tarification de la congestion pour financer l'électrification du réseau d'autobus de Québec", ans: 0 },
  { title: "Tarification progressive de l'eau potable résidentielle à Québec", opt: "La gratuité des volumes vitaux suivie d'une surtaxe sur le gaspillage d'eau à Québec", ans: 0 },
  { title: "Obligation de rénovation thermique pour les passoires énergétiques à Québec", opt: "L'obligation pour les bailleurs d'isoler les bâtiments avant toute révision de loyer à Québec", ans: 0 },
  { title: "Encadrement des loyers dans le secteur privé de Québec", opt: "La fixation d'un loyer de référence au mètre carré pour freiner la spéculation immobilière à Québec", ans: 0 },
  { title: "Remboursement des soins de médecine alternative par la santé publique à Québec", opt: "L'intégration sous conditions d'efficacité des thérapies complémentaires au régime de Québec", ans: 0 },
  { title: "Interdiction de la publicité pour les vols aériens courts à Québec", opt: "La suppression des réclames pour les lignes réalisables en moins de 3 heures de train depuis Québec", ans: 0 },
  { title: "Déploiement de la consigne en verre consignée à Québec", opt: "Le retour des bouteilles réutilisables dans tous les supermarchés de la région de Québec", ans: 0 },

  // Paper 3 (Q26-Q33)
  { title: "Semaine de travail de 32 heures sans perte de salaire à Ottawa", opt: "L'augmentation de la productivité horaire constatée dans les entreprises pilotes d'Ottawa", ans: 0 },
  { title: "Introduction de repas 100% biologiques et locaux dans les cantines d'Ottawa", opt: "L'approvisionnement exclusif auprès des fermes régionales entourant la ville d'Ottawa", ans: 0 },
  { title: "Interdiction des emballages plastiques à usage unique pour la restauration à Ottawa", opt: "Le passage au vaisselle lavable et réutilisable dans tous les fast-foods d'Ottawa", ans: 0 },
  { title: "Développement des voies réservées au covoiturage sur autoroute à Ottawa", opt: "L'autorisation d'accès limitée aux véhicules transportant au moins trois occupants à Ottawa", ans: 0 },
  { title: "Régulation des trottinettes électriques en libre-service à Ottawa", opt: "Le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à Ottawa", ans: 0 },
  { title: "Création d'une réserve naturelle périurbaine protégée à Ottawa", opt: "La préservation de la biodiversité locale contre le grignotage immobilier autour d'Ottawa", ans: 0 },
  { title: "Aide financière au remplacement des chaudières au fioul à Ottawa", opt: "L'octroi d'une prime de transition pour le raccordement au réseau de chaleur d'Ottawa", ans: 0 },
  { title: "Droit à la déconnexion numérique après les heures de bureau à Ottawa", opt: "L'interdiction d'envoyer des courriels professionnels le week-end aux employés d'Ottawa", ans: 0 },

  // Paper 4 (Q26-Q33)
  { title: "Mise en place du compostage obligatoire pour les ménages de Toronto", opt: "La collecte séparée des biodéchets ménagers dans tous les quartiers de Toronto", ans: 0 },
  { title: "Interdiction des vols de nuit à l'aéroport métropolitain de Toronto", opt: "La préservation du sommeil des riverains par l'arrêt des atterrissages entre 23h et 6h à Toronto", ans: 0 },
  { title: "Installation systématique de toitures végétalisées sur les neufs à Toronto", opt: "L'absorption des eaux de pluie et le rafraîchissement des immeubles neufs de Toronto", ans: 0 },
  { title: "Création d'un chèque culture annuel pour la jeunesse de Toronto", opt: "La distribution d'un crédit annuel pour l'achat de livres et billets de théâtre à Toronto", ans: 0 },
  { title: "Développement des fermes urbaines verticales en centre-ville de Toronto", opt: "La production maraîchère locale en circuit court sur les toits d'immeubles de Toronto", ans: 0 },
  { title: "Soutien financier aux réparateurs d'appareils électroniques à Toronto", opt: "L'attribution d'un bonus réparation pour prolonger la durée de vie des appareils à Toronto", ans: 0 },
  { title: "Limitation à 30 km/h de la vitesse de circulation en zone résidentielle à Toronto", opt: "La baisse des accidents mortels et du niveau sonore dans les rues de Toronto", ans: 0 },
  { title: "Obligation de parité hommes-femmes dans les conseils d'administration à Toronto", opt: "L'imposition de quotas de représentation équilibrée au sein des directions d'entreprises de Toronto", ans: 0 },

  // Paper 5 (Q26-Q33)
  { title: "Déploiement des navettes autonomes électriques sans chauffeur à Vancouver", opt: "La desserte automatique des zones industrielles excentrées de la région de Vancouver", ans: 0 },
  { title: "Financement des centres de soins vétérinaires publics à Vancouver", opt: "La prise en charge des urgences animales pour les propriétaires sous le seuil de pauvreté à Vancouver", ans: 0 },
  { title: "Plafonnement des tarifs d'électricité pendant les vagues de froid à Vancouver", opt: "Le gel des prix de l'énergie hivernale pour éviter la précarité énergétique à Vancouver", ans: 0 },
  { title: "Création de pistes de super-cyclisme éclairées la nuit à Vancouver", opt: "L'aménagement d'axes cyclables sécurisés et séparés reliant les banlieues à Vancouver", ans: 0 },
  { title: "Obligation de menus végétariens quotidiens dans la restauration collective à Vancouver", opt: "L'offre systématique d'une alternative végétale équilibrée dans les restaurants municipaux de Vancouver", ans: 0 },
  { title: "Interdiction des produits cosmétiques contenant des microplastiques à Vancouver", opt: "La protection des milieux marins et fluviaux en amont du traitement des eaux à Vancouver", ans: 0 },
  { title: "Développement du mentorat intergénérationnel dans les universités de Vancouver", opt: "L'accompagnement des jeunes diplômés par des retraités bénévoles expérimentés à Vancouver", ans: 0 },
  { title: "Légalisation des espaces de travail partagés dans les bibliothèques de Vancouver", opt: "La mise à disposition d'outils numériques modernes dans les équipements publics de Vancouver", ans: 0 },

  // Paper 6 (Q26-Q33)
  { title: "Renforcement des sanctions contre les dépôts sauvages de déchets à Calgary", opt: "L'installation de caméras mobiles et la hausse des amendes forfaitaires à Calgary", ans: 0 },
  { title: "Création de jardins partagés au pied des ensembles résidentiels à Calgary", opt: "L'octroi de parcelles cultivables gratuites aux associations de quartier de Calgary", ans: 0 },
  { title: "Soutien aux librairies indépendantes face à la vente en ligne à Calgary", opt: "La création d'un tarif postal préférentiel pour l'envoi de livres par les commerces de Calgary", ans: 0 },
  { title: "Interdiction du chauffage au bois individuel non certifié à Calgary", opt: "Le remplacement des vieux poêles par des foyers à granules hautement performants à Calgary", ans: 0 },
  { title: "Extension des horaires d'ouverture des équipements sportifs municipaux à Calgary", opt: "L'accès nocturne aux gymnases pour encourager la pratique sportive chez les travailleurs de Calgary", ans: 0 },
  { title: "Mise en place d'un passeport bénévole valorisable pour la retraite à Calgary", opt: "La reconnaissance comptable des heures d'engagement associatif dans le régime de Calgary", ans: 0 },
  { title: "Obligation de bilans thermiques gratuits avant toute vente immobilière à Calgary", opt: "L'information transparente des acheteurs sur la consommation d'énergie des logements de Calgary", ans: 0 },
  { title: "Développement des zones de silence dans les transports publics de Calgary", opt: "La réservation de wagons sans téléphone pour préserver la tranquillité des usagers à Calgary", ans: 0 },

  // Paper 7 (Q26-Q33)
  { title: "Régulation des tarifs des parkings souterrains du centre de Bordeaux", opt: "La baisse des prix de stationnement pour les résidents et la hausse pour les visiteurs à Bordeaux", ans: 0 },
  { title: "Création d'ateliers municipaux d'auto-réparation de vélos à Bordeaux", opt: "La fourniture d'outils et de conseils techniques gratuits pour entretenir sa bicyclette à Bordeaux", ans: 0 },
  { title: "Interdiction des écrans publicitaires vidéo énergivores dans les rues de Bordeaux", opt: "L'extinction des panneaux lumineux nocturnes pour économiser l'électricité à Bordeaux", ans: 0 },
  { title: "Expérimentation du revenu d'autonomie pour les jeunes de 18 à 25 ans à Bordeaux", opt: "Le versement d'une allocation mensuelle conditionnée au suivi d'une formation à Bordeaux", ans: 0 },
  { title: "Multiplication des bornes de recharge rapide pour véhicules électriques à Bordeaux", opt: "L'installation de prises publiques sur les parkings de tous les supermarchés de Bordeaux", ans: 0 },
  { title: "Subvention à l'achat de cuves de récupération d'eau de pluie à Bordeaux", opt: "L'aide financière aux particuliers pour l'arrosage écologique des jardins à Bordeaux", ans: 0 },
  { title: "Encadrement de l'utilisation des pesticides à proximité des habitations de Bordeaux", opt: "L'établissement d'une bande sanitaire de protection sans produits chimiques autour de Bordeaux", ans: 0 },
  { title: "Création d'un marché mensuel du réemploi et de la seconde main à Bordeaux", opt: "L'organisation d'une grande foire dédiée aux objets d'occasion sur la place centrale de Bordeaux", ans: 0 },

  // Paper 8 (Q26-Q33)
  { title: "Obligation d'ombrières photovoltaïques sur les grand parkings de Lyon", opt: "La couverture des espaces de stationnement commerciaux par des panneaux solaires à Lyon", ans: 0 },
  { title: "Développement des ressourceries de quartier pour le réemploi à Lyon", opt: "La collecte et le reconditionnement des meubles usagés par des chantiers d'insertion à Lyon", ans: 0 },
  { title: "Interdiction des emballages individuels pour les fruits et légumes à Lyon", opt: "La vente exclusivement en vrac ou en filet réutilisable sur les marchés de Lyon", ans: 0 },
  { title: "Création d'une carte d'abonnement universelle pour tous les musées de Lyon", opt: "L'accès illimité aux expositions temporaires et permanentes pour un tarif annuel fixe à Lyon", ans: 0 },
  { title: "Légalisation des terrasses végétalisées sur le domaine public de Lyon", opt: "L'autorisation donnée aux restaurateurs d'installer des bacs de plantes aromatiques à Lyon", ans: 0 },
  { title: "Soutien aux coopératives d'habitation à coût abordable à Lyon", opt: "La mise à disposition de terrains municipaux à prix coûtant pour construire solidaire à Lyon", ans: 0 },
  { title: "Renforcement du contrôle de la qualité de l'air dans les écoles de Lyon", opt: "L'équipement systématique des classes en capteurs de CO2 et purificateurs d'air à Lyon", ans: 0 },
  { title: "Mise en place de navettes fluviales régulières sur les cours d'eau de Lyon", opt: "Le transport alternatif des citoyens par bateau électrique pour désengorger les ponts de Lyon", ans: 0 },

  // Paper 9 (Q26-Q33)
  { title: "Encadrement des ouvertures dominicales des grands magasins à Toulouse", opt: "La limitation des dimanches travaillés assortie d'une majoration salariale obligatoire à Toulouse", ans: 0 },
  { title: "Création d'un réseau métropolitain d'auto-partage de voitures électriques à Toulouse", opt: "La mise à disposition de véhicules en libre-service dans chaque station de métro de Toulouse", ans: 0 },
  { title: "Subvention à la plantation de haies bocagères sur les terres agricoles près de Toulouse", opt: "Le soutien financier aux agriculteurs pour préserver la biodiversité et les sols autour de Toulouse", ans: 0 },
  { title: "Interdiction du démarchage téléphonique commercial non sollicité à Toulouse", opt: "Le blocage automatique des numéros d'entreprises non inscrites sur la liste rouge à Toulouse", ans: 0 },
  { title: "Extension du réseau de chauffage urbain issu de l'incinération à Toulouse", opt: "L'utilisation de la chaleur des déchets pour chauffer les logements collectifs de Toulouse", ans: 0 },
  { title: "Obligation de bornes fontaines d'eau potable dans tous les parcs de Toulouse", opt: "L'accès gratuit à l'eau potable fraîche pour les promeneurs et sportifs de Toulouse", ans: 0 },
  { title: "Soutien à la création de tiers-lieux d'artisanat d'art à Toulouse", opt: "La mise à disposition d'ateliers partagés pour les jeunes créateurs et artisans de Toulouse", ans: 0 },
  { title: "Mise en place de coussins berlinois pour freiner les voitures devant les écoles de Toulouse", opt: "L'aménagement de ralentisseurs sécurisés pour protéger les enfants aux abords des classes de Toulouse", ans: 0 },

  // Paper 10 (Q26-Q33)
  { title: "Tarification solidaire des transports en commun selon les revenus à Nantes", opt: "La gratuité totale des bus et tramways pour les étudiants et demandeurs d'emploi de Nantes", ans: 0 },
  { title: "Création d'une brigade municipale de protection des animaux à Nantes", opt: "L'intervention spécialisée contre les maltraitances et l'abandon d'animaux domestiques à Nantes", ans: 0 },
  { title: "Interdiction des feux de cheminée ouverts en période de pic de pollution à Nantes", opt: "La restriction temporaire de la combustion du bois non performant pour assainir l'air de Nantes", ans: 0 },
  { title: "Développement des zones de baignade naturelle sécurisées sur la rivière à Nantes", opt: "La surveillance et l'analyse hebdomadaire des eaux pour permettre la nage estivale à Nantes", ans: 0 },
  { title: "Obligation de tri des déchets textiles dans les bornes d'apport volontaire à Nantes", opt: "Le recyclage obligatoire des vêtements usagés pour éviter le jet à la poubelle à Nantes", ans: 0 },
  { title: "Soutien au micro-crédit pour les créateurs de micro-entreprises locales à Nantes", opt: "Le financement accompagné des projets professionnels des personnes exclues des banques à Nantes", ans: 0 },
  { title: "Installation de conteneurs enterrés pour supprimer les bacs roulants à Nantes", opt: "L'amélioration de la propreté et du paysage urbain dans le centre historique de Nantes", ans: 0 },
  { title: "Organisation de consultations citoyennes obligatoires avant tout grand projet à Nantes", opt: "La co-construction des équipements publics avec la participation active des habitants de Nantes", ans: 0 }
];

let code = `function getB2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
} {
  switch (sceneIdx % 80) {\n`;

b2Topics.forEach((item, idx) => {
  const paperNum = Math.floor(idx / 8) + 1;
  const qNum = (idx % 8) + 26;
  const city = cities[Math.floor(idx / 8)];

  code += `    case ${idx}:
      return {
        opt: [
          "${item.opt}",
          "L'interdiction stricte de toute innovation technique dans la région de ${city}",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à ${city}",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "${item.title}",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q${qNum}) ?",
        tr: "Locuteur 1: Le débat concernant ${item.title.toLowerCase()} suscite des discussions passionnées à ${city}.\\nLocutrice 2: Toutefois, la priorité demeure ${item.opt.toLowerCase()}.",
        en: "Speaker 1: The debate concerning ${item.title.toLowerCase()} sparks passionate discussion in ${city}.\\nSpeaker 2: However, the main priority remains ${item.opt.toLowerCase()}.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };\n`;
});

code += `    default:
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
`;

fs.writeFileSync('scratch/b2_code_snippet.ts', code);
console.log(`✅ Successfully generated scratch/b2_code_snippet.ts with 80 100% unique B2 scenarios!`);
