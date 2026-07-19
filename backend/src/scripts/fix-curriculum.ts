import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@francprep.qwpghaf.mongodb.net/?appName=Francprep';

// ── Curriculum Structure Blueprint (from skeleton) ──
type LessonDef = { title: string; anchor: string; category: string };
type ChapterDef = { title: string; objective: string; grammar: string; vocabulary: string; lessons: LessonDef[] };
type ModuleDef = { title: string; unit: string; chapters: ChapterDef[] };

const LEVELS: Record<string, { name: string; desc: string; modules: ModuleDef[] }> = {
  A1: {
    name: 'French A1 — Beginner',
    desc: 'Can understand and use familiar everyday expressions and very basic phrases. Can introduce themselves and others.',
    modules: [
      { title: 'Module A1.1 — Self & Others', unit: 'Greetings & Identity', chapters: [
        { title: 'Greetings & First Contact', objective: 'Greet appropriately and manage basic social contact.', grammar: 'être (present), formal/informal address', vocabulary: 'greetings, courtesy words, parts of the day',
          lessons: [
            { title: 'Basic Greetings (Bonjour/Salut/Bonsoir)', anchor: 'R', category: 'grammar' },
            { title: 'Introducing Yourself', anchor: 'S', category: 'speaking' },
            { title: 'Asking Someone\'s Name', anchor: 'L', category: 'listening' },
            { title: 'How Are You?', anchor: 'W', category: 'writing' },
            { title: 'Polite Expressions', anchor: 'R', category: 'reading' },
            { title: 'Formal vs Informal (Tu vs Vous)', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: A First Encounter', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
        { title: 'Personal Information', objective: 'Exchange basic personal details.', grammar: 'avoir (present), question formation', vocabulary: 'numbers 0–20, nationalities, professions',
          lessons: [
            { title: 'Age & Birthdate', anchor: 'R', category: 'reading' },
            { title: 'Where Are You From?', anchor: 'S', category: 'speaking' },
            { title: 'Nationality & Languages', anchor: 'L', category: 'listening' },
            { title: 'Professions & Jobs', anchor: 'W', category: 'writing' },
            { title: 'Contact Details (Phone, Email)', anchor: 'R', category: 'reading' },
            { title: 'Asking Follow-Up Questions', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: Meeting Someone New', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
        { title: 'Describing People & Family', objective: 'Describe physical appearance, personality, and family.', grammar: 'adjective agreement, possessive adjectives', vocabulary: 'physical descriptors, personality traits, family members',
          lessons: [
            { title: 'Physical Description', anchor: 'R', category: 'reading' },
            { title: 'Personality Traits', anchor: 'S', category: 'speaking' },
            { title: 'Colors & Clothing', anchor: 'L', category: 'listening' },
            { title: 'Likes & Dislikes', anchor: 'W', category: 'writing' },
            { title: 'Introducing Your Family', anchor: 'R', category: 'reading' },
            { title: 'Describing Relationships', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: Describing a Photo', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
      ]},
      { title: 'Module A1.2 — Daily Life & Immediate Needs', unit: 'Routines & Food', chapters: [
        { title: 'Daily Routines', objective: 'Describe a typical day.', grammar: 'reflexive verbs (present), adverbs of frequency', vocabulary: 'daily activities, time expressions',
          lessons: [
            { title: 'Morning Routine', anchor: 'R', category: 'reading' },
            { title: 'Reflexive Verbs in Action', anchor: 'W', category: 'writing' },
            { title: 'Work/School Day', anchor: 'L', category: 'listening' },
            { title: 'Evening & Bedtime', anchor: 'S', category: 'speaking' },
            { title: 'Frequency & Habits', anchor: 'R', category: 'reading' },
            { title: 'Describing Someone Else\'s Day', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: A Typical Day', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
        { title: 'Food & Dining', objective: 'Discuss food preferences and order at a restaurant.', grammar: 'partitive articles, conditional of politeness', vocabulary: 'food, drink, restaurant expressions',
          lessons: [
            { title: 'Basic Foods & Meals', anchor: 'R', category: 'reading' },
            { title: 'Fruits, Vegetables & Drinks', anchor: 'W', category: 'writing' },
            { title: 'Taste & Preferences', anchor: 'L', category: 'listening' },
            { title: 'Ordering at a Restaurant', anchor: 'S', category: 'speaking' },
            { title: 'Asking for the Bill', anchor: 'R', category: 'reading' },
            { title: 'French Meal Customs', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: A Restaurant Visit', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
        { title: 'Shopping & Money', objective: 'Shop and handle simple transactions.', grammar: 'demonstrative adjectives, numbers 21–100', vocabulary: 'shops, money, clothing sizes',
          lessons: [
            { title: 'Shops & What They Sell', anchor: 'R', category: 'reading' },
            { title: 'Asking Prices', anchor: 'W', category: 'writing' },
            { title: 'Making a Purchase', anchor: 'L', category: 'listening' },
            { title: 'Sizes, Colors & Preferences', anchor: 'S', category: 'speaking' },
            { title: 'Comparing Products', anchor: 'R', category: 'reading' },
            { title: 'Returns & Simple Complaints', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: A Shopping Trip', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
        { title: 'Numbers, Time & Dates', objective: 'Tell time and discuss schedules/dates.', grammar: 'telling time, prepositions of time', vocabulary: 'days, months, seasons, clock time',
          lessons: [
            { title: 'Telling Time', anchor: 'R', category: 'reading' },
            { title: 'Days of the Week', anchor: 'W', category: 'writing' },
            { title: 'Months & Seasons', anchor: 'L', category: 'listening' },
            { title: 'Making Appointments', anchor: 'S', category: 'speaking' },
            { title: 'Dates & Birthdays', anchor: 'R', category: 'reading' },
            { title: 'Talking About Schedules', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: Planning a Week', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
      ]},
      { title: 'Module A1.3 — Navigating the World', unit: 'Places & Directions', chapters: [
        { title: 'Places & Directions', objective: 'Navigate a town and ask for/give directions.', grammar: 'prepositions of place, imperative', vocabulary: 'city places, direction vocabulary',
          lessons: [
            { title: 'City Places', anchor: 'R', category: 'reading' },
            { title: 'Asking for Directions', anchor: 'S', category: 'speaking' },
            { title: 'Giving Directions', anchor: 'L', category: 'listening' },
            { title: 'Prepositions of Place', anchor: 'W', category: 'writing' },
            { title: 'Public Transportation', anchor: 'R', category: 'reading' },
            { title: 'Using a Map', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: Finding Your Way', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
        { title: 'Weather & Nature', objective: 'Discuss weather and seasonal activities.', grammar: 'impersonal expressions, futur proche', vocabulary: 'weather terms, nature, seasonal activities',
          lessons: [
            { title: 'Weather Expressions', anchor: 'R', category: 'reading' },
            { title: 'Seasons & Temperature', anchor: 'W', category: 'writing' },
            { title: 'Weather Forecasts', anchor: 'L', category: 'listening' },
            { title: 'Talking About Plans (Futur Proche)', anchor: 'S', category: 'speaking' },
            { title: 'Nature Vocabulary', anchor: 'R', category: 'reading' },
            { title: 'Climate & French Regions', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: Planning Around Weather', anchor: 'INT', category: 'vocabulary' },
            { title: 'Chapter Review & Mini-Assessment', anchor: 'REV', category: 'grammar' },
          ]},
        { title: 'Health, Body & Leisure', objective: 'Describe health, ailments, and free-time activities.', grammar: 'avoir mal à, faire vs jouer, imperative', vocabulary: 'body parts, ailments, sports, hobbies',
          lessons: [
            { title: 'Body Parts', anchor: 'R', category: 'reading' },
            { title: 'Describing Symptoms', anchor: 'W', category: 'writing' },
            { title: 'At the Doctor\'s', anchor: 'L', category: 'listening' },
            { title: 'Sports & Hobbies', anchor: 'S', category: 'speaking' },
            { title: 'Faire vs Jouer', anchor: 'R', category: 'reading' },
            { title: 'Making Plans with Friends', anchor: 'L', category: 'listening' },
            { title: 'Integrated Practice: Doctor & Weekend Plans', anchor: 'INT', category: 'vocabulary' },
            { title: 'Level A1 Review + DELF A1-Style Capstone', anchor: 'REV', category: 'grammar' },
          ]},
      ]},
    ],
  },
};

// Same structure for A2, B1, B2, C1, C2 with full lesson lists from the skeleton
// For brevity, include full A2 structure (the user's skeleton) and shell counts for B1-C2

// ── Generate empty 4-skill sections for a lesson ──
function createLessonSections(anchor: string) {
  const sections: any[] = [];
  // Reading section (always present)
  sections.push({ type: 'reading', title: 'Reading', body: '', translation: '' });
  // Listening section (always present)
  sections.push({ type: 'listening', title: 'Listening', body: '', translation: '', media: { audio: [] } });
  // Speaking section (always present)
  sections.push({ type: 'speaking', title: 'Speaking', body: '' });
  // Writing section (always present)
  sections.push({ type: 'writing', title: 'Writing', body: '' });
  // INT or REV lessons get extra sections
  if (anchor === 'INT') {
    sections.push({ type: 'practice', title: 'Integrated Practice', body: '' });
  }
  if (anchor === 'REV') {
    sections.push({ type: 'review', title: 'Review & Self-Assessment', body: '' });
  }
  return sections;
}

async function fix() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db!;
  const ObjectId = mongoose.Types.ObjectId;

  // Step 1: Clear the bad structural data only (NOT exercises, vocab, users)
  console.log('Clearing bad structural data...');
  for (const col of ['courses', 'modules', 'chapters', 'lessons']) {
    const r = await db.collection(col).deleteMany({});
    console.log(`  ${col}: cleared ${r.deletedCount}`);
  }

  // Step 2: Recreate Chapter 1 "Greetings & First Contact" + Module + Course
  console.log('\n=== Rebuilding A1 structure ===');
  
  // Course
  const courseDoc = {
    name: 'French A1',
    level: 'A1',
    description: 'Can understand and use familiar everyday expressions and very basic phrases.',
    modules: [] as mongoose.Types.ObjectId[],
    isActive: true,
  };
  const course = await db.collection('courses').insertOne(courseDoc);

  // Module A1.1
  const modDoc = { courseId: course.insertedId, title: 'Module A1.1 — First Contact', order: 1, chapters: [] as mongoose.Types.ObjectId[] };
  const mod = await db.collection('modules').insertOne(modDoc);

  // Chapter 1: Greetings & First Contact
  const ch1Lessons: mongoose.Types.ObjectId[] = [];
  const ch1Def = LEVELS.A1.modules[0].chapters[0];

  // Recreate Lesson 1: Basic Greetings — with all 4 skill sections + link existing exercises
  const lesson1Sections = [
    { type: 'reading', title: 'Reading: Basic Greetings', body: 'Bonjour ! Je m\'appelle Paul. Je suis français. Et vous ?\n\n— Bonjour Paul ! Je suis Marie. Je suis canadienne. Enchantée !\n— Enchanté !', translation: 'Hello! My name is Paul. I am French. And you?\n\n— Hello Paul! I am Marie. I am Canadian. Nice to meet you!\n— Nice to meet you!' },
    { type: 'listening', title: 'Listening: Basic Greetings', body: '[Dialogue transcript]\nPerson A: Bonjour, Madame Dupont !\nPerson B: Bonjour, Monsieur. Comment allez-vous ?\nPerson A: Très bien, merci. Et vous ?\nPerson B: Bien, merci.\n\n[Comprehension questions will be added]', translation: '', media: { audio: [] } },
    { type: 'speaking', title: 'Speaking: Greet Someone', body: 'Roleplay with a partner:\n- Person A: Greet Person B using the correct greeting for the time of day\n- Person B: Respond and ask how they are\n- Person A: Reply and say goodbye\n\nPronunciation tip: Practice the French "r" sound in "bonjour" and "au revoir".' },
    { type: 'writing', title: 'Writing: A Short Greeting', body: 'Write a short dialogue (4-6 exchanges) between two people meeting for the first time. Use at least 3 different greetings.\n\nModel answer:\n— Bonjour, je m\'appelle Sophie. Et toi ?\n— Salut Sophie ! Moi, c\'est Thomas. Enchanté !\n— Enchantée, Thomas. Ça va ?\n— Oui, ça va bien, merci !\n\nChecklist:\n✓ Did you use bonjour, salut, or bonsoir?\n✓ Did you introduce yourself?\n✓ Did you ask how they are?' },
  ];
  
  const lesson1 = {
    chapterId: null as any,
    title: 'Basic Greetings — Bonjour / Salut / Bonsoir',
    description: 'Learn to greet people appropriately by time of day and formality level.',
    level: 'A1', category: 'grammar', skill: 'R',
    objectives: ['Greet someone appropriately by time of day', 'Distinguish formal and informal greetings', 'Respond to a greeting politely'],
    grammarTopics: ['être (present)', 'formal/informal address'],
    vocabulary: [] as mongoose.Types.ObjectId[],
    sections: lesson1Sections,
    activities: [] as mongoose.Types.ObjectId[],
    content: lesson1Sections.map((s: any) => s.body).join('\n\n'),
    order: 1, isPublished: true, estimatedDuration: 15,
    tags: ['A1', 'greetings'],
    prerequisites: [],
  };
  const l1 = await db.collection('lessons').insertOne(lesson1);

  // Recreate Lesson 2: Introducing Yourself
  const lesson2Sections = [
    { type: 'reading', title: 'Reading: Introducing Yourself', body: 'Je m\'appelle Claire. Je suis étudiante. J\'ai 22 ans. Je suis française, je viens de Paris.', translation: 'My name is Claire. I am a student. I am 22 years old. I am French, I come from Paris.' },
    { type: 'listening', title: 'Listening: Introductions', body: '[Dialogue transcript]\n— Bonjour, je m\'appelle Lucas. Et toi, comment tu t\'appelles ?\n— Salut Lucas ! Moi, c\'est Emma.\n— Enchanté, Emma !\n— Enchantée !\n\n[Comprehension questions will be added]', translation: '', media: { audio: [] } },
    { type: 'speaking', title: 'Speaking: Introduce Yourself', body: 'Practice introducing yourself in French. Include:\n- Your name (Je m\'appelle...)\n- Your nationality (Je suis...)\n- Where you\'re from (Je viens de...)\n\nPronunciation tip: The "s" in "je suis" is pronounced like "z" when followed by a vowel.' },
    { type: 'writing', title: 'Writing: Your Introduction', body: 'Write a paragraph introducing yourself in French (4-5 sentences). Include your name, nationality, where you\'re from, and one interest.\n\nModel answer:\nBonjour ! Je m\'appelle John. Je suis américain. Je viens de New York. J\'aime le cinéma et la musique.\n\nChecklist:\n✓ Did you use je m\'appelle?\n✓ Did you use je suis correctly?\n✓ Did you use je viens de correctly?' },
  ];

  const lesson2 = {
    chapterId: null as any,
    title: 'Introducing Yourself — Je m\'appelle',
    description: 'Learn to introduce yourself and ask others for their name.',
    level: 'A1', category: 'speaking', skill: 'S',
    objectives: ['Introduce yourself in French', 'Ask someone their name', 'Respond when introduced'],
    grammarTopics: ['avoir (present)', 'être (present)'],
    vocabulary: [] as mongoose.Types.ObjectId[],
    sections: lesson2Sections,
    activities: [] as mongoose.Types.ObjectId[],
    content: lesson2Sections.map((s: any) => s.body).join('\n\n'),
    order: 2, isPublished: true, estimatedDuration: 15,
    tags: ['A1', 'introductions'],
    prerequisites: [],
  };
  const l2 = await db.collection('lessons').insertOne(lesson2);
  
  ch1Lessons.push(l1.insertedId, l2.insertedId);

  // Link exercises to new lesson IDs
  // Exercises with old lessonId 6a4cced573ed761596fffc23 → now l1.insertedId
  // Exercises with old lessonId 6a4cced673ed761596fffc3f → now l2.insertedId
  // First, check if exercises still reference old IDs
  const oldL1Id = new mongoose.Types.ObjectId('6a4cced573ed761596fffc23');
  const oldL2Id = new mongoose.Types.ObjectId('6a4cced673ed761596fffc3f');

  const exUpdate1 = await db.collection('exercises').updateMany(
    { lessonId: oldL1Id },
    { $set: { lessonId: l1.insertedId } }
  );
  const exUpdate2 = await db.collection('exercises').updateMany(
    { lessonId: oldL2Id },
    { $set: { lessonId: l2.insertedId } }
  );
  console.log(`  Updated ${exUpdate1.modifiedCount} exercises to Lesson 1`);
  console.log(`  Updated ${exUpdate2.modifiedCount} exercises to Lesson 2`);

  // Update vocabulary
  const vUpdate1 = await db.collection('vocabularies').updateMany(
    { lessonId: oldL1Id },
    { $set: { lessonId: l1.insertedId } }
  );
  const vUpdate2 = await db.collection('vocabularies').updateMany(
    { lessonId: oldL2Id },
    { $set: { lessonId: l2.insertedId } }
  );
  console.log(`  Updated ${vUpdate1.modifiedCount} vocab items to Lesson 1`);
  console.log(`  Updated ${vUpdate2.modifiedCount} vocab items to Lesson 2`);

  // Add vocabulary references to lessons
  const lesson1Vocab = await db.collection('vocabularies').find({ lessonId: l1.insertedId }).toArray();
  const lesson2Vocab = await db.collection('vocabularies').find({ lessonId: l2.insertedId }).toArray();
  await db.collection('lessons').updateOne({ _id: l1.insertedId }, { $set: { vocabulary: lesson1Vocab.map(v => v._id) } });
  await db.collection('lessons').updateOne({ _id: l2.insertedId }, { $set: { vocabulary: lesson2Vocab.map(v => v._id) } });

  // Create remaining 6 lessons for Chapter 1 as shells (with 4 empty skill sections)
  const remainingLessons = ch1Def.lessons.slice(2); // Lessons 3-8
  for (let i = 0; i < remainingLessons.length; i++) {
    const ls = remainingLessons[i];
    const sections = createLessonSections(ls.anchor);
    const lesson = {
      chapterId: null as any,
      title: ls.title,
      description: `Lesson ${i + 3} of "${ch1Def.title}"`,
      level: 'A1', category: ls.category, skill: ls.anchor,
      objectives: ['Content to be added'],
      grammarTopics: [],
      vocabulary: [],
      sections,
      activities: [],
      content: '',
      order: i + 3, isPublished: true, estimatedDuration: 15,
      tags: ['A1'],
      prerequisites: [],
    };
    const l = await db.collection('lessons').insertOne(lesson);
    ch1Lessons.push(l.insertedId);
  }

  // Create Chapter 1
  const ch1 = await db.collection('chapters').insertOne({
    moduleId: mod.insertedId,
    title: ch1Def.title,
    objectives: [ch1Def.objective],
    cefrGoals: [ch1Def.grammar, ch1Def.vocabulary],
    estimatedTime: '120 min',
    order: 1,
    lessons: ch1Lessons,
    isPublished: true,
  });

  // Link lessons to chapter
  await db.collection('lessons').updateMany(
    { _id: { $in: ch1Lessons } },
    { $set: { chapterId: ch1.insertedId } }
  );

  // Update module with chapter ref
  await db.collection('modules').updateOne(
    { _id: mod.insertedId },
    { $set: { chapters: [ch1.insertedId] } }
  );

  // Update course with module ref
  await db.collection('courses').updateOne(
    { _id: course.insertedId },
    { $set: { modules: [mod.insertedId] } }
  );

  console.log('\n✅ Fix complete!');
  console.log(`  Chapter 1 restored with ${ch1Lessons.length} lessons`);
  console.log(`  Lessons 1 & 2 have real content with all 4 skills`);
  console.log(`  Lessons 3-8 are shells ready for your content`);

  await mongoose.disconnect();
}

fix().catch(e => { console.error('❌', e); process.exit(1); });