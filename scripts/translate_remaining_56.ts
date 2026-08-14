import * as fs from "fs";

const list: string[] = JSON.parse(fs.readFileSync("scratch/remaining_49.json", "utf-8"));

console.log(`Writing mappings for ${list.length} items...`);

export const FINAL_56_MAP: Record<string, string> = {
  // Parcels
  "Colis n°8037 disponible en consignes automatiques à Montréal avec le code 4011": "Parcel N°8037 available in automated lockers in Montreal with code 4011",
  "Retour du colis n°8037 à l'expéditeur d'origine à Montréal": "Return of parcel N°8037 to original sender in Montreal",

  // Sports & Pool
  "Annulation définitive de l'inscription au club de sport de Montréal": "Definitive cancellation of registration at Montreal sports club",
  "Changement de lieu et d'horaire pour l'entraînement de natation à Montréal ce samedi à 9h": "Change of venue and time for swimming practice in Montreal this Saturday at 9:00 AM",
  "Fermeture des vestiaires du centre sportif de Montréal pour travaux d'assainissement": "Closure of Montreal sports center locker rooms for sanitation work",

  // Library
  "Perte définitive de l'ouvrage emprunté par la médiathèque de Montréal": "Permanent loss of borrowed book by Montreal media library",
  "Ouvrage réservé disponible à la bibliothèque de Montréal à retirer avant samedi 11h": "Reserved book available at Montreal library for pickup before Saturday 11:00 AM",
  "Ouvrage réservé disponible à la bibliothèque de Québec à retirer avant samedi 12h": "Reserved book available at Quebec library for pickup before Saturday 12:00 PM",

  // Voicemail / Job interview
  "Refus immédiat de la candidature transmise à l'entreprise de Montréal": "Immediate rejection of job application submitted to Montreal company",
  "Convocation à un examen écrit dans les locaux de l'entreprise de Montréal": "Summons to a written examination at Montreal company premises",
  "Confirmation d'un entretien d'embauche par visioconférence ce vendredi à 10h": "Confirmation of a video job interview this Friday at 10:00 AM",
  "Proposition d'entretien téléphonique préalable avec l'entreprise de Montréal lundi à 12h30": "Proposal for preliminary phone interview with Montreal company on Monday at 12:30 PM",
  "Proposition d'entretien téléphonique préalable avec l'entreprise de Québec lundi à 13h30": "Proposal for preliminary phone interview with Quebec company on Monday at 1:30 PM",
  "Proposition d'entretien téléphonique préalable avec l'entreprise de Ottawa lundi à 14h30": "Proposal for preliminary phone interview with Ottawa company on Monday at 2:30 PM",
  "Proposition d'entretien téléphonique préalable avec l'entreprise de Vancouver lundi à 15h30": "Proposal for preliminary phone interview with Vancouver company on Monday at 3:30 PM",
  "Proposition d'entretien téléphonique préalable avec l'entreprise de Toronto lundi à 16h30": "Proposal for preliminary phone interview with Toronto company on Monday at 4:30 PM",
  "Rappel du rendez-vous médical de suivi à Québec fixé à mardi à 10h30": "Reminder of follow-up medical appointment in Quebec scheduled for Tuesday at 10:30 AM",
  "Véhicule prêt au garage de Québec après révision et freins pour un montant de 210$": "Vehicle ready at Quebec garage after service and brakes for an amount of $210",

  // B2 debates & Philosophy
  "L'impossibilité de réduire l'expérience phénoménale subjective à de simples calculs informatiques": "The impossibility of reducing subjective phenomenal experience to mere computational calculations",
  "L'autorisation d'accès limitée aux véhicules transportant au moins trois occupants à Ottawa": "Access authorization restricted to high-occupancy vehicles carrying at least three occupants in Ottawa",

  // B1 Citizen reaction
  "Approbation par 67% des citoyens de Montréal des nouvelles pistes cyclables et bus": "Approval by 67% of Montreal citizens of new bike and bus lanes",
  "Refus massif des habitants de Montréal face aux récents travaux d'aménagement routier": "Mass rejection by Montreal residents of recent road development works",
  "Augmentation brutale des tarifs de transport en commun dans la ville de Montréal": "Sharp increase in public transit fares in the city of Montreal",
  "Approbation par 69% des citoyens de Québec des nouvelles pistes cyclables et bus": "Approval by 69% of Quebec citizens of new bike and bus lanes",

  // 4-day workweek
  "Obligation pour les salariés de Montréal de réaliser des heures supplémentaires le week-end": "Requirement for Montreal employees to work overtime on weekends",
  "Réduction de l'épuisement professionnel de 31% et maintien de la productivité à Montréal": "31% reduction in burnout and maintenance of productivity in Montreal",
  "Réduction de l'épuisement professionnel de 32% et maintien de la productivité à Québec": "32% reduction in burnout and maintenance of productivity in Quebec",

  // Culture / Festival
  "Fermeture définitive de la principale salle de spectacle de la ville de Montréal": "Permanent closure of the main entertainment venue in Montreal",
  "Valorisation de 13 groupes régionaux et de la scène musicale locale à Montréal": "Promotion of 13 regional music groups and local music scene in Montreal",

  // Bulk grocery
  "Disparition complète des commerces de proximité dans le centre-ville de Montréal": "Complete disappearance of local convenience stores in downtown Montreal",
  "Économies de 16% sur le budget alimentaire et élimination des emballages plastiques à Montréal": "16% savings on grocery budgets and elimination of plastic packaging in Montreal",
  "Économies de 17% sur le budget alimentaire et élimination des emballages plastiques à Québec": "17% savings on grocery budgets and elimination of plastic packaging in Quebec",

  // Senior solidarity
  "Soutien bénévole et visites de convivialité pour 120 séniors isolés à Montréal": "Volunteer support and friendly home visits for 120 isolated seniors in Montreal",

  // Ecotourism
  "Engouement de 22% pour les hébergements écologiques et mobilités douces à Montréal": "22% increase in demand for eco-lodges and soft mobility in Montreal",

  // B2 debates
  "La péréquation des recettes fiscales communales entre Montréal et ses villes dortoirs": "Fiscal revenue equalization between Montreal and its commuter suburbs",
  "La réduction des émissions toxiques tout en développant le réseau de tramway à Montréal": "Reduction of toxic emissions while expanding Montreal's tramway network",
  "L'obligation pour les conditionneurs d'utiliser 40% de matières recyclées à Montréal": "Requirement for packagers to use 40% recycled materials in Montreal",
  "Une prise en charge de 35% des coûts d'équipement photovoltaïque pour les propriétaires de Montréal": "35% subsidy on solar equipment costs for Montreal homeowners",
  "Le développement du sentiment citoyen et l'aménagement d'espaces verts collectifs à Montréal": "Fostering community spirit and developing collective green spaces in Montreal",
  "La pénalisation de la fast-fashion au profit d'ateliers textiles locaux durables à Montréal": "Penalizing fast-fashion in favor of sustainable local textile workshops in Montreal",

  "Le plafonnement à 90 jours de location annuelle pour préserver le logement locatif à Québec": "Capping short-term rentals at 90 days annually to preserve rental housing in Quebec",
  "La tarification de la congestion pour financer l'électrification du réseau d'autobus de Québec": "Congestion pricing to fund the electrification of Quebec's bus network",
  "La gratuité des volumes vitaux suivie d'une surtaxe sur le gaspillage d'eau à Québec": "Free essential water volumes followed by progressive surcharges on water waste in Quebec",
  "L'obligation pour les bailleurs d'isoler les bâtiments avant toute révision de loyer à Québec": "Requirement for landlords to insulate buildings prior to any rent revision in Quebec",
  "La fixation d'un loyer de référence au mètre carré pour freiner la spéculation immobilière à Québec": "Setting reference rents per square meter to curb property speculation in Quebec",
  "L'intégration sous conditions d'efficacité des thérapies complémentaires au régime de Québec": "Conditional coverage of proven complementary therapies under Quebec's health system",
  "La suppression des réclames pour les lignes réalisables en moins de 3 heures de train depuis Québec": "Banning flight advertising for routes achievable under 3 hours by train from Quebec",
  "Le retour des bouteilles réutilisables dans tous les supermarchés de la région de Québec": "Reintroducing reusable deposit bottles across all supermarkets in the Quebec region",

  // C1/C2 Philosophy and Science
  "Le risque d'effets secondaires irréversibles sur la pluviométrie régionale globale": "The risk of irreversible side effects on global regional precipitation patterns",
  "La remise en cause du principe du déterminisme absolu au profit d'une approche probabiliste": "Challenging absolute determinism in favor of a probabilistic framework",
  "La dépendance fondamentale de la pensée conceptuelle aux structures linguistiques locales": "The fundamental dependence of conceptual thought on local linguistic structures",
  "Le risque d'éviction des banques commerciales traditionnelles au profit de la banque centrale": "The risk of disintermediating commercial banks in favor of the central bank",
  "L'attribution d'une responsabilité pénale aux concepteurs des logiciels de ciblage": "Assigning criminal liability to designers of targeted decision algorithms",
  "La création de sanctuaires marins d'interdiction totale de pêche industrielle": "Establishing marine sanctuaries with a total ban on industrial fishing",
  "La précarisation des statuts professionnels déguisés sous la qualification d'indépendants": "The precarity of labor disguised under the classification of independent contractors",
  "La démonstration que toute observation empirique est pré-orientée par un cadre théorique": "Demonstrating that all empirical observation is theory-laden",
  "Le risque de paralysie des filières de transition énergétique par goulot d'étranglement mondial": "The risk of crippling energy transition sectors due to global mineral bottlenecks"
};

console.log("FINAL_56_MAP compiled.");
