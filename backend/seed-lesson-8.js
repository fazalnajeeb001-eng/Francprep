const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const ch1 = await db.collection('chapters').findOne({ title: 'Greetings & First Contact' });
  const lessons = await db.collection('lessons').find({ chapterId: ch1._id }).sort({ order: 1 }).toArray();
  const l8 = lessons[7];

  const l8Sections = [
    {
      type: 'warmup',
      title: 'Self-Reflection',
      body: 'Take a moment to consider:\n\n• Which part of this chapter felt easiest to you, and why?\n• Which part — greetings, être, questions, or tu/vous — do you want to review again before moving to Chapter 2?\n• Can you think of a real situation coming up in your own life where you could actually use what you learned this week?',
      translation: null, media: null
    },
    {
      type: 'explanation',
      title: 'Chapter Review & Mini-Assessment',
      body: 'This final lesson consolidates everything from Chapter 1. You\'ll review the full vocabulary bank, complete a grammar summary, and take a DELF A1-style diagnostic mini-assessment to confirm you\'re ready for Chapter 2.',
      translation: null, media: null
    },
    {
      type: 'vocabulary',
      title: 'Chapter Vocabulary Bank',
      body: 'Full consolidated vocabulary from Chapter 1:\n\nGreetings: bonjour, bonsoir, salut, au revoir, à bientôt, bonne nuit, madame, monsieur\nIntroductions: je m\'appelle, comment tu t\'appelles, enchanté(e), moi aussi, et toi, et vous, comment vous appelez-vous, qui est-ce, c\'est, est-ce que\nFeelings: comment ça va, comment allez-vous, ça va bien, ça va mal, fatigué(e), content(e), un peu\nCourtesy: s\'il vous plaît, s\'il te plaît, merci, merci beaucoup, de rien, je vous en prie, excusez-moi, pardon\nRegister: tu, vous, on se tutoie, on se vouvoie, un(e) inconnu(e)',
      translation: null, media: null
    },
    {
      type: 'grammar',
      title: 'Grammar Summary',
      body: 'Être (present tense):\nje suis | tu es | il/elle est | nous sommes | vous êtes\n\nS\'appeler:\nje m\'appelle | tu t\'appelles | il/elle s\'appelle\n\nQuestion formation: Est-ce que + statement, or rising intonation alone.\n\nAdjective agreement: add -e for feminine (content → contente; fatigué → fatiguée).\n\nTu/vous: tu for close/informal relationships; vous for strangers, elders, and formal/professional contexts.',
      translation: null, media: null
    },
    {
      type: 'reading',
      title: 'Reading Comprehension (DELF A1-Style)',
      body: 'Read the passage below:\n\nBonsoir, Monsieur. Je m\'appelle Inès. Comment allez-vous ? — Ça va bien, merci, un peu fatigué. Et vous ? — Ça va, merci !\n\nComprehension Questions:\n1. What time of day is it?\n2. Is the exchange formal or informal?\n3. How does the man describe how he feels?',
      translation: 'Good evening, sir. My name is Inès. How are you? — I\'m doing well, thank you, a little tired. And you? — I\'m okay, thanks!',
      media: null
    },
    {
      type: 'listening',
      title: 'Listening Comprehension (DELF A1-Style)',
      body: 'Listen to the café scene from Lesson 7 again.\n\nQuestion:\nWho uses vous with whom, and why, at each point in the conversation? (3 points)',
      translation: null, media: { audio: [] }
    },
    {
      type: 'speaking',
      title: 'Oral Production (DELF A1-Style)',
      body: 'Introduce yourself aloud, state your name, and say how you are feeling today, using at least one adjective with correct agreement.\n\n(2 points — self-recorded or partner-assessed)',
      translation: null, media: null
    },
    {
      type: 'writing',
      title: 'Written Production (DELF A1-Style)',
      body: 'Write a 4–6 line original dialogue introducing yourself to a stranger, asking their name, and asking how they are, in the formal register.\n\n(4 points)\n\nChecklist:\n☐ Correct vous forms throughout.\n☐ At least one appropriate courtesy expression.\n☐ Correct question formation.',
      translation: null, media: null
    },
    {
      type: 'practice',
      title: 'Mixed Practice Exercises',
      body: 'Test your understanding with the interactive exercises below. Click on your answer, then check if it\'s correct!',
      translation: null, media: null
    },
    {
      type: 'review',
      title: 'Chapter Review — Can-Do Statements',
      body: '☐ I can say hello and goodbye appropriately for the time of day. (Lesson 1)\n☐ I can introduce myself using my name. (Lesson 2)\n☐ I can ask someone their name and understand their answer. (Lesson 3)\n☐ I can ask how someone is doing and answer the same question. (Lesson 4)\n☐ I can use basic courtesy expressions. (Lesson 5)\n☐ I can tell whether a situation calls for tu or vous. (Lesson 6)\n☐ I can combine all of the above in a real conversation. (Lesson 7)',
      translation: null, media: null
    },
    {
      type: 'selfcheck',
      title: 'Ready for Chapter 2?',
      body: '☐ I completed the mini-assessment.\n☐ I reviewed the vocabulary bank.\n☐ I know which areas I want to practice more.\n☐ I feel confident moving to Chapter 2!',
      translation: null, media: null
    }
  ];

  await db.collection('lessons').updateOne({ _id: l8._id }, { $set: { sections: l8Sections, objectives: ['Consolidate all Chapter 1 can-do statements and complete a DELF A1-style diagnostic mini-assessment.'], grammarTopics: ['full review: être, s\'appeler, est-ce que, adjective agreement, tu/vous'], estimatedDuration: 35 } });
  console.log('✅ Lesson 8 updated');

  // Clear old exercises
  await db.collection('exercises').deleteMany({ lessonId: l8._id });

  const l8Ex = [
    { lessonId: l8._id, type: 'multiple_choice', category: 'reading', title: 'Greeting Time', order: 1, estimatedDuration: 2, points: 2, isRequired: true, questions: [{ id: new mongoose.Types.ObjectId(), type: 'multiple_choice', question: 'Which greeting fits 8:00 AM with a stranger?', options: ['Salut', 'Bonjour', 'Bonsoir', 'Bonne nuit'], correctAnswer: 'Bonjour', explanation: 'Bonjour is the daytime greeting; 8:00 AM is morning.' }], sectionType: 'reading' },
    { lessonId: l8._id, type: 'matching', category: 'reading', title: 'Match: Review', order: 2, estimatedDuration: 3, points: 3, isRequired: true, questions: [{ id: new mongoose.Types.ObjectId(), type: 'matching', question: 'Match each expression to its meaning.', pairs: { 'Je m\'appelle': 'My name is', 'C\'est': 'It is / that is', 'Excusez-moi': 'Excuse me (formal)' }, correctAnswer: null, explanation: 'Je m\'appelle introduces your name; c\'est identifies; excusez-moi gets attention formally.' }], sectionType: 'reading' },
    { lessonId: l8._id, type: 'fill_in_blank', category: 'writing', title: 'Fill: Êtes-vous', order: 3, estimatedDuration: 2, points: 2, isRequired: true, questions: [{ id: new mongoose.Types.ObjectId(), type: 'fill_in_blank', question: '__________ (vous, être) Madame Aubert ?', blankAnswer: 'Êtes-vous', correctAnswer: 'Êtes-vous', explanation: 'Êtes-vous is the inverted question form of vous êtes.' }], sectionType: 'writing' },
    { lessonId: l8._id, type: 'ordering', category: 'reading', title: 'Order: Introduction', order: 4, estimatedDuration: 3, points: 3, isRequired: true, questions: [{ id: new mongoose.Types.ObjectId(), type: 'ordering', question: 'Put in correct conversation order:', items: ['Enchantée !', 'Bonjour, je m\'appelle Claire.', 'Je m\'appelle Hugo, enchanté !'], correctOrder: ['Bonjour, je m\'appelle Claire.', 'Je m\'appelle Hugo, enchanté !', 'Enchantée !'], explanation: 'First greet and introduce, then respond, then say nice to meet you.' }], sectionType: 'reading' },
    { lessonId: l8._id, type: 'short_answer', category: 'writing', title: 'Ça va bien vs Content(e)', order: 5, estimatedDuration: 5, points: 5, isRequired: true, questions: [{ id: new mongoose.Types.ObjectId(), type: 'short_answer', question: 'Explain, in your own words, the difference between "ça va bien" and "je suis content(e)".', sampleAnswer: 'Ça va bien describes how things are going generally in the moment, while je suis content(e) describes a specific personal feeling (happiness) tied to the speaker and agreeing with their gender.', evaluationCriteria: ['Distinguishes general state from personal feeling', 'Mentions adjective agreement'], explanation: 'Ça va is about the situation; être + adjective is about the person\'s feeling.' }], sectionType: 'writing' },
    { lessonId: l8._id, type: 'translation', category: 'writing', title: 'Translation', order: 6, estimatedDuration: 3, points: 3, isRequired: true, questions: [{ id: new mongoose.Types.ObjectId(), type: 'fill_in_blank', question: 'Translate into French: "Excuse me, Madam, what is your name?"', blankAnswer: 'Excusez-moi, Madame, comment vous appelez-vous ?', correctAnswer: 'Excusez-moi, Madame, comment vous appelez-vous ?', explanation: 'Formal: Excusez-moi, Madame + comment vous appelez-vous.' }], sectionType: 'writing' },
    { lessonId: l8._id, type: 'listening', category: 'listening', title: 'Listening: Café Scene Analysis', order: 7, estimatedDuration: 5, points: 3, isRequired: true, questions: [{ id: new mongoose.Types.ObjectId(), type: 'multiple_choice', question: 'Does the waiter use vous or tu with Aline?', options: ['vous', 'tu'], correctAnswer: 'vous', explanation: 'Aline is a stranger, so the waiter uses vous.' }, { id: new mongoose.Types.ObjectId(), type: 'multiple_choice', question: 'Do Léa and Aline use vous or tu with each other?', options: ['vous', 'tu'], correctAnswer: 'tu', explanation: 'They are old friends, so they use tu.' }], sectionType: 'listening', transcript: 'La femme : Bonjour, Monsieur !\nLe serveur : Bonjour, Madame ! Comment allez-vous ?\nLa femme : Ça va bien, merci, et vous ?\nLéa : Aline ?! Salut ! Comment ça va ?\nAline : Léa ! Salut ! Ça va bien, merci !' },
    { lessonId: l8._id, type: 'speaking', category: 'speaking', title: 'Oral Production', order: 8, estimatedDuration: 5, points: 2, isRequired: true, questions: [{ id: new mongoose.Types.ObjectId(), type: 'speaking_prompt', question: 'Introduce yourself, state your name, and say how you feel today.', prompt: 'Bonjour, je m\'appelle [name]. Ça va [bien/mal], je suis [content(e)/fatigué(e)].', pronunciationTip: 'Speak clearly and naturally — you know all these words now!', expectedResponse: 'Bonjour, je m\'appelle' }], sectionType: 'speaking' }
  ];

  for (const ex of l8Ex) {
    await db.collection('exercises').insertOne(ex);
  }
  console.log(`✅ Inserted ${l8Ex.length} exercises`);

  // No new vocabulary for L8 (consolidation review)

  // Verification
  const doc = await db.collection('lessons').findOne({ _id: l8._id });
  const types = doc.sections.map(s => s.type);
  const hasAnswerKey = doc.sections.some(s => s.body && s.body.toLowerCase().includes('answer key'));
  const exCount = await db.collection('exercises').countDocuments({ lessonId: l8._id });
  console.log(`\nLesson 8: ${l8.title}`);
  console.log(`  Sections: ${types.join(', ')}`);
  console.log(`  Has Answer Key in body: ${hasAnswerKey}`);
  console.log(`  Exercises: ${exCount}`);

  mongoose.disconnect();
  console.log('\n✅ DONE');
}

main().catch(e => { console.error(e); mongoose.disconnect(); });
