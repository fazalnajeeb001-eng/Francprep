import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { generateNeuralAudio } from "../services/tts.service";

// Master Speaking Examiner Prompts across all 10 Papers
const SPEAKING_EXAMINER_PROMPTS = [
  // General transitions
  { text: "Bonjour ! Bienvenue à votre épreuve d'expression orale. Pouvez-vous vous présenter, me parler de votre parcours professionnel et de vos motivations pour le Canada ?", gender: "female" },
  { text: "Le temps de préparation est terminé. Vous pouvez maintenant vous exprimer en français.", gender: "female" },
  { text: "Le temps d'expression orale pour cette tâche est écoulé. Passons à la tâche suivante.", gender: "female" },
  { text: "Très bien, je vous écoute. Pouvez-vous me poser votre prochaine question ou préciser votre pensée ?", gender: "female" },
  
  // Paper 1
  { text: "Bonjour et bienvenue à votre épreuve d'expression orale du TCF Canada. Pour commencer cette première tâche, pouvez-vous vous présenter, me parler de votre profession et m'expliquer ce qui vous motive à vous installer au Canada ?", gender: "female" },
  { text: "Bonjour ! Institut Linguistique de Montréal, Laurent Dubois au téléphone. Je vous remercie de votre intérêt pour notre programme intensif. Quelles sont vos questions concernant nos formations ?", gender: "male" },
  { text: "Voici votre sujet de société pour cette troisième tâche : 'L'intelligence artificielle représente-t-elle une opportunité majeure ou un danger pour l'avenir de l'éducation ?' Vous disposez d'environ 4 minutes et demie pour exposer votre analyse argumentée. Je vous écoute.", gender: "female" },
  { text: "Certes, mais ne craignez-vous pas que l'usage systématique de l'IA n'atrophie l'esprit critique et les capacités de réflexion autonome des élèves ?", gender: "female" },

  // Paper 2
  { text: "Bonjour ! Bienvenue à votre épreuve d'expression orale. Pouvez-vous vous présenter, me décrire une journée type dans votre travail et me parler de votre ville actuelle ?", gender: "male" },
  { text: "Bonjour ! Thomas Laurent à l'appareil, propriétaire de l'appartement du quartier Saint-Roch. Je vous écoute, quelles sont vos questions ?", gender: "male" },
  { text: "Voici votre sujet : 'Le télétravail à 100 % représente-t-il l'avenir du travail ou une menace pour la cohésion d'équipe et la productivité ?' Présentez votre argumentation.", gender: "male" },
  { text: "Mais ne pensez-vous pas que l'isolement professionnel freine l'innovation spontanée qui naît autour de la machine à café ?", gender: "male" },

  // Paper 3
  { text: "Bonjour ! Pour cette première partie, présentez-vous et racontez-moi une expérience de voyage marquante qui a enrichi votre vision du monde.", gender: "female" },
  { text: "Bonjour ! Club Plein Air des Collines, Laurent Dubois à votre service. Quelles informations désirez-vous obtenir sur nos activités sportives ?", gender: "male" },
  { text: "Voici votre sujet : 'La gratuité des transports publics est-elle une mesure écologique efficace ou une utopie financière irréaliste ?' Exposez votre analyse.", gender: "female" },
  { text: "Si les transports deviennent gratuits, comment les villes financeront-elles la modernisation et la sécurité des rames de métro ?", gender: "female" },

  // Paper 4
  { text: "Bonjour ! Présentez-vous, décrivez-moi votre ville d'origine et expliquez-moi comment vous préparez votre installation au Canada.", gender: "male" },
  { text: "Bonjour ! Entraide Laval, Laurent Dubois. Merci de proposer votre aide. Quelles sont vos questions concernant nos missions de bénévolat ?", gender: "male" },
  { text: "Voici votre thème de débat : 'L'interdiction des téléphones portables dans les établissements scolaires est-elle indispensable pour protéger l'attention des élèves ?' Présentez votre point de vue.", gender: "female" },
  { text: "Les smartphones ne sont-ils pas devenus des outils pédagogiques incontournables pour préparer les jeunes au monde numérique ?", gender: "female" },

  // Paper 5
  { text: "Bonjour ! Présentez-vous, parlez-moi de vos activités de loisirs préférées et des projets associatifs qui vous tiennent à cœur.", gender: "female" },
  { text: "Bonjour ! Sherb-Éco-Vélo, Thomas Laurent à votre service. Quelles questions avez-vous sur notre service de vélopartage électrique ?", gender: "male" },
  { text: "Voici votre sujet : 'Le revenu universel de base est-il une solution d'avenir pour éliminer la précarité ou un frein à la valeur travail ?' Je vous écoute.", gender: "male" },
  { text: "Mais ne risquons-nous pas une pénurie de main-d'œuvre dans les métiers pénibles si chacun reçoit un revenu garanti sans travailler ?", gender: "male" },

  // Paper 6
  { text: "Bonjour ! Présentez-vous à moi en me parlant de votre formation universitaire et de vos compétences professionnelles clés.", gender: "female" },
  { text: "Bonjour ! Espace Co-Travail La Mauricie, Laurent Dubois. En quoi puis-je vous renseigner sur nos formules de coworking ?", gender: "male" },
  { text: "Voici votre sujet : 'La taxe carbone est-elle un levier indispensable pour inciter à la transition écologique ou une charge fiscale injuste pour les ménages ?' Présentez votre argumentation.", gender: "female" },
  { text: "Les ménages modestes qui dépendent de leur voiture en milieu rural ne sont-ils pas pénalisés injustement par cette taxe ?", gender: "female" },

  // Paper 7
  { text: "Bonjour ! Présentez-vous et parlez-moi de votre cuisine préférée ainsi que des traditions culinaires de votre pays.", gender: "male" },
  { text: "Bonjour ! École Culinaire du Saguenay, chef Laurent à l'appareil. Quelles sont vos questions concernant nos ateliers de cuisine zéro déchet ?", gender: "male" },
  { text: "Voici votre sujet : 'Les réseaux sociaux représentent-ils un vecteur d'ouverture pour la jeunesse ou une menace pour leur santé mentale ?' Exposez votre point de vue.", gender: "male" },
  { text: "Les réseaux sociaux ne permettent-ils pas aux jeunes isolés de trouver une communauté solidaire ?", gender: "male" },

  // Paper 8
  { text: "Bonjour ! Présentez-vous, décrivez-moi votre genre de film ou de spectacle préféré et parlez-moi d'un événement culturel marquant.", gender: "female" },
  { text: "Bonjour ! Festival des Arts de Rimouski, Élodie Martin. Merci pour votre enthousiasme. Quelles sont vos questions concernant le bénévolat au festival ?", gender: "female" },
  { text: "Voici votre sujet : 'La semaine de travail de 4 jours représente-t-elle un modèle gagnant-gagnant pour les salariés et les entreprises ou un frein économique ?' Exposez votre point de vue.", gender: "female" },
  { text: "Les petites entreprises avec des marges réduites peuvent-elles vraiment maintenir la même production en fermant un jour par semaine ?", gender: "female" },

  // Paper 9
  { text: "Bonjour ! Présentez-vous, décrivez-moi votre logement et votre quartier, et dites-moi dans quel type d'environnement vous aimeriez vivre au Canada.", gender: "male" },
  { text: "Bonjour ! Commun-Auto Longueuil, Laurent Dubois. En quoi puis-je vous aider concernant notre service d'autopartage ?", gender: "male" },
  { text: "Voici votre sujet : 'Faut-il supprimer tout âge limite obligatoire pour la retraite et laisser chacun décider de la fin de sa carrière ?' Présentez votre argumentation.", gender: "male" },
  { text: "Le maintien prolongé des aînés en poste ne risque-t-il pas de bloquer l'ascension professionnelle des jeunes diplômés ?", gender: "male" },

  // Paper 10
  { text: "Bonjour et bienvenue à cette dernière session d'expression orale. Pouvez-vous vous présenter, me détailler votre projet professionnel au Canada et m'expliquer la place de la langue française dans votre vie ?", gender: "female" },
  { text: "Bonjour ! Université de Montréal, Éducation Permanente, Élodie Martin à votre écoute. Quelles questions avez-vous concernant notre certificat professionnel en analyse de données ?", gender: "female" },
  { text: "Voici votre sujet de clôture : 'Le bilinguisme officiel constitue-t-il une force économique et culturelle majeure pour le Canada ou un défi complexe au quotidien ?' Développez votre analyse.", gender: "female" },
  { text: "La prédominance mondiale de l'anglais ne rend-elle pas l'exigence du bilinguisme trop coûteuse pour les institutions publiques ?", gender: "female" }
];

