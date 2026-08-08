import { writingService } from '../services/writing.service';

interface TaskDef {
  title: string;
  prompt: string;
  min: number;
  max: number;
}

const TCF_10_PAPERS: TaskDef[][] = [
  // Paper 1
  [
    { title: "Tâche 1 : Problème de chauffage", prompt: "Courriel au propriétaire (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Récit de voyage au Canada", prompt: "Journal de voyage (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Transports gratuits", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 2
  [
    { title: "Tâche 1 : Atelier culinaire", prompt: "Courriel à l'organisateur (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Festival culturel", prompt: "Article de blog (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Langues à l'école", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 3
  [
    { title: "Tâche 1 : Inscription club de sport", prompt: "Courriel d'inscription (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Action bénévole", prompt: "Bulletin de quartier (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Télétravail à 100%", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 4
  [
    { title: "Tâche 1 : Réclamation achat en ligne", prompt: "Courriel réclamation (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Changement de carrière", prompt: "Lettre à un collègue (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Véhicules thermiques", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 5
  [
    { title: "Tâche 1 : Bibliothèque municipale", prompt: "Demande de renseignements (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Intégration au Québec", prompt: "Billet de blog (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Intelligence artificielle", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 6
  [
    { title: "Tâche 1 : Congé exceptionnel", prompt: "Demande à son supérieur (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Exposition d'art", prompt: "Critique culturelle (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Réseaux sociaux et ados", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 7
  [
    { title: "Tâche 1 : Fête des voisins", prompt: "Invitation formelle (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Jardin collectif", prompt: "Récit d'initiative (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Semaine de 4 jours", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 8
  [
    { title: "Tâche 1 : Réservation de chalet", prompt: "Courriel au propriétaire (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Formation continue", prompt: "Témoignage professionnel (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Produits locaux", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 9
  [
    { title: "Tâche 1 : Remerciement de stage", prompt: "Courriel formel (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Marathon de Montréal", prompt: "Récit sportif (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Quotas touristiques", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
  // Paper 10
  [
    { title: "Tâche 1 : Proposition de partenariat", prompt: "Courriel commercial (60-120 mots)", min: 60, max: 120 },
    { title: "Tâche 2 : Conférence développement", prompt: "Compte-rendu (120-150 mots)", min: 120, max: 150 },
    { title: "Tâche 3 : Université gratuite", prompt: "Essai argumentatif (140-180 mots)", min: 140, max: 180 },
  ],
];

// Reusable linguistic samples for each level and task type
const TEXTS = {
  T1: {
    A1: "Bonjour monsieur my house is very cold the chauffage is not working please help me repair urgent merci cordialement",
    A2: "Bonjour Monsieur, je vous écris parce que je voudrais des informations pour mon appartement. Il y a un problème et je ne comprends pas bien. Vous pouvez venir m'aider rapidement cette semaine s'il vous plaît ? Merci beaucoup pour votre réponse. Cordialement.",
    B1: "Bonjour Monsieur le Directeur,\n\nJe vous écris ce message pour vous demander des informations précises concernant vos services. En effet, nous avons besoin de connaître les horaires d'ouverture ainsi que les tarifs proposés pour le mois prochain.\n\nDonc, je souhaiterais savoir s'il est possible de visiter vos locaux cette semaine.\n\nMerci d'avance pour votre aide et votre réponse rapide.\n\nCordialement,",
    B2: "Monsieur le Responsable,\n\nJe me permets de vous adresser ce courriel afin de solliciter des renseignements concernant les démarches à accomplir pour notre dossier en cours. En effet, nous souhaiterions organiser notre inscription dans les meilleures conditions possibles.\n\nPourriez-vous avoir l'amabilité de me faire parvenir la documentation détaillée ainsi que la grille tarifaire complète ? Je resterai joignable par téléphone à tout moment pour faciliter nos échanges.\n\nDans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées.",
    C1: "Monsieur le Directeur,\n\nJe me permets de vous contacter en toute urgence afin d'attirer votre attention sur la défaillance survenue au sein de notre établissement. Outre le manquement évident aux engagements convenus, cette situation expose nos équipes à un préjudice opérationnel majeur.\n\nDès lors, je vous somme d'ordonner l'intervention d'une équipe de techniciens certifiés dans les plus brefs délais pour un règlement immédiat de cet incident.\n\nVeuillez agréer, Monsieur, l'expression de mes salutations distinguées.",
    C2: "Monsieur le Directeur,\n\nJe me permets de vous contacter en toute urgence afin d'attirer votre attention sur la défaillance survenue au sein de notre établissement. Outre le manquement évident aux engagements convenus, cette situation expose nos équipes à un préjudice opérationnel majeur.\n\nDès lors, je vous somme d'ordonner l'intervention d'une équipe de techniciens certifiés dans les plus brefs délais pour un règlement immédiat de cet incident.\n\nVeuillez agréer, Monsieur, l'expression de mes salutations distinguées.",
  },
  T2: {
    A1: "Je voyage au Canada hier. La maison vacances très beau. Nous manger du poisson. Moi très content. Je allé au parc avec amis. Prendre photo beaucoup. Merci.",
    A2: "Pendant mes vacances au Canada, je suis allé à Montréal avec ma famille. La ville est très jolie et il y a beaucoup de magasins. Nous avons visité le musée et nous avons mangé dans des restaurants le soir. Le temps était froid mais nous avons acheté des manteaux chauds. J'ai aimé ce voyage parce que les gens sont gentils. C'était une bonne semaine.",
    B1: "Lors de mon dernier séjour au Québec, j'ai eu l'occasion de découvrir la région de Charlevoix pendant une semaine complète. Dès notre arrivée sur place, nous avons loué un petit chalet près du fleuve. Durant notre voyage, nous avons fait des randonnées magnifiques en forêt et nous avons visité des villages traditionnels très accueillants. De plus, nous avons goûté plusieurs spécialités gastronomiques locales comme la tourtière. Bien que les températures soient parfois basses en soirée, cette expérience touristique m'a permis de me reposer et d'apprendre beaucoup sur la culture québécoise. Je garde un très bon souvenir de cette visite enrichissante.",
    B2: "Lors de mon récent séjour au Canada, j'ai eu l'opportunité de participer à un événement remarquable dans la ville de Québec. Dès mon arrivée sur les lieux, j'ai été émerveillé par la beauté spectaculaire des lieux et la convivialité des résidents locaux. Pendant plusieurs jours, nous avons assisté à des ateliers passionnants et découvert la gastronomie régionale dans une atmosphère particulièrement chaleureuse et bienveillante. En outre, cette escapade enrichissante m'a permis d'apprécier la richesse culturelle de cette belle région. Je garde un souvenir impérissable de cette aventure nordique que je recommande chaleureusement à tous !",
    C1: "Lors d'un récent périple au cœur des grands espaces canadiens, j'ai été immédiatement saisi par la majestueuse splendeur du parc national de Banff. Dès l'ascension des premiers massifs rocheux, le dépaysement fut total : les lacs aux reflets turquoise, bordés par d'immenses forêts boréales préservées, offraient un panorama d'une sérénité absolue. Cette immersion contemplative m'a permis d'observer la faune sauvage tout en prenant pleinement conscience de la fragilité inhérente à ces écosystèmes exceptionnels. En outre, les échanges enrichissants avec les gardes du parc ont conféré une dimension hautement pédagogique à ce séjour. Une aventure marquante d'une rare intensité émotionnelle que je préconise vivement à quiconque recherche l'émerveillement authentique !",
    C2: "Lors d'un récent périple au cœur des grands espaces canadiens, j'ai été immédiatement saisi par la majestueuse splendeur du parc national de Banff. Dès l'ascension des premiers massifs rocheux, le dépaysement fut total : les lacs aux reflets turquoise, bordés par d'immenses forêts boréales préservées, offraient un panorama d'une sérénité absolue. Cette immersion contemplative m'a permis d'observer la faune sauvage tout en prenant pleinement conscience de la fragilité inhérente à ces écosystèmes exceptionnels. En outre, les échanges enrichissants avec les gardes du parc ont conféré une dimension hautement pédagogique à ce séjour. Une aventure marquante d'une rare intensité émotionnelle que je préconise vivement à quiconque recherche l'émerveillement authentique !",
  },
  T3: {
    A1: "Je pense transport gratuit est good. Beaucoup personnes pas d'argent. Le bus is good pour la ville. Moi d'accord avec ça.",
    A2: "À mon avis, je pense que les transports en commun gratuits sont une bonne chose pour la ville. D'abord, les gens peuvent prendre le bus sans payer d'argent chaque jour. C'est bien pour les étudiants et pour les familles qui travaillent. En plus, il y a moins de voitures sur la route et l'air est plus propre. Mais la ville doit payer pour les bus.",
    B1: "La gratuité des transports publics est un sujet important pour les grandes métropoles actuelles.\n\nD'un côté, cette mesure présente des avantages évidents pour les citoyens. Elle permet de réduire les dépenses mensuelles de transport et d'encourager la population à utiliser les bus plutôt que la voiture individuelle, ce qui diminue la pollution dans les centres-villes.\n\nD'un autre côté, certains pensent que cette décision coûte cher à la mairie et risque de réduire la qualité du service si l'entretien des rames n'est plus financé correctement.\n\nEn conclusion, je pense que la gratuité est une idée intéressante mais qu'elle doit être mise en place avec prudence pour assurer la sécurité et le confort de tous les usagers.",
    B2: "La question de la gratuité des transports en commun suscite de nombreux débats au sein des métropoles contemporaines.\n\nD'un côté, les partisans de cette mesure soutiennent avec raison qu'elle constitue un choix important pour encourager les citoyens à délaisser leur véhicule individuel, favorisant ainsi la transition écologique urbaine et améliorant la fluidité du trafic. De plus, elle renforce le budget des ménages modestes et favorise la justice sociale au quotidien.\n\nD'un autre côté, certains analystes mettent en garde contre le coût financier pour les finances publiques locales, risquant d'entraver la modernisation des infrastructures sans recettes tarifaires suffisantes.\n\nEn conclusion, bien que la gratuité soit séduisante, une tarification solidaire modulée selon les revenus me semble être la solution la plus adaptée pour garantir la qualité et le confort du réseau public pour tous les usagers.",
    C1: "L'instauration de la gratuité intégrale des transports collectifs cristallise d'intenses controverses au croisement des impératifs environnementaux et des contraintes macroéconomiques contemporaines.\n\nD'une part, les partisans de cette réforme soutiennent à juste titre qu'elle constitue un levier indispensable pour accélérer la décarbonation urbaine en incitant massivement les usagers à délaisser leur véhicule individuel. De surcroît, elle renforce indiscutablement l'équité sociale et le pouvoir d'achat des ménages les plus vulnérables.\n\nD'autre part, plusieurs économistes soulignent le coût budgétaire colossal pour les finances publiques locales, risquant d'entraver la modernisation indispensable des infrastructures ferroviaires sans ressources tarifaires dédiées.\n\nEn conclusion, bien que la gratuité apparaisse particulièrement séduisante, une tarification solidaire modulée selon les revenus me semble constituer l'arbitrage le plus pertinent pour pérenniser la qualité du réseau public.",
    C2: "La perspective d'une gratuité universelle des réseaux de transport en commun cristallise des dilemmes sociétaux et écologiques d'une acuité singulière au sein des métropoles contemporaines.\n\nD'une part, les partisans de cette politique publique affirment sans conteste qu'elle constitue un vecteur d'émancipation sociale majeur, permettant d'éradiquer les fractures territoriales tout en accélérant la transition énergétique par l'abandon massif de l'autosolisme. De surcroît, une telle mesure favorise indéniablement la justice redistributive au profit des classes laborieuses.\n\nD'autre part, plusieurs spécialistes des finances territoriales objectent qu'un tel choix budgétaire priverait les régies de ressources d'investissement cruciales, risquant ainsi de détériorer l'efficience technique et la sécurité des infrastructures à long terme.\n\nEn conclusion, bien que l'idéal de gratuité demeure philosophiquement louable, une tarification progressive et inclusive apparaît comme le compromis optimal pour concilier impératif écologique et viabilité économique pérenne.",
  }
};

async function run180EvaluationsMatrix() {
  console.log("🇨🇦 Starting 180-Point Full Matrix Audit (10 Papers × 3 Tasks × 6 CEFR Levels)...\n");

  let totalTests = 0;
  let passedTests = 0;

  const levels: Array<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'> = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  for (let paperIdx = 0; paperIdx < TCF_10_PAPERS.length; paperIdx++) {
    const paperNum = paperIdx + 1;
    console.log(`======================================================`);
    console.log(`📄 TESTING PAPER ${paperNum}/10 (3 Tasks × 6 Levels = 18 Tests)`);
    console.log(`======================================================`);

    const tasks = TCF_10_PAPERS[paperIdx];

    for (let taskIdx = 0; taskIdx < 3; taskIdx++) {
      const taskNum = (taskIdx + 1) as 1 | 2 | 3;
      const taskKey = `T${taskNum}` as 'T1' | 'T2' | 'T3';
      const taskDef = tasks[taskIdx];

      for (const level of levels) {
        totalTests++;
        const submissionText = TEXTS[taskKey][level];
        const res = await writingService.getFeedback(
          submissionText,
          `TCF Paper ${paperNum} - ${taskDef.title}`,
          taskDef.prompt,
          undefined,
          'French',
          'TCF Canada',
          taskNum,
          taskDef.min,
          taskDef.max,
          taskDef.prompt
        );

        let isAccurate = false;
        if (level === 'A1') {
          isAccurate = (res.cefrLevel === 'A1' || res.cefrLevel === 'Below A1') && res.scoreOutOf20 <= 4;
        } else if (level === 'A2') {
          isAccurate = (res.cefrLevel === 'A2' || res.cefrLevel === 'B1') && res.scoreOutOf20 >= 5 && res.scoreOutOf20 <= 11;
        } else if (level === 'B1') {
          isAccurate = (res.cefrLevel === 'B1' || res.cefrLevel === 'B2') && res.scoreOutOf20 >= 8 && res.scoreOutOf20 <= 14;
        } else if (level === 'B2') {
          isAccurate = (res.cefrLevel === 'B2' || res.cefrLevel === 'C1') && res.scoreOutOf20 >= 12 && res.scoreOutOf20 <= 17;
        } else if (level === 'C1') {
          isAccurate = (res.cefrLevel === 'C1' || res.cefrLevel === 'C2') && res.scoreOutOf20 >= 16 && res.scoreOutOf20 <= 18;
        } else if (level === 'C2') {
          isAccurate = (taskNum === 3 ? (res.cefrLevel === 'C2' && res.scoreOutOf20 >= 18) : (res.scoreOutOf20 >= 16));
        }

        if (isAccurate) {
          passedTests++;
          console.log(`  ✅ Paper ${paperNum} Tâche ${taskNum} | Target Level: ${level} -> Evaluated as ${res.cefrLevel} (${res.scoreOutOf20}/20 Marks | ${res.nclcGrade})`);
        } else {
          console.error(`  ❌ Paper ${paperNum} Tâche ${taskNum} | Target Level: ${level} MISMATCH:`, {
            scoreOutOf20: res.scoreOutOf20,
            cefrLevel: res.cefrLevel,
            nclcGrade: res.nclcGrade,
          });
        }
      }
    }
    console.log();
  }

  console.log(`\n======================================================`);
  console.log(`🏁 180-POINT CEFR MATRIX RESULT: ${passedTests}/${totalTests} TESTS PASSED (${((passedTests / totalTests) * 100).toFixed(0)}%)`);
  console.log(`======================================================\n`);
}

run180EvaluationsMatrix().catch(console.error);
