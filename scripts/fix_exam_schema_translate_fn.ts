import * as fs from "fs";

console.log("=== 🛠️ CLEANING translateOptionToEnglish & ensureInterrogativeQuestion ===");

const filePath = "src/lib/examSchema.ts";
let content = fs.readFileSync(filePath, "utf-8");

// Replace from "export function translateOptionToEnglish" down to "export function generateListeningQuestions"
const startTag = "export function translateOptionToEnglish";
const endTag = "export function generateListeningQuestions";

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.error("❌ Could not find start or end tag.");
  process.exit(1);
}

const replacement = `export function translateOptionToEnglish(opt: string): string {
  if (!opt) return "";
  return translateOptionMaster(opt);
}

export function ensureInterrogativeQuestion(qNum: number, t: any): string {
  if (t.q && typeof t.q === "string" && t.q.trim().endsWith("?")) {
    return t.q.trim();
  }

  const title = (t.title || "").toLowerCase();

  // A1/A2 (Q1 - Q15)
  if (qNum <= 15) {
    if (title.includes("gare") || title.includes("train")) return "Quelle information importante est annoncée aux voyageurs ?";
    if (title.includes("commerce") || title.includes("boulangerie") || title.includes("magasin")) return "Quelle offre spéciale est proposée aux clients ?";
    if (title.includes("météo")) return "Quelles sont les prévisions météorologiques annoncées ?";
    if (title.includes("hôtel") || title.includes("restaurant")) return "Quelle est la consigne communiquée aux clients ?";
    if (title.includes("voicemail") || title.includes("message") || title.includes("secrétariat")) return "Pourquoi la personne laisse-t-elle ce message téléphonique ?";
    if (title.includes("garage") || title.includes("auto") || title.includes("mécanique")) return "Quelle est la raison de l'appel du garage automobile ?";
    if (title.includes("salon") || title.includes("coiffure")) return "Pour quel motif le salon de coiffure contacte-t-il le client ?";
    if (title.includes("bibliothèque")) return "Quelle information est transmise par la bibliothèque municipale ?";
    if (title.includes("livraison") || title.includes("colis") || title.includes("relais")) return "Où le destinataire doit-il récupérer son colis ?";
    if (title.includes("médecin") || title.includes("santé") || title.includes("cabinet")) return "Quelle recommandation est donnée par le médecin ?";
    return "Quel est le sujet principal de ce message sonore ?";
  }

  // B1 (Q16 - Q25)
  if (qNum <= 25) {
    if (title.includes("écologie") || title.includes("piste") || title.includes("sondage")) return "Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?";
    if (title.includes("travail") || title.includes("semaine") || title.includes("société")) return "Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?";
    if (title.includes("culture") || title.includes("festival") || title.includes("musique")) return "Quel est l'objectif principal de cet événement culturel ?";
    if (title.includes("consommation") || title.includes("vrac")) return "Quel avantage principal présente cette nouvelle habitude d'achat ?";
    if (title.includes("transport") || title.includes("tarif")) return "Changement majeur annoncé pour le réseau de transport public ?";
    if (title.includes("santé") || title.includes("prévention")) return "Quel conseil est préconisé par les spécialistes de santé ?";
    if (title.includes("logement") || title.includes("immobilier")) return "Quelle est la tendance observée sur le marché immobilier local ?";
    if (title.includes("technologie") || title.includes("numérique")) return "Quel est l'impact principal décrit dans ce reportage ?";
    return "Quel est l'objectif ou le message central de ce document sonore ?";
  }

  // B2 (Q26 - Q33)
  if (qNum <= 33) {
    if (title.includes("débat") || title.includes("société") || title.includes("livreur")) return "Quel est le principal point de désaccord abordé dans ce débat ?";
    if (title.includes("économie") || title.includes("entreprise") || title.includes("capteur")) return "Quelle analyse économique ou technique est présentée par l'intervenant ?";
    if (title.includes("éducation") || title.includes("université")) return "Quelle réforme éducative est préconisée dans cette intervention ?";
    if (title.includes("environnement") || title.includes("climat")) return "Quel enjeu environnemental majeur est mis en avant ?";
    return "Quelle idée essentielle le locuteur cherche-t-il à démontrer ?";
  }

  // C1/C2 (Q34 - Q39)
  if (title.includes("quantique") || title.includes("cryptographie")) return "Selon le conférencier, quel est le défi technique majeur de cette nouvelle technologie ?";
  if (title.includes("crispr") || title.includes("bioéthique")) return "Quelle exigence éthique la communauté scientifique internationale met-elle en avant ?";
  if (title.includes("neuroplasticité") || title.includes("langue")) return "De quel facteur dépend principalement l'apprentissage tardif d'une seconde langue ?";
  if (title.includes("gentrification") || title.includes("urbain")) return "Quelle conséquence sociale le sociologue associe-t-il à ce phénomène de réhabilitation ?";
  if (title.includes("nudge") || title.includes("comportemental")) return "Par quel moyen la théorie de l'incitation douce cherche-t-elle à orienter les choix citoyens ?";
  if (title.includes("épistémologie") || title.includes("algorithme")) return "Quel risque majeur l'intervenant identifie-t-il dans la délibération citoyenne contemporaine ?";
  if (title.includes("art") || title.includes("intelligence artificielle")) return "En quoi l'émergence des œuvres générées par IA remet-elle en cause le concept traditionnel d'art ?";

  return "Quelle est la thèse centrale développée par le conférencier ?";
}

`;

content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync(filePath, content);
console.log("✅ Successfully cleaned up examSchema.ts!");
