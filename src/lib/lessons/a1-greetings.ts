export interface VocabWord {
  french: string;
  english: string;
  pronunciation: string;
  example: string;
}

export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface FillBlank {
  text: string;
  answer: string;
  hint?: string;
}

export interface OrderingItem {
  text: string;
}

export interface ShortAnswer {
  question: string;
  modelAnswer: string;
}

export interface ComprehensionQuestion {
  question: string;
  answer: string;
}

export interface TrueFalse {
  statement: string;
  answer: boolean;
  explanation?: string;
}

export interface LessonSection {
  type: "warmup" | "explanation" | "vocabulary" | "grammar" | "reading" | "listening" | "speaking" | "writing" | "practice" | "review" | "selfcheck";
  title: string;
  content?: string;
  vocabulary?: VocabWord[];
  grammarNotes?: string;
  grammarExamples?: string[];
  grammarMistakes?: { wrong: string; correct: string }[];
  grammarDrills?: { prompt: string; answer: string }[];
  readingTitle?: string;
  readingText?: string;
  comprehensionQuestions?: ComprehensionQuestion[];
  listeningTranscript?: string;
  listeningTrueFalse?: TrueFalse[];
  speakingPrompt?: string;
  speakingRoleplay?: { personA: string; personB: string }[];
  pronunciationTip?: string;
  writingTask?: string;
  writingModel?: string;
  writingChecklist?: string[];
  mcq?: MCQ[];
  matching?: MatchingPair[];
  fillBlank?: FillBlank[];
  ordering?: OrderingItem[];
  shortAnswer?: ShortAnswer[];
  selfCheck?: string[];
}

export interface LessonData {
  id: string;
  chapter: string;
  chapterTitle: string;
  lessonNumber: number;
  title: string;
  anchorSkill: string;
  objectives: string[];
  grammarFocus: string;
  vocabularyFocus: string[];
  estimatedTime: string;
  sections: LessonSection[];
}

