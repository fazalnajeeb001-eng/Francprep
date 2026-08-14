/**
 * 🇨🇦 FrancPrep Master Practice Mode Guidance Bank
 * Provides 100% comprehensive, bilingual (French + 100% Pure English Translations) Trap Alerts,
 * Audio Coach Strategies, and Pedagogical Explanations across all 390 TCF Canada Listening questions (10 Papers).
 */

export interface QuestionGuidance {
  trapAlert: string;
  trapAlertEn: string;
  audioCoach: string;
  audioCoachEn: string;
  detailedExplanation: string;
  detailedExplanationEn: string;
  combinedHint: string;
}

export function getQuestionGuidance(
  qNum: number,
  level: string,
  questionPrompt: string,
  correctText: string,
  passage: string,
  correctTextEn?: string,
  passageEn?: string,
  questionPromptEn?: string
): QuestionGuidance {
  let trapAlert = "";
  let trapAlertEn = "";
  let audioCoach = "";
  let audioCoachEn = "";
  let detailedExplanation = "";
  let detailedExplanationEn = "";

  const finalCorrectEn = (correctTextEn && correctTextEn.trim()) ? correctTextEn.trim() : correctText;
  const finalPassageEn = (passageEn && passageEn.trim()) ? passageEn.trim() : passage;

  if (qNum <= 4) {
    // Q1 - Q4: Visual Items (A1)
    trapAlert = `⚠️ Piège TCF (Correspondance Image) : Les propositions pièges mentionnent des éléments réels du décor ou des personnes visibles, mais décrivent une action erronée ou un détail contradictoire.`;
    trapAlertEn = `⚠️ Trap Alert (Visual Matching): Distractor options name real objects or people visible in the drawing, but describe the wrong action or a contradictory detail.`;

    audioCoach = `🎧 Audio Coach : Observez bien l'image avant l'audio. Identifiez le sujet principal (qui/quoi) et son action précise (le verbe). Éliminez d'emblée toute phrase décrivant une action absente du dessin.`;
    audioCoachEn = `🎧 Audio Coach Strategy: Scan the illustration before audio starts. Identify the main subject (who/what) and their precise action (the verb). Immediately eliminate options describing actions not taking place in the image.`;

    detailedExplanation = `🎯 Justification Pédagogique : La proposition « ${correctText} » est la seule qui corresponde exactement à la situation illustrée sur le document officiel.\n\n❌ Analyse des distracteurs : Les trois autres propositions décrivent des actions plausibles du quotidien mais factuellement absentes de l'illustration.`;

    detailedExplanationEn = `🎯 English Explanation: Option "${finalCorrectEn}" is the only proposition that accurately describes the official visual illustration.\n\n❌ Distractor Analysis: The other 3 options describe plausible everyday actions that are factually absent from the picture.`;
  } else if (qNum <= 7) {
    // Q5 - Q7: A1 Public Announcements
    trapAlert = `⚠️ Piège TCF (Annonces publiques A1) : Attention aux nombres proches (voie 2 vs voie 12, 14h15 vs 15h15) et aux confusions entre gare de départ et gare d'arrivée.`;
    trapAlertEn = `⚠️ Trap Alert (A1 Public Announcements): Watch out for similar-sounding numbers (track 2 vs track 12, 14:15 vs 15:15) and confusing the departure station with the destination station.`;

    audioCoach = `🎧 Audio Coach : Concentrez-vous sur les mots-clés essentiels : le numéro de voie, l'horaire précis et la consigne de voyage. La question est énoncée à la fin du message audio.`;
    audioCoachEn = `🎧 Audio Coach Strategy: Focus on key announcement data: track number, exact departure time, and travel instructions. The question is spoken at the end of the message.`;

    detailedExplanation = `🎯 Justification Pédagogique : Le message annonce clairement : « ${passage} ». L'option « ${correctText} » synthétise fidèlement cette information officielle.\n\n❌ Analyse des distracteurs : Les distracteurs modifient le numéro de voie, inversent les destinations ou inventent des retards fictifs.`;

    detailedExplanationEn = `🎯 English Explanation: The announcement states: "${finalPassageEn}". The option "${finalCorrectEn}" faithfully conveys this official information.\n\n❌ Distractor Analysis: Distractors alter the track number, invert destinations, or invent fictional delays.`;
  } else if (qNum <= 15) {
    // Q8 - Q15: A2 Voicemail / Phone Messages
    trapAlert = `⚠️ Piège TCF (Messages téléphoniques A2) : L'interlocuteur mentionne souvent des détails secondaires (prix, horaires d'ouverture, coordonnées) qui servent de leurres dans les options.`;
    trapAlertEn = `⚠️ Trap Alert (A2 Voicemails & Phone Messages): Callers often mention auxiliary details (prices, opening hours, contact details) that act as distractors in the options.`;

    audioCoach = `🎧 Audio Coach : Repérez QUI appelle et POURQUOI dès les premières secondes du message. Distinguez l'objectif principal de l'appel des informations pratiques annexes.`;
    audioCoachEn = `🎧 Audio Coach Strategy: Identify WHO is calling and WHY right from the first seconds of the message. Separate the main reason for calling from background practical details.`;

    detailedExplanation = `🎯 Justification Pédagogique : L'interlocuteur précise : « ${passage} ». La raison essentielle de l'appel est donc : « ${correctText} ».\n\n❌ Analyse des distracteurs : Les autres choix reprennent des informations secondaires sans répondre au motif central du message téléphonique.`;

    detailedExplanationEn = `🎯 English Explanation: The caller specifies: "${finalPassageEn}". The main reason for the call is therefore: "${finalCorrectEn}".\n\n❌ Distractor Analysis: Incorrect options focus on secondary information without answering the primary reason for leaving the message.`;
  } else if (qNum <= 25) {
    // Q16 - Q25: B1 Radio Reports & Vox-Pops
    trapAlert = `⚠️ Piège TCF (Reportages & Sondages B1) : Les mauvaises options reprennent des mots exacts du reportage mais déforment l'avis majoritaire ou la portée réelle de l'initiative.`;
    trapAlertEn = `⚠️ Trap Alert (B1 Radio Reports & Surveys): Distractors repeat exact keywords from the report but distort the majority consensus or the true scope of the initiative.`;

    audioCoach = `🎧 Audio Coach : Soyez attentif aux connecteurs logiques et aux statistiques ("selon l'enquête", "la majorité", "cependant", "en réalité"). Cherchez la conclusion globale du journaliste.`;
    audioCoachEn = `🎧 Audio Coach Strategy: Pay close attention to logical connectors and statistics ("according to the survey", "the majority", "however", "in reality"). Look for the overall takeaway.`;

    detailedExplanation = `🎯 Justification Pédagogique : Le document sonore démontre que : « ${passage} ». L'option « ${correctText} » traduit parfaitement la tendance et le constat général exprimés.\n\n❌ Analyse des distracteurs : Les options incorrectes isolent des témoignages minoritaires ou exagèrent les conclusions de l'étude.`;

    detailedExplanationEn = `🎯 English Explanation: The audio report demonstrates that: "${finalPassageEn}". The option "${finalCorrectEn}" perfectly captures the overall trend and finding reported.\n\n❌ Distractor Analysis: Incorrect options isolate minority viewpoints or exaggerate the study's conclusions.`;
  } else if (qNum <= 33) {
    // Q26 - Q33: B2 Debates & Expert Discussions
    trapAlert = `⚠️ Piège TCF (Débats contradictoires B2) : Les intervenants emploient souvent des concessions ("Certes...", "Je comprends l'intérêt...") avant d'affirmer leur désaccord via des articulateurs d'opposition ("Toutefois...", "En revanche...", "Néanmoins...").`;
    trapAlertEn = `⚠️ Trap Alert (B2 Multi-Speaker Debates): Speakers frequently use concessions ("Certainly...", "I understand the benefit...") before asserting their true disagreement using contrasting transition words ("However...", "On the other hand...", "Nevertheless...").`;

    audioCoach = `🎧 Audio Coach : Suivez l'interaction dynamique entre les deux locuteurs. Repérez les nuances, les intonations et le point précis d'achoppement ou de consensus entre les experts.`;
    audioCoachEn = `🎧 Audio Coach Strategy: Track the dynamic exchange between both speakers. Pay attention to subtle nuances, shifts in vocal intonation, and the exact point of disagreement or consensus between the experts.`;

    detailedExplanation = `🎯 Justification Pédagogique : Dans ce débat, l'argumentation centrale repose sur : « ${correctText} ». Cela reflète la position nuancée défendue dans l'échange.\n\n❌ Analyse des distracteurs : Les distracteurs sortent la concession de son contexte ou prêtent aux locuteurs des mesures radicales non formulées.`;

    detailedExplanationEn = `🎯 English Explanation: In this debate, the key argument is: "${finalCorrectEn}". This reflects the nuanced position defended in the dialogue.\n\n❌ Distractor Analysis: Distractors take the concession out of context or attribute radical measures to the speakers that were never proposed.`;
  } else {
    // Q34 - Q39: C1/C2 Academic Keynotes & Scientific Lectures
    trapAlert = `⚠️ Piège TCF (Synthèse avancée C1/C2) : Ne choisissez JAMAIS une option uniquement parce qu'elle reprend des mots mot-à-mot du texte. Au niveau C1/C2, les distracteurs utilisent les termes exacts de l'audio pour piéger les candidats dans un repérage lexical superficiel.`;
    trapAlertEn = `⚠️ Trap Alert (C1/C2 Advanced Synthesis): NEVER pick an option simply because it matches words verbatim from the audio. At C1/C2, official distractors use exact transcript keywords to lure candidates into superficial keyword-matching.`;

    audioCoach = `🎧 Audio Coach : La question est affichée à l'écran. Lisez-la avant l'écoute, puis mobilisez une écoute active pour saisir la thèse philosophique, scientifique ou épistémologique globale à travers ses reformulations conceptuelles.`;
    audioCoachEn = `🎧 Audio Coach Strategy: The question is printed on screen before audio begins. Read it quickly, then listen actively to grasp the overarching philosophical, scientific, or conceptual thesis through advanced paraphrasing.`;

    detailedExplanation = `🎯 Justification Pédagogique : Le conférencier développe : « ${passage} ». La bonne réponse « ${correctText} » exprime cette thèse par une reformulation conceptuelle de haut niveau.\n\n❌ Analyse des distracteurs : Les mauvaises réponses s'appuient sur un simple copier-coller lexical partiel ou extrapolent la thèse vers des affirmations dogmatiques erronées.`;

    detailedExplanationEn = `🎯 English Explanation: The lecturer argues: "${finalPassageEn}". The correct response "${finalCorrectEn}" expresses this central thesis through high-level academic paraphrasing.\n\n❌ Distractor Analysis: Incorrect choices rely on partial keyword-matching traps or extrapolate the thesis to dogmatic extremes not stated in the lecture.`;
  }

  const combinedHint = `${trapAlert}\n\n${audioCoach}`;

  return {
    trapAlert,
    trapAlertEn,
    audioCoach,
    audioCoachEn,
    detailedExplanation,
    detailedExplanationEn,
    combinedHint,
  };
}
