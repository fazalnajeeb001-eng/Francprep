import { generateEdgeNeuralAudio, parseEdgeDialogueSegments } from '../services/edgeTts.service';
import { stripSpeakerLabels } from '../services/tts.service';

async function runTest() {
  console.log('=== TEST 1: Universal stripSpeakerLabels ===');
  const sample1 = "Voyageuse : Bonjour monsieur, excusez-moi, est-ce que le train pour Québec part bien de la voie 4 ?\nAgent : Bonjour madame.";
  const clean1 = stripSpeakerLabels(sample1);
  console.log('Original:\n', sample1);
  console.log('Cleaned:\n', clean1);

  console.log('\n=== TEST 2: parseEdgeDialogueSegments for Q1 ===');
  const segments1 = parseEdgeDialogueSegments(sample1);
  console.log('Segments count:', segments1.length);
  segments1.forEach((s, i) => {
    console.log(`[Turn ${i + 1}] Speaker: "${s.speakerTag}" | Voice: ${s.voiceId} | Spoken: "${s.text}"`);
  });

  console.log('\n=== TEST 3: parseEdgeDialogueSegments for Q16 (Student / Soraya) ===');
  const sample16 = "Journaliste : Mademoiselle, est-ce une avancée selon vous ?\nSoraya : Évidemment que c'est positif, mais soyons lucides : attendre 2030 relève de la timidité politique coupable.";
  const segments16 = parseEdgeDialogueSegments(sample16);
  segments16.forEach((s, i) => {
    console.log(`[Turn ${i + 1}] Speaker: "${s.speakerTag}" | Voice: ${s.voiceId} | Spoken: "${s.text}"`);
  });

  console.log('\n=== TEST 4: Synthesize Multi-Voice Audio for Q1 ===');
  const res1 = await generateEdgeNeuralAudio(sample1);
  if (res1 && res1.audioBase64) {
    const byteLength = Buffer.from(res1.audioBase64, 'base64').length;
    console.log(`✓ Q1 Audio Synthesized Successfully! Provider: ${res1.provider}, Size: ${byteLength} bytes.`);
  } else {
    console.error('✗ Q1 Synthesis Failed!');
  }
}

runTest().then(() => console.log('\nTest complete!')).catch(console.error);
