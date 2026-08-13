import fs from 'fs';

console.log("=== 🎧 ENRICHING 390 LISTENING PASSAGES IN examSchema.ts TO FEI CBT BENCHMARKS ===");

let content = fs.readFileSync('src/lib/examSchema.ts', 'utf8');

// Enrich B1 passage texts to 65-85 words (~30-45s audio)
content = content.replace(
  /text:\s*`Selon un récent sondage réalisé à \${city}, l'aménagement de nouvelles pistes cyclables sécurisées et l'extension des voies réservées aux bus rencontrent l'adhésion de \${65 \+ p \* 2}% des citoyens soucieux de réduire les émissions de carbone\.`/g,
  "text: `Selon un récent sondage réalisé à ${city}, l'aménagement de nouvelles pistes cyclables sécurisées et l'extension des voies réservées aux bus rencontrent l'adhésion de ${65 + p * 2}% des citoyens soucieux de réduire les émissions de carbone. Les autorités municipales envisagent d'accélérer le calendrier des travaux dès le prochain trimestre afin d'encourager les mobilités douces et de fluidifier durablement la circulation dans l'hypercentre.`"
);

content = content.replace(
  /text:\s*`Une étude menée auprès d'entreprises de \${city} révèle que l'expérimentation de la semaine de 4 jours a permis de réduire le niveau d'épuisement professionnel de \${30 \+ p}% tout en maintenant la productivité globale\.`/g,
  "text: `Une étude approfondie menée auprès d'entreprises de la région de ${city} révèle que l'expérimentation de la semaine de 4 jours a permis de réduire le niveau d'épuisement professionnel de ${30 + p}% tout en maintenant la productivité globale. La majorité des dirigeants interrogés confirment une baisse significative de l'absentéisme et un engagement accru des salariés.`"
);

content = content.replace(
  /text:\s*`Le festival annuel de musique émergente de \${city} mettra à l'honneur cette année \${10 \+ p \* 3} groupes régionaux, afin de promouvoir la diversité culturelle et le dynamisme artistique local\.`/g,
  "text: `Le festival annuel de musique émergente de la métropole de ${city} mettra à l'honneur cette année ${10 + p * 3} groupes régionaux d'une grande diversité stylistique. Les organisateurs souhaitent ainsi promouvoir le dynamisme artistique local et offrir une vitrine professionnelle aux jeunes talents émergents de la région.`"
);

content = content.replace(
  /text:\s*`De plus en plus de foyers de \${city} adoptent l'achat en vrac dans les épiceries écoresponsables\. Cette pratique permet de réduire les dépenses alimentaires de \${15 \+ p}% tout en éliminant les emballages plastiques\.`/g,
  "text: `De plus en plus de foyers de ${city} adoptent l'achat en vrac dans les épiceries écoresponsables du quartier. Cette pratique solidaire permet non seulement de réduire les dépenses alimentaires annuelles de ${15 + p}%, mais contribue également de manière concrète à éliminer les déchets plastiques à usage unique.`"
);

fs.writeFileSync('src/lib/examSchema.ts', content, 'utf8');
console.log("✅ Successfully enriched listening passages in examSchema.ts!");
