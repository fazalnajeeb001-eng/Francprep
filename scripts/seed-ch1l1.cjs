/**
 * Seed Ch1 L1: Basic Greetings — stores data in `canonical` field
 * The remote transform reads lesson.canonical and converts to sections[] for the frontend.
 * Run: cd backend && NODE_PATH=./node_modules node ../scripts/seed-ch1l1.cjs
 */
const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

const CANONICAL = {
  lessonId: 'a1-ch1-l1',
  chapterId: '6a59753c15acf7fb779bdf42',
  level: 'A1',
  title: 'Basic Greetings (Bonjour/Salut/Bonsoir)',
  anchorSkill: 'reading',
  durationMinutes: 22,
  objectives: [
    'Recognize and use the core greeting and farewell expressions, matched correctly to time of day and formality.',
    'Introduce yourself using the fixed pattern Je suis + name.',
    'Distinguish between formal and informal greetings in appropriate social contexts.'
  ],
  grammarFocus: "Introduction to être: je suis / tu es, used only in the fixed pattern 'Je suis... / Tu es...'",
  vocabularyFocus: 'bonjour, bonsoir, salut, au revoir, à bientôt, bonne nuit, madame, monsieur',

  warmUp: {
    content: 'Think about how you greet people in your own language. Do you say something different in the morning than at night? Do you greet a stranger the same way you greet a close friend? Keep these questions in mind — French makes some of the same distinctions, and a few new ones.'
  },

  explanation: {
    content: "French greetings change depending on two things: the time of day and how well you know the person.\n\n**Bonjour** ('hello' / 'good day') is the all-purpose daytime greeting, used with anyone from morning until early evening. It is the safest greeting to use when you are unsure.\n\n**Bonsoir** ('good evening') replaces bonjour once evening arrives — typically after 6 PM or when it starts to get dark.\n\n**Salut** ('hi' / 'bye') is casual and only used with people you know well — friends, classmates, family. Never use it with a stranger, a teacher, or someone older than you in a formal setting.\n\n**Au revoir** ('goodbye') works in any situation, formal or informal. It is always safe.\n\n**À bientôt** ('see you soon') is warm and casual, used when you expect to see the person again soon.\n\n**Bonne nuit** ('good night') is used only when someone is actually going to bed — not as a general evening farewell.\n\n**Madame** and **Monsieur** are polite titles added after bonjour/bonsoir when addressing someone you don't know well. For example: 'Bonjour, Madame' or 'Bonsoir, Monsieur.'"
  },

  vocabulary: [
    { french: 'bonjour', english: 'hello / good day', pronunciation: 'bohn-ZHOOR', example: 'Bonjour, Madame !' },
    { french: 'bonsoir', english: 'good evening', pronunciation: 'bohn-SWAHR', example: 'Bonsoir, Monsieur.' },
    { french: 'salut', english: 'hi / bye (informal)', pronunciation: 'sah-LU', example: 'Salut, Marc ! Ça va ?', formality: 'informal' },
    { french: 'au revoir', english: 'goodbye', pronunciation: 'oh ruh-VWAHR', example: 'Au revoir, à demain !' },
    { french: 'à bientôt', english: 'see you soon', pronunciation: 'ah byan-TOH', example: 'Merci, à bientôt !' },
    { french: 'bonne nuit', english: 'good night', pronunciation: 'bun NWEE', example: 'Bonne nuit, dors bien.', usageNote: 'Only said when someone is actually going to bed.' },
    { french: 'madame', english: 'madam / Mrs.', pronunciation: 'mah-DAM', example: 'Bonjour, madame Girard.', formality: 'formal' },
    { french: 'monsieur', english: 'sir / Mr.', pronunciation: 'muh-SYUR', example: 'Bonsoir, monsieur Dubois.', formality: 'formal' }
  ],

  grammar: {
    explanation: "This lesson introduces only a small, fixed piece of the verb être ('to be'): the phrase pattern Je suis... ('I am...') used to state your name.",
    formation: "Je suis + [name] → 'I am [name].'",
    usage: "This pattern is commonly used right after a greeting, when meeting someone for the first time: Bonjour, je suis Claire.",
    examples: ['Bonjour, je suis Antoine.', 'Bonsoir, je suis Madame Lefèvre.', 'Salut, je suis Léa !'],
    commonMistakes: [
      { wrong: 'Je suis à Claire.', correct: 'Je suis Claire.', why: 'No preposition is needed before a name with être.', tip: 'Just Je suis + name, nothing in between.' },
      { wrong: 'je suis claire', correct: 'Je suis Claire.', why: 'Proper names are always capitalized in French.', tip: 'Capitalize the name every time.' }
    ]
  },

  grammarDrills: {
    questions: [
      { id: 'a1-ch1-l1-gd-1', type: 'fill_blank', prompt: "Bonjour, __________.", correctAnswer: 'Je suis [your name]', explanation: 'Je suis + name is the fixed pattern.' },
      { id: 'a1-ch1-l1-gd-2', type: 'fill_blank', prompt: "Salut, __________ !", correctAnswer: 'Je suis [your name]', explanation: 'The same pattern works after any greeting.' },
      { id: 'a1-ch1-l1-gd-3', type: 'multiple_choice', prompt: 'Which is the correct way to introduce yourself?', options: ['Je suis Claire.', 'Je suis à Claire.', 'Je suis es Claire.', 'Moi suis Claire.'], correctAnswer: 'Je suis Claire.', explanation: 'Je suis + name is the only correct pattern.' },
      { id: 'a1-ch1-l1-gd-4', type: 'true_false', prompt: '"Je suis Marc" is a correct self-introduction.', options: ['True', 'False'], correctAnswer: 'True', explanation: 'Je suis + name is the standard pattern.' }
    ]
  },

  reading: {
    title: 'Deux Rencontres (Two Encounters)',
    text: "Le matin, au bureau :\nCamille : Bonjour, Madame Petit !\nMadame Petit : Bonjour ! Je suis Madame Petit.\nCamille : Je suis Camille. Enchantée !\n\nLe soir, dans la rue :\nHugo : Salut, Léa !\nLéa : Salut, Hugo ! Ça va ?\nHugo : Ça va, merci. Bonne nuit, à bientôt !\nLéa : À bientôt !",
    translation: "In the morning, at the office:\nCamille: Hello, Madame Petit!\nMadame Petit: Hello! I am Madame Petit.\nCamille: I am Camille. Nice to meet you!\n\nIn the evening, on the street:\nHugo: Hi, Léa!\nLéa: Hi, Hugo! How's it going?\nHugo: Good, thanks. Good night, see you soon!\nLéa: See you soon!",
    questions: [
      { id: 'a1-ch1-l1-r-1', type: 'short_answer', prompt: 'What time of day does the first conversation happen?', correctAnswer: 'Morning (le matin).', explanation: "The text says 'Le matin, au bureau.'" },
      { id: 'a1-ch1-l1-r-2', type: 'multiple_choice', prompt: 'Which greeting does Camille use with Madame Petit?', options: ['Salut', 'Bonjour', 'Bonsoir', 'Bonne nuit'], correctAnswer: 'Bonjour', explanation: "It's morning and formal, so Bonjour." },
      { id: 'a1-ch1-l1-r-3', type: 'short_answer', prompt: 'Why does Hugo use salut instead of bonjour?', correctAnswer: "Because he knows Léa well and it's informal.", explanation: 'Salut is for people you know well.' },
      { id: 'a1-ch1-l1-r-4', type: 'fill_blank', prompt: 'What does Léa say at the very end?', correctAnswer: 'À bientôt !', explanation: "Léa's final line is 'À bientôt !'" }
    ]
  },

  listening: {
    title: 'Au Café',
    transcript: "Serveur : Bonsoir, Madame !\nCliente : Bonsoir, Monsieur.\nServeur : Vous êtes Madame Lambert ?\nCliente : Oui, je suis Madame Lambert.\nServeur : Merci ! Au revoir, bonne soirée.\nCliente : Au revoir !",
    translation: "Waiter: Good evening, Madam!\nCustomer: Good evening, Sir.\nWaiter: Are you Madame Lambert?\nCustomer: Yes, I am Madame Lambert.\nWaiter: Thank you! Goodbye, have a good evening.\nCustomer: Goodbye!",
    questions: [
      { id: 'a1-ch1-l1-li-1', type: 'true_false', prompt: 'The conversation happens in the morning.', options: ['True', 'False'], correctAnswer: 'False', explanation: "The waiter says 'Bonsoir' — evening." },
      { id: 'a1-ch1-l1-li-2', type: 'true_false', prompt: "The customer's name is Madame Lambert.", options: ['True', 'False'], correctAnswer: 'True', explanation: "She confirms: 'Oui, je suis Madame Lambert.'" },
      { id: 'a1-ch1-l1-li-3', type: 'true_false', prompt: 'The waiter says salut at the end.', options: ['True', 'False'], correctAnswer: 'False', explanation: "He says 'Au revoir', not salut." },
      { id: 'a1-ch1-l1-li-4', type: 'multiple_choice', prompt: 'What greeting does the waiter use?', options: ['Bonjour', 'Salut', 'Bonsoir', 'Bonne nuit'], correctAnswer: 'Bonsoir', explanation: "The waiter opens with 'Bonsoir, Madame !'" }
    ]
  },

  speaking: {
    guidedActivity: 'Practice saying bonjour and bonsoir aloud, paying attention to the difference in mouth position between the open "oh" sound in bonjour and the rounder "wah" sound in bonsoir. Then practice salut — it should feel quick and casual.',
    roleplay: 'Person A greets Person B as a stranger in the morning, using Madame/Monsieur. Person B replies and introduces themselves with Je suis.... Both say goodbye with au revoir.\n\nThen switch roles and repeat, but this time as friends meeting in the evening — use salut, à bientôt, and bonne nuit.',
    pronunciationTip: "The 'r' in bonjour and au revoir is made in the back of the throat — softer than an English 'r.' The 'oi' in bonsoir sounds like \"wah\" — round your lips."
  },

  writing: {
    task: 'Write a 2–3 sentence mini-dialogue in which you greet someone in the evening, introduce yourself, and say goodbye.',
    modelAnswer: 'Bonsoir, Madame. Je suis Julien. Au revoir, à bientôt !',
    checklist: [
      'Used a greeting that matches evening time (bonsoir, not bonjour).',
      'Introduced yourself with Je suis.',
      'Included a farewell expression (au revoir, à bientôt, or bonne nuit).',
      'Capitalized proper names and started sentences with capital letters.'
    ]
  },

  practiceExercises: {
    questions: [
      { id: 'a1-ch1-l1-pe-1', type: 'multiple_choice', prompt: 'Which greeting is correct at 9:00 PM?', options: ['Bonjour', 'Salut', 'Bonsoir', 'Bonne nuit (as a greeting)'], correctAnswer: 'Bonsoir', explanation: '9:00 PM is evening, so bonsoir is correct.' },
      { id: 'a1-ch1-l1-pe-2', type: 'matching', prompt: 'Match the expression to its use.', pairs: [{ left: 'Salut', right: 'Informal hello/goodbye' }, { left: 'Bonjour', right: 'Formal daytime greeting' }, { left: 'Bonne nuit', right: 'Said only when going to bed' }], correctAnswer: [{ left: 'Salut', right: 'Informal hello/goodbye' }, { left: 'Bonjour', right: 'Formal daytime greeting' }, { left: 'Bonne nuit', right: 'Said only when going to bed' }], explanation: 'Each expression maps to one usage.' },
      { id: 'a1-ch1-l1-pe-3', type: 'fill_blank', prompt: '__________, Madame Girard ! Je suis Paul.', correctAnswer: 'Bonjour', explanation: 'A polite daytime greeting with a title takes bonjour.' },
      { id: 'a1-ch1-l1-pe-4', type: 'ordering', prompt: 'Put in a logical order.', items: ['Au revoir !', 'Bonjour, Madame.', 'Je suis Thomas.'], correctAnswer: ['Bonjour, Madame.', 'Je suis Thomas.', 'Au revoir !'], explanation: 'Greeting, introduction, farewell.' },
      { id: 'a1-ch1-l1-pe-5', type: 'short_answer', prompt: 'In your own words, explain when you would use salut instead of bonjour.', correctAnswer: 'Salut is used with people you know well, in casual situations.', explanation: 'This checks formality understanding.' },
      { id: 'a1-ch1-l1-pe-6', type: 'translation', prompt: 'Translate to French: "Good evening, sir. I am Marie."', correctAnswer: 'Bonsoir, monsieur. Je suis Marie.', explanation: 'Bonsoir for evening, monsieur for formal, Je suis + name.' },
      { id: 'a1-ch1-l1-pe-7', type: 'true_false', prompt: 'You can use salut with your teacher.', options: ['True', 'False'], correctAnswer: 'False', explanation: 'Salut is informal. Use bonjour with a teacher.' }
    ]
  },

  miniReview: {
    content: "In this lesson you learned the core French greetings: bonjour (daytime), bonsoir (evening), salut (informal), and au revoir (goodbye). You learned that bonne nuit is only for bedtime, and that à bientôt means 'see you soon.' You also learned the fixed pattern Je suis + name for introducing yourself, and that madame/monsieur are used for polite address."
  },

  selfAssessment: [
    'I can say hello appropriately for morning, afternoon, or evening.',
    'I know when to use salut versus bonjour.',
    'I can introduce myself using Je suis + my name.',
    'I can say goodbye in more than one way (au revoir, à bientôt, bonne nuit).',
    'I understand when to use madame and monsieur.'
  ]
};

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();

  console.log('=== SEEDING CH1 L1: Basic Greetings (canonical) ===\n');

  const existing = await db.collection('lessons').findOne({ lessonId: CANONICAL.lessonId });
  if (!existing) {
    console.error('Lesson with lessonId=' + CANONICAL.lessonId + ' not found!');
    await client.close();
    return;
  }
  console.log('Found lesson: ' + existing._id + ' (' + existing.title + ')');

  const result = await db.collection('lessons').updateOne(
    { _id: existing._id },
    { $set: { canonical: CANONICAL, updatedAt: new Date() } }
  );
  console.log('Updated canonical: ' + result.modifiedCount);

  const allQuestions = [
    ...CANONICAL.grammarDrills.questions,
    ...CANONICAL.reading.questions,
    ...CANONICAL.listening.questions,
    ...CANONICAL.practiceExercises.questions,
  ];

  await db.collection('exercises').deleteMany({ lessonId: existing._id.toString() });
  console.log('Old exercises cleared.');

  const grouped = {};
  for (const q of allQuestions) {
    const section = q.id.split('-').slice(-2, -1)[0] || 'general';
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(q);
  }

  let exOrder = 1;
  for (const [section, questions] of Object.entries(grouped)) {
    const exDoc = {
      lessonId: existing._id,
      title: section.charAt(0).toUpperCase() + section.slice(1),
      type: questions[0]?.type || 'multiple_choice',
      category: section,
      instructions: '',
      questions: questions.map(q => ({
        id: q.id, type: q.type, prompt: q.prompt, text: q.prompt,
        options: q.options, pairs: q.pairs, items: q.items,
        correctAnswer: q.correctAnswer, explanation: q.explanation, points: 10,
      })),
      points: questions.length * 10,
      isExamStyle: false,
      order: exOrder++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.collection('exercises').insertOne(exDoc);
    console.log('Created exercise: ' + exDoc.title + ' (' + questions.length + ' questions)');
  }

  console.log('\n=== DONE ===');
  await client.close();
}

main().catch(e => { console.error(e); process.exit(1); });
