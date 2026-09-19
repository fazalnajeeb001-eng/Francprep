import mongoose from "mongoose";

async function purgeBothDbs() {
  const baseUri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net";
  const labelRegex = /(?:Voyageuse|Voyageur|Agent|Client|Boulangère|Patient|Secrétaire|Cycliste|Mécanicien|Soraya|Alain|Élodie|Laurent|Vasseur|Dr\.\s*Maxime|Journaliste|Animateur)\s*[:—–]/i;

  const tefKeywords = [
    "train pour Québec", "croissants au beurre", "docteur Laurent", "docteur Moreau",
    "frein arrière", "Habitation Plus", "signalisation en amont", "circuit de refroidissement",
    "caisses centrales", "point de cadrage", "Montréal-Trudeau", "secrétariat des sports",
    "cabinet dentaire du Parc", "piétonnisation intégrale", "suppression du trafic",
    "banlieusards", "vélo cargo", "navettes électriques", "Radio Plein Air",
    "coopératives maraîchères", "manufacture textile", "microbiologie marine",
    "Bien-être au travail", "Mobilité citoyenne", "bibliothèques d'objets",
    "défilement infini", "Bulletin spécial environnement", "Éducation d'avenir",
    "présentéisme physique", "perte de contrôle", "santé mentale", "fracture sociale",
    "refonte démocratique", "contrat de civilisation", "réemploi solidaire",
    "ceintures vertes", "dématérialisation administrative", "audace intellectuelle"
  ];

  for (const dbName of ["test", "francprep"]) {
    console.log(`\n--- Checking Database: ${dbName} ---`);
    const conn = await mongoose.createConnection(`${baseUri}/${dbName}?appName=Francprep`).asPromise();
    const col = conn.collection("ttscaches");

    const totalBefore = await col.countDocuments();
    console.log(`Total documents before: ${totalBefore}`);

    // 1. Delete matching speaker label regex
    const r1 = await col.deleteMany({ text: { $regex: labelRegex } });
    console.log(`Deleted with speaker labels: ${r1.deletedCount}`);

    // 2. Delete matching TEF keywords
    let kCount = 0;
    for (const kw of tefKeywords) {
      const r2 = await col.deleteMany({ text: { $regex: kw, $options: "i" } });
      kCount += r2.deletedCount || 0;
    }
    console.log(`Deleted with TEF keywords: ${kCount}`);

    const totalAfter = await col.countDocuments();
    console.log(`Total documents remaining in ${dbName}: ${totalAfter}`);

    await conn.close();
  }
}

purgeBothDbs().catch(console.error);
