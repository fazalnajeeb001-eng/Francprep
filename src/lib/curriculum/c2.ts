import type { Level } from "./types";

export const c2: Level = {
  id: "C2",
  title: "Mastery – Perfectionnement",
  subtitle: "Mastery",
  description: "Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources. Can express themselves spontaneously, very fluently and precisely, differentiating finer shades of meaning.",
  chapters: [
    {
      id: "c2-ch1",
      title: "Maîtrise Stylistique",
      description: "Stylistic mastery, rhetorical devices, advanced writing",
      concepts: [
        {
          id: "c2-ch1-c1",
          title: "Les figures de style avancées",
          description: "Advanced rhetorical figures and stylistic devices",
          grammarFocus: "All stylistic registers; Anaphora, chiasmus, litotes, hyperbole",
          vocabularyTheme: "Rhetoric, stylistic analysis, literary devices",
          skills: {
            reading: {
              summary: "Analyse advanced literary and rhetorical texts",
              exercises: [
                { id: "c2-ch1-c1-r1", title: "Rhetorical Analysis", type: "comprehension", prompt: "Read the passage from a political speech. Identify and analyse: anaphora, metaphor, parallelism, and the overall rhetorical strategy.", hint: "Look for repetition patterns, comparisons, and structural balance" },
                { id: "c2-ch1-c1-r2", title: "Stylistic Identification", type: "multiple-choice", prompt: "Read: 'Va, je ne te hais point.' (Corneille) What figure of speech is used here?", options: ["Hyperbole", "Litotes", "Metaphor", "Anaphora"], correctAnswer: "Litotes" }
              ]
            },
            writing: {
              summary: "Write using advanced stylistic devices",
              exercises: [
                { id: "c2-ch1-c1-w1", title: "Stylistic Imitation", type: "prompt", prompt: "Write a paragraph (200 words) imitating the style of a specific French author (Proust, Camus, Duras). Focus on sentence structure, rhythm, and vocabulary choices." },
                { id: "c2-ch1-c1-w2", title: "Rhetorical Speech", type: "prompt", prompt: "Write a persuasive speech (400 words) using at least 5 different rhetorical devices. Annotate your speech identifying each device." }
              ]
            },
            listening: {
              summary: "Recognize sophisticated rhetorical techniques",
              exercises: [
                { id: "c2-ch1-c1-l1", title: "Speech Analysis", type: "comprehension", prompt: "Listen to a French political speech. Identify the rhetorical devices used (anaphora, tricolon, contrast, metaphor) and analyse their effect on the audience." },
                { id: "c2-ch1-c1-l2", title: "Stylistic Variation", type: "short-answer", prompt: "Listen to three speakers discussing the same topic. Compare their stylistic approaches, register choices, and rhetorical strategies." }
              ]
            },
            speaking: {
              summary: "Speak using advanced rhetorical techniques",
              exercises: [
                { id: "c2-ch1-c1-s1", title: "Rhetorical Speech", type: "prompt", prompt: "Deliver a 5-minute persuasive speech on a topic of your choice. Use rhetorical devices: anaphora, rhetorical questions, tricolon, and antithesis." },
                { id: "c2-ch1-c1-s2", title: "Impromptu Style", type: "roleplay", prompt: "Given a random topic, speak for 3 minutes using a specific rhetorical device (e.g., 'Speak only using metaphors')." }
              ]
            }
          }
        },
        {
          id: "c2-ch1-c2",
          title: "La traduction et l'adaptation",
          description: "Advanced translation, adaptation between registers and contexts",
          grammarFocus: "Grammatical transposition; Calque awareness; False friends mastery",
          vocabularyTheme: "Translation theory, adaptation, localization",
          skills: {
            reading: {
              summary: "Analyse translations and adaptations",
              exercises: [
                { id: "c2-ch1-c2-r1", title: "Translation Comparison", type: "comprehension", prompt: "Read three different French translations of the same Shakespeare sonnet. Compare: fidelity to original, poetic choices, and cultural adaptation." },
                { id: "c2-ch1-c2-r2", title: "False Friends Alert", type: "multiple-choice", prompt: "Which of these is a faux-ami for the English word 'actually'?", options: ["actuellement", "réellement", "vraiment", "maintenant"], correctAnswer: "actuellement" }
              ]
            },
            writing: {
              summary: "Translate and adapt texts",
              exercises: [
                { id: "c2-ch1-c2-w1", title: "Literary Translation", type: "prompt", prompt: "Translate an English literary passage into French (300 words). Justify your key choices: register, cultural adaptation, idiomatic equivalents." },
                { id: "c2-ch1-c2-w2", title: "Register Adaptation", type: "prompt", prompt: "Adapt this formal legal text into clear French for a general audience. Maintain accuracy while making it accessible." }
              ]
            },
            listening: {
              summary: "Understand subtleties in different varieties of French",
              exercises: [
                { id: "c2-ch1-c2-l1", title: "Regional Variety Recognition", type: "comprehension", prompt: "Listen to speakers from France, Québec, Belgium, and Switzerland. Identify: phonetic differences, vocabulary variations, and unique expressions from each region." },
                { id: "c2-ch1-c2-l2", title: "Simultaneous Interpretation", type: "dictation", prompt: "Listen to a short speech and simultaneously interpret it into English, then compare your version with a professional interpretation." }
              ]
            },
            speaking: {
              summary: "Adapt speech across varieties and contexts",
              exercises: [
                { id: "c2-ch1-c2-s1", title: "Accent Adaptation", type: "prompt", prompt: "Read the same passage with a standard French accent, then with a Québécois accent, adapting vocabulary and pronunciation appropriately." },
                { id: "c2-ch1-c2-s2", title: "Consecutive Interpretation", type: "roleplay", prompt: "Interpret a conversation between a French speaker and an English speaker, handling nuance, cultural references, and register appropriately." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "c2-ch2",
      title: "Discours Critique et Expertise",
      description: "Critical discourse, expertise, research-level French",
      concepts: [
        {
          id: "c2-ch2-c1",
          title: "La critique et l'expertise",
          description: "Expert-level critique, evaluation, and scholarly discourse",
          grammarFocus: "All grammar points integrated; Absolute constructions; Infinitive past",
          vocabularyTheme: "Critique, evaluation, scholarly terminology",
          skills: {
            reading: {
              summary: "Read and critique expert-level texts",
              exercises: [
                { id: "c2-ch2-c1-r1", title: "Critical Review", type: "comprehension", prompt: "Read this scholarly article and write a critical review: identify the thesis, evaluate the methodology, assess the evidence, note any biases, and suggest improvements." },
                { id: "c2-ch2-c1-r2", title: "Comparative Critique", type: "short-answer", prompt: "Compare two competing theories presented in these texts. Evaluate their strengths and weaknesses, and take a position with justification." }
              ]
            },
            writing: {
              summary: "Write expert-level critiques",
              exercises: [
                { id: "c2-ch2-c1-w1", title: "Academic Peer Review", type: "prompt", prompt: "Write a peer review (500 words) of an academic article. Structure: summary, strengths, weaknesses, specific suggestions, recommendation." },
                { id: "c2-ch2-c1-w2", title: "Expert Opinion Piece", type: "prompt", prompt: "Write an expert opinion piece (500 words) for a major French newspaper on a topic in your field. Command authority while remaining accessible to educated readers." }
              ]
            },
            listening: {
              summary: "Understand expert-level discourse",
              exercises: [
                { id: "c2-ch2-c1-l1", title: "Expert Panel", type: "comprehension", prompt: "Listen to an expert panel discussion. Summarise each expert's position, identify points of agreement and disagreement, and evaluate the strength of their arguments." },
                { id: "c2-ch2-c1-l2", title: "PhD Defense", type: "comprehension", prompt: "Listen to excerpts from a PhD defense. Identify: the thesis statement, methodology, key findings, and the committee's critiques." }
              ]
            },
            speaking: {
              summary: "Engage in expert-level discussions",
              exercises: [
                { id: "c2-ch2-c1-s1", title: "Expert Conference Panel", type: "roleplay", prompt: "Participate in a conference panel discussion. Present your research, respond to questions from the audience, and engage with fellow panelists." },
                { id: "c2-ch2-c1-s2", title: "Defend a Position", type: "prompt", prompt: "Present and defend a controversial position in your field (8 minutes). Anticipate counterarguments, address them, and conclude compellingly." }
              ]
            }
          }
        }
      ]
    }
  ]
};