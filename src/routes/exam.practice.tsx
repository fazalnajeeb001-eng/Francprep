import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/exam/practice")({
  component: PracticePage,
});

interface Question {
  id: number;
  section: string;
  type: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1, section: "Listening", type: "multiple-choice",
    question: 'You hear: "Le train pour Lyon part a 14h15." At what time does the train leave?',
    options: ["14h50", "14h15", "15h14", "14h30"],
    correctAnswer: "14h15",
    explanation: "14h15 = 2:15 PM in English."
  },
  {
    id: 2, section: "Reading", type: "multiple-choice",
    question: 'Menu: "Soupe a l oignon, Poulet roti, Tarte aux pommes." What is the dessert?',
    options: ["Soupe a l oignon", "Poulet roti", "Tarte aux pommes", "Menu du jour"],
    correctAnswer: "Tarte aux pommes",
    explanation: "Tarte aux pommes = apple tart (dessert)."
  },
  {
    id: 3, section: "Grammar", type: "multiple-choice",
    question: 'Choose the correct preposition: "J habite ____ Paris."',
    options: ["a", "en", "au", "dans"],
    correctAnswer: "a",
    explanation: "Use 'a' for cities: J'habite a Paris."
  },
  {
    id: 4, section: "Vocabulary", type: "multiple-choice",
    question: 'After eating too much candy: "J ai mal aux ____"',
    options: ["dents", "bras", "ventre", "pieds"],
    correctAnswer: "dents",
    explanation: "Dents = teeth. Trop de bonbons = too much candy, bad for teeth!"
  },
  {
    id: 5, section: "Listening", type: "multiple-choice",
    question: 'You hear: "Salut, c est Marc. Je ne peux pas venir au cinema, je suis malade." Why cant Marc come?',
    options: ["He is busy", "He is sick", "He has to work", "He is on vacation"],
    correctAnswer: "He is sick",
    explanation: "Je suis malade = I am sick."
  },
  {
    id: 6, section: "Reading", type: "multiple-choice",
    question: 'Sign: "Pharmacie ouverte de 8h00 a 19h00." Is the pharmacy open at 20h00?',
    options: ["Yes", "No", "Only on weekends", "Only in the morning"],
    correctAnswer: "No",
    explanation: "20h00 (8 PM) is after 19h00 (7 PM) closing time."
  },
  {
    id: 7, section: "Grammar", type: "multiple-choice",
    question: 'Complete: "Nous ____ a la plage."',
    options: ["allons", "allez", "vont", "vas"],
    correctAnswer: "allons",
    explanation: "Nous allons = We go (first person plural of aller)."
  },
  {
    id: 8, section: "Writing", type: "multiple-choice",
    question: 'Fill in the blank: "Bonjour, je m ____ Thomas. J ai 20 ans."',
    options: ["appelle", "appelles", "appelons", "appellent"],
    correctAnswer: "appelle",
    explanation: "Je m'appelle = My name is (first person of s'appeler)."
  },
  {
    id: 9, section: "Listening", type: "multiple-choice",
    question: 'You hear: "Ma chemise coute quarante-cinq euros." How much does the shirt cost?',
    options: ["35 euros", "45 euros", "55 euros", "65 euros"],
    correctAnswer: "45 euros",
    explanation: "Quarante-cinq = 45 in French."
  },
  {
    id: 10, section: "Reading", type: "multiple-choice",
    question: 'Email: "Viens chez moi a 19h pour mon anniversaire." What is the occasion?',
    options: ["A meeting", "A birthday", "A party", "A dinner"],
    correctAnswer: "A birthday",
    explanation: "Mon anniversaire = my birthday."
  },
  {
    id: 11, section: "Vocabulary", type: "multiple-choice",
    question: 'Pick the odd one out:',
    options: ["Pomme", "Banane", "Voiture", "Orange"],
    correctAnswer: "Voiture",
    explanation: "Pomme (apple), Banane (banana), Orange (orange) are fruits. Voiture (car) is not."
  },
  {
    id: 12, section: "Speaking", type: "multiple-choice",
    question: 'Can you introduce yourself in French in 30 seconds?',
    options: ["Yes, I can!", "Not yet", "I need more practice", "What do I say?"],
    correctAnswer: "Yes, I can!",
    explanation: "Try: Je m'appelle [name]. J'ai [age] ans. Je suis [nationality]. Je suis [job]."
  }
];

function PracticePage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const hasAnswered = answers[q.id] !== undefined;

  const handleAnswer = (answer: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(answer);
    setAnswers((prev) => ({ ...prev, [q.id]: answer }));
    setShowExplanation(true);
  };

  const next = () => {
    if (isLast) {
      setShowResults(true);
    } else {
      setCurrentQ((p) => p + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const correctCount = questions.filter((qItem) => answers[qItem.id] === qItem.correctAnswer).length;
  const percent = Math.round((correctCount / questions.length) * 100);

  if (showResults) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Practice Results</h1>
        <div className="mt-6 text-center">
          <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{percent}%</div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{correctCount} / {questions.length} correct</p>
        </div>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/exam" className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">Back to Exam</Link>
          <button onClick={() => { setCurrentQ(0); setAnswers({}); setShowResults(false); }}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/exam" className="text-sm text-indigo-600 hover:underline">&larr; Back</Link>
        <span className="text-sm text-gray-500">Question {currentQ + 1} / {questions.length}</span>
      </div>
      <div className="mb-2">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">{q.section}</span>
        <span className="ml-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{q.type}</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{q.question}</h2>
      <div className="mt-4 space-y-2">
        {q.options?.map((opt) => {
          let btnClass = "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ";
          if (hasAnswered) {
            if (opt === q.correctAnswer) btnClass += "border-green-400 bg-green-50 text-green-800 ";
            else if (opt === selectedAnswer && opt !== q.correctAnswer) btnClass += "border-red-400 bg-red-50 text-red-800 ";
            else btnClass += "border-gray-200 text-gray-500 ";
          } else {
            btnClass += "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 ";
          }
          return (
            <button key={opt} onClick={() => handleAnswer(opt)} className={btnClass} disabled={hasAnswered}>
              {opt}
              {hasAnswered && opt === q.correctAnswer && " \u2713"}
              {hasAnswered && opt === selectedAnswer && opt !== q.correctAnswer && " \u2717"}
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <strong>Explanation:</strong> {q.explanation}
        </div>
      )}
      <div className="mt-6 flex justify-end">
        {hasAnswered && (
          <button onClick={next} className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
            {isLast ? "Show Results" : "Next Question \u2192"}
          </button>
        )}
      </div>
    </div>
  );
}