export const greetingLesson: LessonData = {
  id: "a1-1-1-1",
  chapter: "A1.1.1",
  chapterTitle: "Greetings & Identity",
  lessonNumber: 1,
  title: "Basic Greetings (Bonjour/Salut/Bonsoir)",
  anchorSkill: "Reading (R)",
  objectives: [
    "Recognize and use the core greeting and farewell expressions",
    "Match greetings correctly to time of day and formality",
  ],
  grammarFocus: "Introduction to être: je suis / tu es",
  vocabularyFocus: ["bonjour", "bonsoir", "salut", "au revoir", "à bientôt", "bonne nuit", "madame", "monsieur"],
  estimatedTime: "20–25 minutes",
  sections: [
    {
      type: "warmup",
      title: "Warm-Up",
      content: "Think about how you greet people in your own language. Do you say something different in the morning than at night? Do you greet a stranger the same way you greet a close friend? Keep these questions in mind — French makes some of the same distinctions, and a few new ones."
    },
    {
      type: "explanation",
      title: "Lesson Explanation",
      content: `French greetings change depending on **two things**: the time of day and how well you know the person.

• **Bonjour** ("hello" / "good day") is the all-purpose daytime greeting. It works with anyone, from a stranger to a close friend, from morning until early evening.
• **Bonsoir** ("good evening") replaces bonjour once evening arrives.
• **Salut** ("hi" / "bye") is **casual** — only used with people you know well.
• **Au revoir** ("goodbye") is the standard farewell in any situation.
• **À bientôt** ("see you soon") — warm and casual, when you expect to see them again.
• **Bonne nuit** ("good night") — only when someone is going to bed.

**Madame** and **Monsieur** are polite titles added after bonjour/bonsoir when addressing someone you don't know well.`
    },
    {
      type: "vocabulary",
      title: "Vocabulary",
      vocabulary: [
        { french: "bonjour", english: "hello / good day", pronunciation: "bohn-ZHOOR", example: "Bonjour, Madame !" },
        { french: "bonsoir", english: "good evening", pronunciation: "bohn-SWAHR", example: "Bonsoir, Monsieur." },
        { french: "salut", english: "hi / bye (informal)", pronunciation: "sah-LOO", example: "Salut, Marc ! Ça va ?" },
        { french: "au revoir", english: "goodbye", pronunciation: "oh ruh-VWAHR", example: "Au revoir, à demain !" },
        { french: "à bientôt", english: "see you soon", pronunciation: "ah byan-TOH", example: "Merci, à bientôt !" },
        { french: "bonne nuit", english: "good night", pronunciation: "bun NWEE", example: "Bonne nuit, dors bien." },
        { french: "madame", english: "madam / Mrs.", pronunciation: "mah-DAM", example: "Bonjour, madame Girard." },
        { french: "monsieur", english: "sir / Mr.", pronunciation: "muh-SYUR", example: "Bonsoir, monsieur Dubois." },
      ]
    },
    {
      type: "grammar",
      title: "Grammar: Être (to be) — Je suis",
      grammarNotes: `This lesson introduces only a small, fixed piece of the verb **être** ("to be"): the phrase pattern **Je suis...** ("I am...") used to state your name. The full conjugation is built gradually across this chapter.

**Formation (so far):**
• **Je suis** + [name] → "I am [name]."

**Usage:** This pattern is commonly used right after a greeting, when meeting someone for the first time: *Bonjour, je suis Claire.*`,
      grammarExamples: [
        "Bonjour, je suis Antoine.",
        "Bonsoir, je suis Madame Lefèvre.",
        "Salut, je suis Léa !"
      ],
      grammarMistakes: [
        { wrong: "Je suis à Claire.", correct: "Je suis Claire. (No preposition before a name with être)" },
        { wrong: "je suis claire", correct: "Je suis Claire. (Capitalize proper names)" }
      ],
      grammarDrills: [
        { prompt: "Bonjour, ___ Antoine.", answer: "je suis" },
        { prompt: "Salut, ___ Léa !", answer: "je suis" },
      ]
    },
    {
      type: "reading",
      title: "Reading: Deux Rencontres (Two Encounters)",
      readingTitle: "Deux Rencontres",
      readingText: `**Le matin, au bureau :**
Camille : Bonjour, Madame Petit !
Madame Petit : Bonjour ! Je suis Madame Petit.
Camille : Je suis Camille. Enchantée !

**Le soir, dans la rue :**
Hugo : Salut, Léa !
Léa : Salut, Hugo ! Ça va ?
Hugo : Ça va, merci. Bonne nuit, à bientôt !
Léa : À bientôt !`,
      comprehensionQuestions: [
        { question: "What time of day does the first conversation happen?", answer: "Morning (le matin)." },
        { question: "Which greeting does Camille use with Madame Petit?", answer: "Bonjour." },
        { question: "Why does Hugo use salut instead of bonjour?", answer: "Because he knows Léa well and it's an informal situation." },
        { question: "What does Léa say at the very end?", answer: "À bientôt !" },
      ]
    },
    {
      type: "listening",
      title: "Listening: Au Café",
      listeningTranscript: `**Au Café**
Serveur : Bonsoir, Madame !
Cliente : Bonsoir, Monsieur.
Serveur : Vous êtes Madame Lambert ?
Cliente : Oui, je suis Madame Lambert.
Serveur : Merci ! Au revoir, bonne soirée.
Cliente : Au revoir !`,
      listeningTrueFalse: [
        { statement: "The conversation happens in the morning.", answer: false, explanation: "It's evening — they use bonsoir." },
        { statement: "The customer's name is Madame Lambert.", answer: true },
        { statement: "The waiter says salut at the end.", answer: false, explanation: "He says au revoir." },
      ]
    },
    {
      type: "speaking",
      title: "Speaking: Greeting Chain",
      speakingPrompt: "Practice saying the following aloud, paying attention to the difference in mouth position between bonjour (open 'oh' sound) and bonsoir (rounder 'wah' sound).",
      speakingRoleplay: [
        { personA: "Greet Person B as a stranger in the morning, using Madame/Monsieur.", personB: "Reply and introduce yourself with Je suis..." },
        { personA: "Say goodbye with au revoir.", personB: "Respond with à bientôt." },
      ],
      pronunciationTip: 'The "r" in bonjour and au revoir is made in the back of the throat — softer than an English "r." Don\'t worry about perfecting it yet; just get comfortable attempting it.'
    },
    {
      type: "writing",
      title: "Writing: Mini-Dialogue",
      writingTask: "Write a 2–3 sentence mini-dialogue in which you greet someone in the evening, introduce yourself, and say goodbye.",
      writingModel: "Bonsoir, Madame. Je suis Julien. Au revoir, à bientôt !",
      writingChecklist: [
        "Used a greeting that matches evening time (bonsoir, not bonjour)",
        "Introduced yourself with Je suis",
        "Included a farewell expression"
      ]
    },
    {
      type: "practice",
      title: "Practice Exercises",
      mcq: [
        {
          question: "Which greeting is correct at 9:00 PM?",
          options: ["Bonjour", "Salut", "Bonsoir", "Bonne nuit (as a greeting)"],
          correctIndex: 2,
          explanation: "Bonsoir is used in the evening."
        }
      ],
      matching: [
        { left: "Salut", right: "Informal hello/goodbye" },
        { left: "Bonjour", right: "Formal daytime greeting" },
        { left: "Bonne nuit", right: "Said only when going to bed" },
      ],
      fillBlank: [
        { text: "_______, Madame Girard ! Je suis Paul.", answer: "Bonjour" }
      ],
      ordering: [
        { text: "Au revoir !" },
        { text: "Bonjour, Madame." },
        { text: "Je suis Thomas." },
      ],
      shortAnswer: [
        { question: "In your own words, explain when you would use salut instead of bonjour.", modelAnswer: "Salut is used with people you know well, in casual situations — never with strangers or in formal contexts." }
      ]
    },
    {
      type: "review",
      title: "Mini Review",
      content: `You can now greet someone appropriately by time of day, choose between formal and informal greetings, introduce yourself with **Je suis**, and say goodbye correctly.`
    },
    {
      type: "selfcheck",
      title: "Self Assessment",
      selfCheck: [
        "I can say hello appropriately for morning, afternoon, or evening.",
        "I know when to use salut versus bonjour.",
        "I can introduce myself using Je suis.",
        "I can say goodbye in more than one way."
      ]
    }
  ]
};
