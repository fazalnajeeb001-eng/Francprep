import mongoose from 'mongoose';
const URI = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

const INFO: Record<string, [string, string]> = {
  A1: ['French A1 — Beginner', 'Can understand and use familiar everyday expressions.'],
  A2: ['French A2 — Elementary', 'Can understand sentences and frequently used expressions.'],
  B1: ['French B1 — Intermediate', 'Can understand the main points of clear standard input.'],
  B2: ['French B2 — Upper Intermediate', 'Can understand the main ideas of complex text.'],
  C1: ['French C1 — Advanced', 'Can understand a wide range of demanding texts.'],
  C2: ['French C2 — Mastery', 'Can understand with ease virtually everything heard or read.'],
};

// Lesson: [title, anchor, category]
// Chapter: [title, objective, grammar, vocabulary, [lessons...]]
// Module: [title, unit, [chapters...]]

const CURRICULUM: Record<string, [string, string, any[]][]> = {};

// A1 Modules 2-3 (Module 1 with Chapter 1 is already in DB)
CURRICULUM.A1_EXTRA = [
  ['Module A1.2 — Daily Life & Immediate Needs', 'Routines & Food', [
    ['Daily Routines', 'Describe a typical day.', 'reflexive verbs (present), adverbs of frequency', 'daily activities, time expressions',
      ['Morning Routine|R|reading','Reflexive Verbs in Action|W|writing','Work/School Day|L|listening','Evening & Bedtime|S|speaking','Frequency & Habits|R|reading','Describing Someone Else\'s Day|L|listening','Integrated Practice: A Typical Day|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Food & Dining', 'Discuss food preferences and order at a restaurant.', 'partitive articles, conditional of politeness', 'food, drink, restaurant expressions',
      ['Basic Foods & Meals|R|reading','Fruits, Vegetables and Drinks|W|writing','Taste & Preferences|L|listening','Ordering at a Restaurant|S|speaking','Asking for the Bill|R|reading','French Meal Customs|L|listening','Integrated Practice: A Restaurant Visit|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Shopping & Money', 'Shop and handle simple transactions.', 'demonstrative adjectives, numbers 21–100', 'shops, money, clothing sizes',
      ['Shops and What They Sell|R|reading','Asking Prices|W|writing','Making a Purchase|L|listening','Sizes, Colors and Preferences|S|speaking','Comparing Products|R|reading','Returns and Simple Complaints|L|listening','Integrated Practice: A Shopping Trip|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Numbers, Time & Dates', 'Tell time and discuss schedules/dates.', 'telling time, prepositions of time', 'days, months, seasons, clock time',
      ['Telling Time|R|reading','Days of the Week|W|writing','Months & Seasons|L|listening','Making Appointments|S|speaking','Dates & Birthdays|R|reading','Talking About Schedules|L|listening','Integrated Practice: Planning a Week|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
  ]],
  ['Module A1.3 — Navigating the World', 'Places & Directions', [
    ['Places & Directions', 'Navigate a town and ask for/give directions.', 'prepositions of place, imperative', 'city places, direction vocabulary',
      ['City Places|R|reading','Asking for Directions|S|speaking','Giving Directions|L|listening','Prepositions of Place|W|writing','Public Transportation|R|reading','Using a Map|L|listening','Integrated Practice: Finding Your Way|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Weather & Nature', 'Discuss weather and seasonal activities.', 'impersonal expressions, futur proche', 'weather terms, nature, seasonal activities',
      ['Weather Expressions|R|reading','Seasons & Temperature|W|writing','Weather Forecasts|L|listening','Talking About Plans (Futur Proche)|S|speaking','Nature Vocabulary|R|reading','Climate and French Regions|L|listening','Integrated Practice: Planning Around Weather|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Health, Body & Leisure', 'Describe health, ailments, and leisure.', 'avoir mal a, faire vs jouer, imperative', 'body parts, ailments, sports, hobbies',
      ['Body Parts|R|reading','Describing Symptoms|W|writing','At the Doctor\'s|L|listening','Sports & Hobbies|S|speaking','Faire vs Jouer|R|reading','Making Plans with Friends|L|listening','Integrated Practice: Doctor and Weekend Plans|INT|vocabulary','Level A1 Review + DELF A1-Style Capstone|REV|grammar']],
  ]],
];

CURRICULUM.A2 = [
  ['Module A2.1 — Home & Community', 'Housing & Neighborhood', [
    ['Housing & Home', 'Describe where and how you live.', 'il y a, prepositions of location', 'rooms, furniture, housing types',
      ['Types of Housing|R|reading','Describing Your Home|W|writing','Rooms & Furniture|L|listening','Looking for an Apartment|S|speaking','Comparing Homes|R|reading','Household Chores|L|listening','Integrated Practice: Apartment Hunting|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Neighborhood & Local Services', 'Navigate local services and describe your neighborhood.', 'the pronoun y, frequency adverbs', 'local services, neighborhood features',
      ['Local Services|R|reading','Describing Your Neighborhood|W|writing','Errands & Appointments|L|listening','Asking About Opening Hours|S|speaking','The Pronoun Y|R|reading','Comparing Neighborhoods|L|listening','Integrated Practice: Running Errands|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Neighbors & Community', 'Discuss community relationships.', 'pronoun en, direct object pronouns', 'community roles, local events',
      ['Meeting Your Neighbors|R|reading','Direct Object Pronouns|W|writing','Local Events & Festivals|L|listening','Invitations to Community Events|S|speaking','The Pronoun En|R|reading','Community Rules & Etiquette|L|listening','Integrated Practice: A Neighborhood Gathering|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Describing Your Town', 'Give an overview of a town/city.', 'comparatives and superlatives', 'town features, opinions about places',
      ['Town & City Features|R|reading','Comparatives|W|writing','Superlatives|L|listening','Giving a Town Tour|S|speaking','Comparing Two Towns|R|reading','Opinions About Where You Live|L|listening','Integrated Practice: Recommending a Town|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
  ]],
  ['Module A2.2 — Work & Routine Life', 'Work & School', [
    ['Jobs & Workplaces', 'Describe your job and workplace.', 'indirect object pronouns', 'professions, workplace',
      ['Describing Your Job|R|reading','Indirect Object Pronouns|W|writing','A Typical Workday|L|listening','Talking About Colleagues|S|speaking','Workplace Vocabulary|R|reading','Discussing Job Satisfaction|L|listening','Integrated Practice: A Day at Work|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['School & Studies', 'Discuss education and studies.', 'imperative, depuis + present', 'school subjects, education system',
      ['School Subjects|R|reading','Talking About Your Studies|W|writing','The French Education System|L|listening','Giving Study Advice|S|speaking','Depuis + Present Tense|R|reading','Comparing Education Systems|L|listening','Integrated Practice: A School Day|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Past Routines & Habits', 'Describe how things used to be.', 'imparfait', 'time markers for the past',
      ['Introducing the Imparfait|R|reading','Childhood Memories|W|writing','How Things Used to Be|L|listening','Describing Past Habits|S|speaking','Imparfait of Common Verbs|R|reading','Comparing Then and Now|L|listening','Integrated Practice: When I Was a Child|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Comparing Then & Now', 'Contrast past and present.', 'imparfait vs present contrast', 'change-over-time expressions',
      ['Life Then vs Life Now|R|reading','Structuring a Comparison|W|writing','Grandparents Stories|L|listening','Talking About Change|S|speaking','Time Adverbs & Connectors|R|reading','Technology Then and Now|L|listening','Integrated Practice: A Generational Interview|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
  ]],
  ['Module A2.3 — Getting Around & Enjoying Life', 'Travel & Past Events', [
    ['Travel & Transport', 'Plan and discuss travel.', 'passe compose (avoir verbs)', 'transportation, travel planning',
      ['Modes of Transport|R|reading','Introducing the Passe Compose|W|writing','Buying Tickets|L|listening','Describing a Trip You Took|S|speaking','Passe Compose with Avoir|R|reading','Travel Problems and Delays|L|listening','Integrated Practice: Planning a Trip|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Narrating Past Events', 'Narrate a sequence of past events.', 'passe compose with etre', 'sequencing words',
      ['Passe Compose with Etre|R|reading','Sequencing a Story|W|writing','Listening to a Past Narrative|L|listening','Telling a Story About Your Weekend|S|speaking','Past Participle Agreement|R|reading','A Memorable Event|L|listening','Integrated Practice: Telling Your Story|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Hobbies & Free Time', 'Discuss hobbies and leisure in depth.', 'verbs + infinitive constructions', 'hobbies, entertainment, arts',
      ['Hobbies & Interests|R|reading','Verb + Infinitive Constructions|W|writing','Talking About Entertainment|L|listening','Recommending an Activity|S|speaking','Music, Film and Books|R|reading','Discussing a Favorite Hobby|L|listening','Integrated Practice: Planning a Free Day|INT|vocabulary','Chapter Review & Mini-Assessment|REV|grammar']],
    ['Making Plans', 'Make and negotiate future plans.', 'futur proche consolidation', 'invitations, scheduling',
      ['Making an Invitation|R|reading','Accepting & Declining|W|writing','Making Weekend Plans|L|listening','Negotiating a Plan|S|speaking','Futur Proche Consolidation|R|reading','Rescheduling Politely|L|listening','Integrated Practice: Planning a Group Outing|INT|vocabulary','Level A2 Review + DELF A2-Style Capstone|REV|grammar']],
  ]],
];

function shells(anchor: string) {
  const s: any[] = [
    { type: 'reading', title: 'Reading', body: '', translation: '' },
    { type: 'listening', title: 'Listening', body: '', translation: '', media: { audio: [] } },
    { type: 'speaking', title: 'Speaking', body: '' },
    { type: 'writing', title: 'Writing', body: '' },
  ];
  if (anchor === 'INT') s.push({ type: 'practice', title: 'Integrated Practice', body: '' });
  if (anchor === 'REV') s.push({ type: 'review', title: 'Review & Self-Assessment', body: '' });
  return s;
}

function parse(lessons: string[]) {
  return lessons.map(l => { const p = l.split('|'); return { title: p[0], anchor: p[1], category: p[2] }; });
}

async function main() {
  await mongoose.connect(URI);
  const db = mongoose.connection.db!;

  const a1Course = await db.collection('courses').findOne({ level: 'A1' })!;
  const a1Mod = await db.collection('modules').findOne({ courseId: a1Course!._id, order: 1 })!;
  const a1ModIds: any[] = [a1Mod!._id];

  // Build A1 extra modules (2, 3)
  for (const [modTitle, _unit, chs] of CURRICULUM.A1_EXTRA) {
    const o = a1ModIds.length + 1;
    const mod = await db.collection('modules').insertOne({ courseId: a1Course!._id, title: modTitle, order: o, chapters: [] });
    const cids: any[] = [];
    for (const [chTitle, obj, gram, vocab, lessons] of chs) {
      const parsed = parse(lessons as string[]);
      const lids: any[] = [];
      for (let i = 0; i < parsed.length; i++) {
        const l = await db.collection('lessons').insertOne({
          chapterId: null, title: parsed[i].title, description: `Lesson ${i+1} of ${chTitle}`,
          level: 'A1', category: parsed[i].category, skill: parsed[i].anchor,
          objectives: [], grammarTopics: [], vocabulary: [],
          sections: shells(parsed[i].anchor), activities: [], content: '',
          order: i+1, isPublished: true, estimatedDuration: 15, tags: ['A1'], prerequisites: [],
        });
        lids.push(l.insertedId);
      }
      const ch = await db.collection('chapters').insertOne({
        moduleId: mod.insertedId, title: chTitle, objectives: [obj],
        cefrGoals: [gram, vocab], estimatedTime: `${parsed.length*15} min`,
        order: cids.length+1, lessons: lids, isPublished: true,
      });
      await db.collection('lessons').updateMany({ _id: { $in: lids } }, { $set: { chapterId: ch.insertedId } });
      cids.push(ch.insertedId);
      console.log(`A1: ${chTitle} (${parsed.length} lessons)`);
    }
    await db.collection('modules').updateOne({ _id: mod.insertedId }, { $set: { chapters: cids } });
    a1ModIds.push(mod.insertedId);
  }
  await db.collection('courses').updateOne({ _id: a1Course!._id }, { $set: { modules: a1ModIds } });

  // Build A2, B1, B2, C1, C2 levels
  for (const level of ['A2'] as const) {
    if (!CURRICULUM[level]) continue;
    const [name, desc] = INFO[level];
    const course = await db.collection('courses').insertOne({
      name, level, description: desc, modules: [], isActive: true,
    });
    const modIds: any[] = [];

    for (const [modTitle, _unit, chs] of CURRICULUM[level]) {
      const o = modIds.length + 1;
      const mod = await db.collection('modules').insertOne({ courseId: course.insertedId, title: modTitle, order: o, chapters: [] });
      const cids: any[] = [];
      for (const [chTitle, obj, gram, vocab, lessons] of chs) {
        const parsed = parse(lessons as string[]);
        const lids: any[] = [];
        for (let i = 0; i < parsed.length; i++) {
          const l = await db.collection('lessons').insertOne({
            chapterId: null, title: parsed[i].title, description: `Lesson ${i+1} of ${chTitle}`,
            level, category: parsed[i].category, skill: parsed[i].anchor,
            objectives: [], grammarTopics: [], vocabulary: [],
            sections: shells(parsed[i].anchor), activities: [], content: '',
            order: i+1, isPublished: true, estimatedDuration: 15, tags: [level], prerequisites: [],
          });
          lids.push(l.insertedId);
        }
        const ch = await db.collection('chapters').insertOne({
          moduleId: mod.insertedId, title: chTitle, objectives: [obj],
          cefrGoals: [gram, vocab], estimatedTime: `${parsed.length*15} min`,
          order: cids.length+1, lessons: lids, isPublished: true,
        });
        await db.collection('lessons').updateMany({ _id: { $in: lids } }, { $set: { chapterId: ch.insertedId } });
        cids.push(ch.insertedId);
        console.log(`${level}: ${chTitle} (${parsed.length} lessons)`);
      }
      await db.collection('modules').updateOne({ _id: mod.insertedId }, { $set: { chapters: cids } });
      modIds.push(mod.insertedId);
    }
    await db.collection('courses').updateOne({ _id: course.insertedId }, { $set: { modules: modIds } });
  }

  console.log('\nVerification:');
  for (const col of ['courses','modules','chapters','lessons']) {
    const c = await db.collection(col).countDocuments();
    console.log(`  ${col}: ${c}`);
  }
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });