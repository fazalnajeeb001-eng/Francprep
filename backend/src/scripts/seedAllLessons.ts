/**
 * Master seed script: Delete all lessons, re-seed A1 from markdown, create skeleton A2-C2.
 * Usage: cd backend && npx ts-node src/scripts/seedAllLessons.ts
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { importChapterMarkdown } from '../services/markdownImport.service';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';
const CHAPTERS_DIR = path.resolve(__dirname, '../../../full a1 content including ledger and course skeleton');

// ─── A1 Chapter markdown files ──────────────────────────────────────────────
const A1_CHAPTERS = [
  { level: 'A1', chapterNum: 1, filename: 'FrancPrep_A1_Chapter1_Greetings_First_Contact.md' },
  { level: 'A1', chapterNum: 2, filename: 'FrancPrep_A1_Chapter2_Personal_Information.md' },
  { level: 'A1', chapterNum: 3, filename: 'FrancPrep_A1_Chapter3_Describing_People_Family.md' },
  { level: 'A1', chapterNum: 4, filename: 'FrancPrep_A1_Chapter4_Daily_Routines.md' },
  { level: 'A1', chapterNum: 5, filename: 'FrancPrep_A1_Chapter5_Food_Dining.md' },
  { level: 'A1', chapterNum: 6, filename: 'FrancPreP_A1_Chapter6_Shopping_Money.md' },
  { level: 'A1', chapterNum: 7, filename: 'FrancPrep_A1_Chapter7_Numbers_Time_Dates.md' },
  { level: 'A1', chapterNum: 8, filename: 'FrancPrep_A1_Chapter8_Places_Directions.md' },
  { level: 'A1', chapterNum: 9, filename: 'FrancPrep_A1_Chapter9_Weather_Nature.md' },
  { level: 'A1', chapterNum: 10, filename: 'FrancPrep_A1_Chapter10_Health_Body_Leisure.md' },
];

// ─── Full skeleton: all levels, modules, units, chapters, lessons ───────────
// Parsed from FrancPreP-A1-C2-Skeleton.md
// anchorSkill: 'reading' | 'writing' | 'listening' | 'speaking' | 'integrated' | 'review'

interface SkeletonLesson {
  lessonNum: number;
  title: string;
  anchorSkill: 'reading' | 'writing' | 'listening' | 'speaking' | 'integrated' | 'review';
}

interface SkeletonChapter {
  level: string;
  chapterNum: number; // within the level
  globalChapterNum: number; // globally unique across all levels
  title: string;
  objective: string;
  grammarFocus: string;
  vocabularyFocus: string;
  lessons: SkeletonLesson[];
}

function buildSkeleton(): SkeletonChapter[] {
  const chapters: SkeletonChapter[] = [];
  let globalChapter = 0;

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL A2 — 12 chapters, 96 lessons (8 per chapter)
  // ═══════════════════════════════════════════════════════════════════════════

  // MODULE A2.1 — Home & Community
  // Unit A2.1.1 — Housing & Neighborhood
  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 1, globalChapterNum: globalChapter,
    title: 'Housing & Home',
    objective: 'Describe where and how you live',
    grammarFocus: 'il y a, prepositions of location (review + expansion)',
    vocabularyFocus: 'rooms, furniture, housing types',
    lessons: [
      { lessonNum: 1, title: 'Types of Housing', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Describing Your Home', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Rooms & Furniture', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Looking for an Apartment', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Comparing Homes', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Household Chores', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: Apartment Hunting', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 2, globalChapterNum: globalChapter,
    title: 'Neighborhood & Local Services',
    objective: 'Navigate local services and describe your neighborhood',
    grammarFocus: 'the pronoun "y", frequency adverbs (review + expansion)',
    vocabularyFocus: 'local services, neighborhood features',
    lessons: [
      { lessonNum: 1, title: 'Local Services (Post Office, Bank, etc.)', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Describing Your Neighborhood', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Errands & Appointments', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Asking About Opening Hours', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'The Pronoun "Y"', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Comparing Neighborhoods', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: Running Errands', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit A2.1.2 — Community Life
  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 3, globalChapterNum: globalChapter,
    title: 'Neighbors & Community',
    objective: 'Discuss community relationships and events',
    grammarFocus: 'the pronoun "en", direct object pronouns introduced',
    vocabularyFocus: 'community roles, local events',
    lessons: [
      { lessonNum: 1, title: 'Meeting Your Neighbors', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Direct Object Pronouns', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Local Events & Festivals', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Invitations to Community Events', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'The Pronoun "En"', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Community Rules & Etiquette', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: A Neighborhood Gathering', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 4, globalChapterNum: globalChapter,
    title: 'Describing Your Town',
    objective: 'Give an overview of a town/city to someone unfamiliar with it',
    grammarFocus: 'comparatives and superlatives',
    vocabularyFocus: 'town features, opinions about places',
    lessons: [
      { lessonNum: 1, title: 'Town & City Features', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Comparatives (plus/moins/aussi... que)', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Superlatives', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Giving a Town Tour', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Comparing Two Towns', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Opinions About Where You Live', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: Recommending a Town', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE A2.2 — Work & Routine Life
  // Unit A2.2.1 — Work & School
  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 5, globalChapterNum: globalChapter,
    title: 'Jobs & Workplaces',
    objective: 'Describe your job and workplace',
    grammarFocus: 'indirect object pronouns',
    vocabularyFocus: 'professions, workplace vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Describing Your Job', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Indirect Object Pronouns', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'A Typical Workday', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Talking About Colleagues', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Workplace Vocabulary', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Discussing Job Satisfaction', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: A Day at Work', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 6, globalChapterNum: globalChapter,
    title: 'School & Studies',
    objective: 'Discuss education and studies',
    grammarFocus: 'the imperative (expanded), depuis + present tense',
    vocabularyFocus: 'school subjects, education system vocabulary',
    lessons: [
      { lessonNum: 1, title: 'School Subjects', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Talking About Your Studies', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'The French Education System', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Giving Study Advice (Imperative)', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Depuis + Present Tense', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Comparing Education Systems', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: A School Day', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit A2.2.2 — The Past
  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 7, globalChapterNum: globalChapter,
    title: 'Past Routines & Habits',
    objective: 'Describe how things used to be',
    grammarFocus: 'imparfait (formation and use for habitual past)',
    vocabularyFocus: 'time markers for the past (avant, quand j\'étais...)',
    lessons: [
      { lessonNum: 1, title: 'Introducing the Imparfait', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Childhood Memories', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'How Things Used to Be', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Describing Past Habits', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Imparfait of Common Verbs', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Comparing Then and Now', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: When I Was a Child', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 8, globalChapterNum: globalChapter,
    title: 'Comparing Then & Now',
    objective: 'Contrast past and present in connected speech/writing',
    grammarFocus: 'imparfait vs présent contrast, adverbs of time',
    vocabularyFocus: 'change-over-time expressions',
    lessons: [
      { lessonNum: 1, title: 'Life Then vs Life Now', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Structuring a Comparison', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Grandparents\' Stories', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Talking About Change', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Time Adverbs & Connectors', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Technology: Then and Now', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: A Generational Interview', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE A2.3 — Getting Around & Enjoying Life
  // Unit A2.3.1 — Travel & Past Events
  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 9, globalChapterNum: globalChapter,
    title: 'Travel & Transport',
    objective: 'Plan and discuss travel',
    grammarFocus: 'passé composé (formation, avoir verbs)',
    vocabularyFocus: 'transportation, travel planning',
    lessons: [
      { lessonNum: 1, title: 'Modes of Transport', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Introducing the Passé Composé', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Buying Tickets', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Describing a Trip You Took', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Passé Composé with Avoir', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Travel Problems & Delays', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: Planning a Trip', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 10, globalChapterNum: globalChapter,
    title: 'Narrating Past Events',
    objective: 'Narrate a sequence of past events',
    grammarFocus: 'passé composé with être, agreement rules',
    vocabularyFocus: 'sequencing words (d\'abord, ensuite, enfin)',
    lessons: [
      { lessonNum: 1, title: 'Passé Composé with Être', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Sequencing a Story', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening to a Past Narrative', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Telling a Story About Your Weekend', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Past Participle Agreement', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'A Memorable Event', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: Telling Your Story', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit A2.3.2 — Free Time & Plans
  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 11, globalChapterNum: globalChapter,
    title: 'Hobbies & Free Time',
    objective: 'Discuss hobbies and leisure in depth',
    grammarFocus: 'verbs + infinitive constructions',
    vocabularyFocus: 'hobbies, entertainment, arts',
    lessons: [
      { lessonNum: 1, title: 'Hobbies & Interests', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Verb + Infinitive Constructions', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Talking About Entertainment', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Recommending an Activity', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Music, Film & Books', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Discussing a Favorite Hobby', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: Planning a Free Day', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'A2', chapterNum: 12, globalChapterNum: globalChapter,
    title: 'Making Plans',
    objective: 'Make and negotiate future plans',
    grammarFocus: 'futur proche (consolidation), accepting/declining invitations',
    vocabularyFocus: 'invitations, scheduling expressions',
    lessons: [
      { lessonNum: 1, title: 'Making an Invitation', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Accepting & Declining', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Making Weekend Plans', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Negotiating a Plan', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Futur Proche Consolidation', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Rescheduling Politely', anchorSkill: 'listening' },
      { lessonNum: 7, title: 'Integrated Practice: Planning a Group Outing', anchorSkill: 'integrated' },
      { lessonNum: 8, title: 'Level A2 Review + DELF A2-Style Capstone', anchorSkill: 'review' },
    ],
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL B1 — 12 chapters, 84 lessons (7 per chapter)
  // ═══════════════════════════════════════════════════════════════════════════

  // MODULE B1.1 — Opinions & Everyday Debate
  // Unit B1.1.1 — Expressing Views
  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 1, globalChapterNum: globalChapter,
    title: 'Expressing Opinions',
    objective: 'State and support a personal opinion clearly',
    grammarFocus: 'penser que / croire que + indicative, opinion connectors',
    vocabularyFocus: 'opinion verbs, hedging expressions',
    lessons: [
      { lessonNum: 1, title: 'Giving an Opinion', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Opinion Connectors', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening to Opinions', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Stating and Defending a View', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Hedging & Softening Opinions', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Roundtable Discussion', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 2, globalChapterNum: globalChapter,
    title: 'Agreeing & Disagreeing',
    objective: 'Agree/disagree politely and constructively',
    grammarFocus: 'subjunctive introduced (il faut que, high-frequency fixed expressions)',
    vocabularyFocus: 'agreement/disagreement expressions',
    lessons: [
      { lessonNum: 1, title: 'Ways to Agree', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Ways to Disagree Politely', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Friendly Debate', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Disagreeing Respectfully', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Introducing the Subjunctive', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Civil Disagreement', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit B1.1.2 — Reasoning & Debate
  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 3, globalChapterNum: globalChapter,
    title: 'Giving Reasons & Justifying',
    objective: 'Justify a position with clear reasoning',
    grammarFocus: 'parce que / car / puisque, cause-effect structures',
    vocabularyFocus: 'reasoning connectors',
    lessons: [
      { lessonNum: 1, title: 'Explaining Your Reasoning', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Cause & Effect Connectors', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Justified Argument', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Justifying a Decision', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Structuring an Argument', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Justifying a Choice', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 4, globalChapterNum: globalChapter,
    title: 'Debating Everyday Topics',
    objective: 'Engage in a structured debate on a familiar topic',
    grammarFocus: 'consolidation of opinion/subjunctive structures, contrastive connectors (cependant, en revanche)',
    vocabularyFocus: 'everyday debate topics',
    lessons: [
      { lessonNum: 1, title: 'Structuring a Debate', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Contrastive Connectors', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Structured Debate', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Taking Part in a Debate', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Weighing Two Sides', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Class Debate', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE B1.2 — Work & Study Life
  // Unit B1.2.1 — Professional Communication
  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 5, globalChapterNum: globalChapter,
    title: 'Professional Communication',
    objective: 'Communicate appropriately in a workplace context',
    grammarFocus: 'formal register markers, the conditional (present) for polite requests',
    vocabularyFocus: 'office/meeting vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Workplace Communication Norms', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'The Conditional for Polite Requests', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Team Meeting', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Participating in a Meeting', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Writing a Professional Email', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Workplace Scenario', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 6, globalChapterNum: globalChapter,
    title: 'Job Interviews & CVs',
    objective: 'Prepare for and handle a job interview',
    grammarFocus: 'conditional (expanded), question forms in formal register',
    vocabularyFocus: 'CV/résumé vocabulary, interview language',
    lessons: [
      { lessonNum: 1, title: 'Writing a Simple CV', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Interview Questions & Answers', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Mock Interview', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Practicing an Interview', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Formal Question Forms', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Full Mock Interview', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE B1.3 — Travel & Real-World Problem-Solving
  // Unit B1.3.1 — Handling the Unexpected
  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 7, globalChapterNum: globalChapter,
    title: 'Unplanned Situations',
    objective: 'Handle unexpected situations while traveling',
    grammarFocus: 'si + present (real conditions), past tenses review (passé composé/imparfait contrast begins)',
    vocabularyFocus: 'travel mishaps, problem-solving language',
    lessons: [
      { lessonNum: 1, title: 'Common Travel Mishaps', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Si + Present (Real Conditions)', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Travel Emergency', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Explaining a Problem', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Passé Composé vs Imparfait (Introduction)', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Handling a Mishap', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 8, globalChapterNum: globalChapter,
    title: 'Complaints & Customer Service',
    objective: 'Make and respond to complaints appropriately',
    grammarFocus: 'passé composé/imparfait contrast (expanded), polite complaint structures',
    vocabularyFocus: 'customer service vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Making a Complaint Politely', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Passé Composé/Imparfait in Narration', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Customer Service Call', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Responding to a Complaint', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Written Complaint Letters', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Resolving a Complaint', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit B1.3.2 — Complex Planning
  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 9, globalChapterNum: globalChapter,
    title: 'Complex Travel Planning',
    objective: 'Plan multi-step travel involving several people/variables',
    grammarFocus: 'relative pronouns (qui, que, où), simple future consolidation',
    vocabularyFocus: 'detailed trip-planning vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Relative Pronouns (qui, que, où)', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing a Detailed Itinerary', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Planning a Group Trip', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Negotiating Travel Plans', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Simple Future Consolidation', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Planning a Group Trip', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 10, globalChapterNum: globalChapter,
    title: 'Handling Emergencies',
    objective: 'Communicate effectively in a genuine emergency/urgent scenario',
    grammarFocus: 'imperative in urgent contexts, subjunctive after il faut que (expanded)',
    vocabularyFocus: 'emergency vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Emergency Vocabulary', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Describing an Urgent Situation', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: An Emergency Call', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Responding to an Emergency', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Subjunctive After Il Faut Que', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: An Emergency Scenario', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE B1.4 — Stories, Media & Culture
  // Unit B1.4.1 — Narrating & Engaging with Culture
  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 11, globalChapterNum: globalChapter,
    title: 'Narrating at Length',
    objective: 'Tell an extended, well-structured story',
    grammarFocus: 'full past-tense narrative control (passé composé + imparfait + sequencing), plus-que-parfait introduced',
    vocabularyFocus: 'narrative connectors',
    lessons: [
      { lessonNum: 1, title: 'Structuring a Long Narrative', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Introducing the Plus-Que-Parfait', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: An Extended Story', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Telling a Personal Story', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Narrative Connectors', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Telling Your Life Story (So Far)', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B1', chapterNum: 12, globalChapterNum: globalChapter,
    title: 'French Media & Culture',
    objective: 'Engage with simple authentic media and discuss French cultural life',
    grammarFocus: 'consolidation of B1 structures in extended discourse',
    vocabularyFocus: 'media, arts, cultural life vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Reading Simple News Articles', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing a Reaction to Media', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Radio Segment', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Discussing a Cultural Topic', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'French Cultural Life Overview', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Media Discussion', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Level B1 Review + DELF B1-Style Capstone', anchorSkill: 'review' },
    ],
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL B2 — 12 chapters, 84 lessons (7 per chapter)
  // ═══════════════════════════════════════════════════════════════════════════

  // MODULE B2.1 — Argumentation & Abstract Ideas
  // Unit B2.1.1 — Constructing Arguments
  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 1, globalChapterNum: globalChapter,
    title: 'Constructing Arguments',
    objective: 'Build a well-structured, multi-point argument',
    grammarFocus: 'subjunctive (expanded productive use), argumentative connectors',
    vocabularyFocus: 'argumentation vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Structuring a Multi-Point Argument', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Subjunctive in Argumentation', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Structured Argument', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Presenting an Argument', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Argumentative Connectors', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Building a Case', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 2, globalChapterNum: globalChapter,
    title: 'Hypothetical Reasoning',
    objective: 'Reason about hypothetical and unreal situations',
    grammarFocus: 'si + imparfait / conditional (unreal present), past conditional introduced',
    vocabularyFocus: 'hypothetical/speculative language',
    lessons: [
      { lessonNum: 1, title: 'Si + Imparfait / Conditional', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing About Hypotheticals', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: "What If" Scenarios', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Discussing Hypothetical Situations', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Introducing the Past Conditional', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Hypothetical Debate', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit B2.1.2 — Weighing Ideas
  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 3, globalChapterNum: globalChapter,
    title: 'Advantages & Disadvantages',
    objective: 'Present a balanced view of a topic\'s pros and cons',
    grammarFocus: 'nuanced connectors (bien que + subjunctive, malgré), balanced-argument structures',
    vocabularyFocus: 'evaluative vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Presenting Advantages', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Presenting Disadvantages', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Balanced Discussion', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Giving a Balanced Viewpoint', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Bien Que + Subjunctive', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Balanced Presentation', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 4, globalChapterNum: globalChapter,
    title: 'Abstract Concepts & Ideas',
    objective: 'Discuss abstract concepts (freedom, success, happiness) with nuance',
    grammarFocus: 'nominalization, abstract noun usage',
    vocabularyFocus: 'abstract/conceptual vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Talking About Abstract Concepts', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Nominalization (Verb → Noun)', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Philosophical Discussion', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Sharing a Personal Philosophy', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Abstract Vocabulary in Context', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Defining Success', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE B2.2 — Professional & Academic French
  // Unit B2.2.1 — Formal Communication
  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 5, globalChapterNum: globalChapter,
    title: 'Meetings & Presentations',
    objective: 'Participate in and lead formal meetings/presentations',
    grammarFocus: 'formal discourse markers, passive voice introduced',
    vocabularyFocus: 'presentation/meeting vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Structuring a Presentation', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'The Passive Voice', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Formal Presentation', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Delivering a Presentation', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Formal Discourse Markers', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Mock Presentation', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 6, globalChapterNum: globalChapter,
    title: 'Formal Writing & Reports',
    objective: 'Produce clear, well-organized formal written documents',
    grammarFocus: 'complex sentence connectors, formal written register conventions',
    vocabularyFocus: 'report-writing vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Structuring a Formal Report', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Complex Sentence Connectors', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Formal Briefing', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Presenting a Report Verbally', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Formal Written Register', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Writing a Report', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE B2.3 — Society & Current Affairs
  // Unit B2.3.1 — Engaging with Issues
  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 7, globalChapterNum: globalChapter,
    title: 'Engaging with News',
    objective: 'Understand and discuss news content critically',
    grammarFocus: 'reported speech (discours rapporté), tense agreement in reported speech',
    vocabularyFocus: 'news/journalism vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Reading News Articles Critically', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Reported Speech', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A News Broadcast', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Discussing Current Events', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Tense Agreement in Reported Speech', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A News Discussion', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 8, globalChapterNum: globalChapter,
    title: 'Social Issues (Neutral Framing)',
    objective: 'Discuss social topics factually and even-handedly',
    grammarFocus: 'nuanced modal expressions (il semblerait que, il se pourrait que)',
    vocabularyFocus: 'neutral social-topic vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Discussing Social Topics Factually', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Nuanced Modal Expressions', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Balanced Report', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Presenting Multiple Perspectives', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Evidence & Sourcing Language', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Balanced Report', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit B2.3.2 — Modern Life
  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 9, globalChapterNum: globalChapter,
    title: 'Environment & Technology',
    objective: 'Discuss environmental and technological topics with precision',
    grammarFocus: 'cause-consequence structures (advanced), future perfect introduced',
    vocabularyFocus: 'environment/tech vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Environmental Vocabulary', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'The Future Perfect', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Tech/Environment Report', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Discussing Innovation', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Cause-Consequence Structures', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Tech/Environment Debate', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 10, globalChapterNum: globalChapter,
    title: 'Economy & Society',
    objective: 'Discuss economic and societal topics competently',
    grammarFocus: 'consolidation of B2 argumentative structures',
    vocabularyFocus: 'economy/society vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Basic Economic Concepts', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing an Analytical Paragraph', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: An Economic Report', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Discussing Economic Trends', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Societal Vocabulary in Context', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: An Economic Discussion', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE B2.4 — Advanced Storytelling & Register
  // Unit B2.4.1 — Style & Register
  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 11, globalChapterNum: globalChapter,
    title: 'Literary & Narrative Texts',
    objective: 'Read and discuss literary/narrative texts with comprehension of style',
    grammarFocus: 'literary past tense recognition (passé simple, recognition only), stylistic devices',
    vocabularyFocus: 'literary vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Reading a Literary Excerpt', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing a Short Narrative', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: An Author Interview', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Discussing a Literary Text', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Recognizing the Passé Simple', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Literary Discussion', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'B2', chapterNum: 12, globalChapterNum: globalChapter,
    title: 'Register-Shifting (Formal/Informal)',
    objective: 'Shift fluidly between formal and informal register as context demands',
    grammarFocus: 'register-marking vocabulary/structures, colloquial contractions (recognition)',
    vocabularyFocus: 'register-contrastive vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Formal vs Informal Register', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Rewriting Text Across Registers', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Formal vs Casual Speech', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Shifting Register in Conversation', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Colloquial Contractions (Recognition)', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Register-Shifting Scenario', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Level B2 Review + DELF B2-Style Capstone', anchorSkill: 'review' },
    ],
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL C1 — 8 chapters, 56 lessons (7 per chapter)
  // ═══════════════════════════════════════════════════════════════════════════

  // MODULE C1.1 — Precision & Nuance
  // Unit C1.1.1 — Register & Connotation
  globalChapter++;
  chapters.push({
    level: 'C1', chapterNum: 1, globalChapterNum: globalChapter,
    title: 'Register & Connotation',
    objective: 'Choose vocabulary with precise awareness of connotation and register',
    grammarFocus: 'fine-grained lexical choice, synonym discrimination',
    vocabularyFocus: 'near-synonym sets and their connotations',
    lessons: [
      { lessonNum: 1, title: 'Connotation & Word Choice', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing with Precision', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Subtle Register Shifts', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Speaking with Nuance', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Synonym Discrimination', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: Precision Editing', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'C1', chapterNum: 2, globalChapterNum: globalChapter,
    title: 'Idiomatic Expressions',
    objective: 'Understand and use common idiomatic expressions naturally',
    grammarFocus: 'idiomatic structures, fixed expressions',
    vocabularyFocus: 'high-frequency idioms',
    lessons: [
      { lessonNum: 1, title: 'Common Idiomatic Expressions', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Using Idioms in Writing', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Idioms in Natural Speech', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Using Idioms in Conversation', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Idiom Origins & Usage Notes', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Natural Conversation', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit C1.1.2 — Figurative Language & Argument
  globalChapter++;
  chapters.push({
    level: 'C1', chapterNum: 3, globalChapterNum: globalChapter,
    title: 'Figurative Language',
    objective: 'Understand and appropriately use metaphor, irony, and figurative speech',
    grammarFocus: 'figurative structures, rhetorical devices',
    vocabularyFocus: 'figurative/rhetorical vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Metaphor & Figurative Speech', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing with Figurative Language', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Irony & Implication', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Using Figurative Language in Speech', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Rhetorical Devices', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Figurative Retelling', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'C1', chapterNum: 4, globalChapterNum: globalChapter,
    title: 'Nuanced Opinion & Argument',
    objective: 'Present highly nuanced, qualified argumentation',
    grammarFocus: 'advanced modal/hedging structures, concessive structures (expanded)',
    vocabularyFocus: 'nuanced argumentative vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Qualifying an Argument', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Advanced Hedging in Writing', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Nuanced Debate', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Presenting a Qualified Argument', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Concessive Structures (Expanded)', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Nuanced Debate', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE C1.2 — Specialized & Professional Domains
  // Unit C1.2.1 — Domain-Specific French
  globalChapter++;
  chapters.push({
    level: 'C1', chapterNum: 5, globalChapterNum: globalChapter,
    title: 'Business French',
    objective: 'Operate confidently in business-specific communicative contexts',
    grammarFocus: 'business-register conventions, formal correspondence structures',
    vocabularyFocus: 'business/finance vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Business Correspondence', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing a Business Proposal', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Business Negotiation', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Negotiating in French', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Business Register Conventions', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Business Negotiation', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'C1', chapterNum: 6, globalChapterNum: globalChapter,
    title: 'Academic & Technical French',
    objective: 'Engage with academic/technical texts and discourse',
    grammarFocus: 'academic discourse structures, nominalization (advanced)',
    vocabularyFocus: 'academic/technical vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Reading Academic Texts', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing an Academic Paragraph', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: An Academic Lecture', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Presenting Technical Information', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Academic Discourse Structures', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: An Academic Presentation', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE C1.3 — Advanced Cultural & Literary Engagement
  // Unit C1.3.1 — Culture at Depth
  globalChapter++;
  chapters.push({
    level: 'C1', chapterNum: 7, globalChapterNum: globalChapter,
    title: 'Literature & Film',
    objective: 'Engage critically with French/Francophone literature and film',
    grammarFocus: 'literary/critical discourse structures',
    vocabularyFocus: 'literary/film critique vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Reading a Literary Excerpt Critically', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing a Film/Book Critique', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Film Discussion', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Discussing a Work Critically', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Critical Discourse Vocabulary', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Critical Review', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'C1', chapterNum: 8, globalChapterNum: globalChapter,
    title: 'Sophisticated Debate & Media Analysis',
    objective: 'Analyze media critically and debate at a sophisticated level',
    grammarFocus: 'consolidation of C1 argumentative and stylistic structures',
    vocabularyFocus: 'media analysis vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Analyzing Media Bias & Framing (Neutral Method)', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing a Media Analysis', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: A Sophisticated Debate', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Participating in a Sophisticated Debate', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Consolidating C1 Argumentation', anchorSkill: 'reading' },
      { lessonNum: 6, title: 'Integrated Practice: A Media Analysis Roundtable', anchorSkill: 'integrated' },
      { lessonNum: 7, title: 'Level C1 Review + DALF C1-Style Capstone', anchorSkill: 'review' },
    ],
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL C2 — 6 chapters, 36 lessons (6 per chapter)
  // ═══════════════════════════════════════════════════════════════════════════

  // MODULE C2.1 — Mastery of Register & Style
  // Unit C2.1.1 — The Full Register Range
  globalChapter++;
  chapters.push({
    level: 'C2', chapterNum: 1, globalChapterNum: globalChapter,
    title: 'Formal to Colloquial Range',
    objective: 'Move fluidly across the entire formal-to-colloquial spectrum',
    grammarFocus: 'full register spectrum in practice, colloquial structures (active use)',
    vocabularyFocus: 'full-spectrum register vocabulary',
    lessons: [
      { lessonNum: 1, title: 'The Full Register Spectrum', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing Across Registers', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Register in Natural Media', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Shifting Register Spontaneously', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Integrated Practice: A Multi-Register Scenario', anchorSkill: 'integrated' },
      { lessonNum: 6, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'C2', chapterNum: 2, globalChapterNum: globalChapter,
    title: 'Humor, Irony & Wordplay',
    objective: 'Understand and appropriately produce humor, irony, and wordplay in French',
    grammarFocus: 'wordplay mechanisms, ironic/understated structures',
    vocabularyFocus: 'humor/wordplay vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Understanding French Wordplay', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing with Gentle Humor', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Humor in Natural Speech', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Using Humor Appropriately in Conversation', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Integrated Practice: A Light, Witty Exchange', anchorSkill: 'integrated' },
      { lessonNum: 6, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // Unit C2.1.2 — Idiomatic & Stylistic Mastery
  globalChapter++;
  chapters.push({
    level: 'C2', chapterNum: 3, globalChapterNum: globalChapter,
    title: 'Idiomatic Mastery',
    objective: 'Command idiomatic French at a near-native level',
    grammarFocus: 'advanced/regional idiomatic structures',
    vocabularyFocus: 'extensive idiom range',
    lessons: [
      { lessonNum: 1, title: 'Advanced Idiomatic Expressions', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing Idiomatically', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Idiomatic Native Speech', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Speaking Idiomatically', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Integrated Practice: A Native-Level Conversation', anchorSkill: 'integrated' },
      { lessonNum: 6, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'C2', chapterNum: 4, globalChapterNum: globalChapter,
    title: 'Stylistic Nuance',
    objective: 'Demonstrate full stylistic control and personal voice in French',
    grammarFocus: 'consolidation of all prior stylistic structures',
    vocabularyFocus: 'nuanced stylistic vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Developing a Personal Style', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Writing with a Distinct Voice', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Stylistic Range in Media', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Speaking with Personal Style', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Integrated Practice: A Stylistic Showcase', anchorSkill: 'integrated' },
      { lessonNum: 6, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  // MODULE C2.2 — Capstone Specialization
  // Unit C2.2.1 — Independent Mastery Project
  globalChapter++;
  chapters.push({
    level: 'C2', chapterNum: 5, globalChapterNum: globalChapter,
    title: 'Independent Specialization Project I (Research & Planning)',
    objective: 'Select and begin an independent specialization track at mastery level',
    grammarFocus: 'domain-specific structures as needed by the learner\'s chosen track',
    vocabularyFocus: 'specialization-specific vocabulary',
    lessons: [
      { lessonNum: 1, title: 'Choosing a Specialization Track', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Research & Source Gathering', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Domain-Specific Native Content', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Planning an Independent Presentation', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Integrated Practice: Project Proposal Review', anchorSkill: 'integrated' },
      { lessonNum: 6, title: 'Chapter Review & Mini-Assessment', anchorSkill: 'review' },
    ],
  });

  globalChapter++;
  chapters.push({
    level: 'C2', chapterNum: 6, globalChapterNum: globalChapter,
    title: 'Independent Specialization Project II (Execution & Capstone)',
    objective: 'Complete and present the specialization project at full mastery level',
    grammarFocus: 'full command demonstrated across all previously learned structures',
    vocabularyFocus: 'full active + passive vocabulary range',
    lessons: [
      { lessonNum: 1, title: 'Drafting the Specialization Project', anchorSkill: 'reading' },
      { lessonNum: 2, title: 'Refining & Editing the Project', anchorSkill: 'writing' },
      { lessonNum: 3, title: 'Listening: Peer Project Feedback', anchorSkill: 'listening' },
      { lessonNum: 4, title: 'Presenting the Final Project', anchorSkill: 'speaking' },
      { lessonNum: 5, title: 'Integrated Practice: Full Project Rehearsal', anchorSkill: 'integrated' },
      { lessonNum: 6, title: 'Level C2 Review + DALF C2-Style Capstone Exam + Capstone Specialization Project Presentation', anchorSkill: 'review' },
    ],
  });

  return chapters;
}

function mapAnchorSkillToCategory(anchor: string): string {
  const map: Record<string, string> = {
    reading: 'reading', writing: 'writing', listening: 'listening',
    speaking: 'speaking', integrated: 'grammar', review: 'grammar',
  };
  return map[anchor] || 'grammar';
}

function mapAnchorSkillToSkillCode(anchor: string): 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV' {
  const map: Record<string, 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV'> = {
    reading: 'R', writing: 'W', listening: 'L', speaking: 'S',
    integrated: 'INT', review: 'REV',
  };
  return map[anchor] || 'R';
}

async function main() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db!;
  console.log(`Connected to: ${mongoose.connection.host}\n`);

  // Step 1: Delete ALL lessons
  const deleteResult = await db.collection('lessons').deleteMany({});
  console.log(`Step 1: Deleted ${deleteResult.deletedCount} lessons\n`);

  // Step 2: Seed A1 from markdown (80 lessons with content)
  console.log('Step 2: Importing A1 from markdown files...');
  let a1Total = 0, a1Created = 0, a1Skipped = 0, a1Errors = 0;
  for (const ch of A1_CHAPTERS) {
    const filePath = path.join(CHAPTERS_DIR, ch.filename);
    try {
      const result = await importChapterMarkdown(filePath, ch.level, ch.chapterNum);
      console.log(`  Chapter ${ch.chapterNum}: ${result.created} created, ${result.skipped} skipped`);
      a1Total += result.total;
      a1Created += result.created;
      a1Skipped += result.skipped;
      a1Errors += result.errors.length;
      for (const e of result.errors) {
        console.log(`    ✗ ${e.lessonId}: ${e.error}`);
      }
    } catch (err: any) {
      console.log(`  ✗ Chapter ${ch.chapterNum} failed: ${err.message}`);
      a1Errors++;
    }
  }
  console.log(`  A1 total: ${a1Total} lessons, ${a1Created} created, ${a1Skipped} skipped, ${a1Errors} errors\n`);

  // Publish all A1 lessons (markdown import sets isPublished=false by default)
  console.log('Publishing all A1 lessons...');
  const publishResult = await db.collection('lessons').updateMany(
    { level: 'A1', isPublished: false },
    { $set: { isPublished: true } }
  );
  console.log(`  Published ${publishResult.modifiedCount} A1 lessons\n`);

  // Step 2.5: Build chapter lookup for linking lessons to chapters
  console.log('Building chapter lookup for lesson linking...');
  const allChapters = await db.collection('chapters').find().toArray();
  const allModules = await db.collection('modules').find().toArray();
  const allCourses = await db.collection('courses').find().toArray();

  const modToCourse: Record<string, string> = {};
  for (const m of allModules) modToCourse[m._id.toString()] = m.courseId?.toString();
  const courseToLevel: Record<string, string> = {};
  for (const c of allCourses) courseToLevel[c._id.toString()] = c.level;

  const chapsByLevel: Record<string, any[]> = {};
  for (const ch of allChapters) {
    const courseId = modToCourse[ch.moduleId?.toString()];
    const level = courseToLevel[courseId];
    if (!level) continue;
    if (!chapsByLevel[level]) chapsByLevel[level] = [];
    chapsByLevel[level].push(ch);
  }

  const chapterLookup: Record<string, any> = {};
  for (const [level, chs] of Object.entries(chapsByLevel)) {
    chs.sort((a: any, b: any) => a.order - b.order);
    chs.forEach((ch: any, idx: number) => {
      chapterLookup[`${level.toLowerCase()}-ch${idx + 1}`] = ch._id;
    });
    console.log(`  ${level}: ${chs.length} chapters mapped`);
  }

  // Link A1 markdown lessons to chapters
  console.log('\nLinking A1 lessons to chapters...');
  let a1Linked = 0;
  for (const lesson of await db.collection('lessons').find({ level: 'A1' }).toArray()) {
    if (!lesson.lessonId) continue;
    const chId = chapterLookup[lesson.lessonId.replace(/-l\d+$/, '')];
    if (chId) {
      await db.collection('lessons').updateOne({ _id: lesson._id }, { $set: { chapterId: chId } });
      a1Linked++;
    }
  }
  console.log(`  Linked ${a1Linked} A1 lessons to chapters\n`);

  // Step 3: Seed skeleton lessons for A2-C2
  console.log('Step 3: Creating skeleton lessons for A2-C2...');
  const skeleton = buildSkeleton();
  let skeletonCreated = 0;
  let skeletonSkipped = 0;
  let skeletonErrors = 0;

  for (const chapter of skeleton) {
    for (const lesson of chapter.lessons) {
      const lessonId = `${chapter.level.toLowerCase()}-ch${chapter.chapterNum}-l${lesson.lessonNum}`;
      try {
        // Check if it already exists (A1 markdown may have created some)
        const existing = await db.collection('lessons').findOne({ lessonId });
        if (existing) {
          skeletonSkipped++;
          continue;
        }

        const chId = chapterLookup[lessonId.replace(/-l\d+$/, '')];

        const doc: Record<string, any> = {
          lessonId,
          title: lesson.title,
          level: chapter.level,
          skill: mapAnchorSkillToSkillCode(lesson.anchorSkill),
          anchorSkill: lesson.anchorSkill,
          category: mapAnchorSkillToCategory(lesson.anchorSkill),
          order: lesson.lessonNum,
          durationMinutes: 22,
          objectives: [chapter.objective],
          grammarFocus: chapter.grammarFocus,
          vocabularyFocus: chapter.vocabularyFocus,
          isPublished: true,
          // Empty canonical fields — skeleton lessons
          warmUp: { content: '' },
          explanation: { content: '' },
          vocabItems: [],
          grammar: {
            explanation: '',
            formation: '',
            usage: '',
            examples: [],
            commonMistakes: [],
          },
          grammarDrills: { questions: [] },
          reading: { title: '', text: '', questions: [] },
          listening: { title: '', transcript: '', questions: [] },
          speaking: { guidedActivity: '' },
          writing: { task: '', modelAnswer: '', checklist: [] },
          practiceExercises: { questions: [] },
          miniReview: { content: '' },
          selfAssessment: [],
        };

        if (chId) doc.chapterId = chId;

        await db.collection('lessons').insertOne(doc);
        skeletonCreated++;
      } catch (err: any) {
        console.log(`    ✗ ${lessonId}: ${err.message}`);
        skeletonErrors++;
      }
    }
  }
  console.log(`  Skeleton total: ${skeletonCreated} created, ${skeletonSkipped} skipped, ${skeletonErrors} errors\n`);

  // Final count
  const finalCount = await db.collection('lessons').countDocuments();
  const byLevel = await db.collection('lessons').aggregate([
    { $group: { _id: '$level', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]).toArray();

  console.log('=== FINAL SUMMARY ===');
  console.log(`Total lessons in DB: ${finalCount}`);
  console.log('By level:');
  for (const l of byLevel) {
    console.log(`  ${l._id}: ${l.count}`);
  }

  await mongoose.disconnect();
  console.log('\n✅ Seed complete!');
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
