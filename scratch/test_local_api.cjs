const axios = require('axios');

async function testLocalApi() {
  try {
    const res = await axios.post('http://localhost:5000/api/tts/speak', {
      text: "Annonceuse: Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\n... Proposition A : Pardon monsieur, à quelle heure arrive le train sur ce quai ?.\n... Proposition B : L'addition s'il vous plaît, nous allons régler par carte bancaire..\n... Proposition C : Où se trouvent les cabines d'essayage pour essayer ce pantalon ?.\n... Proposition D : Deux places pour la séance de vingt heures, s'il vous plaît..",
      gender: "female",
      lang: "fr",
      speakingRate: 0.85
    });

    console.log('HTTP Status:', res.status);
    console.log('Success:', res.data.success);
    if (res.data.data) {
      console.log('Provider:', res.data.data.provider);
      console.log('Audio Base64 Length:', res.data.data.audioUrl ? res.data.data.audioUrl.length : 0);
    } else {
      console.log('Response Payload:', res.data);
    }
  } catch (err) {
    console.error('API Test Error:', err.message);
  }
}

testLocalApi();
