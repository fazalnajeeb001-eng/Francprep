import type { Level } from "./types";

export const b2: Level = {
  id: "B2",
  title: "Upper-Intermediate – Autonomie",
  subtitle: "Vantage",
  description: "Can understand the main ideas of complex text. Can interact with a degree of fluency and spontaneity. Can produce clear, detailed text on a wide range of subjects.",
  chapters: [
    {
      id: "b2-ch1",
      title: "Communication Avancée",
      description: "Nuanced expression, argumentation, debate",
      concepts: [
        {
          id: "b2-ch1-c1",
          title: "L'argumentation et le débat",
          description: "Structuring arguments, debating, persuasive language",
          grammarFocus: "Subjunctive vs indicative; Concessive expressions (bien que, malgré, quoique)",
          vocabularyTheme: "Debate, persuasion, rhetoric, current issues",
          skills: {
            reading: {
              summary: "Read complex argumentative texts",
              exercises: [
                { id: "b2-ch1-c1-r1", title: "Argumentative Essay", type: "comprehension", prompt: "Read: 'Bien que le télétravail présente des avantages indéniables en termes de flexibilité, il convient de s'interroger sur ses effets à long terme concernant la cohésion d'équipe et l'innovation collective.' What is the author's main concern about remote work?", hint: "Cohésion d'équipe = team cohesion" },
                { id: "b2-ch1-c1-r2", title: "Identify the Argument", type: "multiple-choice", prompt: "Read: 'Si l'on considère les données économiques, force est de constater que l'investissement dans les énergies vertes est non seulement bénéfique pour l'environnement mais également rentable à moyen terme.' What type of argument is this?", options: ["Environmental only", "Economic only", "Both environmental and economic", "Neither"], correctAnswer: "Both environmental and economic" }
              ]
            },
            writing: {
              summary: "Write argumentative texts and essays",
              exercises: [
                { id: "b2-ch1-c1-w1", title: "For and Against", type: "prompt", prompt: "Write a balanced argument (200 words) on: 'Les réseaux sociaux : avantages et inconvénients.' Present both sides and conclude." },
                { id: "b2-ch1-c1-w2", title: "Subjunctive Practice", type: "fill-blank", prompt: "Complete: 'Bien qu'il _____ (être) en retard, nous avons attendu. Il faut que tu _____ (venir) à la réunion.'", correctAnswer: "soit; viennes" }
              ]
            },
            listening: {
              summary: "Understand debates and complex discussions",
              exercises: [
                { id: "b2-ch1-c1-l1", title: "Debate Analysis", type: "comprehension", prompt: "You hear: 'Le premier argument en faveur de cette réforme est économique. Cependant, on ne peut ignorer les conséquences sociales. D'autre part, les opposants soulèvent des questions légitimes concernant la faisabilité.' Summarise the positions mentioned." },
                { id: "b2-ch1-c1-l2", title: "Nuanced Position", type: "multiple-choice", prompt: "You hear: 'Je comprends parfaitement ton point de vue, et sur certains aspects tu as tout à fait raison. Néanmoins, je pense qu'il faut aussi considérer le contexte social plus large.' What is the speaker doing?", options: ["Totally agreeing", "Totally disagreeing", "Partially agreeing", "Changing the subject"], correctAnswer: "Partially agreeing" }
              ]
            },
            speaking: {
              summary: "Debate and express nuanced opinions",
              exercises: [
                { id: "b2-ch1-c1-s1", title: "Structured Debate", type: "roleplay", prompt: "Debate: 'Le télétravail devrait être obligatoire.' One person argues for, the other against. Use: 'D'une part... d'autre part...', 'Cependant...', 'En conclusion...'" },
                { id: "b2-ch1-c1-s2", title: "Nuanced Opinion", type: "prompt", prompt: "Give a 3-minute opinion on a controversial topic. Include concessions, counterarguments, and a balanced conclusion." }
              ]
            }
          }
        },
        {
          id: "b2-ch1-c2",
          title: "Le français formel et informel",
          description: "Register switching: formal vs informal French, registers of speech",
          grammarFocus: "Pronoms relatifs composés (lequel, auquel, duquel); Plus-que-parfait",
          vocabularyTheme: "Formal correspondence, colloquial expressions, slang",
          skills: {
            reading: {
              summary: "Distinguish formal and informal texts",
              exercises: [
                { id: "b2-ch1-c2-r1", title: "Formal vs Informal", type: "comprehension", prompt: "Compare: 'Salut mec, ça roule ?' and 'Bonjour Monsieur, comment allez-vous ?' Identify the register and appropriate context for each." },
                { id: "b2-ch1-c2-r2", title: "Administrative Document", type: "multiple-choice", prompt: "Read: 'Veuillez trouver ci-joint les documents relatifs à votre demande de remboursement, que nous avons traitée en date du 15 courant.' What is this text?", options: ["A personal letter", "An administrative email", "A text message", "A news article"], correctAnswer: "An administrative email" }
              ]
            },
            writing: {
              summary: "Adapt writing to appropriate register",
              exercises: [
                { id: "b2-ch1-c2-w1", title: "Register Adaptation", type: "prompt", prompt: "Rewrite this informal message in formal register: 'Salut ! Dis donc, tu peux me filer le rapport ? Merci, à plus !'" },
                { id: "b2-ch1-c2-w2", title: "Relative Pronouns", type: "fill-blank", prompt: "Complete: 'C'est l'entreprise pour _____ (which) je travaille. Voici le projet _____ (which) je t'ai parlé.'", correctAnswer: "laquelle; dont" }
              ]
            },
            listening: {
              summary: "Recognise register in spoken French",
              exercises: [
                { id: "b2-ch1-c2-l1", title: "Register Recognition", type: "comprehension", prompt: "You hear: 'Excusez-moi de vous déranger, auriez-vous un instant pour discuter du dossier ?' and 'Hé, t'as cinq minutes pour parler du truc ?' Identify the register of each and the relationship between speakers." },
                { id: "b2-ch1-c2-l2", title: "Context Match", type: "multiple-choice", prompt: "You hear: 'Je vous prie d'agréer, Monsieur, l'expression de mes salutations distinguées.' Where would you most likely hear this?", options: ["At a party", "In a formal letter closing", "On the phone with a friend", "In a restaurant"], correctAnswer: "In a formal letter closing" }
              ]
            },
            speaking: {
              summary: "Switch between formal and informal registers",
              exercises: [
                { id: "b2-ch1-c2-s1", title: "Register Switching", type: "roleplay", prompt: "Roleplay the same scenario (asking for a favour) twice: once with a close friend (informal), once with your boss (formal)." },
                { id: "b2-ch1-c2-s2", title: "Professional Phone Call", type: "prompt", prompt: "Make a formal phone call to a client: introduce yourself, state your purpose, confirm details, and close politely." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "b2-ch2",
      title: "Littérature et Arts",
      description: "Literary analysis, artistic expression, cultural criticism",
      concepts: [
        {
          id: "b2-ch2-c1",
          title: "Analyser un texte littéraire",
          description: "Reading and analyzing French literature",
          grammarFocus: "Literary tenses (passé simple); Hypothetical structures (si + plus-que-parfait + conditionnel passé)",
          vocabularyTheme: "Literary analysis, genres, literary terms",
          skills: {
            reading: {
              summary: "Read and analyze literary excerpts",
              exercises: [
                { id: "b2-ch2-c1-r1", title: "Literary Extract Analysis", type: "comprehension", prompt: "Read the extract from Camus: 'Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas.' Analyse the tone, narrator's state of mind, and narrative technique." },
                { id: "b2-ch2-c1-r2", title: "Identify the Genre", type: "multiple-choice", prompt: "Read: 'Il était une fois, dans un royaume lointain, un roi et une reine qui vivaient heureux dans leur château.' What genre is this?", options: ["Poetry", "Fairy tale", "News article", "Scientific text"], correctAnswer: "Fairy tale" }
              ]
            },
            writing: {
              summary: "Write literary analyses and creative texts",
              exercises: [
                { id: "b2-ch2-c1-w1", title: "Literary Analysis", type: "prompt", prompt: "Write a 250-word analysis of a short literary extract. Discuss theme, style, tone, and literary devices." },
                { id: "b2-ch2-c1-w2", title: "Creative Writing", type: "prompt", prompt: "Write a short story (200 words) starting with: 'Il était une fois...' Use passé simple for narrative events." }
              ]
            },
            listening: {
              summary: "Understand literary discussions and readings",
              exercises: [
                { id: "b2-ch2-c1-l1", title: "Author Interview", type: "comprehension", prompt: "You hear: 'Dans mon dernier roman, j'ai voulu explorer la question de l'identité à travers le regard d'un personnage qui perd la mémoire.' What is the book about?" },
                { id: "b2-ch2-c1-l2", title: "Poetry Reading", type: "dictation", prompt: "Listen to the poem reading and write down the first stanza you hear." }
              ]
            },
            speaking: {
              summary: "Discuss literature and express analysis",
              exercises: [
                { id: "b2-ch2-c1-s1", title: "Book Discussion", type: "roleplay", prompt: "Discuss a book you've read: present the author, plot summary, themes, and your personal opinion. Respond to your partner's questions." },
                { id: "b2-ch2-c1-s2", title: "Literary Critique", type: "prompt", prompt: "Present a 3-minute critique of a work of French literature or film. Analyze style, themes, and cultural significance." }
              ]
            }
          }
        }
      ]
    }
  ]
};