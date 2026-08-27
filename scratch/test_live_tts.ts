import axios from 'axios';

async function testHealthBody() {
  try {
    const res = await axios.get('https://francprep-backend.railway.app/health');
    console.log('Response body:', res.data);
  } catch (err: any) {
    console.log('Error:', err?.message);
  }
}

testHealthBody();
