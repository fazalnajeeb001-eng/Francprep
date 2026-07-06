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
  listeningMCQ?: { question: string; options: string[]; correctIndex: number }[];
  listeningFillBlank?: { text: string; answer: string }[];
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

export interface ChapterData {
  id: string;
  level: string;
  module: string;
  title: string;
  objective: string;
  estTime: string;
  lessons: { number: number; title: string; skill: string; time: string; id: string }[];
}

export const chapterA1: ChapterData = {
  id: "a1-1-1-1",
  level: "A1",
  module: "A1.1 — Self & Others · Unit A1.1.1 — Greetings & Identity",
  title: "Chapter 1 — Greetings & First Contact",
  objective: "By the end of this chapter, learners will be able to greet people appropriately for the time of day and social context, introduce themselves, ask and give basic personal information, and choose correctly between formal and informal address.",
  estTime: "3–3.5 hours",
  lessons: [
    { number: 1, title: "Basic Greetings (Bonjour/Salut/Bonsoir)", skill: "Reading", time: "20–25 min", id: "1" },
    { number: 2, title: "Introducing Yourself", skill: "Speaking", time: "20–25 min", id: "2" },
    { number: 3, title: "Asking Someone's Name", skill: "Listening", time: "20–25 min", id: "3" },
    { number: 4, title: "How Are You?", skill: "Writing", time: "25–30 min", id: "4" },
  ],
};

