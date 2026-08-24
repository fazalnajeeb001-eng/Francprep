import { GOLD_PAPER_9_ITEMS, GOLD_PAPER_10_ITEMS } from "./phase5_gold_data";
import type { ReadingItem } from "../src/lib/authenticReadingMasterBank";
import * as fs from "fs";

function expandC1Passages(items: ReadingItem[], paperNum: number): ReadingItem[] {
  return items.map((item, idx) => {
    const qNum = idx + 1;
    const newItem = { ...item };

    if (paperNum === 9) {
      if (qNum === 31) {
        newItem.text = `PHILOSOPHIE DE L'INNOVATION — CAHIERS DE LA PENSÉE NUMÉRIQUE : L'AUTOMATISATION DE LA DÉCISION ET L'EFFACEMENT D'UNE RESPONSABILITÉ DÉMOCRATIQUE DANS LES INSTITUTIONS.\n\nL'intégration d'algorithmes d'apprentissage profond et de systèmes autonomes dans la prise de décision médicale, judiciaire ou financière modifie profondément la nature de la responsabilité morale et juridique. En confiant à des machines des choix qui relevaient autrefois de l'arbitrage éthique et du jugement humain contextualisé, les institutions courent le risque majeur de créer des zones de non-responsabilité diluée où la décision n'appartient plus à personne.\n\nLorsque l'algorithme refuse un crédit, établit un diagnostic médical erroné ou évalue le risque d'un prévenu, la complexité 'boîte noire' du code empêche de retracer la chaîne d'intentionnalité humaine. Cette dilution de la responsabilité sous couvert de neutralité technologique fragilise la justice sociale. Le citoyen lésé se heurte à une bureaucratie automatisée face à laquelle tout recours humain devient impossible.`;
      } else if (qNum === 32) {
        newItem.text = `ÉCONOMIE POLITIQUE — REVUE DE LA TRANSITION PRODUCTIVE : L'ILLUSION DE LA SOBRIÉTÉ INDIVIDUELLE SANS TRANSFORMATION STRUCTURELLE DE L'APPAREIL PRODUCTIF.\n\nLe discours culpabilisateur axé exclusivement sur l'adoption de 'petits gestes' écologiques individuels (éteindre les lumières, réduire ses tirages papier, couper l'eau) masque fréquemment le refus des pouvoirs publics d'imposer des régulations contraignantes aux grands secteurs industriels et financiers. Bien que l'engagement citoyen soit nécessaire, attribuer la responsabilité principale de la crise climatique aux habitudes de consommation individuelle relève d'une mystification politique dangereuse.\n\nDes études scientifiques récentes démontrent que même si l'ensemble des citoyens adoptait un comportement individuel parfait, les émissions globales de gaz à effet de serre ne diminueraient que de 20 %. Sans une transformation structurelle profonde des modes de production, du système de transport de marchandises et des choix énergétiques nationaux, la sobriété individuelle reste impuissante à enrayer le réchauffement climatique.`;
      } else if (qNum === 33) {
        newItem.text = `SOCIOLOGIE DU TRAVAIL — CAHIERS DE L'ORGANISATION INDUSTRIELLE : LE MANAGEMENT PAR PROJET ET L'ÉROSION DES SOLIDARITÉS DU SYNDICALISME DANS L'ENTREPRISE MODERNISÉE EN CRISE.\n\nLa généralisation du management par projet et du travail en réseau au sein des grandes entreprises privées et publiques a profondément déstructuré les communautés de travail traditionnelles. En remplaçant les équipes stables et les métiers identifiés par des groupes de projet éphémères continuellement recomposés au gré des objectifs financiers de court terme, l'organisation managériale individualise la relation d'emploi.\n\nCette mise en concurrence permanente des salariés érode les solidarités collectives et fragilise l'action syndicale. Isolé face à des objectifs d'évaluation individualisés et des indicateurs de performance stricts, le salarié ne peut plus s'appuyer sur la force du collectif pour défendre ses conditions de travail et négocier ses droits fondamentaux, subissant une vulnérabilité accrue face au pouvoir patronal.`;
      } else if (qNum === 34) {
        newItem.text = `PHILOSOPHIE DU DROIT — CAHIERS DU DROIT CONSTITUTIONNEL : LA JUDICIARISATION DU DÉBAT POLITIQUE ET LE GOUVERNEMENT DES JUGES EN DÉMOCRATIE REPRÉSENTATIVE CONTEMPORAINE.\n\nLa tendance croissante à recourir aux tribunaux et aux cours suprêmes pour trancher des controverses éthiques ou sociétales majeures — traditionnellement débattues au Parlement — opère un déplacement inédit du centre de gravité démocratique. En confiant à des juges non élus l'arbitrage suprême sur la définition des valeurs et des choix de la cité, la société prend le risque majeur de judiciariser la politique.\n\nCette judiciarisation du débat public affablit la délibération démocratique parlementaire et le pouvoir citoyen. Lorsque les citoyens perçoivent que les choix fondamentaux dépendent de décisions de jurisprudence plutôt que du vote direct de leurs representatives élus, la légitimité des institutions politiques s'érode au profit d'un technocratisme juridique perçu comme distant, froid et autoritaire.`;
      } else if (qNum === 35) {
        newItem.text = `ARCHITECTURE ET VILLE — REVUE D'URBANISME CONTEMPORAIN : LA STANDARDISATION DES FAÇADES ET LA PERTE DE L'ANCRAGE RÉGIONAL DANS LES MÉTROPOLES MONDIALISÉES MODERNES ET CONTEMPORAINES.\n\nLa généralisation des matériaux industriels standardisés (bardages métalliques, façades de verre miroir, béton préfabriqué) dans la construction contemporaine produit un paysage urbain générique, répétitif et interchangeable. Des centres d'affaires de Tokyo aux entrées de ville européennes, la répétition des mêmes formes architecturales neutres efface l'identité matérielle et l'histoire séculaire des territoires.\n\nCette perte de l'ancrage régional dégrade profondément le sentiment d'appartenance des habitants à leur quartier d'origine. Privée de continuité stylistique avec le patrimoine local et insensible aux contraintes du climat régional, l'architecture mondialisée réduit la ville à un assemblage fonctionnel froid qui étouffe la sensibilité et l'expérience poétique quotidienne du cadre de vie. Réenchanter l'urbanisme exige de réimposer impérativement l'usage de matériaux biosourcés et locaux.`;
      }
    } else if (paperNum === 10) {
      if (qNum === 32) {
        newItem.text = `SOCIOLOGIE DU TRAVAIL — REVUE DES DYNAMIQUES PROFESSIONNELLES : L'INJONCTION À L'AUTONOMIE ET LA NOUVELLE ALIENATION DU SALARIÉ DANS LES ENTREPRISES MODERNES EN MUTATION.\n\nLe discours managérial contemporain fait la promotion constante de l'autonomie, de la flexibilité et du 'leadership individuel' des salariés au sein des organisations horizontales. Toutefois, des sociologues du travail mettent en lumière le caractère paradoxal et trompeur de cette liberté affichée. En réalité, cette autonomie accordée s'accompagne d'un contrôle à distance renforcé par des objectifs chiffrés toujours plus ambitieux et des contrôles de performance permanents.\n\nCette fausse autonomie transforme le salarié en son propre exploiteur au quotidien. En intériorisant les contraintes de rentabilité de l'entreprise sous couvert de liberté d'organisation, l'individu s'impose une surcharge de travail et un stress permanent qui conduisent à l'épuisement professionnel. L'injonction à l'autonomie masque ainsi une forme d'aliénation renouvelée particulièrement perverse.`;
      } else if (qNum === 33) {
        newItem.text = `ÉCOLOGIE HUMAINE — CAHIERS DU PASEO URBAIN : LA PERTE DU CONTACT AVEC LA NATURE ET LE SYNDROME DU MANQUE DE NATURE EN MILIEU URBAIN DENSE ET CONFINÉ CONTEMPORAIN.\n\nL'urbanisation massive et la sédentarité numérique confinent les populations urbaines contemporaines dans des espaces clos artificiels, coupés du rythme des saisons et du monde vivant. Des chercheurs en santé environnementale identifient les conséquences physiologiques et psychologiques gravissimes de cet éloignement : augmentation des troubles de l'attention chez les enfants, hausse de l'anxiété chronique et affaiblissement du système immunitaire.\n\nCe 'syndrome de manque de nature' met en évidence la dépendance vitale de l'être humain envers le monde vivant. Réintroduire des forêts urbaines denses, des parcs sauvages et imposer des sorties régulières en pleine nature dès l'école primaire constituent des mesures d'urgence sanitaire indispensables pour restaurer durablement l'équilibre physique et psychique des citoyens.`;
      } else if (qNum === 34) {
        newItem.text = `PHILOSOPHIE DU PATRIMOINE — CAHIERS DE LA MÉMOIRE CRITIQUE : LA SPECTACULARISATION DU PATRIMOINE ET LA MUSEIFICATION DES VILLES HISTORIQUES CONTEMPORAINES.\n\nLa transformation des centres historiques en musées à ciel ouvert réservés au tourisme de masse opère une muséification stérile du patrimoine architectural. En expulsant les habitants permanents, les commerces de proximité et la vie artisanale au profit de boutiques de souvenirs standardisées et de logements touristiques saisonniers, les politiques d'urbanisme patrimonial transforment la cité en un décor de théâtre figé.\n\nCette spectacularisation du passé détruit la dimension vivante de l'histoire locale et populaire. Privé de sa communauté d'habitants et de ses usages quotidiens, le patrimoine architectural se réduit à une coquille vide marchandisée. Préserver le patrimoine authentique exige de maintenir impérativement la vie sociale, les services publics et le logement populaire abordable et décent au cœur des pierres historiques.`;
      }
    }

    return newItem;
  });
}

