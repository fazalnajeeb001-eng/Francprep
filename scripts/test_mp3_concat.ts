import axios from 'axios';
import mongoose from 'mongoose';

async function testConcat() {
  const MONGO_URI = 'mongodb+srv://user_antigravity:Pass123456@francprep.qwpghaf.mongodb.net/test?retryWrites=true&w=majority&appName=Francprep';
  await mongoose.connect(MONGO_URI);
  const settings = await mongoose.connection.db?.collection('settings').findOne({});
  const apiKey = settings?.elevenLabsApiKey;
  console.log('ElevenLabs API Key found:', apiKey ? `${apiKey.slice(0, 8)}...` : 'NONE');

  if (!apiKey) return;

  const text1 = "Locuteur : Bonjour madame, je cherche la gare.";
  const text2 = "Annonceuse : Question N°5 : Où se rend cette personne ?";

  console.log("Synthesizing Part 1...");
  const res1 = await axios.post(
    'https://api.elevenlabs.io/v1/text-to-speech/ONwBz21w4p8b7X1s5kL0',
    { text: text1, model_id: 'eleven_multilingual_v2' },
    { headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' }, responseType: 'arraybuffer' }
  );

  console.log("Synthesizing Part 2...");
  const res2 = await axios.post(
    'https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL',
    { text: text2, model_id: 'eleven_multilingual_v2' },
    { headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' }, responseType: 'arraybuffer' }
  );

  const buf1 = Buffer.from(res1.data);
  const buf2 = Buffer.from(res2.data);

  console.log(`Buffer 1 size: ${buf1.length} bytes, Header:`, buf1.slice(0, 10));
  console.log(`Buffer 2 size: ${buf2.length} bytes, Header:`, buf2.slice(0, 10));

  function getAudioFrameOffset(buf: Buffer): number {
    if (buf.slice(0, 3).toString() === 'ID3') {
      const b0 = buf[6], b1 = buf[7], b2 = buf[8], b3 = buf[9];
      const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
      const audioStart = 10 + tagSize;
      console.log(`ID3 header detected, tagSize: ${tagSize}, audio starts at byte ${audioStart}`);
      return audioStart;
    }
    return 0;
  }

  const offset1 = getAudioFrameOffset(buf1);
  const offset2 = getAudioFrameOffset(buf2);

  // If we strip ID3 from part 2:
  const audio2Only = buf2.slice(offset2);
  console.log(`Audio 2 without ID3: ${audio2Only.length} bytes, starts with:`, audio2Only.slice(0, 4));

  // Find MP3 sync word (0xFF 0xFB or 0xFF 0xF3 or 0xFF 0xF2)
  let syncIndex = -1;
  for (let i = 0; i < audio2Only.length - 1; i++) {
    if (audio2Only[i] === 0xFF && (audio2Only[i + 1] & 0xE0) === 0xE0) {
      syncIndex = i;
      break;
    }
  }
  console.log(`First MPEG Sync Word in Part 2 found at offset: ${syncIndex}`);

  await mongoose.disconnect();
}

testConcat().catch(console.error);
