const fs = require('fs');
const path = require('path');

// Read listening_transcripts.json or test papers
const transcriptsPath = path.join(__dirname, '../backend/src/data/listening_transcripts.json');
if (fs.existsSync(transcriptsPath)) {
  const data = JSON.parse(fs.readFileSync(transcriptsPath, 'utf8'));
  console.log("Transcripts keys count:", Object.keys(data).length);
} else {
  console.log("Transcripts file not found at:", transcriptsPath);
}
