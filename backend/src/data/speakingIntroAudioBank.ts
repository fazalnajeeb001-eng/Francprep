/**
 * Pre-cached High-Fidelity Studio Neural Audio for TCF Canada Speaking Task Intros
 * Uses official adult French examiner voices: fr-FR-DeniseNeural (female) & fr-FR-HenriNeural (male).
 */
import { generateEdgeNeuralAudio } from '../services/edgeTts.service';

export const STATIC_SPEAKING_INTROS = {
  task1_female: "Bonjour ! Bienvenue à l'épreuve d'expression orale du TCF Canada. Je suis votre examinatrice. Pour cette première tâche sans préparation, nous allons faire un entretien dirigé de 2 minutes. Pouvez-vous vous présenter, me parler de votre parcours professionnel et de vos motivations pour le Canada ?",
  task1_male: "Bonjour ! Bienvenue à l'épreuve d'expression orale du TCF Canada. Je suis votre examinateur. Pour cette première tâche sans préparation, nous allons faire un entretien dirigé de 2 minutes. Pouvez-vous vous présenter, me parler de votre parcours professionnel et de vos motivations pour le Canada ?",
  task2_female: "Bonjour ! Bienvenue dans la deuxième tâche. Vous disposez de 2 minutes de préparation pour prendre connaissance du document support et préparer vos questions. Ensuite, nous échangerons pendant 3 minutes et demie. Je vous écoute, quelles sont vos questions ?",
  task2_male: "Bonjour ! Bienvenue dans la deuxième tâche. Vous disposez de 2 minutes de préparation pour prendre connaissance du document support et préparer vos questions. Ensuite, nous échangerons pendant 3 minutes et demie. Je vous écoute, quelles sont vos questions ?",
  task3_female: "Bonjour ! Bienvenue dans la troisième tâche. Vous allez exprimer votre point de vue de manière fluide et argumentée sur ce sujet de société pendant environ 3 minutes, puis nous en débattrons ensemble. Présentez-moi vos arguments et votre position.",
  task3_male: "Bonjour ! Bienvenue dans la troisième tâche. Vous allez exprimer votre point de vue de manière fluide et argumentée sur ce sujet de société pendant environ 3 minutes, puis nous en débattrons ensemble. Présentez-moi vos arguments et votre position.",
};

const introAudioMemoryCache: Record<string, string> = {};

export async function getSpeakingIntroAudioBase64(taskIdx: number, gender: 'female' | 'male' = 'female', voiceId?: string): Promise<string | null> {
  const baseKey = `task${taskIdx + 1}_${gender}`;
  const cacheKey = `${baseKey}_${voiceId || ''}`;
  if (introAudioMemoryCache[cacheKey]) {
    return introAudioMemoryCache[cacheKey];
  }

  const text = (STATIC_SPEAKING_INTROS as any)[baseKey] || STATIC_SPEAKING_INTROS.task1_female;
  try {
    const edgeRes = await generateEdgeNeuralAudio(text, gender, 'fr', 1.0, voiceId, true);
    if (edgeRes && edgeRes.audioBase64) {
      introAudioMemoryCache[cacheKey] = edgeRes.audioBase64;
      return edgeRes.audioBase64;
    }
  } catch (err: any) {
    console.warn('[SpeakingIntroBank Error]:', err?.message || err);
  }

  return null;
}
