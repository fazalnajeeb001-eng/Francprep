import mongoose from 'mongoose';
import crypto from 'crypto';
import { generateEdgeNeuralAudio } from '../services/edgeTts.service';
import TTSCache from '../models/TTSCache';
import { env } from '../config/env';

function getHash(text: string, gender: string = 'female'): string {
  const normText = (text || '').trim().toLowerCase().replace(/[.,!?;:\s]+/g, ' ');
  const normGender = (gender || 'female').toLowerCase();
  return crypto.createHash('md5').update(`${normText}_${normGender}`).digest('hex');
}

const PROMPTS_TO_PREWARM = [
  // Paper 1
  { paper: 1, task: 1, gender: 'male', voiceId: 'fr-FR-HenriNeural', text: "Bonjour ! Je m'appelle Henri, votre examinateur certifié pour l'épreuve d'expression orale du TCF Canada. Nous commençons la première tâche, un entretien dirigé de deux minutes sans préparation. Pouvez-vous vous présenter, me décrire votre métier actuel et m'expliquer vos motivations pour vous installer au Canada ?" },
  { paper: 1, task: 2, gender: 'male', voiceId: 'fr-FR-HenriNeural', text: "Bienvenue dans la deuxième tâche. Vous avez eu deux minutes de préparation pour étudier le document de location d'appartement à Québec. Nous commençons notre exercice en interaction de trois minutes et demie. Je suis le propriétaire, M. Henri. Je vous écoute, quelles sont vos questions ?" },
  { paper: 1, task: 3, gender: 'male', voiceId: 'fr-FR-HenriNeural', text: "Passons à la troisième et dernière tâche d'une durée de quatre minutes et demie. Le sujet est le suivant : 'Le télétravail généralisé nuit-il à la cohésion sociale et à la culture d'entreprise ?' Présentez-moi votre argumentation de manière structurée." },

  // Paper 2
  { paper: 2, task: 1, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Bonjour ! Je suis Denise, votre examinatrice officielle pour cette épreuve d'expression orale du TCF Canada. Pour la première tâche sans préparation de deux minutes, faisons connaissance. Pouvez-vous vous présenter, me décrire votre parcours professionnel et me parler de vos loisirs préférés ?" },
  { paper: 2, task: 2, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Bienvenue dans la deuxième tâche. Vos deux minutes de préparation sur l'inscription aux cours de français intensifs à Montréal sont terminées. Échangeons pendant trois minutes et demie. Je suis la directrice pédagogique, Denise. Posez-moi toutes vos questions !" },
  { paper: 2, task: 3, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Voici la troisième tâche d'une durée de quatre minutes et demie. Le sujet est : 'L'intelligence artificielle et la technologie doivent-elles occuper une place centrale dans l'éducation moderne ?' Développez votre point de vue avec des arguments précis." },

  // Paper 3
  { paper: 3, task: 1, gender: 'male', voiceId: 'fr-CA-JeanNeural', text: "Bonjour ! Je m'appelle Jean, votre examinateur certifié TCF Canada. Pour cette première tâche de deux minutes sans préparation, nous menons un entretien dirigé. Pouvez-vous vous présenter, me décrire votre ville natale et m'expliquer ce que vous aimez faire pendant votre temps libre ?" },
  { paper: 3, task: 2, gender: 'male', voiceId: 'fr-CA-JeanNeural', text: "Nous abordons la deuxième tâche. Vous avez préparé vos questions pendant deux minutes d'après le prospectus du centre sportif municipal. Nous entamons trois minutes et demie d'interaction. Je suis le responsable du centre, M. Jean. Je vous écoute !" },
  { paper: 3, task: 3, gender: 'male', voiceId: 'fr-CA-JeanNeural', text: "Passons à la troisième tâche de quatre minutes et demie. Exprimez votre opinion argumentée sur la question suivante : 'La gratuité des transports en commun est-elle la solution idéale pour préserver l'environnement urbain ?' La parole est à vous." },

  // Paper 4
  { paper: 4, task: 1, gender: 'female', voiceId: 'fr-CA-SylvieNeural', text: "Bonjour ! Je suis Sylvie, votre examinatrice officielle pour le TCF Canada. Pour cette première tâche sans préparation de deux minutes, nous faisons un entretien dirigé. Pouvez-vous vous présenter et me raconter un voyage ou un événement marquant de votre vie ?" },
  { paper: 4, task: 2, gender: 'female', voiceId: 'fr-CA-SylvieNeural', text: "Bienvenue dans la deuxième tâche. Vos deux minutes de préparation sur la brochure du programme de bénévolat environnemental sont écoulées. Échangeons pendant trois minutes et demie. Je suis la coordinatrice de l'association, Sylvie. Posez-moi vos questions !" },
  { paper: 4, task: 3, gender: 'female', voiceId: 'fr-CA-SylvieNeural', text: "Voici la troisième tâche de quatre minutes et demie. Le sujet de débat est : 'La consommation responsable et le tri sélectif doivent-ils devenir obligatoires sous peine de sanctions financières ?' Présentez votre point de vue." },

  // Paper 5
  { paper: 5, task: 1, gender: 'male', voiceId: 'fr-FR-RemyMultilingualNeural', text: "Bonjour ! Je m'appelle Rémy, votre examinateur certifié pour le TCF Canada. Pour cette première tâche de deux minutes sans préparation, nous réalisons un entretien dirigé. Pouvez-vous vous présenter et m'expliquer comment vous organisez vos journées de travail ou d'études ?" },
  { paper: 5, task: 2, gender: 'male', voiceId: 'fr-FR-RemyMultilingualNeural', text: "Bienvenue dans la deuxième tâche. Après vos deux minutes de préparation sur l'annonce du séjour linguistique d'été, nous entamons trois minutes et demie d'échange. Je suis le conseiller de l'agence, Rémy. Je vous écoute, quelles sont vos questions ?" },
  { paper: 5, task: 3, gender: 'male', voiceId: 'fr-FR-RemyMultilingualNeural', text: "Passons à la troisième tâche d'une durée de quatre minutes et demie. Développez votre réflexion sur le sujet suivant : 'Les réseaux sociaux favorisent-ils l'isolement individuel plutôt que le rapprochement humain ?' Présentez votre argumentation." },

  // Paper 6
  { paper: 6, task: 1, gender: 'female', voiceId: 'fr-FR-VivienneMultilingualNeural', text: "Bonjour ! Je suis Vivienne, votre examinatrice officielle pour le TCF Canada. Pour cette première tâche de deux minutes sans préparation, pouvez-vous vous présenter, me décrire votre environnement quotidien et me parler des personnes qui vous entourent ?" },
  { paper: 6, task: 2, gender: 'female', voiceId: 'fr-FR-VivienneMultilingualNeural', text: "Nous entamons la deuxième tâche. Vos deux minutes de préparation sur l'organisation de la fête de quartier sont terminées. Échangeons pendant trois minutes et demie. Je suis la responsable du comité, Vivienne. Posez-moi vos questions !" },
  { paper: 6, task: 3, gender: 'female', voiceId: 'fr-FR-VivienneMultilingualNeural', text: "Voici la troisième et dernière tâche de quatre minutes et demie. Votre sujet de réflexion est le suivant : 'Le tourisme de masse est-il un danger irréversible pour l'environnement et le patrimoine culturel ?' Exprimez votre point de vue." },

  // Paper 7
  { paper: 7, task: 1, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Bonjour ! Je m'appelle Élodie, votre examinatrice certifiée pour le TCF Canada. Pour la première tâche sans préparation de deux minutes, nous menons un entretien dirigé. Pouvez-vous vous présenter et me décrire vos activités culturelles et artistiques préférées ?" },
  { paper: 7, task: 2, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Bienvenue dans la deuxième tâche. Vous avez préparé vos questions pendant deux minutes d'après la fiche de l'atelier de poterie et céramique. Nous échangeons pendant trois minutes et demie. Je suis la responsable de l'atelier, Élodie. Je vous écoute !" },
  { paper: 7, task: 3, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Passons à la troisième tâche d'une durée de quatre minutes et demie. Débattez sur le sujet suivant : 'La semaine de travail de quatre jours devrait-elle être généralisée dans toutes les entreprises ?' Présentez vos arguments." },

  // Paper 8
  { paper: 8, task: 1, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Bonjour ! Je suis Brigitte, votre examinatrice certifiée pour le TCF Canada. Pour cet entretien dirigé de deux minutes sans préparation, pouvez-vous vous présenter et me parler de votre expérience personnelle dans l'apprentissage du français ?" },
  { paper: 8, task: 2, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Bienvenue dans la deuxième tâche. Vos deux minutes de préparation sur le dépliant du réseau solidaire alimentaire sont écoulées. Échangeons pendant trois minutes et demie. Je suis la coordonnatrice, Mme Brigitte. Posez-moi toutes vos questions !" },
  { paper: 8, task: 3, gender: 'female', voiceId: 'fr-FR-DeniseNeural', text: "Voici la troisième tâche de quatre minutes et demie. Exprimez votre avis argumenté sur la question : 'La préservation du patrimoine historique doit-elle primer sur les projets de modernisation urbaine ?' À vous la parole." },

  // Paper 9
  { paper: 9, task: 1, gender: 'male', voiceId: 'fr-FR-HenriNeural', text: "Bonjour ! Je m'appelle Pierre, votre examinateur certifié pour le TCF Canada. Pour la première tâche sans préparation de deux minutes, pouvez-vous vous présenter et me décrire un projet ou une réussite dont vous êtes particulièrement fier ?" },
  { paper: 9, task: 2, gender: 'male', voiceId: 'fr-FR-HenriNeural', text: "Bienvenue dans la deuxième tâche. Après vos deux minutes de préparation sur l'annonce de l'espace de coworking Innova-Work, nous entamons trois minutes et demie d'interaction. Je suis le gestionnaire du centre, M. Pierre. Je vous écoute !" },
  { paper: 9, task: 3, gender: 'male', voiceId: 'fr-FR-HenriNeural', text: "Passons à la troisième tâche d'une durée de quatre minutes et demie. Défendez votre opinion sur le sujet : 'L'apprentissage en ligne peut-il remplacer définitivement l'enseignement traditionnel en présentiel ?' Présentez votre argumentation." },

  // Paper 10
  { paper: 10, task: 1, gender: 'female', voiceId: 'fr-FR-VivienneMultilingualNeural', text: "Bonjour ! Je suis Sophie, votre examinatrice officielle pour le TCF Canada. Commençons par la première tâche sans préparation de deux minutes. Pouvez-vous vous présenter, me parler de votre profession et me décrire ce que vous aimez faire le week-end ?" },
  { paper: 10, task: 2, gender: 'female', voiceId: 'fr-FR-VivienneMultilingualNeural', text: "Nous abordons la deuxième tâche. Vos deux minutes de préparation sur la brochure du club de lecture sont terminées. Échangeons pendant trois minutes et demie. Je suis l'animatrice du club, Mme Sophie. Posez-moi toutes vos questions !" },
  { paper: 10, task: 3, gender: 'female', voiceId: 'fr-FR-VivienneMultilingualNeural', text: "Voici la troisième et dernière tâche de quatre minutes et demie. Exprimez votre opinion de manière structurée sur le sujet : 'L'automatisation et l'intelligence artificielle menacent-elles l'avenir de l'emploi humain ?' Développez vos arguments." }
];

async function runPrewarm() {
  const mongoUri = env.mongodbUri;
  console.log(`Connecting to MongoDB...`);
  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB! Pre-warming 30 Speaking task opening prompts...`);

  let successCount = 0;
  for (let i = 0; i < PROMPTS_TO_PREWARM.length; i++) {
    const item = PROMPTS_TO_PREWARM[i];
    const textHash = getHash(item.text, item.gender);

    try {
      // Check if already in cache
      const existing = await TTSCache.findOne({ textHash });
      if (existing && existing.audioBase64) {
        console.log(`[${i + 1}/30] Paper ${item.paper} Task ${item.task} (${item.voiceId}): Already cached! (${existing.audioBase64.length} chars)`);
        successCount++;
        continue;
      }

      console.log(`[${i + 1}/30] Synthesizing Paper ${item.paper} Task ${item.task} (${item.voiceId})...`);
      const audioRes = await generateEdgeNeuralAudio(
        item.text,
        item.gender as 'female' | 'male',
        'fr',
        1.0
      );

      if (audioRes && audioRes.audioBase64) {
        await TTSCache.findOneAndUpdate(
          { textHash },
          {
            textHash,
            text: item.text,
            voice: item.voiceId,
            gender: item.gender,
            audioBase64: audioRes.audioBase64,
            contentType: 'audio/mp3',
          },
          { upsert: true, new: true }
        );
        console.log(`[${i + 1}/30] Paper ${item.paper} Task ${item.task} (${item.voiceId}): SUCCESS! Base64 size: ${audioRes.audioBase64.length}`);
        successCount++;
      } else {
        console.warn(`[${i + 1}/30] Paper ${item.paper} Task ${item.task}: Synthesis failed!`);
      }
    } catch (err: any) {
      console.error(`[${i + 1}/30] Paper ${item.paper} Task ${item.task} error:`, err?.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`Pre-warming complete! ${successCount} / 30 tasks locked in MongoDB TTSCache.`);
  console.log(`========================================\n`);
  await mongoose.disconnect();
}

runPrewarm().catch(err => {
  console.error('Fatal pre-warm error:', err);
  process.exit(1);
});
