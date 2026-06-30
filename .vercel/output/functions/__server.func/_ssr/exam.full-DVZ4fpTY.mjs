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
const examContent = {
  v2: [{
    key: "listening",
    title: "Comprehension de l oral",
    icon: "🎧",
    description: "Listen to announcements and conversations. Answer questions based on what you hear.",
    tasks: [{
      id: "l1",
      prompt: "Train station: 'Le TGV 6607 pour Marseille partira a neuf heures quinze, quai numero quatre.' What time does the train leave?",
      type: "multiple-choice",
      options: ["9h04", "9h15", "9h50", "10h15"],
      correctAnswer: "9h15",
      maxPoints: 5
    }, {
      id: "l2",
      prompt: "What is the platform number?",
      type: "multiple-choice",
      options: ["4", "7", "6", "12"],
      correctAnswer: "4",
      maxPoints: 5
    }, {
      id: "l3",
      prompt: "Voicemail: 'Salut, on se retrouve au parc a quinze heures pour le pique-nique.' Where is the meeting?",
      type: "fill-blank",
      correctAnswer: "au parc",
      maxPoints: 5
    }, {
      id: "l4",
      prompt: "What time is the picnic?",
      type: "multiple-choice",
      options: ["15h00", "14h00", "16h00", "17h00"],
      correctAnswer: "15h00",
      maxPoints: 5
    }, {
      id: "l5",
      prompt: "Directions: 'Continuez tout droit, tournez a gauche apres la boulangerie.' What landmark is mentioned for turning?",
      type: "fill-blank",
      correctAnswer: "la boulangerie",
      maxPoints: 5
    }]
  }, {
    key: "reading",
    title: "Comprehension des ecrits",
    icon: "📖",
    description: "Read short texts, emails, schedules, and answer comprehension questions.",
    tasks: [{
      id: "r1",
      prompt: "Email: 'Bonjour, nous avons une reunion vendredi a quatorze heures trente dans la salle B.' What day is the meeting?",
      type: "multiple-choice",
      options: ["Lundi", "Mardi", "Vendredi", "Jeudi"],
      correctAnswer: "Vendredi",
      maxPoints: 5
    }, {
      id: "r2",
      prompt: "What time is the meeting?",
      type: "multiple-choice",
      options: ["13h30", "14h30", "15h30", "16h30"],
      correctAnswer: "14h30",
      maxPoints: 5
    }, {
      id: "r3",
      prompt: "Cinema: 'Amelie Poulain: 14h00, 18h30, 21h00.' What is the latest showing?",
      type: "multiple-choice",
      options: ["14h00", "18h30", "21h00", "20h00"],
      correctAnswer: "21h00",
      maxPoints: 5
    }, {
      id: "r4",
      prompt: "Recipe: 'Ingredients: 250g farine, 3 oeufs, un demi-litre de lait.' How many eggs?",
      type: "multiple-choice",
      options: ["2", "3", "5", "4"],
      correctAnswer: "3",
      maxPoints: 5
    }, {
      id: "r5",
      prompt: "Sign: 'Pharmacie ouverte 8h-19h du lundi au samedi.' Is it open on Sunday?",
      type: "multiple-choice",
      options: ["Oui", "Non", "On ne sait pas", "Seulement le matin"],
      correctAnswer: "Non",
      maxPoints: 5
    }]
  }, {
    key: "writing",
    title: "Production ecrite",
    icon: "✍️",
    description: "Complete forms and write short messages. Type your answers in French.",
    tasks: [{
      id: "w1",
      prompt: "Fill in your profile:\nName: _______\nAge: _______\nNationality: _______\nLanguages: _______",
      type: "prompt",
      maxPoints: 10
    }, {
      id: "w2",
      prompt: "Write a postcard (40-50 words) to a friend from vacation. Describe the weather and what you are wearing.",
      type: "prompt",
      maxPoints: 15
    }]
  }, {
    key: "speaking",
    title: "Production orale",
    icon: "🗣️",
    description: "Prepare and review your spoken responses. Read each prompt aloud.",
    tasks: [{
      id: "s1",
      prompt: "Part 1: Introduce your family. Say their names and relationships.",
      type: "prompt",
      maxPoints: 10
    }, {
      id: "s2",
      prompt: "Part 2: Ask 3 questions about a friend s house (number of rooms, garden, etc.).",
      type: "prompt",
      maxPoints: 7
    }, {
      id: "s3",
      prompt: "Part 3: Role Play - At the bakery. Order 2 baguettes and a pain au chocolat.",
      type: "prompt",
      maxPoints: 8
    }]
  }]
};
function FullExamPage() {
  const [started, setStarted] = reactExports.useState(false);
  const [finished, setFinished] = reactExports.useState(false);
  const [version, setVersion] = reactExports.useState("v2");
  const [currentSection, setCurrentSection] = reactExports.useState(0);
  const [currentTask, setCurrentTask] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState({});
  const [timeLeft, setTimeLeft] = reactExports.useState(60 * 30);
  const timerRef = reactExports.useRef(null);
  const sections = examContent[version] || examContent["v2"];
  const section = sections[currentSection];
  const task = section?.tasks[currentTask];
  const totalTasks = sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const completedTasks = Object.keys(answers).length;
  reactExports.useEffect(() => {
    if (started && !finished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1e3);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, finished, timeLeft]);
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  const handleAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [task.id]: value
    }));
  };
  const goNext = () => {
    if (currentTask < section.tasks.length - 1) {
      setCurrentTask((t) => t + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection((s) => s + 1);
      setCurrentTask(0);
    } else {
      setFinished(true);
    }
  };
  const goBack = () => {
    if (currentTask > 0) {
      setCurrentTask((t) => t - 1);
    } else if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
      const prevSection = sections[currentSection - 1];
      setCurrentTask(prevSection.tasks.length - 1);
    }
  };
  const totalScore = sections.reduce((sum, sec) => sum + sec.tasks.reduce((s, t) => s + t.maxPoints, 0), 0);
  const sectionScores = sections.map((sec) => {
    let earned = 0;
    let possible = 0;
    sec.tasks.forEach((t) => {
      possible += t.maxPoints;
      const ans = answers[t.id];
      if (ans && t.correctAnswer && ans.toLowerCase().trim() === t.correctAnswer.toLowerCase().trim()) {
        earned += t.maxPoints;
      }
    });
    return {
      key: sec.key,
      title: sec.title,
      earned,
      possible
    };
  });
  const totalEarned = sectionScores.reduce((s, x) => s + x.earned, 0);
  const passed = totalEarned >= 50 && sectionScores.every((s) => s.earned >= 5);
  const totalExercisesCount = sections.reduce((s, sec) => s + sec.tasks.length, 0);
  if (!started) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Full A1 Exam" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-gray-600", children: [
        "Timed exam: ",
        sections.length,
        " sections, ",
        totalExercisesCount,
        " questions, 100 points total."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: sections.map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: sec.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: sec.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [
            sec.tasks.length,
            " tasks, ",
            sec.tasks.reduce((s, t) => s + t.maxPoints, 0),
            " points"
          ] })
        ] })
      ] }, sec.key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Passing criteria:" }),
        " Score 50/100 total AND at least 5/25 in each section.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "No translations are available in Full Exam mode."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam", className: "rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300", children: "Back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStarted(true), className: "rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700", children: "Start Exam (30 min)" })
      ] })
    ] });
  }
  if (finished) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 text-center", children: "Exam Complete" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-5xl font-bold ${passed ? "text-green-600" : "text-red-600"}`, children: [
          totalEarned,
          " / ",
          totalScore
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-gray-600", children: passed ? "Congratulations! You passed the A1 exam!" : "You did not pass this time. Review the modules and try again." }),
        passed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-green-600 font-medium", children: "A2 level is now unlocked!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-2", children: sectionScores.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm font-medium ${s.earned >= 5 ? "text-green-600" : "text-red-600"}`, children: [
          s.earned,
          "/",
          s.possible,
          " ",
          s.earned >= 5 ? "✓" : "✗"
        ] })
      ] }, s.key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam", className: "rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300", children: "Back to Exam" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setStarted(false);
          setFinished(false);
          setCurrentSection(0);
          setCurrentTask(0);
          setAnswers({});
          setTimeLeft(1800);
        }, className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700", children: "Retake Exam" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam", className: "text-sm text-indigo-600 hover:underline", children: "← Quit Exam" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: [
          "Task ",
          completedTasks,
          "/",
          totalTasks
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-sm font-medium ${timeLeft < 300 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`, children: formatTime(timeLeft) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex gap-2", children: sections.map((sec, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 rounded-full h-2 ${i < currentSection ? "bg-green-400" : i === currentSection ? "bg-indigo-400" : "bg-gray-200"}` }, sec.key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: section.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold uppercase tracking-wider text-indigo-600", children: [
            "Section ",
            currentSection + 1,
            " of ",
            sections.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: section.title })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: section.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 text-xs text-gray-400", children: [
        "Task ",
        currentTask + 1,
        " of ",
        section.tasks.length,
        " (",
        task.maxPoints,
        " pts)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-gray-900 whitespace-pre-line", children: task.prompt }),
      task.type === "multiple-choice" && task.options && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: task.options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleAnswer(opt), className: `w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${answers[task.id] === opt ? "border-indigo-400 bg-indigo-50 text-indigo-800" : "border-gray-200 hover:border-indigo-300 text-gray-700"}`, children: opt }, opt)) }),
      task.type === "fill-blank" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: answers[task.id] || "", onChange: (e) => handleAnswer(e.target.value), placeholder: "Type your answer in French...", className: "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-400 focus:outline-none" }) }),
      task.type === "prompt" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: answers[task.id] || "", onChange: (e) => handleAnswer(e.target.value), placeholder: "Write your response in French...", rows: 4, className: "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-400 focus:outline-none" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: goBack, disabled: currentSection === 0 && currentTask === 0, className: "rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-30", children: "← Previous" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: goNext, className: "rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700", children: currentSection === sections.length - 1 && currentTask === section.tasks.length - 1 ? "Finish Exam" : "Next →" })
    ] })
  ] });
}
export {
  FullExamPage as component
};
