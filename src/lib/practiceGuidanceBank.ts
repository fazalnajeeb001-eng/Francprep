/**
 * 🇨🇦 FrancPrep Master Practice Mode Guidance Bank
 * Provides 100% comprehensive Trap Alerts, Audio Coach Strategies, and Pedagogical Explanations
 * across all 390 TCF Canada Listening questions (10 Papers).
 */

export interface QuestionGuidance {
  trapAlert: string;
  audioCoach: string;
  detailedExplanation: string;
  combinedHint: string;
}

export function getQuestionGuidance(
  qNum: number,
  level: string,
  questionPrompt: string,
  correctText: string,
  passage: string
): QuestionGuidance {
  let trapAlert = "";
  let audioCoach = "";
  let detailedExplanation = "";

  if (qNum <= 4) {
    // Q1 - Q4: Visual Items (A1)
    trapAlert = `⚠️ Piège TCF (Image Matching) : Les propositions pièges mentionnent des éléments réels du décor ou des personnages visibles, mais décrivent une action erronée ou un détail contradictoire.`;
    audioCoach = `🎧 Audio Coach : Observez bien l'image avant l'audio. Identifiez le sujet principal (qui/quoi) et son action précise (le verbe). Éliminez d'emblée toute phrase décrivant une action absente du dessin.`;
    detailedExplanation = `🎯 Justification Pédagogique : La proposition "${correctText}" est la seule qui corresponde exactement à la situation illustrée sur le document officiel.\n❌ Analyse des distracteurs : Les trois autres propositions décrivent des actions plausibles du quotidien mais factuellement absentes de l'illustration.`;
  } else if (qNum <= 7) {
    // Q5 - Q7: A1 Public Announcements
    trapAlert = `⚠️ Piège TCF (Annonces publiques A1) : Attention aux nombres proches (voie 2 vs voie 12, 14h15 vs 15h15) et aux confusions entre gare de départ et gare d'arrivée.`;
    audioCoach = `🎧 Audio Coach : Concentrez-vous sur les mots-clés essentiels : le numéro de voie, l'horaire précis et la consigne de voyage. La question est énoncée à la fin du message audio.`;
    detailedExplanation = `🎯 Justification Pédagogique : Le message annonce clairement : "${passage}". L'option "${correctText}" synthétise fidèlement cette information officielle.\n❌ Analyse des distracteurs : Les distracteurs modifient le numéro de voie, inversent les destinations ou inventent des retards fictifs.`;
  } else if (qNum <= 15) {
    // Q8 - Q15: A2 Voicemail / Phone Messages
    trapAlert = `⚠️ Piège TCF (Messages téléphoniques A2) : L'interlocuteur mentionne souvent des détails secondaires (prix, horaires d'ouverture, coordonnées) qui servent de leurres dans les options.`;
    audioCoach = `🎧 Audio Coach : Repérez QUI appelle et POURQUOI dès les premières secondes du message. Distinguez l'objectif principal de l'appel des informations pratiques annexes.`;
    detailedExplanation = `🎯 Justification Pédagogique : L'interlocuteur précise : "${passage}". La raison essentielle de l'appel est donc : "${correctText}".\n❌ Analyse des distracteurs : Les autres choix reprennent des informations secondaires sans répondre au motif central du message téléphonique.`;
  } else if (qNum <= 25) {
    // Q16 - Q25: B1 Radio Reports & Vox-Pops
    trapAlert = `⚠️ Piège TCF (Reportages & Sondages B1) : Les mauvaises options reprennent des mots exacts du reportage mais déforment l'avis majoritaire ou la portée réelle de l'initiative.`;
    audioCoach = `🎧 Audio Coach : Soyez attentif aux connecteurs logiques et aux statistiques ("selon l'enquête", "la majorité", "cependant", "en réalité"). Cherchez la conclusion globale du journaliste.`;
    detailedExplanation = `🎯 Justification Pédagogique : Le document sonore démontre que : "${passage}". L'option "${correctText}" traduit parfaitement la tendance et le constat général exprimés.\n❌ Analyse des distracteurs : Les options incorrectes isolent des témoignages minoritaires ou exagèrent les conclusions de l'étude.`;
  } else if (qNum <= 33) {
    // Q26 - Q33: B2 Debates & Expert Discussions
    trapAlert = `⚠️ Piège TCF (Débats contradictoires B2) : Les intervenants emploient souvent des concessions ("Certes...", "Je comprends l'intérêt...") avant d'affirmer leur désaccord via des articulateurs d'opposition ("Toutefois...", "En revanche...", "Néanmoins...").`;
    audioCoach = `🎧 Audio Coach : Suivez l'interaction dynamique entre les deux locuteurs. Repérez les nuances, les intonations et le point précis d'achoppement ou de consensus entre les experts.`;
    detailedExplanation = `🎯 Justification Pédagogique : Dans ce débat, l'argumentation centrale repose sur : "${correctText}". Cela reflète la position nuancée défendue dans l'échange.\n❌ Analyse des distracteurs : Les distracteurs sortent la concession de son contexte ou prêtent aux locuteurs des mesures radicales non formulées.`;
  } else {
    // Q34 - Q39: C1/C2 Academic Keynotes & Scientific Lectures
    trapAlert = `⚠️ Piège TCF (Synthèse avancée C1/C2) : Ne choisissez JAMAIS une option uniquement parce qu'elle reprend des mots mot-à-mot du texte. Au niveau C1/C2, les distracteurs utilisent les termes exacts de l'audio pour piéger les candidats dans un repérage lexical superficiel.`;
    audioCoach = `🎧 Audio Coach : La question est affichée à l'écran. Lisez-la avant l'écoute, puis mobilisez une écoute active pour saisir la thèse philosophique, scientifique ou épistémologique globale à travers ses reformulations conceptuelles.`;
    detailedExplanation = `🎯 Justification Pédagogique : Le conférencier développe : "${passage}". La bonne réponse "${correctText}" exprime cette thèse par une reformulation conceptuelle de haut niveau.\n❌ Analyse des distracteurs : Les mauvaises réponses s'appuient sur un simple copier-coller lexical partiel ou extrapolent la thèse vers des affirmations dogmatiques erronées.`;
  }

  const combinedHint = `${trapAlert}\n\n${audioCoach}`;

  return {
    trapAlert,
    audioCoach,
    detailedExplanation,
    combinedHint,
  };
}
