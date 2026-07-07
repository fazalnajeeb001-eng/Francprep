import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

// ── CEFR Level Info ──
const CEFR_INFO: Record<string, { name: string; desc: string }> = {
  A1: { name: 'French A1 — Beginner', desc: 'Can understand and use familiar everyday expressions and very basic phrases. Can introduce themselves and others, and can ask and answer simple questions about personal details.' },
  A2: { name: 'French A2 — Elementary', desc: 'Can understand sentences and frequently used expressions related to areas of immediate relevance. Can communicate in simple and routine tasks.' },
  B1: { name: 'French B1 — Intermediate', desc: 'Can understand the main points of clear standard input on familiar matters. Can deal with most situations likely to arise while travelling.' },
  B2: { name: 'French B2 — Upper Intermediate', desc: 'Can understand the main ideas of complex text on both concrete and abstract topics. Can interact with fluency and spontaneity.' },
  C1: { name: 'French C1 — Advanced', desc: 'Can understand a wide range of demanding, longer texts and recognise implicit meaning. Can express ideas fluently and spontaneously.' },
  C2: { name: 'French C2 — Mastery', desc: 'Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources.' },
};

// ── Curriculum Structure (from the skeleton) ──
// Each entry: [moduleTitle, unitTitle, chapterTitle, objective, grammar, vocabulary, [lessonTitle, anchor, category][]]
type LessonDef = [string, string, string, string, string, string, [string, string, string][]];
type ModuleDef = { title: string; unit: string; chapters: ChapterDef[] };
type ChapterDef = { title: string; objective: string; grammar: string; vocabulary: string; lessons: [string, string, string][] };

