const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep').then(async () => {
  const db = mongoose.connection.db;

  // Find Lesson 1
  const ch1 = await db.collection('chapters').findOne({ title: 'Greetings & First Contact' });
  const lessons = await db.collection('lessons').find({ chapterId: ch1._id }).sort({order:1}).toArray();
  const l1 = lessons[0];

  console.log('Lesson 1:', l1._id, l1.title);
  
  // Check existing exercises
  const existing = await db.collection('exercises').find({ lessonId: l1._id }).toArray();
  console.log('Existing exercises:', existing.length);
  existing.forEach(e => console.log('  type:', e.type, '| q:', e.questions?.length || '0', '| title:', (e.title||'').slice(0,50)));

  // Add 2 listening exercises
  const listeningEx1 = {
    lessonId: l1._id,
    type: 'listening',
    title: 'Greetings Listening Comprehension',
    instructions: 'Listen to the audio and answer the questions below.',
    order: 5,
    estimatedDuration: 8,
    points: 10,
    isRequired: true,
    questions: [
      { 
        id: new mongoose.Types.ObjectId(),
        type: 'multiple_choice',
        question: 'What greeting should you use at 8 PM?',
        options: ['Bonjour', 'Bonsoir', 'Salut', 'Bonne nuit'],
        correctAnswer: 'Bonsoir',
        explanation: '"Bonsoir" is used in the evening, typically after 6 PM.'
      },
      {
        id: new mongoose.Types.ObjectId(),
        type: 'multiple_choice',
        question: 'When would you say "Bonjour" to someone?',
        options: ['Only in the morning', 'During the day (morning to evening)', 'Only at noon', 'After sunset'],
        correctAnswer: 'During the day (morning to evening)',
        explanation: '"Bonjour" is used from morning until early evening (around 6 PM).'
      },
      {
        id: new mongoose.Types.ObjectId(),
        type: 'multiple_choice',
        question: 'What is the most informal greeting?',
        options: ['Bonjour', 'Bonsoir', 'Salut', 'Enchanté'],
        correctAnswer: 'Salut',
        explanation: '"Salut" is informal and used with friends, family, and people you know well.'
      }
    ],
    audioFile: null,
    transcript: 'Speaker 1: Bonjour, Madame Dupont! Comment allez-vous? Speaker 2: Bonjour, Monsieur! Je vais bien, merci. Et vous? Speaker 1: Très bien, merci. Speaker 3 (child): Salut, maman! Speaker 2: Salut, mon chéri! Speaker 1 (evening): Ah, il est 8 heures du soir. Bonsoir, tout le monde!',
    translation: 'Speaker 1: Hello, Mrs. Dupont! How are you? Speaker 2: Hello, Sir! I am well, thank you. And you? Speaker 1: Very well, thank you. Speaker 3 (child): Hi, mom! Speaker 2: Hi, my dear! Speaker 1 (evening): Ah, it is 8 PM. Good evening, everyone!',
    sectionType: 'listening'
  };

  const listeningEx2 = {
    lessonId: l1._id,
    type: 'listening',
    title: 'Identifying Greetings in Context',
    instructions: 'Listen to each short dialogue and choose the correct greeting used.',
    order: 6,
    estimatedDuration: 6,
    points: 8,
    isRequired: true,
    questions: [
      {
        id: new mongoose.Types.ObjectId(),
        type: 'multiple_choice',
        question: 'A man enters a bakery at 10 AM. He says: ___',
        options: ['Bonsoir', 'Salut', 'Bonjour', 'Bonne nuit'],
        correctAnswer: 'Bonjour',
        explanation: 'At 10 AM (morning), "Bonjour" is the appropriate greeting.'
      },
      {
        id: new mongoose.Types.ObjectId(),
        type: 'multiple_choice',
        question: 'Two close friends meet at a café. They say: ___',
        options: ['Bonjour madame', 'Salut', 'Bonsoir', 'Enchanté'],
        correctAnswer: 'Salut',
        explanation: 'Close friends use the informal "Salut" with each other.'
      }
    ],
    audioFile: null,
    transcript: 'Scene 1: Customer: Bonjour! Je voudrais un croissant, s\'il vous plaît. Baker: Bonjour, monsieur! Voilà. Scene 2: Friend 1: Salut! Ça va? Friend 2: Salut! Oui, ça va bien, et toi?',
    translation: 'Scene 1: Customer: Hello! I would like a croissant, please. Baker: Hello, sir! Here you are. Scene 2: Friend 1: Hi! How\'s it going? Friend 2: Hi! Yes, it\'s going well, and you?',
    sectionType: 'listening'
  };

  const lResult1 = await db.collection('exercises').insertOne(listeningEx1);
  const lResult2 = await db.collection('exercises').insertOne(listeningEx2);
  console.log('\nAdded listening exercises:', lResult1.insertedId, lResult2.insertedId);

  // Add 2 speaking exercises
  const speakingEx1 = {
    lessonId: l1._id,
    type: 'speaking',
    title: 'Greeting Practice',
    instructions: 'Record yourself saying the following phrases. Practice proper pronunciation.',
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
      },
      {
        id: new mongoose.Types.ObjectId(),
        type: 'speaking_prompt',
        question: 'Now practice a full greeting exchange: "Hello sir, how are you?"',
        prompt: 'Bonjour monsieur, comment allez-vous?',
        pronunciationTip: 'Bon-jour muh-syuh, ko-MAHN tah-lay VOO?',
        expectedResponse: 'Bonjour monsieur, comment allez-vous?'
      }
    ],
    sectionType: 'speaking'
  };

  const speakingEx2 = {
    lessonId: l1._id,
    type: 'speaking',
    title: 'Role-play: A First Encounter',
    instructions: 'Practice the conversation. Record yourself saying both parts.',
    order: 8,
    estimatedDuration: 7,
    points: 5,
    isRequired: true,
    questions: [
      {
        id: new mongoose.Types.ObjectId(),
        type: 'speaking_prompt',
        question: 'You are meeting someone for the first time. Say: "Hello, my name is [your name]. Nice to meet you."',
        prompt: 'Bonjour, je m\'appelle [name]. Enchanté(e).',
        pronunciationTip: 'zhuh mah-PELL [name]. Ahn-shahn-TAY. The "en" is nasal.',
        expectedResponse: 'Bonjour, je m\'appelle . Enchanté.'
      }
    ],
    sectionType: 'speaking'
  };

  const sResult1 = await db.collection('exercises').insertOne(speakingEx1);
  const sResult2 = await db.collection('exercises').insertOne(speakingEx2);
  console.log('Added speaking exercises:', sResult1.insertedId, sResult2.insertedId);

  // Final count
  const allEx = await db.collection('exercises').find({ lessonId: l1._id }).toArray();
  console.log('\n=== Lesson 1 now has', allEx.length, 'exercises ===');
  const byType = {};
  allEx.forEach(e => { byType[e.type] = (byType[e.type]||0)+1; });
  Object.entries(byType).forEach(([t,c]) => console.log('  type:', t, 'count:', c));

  // Verify vocabulary has speech-enabled field
  const vocab = await db.collection('vocabularies').find({ lessonId: l1._id }).toArray();
  console.log('\nVocabulary items:', vocab.length);
  vocab.forEach(v => console.log('  french:', v.french, '| english:', v.english, '| hasAudio:', !!v.hasAudio));

  mongoose.disconnect();
}).catch(e => { console.error(e); mongoose.disconnect(); });