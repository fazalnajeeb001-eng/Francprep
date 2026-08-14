import axios from "axios";

async function testTTS() {
  console.log("=== 🔬 TESTING LIVE BACKEND TTS ENDPOINT ===");

  const urls = [
    "https://francprep-production.up.railway.app/api/tts/speak",
    "http://localhost:5000/api/tts/speak"
  ];

  for (const url of urls) {
    console.log(`\nTesting: ${url}`);
    try {
      const res = await axios.post(
        url,
        {
          text: "Bonjour, ceci est un test audio.",
          gender: "female",
          speaker: "Locutrice",
          lang: "fr",
          rate: 1.0
        },
        { timeout: 10000 }
      );
      console.log(`✅ Status: ${res.status}`);
      console.log("Response:", {
        success: res.data?.success,
        provider: res.data?.data?.provider,
        hasAudioUrl: Boolean(res.data?.data?.audioUrl),
        audioUrlLength: res.data?.data?.audioUrl?.length,
        fallbackActive: res.data?.data?.fallbackActive
      });
    } catch (err: any) {
      console.log(`❌ Failed:`, err?.message, err?.response?.data || "");
    }
  }
}

testTTS();
