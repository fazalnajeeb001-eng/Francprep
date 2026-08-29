import axios from 'axios';

async function testSpeakingStream() {
  try {
    const url = 'https://francprep-production.up.railway.app/api/speaking/stream?text=Bonjour&gender=female';
    console.log('Fetching stream from:', url);
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    console.log('Status:', res.status);
    console.log('Content-Type:', res.headers['content-type']);
    console.log('Buffer length (bytes):', res.data.length);
  } catch (err: any) {
    console.log('Stream Error:', err?.response?.status, err?.response?.data?.toString() || err?.message);
  }
}

testSpeakingStream();
