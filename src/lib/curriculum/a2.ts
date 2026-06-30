import type { Level } from "./types";

export const a2: Level = {
  id: "A2",
  title: "Elementary – Progrès",
  subtitle: "Waystage",
  description: "Can understand sentences and frequently used expressions. Can communicate in simple and routine tasks requiring a simple and direct exchange of information.",
  chapters: [
    {
      id: "a2-ch1",
      title: "Voyages et Vacances",
      description: "Travel, holidays, describing past experiences",
      concepts: [
        {
          id: "a2-ch1-c1",
          title: "Les voyages en train et en avion",
          description: "Booking tickets, navigating airports and train stations",
          grammarFocus: "Passé composé with avoir; Irregular past participles",
          vocabularyTheme: "Travel, tickets, stations, airports",
          skills: {
            reading: {
              summary: "Read travel schedules and tickets",
              exercises: [
                { id: "a2-ch1-c1-r1", title: "Train Schedule", type: "comprehension", prompt: "Read: 'TGV Paris-Lyon: Départ 14h15, Arrivée 16h30, Voie 7, Train 6941.' How long is the journey?", hint: "14h15 to 16h30 is 2h15" },
                { id: "a2-ch1-c1-r2", title: "E-ticket Details", type: "multiple-choice", prompt: "Read: 'Passager: Marie Dupont. Vol AF1234. Paris CDG – Nice. Embarquement: Porte B24, 10h45.' What is the flight number?", options: ["AF1234", "CDG", "B24", "6941"], correctAnswer: "AF1234" }
              ]
            },
            writing: {
              summary: "Write about past travels",
              exercises: [
                { id: "a2-ch1-c1-w1", title: "My Last Trip", type: "prompt", prompt: "Write 5 sentences about your last trip using passé composé: où tu es allé(e), comment, avec qui, ce que tu as visité." },
                { id: "a2-ch1-c1-w2", title: "Past Participles", type: "fill-blank", prompt: "Complete in passé composé: 'Hier, je _____ (aller) au musée. Nous _____ (visiter) la tour Eiffel.'", correctAnswer: "suis allé; avons visité" }
              ]
            },
            listening: {
              summary: "Understand travel announcements",
              exercises: [
                { id: "a2-ch1-c1-l1", title: "Airport Announcement", type: "comprehension", prompt: "You hear: 'Le vol AF1234 à destination de Nice est annoncé. Embarquement immédiat à la porte B24.' Where is the flight going?" },
                { id: "a2-ch1-c1-l2", title: "Delay Notice", type: "multiple-choice", prompt: "You hear: 'Le TGV 6941 à destination de Lyon aura 20 minutes de retard.' What is happening?", options: ["The train is cancelled", "The train is delayed 20 min", "The train is on time", "The platform changed"], correctAnswer: "The train is delayed 20 min" }
              ]
            },
            speaking: {
              summary: "Talk about travel experiences",
              exercises: [
                { id: "a2-ch1-c1-s1", title: "Trip Report", type: "prompt", prompt: "Tell your partner about a trip you took. Use passé composé: 'Je suis allé(e) à...', 'J'ai visité...', 'J'ai vu...'" },
                { id: "a2-ch1-c1-s2", title: "At the Ticket Office", type: "roleplay", prompt: "Roleplay buying a train ticket: ask for destination, departure time, price, and class." }
              ]
            }
          }
        },
        {
          id: "a2-ch1-c2",
          title: "Décrire des vacances passées",
          description: "Describing past holidays and experiences",
          grammarFocus: "Passé composé with être (aller, venir, partir, arriver); Imparfait for descriptions",
          vocabularyTheme: "Holiday activities, weather, accommodations",
          skills: {
            reading: {
              summary: "Read holiday postcards and reviews",
              exercises: [
                { id: "a2-ch1-c2-r1", title: "Postcard", type: "comprehension", prompt: "Read: 'Cher Thomas, nous sommes à Nice. Le temps est magnifique. Hier, nous sommes allés à la plage et nous avons nagé. À bientôt, Julie.' What did Julie do yesterday?" },
                { id: "a2-ch1-c2-r2", title: "Hotel Review", type: "multiple-choice", prompt: "Read: 'L'hôtel était confortable. Le personnel était sympathique. La chambre était propre mais petite.' What was negative?", options: ["Confortable", "Sympathique", "Propre", "Petite"], correctAnswer: "Petite" }
              ]
            },
            writing: {
              summary: "Write about holidays",
              exercises: [
                { id: "a2-ch1-c2-w1", title: "Holiday Postcard", type: "prompt", prompt: "Write a short postcard (4-5 sentences) to a friend describing your holiday, where you are, what the weather is like, and what you did yesterday." },
                { id: "a2-ch1-c2-w2", title: "Imparfait vs Passé Composé", type: "fill-blank", prompt: "Complete: 'Quand j'_____ (être) petit, nous _____ (aller) à la mer chaque été. L'année dernière, nous _____ (aller) en Grèce.'", correctAnswer: "étais; allions; sommes allés" }
              ]
            },
            listening: {
              summary: "Understand holiday descriptions",
              exercises: [
                { id: "a2-ch1-c2-l1", title: "Holiday Stories", type: "comprehension", prompt: "You hear: 'L'été dernier, je suis partie en Espagne avec ma famille. Nous avons visité Barcelone et nous avons mangé des tapas.' Where did she go?" },
                { id: "a2-ch1-c2-l2", title: "Weather Report", type: "multiple-choice", prompt: "You hear: 'Pendant les vacances, il faisait beau et chaud. Nous avons passé des journées merveilleuses à la plage.' What was the weather like?", options: ["Cold and rainy", "Nice and hot", "Windy", "Cloudy"], correctAnswer: "Nice and hot" }
              ]
            },
            speaking: {
              summary: "Describe past holidays",
              exercises: [
                { id: "a2-ch1-c2-s1", title: "Best Vacation", type: "prompt", prompt: "Describe your best holiday: where, when, with whom, what you did, the weather. Use passé composé and imparfait." },
                { id: "a2-ch1-c2-s2", title: "Compare Then and Now", type: "roleplay", prompt: "Compare holidays as a child (imparfait) with a recent holiday (passé composé): 'Quand j'étais jeune...', 'L'été dernier...'" }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a2-ch2",
      title: "Santé et Bien-être",
      description: "Health, body, emotions, medical situations",
      concepts: [
        {
          id: "a2-ch2-c1",
          title: "Le corps et les sensations",
          description: "Describing physical sensations and health",
          grammarFocus: "Verb: avoir (mal à, faim, soif, chaud, froid); Reflexive verbs for daily care",
          vocabularyTheme: "Body parts, pain, symptoms, emotions",
          skills: {
            reading: {
              summary: "Read health advice and symptom descriptions",
              exercises: [
                { id: "a2-ch2-c1-r1", title: "Symptom Checker", type: "comprehension", prompt: "Read: 'J'ai mal à la tête et j'ai de la fièvre. Je tousse beaucoup.' What are the symptoms?", hint: "mal à la tête = headache, fièvre = fever, tousser = to cough" },
                { id: "a2-ch2-c1-r2", title: "Health Advice", type: "multiple-choice", prompt: "Read: 'Pour être en bonne santé, il faut boire beaucoup d'eau, manger équilibré et faire de l'exercice.' What is NOT mentioned?", options: ["Drink water", "Eat balanced meals", "Take medicine", "Exercise"], correctAnswer: "Take medicine" }
              ]
            },
            writing: {
              summary: "Describe symptoms and feelings",
              exercises: [
                { id: "a2-ch2-c1-w1", title: "At the Doctor's", type: "prompt", prompt: "Write a short dialogue between a patient and a doctor describing 3 symptoms." },
                { id: "a2-ch2-c1-w2", title: "Emotions", type: "fill-blank", prompt: "Complete: 'Elle est _____ (happy). Nous sommes _____ (tired).'", correctAnswer: "heureuse; fatigués" }
              ]
            },
            listening: {
              summary: "Understand health conversations",
              exercises: [
                { id: "a2-ch2-c1-l1", title: "Doctor's Consultation", type: "comprehension", prompt: "You hear: 'Depuis quand avez-vous mal à la gorge ? — Depuis trois jours. — Avez-vous de la fièvre ? — Oui, 38 degrés.' How long has the patient had a sore throat?" },
                { id: "a2-ch2-c1-l2", title: "How do they feel?", type: "multiple-choice", prompt: "You hear: 'Il a l'air fatigué. Il a mal dormi cette nuit.' How does he feel?", options: ["Happy", "Tired", "Excited", "Angry"], correctAnswer: "Tired" }
              ]
            },
            speaking: {
              summary: "Describe health and feelings",
              exercises: [
                { id: "a2-ch2-c1-s1", title: "Doctor Roleplay", type: "roleplay", prompt: "Roleplay a doctor's visit: greet, describe symptoms ('J'ai mal à...'), answer questions, get advice." },
                { id: "a2-ch2-c1-s2", title: "How are you feeling?", type: "prompt", prompt: "Describe how you're feeling today using: 'Je suis...', 'J'ai...', 'Je me sens...'" }
              ]
            }
          }
        }
      ]
    },
    {
      id: "a2-ch3",
      title: "Culture et Loisirs",
      description: "Culture, hobbies, media, invitations",
      concepts: [
        {
          id: "a2-ch3-c1",
          title: "Les loisirs et les passions",
          description: "Hobbies, interests, making invitations",
          grammarFocus: "Verbs: pouvoir, devoir, savoir; Faire + activity; Invitations with vouloir + infinitive",
          vocabularyTheme: "Hobbies, sports, music, cinema",
          skills: {
            reading: {
              summary: "Read about hobbies and events",
              exercises: [
                { id: "a2-ch3-c1-r1", title: "Event Poster", type: "comprehension", prompt: "Read: 'Concert de musique classique – Samedi 20 mars à 20h – Salle Pleyel – 25€.' What type of event is it?" },
                { id: "a2-ch3-c1-r2", title: "Hobby Descriptions", type: "multiple-choice", prompt: "Read: 'Pendant mon temps libre, je fais du tennis et je joue de la guitare. J'aime aussi regarder des films.' What does NOT appear as a hobby?", options: ["Tennis", "Guitar", "Reading", "Movies"], correctAnswer: "Reading" }
              ]
            },
            writing: {
              summary: "Write about hobbies and make invitations",
              exercises: [
                { id: "a2-ch3-c1-w1", title: "My Hobbies", type: "prompt", prompt: "Write 5 sentences about your hobbies: what you like to do, how often, since when." },
                { id: "a2-ch3-c1-w2", title: "Invitation", type: "prompt", prompt: "Write an invitation to a friend: suggest an activity, propose a time and place, ask if they want to come." }
              ]
            },
            listening: {
              summary: "Understand discussions about hobbies",
              exercises: [
                { id: "a2-ch3-c1-l1", title: "Weekend Plans", type: "comprehension", prompt: "You hear: 'Ce week-end, je vais faire du vélo avec Paul, et dimanche, on va voir un film au cinéma.' What is the plan for Sunday?" },
                { id: "a2-ch3-c1-l2", title: "Invitation Response", type: "multiple-choice", prompt: "You invite: 'Tu veux venir au cinéma ?' Response: 'Avec plaisir ! On se retrouve à quelle heure ?'", options: ["No, I'm busy", "Yes, with pleasure", "Maybe later", "I don't like movies"], correctAnswer: "Yes, with pleasure" }
              ]
            },
            speaking: {
              summary: "Talk about hobbies and make plans",
              exercises: [
                { id: "a2-ch3-c1-s1", title: "Free Time Chat", type: "roleplay", prompt: "Ask a friend about their hobbies: 'Qu'est-ce que tu aimes faire pendant ton temps libre ?', 'Tu fais du sport ?'" },
                { id: "a2-ch3-c1-s2", title: "Making Plans", type: "prompt", prompt: "Invite a friend to do something this weekend. Propose a time, day, and activity. Use 'Tu veux... ?', 'On pourrait...'" }
              ]
            }
          }
        }
      ]
    }
  ]
};