export const lessons: Record<string, LessonData> = {
  "1": {
    id: "1",
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
• **Bonsoir** ("good evening") replaces bonjour once evening arrives — roughly from the early evening onward.
• **Salut** ("hi" / "bye") is casual and is only used with people you know well — friends, close family, classmates. It is never used with a stranger or in a formal setting.
• **Au revoir** ("goodbye") is the standard way to say goodbye in any situation, formal or informal.
• **À bientôt** ("see you soon") is a warm, casual way to end a conversation when you expect to see the person again soon.
• **Bonne nuit** ("good night") is used only when someone is going to bed — not as a general evening farewell.

**Madame** (for a woman) and **Monsieur** (for a man) are polite titles often added after bonjour or bonsoir when addressing someone you don't know well: Bonjour, Madame.`
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
        grammarNotes: `This lesson introduces only a small, fixed piece of the verb **être** ("to be"): the phrase pattern **Je suis...** ("I am...") used to state your name, which you'll need for the dialogues below. The full conjugation of être is built gradually across this chapter — you are not expected to master it yet.

**Formation (so far):**
• **Je suis** + [name] → "I am [name]."

**Usage:** This pattern is commonly used right after a greeting, when meeting someone for the first time: *Bonjour, je suis Claire.*`,
        grammarExamples: [
          "Bonjour, je suis Antoine.",
          "Bonsoir, je suis Madame Lefèvre.",
          "Salut, je suis Léa !"
        ],
        grammarMistakes: [
          { wrong: "Je suis à Claire.", correct: "Je suis Claire. (No preposition is needed before a name with être.)" },
          { wrong: "Forgetting to capitalize proper names: je suis claire", correct: "Je suis Claire. (Capitalize proper names.)" }
        ],
        grammarDrills: [
          { prompt: "Complete: Bonjour, __________. (Je suis + your name)", answer: "je suis [your name]" },
          { prompt: "Complete: Salut, __________ ! (Je suis + your name)", answer: "je suis [your name]" },
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
          { personA: "Greets Person B as a stranger in the morning, using Madame/Monsieur.", personB: "Replies and introduces themselves with Je suis..." },
          { personA: "Says goodbye with au revoir.", personB: "Responds appropriately." },
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
  },

  "2": {
    id: "2",
    chapter: "A1.1.1",
    chapterTitle: "Greetings & Identity",
    lessonNumber: 2,
    title: "Introducing Yourself",
    anchorSkill: "Speaking (S)",
    objectives: [
      "Introduce yourself with your name using je m'appelle",
      "Understand être extending to a third person (il/elle est)",
    ],
    grammarFocus: "s'appeler (to be called) — je m'appelle, tu t'appelles; être extended to il/elle est",
    vocabularyFocus: ["je m'appelle", "comment tu t'appelles", "enchanté(e)", "moi aussi", "et toi", "et vous"],
    estimatedTime: "20–25 minutes",
    sections: [
      {
        type: "warmup",
        title: "Warm-Up",
        content: "You already know how to say Je suis [name]. Today you'll learn a second, equally common way the French say their name — one you'll hear even more often in everyday conversation."
      },
      {
        type: "explanation",
        title: "Lesson Explanation",
        content: `While **Je suis [name]** is correct, French speakers most commonly introduce themselves using **je m'appelle**, which literally means "I call myself" but simply translates as "my name is."

• **Je m'appelle Sophie.** — "My name is Sophie."
• **Comment tu t'appelles ?** — "What's your name?" (informal)
• **Enchanté** (said by a man) / **Enchantée** (said by a woman) — "Nice to meet you," said right after learning someone's name.
• **Moi aussi** — "Me too," a natural response when something applies to you as well.
• **Et toi ?** — "And you?" (informal) / **Et vous ?** — "And you?" (formal) — used to turn a question back to the other person.

We're also extending **être**: **il est / elle est** ("he is" / "she is") lets you talk about a third person, not just yourself.`
      },
      {
        type: "vocabulary",
        title: "Vocabulary",
        vocabulary: [
          { french: "je m'appelle", english: "my name is", pronunciation: "zhuh mah-PELL", example: "Je m'appelle Nora." },
          { french: "comment tu t'appelles", english: "what's your name (informal)", pronunciation: "koh-mahn tu tah-PELL", example: "Comment tu t'appelles ?" },
          { french: "enchanté / enchantée", english: "nice to meet you", pronunciation: "ahn-shahn-TAY", example: "Enchantée, Madame !" },
          { french: "moi aussi", english: "me too", pronunciation: "mwah oh-SEE", example: "Moi aussi, enchanté !" },
          { french: "et toi", english: "and you (informal)", pronunciation: "ay TWAH", example: "Ça va, et toi ?" },
          { french: "et vous", english: "and you (formal)", pronunciation: "ay VOO", example: "Bonjour, et vous ?" },
        ]
      },
      {
        type: "grammar",
        title: "Grammar: S'appeler & Être (il/elle est)",
        grammarNotes: `**S'appeler** is a reflexive verb — literally, you "call yourself" a name. At A1, you only need two forms of it. We're also adding the third-person forms of **être**.

**Formation:**

| Pronoun | s'appeler | être |
|---|---|---|
| je | je m'appelle | je suis |
| tu | tu t'appelles | tu es |
| il / elle | il/elle s'appelle | il/elle est |

**Usage:** Use **je m'appelle** to state your own name; use **il/elle est** to describe who someone else is (often paired with a name): *Elle est Camille.*`,
        grammarExamples: [
          "Je m'appelle Hugo. Et toi ?",
          "Elle s'appelle Inès.",
          "Il est content. (He is happy.) — a preview of how être connects to more than names."
        ],
        grammarMistakes: [
          { wrong: "Je m'appelle est Marc.", correct: "Je m'appelle Marc. (No est needed with s'appeler.)" },
          { wrong: "Il s'appelle il Paul.", correct: "Il s'appelle Paul." }
        ],
        grammarDrills: [
          { prompt: "__________ (je m'appelle) Sarah.", answer: "Je m'appelle" },
          { prompt: "__________ (il s'appelle) Antoine.", answer: "Il s'appelle" },
        ]
      },
      {
        type: "reading",
        title: "Reading: Au Parc (At the Park)",
        readingTitle: "Au Parc",
        readingText: `Élise : Bonjour ! Je m'appelle Élise.
Marco : Enchanté ! Je m'appelle Marco.
Élise : Moi aussi, enchantée ! Et elle, comment elle s'appelle ?
Marco : Elle s'appelle Julie. Elle est ma sœur.`,
        comprehensionQuestions: [
          { question: "What is the first girl's name?", answer: "Élise." },
          { question: "Who is Julie?", answer: "Marco's sister." },
          { question: "What word does Marco use to describe his relationship to Julie?", answer: "Ma sœur (my sister)." },
        ]
      },
      {
        type: "listening",
        title: "Listening: Nouveaux Voisins (New Neighbors)",
        listeningTranscript: `**Nouveaux Voisins**
Voix 1 : Bonjour ! Je m'appelle Thomas.
Voix 2 : Enchantée, Thomas ! Je m'appelle Claire.
Voix 1 : Et lui, comment il s'appelle ?
Voix 2 : Il s'appelle Léo. Il est mon fils.`,
        listeningTrueFalse: [
          { statement: "Voix 2's name is Thomas.", answer: false, explanation: "Voix 2 is Claire." },
          { statement: "Léo is Claire's son.", answer: true },
        ]
      },
      {
        type: "speaking",
        title: "Speaking: Introducing Yourself",
        speakingPrompt: "Practice introducing yourself aloud using je m'appelle, then add Enchanté(e) !",
        speakingRoleplay: [
          { personA: "Introduces themselves using je m'appelle.", personB: "Responds with enchanté(e) and introduces themselves too." },
          { personA: "Introduces a third 'imaginary' person using il/elle s'appelle.", personB: "Acknowledges the introduction." },
        ],
        pronunciationTip: 'The "eu" sound in je and deux is made with rounded lips, unlike any English vowel — practice it by saying "uh" while rounding your lips forward.'
      },
      {
        type: "writing",
        title: "Writing: Short Introduction",
        writingTask: "Write a short introduction (3 sentences) introducing yourself and one other person (real or imaginary).",
        writingModel: "Je m'appelle Alex. Enchanté ! Elle s'appelle Nina, elle est ma collègue.",
        writingChecklist: [
          "Used je m'appelle correctly.",
          "Introduced a second person using il/elle s'appelle.",
          "Included enchanté(e)."
        ]
      },
      {
        type: "practice",
        title: "Practice Exercises",
        mcq: [
          {
            question: '"My name is" translates to:',
            options: ["Je suis", "Je m'appelle", "Il est", "Et toi"],
            correctIndex: 1,
            explanation: "Je m'appelle is the most common way to say 'my name is' in French."
          }
        ],
        matching: [
          { left: "Enchanté", right: "Nice to meet you (male speaker)" },
          { left: "Et vous", right: "And you? (formal)" },
          { left: "Moi aussi", right: "Me too" },
        ],
        fillBlank: [
          { text: "Elle __________ Camille. (s'appeler)", answer: "s'appelle" }
        ],
        ordering: [
          { text: "Enchanté !" },
          { text: "Je m'appelle Marc." },
          { text: "Bonjour !" },
        ],
        shortAnswer: [
          { question: "Explain the difference between et toi and et vous.", modelAnswer: "Et toi is used informally with people you know well; et vous is used formally, with strangers or in polite contexts." }
        ]
      },
      {
        type: "review",
        title: "Mini Review",
        content: `You can now introduce yourself using **je m'appelle**, respond to an introduction with **enchanté(e)**, and describe a third person using **il/elle s'appelle** and **il/elle est**.`
      },
      {
        type: "selfcheck",
        title: "Self Assessment",
        selfCheck: [
          "I can introduce myself using je m'appelle.",
          "I can say 'nice to meet you' correctly for my gender.",
          "I can introduce someone else.",
          "I know the difference between et toi and et vous."
        ]
      }
    ]
  },

  "3": {
    id: "3",
    chapter: "A1.1.1",
    chapterTitle: "Greetings & Identity",
    lessonNumber: 3,
    title: "Asking Someone's Name",
    anchorSkill: "Listening (L)",
    objectives: [
      "Ask someone's name in both informal and formal registers",
      "Understand the answer",
    ],
    grammarFocus: "Question formation with est-ce que and rising intonation; être extended to nous sommes / vous êtes",
    vocabularyFocus: ["comment vous appelez-vous", "qui est-ce", "c'est", "est-ce que"],
    estimatedTime: "20–25 minutes",
    sections: [
      {
        type: "warmup",
        title: "Warm-Up",
        content: "Think of three ways you might ask someone's name in your own language depending on how formal the situation is. French makes exactly this same distinction."
      },
      {
        type: "explanation",
        title: "Lesson Explanation",
        content: `You already know **comment tu t'appelles ?** for informal situations. The formal version is **comment vous appelez-vous ?** — used with strangers, elders, or in professional settings.

French can form a yes/no question three ways at A1: rising intonation alone (*Tu es Marc ?*), or adding **est-ce que** to the front of a statement (*Est-ce que tu es Marc ?*). Both are common in speech; **est-ce que** is slightly more explicit and useful while you're still learning to hear intonation.

**Qui est-ce ?** means "Who is it / who is that?" and **c'est** ("it is / that is") is used to answer: *C'est Marc.*

We also complete more of **être**: **nous sommes** ("we are") and **vous êtes** ("you are," formal or plural).`
      },
      {
        type: "vocabulary",
        title: "Vocabulary",
        vocabulary: [
          { french: "comment vous appelez-vous", english: "what's your name (formal)", pronunciation: "koh-mahn voo zah-play VOO", example: "Comment vous appelez-vous, Madame ?" },
          { french: "qui est-ce", english: "who is it / that", pronunciation: "kee ESS", example: "Qui est-ce, là-bas ?" },
          { french: "c'est", english: "it is / that is", pronunciation: "SEH", example: "C'est Monsieur Dubois." },
          { french: "est-ce que", english: "(question marker)", pronunciation: "ess kuh", example: "Est-ce que vous êtes Madame Roy ?" },
        ]
      },
      {
        type: "grammar",
        title: "Grammar: Full Present Tense of Être & Question Formation",
        grammarNotes: `This lesson finishes the present tense of **être** and adds two ways to ask questions.

**Formation — Full Present Tense of Être (so far):**

| Pronoun | Être |
|---|---|
| je | suis |
| tu | es |
| il / elle | est |
| nous | sommes |
| vous | êtes |
| ils / elles | (introduced next chapter) |

**Usage:** **Est-ce que** + statement turns any statement into a question: *Vous êtes Madame Roy.* → *Est-ce que vous êtes Madame Roy ?*`,
        grammarExamples: [
          "Est-ce que tu es Léa ?",
          "Nous sommes en classe.",
          "Vous êtes Monsieur Petit ?"
        ],
        grammarMistakes: [
          { wrong: "Est-ce vous êtes Marc ?", correct: "Est-ce que vous êtes Marc ? (Never drop que.)" },
          { wrong: "Nous êtes", correct: "Nous sommes (Don't mix up conjugation endings.)" }
        ],
        grammarDrills: [
          { prompt: "Turn into a question using est-ce que: Tu es Camille. → __________", answer: "Est-ce que tu es Camille ?" },
          { prompt: "Complete: Nous __________ amis. (être)", answer: "sommes" },
        ]
      },
      {
        type: "reading",
        title: "Reading: Qui Est-Ce ?",
        readingTitle: "Qui Est-Ce ?",
        readingText: `Nadia : Qui est-ce, là-bas ?
Karim : C'est Madame Vidal.
Nadia : Est-ce que vous êtes Madame Vidal ?
Madame Vidal : Oui, c'est moi ! Et vous, comment vous appelez-vous ?
Nadia : Je m'appelle Nadia.`,
        comprehensionQuestions: [
          { question: "Who does Karim point out?", answer: "Madame Vidal." },
          { question: "What question does Nadia ask Madame Vidal?", answer: "Est-ce que vous êtes Madame Vidal ?" },
          { question: "Is the exchange between Nadia and Madame Vidal formal or informal? How do you know?", answer: "Formal — Nadia uses vous, appropriate since Madame Vidal is a stranger and older." },
        ]
      },
      {
        type: "listening",
        title: "Listening: À La Réception (At the Front Desk)",
        listeningTranscript: `**À La Réception**
Réceptionniste : Bonjour ! Comment vous appelez-vous ?
Client : Je m'appelle Monsieur Blanc.
Réceptionniste : Est-ce que vous êtes Monsieur Paul Blanc ?
Client : Oui, c'est moi.`,
        listeningMCQ: [
          { question: "Is this conversation formal or informal?", options: ["Formal", "Informal"], correctIndex: 0 },
          { question: "What does the receptionist confirm at the end?", options: ["The client's room number", "That the client is specifically Monsieur Paul Blanc", "The client's departure date"], correctIndex: 1 },
        ]
      },
      {
        type: "speaking",
        title: "Speaking: Formal vs Informal",
        speakingPrompt: 'Practice asking "What\'s your name?" both informally and formally, switching between them based on prompts (e.g., "ask a classmate" vs. "ask your new boss").',
        speakingRoleplay: [
          { personA: "Hotel receptionist (formal, uses vous).", personB: "Guest checking in. Exchange names using the formal register throughout." },
        ],
        pronunciationTip: 'In est-ce que, the final "e" of que is barely pronounced in natural speech — listen for "ess-kuh" rather than a fully separated "ess-kuh-euh."'
      },
      {
        type: "writing",
        title: "Writing: Formal Exchange",
        writingTask: "Write a short formal exchange (3–4 lines) in which you ask someone's name using vous.",
        writingModel: "Bonjour, Madame. Comment vous appelez-vous ? — Je m'appelle Madame Colin. Enchantée.",
        writingChecklist: [
          "Used the formal question form correctly.",
          "Maintained vous throughout (no accidental tu).",
          "Included a polite closing."
        ]
      },
      {
        type: "practice",
        title: "Practice Exercises",
        mcq: [
          {
            question: 'The formal way to ask "What\'s your name?" is:',
            options: ["Comment tu t'appelles ?", "Comment vous appelez-vous ?", "Qui est-ce ?", "C'est qui ?"],
            correctIndex: 1,
            explanation: "Comment vous appelez-vous is the formal version."
          }
        ],
        matching: [
          { left: "C'est", right: "It is / that is" },
          { left: "Qui est-ce", right: "Who is it?" },
          { left: "Nous sommes", right: "We are" },
        ],
        fillBlank: [
          { text: "__________ vous êtes Madame Faure ? (add the question marker)", answer: "Est-ce que" }
        ],
        ordering: [
          { text: "Je m'appelle Léo." },
          { text: "Comment vous appelez-vous ?" },
          { text: "Bonjour, Monsieur." },
        ],
        shortAnswer: [
          { question: "When would you use comment vous appelez-vous instead of comment tu t'appelles?", modelAnswer: "With strangers, elders, or in formal/professional settings." }
        ]
      },
      {
        type: "review",
        title: "Mini Review",
        content: `You can now ask someone's name formally or informally, form basic yes/no questions with **est-ce que**, and use the complete present-tense forms of **être** for **je**, **tu**, **il/elle**, **nous**, **vous**.`
      },
      {
        type: "selfcheck",
        title: "Self Assessment",
        selfCheck: [
          "I can ask someone's name formally and informally.",
          "I can form a question using est-ce que.",
          "I know all forms of être introduced so far."
        ]
      }
    ]
  },

  "4": {
    id: "4",
    chapter: "A1.1.1",
    chapterTitle: "Greetings & Identity",
    lessonNumber: 4,
    title: "How Are You?",
    anchorSkill: "Writing (W)",
    objectives: [
      "Ask and answer 'How are you?' appropriately in formal and informal contexts",
      "Describe basic feelings",
    ],
    grammarFocus: "être + adjective for describing feelings (je suis fatigué(e)); adjective agreement introduced minimally (masculine/feminine)",
    vocabularyFocus: ["comment ça va", "comment allez-vous", "ça va bien/mal", "fatigué(e)", "content(e)", "un peu"],
    estimatedTime: "25–30 minutes",
    sections: [
      {
        type: "warmup",
        title: "Warm-Up",
        content: '"How are you?" is one of the most common exchanges in any language — but the answer isn\'t always a real answer! Think about how automatic your own "I\'m fine, thanks" can be. French works the same way.'
      },
      {
        type: "explanation",
        title: "Lesson Explanation",
        content: `**Comment ça va ?** ("How's it going?") is the informal way to ask how someone is; **Comment allez-vous ?** is the formal equivalent. Both can be answered simply with **ça va** ("I'm okay / it's going well") or **ça va bien/mal** ("it's going well/badly").

To describe how you feel more specifically, French uses **être** + an adjective: *Je suis fatigué* (a man says) / *Je suis fatiguée* (a woman says) — "I am tired." Adjectives describing a female subject typically add an **-e** at the end; this is your first encounter with adjective agreement, a pattern you'll see constantly in French.

**Un peu** ("a little") softens a description: *Je suis un peu fatigué(e)*.`
      },
      {
        type: "vocabulary",
        title: "Vocabulary",
        vocabulary: [
          { french: "comment ça va", english: "how's it going (informal)", pronunciation: "koh-mahn sah VAH", example: "Salut ! Comment ça va ?" },
          { french: "comment allez-vous", english: "how are you (formal)", pronunciation: "koh-mahn tah-lay VOO", example: "Bonjour, comment allez-vous ?" },
          { french: "ça va bien", english: "it's going well", pronunciation: "sah vah byan", example: "Ça va bien, merci !" },
          { french: "ça va mal", english: "it's going badly", pronunciation: "sah vah MAHL", example: "Ça va mal aujourd'hui." },
          { french: "fatigué / fatiguée", english: "tired", pronunciation: "fah-tee-GAY", example: "Je suis fatigué." },
          { french: "content / contente", english: "happy", pronunciation: "kohn-TAHN / kohn-TAHNT", example: "Elle est contente." },
          { french: "un peu", english: "a little", pronunciation: "uhn PUH", example: "Je suis un peu fatiguée." },
        ]
      },
      {
        type: "grammar",
        title: "Grammar: Être + Adjective & Gender Agreement",
        grammarNotes: `When **être** is followed by an adjective describing a person, the adjective usually changes form depending on whether the person is male or female — this is called **adjective agreement**. At A1, the most common pattern is simply adding **-e** for feminine.

**Formation:**

• Masculine: *Il est content. / Il est fatigué.*
• Feminine: *Elle est contente. / Elle est fatiguée.*

**Usage:** The extra **-e** does not change the pronunciation of **fatigué/fatiguée** but does change the pronunciation of **content/contente** (the final "t" becomes audible in the feminine form).`,
        grammarExamples: [
          "Je suis content. (a man speaking)",
          "Je suis contente. (a woman speaking)",
          "Nous sommes un peu fatigués. (plural agreement is previewed here only for recognition, not production)"
        ],
        grammarMistakes: [
          { wrong: 'A woman saying "Je suis content."', correct: "Je suis contente. (Match the adjective to your own gender.)" },
          { wrong: "Je suis très fatigué mal.", correct: "Je suis très fatigué(e). (Don't stack two feeling-words together.)" }
        ],
        grammarDrills: [
          { prompt: "A woman says she is tired: Je suis __________.", answer: "fatiguée" },
          { prompt: "A man says he is happy: Je suis __________.", answer: "content" },
        ]
      },
      {
        type: "reading",
        title: "Reading: Une Journée Fatigante (A Tiring Day)",
        readingTitle: "Une Journée Fatigante",
        readingText: `Léo : Salut, Emma ! Comment ça va ?
Emma : Ça va mal aujourd'hui... Je suis très fatiguée.
Léo : Oh non ! Moi, ça va bien, je suis content.
Emma : Un peu de repos, et ça va aller mieux !`,
        comprehensionQuestions: [
          { question: "How does Emma feel today?", answer: "Tired (très fatiguée) and not well (ça va mal)." },
          { question: "How does Léo feel?", answer: "Happy (content) and well (ça va bien)." },
          { question: "What does Emma say will help?", answer: "A little rest (un peu de repos)." },
        ]
      },
      {
        type: "listening",
        title: "Listening: Un Appel Téléphonique (A Phone Call)",
        listeningTranscript: `**Un Appel Téléphonique**
Papa : Bonjour, ma chérie. Comment ça va ?
Fille : Ça va bien, Papa, merci ! Et toi ?
Papa : Ça va, je suis un peu fatigué, mais content.`,
        listeningFillBlank: [
          { text: "The daughter says she is __________.", answer: "doing well (ça va bien)" },
          { text: "The father says he is __________ but __________.", answer: "a little tired (un peu fatigué) / happy (content)" },
        ]
      },
      {
        type: "speaking",
        title: "Speaking: How Are You?",
        speakingPrompt: 'Practice asking and answering "How are you?" using both the formal and informal forms, giving a different feeling each time (tired, happy, "so-so").',
        speakingRoleplay: [
          { personA: "Calls Partner B on the phone (informal, family member).", personB: "Answers honestly using an adjective from this lesson, matched correctly to their own gender." },
        ],
        pronunciationTip: 'Listen carefully for the difference between content and contente — the "t" sound at the end only appears in the feminine form.'
      },
      {
        type: "writing",
        title: "Writing: How I Feel Today",
        writingTask: "Write a short paragraph (3–4 sentences) describing how you are feeling today, using at least one adjective with correct gender agreement.",
        writingModel: "Bonjour ! Aujourd'hui, ça va bien. Je suis un peu fatiguée, mais contente. Et toi, comment ça va ?",
        writingChecklist: [
          "Used ça va or a related expression.",
          "Used at least one adjective with correct gender agreement.",
          "Included un peu correctly, if used."
        ]
      },
      {
        type: "practice",
        title: "Practice Exercises",
        mcq: [
          {
            question: 'A woman saying "I am happy" should say:',
            options: ["Je suis content", "Je suis contente", "Je es content", "Tu es content"],
            correctIndex: 1,
            explanation: "Je suis contente (feminine agreement with -e)."
          }
        ],
        matching: [
          { left: "Ça va bien", right: "It's going well" },
          { left: "Ça va mal", right: "It's going badly" },
          { left: "Un peu", right: "A little" },
        ],
        fillBlank: [
          { text: "Il est __________. (tired, masculine)", answer: "fatigué" }
        ],
        ordering: [
          { text: "Comment ça va ?" },
          { text: "Ça va bien, merci !" },
          { text: "Salut !" },
        ],
        shortAnswer: [
          { question: "Why does fatiguée have an extra 'e' compared to fatigué?", modelAnswer: "Because the adjective agrees with a feminine subject; French adjectives typically add -e when describing a woman." }
        ]
      },
      {
        type: "review",
        title: "Mini Review",
        content: `You can now ask and answer "How are you?" formally and informally, and describe feelings using **être** + an adjective, correctly agreeing the adjective with your own gender.`
      },
      {
        type: "selfcheck",
        title: "Self Assessment",
        selfCheck: [
          "I can ask 'how are you' both formally and informally.",
          "I can answer with ça va bien/mal.",
          "I can describe a feeling using the correct adjective agreement."
        ]
      }
    ]
  },
};
