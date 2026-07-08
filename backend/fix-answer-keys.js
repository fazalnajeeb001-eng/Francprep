const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep').then(async()=>{
  const db = mongoose.connection.db;
  const ch1 = await db.collection('chapters').findOne({title:/Greetings/});
  const lessons = await db.collection('lessons').find({chapterId:ch1._id}).sort({order:1}).toArray();
  const l1 = lessons[0];
  const l2 = lessons[1];

  // ===== Fix Lesson 1 sections - remove answer keys from body, store questions =====
  const l1Sections = [
    {
      type: 'warmup', title: 'Warm-Up',
      body: 'Think about how you greet people in your own language. Do you say something different in the morning than at night? Do you greet a stranger the same way you greet a close friend? Keep these questions in mind — French makes some of the same distinctions, and a few new ones.',
      translation: null, questions: [], media: null
    },
    {
      type: 'explanation', title: 'Lesson Explanation',
      body: 'French greetings change depending on two things: the time of day and how well you know the person.\n\nBonjour ("hello" / "good day") is the all-purpose daytime greeting. It works with anyone, from a stranger to a close friend, from morning until early evening.\n\nBonsoir ("good evening") replaces bonjour once evening arrives — roughly from the early evening onward.\n\nSalut ("hi" / "bye") is casual and is only used with people you know well — friends, close family, classmates. It is never used with a stranger or in a formal setting.\n\nAu revoir ("goodbye") is the standard way to say goodbye in any situation, formal or informal.\n\nÀ bientôt ("see you soon") is a warm, casual way to end a conversation when you expect to see the person again soon.\n\nBonne nuit ("good night") is used only when someone is going to bed — not as a general evening farewell.\n\nMadame (for a woman) and Monsieur (for a man) are polite titles often added after bonjour or bonsoir when addressing someone you don\'t know well: Bonjour, Madame.',
      translation: null, questions: [], media: null
    },
    {
      type: 'vocabulary', title: 'Vocabulary',
      body: [
        'Bonjour | hello / good day | bohn-ZHOOR | Bonjour, Madame !',
        'Bonsoir | good evening | bohn-SWAHR | Bonsoir, Monsieur.',
        'Salut | hi / bye (informal) | sah-LU | Salut, Marc ! Ça va ?',
        'Au revoir | goodbye | oh ruh-VWAHR | Au revoir, à demain !',
        'À bientôt | see you soon | ah byan-TOH | Merci, à bientôt !',
        'Bonne nuit | good night | bun NWEE | Bonne nuit, dors bien.',
        'Madame | madam / Mrs. | mah-DAM | Bonjour, madame Girard.',
        'Monsieur | sir / Mr. | muh-SYUR | Bonsoir, monsieur Dubois.',
        'Enchanté(e) | nice to meet you | ahn-shahn-TAY | Enchantée, Madame !'
      ].join('\n'),
      translation: null, questions: [], media: null
    },
    {
      type: 'grammar', title: 'Grammar: Être (Introduction)',
      body: 'This lesson introduces only a small, fixed piece of the verb être ("to be"): the phrase pattern Je suis... ("I am...") used to state your name, which you\'ll need for the dialogues below. The full conjugation of être is built gradually across this chapter — you are not expected to master it yet.\n\nFormation (so far):\nJe suis + [name] → "I am [name]."\n\nUsage: This pattern is commonly used right after a greeting, when meeting someone for the first time: Bonjour, je suis Claire.\n\nExamples:\n• Bonjour, je suis Antoine.\n• Bonsoir, je suis Madame Lefèvre.\n• Salut, je suis Léa !\n\nCommon Mistakes:\n❌ Je suis à Claire. → ✅ Je suis Claire. (No preposition is needed before a name with être.)\n❌ Forgetting to capitalize proper names: je suis claire → ✅ Je suis Claire.\n\nMini Drills: Complete each sentence with Je suis and your own name.\n\nBonjour, ____[answer:Je suis ______].\nSalut, ____[answer:je suis ______] !',
      translation: null, questions: [], media: null
    },
    {
      type: 'reading', title: 'Reading: Deux Rencontres',
      body: '"Deux Rencontres" (Two Encounters)\n\nLe matin, au bureau :\nCamille : Bonjour, Madame Petit !\nMadame Petit : Bonjour ! Je suis Madame Petit.\nCamille : Je suis Camille. Enchantée !\n\nLe soir, dans la rue :\nHugo : Salut, Léa !\nLéa : Salut, Hugo ! Ça va ?\nHugo : Ça va, merci. Bonne nuit, à bientôt !\nLéa : À bientôt !',
      translation: 'Morning, at the office:\nCamille: Good morning, Madame Petit!\nMadame Petit: Good morning! I\'m Madame Petit.\nCamille: I\'m Camille. Nice to meet you!\n\nEvening, in the street:\nHugo: Hi, Léa!\nLéa: Hi, Hugo! How\'s it going?\nHugo: Fine, thanks. Good night, see you soon!\nLéa: See you soon!',
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'What time of day does the first conversation happen?',
          options: ['Morning', 'Afternoon', 'Evening', 'Night'],
          correctAnswer: 'Morning',
          explanation: 'The text says "Le matin, au bureau" (Morning, at the office).'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'Which greeting does Camille use with Madame Petit?',
          options: ['Salut', 'Bonsoir', 'Bonjour', 'Bonne nuit'],
          correctAnswer: 'Bonjour',
          explanation: 'Camille says "Bonjour, Madame Petit!"'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'Why does Hugo use "salut" instead of "bonjour"?',
          options: ['Because it\'s evening', 'Because he knows Léa well', 'Because he\'s being formal', 'Because he\'s angry'],
          correctAnswer: 'Because he knows Léa well',
          explanation: 'Salut is used informally with people you know well, like friends.'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'What does Léa say at the very end of the conversation?',
          options: ['Au revoir', 'Bonne nuit', 'À bientôt', 'Salut'],
          correctAnswer: 'À bientôt',
          explanation: 'Léa responds to Hugo\'s "À bientôt" with the same expression.'
        }
      ],
      media: null
    },
    {
      type: 'listening', title: 'Listening: Au Café',
      body: 'Transcript: "Au Café"\n\nServeur : Bonsoir, Madame !\nCliente : Bonsoir, Monsieur.\nServeur : Vous êtes Madame Lambert ?\nCliente : Oui, je suis Madame Lambert.\nServeur : Merci ! Au revoir, bonne soirée.\nCliente : Au revoir !',
      translation: 'Waiter: Good evening, Madam!\nCustomer: Good evening, sir.\nWaiter: Are you Madame Lambert?\nCustomer: Yes, I\'m Madame Lambert.\nWaiter: Thank you! Goodbye, have a good evening.\nCustomer: Goodbye!',
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'The conversation happens in the morning.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          explanation: 'The waiter says "Bonsoir" which is an evening greeting.'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'The customer\'s name is Madame Lambert.',
          options: ['True', 'False'],
          correctAnswer: 'True',
          explanation: 'The customer confirms: "Oui, je suis Madame Lambert."'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'The waiter says "salut" at the end.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          explanation: 'The waiter says "Au revoir, bonne soirée" at the end.'
        }
      ],
      media: { audio: [] }
    },
    {
      type: 'speaking', title: 'Speaking: Greeting Chain',
      body: 'Guided Activity — Greeting Chain:\nPractice saying the following aloud, paying attention to the difference in mouth position between bonjour (open "oh" sound) and bonsoir (rounder "wah" sound).\n\nRoleplay (with a partner, or aloud alone playing both parts):\n• Person A greets Person B as a stranger in the morning, using Madame/Monsieur.\n• Person B replies and introduces themselves with Je suis...\n• Both say goodbye with au revoir.\n\nPronunciation Tip: The "r" in bonjour and au revoir is made in the back of the throat — softer than an English "r." Don\'t worry about perfecting it yet; just get comfortable attempting it.',
      translation: null, questions: [], media: null
    },
    {
      type: 'writing', title: 'Writing: A Short Greeting',
      body: 'Task: Write a 2–3 sentence mini-dialogue in which you greet someone in the evening, introduce yourself, and say goodbye.\n\nModel Answer:\nBonsoir, Madame. Je suis Julien. Au revoir, à bientôt !\n\nWriting Checklist:\n☐ Used a greeting that matches evening time (bonsoir, not bonjour).\n☐ Introduced yourself with Je suis.\n☐ Included a farewell expression.',
      translation: null, questions: [], media: null
    },
    {
      type: 'review', title: 'Mini Review & Self Assessment',
      body: '☐ I can say hello appropriately for morning, afternoon, or evening.\n☐ I know when to use salut versus bonjour.\n☐ I can introduce myself using Je suis.\n☐ I can say goodbye in more than one way.',
      translation: null, questions: [], media: null
    }
  ];

  await db.collection('lessons').updateOne({_id: l1._id}, {$set: {sections: l1Sections}});
  console.log('✅ Lesson 1 fixed — answer keys removed from body, stored as questions');

  // ===== Fix Lesson 2 sections =====
  const l2Sections = [
    {
      type: 'warmup', title: 'Warm-Up',
      body: 'You already know how to say Je suis [name]. Today you\'ll learn a second, equally common way the French say their name — one you\'ll hear even more often in everyday conversation.',
      translation: null, questions: [], media: null
    },
    {
      type: 'explanation', title: 'Lesson Explanation',
      body: 'While Je suis [name] is correct, French speakers most commonly introduce themselves using je m\'appelle, which literally means "I call myself" but simply translates as "my name is."\n\nJe m\'appelle Sophie. — "My name is Sophie."\nComment tu t\'appelles ? — "What\'s your name?" (informal)\nEnchanté (said by a man) / Enchantée (said by a woman) — "Nice to meet you," said right after learning someone\'s name.\nMoi aussi — "Me too," a natural response when something applies to you as well.\nEt toi ? — "And you?" (informal) / Et vous ? — "And you?" (formal) — used to turn a question back to the other person.\n\nWe\'re also extending être: il est / elle est ("he is" / "she is") lets you talk about a third person, not just yourself.',
      translation: null, questions: [], media: null
    },
    {
      type: 'vocabulary', title: 'Vocabulary',
      body: [
        'Je m\'appelle | my name is | zhuh mah-PELL | Je m\'appelle Nora.',
        'Comment tu t\'appelles ? | what\'s your name? (informal) | koh-mahn tu tah-PELL | Comment tu t\'appelles ?',
        'Enchanté(e) | nice to meet you | ahn-shahn-TAY | Enchantée, Madame !',
        'Moi aussi | me too | mwah oh-SEE | Moi aussi, enchantée !',
        'Et toi ? | and you? (informal) | ay TWAH | Ça va, et toi ?',
        'Et vous ? | and you? (formal) | ay VOO | Bonjour, et vous ?',
        'Il s\'appelle | his name is | eel sah-PELL | Il s\'appelle Antoine.',
        'Elle s\'appelle | her name is | el sah-PELL | Elle s\'appelle Julie.'
      ].join('\n'),
      translation: null, questions: [], media: null
    },
    {
      type: 'grammar', title: 'Grammar: S\'appeler & Être (Extension)',
      body: 'S\'appeler is a reflexive verb — literally, you "call yourself" a name. At A1, you only need two forms of it. We\'re also adding the third-person forms of être.\n\nFormation:\nJe → je m\'appelle / je suis\nTu → tu t\'appelles / tu es\nIl / Elle → il/elle s\'appelle / il/elle est\n\nUsage: Use je m\'appelle to state your own name; use il/elle est to describe who someone else is (often paired with a name): Elle est Camille.\n\nExamples:\n• Je m\'appelle Hugo. Et toi ?\n• Elle s\'appelle Inès.\n• Il est content. (He is happy.)\n\nCommon Mistakes:\n❌ Je m\'appelle est Marc. → ✅ Je m\'appelle Marc. (No est needed with s\'appeler.)\n❌ Il s\'appelle il Paul. → ✅ Il s\'appelle Paul.\n\nMini Drills: Fill in with the correct form.\n\n____[answer:Je m\'appelle] Sarah.\n____[answer:Il s\'appelle] Antoine.',
      translation: null, questions: [], media: null
    },
    {
      type: 'reading', title: 'Reading: Au Parc',
      body: '"Au Parc" (At the Park)\n\nÉlise : Bonjour ! Je m\'appelle Élise.\nMarco : Enchanté ! Je m\'appelle Marco.\nÉlise : Moi aussi, enchantée ! Et elle, comment elle s\'appelle ?\nMarco : Elle s\'appelle Julie. Elle est ma sœur.',
      translation: 'Élise: Hello! My name is Élise.\nMarco: Nice to meet you! My name is Marco.\nÉlise: Me too, nice to meet you! And her, what\'s her name?\nMarco: Her name is Julie. She\'s my sister.',
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'What is the first girl\'s name?',
          options: ['Marco', 'Julie', 'Élise', 'Inès'],
          correctAnswer: 'Élise',
          explanation: 'Élise introduces herself first: "Bonjour ! Je m\'appelle Élise."'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'Who is Julie?',
          options: ['Élise\'s friend', 'Marco\'s sister', 'Marco\'s mother', 'Élise\'s sister'],
          correctAnswer: 'Marco\'s sister',
          explanation: 'Marco says: "Elle s\'appelle Julie. Elle est ma sœur."'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'What word does Marco use to describe his relationship to Julie?',
          options: ['Ma mère', 'Ma sœur', 'Ma cousine', 'Mon amie'],
          correctAnswer: 'Ma sœur',
          explanation: 'Marco says "Elle est ma sœur" (She is my sister).'
        }
      ],
      media: null
    },
    {
      type: 'listening', title: 'Listening: Nouveaux Voisins',
      body: 'Transcript: "Nouveaux Voisins" (New Neighbors)\n\nVoix 1 : Bonjour ! Je m\'appelle Thomas.\nVoix 2 : Enchantée, Thomas ! Je m\'appelle Claire.\nVoix 1 : Et lui, comment il s\'appelle ?\nVoix 2 : Il s\'appelle Léo. Il est mon fils.',
      translation: 'Voice 1: Hello! My name is Thomas.\nVoice 2: Nice to meet you, Thomas! My name is Claire.\nVoice 1: And him, what\'s his name?\nVoice 2: His name is Léo. He\'s my son.',
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'What is Voix 2\'s name?',
          options: ['Thomas', 'Léo', 'Claire', 'Nina'],
          correctAnswer: 'Claire',
          explanation: 'Voix 2 says: "Je m\'appelle Claire."'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'Who is Léo?',
          options: ['Thomas\'s son', 'Claire\'s son', 'Claire\'s brother', 'A neighbor'],
          correctAnswer: 'Claire\'s son',
          explanation: 'Voix 2 says: "Il est mon fils" (He is my son).'
        }
      ],
      media: { audio: [] }
    },
    {
      type: 'speaking', title: 'Speaking: Introductions',
      body: 'Guided Activity: Practice introducing yourself aloud using je m\'appelle, then add Enchanté(e) !\n\nRoleplay: With a partner, introduce yourselves to each other, then each introduce a third "imaginary" person using il/elle s\'appelle.\n\nPronunciation Tip: The "eu" sound in je and deux is made with rounded lips, unlike any English vowel — practice it by saying "uh" while rounding your lips forward.',
      translation: null, questions: [], media: null
    },
    {
      type: 'writing', title: 'Writing: Your Introduction',
      body: 'Task: Write a short introduction (3 sentences) introducing yourself and one other person (real or imaginary).\n\nModel Answer:\nJe m\'appelle Alex. Enchanté ! Elle s\'appelle Nina, elle est ma collègue.\n\nWriting Checklist:\n☐ Used je m\'appelle correctly.\n☐ Introduced a second person using il/elle s\'appelle.\n☐ Included enchanté(e).',
      translation: null, questions: [], media: null
    },
    {
      type: 'review', title: 'Mini Review & Self Assessment',
      body: '☐ I can introduce myself using je m\'appelle.\n☐ I can say "nice to meet you" correctly for my gender.\n☐ I can introduce someone else.\n☐ I know the difference between et toi and et vous.',
      translation: null, questions: [], media: null
    }
  ];

  await db.collection('lessons').updateOne({_id: l2._id}, {$set: {sections: l2Sections}});
  console.log('✅ Lesson 2 fixed — answer keys removed from body, stored as questions');

  // Verify
  const v1 = await db.collection('lessons').findOne({_id: l1._id});
  const reading1 = v1.sections.find(s => s.type === 'reading');
  console.log('\nL1 reading questions:', reading1.questions.length, '(hidden from body, stored as data)');
  console.log('L1 reading body contains "Answer Key":', reading1.body.includes('Answer Key'));

  const v2 = await db.collection('lessons').findOne({_id: l2._id});
  const reading2 = v2.sections.find(s => s.type === 'reading');
  console.log('L2 reading questions:', reading2.questions.length, '(hidden from body, stored as data)');
  console.log('L2 reading body contains "Answer Key":', reading2.body.includes('Answer Key'));

  mongoose.disconnect();
  console.log('\n✅ DONE — now the frontend needs to render these questions interactively');
}).catch(e => { console.error(e); mongoose.disconnect(); });