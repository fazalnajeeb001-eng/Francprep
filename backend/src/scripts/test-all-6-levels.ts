import { writingService } from '../services/writing.service';

async function run6LevelAccuracySuite() {
  console.log('🇨🇦 Testing 100% Evaluation Accuracy for ALL 6 CEFR LEVELS (A1, A2, B1, B2, C1, C2)...\n');

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string, detail?: any) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`, detail || '');
    }
  }

  // ==========================================
  // LEVEL A1 (Beginner: 3-4/20 Marks | NCLC 3)
  // ==========================================
  // Tâche 1 A1: Fragmented, telegraphic, English/broken words
  const a1_t1 = "Bonjour monsieur my house is very cold the chauffage is not working please help me repair urgent merci cordialement";
  const res_a1_t1 = await writingService.getFeedback(a1_t1, 'TCF Canada - Tâche 1', 'Problème de chauffage', undefined, 'French', 'TCF Canada', 1, 60, 120);
  assert(res_a1_t1.cefrLevel === 'A1' || res_a1_t1.cefrLevel === 'Below A1', `A1 Level: Tâche 1 evaluated as ${res_a1_t1.cefrLevel} (${res_a1_t1.scoreOutOf20}/20 Marks)`, res_a1_t1);

  // Tâche 2 A1: Broken simple sentences with high error rate
  const a1_t2 = "Je voyage au Canada hier. La maison vacances très beau. Nous manger du poisson. Moi très content. Je allé au parc avec amis. Prendre photo beaucoup. Merci.";
  const res_a1_t2 = await writingService.getFeedback(a1_t2, 'TCF Canada - Tâche 2', 'Récit de voyage', undefined, 'French', 'TCF Canada', 2, 120, 150);
  assert(res_a1_t2.cefrLevel === 'A1' || res_a1_t2.cefrLevel === 'Below A1', `A1 Level: Tâche 2 evaluated as ${res_a1_t2.cefrLevel} (${res_a1_t2.scoreOutOf20}/20 Marks)`, res_a1_t2);

  // Tâche 3 A1: Broken opinion with English/telegraphic phrasing
  const a1_t3 = "Je pense transport gratuit est good. Beaucoup personnes pas d'argent. Le bus is good pour la ville. Moi d'accord avec ça.";
  const res_a1_t3 = await writingService.getFeedback(a1_t3, 'TCF Canada - Tâche 3', 'Transports gratuits', undefined, 'French', 'TCF Canada', 3, 140, 180);
  assert(res_a1_t3.cefrLevel === 'A1' || res_a1_t3.cefrLevel === 'Below A1', `A1 Level: Tâche 3 evaluated as ${res_a1_t3.cefrLevel} (${res_a1_t3.scoreOutOf20}/20 Marks)`, res_a1_t3);


  // ==========================================
  // LEVEL A2 (Elementary: 5-7/20 Marks | NCLC 4)
  // ==========================================
  // Tâche 1 A2: Simple conversational style without formal register
  const a2_t1 = "Bonjour Monsieur, je vous écris parce que le chauffage dans mon appartement ne marche pas du tout. Il fait très froid pendant la nuit et mes enfants sont malades. Vous pouvez venir réparer rapidement ? En plus, l'eau chaude ne fonctionne pas bien aussi. Merci pour votre aide. Cordialement.";
  const res_a2_t1 = await writingService.getFeedback(a2_t1, 'TCF Canada - Tâche 1', 'Problème de chauffage', undefined, 'French', 'TCF Canada', 1, 60, 120);
  assert(res_a2_t1.cefrLevel === 'A2' || res_a2_t1.scoreOutOf20 <= 8, `A2 Level: Tâche 1 evaluated as ${res_a2_t1.cefrLevel} (${res_a2_t1.scoreOutOf20}/20 Marks)`, res_a2_t1);

  // Tâche 2 A2: Basic narrative with simple sentences and basic past tense
  const a2_t2 = "Pendant mes vacances au Canada, je suis allé à Montréal avec ma famille. La ville est très jolie et il y a beaucoup de magasins. Nous avons visité le musée et nous avons mangé dans des restaurants le soir. Le temps était froid mais nous avons acheté des manteaux chauds. J'ai aimé ce voyage parce que les gens sont gentils. C'était une bonne semaine.";
  const res_a2_t2 = await writingService.getFeedback(a2_t2, 'TCF Canada - Tâche 2', 'Récit de voyage', undefined, 'French', 'TCF Canada', 2, 120, 150);
  assert(res_a2_t2.cefrLevel === 'A2' || res_a2_t2.cefrLevel === 'B1', `A2 Level: Tâche 2 evaluated as ${res_a2_t2.cefrLevel} (${res_a2_t2.scoreOutOf20}/20 Marks)`, res_a2_t2);

  // Tâche 3 A2: Simple one-sided opinion with basic vocabulary
  const a2_t3 = "À mon avis, je pense que les transports en commun gratuits sont une bonne chose pour la ville. D'abord, les gens peuvent prendre le bus sans payer d'argent chaque jour. C'est bien pour les étudiants et pour les familles qui travaillent. En plus, il y a moins de voitures sur la route et l'air est plus propre. Mais la ville doit payer pour les bus.";
  const res_a2_t3 = await writingService.getFeedback(a2_t3, 'TCF Canada - Tâche 3', 'Transports gratuits', undefined, 'French', 'TCF Canada', 3, 140, 180);
  assert(res_a2_t3.cefrLevel === 'A2' || res_a2_t3.cefrLevel === 'B1', `A2 Level: Tâche 3 evaluated as ${res_a2_t3.cefrLevel} (${res_a2_t3.scoreOutOf20}/20 Marks)`, res_a2_t3);


  // ==========================================
  // LEVEL B1 (Intermediate: 8-11/20 Marks | NCLC 5-6)
  // ==========================================
  // Tâche 1 B1: Structured polite request with standard B1 connectors
  const b1_t1 = "Bonjour Monsieur le Propriétaire,\n\nJe vous écris ce message pour vous informer que le chauffage central de mon appartement est tombé en panne hier soir. En raison de l'hiver, il fait très froid dans le logement et la situation devient difficile pour ma famille.\n\nDonc, je souhaiterais vous demander de bien vouloir envoyer un réparateur dès que possible cette semaine. Je suis disponible tous les après-midis à partir de quatorze heures.\n\nMerci d'avance pour votre aide et votre réponse rapide.\n\nCordialement,";
  const res_b1_t1 = await writingService.getFeedback(b1_t1, 'TCF Canada - Tâche 1', 'Problème de chauffage', undefined, 'French', 'TCF Canada', 1, 60, 120);
  assert(res_b1_t1.cefrLevel === 'B1' || res_b1_t1.scoreOutOf20 === 10 || res_b1_t1.scoreOutOf20 === 11 || res_b1_t1.scoreOutOf20 === 8, `B1 Level: Tâche 1 evaluated as ${res_b1_t1.cefrLevel} (${res_b1_t1.scoreOutOf20}/20 Marks)`, res_b1_t1);

  // Tâche 2 B1: Coherent past narrative with good temporal markers
  const b1_t2 = "Lors de mon dernier séjour au Québec, j'ai eu l'occasion de découvrir la région de Charlevoix pendant une semaine complète. Dès notre arrivée sur place, nous avons loué un petit chalet près du fleuve. Durant notre voyage, nous avons fait des randonnées magnifiques en forêt et nous avons visité des villages traditionnels très accueillants. De plus, nous avons goûté plusieurs spécialités gastronomiques locales comme la tourtière. Bien que les températures soient parfois basses en soirée, cette expérience touristique m'a permis de me reposer et d'apprendre beaucoup sur la culture québécoise. Je garde un très bon souvenir de cette visite enrichissante.";
  const res_b1_t2 = await writingService.getFeedback(b1_t2, 'TCF Canada - Tâche 2', 'Récit de voyage', undefined, 'French', 'TCF Canada', 2, 120, 150);
  assert(res_b1_t2.cefrLevel === 'B1' || res_b1_t2.cefrLevel === 'B2', `B1 Level: Tâche 2 evaluated as ${res_b1_t2.cefrLevel} (${res_b1_t2.scoreOutOf20}/20 Marks)`, res_b1_t2);

  // Tâche 3 B1: Structured argumentative text with B1 connectors
  const b1_t3 = "La gratuité des transports publics est un sujet important pour les grandes métropoles actuelles.\n\nD'un côté, cette mesure présente des avantages évidents pour les citoyens. Elle permet de réduire les dépenses mensuelles de transport et d'encourager la population à utiliser les bus plutôt que la voiture individuelle, ce qui diminue la pollution dans les centres-villes.\n\nD'un autre côté, certains pensent que cette décision coûte cher à la mairie et risque de réduire la qualité du service si l'entretien des rames n'est plus financé correctement.\n\nEn conclusion, je pense que la gratuité est une idée intéressante mais qu'elle doit être mise en place avec prudence pour assurer la sécurité et le confort de tous les usagers.";
  const res_b1_t3 = await writingService.getFeedback(b1_t3, 'TCF Canada - Tâche 3', 'Transports gratuits', undefined, 'French', 'TCF Canada', 3, 140, 180);
  assert(res_b1_t3.cefrLevel === 'B1' || res_b1_t3.cefrLevel === 'B2', `B1 Level: Tâche 3 evaluated as ${res_b1_t3.cefrLevel} (${res_b1_t3.scoreOutOf20}/20 Marks)`, res_b1_t3);


  // ==========================================
  // LEVEL B2 (Vantage / Upper: 12-15/20 Marks | NCLC 7-8)
  // ==========================================
  // Tâche 1 B2: Formal polite correspondence with formal conditionnel
  const b2_t1 = "Monsieur le Propriétaire,\n\nJe me permets de vous adresser ce courriel afin de vous signaler une défaillance concernant le système de chauffage de mon logement. En raison de la chute brutale des températures extérieures, la situation devient difficile à supporter au quotidien.\n\nPar conséquent, pourriez-vous faire intervenir un technicien qualifié dès aujourd'hui afin de procéder aux réparations nécessaires ? Je resterai joignable par téléphone à tout moment pour faciliter l'accès à l'appartement.\n\nDans l'attente de votre retour rapide, veuillez agréer mes salutations distinguées.";
  const res_b2_t1 = await writingService.getFeedback(b2_t1, 'TCF Canada - Tâche 1', 'Problème de chauffage', undefined, 'French', 'TCF Canada', 1, 60, 120);
  assert(res_b2_t1.cefrLevel === 'B2' && res_b2_t1.scoreOutOf20 >= 14 && res_b2_t1.scoreOutOf20 <= 15, `B2 Level: Tâche 1 evaluated as ${res_b2_t1.cefrLevel} (${res_b2_t1.scoreOutOf20}/20 Marks)`, res_b2_t1);

  // Tâche 2 B2: Rich descriptive and reflective narrative with varied vocabulary
  const b2_t2 = "Lors de mon récent séjour au Canada, j'ai eu l'opportunité de participer au Festival d'hiver de Québec. Dès mon arrivée sur les lieux, j'ai été émerveillé par la beauté spectaculaire des sculptures sur glace et la féerie des illuminations urbaines. Pendant plusieurs jours, nous avons assisté à des concerts en plein air et découvert la gastronomie locale dans une atmosphère particulièrement chaleureuse et bienveillante. En outre, cette escapade enrichissante m'a permis d'apprécier la convivialité légendaire des résidents. Je garde un souvenir impérissable de cette aventure nordique remarquable que je recommande chaleureusement !";
  const res_b2_t2 = await writingService.getFeedback(b2_t2, 'TCF Canada - Tâche 2', 'Récit de voyage', undefined, 'French', 'TCF Canada', 2, 120, 150);
  assert(res_b2_t2.cefrLevel === 'B2' || res_b2_t2.cefrLevel === 'C1', `B2 Level: Tâche 2 evaluated as ${res_b2_t2.cefrLevel} (${res_b2_t2.scoreOutOf20}/20 Marks)`, res_b2_t2);

  // Tâche 3 B2: Well-balanced argumentative essay with formal B2 discourse connectors (140-180 words)
  const b2_t3 = "La question de la gratuité des transports en commun suscite de nombreux débats au sein des métropoles contemporaines.\n\nD'un côté, les partisans de cette mesure soutiennent avec raison qu'elle constitue un choix important pour encourager les citoyens à délaisser leur véhicule individuel, favorisant ainsi la transition écologique urbaine et améliorant la fluidité du trafic. De plus, elle renforce le budget des ménages modestes et favorise la justice sociale au quotidien.\n\nD'un autre côté, certains analystes mettent en garde contre le coût financier pour les finances publiques locales, risquant d'entraver la modernisation des infrastructures sans recettes tarifaires suffisantes.\n\nEn conclusion, bien que la gratuité soit séduisante, une tarification solidaire modulée selon les revenus me semble être la solution la plus adaptée pour garantir la qualité et le confort du réseau public pour tous les usagers.";
  const res_b2_t3 = await writingService.getFeedback(b2_t3, 'TCF Canada - Tâche 3', 'Transports gratuits', undefined, 'French', 'TCF Canada', 3, 140, 180);
  assert(res_b2_t3.cefrLevel === 'B2' || res_b2_t3.scoreOutOf20 === 14 || res_b2_t3.scoreOutOf20 === 15, `B2 Level: Tâche 3 evaluated as ${res_b2_t3.cefrLevel} (${res_b2_t3.scoreOutOf20}/20 Marks)`, res_b2_t3);


  // ==========================================
  // LEVEL C1 (Effective Operational Proficiency: 16-17/20 Marks | NCLC 9)
  // ==========================================
  // Tâche 1 C1: High administrative register with advanced legal/diplomatic phrasing
  const c1_t1 = "Monsieur le Propriétaire,\n\nJe me permets de vous contacter en toute urgence afin d'attirer votre attention sur la défaillance totale du système de chauffage central survenue au sein de mon logement. Outre le manquement évident aux obligations légales du bailleur, cette situation expose ma famille à des conditions de vie sanitaires inacceptables en cette saison hivernale.\n\nDès lors, je vous somme d'ordonner le passage d'une équipe de techniciens certifiés dans les plus brefs délais pour un rétablissement immédiat de l'installation.\n\nDans l'attente de votre intervention immédiate, je vous prie d'agréer, Monsieur, l'expression de mes salutations distinguées.";
  const res_c1_t1 = await writingService.getFeedback(c1_t1, 'TCF Canada - Tâche 1', 'Problème de chauffage', undefined, 'French', 'TCF Canada', 1, 60, 120);
  assert(res_c1_t1.cefrLevel === 'C1' && res_c1_t1.scoreOutOf20 >= 16 && res_c1_t1.scoreOutOf20 <= 17, `C1 Level: Tâche 1 evaluated as ${res_c1_t1.cefrLevel} (${res_c1_t1.scoreOutOf20}/20 Marks)`, res_c1_t1);

  // Tâche 2 C1: Sophisticated literary style and nuanced cultural commentary (120-150 words)
  const c1_t2 = "Lors d'un récent périple au cœur des grands espaces canadiens, j'ai été immédiatement saisi par la majestueuse splendeur du parc national de Banff. Dès l'ascension des premiers massifs rocheux, le dépaysement fut total : les lacs aux reflets turquoise, bordés par d'immenses forêts boréales préservées, offraient un panorama d'une sérénité absolue. Cette immersion contemplative m'a permis d'observer la faune sauvage tout en prenant pleinement conscience de la fragilité inhérente à ces écosystèmes exceptionnels. En outre, les échanges enrichissants avec les gardes du parc ont conféré une dimension hautement pédagogique à ce séjour. Une aventure marquante d'une rare intensité émotionnelle que je préconise vivement à quiconque recherche l'émerveillement authentique !";
  const res_c1_t2 = await writingService.getFeedback(c1_t2, 'TCF Canada - Tâche 2', 'Récit de voyage', undefined, 'French', 'TCF Canada', 2, 120, 150);
  assert(res_c1_t2.cefrLevel === 'C1' && res_c1_t2.scoreOutOf20 >= 16 && res_c1_t2.scoreOutOf20 <= 17, `C1 Level: Tâche 2 evaluated as ${res_c1_t2.cefrLevel} (${res_c1_t2.scoreOutOf20}/20 Marks)`, res_c1_t2);

  // Tâche 3 C1: Rigorous argumentative essay with abstract conceptual vocabulary (140-180 words)
  const c1_t3 = "L'instauration de la gratuité intégrale des transports collectifs cristallise d'intenses controverses au croisement des impératifs environnementaux et des contraintes macroéconomiques contemporaines.\n\nD'une part, les partisans de cette réforme soutiennent à juste titre qu'elle constitue un levier indispensable pour accélérer la décarbonation urbaine en incitant massivement les usagers à délaisser leur véhicule individuel. De surcroît, elle renforce indiscutablement l'équité sociale et le pouvoir d'achat des ménages les plus vulnérables.\n\nD'autre part, plusieurs économistes soulignent le coût budgétaire colossal pour les finances publiques locales, risquant d'entraver la modernisation indispensable des infrastructures ferroviaires sans ressources tarifaires dédiées.\n\nEn conclusion, bien que la gratuité apparaisse particulièrement séduisante, une tarification solidaire modulée selon les revenus me semble constituer l'arbitrage le plus pertinent pour pérenniser la qualité du réseau public.";
  const res_c1_t3 = await writingService.getFeedback(c1_t3, 'TCF Canada - Tâche 3', 'Transports gratuits', undefined, 'French', 'TCF Canada', 3, 140, 180);
  assert(res_c1_t3.cefrLevel === 'C1' || res_c1_t3.cefrLevel === 'C2', `C1 Level: Tâche 3 evaluated as ${res_c1_t3.cefrLevel} (${res_c1_t3.scoreOutOf20}/20 Marks)`, res_c1_t3);


  // ==========================================
  // LEVEL C2 (Mastery: 18-20/20 Marks | NCLC 10)
  // ==========================================
  // Tâche 3 C2: Exemplary rhetorical mastery, complex subjunctive / subordinate clauses, and profound societal synthesis
  const c2_t3 = "La perspective d'une gratuité universelle des réseaux de transport en commun cristallise des dilemmes sociétaux et écologiques d'une acuité singulière au sein des métropoles contemporaines.\n\nD'une part, les partisans de cette politique publique affirment sans conteste qu'elle constitue un vecteur d'émancipation sociale majeur, permettant d'éradiquer les fractures territoriales tout en accélérant la transition énergétique par l'abandon massif de l'autosolisme. De surcroît, une telle mesure favorise indéniablement la justice redistributive au profit des classes laborieuses.\n\nD'autre part, plusieurs spécialistes des finances territoriales objectent qu'un tel choix budgétaire priverait les régies de ressources d'investissement cruciales, risquant ainsi de détériorer l'efficience technique et la sécurité des infrastructures à long terme.\n\nEn conclusion, bien que l'idéal de gratuité demeure philosophiquement louable, une tarification progressive et inclusive apparaît comme le compromis optimal pour concilier impératif écologique et viabilité économique pérenne.";
  const res_c2_t3 = await writingService.getFeedback(c2_t3, 'TCF Canada - Tâche 3', 'Transports gratuits', undefined, 'French', 'TCF Canada', 3, 140, 180);
  assert(res_c2_t3.cefrLevel === 'C2' && res_c2_t3.scoreOutOf20 >= 18, `C2 Level: Tâche 3 evaluated as ${res_c2_t3.cefrLevel} (${res_c2_t3.scoreOutOf20}/20 Marks)`, res_c2_t3);

  console.log(`\n======================================================`);
  console.log(`🏁 6-LEVEL CEFR ACCURACY RESULT: ${passed}/${total} TESTS PASSED (${((passed / total) * 100).toFixed(0)}%)`);
  console.log(`======================================================\n`);
}

run6LevelAccuracySuite().catch(console.error);
