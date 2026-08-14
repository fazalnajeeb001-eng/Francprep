import * as fs from "fs";

const items: string[] = JSON.parse(fs.readFileSync("scratch/remaining_french_options.json", "utf-8"));

console.log(`Analyzing ${items.length} items...`);

// Let's create an exact translation mapping for every single item
export function translateRemainingOption(fr: string): string {
  const t = fr.trim();

  // 1. City substitution helper
  const translateWithCity = (pattern: RegExp, template: (city: string) => string): string | null => {
    const match = t.match(pattern);
    if (match) {
      return template(match[1]);
    }
    return null;
  };

  // City-agnostic common patterns
  if (t.includes("L'interdiction stricte de toute innovation technique dans la région de")) {
    const city = t.split("région de ")[1]?.trim() || "the region";
    return `Strict prohibition of all technical innovation in the region of ${city}`;
  }
  if (t.includes("La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à")) {
    const city = t.split("solaire à ")[1]?.trim() || "the city";
    return `Definitive closure of businesses not using solar energy in ${city}`;
  }
  if (t.includes("La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants")) {
    return "Mandatory 50% increase in municipal taxes for all residents";
  }
  if (t.includes("La négation absolue de toute recherche scientifique menée à")) {
    const city = t.split("menée à ")[1]?.trim() || "the city";
    return `The absolute denial of all scientific research conducted in ${city}`;
  }
  if (t.includes("L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de")) {
    const city = t.split("régionales de ")[1]?.trim() || "the region";
    return `The imposition of a fixed 80% customs tariff on regional exports from ${city}`;
  }
  if (t.includes("La suppression définitive de l'enseignement des sciences humaines à l'université")) {
    return "The permanent elimination of humanities instruction at universities";
  }

  // B1 reports
  if (t.includes("Augmentation considérable des tarifs d'inscription annuelle à la bibliothèque")) {
    return "Substantial increase in annual library registration fees";
  }
  if (t.includes("Accès démocratisé à la lecture numérique dans")) {
    return "Democratized access to digital reading across rural communities";
  }
  if (t.includes("Suppression de la totalité des collections de livres papier dans les établissements")) {
    return "Elimination of all physical paper book collections in institutions";
  }
  if (t.includes("Fermeture définitive des espaces de travail étudiants durant la période des examens")) {
    return "Permanent closure of student study spaces during exam periods";
  }
  if (t.includes("Expulsion des jeunes locataires des logements du centre-ville")) {
    return "Eviction of young tenants from downtown residential housing";
  }
  if (t.includes("Augmentation incontrôlée des loyers d'habitation dans le secteur privé")) {
    return "Uncontrolled residential rent increases in the private sector";
  }
  if (t.includes("Partage de logement solidaire pour 100 étudiants et séniors")) {
    return "Intergenerational solidarity home-sharing for 100 students and seniors";
  }
  if (t.includes("Obligation légale de résider uniquement dans des cités universitaires fermées")) {
    return "Legal requirement to reside exclusively in gated university residences";
  }
  if (t.includes("Suppression complète de la pause déjeuner pour l'ensemble des employés")) {
    return "Complete elimination of lunch breaks for all employees";
  }
  if (t.includes("Fermeture des restaurants d'entreprise pendant l'après-midi")) {
    return "Closure of corporate cafeteria dining facilities during afternoons";
  }
  if (t.includes("Obligation de souscrire à un abonnement sportif individuel payant")) {
    return "Obligation to purchase a paid individual sports subscription";
  }
  if (t.includes("Mise en place d'exercices physiques quotidiens dans")) {
    return "Implementation of daily physical exercise sessions in workplaces";
  }
  if (t.includes("Interdiction de planter des arbres dans les cours des établissements scolaires")) {
    return "Prohibition on planting trees in school courtyards";
  }
  if (t.includes("Destruction des parcs et espaces verts existants au cœur de la ville")) {
    return "Destruction of existing parks and green spaces in the city center";
  }
  if (t.includes("Taxation supplémentaire sur les propriétaires disposant d'un jardin privé")) {
    return "Additional property taxation on homeowners with private gardens";
  }
  if (t.includes("Végétalisation de 45 bâtiments publics pour réduire la chaleur")) {
    return "Greening of 45 public buildings to reduce urban heat islands";
  }

  // B2 debates
  if (t.includes("La desserte automatique des zones industrielles excentrées de la région de")) {
    const city = t.split("région de ")[1]?.trim() || "the region";
    return `Automated transit service to outlying industrial zones in ${city}`;
  }
  if (t.includes("La prise en charge des urgences animales pour les propriétaires sous le seuil de pauvreté")) {
    return "Subsidized emergency veterinary care for pet owners below poverty line";
  }
  if (t.includes("Le gel des prix de l'énergie hivernale pour éviter la précarité énergétique")) {
    return "Freezing winter energy prices to prevent household energy poverty";
  }
  if (t.includes("L'aménagement d'axes cyclables sécurisés et séparés reliant les banlieues")) {
    return "Development of protected, segregated bicycle highways connecting suburbs";
  }
  if (t.includes("L'offre systématique d'une alternative végétale équilibrée dans les restaurants municipaux")) {
    return "Systematic offering of balanced plant-based alternatives in municipal cafeterias";
  }
  if (t.includes("La protection des milieux marins et fluviaux en amont du traitement des eaux")) {
    return "Protection of marine and riverine ecosystems upstream of water treatment plants";
  }
  if (t.includes("L'accompagnement des jeunes diplômés par des retraités bénévoles expérimentés")) {
    return "Mentorship of recent graduates by experienced volunteer retirees";
  }
  if (t.includes("La mise à disposition d'outils numériques modernes dans les équipements publics")) {
    return "Provision of modern digital tools and devices in public community facilities";
  }

  // C1/C2 lectures
  if (t.includes("La reconversion des friches en lieux de création artistique et d'innovation sociale")) {
    return "The conversion of urban brownfields into centers for artistic creation and social innovation";
  }
  if (t.includes("La démonstration de la viabilité des gestions communautaires sans appropriation privée")) {
    return "Demonstration of the viability of commons-based management without private appropriation";
  }
  if (t.includes("La nécessité de séparer étanchément les réseaux opérationnels d'Internet")) {
    return "The necessity of air-gapping critical operational networks from the public Internet";
  }
  if (t.includes("Le redéploiement de la notion d'identité individuelle face aux prothèses cognitives")) {
    return "The redefinition of personal identity in the age of cognitive neuro-prosthetics";
  }
  if (t.includes("La réduction de la complexité argumentative au profit de slogans émotionnels répétitifs")) {
    return "The reduction of complex civic discourse in favor of repetitive emotional slogans";
  }
  if (t.includes("La succession de longues périodes de stase et d'épisodes de spéciation très rapides")) {
    return "The succession of long periods of evolutionary stasis and rapid speciation bursts";
  }

  return "";
}

console.log("Remaining option translator helper built.");
