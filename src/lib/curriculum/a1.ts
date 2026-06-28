import type { Level } from "./types";

export const a1: Level = {
  id: "A1",
  title: "Beginner – Découverte",
  subtitle: "Breakthrough",
  description: "Can understand and use familiar everyday expressions and very basic phrases. Can introduce themselves and others and can ask and answer questions about personal details.",
  chapters: [
    {
      id: "a1-ch1",
      title: "Salutations et Présentations",
      description: "Greetings, introductions, basic politeness",
      concepts: [
        {
          id: "a1-ch1-c1",
          title: "Les salutations de base",
          description: "Basic greetings: bonjour, salut, bonsoir, au revoir",
          grammarFocus: "Present tense: être (je suis, tu es)",
          vocabularyTheme: "Greetings and farewells",
          skills: {
            reading: {
              summary: "Read simple greeting dialogues and identify appropriate responses",
              exercises: [
                { id: "a1-ch1-c1-r1", title: "Identify the Greeting", type: "multiple-choice", prompt: "Read: 'It is 8 PM. You meet a colleague. What do you say?'", options: ["Bonjour", "Bonsoir", "Bonne nuit", "Salut"], correctAnswer: "Bonsoir", hint: "Bonsoir is used in the evening." },
                { id: "a1-ch1-c1-r2", title: "Match the Dialogue", type: "match", prompt: "Match each French greeting to its English equivalent." },
                { id: "a1-ch1-c1-r3", title: "Greeting Cards", type: "comprehension", prompt: "Read the short message: 'Bonjour Marie, comment vas-tu ?' What is the relationship between the speakers?" }
              ]
            },
            writing: {
              summary: "Write simple greetings and introductions",
              exercises: [
                { id: "a1-ch1-c1-w1", title: "Write a Greeting", type: "fill-blank", prompt: "Complete: '_____ (Hello), je m'appelle Pierre.'", correctAnswer: "Bonjour", hint: "The word means 'Hello'." },
                { id: "a1-ch1-c1-w2", title: "Formal vs Informal", type: "short-answer", prompt: "Write a formal greeting for meeting your boss at 9 AM, and an informal one for a friend." },
                { id: "a1-ch1-c1-w3", title: "Self-Introduction", type: "prompt", prompt: "Write 3 sentences introducing yourself in French (name, where you're from, how you are)." }
              ]
            },
            listening: {
              summary: "Recognise spoken greetings and respond appropriately",
              exercises: [
                { id: "a1-ch1-c1-l1", title: "Listen and Choose", type: "multiple-choice", prompt: "You hear: 'Salut, ça va ?' What is the appropriate response?", options: ["Oui, ça va bien, merci", "Au revoir", "Bonne nuit", "Je suis médecin"], correctAnswer: "Oui, ça va bien, merci" },
                { id: "a1-ch1-c1-l2", title: "Time of Day Greetings", type: "comprehension", prompt: "What time of day is the greeting 'Bonsoir' typically used?" },
                { id: "a1-ch1-c1-l3", title: "Greeting Recognition", type: "multiple-choice", prompt: "You hear someone say 'Bonne nuit' as you leave. What should you reply?", options: ["Bonne nuit", "Bonjour", "Bonsoir", "Salut"], correctAnswer: "Bonne nuit" }
              ]
            },
            speaking: {
              summary: "Practise greeting, introducing yourself, and polite exchanges",
              exercises: [
                { id: "a1-ch1-c1-s1", title: "Meet & Greet", type: "roleplay", prompt: "Roleplay: Greet a new classmate, introduce yourself (name, nationality), and ask how they are." },
                { id: "a1-ch1-c1-s2", title: "Formal Introduction", type: "prompt", prompt: "Say aloud: 'Bonjour, je m'appelle [your name]. Enchanté(e).' Then ask 'Comment vous appelez-vous ?'" },
                { id: "a1-ch1-c1-s3", title: "Leaving a Conversation", type: "roleplay", prompt: "Practise leaving a conversation politely. Say 'Je dois y aller. Au revoir ! À demain !'" }
              ]
            }
          }
        },
        {
          id: "a1-ch1-c2",
          title: "Se présenter et présenter quelqu'un",
          description: "Introducing yourself and others: je suis, il/elle est, voici",
          grammarFocus: "Present tense: être (il/elle est, nous sommes); Definite articles: le/la/les",
          vocabularyTheme: "Personal identity, nationalities, professions",
          skills: {
            reading: {
              summary: "Read short introductions about people",
              exercises: [
                { id: "a1-ch1-c2-r1", title: "Who is this?", type: "comprehension", prompt: "Read: 'Voici Marie. Elle est française et elle est médecin.' What is Marie's nationality and profession?", hint: "Française means French, médecin means doctor." },
                { id: "a1-ch1-c2-r2", title: "Introductions Match", type: "match", prompt: "Match each French introduction to the correct person described." }
              ]
            },
            writing: {
              summary: "Write short introduction paragraphs",
              exercises: [
                { id: "a1-ch1-c2-w1", title: "Introduce a Friend", type: "prompt", prompt: "Write 3 sentences introducing your friend: name, nationality, and profession." },
                { id: "a1-ch1-c2-w2", title: "Fill in the ID Card", type: "fill-blank", prompt: "Complete: 'Il _____ (is) anglais. Elle _____ (is) professeur.'", correctAnswer: "est; est" }
              ]
            },
            listening: {
              summary: "Understand spoken introductions",
              exercises: [
                { id: "a1-ch1-c2-l1", title: "Listen for Details", type: "comprehension", prompt: "You hear: 'Je suis canadien. Je suis ingénieur.' What is the person's nationality and job?" },
                { id: "a1-ch1-c2-l2", title: "Who is she?", type: "multiple-choice", prompt: "You hear: 'Elle s'appelle Sophie. Elle est belge et elle est étudiante.' What is Sophie?", options: ["Belge et étudiante", "Française et médecin", "Canadienne et ingénieur", "Suisse et professeur"], correctAnswer: "Belge et étudiante" }
              ]
            },
            speaking: {
              summary: "Practise introducing yourself and others",
              exercises: [
                { id: "a1-ch1-c2-s1", title: "Introduce Your Partner", type: "roleplay", prompt: "Point to a partner and say: 'Voici [name]. Il/Elle est [nationality]. Il/Elle est [profession].'" },
                { id: "a1-ch1-c2-s2", title: "Your Turn", type: "prompt", prompt: "Say aloud: 'Je m'appelle [name]. Je suis [nationality]. Je suis [profession]. Enchanté(e).'" }
              ]
            }
          }
        },
        {
          id: "a1-ch1-c3",
          title: "Les nombres et l'alphabet",
          description: "Numbers 0–100, spelling, and the French alphabet",
          grammarFocus: "Possessive adjectives: mon/ma/mes, ton/ta/tes",
          vocabularyTheme: "Numbers, alphabet, personal items",
          skills: {
            reading: {
              summary: "Read numbers and simple descriptions",
              exercises: [
                { id: "a1-ch1-c3-r1", title: "What number?", type: "fill-blank", prompt: "Read: 'J'ai vingt-sept ans.' How old is the person?", correctAnswer: "27" },
                { id: "a1-ch1-c3-r2", title: "Phone Number", type: "comprehension", prompt: "Read this phone number: '06 12 34 56 78'. Write it out in French words." }
              ]
            },
            writing: {
              summary: "Write numbers and spell words correctly",
              exercises: [
                { id: "a1-ch1-c3-w1", title: "Write the Number", type: "fill-blank", prompt: "Write '35' in French: _____", correctAnswer: "trente-cinq" },
                { id: "a1-ch1-c3-w2", title: "Spell Your Name", type: "prompt", prompt: "Write how you would spell your name in French, using the French alphabet names." }
              ]
            },
            listening: {
              summary: "Understand numbers and letters spoken aloud",
              exercises: [
                { id: "a1-ch1-c3-l1", title: "Dictation: Numbers", type: "dictation", prompt: "You hear: 'quarante-deux, soixante-dix-huit, quatre-vingt-treize'. Write the numbers.", hint: "quarante-deux=42, soixante-dix-huit=78, quatre-vingt-treize=93" },
                { id: "a1-ch1-c3-l2", title: "Spelling Bee", type: "multiple-choice", prompt: "You hear someone spell: 'P-A-R-I-S'. What city is that?", options: ["Paris", "Lyon", "Marseille", "Nice"], correctAnswer: "Paris" }
              ]
            },
            speaking: {
              summary: "Say numbers, age, and spell aloud",
              exercises: [
                { id: "a1-ch1-c3-s1", title: "Count Off", type: "prompt", prompt: "Count from 1 to 20 in French out loud." },
                { id: "a1-ch1-c3-s2", title: "Say Your Age", type: "prompt", prompt: "Say 'J'ai [your age] ans' out loud three times." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch2",
      title: "La Vie Quotidienne",
      description: "Daily life, family, routines",
      concepts: [
        {
          id: "a1-ch2-c1",
          title: "La famille et les amis",
          description: "Describing family members and friends",
          grammarFocus: "Possessive adjectives; Regular -er verbs (parler, habiter)",
          vocabularyTheme: "Family members, relationships, adjectives",
          skills: {
            reading: {
              summary: "Read short family descriptions",
              exercises: [
                { id: "a1-ch2-c1-r1", title: "Family Tree", type: "comprehension", prompt: "Read: 'Mon père s'appelle Jean. Ma mère s'appelle Sophie. J'ai un frère et une sœur.' How many siblings does the person have?", hint: "frère = brother, sœur = sister" },
                { id: "a1-ch2-c1-r2", title: "Family Descriptions", type: "multiple-choice", prompt: "Read: 'Ma sœur est grande et brune. Mon frère est petit et blond.' What does the sister look like?", options: ["Tall and dark-haired", "Short and blond", "Tall and blond", "Short and dark-haired"], correctAnswer: "Tall and dark-haired" }
              ]
            },
            writing: {
              summary: "Describe your family",
              exercises: [
                { id: "a1-ch2-c1-w1", title: "My Family", type: "prompt", prompt: "Write 4 sentences about your family: who they are, their names, and one adjective to describe each." },
                { id: "a1-ch2-c1-w2", title: "Possessive Practice", type: "fill-blank", prompt: "Complete: '_____ (My) mère est gentille. _____ (His) père est strict.'", correctAnswer: "Ma; Son" }
              ]
            },
            listening: {
              summary: "Understand spoken family descriptions",
              exercises: [
                { id: "a1-ch2-c1-l1", title: "Listen to the Family", type: "comprehension", prompt: "You hear: 'Dans ma famille, il y a quatre personnes : mon père, ma mère, mon petit frère et moi.' How many people are in the family?" },
                { id: "a1-ch2-c1-l2", title: "Who is who?", type: "multiple-choice", prompt: "You hear: 'C'est mon oncle. Il est le frère de ma mère.' Who is he?", options: ["Grandfather", "Uncle", "Cousin", "Nephew"], correctAnswer: "Uncle" }
              ]
            },
            speaking: {
              summary: "Talk about your family",
              exercises: [
                { id: "a1-ch2-c1-s1", title: "Family Show-and-Tell", type: "prompt", prompt: "Describe your family using: 'Dans ma famille, il y a...'. Say names and one characteristic for each person." },
                { id: "a1-ch2-c1-s2", title: "Describe a Friend", type: "roleplay", prompt: "Describe your best friend: name, age, appearance using être and avoir." }
              ]
            }
          }
        },
        {
          id: "a1-ch2-c2",
          title: "La routine quotidienne",
          description: "Daily routines and telling time",
          grammarFocus: "Reflexive verbs (se lever, se laver); Present tense: aller, faire, prendre",
          vocabularyTheme: "Daily activities, time expressions",
          skills: {
            reading: {
              summary: "Read simple daily routine descriptions",
              exercises: [
                { id: "a1-ch2-c2-r1", title: "Daily Schedule", type: "comprehension", prompt: "Read: 'Je me lève à sept heures. Je prends mon petit-déjeuner à sept heures et demie. Je vais au travail à huit heures.' What time does the person have breakfast?", hint: "Hours and half-hours in French" },
                { id: "a1-ch2-c2-r2", title: "Time Matching", type: "match", prompt: "Match the French time to the digital time: 'Il est trois heures et quart', 'Il est midi', 'Il est dix heures moins le quart'" }
              ]
            },
            writing: {
              summary: "Write about your daily routine",
              exercises: [
                { id: "a1-ch2-c2-w1", title: "My Day", type: "prompt", prompt: "Write 5 sentences about your daily routine using reflexive verbs (je me lève, je me lave, je m'habille...)" },
                { id: "a1-ch2-c2-w2", title: "Time Practice", type: "fill-blank", prompt: "Write the time: Il est _____ (8:15)", correctAnswer: "huit heures et quart" }
              ]
            },
            listening: {
              summary: "Understand spoken times and routines",
              exercises: [
                { id: "a1-ch2-c2-l1", title: "Time Dictation", type: "dictation", prompt: "You hear times spoken. Write each one: 'Il est sept heures moins le quart'", hint: "This means 6:45" },
                { id: "a1-ch2-c2-l2", title: "Listen to the Routine", type: "comprehension", prompt: "You hear: 'Le matin, je me lève, je me douche, je m'habille et je prends le petit-déjeuner.' What is the first thing the person does?" }
              ]
            },
            speaking: {
              summary: "Talk about your daily routine",
              exercises: [
                { id: "a1-ch2-c2-s1", title: "Walk Through Your Day", type: "prompt", prompt: "Describe your morning routine step by step, using reflexive verbs and telling the time for each action." },
                { id: "a1-ch2-c2-s2", title: "Compare Routines", type: "roleplay", prompt: "Ask a partner 'À quelle heure est-ce que tu te lèves ?' and answer their questions about your routine." }
              ]
            }
          }
        },
        {
          id: "a1-ch2-c3",
          title: "La maison et le logement",
          description: "Describing your home and rooms",
          grammarFocus: "Il y a / il n'y a pas de; Prepositions of place (dans, sur, sous, à côté de)",
          vocabularyTheme: "Rooms, furniture, household items",
          skills: {
            reading: {
              summary: "Read descriptions of homes and rooms",
              exercises: [
                { id: "a1-ch2-c3-r1", title: "Apartment Description", type: "comprehension", prompt: "Read: 'Mon appartement a trois pièces : un salon, une chambre et une cuisine. Il y a une table dans la cuisine et un lit dans la chambre.' How many rooms does the apartment have?" },
                { id: "a1-ch2-c3-r2", title: "Where is it?", type: "multiple-choice", prompt: "Read: 'Le livre est sur la table.' Where is the book?", options: ["Under the table", "On the table", "Next to the table", "In the table"], correctAnswer: "On the table" }
              ]
            },
            writing: {
              summary: "Describe your home",
              exercises: [
                { id: "a1-ch2-c3-w1", title: "My Dream Room", type: "prompt", prompt: "Describe your bedroom in 4 sentences. Use il y a, prepositions of place, and furniture vocabulary." },
                { id: "a1-ch2-c3-w2", title: "Prepositions", type: "fill-blank", prompt: "Complete: 'Le chat est _____ (under) la table. Les livres sont _____ (on) l'étagère.'", correctAnswer: "sous; sur" }
              ]
            },
            listening: {
              summary: "Understand spoken descriptions of homes",
              exercises: [
                { id: "a1-ch2-c3-l1", title: "Where is everything?", type: "comprehension", prompt: "You hear: 'Le canapé est dans le salon. La télé est sur le meuble. Le tapis est sous la table.' What is under the table?" },
                { id: "a1-ch2-c3-l2", title: "House Tour", type: "dictation", prompt: "Listen and write the rooms you hear described in order." }
              ]
            },
            speaking: {
              summary: "Talk about your home",
              exercises: [
                { id: "a1-ch2-c3-s1", title: "Virtual Tour", type: "prompt", prompt: "Give a 1-minute tour of your home in French. Start with 'Dans ma maison, il y a...'" },
                { id: "a1-ch2-c3-s2", title: "Describe Your Room", type: "roleplay", prompt: "Describe your bedroom to a friend. Use prepositions to say where things are located." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a1-ch3",
      title: "Les Besoins Essentiels",
      description: "Essential needs: food, shopping, directions",
      concepts: [
        {
          id: "a1-ch3-c1",
          title: "La nourriture et les boissons",
          description: "Food, drinks, ordering, and expressing likes/dislikes",
          grammarFocus: "Partitive articles (du, de la, des); Verb: vouloir, prendre; Negation: ne...pas",
          vocabularyTheme: "Food, drinks, meals, restaurant",
          skills: {
            reading: {
              summary: "Read menus and food descriptions",
              exercises: [
                { id: "a1-ch3-c1-r1", title: "Menu Reading", type: "comprehension", prompt: "Read the menu: 'Entrée: salade verte. Plat principal: poulet avec des légumes. Dessert: tarte aux pommes.' What is the main course?", hint: "Plat principal = main course" },
                { id: "a1-ch3-c1-r2", title: "Market List", type: "multiple-choice", prompt: "Read: 'Je veux du pain, de la confiture et des fruits.' What does the person want?", options: ["Bread, jam, fruit", "Bread, butter, cheese", "Wine, bread, cheese", "Fruit, vegetables, bread"], correctAnswer: "Bread, jam, fruit" }
              ]
            },
            writing: {
              summary: "Write food orders and preferences",
              exercises: [
                { id: "a1-ch3-c1-w1", title: "Order at a Café", type: "prompt", prompt: "Write a short dialogue ordering a coffee and a croissant at a French café. Include greetings." },
                { id: "a1-ch3-c1-w2", title: "Likes and Dislikes", type: "fill-blank", prompt: "Complete: 'J'aime _____ (some) café. Je n'aime pas _____ (any) lait.'", correctAnswer: "du; de" }
              ]
            },
            listening: {
              summary: "Understand food orders and preferences",
              exercises: [
                { id: "a1-ch3-c1-l1", title: "Taking an Order", type: "comprehension", prompt: "You hear: 'Je voudrais un café noir et un croissant, s'il vous plaît.' What is the person ordering?" },
                { id: "a1-ch3-c1-l2", title: "What do they like?", type: "multiple-choice", prompt: "You hear: 'Elle aime le chocolat mais elle n'aime pas les bonbons.' What does she like?", options: ["Chocolate", "Candy", "Both", "Neither"], correctAnswer: "Chocolate" }
              ]
            },
            speaking: {
              summary: "Order food and express preferences",
              exercises: [
                { id: "a1-ch3-c1-s1", title: "At the Café", type: "roleplay", prompt: "Roleplay ordering at a café: greet, order a drink and a snack, pay, and say goodbye." },
                { id: "a1-ch3-c1-s2", title: "Food Preferences", type: "prompt", prompt: "Say what foods you like and dislike: 'J'aime...', 'Je n'aime pas...', 'Je préfère...'" }
              ]
            }
          }
        },
        {
          id: "a1-ch3-c2",
          title: "Les achats et les magasins",
          description: "Shopping for everyday items and asking prices",
          grammarFocus: "Demonstrative adjectives (ce, cet, cette, ces); Verb: acheter, payer; Question words: combien",
          vocabularyTheme: "Shops, clothes, prices, colours",
          skills: {
            reading: {
              summary: "Read shop signs and price tags",
              exercises: [
                { id: "a1-ch3-c2-r1", title: "Shop Signs", type: "comprehension", prompt: "Read: 'Boulangerie – Ouvert du lundi au samedi. Fermé le dimanche.' When is the bakery open?", hint: "Boulangerie = bakery" },
                { id: "a1-ch3-c2-r2", title: "Price Tags", type: "fill-blank", prompt: "Read: 'Ce pull coûte trente-cinq euros.' How much is the sweater?", correctAnswer: "35 euros" }
              ]
            },
            writing: {
              summary: "Write shopping dialogues and lists",
              exercises: [
                { id: "a1-ch3-c2-w1", title: "Shopping Dialogue", type: "prompt", prompt: "Write a short dialogue between a customer and a shopkeeper: ask for an item, ask the price, and decide." },
                { id: "a1-ch3-c2-w2", title: "Colour Adjectives", type: "fill-blank", prompt: "Complete with correct form: 'Une _____ (red) robe. Des _____ (blue) chaussures.'", correctAnswer: "rouge; bleues" }
              ]
            },
            listening: {
              summary: "Understand prices and shopping conversations",
              exercises: [
                { id: "a1-ch3-c2-l1", title: "How Much?", type: "comprehension", prompt: "You hear: 'Combien coûte ce t-shirt ? — Il coûte vingt-deux euros.' How much is the t-shirt?" },
                { id: "a1-ch3-c2-l2", title: "Shopkeeper Response", type: "multiple-choice", prompt: "You ask 'Vous avez du pain ?' and you hear 'Oui, bien sûr, le voici.' What does the shopkeeper say?", options: ["Yes, here it is", "No, we don't have any", "It's expensive", "It's closed"], correctAnswer: "Yes, here it is" }
              ]
            },
            speaking: {
              summary: "Practise shopping conversations",
              exercises: [
                { id: "a1-ch3-c2-s1", title: "Buying Clothes", type: "roleplay", prompt: "Roleplay buying a shirt: ask to see it, ask the price ('Combien ça coûte ?'), comment on colour, and buy it." },
                { id: "a1-ch3-c2-s2", title: "At the Market", type: "prompt", prompt: "Ask for 3 items at a market stall: 'Je voudrais...', 'Combien coûte... ?', 'Merci, au revoir'" }
              ]
            }
          }
        },
        {
          id: "a1-ch3-c3",
          title: "Les directions et les transports",
          description: "Asking for and giving simple directions, transportation",
          grammarFocus: "Imperative mood (tournez, allez); Prepositions of movement (à droite, à gauche, tout droit); Verb: aller",
          vocabularyTheme: "Places in town, transport, directions",
          skills: {
            reading: {
              summary: "Read simple directions and signs",
              exercises: [
                { id: "a1-ch3-c3-r1", title: "Street Signs", type: "comprehension", prompt: "Read: 'Pour aller à la gare, allez tout droit, puis tournez à gauche.' What do the directions say?", hint: "gare = train station, tout droit = straight, gauche = left" },
                { id: "a1-ch3-c3-r2", title: "Map Reading", type: "multiple-choice", prompt: "Read: 'Le musée est à droite de la poste.' Where is the museum?", options: ["Left of the post office", "Right of the post office", "Behind the post office", "In front of the post office"], correctAnswer: "Right of the post office" }
              ]
            },
            writing: {
              summary: "Write simple directions",
              exercises: [
                { id: "a1-ch3-c3-w1", title: "Give Directions", type: "prompt", prompt: "Write directions from your house to the nearest bus stop using: allez tout droit, tournez à droite/gauche." },
                { id: "a1-ch3-c3-w2", title: "Fill in the Route", type: "fill-blank", prompt: "Complete: '_____ (Go) tout droit, puis _____ (turn) à droite.'", correctAnswer: "Allez; tournez" }
              ]
            },
            listening: {
              summary: "Understand spoken directions",
              exercises: [
                { id: "a1-ch3-c3-l1", title: "Follow the Directions", type: "comprehension", prompt: "You hear: 'Prenez la première rue à droite. Le supermarché est en face de la banque.' Where is the supermarket?" },
                { id: "a1-ch3-c3-l2", title: "Transport Announcement", type: "multiple-choice", prompt: "You hear: 'Le prochain train pour Lyon part à quatorze heures, voie trois.' Which platform (voie)?", options: ["Platform 1", "Platform 2", "Platform 3", "Platform 4"], correctAnswer: "Platform 3" }
              ]
            },
            speaking: {
              summary: "Ask for and give directions",
              exercises: [
                { id: "a1-ch3-c3-s1", title: "Lost Tourist", type: "roleplay", prompt: "Roleplay: A tourist asks 'Excusez-moi, où est la gare ?' Give directions using: tout droit, à droite, à gauche." },
                { id: "a1-ch3-c3-s2", title: "Getting Around Town", type: "prompt", prompt: "Describe how to get from your home to a nearby landmark using transport vocabulary." }
              ]
            }
          }
        }
      ]
    }
  ]
};