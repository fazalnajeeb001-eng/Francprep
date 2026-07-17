const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const ch1 = await db.collection('chapters').findOne({ title: 'Greetings & First Contact' });
  const lessons = await db.collection('lessons').find({ chapterId: ch1._id }).sort({ order: 1 }).toArray();
  const l1 = lessons[0];
  const l2 = lessons[1];

  // =====================================================================
  // LESSON 1 — FULL UPDATE
  // =====================================================================
  const l1Sections = [
    {
      type: 'warmup',
      title: 'Warm-Up',
      body: 'Think about how you greet people in your own language. Do you say something different in the morning than at night? Do you greet a stranger the same way you greet a close friend? Keep these questions in mind — French makes some of the same distinctions, and a few new ones.',
      translation: null,
      media: null
    },
    {
      type: 'explanation',
      title: 'Lesson Explanation',
      body: 'French greetings change depending on two things: the time of day and how well you know the person.\n\nBonjour ("hello" / "good day") is the all-purpose daytime greeting. It works with anyone, from a stranger to a close friend, from morning until early evening.\n\nBonsoir ("good evening") replaces bonjour once evening arrives — roughly from the early evening onward.\n\nSalut ("hi" / "bye") is casual and is only used with people you know well — friends, close family, classmates. It is never used with a stranger or in a formal setting.\n\nAu revoir ("goodbye") is the standard way to say goodbye in any situation, formal or informal.\n\nÀ bientôt ("see you soon") is a warm, casual way to end a conversation when you expect to see the person again soon.\n\nBonne nuit ("good night") is used only when someone is going to bed — not as a general evening farewell.\n\nMadame (for a woman) and Monsieur (for a man) are polite titles often added after bonjour or bonsoir when addressing someone you don\'t know well: Bonjour, Madame.',
      translation: null,
      media: null
    },
    {
      type: 'vocabulary',
      title: 'Vocabulary',
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
      translation: null,
      media: null
    },
    {
      type: 'grammar',
      title: 'Grammar: Être (Introduction)',
      body: 'This lesson introduces only a small, fixed piece of the verb être ("to be"): the phrase pattern Je suis... ("I am...") used to state your name, which you\'ll need for the dialogues below. The full conjugation of être is built gradually across this chapter — you are not expected to master it yet.\n\nFormation (so far):\nJe suis + [name] → "I am [name]."\n\nUsage: This pattern is commonly used right after a greeting, when meeting someone for the first time: Bonjour, je suis Claire.\n\nExamples:\n• Bonjour, je suis Antoine.\n• Bonsoir, je suis Madame Lefèvre.\n• Salut, je suis Léa !\n\nCommon Mistakes:\n❌ Je suis à Claire. → ✅ Je suis Claire. (No preposition is needed before a name with être.)\n❌ Forgetting to capitalize proper names: je suis claire → ✅ Je suis Claire.\n\nMini Drills: Complete each sentence with Je suis and your own name.\n\nBonjour, ____[answer:Je suis ______].\nSalut, ____[answer:je suis ______] !',
      translation: null,
      media: null
    },
    {
      type: 'reading',
      title: 'Reading: Deux Rencontres',
      body: '"Deux Rencontres" (Two Encounters)\n\nLe matin, au bureau :\nCamille : Bonjour, Madame Petit !\nMadame Petit : Bonjour ! Je suis Madame Petit.\nCamille : Je suis Camille. Enchantée !\n\nLe soir, dans la rue :\nHugo : Salut, Léa !\nLéa : Salut, Hugo ! Ça va ?\nHugo : Ça va, merci. Bonne nuit, à bientôt !\nLéa : À bientôt !\n\nComprehension Questions:\n1. What time of day is the first conversation?\n2. What greeting does Camille use for Madame Petit? Why that one?\n3. What greeting does Hugo use for Léa? What does this tell you about their relationship?',
      translation: 'Morning, at the office:\nCamille: Good morning, Madame Petit!\nMadame Petit: Good morning! I\'m Madame Petit.\nCamille: I\'m Camille. Nice to meet you!\n\nEvening, in the street:\nHugo: Hi, Léa!\nLéa: Hi, Hugo! How\'s it going?\nHugo: Fine, thanks. Good night, see you soon!\nLéa: See you soon!',
      media: null
    },
    {
      type: 'listening',
      title: 'Listening: Au Café',
      body: 'Transcript: "Au Café"\n\nServeur : Bonsoir, Madame !\nCliente : Bonsoir, Monsieur.\nServeur : Vous êtes Madame Lambert ?\nCliente : Oui, je suis Madame Lambert.\nServeur : Merci ! Au revoir, bonne soirée.\nCliente : Au revoir !\n\nListening Activity — True or False:\n1. The conversation happens in the morning.\n2. The customer\'s name is Madame Lambert.\n3. The waiter says salut at the end.\n\nAnswer Key:\n1. False (it\'s evening — bonsoir).\n2. True.\n3. False (he says au revoir).',
      translation: 'Waiter: Good evening, Madam!\nCustomer: Good evening, sir.\nWaiter: Are you Madame Lambert?\nCustomer: Yes, I\'m Madame Lambert.\nWaiter: Thank you! Goodbye, have a good evening.\nCustomer: Goodbye!',
      media: { audio: [] }
    },
    {
      type: 'speaking',
      title: 'Speaking: Greeting Chain',
      body: 'Guided Activity — Greeting Chain:\nPractice saying the following aloud, paying attention to the difference in mouth position between bonjour (open "oh" sound) and bonsoir (rounder "wah" sound).\n\nRoleplay (with a partner, or aloud alone playing both parts):\n• Person A greets Person B as a stranger in the morning, using Madame/Monsieur.\n• Person B replies and introduces themselves with Je suis...\n• Both say goodbye with au revoir.\n\nPronunciation Tip: The "r" in bonjour and au revoir is made in the back of the throat — softer than an English "r." Don\'t worry about perfecting it yet; just get comfortable attempting it.',
      translation: null,
      media: null
    },
    {
      type: 'writing',
      title: 'Writing: A Short Greeting',
      body: 'Task: Write a 2–3 sentence mini-dialogue in which you greet someone in the evening, introduce yourself, and say goodbye.\n\nModel Answer:\nBonsoir, Madame. Je suis Julien. Au revoir, à bientôt !\n\nWriting Checklist:\n☐ Used a greeting that matches evening time (bonsoir, not bonjour).\n☐ Introduced yourself with Je suis.\n☐ Included a farewell expression.',
      translation: null,
      media: null
    },
    {
      type: 'review',
      title: 'Mini Review & Self Assessment',
      body: 'You can now greet someone appropriately by time of day, choose between formal and informal greetings, introduce yourself with Je suis, and say goodbye correctly.\n\n☐ I can say hello appropriately for morning, afternoon, or evening.\n☐ I know when to use salut versus bonjour.\n☐ I can introduce myself using Je suis.\n☐ I can say goodbye in more than one way.',
      translation: null,
      media: null
    }
  ];

  await db.collection('lessons').updateOne(
    { _id: l1._id },
    { $set: {
      sections: l1Sections,
      objectives: [
        'Recognize and use the core greeting and farewell expressions, matched correctly to time of day and formality.'
      ],
      grammarTopics: ['être (introduction): je suis'],
      estimatedDuration: 25
    }}
  );
  console.log('✅ Lesson 1 updated');

  // =====================================================================
  // LESSON 2 — FULL UPDATE
  // =====================================================================
  const l2Sections = [
    {
      type: 'warmup',
      title: 'Warm-Up',
      body: 'You already know how to say Je suis [name]. Today you\'ll learn a second, equally common way the French say their name — one you\'ll hear even more often in everyday conversation.',
      translation: null,
      media: null
    },
    {
      type: 'explanation',
      title: 'Lesson Explanation',
      body: 'While Je suis [name] is correct, French speakers most commonly introduce themselves using je m\'appelle, which literally means "I call myself" but simply translates as "my name is."\n\nJe m\'appelle Sophie. — "My name is Sophie."\nComment tu t\'appelles ? — "What\'s your name?" (informal)\nEnchanté (said by a man) / Enchantée (said by a woman) — "Nice to meet you," said right after learning someone\'s name.\nMoi aussi — "Me too," a natural response when something applies to you as well.\nEt toi ? — "And you?" (informal) / Et vous ? — "And you?" (formal) — used to turn a question back to the other person.\n\nWe\'re also extending être: il est / elle est ("he is" / "she is") lets you talk about a third person, not just yourself.',
      translation: null,
      media: null
    },
    {
      type: 'vocabulary',
      title: 'Vocabulary',
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
      translation: null,
      media: null
    },
    {
      type: 'grammar',
      title: 'Grammar: S\'appeler & Être (Extension)',
      body: 'S\'appeler is a reflexive verb — literally, you "call yourself" a name. At A1, you only need two forms of it. We\'re also adding the third-person forms of être.\n\nFormation:\nJe → je m\'appelle / je suis\nTu → tu t\'appelles / tu es\nIl / Elle → il/elle s\'appelle / il/elle est\n\nUsage: Use je m\'appelle to state your own name; use il/elle est to describe who someone else is (often paired with a name): Elle est Camille.\n\nExamples:\n• Je m\'appelle Hugo. Et toi ?\n• Elle s\'appelle Inès.\n• Il est content. (He is happy.)\n\nCommon Mistakes:\n❌ Je m\'appelle est Marc. → ✅ Je m\'appelle Marc. (No est needed with s\'appeler.)\n❌ Il s\'appelle il Paul. → ✅ Il s\'appelle Paul.\n\nMini Drills: Fill in with the correct form.\n\n____[answer:Je m\'appelle] Sarah.\n____[answer:Il s\'appelle] Antoine.',
      translation: null,
      media: null
    },
    {
      type: 'reading',
      title: 'Reading: Au Parc',
      body: '"Au Parc" (At the Park)\n\nÉlise : Bonjour ! Je m\'appelle Élise.\nMarco : Enchanté ! Je m\'appelle Marco.\nÉlise : Moi aussi, enchantée ! Et elle, comment elle s\'appelle ?\nMarco : Elle s\'appelle Julie. Elle est ma sœur.\n\nComprehension Questions:\n1. How does Élise introduce herself?\n2. What is Marco\'s name?\n3. How does Marco introduce his sister?',
      translation: 'Élise: Hello! My name is Élise.\nMarco: Nice to meet you! My name is Marco.\nÉlise: Me too, nice to meet you! And her, what\'s her name?\nMarco: Her name is Julie. She\'s my sister.',
      media: null
    },
    {
      type: 'listening',
      title: 'Listening: Nouveaux Voisins',
      body: 'Transcript: "Nouveaux Voisins" (New Neighbors)\n\nVoix 1 : Bonjour ! Je m\'appelle Thomas.\nVoix 2 : Enchantée, Thomas ! Je m\'appelle Claire.\nVoix 1 : Et lui, comment il s\'appelle ?\nVoix 2 : Il s\'appelle Léo. Il est mon fils.\n\nListening Activity — Answer the questions:\n1. What is Voix 2\'s name?\n2. Who is Léo?\n\nAnswer Key:\n1. Claire.\n2. Claire\'s son (mon fils).',
      translation: 'Voice 1: Hello! My name is Thomas.\nVoice 2: Nice to meet you, Thomas! My name is Claire.\nVoice 1: And him, what\'s his name?\nVoice 2: His name is Léo. He\'s my son.',
      media: { audio: [] }
    },
    {
      type: 'speaking',
      title: 'Speaking: Introductions',
      body: 'Guided Activity: Practice introducing yourself aloud using je m\'appelle, then add Enchanté(e) !\n\nRoleplay: With a partner, introduce yourselves to each other, then each introduce a third "imaginary" person using il/elle s\'appelle.\n\nPronunciation Tip: The "eu" sound in je and deux is made with rounded lips, unlike any English vowel — practice it by saying "uh" while rounding your lips forward.',
      translation: null,
      media: null
    },
    {
      type: 'writing',
      title: 'Writing: Your Introduction',
      body: 'Task: Write a short introduction (3 sentences) introducing yourself and one other person (real or imaginary).\n\nModel Answer:\nJe m\'appelle Alex. Enchanté ! Elle s\'appelle Nina, elle est ma collègue.\n\nWriting Checklist:\n☐ Used je m\'appelle correctly.\n☐ Introduced a second person using il/elle s\'appelle.\n☐ Included enchanté(e).',
      translation: null,
      media: null
    },
    {
      type: 'review',
      title: 'Mini Review & Self Assessment',
      body: 'You can now introduce yourself using je m\'appelle, respond to an introduction with enchanté(e), and describe a third person using il/elle s\'appelle and il/elle est.\n\n☐ I can introduce myself using je m\'appelle.\n☐ I can say "nice to meet you" correctly for my gender.\n☐ I can introduce someone else.\n☐ I know the difference between et toi and et vous.',
      translation: null,
      media: null
    }
  ];

  await db.collection('lessons').updateOne(
    { _id: l2._id },
    { $set: {
      sections: l2Sections,
      objectives: [
        'Introduce yourself with your name using je m\'appelle, and understand être extending to a third person (il/elle est).'
      ],
      grammarTopics: ['s\'appeler (je/tu)', 'être (il/elle est)'],
      estimatedDuration: 25
    }}
  );
  console.log('✅ Lesson 2 updated');

  // =====================================================================
  // EXERCISES — Replace Lesson 1 + Lesson 2 exercises
  // =====================================================================
  // Delete old exercises for both lessons
  const del1 = await db.collection('exercises').deleteMany({ lessonId: { $in: [l1._id, l2._id] } });
  console.log(`🗑️ Deleted ${del1.deletedCount} old exercises`);

  // Lesson 1 Practice Exercises
  const l1Exercises = [
    {
      lessonId: l1._id,
      type: 'multiple_choice',
      category: 'reading',
      title: 'Which greeting is correct at 9:00 PM?',
      order: 1,
      estimatedDuration: 2,
      points: 2,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'Which greeting is correct at 9:00 PM?',
          options: ['Bonjour', 'Salut', 'Bonsoir', 'Bonne nuit (as a greeting)'],
          correctAnswer: 'Bonsoir',
          explanation: 'Bonsoir is used in the evening, after the daytime hours when bonjour is appropriate.'
        }
      ],
      sectionType: 'reading'
    },
    {
      lessonId: l1._id,
      type: 'matching',
      category: 'reading',
      title: 'Match the expression to its use',
      order: 2,
      estimatedDuration: 3,
      points: 3,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'matching',
          question: 'Match each expression to its correct use.',
          pairs: { 'Salut': 'Informal hello/goodbye', 'Bonjour': 'Formal daytime greeting', 'Bonne nuit': 'Said only when going to bed' },
          correctAnswer: null,
          explanation: 'Salut is informal, bonjour is the standard daytime greeting, and bonne nuit is specifically for bedtime.'
        }
      ],
      sectionType: 'reading'
    },
    {
      lessonId: l1._id,
      type: 'fill_in_blank',
      category: 'writing',
      title: 'Fill in the blank: Greeting',
      order: 3,
      estimatedDuration: 2,
      points: 2,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'fill_in_blank',
          question: '_______, Madame Girard ! Je suis Paul.',
          blankAnswer: 'Bonjour',
          correctAnswer: 'Bonjour',
          explanation: 'Bonjour is the appropriate daytime greeting when addressing someone formally with Madame.'
        }
      ],
      sectionType: 'writing'
    },
    {
      lessonId: l1._id,
      type: 'ordering',
      category: 'reading',
      title: 'Put in logical order',
      order: 4,
      estimatedDuration: 3,
      points: 3,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'ordering',
          question: 'Put these in a logical order for a conversation:',
          items: ['Au revoir !', 'Bonjour, Madame.', 'Je suis Thomas.'],
          correctOrder: ['Bonjour, Madame.', 'Je suis Thomas.', 'Au revoir !'],
          explanation: 'A typical conversation starts with a greeting, then an introduction, then a farewell.'
        }
      ],
      sectionType: 'reading'
    },
    {
      lessonId: l1._id,
      type: 'short_answer',
      category: 'writing',
      title: 'Explain when to use salut vs bonjour',
      order: 5,
      estimatedDuration: 5,
      points: 5,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'short_answer',
          question: 'In your own words, explain when you would use salut instead of bonjour.',
          sampleAnswer: 'Salut is used with people you know well, in casual situations — never with strangers or in formal contexts.',
          evaluationCriteria: ['Mentions informal/casual context', 'Mentions knowing the person well', 'Contrasts with formal usage'],
          explanation: 'Salut is the informal greeting used only with friends, family, and people you know well.'
        }
      ],
      sectionType: 'writing'
    },
    // Listening exercises
    {
      lessonId: l1._id,
      type: 'listening',
      category: 'listening',
      title: 'Listening: Au Café Comprehension',
      order: 6,
      estimatedDuration: 5,
      points: 3,
      isRequired: true,
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
          explanation: 'The waiter says "Au revoir" at the end.'
        }
      ],
      sectionType: 'listening',
      transcript: 'Serveur : Bonsoir, Madame !\nCliente : Bonsoir, Monsieur.\nServeur : Vous êtes Madame Lambert ?\nCliente : Oui, je suis Madame Lambert.\nServeur : Merci ! Au revoir, bonne soirée.\nCliente : Au revoir !'
    },
    // Speaking exercises
    {
      lessonId: l1._id,
      type: 'speaking',
      category: 'speaking',
      title: 'Greeting Practice: Pronunciation',
      order: 7,
      estimatedDuration: 5,
      points: 5,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Say "Hello" politely (morning/daytime)',
          prompt: 'Bonjour',
          pronunciationTip: 'The "j" is soft like the "s" in "pleasure". Bon-jour, with stress on the final syllable.',
          expectedResponse: 'Bonjour'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Say "Good evening" politely',
          prompt: 'Bonsoir',
          pronunciationTip: 'Bon-SWAHR. The "oir" sounds like "wahr" with a French r.',
          expectedResponse: 'Bonsoir'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Say "Hi" informally to a friend',
          prompt: 'Salut',
          pronunciationTip: 'Sah-LOO. The "t" is pronounced here! Unlike many final consonants in French.',
          expectedResponse: 'Salut'
        }
      ],
      sectionType: 'speaking'
    }
  ];

  // Lesson 2 Practice Exercises
  const l2Exercises = [
    {
      lessonId: l2._id,
      type: 'multiple_choice',
      category: 'reading',
      title: 'Je m\'appelle meaning',
      order: 1,
      estimatedDuration: 2,
      points: 2,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: '"My name is" translates to:',
          options: ['Je suis', 'Je m\'appelle', 'Il est', 'Et toi'],
          correctAnswer: 'Je m\'appelle',
          explanation: 'Je m\'appelle literally means "I call myself" but translates as "my name is."'
        }
      ],
      sectionType: 'reading'
    },
    {
      lessonId: l2._id,
      type: 'matching',
      category: 'reading',
      title: 'Match: Introductions',
      order: 2,
      estimatedDuration: 3,
      points: 3,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'matching',
          question: 'Match each expression to its meaning.',
          pairs: { 'Enchanté': 'Nice to meet you (male speaker)', 'Et vous': 'And you? (formal)', 'Moi aussi': 'Me too' },
          correctAnswer: null,
          explanation: 'Enchanté is said by a male speaker; enchantée by a female. Et vous is formal, moi aussi means "me too."'
        }
      ],
      sectionType: 'reading'
    },
    {
      lessonId: l2._id,
      type: 'fill_in_blank',
      category: 'writing',
      title: 'Fill in: Elle ___ Camille',
      order: 3,
      estimatedDuration: 2,
      points: 2,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'fill_in_blank',
          question: 'Elle __________ Camille. (s\'appeler)',
          blankAnswer: 's\'appelle',
          correctAnswer: 's\'appelle',
          explanation: 'S\'appeler in the third person: il/elle s\'appelle.'
        }
      ],
      sectionType: 'writing'
    },
    {
      lessonId: l2._id,
      type: 'ordering',
      category: 'reading',
      title: 'Introduction order',
      order: 4,
      estimatedDuration: 3,
      points: 3,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'ordering',
          question: 'Put in the correct order for an introduction:',
          items: ['Enchanté !', 'Je m\'appelle Marc.', 'Bonjour !'],
          correctOrder: ['Bonjour !', 'Je m\'appelle Marc.', 'Enchanté !'],
          explanation: 'First greet, then state your name, then say "nice to meet you."'
        }
      ],
      sectionType: 'reading'
    },
    {
      lessonId: l2._id,
      type: 'short_answer',
      category: 'writing',
      title: 'Et toi vs Et vous',
      order: 5,
      estimatedDuration: 5,
      points: 5,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'short_answer',
          question: 'Explain the difference between "et toi" and "et vous".',
          sampleAnswer: 'Et toi is used informally with people you know well; et vous is used formally, with strangers or in polite contexts.',
          evaluationCriteria: ['Distinguishes formal vs informal', 'Explains when to use each'],
          explanation: 'Et toi (informal) vs et vous (formal) follows the same tu/vous distinction.'
        }
      ],
      sectionType: 'writing'
    },
    {
      lessonId: l2._id,
      type: 'listening',
      category: 'listening',
      title: 'Listening: Nouveaux Voisins',
      order: 6,
      estimatedDuration: 5,
      points: 2,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'What is Voix 2\'s name?',
          options: ['Thomas', 'Claire', 'Léo', 'Nina'],
          correctAnswer: 'Claire',
          explanation: 'Voix 2 says "Je m\'appelle Claire."'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'Who is Léo?',
          options: ['Claire\'s brother', 'Claire\'s son', 'Thomas\'s friend', 'A neighbor'],
          correctAnswer: 'Claire\'s son',
          explanation: 'Voix 2 says "Il est mon fils" (He is my son).'
        }
      ],
      sectionType: 'listening',
      transcript: 'Voix 1 : Bonjour ! Je m\'appelle Thomas.\nVoix 2 : Enchantée, Thomas ! Je m\'appelle Claire.\nVoix 1 : Et lui, comment il s\'appelle ?\nVoix 2 : Il s\'appelle Léo. Il est mon fils.'
    },
    {
      lessonId: l2._id,
      type: 'speaking',
      category: 'speaking',
      title: 'Introductions Practice',
      order: 7,
      estimatedDuration: 5,
      points: 5,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Say "My name is [your name]"',
          prompt: 'Je m\'appelle ...',
          pronunciationTip: 'zhuh mah-PELL... The "appelle" part has a short "eh" sound, like in "pet."',
          expectedResponse: 'Je m\'appelle'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Say "Nice to meet you" as a male',
          prompt: 'Enchanté',
          pronunciationTip: 'ahn-shahn-TAY. The "en" is nasal.',
          expectedResponse: 'Enchanté'
        }
      ],
      sectionType: 'speaking'
    }
  ];

  const allEx = [...l1Exercises, ...l2Exercises];
  await db.collection('exercises').insertMany(allEx);
  console.log(`✅ Inserted ${allEx.length} exercises (${l1Exercises.length} for L1, ${l2Exercises.length} for L2)`);

  // =====================================================================
  // VOCABULARY — Update Lesson 1 + Lesson 2 vocab
  // =====================================================================
  // Delete old vocab for these lessons
  await db.collection('vocabularies').deleteMany({ lessonId: { $in: [l1._id, l2._id] } });

  const l1Vocab = [
    { french: 'Bonjour', english: 'hello / good day', pronunciation: 'bohn-ZHOOR', example: 'Bonjour, Madame !', lessonId: l1._id },
    { french: 'Bonsoir', english: 'good evening', pronunciation: 'bohn-SWAHR', example: 'Bonsoir, Monsieur.', lessonId: l1._id },
    { french: 'Salut', english: 'hi / bye (informal)', pronunciation: 'sah-LU', example: 'Salut, Marc ! Ça va ?', lessonId: l1._id },
    { french: 'Au revoir', english: 'goodbye', pronunciation: 'oh ruh-VWAHR', example: 'Au revoir, à demain !', lessonId: l1._id },
    { french: 'À bientôt', english: 'see you soon', pronunciation: 'ah byan-TOH', example: 'Merci, à bientôt !', lessonId: l1._id },
    { french: 'Bonne nuit', english: 'good night', pronunciation: 'bun NWEE', example: 'Bonne nuit, dors bien.', lessonId: l1._id },
    { french: 'Madame', english: 'madam / Mrs.', pronunciation: 'mah-DAM', example: 'Bonjour, madame Girard.', lessonId: l1._id },
    { french: 'Monsieur', english: 'sir / Mr.', pronunciation: 'muh-SYUR', example: 'Bonsoir, monsieur Dubois.', lessonId: l1._id },
    { french: 'Enchanté(e)', english: 'nice to meet you', pronunciation: 'ahn-shahn-TAY', example: 'Enchantée, Madame !', lessonId: l1._id }
  ];
  const l2Vocab = [
    { french: 'Je m\'appelle', english: 'my name is', pronunciation: 'zhuh mah-PELL', example: 'Je m\'appelle Nora.', lessonId: l2._id },
    { french: 'Comment tu t\'appelles ?', english: 'what\'s your name? (informal)', pronunciation: 'koh-mahn tu tah-PELL', example: 'Comment tu t\'appelles ?', lessonId: l2._id },
    { french: 'Enchanté(e)', english: 'nice to meet you', pronunciation: 'ahn-shahn-TAY', example: 'Enchantée, Madame !', lessonId: l2._id },
    { french: 'Moi aussi', english: 'me too', pronunciation: 'mwah oh-SEE', example: 'Moi aussi, enchantée !', lessonId: l2._id },
    { french: 'Et toi ?', english: 'and you? (informal)', pronunciation: 'ay TWAH', example: 'Ça va, et toi ?', lessonId: l2._id },
    { french: 'Et vous ?', english: 'and you? (formal)', pronunciation: 'ay VOO', example: 'Bonjour, et vous ?', lessonId: l2._id },
    { french: 'Il s\'appelle', english: 'his name is', pronunciation: 'eel sah-PELL', example: 'Il s\'appelle Antoine.', lessonId: l2._id },
    { french: 'Elle s\'appelle', english: 'her name is', pronunciation: 'el sah-PELL', example: 'Elle s\'appelle Julie.', lessonId: l2._id }
  ];
  await db.collection('vocabularies').insertMany([...l1Vocab, ...l2Vocab]);
  console.log(`✅ Inserted ${l1Vocab.length + l2Vocab.length} vocabulary items`);

  // =====================================================================
  // VERIFICATION
  // =====================================================================
  console.log('\n=== VERIFICATION ===');

  // Verify Lesson 1
  const updatedL1 = await db.collection('lessons').findOne({ _id: l1._id });
  const l1SectionTypes = updatedL1.sections.map(s => s.type);
  console.log('L1 sections:', l1SectionTypes.join(', '));
  console.log('L1 has warmup:', l1SectionTypes.includes('warmup'));
  console.log('L1 has explanation:', l1SectionTypes.includes('explanation'));
  console.log('L1 has vocabulary:', l1SectionTypes.includes('vocabulary'));
  console.log('L1 has grammar:', l1SectionTypes.includes('grammar'));
  console.log('L1 has reading:', l1SectionTypes.includes('reading') && (updatedL1.sections.find(s => s.type==='reading').body.length > 200));
  console.log('L1 has listening:', l1SectionTypes.includes('listening') && !!updatedL1.sections.find(s => s.type==='listening').translation);
  console.log('L1 has speaking:', l1SectionTypes.includes('speaking'));
  console.log('L1 has writing:', l1SectionTypes.includes('writing'));
  console.log('L1 has review:', l1SectionTypes.includes('review'));

  // Verify Lesson 2
  const updatedL2 = await db.collection('lessons').findOne({ _id: l2._id });
  const l2SectionTypes = updatedL2.sections.map(s => s.type);
  console.log('\nL2 sections:', l2SectionTypes.join(', '));
  console.log('L2 has warmup:', l2SectionTypes.includes('warmup'));
  console.log('L2 has explanation:', l2SectionTypes.includes('explanation'));
  console.log('L2 has vocabulary:', l2SectionTypes.includes('vocabulary'));
  console.log('L2 has grammar:', l2SectionTypes.includes('grammar'));
  console.log('L2 has reading:', l2SectionTypes.includes('reading') && !!updatedL2.sections.find(s => s.type==='reading').translation);
  console.log('L2 has listening:', l2SectionTypes.includes('listening') && !!updatedL2.sections.find(s => s.type==='listening').translation);
  console.log('L2 has speaking:', l2SectionTypes.includes('speaking'));
  console.log('L2 has writing:', l2SectionTypes.includes('writing'));
  console.log('L2 has review:', l2SectionTypes.includes('review'));

  // Verify exercises
  const l1ExCount = await db.collection('exercises').countDocuments({ lessonId: l1._id });
  const l2ExCount = await db.collection('exercises').countDocuments({ lessonId: l2._id });
  console.log(`\nL1 exercises: ${l1ExCount} (expecting ${l1Exercises.length})`);
  console.log(`L2 exercises: ${l2ExCount} (expecting ${l2Exercises.length})`);

  const l1ExTypes = await db.collection('exercises').find({ lessonId: l1._id }).toArray();
  const types = {};
  l1ExTypes.forEach(e => { types[e.type] = (types[e.type]||0)+1; });
  console.log('L1 exercise types:', JSON.stringify(types));

  // Verify vocab
  const l1VocabCount = await db.collection('vocabularies').countDocuments({ lessonId: l1._id });
  const l2VocabCount = await db.collection('vocabularies').countDocuments({ lessonId: l2._id });
  console.log(`\nL1 vocab items: ${l1VocabCount}`);
  console.log(`L2 vocab items: ${l2VocabCount}`);

  mongoose.disconnect();
  console.log('\n✅ DONE');
}

main().catch(e => { console.error(e); mongoose.disconnect(); });