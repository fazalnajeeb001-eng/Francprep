async function testProductionTts() {
  const prodUrl = 'https://francprep-production.up.railway.app/api/tts/speak';
  console.log("Testing production Railway API:", prodUrl);

  try {
    const res = await fetch(prodUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: "Bonjour ! Bienvenue à l'épreuve de compréhension orale du TCF Canada.",
        gender: "female",
        lang: "fr",
        speakingRate: 0.95
      })
    });

    console.log("Status:", res.status);
    const json = await res.json();
    console.log("Full JSON Response:", json);
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

testProductionTts();
