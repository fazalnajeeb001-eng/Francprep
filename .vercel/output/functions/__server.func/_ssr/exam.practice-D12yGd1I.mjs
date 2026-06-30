import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const questions = [{
  id: 1,
  section: "Listening",
  type: "multiple-choice",
  question: 'You hear: "Le train pour Lyon part a 14h15." At what time does the train leave?',
  options: ["14h50", "14h15", "15h14", "14h30"],
  correctAnswer: "14h15",
  explanation: "14h15 = 2:15 PM in English."
}, {
  id: 2,
  section: "Reading",
  type: "multiple-choice",
  question: 'Menu: "Soupe a l oignon, Poulet roti, Tarte aux pommes." What is the dessert?',
  options: ["Soupe a l oignon", "Poulet roti", "Tarte aux pommes", "Menu du jour"],
  correctAnswer: "Tarte aux pommes",
  explanation: "Tarte aux pommes = apple tart (dessert)."
}, {
  id: 3,
  section: "Grammar",
  type: "multiple-choice",
  question: 'Choose the correct preposition: "J habite ____ Paris."',
  options: ["a", "en", "au", "dans"],
  correctAnswer: "a",
  explanation: "Use 'a' for cities: J'habite a Paris."
}, {
  id: 4,
  section: "Vocabulary",
  type: "multiple-choice",
  question: 'After eating too much candy: "J ai mal aux ____"',
  options: ["dents", "bras", "ventre", "pieds"],
  correctAnswer: "dents",
  explanation: "Dents = teeth. Trop de bonbons = too much candy, bad for teeth!"
}, {
  id: 5,
  section: "Listening",
  type: "multiple-choice",
  question: 'You hear: "Salut, c est Marc. Je ne peux pas venir au cinema, je suis malade." Why cant Marc come?',
  options: ["He is busy", "He is sick", "He has to work", "He is on vacation"],
  correctAnswer: "He is sick",
  explanation: "Je suis malade = I am sick."
}, {
  id: 6,
  section: "Reading",
  type: "multiple-choice",
  question: 'Sign: "Pharmacie ouverte de 8h00 a 19h00." Is the pharmacy open at 20h00?',
  options: ["Yes", "No", "Only on weekends", "Only in the morning"],
  correctAnswer: "No",
  explanation: "20h00 (8 PM) is after 19h00 (7 PM) closing time."
}, {
  id: 7,
  section: "Grammar",
  type: "multiple-choice",
  question: 'Complete: "Nous ____ a la plage."',
  options: ["allons", "allez", "vont", "vas"],
  correctAnswer: "allons",
  explanation: "Nous allons = We go (first person plural of aller)."
}, {
  id: 8,
  section: "Writing",
  type: "multiple-choice",
  question: 'Fill in the blank: "Bonjour, je m ____ Thomas. J ai 20 ans."',
  options: ["appelle", "appelles", "appelons", "appellent"],
  correctAnswer: "appelle",
  explanation: "Je m'appelle = My name is (first person of s'appeler)."
}, {
  id: 9,
  section: "Listening",
  type: "multiple-choice",
  question: 'You hear: "Ma chemise coute quarante-cinq euros." How much does the shirt cost?',
  options: ["35 euros", "45 euros", "55 euros", "65 euros"],
  correctAnswer: "45 euros",
  explanation: "Quarante-cinq = 45 in French."
}, {
  id: 10,
  section: "Reading",
  type: "multiple-choice",
  question: 'Email: "Viens chez moi a 19h pour mon anniversaire." What is the occasion?',
  options: ["A meeting", "A birthday", "A party", "A dinner"],
  correctAnswer: "A birthday",
  explanation: "Mon anniversaire = my birthday."
}, {
  id: 11,
  section: "Vocabulary",
  type: "multiple-choice",
  question: "Pick the odd one out:",
  options: ["Pomme", "Banane", "Voiture", "Orange"],
  correctAnswer: "Voiture",
  explanation: "Pomme (apple), Banane (banana), Orange (orange) are fruits. Voiture (car) is not."
}, {
  id: 12,
  section: "Speaking",
  type: "multiple-choice",
  question: "Can you introduce yourself in French in 30 seconds?",
  options: ["Yes, I can!", "Not yet", "I need more practice", "What do I say?"],
  correctAnswer: "Yes, I can!",
  explanation: "Try: Je m'appelle [name]. J'ai [age] ans. Je suis [nationality]. Je suis [job]."
}];
function PracticePage() {
  const [currentQ, setCurrentQ] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState({});
  const [showResults, setShowResults] = reactExports.useState(false);
  const [selectedAnswer, setSelectedAnswer] = reactExports.useState(null);
  const [showExplanation, setShowExplanation] = reactExports.useState(false);
  const q = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const hasAnswered = answers[q.id] !== void 0;
  const handleAnswer = (answer) => {
    if (hasAnswered) return;
    setSelectedAnswer(answer);
    setAnswers((prev) => ({
      ...prev,
      [q.id]: answer
    }));
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
  const percent = Math.round(correctCount / questions.length * 100);
  if (showResults) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white text-center", children: "Practice Results" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-5xl font-bold text-indigo-600 dark:text-indigo-400", children: [
          percent,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-gray-600 dark:text-gray-400", children: [
          correctCount,
          " / ",
          questions.length,
          " correct"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam", className: "rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300", children: "Back to Exam" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setCurrentQ(0);
          setAnswers({});
          setShowResults(false);
        }, className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700", children: "Try Again" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam", className: "text-sm text-indigo-600 hover:underline", children: "← Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: [
        "Question ",
        currentQ + 1,
        " / ",
        questions.length
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700", children: q.section }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600", children: q.type })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: q.question }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: q.options?.map((opt) => {
      let btnClass = "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ";
      if (hasAnswered) {
        if (opt === q.correctAnswer) btnClass += "border-green-400 bg-green-50 text-green-800 ";
        else if (opt === selectedAnswer && opt !== q.correctAnswer) btnClass += "border-red-400 bg-red-50 text-red-800 ";
        else btnClass += "border-gray-200 text-gray-500 ";
      } else {
        btnClass += "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 ";
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleAnswer(opt), className: btnClass, disabled: hasAnswered, children: [
        opt,
        hasAnswered && opt === q.correctAnswer && " ✓",
        hasAnswered && opt === selectedAnswer && opt !== q.correctAnswer && " ✗"
      ] }, opt);
    }) }),
    showExplanation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Explanation:" }),
      " ",
      q.explanation
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: hasAnswered && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: next, className: "rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors", children: isLast ? "Show Results" : "Next Question →" }) })
  ] });
}
export {
  PracticePage as component
};