function calibratePaper(items: ReadingItem[], paperNum: number): ReadingItem[] {
  // Target pattern length 39: [0:10, 1:10, 2:10, 3:9]
  const targetAnsPattern = [
    0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3,
    0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3,
    0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3,
    0, 1, 2
  ]; // Total length 39: 4 * 9 + 3 = 39 items!

  const expandedItems = expandC1Passages(items, paperNum);

  return expandedItems.map((item, idx) => {
    const desiredAns = targetAnsPattern[idx];
    const currentAns = item.ans;

    const newOpt = [...item.opt] as [string, string, string, string];
    const newOptEn = [...item.optEn] as [string, string, string, string];

    if (currentAns !== desiredAns) {
      // Swap currentAns and desiredAns
      const tempOpt = newOpt[desiredAns];
      newOpt[desiredAns] = newOpt[currentAns];
      newOpt[currentAns] = tempOpt;

      const tempOptEn = newOptEn[desiredAns];
      newOptEn[desiredAns] = newOptEn[currentAns];
      newOptEn[currentAns] = tempOptEn;
    }

    return {
      ...item,
      paperNum,
      qNum: idx + 1,
      opt: newOpt,
      optEn: newOptEn,
      ans: desiredAns
    };
  });
}

function runCalibration() {
  console.log("=== 🎯 CALIBRATING PHASE 5 (PAPERS 9 & 10) ===");

  const calibratedPaper9 = calibratePaper(GOLD_PAPER_9_ITEMS, 9);
  const calibratedPaper10 = calibratePaper(GOLD_PAPER_10_ITEMS, 10);

  const fileContent = `import type { ReadingItem } from "../src/lib/authenticReadingMasterBank";

// ============================================================================
// 🏆 GOLD-STANDARD EXAM PAPER 4 (PAPER 9 — 39 CALIBRATED ITEMS)
// ============================================================================
export const GOLD_PAPER_9_ITEMS: ReadingItem[] = ${JSON.stringify(calibratedPaper9, null, 2)};

// ============================================================================
// 🏆 GOLD-STANDARD EXAM PAPER 5 (PAPER 10 — 39 CALIBRATED ITEMS)
// ============================================================================
export const GOLD_PAPER_10_ITEMS: ReadingItem[] = ${JSON.stringify(calibratedPaper10, null, 2)};
`;

  fs.writeFileSync("scratch/phase5_gold_data.ts", fileContent);
  console.log("✅ Successfully calibrated Paper 9 & Paper 10!");
}

runCalibration();