async function precacheSpeakingAudio() {
  console.log("==========================================================================");
  console.log("🎙️ PRE-RECORDING ALL SPEAKING EXAMINER PROMPTS INTO MONGODB TTS CACHE");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  let count = 0;
  for (const item of SPEAKING_EXAMINER_PROMPTS) {
    count++;
    try {
      const res = await generateNeuralAudio(item.text, item.gender as any, "fr", undefined, undefined, undefined, 0.95);
      if (res && res.audioBase64) {
        const isCached = res.provider.startsWith("cache-");
        const bytes = Buffer.from(res.audioBase64, "base64").length;
        console.log(`   [Prompt ${count}/${SPEAKING_EXAMINER_PROMPTS.length}] ${isCached ? "⚡ Cache Hit" : "✨ Synthesized & Saved"} (${(bytes / 1024).toFixed(1)} KB) - [${item.gender}] "${item.text.slice(0, 45)}..."`);
      }
    } catch (err: any) {
      console.error(`   ❌ Failed prompt ${count}:`, err?.message || err);
    }
  }

  console.log("==========================================================================");
  console.log(`🎉 ALL ${SPEAKING_EXAMINER_PROMPTS.length} SPEAKING EXAMINER PROMPTS PRE-RECORDED IN MONGODB`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

precacheSpeakingAudio().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
