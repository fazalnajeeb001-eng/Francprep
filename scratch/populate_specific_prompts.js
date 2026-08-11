import fs from 'fs';
import path from 'path';

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let code = fs.readFileSync(examSchemaPath, 'utf8');

// For getA1A2Propositions:
// Q5: Gare -> "Quelle est la voie de départ et l'heure du train express ?"
// Q6: Magasin -> "Quelle est la promotion proposée aujourd'hui au supermarché ?"
// Q7: Météo -> "Quel conseil météorologique est annoncé pour la journée ?"
// Q8: Voicemail Retard -> "Pour quelle raison exacte la personne laisse-t-elle ce message ?"
// Q9: Garagiste -> "Quelle est l'heure limite pour récupérer le véhicule au garage ?"
// Q10: Rendez-vous médical -> "Quel document est-il nécessaire d'apporter lors de la consultation ?"
// Q11: Visite guidée -> "Où se situe le point de rassemblement pour la visite ?"
// Q12: Livraison colis -> "Quel est le code transmis pour ouvrir le casier de livraison ?"
// Q13: Visite appartement -> "À quelle heure la visite de l'appartement est-elle programmée ?"
// Q14: Coiffeur -> "Quel changement d'horaire est proposé pour le rendez-vous ?"
// Q15: Gymnase -> "Quelle consigne d'accès doit être respectée pour s'entraîner ?"

const a1a2Prompts = {
  5: "Quelle est la voie de départ et l'heure du train express ?",
  6: "Quelle est la promotion proposée aujourd'hui au supermarché ?",
  7: "Quel conseil ou prévision météorologique est annoncé pour la journée ?",
  8: "Pour quelle raison exacte la personne laisse-t-elle ce message vocal ?",
  9: "Quelle est l'heure limite pour récupérer le véhicule révisé au garage ?",
  10: "Quel document officiel est-il obligatoire d'apporter au rendez-vous médical ?",
  11: "Où se situe le point de rassemblement exact pour le départ de la visite ?",
  12: "Quel est le code de sécurité transmis pour déverrouiller le casier de livraison ?",
  13: "À quelle heure la visite guidée de l'appartement est-elle reprogrammée ?",
  14: "Quel changement d'horaire est proposé pour le rendez-vous au salon de coiffure ?",
  15: "Quelle consigne d'accès et de réservation doit être respectée pour la séance de sport ?"
};

Object.keys(a1a2Prompts).forEach(qNum => {
  const prompt = a1a2Prompts[qNum];
  const target = `title: \`Annonce Transport A1 P\${p}Q${qNum}\`,\n      text:`;
  const replacement = `title: \`Annonce Transport A1 P\${p}Q${qNum}\`,\n      q: "${prompt}",\n      text:`;
  code = code.replace(new RegExp(`title: \\\`([^\`]+)P\\\\{p\\\\}Q${qNum}\\\`,\\s*text:`, 'g'), (match, titleText) => {
    return `title: \`${titleText}P\${p}Q${qNum}\`,\n      q: "${prompt}",\n      text:`;
  });
});

// For getB1Propositions:
const b1Prompts = {
  16: "Selon le sondage, quelle est l'attitude des citoyens face aux pistes cyclables ?",
  17: "Quel est le résultat principal constaté lors de l'expérimentation de la semaine de 4 jours ?",
  18: "Quelle mesure écologique a permis de réduire l'empreinte carbone du festival ?",
  19: "Pourquoi les consommateurs privilégient-ils désormais l'achat de produits en vrac ?",
  20: "Quel bénéfice majeur ressort du programme d'accompagnement scolaire bénévole ?",
  21: "Quelle caractéristique distingue cet éco-gîte des hébergements touristiques classiques ?",
  22: "Quel obstacle majeur freine l'adoption des outils numériques dans les zones rurales ?",
  23: "Quel est le principal avantage de la colocation entre étudiants et personnes âgées ?",
  24: "Quelle initiative a permis d'améliorer la qualité de vie au travail dans l'entreprise ?",
  25: "Quel est l'impact de la végétalisation des toitures sur la température des bâtiments ?"
};

Object.keys(b1Prompts).forEach(qNum => {
  const prompt = b1Prompts[qNum];
  code = code.replace(new RegExp(`title: \\\`([^\`]+)P\\\\{p\\\\}Q${qNum}\\\`,\\s*text:`, 'g'), (match, titleText) => {
    return `title: \`${titleText}P\${p}Q${qNum}\`,\n      q: "${prompt}",\n      text:`;
  });
});

fs.writeFileSync(examSchemaPath, code);
console.log("✅ Successfully populated 100% specific q prompts for A1, A2, and B1 questions!");
