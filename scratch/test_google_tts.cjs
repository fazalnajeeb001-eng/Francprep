async function testGoogleTts() {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent("Bonjour et bienvenue")}&tl=fr&client=tw-ob`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  console.log("Status:", res.status);
  const buffer = await res.arrayBuffer();
  console.log("Buffer byte length:", buffer.byteLength);
}

testGoogleTts();
