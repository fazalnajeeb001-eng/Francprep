import type { Level } from "./types";

export const a1: Level = {
  id: "A1",
  title: "Beginner \u2013 D\u00e9couverte",
  subtitle: "Breakthrough",
  description: "Can understand and use familiar everyday expressions and very basic phrases. Can introduce themselves and others and can ask and answer questions about personal details.",
  chapters: [
    {
      id: "a1-ch1",
      title: "Salutations et Pr\u00e9sentations",
      description: "Greetings, introductions, basic politeness - Module 1",
      concepts: [
        {
          id: "a1-ch1-c1",
          title: "Les salutations de base",
          description: "Basic greetings: bonjour, salut, bonsoir, au revoir, asking how someone is",
          grammarFocus: "Present tense: s'appeler; Subject pronouns; Formality (tu vs vous)",
          vocabularyTheme: "Greetings, farewells, politeness expressions",
          skills: {
            reading: {
              summary: "Read simple greeting dialogues and identify appropriate responses",
              exercises: [
                { id: "a1-ch1-c1-r1", title: "Identify the Greeting", type: "multiple-choice", prompt: "Read: 'It is 8 PM. You meet a colleague. What do you say?'", options: ["Bonjour", "Bonsoir", "Bonne nuit", "Salut"], correctAnswer: "Bonsoir", hint: "Bonsoir is used in the evening." },
                { id: "a1-ch1-c1-r2", title: "Dialogue Comprehension", type: "comprehension", prompt: "Read: 'Lucas: Salut! Sophie: Bonjour Lucas. Enchant\u00e9e.' Who is Sophie meeting?" },
                { id: "a1-ch1-c1-r3", title: "Match Greetings", type: "match", prompt: "Match each French greeting to its English equivalent: Bonjour, Au revoir, Enchant\u00e9, \u00c0 bient\u00f4t" }
              ]
            },
            writing: {
              summary: "Write simple greetings and introductions using s'appeler",
              exercises: [
                { id: "a1-ch1-c1-w1", title: "Greeting Fill-In", type: "fill-blank", prompt: "Complete: '_____ (Hello), je m'appelle Pierre.'", correctAnswer: "Bonjour", hint: "The word means 'Hello'." },
                { id: "a1-ch1-c1-w2", title: "Formal vs Informal", type: "short-answer", prompt: "Write a formal greeting for your boss at 9 AM, and an informal one for a friend." },
                { id: "a1-ch1-c1-w3", title: "Greeting Dialogue", type: "prompt", prompt: "Write a short dialogue (4 lines) where you meet someone at a caf\u00e9, greet them, introduce yourself, and ask how they are." }
              ]
            },
            listening: {
              summary: "Recognise spoken greetings and distinguish formal vs informal",
              exercises: [
                { id: "a1-ch1-c1-l1", title: "Listen and Respond", type: "multiple-choice", prompt: "You hear: 'Salut, \u00e7a va?' What is the appropriate response?", options: ["Oui, \u00e7a va bien, merci", "Au revoir", "Bonne nuit", "Je suis m\u00e9decin"], correctAnswer: "Oui, \u00e7a va bien, merci" },
                { id: "a1-ch1-c1-l2", title: "Formal or Informal?", type: "multiple-choice", prompt: "You hear colleagues at the office: 'Bonjour Monsieur Dupont. - Bonjour Madame Martin, comment allez-vous?' What level of formality is this?", options: ["Formal", "Informal", "Very casual", "Angry"], correctAnswer: "Formal" },
                { id: "a1-ch1-c1-l3", title: "Time of Day", type: "multiple-choice", prompt: "You hear someone say 'Bonne nuit' as you leave. What should you reply?", options: ["Bonne nuit", "Bonjour", "Bonsoir", "Salut"], correctAnswer: "Bonne nuit" }
              ]
            },
            speaking: {
              summary: "Practise greeting, introducing yourself, and polite exchanges",
              exercises: [
                { id: "a1-ch1-c1-s1", title: "Meet & Greet", type: "roleplay", prompt: "Greet a new classmate: 'Bonjour, je m'appelle [name]. Enchant\u00e9(e).' Then ask 'Comment \u00e7a va?'" },
                { id: "a1-ch1-c1-s2", title: "Formal Introduction", type: "prompt", prompt: "Say aloud to an imaginary boss: 'Bonjour Monsieur/Madame, comment allez-vous? Je m'appelle [name]. Enchant\u00e9(e).'" },
                { id: "a1-ch1-c1-s3", title: "Leave-Taking", type: "roleplay", prompt: "Practise ending a conversation: 'Je dois y aller. Au revoir! \u00c0 demain!' Use 'Bonne journ\u00e9e' if leaving a shop." }
              ]
            }
          }
        },
        {
          id: "a1-ch1-c2",
          title: "Se pr\u00e9senter et demander le nom",
          description: "Introducing yourself and others, asking for names, the \u00e7a va loop",
          grammarFocus: "Verb: s'appeler (full conjugation); Question: Comment t'appelles-tu / vous appelez-vous",
          vocabularyTheme: "Personal identity, greetings, feelings (bien, mal, comme ci comme \u00e7a)",
          skills: {
            reading: {
              summary: "Read introductions and identify people and relationships",
              exercises: [
                { id: "a1-ch1-c2-r1", title: "Who is Who?", type: "comprehension", prompt: "Read: 'Voici Marie. Elle est fran\u00e7aise.' Who is being introduced and what is their nationality?" },
                { id: "a1-ch1-c2-r2", title: "Match Questions & Answers", type: "match", prompt: "Match 'Comment t'appelles-tu?' to 'Je m'appelle Sophie', '\u00c7a va?' to 'Oui, \u00e7a va bien'" }
              ]
            },
            writing: {
              summary: "Write self-introductions and fill in identity forms",
              exercises: [
                { id: "a1-ch1-c2-w1", title: "Your Profile", type: "prompt", prompt: "Write 3 sentences introducing yourself: name, how you are, and one greeting." },
                { id: "a1-ch1-c2-w2", title: "Conjugation Practice", type: "fill-blank", prompt: "Complete: Je m'appelle, tu t'_____, il s'_____, nous nous _____, vous vous _____, ils s'_____", correctAnswer: "appelles; appelle; appelons; appelez; appellent" },
                { id: "a1-ch1-c2-w3", title: "Formal Letter Opening", type: "prompt", prompt: "Write the first two lines of a formal letter introducing yourself to a French pen pal." }
              ]
            },
            listening: {
              summary: "Understand spoken introductions and follow basic Q&A",
              exercises: [
                { id: "a1-ch1-c2-l1", title: "Listen for Names", type: "comprehension", prompt: "You hear: 'Je m'appelle Antoine. Je suis votre professeur de fran\u00e7ais.' What is the person's name and role?" },
                { id: "a1-ch1-c2-l2", title: "How Are They?", type: "multiple-choice", prompt: "You hear: 'Comment \u00e7a va? - Je vais tr\u00e8s bien, merci.' How is the person?", options: ["Very well", "Not good", "Tired", "Hungry"], correctAnswer: "Very well" }
              ]
            },
            speaking: {
              summary: "Introduce yourself and ask others for their name",
              exercises: [
                { id: "a1-ch1-c2-s1", title: "Meet Your Partner", type: "roleplay", prompt: "Ask a partner their name: 'Comment t'appelles-tu?' Respond: 'Je m'appelle... Enchant\u00e9(e)!'" },
                { id: "a1-ch1-c2-s2", title: "Interview", type: "prompt", prompt: "Ask three people (alternating tu/vous) their names and how they are doing." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch2",
      title: "Les Nombres, l'Heure et les Dates",
      description: "Numbers 0\u2013100, telling time, days, months - Module 2",
      concepts: [
        {
          id: "a1-ch2-c1",
          title: "Les nombres 0\u2013100",
          description: "Counting from zero to one hundred",
          grammarFocus: "Numbers 0-100; Quand interrogative; Prepositions: en, \u00e0, le for dates",
          vocabularyTheme: "Numbers, age, phone numbers, prices",
          skills: {
            reading: {
              summary: "Read and interpret numbers in various contexts",
              exercises: [
                { id: "a1-ch2-c1-r1", title: "Age Puzzle", type: "comprehension", prompt: "Read: 'J'ai vingt-sept ans.' How old is the person?" },
                { id: "a1-ch2-c1-r2", title: "Phone Number", type: "fill-blank", prompt: "Read this phone number: '06 12 34 56 78'. Write it out in French words.", correctAnswer: "z\u00e9ro six douze trente-quatre cinquante-six soixante-dix-huit" },
                { id: "a1-ch2-c1-r3", title: "Math Challenge", type: "multiple-choice", prompt: "Read: 'dix + vingt = ?' What is the answer in French?", options: ["trente", "quarante", "vingt-dix", "trente-cinq"], correctAnswer: "trente" }
              ]
            },
            writing: {
              summary: "Write numbers in French words",
              exercises: [
                { id: "a1-ch2-c1-w1", title: "Number Conversion", type: "fill-blank", prompt: "Write '35' in French: _____", correctAnswer: "trente-cinq" },
                { id: "a1-ch2-c1-w2", title: "Bigger Numbers", type: "fill-blank", prompt: "Write '72' in French: _____", correctAnswer: "soixante-douze" },
                { id: "a1-ch2-c1-w3", title: "Write Your Age", type: "prompt", prompt: "Write your age in a full French sentence: 'J'ai ____ ans.'" }
              ]
            },
            listening: {
              summary: "Understand numbers spoken aloud",
              exercises: [
                { id: "a1-ch2-c1-l1", title: "Number Dictation", type: "dictation", prompt: "You hear: 'quarante-deux, soixante-dix-huit, quatre-vingt-treize'. Write the numbers.", hint: "quarante-deux=42, soixante-dix-huit=78, quatre-vingt-treize=93" },
                { id: "a1-ch2-c1-l2", title: "Train Announcement", type: "comprehension", prompt: "You hear: 'Le train num\u00e9ro 452 partira \u00e0 seize heures trente du quai num\u00e9ro douze.' What is the train number, time, and platform?" },
                { id: "a1-ch2-c1-l3", title: "Price Check", type: "multiple-choice", prompt: "You hear: '\u00c7a fait quarante-cinq euros.' How much does it cost?", options: ["35\u20ac", "45\u20ac", "55\u20ac", "65\u20ac"], correctAnswer: "45\u20ac" }
              ]
            },
            speaking: {
              summary: "Count, say numbers aloud, and state age",
              exercises: [
                { id: "a1-ch2-c1-s1", title: "Count to 30", type: "prompt", prompt: "Count from 1 to 30 in French out loud." },
                { id: "a1-ch2-c1-s2", title: "Say Your Age & Phone", type: "prompt", prompt: "Say 'J'ai [your age] ans' and spell your phone number in French." },
                { id: "a1-ch2-c1-s3", title: "The Number Game", type: "roleplay", prompt: "Ask a partner 'Quel \u00e2ge as-tu?' and 'Quel est ton num\u00e9ro de t\u00e9l\u00e9phone?' Answer in French." }
              ]
            }
          }
        },
        {
          id: "a1-ch2-c2",
          title: "L'heure et le calendrier",
          description: "Telling time, days of the week, months, and dates",
          grammarFocus: "Il est + heure; Prepositions: \u00e0, en, le; 12h vs 24h clock",
          vocabularyTheme: "Time expressions, days, months, seasons",
          skills: {
            reading: {
              summary: "Read schedules, diaries, and calendar entries",
              exercises: [
                { id: "a1-ch2-c2-r1", title: "Daily Diary", type: "comprehension", prompt: "Read: 'Aujourd'hui, nous sommes le lundi 12 mai. Il est huit heures du matin. J'ai un rendez-vous \u00e0 dix heures et quart.' What day is it?" },
                { id: "a1-ch2-c2-r2", title: "Train Timetable", type: "multiple-choice", prompt: "Read: 'D\u00e9part: 14h45. Quai num\u00e9ro 7.' What time does the train depart?", options: ["2:45 PM", "4:45 PM", "7:45 AM", "12:45 PM"], correctAnswer: "2:45 PM" }
              ]
            },
            writing: {
              summary: "Write dates and times in full French",
              exercises: [
                { id: "a1-ch2-c2-w1", title: "Today's Date", type: "prompt", prompt: "Write today's date in full French: 'Aujourd'hui, nous sommes le...'" },
                { id: "a1-ch2-c2-w2", title: "Time Writing", type: "fill-blank", prompt: "Write 8:15 in French: 'Il est _____'", correctAnswer: "huit heures et quart" }
              ]
            },
            listening: {
              summary: "Understand times and dates spoken in announcements",
              exercises: [
                { id: "a1-ch2-c2-l1", title: "Time Dictation", type: "dictation", prompt: "You hear times: 'Il est sept heures moins le quart', 'Il est midi', 'Il est seize heures et demie'. Write each one in numbers." },
                { id: "a1-ch2-c2-l2", title: "Anniversary Date", type: "comprehension", prompt: "You hear: 'En juin, c'est mon anniversaire, le vingt-deux juin.' What is the date?" }
              ]
            },
            speaking: {
              summary: "Tell time, say dates, and discuss schedules",
              exercises: [
                { id: "a1-ch2-c2-s1", title: "What Time Is It?", type: "prompt", prompt: "Say the current time in French. Use 'Il est... heures.'" },
                { id: "a1-ch2-c2-s2", title: "Weekly Schedule", type: "prompt", prompt: "Say your schedule: 'Le lundi, je travaille. Le samedi, je me repose.' Use at least 4 days." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch3",
      title: "La Famille et les Relations",
      description: "Family members, possessive adjectives, pets - Module 3",
      concepts: [
        {
          id: "a1-ch3-c1",
          title: "Les membres de la famille",
          description: "Identifying and describing family members",
          grammarFocus: "Verb: avoir (j'ai, tu as, il/elle a); Noun genders in family",
          vocabularyTheme: "Family members, marital status, pets",
          skills: {
            reading: {
              summary: "Read short family descriptions",
              exercises: [
                { id: "a1-ch3-c1-r1", title: "Family Tree", type: "comprehension", prompt: "Read: 'Mon p\u00e8re s'appelle Jean. Ma m\u00e8re s'appelle Marie. J'ai un fr\u00e8re, il s'appelle Thomas.' How many siblings does the person have?" },
                { id: "a1-ch3-c1-r2", title: "Family Riddle", type: "multiple-choice", prompt: "Read: 'Jean est le fr\u00e8re de mon p\u00e8re.' Who is Jean?", options: ["My grandfather", "My uncle", "My cousin", "My brother"], correctAnswer: "My uncle" }
              ]
            },
            writing: {
              summary: "Describe your family members",
              exercises: [
                { id: "a1-ch3-c1-w1", title: "My Family", type: "prompt", prompt: "Write 4 sentences about your family: who they are, their names, and one thing about each." },
                { id: "a1-ch3-c1-w2", title: "Avoir Conjugation", type: "fill-blank", prompt: "Complete: J'___ (have), tu ___ (have), il ___ (has), nous ___ (have), vous ___ (have), ils ___ (have)", correctAnswer: "ai; as; a; avons; avez; ont" }
              ]
            },
            listening: {
              summary: "Understand spoken family descriptions",
              exercises: [
                { id: "a1-ch3-c1-l1", title: "Photo Description", type: "comprehension", prompt: "You hear: 'C'est ma grand-m\u00e8re. Elle a quatre-vingts ans.' Who is 80 years old?" },
                { id: "a1-ch3-c1-l2", title: "Family Details", type: "multiple-choice", prompt: "You hear: 'Mon fr\u00e8re Paul a dix-neuf ans. Ma s\u0153ur L\u00e9a a vingt-quatre ans.' Who is older?", options: ["Paul", "L\u00e9a", "Same age", "Unknown"], correctAnswer: "L\u00e9a" }
              ]
            },
            speaking: {
              summary: "Talk about your family",
              exercises: [
                { id: "a1-ch3-c1-s1", title: "Family Introduction", type: "prompt", prompt: "Introduce your family: 'Dans ma famille, il y a...' Use at least 4 people." },
                { id: "a1-ch3-c1-s2", title: "Pet Talk", type: "roleplay", prompt: "Tell a friend about your pet: 'J'ai un chat/Un chien. Il/Elle s'appelle...'" }
              ]
            }
          }
        },
        {
          id: "a1-ch3-c2",
          title: "Les adjectifs possessifs",
          description: "Possessive adjectives: mon/ma/mes, ton/ta/tes, son/sa/ses",
          grammarFocus: "Possessive adjectives; Gender exceptions (mon amie)",
          vocabularyTheme: "Relationships, personal items, descriptions",
          skills: {
            reading: {
              summary: "Interpret possessive adjectives in context",
              exercises: [
                { id: "a1-ch3-c2-r1", title: "Whose is it?", type: "comprehension", prompt: "Read: 'C'est son fr\u00e8re.' Can you tell if it's 'his brother' or 'her brother'?" },
                { id: "a1-ch3-c2-r2", title: "Possessive Match", type: "match", prompt: "Match: 'mon livre' (my book), 'ta maison' (your house), 'ses parents' (his/her parents)" }
              ]
            },
            writing: {
              summary: "Use possessive adjectives correctly",
              exercises: [
                { id: "a1-ch3-c2-w1", title: "Choose the Possessive", type: "fill-blank", prompt: "Complete: '___ (My) soeur est gentille. ___ (His) p\u00e8re est strict.'", correctAnswer: "Ma; Son" },
                { id: "a1-ch3-c2-w2", title: "The Vowel Rule", type: "fill-blank", prompt: "Complete: 'C'est _____ (my - f) amie.' (Remember the rule!)", correctAnswer: "mon" }
              ]
            },
            listening: {
              summary: "Recognise possessive forms in spoken French",
              exercises: [
                { id: "a1-ch3-c2-l1", title: "Listen and Identify", type: "comprehension", prompt: "You hear: 'Mon p\u00e8re est m\u00e9decin et ma m\u00e8re est professeur.' What are their professions?" },
                { id: "a1-ch3-c2-l2", title: "Whose Pet?", type: "multiple-choice", prompt: "You hear: 'C'est son chat blanc.' Whose cat is it?", options: ["My cat", "Your cat", "His or her cat", "Our cat"], correctAnswer: "His or her cat" }
              ]
            },
            speaking: {
              summary: "Practise using possessives",
              exercises: [
                { id: "a1-ch3-c2-s1", title: "Family Possessives", type: "roleplay", prompt: "Point to photos and say: 'C'est ma m\u00e8re. Voici mon p\u00e8re. Ce sont mes fr\u00e8res.'" },
                { id: "a1-ch3-c2-s2", title: "Talk About Your Things", type: "prompt", prompt: "Show three objects and say whose they are: 'C'est mon t\u00e9l\u00e9phone. C'est ton livre. C'est son stylo.'" }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch4",
      title: "Ma Maison et ma Routine",
      description: "Describing your home, rooms, and daily activities - Module 4",
      concepts: [
        {
          id: "a1-ch4-c1",
          title: "Les pi\u00e8ces de la maison",
          description: "House rooms, furniture, and prepositions of place",
          grammarFocus: "Il y a / il n'y a pas de; Prepositions: dans, sur, sous, devant, derri\u00e8re",
          vocabularyTheme: "House, rooms, furniture, home items",
          skills: {
            reading: {
              summary: "Read descriptions of homes and room layouts",
              exercises: [
                { id: "a1-ch4-c1-r1", title: "Apartment Tour", type: "comprehension", prompt: "Read: 'J'habite dans une petite maison avec un jardin. Dans ma maison, il y a deux chambres, un grand salon et une cuisine moderne.' How many bedrooms?" },
                { id: "a1-ch4-c1-r2", title: "Where Is It?", type: "multiple-choice", prompt: "Read: 'Le chat dort sur le canap\u00e9.' Where is the cat?", options: ["Under the sofa", "On the sofa", "Next to the sofa", "Behind the sofa"], correctAnswer: "On the sofa" }
              ]
            },
            writing: {
              summary: "Describe your home using il y a and prepositions",
              exercises: [
                { id: "a1-ch4-c1-w1", title: "My Dream Home", type: "prompt", prompt: "Describe your ideal home in 4 sentences. Use 'Dans ma maison, il y a...' Mention at least 3 rooms." },
                { id: "a1-ch4-c1-w2", title: "Preposition Practice", type: "fill-blank", prompt: "Complete: 'Le livre est _____ (on) la table. Le chat est _____ (under) le canap\u00e9.'", correctAnswer: "sur; sous" }
              ]
            },
            listening: {
              summary: "Understand descriptions of room layouts",
              exercises: [
                { id: "a1-ch4-c1-l1", title: "Messy Room", type: "comprehension", prompt: "You hear: 'Dans ma chambre, il y a un lit, un bureau noir. Sous le lit, il y a mes chaussures!' Where are the shoes?" },
                { id: "a1-ch4-c1-l2", title: "House Tour", type: "comprehension", prompt: "You hear: 'La cuisine est \u00e0 c\u00f4t\u00e9 du salon. La salle de bains est en face de la chambre.' Which room is next to the living room?" }
              ]
            },
            speaking: {
              summary: "Give a tour of your home",
              exercises: [
                { id: "a1-ch4-c1-s1", title: "Room Tour", type: "prompt", prompt: "Give a 1-minute tour of your home: 'Dans mon appartement/ma maison, il y a...'" },
                { id: "a1-ch4-c1-s2", title: "Where's the Cat?", type: "roleplay", prompt: "Describe where things are using prepositions of place." }
              ]
            }
          }
        },
        {
          id: "a1-ch4-c2",
          title: "La routine quotidienne",
          description: "Daily routines and reflexive verbs",
          grammarFocus: "Reflexive verbs: se lever, se doucher, s'habiller, se coucher",
          vocabularyTheme: "Daily activities, morning routine, evening routine",
          skills: {
            reading: {
              summary: "Read daily routine descriptions",
              exercises: [
                { id: "a1-ch4-c2-r1", title: "Morning Routine", type: "comprehension", prompt: "Read: 'Je me r\u00e9veille \u00e0 six heures. Je me douche et je m'habille. Ensuite, je prends mon petit-d\u00e9jeuner.' What does the person do after showering?" },
                { id: "a1-ch4-c2-r2", title: "Routine Order", type: "multiple-choice", prompt: "Read: 'Le matin, je me l\u00e8ve, je me douche, je prends le petit-d\u00e9jeuner.' What comes first?", options: ["Shower", "Get up", "Breakfast", "Get dressed"], correctAnswer: "Get up" }
              ]
            },
            writing: {
              summary: "Write about your daily routine",
              exercises: [
                { id: "a1-ch4-c2-w1", title: "My Day", type: "prompt", prompt: "Write 5 sentences about your daily routine using reflexive verbs." },
                { id: "a1-ch4-c2-w2", title: "Reflexive Fill-In", type: "fill-blank", prompt: "Complete: 'Je ____ l\u00e8ve \u00e0 7h. Tu ____ l\u00e8ves \u00e0 8h. Nous ____ lavons.'", correctAnswer: "me; te; nous" }
              ]
            },
            listening: {
              summary: "Understand spoken descriptions of daily routines",
              exercises: [
                { id: "a1-ch4-c2-l1", title: "Listen to the Routine", type: "comprehension", prompt: "You hear: 'D'habitude, je me l\u00e8ve t\u00f4t, vers six heures et demie.' What time does the person get up?" },
                { id: "a1-ch4-c2-l2", title: "Missing Breakfast", type: "comprehension", prompt: "You hear: 'Je ne prends pas de petit-d\u00e9jeuner \u00e0 la maison car je n'ai pas le temps.' Why doesn't the person eat at home?" }
              ]
            },
            speaking: {
              summary: "Talk about your daily schedule",
              exercises: [
                { id: "a1-ch4-c2-s1", title: "Walk Through Your Day", type: "prompt", prompt: "Describe your morning routine step by step. Use at least 3 reflexive verbs." },
                { id: "a1-ch4-c2-s2", title: "Compare Routines", type: "roleplay", prompt: "Ask a partner: '\u00c0 quelle heure est-ce que tu te l\u00e8ves?'" }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch5",
      title: "La Nourriture et le Restaurant",
      description: "Food, drinks, ordering at a restaurant - Module 5",
      concepts: [
        {
          id: "a1-ch5-c1",
          title: "Les aliments et les boissons",
          description: "Food vocabulary and partitive articles",
          grammarFocus: "Partitive articles (du, de la, de l', des); Negation: ne...pas de; Verb: manger",
          vocabularyTheme: "Food, drinks, groceries, meals",
          skills: {
            reading: {
              summary: "Read menus, recipes, and grocery lists",
              exercises: [
                { id: "a1-ch5-c1-r1", title: "Menu Reading", type: "comprehension", prompt: "Read: 'Entr\u00e9e: salade verte. Plat principal: poulet avec des l\u00e9gumes. Dessert: tarte aux pommes.' What is the main course?" },
                { id: "a1-ch5-c1-r2", title: "Grocery List", type: "multiple-choice", prompt: "Read: 'Je veux du pain, de la confiture et des fruits.' What does the person NOT want?", options: ["Bread", "Jam", "Fruit", "Cheese"], correctAnswer: "Cheese" }
              ]
            },
            writing: {
              summary: "Write using partitive articles",
              exercises: [
                { id: "a1-ch5-c1-w1", title: "Grocery List", type: "prompt", prompt: "Write a shopping list using 'Je dois acheter du/de la/de l'/des...' for at least 5 items." },
                { id: "a1-ch5-c1-w2", title: "Partitive Fill-In", type: "fill-blank", prompt: "Complete: 'Je mange _____ pain. Tu bois _____ eau. Elle ach\u00e8te _____ fruits.'", correctAnswer: "du; de l'; des" },
                { id: "a1-ch5-c1-w3", title: "The Negative Switch", type: "fill-blank", prompt: "Transform to negative: 'Je mange du pain' -> 'Je ne mange pas _____ pain.'", correctAnswer: "de" }
              ]
            },
            listening: {
              summary: "Understand food orders and market conversations",
              exercises: [
                { id: "a1-ch5-c1-l1", title: "Market Shopping", type: "comprehension", prompt: "You hear: 'Je voudrais deux kilos d'oranges et un morceau de fromage.' What does the person want?" },
                { id: "a1-ch5-c1-l2", title: "Morning Drinks", type: "comprehension", prompt: "You hear: 'Je bois du caf\u00e9 le matin. Ma soeur boit du th\u00e9.' What does the speaker drink?" }
              ]
            },
            speaking: {
              summary: "Talk about food and quantities",
              exercises: [
                { id: "a1-ch5-c1-s1", title: "What's in Your Fridge?", type: "prompt", prompt: "Say what you have: 'Dans mon frigo, il y a du lait, de la salade, des oeufs...'" },
                { id: "a1-ch5-c1-s2", title: "Likes & Dislikes", type: "roleplay", prompt: "Tell a friend: 'J'aime... Je n'aime pas... Je pr\u00e9f\u00e8re...'" }
              ]
            }
          }
        },
        {
          id: "a1-ch5-c2",
          title: "Commander au restaurant",
          description: "Ordering meals, politeness formulas, asking for the bill",
          grammarFocus: "Verb: vouloir (je voudrais), boire; Politeness: conditionnel",
          vocabularyTheme: "Restaurant, menu, bill, service",
          skills: {
            reading: {
              summary: "Read restaurant dialogues",
              exercises: [
                { id: "a1-ch5-c2-r1", title: "Restaurant Dialogue", type: "comprehension", prompt: "Read: 'Ce soir, je vais au restaurant. Je voudrais une salade. Comme plat principal, je prends du poulet.' What starter does the person order?" },
                { id: "a1-ch5-c2-r2", title: "Politeness Test", type: "multiple-choice", prompt: "Which is more polite: 'Je voudrais un caf\u00e9' or 'Je veux un caf\u00e9'?", options: ["Je voudrais", "Je veux", "Both are fine", "Neither"], correctAnswer: "Je voudrais" }
              ]
            },
            writing: {
              summary: "Write restaurant dialogues",
              exercises: [
                { id: "a1-ch5-c2-w1", title: "Order at a Caf\u00e9", type: "prompt", prompt: "Write a short dialogue ordering a coffee and croissant. Include greeting, order, thanks." },
                { id: "a1-ch5-c2-w2", title: "Ask for the Bill", type: "prompt", prompt: "Write 3 polite ways to ask for the bill." }
              ]
            },
            listening: {
              summary: "Understand restaurant conversations",
              exercises: [
                { id: "a1-ch5-c2-l1", title: "Placing an Order", type: "comprehension", prompt: "You hear: 'Je voudrais un caf\u00e9 noir et un croissant.' What is the order?" },
                { id: "a1-ch5-c2-l2", title: "Steak Doneness", type: "multiple-choice", prompt: "You hear: 'Quelle cuisson? - Saignant.' How do they want the steak?", options: ["Rare", "Medium", "Well-done", "Blue"], correctAnswer: "Rare" }
              ]
            },
            speaking: {
              summary: "Roleplay ordering at a restaurant",
              exercises: [
                { id: "a1-ch5-c2-s1", title: "At the Restaurant", type: "roleplay", prompt: "Roleplay: greet, order a starter, main course, drink, and ask for the bill." },
                { id: "a1-ch5-c2-s2", title: "Polite Customer", type: "prompt", prompt: "Practice: 'Bonjour, une table pour deux. Je voudrais voir la carte. L'addition, s'il vous pla\u00eet.'" }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch6",
      title: "Les Achats et les V\u00eatements",
      description: "Clothes, colors, shopping, prices - Module 6",
      concepts: [
        {
          id: "a1-ch6-c1",
          title: "Les v\u00eatements et les couleurs",
          description: "Clothing items, colors, adjective agreement",
          grammarFocus: "Adjective agreement; Verb: mettre; Irregular colors: marron, orange",
          vocabularyTheme: "Clothes, accessories, colors, sizes",
          skills: {
            reading: {
              summary: "Read clothing descriptions",
              exercises: [
                { id: "a1-ch6-c1-r1", title: "Shopping Description", type: "comprehension", prompt: "Read: 'Cette veste rouge est tr\u00e8s belle, mais elle co\u00fbte quatre-vingts euros.' What color is the jacket and how much?" },
                { id: "a1-ch6-c1-r2", title: "Color Agreement", type: "multiple-choice", prompt: "Read: 'Une robe _____ (blanc).' Choose the correct form.", options: ["blanc", "blanche", "blanches", "blancs"], correctAnswer: "blanche" }
              ]
            },
            writing: {
              summary: "Describe outfits using colors",
              exercises: [
                { id: "a1-ch6-c1-w1", title: "My Outfit", type: "prompt", prompt: "Describe what you're wearing today. Use colors and demonstrative adjectives." },
                { id: "a1-ch6-c1-w2", title: "Color Fill-In", type: "fill-blank", prompt: "Complete: 'Une chemise _____ (white). Des chaussures _____ (blue).'", correctAnswer: "blanche; bleues" },
                { id: "a1-ch6-c1-w3", title: "The Rebel Colors", type: "fill-blank", prompt: "Complete: 'Des chaussures _____ (marron). Des sacs _____ (orange).'", correctAnswer: "marron; orange" }
              ]
            },
            listening: {
              summary: "Understand clothing conversations",
              exercises: [
                { id: "a1-ch6-c1-l1", title: "Fashion Talk", type: "comprehension", prompt: "You hear: 'Regarde cette veste, elle est super! Elle co\u00fbte soixante-neuf euros.' How much is the jacket?" },
                { id: "a1-ch6-c1-l2", title: "Size Problem", type: "comprehension", prompt: "You hear: 'Je vais l'essayer en taille M. Oh non, c'est trop petit.' What's wrong?" }
              ]
            },
            speaking: {
              summary: "Describe clothes and fashion",
              exercises: [
                { id: "a1-ch6-c1-s1", title: "Fashion Show", type: "prompt", prompt: "Describe an outfit you love: 'Aujourd'hui, je porte...'" },
                { id: "a1-ch6-c1-s2", title: "Style Critique", type: "roleplay", prompt: "Comment on a friend's outfit: 'J'adore cette chemise!'" }
              ]
            }
          }
        },
        {
          id: "a1-ch6-c2",
          title: "Les achats",
          description: "Shopping dialogues, asking prices, sizes",
          grammarFocus: "Demonstrative adjectives; Verb: acheter, payer; Combien interrogative",
          vocabularyTheme: "Shops, prices, sizes (taille vs pointure), payment",
          skills: {
            reading: {
              summary: "Read price tags and shop signs",
              exercises: [
                { id: "a1-ch6-c2-r1", title: "Shop Signs", type: "comprehension", prompt: "Read: 'Boulangerie - Ouvert du lundi au samedi.' When is the bakery closed?" },
                { id: "a1-ch6-c2-r2", title: "Demonstrative Match", type: "match", prompt: "Match: 'ce pull', 'cette robe', 'ces chaussures', 'cet homme'" }
              ]
            },
            writing: {
              summary: "Write shopping dialogues",
              exercises: [
                { id: "a1-ch6-c2-w1", title: "Shopping Dialogue", type: "prompt", prompt: "Write a dialogue: ask for an item, ask the price, try on, and buy." },
                { id: "a1-ch6-c2-w2", title: "Demonstrative Fill-In", type: "fill-blank", prompt: "Complete: '_____ (This) jupe est trop courte. _____ (These) chaussures sont trop ch\u00e8res.'", correctAnswer: "Cette; Ces" },
                { id: "a1-ch6-c2-w3", title: "Taille vs Pointure", type: "multiple-choice", prompt: "Buying shoes - do you ask for 'taille' or 'pointure'?", options: ["Taille", "Pointure", "Num\u00e9ro", "Pied"], correctAnswer: "Pointure" }
              ]
            },
            listening: {
              summary: "Understand prices and payment conversations",
              exercises: [
                { id: "a1-ch6-c2-l1", title: "Checkout", type: "comprehension", prompt: "You hear: '\u00c7a fait 45 euros. Vous payez comment? - Par carte.' How does the customer pay?" },
                { id: "a1-ch6-c2-l2", title: "Adding Items", type: "comprehension", prompt: "You hear: 'Et ce sac aussi. Total: 50 euros.' What is the total?" }
              ]
            },
            speaking: {
              summary: "Practise shopping conversations",
              exercises: [
                { id: "a1-ch6-c2-s1", title: "At the Boutique", type: "roleplay", prompt: "Buy a shirt: 'Puis-je essayer?', 'Combien \u00e7a co\u00fbte?'" },
                { id: "a1-ch6-c2-s2", title: "Market Stall", type: "prompt", prompt: "Ask for 3 items, ask prices, say how you'll pay." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch7",
      title: "Les Loisirs et les Int\u00e9r\u00eats",
      description: "Hobbies, sports, music, expressing likes - Module 7",
      concepts: [
        {
          id: "a1-ch7-c1",
          title: "Les activit\u00e9s de loisirs",
          description: "Leisure activities and adverbs of frequency",
          grammarFocus: "Verb: faire; Adverbs of frequency; Jouer \u00e0 vs Jouer de",
          vocabularyTheme: "Hobbies, sports, musical instruments, frequency",
          skills: {
            reading: {
              summary: "Read about people's hobbies",
              exercises: [
                { id: "a1-ch7-c1-r1", title: "Weekend Activities", type: "comprehension", prompt: "Read: 'Tous les samedis, je joue au tennis. Le dimanche, je fais du v\u00e9lo.' What does the person do on Saturdays?" },
                { id: "a1-ch7-c1-r2", title: "Hobby Match", type: "match", prompt: "Match: 'faire du v\u00e9lo', 'jouer au tennis', 'jouer de la guitare'" }
              ]
            },
            writing: {
              summary: "Write about your hobbies",
              exercises: [
                { id: "a1-ch7-c1-w1", title: "My Hobbies", type: "prompt", prompt: "Write a paragraph about your hobbies. Use faire and jouer." },
                { id: "a1-ch7-c1-w2", title: "Faire vs Jouer", type: "fill-blank", prompt: "Complete: 'Je _____ du tennis. Je _____ de la guitare. Je _____ de la natation.'", correctAnswer: "joue; joue; fais" },
                { id: "a1-ch7-c1-w3", title: "Frequency", type: "prompt", prompt: "Write what you always, often, sometimes, never do." }
              ]
            },
            listening: {
              summary: "Understand spoken hobby descriptions",
              exercises: [
                { id: "a1-ch7-c1-l1", title: "Weekend Plans", type: "comprehension", prompt: "You hear: 'Samedi, je joue au tennis. Dimanche, je vais au cin\u00e9ma.' What happens Sunday?" },
                { id: "a1-ch7-c1-l2", title: "Extreme Tastes", type: "comprehension", prompt: "You hear: 'Je d\u00e9teste le froid, j'adore voyager dans les pays chauds.' What does the person love?" }
              ]
            },
            speaking: {
              summary: "Discuss hobbies and interests",
              exercises: [
                { id: "a1-ch7-c1-s1", title: "Weekly Schedule", type: "prompt", prompt: "Describe a typical week with at least 3 hobbies." },
                { id: "a1-ch7-c1-s2", title: "Hidden Talent", type: "roleplay", prompt: "Tell a partner about your hidden talent: 'Mon talent cach\u00e9 est...'" }
              ]
            }
          }
        },
        {
          id: "a1-ch7-c2",
          title: "Les sports et les instruments",
          description: "Sports and music vocabulary, faire vs jouer distinction",
          grammarFocus: "Jouer \u00e0 (sports) vs Jouer de (instruments); Faire + partitive",
          vocabularyTheme: "Team sports, individual sports, musical instruments",
          skills: {
            reading: {
              summary: "Read about sports and music",
              exercises: [
                { id: "a1-ch7-c2-r1", title: "Sports Fan", type: "comprehension", prompt: "Read: 'Je joue au football tous les samedis. Je fais aussi de la natation.' What sport on Saturdays?" },
                { id: "a1-ch7-c2-r2", title: "Faire + Activity", type: "multiple-choice", prompt: "Read: 'Ma passion, c'est la danse! Je fais de la danse.' What verb is used?", options: ["Jouer", "Faire", "Aller", "Prendre"], correctAnswer: "Faire" }
              ]
            },
            writing: {
              summary: "Write about sports and music",
              exercises: [
                { id: "a1-ch7-c2-w1", title: "Sports & Music", type: "prompt", prompt: "Write 4 sentences: 2 about sports (jouer \u00e0) and 2 about activities (faire de)." },
                { id: "a1-ch7-c2-w2", title: "Jouer Fill-In", type: "fill-blank", prompt: "Complete: 'Je joue _____ basket. Tu joues _____ guitare.'", correctAnswer: "au; de la" }
              ]
            },
            listening: {
              summary: "Understand sports and music discussions",
              exercises: [
                { id: "a1-ch7-c2-l1", title: "Hobbies Discussion", type: "comprehension", prompt: "You hear: 'J'adore jouer du piano. Et toi? - Moi, je joue au basket.' What does the first person play?" },
                { id: "a1-ch7-c2-l2", title: "Frequency Quiz", type: "multiple-choice", prompt: "You hear: 'Je joue souvent au tennis, mais jamais de yoga.' What do they never do?", options: ["Tennis", "Yoga", "Both", "Neither"], correctAnswer: "Yoga" }
              ]
            },
            speaking: {
              summary: "Discuss sports and musical interests",
              exercises: [
                { id: "a1-ch7-c2-s1", title: "Sport Interview", type: "roleplay", prompt: "Ask: 'Tu fais du sport? Tu joues d'un instrument?'" },
                { id: "a1-ch7-c2-s2", title: "My Passion", type: "prompt", prompt: "Talk for 1 minute about your favorite hobby." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch8",
      title: "La Ville et les Transports",
      description: "City places, transportation, directions - Module 8",
      concepts: [
        {
          id: "a1-ch8-c1",
          title: "Les lieux de la ville",
          description: "Public places and using \u00e0 with contractions",
          grammarFocus: "Contractions: au, \u00e0 la, \u00e0 l', aux; Verb: aller; O\u00f9 interrogative",
          vocabularyTheme: "City places, shops, services",
          skills: {
            reading: {
              summary: "Read city descriptions and signs",
              exercises: [
                { id: "a1-ch8-c1-r1", title: "City Guide", type: "comprehension", prompt: "Read: 'La poste est \u00e0 c\u00f4t\u00e9 de la boulangerie. La gare est en face du parc.' Where is the train station?" },
                { id: "a1-ch8-c1-r2", title: "Location Logic", type: "multiple-choice", prompt: "Read: 'Le mus\u00e9e est \u00e0 droite de la banque.' Where is the museum?", options: ["Left of bank", "Right of bank", "Behind bank", "In front"], correctAnswer: "Right of bank" }
              ]
            },
            writing: {
              summary: "Write about places in a city",
              exercises: [
                { id: "a1-ch8-c1-w1", title: "My Neighborhood", type: "prompt", prompt: "Describe your neighborhood: 'Dans mon quartier, il y a...' Mention shops and parks." },
                { id: "a1-ch8-c1-w2", title: "Contraction Fill-In", type: "fill-blank", prompt: "Complete: 'Je vais _____ mus\u00e9e. Nous allons _____ poste.'", correctAnswer: "au; \u00e0 la" }
              ]
            },
            listening: {
              summary: "Understand location descriptions",
              exercises: [
                { id: "a1-ch8-c1-l1", title: "Lost Tourist", type: "comprehension", prompt: "You hear: 'Pour aller au Louvre? Vous devez prendre le m\u00e9tro, ligne un.' Which line?" },
                { id: "a1-ch8-c1-l2", title: "Metro Announcement", type: "comprehension", prompt: "You hear: 'Prochaine station: H\u00f4tel de Ville. Correspondance ligne un.' What is the transfer for?" }
              ]
            },
            speaking: {
              summary: "Ask for and give locations",
              exercises: [
                { id: "a1-ch8-c1-s1", title: "Find the Bakery", type: "roleplay", prompt: "Ask: 'Pardon, o\u00f9 est la boulangerie?'" },
                { id: "a1-ch8-c1-s2", title: "Getting Around", type: "prompt", prompt: "Say how you get to places using en vs \u00e0 for transport." }
              ]
            }
          }
        },
        {
          id: "a1-ch8-c2",
          title: "Les directions et les transports",
          description: "Giving directions, imperative mood, transport vocabulary",
          grammarFocus: "Imperative: tournez, prenez, allez; En vs \u00e0 for transport",
          vocabularyTheme: "Directions, transport modes, maps",
          skills: {
            reading: {
              summary: "Read and follow directions",
              exercises: [
                { id: "a1-ch8-c2-r1", title: "Find the Way", type: "comprehension", prompt: "Read: 'Continuez tout droit, tournez \u00e0 droite. La gare est en face du parc.' What is the second step?" },
                { id: "a1-ch8-c2-r2", title: "Transport Choice", type: "multiple-choice", prompt: "Read: 'Je vais au parc _____ v\u00e9lo. Je vais \u00e0 Paris _____ train.'", options: ["\u00e0, en", "en, \u00e0", "\u00e0, \u00e0", "en, en"], correctAnswer: "\u00e0, en" }
              ]
            },
            writing: {
              summary: "Write clear directions",
              exercises: [
                { id: "a1-ch8-c2-w1", title: "Give Directions", type: "prompt", prompt: "Write directions from your house to a bus stop using imperative forms." },
                { id: "a1-ch8-c2-w2", title: "Imperative Fill-In", type: "fill-blank", prompt: "Complete: '_____ (Go) tout droit. _____ (Turn) \u00e0 gauche.'", correctAnswer: "Allez; Tournez" }
              ]
            },
            listening: {
              summary: "Understand transport announcements",
              exercises: [
                { id: "a1-ch8-c2-l1", title: "Train Announcement", type: "comprehension", prompt: "You hear: 'Le train pour Lyon part \u00e0 quatorze heures, voie trois.' Time and platform?" },
                { id: "a1-ch8-c2-l2", title: "Direction Check", type: "comprehension", prompt: "You hear: 'Continuez tout droit, tournez \u00e0 gauche apr\u00e8s la boulangerie.' Where to turn?" }
              ]
            },
            speaking: {
              summary: "Give directions and discuss transport",
              exercises: [
                { id: "a1-ch8-c2-s1", title: "Tour Guide", type: "roleplay", prompt: "Give directions from the station to the square using imperative forms." },
                { id: "a1-ch8-c2-s2", title: "How You Travel", type: "prompt", prompt: "Explain your commute: 'Pour aller au travail, je prends le bus.'" }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch9",
      title: "La M\u00e9t\u00e9o et le Portrait Physique",
      description: "Weather, physical descriptions, personality - Module 9",
      concepts: [
        {
          id: "a1-ch9-c1",
          title: "Le portrait physique",
          description: "Describing appearance and personality",
          grammarFocus: "Adjective agreement; \u00catre vs Avoir; Beau/belle, vieux/vieille",
          vocabularyTheme: "Physical appearance, personality traits",
          skills: {
            reading: {
              summary: "Read physical descriptions",
              exercises: [
                { id: "a1-ch9-c1-r1", title: "Who Is This?", type: "comprehension", prompt: "Read: 'Maxime est grand et a les cheveux bruns boucl\u00e9s. Il est sympathique et dr\u00f4le.' What hair does Maxime have?" },
                { id: "a1-ch9-c1-r2", title: "Irregular Adjectives", type: "multiple-choice", prompt: "Read: 'C'est un _____ gar\u00e7on. C'est une _____ fille.'", options: ["beau, belle", "belle, beau", "beaux, belles", "bel, belle"], correctAnswer: "beau, belle" }
              ]
            },
            writing: {
              summary: "Write physical descriptions",
              exercises: [
                { id: "a1-ch9-c1-w1", title: "Missing Person", type: "prompt", prompt: "Write a report describing a friend: height, hair, eyes, clothing." },
                { id: "a1-ch9-c1-w2", title: "Adjective Agreement", type: "fill-blank", prompt: "Correct: 'Une femme (s\u00e9rieux)' -> _____", correctAnswer: "s\u00e9rieuse" }
              ]
            },
            listening: {
              summary: "Understand spoken descriptions",
              exercises: [
                { id: "a1-ch9-c1-l1", title: "Roommate Description", type: "comprehension", prompt: "You hear: 'Mon colocataire Bruno est grand avec une barbe \u00e9norme.' What does Bruno look like?" },
                { id: "a1-ch9-c1-l2", title: "Appearance Details", type: "multiple-choice", prompt: "You hear: 'Paul est grand, cheveux bruns, yeux bleus.' What eye color?", options: ["Brown", "Blue", "Green", "Black"], correctAnswer: "Blue" }
              ]
            },
            speaking: {
              summary: "Describe people's appearance",
              exercises: [
                { id: "a1-ch9-c1-s1", title: "Describe Your Best Friend", type: "prompt", prompt: "Describe your best friend using 5+ adjectives." },
                { id: "a1-ch9-c1-s2", title: "Guess Who?", type: "roleplay", prompt: "Describe a famous person. Partner must guess." }
              ]
            }
          }
        },
        {
          id: "a1-ch9-c2",
          title: "La m\u00e9t\u00e9o",
          description: "Weather expressions and seasons",
          grammarFocus: "Faire + weather; Il y a du soleil/vent; Quel temps fait-il?",
          vocabularyTheme: "Weather, seasons, temperature",
          skills: {
            reading: {
              summary: "Read weather descriptions",
              exercises: [
                { id: "a1-ch9-c2-r1", title: "Weather Report", type: "comprehension", prompt: "Read: 'Aujourd'hui, il fait tr\u00e8s beau \u00e0 Nice. Il y a du soleil et il fait chaud.' What's the weather?" },
                { id: "a1-ch9-c2-r2", title: "Seasons Match", type: "match", prompt: "Match: 'Il neige' (winter), 'Il fait chaud' (summer)" }
              ]
            },
            writing: {
              summary: "Write about weather",
              exercises: [
                { id: "a1-ch9-c2-w1", title: "Today's Weather", type: "prompt", prompt: "Describe today's weather using 3-4 expressions." },
                { id: "a1-ch9-c2-w2", title: "Weather Fill-In", type: "fill-blank", prompt: "Complete: 'Il _____ beau. Il _____ du soleil.'", correctAnswer: "fait; y a" }
              ]
            },
            listening: {
              summary: "Understand weather forecasts",
              exercises: [
                { id: "a1-ch9-c2-l1", title: "Forecast", type: "comprehension", prompt: "You hear: 'Demain, il va pleuvoir. Il fera froid avec du vent.' What weather?" },
                { id: "a1-ch9-c2-l2", title: "Preferences", type: "comprehension", prompt: "You hear: 'Je pr\u00e9f\u00e8re le soleil et la chaleur.' What does the person prefer?" }
              ]
            },
            speaking: {
              summary: "Talk about weather",
              exercises: [
                { id: "a1-ch9-c2-s1", title: "Weather Report", type: "prompt", prompt: "Present a short weather forecast for your city." },
                { id: "a1-ch9-c2-s2", title: "Favorite Season", type: "prompt", prompt: "Say which season you prefer and why." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch10",
      title: "La Sant\u00e9 et le Corps Humain",
      description: "Body parts, expressing pain, health advice - Module 10",
      concepts: [
        {
          id: "a1-ch10-c1",
          title: "Les parties du corps",
          description: "Naming body parts and expressing pain",
          grammarFocus: "J'ai mal \u00e0 + article; Verb: avoir mal; Body part genders",
          vocabularyTheme: "Body parts, symptoms, pain expressions",
          skills: {
            reading: {
              summary: "Read about symptoms",
              exercises: [
                { id: "a1-ch10-c1-r1", title: "Doctor Visit", type: "comprehension", prompt: "Read: 'J'ai mal \u00e0 la gorge et j'ai de la fi\u00e8vre. Je pense que j'ai un rhume.' What are the symptoms?" },
                { id: "a1-ch10-c1-r2", title: "Anatomy Match", type: "match", prompt: "Match: 'la t\u00eate' (head), 'le dos' (back), 'les dents' (teeth)" }
              ]
            },
            writing: {
              summary: "Write about symptoms",
              exercises: [
                { id: "a1-ch10-c1-w1", title: "At the Doctor", type: "prompt", prompt: "Write a dialogue: tell the doctor what hurts using 'J'ai mal au/\u00e0 la/aux...'" },
                { id: "a1-ch10-c1-w2", title: "Pain Expression", type: "fill-blank", prompt: "Complete: 'J'ai mal _____ (to the) dos. Il a mal _____ (to the) t\u00eate. Elle a mal _____ (to the) dents.'", correctAnswer: "au; \u00e0 la; aux" },
                { id: "a1-ch10-c1-w3", title: "Calling In Sick", type: "prompt", prompt: "Write a sick day message: mention 2 body parts and 1 doctor's instruction." }
              ]
            },
            listening: {
              summary: "Understand health conversations",
              exercises: [
                { id: "a1-ch10-c1-l1", title: "Medical Appointment", type: "comprehension", prompt: "You hear: 'Je voudrais un rendez-vous pour mon fils. Il a mal aux oreilles.' Who has an earache?" },
                { id: "a1-ch10-c1-l2", title: "Symptoms Check", type: "comprehension", prompt: "You hear: 'J'ai mal \u00e0 la t\u00eate et j'ai de la fi\u00e8vre.' What symptoms?" }
              ]
            },
            speaking: {
              summary: "Describe symptoms",
              exercises: [
                { id: "a1-ch10-c1-s1", title: "At the Pharmacy", type: "roleplay", prompt: "Explain symptoms: 'Bonjour, j'ai un rhume et j'ai mal \u00e0 la gorge.'" },
                { id: "a1-ch10-c1-s2", title: "Body Parts Quiz", type: "prompt", prompt: "Point and name 8 body parts in French." }
              ]
            }
          }
        },
        {
          id: "a1-ch10-c2",
          title: "Les soins de sant\u00e9",
          description: "Health advice, pourquoi/parce que, devoir",
          grammarFocus: "Verb: devoir; Pourquoi/Parce que; Health advice expressions",
          vocabularyTheme: "Health, medicine, doctor, pharmacy",
          skills: {
            reading: {
              summary: "Read health advice",
              exercises: [
                { id: "a1-ch10-c2-r1", title: "Doctor's Advice", type: "comprehension", prompt: "Read: 'Le m\u00e9decin dit: Tu dois rester au lit et te reposer.' What's the advice?" },
                { id: "a1-ch10-c2-r2", title: "Health Poster", type: "multiple-choice", prompt: "Read: 'Mangez 5 fruits et l\u00e9gumes par jour.' How many?", options: ["3", "5", "7", "10"], correctAnswer: "5" }
              ]
            },
            writing: {
              summary: "Write health advice",
              exercises: [
                { id: "a1-ch10-c2-w1", title: "Health Advice", type: "prompt", prompt: "Write 3 pieces of advice using 'Tu dois...' or 'Vous devez...'" },
                { id: "a1-ch10-c2-w2", title: "Pourquoi/Parce que", type: "fill-blank", prompt: "Complete: '_____ (Why) es-tu fatigu\u00e9? - _____ (Because) je travaille.'", correctAnswer: "Pourquoi; Parce que" }
              ]
            },
            listening: {
              summary: "Understand health advice",
              exercises: [
                { id: "a1-ch10-c2-l1", title: "Appointment Booking", type: "comprehension", prompt: "You hear: 'Est-ce qu'il a de la fi\u00e8vre? - Oui, 38.5. - Venez \u00e0 16h30.' What is the fever?" },
                { id: "a1-ch10-c2-l2", title: "Medicine Advice", type: "comprehension", prompt: "You hear: 'Prenez ce m\u00e9dicament et ne mangez plus de g\u00e2teau!' What two pieces of advice?" }
              ]
            },
            speaking: {
              summary: "Give and receive health advice",
              exercises: [
                { id: "a1-ch10-c2-s1", title: "You Should...", type: "roleplay", prompt: "Give advice: 'Tu dois dormir. Tu dois boire de l'eau.'" },
                { id: "a1-ch10-c2-s2", title: "Explaining Illness", type: "prompt", prompt: "Explain why you missed class: 'Pourquoi tu n'es pas venu? - Parce que j'\u00e9tais malade.'" }
              ]
            }
          }
        }
      ]
    }
  ]
};
