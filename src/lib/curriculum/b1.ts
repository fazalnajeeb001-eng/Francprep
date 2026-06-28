import type { Level } from "./types";

export const b1: Level = {
  id: "B1",
  title: "Intermediate – Indépendance",
  subtitle: "Threshold",
  description: "Can deal with most situations while travelling. Can produce simple connected text on topics that are familiar or of personal interest. Can describe experiences, events, dreams, hopes, and ambitions.",
  chapters: [
    {
      id: "b1-ch1",
      title: "Le Monde du Travail",
      description: "Work, careers, professional communication",
      concepts: [
        {
          id: "b1-ch1-c1",
          title: "Parler de son parcours professionnel",
          description: "Describing career paths, skills, and experience",
          grammarFocus: "Imparfait vs Passé Composé in narratives; Relative pronouns: qui, que",
          vocabularyTheme: "Professions, workplace, CV skills",
          skills: {
            reading: {
              summary: "Read job ads and applications",
              exercises: [
                { id: "b1-ch1-c1-r1", title: "Job Advertisement", type: "comprehension", prompt: "Read: 'Nous recherchons un développeur web qui a 3 ans d'expérience et qui parle anglais couramment. CDI à Paris. Salaire : 45k€.' What qualifications are required?", hint: "CDI = permanent contract" },
                { id: "b1-ch1-c1-r2", title: "Cover Letter Extract", type: "multiple-choice", prompt: "Read: 'Actuellement chargé de marketing chez TechCorp, je souhaiterais rejoindre votre équipe car je suis passionné par le secteur du e-commerce.' What is the person's current position?", options: ["Marketing manager at TechCorp", "Developer at TechCorp", "CEO at TechCorp", "Sales at TechCorp"], correctAnswer: "Marketing manager at TechCorp" }
              ]
            },
            writing: {
              summary: "Write professional profiles and emails",
              exercises: [
                { id: "b1-ch1-c1-w1", title: "Professional Summary", type: "prompt", prompt: "Write a 5-sentence professional summary: your current role, past experience, skills, and career goals." },
                { id: "b1-ch1-c1-w2", title: "Job Application Email", type: "prompt", prompt: "Write a formal email applying for a job. Include: position you're applying for, your experience, why you're interested, and a request for an interview." }
              ]
            },
            listening: {
              summary: "Understand professional discussions",
              exercises: [
                { id: "b1-ch1-c1-l1", title: "Job Interview", type: "comprehension", prompt: "You hear: 'Parlez-moi de votre expérience. — J'ai travaillé chez Dupont pendant 5 ans comme chef de projet. Ensuite, j'ai rejoint Martin SARL où je suis resté 3 ans.' How many years total experience?" },
                { id: "b1-ch1-c1-l2", title: "Meeting Discussion", type: "multiple-choice", prompt: "You hear: 'Nous devons finaliser le rapport avant vendredi. Sophie, vous pouvez vous en charger ? — Bien sûr, je m'en occupe.' Who is responsible for the report?", options: ["The boss", "Sophie", "Nobody yet", "The team"], correctAnswer: "Sophie" }
              ]
            },
            speaking: {
              summary: "Talk about professional background",
              exercises: [
                { id: "b1-ch1-c1-s1", title: "Job Interview", type: "roleplay", prompt: "Roleplay a job interview: present your professional background, skills, and answer questions about your experience." },
                { id: "b1-ch1-c1-s2", title: "Elevator Pitch", type: "prompt", prompt: "Give a 1-minute professional pitch: who you are, what you do, your key achievements, and what you're looking for." }
              ]
            }
          }
        },
        {
          id: "b1-ch1-c2",
          title: "Les réunions et la communication professionnelle",
          description: "Participating in meetings, professional correspondence",
          grammarFocus: "Conditionnel présent (je voudrais, on pourrait); Subordonnées avec si",
          vocabularyTheme: "Business meetings, proposals, negotiations",
          skills: {
            reading: {
              summary: "Read meeting agendas and professional emails",
              exercises: [
                { id: "b1-ch1-c2-r1", title: "Meeting Agenda", type: "comprehension", prompt: "Read: 'Ordre du jour: 1. Bilan Q3, 2. Nouveau projet client, 3. Budget 2026.' What is the third point on the agenda?" },
                { id: "b1-ch1-c2-r2", title: "Professional Email", type: "multiple-choice", prompt: "Read: 'Suite à notre conversation téléphonique, je vous confirme notre rendez-vous du 15 mars à 14h dans nos bureaux.' What is the email about?", options: ["Cancelling a meeting", "Confirming a meeting", "Rescheduling", "Complaint"], correctAnswer: "Confirming a meeting" }
              ]
            },
            writing: {
              summary: "Write professional correspondence",
              exercises: [
                { id: "b1-ch1-c2-w1", title: "Meeting Minutes", type: "prompt", prompt: "Write meeting minutes for a team meeting: date, attendees, key discussion points, and action items." },
                { id: "b1-ch1-c2-w2", title: "Proposal Email", type: "prompt", prompt: "Write a professional email proposing a new idea. Use conditionnel: 'Je voudrais proposer...', 'Nous pourrions...'" }
              ]
            },
            listening: {
              summary: "Understand meetings and discussions",
              exercises: [
                { id: "b1-ch1-c2-l1", title: "Meeting Discussion", type: "comprehension", prompt: "You hear: 'Si nous augmentons le budget marketing de 15 %, nous pourrions atteindre 20 % de clients en plus. Qu'en pensez-vous ?' What is the proposal?" },
                { id: "b1-ch1-c2-l2", title: "Opinions", type: "multiple-choice", prompt: "You hear: 'À mon avis, ce n'est pas la meilleure solution. Je pense que nous devrions envisager d'autres options.' What does the speaker express?", options: ["Agreement", "Disagreement", "Certainty", "Confusion"], correctAnswer: "Disagreement" }
              ]
            },
            speaking: {
              summary: "Participate in professional discussions",
              exercises: [
                { id: "b1-ch1-c2-s1", title: "Team Meeting", type: "roleplay", prompt: "Participate in a team meeting: give your opinion, agree/disagree politely, make suggestions using conditionnel." },
                { id: "b1-ch1-c2-s2", title: "Persuasive Pitch", type: "prompt", prompt: "Pitch an idea to your team: describe the idea, explain why it's beneficial, and ask for feedback." }
              ]
            }
          }
        }
      ]
    },
    {
      id: "b1-ch2",
      title: "Médias et Société",
      description: "News, social issues, expressing opinions",
      concepts: [
        {
          id: "b1-ch2-c1",
          title: "L'actualité et les médias",
          description: "Discussing news, understanding media",
          grammarFocus: "Passive voice; Present subjunctive (il faut que, bien que)",
          vocabularyTheme: "News, media, current events, environment",
          skills: {
            reading: {
              summary: "Read news articles and opinion pieces",
              exercises: [
                { id: "b1-ch2-c1-r1", title: "News Headline", type: "comprehension", prompt: "Read: 'Le gouvernement annonce un nouveau plan pour réduire la pollution dans les grandes villes à partir de 2026.' What is the government's plan about?", hint: "Réduire la pollution = reduce pollution" },
                { id: "b1-ch2-c1-r2", title: "Opinion Editorial", type: "multiple-choice", prompt: "Read: 'Selon le ministre, il est essentiel que nous investissions dans les énergies renouvelables. Bien que cela coûte cher à court terme, les bénéfices à long terme sont évidents.' What is the minister's position?", options: ["Against renewable energy", "Supportive of renewable energy", "Neutral", "Undecided"], correctAnswer: "Supportive of renewable energy" }
              ]
            },
            writing: {
              summary: "Write opinions and summaries",
              exercises: [
                { id: "b1-ch2-c1-w1", title: "News Summary", type: "prompt", prompt: "Write a 5-sentence summary of a recent news event. Include: what happened, when, who was involved, and your opinion." },
                { id: "b1-ch2-c1-w2", title: "Letter to the Editor", type: "prompt", prompt: "Write a letter to the editor expressing your opinion on an environmental issue. Use subjunctive: 'Il est important que...', 'Je pense qu'il faut que...'" }
              ]
            },
            listening: {
              summary: "Understand news reports and discussions",
              exercises: [
                { id: "b1-ch2-c1-l1", title: "News Report", type: "comprehension", prompt: "You hear: 'Un séisme de magnitude 6,2 a frappé la région ce matin à 8h15. Les secours sont déjà sur place. Il n'y a pas de victimes pour le moment.' What happened and when?" },
                { id: "b1-ch2-c1-l2", title: "Radio Discussion", type: "multiple-choice", prompt: "You hear two people debating: 'Je ne suis pas d'accord. Bien que les réseaux sociaux aient des avantages, ils présentent aussi des risques pour la vie privée.' What is the speaker doing?", options: ["Agreeing", "Disagreeing and giving reasons", "Asking a question", "Changing the subject"], correctAnswer: "Disagreeing and giving reasons" }
              ]
            },
            speaking: {
              summary: "Discuss news and express opinions",
              exercises: [
                { id: "b1-ch2-c1-s1", title: "News Debate", type: "roleplay", prompt: "Discuss a current news topic with a partner: state your opinion, respond to counterarguments, use expressions like 'À mon avis...', 'Je pense que...', 'Tu as raison mais...'" },
                { id: "b1-ch2-c1-s2", title: "Present a Topic", type: "prompt", prompt: "Present a news topic for 2 minutes: introduce the topic, give facts, express your opinion, and conclude." }
              ]
            }
          }
        }
      ]
    }
  ]
};