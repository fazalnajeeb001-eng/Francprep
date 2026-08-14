const https = require("https");

async function testLiveRailwayTTS() {
  console.log("=== 🚀 TESTING PRODUCTION RAILWAY MULTI-VOICE STITCHED SYNTHESIS ===");

  const postData = JSON.stringify({
    text: "Locuteur 1 : Est-ce que tu as envoyé le rapport de synthèse ?\nLocutrice 2 : Oui, il est parti ce matin par courriel.\nAnnonceur : Question N°18 : Que confirme l'employée ?",
    gender: "female",
    speakingRate: 1.0
  });

  const req = https.request({
    hostname: "francprep-production.up.railway.app",
    path: "/api/tts/speak",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData)
    }
  }, (res) => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => {
      try {
        const json = JSON.parse(data);
        console.log("Response Status:", res.statusCode);
        console.log("Success:", json?.success);
        console.log("Provider:", json?.data?.provider);
        console.log("Audio URL Length:", json?.data?.audioUrl?.length);
        if (json?.data?.audioUrl) {
          const base64Data = json.data.audioUrl.split(',')[1];
          const buf = Buffer.from(base64Data, 'base64');
          console.log(`🎉 Live Stitched MP3 Size: ${buf.length} bytes`);
        }
      } catch (err) {
        console.log("Raw Response:", data.slice(0, 200));
      }
    });
  });

  req.on("error", (e) => console.error("Error:", e.message));
  req.write(postData);
  req.end();
}

testLiveRailwayTTS();
