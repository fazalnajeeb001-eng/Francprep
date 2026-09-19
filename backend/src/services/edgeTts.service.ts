import crypto from 'crypto';

if (typeof (globalThis as any).crypto === 'undefined') {
  (globalThis as any).crypto = (crypto as any).webcrypto || crypto;
}

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { stripSpeakerLabels } from './tts.service';

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
      const isExplicitChild = lowerTag.includes('enfant') || lowerTag.includes('fillette') || lowerTag.includes('ado') || 
                              lowerTag.includes('soraya') || lowerTag.includes('étudiante') || lowerTag.includes('etudiante');

      const isFemaleKeyword = [
        'femme', 'locutrice', 'voyageuse', 'cliente', 'patiente', 'passagère', 'passagere', 
        'boulangère', 'boulangere', 'secrétaire', 'secretaire', 'hôtesse', 'hotesse', 
        'auditrice', 'annonceuse', 'animatrice', 'directrice', 'médiatrice', 'mediatrice',
        'chroniqueuse', 'négociatrice', 'negociatrice', 'soraya', 'élodie', 'elodie', 'martine',
        'madame', 'fille', 'fillette', 'retraitée', 'retraitee', 'étudiante', 'etudiante'
      ].some(kw => lowerTag.includes(kw));

      const isMaleKeyword = [
        'homme', 'locuteur', 'voyageur', 'client', 'patient', 'passager', 'agent',
        'mécanicien', 'mecanicien', 'médecin', 'medecin', 'docteur', 'garagiste',
        'chef', 'artisan', 'plombier', 'alain', 'laurent', 'maxime', 'vasseur',
        'journaliste', 'animateur', 'directeur', 'professeur', 'auditeur', 'monsieur',
        'diplomate', 'fonctionnaire', 'collègue', 'collegue', 'expert', 'météorologue', 'meteorologue'
      ].some(kw => lowerTag.includes(kw));

      const isMale = isMaleKeyword ? true : (isFemaleKeyword ? false : !lastAssignedMale);
      lastAssignedMale = isMale;

      let voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor1;

      if (isExplicitChild) {
        voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleChild;
      } else if (lowerTag.includes('annonceuse') || (isPublicStoreAnnouncement && !isMale)) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.femaleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleAnnouncer;
      } else if (lowerTag.includes('annonceur') || (isPublicStoreAnnouncement && isMale)) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.maleCanadian : EDGE_FRENCH_VOICE_ROSTER.maleAnnouncer;
      } else if (lowerTag.includes('journaliste') || lowerTag.includes('présentatrice')) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.femaleCanadian : (isMale ? EDGE_FRENCH_VOICE_ROSTER.maleLecturer : EDGE_FRENCH_VOICE_ROSTER.femaleJournalist);
      } else if (lowerTag.includes('professeur') || lowerTag.includes('intervenant') || lowerTag.includes('docteur') || lowerTag.includes('vasseur')) {
        voiceId = EDGE_FRENCH_VOICE_ROSTER.maleLecturer;
      } else if (isCanadianText) {
        voiceId = isMale ? EDGE_FRENCH_VOICE_ROSTER.maleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleCanadian;
      } else if (isMale) {
        voiceId = EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor1;
      } else {
        voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor1;
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
 * Synthesizes a single segment buffer using Microsoft Azure Edge Neural TTS with retry.
 */
async function synthesizeSingleEdgeVoice(text: string, voiceId: string, maxRetries = 3): Promise<Buffer | null> {
  const clean = stripSpeakerLabels(text).trim();
  if (!clean) return null;

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
              const { audioStream } = tts.toStream(clean);
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

  // Use explicit targetVoiceId if provided, otherwise lock voice strictly based on defaultGender
  const assignedVoiceId = targetVoiceId || (defaultGender === 'male' ? EDGE_FRENCH_VOICE_ROSTER.maleAnnouncer : EDGE_FRENCH_VOICE_ROSTER.femaleAnnouncer);

  // Check if text explicitly contains multi-speaker dialogue lines
  const hasMultipleSpeakerTags = /(?:^|\n)\s*([A-ZÀ-ÖØ-ß][a-zA-ZÀ-ÿ0-9\s.'’\(\)\/\-–—]{1,45})\s*[:—–]/m.test(text) &&
    (text.includes('\n') || (text.match(/[:—–]/g) || []).length >= 2);

  if (isSpeakingTask || targetVoiceId || !hasMultipleSpeakerTags) {
    const buffer = await synthesizeSingleEdgeVoice(cleanText, assignedVoiceId);
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
    const buffer = await synthesizeSingleEdgeVoice(seg.text, targetVoiceId || seg.voiceId);
    if (buffer && buffer.length > 0) {
      return {
        audioBase64: buffer.toString('base64'),
        contentType: 'audio/mp3',
        provider: `edge-neural-${targetVoiceId || seg.voiceId}`
      };
    }
    return null;
  }

  // Parallel multi-speaker synthesis: synthesize each dialogue turn with trailing pause for natural flow
  const results = await Promise.all(
    segments.map((seg, idx) => {
      const turnSpeech = seg.text + (idx < segments.length - 1 ? ' ... ' : '');
      return synthesizeSingleEdgeVoice(turnSpeech, seg.voiceId);
    })
  );

  const turnBuffers: Buffer[] = [];
  for (const buf of results) {
    if (buf && buf.length > 0) {
      turnBuffers.push(buf);
    }
  }

  if (turnBuffers.length === segments.length) {
    const stitched = Buffer.concat(turnBuffers);
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
