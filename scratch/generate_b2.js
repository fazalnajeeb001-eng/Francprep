import fs from 'fs';

console.log("=== ⚙️ Generating 80 Unique B2 Debate & Complex Topic Scenarios ===");

const cities = ["Montréal", "Québec", "Ottawa", "Toronto", "Vancouver", "Calgary", "Bordeaux", "Lyon", "Toulouse", "Nantes"];

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
  const paperIdx = Math.floor(sceneIdx / 8) % 10;
  const qOffset = (sceneIdx % 8) + 26; // Q26 to Q33
  const city = cities[paperIdx];
  const p = paperIdx + 1;

  switch (sceneIdx % 80) {\n`;

const topics = [
  {
    title: "Régulation de l'intelligence artificielle générative dans la création artistique",
    qPrompt: "Quelle est la conclusion principale exprimée par les intervenants concernant l'encadrement juridique de l'IA ?",
    optGen: (c, p) => [
      `La nécessité d'harmoniser les droits d'auteur tout en préservant la capacité d'innovation des entreprises à ${c}`,
      `L'interdiction totale et immédiate de tous les logiciels d'IA générative dans les universités de ${c}`,
      `L'attribution automatique de la nationalité canadienne aux développeurs d'algorithmes artistiques`,
      `La suppression complète de tous les droits de propriété intellectuelle sur les œuvres numériques`
    ],
    trGen: (c, p) => `Locuteur 1: L'essor de l'IA à ${c} suscite un vif débat. Les artistes exigent la protection de leurs droits, tandis que les développeurs prônent la liberté d'innovation.\nLocutrice 2: En revanche, un consensus émerge sur la nécessité de fixer un cadre réglementaire équilibré pour harmoniser les droits d'auteur sans freiner l'innovation.`,
    enGen: (c, p) => `Speaker 1: The rise of AI in ${c} sparks intense debate between copyright holders and tech developers.\nSpeaker 2: However, a consensus is emerging on establishing a balanced legal framework.`,
    hintGen: (c, p) => `⚠️ Level B2 Guidance: Notice how "en revanche" introduces the balanced consensus resolving the debate.`
  },
  {
    title: "Taxation du télétravail transfrontalier et financement des infrastructures locales",
    qPrompt: "Quel enjeu majeur pose la généralisation du travail à distance pour les finances publiques ?",
    optGen: (c, p) => [
      `La répartition équitable des recettes fiscales entre les communes de résidence et les métropoles comme ${c}`,
      `L'obligation pour les télétravailleurs d'acheter leur matériel informatique auprès de commerces municipaux`,
      `La fermeture définitive des lignes de transport en commun reliant les banlieues à ${c}`,
      `La hausse de 50% des tarifs d'électricité pour les employés travaillant depuis leur domicile`
    ],
    trGen: (c, p) => `Locutrice 1: Le travail hybride redéfinit la fiscalité locale à ${c}. Les contribuables résident hors des centres urbains tout en utilisant les infrastructures de la métropole.\nLocuteur 2: Néanmoins, les élus cherchent un accord pour redistribuer les recettes fiscales équitablement entre communes et métropoles.`,
    enGen: (c, p) => `Speaker 1: Hybrid work redefines local taxation in ${c}.\nSpeaker 2: Nevertheless, local elected officials seek a tax revenue sharing agreement.`,
    hintGen: (c, p) => `⚠️ Level B2 Guidance: Look for the financial balance mechanism mentioned after "néanmoins".`
  },
  {
    title: "Interdiction des véhicules thermiques dans les hypercentres urbains",
    qPrompt: "Quel est l'objectif prioritaire de la création des zones à faibles émissions ?",
    optGen: (c, p) => [
      `Améliorer la qualité de l'air tout en développant des alternatives de mobilité abordables à ${c}`,
      `Contraindre l'ensemble des habitants de ${c} à abandonner tout déplacement urbain`,
      `Remplacer tous les bus municipaux par des calèches à chevaux traditionnelles`,
      `Multiplier par trois le coût d'immatriculation des véhicules hybrides rechargeables`
    ],
    trGen: (c, p) => `Locuteur 1: La restriction de circulation dans le centre de ${c} suscite des contestations chez les commerçants.\nLocutrice 2: Toutefois, les mesures visent avant tout à réduire la pollution atmosphérique en offrant des transports collectifs renforcés.`,
    enGen: (c, p) => `Speaker 1: Driving restrictions in central ${c} cause merchant protest.\nSpeaker 2: However, the primary goal is improving air quality while expanding transit options.`,
    hintGen: (c, p) => `⚠️ Level B2 Guidance: Listen to the contrast introduced by "toutefois" prioritizing air quality.`
  },
  {
    title: "Quotas de recyclage obligatoire pour les emballages industriels",
    qPrompt: "Quelle exigence environnementale est imposée aux acteurs de la grande distribution ?",
    optGen: (c, p) => [
      `L'intégration progressive de ${30 + p * 5}% de matières recyclées dans les emballages à ${c}`,
      `L'abandon immédiat de la vente de tous les produits emballés sous vide`,
      `La baisse unilatérale des salaires du personnel de mise en rayon`,
      `L'obligation d'exporter tous les déchets ménagers vers des décharges privées`
    ],
    trGen: (c, p) => `Locutrice 1: La nouvelle réglementation environnementale à ${c} impose aux industriels d'intégrer ${30 + p * 5}% de plastique recyclé.\nLocuteur 2: Par conséquent, les entreprises investissent massivement dans les filières de recyclage pour se conformer à la loi.`,
    enGen: (c, p) => `Speaker 1: New environmental rules in ${c} mandate ${30 + p * 5}% recycled content.\nSpeaker 2: Consequently, businesses invest heavily in circular recycling supply chains.`,
    hintGen: (c, p) => `⚠️ Level B2 Guidance: Note the logical consequence indicator "par conséquent".`
  },
  {
    title: "Subventions publiques pour le développement de l'énergie solaire résidentielle",
    qPrompt: "Quel avantage économique direct offre le programme de transition énergétique ?",
    optGen: (c, p) => [
      `Une prise en charge financière des coûts d'installation photovoltaïque pour les ménages de ${c}`,
      `La gratuité totale de l'eau potable pour les propriétaires de panneaux solaires`,
      `L'interdiction d'utiliser le réseau électrique national pendant les heures de pointe`,
      `La distribution obligatoire de générateurs à charbon en cas d'intempéries`
    ],
    trGen: (c, p) => `Locuteur 1: Les aides à la rénovation énergétique à ${c} permettent de réduire la facture d'électricité des ménages.\nLocutrice 2: En contrepartie, le gouvernement exige que les installations respectent des normes d'efficacité strictes.`,
    enGen: (c, p) => `Speaker 1: Energy grants in ${c} lower household power bills.\nSpeaker 2: In exchange, strict efficiency compliance is required.`,
    hintGen: (c, p) => `⚠️ Level B2 Guidance: Pay attention to the requirement condition ("en contrepartie").`
  },
  {
    title: "Service civique ou année de césure obligatoire pour les jeunes diplômés",
    qPrompt: "Quel bénéfice social est mis en avant par les partisans de ce projet ?",
    optGen: (c, p) => [
      `Le renforcement de la cohésion sociale et l'acquisition d'expériences citoyennes à ${c}`,
      `L'allongement de la durée des études universitaires d'au moins cinq années supplémentaires`,
      `La suppression de tous les programmes d'échange international pour la jeunesse`,
      `L'obligation de travailler exclusivement dans le secteur de la restauration rapide`
    ],
    trGen: (c, p) => `Locutrice 1: Rendre le service civique obligatoire à ${c} favoriserait l'engagement communautaire et le brassage social.\nLocuteur 2: Cependant, certains économistes redoutent un retard dans l'insertion professionnelle des jeunes actifs.`,
    enGen: (c, p) => `Speaker 1: Mandatory civic service in ${c} promotes social cohesion.\nSpeaker 2: However, economists worry about delayed career entry for graduates.`,
    hintGen: (c, p) => `⚠️ Level B2 Guidance: Observe the contrast marker "cependant" between civic benefits and career delay.`
  },
  {
    title: "Suivi algorithmique des performances au travail et protection des données personnelles",
    qPrompt: "Quelle préoccupation majeure expriment les syndicats de salariés ?",
    optGen: (c, p) => [
      `Le risque d'atteinte à la vie privée et de pression psychologique excessive au sein des entreprises de ${c}`,
      `La suppression des temps de pause lors des journées de travail en présentiel`,
      `L'obligation pour les salariés d'utiliser leur propre véhicule personnel pour les livraisons`,
      `Le versement hebdomadaire des salaires sous forme de bons d'achat municipaux`
    ],
    trGen: (c, p) => `Locuteur 1: La surveillance des tâches par algorithme à ${c} promet d'accroître l'efficacité opérationnelle.\nLocutrice 2: Malgré ces gains affichés, les représentants des salariés dénoncent des dérives portant atteinte au droit à la déconnexion.`,
    enGen: (c, p) => `Speaker 1: Algorithmic task monitoring in ${c} promises productivity gains.\nSpeaker 2: Despite stated gains, unions denounce violations of privacy rights.`,
    hintGen: (c, p) => `⚠️ Level B2 Guidance: Identify the concession marker "malgré" balancing productivity vs privacy.`
  },
  {
    title: "Taxation de la mode jetable (Fast-Fashion) et impact sur le pouvoir d'achat",
    qPrompt: "Quel compromis cherchent à atteindre les législateurs environnementaux ?",
    optGen: (c, p) => [
      `Penaliser l'empreinte carbone des vêtements à bas coût tout en soutenant l'industrie textile durable à ${c}`,
      `Fermer définitivement l'ensemble des magasins de vêtements dans la province`,
      `Imposer le port d'un uniforme homologué pour tous les citoyens majeurs de ${c}`,
      `Rembourser l'intégralité des achats vestimentaires effectués sur internet`
    ],
    trGen: (c, p) => `Locutrice 1: La taxe sur la fast-fashion à ${c} vise à freiner la surconsommation de textiles jetables.\nLocuteur 2: Néanmoins, les députés adaptent les barèmes pour ne pas pénaliser les ménages à faibles revenus.`,
    enGen: (c, p) => `Speaker 1: The fast-fashion tax in ${c} aims to reduce textile waste.\nSpeaker 2: Nevertheless, lawmakers adjust tax scales to protect low-income shoppers.`,
    hintGen: (c, p) => `⚠️ Level B2 Guidance: Look for the nuanced protection measure introduced by "néanmoins".`
  }
];

for (let i = 0; i < 80; i++) {
  const paperIdx = Math.floor(i / 8);
  const t = topics[i % 8];
  const c = cities[paperIdx % 10];
  const p = paperIdx + 1;
  const opts = t.optGen(c, p);
  const tr = t.trGen(c, p);
  const en = t.enGen(c, p);
  const hint = t.hintGen(c, p);

  code += `    case ${i}:
      return {
        opt: [
          \`${opts[0]}\`,
          \`${opts[1]}\`,
          \`${opts[2]}\`,
          \`${opts[3]}\`
        ],
        ans: 0,
        title: \`${t.title}\`,
        text: \`${t.qPrompt}\`,
        tr: \`${tr.replace(/\n/g, "\\n")}\`,
        en: \`${en.replace(/\n/g, "\\n")}\`,
        hint: \`${hint}\`,
        level: "B2"
      };\n`;
}

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
console.log("✅ Successfully generated scratch/b2_code_snippet.ts with 80 B2 scenarios!");
