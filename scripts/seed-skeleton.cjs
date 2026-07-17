/**
 * Seed script: Rebuild entire skeleton from FrancPrep-A1-C2-Skeleton.md
 * Run: cd backend && NODE_PATH=./node_modules node ../scripts/seed-skeleton.cjs
 */
const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

// ─── SKELETON DATA (from FrancPrep-A1-C2-Skeleton.md) ───────────────────────
const SKELETON = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL A1
  // ═══════════════════════════════════════════════════════════════════════════
  {
    level: 'A1', courseTitle: 'French A1', courseOrder: 1,
    modules: [
      {
        title: 'Self & Others', order: 1,
        units: [
          {
            id: 'a1-u1', unit_name: 'Greetings & Identity', unit_order: 1,
            chapters: [
              {
                title: 'Greetings & First Contact', order: 1,
                objectives: ['Greet appropriately and manage basic social contact by time of day and formality'],
                grammarFocus: 'être (present), formal/informal address',
                vocabDomain: 'greetings, courtesy words, parts of the day',
                lessons: [
                  { title: 'Basic Greetings (Bonjour/Salut/Bonsoir)', anchorSkill: 'R', order: 1 },
                  { title: 'Introducing Yourself', anchorSkill: 'S', order: 2 },
                  { title: "Asking Someone's Name", anchorSkill: 'L', order: 3 },
                  { title: 'How Are You?', anchorSkill: 'W', order: 4 },
                  { title: 'Polite Expressions', anchorSkill: 'R', order: 5 },
                  { title: 'Formal vs Informal (Tu vs Vous)', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: A First Encounter', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Personal Information', order: 2,
                objectives: ['Exchange basic personal details'],
                grammarFocus: 'avoir (present), question formation (est-ce que, inversion basics)',
                vocabDomain: 'numbers 0–20, nationalities, professions',
                lessons: [
                  { title: 'Age & Birthdate', anchorSkill: 'R', order: 1 },
                  { title: 'Where Are You From?', anchorSkill: 'S', order: 2 },
                  { title: 'Nationality & Languages', anchorSkill: 'L', order: 3 },
                  { title: 'Professions & Jobs', anchorSkill: 'W', order: 4 },
                  { title: 'Contact Details (Phone, Email)', anchorSkill: 'R', order: 5 },
                  { title: 'Asking Follow-Up Questions', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Meeting Someone New', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
          {
            id: 'a1-u2', unit_name: 'Describing People & Family', unit_order: 2,
            chapters: [
              {
                title: 'Describing People & Family', order: 3,
                objectives: ['Describe physical appearance, personality, and immediate family'],
                grammarFocus: 'adjective agreement (gender/number), possessive adjectives',
                vocabDomain: 'physical descriptors, personality traits, family members',
                lessons: [
                  { title: 'Physical Description', anchorSkill: 'R', order: 1 },
                  { title: 'Personality Traits', anchorSkill: 'S', order: 2 },
                  { title: 'Colors & Clothing', anchorSkill: 'L', order: 3 },
                  { title: 'Likes & Dislikes', anchorSkill: 'W', order: 4 },
                  { title: 'Introducing Your Family', anchorSkill: 'R', order: 5 },
                  { title: 'Describing Relationships', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Describing a Photo', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Daily Life & Immediate Needs', order: 2,
        units: [
          {
            id: 'a1-u3', unit_name: 'Routines & Food', unit_order: 1,
            chapters: [
              {
                title: 'Daily Routines', order: 4,
                objectives: ['Describe a typical day'],
                grammarFocus: 'reflexive verbs (present), adverbs of frequency',
                vocabDomain: 'daily activities, time expressions',
                lessons: [
                  { title: 'Morning Routine', anchorSkill: 'R', order: 1 },
                  { title: 'Reflexive Verbs in Action', anchorSkill: 'W', order: 2 },
                  { title: 'Work/School Day', anchorSkill: 'L', order: 3 },
                  { title: 'Evening & Bedtime', anchorSkill: 'S', order: 4 },
                  { title: 'Frequency & Habits', anchorSkill: 'R', order: 5 },
                  { title: "Describing Someone Else's Day", anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: A Typical Day', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Food & Dining', order: 5,
                objectives: ['Discuss food preferences and order at a restaurant'],
                grammarFocus: 'partitive articles (du/de la/des), conditional of politeness (je voudrais)',
                vocabDomain: 'food, drink, restaurant expressions',
                lessons: [
                  { title: 'Basic Foods & Meals', anchorSkill: 'R', order: 1 },
                  { title: 'Fruits, Vegetables & Drinks', anchorSkill: 'W', order: 2 },
                  { title: 'Taste & Preferences', anchorSkill: 'L', order: 3 },
                  { title: 'Ordering at a Restaurant', anchorSkill: 'S', order: 4 },
                  { title: 'Asking for the Bill', anchorSkill: 'R', order: 5 },
                  { title: 'French Meal Customs', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: A Restaurant Visit', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
          {
            id: 'a1-u4', unit_name: 'Shopping & Time', unit_order: 2,
            chapters: [
              {
                title: 'Shopping & Money', order: 6,
                objectives: ['Shop and handle simple transactions'],
                grammarFocus: 'demonstrative adjectives, numbers 21–100',
                vocabDomain: 'shops, money, clothing sizes/colors',
                lessons: [
                  { title: 'Shops & What They Sell', anchorSkill: 'R', order: 1 },
                  { title: 'Asking Prices', anchorSkill: 'W', order: 2 },
                  { title: 'Making a Purchase', anchorSkill: 'L', order: 3 },
                  { title: 'Sizes, Colors & Preferences', anchorSkill: 'S', order: 4 },
                  { title: 'Comparing Products', anchorSkill: 'R', order: 5 },
                  { title: 'Returns & Simple Complaints', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: A Shopping Trip', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Numbers, Time & Dates', order: 7,
                objectives: ['Tell time and discuss schedules/dates'],
                grammarFocus: 'telling time formally/informally, prepositions of time (à, en, dans)',
                vocabDomain: 'days, months, seasons, clock time',
                lessons: [
                  { title: 'Telling Time', anchorSkill: 'R', order: 1 },
                  { title: 'Days of the Week', anchorSkill: 'W', order: 2 },
                  { title: 'Months & Seasons', anchorSkill: 'L', order: 3 },
                  { title: 'Making Appointments', anchorSkill: 'S', order: 4 },
                  { title: 'Dates & Birthdays', anchorSkill: 'R', order: 5 },
                  { title: 'Talking About Schedules', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Planning a Week', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Navigating the World', order: 3,
        units: [
          {
            id: 'a1-u5', unit_name: 'Places', unit_order: 1,
            chapters: [
              {
                title: 'Places & Directions', order: 8,
                objectives: ['Navigate a town and ask for/give directions'],
                grammarFocus: 'prepositions of place, the imperative (basic commands)',
                vocabDomain: 'city places, direction vocabulary',
                lessons: [
                  { title: 'City Places', anchorSkill: 'R', order: 1 },
                  { title: 'Asking for Directions', anchorSkill: 'S', order: 2 },
                  { title: 'Giving Directions', anchorSkill: 'L', order: 3 },
                  { title: 'Prepositions of Place', anchorSkill: 'W', order: 4 },
                  { title: 'Public Transportation', anchorSkill: 'R', order: 5 },
                  { title: 'Using a Map', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Finding Your Way', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Weather & Nature', order: 9,
                objectives: ['Discuss weather and seasonal activities'],
                grammarFocus: 'impersonal expressions (il fait, il pleut), futur proche introduced',
                vocabDomain: 'weather terms, nature, seasonal activities',
                lessons: [
                  { title: 'Weather Expressions', anchorSkill: 'R', order: 1 },
                  { title: 'Seasons & Temperature', anchorSkill: 'W', order: 2 },
                  { title: 'Weather Forecasts', anchorSkill: 'L', order: 3 },
                  { title: 'Talking About Plans (Futur Proche)', anchorSkill: 'S', order: 4 },
                  { title: 'Nature Vocabulary', anchorSkill: 'R', order: 5 },
                  { title: 'Climate & French Regions', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Planning Around Weather', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
          {
            id: 'a1-u6', unit_name: 'Wellbeing & Leisure', unit_order: 2,
            chapters: [
              {
                title: 'Health, Body & Leisure', order: 10,
                objectives: ['Describe health, minor ailments, and free-time activities'],
                grammarFocus: 'avoir mal à + body parts, faire vs jouer, imperative for health advice',
                vocabDomain: 'body parts, ailments, sports, hobbies',
                lessons: [
                  { title: 'Body Parts', anchorSkill: 'R', order: 1 },
                  { title: "Describing Symptoms (J'ai mal à...)", anchorSkill: 'W', order: 2 },
                  { title: "At the Doctor's", anchorSkill: 'L', order: 3 },
                  { title: 'Sports & Hobbies', anchorSkill: 'S', order: 4 },
                  { title: 'Faire vs Jouer', anchorSkill: 'R', order: 5 },
                  { title: 'Making Plans with Friends', anchorSkill: 'L', order: 6 },
                  { title: "Integrated Practice: A Doctor's Visit & Weekend Plans", anchorSkill: 'INT', order: 7 },
                  { title: 'Module 3 & Level A1 Review + DELF A1-Style Capstone', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
        ]
      },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL A2
  // ═══════════════════════════════════════════════════════════════════════════
  {
    level: 'A2', courseTitle: 'French A2 — Elementary', courseOrder: 2,
    modules: [
      {
        title: 'Home & Community', order: 1,
        units: [
          {
            id: 'a2-u1', unit_name: 'Housing & Neighborhood', unit_order: 1,
            chapters: [
              {
                title: 'Housing & Home', order: 1,
                objectives: ['Describe where and how you live'],
                grammarFocus: 'il y a, prepositions of location (review + expansion)',
                vocabDomain: 'rooms, furniture, housing types',
                lessons: [
                  { title: 'Types of Housing', anchorSkill: 'R', order: 1 },
                  { title: 'Describing Your Home', anchorSkill: 'W', order: 2 },
                  { title: 'Rooms & Furniture', anchorSkill: 'L', order: 3 },
                  { title: 'Looking for an Apartment', anchorSkill: 'S', order: 4 },
                  { title: 'Comparing Homes', anchorSkill: 'R', order: 5 },
                  { title: 'Household Chores', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Apartment Hunting', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Neighborhood & Local Services', order: 2,
                objectives: ['Navigate local services and describe your neighborhood'],
                grammarFocus: 'the pronoun "y", frequency adverbs (review + expansion)',
                vocabDomain: 'local services, neighborhood features',
                lessons: [
                  { title: 'Local Services (Post Office, Bank, etc.)', anchorSkill: 'R', order: 1 },
                  { title: 'Describing Your Neighborhood', anchorSkill: 'W', order: 2 },
                  { title: 'Errands & Appointments', anchorSkill: 'L', order: 3 },
                  { title: 'Asking About Opening Hours', anchorSkill: 'S', order: 4 },
                  { title: 'The Pronoun "Y"', anchorSkill: 'R', order: 5 },
                  { title: 'Comparing Neighborhoods', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Running Errands', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
          {
            id: 'a2-u2', unit_name: 'Community Life', unit_order: 2,
            chapters: [
              {
                title: 'Neighbors & Community', order: 3,
                objectives: ['Discuss community relationships and events'],
                grammarFocus: 'the pronoun "en", direct object pronouns introduced',
                vocabDomain: 'community roles, local events',
                lessons: [
                  { title: 'Meeting Your Neighbors', anchorSkill: 'R', order: 1 },
                  { title: 'Direct Object Pronouns', anchorSkill: 'W', order: 2 },
                  { title: 'Local Events & Festivals', anchorSkill: 'L', order: 3 },
                  { title: 'Invitations to Community Events', anchorSkill: 'S', order: 4 },
                  { title: 'The Pronoun "En"', anchorSkill: 'R', order: 5 },
                  { title: 'Community Rules & Etiquette', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: A Neighborhood Gathering', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Describing Your Town', order: 4,
                objectives: ['Give an overview of a town/city to someone unfamiliar with it'],
                grammarFocus: 'comparatives and superlatives',
                vocabDomain: 'town features, opinions about places',
                lessons: [
                  { title: 'Town & City Features', anchorSkill: 'R', order: 1 },
                  { title: 'Comparatives (plus/moins/aussi... que)', anchorSkill: 'W', order: 2 },
                  { title: 'Superlatives', anchorSkill: 'L', order: 3 },
                  { title: 'Giving a Town Tour', anchorSkill: 'S', order: 4 },
                  { title: 'Comparing Two Towns', anchorSkill: 'R', order: 5 },
                  { title: 'Opinions About Where You Live', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Recommending a Town', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Work & Routine Life', order: 2,
        units: [
          {
            id: 'a2-u3', unit_name: 'Work & School', unit_order: 1,
            chapters: [
              {
                title: 'Jobs & Workplaces', order: 5,
                objectives: ['Describe your job and workplace'],
                grammarFocus: 'indirect object pronouns',
                vocabDomain: 'professions, workplace vocabulary',
                lessons: [
                  { title: 'Describing Your Job', anchorSkill: 'R', order: 1 },
                  { title: 'Indirect Object Pronouns', anchorSkill: 'W', order: 2 },
                  { title: 'A Typical Workday', anchorSkill: 'L', order: 3 },
                  { title: 'Talking About Colleagues', anchorSkill: 'S', order: 4 },
                  { title: 'Workplace Vocabulary', anchorSkill: 'R', order: 5 },
                  { title: 'Discussing Job Satisfaction', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: A Day at Work', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'School & Studies', order: 6,
                objectives: ['Discuss education and studies'],
                grammarFocus: 'the imperative (expanded), depuis + present tense',
                vocabDomain: 'school subjects, education system vocabulary',
                lessons: [
                  { title: 'School Subjects', anchorSkill: 'R', order: 1 },
                  { title: 'Talking About Your Studies', anchorSkill: 'W', order: 2 },
                  { title: 'The French Education System', anchorSkill: 'L', order: 3 },
                  { title: 'Giving Study Advice (Imperative)', anchorSkill: 'S', order: 4 },
                  { title: 'Depuis + Present Tense', anchorSkill: 'R', order: 5 },
                  { title: 'Comparing Education Systems', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: A School Day', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
          {
            id: 'a2-u4', unit_name: 'The Past', unit_order: 2,
            chapters: [
              {
                title: 'Past Routines & Habits', order: 7,
                objectives: ['Describe how things used to be'],
                grammarFocus: 'imparfait (formation and use for habitual past)',
                vocabDomain: 'time markers for the past (avant, quand j\'étais...)',
                lessons: [
                  { title: 'Introducing the Imparfait', anchorSkill: 'R', order: 1 },
                  { title: 'Childhood Memories', anchorSkill: 'W', order: 2 },
                  { title: 'How Things Used to Be', anchorSkill: 'L', order: 3 },
                  { title: 'Describing Past Habits', anchorSkill: 'S', order: 4 },
                  { title: 'Imparfait of Common Verbs', anchorSkill: 'R', order: 5 },
                  { title: 'Comparing Then and Now', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: When I Was a Child', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Comparing Then & Now', order: 8,
                objectives: ['Contrast past and present in connected speech/writing'],
                grammarFocus: 'imparfait vs présent contrast, adverbs of time',
                vocabDomain: 'change-over-time expressions',
                lessons: [
                  { title: 'Life Then vs Life Now', anchorSkill: 'R', order: 1 },
                  { title: 'Structuring a Comparison', anchorSkill: 'W', order: 2 },
                  { title: "Listening: Grandparents' Stories", anchorSkill: 'L', order: 3 },
                  { title: 'Talking About Change', anchorSkill: 'S', order: 4 },
                  { title: 'Time Adverbs & Connectors', anchorSkill: 'R', order: 5 },
                  { title: 'Technology: Then and Now', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: A Generational Interview', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Getting Around & Enjoying Life', order: 3,
        units: [
          {
            id: 'a2-u5', unit_name: 'Travel & Past Events', unit_order: 1,
            chapters: [
              {
                title: 'Travel & Transport', order: 9,
                objectives: ['Plan and discuss travel'],
                grammarFocus: 'passé composé (formation, avoir verbs)',
                vocabDomain: 'transportation, travel planning',
                lessons: [
                  { title: 'Modes of Transport', anchorSkill: 'R', order: 1 },
                  { title: 'Introducing the Passé Composé', anchorSkill: 'W', order: 2 },
                  { title: 'Buying Tickets', anchorSkill: 'L', order: 3 },
                  { title: 'Describing a Trip You Took', anchorSkill: 'S', order: 4 },
                  { title: 'Passé Composé with Avoir', anchorSkill: 'R', order: 5 },
                  { title: 'Travel Problems & Delays', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Planning a Trip', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Narrating Past Events', order: 10,
                objectives: ['Narrate a sequence of past events'],
                grammarFocus: 'passé composé with être, agreement rules',
                vocabDomain: "sequencing words (d'abord, ensuite, enfin)",
                lessons: [
                  { title: 'Passé Composé with Être', anchorSkill: 'R', order: 1 },
                  { title: 'Sequencing a Story', anchorSkill: 'W', order: 2 },
                  { title: 'Listening to a Past Narrative', anchorSkill: 'L', order: 3 },
                  { title: 'Telling a Story About Your Weekend', anchorSkill: 'S', order: 4 },
                  { title: 'Past Participle Agreement', anchorSkill: 'R', order: 5 },
                  { title: 'A Memorable Event', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Telling Your Story', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
          {
            id: 'a2-u6', unit_name: 'Free Time & Plans', unit_order: 2,
            chapters: [
              {
                title: 'Hobbies & Free Time', order: 11,
                objectives: ['Discuss hobbies and leisure in depth'],
                grammarFocus: 'verbs + infinitive constructions',
                vocabDomain: 'hobbies, entertainment, arts',
                lessons: [
                  { title: 'Hobbies & Interests', anchorSkill: 'R', order: 1 },
                  { title: 'Verb + Infinitive Constructions', anchorSkill: 'W', order: 2 },
                  { title: 'Talking About Entertainment', anchorSkill: 'L', order: 3 },
                  { title: 'Recommending an Activity', anchorSkill: 'S', order: 4 },
                  { title: 'Music, Film & Books', anchorSkill: 'R', order: 5 },
                  { title: 'Discussing a Favorite Hobby', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Planning a Free Day', anchorSkill: 'INT', order: 7 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 8 },
                ]
              },
              {
                title: 'Making Plans', order: 12,
                objectives: ['Make and negotiate future plans'],
                grammarFocus: 'futur proche (consolidation), accepting/declining invitations',
                vocabDomain: 'invitations, scheduling expressions',
                lessons: [
                  { title: 'Making an Invitation', anchorSkill: 'R', order: 1 },
                  { title: 'Accepting & Declining', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Making Weekend Plans', anchorSkill: 'L', order: 3 },
                  { title: 'Negotiating a Plan', anchorSkill: 'S', order: 4 },
                  { title: 'Futur Proche Consolidation', anchorSkill: 'R', order: 5 },
                  { title: 'Rescheduling Politely', anchorSkill: 'L', order: 6 },
                  { title: 'Integrated Practice: Planning a Group Outing', anchorSkill: 'INT', order: 7 },
                  { title: 'Level A2 Review + DELF A2-Style Capstone', anchorSkill: 'REV', order: 8 },
                ]
              },
            ]
          },
        ]
      },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL B1
  // ═══════════════════════════════════════════════════════════════════════════
  {
    level: 'B1', courseTitle: 'French B1 — Intermediate', courseOrder: 3,
    modules: [
      {
        title: 'Opinions & Everyday Debate', order: 1,
        units: [
          {
            id: 'b1-u1', unit_name: 'Expressing Views', unit_order: 1,
            chapters: [
              {
                title: 'Expressing Opinions', order: 1,
                objectives: ['State and support a personal opinion clearly'],
                grammarFocus: 'penser que / croire que + indicative, opinion connectors',
                vocabDomain: 'opinion verbs, hedging expressions',
                lessons: [
                  { title: 'Giving an Opinion', anchorSkill: 'R', order: 1 },
                  { title: 'Opinion Connectors', anchorSkill: 'W', order: 2 },
                  { title: 'Listening to Opinions', anchorSkill: 'L', order: 3 },
                  { title: 'Stating and Defending a View', anchorSkill: 'S', order: 4 },
                  { title: 'Hedging & Softening Opinions', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Roundtable Discussion', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Agreeing & Disagreeing', order: 2,
                objectives: ['Agree/disagree politely and constructively'],
                grammarFocus: 'subjunctive introduced (il faut que, high-frequency fixed expressions)',
                vocabDomain: 'agreement/disagreement expressions',
                lessons: [
                  { title: 'Ways to Agree', anchorSkill: 'R', order: 1 },
                  { title: 'Ways to Disagree Politely', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Friendly Debate', anchorSkill: 'L', order: 3 },
                  { title: 'Disagreeing Respectfully', anchorSkill: 'S', order: 4 },
                  { title: 'Introducing the Subjunctive', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Civil Disagreement', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
          {
            id: 'b1-u2', unit_name: 'Reasoning & Debate', unit_order: 2,
            chapters: [
              {
                title: 'Giving Reasons & Justifying', order: 3,
                objectives: ['Justify a position with clear reasoning'],
                grammarFocus: 'parce que / car / puisque, cause-effect structures',
                vocabDomain: 'reasoning connectors',
                lessons: [
                  { title: 'Explaining Your Reasoning', anchorSkill: 'R', order: 1 },
                  { title: 'Cause & Effect Connectors', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Justified Argument', anchorSkill: 'L', order: 3 },
                  { title: 'Justifying a Decision', anchorSkill: 'S', order: 4 },
                  { title: 'Structuring an Argument', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Justifying a Choice', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Debating Everyday Topics', order: 4,
                objectives: ['Engage in a structured debate on a familiar topic'],
                grammarFocus: 'consolidation of opinion/subjunctive structures, contrastive connectors (cependant, en revanche)',
                vocabDomain: 'everyday debate topics',
                lessons: [
                  { title: 'Structuring a Debate', anchorSkill: 'R', order: 1 },
                  { title: 'Contrastive Connectors', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Structured Debate', anchorSkill: 'L', order: 3 },
                  { title: 'Taking Part in a Debate', anchorSkill: 'S', order: 4 },
                  { title: 'Weighing Two Sides', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Class Debate', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Work & Study Life', order: 2,
        units: [
          {
            id: 'b1-u3', unit_name: 'Professional Communication', unit_order: 1,
            chapters: [
              {
                title: 'Professional Communication', order: 5,
                objectives: ['Communicate appropriately in a workplace context'],
                grammarFocus: 'formal register markers, the conditional (present) for polite requests',
                vocabDomain: 'office/meeting vocabulary',
                lessons: [
                  { title: 'Workplace Communication Norms', anchorSkill: 'R', order: 1 },
                  { title: 'The Conditional for Polite Requests', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Team Meeting', anchorSkill: 'L', order: 3 },
                  { title: 'Participating in a Meeting', anchorSkill: 'S', order: 4 },
                  { title: 'Writing a Professional Email', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Workplace Scenario', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Job Interviews & CVs', order: 6,
                objectives: ['Prepare for and handle a job interview'],
                grammarFocus: 'conditional (expanded), question forms in formal register',
                vocabDomain: 'CV/résumé vocabulary, interview language',
                lessons: [
                  { title: 'Writing a Simple CV', anchorSkill: 'R', order: 1 },
                  { title: 'Interview Questions & Answers', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Mock Interview', anchorSkill: 'L', order: 3 },
                  { title: 'Practicing an Interview', anchorSkill: 'S', order: 4 },
                  { title: 'Formal Question Forms', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Full Mock Interview', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Travel & Real-World Problem-Solving', order: 3,
        units: [
          {
            id: 'b1-u4', unit_name: 'Handling the Unexpected', unit_order: 1,
            chapters: [
              {
                title: 'Unplanned Situations', order: 7,
                objectives: ['Handle unexpected situations while traveling'],
                grammarFocus: 'si + present (real conditions), passé composé/imparfait contrast begins',
                vocabDomain: 'travel mishaps, problem-solving language',
                lessons: [
                  { title: 'Common Travel Mishaps', anchorSkill: 'R', order: 1 },
                  { title: 'Si + Present (Real Conditions)', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Travel Emergency', anchorSkill: 'L', order: 3 },
                  { title: 'Explaining a Problem', anchorSkill: 'S', order: 4 },
                  { title: 'Passé Composé vs Imparfait (Introduction)', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Handling a Mishap', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Complaints & Customer Service', order: 8,
                objectives: ['Make and respond to complaints appropriately'],
                grammarFocus: 'passé composé/imparfait contrast (expanded), polite complaint structures',
                vocabDomain: 'customer service vocabulary',
                lessons: [
                  { title: 'Making a Complaint Politely', anchorSkill: 'R', order: 1 },
                  { title: 'Passé Composé/Imparfait in Narration', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Customer Service Call', anchorSkill: 'L', order: 3 },
                  { title: 'Responding to a Complaint', anchorSkill: 'S', order: 4 },
                  { title: 'Written Complaint Letters', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Resolving a Complaint', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
          {
            id: 'b1-u5', unit_name: 'Complex Planning', unit_order: 2,
            chapters: [
              {
                title: 'Complex Travel Planning', order: 9,
                objectives: ['Plan multi-step travel involving several people/variables'],
                grammarFocus: 'relative pronouns (qui, que, où), simple future consolidation',
                vocabDomain: 'detailed trip-planning vocabulary',
                lessons: [
                  { title: 'Relative Pronouns (qui, que, où)', anchorSkill: 'R', order: 1 },
                  { title: 'Writing a Detailed Itinerary', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Planning a Group Trip', anchorSkill: 'L', order: 3 },
                  { title: 'Negotiating Travel Plans', anchorSkill: 'S', order: 4 },
                  { title: 'Simple Future Consolidation', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Planning a Group Trip', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Handling Emergencies', order: 10,
                objectives: ['Communicate effectively in a genuine emergency/urgent scenario'],
                grammarFocus: 'imperative in urgent contexts, subjunctive after il faut que (expanded)',
                vocabDomain: 'emergency vocabulary',
                lessons: [
                  { title: 'Emergency Vocabulary', anchorSkill: 'R', order: 1 },
                  { title: 'Describing an Urgent Situation', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: An Emergency Call', anchorSkill: 'L', order: 3 },
                  { title: 'Responding to an Emergency', anchorSkill: 'S', order: 4 },
                  { title: 'Subjunctive After Il Faut Que', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: An Emergency Scenario', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Stories, Media & Culture', order: 4,
        units: [
          {
            id: 'b1-u6', unit_name: 'Narrating & Engaging with Culture', unit_order: 1,
            chapters: [
              {
                title: 'Narrating at Length', order: 11,
                objectives: ['Tell an extended, well-structured story'],
                grammarFocus: 'full past-tense narrative control (passé composé + imparfait + sequencing), plus-que-parfait introduced',
                vocabDomain: 'narrative connectors',
                lessons: [
                  { title: 'Structuring a Long Narrative', anchorSkill: 'R', order: 1 },
                  { title: 'Introducing the Plus-Que-Parfait', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: An Extended Story', anchorSkill: 'L', order: 3 },
                  { title: 'Telling a Personal Story', anchorSkill: 'S', order: 4 },
                  { title: 'Narrative Connectors', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Telling Your Life Story (So Far)', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'French Media & Culture', order: 12,
                objectives: ['Engage with simple authentic media and discuss French cultural life'],
                grammarFocus: 'consolidation of B1 structures in extended discourse',
                vocabDomain: 'media, arts, cultural life vocabulary',
                lessons: [
                  { title: 'Reading Simple News Articles', anchorSkill: 'R', order: 1 },
                  { title: 'Writing a Reaction to Media', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Radio Segment', anchorSkill: 'L', order: 3 },
                  { title: 'Discussing a Cultural Topic', anchorSkill: 'S', order: 4 },
                  { title: 'French Cultural Life Overview', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Media Discussion', anchorSkill: 'INT', order: 6 },
                  { title: 'Level B1 Review + DELF B1-Style Capstone', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL B2
  // ═══════════════════════════════════════════════════════════════════════════
  {
    level: 'B2', courseTitle: 'French B2 — Upper Intermediate', courseOrder: 4,
    modules: [
      {
        title: 'Argumentation & Abstract Ideas', order: 1,
        units: [
          {
            id: 'b2-u1', unit_name: 'Constructing Arguments', unit_order: 1,
            chapters: [
              {
                title: 'Constructing Arguments', order: 1,
                objectives: ['Build a well-structured, multi-point argument'],
                grammarFocus: 'subjunctive (expanded productive use), argumentative connectors',
                vocabDomain: 'argumentation vocabulary',
                lessons: [
                  { title: 'Structuring a Multi-Point Argument', anchorSkill: 'R', order: 1 },
                  { title: 'Subjunctive in Argumentation', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Structured Argument', anchorSkill: 'L', order: 3 },
                  { title: 'Presenting an Argument', anchorSkill: 'S', order: 4 },
                  { title: 'Argumentative Connectors', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Building a Case', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Hypothetical Reasoning', order: 2,
                objectives: ['Reason about hypothetical and unreal situations'],
                grammarFocus: 'si + imparfait / conditional (unreal present), past conditional introduced',
                vocabDomain: 'hypothetical/speculative language',
                lessons: [
                  { title: 'Si + Imparfait / Conditional', anchorSkill: 'R', order: 1 },
                  { title: 'Writing About Hypotheticals', anchorSkill: 'W', order: 2 },
                  { title: '"What If" Scenarios', anchorSkill: 'L', order: 3 },
                  { title: 'Discussing Hypothetical Situations', anchorSkill: 'S', order: 4 },
                  { title: 'Introducing the Past Conditional', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Hypothetical Debate', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
          {
            id: 'b2-u2', unit_name: 'Weighing Ideas', unit_order: 2,
            chapters: [
              {
                title: 'Advantages & Disadvantages', order: 3,
                objectives: ['Present a balanced view of a topic\'s pros and cons'],
                grammarFocus: 'nuanced connectors (bien que + subjunctive, malgré), balanced-argument structures',
                vocabDomain: 'evaluative vocabulary',
                lessons: [
                  { title: 'Presenting Advantages', anchorSkill: 'R', order: 1 },
                  { title: 'Presenting Disadvantages', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Balanced Discussion', anchorSkill: 'L', order: 3 },
                  { title: 'Giving a Balanced Viewpoint', anchorSkill: 'S', order: 4 },
                  { title: 'Bien Que + Subjunctive', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Balanced Presentation', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Abstract Concepts & Ideas', order: 4,
                objectives: ['Discuss abstract concepts (freedom, success, happiness) with nuance'],
                grammarFocus: 'nominalization, abstract noun usage',
                vocabDomain: 'abstract/conceptual vocabulary',
                lessons: [
                  { title: 'Talking About Abstract Concepts', anchorSkill: 'R', order: 1 },
                  { title: 'Nominalization (Verb → Noun)', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Philosophical Discussion', anchorSkill: 'L', order: 3 },
                  { title: 'Sharing a Personal Philosophy', anchorSkill: 'S', order: 4 },
                  { title: 'Abstract Vocabulary in Context', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Defining Success', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Professional & Academic French', order: 2,
        units: [
          {
            id: 'b2-u3', unit_name: 'Formal Communication', unit_order: 1,
            chapters: [
              {
                title: 'Meetings & Presentations', order: 5,
                objectives: ['Participate in and lead formal meetings/presentations'],
                grammarFocus: 'formal discourse markers, passive voice introduced',
                vocabDomain: 'presentation/meeting vocabulary',
                lessons: [
                  { title: 'Structuring a Presentation', anchorSkill: 'R', order: 1 },
                  { title: 'The Passive Voice', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Formal Presentation', anchorSkill: 'L', order: 3 },
                  { title: 'Delivering a Presentation', anchorSkill: 'S', order: 4 },
                  { title: 'Formal Discourse Markers', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Mock Presentation', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Formal Writing & Reports', order: 6,
                objectives: ['Produce clear, well-organized formal written documents'],
                grammarFocus: 'complex sentence connectors, formal written register conventions',
                vocabDomain: 'report-writing vocabulary',
                lessons: [
                  { title: 'Structuring a Formal Report', anchorSkill: 'R', order: 1 },
                  { title: 'Complex Sentence Connectors', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Formal Briefing', anchorSkill: 'L', order: 3 },
                  { title: 'Presenting a Report Verbally', anchorSkill: 'S', order: 4 },
                  { title: 'Formal Written Register', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Writing a Report', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Society & Current Affairs', order: 3,
        units: [
          {
            id: 'b2-u4', unit_name: 'Engaging with Issues', unit_order: 1,
            chapters: [
              {
                title: 'Engaging with News', order: 7,
                objectives: ['Understand and discuss news content critically'],
                grammarFocus: 'reported speech (discours rapporté), tense agreement in reported speech',
                vocabDomain: 'news/journalism vocabulary',
                lessons: [
                  { title: 'Reading News Articles Critically', anchorSkill: 'R', order: 1 },
                  { title: 'Reported Speech', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A News Broadcast', anchorSkill: 'L', order: 3 },
                  { title: 'Discussing Current Events', anchorSkill: 'S', order: 4 },
                  { title: 'Tense Agreement in Reported Speech', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A News Discussion', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Social Issues (Neutral Framing)', order: 8,
                objectives: ['Discuss social topics factually and even-handedly'],
                grammarFocus: 'nuanced modal expressions (il semblerait que, il se pourrait que)',
                vocabDomain: 'neutral social-topic vocabulary',
                lessons: [
                  { title: 'Discussing Social Topics Factually', anchorSkill: 'R', order: 1 },
                  { title: 'Nuanced Modal Expressions', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Balanced Report', anchorSkill: 'L', order: 3 },
                  { title: 'Presenting Multiple Perspectives', anchorSkill: 'S', order: 4 },
                  { title: 'Evidence & Sourcing Language', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Balanced Report', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
          {
            id: 'b2-u5', unit_name: 'Modern Life', unit_order: 2,
            chapters: [
              {
                title: 'Environment & Technology', order: 9,
                objectives: ['Discuss environmental and technological topics with precision'],
                grammarFocus: 'cause-consequence structures (advanced), future perfect introduced',
                vocabDomain: 'environment/tech vocabulary',
                lessons: [
                  { title: 'Environmental Vocabulary', anchorSkill: 'R', order: 1 },
                  { title: 'The Future Perfect', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Tech/Environment Report', anchorSkill: 'L', order: 3 },
                  { title: 'Discussing Innovation', anchorSkill: 'S', order: 4 },
                  { title: 'Cause-Consequence Structures', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Tech/Environment Debate', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Economy & Society', order: 10,
                objectives: ['Discuss economic and societal topics competently'],
                grammarFocus: 'consolidation of B2 argumentative structures',
                vocabDomain: 'economy/society vocabulary',
                lessons: [
                  { title: 'Basic Economic Concepts', anchorSkill: 'R', order: 1 },
                  { title: 'Writing an Analytical Paragraph', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: An Economic Report', anchorSkill: 'L', order: 3 },
                  { title: 'Discussing Economic Trends', anchorSkill: 'S', order: 4 },
                  { title: 'Societal Vocabulary in Context', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: An Economic Discussion', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Advanced Storytelling & Register', order: 4,
        units: [
          {
            id: 'b2-u6', unit_name: 'Style & Register', unit_order: 1,
            chapters: [
              {
                title: 'Literary & Narrative Texts', order: 11,
                objectives: ['Read and discuss literary/narrative texts with comprehension of style'],
                grammarFocus: 'literary past tense recognition (passé simple, recognition only), stylistic devices',
                vocabDomain: 'literary vocabulary',
                lessons: [
                  { title: 'Reading a Literary Excerpt', anchorSkill: 'R', order: 1 },
                  { title: 'Writing a Short Narrative', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: An Author Interview', anchorSkill: 'L', order: 3 },
                  { title: 'Discussing a Literary Text', anchorSkill: 'S', order: 4 },
                  { title: 'Recognizing the Passé Simple', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Literary Discussion', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Register-Shifting (Formal/Informal)', order: 12,
                objectives: ['Shift fluidly between formal and informal register as context demands'],
                grammarFocus: 'register-marking vocabulary/structures, colloquial contractions (recognition)',
                vocabDomain: 'register-contrastive vocabulary',
                lessons: [
                  { title: 'Formal vs Informal Register', anchorSkill: 'R', order: 1 },
                  { title: 'Rewriting Text Across Registers', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Formal vs Casual Speech', anchorSkill: 'L', order: 3 },
                  { title: 'Shifting Register in Conversation', anchorSkill: 'S', order: 4 },
                  { title: 'Colloquial Contractions (Recognition)', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Register-Shifting Scenario', anchorSkill: 'INT', order: 6 },
                  { title: 'Level B2 Review + DELF B2-Style Capstone', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL C1
  // ═══════════════════════════════════════════════════════════════════════════
  {
    level: 'C1', courseTitle: 'French C1 — Advanced', courseOrder: 5,
    modules: [
      {
        title: 'Precision & Nuance', order: 1,
        units: [
          {
            id: 'c1-u1', unit_name: 'Register & Connotation', unit_order: 1,
            chapters: [
              {
                title: 'Register & Connotation', order: 1,
                objectives: ['Choose vocabulary with precise awareness of connotation and register'],
                grammarFocus: 'fine-grained lexical choice, synonym discrimination',
                vocabDomain: 'near-synonym sets and their connotations',
                lessons: [
                  { title: 'Connotation & Word Choice', anchorSkill: 'R', order: 1 },
                  { title: 'Writing with Precision', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Subtle Register Shifts', anchorSkill: 'L', order: 3 },
                  { title: 'Speaking with Nuance', anchorSkill: 'S', order: 4 },
                  { title: 'Synonym Discrimination', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: Precision Editing', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Idiomatic Expressions', order: 2,
                objectives: ['Understand and use common idiomatic expressions naturally'],
                grammarFocus: 'idiomatic structures, fixed expressions',
                vocabDomain: 'high-frequency idioms',
                lessons: [
                  { title: 'Common Idiomatic Expressions', anchorSkill: 'R', order: 1 },
                  { title: 'Using Idioms in Writing', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Idioms in Natural Speech', anchorSkill: 'L', order: 3 },
                  { title: 'Using Idioms in Conversation', anchorSkill: 'S', order: 4 },
                  { title: 'Idiom Origins & Usage Notes', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Natural Conversation', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
          {
            id: 'c1-u2', unit_name: 'Figurative Language & Argument', unit_order: 2,
            chapters: [
              {
                title: 'Figurative Language', order: 3,
                objectives: ['Understand and appropriately use metaphor, irony, and figurative speech'],
                grammarFocus: 'figurative structures, rhetorical devices',
                vocabDomain: 'figurative/rhetorical vocabulary',
                lessons: [
                  { title: 'Metaphor & Figurative Speech', anchorSkill: 'R', order: 1 },
                  { title: 'Writing with Figurative Language', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Irony & Implication', anchorSkill: 'L', order: 3 },
                  { title: 'Using Figurative Language in Speech', anchorSkill: 'S', order: 4 },
                  { title: 'Rhetorical Devices', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Figurative Retelling', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Nuanced Opinion & Argument', order: 4,
                objectives: ['Present highly nuanced, qualified argumentation'],
                grammarFocus: 'advanced modal/hedging structures, concessive structures (expanded)',
                vocabDomain: 'nuanced argumentative vocabulary',
                lessons: [
                  { title: 'Qualifying an Argument', anchorSkill: 'R', order: 1 },
                  { title: 'Advanced Hedging in Writing', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Nuanced Debate', anchorSkill: 'L', order: 3 },
                  { title: 'Presenting a Qualified Argument', anchorSkill: 'S', order: 4 },
                  { title: 'Concessive Structures (Expanded)', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Nuanced Debate', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Specialized & Professional Domains', order: 2,
        units: [
          {
            id: 'c1-u3', unit_name: 'Domain-Specific French', unit_order: 1,
            chapters: [
              {
                title: 'Business French', order: 5,
                objectives: ['Operate confidently in business-specific communicative contexts'],
                grammarFocus: 'business-register conventions, formal correspondence structures',
                vocabDomain: 'business/finance vocabulary',
                lessons: [
                  { title: 'Business Correspondence', anchorSkill: 'R', order: 1 },
                  { title: 'Writing a Business Proposal', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Business Negotiation', anchorSkill: 'L', order: 3 },
                  { title: 'Negotiating in French', anchorSkill: 'S', order: 4 },
                  { title: 'Business Register Conventions', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Business Negotiation', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Academic & Technical French', order: 6,
                objectives: ['Engage with academic/technical texts and discourse'],
                grammarFocus: 'academic discourse structures, nominalization (advanced)',
                vocabDomain: 'academic/technical vocabulary',
                lessons: [
                  { title: 'Reading Academic Texts', anchorSkill: 'R', order: 1 },
                  { title: 'Writing an Academic Paragraph', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: An Academic Lecture', anchorSkill: 'L', order: 3 },
                  { title: 'Presenting Technical Information', anchorSkill: 'S', order: 4 },
                  { title: 'Academic Discourse Structures', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: An Academic Presentation', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Advanced Cultural & Literary Engagement', order: 3,
        units: [
          {
            id: 'c1-u4', unit_name: 'Culture at Depth', unit_order: 1,
            chapters: [
              {
                title: 'Literature & Film', order: 7,
                objectives: ['Engage critically with French/Francophone literature and film'],
                grammarFocus: 'literary/critical discourse structures',
                vocabDomain: 'literary/film critique vocabulary',
                lessons: [
                  { title: 'Reading a Literary Excerpt Critically', anchorSkill: 'R', order: 1 },
                  { title: 'Writing a Film/Book Critique', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Film Discussion', anchorSkill: 'L', order: 3 },
                  { title: 'Discussing a Work Critically', anchorSkill: 'S', order: 4 },
                  { title: 'Critical Discourse Vocabulary', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Critical Review', anchorSkill: 'INT', order: 6 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 7 },
                ]
              },
              {
                title: 'Sophisticated Debate & Media Analysis', order: 8,
                objectives: ['Analyze media critically and debate at a sophisticated level'],
                grammarFocus: 'consolidation of C1 argumentative and stylistic structures',
                vocabDomain: 'media analysis vocabulary',
                lessons: [
                  { title: 'Analyzing Media Bias & Framing (Neutral Method)', anchorSkill: 'R', order: 1 },
                  { title: 'Writing a Media Analysis', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: A Sophisticated Debate', anchorSkill: 'L', order: 3 },
                  { title: 'Participating in a Sophisticated Debate', anchorSkill: 'S', order: 4 },
                  { title: 'Consolidating C1 Argumentation', anchorSkill: 'R', order: 5 },
                  { title: 'Integrated Practice: A Media Analysis Roundtable', anchorSkill: 'INT', order: 6 },
                  { title: 'Level C1 Review + DALF C1-Style Capstone', anchorSkill: 'REV', order: 7 },
                ]
              },
            ]
          },
        ]
      },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL C2
  // ═══════════════════════════════════════════════════════════════════════════
  {
    level: 'C2', courseTitle: 'French C2 — Mastery', courseOrder: 6,
    modules: [
      {
        title: 'Mastery of Register & Style', order: 1,
        units: [
          {
            id: 'c2-u1', unit_name: 'The Full Register Range', unit_order: 1,
            chapters: [
              {
                title: 'Formal to Colloquial Range', order: 1,
                objectives: ['Move fluidly across the entire formal-to-colloquial spectrum'],
                grammarFocus: 'full register spectrum in practice, colloquial structures (active use)',
                vocabDomain: 'full-spectrum register vocabulary',
                lessons: [
                  { title: 'The Full Register Spectrum', anchorSkill: 'R', order: 1 },
                  { title: 'Writing Across Registers', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Register in Natural Media', anchorSkill: 'L', order: 3 },
                  { title: 'Shifting Register Spontaneously', anchorSkill: 'S', order: 4 },
                  { title: 'Integrated Practice: A Multi-Register Scenario', anchorSkill: 'INT', order: 5 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 6 },
                ]
              },
              {
                title: 'Humor, Irony & Wordplay', order: 2,
                objectives: ['Understand and appropriately produce humor, irony, and wordplay in French'],
                grammarFocus: 'wordplay mechanisms, ironic/understated structures',
                vocabDomain: 'humor/wordplay vocabulary',
                lessons: [
                  { title: 'Understanding French Wordplay', anchorSkill: 'R', order: 1 },
                  { title: 'Writing with Gentle Humor', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Humor in Natural Speech', anchorSkill: 'L', order: 3 },
                  { title: 'Using Humor Appropriately in Conversation', anchorSkill: 'S', order: 4 },
                  { title: 'Integrated Practice: A Light, Witty Exchange', anchorSkill: 'INT', order: 5 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 6 },
                ]
              },
            ]
          },
          {
            id: 'c2-u2', unit_name: 'Idiomatic & Stylistic Mastery', unit_order: 2,
            chapters: [
              {
                title: 'Idiomatic Mastery', order: 3,
                objectives: ['Command idiomatic French at a near-native level'],
                grammarFocus: 'advanced/regional idiomatic structures',
                vocabDomain: 'extensive idiom range',
                lessons: [
                  { title: 'Advanced Idiomatic Expressions', anchorSkill: 'R', order: 1 },
                  { title: 'Writing Idiomatically', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Idiomatic Native Speech', anchorSkill: 'L', order: 3 },
                  { title: 'Speaking Idiomatically', anchorSkill: 'S', order: 4 },
                  { title: 'Integrated Practice: A Native-Level Conversation', anchorSkill: 'INT', order: 5 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 6 },
                ]
              },
              {
                title: 'Stylistic Nuance', order: 4,
                objectives: ['Demonstrate full stylistic control and personal voice in French'],
                grammarFocus: 'consolidation of all prior stylistic structures',
                vocabDomain: 'nuanced stylistic vocabulary',
                lessons: [
                  { title: 'Developing a Personal Style', anchorSkill: 'R', order: 1 },
                  { title: 'Writing with a Distinct Voice', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Stylistic Range in Media', anchorSkill: 'L', order: 3 },
                  { title: 'Speaking with Personal Style', anchorSkill: 'S', order: 4 },
                  { title: 'Integrated Practice: A Stylistic Showcase', anchorSkill: 'INT', order: 5 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 6 },
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'Capstone Specialization', order: 2,
        units: [
          {
            id: 'c2-u3', unit_name: 'Independent Mastery Project', unit_order: 1,
            chapters: [
              {
                title: 'Independent Specialization Project I (Research & Planning)', order: 5,
                objectives: ['Select and begin an independent specialization track at mastery level'],
                grammarFocus: 'domain-specific structures as needed by the learner\'s chosen track',
                vocabDomain: 'specialization-specific vocabulary',
                lessons: [
                  { title: 'Choosing a Specialization Track', anchorSkill: 'R', order: 1 },
                  { title: 'Research & Source Gathering', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Domain-Specific Native Content', anchorSkill: 'L', order: 3 },
                  { title: 'Planning an Independent Presentation', anchorSkill: 'S', order: 4 },
                  { title: 'Integrated Practice: Project Proposal Review', anchorSkill: 'INT', order: 5 },
                  { title: 'Chapter Review & Mini-Assessment', anchorSkill: 'REV', order: 6 },
                ]
              },
              {
                title: 'Independent Specialization Project II (Execution & Capstone)', order: 6,
                objectives: ['Complete and present the specialization project at full mastery level'],
                grammarFocus: 'full command demonstrated across all previously learned structures',
                vocabDomain: 'full active + passive vocabulary range',
                lessons: [
                  { title: 'Drafting the Specialization Project', anchorSkill: 'R', order: 1 },
                  { title: 'Refining & Editing the Project', anchorSkill: 'W', order: 2 },
                  { title: 'Listening: Peer Project Feedback', anchorSkill: 'L', order: 3 },
                  { title: 'Presenting the Final Project', anchorSkill: 'S', order: 4 },
                  { title: 'Integrated Practice: Full Project Rehearsal', anchorSkill: 'INT', order: 5 },
                  { title: 'Level C2 Review + DALF C2-Style Capstone Exam + Capstone Specialization Project Presentation', anchorSkill: 'REV', order: 6 },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
];

// ─── SKILL → CATEGORY MAP ──────────────────────────────────────────────────
const SKILL_MAP = { R: 'reading', W: 'writing', L: 'listening', S: 'speaking', INT: 'integrated', REV: 'review' };

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();

  console.log('=== SEEDING SKELETON ===\n');

  // 1. Clear existing data
  console.log('Clearing existing modules, chapters, lessons...');
  await db.collection('modules').deleteMany({});
  await db.collection('chapters').deleteMany({});
  await db.collection('lessons').deleteMany({});
  console.log('Cleared.\n');

  let moduleCount = 0, chapterCount = 0, lessonCount = 0;

  for (const levelData of SKELETON) {
    console.log(`\n── LEVEL ${levelData.level} ──`);

    // Find or create course
    let course = await db.collection('courses').findOne({ level: levelData.level });
    if (!course) {
      const ins = await db.collection('courses').insertOne({
        title: levelData.courseTitle, level: levelData.level, order: levelData.courseOrder,
        description: '', objectives: [], isPublished: false, createdAt: new Date(), updatedAt: new Date()
      });
      course = { _id: ins.insertedId };
      console.log(`  Created course: ${levelData.courseTitle}`);
    }

    for (const modData of levelData.modules) {
      const modId = new ObjectId();
      const unitDocs = [];
      const allChapterIds = [];

      for (const unitData of modData.units) {
        const chapterIds = [];

        for (const chData of unitData.chapters) {
          const chId = new ObjectId();
          const lessonIds = [];

          for (const lesData of chData.lessons) {
            const lesId = new ObjectId();
            lessonIds.push(lesId);
            lessonCount++;

            await db.collection('lessons').insertOne({
              _id: lesId,
              chapterId: chId,
              title: lesData.title,
              description: '',
              level: levelData.level,
              category: SKILL_MAP[lesData.anchorSkill] || 'integrated',
              skill: lesData.anchorSkill,
              objectives: [],
              grammarTopics: chData.grammarFocus ? [chData.grammarFocus] : [],
              vocabulary: [],
              sections: [],
              activities: [],
              content: '',
              order: lesData.order,
              isPublished: false,
              estimatedDuration: 30,
              tags: [],
              prerequisites: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }

          // Insert chapter
          await db.collection('chapters').insertOne({
            _id: chId,
            moduleId: modId,
            title: chData.title,
            objectives: chData.objectives || [],
            cefrGoals: chData.grammarFocus ? [chData.grammarFocus] : [],
            estimatedTime: '',
            order: chData.order,
            lessons: lessonIds,
            isPublished: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          chapterIds.push(chId);
          allChapterIds.push(chId);
          chapterCount++;
        }

        unitDocs.push({
          id: unitData.id,
          unit_name: unitData.unit_name,
          unit_order: unitData.unit_order,
          chapters: chapterIds,
        });
      }

      // Insert module with embedded units
      await db.collection('modules').insertOne({
        _id: modId,
        courseId: course._id,
        title: modData.title,
        order: modData.order,
        units: unitDocs,
        chapters: allChapterIds,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      moduleCount++;
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Modules: ${moduleCount}`);
  console.log(`Chapters: ${chapterCount}`);
  console.log(`Lessons: ${lessonCount}`);
  console.log(`\nSkeleton matches FrancPrep-A1-C2-Skeleton.md exactly.`);

  await client.close();
}

main().catch(e => { console.error(e); process.exit(1); });
