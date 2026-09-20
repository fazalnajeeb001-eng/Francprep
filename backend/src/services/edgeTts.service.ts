import crypto from 'crypto';

if (typeof (globalThis as any).crypto === 'undefined') {
  (globalThis as any).crypto = (crypto as any).webcrypto || crypto;
}

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { stripSpeakerLabels, stitchMp3Buffers } from './tts.service';

/**
 * Full Studio Roster for TCF Canada & Official French Exams:
 */
export const EDGE_FRENCH_VOICE_ROSTER = {
  // Official Test Announcers & Certified FEI Examiners
  femaleAnnouncer: 'fr-FR-DeniseNeural',                // Formal, mature adult Parisian female examiner
  maleAnnouncer: 'fr-FR-HenriNeural',                   // Formal, mature adult Parisian male examiner
  
  // Conversational Interlocutors (Certified FEI Examiners / Native Speakers)
  femaleInterlocutor1: 'fr-FR-DeniseNeural',             // Warm, natural adult French female
  maleInterlocutor1: 'fr-FR-HenriNeural',                // Warm, natural adult French male
  femaleInterlocutor2: 'fr-FR-VivienneMultilingualNeural', // Distinct adult female voice
  maleInterlocutor2: 'fr-FR-RemyMultilingualNeural',     // Distinct adult male voice
  
  // Media / Academic Broadcasters
  femaleJournalist: 'fr-FR-DeniseNeural',                // Expressive adult host
  maleLecturer: 'fr-FR-HenriNeural',                     // Academic lecturer male
  
  // Authentic Canadian French (Quebec / Montreal Adults)
  femaleCanadian: 'fr-CA-SylvieNeural',                   // Authentic adult Montreal woman
  maleCanadian: 'fr-CA-JeanNeural',                       // Authentic adult Quebec male speaker
  maleCanadian2: 'fr-CA-AntoineNeural',                   // Quebec male speaker 2

  // Youth / Student (Strictly reserved for young characters / students)
  femaleChild: 'fr-FR-EloiseNeural',                      // Young woman / student / teenager
};

interface EdgeDialogueSegment {
  speakerTag: string;
  voiceId: string;
  text: string;
  isAnnouncer: boolean;
}

/**
 * Parses transcript into sequential dialogue turns and assigns distinct mature 8-voice actors.
 */
