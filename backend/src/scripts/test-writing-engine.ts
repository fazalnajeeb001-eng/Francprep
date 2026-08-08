import { writingService } from '../services/writing.service';

async function runTests() {
  console.log('🧪 Starting 10-Point TCF Writing Evaluation Engine Verification Suite...\n');

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

  // 1. Non-French Gibberish
  const res1 = await writingService.getFeedback(
    'asdfghjkl qwerty zxcvbnm poiuytrewq lkjhgfdsazxcvbnm',
    'TCF Canada - Tâche 1',
    'Écrivez un courriel pour réparer le chauffage (60 à 120 mots)',
    undefined,
    'French',
    'TCF Canada',
    1,
    60,
    120
  );
  assert(res1.scoreOutOf20 === 0 && res1.nclcGrade.includes('Zero Grade'), 'Test 1: Non-French Gibberish returns 0/20 (Zero Grade)', res1);

  // 2. Prompt Text Copying (>45%)
  const promptText2 = "Vous louez un appartement au Québec. Le système de chauffage ne fonctionne plus en plein hiver. Rédigez un courriel au propriétaire pour expliquer la situation et demander une réparation urgente.";
  const res2 = await writingService.getFeedback(
    promptText2 + " Merci beaucoup pour votre réponse rapide et votre aide précieuse.",
    'TCF Canada - Tâche 1',
    promptText2,
    undefined,
    'French',
    'TCF Canada',
    1,
    60,
    120,
    promptText2
  );
  assert(res2.scoreOutOf20 === 0 && res2.nclcGrade.includes('Zero Grade'), 'Test 2: Prompt text copying (>45%) returns 0/20 (Zero Grade)', res2);

  // 3. Exemplar Model Answer Plagiarism (>35%)
  const sampleText3 = "Monsieur le Propriétaire, Je vous écris en urgence afin de vous signaler un problème majeur dans l'appartement que je loue au 45 rue Saint-Denis. Depuis hier soir, le système de chauffage central est totalement en panne et la température intérieure a chuté de manière préoccupante en raison des températures négatives extérieures. En conséquence, je vous saurais gré d'intervenir dans les plus brefs délais.";
  const res3 = await writingService.getFeedback(
    sampleText3,
    'TCF Canada - Tâche 1',
    'Demandez une réparation de chauffage',
    undefined,
    'French',
    'TCF Canada',
    1,
    60,
    120,
    'Demandez une réparation de chauffage',
    sampleText3
  );
  assert(res3.scoreOutOf20 === 0 && res3.nclcGrade.includes('Plagiarism'), 'Test 3: Exemplar model answer plagiarism (>35%) returns 0/20 (Zero Grade)', res3);

  // 4. A1 Beginner with English Words
  const text4 = "Bonjour monsieur my house is very cold the chauffage is not working please help me repair urgent merci cordialement";
  const res4 = await writingService.getFeedback(
    text4,
    'TCF Canada - Tâche 1',
    'Demandez une réparation',
    undefined,
    'French',
    'TCF Canada',
    1,
    60,
    120,
    'Demandez une réparation'
  );
  assert(res4.scoreOutOf20 <= 4 && (res4.cefrLevel === 'A1' || res4.cefrLevel === 'Below A1'), 'Test 4: English words / A1 beginner French caps at <= 4/20 (A1)', res4);

  // 5. A2 Conversational Elementary Email (Tâche 1)
  const text5 = "Bonjour Monsieur, je vous écris parce que le chauffage dans mon appartement ne marche pas du tout. Il fait très froid pendant la nuit et mes enfants sont malades. Vous pouvez venir réparer rapidement ? En plus, l'eau chaude ne fonctionne pas bien aussi. Merci pour votre aide. Cordialement.";
  const res5 = await writingService.getFeedback(
    text5,
    'TCF Canada - Tâche 1',
    'Demandez une réparation urgente',
    undefined,
    'French',
    'TCF Canada',
    1,
    60,
    120,
    'Demandez une réparation urgente'
  );
  assert(res5.scoreOutOf20 >= 5 && res5.scoreOutOf20 <= 8 && (res5.cefrLevel === 'A2' || res5.cefrLevel === 'B1'), 'Test 5: Elementary A2 conversational email scores 5-8/20', res5);

  // 6. Solid B2 Upper Formal Correspondence (Tâche 1)
  const text6 = "Monsieur le Propriétaire,\n\nJe me permets de vous adresser ce courriel afin de vous signaler une défaillance concernant le système de chauffage de mon logement. En raison de la chute brutale des températures extérieures, la situation devient difficile à supporter au quotidien.\n\nPar conséquent, pourriez-vous faire intervenir un technicien qualifié dès aujourd'hui afin de procéder aux réparations nécessaires ? Je resterai joignable par téléphone à tout moment pour faciliter l'accès à l'appartement.\n\nDans l'attente de votre retour rapide, veuillez agréer mes salutations distinguées.";
  const res6 = await writingService.getFeedback(
    text6,
    'TCF Canada - Tâche 1',
    'Demandez une réparation urgente de chauffage',
    undefined,
    'French',
    'TCF Canada',
    1,
    60,
    120,
    'Demandez une réparation urgente de chauffage'
  );
  assert(res6.scoreOutOf20 >= 14 && res6.scoreOutOf20 <= 15 && res6.cefrLevel === 'B2', 'Test 6: Solid B2 Upper formal correspondence scores 14-15/20 (NCLC 8 | +23 CRS pts)', res6);

  // 7. Advanced C1 Administrative Email (Tâche 1)
  const text7 = "Monsieur le Propriétaire,\n\nJe me permets de vous contacter en toute urgence afin d'attirer votre attention sur la défaillance totale du système de chauffage central survenue au sein de mon logement. Outre le manquement évident aux obligations légales du bailleur, cette situation expose ma famille à des conditions de vie sanitaires inacceptables en cette saison hivernale.\n\nDès lors, je vous somme d'ordonner le passage d'une équipe de techniciens certifiés dans les plus brefs délais pour un rétablissement immédiat de l'installation.\n\nDans l'attente de votre intervention immédiate, je vous prie d'agréer, Monsieur, l'expression de mes salutations distinguées.";
  const res7 = await writingService.getFeedback(
    text7,
    'TCF Canada - Tâche 1',
    'Demandez une réparation urgente de chauffage',
    undefined,
    'French',
    'TCF Canada',
    1,
    60,
    120,
    'Demandez une réparation urgente de chauffage'
  );
  assert(res7.scoreOutOf20 >= 16 && res7.scoreOutOf20 <= 17 && res7.cefrLevel === 'C1', 'Test 7: Advanced C1 formal administrative email scores 16-17/20 (NCLC 9 | +31 CRS pts)', res7);

  // 8. Tâche 2 Past Narrative Report (B2-C1)
  const text8 = "Lors de mon récent séjour au Canada, j'ai eu l'opportunité de participer au Festival d'hiver de Québec. Dès mon arrivée sur les lieux, j'ai été émerveillé par la beauté spectaculaire des sculptures sur glace et la féerie des illuminations urbaines. Pendant plusieurs jours, nous avons assisté à des concerts en plein air et découvert la gastronomie locale dans une atmosphère particulièrement chaleureuse et bienveillante. En outre, cette escapade enrichissante m'a permis d'apprécier la convivialité légendaire des résidents. Je garde un souvenir impérissable de cette aventure nordique remarquable !";
  const res8 = await writingService.getFeedback(
    text8,
    'TCF Canada - Tâche 2',
    'Racontez une expérience de voyage marquante',
    undefined,
    'French',
    'TCF Canada',
    2,
    120,
    150,
    'Racontez une expérience de voyage marquante'
  );
  assert(res8.scoreOutOf20 >= 14 && (res8.cefrLevel === 'B2' || res8.cefrLevel === 'C1'), 'Test 8: Rich past narrative (Tâche 2) scores 14-16/20 (B2-C1)', res8);

  // 9. Tâche 3 Nuanced Argumentative Essay (C1-C2)
  const text9 = "La question de la gratuité intégrale des transports en commun suscite d'intenses controverses sociétales et environnementales au sein des métropoles actuelles.\n\nD'une part, les partisans de cette mesure affirment qu'elle constitue un levier déterminant pour accélérer la décarbonation urbaine en incitant massivement les citadins à délaisser leur véhicule individuel. De surcroît, elle renforce incontestablement le pouvoir d'achat des ménages modestes et favorise une équité sociale concrète.\n\nD'autre part, plusieurs analystes soulignent le coût budgétaire colossal pour les finances publiques, risquant d'entraver la modernisation et la sécurité des infrastructures ferroviaires sans ressources tarifaires dédiées.\n\nEn conclusion, bien que la gratuité universelle apparaisse séduisante, une tarification solidaire modulée selon les revenus des usagers me paraît être l'arbitrage le plus pertinent pour garantir la pérennité et la haute qualité du réseau public.";
  const res9 = await writingService.getFeedback(
    text9,
    'TCF Canada - Tâche 3',
    'Faut-il rendre les transports gratuits ?',
    undefined,
    'French',
    'TCF Canada',
    3,
    140,
    180,
    'Faut-il rendre les transports gratuits ?'
  );
  assert(res9.scoreOutOf20 >= 16 && (res9.cefrLevel === 'C1' || res9.cefrLevel === 'C2'), 'Test 9: Nuanced argumentative essay (Tâche 3) scores 16-20/20 (C1-C2 / NCLC 9-10)', res9);

  // 10. Format Mismatch: Personal email pasted into Tâche 3
  const text10 = "Bonjour cher ami,\n\nJe t'écris pour te parler de la météo et de mes vacances. J'espère que tu vas bien. On se voit bientôt.\n\nCordialement, Jean";
  const res10 = await writingService.getFeedback(
    text10,
    'TCF Canada - Tâche 3',
    'Essai argumentatif sur les transports',
    undefined,
    'French',
    'TCF Canada',
    3,
    140,
    180,
    'Essai argumentatif sur les transports'
  );
  assert(res10.scoreOutOf20 === 0 && res10.taskFulfillmentScore === 0, 'Test 10: Personal letter pasted in Tâche 3 receives 0/20 (Format mismatch zero grade)', res10);

  console.log(`\n🏁 Test Suite Summary: ${passed}/${total} Tests Passed (${((passed / total) * 100).toFixed(0)}%)`);
}

runTests().catch(console.error);