const LEVELS: Record<string, ModuleDef[]> = {
  A1: [
    { title: 'Module A1.1 — Self & Others', unit: 'Greetings & Identity', chapters: [
      { title: 'Greetings & First Contact', objective: 'Greet appropriately and manage basic social contact by time of day and formality.', grammar: 'être (present), formal/informal address', vocabulary: 'greetings, courtesy words, parts of the day',
        lessons: [
          ['Basic Greetings (Bonjour/Salut/Bonsoir)', 'R', 'grammar'],
          ['Introducing Yourself', 'S', 'speaking'],
          ['Asking Someone\'s Name', 'L', 'listening'],
          ['How Are You?', 'W', 'writing'],
          ['Polite Expressions', 'R', 'reading'],
          ['Formal vs Informal (Tu vs Vous)', 'L', 'listening'],
          ['Integrated Practice: A First Encounter', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Personal Information', objective: 'Exchange basic personal details.', grammar: 'avoir (present), question formation', vocabulary: 'numbers 0–20, nationalities, professions',
        lessons: [
          ['Age & Birthdate', 'R', 'reading'],
          ['Where Are You From?', 'S', 'speaking'],
          ['Nationality & Languages', 'L', 'listening'],
          ['Professions & Jobs', 'W', 'writing'],
          ['Contact Details (Phone, Email)', 'R', 'reading'],
          ['Asking Follow-Up Questions', 'L', 'listening'],
          ['Integrated Practice: Meeting Someone New', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Describing People & Family', objective: 'Describe physical appearance, personality, and immediate family.', grammar: 'adjective agreement, possessive adjectives', vocabulary: 'physical descriptors, personality traits, family members',
        lessons: [
          ['Physical Description', 'R', 'reading'],
          ['Personality Traits', 'S', 'speaking'],
          ['Colors & Clothing', 'L', 'listening'],
          ['Likes & Dislikes', 'W', 'writing'],
          ['Introducing Your Family', 'R', 'reading'],
          ['Describing Relationships', 'L', 'listening'],
          ['Integrated Practice: Describing a Photo', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module A1.2 — Daily Life & Immediate Needs', unit: 'Routines & Food', chapters: [
      { title: 'Daily Routines', objective: 'Describe a typical day.', grammar: 'reflexive verbs (present), adverbs of frequency', vocabulary: 'daily activities, time expressions',
        lessons: [
          ['Morning Routine', 'R', 'reading'],
          ['Reflexive Verbs in Action', 'W', 'writing'],
          ['Work/School Day', 'L', 'listening'],
          ['Evening & Bedtime', 'S', 'speaking'],
          ['Frequency & Habits', 'R', 'reading'],
          ['Describing Someone Else\'s Day', 'L', 'listening'],
          ['Integrated Practice: A Typical Day', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Food & Dining', objective: 'Discuss food preferences and order at a restaurant.', grammar: 'partitive articles, conditional of politeness', vocabulary: 'food, drink, restaurant expressions',
        lessons: [
          ['Basic Foods & Meals', 'R', 'reading'],
          ['Fruits, Vegetables & Drinks', 'W', 'writing'],
          ['Taste & Preferences', 'L', 'listening'],
          ['Ordering at a Restaurant', 'S', 'speaking'],
          ['Asking for the Bill', 'R', 'reading'],
          ['French Meal Customs', 'L', 'listening'],
          ['Integrated Practice: A Restaurant Visit', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Shopping & Money', objective: 'Shop and handle simple transactions.', grammar: 'demonstrative adjectives, numbers 21–100', vocabulary: 'shops, money, clothing sizes',
        lessons: [
          ['Shops & What They Sell', 'R', 'reading'],
          ['Asking Prices', 'W', 'writing'],
          ['Making a Purchase', 'L', 'listening'],
          ['Sizes, Colors & Preferences', 'S', 'speaking'],
          ['Comparing Products', 'R', 'reading'],
          ['Returns & Simple Complaints', 'L', 'listening'],
          ['Integrated Practice: A Shopping Trip', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Numbers, Time & Dates', objective: 'Tell time and discuss schedules/dates.', grammar: 'telling time, prepositions of time', vocabulary: 'days, months, seasons, clock time',
        lessons: [
          ['Telling Time', 'R', 'reading'],
          ['Days of the Week', 'W', 'writing'],
          ['Months & Seasons', 'L', 'listening'],
          ['Making Appointments', 'S', 'speaking'],
          ['Dates & Birthdays', 'R', 'reading'],
          ['Talking About Schedules', 'L', 'listening'],
          ['Integrated Practice: Planning a Week', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module A1.3 — Navigating the World', unit: 'Places & Directions', chapters: [
      { title: 'Places & Directions', objective: 'Navigate a town and ask for/give directions.', grammar: 'prepositions of place, imperative', vocabulary: 'city places, direction vocabulary',
        lessons: [
          ['City Places', 'R', 'reading'],
          ['Asking for Directions', 'S', 'speaking'],
          ['Giving Directions', 'L', 'listening'],
          ['Prepositions of Place', 'W', 'writing'],
          ['Public Transportation', 'R', 'reading'],
          ['Using a Map', 'L', 'listening'],
          ['Integrated Practice: Finding Your Way', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Weather & Nature', objective: 'Discuss weather and seasonal activities.', grammar: 'impersonal expressions, futur proche', vocabulary: 'weather terms, nature, seasonal activities',
        lessons: [
          ['Weather Expressions', 'R', 'reading'],
          ['Seasons & Temperature', 'W', 'writing'],
          ['Weather Forecasts', 'L', 'listening'],
          ['Talking About Plans (Futur Proche)', 'S', 'speaking'],
          ['Nature Vocabulary', 'R', 'reading'],
          ['Climate & French Regions', 'L', 'listening'],
          ['Integrated Practice: Planning Around Weather', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Health, Body & Leisure', objective: 'Describe health, minor ailments, and free-time activities.', grammar: 'avoir mal à, faire vs jouer, imperative', vocabulary: 'body parts, ailments, sports, hobbies',
        lessons: [
          ['Body Parts', 'R', 'reading'],
          ['Describing Symptoms', 'W', 'writing'],
          ['At the Doctor\'s', 'L', 'listening'],
          ['Sports & Hobbies', 'S', 'speaking'],
          ['Faire vs Jouer', 'R', 'reading'],
          ['Making Plans with Friends', 'L', 'listening'],
          ['Integrated Practice: Doctor & Weekend Plans', 'INT', 'vocabulary'],
          ['Module 3 & Level A1 Review + DELF A1-Style Capstone', 'REV', 'grammar'],
        ]},
    ]},
  ],
  // For A2-C2, I'll include the full structure from the skeleton
  // (Truncated here for brevity — full script has all levels)
  A2: [
    { title: 'Module A2.1 — Home & Community', unit: 'Housing & Neighborhood', chapters: [
      { title: 'Housing & Home', objective: 'Describe where and how you live.', grammar: 'il y a, prepositions of location', vocabulary: 'rooms, furniture, housing types',
        lessons: [
          ['Types of Housing', 'R', 'reading'],
          ['Describing Your Home', 'W', 'writing'],
          ['Rooms & Furniture', 'L', 'listening'],
          ['Looking for an Apartment', 'S', 'speaking'],
          ['Comparing Homes', 'R', 'reading'],
          ['Household Chores', 'L', 'listening'],
          ['Integrated Practice: Apartment Hunting', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Neighborhood & Local Services', objective: 'Navigate local services and describe your neighborhood.', grammar: 'the pronoun "y", frequency adverbs', vocabulary: 'local services, neighborhood features',
        lessons: [
          ['Local Services', 'R', 'reading'],
          ['Describing Your Neighborhood', 'W', 'writing'],
          ['Errands & Appointments', 'L', 'listening'],
          ['Asking About Opening Hours', 'S', 'speaking'],
          ['The Pronoun "Y"', 'R', 'reading'],
          ['Comparing Neighborhoods', 'L', 'listening'],
          ['Integrated Practice: Running Errands', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Neighbors & Community', objective: 'Discuss community relationships and events.', grammar: 'pronoun "en", direct object pronouns', vocabulary: 'community roles, local events',
        lessons: [
          ['Meeting Your Neighbors', 'R', 'reading'],
          ['Direct Object Pronouns', 'W', 'writing'],
          ['Local Events & Festivals', 'L', 'listening'],
          ['Invitations to Community Events', 'S', 'speaking'],
          ['The Pronoun "En"', 'R', 'reading'],
          ['Community Rules & Etiquette', 'L', 'listening'],
          ['Integrated Practice: A Neighborhood Gathering', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Describing Your Town', objective: 'Give an overview of a town/city.', grammar: 'comparatives and superlatives', vocabulary: 'town features, opinions about places',
        lessons: [
          ['Town & City Features', 'R', 'reading'],
          ['Comparatives', 'W', 'writing'],
          ['Superlatives', 'L', 'listening'],
          ['Giving a Town Tour', 'S', 'speaking'],
          ['Comparing Two Towns', 'R', 'reading'],
          ['Opinions About Where You Live', 'L', 'listening'],
          ['Integrated Practice: Recommending a Town', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module A2.2 — Work & Routine Life', unit: 'Work & School', chapters: [
      { title: 'Jobs & Workplaces', objective: 'Describe your job and workplace.', grammar: 'indirect object pronouns', vocabulary: 'professions, workplace',
        lessons: [
          ['Describing Your Job', 'R', 'reading'],
          ['Indirect Object Pronouns', 'W', 'writing'],
          ['A Typical Workday', 'L', 'listening'],
          ['Talking About Colleagues', 'S', 'speaking'],
          ['Workplace Vocabulary', 'R', 'reading'],
          ['Discussing Job Satisfaction', 'L', 'listening'],
          ['Integrated Practice: A Day at Work', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'School & Studies', objective: 'Discuss education and studies.', grammar: 'imperative, depuis + present', vocabulary: 'school subjects, education system',
        lessons: [
          ['School Subjects', 'R', 'reading'],
          ['Talking About Your Studies', 'W', 'writing'],
          ['The French Education System', 'L', 'listening'],
          ['Giving Study Advice', 'S', 'speaking'],
          ['Depuis + Present Tense', 'R', 'reading'],
          ['Comparing Education Systems', 'L', 'listening'],
          ['Integrated Practice: A School Day', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Past Routines & Habits', objective: 'Describe how things used to be.', grammar: 'imparfait', vocabulary: 'time markers for the past',
        lessons: [
          ['Introducing the Imparfait', 'R', 'reading'],
          ['Childhood Memories', 'W', 'writing'],
          ['How Things Used to Be', 'L', 'listening'],
          ['Describing Past Habits', 'S', 'speaking'],
          ['Imparfait of Common Verbs', 'R', 'reading'],
          ['Comparing Then and Now', 'L', 'listening'],
          ['Integrated Practice: When I Was a Child', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Comparing Then & Now', objective: 'Contrast past and present.', grammar: 'imparfait vs présent contrast', vocabulary: 'change-over-time expressions',
        lessons: [
          ['Life Then vs Life Now', 'R', 'reading'],
          ['Structuring a Comparison', 'W', 'writing'],
          ['Grandparents\' Stories', 'L', 'listening'],
          ['Talking About Change', 'S', 'speaking'],
          ['Time Adverbs & Connectors', 'R', 'reading'],
          ['Technology: Then and Now', 'L', 'listening'],
          ['Integrated Practice: A Generational Interview', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module A2.3 — Getting Around & Enjoying Life', unit: 'Travel & Past Events', chapters: [
      { title: 'Travel & Transport', objective: 'Plan and discuss travel.', grammar: 'passé composé (avoir verbs)', vocabulary: 'transportation, travel planning',
        lessons: [
          ['Modes of Transport', 'R', 'reading'],
          ['Introducing the Passé Composé', 'W', 'writing'],
          ['Buying Tickets', 'L', 'listening'],
          ['Describing a Trip You Took', 'S', 'speaking'],
          ['Passé Composé with Avoir', 'R', 'reading'],
          ['Travel Problems & Delays', 'L', 'listening'],
          ['Integrated Practice: Planning a Trip', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Narrating Past Events', objective: 'Narrate a sequence of past events.', grammar: 'passé composé with être', vocabulary: 'sequencing words',
        lessons: [
          ['Passé Composé with Être', 'R', 'reading'],
          ['Sequencing a Story', 'W', 'writing'],
          ['Listening to a Past Narrative', 'L', 'listening'],
          ['Telling a Story About Your Weekend', 'S', 'speaking'],
          ['Past Participle Agreement', 'R', 'reading'],
          ['A Memorable Event', 'L', 'listening'],
          ['Integrated Practice: Telling Your Story', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Hobbies & Free Time', objective: 'Discuss hobbies and leisure in depth.', grammar: 'verbs + infinitive constructions', vocabulary: 'hobbies, entertainment, arts',
        lessons: [
          ['Hobbies & Interests', 'R', 'reading'],
          ['Verb + Infinitive Constructions', 'W', 'writing'],
          ['Talking About Entertainment', 'L', 'listening'],
          ['Recommending an Activity', 'S', 'speaking'],
          ['Music, Film & Books', 'R', 'reading'],
          ['Discussing a Favorite Hobby', 'L', 'listening'],
          ['Integrated Practice: Planning a Free Day', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Making Plans', objective: 'Make and negotiate future plans.', grammar: 'futur proche consolidation', vocabulary: 'invitations, scheduling',
        lessons: [
          ['Making an Invitation', 'R', 'reading'],
          ['Accepting & Declining', 'W', 'writing'],
          ['Making Weekend Plans', 'L', 'listening'],
          ['Negotiating a Plan', 'S', 'speaking'],
          ['Futur Proche Consolidation', 'R', 'reading'],
          ['Rescheduling Politely', 'L', 'listening'],
          ['Integrated Practice: Planning a Group Outing', 'INT', 'vocabulary'],
          ['Level A2 Review + DELF A2-Style Capstone', 'REV', 'grammar'],
        ]},
    ]},
  ],
  B1: [
    { title: 'Module B1.1 — Opinions & Everyday Debate', unit: 'Expressing Views', chapters: [
      { title: 'Expressing Opinions', objective: 'State and support a personal opinion clearly.', grammar: 'penser que / croire que + indicative, opinion connectors', vocabulary: 'opinion verbs, hedging expressions',
        lessons: [
          ['Giving an Opinion', 'R', 'reading'],
          ['Opinion Connectors', 'W', 'writing'],
          ['Listening to Opinions', 'L', 'listening'],
          ['Stating and Defending a View', 'S', 'speaking'],
          ['Hedging & Softening Opinions', 'R', 'reading'],
          ['Integrated Practice: A Roundtable Discussion', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Agreeing & Disagreeing', objective: 'Agree/disagree politely and constructively.', grammar: 'subjunctive introduced (il faut que)', vocabulary: 'agreement/disagreement expressions',
        lessons: [
          ['Ways to Agree', 'R', 'reading'],
          ['Ways to Disagree Politely', 'W', 'writing'],
          ['A Friendly Debate', 'L', 'listening'],
          ['Disagreeing Respectfully', 'S', 'speaking'],
          ['Introducing the Subjunctive', 'R', 'reading'],
          ['Integrated Practice: A Civil Disagreement', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Giving Reasons & Justifying', objective: 'Justify a position with clear reasoning.', grammar: 'parce que / car / puisque, cause-effect structures', vocabulary: 'reasoning connectors',
        lessons: [
          ['Explaining Your Reasoning', 'R', 'reading'],
          ['Cause & Effect Connectors', 'W', 'writing'],
          ['A Justified Argument', 'L', 'listening'],
          ['Justifying a Decision', 'S', 'speaking'],
          ['Structuring an Argument', 'R', 'reading'],
          ['Integrated Practice: Justifying a Choice', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Debating Everyday Topics', objective: 'Engage in a structured debate.', grammar: 'contrastive connectors (cependant, en revanche)', vocabulary: 'everyday debate topics',
        lessons: [
          ['Structuring a Debate', 'R', 'reading'],
          ['Contrastive Connectors', 'W', 'writing'],
          ['A Structured Debate', 'L', 'listening'],
          ['Taking Part in a Debate', 'S', 'speaking'],
          ['Weighing Two Sides', 'R', 'reading'],
          ['Integrated Practice: A Class Debate', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module B1.2 — Work & Study Life', unit: 'Professional Communication', chapters: [
      { title: 'Professional Communication', objective: 'Communicate appropriately in a workplace context.', grammar: 'conditional (present) for polite requests', vocabulary: 'office/meeting vocabulary',
        lessons: [
          ['Workplace Communication Norms', 'R', 'reading'],
          ['The Conditional for Polite Requests', 'W', 'writing'],
          ['A Team Meeting', 'L', 'listening'],
          ['Participating in a Meeting', 'S', 'speaking'],
          ['Writing a Professional Email', 'R', 'reading'],
          ['Integrated Practice: A Workplace Scenario', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Job Interviews & CVs', objective: 'Prepare for and handle a job interview.', grammar: 'conditional (expanded), formal question forms', vocabulary: 'CV, interview language',
        lessons: [
          ['Writing a Simple CV', 'R', 'reading'],
          ['Interview Questions & Answers', 'W', 'writing'],
          ['A Mock Interview', 'L', 'listening'],
          ['Practicing an Interview', 'S', 'speaking'],
          ['Formal Question Forms', 'R', 'reading'],
          ['Integrated Practice: A Full Mock Interview', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module B1.3 — Travel & Real-World Problem-Solving', unit: 'Handling the Unexpected', chapters: [
      { title: 'Unplanned Situations', objective: 'Handle unexpected situations while traveling.', grammar: 'si + present, passé composé/imparfait contrast', vocabulary: 'travel mishaps, problem-solving language',
        lessons: [
          ['Common Travel Mishaps', 'R', 'reading'],
          ['Si + Present (Real Conditions)', 'W', 'writing'],
          ['A Travel Emergency', 'L', 'listening'],
          ['Explaining a Problem', 'S', 'speaking'],
          ['Passé Composé vs Imparfait', 'R', 'reading'],
          ['Integrated Practice: Handling a Mishap', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Complaints & Customer Service', objective: 'Make and respond to complaints.', grammar: 'passé composé/imparfait contrast (expanded)', vocabulary: 'customer service vocabulary',
        lessons: [
          ['Making a Complaint Politely', 'R', 'reading'],
          ['Passé Composé/Imparfait in Narration', 'W', 'writing'],
          ['A Customer Service Call', 'L', 'listening'],
          ['Responding to a Complaint', 'S', 'speaking'],
          ['Written Complaint Letters', 'R', 'reading'],
          ['Integrated Practice: Resolving a Complaint', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Complex Travel Planning', objective: 'Plan multi-step travel.', grammar: 'relative pronouns (qui, que, où), simple future', vocabulary: 'detailed trip-planning',
        lessons: [
          ['Relative Pronouns (qui, que, où)', 'R', 'reading'],
          ['Writing a Detailed Itinerary', 'W', 'writing'],
          ['Planning a Group Trip', 'L', 'listening'],
          ['Negotiating Travel Plans', 'S', 'speaking'],
          ['Simple Future Consolidation', 'R', 'reading'],
          ['Integrated Practice: Planning a Group Trip', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Handling Emergencies', objective: 'Communicate effectively in emergencies.', grammar: 'imperative in urgent contexts, subjunctive expanded', vocabulary: 'emergency vocabulary',
        lessons: [
          ['Emergency Vocabulary', 'R', 'reading'],
          ['Describing an Urgent Situation', 'W', 'writing'],
          ['An Emergency Call', 'L', 'listening'],
          ['Responding to an Emergency', 'S', 'speaking'],
          ['Subjunctive After Il Faut Que', 'R', 'reading'],
          ['Integrated Practice: An Emergency Scenario', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module B1.4 — Stories, Media & Culture', unit: 'Narrating & Engaging with Culture', chapters: [
      { title: 'Narrating at Length', objective: 'Tell an extended, well-structured story.', grammar: 'past-tense narrative control, plus-que-parfait', vocabulary: 'narrative connectors',
        lessons: [
          ['Structuring a Long Narrative', 'R', 'reading'],
          ['Introducing the Plus-Que-Parfait', 'W', 'writing'],
          ['An Extended Story', 'L', 'listening'],
          ['Telling a Personal Story', 'S', 'speaking'],
          ['Narrative Connectors', 'R', 'reading'],
          ['Integrated Practice: Telling Your Life Story', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'French Media & Culture', objective: 'Engage with simple authentic media.', grammar: 'consolidation of B1 structures', vocabulary: 'media, arts, cultural life',
        lessons: [
          ['Reading Simple News Articles', 'R', 'reading'],
          ['Writing a Reaction to Media', 'W', 'writing'],
          ['A Radio Segment', 'L', 'listening'],
          ['Discussing a Cultural Topic', 'S', 'speaking'],
          ['French Cultural Life Overview', 'R', 'reading'],
          ['Integrated Practice: A Media Discussion', 'INT', 'vocabulary'],
          ['Level B1 Review + DELF B1-Style Capstone', 'REV', 'grammar'],
        ]},
    ]},
  ],
  B2: [
    { title: 'Module B2.1 — Argumentation & Abstract Ideas', unit: 'Constructing Arguments', chapters: [
      { title: 'Constructing Arguments', objective: 'Build a multi-point argument.', grammar: 'subjunctive (expanded), argumentative connectors', vocabulary: 'argumentation vocabulary',
        lessons: [
          ['Structuring a Multi-Point Argument', 'R', 'reading'],
          ['Subjunctive in Argumentation', 'W', 'writing'],
          ['A Structured Argument', 'L', 'listening'],
          ['Presenting an Argument', 'S', 'speaking'],
          ['Argumentative Connectors', 'R', 'reading'],
          ['Integrated Practice: Building a Case', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Hypothetical Reasoning', objective: 'Reason about hypothetical situations.', grammar: 'si + imparfait / conditional, past conditional', vocabulary: 'hypothetical/speculative language',
        lessons: [
          ['Si + Imparfait / Conditional', 'R', 'reading'],
          ['Writing About Hypotheticals', 'W', 'writing'],
          ['"What If" Scenarios', 'L', 'listening'],
          ['Discussing Hypothetical Situations', 'S', 'speaking'],
          ['Introducing the Past Conditional', 'R', 'reading'],
          ['Integrated Practice: A Hypothetical Debate', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Advantages & Disadvantages', objective: 'Present a balanced view.', grammar: 'bien que + subjunctive, malgré', vocabulary: 'evaluative vocabulary',
        lessons: [
          ['Presenting Advantages', 'R', 'reading'],
          ['Presenting Disadvantages', 'W', 'writing'],
          ['A Balanced Discussion', 'L', 'listening'],
          ['Giving a Balanced Viewpoint', 'S', 'speaking'],
          ['Bien Que + Subjunctive', 'R', 'reading'],
          ['Integrated Practice: A Balanced Presentation', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Abstract Concepts & Ideas', objective: 'Discuss abstract concepts with nuance.', grammar: 'nominalization, abstract noun usage', vocabulary: 'abstract/conceptual vocabulary',
        lessons: [
          ['Talking About Abstract Concepts', 'R', 'reading'],
          ['Nominalization (Verb → Noun)', 'W', 'writing'],
          ['A Philosophical Discussion', 'L', 'listening'],
          ['Sharing a Personal Philosophy', 'S', 'speaking'],
          ['Abstract Vocabulary in Context', 'R', 'reading'],
          ['Integrated Practice: Defining Success', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module B2.2 — Professional & Academic French', unit: 'Formal Communication', chapters: [
      { title: 'Meetings & Presentations', objective: 'Participate in formal meetings/presentations.', grammar: 'passive voice, formal discourse markers', vocabulary: 'presentation/meeting vocabulary',
        lessons: [
          ['Structuring a Presentation', 'R', 'reading'],
          ['The Passive Voice', 'W', 'writing'],
          ['A Formal Presentation', 'L', 'listening'],
          ['Delivering a Presentation', 'S', 'speaking'],
          ['Formal Discourse Markers', 'R', 'reading'],
          ['Integrated Practice: A Mock Presentation', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Formal Writing & Reports', objective: 'Produce well-organized formal documents.', grammar: 'complex sentence connectors', vocabulary: 'report-writing vocabulary',
        lessons: [
          ['Structuring a Formal Report', 'R', 'reading'],
          ['Complex Sentence Connectors', 'W', 'writing'],
          ['A Formal Briefing', 'L', 'listening'],
          ['Presenting a Report Verbally', 'S', 'speaking'],
          ['Formal Written Register', 'R', 'reading'],
          ['Integrated Practice: Writing a Report', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module B2.3 — Society & Current Affairs', unit: 'Engaging with Issues', chapters: [
      { title: 'Engaging with News', objective: 'Understand and discuss news content.', grammar: 'reported speech, tense agreement', vocabulary: 'news/journalism vocabulary',
        lessons: [
          ['Reading News Articles Critically', 'R', 'reading'],
          ['Reported Speech', 'W', 'writing'],
          ['A News Broadcast', 'L', 'listening'],
          ['Discussing Current Events', 'S', 'speaking'],
          ['Tense Agreement in Reported Speech', 'R', 'reading'],
          ['Integrated Practice: A News Discussion', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Social Issues', objective: 'Discuss social topics factually.', grammar: 'nuanced modal expressions', vocabulary: 'social-topic vocabulary',
        lessons: [
          ['Discussing Social Topics Factually', 'R', 'reading'],
          ['Nuanced Modal Expressions', 'W', 'writing'],
          ['A Balanced Report', 'L', 'listening'],
          ['Presenting Multiple Perspectives', 'S', 'speaking'],
          ['Evidence & Sourcing Language', 'R', 'reading'],
          ['Integrated Practice: A Balanced Report', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Environment & Technology', objective: 'Discuss environmental/tech topics.', grammar: 'cause-consequence structures, future perfect', vocabulary: 'environment/tech vocabulary',
        lessons: [
          ['Environmental Vocabulary', 'R', 'reading'],
          ['The Future Perfect', 'W', 'writing'],
          ['A Tech/Environment Report', 'L', 'listening'],
          ['Discussing Innovation', 'S', 'speaking'],
          ['Cause-Consequence Structures', 'R', 'reading'],
          ['Integrated Practice: A Tech/Environment Debate', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Economy & Society', objective: 'Discuss economic topics competently.', grammar: 'consolidation of B2 argumentative structures', vocabulary: 'economy/society vocabulary',
        lessons: [
          ['Basic Economic Concepts', 'R', 'reading'],
          ['Writing an Analytical Paragraph', 'W', 'writing'],
          ['An Economic Report', 'L', 'listening'],
          ['Discussing Economic Trends', 'S', 'speaking'],
          ['Societal Vocabulary in Context', 'R', 'reading'],
          ['Integrated Practice: An Economic Discussion', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module B2.4 — Advanced Storytelling & Register', unit: 'Style & Register', chapters: [
      { title: 'Literary & Narrative Texts', objective: 'Read and discuss literary texts.', grammar: 'passé simple (recognition), stylistic devices', vocabulary: 'literary vocabulary',
        lessons: [
          ['Reading a Literary Excerpt', 'R', 'reading'],
          ['Writing a Short Narrative', 'W', 'writing'],
          ['An Author Interview', 'L', 'listening'],
          ['Discussing a Literary Text', 'S', 'speaking'],
          ['Recognizing the Passé Simple', 'R', 'reading'],
          ['Integrated Practice: A Literary Discussion', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Register-Shifting (Formal/Informal)', objective: 'Shift between formal and informal register.', grammar: 'register-marking vocabulary/structures', vocabulary: 'register-contrastive vocabulary',
        lessons: [
          ['Formal vs Informal Register', 'R', 'reading'],
          ['Rewriting Text Across Registers', 'W', 'writing'],
          ['Formal vs Casual Speech', 'L', 'listening'],
          ['Shifting Register in Conversation', 'S', 'speaking'],
          ['Colloquial Contractions (Recognition)', 'R', 'reading'],
          ['Integrated Practice: A Register-Shifting Scenario', 'INT', 'vocabulary'],
          ['Level B2 Review + DELF B2-Style Capstone', 'REV', 'grammar'],
        ]},
    ]},
  ],
  C1: [
    { title: 'Module C1.1 — Precision & Nuance', unit: 'Register & Connotation', chapters: [
      { title: 'Register & Connotation', objective: 'Choose vocabulary with precise awareness of connotation.', grammar: 'fine-grained lexical choice, synonym discrimination', vocabulary: 'near-synonym sets',
        lessons: [
          ['Connotation & Word Choice', 'R', 'reading'],
          ['Writing with Precision', 'W', 'writing'],
          ['Subtle Register Shifts', 'L', 'listening'],
          ['Speaking with Nuance', 'S', 'speaking'],
          ['Synonym Discrimination', 'R', 'reading'],
          ['Integrated Practice: Precision Editing', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Idiomatic Expressions', objective: 'Use common idiomatic expressions naturally.', grammar: 'idiomatic structures, fixed expressions', vocabulary: 'high-frequency idioms',
        lessons: [
          ['Common Idiomatic Expressions', 'R', 'reading'],
          ['Using Idioms in Writing', 'W', 'writing'],
          ['Idioms in Natural Speech', 'L', 'listening'],
          ['Using Idioms in Conversation', 'S', 'speaking'],
          ['Idiom Origins & Usage Notes', 'R', 'reading'],
          ['Integrated Practice: A Natural Conversation', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Figurative Language', objective: 'Use metaphor, irony, and figurative speech.', grammar: 'figurative structures, rhetorical devices', vocabulary: 'figurative/rhetorical vocabulary',
        lessons: [
          ['Metaphor & Figurative Speech', 'R', 'reading'],
          ['Writing with Figurative Language', 'W', 'writing'],
          ['Irony & Implication', 'L', 'listening'],
          ['Using Figurative Language in Speech', 'S', 'speaking'],
          ['Rhetorical Devices', 'R', 'reading'],
          ['Integrated Practice: A Figurative Retelling', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Nuanced Opinion & Argument', objective: 'Present highly nuanced argumentation.', grammar: 'advanced modal/hedging structures', vocabulary: 'nuanced argumentative vocabulary',
        lessons: [
          ['Qualifying an Argument', 'R', 'reading'],
          ['Advanced Hedging in Writing', 'W', 'writing'],
          ['A Nuanced Debate', 'L', 'listening'],
          ['Presenting a Qualified Argument', 'S', 'speaking'],
          ['Concessive Structures (Expanded)', 'R', 'reading'],
          ['Integrated Practice: A Nuanced Debate', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module C1.2 — Specialized & Professional Domains', unit: 'Domain-Specific French', chapters: [
      { title: 'Business French', objective: 'Operate in business-specific contexts.', grammar: 'business-register conventions', vocabulary: 'business/finance vocabulary',
        lessons: [
          ['Business Correspondence', 'R', 'reading'],
          ['Writing a Business Proposal', 'W', 'writing'],
          ['A Business Negotiation', 'L', 'listening'],
          ['Negotiating in French', 'S', 'speaking'],
          ['Business Register Conventions', 'R', 'reading'],
          ['Integrated Practice: A Business Negotiation', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Academic & Technical French', objective: 'Engage with academic/technical texts.', grammar: 'academic discourse structures', vocabulary: 'academic/technical vocabulary',
        lessons: [
          ['Reading Academic Texts', 'R', 'reading'],
          ['Writing an Academic Paragraph', 'W', 'writing'],
          ['An Academic Lecture', 'L', 'listening'],
          ['Presenting Technical Information', 'S', 'speaking'],
          ['Academic Discourse Structures', 'R', 'reading'],
          ['Integrated Practice: An Academic Presentation', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module C1.3 — Advanced Cultural & Literary Engagement', unit: 'Culture at Depth', chapters: [
      { title: 'Literature & Film', objective: 'Engage critically with literature and film.', grammar: 'literary/critical discourse structures', vocabulary: 'literary/film critique vocabulary',
        lessons: [
          ['Reading a Literary Excerpt Critically', 'R', 'reading'],
          ['Writing a Film/Book Critique', 'W', 'writing'],
          ['A Film Discussion', 'L', 'listening'],
          ['Discussing a Work Critically', 'S', 'speaking'],
          ['Critical Discourse Vocabulary', 'R', 'reading'],
          ['Integrated Practice: A Critical Review', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Sophisticated Debate & Media Analysis', objective: 'Analyze media critically.', grammar: 'C1 argumentative structures', vocabulary: 'media analysis vocabulary',
        lessons: [
          ['Analyzing Media Bias & Framing', 'R', 'reading'],
          ['Writing a Media Analysis', 'W', 'writing'],
          ['A Sophisticated Debate', 'L', 'listening'],
          ['Participating in a Sophisticated Debate', 'S', 'speaking'],
          ['Consolidating C1 Argumentation', 'R', 'reading'],
          ['Integrated Practice: A Media Analysis Roundtable', 'INT', 'vocabulary'],
          ['Level C1 Review + DALF C1-Style Capstone', 'REV', 'grammar'],
        ]},
    ]},
  ],
  C2: [
    { title: 'Module C2.1 — Mastery of Register & Style', unit: 'The Full Register Range', chapters: [
      { title: 'Formal to Colloquial Range', objective: 'Move fluidly across the register spectrum.', grammar: 'full register spectrum, colloquial structures', vocabulary: 'full-spectrum register vocabulary',
        lessons: [
          ['The Full Register Spectrum', 'R', 'reading'],
          ['Writing Across Registers', 'W', 'writing'],
          ['Register in Natural Media', 'L', 'listening'],
          ['Shifting Register Spontaneously', 'S', 'speaking'],
          ['Integrated Practice: A Multi-Register Scenario', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Humor, Irony & Wordplay', objective: 'Understand and produce humor, irony, wordplay.', grammar: 'wordplay mechanisms, ironic structures', vocabulary: 'humor/wordplay vocabulary',
        lessons: [
          ['Understanding French Wordplay', 'R', 'reading'],
          ['Writing with Gentle Humor', 'W', 'writing'],
          ['Humor in Natural Speech', 'L', 'listening'],
          ['Using Humor in Conversation', 'S', 'speaking'],
          ['Integrated Practice: A Light, Witty Exchange', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Idiomatic Mastery', objective: 'Command idiomatic French at near-native level.', grammar: 'advanced/regional idiomatic structures', vocabulary: 'extensive idiom range',
        lessons: [
          ['Advanced Idiomatic Expressions', 'R', 'reading'],
          ['Writing Idiomatically', 'W', 'writing'],
          ['Idiomatic Native Speech', 'L', 'listening'],
          ['Speaking Idiomatically', 'S', 'speaking'],
          ['Integrated Practice: A Native-Level Conversation', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Stylistic Nuance', objective: 'Demonstrate full stylistic control.', grammar: 'consolidation of all stylistic structures', vocabulary: 'nuanced stylistic vocabulary',
        lessons: [
          ['Developing a Personal Style', 'R', 'reading'],
          ['Writing with a Distinct Voice', 'W', 'writing'],
          ['Stylistic Range in Media', 'L', 'listening'],
          ['Speaking with Personal Style', 'S', 'speaking'],
          ['Integrated Practice: A Stylistic Showcase', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
    ]},
    { title: 'Module C2.2 — Capstone Specialization', unit: 'Independent Mastery Project', chapters: [
      { title: 'Independent Specialization Project I', objective: 'Begin an independent specialization track.', grammar: 'domain-specific structures', vocabulary: 'specialization-specific vocabulary',
        lessons: [
          ['Choosing a Specialization Track', 'R', 'reading'],
          ['Research & Source Gathering', 'W', 'writing'],
          ['Domain-Specific Native Content', 'L', 'listening'],
          ['Planning an Independent Presentation', 'S', 'speaking'],
          ['Integrated Practice: Project Proposal Review', 'INT', 'vocabulary'],
          ['Chapter Review & Mini-Assessment', 'REV', 'grammar'],
        ]},
      { title: 'Independent Specialization Project II', objective: 'Complete and present the specialization project.', grammar: 'full command across all structures', vocabulary: 'full active + passive range',
        lessons: [
          ['Drafting the Specialization Project', 'R', 'reading'],
          ['Refining & Editing the Project', 'W', 'writing'],
          ['Peer Project Feedback', 'L', 'listening'],
          ['Presenting the Final Project', 'S', 'speaking'],
          ['Integrated Practice: Full Project Rehearsal', 'INT', 'vocabulary'],
          ['Level C2 Review + DALF C2-Style Capstone', 'REV', 'grammar'],
        ]},
    ]},
  ],
};

// ── Lesson Content Generator ──
function generateLessonSections(level: string, chapter: string, lessonTitle: string, anchor: string, grammar: string, vocab: string) {
  const sections: any[] = [];

  // Reading section
  sections.push({
    type: 'reading',
    title: `Reading: ${lessonTitle}`,
    body: `[Reading passage for "${lessonTitle}" at ${level} level — focusing on vocabulary: ${vocab}]\n\nThis passage practices the grammar point: ${grammar}. Complete the comprehension questions below.\n\n(Detailed reading content goes here — ${level} level, theme: ${chapter})`,
    translation: `[English translation of the reading passage]`,
  });

  // Listening section  
  sections.push({
    type: 'listening',
    title: `Listening: ${lessonTitle}`,
    body: `[Listening transcript for "${lessonTitle}"]\n\nDialogues and audio content related to ${vocab}. Focus on ${grammar}.\n\n(Full transcript with comprehension questions)`,
    translation: `[English translation of listening transcript]`,
    media: { audio: [] }, // Placeholder for audio files
  });

  // Speaking section
  sections.push({
    type: 'speaking',
    title: `Speaking: ${lessonTitle}`,
    body: `Role-play scenario: Using vocabulary from "${vocab}", practice a conversation about ${lessonTitle}.\n\nPronunciation tip: Focus on the sounds related to ${grammar}.\n\nPartner A: Start the conversation.\nPartner B: Respond appropriately.`,
  });

  // Writing section
  sections.push({
    type: 'writing',
    title: `Writing: ${lessonTitle}`,
    body: `Write a short text (${level === 'A1' ? '3-4' : level === 'A2' ? '4-6' : '6-8'} sentences) about "${lessonTitle}" using the vocabulary (${vocab}) and grammar (${grammar}) you've learned.\n\nModel answer:\n[Model answer demonstrating correct use of ${grammar} and ${vocab}]\n\nChecklist:\n✓ Did you use ${grammar} correctly?\n✓ Did you include vocabulary from ${vocab}?\n✓ Did you check your spelling and agreement?`,
  });

  // If review, add review section
  if (anchor === 'REV') {
    sections.push({
      type: 'review',
      title: `Self-Assessment: ${lessonTitle}`,
      body: `✓ I can understand the main points about ${vocab}\n✓ I can use ${grammar} in sentences\n✓ I can hold a conversation about ${chapter}\n✓ I can write about ${lessonTitle}`,
    });
  }

  // If integrated, add practice section
  if (anchor === 'INT') {
    sections.push({
      type: 'practice',
      title: `Integrated Practice: ${lessonTitle}`,
      body: `Combine all four skills in this integrated practice session about ${lessonTitle}.\n\n1. Read the scenario about ${chapter}\n2. Listen to the instructions\n3. Practice the speaking prompts\n4. Write your response\n\nThis exercise brings together everything you've learned about ${vocab} using ${grammar}.`,
    });
  }

  return sections;
}

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.\n');

  const db = mongoose.connection.db!;

  // Clear existing curriculum data
  console.log('Clearing existing curriculum data...');
  for (const col of ['courses', 'modules', 'chapters', 'lessons']) {
    const result = await db.collection(col).deleteMany({});
    console.log(`  Cleared ${result.deletedCount} documents from ${col}`);
  }

  let totalLessons = 0;

  // Process each level
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const) {
    const info = CEFR_INFO[level];
    const modules = LEVELS[level];
    if (!modules) continue;

    console.log(`\n=== ${level}: ${info.name} ===`);

    // Create course
    const courseDoc = {
      name: info.name,
      level,
      description: info.desc,
      modules: [] as mongoose.Types.ObjectId[],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const course = await db.collection('courses').insertOne(courseDoc);
    console.log(`  Created course: ${info.name} (${course.insertedId})`);

    for (const mod of modules) {
      // Create module
      const modDoc = {
        courseId: course.insertedId,
        title: mod.title,
        order: modules.indexOf(mod) + 1,
        chapters: [] as mongoose.Types.ObjectId[],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const moduleResult = await db.collection('modules').insertOne(modDoc);
      const chapterIds: mongoose.Types.ObjectId[] = [];

      for (const ch of mod.chapters) {
        // Create lessons for this chapter
        const lessonIds: mongoose.Types.ObjectId[] = [];
        for (const [lTitle, lAnchor, lCategory] of ch.lessons) {
          const sections = generateLessonSections(level, ch.title, lTitle, lAnchor, ch.grammar, ch.vocabulary);
          const lessonDoc = {
            chapterId: null as any, // Will set after chapter creation
            title: lTitle,
            description: `Lesson ${ch.lessons.indexOf([lTitle, lAnchor, lCategory]) + 1} of "${ch.title}" — ${lAnchor === 'R' ? 'Reading' : lAnchor === 'W' ? 'Writing' : lAnchor === 'L' ? 'Listening' : lAnchor === 'S' ? 'Speaking' : lAnchor === 'INT' ? 'Integrated' : 'Review'}`,
            level,
            category: lCategory,
            skill: lAnchor,
            objectives: [`Understand and use vocabulary related to ${ch.vocabulary}`, `Apply ${ch.grammar} correctly`, `Communicate effectively about ${ch.objective.toLowerCase()}`],
            grammarTopics: [ch.grammar],
            vocabulary: [],
            sections,
            activities: [],
            content: sections.map((s: any) => s.body).join('\n\n'),
            order: ch.lessons.indexOf([lTitle, lAnchor, lCategory]) + 1,
            isPublished: true,
            estimatedDuration: lAnchor === 'INT' || lAnchor === 'REV' ? 20 : 15,
            tags: [level, ch.vocabulary.split(',')[0].trim()],
            prerequisites: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          const lesson = await db.collection('lessons').insertOne(lessonDoc);
          lessonIds.push(lesson.insertedId);
          totalLessons++;
        }

        // Create chapter
        const chDoc = {
          moduleId: moduleResult.insertedId,
          title: ch.title,
          objectives: [ch.objective],
          cefrGoals: [ch.grammar, ch.vocabulary],
          estimatedTime: `${ch.lessons.length * 15} min`,
          order: mod.chapters.indexOf(ch) + 1,
          lessons: lessonIds,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const chapter = await db.collection('chapters').insertOne(chDoc);

        // Update lessons with chapterId
        await db.collection('lessons').updateMany(
          { _id: { $in: lessonIds } },
          { $set: { chapterId: chapter.insertedId } }
        );

        chapterIds.push(chapter.insertedId);
        console.log(`    Chapter ${mod.chapters.indexOf(ch) + 1}: "${ch.title}" — ${ch.lessons.length} lessons`);
      }

      // Update module with chapter references
      await db.collection('modules').updateOne(
        { _id: moduleResult.insertedId },
        { $set: { chapters: chapterIds } }
      );
    }

    // Update course with module references
    const moduleDocs = await db.collection('modules').find({ courseId: course.insertedId }).toArray();
    await db.collection('courses').updateOne(
      { _id: course.insertedId },
      { $set: { modules: moduleDocs.map(m => m._id) } }
    );
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`  Total lessons created: ${totalLessons}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});