export function parseEdgeDialogueSegments(
  text: string,
  defaultGender: 'female' | 'male' = 'female'
): EdgeDialogueSegment[] {
  const clean = text.trim();
  const segments: EdgeDialogueSegment[] = [];

  // Universal speaker matching: captures any "Speaker Name :" at start of line or string
  const speakerRegex = /(?:^|\n)\s*([A-ZÀ-ÖØ-ß][a-zA-ZÀ-ÿ0-9\s.'’\(\)\/\-–—]{1,45})\s*[:—–]\s*/gm;
  const matches = [...clean.matchAll(speakerRegex)];

  if (matches.length === 0) {
    const isMale = defaultGender === 'male';
    const isAnnouncer = clean.toLowerCase().startsWith('consigne') || clean.toLowerCase().startsWith('question') || clean.toLowerCase().startsWith('annonce');
    segments.push({
      speakerTag: isAnnouncer ? (isMale ? 'Annonceur' : 'Annonceuse') : (isMale ? 'Locuteur' : 'Locutrice'),
      voiceId: isAnnouncer
        ? (isMale ? EDGE_FRENCH_VOICE_ROSTER.maleAnnouncer : EDGE_FRENCH_VOICE_ROSTER.femaleAnnouncer)
        : (isMale ? EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor1 : EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor1),
      text: stripSpeakerLabels(clean),
      isAnnouncer
    });
    return segments;
  }

  let lastAssignedMale = false;
  let lastMaleVoice: string | null = null;
  let lastFemaleVoice: string | null = null;

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const speakerTag = currentMatch[1].trim();
    const startIndex = currentMatch.index! + currentMatch[0].length;
    const endIndex = (i + 1 < matches.length) ? matches[i + 1].index! : clean.length;
    const rawSegment = clean.slice(startIndex, endIndex).trim();
    const segmentText = stripSpeakerLabels(rawSegment);

    if (segmentText) {
      const lowerTag = speakerTag.toLowerCase();
      const lowerText = segmentText.toLowerCase();

      // Check contextual clues
      const isCanadianText = /\b(Montréal|Montreal|Québec|Quebec|Gatineau|Sherbrooke|Laval|Trois-Rivières|Moncton|Canada|dollar|saint-laurent)\b/i.test(segmentText);
      const isPublicStoreAnnouncement = /\b(annonce supermarché|annonce gare|annonce magasin|annonce aéroport|avis à la clientèle|offre spéciale|bulletin météo)\b/i.test(lowerText);
      const isExplicitChild = lowerTag.includes('enfant') || lowerTag.includes('fillette') || lowerTag.includes('ado');
      const isYoungStudent = lowerTag.includes('soraya') || lowerTag.includes('étudiante') || lowerTag.includes('etudiante');

      const isFemaleKeyword = [
        'femme', 'locutrice', 'voyageuse', 'cliente', 'patiente', 'passagère', 'passagere', 
        'boulangère', 'boulangere', 'secrétaire', 'secretaire', 'hôtesse', 'hotesse', 
        'auditrice', 'annonceuse', 'animatrice', 'directrice', 'médiatrice', 'mediatrice',
        'chroniqueuse', 'négociatrice', 'negociatrice', 'soraya', 'élodie', 'elodie', 'martine',
        'chantal', 'madame', 'fille', 'fillette', 'retraitée', 'retraitee', 'étudiante', 'etudiante'
      ].some(kw => lowerTag.includes(kw));

      const isMaleKeyword = [
        'homme', 'locuteur', 'voyageur', 'client', 'patient', 'passager', 'agent',
        'mécanicien', 'mecanicien', 'médecin', 'medecin', 'docteur', 'garagiste',
        'chef', 'artisan', 'plombier', 'alain', 'julien', 'marc', 'laurent', 'maxime', 'vasseur',
        'journaliste', 'animateur', 'directeur', 'professeur', 'auditeur', 'monsieur',
        'diplomate', 'fonctionnaire', 'collègue', 'collegue', 'expert', 'météorologue', 'meteorologue'
      ].some(kw => lowerTag.includes(kw));

      const isMale: boolean = isMaleKeyword ? true : (isFemaleKeyword ? false : !lastAssignedMale);
      lastAssignedMale = isMale;

      let voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor1;

      if (isExplicitChild) {
        // Child Persona (actual children/kids)
        voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleChild;
      } else if (isYoungStudent) {
        // University Student / Young Adult Woman (Soraya)
        voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor2; // fr-FR-VivienneMultilingualNeural
      } else if (lowerTag.includes('vasseur') || lowerTag.includes('maxime') || (lowerTag.includes('docteur') && !lowerTag.includes('secrétaire'))) {
        // Dr. Maxime Vasseur / Academic Specialist (distinct from radio host)
        voiceId = EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor2; // fr-FR-RemyMultilingualNeural
      } else if (lowerTag.includes('animateur') || (lowerTag.includes('journaliste') && isMale)) {
        // Radio Host / Journalist Interviewer
        voiceId = EDGE_FRENCH_VOICE_ROSTER.maleAnnouncer; // fr-FR-HenriNeural
      } else if (lowerTag.includes('alain') || lowerTag.includes('julien') || lowerTag.includes('marc') || lowerTag.includes('plombier')) {
        // Citizen Interviewees (distinct from journalist Henri)
        voiceId = EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor2; // fr-FR-RemyMultilingualNeural
      } else if (lowerTag.includes('secrétaire') || lowerTag.includes('secretaire')) {
        // Medical / Office Receptionist
        voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor2; // fr-FR-VivienneMultilingualNeural
      } else if (lowerTag.includes('mécanicien') || lowerTag.includes('mecanicien') || lowerTag.includes('chef d\'atelier')) {
        // Bicycle workshop / mechanic
        voiceId = EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor2; // fr-FR-RemyMultilingualNeural
      } else if (lowerTag.includes('voyageuse') && isCanadianText) {
        // Canadian Traveler (asking for train to Quebec)
        voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleCanadian; // fr-CA-SylvieNeural
      } else if (lowerTag.includes('annonceuse') || (isPublicStoreAnnouncement && !isMale)) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.femaleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleAnnouncer;
      } else if (lowerTag.includes('annonceur') || (isPublicStoreAnnouncement && isMale)) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.maleCanadian : EDGE_FRENCH_VOICE_ROSTER.maleAnnouncer;
      } else if (lowerTag.includes('journaliste') || lowerTag.includes('présentatrice')) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.femaleCanadian : (isMale ? EDGE_FRENCH_VOICE_ROSTER.maleLecturer : EDGE_FRENCH_VOICE_ROSTER.femaleJournalist);
      } else if (isCanadianText) {
        voiceId = isMale ? EDGE_FRENCH_VOICE_ROSTER.maleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleCanadian;
      } else if (isMale) {
        // Automatic turn-taking alternation for male voices:
        if (lastMaleVoice === EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor1) {
          voiceId = EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor2;
        } else {
          voiceId = EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor1;
        }
      } else {
        // Automatic turn-taking alternation for female voices:
        if (lastFemaleVoice === EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor1) {
          voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor2;
        } else {
          voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor1;
        }
      }

      if (isMale) {
        lastMaleVoice = voiceId;
      } else {
        lastFemaleVoice = voiceId;
      }

      segments.push({
        speakerTag,
        voiceId,
        text: segmentText,
        isAnnouncer: lowerTag.includes('annonce') || isPublicStoreAnnouncement
      });
    }
  }

  return segments;
}

