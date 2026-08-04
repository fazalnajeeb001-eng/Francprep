import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Award,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Target,
  Clock,
  BookOpen,
  SkipForward,
  ChevronRight,
  Flame,
  FileCheck2,
  GraduationCap
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { useAuth } from "~/lib/AuthContext";
import { speak } from "~/lib/speech";
import { apiFetch } from "~/lib/apiFetch";
import { GOAL_OPTIONS, setGoal as saveGoalToStorage, setDailyStudyGoal, type LearningGoal } from "~/components/dashboard/utils/userPrefs";
import { getTrackBranding } from "~/lib/trackBranding";

export const Route = createFileRoute("/onboarding")({ component: OnboardingPage });

interface Question {
  id: number;
  level: "A1" | "A2" | "B1" | "B2";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const PLACEMENT_QUESTIONS: Question[] = [
  // ─── A1 DISCOVERY (Questions 1 to 5) ───
  {
    id: 1,
    level: "A1",
    question: "Choose the correct phrase for: 'Hello, how are you?'",
    options: [
      "Bonjour, comment allez-vous ?",
      "Au revoir, à bientôt !",
      "S'il vous plaît, merci.",
      "Bonne nuit, dormez bien."
    ],
    correct: 0,
    explanation: "'Bonjour, comment allez-vous ?' is the standard polite French greeting."
  },
  {
    id: 2,
    level: "A1",
    question: "Select the correct form of the verb 'avoir' (to have): 'J'____ 25 ans.'",
    options: ["suis", "ai", "habite", "fait"],
    correct: 1,
    explanation: "In French, age is expressed with 'avoir': 'J'ai 25 ans'."
  },
  {
    id: 3,
    level: "A1",
    question: "Which option correctly completes the sentence: 'Marie a ____ beaux livres.'",
    options: ["de", "un", "une", "des"],
    correct: 0,
    explanation: "Before a plural adjective preceding a noun ('beaux livres'), 'des' becomes 'de'."
  },
  {
    id: 4,
    level: "A1",
    question: "Fill in the blank: 'Où ____-vous ? — À Montréal.'",
    options: ["habitez", "habiter", "habites", "habite"],
    correct: 0,
    explanation: "With subject pronoun 'vous', the regular -er verb ending is '-ez'."
  },
  {
    id: 5,
    level: "A1",
    question: "What is the English translation of: 'Qu'est-ce que c'est ?'",
    options: ["Where is it?", "What is this?", "Who is it?", "How much is it?"],
    correct: 1,
    explanation: "'Qu'est-ce que c'est ?' means 'What is it?' or 'What is this?'."
  },

  // ─── A2 BREAKTHROUGH (Questions 6 to 10) ───
  {
    id: 6,
    level: "A2",
    question: "Which sentence correctly uses the Passé Composé with 'être'?",
    options: [
      "Hier, elle a partie à huit heures.",
      "Hier, elle est partie à huit heures.",
      "Hier, elle allait partir à huit heures.",
      "Hier, elle sera partie à huit heures."
    ],
    correct: 1,
    explanation: "Verbs of movement like 'partir' take 'être' in Passé Composé and agree in gender: 'elle est partie'."
  },
  {
    id: 7,
    level: "A2",
    question: "Complete with Imparfait vs Passé Composé: 'Pendant que je ____, le téléphone a sonné.'",
    options: ["dormais", "suis dormi", "dort", "dormirai"],
    correct: 0,
    explanation: "Background ongoing actions use the Imparfait ('dormais') when interrupted by an event ('a sonné')."
  },
  {
    id: 8,
    level: "A2",
    question: "Replace the object with a pronoun: 'Je vois le professeur tous les matins.'",
    options: [
      "Je lui vois tous les matins.",
      "Je le vois tous les matins.",
      "Je la vois tous les matins.",
      "Je les vois tous les matins."
    ],
    correct: 1,
    explanation: "'Le professeur' is masculine direct object, replaced by 'le'."
  },
  {
    id: 9,
    level: "A2",
    question: "Select the correct Future Proche structure: 'Demain, nous ____ visiter le musée.'",
    options: ["allons", "irons", "sommes", "avons"],
    correct: 0,
    explanation: "Le Futur Proche = Aller (present) + Infinitive: 'nous allons visiter'."
  },
  {
    id: 10,
    level: "A2",
    question: "Choose the correct comparative: 'Ce train est ____ rapide que le bus.'",
    options: ["plus", "très", "beaucoup", "aussi que"],
    correct: 0,
    explanation: "Superiority comparative format: 'plus + adjective + que'."
  },

  // ─── B1 THRESHOLD (Questions 11 to 15) ───
  {
    id: 11,
    level: "B1",
    question: "Select the correct Subjunctive form: 'Je veux que tu ____ à l'heure.'",
    options: ["es", "sois", "étais", "seras"],
    correct: 1,
    explanation: "Expressions of will/desire ('Je veux que') require the Subjunctive mood ('sois')."
  },
  {
    id: 12,
    level: "B1",
    question: "Choose the correct relative pronoun: 'C'est la ville ____ je suis né.'",
    options: ["qui", "que", "où", "dont"],
    correct: 2,
    explanation: "'Où' is used as a relative pronoun for places ('la ville où je suis né')."
  },
  {
    id: 13,
    level: "B1",
    question: "Which sentence correctly forms a present conditional hypothesis?",
    options: [
      "Si j'ai de l'argent, j'achèterais cette voiture.",
      "Si j'avais de l'argent, j'achèterais cette voiture.",
      "Si j'aurais de l'argent, j'achèterais cette voiture.",
      "Si j’avais de l’argent, j’achèterai cette voiture."
    ],
    correct: 1,
    explanation: "Present hypothesis rule: Si + Imparfait ('avais') -> Conditionnel présent ('achèterais')."
  },
  {
    id: 14,
    level: "B1",
    question: "Identify the correct Passive Voice transformation for: 'Le ministre a signé le décret.'",
    options: [
      "Le décret était signé par le ministre.",
      "Le décret a été signé par le ministre.",
      "Le décret sera signé par le ministre.",
      "Le décret est en train de signer par le ministre."
    ],
    correct: 1,
    explanation: "Passé Composé passive: Avoir (present) + été + past participle: 'a été signé'."
  },
  {
    id: 15,
    level: "B1",
    question: "Convert to Indirect Speech: 'Il m'a dit : \"Je viendrai demain.\"'",
    options: [
      "Il m'a dit qu'il viendra demain.",
      "Il m'a dit qu'il viendrait le lendemain.",
      "Il m'a dit qu'il est venu le lendemain.",
      "Il m'a dit qu'il va venir demain."
    ],
    correct: 1,
    explanation: "When introductory verb is past, Future ('viendrai') shifts to Conditionnel ('viendrait') and 'demain' to 'le lendemain'."
  },

  // ─── B2 VANTAGE (Questions 16 to 20) ───
  {
    id: 16,
    level: "B2",
    question: "Select the correct connector: '____ la pluie battante, le match a été maintenu.'",
    options: ["Bien que", "Malgré", "Parce que", "Grâce à"],
    correct: 1,
    explanation: "'Malgré' is followed directly by a noun ('la pluie battante'). 'Bien que' requires a full clause with subjunctive."
  },
  {
    id: 17,
    level: "B2",
    question: "Choose the correct Past Subjunctive form: 'Je suis ravi que vous ____ votre examen.'",
    options: ["réussissiez", "ayez réussi", "avez réussi", "auriez réussi"],
    correct: 1,
    explanation: "Past Subjunctive (completed action with emotion): Avoir in Subjunctive ('ayez') + Past Participle ('réussi')."
  },
  {
    id: 18,
    level: "B2",
    question: "Identify the formal academic connector: 'Cependant, il convient de ____ ces résultats avec prudence.'",
    options: ["nuancer", "regarder", "savoir", "dire"],
    correct: 0,
    explanation: "'Nuancer' (to qualify/refine) is formal academic vocabulary essential for B2/TCF essays."
  },
  {
    id: 19,
    level: "B2",
    question: "Which sentence correctly uses the Gérondif to show cause or manner?",
    options: [
      "En travaillant régulièrement, il a obtenu son C1.",
      "Pour travailler régulièrement, il a obtenu son C1.",
      "Pendant travailler régulièrement, il a obtenu son C1.",
      "Sur travailler régulièrement, il a obtenu son C1."
    ],
    correct: 0,
    explanation: "Le Gérondif is formed with 'En + Present Participle' ('En travaillant') to express manner or means."
  },
  {
    id: 20,
    level: "B2",
    question: "Select the formal transition for a TCF argument: '____ la mesure est impopulaire, elle demeure nécessaire.'",
    options: ["Si bien que", "Même si", "En outre", "C'est pourquoi"],
    correct: 1,
    explanation: "'Même si' expresses concession followed by indicative in formal argumentation."
  }
];

const GERMAN_PLACEMENT_QUESTIONS: Question[] = [
  // A1 (1-5)
  { id: 1, level: "A1", question: "Choose the correct greeting for: 'Hello, how are you?'", options: ["Guten Tag, wie geht es Ihnen?", "Auf Wiedersehen!", "Bitte sehr.", "Gute Nacht."], correct: 0, explanation: "'Guten Tag, wie geht es Ihnen?' is the polite formal German greeting." },
  { id: 2, level: "A1", question: "Select the correct form of 'sein': 'Ich ____ 25 Jahre alt.'", options: ["bin", "habe", "wohne", "ist"], correct: 0, explanation: "In German age uses 'sein': 'Ich bin 25 Jahre alt'." },
  { id: 3, level: "A1", question: "Complete with the correct dative article: 'Ich fahre mit ____ Bus.'", options: ["dem", "der", "das", "die"], correct: 0, explanation: "The preposition 'mit' requires the dative case: 'mit dem Bus'." },
  { id: 4, level: "A1", question: "Select the accusative masculine article: 'Ich sehe ____ Hund.'", options: ["den", "der", "dem", "des"], correct: 0, explanation: "Direct masculine object in Accusative takes 'den'." },
  { id: 5, level: "A1", question: "Choose the correct present tense verb form: 'Wir ____ in Berlin.'", options: ["wohnen", "wohnt", "wohne", "wohnst"], correct: 0, explanation: "First-person plural 'Wir' ending is '-en': 'wohnen'." },

  // A2 (6-10)
  { id: 6, level: "A2", question: "Which sentence correctly uses Perfekt with 'sein'?", options: ["Er ist nach Berlin gefahren.", "Er hat nach Berlin gefahren.", "Er war nach Berlin fahren.", "Er fährt nach Berlin."], correct: 0, explanation: "Verbs of motion take 'sein' in Perfekt: 'ist gefahren'." },
  { id: 7, level: "A2", question: "Fill in: 'Wenn das Wetter schön ist, ____ wir im Park.'", options: ["spazieren", "spazierte", "gegangen", "spaziert"], correct: 0, explanation: "In a main clause following a subordinate clause, the verb comes immediately in position 1." },
  { id: 8, level: "A2", question: "Select the correct modal verb: 'Hier ____ man nicht rauchen.'", options: ["darf", "will", "sollte", "möchte"], correct: 0, explanation: "Prohibition uses 'dürfen': 'darf nicht rauchen'." },
  { id: 9, level: "A2", question: "Choose the correct reflexive pronoun: 'Ich wasche ____ die Hände.'", options: ["mir", "mich", "sich", "dir"], correct: 0, explanation: "When a direct object ('die Hände') is present, the reflexive pronoun is Dative ('mir')." },
  { id: 10, level: "A2", question: "Which sentence uses the correct two-way preposition?", options: ["Er stellt das Buch auf den Tisch.", "Er stellt das Buch auf dem Tisch.", "Er stellt das Buch an den Tisch.", "Er stellt das Buch in dem Tisch."], correct: 0, explanation: "Action showing movement towards a target takes Accusative ('auf den Tisch')." },

  // B1 (11-15)
  { id: 11, level: "B1", question: "Select the correct Subjunctive II form: 'Wenn ich Zeit hätte, ____ ich kommen.'", options: ["würde", "werde", "wollte", "hatte"], correct: 0, explanation: "'würde + infinitive' forms Konjunktiv II for hypotheses." },
  { id: 12, level: "B1", question: "Choose the causal connector: 'Er bleibt zu Hause, ____ er krank ist.'", options: ["weil", "dass", "ob", "obwohl"], correct: 0, explanation: "'weil' introduces a causal clause and sends the verb to the end." },
  { id: 13, level: "B1", question: "Select the passive voice form: 'Das Haus ____ im Jahre 1990 gebaut.'", options: ["wurde", "wird", "worden", "hat"], correct: 0, explanation: "Präteritum passive uses 'wurde + Partizip II'." },
  { id: 14, level: "B1", question: "Choose the correct relative pronoun: 'Das ist der Mann, ____ ich geholfen habe.'", options: ["dem", "den", "der", "dessen"], correct: 0, explanation: "The verb 'helfen' governs the Dative case ('dem Mann')." },
  { id: 15, level: "B1", question: "Select the correct indirect speech form: 'Er sagte, er ____ keine Zeit.'", options: ["habe", "hat", "hätte", "gehabt"], correct: 0, explanation: "Formal reported speech uses Konjunktiv I ('habe')." },

  // B2 (16-20)
  { id: 16, level: "B2", question: "Select the formal Goethe essay connector: '____ der Maßnahme sind viele Ergebnisse erzielt worden.'", options: ["Infolge", "Damit", "Obwohl", "Wenigstens"], correct: 0, explanation: "'Infolge' (as a result of) is a B2 genitive connector for academic writing." },
  { id: 17, level: "B2", question: "Choose the two-part connector: 'Er spricht ____ Deutsch, ____ auch Französisch.'", options: ["nicht nur ... sondern", "weder ... noch", "zwar ... aber", "sowohl ... als"], correct: 0, explanation: "'nicht nur ... sondern auch' means 'not only ... but also'." },
  { id: 18, level: "B2", question: "Identify the correct participle attribute: 'Die ____ Ergebnisse überraschten alle.'", options: ["veröffentlichten", "veröffentlichen", "veröffentlichte", "veröffentlichende"], correct: 0, explanation: "Past participle used as an adjective agreeing in plural declension." },
  { id: 19, level: "B2", question: "Select the formal TestDaF transition: 'Demgegenüber lässt sich ____, dass die Kosten steigen.'", options: ["argumentieren", "sagen", "reden", "meinen"], correct: 0, explanation: "'Demgegenüber lässt sich argumentieren' is a formal B2 argumentative formula." },
  { id: 20, level: "B2", question: "Which connector requires a double infinitive at the end?", options: ["..., weil er das Buch hat lesen müssen.", "..., weil er das Buch lesen müssen hat.", "..., weil er hat das Buch lesen müssen.", "..., weil er lesen hat müssen das Buch."], correct: 0, explanation: "In subordinate clauses with modal verbs in Perfekt, 'hat' precedes the double infinitive." }
];

const SPANISH_PLACEMENT_QUESTIONS: Question[] = [
  // A1 (1-5)
  { id: 1, level: "A1", question: "Choose the correct phrase for: 'Hello, how are you?'", options: ["¡Hola! ¿Cómo estás?", "¡Hasta luego!", "Por favor.", "Buenas noches."], correct: 0, explanation: "'¡Hola! ¿Cómo estás?' is the standard Spanish greeting." },
  { id: 2, level: "A1", question: "Select the correct verb form: 'Yo ____ 25 años.'", options: ["tengo", "soy", "estoy", "hago"], correct: 0, explanation: "Age in Spanish uses 'tener': 'Tengo 25 años'." },
  { id: 3, level: "A1", question: "Fill in the blank: 'María ____ en Madrid.'", options: ["vive", "vivir", "vives", "viven"], correct: 0, explanation: "Third-person singular ending for -ir verbs is '-e': 'vive'." },
  { id: 4, level: "A1", question: "Choose the correct article for a masculine noun: '____ libro est á en la mesa.'", options: ["El", "La", "Un'"], correct: 0, explanation: "Masculine singular definite article is 'El'." },
  { id: 5, level: "A1", question: "Select the present tense form of querer: 'Nosotros ____ aprender español.'", options: ["queremos", "quieren", "quiero", "queréis"], correct: 0, explanation: "First-person plural of querer is 'queremos'." },

  // A2 (6-10)
  { id: 6, level: "A2", question: "Choose between Ser and Estar: 'Juan ____ muy cansado hoy.'", options: ["está", "es", "fue", "sea"], correct: 0, explanation: "Temporary states like feeling tired use 'estar': 'está cansado'." },
  { id: 7, level: "A2", question: "Which sentence is in the Preterite tense (completed action)?", options: ["Ayer comí paella.", "Siempre comía paella.", "Voy a comer paella.", "Comeré paella."], correct: 0, explanation: "'Comí' is Pretérito Indefinido for completed past events." },
  { id: 8, level: "A2", question: "Choose the correct direct object pronoun: '¿El libro? Yo ____ compré ayer.'", options: ["lo", "la", "le", "los"], correct: 0, explanation: "Direct masculine singular object pronoun is 'lo'." },
  { id: 9, level: "A2", question: "Select the correct form of Gustar: 'A mí me ____ las manzanas.'", options: ["gustan", "gusta", "gusto", "gustamos"], correct: 0, explanation: "Plural subject ('las manzanas') requires plural verb form 'gustan'." },
  { id: 10, level: "A2", question: "Which sentence expresses an ongoing action right now?", options: ["Estoy estudiando español.", "Estudio español.", "Estudié español.", "Estudiaré español."], correct: 0, explanation: "Estar + Gerundio ('Estoy estudiando') expresses present progressive." },

  // B1 (11-15)
  { id: 11, level: "B1", question: "Select the Subjunctive mood form: 'Espero que tú ____ pronto.'", options: ["vengas", "vienes", "viniste", "vendrás"], correct: 0, explanation: "Wishes and hopes ('Espero que') require the Present Subjunctive ('vengas')." },
  { id: 12, level: "B1", question: "Choose the relative pronoun: 'El libro ____ compré es interesante.'", options: ["que", "donde", "quien", "cuyo"], correct: 0, explanation: "'Que' is the standard direct object relative pronoun." },
  { id: 13, level: "B1", question: "Select the correct conditional hypothesis: 'Si tuviera dinero, ____ un coche.'", options: ["compraría", "compro", "compraré", "comprara"], correct: 0, explanation: "In imperfect subjunctive hypotheses ('Si tuviera'), the result clause takes Conditional ('compraría')." },
  { id: 14, level: "B1", question: "Identify the impersonal 'se' passive construction:", options: ["Se venden casas aquí.", "Se vende casas aquí.", "Ellos venden casas aquí.", "Casas son vendidas aquí."], correct: 0, explanation: "Pasiva refleja ('Se + verb in 3rd person plural + plural noun') is standard." },
  { id: 15, level: "B1", question: "Convert to Indirect Speech: 'Ella me dijo: \"Llegaré a las ocho.\"'", options: ["Ella me dijo que llegaría a las ocho.", "Ella me dijo que llegará a las ocho.", "Ella me dijo que llega a las ocho.", "Ella me dijo que ha llegado a las ocho."], correct: 0, explanation: "When introductory verb is past, Future ('llegaré') shifts to Conditional ('llegaría')." },

  // B2 (16-20)
  { id: 16, level: "B2", question: "Select the Past Subjunctive form: 'Si yo ____ sabido la verdad, habría actuado diferente.'", options: ["hubiera", "haya", "había", "habré"], correct: 0, explanation: "Pluperfect Subjunctive ('hubiera + participle') forms counterfactual past hypotheses." },
  { id: 17, level: "B2", question: "Choose the formal DELE connector: '____ a los obstáculos, el proyecto fue un éxito.'", options: ["Pese", "Aunque", "Porque", "Sin embargo"], correct: 0, explanation: "'Pese a' (despite) followed by a noun is a formal B2 concessive preposition." },
  { id: 18, level: "B2", question: "Identify the correct relative adjective: 'La escritora ____ obra fue premiada asistió al evento.'", options: ["cuya", "que", "quien", "donde"], correct: 0, explanation: "'Cuya' expresses possession agreeing in gender and number with 'obra'." },
  { id: 19, level: "B2", question: "Select the formal transition for a SIELE essay: 'Por lo tanto, conviene ____ este análisis.'", options: ["profundizar", "mirar", "hacer", "decir"], correct: 0, explanation: "'Profundizar' (to deepen) is formal academic vocabulary for B2 essays." },
  { id: 20, level: "B2", question: "Which sentence uses the Subjunctive in a concessive clause correctly?", options: ["Aunque llueva mañana, iremos al campo.", "Aunque lloverá mañana, iremos al campo.", "Aunque ha llovido mañana, iremos al campo.", "Aunque llovió mañana, iremos al campo."], correct: 0, explanation: "'Aunque + Subjunctive' ('llueva') indicates a hypothetical condition in the future." }
];

const ITALIAN_PLACEMENT_QUESTIONS: Question[] = [
  // A1 (1-5)
  { id: 1, level: "A1", question: "Choose the correct phrase for: 'Hello, how are you?'", options: ["Buongiorno, come sta?", "Arrivederci!", "Per favore.", "Buonanotte."], correct: 0, explanation: "'Buongiorno, come sta?' is the formal polite Italian greeting." },
  { id: 2, level: "A1", question: "Select the correct form of 'avere': 'Io ____ 25 anni.'", options: ["ho", "sono", "abito", "faccio"], correct: 0, explanation: "In Italian age is expressed with 'avere': 'Io ho 25 anni'." },
  { id: 3, level: "A1", question: "Complete with the correct article: '____ studente impara l'italiano.'", options: ["Lo", "Il", "La", "Un'"], correct: 0, explanation: "Masculine nouns starting with 'st' take the article 'Lo'." },
  { id: 4, level: "A1", question: "Choose the correct present tense form: 'Noi ____ a Roma.'", options: ["abitiamo", "abito", "abitano", "abitate"], correct: 0, explanation: "First-person plural 'Noi' ending is '-iamo': 'abitiamo'." },
  { id: 5, level: "A1", question: "Select the correct form of Piacere: 'A me ____ la pizza.'", options: ["piace", "piacciono", "piaccio", "piaciamo"], correct: 0, explanation: "Singular subject ('la pizza') requires 'piace'." },

  // A2 (6-10)
  { id: 6, level: "A2", question: "Which sentence correctly uses Passato Prossimo with 'essere'?", options: ["È andata a Roma ieri.", "Ha andata a Roma ieri.", "È andato a Roma ieri (per Maria).", "Ha andare a Roma."], correct: 0, explanation: "Verbs of movement like 'andare' take 'essere' and agree in gender: 'È andata'." },
  { id: 7, level: "A2", question: "Fill in: 'Mentre io ____, il telefono ha squillato.'", options: ["dormivo", "ho dormito", "dormirò", "dormo"], correct: 0, explanation: "Background ongoing action uses Imperfetto ('dormivo') when interrupted." },
  { id: 8, level: "A2", question: "Choose the correct combined preposition: 'Vado ____ medico.'", options: ["dal", "nel", "sul", "col"], correct: 0, explanation: "Going to a person's office/home uses 'da + il' = 'dal'." },
  { id: 9, level: "A2", question: "Select the correct direct pronoun: 'La pasta? ____ mangio subito.'", options: ["La", "Lo", "Li", "Le"], correct: 0, explanation: "Feminine singular direct object pronoun is 'La'." },
  { id: 10, level: "A2", question: "Which sentence expresses progressive present?", options: ["Sto studiando l'italiano.", "Studio l'italiano.", "Ho studiato l'italiano.", "Studierò l'italiano."], correct: 0, explanation: "Stare + Gerundio ('Sto studiando') expresses present progressive." },

  // B1 (11-15)
  { id: 11, level: "B1", question: "Select the correct Present Subjunctive (Congiuntivo): 'Spero che tu ____ felice.'", options: ["sia", "sei", "eri", "sarai"], correct: 0, explanation: "Hopes and wishes ('Spero che') require Congiuntivo presente ('sia')." },
  { id: 12, level: "B1", question: "Choose the relative pronoun: 'La città ____ sono nato è bellissima.'", options: ["in cui", "che", "chi", "cui"], correct: 0, explanation: "'In cui' or 'dove' is used for location ('in which I was born')." },
  { id: 13, level: "B1", question: "Select the correct conditional hypothesis: 'Se avessi tempo, ____ a trovarvi.'", options: ["verrei", "vengo", "verrò", "venissi"], correct: 0, explanation: "Hypothesis: Se + Congiuntivo imperfetto ('avessi') -> Condizionale presente ('verrei')." },
  { id: 14, level: "B1", question: "Identify the passive voice with Venire: 'Il libro ____ letto da tutti.'", options: ["viene", "ha", "era", "sta"], correct: 0, explanation: "Venire is frequently used as a passive auxiliary in place of essere ('viene letto')." },
  { id: 15, level: "B1", question: "Convert to Indirect Speech: 'Marco ha detto: \"Arriverò domani.\"'", options: ["Marco ha detto che sarebbe arrivato il giorno dopo.", "Marco ha detto che arriverà domani.", "Marco ha detto che è arrivato domani.", "Marco ha detto che arriva domani."], correct: 0, explanation: "Past introductory verb causes Future ('arriverò') to shift to Past Conditional ('sarebbe arrivato')." },

  // B2 (16-20)
  { id: 16, level: "B2", question: "Select the formal CILS essay connector: '____ della situazione, occorre agire tempestivamente.'", options: ["In vista", "Malgrado", "Perché", "Comunque"], correct: 0, explanation: "'In vista di' (in view of) is a B2 formal transition for argumentation." },
  { id: 17, level: "B2", question: "Choose the correct Past Subjunctive: 'Sebbene egli ____ sodo, non superò l'esame.'", options: ["avesse studiato", "ha studiato", "studiò", "avrebbe studiato"], correct: 0, explanation: "'Sebbene' requires Congiuntivo trapassato ('avesse studiato') for completed past concession." },
  { id: 18, level: "B2", question: "Identify the implicit gerundial clause showing cause: '____ la lezione, gli studenti uscirono.'", options: ["Essendo finita", "Finendo", "Finita", "Per finire"], correct: 0, explanation: "Compound past gerund ('Essendo finita') expresses prior cause." },
  { id: 19, level: "B2", question: "Select the formal transition for a PLIDA essay: 'È fondamentale ____ l'impatto di questa decisione.'", options: ["valutare", "vedere", "dire", "fare"], correct: 0, explanation: "'Valutare' (to evaluate) is formal academic vocabulary for B2 essays." },
  { id: 20, level: "B2", question: "Which sentence uses the formal relative pronoun 'il quale' correctly?", options: ["Il professore, il quale ha scritto il libro, terrà una conferenza.", "Il professore, il quale che ha scritto il libro, terrà una conferenza.", "Il professore, la quale ha scritto il libro, terrà una conferenza.", "Il professore, i quali hanno scritto il libro, terrà una conferenza."], correct: 0, explanation: "'Il quale' agrees in gender and number with the masculine singular antecedent ('il professore')." }
];

export function getPlacementQuestions(langCode: string = "fr"): Question[] {
  const code = (langCode || "fr").toLowerCase().trim();
  if (code === "de" || code === "ger" || code === "german") return GERMAN_PLACEMENT_QUESTIONS;
  if (code === "es" || code === "spa" || code === "spanish") return SPANISH_PLACEMENT_QUESTIONS;
  if (code === "it" || code === "ita" || code === "italian") return ITALIAN_PLACEMENT_QUESTIONS;
  return PLACEMENT_QUESTIONS;
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState<"language" | "goal" | "pace" | "choice" | "test" | "result">("language");
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', examName: 'DELF / TCF' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', examName: 'Goethe / TestDaF' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', examName: 'DELE / SIELE' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', examName: 'CILS / CELI' }
  ]);
  const [selectedLang, setSelectedLang] = useState<string>("fr");

  useEffect(() => {
    apiFetch("/languages")
      .then((res) => res.json())
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setAvailableLanguages(res.data);
        }
      })
      .catch(() => {});
  }, []);

  // Step 1: Goal wired directly to userPrefs
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>("TCF_B2");

  // Step 2: Pace
  const [selectedPace, setSelectedPace] = useState<number>(30);

  // Step 4: Placement Test State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [testScore, setTestScore] = useState<number>(0);
  const [evaluatedLevel, setEvaluatedLevel] = useState<"A1" | "A2" | "B1" | "B2">("A1");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (authLoading) return null;
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" search={{ redirect: "/onboarding" }} replace />;
  }

  const paces = [
    { mins: 15, label: "Regular Study", desc: "15 mins/day • ~1 lesson/day", icon: Clock },
    { mins: 30, label: "Target Pace", desc: "30 mins/day • ~2 lessons/day (Recommended)", icon: Flame, popular: true },
    { mins: 45, label: "Accelerated", desc: "45 mins/day • ~3 lessons/day", icon: BookOpen },
    { mins: 60, label: "Exam Sprint", desc: "60 mins/day • ~5 lessons/day", icon: Sparkles }
  ];

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handlePlayQuestionAudio = (text: string) => {
    setIsPlayingAudio(true);
    const branding = getTrackBranding(selectedLang);
    speak(text, branding.speechLocale, 0.85, "female");
    setTimeout(() => setIsPlayingAudio(false), 3500);
  };

  const handleNextQuestion = () => {
    const questions = getPlacementQuestions(selectedLang);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Level-gated scoring evaluation for 100% accuracy
      let a1Count = 0, a2Count = 0, b1Count = 0, b2Count = 0;
      let totalCorrect = 0;

      questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correct) {
          totalCorrect++;
          if (q.level === "A1") a1Count++;
          if (q.level === "A2") a2Count++;
          if (q.level === "B1") b1Count++;
          if (q.level === "B2") b2Count++;
        }
      });

      setTestScore(totalCorrect);

      // Strict Level Progression Requirement:
      let level: "A1" | "A2" | "B1" | "B2" = "A1";

      // To reach A2: Must score >= 4/5 on A1 and >= 3/5 on A2
      if (a1Count >= 4 && a2Count >= 3) {
        level = "A2";
        // To reach B1: Must score >= 4/5 on A2 and >= 3/5 on B1
        if (a2Count >= 4 && b1Count >= 3) {
          level = "B1";
          // To reach B2: Must score >= 4/5 on B1 and >= 3/5 on B2
          if (b1Count >= 4 && b2Count >= 3) {
            level = "B2";
          }
        }
      }

      setEvaluatedLevel(level);
      setStep("result");
    }
  };

  const handleFinishOnboarding = async (levelOverride?: string) => {
    const finalLevel = levelOverride || (step === "result" ? evaluatedLevel : "A1");

    // 1. Save goal and active target language directly via userPrefs
    saveGoalToStorage(selectedGoal, selectedLang);
    setDailyStudyGoal(selectedPace);
    localStorage.setItem("fp_active_language", selectedLang);

    // 2. Persist to backend database so user profile syncs
    try {
      await apiFetch("/users/profile/goal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: selectedGoal, activeLanguage: selectedLang }),
      });
      await apiFetch("/users/profile/complete-onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeLanguage: selectedLang, learningGoal: selectedGoal }),
      });
    } catch {}

    // 3. Save onboarding level
    localStorage.setItem("francprep_onboarding_completed", "true");
    localStorage.setItem("francprep_user_level", finalLevel);

    navigate({ to: "/dashboard" });
  };

  const activeBranding = getTrackBranding(selectedLang);

  return (
    <div className={`min-h-screen ${dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900"} flex flex-col justify-between p-4 md:p-8 transition-colors duration-300 overflow-x-hidden`}>
      {/* Top Header */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between py-4 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-500/20">
            {activeBranding.flag}
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">{activeBranding.shortBrand}</span>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 uppercase font-mono block">{activeBranding.examName}</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span className={step === "language" ? "text-purple-600 dark:text-purple-400 font-bold" : ""}>1. Target Language</span> ➔
          <span className={step === "goal" ? "text-purple-600 dark:text-purple-400 font-bold" : ""}>2. Target Goal</span> ➔
          <span className={step === "pace" ? "text-purple-600 dark:text-purple-400 font-bold" : ""}>3. Daily Pace</span> ➔
          <span className={step === "choice" || step === "test" || step === "result" ? "text-purple-600 dark:text-purple-400 font-bold" : ""}>4. Placement</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto my-auto py-8">
        <AnimatePresence mode="wait">
          {/* STEP 0: TARGET LANGUAGE SELECTION */}
          {step === "language" && (
            <motion.div
              key="step-language"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Multi-Language Learning Platform</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Choose Your Target Language
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Select the language course you want to master. All CEFR levels, audio dialogues, and exam prep will adapt to your chosen language.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                {availableLanguages.map((l) => {
                  const isSelected = selectedLang === l.code;
                  return (
                    <div
                      key={l.code}
                      onClick={() => setSelectedLang(l.code)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/15 ring-2 ring-purple-500/30 text-purple-900 dark:text-purple-100 shadow-lg"
                          : "border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#101828]/80 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-4xl">{l.flag || '🌐'}</span>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-purple-500 bg-purple-500 text-white" : "border-gray-400"}`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                      <div>
                        <span className="text-base font-extrabold block">{l.name} ({l.nativeName})</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">{l.examName || 'CEFR Standard'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end max-w-2xl mx-auto">
                <button
                  onClick={() => setStep("goal")}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/25 flex items-center gap-2"
                >
                  <span>Continue to Target Goal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: TARGET GOAL SELECTION */}
          {step === "goal" && (
            <motion.div
              key="step-goal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold">
                  <Target className="w-3.5 h-3.5" />
                  <span>Academic & Exam Focus</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Select Your Primary Target Goal
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Your selected goal displays directly in your Dashboard header and configures your milestone exam targets. You can change this anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-left max-w-3xl mx-auto">
                {getGoalOptionsForLanguage(selectedLang).map((g) => {
                  const isSelected = selectedGoal === g.value;
                  return (
                    <div
                      key={g.value}
                      onClick={() => setSelectedGoal(g.value)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/15 ring-2 ring-purple-500/30 text-purple-900 dark:text-purple-100 shadow-md"
                          : "border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#101828]/80 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{g.emoji}</span>
                        <span className="text-sm font-bold">{g.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-purple-500 bg-purple-500 text-white" : "border-gray-400"}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end max-w-3xl mx-auto">
                <button
                  onClick={() => setStep("pace")}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/25 flex items-center gap-2"
                >
                  <span>Continue to Daily Pace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PACE SELECTION */}
          {step === "pace" && (
            <motion.div
              key="step-pace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Daily Study Habit</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Select Your Daily Exam Study Pace
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Consistent structured practice drives rapid CEFR progress.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
                {paces.map((p) => {
                  const IconComp = p.icon;
                  const isSelected = selectedPace === p.mins;
                  return (
                    <div
                      key={p.mins}
                      onClick={() => setSelectedPace(p.mins)}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/30 shadow-xl"
                          : "border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#101828]/80 hover:border-purple-300"
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-extrabold uppercase">
                          Recommended
                        </span>
                      )}
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold">{p.label}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{p.desc}</p>
                      </div>
                      <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">
                        {p.mins} Mins / Day
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep("goal")}
                  className="px-6 py-3.5 rounded-2xl border border-gray-300 dark:border-white/10 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setStep("choice")}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/25 flex items-center gap-2"
                >
                  <span>Continue to Placement Choice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: LEVEL PLACEMENT CHOICE */}
          {step === "choice" && (
            <motion.div
              key="step-choice"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-bold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>CEFR Diagnostic Benchmark</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Where should we start your French syllabus?
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Beginners can start immediately at A1 Discovery. Learners with prior experience can take our 20-question comprehensive diagnostic.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                {/* Option A: Start A1 */}
                <div
                  onClick={() => handleFinishOnboarding("A1")}
                  className="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#101828]/80 hover:border-purple-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Recommended for Complete Mastery
                      </span>
                      <h3 className="text-2xl font-bold mt-1">
                        Start at A1 Discovery (Absolute Zero)
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Begin with phonetics, greetings, and basic sentence structures. Ideal for complete beginners or thorough review.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Start at A1 Level</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Option B: Take 20-Q Test */}
                <div
                  onClick={() => {
                    setCurrentQIndex(0);
                    setSelectedAnswers({});
                    setStep("test");
                  }}
                  className="p-8 rounded-3xl border border-purple-500/30 bg-purple-500/10 hover:border-purple-500 transition-all cursor-pointer shadow-xl flex flex-col justify-between space-y-6 group ring-1 ring-purple-500/20"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
                      <Compass className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-300">
                        20-Question CEFR Diagnostic
                      </span>
                      <h3 className="text-2xl font-bold mt-1">
                        Take Diagnostic Placement Test
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      20 comprehensive diagnostic questions across A1, A2, B1, and B2 grammar, vocabulary, and sentence structures.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-300 group-hover:translate-x-1 transition-transform">
                    <span>Launch 20-Q Diagnostic Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center max-w-3xl mx-auto">
                <button
                  onClick={() => setStep("pace")}
                  className="px-6 py-3 rounded-xl border border-gray-300 dark:border-white/10 text-xs font-bold text-gray-600 dark:text-gray-300"
                >
                  ← Back
                </button>

                <button
                  onClick={() => handleFinishOnboarding("A1")}
                  className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 font-semibold"
                >
                  <span>Skip test & start on A1 directly</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PLACEMENT TEST IN PROGRESS */}
          {step === "test" && (() => {
            const activeQuestions = getPlacementQuestions(selectedLang);
            const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];
            return (
              <motion.div
                key="step-test"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 max-w-2xl mx-auto text-left p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#101828]/90 backdrop-blur-xl shadow-2xl"
              >
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 font-mono text-[10px]">
                        {currentQ.level} Stage
                      </span>
                      <span>Question {currentQIndex + 1} of {activeQuestions.length}</span>
                    </span>
                    <span>{Math.round(((currentQIndex + 1) / activeQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
                      style={{ width: `${((currentQIndex + 1) / activeQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl md:text-2xl font-bold leading-snug">
                      {currentQ.question}
                    </h2>
                    <button
                      onClick={() => handlePlayQuestionAudio(currentQ.question)}
                      className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 shrink-0 cursor-pointer"
                    >
                      <Volume2 className={`w-5 h-5 ${isPlayingAudio ? "animate-bounce" : ""}`} />
                    </button>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedAnswers[currentQ.id] === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelectAnswer(currentQ.id, idx)}
                          className={`p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "border-purple-600 bg-purple-50 text-purple-950 ring-2 ring-purple-500/40 dark:bg-purple-500/20 dark:text-purple-300 shadow-sm"
                              : "border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 hover:border-purple-500 hover:bg-purple-50/40 shadow-sm"
                          }`}
                        >
                        <span>{opt}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-purple-500 bg-purple-500 text-white" : "border-slate-400"}`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-200 dark:border-white/10">
                <button
                  onClick={() => handleFinishOnboarding("A1")}
                  className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  Skip test anytime (Default to A1)
                </button>

                <button
                  disabled={selectedAnswers[currentQ.id] === undefined}
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs disabled:opacity-40 transition-all flex items-center gap-2 shadow-lg shadow-purple-600/25 cursor-pointer"
                >
                  <span>{currentQIndex === activeQuestions.length - 1 ? "Submit & View Diagnostic" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })()}

          {/* STEP 5: TEST RESULT BENCHMARK */}
          {step === "result" && (
            <motion.div
              key="step-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 max-w-xl mx-auto text-center p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#101828]/90 backdrop-blur-xl shadow-2xl"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Comprehensive Diagnostic Complete
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Evaluated Benchmark: {evaluatedLevel}
                </h1>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  You scored <strong className="text-purple-600 dark:text-purple-400">{testScore} / {PLACEMENT_QUESTIONS.length}</strong> on the 20-question diagnostic.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-left space-y-2">
                <p className="font-bold text-emerald-800 dark:text-emerald-300">
                  💡 Level Recommendation:
                </p>
                <p className="text-gray-700 dark:text-slate-200">
                  {evaluatedLevel === "A1" && "Starting at A1 Discovery will build your core vocabulary, greetings, and basic sentence structures."}
                  {evaluatedLevel === "A2" && "Starting at A2 Breakthrough will build your conversational past tense and daily social transactions."}
                  {evaluatedLevel === "B1" && "Starting at B1 Threshold will prepare you for independent speech, essay drills, and initial TCF/TEF prep."}
                  {evaluatedLevel === "B2" && "Starting at B2 Vantage will prepare you directly for NCLC 7 TCF/TEF Canada exam practice!"}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => handleFinishOnboarding(evaluatedLevel)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2"
                >
                  <span>Accept {evaluatedLevel} Benchmark & Enter App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleFinishOnboarding("A1")}
                  className="w-full py-3 rounded-xl border border-gray-300 dark:border-white/10 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  Start at A1 Foundations Anyway
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer */}
      <div className="w-full max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-500 py-4 border-t border-gray-200 dark:border-white/10">
        FrancPrep Fluency System • TCF / TEF Canada & DELF / DALF Standard
      </div>
    </div>
  );
}
