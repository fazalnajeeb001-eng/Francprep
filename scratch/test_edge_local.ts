import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

async function testLocalEdge() {
  try {
    console.log('Testing MsEdgeTTS locally...');
    const tts = new MsEdgeTTS();
    await tts.setMetadata('fr-FR-DeniseNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    console.log('Metadata set successfully!');
    const { audioStream } = tts.toStream('Bonjour bienvenue à l\'épreuve d\'expression orale du TCF Canada.');
    const chunks: Buffer[] = [];
    audioStream.on('data', (chunk: Buffer) => chunks.push(chunk));
    audioStream.on('end', () => {
      const buf = Buffer.concat(chunks);
      console.log('Success! Buffer length:', buf.length);
    });
    audioStream.on('error', (err: any) => console.log('AudioStream Error:', err));
  } catch (err: any) {
    console.log('Catch Error:', err?.message || err);
  }
}

testLocalEdge();