/**
 * Formats numeric speakingRate into SSML prosody percentage string (e.g. 0.90 -> "-10%", 1.15 -> "+15%").
 */
export function formatEdgeRate(rate: number = 1.0): string {
  const clamped = Math.max(0.7, Math.min(1.3, rate));
  const diffPercent = Math.round((clamped - 1.0) * 100);
  return diffPercent >= 0 ? `+${diffPercent}%` : `${diffPercent}%`;
}

/**
 * Synthesizes a single segment buffer using Microsoft Azure Edge Neural TTS with retry.
 */
async function synthesizeSingleEdgeVoice(
  text: string,
  voiceId: string,
  speakingRate: number = 1.0,
  maxRetries = 3
): Promise<Buffer | null> {
  const clean = stripSpeakerLabels(text).trim();
  if (!clean) return null;

  const rateStr = formatEdgeRate(speakingRate);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await new Promise<Buffer | null>((resolve) => {
        let isDone = false;
        const timer = setTimeout(() => {
          if (!isDone) {
            isDone = true;
            console.warn(`[EdgeTTS Timeout (${voiceId}) attempt ${attempt}]`);
            resolve(null);
          }
        }, 12000);

        try {
          const tts = new MsEdgeTTS();
          tts.setMetadata(voiceId, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
            .then(() => {
              const { audioStream } = tts.toStream(clean, { rate: rateStr });
              const chunks: Buffer[] = [];

              audioStream.on('data', (chunk: Buffer) => chunks.push(chunk));
              audioStream.on('end', () => {
                if (!isDone) {
                  isDone = true;
                  clearTimeout(timer);
                  resolve(Buffer.concat(chunks));
                }
              });
              audioStream.on('error', (err: any) => {
                if (!isDone) {
                  isDone = true;
                  clearTimeout(timer);
                  console.warn(`[EdgeTTS Stream Error (${voiceId}) attempt ${attempt}]:`, err?.message || err);
                  resolve(null);
                }
              });
            })
            .catch((err: any) => {
              if (!isDone) {
                isDone = true;
                clearTimeout(timer);
                console.warn(`[EdgeTTS Metadata Error (${voiceId}) attempt ${attempt}]:`, err?.message || err);
                resolve(null);
              }
            });
        } catch (err: any) {
          if (!isDone) {
            isDone = true;
            clearTimeout(timer);
            resolve(null);
          }
        }
      });

      if (res && res.length > 500) {
        return res;
      }
    } catch (e: any) {
      if (attempt === maxRetries) console.warn('[EdgeTTS Exception]:', e?.message || e);
    }

    if (attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, 200 * attempt));
    }
  }

  return null;
}

/**
 * Intelligently resolves the most authentic studio voice for single-speaker monologues and bulletins.
 * Ensures an authentic 50/50 male-female balance and applies Canadian French where authentic.
 */
function resolveSingleSpeakerEdgeVoice(text: string, defaultGender: 'female' | 'male'): string {
  const lower = text.toLowerCase();
  const isCanadian = /\b(Montréal|Montreal|Québec|Quebec|Gatineau|Sherbrooke|Laval|Trois-Rivières|Moncton|Canada|dollar|dollars|saint-laurent)\b/i.test(text);

  // 1. Explicit Male Persona checks
  if (
    lower.includes('habitation plus') ||
    lower.includes('secrétariat des sports') ||
    lower.includes('air france 364') ||
    lower.includes('culture hebdo') ||
    lower.includes('institut de microbiologie marine') ||
    lower.includes('bien-être au travail sur radio santé') ||
    lower.includes('tendances de société') ||
    lower.includes('bulletin spécial environnement') ||
    lower.includes('brocantes de quartier') ||
    lower.includes('ah formidable ! réduire le budget') ||
    lower.includes("votre proposition témoigne d'une grande audace")
  ) {
    if (
      lower.includes('microbiologie') ||
      lower.includes('tendances') ||
      lower.includes('ah formidable')
    ) {
      return EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor2; // fr-FR-RemyMultilingualNeural (Distinct Male 2)
    }
    return EDGE_FRENCH_VOICE_ROSTER.maleAnnouncer; // fr-FR-HenriNeural (Formal Male 1)
  }

  // 2. Canadian French scenarios
  if (isCanadian) {
    if (lower.includes('garage central') || lower.includes('circuit de refroidissement')) {
      return EDGE_FRENCH_VOICE_ROSTER.maleCanadian; // fr-CA-JeanNeural (Quebec Male)
    }
    if (lower.includes('sherbrooke') || lower.includes('saint-laurent') || lower.includes('tourbières') || lower.includes('société régionale de transport')) {
      return EDGE_FRENCH_VOICE_ROSTER.femaleCanadian; // fr-CA-SylvieNeural (Quebec Female)
    }
    return defaultGender === 'male' ? EDGE_FRENCH_VOICE_ROSTER.maleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleCanadian;
  }

  // 3. Specific Female Personas
  if (
    lower.includes("c'est sophie") ||
    lower.includes('dentaire du parc') ||
    lower.includes('détartrage') ||
    lower.includes('magasin fermera ses portes') ||
    lower.includes("point sur l'économie locale") ||
    lower.includes('mobilité citoyenne') ||
    lower.includes('numérique et société') ||
    lower.includes("éducation d'avenir") ||
    lower.includes('ceintures vertes encerclant') ||
    lower.includes('numérisation des démarches administratives') ||
    lower.includes('conditions de financement étaient validées')
  ) {
    if (
      lower.includes("c'est sophie") ||
      lower.includes('dentaire') ||
      lower.includes('numérique') ||
      lower.includes('ceintures vertes') ||
      lower.includes('financement')
    ) {
      return EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor2; // fr-FR-VivienneMultilingualNeural (Young Adult Female)
    }
    return EDGE_FRENCH_VOICE_ROSTER.femaleAnnouncer; // fr-FR-DeniseNeural (Mature Female)
  }

  return defaultGender === 'male' ? EDGE_FRENCH_VOICE_ROSTER.maleAnnouncer : EDGE_FRENCH_VOICE_ROSTER.femaleAnnouncer;
}

