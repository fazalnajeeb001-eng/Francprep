import mongoose from 'mongoose';
import Course from '../models/Course';
import Module from '../models/Module';
import Chapter from '../models/Chapter';
import Lesson from '../models/Lesson';
import Vocabulary from '../models/Vocabulary';
import Exercise from '../models/Exercise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ─── Types for the import ───────────────────────────────────────────────────

interface SectionInput {
  type: 'warmup' | 'explanation' | 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'practice' | 'review';
  title: string;
  body: string;
  translation?: string;
  audioUrl?: string;
}

interface VocabularyInput {
  french: string;
  english: string;
  pronunciation?: string;
  exampleSentence?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface ExerciseInput {
  type: 'multiple_choice' | 'fill_blank' | 'matching' | 'ordering' | 'translation' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface LessonInput {
  title: string;
  order: number;
  skill: 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV';
  objectives: string[];
  grammarTopics: string[];
  estimatedDuration: number;
  sections: SectionInput[];
  vocabulary: VocabularyInput[];
  exercises: ExerciseInput[];
}

interface ChapterInput {
  title: string;
  objectives: string[];
  cefrGoals: string[];
  estimatedTime: string;
  order: number;
  lessons: LessonInput[];
}

interface ModuleInput {
  title: string;
  order: number;
  chapters: ChapterInput[];
}

// ─── Import function ────────────────────────────────────────────────────────

export async function importChapter(
  courseId: string,
  moduleId: string,
  chapterData: ChapterInput,
  options?: { autoPublish?: boolean }
) {
  const { title, objectives, cefrGoals, estimatedTime, order, lessons } = chapterData;

  // Create the chapter
  const chapter = await Chapter.create({
    moduleId,
    title,
    objectives,
    cefrGoals,
    estimatedTime,
    order,
    lessons: [],
    isPublished: options?.autoPublish || false,
  });

  const lessonIds: mongoose.Types.ObjectId[] = [];

  for (const lessonInput of lessons) {
    // Create vocabulary items
    const vocabIds: mongoose.Types.ObjectId[] = [];
    for (const v of lessonInput.vocabulary) {
      const vocab = await Vocabulary.create({
        lessonId: null as any, // Will update after lesson is created
        french: v.french,
        english: v.english,
        pronunciation: v.pronunciation,
        exampleSentence: v.exampleSentence,
        difficulty: v.difficulty || 'medium',
      });
      vocabIds.push(vocab._id);
    }

    // Create exercises
    const exerciseIds: mongoose.Types.ObjectId[] = [];
    for (const ex of lessonInput.exercises) {
      const exercise = await Exercise.create({
        lessonId: null as any,
        title: ex.question.slice(0, 100),
        type: ex.type === 'ordering' ? 'matching' : ex.type === 'translation' ? 'writing' : ex.type === 'short_answer' ? 'writing' : 'multiple_choice',
        instructions: '',
        questions: [{
          id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          text: ex.question,
          options: ex.options,
          correctAnswer: ex.correctAnswer,
          explanation: ex.explanation,
          points: 1,
        }],
        points: 1,
        order: 1,
        isExamStyle: false,
      });
      exerciseIds.push(exercise._id);
    }

    // Create the lesson
    const lesson = await Lesson.create({
      chapterId: chapter._id,
      title: lessonInput.title,
      description: lessonInput.objectives.join('. '),
      level: 'A1', // Will be inherited from course
      category: 'grammar',
      skill: lessonInput.skill,
      objectives: lessonInput.objectives,
      grammarTopics: lessonInput.grammarTopics,
      vocabulary: vocabIds,
      sections: lessonInput.sections.map(s => ({
        type: s.type,
        title: s.title,
        body: s.body,
        translation: s.translation,
        media: {
          audio: s.audioUrl ? [s.audioUrl] : undefined,
        },
      })),
      activities: exerciseIds,
      content: lessonInput.sections.map(s => s.body).join('\n\n'),
      order: lessonInput.order,
      isPublished: options?.autoPublish || false,
      estimatedDuration: lessonInput.estimatedDuration,
      tags: lessonInput.grammarTopics,
    });

    // Update vocabulary and exercises with the lesson ID
    await Vocabulary.updateMany({ _id: { $in: vocabIds } }, { lessonId: lesson._id });
    await Exercise.updateMany({ _id: { $in: exerciseIds } }, { lessonId: lesson._id });

    lessonIds.push(lesson._id);
    console.log(`  ✓ Lesson "${lessonInput.title}" created`);
  }

  // Update chapter with lesson references
  await Chapter.findByIdAndUpdate(chapter._id, { lessons: lessonIds });

  // Update module with chapter reference
  await Module.findByIdAndUpdate(moduleId, { $push: { chapters: chapter._id } });

  console.log(`✅ Chapter "${title}" imported successfully`);
  return chapter;
}

// ─── CLI entry point ────────────────────────────────────────────────────────

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not set');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('📦 Connected to MongoDB');

  // ─── Create Course: French A1 ───────────────────────────────────────────────
  let course = await Course.findOne({ level: 'A1' });
  if (!course) {
    course = await Course.create({
      name: 'French A1',
      level: 'A1',
      description: 'Begin your French journey from absolute zero. Master greetings, introductions, basic grammar, and essential vocabulary for everyday situations.',
      modules: [],
      isActive: true,
    });
    console.log('✅ Course "French A1" created');
  } else {
    console.log('ℹ️ Course "French A1" already exists');
  }

  // ─── Create Module: A1.1 First Contact ──────────────────────────────────────
  let module1 = await Module.findOne({ courseId: course._id, order: 1 });
  if (!module1) {
    module1 = await Module.create({
      courseId: course._id,
      title: 'Module A1.1 — First Contact',
      order: 1,
      chapters: [],
    });
    console.log('✅ Module "A1.1 First Contact" created');
  } else {
    console.log('ℹ️ Module "A1.1 First Contact" already exists');
  }

  // ─── Import Chapter 1: Greetings & First Contact ────────────────────────────
  await importChapter(course._id.toString(), module1._id.toString(), {
    title: 'Greetings & First Contact',
    objectives: [
      'Greet someone appropriately depending on the time of day and relationship',
      'Introduce yourself and ask someone else\'s name',
      'Ask and respond to "How are you?" in formal and informal registers',
      'Use core polite expressions naturally in everyday exchanges',
      'Recognize when to use tu versus vous',
    ],
    cefrGoals: [
      'A1.1: Can say hello and goodbye appropriately for the time of day',
      'A1.1: Can introduce myself using my name',
      'A1.1: Can ask someone their name and understand their answer',
      'A1.1: Can ask how someone is doing and answer the same question',
      'A1.1: Can use basic courtesy expressions (please, thank you, excuse me)',
      'A1.1: Can tell whether a situation calls for tu or vous',
    ],
    estimatedTime: '3–3.5 hours',
    order: 1,
    lessons: [
      // ═══════════════════════════════════════════════════════════════
      // LESSON 1 — Basic Greetings
      // ═══════════════════════════════════════════════════════════════
      {
        title: 'Basic Greetings — Bonjour / Salut / Bonsoir',
        order: 1,
        skill: 'R',
        objectives: [
          'Recognize and use the core greeting and farewell expressions',
          'Match greetings correctly to time of day and formality',
          'Introduce yourself with Je suis',
        ],
        grammarTopics: ['être (je suis / tu es)', 'formal and informal address'],
        estimatedDuration: 25,
        sections: [
          {
            type: 'warmup',
            title: 'Think About Greetings',
            body: `Think about how you greet people in your own language. Do you say something different in the morning than at night? Do you greet a stranger the same way you greet a close friend? Keep these questions in mind — French makes some of the same distinctions, and a few new ones.`,
          },
          {
            type: 'explanation',
            title: 'French Greetings — The Basics',
            body: `French greetings change depending on two things: the time of day and how well you know the person.

— Bonjour ("hello" / "good day") is the all-purpose daytime greeting. It works with anyone, from a stranger to a close friend, from morning until early evening.
— Bonsoir ("good evening") replaces bonjour once evening arrives — roughly from dinnertime onward.
— Salut ("hi" / "bye") is casual and only used with people you know well — friends, family, classmates. Never with a stranger.
— Au revoir ("goodbye") is the standard farewell in any situation, formal or informal.
— À bientôt ("see you soon") is a warm, casual way to end a conversation when you expect to see someone again soon.
— Bonne nuit ("good night") is used only when someone is going to bed — not as a general evening farewell.

Polite titles: Madame (for a woman) and Monsieur (for a man) are often added after bonjour or bonsoir when addressing someone you don't know well. Example: Bonjour, Madame.`,
          },
          {
            type: 'vocabulary',
            title: 'Core Greetings Vocabulary',
            body: `Bonjour|hello / good day|bohn-ZHOOR
Bonsoir|good evening|bohn-SWAHR
Salut|hi / bye (informal)|sah-LU
Au revoir|goodbye|oh ruh-VWAHR
À bientôt|see you soon|ah byan-TOH
Bonne nuit|good night|bun NWEE
Madame|madam / Mrs.|mah-DAM
Monsieur|sir / Mr.|muh-SYUR
Enchanté(e)|nice to meet you|ahn-shahn-TAY`,
          },
          {
            type: 'grammar',
            title: 'Être — Je suis / Tu es',
            body: `This lesson introduces only a small, fixed piece of the verb être ("to be"): the pattern Je suis + [name] = "I am [name]." The full conjugation is built across this chapter.

Je suis + [name] — "I am [name]."
Tu es + [name] — "You are [name]." (informal)

Examples:
— Bonjour, je suis Antoine.
— Bonsoir, je suis Madame Lefèvre.
— Salut, je suis Léa !

Common mistake: ❌ Je suis à Claire → ✅ Je suis Claire (no preposition before a name with être)`,
          },
          {
            type: 'reading',
            title: 'Deux Rencontres (Two Encounters)',
            body: `Le matin, au bureau :
Camille : Bonjour, Madame Petit !
Madame Petit : Bonjour ! Je suis Madame Petit.
Camille : Je suis Camille. Enchantée !

Le soir, dans la rue :
Hugo : Salut, Léa !
Léa : Salut, Hugo ! Ça va ?
Hugo : Ça va, merci. Bonne nuit, à bientôt !
Léa : À bientôt !`,
            translation: `Morning, at the office:
Camille: Good morning, Madame Petit!
Madame Petit: Good morning! I'm Madame Petit.
Camille: I'm Camille. Nice to meet you!

Evening, in the street:
Hugo: Hi, Léa!
Léa: Hi, Hugo! How's it going?
Hugo: Fine, thanks. Good night, see you soon!
Léa: See you soon!`,
          },
          {
            type: 'listening',
            title: 'Au Café — Listening Practice',
            body: `Serveur : Bonsoir, Madame !
Cliente : Bonsoir, Monsieur.
Serveur : Vous êtes Madame Lambert ?
Cliente : Oui, je suis Madame Lambert.
Serveur : Merci ! Au revoir, bonne soirée.
Cliente : Au revoir !`,
            translation: `Waiter: Good evening, Madam!
Customer: Good evening, sir.
Waiter: Are you Madame Lambert?
Customer: Yes, I'm Madame Lambert.
Waiter: Thank you! Goodbye, have a good evening.
Customer: Goodbye!`,
          },
          {
            type: 'speaking',
            title: 'Greeting Chain — Speaking Practice',
            body: `Practice saying these aloud, paying attention to the mouth position between bonjour (open "oh") and bonsoir (rounder "wah").

Roleplay (say both parts aloud):
Part A — Greet someone formally in the morning:
"Bonjour, Madame. Je suis [your name]. Enchanté(e) !"

Part B — Greet someone informally in the evening:
"Salut ! Je suis [your name]. Au revoir, à bientôt !"

Pronunciation Tip: The French "r" in bonjour and au revoir is made in the back of the throat — softer than an English "r." Don't worry about perfecting it yet; just get comfortable attempting it.`,
          },
          {
            type: 'writing',
            title: 'Write a Mini-Dialogue',
            body: `Write a 2–3 sentence mini-dialogue in which you:
1. Greet someone in the evening
2. Introduce yourself with Je suis
3. Say goodbye

Model answer: Bonsoir, Madame. Je suis Julien. Au revoir, à bientôt !`,
          },
          {
            type: 'review',
            title: 'Lesson Review',
            body: `✓ You can say hello appropriately for morning, afternoon, or evening.
✓ You know when to use salut versus bonjour.
✓ You can introduce yourself using Je suis.
✓ You can say goodbye in more than one way.`,
          },
        ],
        vocabulary: [
          { french: 'Bonjour', english: 'hello / good day', pronunciation: 'bohn-ZHOOR', exampleSentence: 'Bonjour, Madame !', difficulty: 'easy' },
          { french: 'Bonsoir', english: 'good evening', pronunciation: 'bohn-SWAHR', exampleSentence: 'Bonsoir, Monsieur.', difficulty: 'easy' },
          { french: 'Salut', english: 'hi / bye (informal)', pronunciation: 'sah-LU', exampleSentence: 'Salut, Marc ! Ça va ?', difficulty: 'easy' },
          { french: 'Au revoir', english: 'goodbye', pronunciation: 'oh ruh-VWAHR', exampleSentence: 'Au revoir, à demain !', difficulty: 'easy' },
          { french: 'À bientôt', english: 'see you soon', pronunciation: 'ah byan-TOH', exampleSentence: 'Merci, à bientôt !', difficulty: 'easy' },
          { french: 'Bonne nuit', english: 'good night', pronunciation: 'bun NWEE', exampleSentence: 'Bonne nuit, dors bien.', difficulty: 'easy' },
          { french: 'Madame', english: 'madam / Mrs.', pronunciation: 'mah-DAM', exampleSentence: 'Bonjour, Madame Girard.', difficulty: 'easy' },
          { french: 'Monsieur', english: 'sir / Mr.', pronunciation: 'muh-SYUR', exampleSentence: 'Bonsoir, Monsieur Dubois.', difficulty: 'easy' },
          { french: 'Enchanté(e)', english: 'nice to meet you', pronunciation: 'ahn-shahn-TAY', exampleSentence: 'Enchantée, Madame !', difficulty: 'easy' },
        ],
        exercises: [
          {
            type: 'multiple_choice',
            question: 'Which greeting is correct at 9:00 PM?',
            options: ['Bonjour', 'Salut', 'Bonsoir', 'Bonne nuit (as a greeting)'],
            correctAnswer: 'Bonsoir',
            explanation: 'Bonsoir is used once evening arrives. Bonne nuit is only for when someone is going to bed.',
            difficulty: 'easy',
          },
          {
            type: 'fill_blank',
            question: 'Fill in the blank: _______, Madame Girard ! Je suis Paul.',
            options: undefined,
            correctAnswer: 'Bonjour',
            explanation: 'Bonjour is the standard daytime greeting.',
            difficulty: 'easy',
          },
          {
            type: 'ordering',
            question: 'Put these in a logical order for a conversation: (a) Au revoir ! (b) Bonjour, Madame. (c) Je suis Thomas.',
            options: undefined,
            correctAnswer: 'b, c, a',
            explanation: 'First you greet (Bonjour), then introduce yourself (Je suis), then say goodbye (Au revoir).',
            difficulty: 'easy',
          },
          {
            type: 'short_answer',
            question: 'In your own words, explain when you would use salut instead of bonjour.',
            options: undefined,
            correctAnswer: 'Salut is used with people you know well, in casual situations — never with strangers or in formal contexts.',
            explanation: 'Salut is informal and only appropriate with friends, family, and classmates.',
            difficulty: 'medium',
          },
        ],
      },
      // ═══════════════════════════════════════════════════════════════
      // LESSON 2 — Introducing Yourself
      // ═══════════════════════════════════════════════════════════════
      {
        title: 'Introducing Yourself — Je m\'appelle',
        order: 2,
        skill: 'S',
        objectives: [
          'Introduce yourself with je m\'appelle',
          'Understand être extended to third person (il/elle est)',
          'Use enchanté(e), moi aussi, et toi / et vous',
        ],
        grammarTopics: ['s\'appeler (je m\'appelle / tu t\'appelles)', 'être (il/elle est)'],
        estimatedDuration: 25,
        sections: [
          {
            type: 'warmup',
            title: 'Another Way to Say Your Name',
            body: `You already know how to say Je suis [name]. Today you'll learn a second, even more common way the French say their name — one you'll hear more often in everyday conversation.`,
          },
          {
            type: 'explanation',
            title: 'Introductions — Je m\'appelle',
            body: `While Je suis [name] is correct, French speakers most commonly introduce themselves using je m'appelle, which literally means "I call myself" but translates as "my name is."

— Je m'appelle Sophie. — "My name is Sophie."
— Comment tu t'appelles ? — "What's your name?" (informal)
— Enchanté (male) / Enchantée (female) — "Nice to meet you," said after learning someone's name.
— Moi aussi — "Me too," used when something applies to you as well.
— Et toi ? (informal) / Et vous ? (formal) — "And you?" — used to turn a question back to the other person.

We're also extending être: il est / elle est ("he is" / "she is") lets you talk about someone else.`,
          },
          {
            type: 'grammar',
            title: 'S\'appeler + Être (Third Person)',
            body: `S'appeler is a reflexive verb — you "call yourself" a name. At A1, you only need these forms:

Je m'appelle — "I am called / My name is"
Tu t'appelles — "You are called" (informal)
Il/Elle s'appelle — "He/She is called"
Il/Elle est — "He/She is"

Examples:
— Je m'appelle Hugo. Et toi ?
— Elle s'appelle Inès. (Her name is Inès.)
— Il est content. (He is happy.)

Common mistakes:
❌ Je m'appelle est Marc. → ✅ Je m'appelle Marc. (No est needed with s'appeler.)
❌ Il s'appelle il Paul. → ✅ Il s'appelle Paul.`,
          },
          {
            type: 'vocabulary',
            title: 'Introduction Vocabulary',
            body: `Je m'appelle|my name is|zhuh mah-PELL
Comment tu t'appelles ?|what's your name (informal)|koh-mahn tu tah-PELL
Enchanté(e)|nice to meet you|ahn-shahn-TAY
Moi aussi|me too|mwah oh-SEE
Et toi ?|and you? (informal)|ay TWAH
Et vous ?|and you? (formal)|ay VOO
Comment il/elle s'appelle ?|what's his/her name|koh-mahn eel/ehl sah-PELL`,
          },
          {
            type: 'reading',
            title: 'Au Parc (At the Park)',
            body: `Élise : Bonjour ! Je m'appelle Élise.
Marco : Enchanté ! Je m'appelle Marco.
Élise : Moi aussi, enchantée ! Et elle, comment elle s'appelle ?
Marco : Elle s'appelle Julie. Elle est ma sœur.`,
            translation: `Élise: Hello! My name is Élise.
Marco: Nice to meet you! My name is Marco.
Élise: Me too, nice to meet you! And her, what's her name?
Marco: Her name is Julie. She's my sister.`,
          },
          {
            type: 'listening',
            title: 'Nouveaux Voisins (New Neighbors)',
            body: `Voix 1 : Bonjour ! Je m'appelle Thomas.
Voix 2 : Enchantée, Thomas ! Je m'appelle Claire.
Voix 1 : Et lui, comment il s'appelle ?
Voix 2 : Il s'appelle Léo. Il est mon fils.`,
            translation: `Voice 1: Hello! My name is Thomas.
Voice 2: Nice to meet you, Thomas! My name is Claire.
Voice 1: And him, what's his name?
Voice 2: His name is Léo. He's my son.`,
          },
          {
            type: 'speaking',
            title: 'Introduction Roleplay',
            body: `Practice introducing yourself aloud using je m'appelle, then add Enchanté(e) ! 

With a partner (or aloud alone playing both parts):
— Introduce yourselves to each other
— Then introduce a third "imaginary" person using il/elle s'appelle

Pronunciation Tip: The "eu" sound in je and deux is made with rounded lips, unlike any English vowel — practice it by saying "uh" while rounding your lips forward.`,
          },
          {
            type: 'writing',
            title: 'Write an Introduction',
            body: `Write a short introduction (3 sentences) introducing yourself and one other person (real or imaginary).

Model answer: Je m'appelle Alex. Enchanté ! Elle s'appelle Nina, elle est ma collègue.`,
          },
          {
            type: 'review',
            title: 'Lesson Review',
            body: `✓ I can introduce myself using je m'appelle.
✓ I can say "nice to meet you" correctly for my gender.
✓ I can introduce someone else.
✓ I know the difference between et toi and et vous.`,
          },
        ],
        vocabulary: [
          { french: 'Je m\'appelle', english: 'my name is', pronunciation: 'zhuh mah-PELL', exampleSentence: 'Je m\'appelle Nora.', difficulty: 'easy' },
          { french: 'Comment tu t\'appelles ?', english: 'what\'s your name? (informal)', pronunciation: 'koh-mahn tu tah-PELL', exampleSentence: 'Comment tu t\'appelles ?', difficulty: 'easy' },
          { french: 'Enchanté(e)', english: 'nice to meet you', pronunciation: 'ahn-shahn-TAY', exampleSentence: 'Enchantée, Madame !', difficulty: 'easy' },
          { french: 'Moi aussi', english: 'me too', pronunciation: 'mwah oh-SEE', exampleSentence: 'Moi aussi, enchanté !', difficulty: 'easy' },
          { french: 'Et toi ?', english: 'and you? (informal)', pronunciation: 'ay TWAH', exampleSentence: 'Ça va, et toi ?', difficulty: 'easy' },
          { french: 'Et vous ?', english: 'and you? (formal)', pronunciation: 'ay VOO', exampleSentence: 'Bonjour, et vous ?', difficulty: 'easy' },
          { french: 'Il s\'appelle', english: 'his name is', pronunciation: 'eel sah-PELL', exampleSentence: 'Il s\'appelle Antoine.', difficulty: 'easy' },
          { french: 'Elle s\'appelle', english: 'her name is', pronunciation: 'ehl sah-PELL', exampleSentence: 'Elle s\'appelle Julie.', difficulty: 'easy' },
        ],
        exercises: [
          {
            type: 'multiple_choice',
            question: '"My name is" most commonly translates to:',
            options: ['Je suis', 'Je m\'appelle', 'Il est', 'Et toi'],
            correctAnswer: 'Je m\'appelle',
            explanation: 'While Je suis [name] is correct, French speakers most commonly use Je m\'appelle.',
            difficulty: 'easy',
          },
          {
            type: 'matching',
            question: 'Match each expression to its English meaning:\nEnchanté — a) And you? (formal)\nEt vous — b) Nice to meet you (male)\nMoi aussi — c) Me too',
            options: undefined,
            correctAnswer: 'Enchanté-b, Et vous-a, Moi aussi-c',
            explanation: 'Enchanté = nice to meet you, Et vous = and you (formal), Moi aussi = me too.',
            difficulty: 'easy',
          },
          {
            type: 'fill_blank',
            question: 'Elle __________ Camille. (s\'appeler)',
            options: undefined,
            correctAnswer: "s'appelle",
            explanation: 'Elle s\'appelle = Her name is (third person of s\'appeler).',
            difficulty: 'easy',
          },
          {
            type: 'short_answer',
            question: 'Explain the difference between et toi and et vous.',
            options: undefined,
            correctAnswer: 'Et toi is used informally with people you know well. Et vous is used formally, with strangers, elders, or in polite contexts.',
            explanation: 'The tu/vous distinction reflects social distance. Use et toi with friends, et vous with strangers or in formal situations.',
            difficulty: 'medium',
          },
        ],
      },
    ],
  }, { autoPublish: true });

  console.log('\n🎉 Chapter 1 — Greetings & First Contact imported successfully!');
  console.log('   Content is published and ready for students.');

  await mongoose.disconnect();
  console.log('✅ Done');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Import failed:', err);
    process.exit(1);
  });
}