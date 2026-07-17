const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const ch1 = await db.collection('chapters').findOne({ title: 'Greetings & First Contact' });
  const lessons = await db.collection('lessons').find({ chapterId: ch1._id }).sort({ order: 1 }).toArray();
  const l3 = lessons[2]; // Lesson 3
  const l4 = lessons[3]; // Lesson 4

  console.log('Lesson 3:', l3._id, l3.title);
  console.log('Lesson 4:', l4._id, l4.title);

  // =====================================================================
  // LESSON 3 — FULL UPDATE
  // =====================================================================
  const l3Sections = [
    {
      type: 'warmup',
      title: 'Warm-Up',
      body: 'Think of three ways you might ask someone\'s name in your own language depending on how formal the situation is. French makes exactly this same distinction.',
      translation: null,
      media: null
    },
    {
      type: 'explanation',
      title: 'Lesson Explanation',
      body: 'There are two ways to ask "What\'s your name?" in French — one informal and one formal.\n\n• Comment tu t\'appelles ? — Informal, used with people you know well, your own age, or younger.\n• Comment vous appelez-vous ? — Formal, used with strangers, elders, authority figures, or in professional settings.\n\nTo answer, you use the same verb: Je m\'appelle... (already learned in Lesson 2).\n\nAsking about someone else:\n• Qui est-ce ? — "Who is it/that?" Used to point someone out.\n• C\'est... — "It is / that is..." Used to identify someone.\n\nForming yes/no questions with est-ce que:\n• Est-ce que vous êtes Madame Vidal ? — "Are you Madame Vidal?"\n• Est-ce que tu es français ? — "Are you French?"\n\nEst-ce que is placed at the beginning of a statement to turn it into a yes/no question, without changing the word order.',
      translation: null,
      media: null
    },
    {
      type: 'vocabulary',
      title: 'Vocabulary',
      body: [
        'Comment vous appelez-vous ? | what\'s your name? (formal) | koh-MAHN voo zah-PELL-voo | Comment vous appelez-vous, Madame ?',
        'Qui est-ce ? | who is it/that? | kee es | Qui est-ce, là-bas ?',
        'C\'est | it is / that is | say | C\'est Madame Vidal.',
        'Est-ce que | question marker (yes/no) | ess-kuh | Est-ce que tu es prêt ?',
        'Nous sommes | we are | noo SUM | Nous sommes amis.',
        'Vous êtes | you are (formal/plural) | voo ZET | Vous êtes Madame Lambert.',
      ].join('\n'),
      translation: null,
      media: null
    },
    {
      type: 'grammar',
      title: 'Grammar: Être (Complete Present) & Question Formation',
      body: 'Completing être (to be) in the present tense:\n• Je suis — I am\n• Tu es — You are (informal)\n• Il / Elle est — He / She is\n• Nous sommes — We are\n• Vous êtes — You are (formal/plural)\n• Ils / Elles sont — They are\n\nYes/No questions with est-ce que:\nSimply add Est-ce que before a statement:\n• Tu es Camille. → Est-ce que tu es Camille ?\n• Vous êtes Madame Vidal. → Est-ce que vous êtes Madame Vidal ?\n\nThis is the simplest and most neutral way to form questions in French.',
      translation: null,
      media: null
    },
    {
      type: 'reading',
      title: 'Reading: Qui Est-Ce ?',
      body: '"Qui Est-Ce ?" (Who Is That?)\n\nNadia : Qui est-ce, là-bas ?\nKarim : C\'est Madame Vidal.\nNadia : Est-ce que vous êtes Madame Vidal ?\nMadame Vidal : Oui, c\'est moi ! Et vous, comment vous appelez-vous ?\nNadia : Je m\'appelle Nadia.\n\nComprehension Questions:\n1. Who does Karim point out?\n2. What question does Nadia ask Madame Vidal?\n3. Is the exchange between Nadia and Madame Vidal formal or informal? How do you know?\n\nAnswer Key:\n1. Madame Vidal.\n2. Est-ce que vous êtes Madame Vidal ?\n3. Formal — Nadia uses vous, appropriate since Madame Vidal is a stranger and older.',
      translation: 'Nadia: Who is that over there?\nKarim: That\'s Madame Vidal.\nNadia: Are you Madame Vidal?\nMadame Vidal: Yes, that\'s me! And you, what\'s your name?\nNadia: My name is Nadia.',
      media: null
    },
    {
      type: 'listening',
      title: 'Listening: À La Réception (At the Front Desk)',
      body: 'Transcript: "À La Réception"\n\nRéceptionniste : Bonjour ! Comment vous appelez-vous ?\nClient : Je m\'appelle Monsieur Blanc.\nRéceptionniste : Est-ce que vous êtes Monsieur Paul Blanc ?\nClient : Oui, c\'est moi.\n\nListening Activity — Multiple Choice:\n1. Is this conversation formal or informal?\n   A) Formal   B) Informal\n2. What does the receptionist confirm at the end?\n   A) The client\'s room number   B) That the client is specifically Monsieur Paul Blanc   C) The client\'s departure date\n\nAnswer Key:\n1. A) Formal.\n2. B) That the client is specifically Monsieur Paul Blanc.',
      translation: 'Receptionist: Hello! What is your name?\nClient: My name is Monsieur Blanc.\nReceptionist: Are you Monsieur Paul Blanc?\nClient: Yes, that\'s me.',
      media: { audio: [] }
    },
    {
      type: 'speaking',
      title: 'Speaking: Formal vs Informal',
      body: 'Practice asking "What\'s your name?" both informally and formally, switching between them based on prompts.\n\nRoleplay:\n• Person A: Hotel receptionist (formal, uses vous).\n• Person B: Guest checking in. Exchange names using the formal register throughout.\n\nPronunciation Tip: In est-ce que, the final "e" of que is barely pronounced in natural speech — listen for "ess-kuh" rather than a fully separated "ess-kuh-euh."',
      translation: null,
      media: null
    },
    {
      type: 'writing',
      title: 'Writing: Formal Exchange',
      body: 'Task: Write a short formal exchange (3–4 lines) in which you ask someone\'s name using vous.\n\nModel Answer:\nBonjour, Madame. Comment vous appelez-vous ? — Je m\'appelle Madame Colin. Enchantée.\n\nWriting Checklist:\n☐ Used the formal question form correctly.\n☐ Maintained vous throughout (no accidental tu).\n☐ Included a polite closing.',
      translation: null,
      media: null
    },
    {
      type: 'review',
      title: 'Mini Review & Self Assessment',
      body: 'You can now ask someone\'s name formally or informally, form basic yes/no questions with est-ce que, and use the complete present-tense forms of être for je, tu, il/elle, nous, vous.\n\n☐ I can ask someone\'s name formally and informally.\n☐ I can form a question using est-ce que.\n☐ I know all forms of être introduced so far.',
      translation: null,
      media: null
    }
  ];

  await db.collection('lessons').updateOne(
    { _id: l3._id },
    { $set: {
      sections: l3Sections,
      objectives: [
        'Ask someone\'s name in both informal and formal registers, and understand the answer.'
      ],
      grammarTopics: ['question formation with est-ce que', 'être (nous sommes / vous êtes)'],
      estimatedDuration: 25
    }}
  );
  console.log('✅ Lesson 3 updated');

  // =====================================================================
  // LESSON 4 — FULL UPDATE
  // =====================================================================
  const l4Sections = [
    {
      type: 'warmup',
      title: 'Warm-Up',
      body: 'In English, we say "How are you?" — but the answer changes depending on how we feel. French works exactly the same way. Think of three different answers you might give to this question and how they would translate into French.',
      translation: null,
      media: null
    },
    {
      type: 'explanation',
      title: 'Lesson Explanation',
      body: 'The most common way to ask "How are you?" in French is Ça va ? — a simple, all-purpose question that works in most contexts.\n\nYou can also use the full forms:\n• Comment ça va ? — "How\'s it going?" (neutral/informal)\n• Comment allez-vous ? — "How are you?" (formal, plural)\n• Comment vas-tu ? — "How are you?" (informal singular)\n\nAnswers you\'ll hear:\n• Ça va bien. — "It\'s going well."\n• Ça va mal. — "It\'s going badly."\n• Ça va. — "It\'s okay / so-so."\n• Un peu — "A little" (used to soften a negative: un peu fatigué)\n\nDescribing feelings: Use être + an adjective. The adjective must agree with the speaker\'s gender.\n• Je suis content (male) / Je suis contente (female) — "I am happy."\n• Je suis fatigué (male) / Je suis fatiguée (female) — "I am tired."',
      translation: null,
      media: null
    },
    {
      type: 'vocabulary',
      title: 'Vocabulary',
      body: [
        'Ça va ? | how are you? / how\'s it going? | sa va | Salut, ça va ?',
        'Comment allez-vous ? | how are you? (formal) | koh-MAHN tah-lay-VOO | Bonjour, comment allez-vous ?',
        'Comment vas-tu ? | how are you? (informal) | koh-MAHN vah-TU | Comment vas-tu aujourd\'hui ?',
        'Ça va bien | it\'s going well | sa va byan | Ça va bien, merci !',
        'Ça va mal | it\'s going badly | sa va mal | Désolé, ça va mal.',
        'Un peu | a little | uhn PUH | Je suis un peu fatigué.',
        'Content / Contente | happy (m/f) | kohn-TAHN / kohn-TAHNT | Il est content, elle est contente.',
        'Fatigué / Fatiguée | tired (m/f) | fah-tee-GAY / fah-tee-GAY | Je suis fatigué.',
      ].join('\n'),
      translation: null,
      media: null
    },
    {
      type: 'grammar',
      title: 'Grammar: Adjective Agreement with Être',
      body: 'In French, adjectives must "agree" with the subject — meaning they change depending on whether the person is male or female.\n\nBasic rule: Add -e to make a feminine form.\n• content (masculine) → contente (feminine)\n• fatigué (masculine) → fatiguée (feminine)\n\nThe -e at the end is silent in masculine but often pronounced in feminine when the consonant at the end is pronounced (e.g., the -t in contente is pronounced).\n\nExamples:\n• Je suis content. (a man speaking)\n• Je suis contente. (a woman speaking)\n• Tu es fatigué ? (to a male)\n• Tu es fatiguée ? (to a female)\n\nThis concept — adjective agreement — is essential in French and appears in almost every sentence you\'ll construct.',
      translation: null,
      media: null
    },
    {
      type: 'reading',
      title: 'Reading: Une Journée Fatigante',
      body: '"Une Journée Fatigante" (A Tiring Day)\n\nLéo : Salut, Emma ! Comment ça va ?\nEmma : Ça va mal aujourd\'hui... Je suis très fatiguée.\nLéo : Oh non ! Moi, ça va bien, je suis content.\nEmma : Un peu de repos, et ça va aller mieux !\n\nComprehension Questions:\n1. How does Emma feel today?\n2. How does Léo feel?\n3. What does Emma say will help?\n\nAnswer Key:\n1. Tired (très fatiguée) and not well (ça va mal).\n2. Happy (content) and well (ça va bien).\n3. A little rest (un peu de repos).',
      translation: 'Léo: Hi, Emma! How\'s it going?\nEmma: It\'s going badly today... I\'m very tired.\nLéo: Oh no! Me, I\'m doing well, I\'m happy.\nEmma: A little rest, and it\'ll get better!',
      media: null
    },
    {
      type: 'listening',
      title: 'Listening: Un Appel Téléphonique',
      body: 'Transcript: "Un Appel Téléphonique" (A Phone Call)\n\nPapa : Bonjour, ma chérie. Comment ça va ?\nFille : Ça va bien, Papa, merci ! Et toi ?\nPapa : Ça va, je suis un peu fatigué, mais content.\n\nFill in the blanks:\n1. The daughter says she is __________.\n2. The father says he is __________ but __________.\n\nAnswer Key:\n1. doing well (ça va bien)\n2. a little tired (un peu fatigué) / happy (content)',
      translation: 'Dad: Hello, my dear. How are you?\nDaughter: I\'m doing well, Dad, thanks! And you?\nDad: Okay, I\'m a little tired, but happy.',
      media: { audio: [] }
    },
    {
      type: 'speaking',
      title: 'Speaking: How Are You?',
      body: 'Practice asking and answering "How are you?" using both the formal and informal forms, giving a different feeling each time (tired, happy, "so-so").\n\nRoleplay:\n• Person A calls Partner B on the phone (informal, family member).\n• Person B answers honestly using an adjective from this lesson, matched correctly to their own gender.\n\nPronunciation Tip: Listen carefully for the difference between content and contente — the final "t" sound is pronounced only in the feminine form.',
      translation: null,
      media: null
    },
    {
      type: 'writing',
      title: 'Writing: How I Feel Today',
      body: 'Task: Write a short paragraph (3–4 sentences) describing how you are feeling today, using at least one adjective with correct gender agreement.\n\nModel Answer:\nBonjour ! Aujourd\'hui, ça va bien. Je suis un peu fatiguée, mais contente. Et toi, comment ça va ?\n\nWriting Checklist:\n☐ Used ça va or a related expression.\n☐ Used at least one adjective with correct gender agreement.\n☐ Included un peu correctly, if used.',
      translation: null,
      media: null
    },
    {
      type: 'review',
      title: 'Mini Review & Self Assessment',
      body: 'You can now ask and answer "How are you?" formally and informally, and describe feelings using être + an adjective, correctly agreeing the adjective with your own gender.\n\n☐ I can ask "how are you" both formally and informally.\n☐ I can answer with ça va bien/mal.\n☐ I can describe a feeling using the correct adjective agreement.',
      translation: null,
      media: null
    }
  ];

  await db.collection('lessons').updateOne(
    { _id: l4._id },
    { $set: {
      sections: l4Sections,
      objectives: [
        'Ask how someone is, describe a feeling with adjective agreement, and distinguish formal from informal registers.'
      ],
      grammarTopics: ['adjective agreement (gender)', 'être + adjective'],
      estimatedDuration: 25
    }}
  );
  console.log('✅ Lesson 4 updated');

  // =====================================================================
  // EXERCISES — Replace Lesson 3 + Lesson 4 exercises
  // =====================================================================
  // Delete old exercises for both lessons
  const delEx = await db.collection('exercises').deleteMany({ lessonId: { $in: [l3._id, l4._id] } });
  console.log(`🗑️ Deleted ${delEx.deletedCount} old exercises`);

  // Lesson 3 Exercises
  const l3Exercises = [
    {
      lessonId: l3._id,
      type: 'multiple_choice',
      category: 'reading',
      title: 'Formal vs Informal',
      order: 1,
      estimatedDuration: 2,
      points: 2,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'multiple_choice',
        question: 'The formal way to ask "What\'s your name?" is:',
        options: ['Comment tu t\'appelles ?', 'Comment vous appelez-vous ?', 'Qui est-ce ?', 'C\'est qui ?'],
        correctAnswer: 'Comment vous appelez-vous ?',
        explanation: 'Comment vous appelez-vous is the formal version.'
      }],
      sectionType: 'reading'
    },
    {
      lessonId: l3._id,
      type: 'matching',
      category: 'reading',
      title: 'Match expressions',
      order: 2,
      estimatedDuration: 3,
      points: 3,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'matching',
        question: 'Match each expression to its meaning.',
        pairs: { 'C\'est': 'It is / that is', 'Qui est-ce': 'Who is it?', 'Nous sommes': 'We are' },
        correctAnswer: null,
        explanation: 'C\'est identifies a person/thing, qui est-ce asks who, nous sommes means "we are."'
      }],
      sectionType: 'reading'
    },
    {
      lessonId: l3._id,
      type: 'fill_in_blank',
      category: 'writing',
      title: 'Fill in: est-ce que',
      order: 3,
      estimatedDuration: 2,
      points: 2,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'fill_in_blank',
        question: '__________ vous êtes Madame Faure ? (add the question marker)',
        blankAnswer: 'Est-ce que',
        correctAnswer: 'Est-ce que',
        explanation: 'Est-ce que turns a statement into a yes/no question.'
      }],
      sectionType: 'writing'
    },
    {
      lessonId: l3._id,
      type: 'ordering',
      category: 'reading',
      title: 'Conversation order',
      order: 4,
      estimatedDuration: 3,
      points: 3,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'ordering',
        question: 'Put in logical order for asking a name:',
        items: ['Je m\'appelle Léo.', 'Comment vous appelez-vous ?', 'Bonjour, Monsieur.'],
        correctOrder: ['Bonjour, Monsieur.', 'Comment vous appelez-vous ?', 'Je m\'appelle Léo.'],
        explanation: 'First greet, then ask the name, then give yours.'
      }],
      sectionType: 'reading'
    },
    {
      lessonId: l3._id,
      type: 'short_answer',
      category: 'writing',
      title: 'When to use formal vs informal',
      order: 5,
      estimatedDuration: 5,
      points: 5,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'short_answer',
        question: 'When would you use "comment vous appelez-vous" instead of "comment tu t\'appelles"?',
        sampleAnswer: 'With strangers, elders, or in formal/professional settings.',
        evaluationCriteria: ['Mentions formal contexts', 'Mentions strangers/authority figures'],
        explanation: 'Use vous with people you don\'t know well or in formal settings.'
      }],
      sectionType: 'writing'
    },
    {
      lessonId: l3._id,
      type: 'listening',
      category: 'listening',
      title: 'Listening: À La Réception',
      order: 6,
      estimatedDuration: 5,
      points: 2,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'Is this conversation formal or informal?',
          options: ['Formal', 'Informal'],
          correctAnswer: 'Formal',
          explanation: 'The receptionist uses "vous" and "Monsieur/Madame."'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'What does the receptionist confirm at the end?',
          options: ['The client\'s room number', 'That the client is specifically Monsieur Paul Blanc', 'The client\'s departure date'],
          correctAnswer: 'That the client is specifically Monsieur Paul Blanc',
          explanation: 'She asks "Est-ce que vous êtes Monsieur Paul Blanc ?"'
        }
      ],
      sectionType: 'listening',
      transcript: 'Réceptionniste : Bonjour ! Comment vous appelez-vous ?\nClient : Je m\'appelle Monsieur Blanc.\nRéceptionniste : Est-ce que vous êtes Monsieur Paul Blanc ?\nClient : Oui, c\'est moi.'
    },
    {
      lessonId: l3._id,
      type: 'speaking',
      category: 'speaking',
      title: 'Asking Names Practice',
      order: 7,
      estimatedDuration: 5,
      points: 5,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Ask "What\'s your name?" formally',
          prompt: 'Comment vous appelez-vous ?',
          pronunciationTip: 'koh-MAHN voo zah-PELL-voo — smooth the words together.',
          expectedResponse: 'Comment vous appelez-vous'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Ask "Are you Madame?" formally',
          prompt: 'Est-ce que vous êtes Madame... ?',
          pronunciationTip: 'ess-kuh voo ZET mah-DAM — the "t" in êtes links to Madame.',
          expectedResponse: 'Est-ce que vous êtes Madame'
        }
      ],
      sectionType: 'speaking'
    }
  ];

  // Lesson 4 Exercises
  const l4Exercises = [
    {
      lessonId: l4._id,
      type: 'multiple_choice',
      category: 'reading',
      title: 'Ça va meaning',
      order: 1,
      estimatedDuration: 2,
      points: 2,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'multiple_choice',
        question: 'A woman saying "I am happy" should say:',
        options: ['Je suis content', 'Je suis contente', 'Je es content', 'Tu es content'],
        correctAnswer: 'Je suis contente',
        explanation: 'Je suis contente (feminine agreement with -e).'
      }],
      sectionType: 'reading'
    },
    {
      lessonId: l4._id,
      type: 'matching',
      category: 'reading',
      title: 'Match: Feelings',
      order: 2,
      estimatedDuration: 3,
      points: 3,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'matching',
        question: 'Match each expression to its meaning.',
        pairs: { 'Ça va bien': 'It\'s going well', 'Ça va mal': 'It\'s going badly', 'Un peu': 'A little' },
        correctAnswer: null,
        explanation: 'Ça va bien is positive, ça va mal is negative, un peu softens.'
      }],
      sectionType: 'reading'
    },
    {
      lessonId: l4._id,
      type: 'fill_in_blank',
      category: 'writing',
      title: 'Fill in: adjective agreement',
      order: 3,
      estimatedDuration: 2,
      points: 2,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'fill_in_blank',
        question: 'Il est __________. (tired, masculine)',
        blankAnswer: 'fatigué',
        correctAnswer: 'fatigué',
        explanation: 'Fatigué is the masculine form.'
      }],
      sectionType: 'writing'
    },
    {
      lessonId: l4._id,
      type: 'ordering',
      category: 'reading',
      title: 'Conversation order',
      order: 4,
      estimatedDuration: 3,
      points: 3,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'ordering',
        question: 'Put in correct conversation order:',
        items: ['Comment ça va ?', 'Ça va bien, merci !', 'Salut !'],
        correctOrder: ['Salut !', 'Comment ça va ?', 'Ça va bien, merci !'],
        explanation: 'First greet, then ask how it\'s going, then answer.'
      }],
      sectionType: 'reading'
    },
    {
      lessonId: l4._id,
      type: 'short_answer',
      category: 'writing',
      title: 'Adjective agreement explanation',
      order: 5,
      estimatedDuration: 5,
      points: 5,
      isRequired: true,
      questions: [{
        id: new mongoose.Types.ObjectId(),
        type: 'short_answer',
        question: 'Why does "fatiguée" have an extra "e" compared to "fatigué"?',
        sampleAnswer: 'Because the adjective agrees with a feminine subject; French adjectives typically add -e when describing a woman.',
        evaluationCriteria: ['Mentions feminine agreement', 'Explains the -e rule'],
        explanation: 'Adjectives must agree in gender with the subject.'
      }],
      sectionType: 'writing'
    },
    {
      lessonId: l4._id,
      type: 'listening',
      category: 'listening',
      title: 'Listening: Un Appel Téléphonique',
      order: 6,
      estimatedDuration: 5,
      points: 2,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'The daughter says she is:',
          options: ['Tired', 'Doing well', 'Hungry', 'Sad'],
          correctAnswer: 'Doing well',
          explanation: 'She says "Ça va bien."'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'multiple_choice',
          question: 'The father is feeling:',
          options: ['Very happy', 'A little tired but happy', 'Only tired', 'Angry'],
          correctAnswer: 'A little tired but happy',
          explanation: 'He says "Je suis un peu fatigué, mais content."'
        }
      ],
      sectionType: 'listening',
      transcript: 'Papa : Bonjour, ma chérie. Comment ça va ?\nFille : Ça va bien, Papa, merci ! Et toi ?\nPapa : Ça va, je suis un peu fatigué, mais content.'
    },
    {
      lessonId: l4._id,
      type: 'speaking',
      category: 'speaking',
      title: 'How Are You Practice',
      order: 7,
      estimatedDuration: 5,
      points: 5,
      isRequired: true,
      questions: [
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Say "I am happy" (as a male)',
          prompt: 'Je suis content',
          pronunciationTip: 'zhuh swee kohn-TAHN — the "t" at the end is silent for masculine.',
          expectedResponse: 'Je suis content'
        },
        {
          id: new mongoose.Types.ObjectId(),
          type: 'speaking_prompt',
          question: 'Say "I am happy" (as a female)',
          prompt: 'Je suis contente',
          pronunciationTip: 'zhuh swee kohn-TAHNT — the final "t" is pronounced for feminine.',
          expectedResponse: 'Je suis contente'
        }
      ],
      sectionType: 'speaking'
    }
  ];

  const allEx = [...l3Exercises, ...l4Exercises];
  await db.collection('exercises').insertMany(allEx);
  console.log(`✅ Inserted ${allEx.length} exercises (${l3Exercises.length} for L3, ${l4Exercises.length} for L4)`);

  // =====================================================================
  // VOCABULARY — Update Lesson 3 + Lesson 4 vocab
  // =====================================================================
  await db.collection('vocabularies').deleteMany({ lessonId: { $in: [l3._id, l4._id] } });

  const l3Vocab = [
    { french: 'Comment vous appelez-vous ?', english: 'what\'s your name? (formal)', pronunciation: 'koh-MAHN voo zah-PELL-voo', example: 'Comment vous appelez-vous, Madame ?', lessonId: l3._id },
    { french: 'Qui est-ce ?', english: 'who is it/that?', pronunciation: 'kee es', example: 'Qui est-ce, là-bas ?', lessonId: l3._id },
    { french: 'C\'est', english: 'it is / that is', pronunciation: 'say', example: 'C\'est Madame Vidal.', lessonId: l3._id },
    { french: 'Est-ce que', english: 'question marker (yes/no)', pronunciation: 'ess-kuh', example: 'Est-ce que tu es prêt ?', lessonId: l3._id },
    { french: 'Nous sommes', english: 'we are', pronunciation: 'noo SUM', example: 'Nous sommes amis.', lessonId: l3._id },
    { french: 'Vous êtes', english: 'you are (formal/plural)', pronunciation: 'voo ZET', example: 'Vous êtes Madame Lambert.', lessonId: l3._id },
  ];
  const l4Vocab = [
    { french: 'Ça va ?', english: 'how are you? / how\'s it going?', pronunciation: 'sa va', example: 'Salut, ça va ?', lessonId: l4._id },
    { french: 'Comment allez-vous ?', english: 'how are you? (formal)', pronunciation: 'koh-MAHN tah-lay-VOO', example: 'Bonjour, comment allez-vous ?', lessonId: l4._id },
    { french: 'Comment vas-tu ?', english: 'how are you? (informal)', pronunciation: 'koh-MAHN vah-TU', example: 'Comment vas-tu aujourd\'hui ?', lessonId: l4._id },
    { french: 'Ça va bien', english: 'it\'s going well', pronunciation: 'sa va byan', example: 'Ça va bien, merci !', lessonId: l4._id },
    { french: 'Ça va mal', english: 'it\'s going badly', pronunciation: 'sa va mal', example: 'Désolé, ça va mal.', lessonId: l4._id },
    { french: 'Un peu', english: 'a little', pronunciation: 'uhn PUH', example: 'Je suis un peu fatigué.', lessonId: l4._id },
    { french: 'Content / Contente', english: 'happy (m/f)', pronunciation: 'kohn-TAHN / kohn-TAHNT', example: 'Il est content, elle est contente.', lessonId: l4._id },
    { french: 'Fatigué / Fatiguée', english: 'tired (m/f)', pronunciation: 'fah-tee-GAY / fah-tee-GAY', example: 'Je suis fatigué.', lessonId: l4._id },
  ];
  await db.collection('vocabularies').insertMany([...l3Vocab, ...l4Vocab]);
  console.log(`✅ Inserted ${l3Vocab.length + l4Vocab.length} vocabulary items`);

  // =====================================================================
  // VERIFICATION
  // =====================================================================
  console.log('\n=== VERIFICATION ===');

  const updatedL3 = await db.collection('lessons').findOne({ _id: l3._id });
  const l3SectionTypes = updatedL3.sections.map(s => s.type);
  console.log('L3 sections:', l3SectionTypes.join(', '));
  console.log('L3 has warmup:', l3SectionTypes.includes('warmup'));
  console.log('L3 has explanation:', l3SectionTypes.includes('explanation'));
  console.log('L3 has vocabulary:', l3SectionTypes.includes('vocabulary'));
  console.log('L3 has grammar:', l3SectionTypes.includes('grammar'));
  console.log('L3 has reading:', l3SectionTypes.includes('reading'));
  console.log('L3 has listening:', l3SectionTypes.includes('listening'));
  console.log('L3 has speaking:', l3SectionTypes.includes('speaking'));
  console.log('L3 has writing:', l3SectionTypes.includes('writing'));
  console.log('L3 has review:', l3SectionTypes.includes('review'));

  const updatedL4 = await db.collection('lessons').findOne({ _id: l4._id });
  const l4SectionTypes = updatedL4.sections.map(s => s.type);
  console.log('\nL4 sections:', l4SectionTypes.join(', '));
  console.log('L4 has warmup:', l4SectionTypes.includes('warmup'));
  console.log('L4 has explanation:', l4SectionTypes.includes('explanation'));
  console.log('L4 has vocabulary:', l4SectionTypes.includes('vocabulary'));
  console.log('L4 has grammar:', l4SectionTypes.includes('grammar'));
  console.log('L4 has reading:', l4SectionTypes.includes('reading'));
  console.log('L4 has listening:', l4SectionTypes.includes('listening'));
  console.log('L4 has speaking:', l4SectionTypes.includes('speaking'));
  console.log('L4 has writing:', l4SectionTypes.includes('writing'));
  console.log('L4 has review:', l4SectionTypes.includes('review'));

  const l3ExCount = await db.collection('exercises').countDocuments({ lessonId: l3._id });
  const l4ExCount = await db.collection('exercises').countDocuments({ lessonId: l4._id });
  console.log(`\nL3 exercises: ${l3ExCount} (expecting ${l3Exercises.length})`);
  console.log(`L4 exercises: ${l4ExCount} (expecting ${l4Exercises.length})`);

  const l3VocabCount = await db.collection('vocabularies').countDocuments({ lessonId: l3._id });
  const l4VocabCount = await db.collection('vocabularies').countDocuments({ lessonId: l4._id });
  console.log(`\nL3 vocab items: ${l3VocabCount}`);
  console.log(`L4 vocab items: ${l4VocabCount}`);

  mongoose.disconnect();
  console.log('\n✅ DONE');
}

main().catch(e => { console.error(e); mongoose.disconnect(); });
