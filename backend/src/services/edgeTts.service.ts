import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import crypto from 'crypto';
import { stripSpeakerLabels } from './tts.service';

/**
 * Full 8-Voice Studio Roster for TCF Canada & Official French Exams:
 */
export const EDGE_FRENCH_VOICE_ROSTER = {
  // Official Test Announcers & Certified FEI Examiners
  femaleAnnouncer: 'fr-FR-DeniseNeural',                // Formal, mature adult Parisian female examiner
  maleAnnouncer: 'fr-FR-HenriNeural',                   // Formal, mature adult Parisian male examiner
  
  // Conversational Interlocutors (Certified FEI Examiners)
  femaleInterlocutor1: 'fr-FR-DeniseNeural',             // Warm, natural adult French female examiner
  maleInterlocutor1: 'fr-FR-HenriNeural',                // Warm, natural adult French male examiner
  
  // Media / Academic Broadcasters
  femaleJournalist: 'fr-FR-DeniseNeural',                // Expressive adult host
  maleLecturer: 'fr-FR-HenriNeural',                     // Academic lecturer male
  
  // Authentic Canadian French (Quebec / Montreal Adults)
  femaleCanadian: 'fr-CA-SylvieNeural',                   // Authentic adult Montreal woman
  maleCanadian: 'fr-CA-JeanNeural',                       // Authentic adult Quebec male speaker

  // Youth / Child (Strictly reserved for explicit child dialogues)
  femaleChild: 'fr-FR-EloiseNeural',                      // Young girl / teenager
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

  const speakerRegex = /(?:^|\n)\s*(Locuteur\s*\d*|Locutrice\s*\d*|Homme\s*\d*|Femme\s*\d*|Annonceur|Annonceuse|Journaliste|Intervenant(?:e)?|Professeur|Enfant|Fillette)\s*:\s*/gi;
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

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const speakerTag = currentMatch[1].trim();
    const startIndex = currentMatch.index! + currentMatch[0].length;
    const endIndex = (i + 1 < matches.length) ? matches[i + 1].index! : clean.length;
    const segmentText = stripSpeakerLabels(clean.slice(startIndex, endIndex).trim());

    if (segmentText) {
      const lowerTag = speakerTag.toLowerCase();
      const lowerText = segmentText.toLowerCase();

      // Check contextual clues
      const isCanadianText = /\b(Montréal|Québec|Gatineau|Sherbrooke|Laval|Trois-Rivières|Moncton|Canada|dollar)\b/i.test(segmentText);
      const isPublicStoreAnnouncement = /\b(annonce supermarché|annonce gare|annonce magasin|annonce aéroport|avis à la clientèle|offre spéciale|bulletin météo)\b/i.test(lowerText);
      const isExplicitChild = lowerTag.includes('enfant') || lowerTag.includes('fillette') || lowerTag.includes('ado');

      let voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor1;

      if (isExplicitChild) {
        voiceId = EDGE_FRENCH_VOICE_ROSTER.femaleChild;
      } else if (lowerTag.includes('annonceuse') || (isPublicStoreAnnouncement && !lowerTag.includes('homme') && !lowerTag.includes('locuteur'))) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.femaleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleAnnouncer;
      } else if (lowerTag.includes('annonceur') || (isPublicStoreAnnouncement && (lowerTag.includes('homme') || lowerTag.includes('locuteur')))) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.maleCanadian : EDGE_FRENCH_VOICE_ROSTER.maleAnnouncer;
      } else if (lowerTag.includes('journaliste') || lowerTag.includes('présentatrice')) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.femaleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleJournalist;
      } else if (lowerTag.includes('professeur') || lowerTag.includes('intervenant')) {
        voiceId = EDGE_FRENCH_VOICE_ROSTER.maleLecturer;
      } else if (lowerTag.includes('locutrice 2') || lowerTag.includes('femme 2')) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.femaleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleAnnouncer;
      } else if (lowerTag.includes('locuteur 2') || lowerTag.includes('homme 2')) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.maleCanadian : EDGE_FRENCH_VOICE_ROSTER.maleLecturer;
      } else if (lowerTag.includes('locuteur') || lowerTag.includes('homme')) {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.maleCanadian : EDGE_FRENCH_VOICE_ROSTER.maleInterlocutor1;
      } else {
        voiceId = isCanadianText ? EDGE_FRENCH_VOICE_ROSTER.femaleCanadian : EDGE_FRENCH_VOICE_ROSTER.femaleInterlocutor1;
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
import WebSocket from 'ws';

/**
 * Direct WebSocket synthesis using official Microsoft Edge TTS headers for 100% cloud reliability on Railway.
 */
async function synthesizeEdgeDirectWebSocket(text: string, voiceId: string, timeoutMs = 8000): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const clean = stripSpeakerLabels(text).trim();
    if (!clean) return resolve(null);

    let finished = false;
    const reqId = crypto.randomBytes(16).toString('hex');
    const wsUrl = 'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EA634949956C97A4F10F233B';

    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
          'Origin': 'chrome-extension://jdiccldimpdaibhpobmlijgahbpljiic',
        },
      });
    } catch {
      return resolve(null);
    }

    const timer = setTimeout(() => {
      if (!finished) {
        finished = true;
        try { ws.close(); } catch {}
        resolve(null);
      }
    }, timeoutMs);

    const audioChunks: Buffer[] = [];

    ws.on('open', () => {
      const configMsg = `Path: speech.config\r\nContent-Type: application/json; charset=utf-8\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`;
      ws.send(configMsg);

      const ssmlMsg = `Path: ssml\r\nX-RequestId: ${reqId}\r\nContent-Type: application/ssml+xml\r\n\r\n<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='fr-FR'><voice name='${voiceId}'><lang xml:lang='fr-FR'>${clean}</lang></voice></speak>`;
      ws.send(ssmlMsg);
    });

    ws.on('message', (data: WebSocket.Data, isBinary: boolean) => {
      if (finished) return;
      if (isBinary && Buffer.isBuffer(data)) {
        if (data.length > 2) {
          const headerLen = data.readUInt16BE(0);
          if (data.length > 2 + headerLen) {
            const payload = data.slice(2 + headerLen);
            if (payload.length > 0) {
              audioChunks.push(payload);
            }
          }
        }
      } else if (typeof data === 'string' || Buffer.isBuffer(data)) {
        const textStr = data.toString('utf-8');
        if (textStr.includes('Path:turn.end')) {
          finished = true;
          clearTimeout(timer);
          try { ws.close(); } catch {}
          if (audioChunks.length > 0) {
            resolve(Buffer.concat(audioChunks));
          } else {
            resolve(null);
          }
        }
      }
    });

    ws.on('error', () => {
      if (!finished) {
        finished = true;
        clearTimeout(timer);
        try { ws.close(); } catch {}
        resolve(null);
      }
    });

    ws.on('close', () => {
      if (!finished) {
        finished = true;
        clearTimeout(timer);
        if (audioChunks.length > 0) {
          resolve(Buffer.concat(audioChunks));
        } else {
          resolve(null);
        }
      }
    });
  });
}

