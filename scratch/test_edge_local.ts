import WebSocket from 'ws';
import crypto from 'crypto';

function testEdgeDirect() {
  return new Promise((resolve) => {
    const text = "Bonjour, bienvenue à l'épreuve d'expression orale du TCF Canada.";
    const voiceId = "fr-FR-DeniseNeural";
    const reqId = crypto.randomBytes(16).toString('hex');
    const wsUrl = 'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EA634949956C97A4F10F233B';

    console.log('Connecting to Edge TTS WebSocket...');
    const ws = new WebSocket(wsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
        'Origin': 'chrome-extension://jdiccldimpdaibhpobmlijgahbpljiic',
      },
    });

    const audioChunks: Buffer[] = [];

    ws.on('open', () => {
      console.log('WebSocket Connected!');
      const dateStr = new Date().toString();
      const configMsg = `X-Timestamp:${dateStr}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`;
      ws.send(configMsg);

      const ssmlMsg = `X-RequestId:${reqId}\r\nContent-Type:application/ssml+xml\r\nPath:ssml\r\n\r\n<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='fr-FR'><voice name='${voiceId}'><lang xml:lang='fr-FR'>${text}</lang></voice></speak>`;
      ws.send(ssmlMsg);
    });

    ws.on('message', (data: WebSocket.Data, isBinary: boolean) => {
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
          console.log('SUCCESS! Path:turn.end received!');
          ws.close();
          const totalBuffer = Buffer.concat(audioChunks);
          console.log('Total Audio Buffer Length (bytes):', totalBuffer.length);
          resolve(totalBuffer);
        }
      }
    });

    ws.on('error', (err) => console.log('WS Error:', err));
    ws.on('close', () => console.log('WS Closed'));
  });
}

testEdgeDirect();