/**
 * Generates high-fidelity Multi-Speaker Studio Audio for a complete French exam question.
 */
export async function generateEdgeNeuralAudio(
  text: string,
  defaultGender: 'female' | 'male' = 'female',
  lang: string = 'fr',
  speakingRate: number = 1.0,
  targetVoiceId?: string,
  isSpeakingTask: boolean = false
): Promise<{ audioBase64: string; contentType: string; provider: string } | null> {
  const cleanText = stripSpeakerLabels(text).trim();
  if (!cleanText) return null;

  // Use explicit targetVoiceId if provided, otherwise resolve authentic single-speaker persona
  const assignedVoiceId = targetVoiceId || resolveSingleSpeakerEdgeVoice(text, defaultGender);

  // Check if text explicitly contains multi-speaker dialogue lines
  const hasMultipleSpeakerTags = /(?:^|\n)\s*([A-ZÀ-ÖØ-ß][a-zA-ZÀ-ÿ0-9\s.'’\(\)\/\-–—]{1,45})\s*[:—–]/m.test(text) &&
    (text.includes('\n') || (text.match(/[:—–]/g) || []).length >= 2);

  if (isSpeakingTask || targetVoiceId || !hasMultipleSpeakerTags) {
    const buffer = await synthesizeSingleEdgeVoice(cleanText, assignedVoiceId, speakingRate);
    if (buffer && buffer.length > 0) {
      return {
        audioBase64: buffer.toString('base64'),
        contentType: 'audio/mp3',
        provider: `edge-neural-${assignedVoiceId}`
      };
    }
    return null;
  }

  const segments = parseEdgeDialogueSegments(text, defaultGender);
  if (segments.length === 1) {
    const seg = segments[0];
    const buffer = await synthesizeSingleEdgeVoice(seg.text, targetVoiceId || seg.voiceId, speakingRate);
    if (buffer && buffer.length > 0) {
      return {
        audioBase64: buffer.toString('base64'),
        contentType: 'audio/mp3',
        provider: `edge-neural-${targetVoiceId || seg.voiceId}`
      };
    }
    return null;
  }

  // Sequential multi-speaker synthesis: synthesize each dialogue turn with trailing pause for natural flow
  const turnBuffers: Buffer[] = [];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const turnSpeech = seg.text + (i < segments.length - 1 ? ' ... ' : '');
    const buf = await synthesizeSingleEdgeVoice(turnSpeech, seg.voiceId, speakingRate);
    if (buf && buf.length > 0) {
      turnBuffers.push(buf);
    }
    if (i < segments.length - 1) {
      await new Promise((r) => setTimeout(r, 80));
    }
  }

  if (turnBuffers.length === segments.length) {
    const stitched = stitchMp3Buffers(turnBuffers);
    return {
      audioBase64: stitched.toString('base64'),
      contentType: 'audio/mp3',
      provider: 'edge-neural-multi-voice'
    };
  }

  // If one segment failed, return whatever turns succeeded or fallback
  if (turnBuffers.length > 0) {
    const stitched = Buffer.concat(turnBuffers);
    return {
      audioBase64: stitched.toString('base64'),
      contentType: 'audio/mp3',
      provider: 'edge-neural-multi-voice'
    };
  }

  return null;
}