/**
 * Synthesizes a single segment buffer using Microsoft Azure Edge Neural TTS with retry.
 */
async function synthesizeSingleEdgeVoice(text: string, voiceId: string, maxRetries = 3): Promise<Buffer | null> {
  const clean = stripSpeakerLabels(text).trim();
  if (!clean) return null;

  // Primary Engine: Direct Edge Neural WebSocket with official browser headers
  const directBuf = await synthesizeEdgeDirectWebSocket(clean, voiceId);
  if (directBuf && directBuf.length > 500) {
    return directBuf;
  }

  // Fallback Engine: MsEdgeTTS library retry loop
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await new Promise<Buffer | null>((resolve) => {
        const tts = new MsEdgeTTS();
        tts.setMetadata(voiceId, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
          .then(() => {
            const { audioStream } = tts.toStream(clean);
            const chunks: Buffer[] = [];

            audioStream.on('data', (chunk: Buffer) => chunks.push(chunk));
            audioStream.on('end', () => resolve(Buffer.concat(chunks)));
            audioStream.on('error', (err: any) => {
              if (attempt === maxRetries) {
                console.warn(`[EdgeTTS Error (${voiceId}) attempt ${attempt}]:`, err?.message || err);
              }
              resolve(null);
            });
          })
          .catch((err: any) => {
            if (attempt === maxRetries) {
              console.warn(`[EdgeTTS Metadata Error (${voiceId}) attempt ${attempt}]:`, err?.message || err);
            }
            resolve(null);
          });
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
  speakingRate: number = 1.0
): Promise<{ audioBase64: string; contentType: string; provider: string } | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  const segments = parseEdgeDialogueSegments(cleanText, defaultGender);

  if (segments.length === 1) {
    const seg = segments[0];
    const buffer = await synthesizeSingleEdgeVoice(seg.text, seg.voiceId);
    if (buffer && buffer.length > 0) {
      return {
        audioBase64: buffer.toString('base64'),
        contentType: 'audio/mp3',
        provider: `edge-neural-${seg.voiceId}`
      };
    }
    return null;
  }

  // Parallel multi-speaker synthesis: synthesize each dialogue turn concurrently
  const results = await Promise.all(
    segments.map(seg => synthesizeSingleEdgeVoice(seg.text, seg.voiceId))
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
