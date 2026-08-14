function parseDialogueSegments(text, defaultGender = 'male') {
  const clean = text.trim();
  const segments = [];

  // Split lines or speaker blocks
  const speakerRegex = /(?:^|\n)\s*(Locuteur\s*\d*|Locutrice\s*\d*|Homme\s*\d*|Femme\s*\d*|Annonceur|Annonceuse|Journaliste|Intervenant(?:e)?)\s*:\s*/gi;

  const matches = [...clean.matchAll(speakerRegex)];

  if (matches.length === 0) {
    // Single speaker passage
    return [{ speakerTag: defaultGender === 'male' ? 'Locuteur' : 'Locutrice', text: clean }];
  }

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const rawTag = currentMatch[1].trim();
    const startIndex = currentMatch.index + currentMatch[0].length;
    const endIndex = (i + 1 < matches.length) ? matches[i + 1].index : clean.length;

    const segmentText = clean.slice(startIndex, endIndex).trim();

    if (segmentText.length > 0) {
      segments.push({
        speakerTag: rawTag,
        text: segmentText
      });
    }
  }

  return segments;
}

const test1 = `Locuteur 1 : Bonjour madame, je cherche la gare.
Locutrice 2 : C'est tout droit après le carrefour.
Locuteur 1 : Merci beaucoup !
Annonceuse : Question N°6 : Où se trouve la gare ?
... A : À côté du musée.
... B : Après le carrefour.
... C : Près de la mairie.
... D : En face du parc.`;

console.log("=== Testing Multi-Turn Dialogue Parser ===");
const parsed = parseDialogueSegments(test1);
console.log(`Parsed ${parsed.length} distinct speaker turns:`);
parsed.forEach((p, idx) => {
  console.log(`Turn ${idx + 1} [${p.speakerTag}]: "${p.text}"`);
});

const containsRawTag = parsed.some(p => /^(Locuteur|Locutrice|Annonceur|Annonceuse)\s*:/i.test(p.text));
console.log(`Any speaker labels leaked into spoken text: ${containsRawTag ? "🚨 LEAK" : "✅ NONE (CLEAN)"}`);
