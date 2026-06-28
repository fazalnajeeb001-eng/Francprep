import type { Level } from "./types";

export const c1: Level = {
  id: "C1",
  title: "Advanced – Maîtrise",
  subtitle: "Effective Operational Proficiency",
  description: "Can understand a wide range of demanding, longer texts. Can express ideas fluently and spontaneously without much searching for expressions. Can use language flexibly for social, academic, and professional purposes.",
  chapters: [
    {
      id: "c1-ch1",
      title: "Discours Académique et Professionnel",
      description: "Academic writing, presentations, high-level professional communication",
      concepts: [
        {
          id: "c1-ch1-c1",
          title: "La synthèse de documents",
          description: "Summarizing and synthesising multiple sources",
          grammarFocus: "Nominalization; Complex relative structures; Gérondif",
          vocabularyTheme: "Academic vocabulary, discourse markers, transition words",
          skills: {
            reading: {
              summary: "Read multiple sources and identify key points",
              exercises: [
                { id: "c1-ch1-c1-r1", title: "Comparative Analysis", type: "comprehension", prompt: "Read two short texts on climate policy. Text A argues for carbon taxes. Text B advocates for technological solutions. Identify the main arguments of each and the points of disagreement.", hint: "Look for opinion markers and contrasting viewpoints" },
                { id: "c1-ch1-c1-r2", title: "Abstract Extraction", type: "short-answer", prompt: "Read this academic abstract and identify: research question, methodology, findings, and conclusion in your own words." }
              ]
            },
            writing: {
              summary: "Write syntheses and academic documents",
              exercises: [
                { id: "c1-ch1-c1-w1", title: "Document Synthesis", type: "prompt", prompt: "Write a 300-word synthesis of three documents with different perspectives on the same topic. Structure: introduction, thematic comparison, conclusion." },
                { id: "c1-ch1-c1-w2", title: "Nominalization Exercise", type: "fill-blank", prompt: "Transform: 'Le gouvernement a décidé d'augmenter les impôts' → 'La _____ des impôts par le gouvernement.'", correctAnswer: "décision d'augmentation" }
              ]
            },
            listening: {
              summary: "Understand complex academic presentations",
              exercises: [
                { id: "c1-ch1-c1-l1", title: "Conference Talk", type: "comprehension", prompt: "You hear a 3-minute academic presentation. Identify: the research problem, methodology, key findings, and the speaker's conclusion." },
                { id: "c1-ch1-c1-l2", title: "Q&A Session", type: "multiple-choice", prompt: "You hear: 'Pourriez-vous préciser comment votre étude contrôle les variables confondantes ?' What is the questioner asking about?", options: ["The conclusion", "The methodology", "The funding", "The publication date"], correctAnswer: "The methodology" }
              ]
            },
            speaking: {
              summary: "Deliver academic presentations and discussions",
              exercises: [
                { id: "c1-ch1-c1-s1", title: "Academic Presentation", type: "prompt", prompt: "Deliver a 5-minute academic presentation on a topic of your choice. Structure: introduction, background, main argument, evidence, conclusion. Use discourse markers." },
                { id: "c1-ch1-c1-s2", title: "Seminar Discussion", type: "roleplay", prompt: "Participate in a seminar discussion: respond to questions, challenge ideas respectfully, build on others' points using complex connectors." }
              ]
            }
          }
        },
        {
          id: "c1-ch1-c2",
          title: "La langue des médias spécialisés",
          description: "Understanding specialized media (science, law, finance)",
          grammarFocus: "Subjonctif passé; Conditional past; Passive constructions",
          vocabularyTheme: "Legal, financial, scientific terminology",
          skills: {
            reading: {
              summary: "Read specialized articles",
              exercises: [
                { id: "c1-ch1-c2-r1", title: "Scientific Article", type: "comprehension", prompt: "Read this scientific abstract in French. Identify: hypothesis, methodology, sample size, results, and limitations." },
                { id: "c1-ch1-c2-r2", title: "Legal Text", type: "multiple-choice", prompt: "Read: 'Aux termes de l'article L. 121-1 du Code du travail, l'employeur est tenu d'assurer la sécurité de ses salariés.' What does this article establish?", options: ["Employee rights", "Employer obligation for safety", "Work schedule", "Salary requirements"], correctAnswer: "Employer obligation for safety" }
              ]
            },
            writing: {
              summary: "Write specialized content",
              exercises: [
                { id: "c1-ch1-c2-w1", title: "Technical Report", type: "prompt", prompt: "Write a 300-word technical report in your field of expertise. Use appropriate jargon, passive constructions, and precise data." },
                { id: "c1-ch1-c2-w2", title: "Subjunctive Past", type: "fill-blank", prompt: "Complete: 'Bien qu'il _____ (faire) toutes ses recherches, la commission n'a pas été convaincue.'", correctAnswer: "ait fait" }
              ]
            },
            listening: {
              summary: "Understand specialized presentations",
              exercises: [
                { id: "c1-ch1-c2-l1", title: "Expert Interview", type: "comprehension", prompt: "You hear a financial analyst discussing market trends. Identify the sectors mentioned, the predicted trends, and the supporting evidence provided." },
                { id: "c1-ch1-c2-l2", title: "Scientific Lecture", type: "dictation", prompt: "Listen to the lecture excerpt and transcribe the key methodological explanation. Note specialized terminology." }
              ]
            },
            speaking: {
              summary: "Discuss specialized topics",
              exercises: [
                { id: "c1-ch1-c2-s1", title: "Expert Roundtable", type: "roleplay", prompt: "Participate in a roundtable discussion on a specialized topic. Present your expert opinion, respond to questions, and engage with others' viewpoints." },
                { id: "c1-ch1-c2-s2", title: "Explain a Concept", type: "prompt", prompt: "Explain a complex concept from your field to both an expert audience (3 min) and a general audience (2 min), adapting your language register." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "c1-ch2",
      title: "Nuances et Subtilités",
      description: "Nuance, humor, idiomatic mastery, cultural references",
      concepts: [
        {
          id: "c1-ch2-c1",
          title: "L'humour et l'ironie",
          description: "Understanding and using humor, irony, and satire",
          grammarFocus: "Mise en relief (c'est... qui/que); Exclamatory structures",
          vocabularyTheme: "Humor, irony, wordplay, cultural references",
          skills: {
            reading: {
              summary: "Read satire and humorous texts",
              exercises: [
                { id: "c1-ch2-c1-r1", title: "Satirical Article", type: "comprehension", prompt: "Read: 'Le gouvernement a enfin trouvé la solution miracle au chômage : il suffit de ne plus compter les chômeurs. Une idée tellement simple qu'on se demande pourquoi personne n'y a pensé plus tôt.' Identify the use of irony and explain the real critique." },
                { id: "c1-ch2-c1-r2", title: "Wordplay Analysis", type: "short-answer", prompt: "Analyse the pun: 'Pourquoi les plongeurs plongent-ils en arrière ? Parce que sinon ils tombent dans le bateau.' Explain the wordplay mechanism." }
              ]
            },
            writing: {
              summary: "Write humorous and ironic texts",
              exercises: [
                { id: "c1-ch2-c1-w1", title: "Satirical Piece", type: "prompt", prompt: "Write a short satirical piece (200 words) on a current topic. Use irony, exaggeration, and wit to make your point." },
                { id: "c1-ch2-c1-w2", title: "Mise en Relief", type: "fill-blank", prompt: "Transform: 'Pierre a volé la vedette.' → 'C'est _____ qui a volé la vedette.'", correctAnswer: "Pierre" }
              ]
            },
            listening: {
              summary: "Recognize irony and humor in speech",
              exercises: [
                { id: "c1-ch2-c1-l1", title: "Comedy Sketch", type: "comprehension", prompt: "Listen to a French comedy sketch. Identify: the humorous devices used (exaggeration, irony, wordplay), the target of the humor, and why it's funny." },
                { id: "c1-ch2-c1-l2", title: "Tone Recognition", type: "multiple-choice", prompt: "You hear: 'Ah, magnifique ! Il pleut encore. Exactement ce qu'il nous fallait pour le pique-nique.' What is the tone?", options: ["Genuine enthusiasm", "Sarcasm/irony", "Sadness", "Confusion"], correctAnswer: "Sarcasm/irony" }
              ]
            },
            speaking: {
              summary: "Use humor and irony appropriately",
              exercises: [
                { id: "c1-ch2-c1-s1", title: "Tell a Funny Story", type: "prompt", prompt: "Tell a funny anecdote in French. Use appropriate timing, exaggeration, and punchline delivery." },
                { id: "c1-ch2-c1-s2", title: "Irony Practice", type: "roleplay", prompt: "React to these situations with ironic comments: your train is cancelled, you spill coffee, it rains on your day off." }
              ]
            }
          }
        },
        {
          id: "c1-ch2-c2",
          title: "Expressions idiomatiques et proverbes",
          description: "Mastering idioms, proverbs, and fixed expressions",
          grammarFocus: "Fixed expressions; Figurative language; Register variation",
          vocabularyTheme: "Idioms, proverbs, fixed expressions, cultural sayings",
          skills: {
            reading: {
              summary: "Recognize and interpret idioms in context",
              exercises: [
                { id: "c1-ch2-c2-r1", title: "Idiom Hunt", type: "comprehension", prompt: "Read: 'Quand le chat n'est pas là, les souris dansent. C'est exactement ce qui se passe au bureau quand le patron est en vacances.' Explain the idiom and how it applies to the situation." },
                { id: "c1-ch2-c2-r2", title: "Proverb Matching", type: "match", prompt: "Match each French proverb to its equivalent meaning: 'Qui vivra verra', 'Petit à petit, l'oiseau fait son nid', 'Après la pluie, le beau temps'" }
              ]
            },
            writing: {
              summary: "Write using idiomatic expressions",
              exercises: [
                { id: "c1-ch2-c2-w1", title: "Idiom Story", type: "prompt", prompt: "Write a short story (200 words) that incorporates at least 5 French idiomatic expressions naturally. Underline each idiom used." },
                { id: "c1-ch2-c2-w2", title: "Proverb Application", type: "short-answer", prompt: "Choose a situation and write how you would use the proverb: 'Mieux vaut tard que jamais' appropriately." }
              ]
            },
            listening: {
              summary: "Recognize idioms in spoken French",
              exercises: [
                { id: "c1-ch2-c2-l1", title: "Idiom Recognition", type: "comprehension", prompt: "Listen to these short dialogues and identify the idiomatic expression used in each. Explain its meaning." },
                { id: "c1-ch2-c2-l2", title: "Context Clues", type: "multiple-choice", prompt: "You hear: 'Ne cherche pas midi à quatorze heures, la réponse est simple.' What does the speaker mean?", options: ["Look for the easy answer", "Don't overcomplicate things", "Check the time", "Wait until noon"], correctAnswer: "Don't overcomplicate things" }
              ]
            },
            speaking: {
              summary: "Use idioms naturally in conversation",
              exercises: [
                { id: "c1-ch2-c2-s1", title: "Idiom Conversation", type: "roleplay", prompt: "Have a conversation where you naturally use at least 3 idioms. Your partner will try to identify them." },
                { id: "c1-ch2-c2-s2", title: "Explain an Idiom", type: "prompt", prompt: "Choose a French idiom, explain its literal meaning, its actual meaning, and give an example of when to use it." }
              ]
            }
          }
        }
      ]
    }
  ]
};