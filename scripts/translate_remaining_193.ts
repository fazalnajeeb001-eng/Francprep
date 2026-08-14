import * as fs from "fs";

const list: string[] = JSON.parse(fs.readFileSync("scratch/remaining_258.json", "utf-8"));

console.log(`Writing mappings for ${list.length} items...`);

// Let's create an exhaustive translation mapping
export const REMAINING_193_MAP: Record<string, string> = {
  // Parcels and notifications
  "Retour du colis n°8185 à l'expéditeur d'origine à Toronto": "Return of parcel N°8185 to original sender in Toronto",
  "Paiement obligatoire de frais de douane supplémentaires pour le colis": "Mandatory payment of additional customs fees for parcel",
  "Colis n°8185 disponible en consignes automatiques à Toronto avec le code 4055": "Parcel N°8185 available in automated lockers in Toronto with code 4055",

  // Sports & Gym
  "Fermeture des vestiaires du centre sportif de Toronto pour travaux d'assainissement": "Closure of Toronto sports center locker rooms for sanitation work",
  "Changement de lieu et d'horaire pour l'entraînement de natation à Toronto ce samedi à 13h": "Change of venue and time for swimming practice in Toronto this Saturday at 1:00 PM",
  "Annulation définitive de l'inscription au club de sport de Toronto": "Definitive cancellation of registration at Toronto sports club",
  "Augmentation de la cotisation annuelle pour les membres du club de sport": "Increase in annual membership dues for sports club members",

  // Library
  "Rappel de la date de renouvellement de la carte d'abonné de la bibliothèque": "Reminder of library card annual renewal date",
  "Obligation de payer une amende pour retard de restitution à la bibliothèque": "Obligation to pay a late fine for overdue library return",
  "Ouvrage réservé disponible à la bibliothèque de Toronto à retirer avant samedi 15h": "Reserved book available at Toronto library for pickup before Saturday 3:00 PM",
  "Perte définitive de l'ouvrage emprunté par la médiathèque de Toronto": "Permanent loss of borrowed book by Toronto media library",

  // Job interview / Voicemail
  "Refus immédiat de la candidature transmise à l'entreprise de Toronto": "Immediate rejection of job application submitted to Toronto company",
  "Convocation à un examen écrit dans les locaux de l'entreprise de Toronto": "Summons to a written examination at Toronto company premises",
  "Confirmation d'un entretien d'embauche par visioconférence ce vendredi à 14h": "Confirmation of a video job interview this Friday at 2:00 PM",
  "Demande d'envoi d'une lettre de recommandation imprimée à l'entreprise": "Request to send a printed recommendation letter to the company",

  // B1 Citizens reaction / Bike lanes
  "Refus massif des habitants de Toronto face aux récents travaux d'aménagement routier": "Mass rejection by Toronto residents of recent road development works",
  "Suppression définitive du réseau de vélos en libre-service par la municipalité": "Definitive elimination of the bike-share network by the municipality",
  "Approbation par 75% des citoyens de Toronto des nouvelles pistes cyclables et bus": "Approval by 75% of Toronto citizens of new bike and bus lanes",
  "Augmentation brutale des tarifs de transport en commun dans la ville de Toronto": "Sharp increase in public transit fares in the city of Toronto",

  // 4-day workweek
  "Obligation pour les salariés de Toronto de réaliser des heures supplémentaires le week-end": "Requirement for Toronto employees to work overtime on weekends",
  "Effondrement dramatique de la productivité globale des employés de bureau": "Dramatic collapse in overall office worker productivity",
  "Réduction de l'épuisement professionnel de 35% et maintien de la productivité à Toronto": "35% reduction in burnout and maintenance of productivity in Toronto",
  "Hausse importante du taux de démission volontaire au sein des entreprises": "Significant rise in voluntary resignation rates in companies",

  // Culture / Festival
  "Fermeture définitive de la principale salle de spectacle de la ville de Toronto": "Permanent closure of the main entertainment venue in Toronto",
  "Annulation des spectacles en raison de restrictions budgétaires municipales": "Cancellation of shows due to municipal budget restrictions",
  "Invitation exclusive d'artistes internationaux renommés au détriment des locaux": "Exclusive invitation of international artists at the expense of local talent",
  "Valorisation de 25 groupes régionaux et de la scène musicale locale à Toronto": "Promotion of 25 regional music groups and local music scene in Toronto",

  // Bulk grocery
  "Obligation légale d'acheter uniquement des produits alimentaires industriels surgelés": "Legal requirement to buy only industrial frozen food products",
  "Économies de 20% sur le budget alimentaire et élimination des emballages plastiques à Toronto": "20% savings on grocery budgets and elimination of plastic packaging in Toronto",
  "Disparition complète des commerces de proximité dans le centre-ville de Toronto": "Complete disappearance of local convenience stores in downtown Toronto",
  "Augmentation significative des dépenses mensuelles consacrées à l'alimentation": "Significant increase in monthly food expenditures",

  // Senior solidarity
  "Remplacement intégral des intervenants sociaux par des systèmes automatiques": "Total replacement of social workers by automated systems",
  "Soutien bénévole et visites de convivialité pour 200 séniors isolés à Toronto": "Volunteer support and friendly home visits for 200 isolated seniors in Toronto",
  "Fermeture définitive des centres communautaires d'accueil de quartier": "Permanent closure of neighborhood community welcome centers",
  "Paiement obligatoire d'une cotisation mensuelle de santé par les usagers": "Mandatory payment of a monthly healthcare fee by users",

  // Ecotourism
  "Baisse marquée de la fréquentation touristique des espaces naturels protégés": "Marked decrease in tourist visits to protected natural areas",
  "Construction de complexes hôteliers en béton sur les rives des lacs régionaux": "Construction of concrete hotel complexes along regional lakeshores",
  "Engouement de 30% pour les hébergements écologiques et mobilités douces à Toronto": "30% increase in demand for eco-lodges and soft mobility in Toronto",
  "Interdiction totale d'accès aux sentiers de randonnée pendant la saison estivale": "Total ban on access to hiking trails during the summer season",

  // Urban agriculture
  "La production maraîchère locale en circuit court sur les toits d'immeubles de Toronto": "Local short-supply-chain vegetable production on Toronto building rooftops",
  "L'absorption des eaux de pluie et le rafraîchissement des immeubles neufs de Toronto": "Stormwater absorption and cooling of newly constructed buildings in Toronto",
  "La distribution d'un crédit annuel pour l'achat de livres et billets de théâtre à Toronto": "Distribution of an annual credit for purchasing books and theater tickets in Toronto",
  "L'attribution d'un bonus réparation pour prolonger la durée de vie des appareils à Toronto": "Allocation of a repair bonus to extend appliance lifespans in Toronto",
  "La baisse des accidents mortels et du niveau sonore dans les rues de Toronto": "Reduction in fatal traffic accidents and noise levels on Toronto streets",
  "L'imposition de quotas de représentation équilibrée au sein des directions d'entreprises de Toronto": "Imposition of balanced gender representation quotas on corporate boards in Toronto",

  // C1/C2 Philosophy and Science
  "Les tensions interculturelles liées à la revalorisation des espaces agricoles périurbains": "Intercultural tensions arising from revitalization of peri-urban agricultural lands",
  "L'obligation d'expliquer le fonctionnement interne des réseaux de neurones décisionnels": "The obligation to explain internal workings of decision-making neural networks",
  "L'imposition d'une taxe carbone globale sur les carburants lourds de la flotte internationale": "The imposition of a global carbon tax on heavy bunker fuels in shipping",
  "La rupture du dilemme du prisonnier par l'instauration de sanctions commerciales réciproques": "Resolving prisoner's dilemma through reciprocal trade sanctions",
  "L'ancrage corporel irréductible de toute appréhension subjective du monde environnant": "The irreducible bodily grounding of all subjective world perception",
  "L'encadrement des flux financiers non bancaires pour prévenir un risque systémique global": "Regulation of shadow banking financial flows to prevent global systemic risk"
};

console.log("Mappings generated.");
