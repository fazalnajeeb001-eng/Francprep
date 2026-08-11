import fs from 'fs';

console.log("=== ⚙️ Generating 60 Unique C1 & C2 Academic Lecture & Epistemological Debate Scenarios ===");

const cities = ["Montréal", "Québec", "Ottawa", "Toronto", "Vancouver", "Calgary", "Bordeaux", "Lyon", "Toulouse", "Nantes"];

const c1c2Topics = [
  // Paper 1 (Q34-Q39)
  { level: "C1", title: "L'impact des algorithmes de prédiction comportementale sur l'autonomie décisionnelle à Montréal", opt: "La réduction de l'libre arbitre individuel sous l'influence des bulles de filtres algorithmiques", ans: 0 },
  { level: "C1", title: "La souveraineté numérique et le stockage des données publiques stratégiques à Montréal", opt: "L'obligation de rapatrier les infrastructures d'hébergement informatique sur le territoire national", ans: 0 },
  { level: "C1", title: "L'éthique de la géo-ingénierie solaire face au réchauffement climatique à Montréal", opt: "Le risque d'effets secondaires irréversibles sur la pluviométrie régionale globale", ans: 0 },
  { level: "C2", title: "Épistémologie des modèles prédictifs complexes en mécanique quantique à Montréal", opt: "La remise en cause du principe du déterminisme absolu au profit d'une approche probabiliste", ans: 0 },
  { level: "C2", title: "La déconstruction du concept d'universalité dans la philosophie du langage à Montréal", opt: "La dépendance fondamentale de la pensée conceptuelle aux structures linguistiques locales", ans: 0 },
  { level: "C2", title: "Macroéconomie monétaire et transition vers les monnaies numériques de banque centrale à Montréal", opt: "Le risque d'éviction des banques commerciales traditionnelles au profit de la banque centrale", ans: 0 },

  // Paper 2 (Q34-Q39)
  { level: "C1", title: "L'évolution des normes juridiques face à l'autonomie des systèmes d'armes à Québec", opt: "L'attribution d'une responsabilité pénale aux concepteurs des logiciels de ciblage", ans: 0 },
  { level: "C1", title: "La préservation de la biodiversité marine dans les zones économiques exclusives à Québec", opt: "La création de sanctuaires marins d'interdiction totale de pêche industrielle", ans: 0 },
  { level: "C1", title: "Les mutations sociologiques du travail à l'ère de la plateforme collaborative à Québec", opt: "La précarisation des statuts professionnels déguisés sous la qualification d'indépendants", ans: 0 },
  { level: "C2", title: "L'aporie de la conscience artificielle dans la philosophie de l'esprit à Québec", opt: "L'impossibilité de réduire l'expérience phénoménale subjective à de simples calculs informatiques", ans: 0 },
  { level: "C2", title: "La critique du positivisme logique dans l'histoire des théories scientifiques à Québec", opt: "La démonstration que toute observation empirique est pré-orientée par un cadre théorique", ans: 0 },
  { level: "C2", title: "La géopolitique des terres rares et la dépendance industrielle technologique à Québec", opt: "Le risque de paralysie des filières de transition énergétique par goulot d'étranglement mondial", ans: 0 },

  // Paper 3 (Q34-Q39)
  { level: "C1", title: "L'urbanisme bio-climatique et la résilience des métropoles du XXIe siècle à Ottawa", opt: "L'intégration de la ventilation naturelle et du végétal dans la conception architecturale", ans: 0 },
  { level: "C1", title: "Les théories de la démocratie délibérative et les tirages au sort citoyens à Ottawa", opt: "Le dépassement du biais partisan par l'institution de jurés citoyens décisionnaires", ans: 0 },
  { level: "C1", title: "La régulation de la génétique médicale et l'édition du génome humain à Ottawa", opt: "La stricte distinction entre thérapie génique réparatrice et eugénisme d'amélioration", ans: 0 },
  { level: "C2", title: "Ontologie du temps et relativité générale dans la physique contemporaine à Ottawa", opt: "L'illusion du passage du temps absolu au sein du continuum espace-temps quadridimensionnel", ans: 0 },
  { level: "C2", title: "L'esthétique de la déconstruction dans la littérature post-moderne à Ottawa", opt: "La fragmentation de la narration visant à déstabiliser l'illusion d'une vérité unique", ans: 0 },
  { level: "C2", title: "Neurobiologie de la décision et libre arbitre à la lumière de l'imagerie médicale à Ottawa", opt: "La détection d'activités cérébrales prédictives antérieures à la prise de conscience de la décision", ans: 0 },

  // Paper 4 (Q34-Q39)
  { level: "C1", title: "Le renouvellement de la sociologie rurale face aux néo-ruraux à Toronto", opt: "Les tensions interculturelles liées à la revalorisation des espaces agricoles périurbains", ans: 0 },
  { level: "C1", title: "La transparence algorithmique dans l'attribution des crédits bancaires à Toronto", opt: "L'obligation d'expliquer le fonctionnement interne des réseaux de neurones décisionnels", ans: 0 },
  { level: "C1", title: "La fiscalité environnementale des transports maritimes transocéaniques à Toronto", opt: "L'imposition d'une taxe carbone globale sur les carburants lourds de la flotte internationale", ans: 0 },
  { level: "C2", title: "La théorie des jeux appliqués aux négociations climatiques mondiales à Toronto", opt: "La rupture du dilemme du prisonnier par l'instauration de sanctions commerciales réciproques", ans: 0 },
  { level: "C2", title: "La phénoménologie de la perception spatiale chez Maurice Merleau-Ponty à Toronto", opt: "L'ancrage corporel irréductible de toute appréhension subjective du monde environnant", ans: 0 },
  { level: "C2", title: "La régulation prudentielle des systèmes bancaires ombre (Shadow Banking) à Toronto", opt: "L'encadrement des flux financiers non bancaires pour prévenir un risque systémique global", ans: 0 },

  // Paper 5 (Q34-Q39)
  { level: "C1", title: "La patrimonialisation des paysages industriels déclassés à Vancouver", opt: "La reconversion des friches en lieux de création artistique et d'innovation sociale", ans: 0 },
  { level: "C1", title: "L'analyse économique des biens communs selon Elinor Ostrom à Vancouver", opt: "La démonstration de la viabilité des gestions communautaires sans appropriation privée", ans: 0 },
  { level: "C1", title: "La cybersécurité des infrastructures critiques d'approvisionnement en eau à Vancouver", opt: "La nécessité de séparer étanchément les réseaux opérationnels d'Internet", ans: 0 },
  { level: "C2", title: "La métaphysique du sujet pensant à l'ère de l'intelligence hybride à Vancouver", opt: "Le redéploiement de la notion d'identité individuelle face aux prothèses cognitives", ans: 0 },
  { level: "C2", title: "La sémiotique du discours politique dans les médias d'information en continu à Vancouver", opt: "La réduction de la complexité argumentative au profit de slogans émotionnels répétitifs", ans: 0 },
  { level: "C2", title: "La dynamique des équilibres ponctués dans la biologie de l'évolution à Vancouver", opt: "La succession de longues périodes de stase et d'épisodes de spéciation très rapides", ans: 0 },

  // Paper 6 (Q34-Q39)
  { level: "C1", title: "L'éthique de la recherche scientifique financée par des fonds privés à Calgary", opt: "Le risque de biais de confirmation dans la publication des résultats cliniques", ans: 0 },
  { level: "C1", title: "La préservation des langues autochtones menacées d'extinction à Calgary", opt: "L'archivage numérique et l'immersion linguistique scolaire précoce des jeunes enfants", ans: 0 },
  { level: "C1", title: "La transition écologique des flottes de transport de marchandises par camion à Calgary", opt: "Le déploiement accéléré des corridors de recharge à hydrogène vert", ans: 0 },
  { level: "C2", title: "L'herméneutique des textes juridiques constitutionnels à Calgary", opt: "La tension permanente entre l'intention originelle des rédacteurs et l'interprétation vivante", ans: 0 },
  { level: "C2", title: "La philosophie des sciences cognitives et l'embodiment (incarnation) à Calgary", opt: "Le rejet de la métaphore de l'esprit comme simple programme d'ordinateur désincarné", ans: 0 },
  { level: "C2", title: "L'économie comportementale et l'effet Nudge dans la santé publique à Calgary", opt: "L'orientation des choix individuels par la modification subtile de l'environnement décisionnel", ans: 0 },

  // Paper 7 (Q34-Q39)
  { level: "C1", title: "La sociologie de la consommation responsable et le greenwashing à Bordeaux", opt: "Le fossé mesuré entre les intentions écologiques déclarées et les actes d'achat réels", ans: 0 },
  { level: "C1", title: "L'accessibilité universelle de la culture numérique dans les territoires ruraux à Bordeaux", opt: "Le déploiement de la fibre optique associé à un accompagnement humain de proximité", ans: 0 },
  { level: "C1", title: "La protection constitutionnelle du droit à un environnement sain à Bordeaux", opt: "L'invocabilité directe du principe de précaution devant les juridictions administratives", ans: 0 },
  { level: "C2", title: "La théorie des révolutions scientifiques selon Thomas Kuhn à Bordeaux", opt: "Le basculement discontinu d'un paradigme dominant vers un nouveau cadre conceptuel", ans: 0 },
  { level: "C2", title: "L'analyse linguistique de la métaphore conceptuelle selon Lakoff et Johnson à Bordeaux", opt: "La structuration inconsciente de nos pensées quotidiennes par des schémas corporels", ans: 0 },
  { level: "C2", title: "La gouvernance globale des biens publics mondiaux à Bordeaux", opt: "La création d'institutions supranationales dotées d'un pouvoir de sanction contraignant", ans: 0 },

  // Paper 8 (Q34-Q39)
  { level: "C1", title: "L'évaluation économique des services écosystémiques rendus par la forêt à Lyon", opt: "La quantification financière de la captation du carbone et de la purification de l'eau", ans: 0 },
  { level: "C1", title: "La souveraineté alimentaire régionale et la réduction des dépendances d'importation à Lyon", opt: "La relocalisation des cultures céréalières et maraîchères autour des bassins de vie", ans: 0 },
  { level: "C1", title: "La protection des lanceurs d'alerte dans les affaires de corruption industrielle à Lyon", opt: "Le renforcement du statut d'immunité pénale et la prise en charge des frais de justice", ans: 0 },
  { level: "C2", title: "L'épistémologie du constructivisme social en sociologie des sciences à Lyon", opt: "La mise en évidence de la fabrication sociale des faits scientifiques en laboratoire", ans: 0 },
  { level: "C2", title: "La logique modale et la philosophie du langage formel à Lyon", opt: "La formalisation mathématique des notions de possibilité, de nécessité et de contingence", ans: 0 },
  { level: "C2", title: "La théorie des cycles financiers longs d'Hyman Minsky à Lyon", opt: "L'instabilité intrinsèque des périodes de prospérité générant des bulles d'endettement", ans: 0 },

  // Paper 9 (Q34-Q39)
  { level: "C1", title: "L'impact de la numérisation des services publics sur la précarité administrative à Toulouse", opt: "La création de déserts administratifs pour les populations éloignées des outils numériques", ans: 0 },
  { level: "C1", title: "La valorisation de l'économie circulaire dans l'industrie aéronautique à Toulouse", opt: "Le démontage et le recyclage systématique des métaux rares des avions en fin de vie", ans: 0 },
  { level: "C1", title: "La gestion économe de la ressource en eau en période de sécheresse sévère à Toulouse", opt: "La priorité absolue accordée à l'eau potable au détriment des loisirs et de l'irrigation", ans: 0 },
  { level: "C2", title: "La théorie critique de l'École de Francfort et la rationalité instrumentale à Toulouse", opt: "La dénonciation de la soumission de la raison humaine à la seule logique de rendement technologique", ans: 0 },
  { level: "C2", title: "La physique quantique et l'intrication à grande distance à Toulouse", opt: "La preuve expérimentale de la non-localité fondamentale de l'univers physique", ans: 0 },
  { level: "C2", title: "La philosophie politique de la justice distributive selon John Rawls à Toulouse", opt: "La maximisation de la situation des membres les plus désavantagés de la société", ans: 0 },

  // Paper 10 (Q34-Q39)
  { level: "C1", title: "La réhabilitation du patrimoine maritime et fluvial portuaire à Nantes", opt: "La transformation des anciens hangars en espaces culturels et scientifiques intégrés", ans: 0 },
  { level: "C1", title: "La promotion de l'économie sociale et solidaire dans la commande publique à Nantes", opt: "L'intégration de clauses sociales contraignantes dans tous les marchés de la ville", ans: 0 },
  { level: "C1", title: "La prévention des risques d'inondation par la restauration des zones humides à Nantes", opt: "Le ralentissement naturel des crues par la réhumidification des marais et vallées", ans: 0 },
  { level: "C2", title: "L'anthropologie de la nature et le dépassement du dualisme nature/culture selon Philippe Descola à Nantes", opt: "La reconnaissance d'autres modes de relation au vivant non centrés sur l'exceptionnalisme humain", ans: 0 },
  { level: "C2", title: "La théorie des systèmes complexes auto-organisés en écologie globale à Nantes", opt: "L'émergence de propriétés globales imprévisibles à partir d'interactions locales simples", ans: 0 },
  { level: "C2", title: "L'éthique de la responsabilité pour les générations futures selon Hans Jonas à Nantes", opt: "L'impératif catégorique de préserver l'existence d'une vie humaine authentique sur Terre", ans: 0 }
];

let code = `function getC1C2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
} {
  switch (sceneIdx % 60) {\n`;

c1c2Topics.forEach((item, idx) => {
  const paperNum = Math.floor(idx / 6) + 1;
  const qNum = (idx % 6) + 34;
  const city = cities[Math.floor(idx / 6)];

  code += `    case ${idx}:
      return {
        opt: [
          "${item.opt}",
          "La négation absolue de toute recherche scientifique menée à ${city}",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de ${city}",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "${item.title}",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q${qNum}) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à ${city}, l'intervenant analyse les enjeux majeurs liés à ${item.title.toLowerCase()}.\\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur ${item.opt.toLowerCase()}.",
        en: "Speaker 1: In this academic lecture delivered in ${city}, the speaker analyzes major issues concerning ${item.title.toLowerCase()}.\\nSpeaker 2: He conclusively emphasizes that the core thesis rests on ${item.opt.toLowerCase()}.",
        hint: "⚠️ Level ${item.level} Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "${item.level}"
      };\n`;
});

code += `    default:
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
`;

fs.writeFileSync('scratch/c1c2_code_snippet.ts', code);
console.log(`✅ Successfully generated scratch/c1c2_code_snippet.ts with 60 100% unique C1/C2 scenarios!`);
