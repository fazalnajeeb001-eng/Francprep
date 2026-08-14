import * as fs from "fs";

const list: string[] = JSON.parse(fs.readFileSync("scratch/remaining_120.json", "utf-8"));

console.log(`Writing mappings for ${list.length} items...`);

export const FINAL_127_MAP: Record<string, string> = {
  // Parcels
  "Retour du colis n°8074 à l'expéditeur d'origine à Québec": "Return of parcel N°8074 to original sender in Quebec",
  "Colis n°8074 disponible en consignes automatiques à Québec avec le code 4022": "Parcel N°8074 available in automated lockers in Quebec with code 4022",
  "Retour du colis n°8111 à l'expéditeur d'origine à Ottawa": "Return of parcel N°8111 to original sender in Ottawa",
  "Colis n°8111 disponible en consignes automatiques à Ottawa avec le code 4033": "Parcel N°8111 available in automated lockers in Ottawa with code 4033",
  "Retour du colis n°8148 à l'expéditeur d'origine à Vancouver": "Return of parcel N°8148 to original sender in Vancouver",
  "Colis n°8148 disponible en consignes automatiques à Vancouver avec le code 4044": "Parcel N°8148 available in automated lockers in Vancouver with code 4044",

  // Sports & Pool
  "Fermeture des vestiaires du centre sportif de Québec pour travaux d'assainissement": "Closure of Quebec sports center locker rooms for sanitation work",
  "Changement de lieu et d'horaire pour l'entraînement de natation à Québec ce samedi à 10h": "Change of venue and time for swimming practice in Quebec this Saturday at 10:00 AM",
  "Annulation définitive de l'inscription au club de sport de Québec": "Definitive cancellation of registration at Quebec sports club",
  "Fermeture des vestiaires du centre sportif de Ottawa pour travaux d'assainissement": "Closure of Ottawa sports center locker rooms for sanitation work",
  "Changement de lieu et d'horaire pour l'entraînement de natation à Ottawa ce samedi à 11h": "Change of venue and time for swimming practice in Ottawa this Saturday at 11:00 AM",
  "Annulation définitive de l'inscription au club de sport de Ottawa": "Definitive cancellation of registration at Ottawa sports club",
  "Fermeture des vestiaires du centre sportif de Vancouver pour travaux d'assainissement": "Closure of Vancouver sports center locker rooms for sanitation work",
  "Changement de lieu et d'horaire pour l'entraînement de natation à Vancouver ce samedi à 12h": "Change of venue and time for swimming practice in Vancouver this Saturday at 12:00 PM",
  "Annulation définitive de l'inscription au club de sport de Vancouver": "Definitive cancellation of registration at Vancouver sports club",

  // Library
  "Ouvrage réservé disponible à la bibliothèque de Québec à retirer avant samedi 11h": "Reserved book available at Quebec library for pickup before Saturday 11:00 AM",
  "Perte définitive de l'ouvrage emprunté par la médiathèque de Québec": "Permanent loss of borrowed book by Quebec media library",
  "Ouvrage réservé disponible à la bibliothèque de Ottawa à retirer avant samedi 13h": "Reserved book available at Ottawa library for pickup before Saturday 1:00 PM",
  "Perte définitive de l'ouvrage emprunté par la médiathèque de Ottawa": "Permanent loss of borrowed book by Ottawa media library",
  "Ouvrage réservé disponible à la bibliothèque de Vancouver à retirer avant samedi 14h": "Reserved book available at Vancouver library for pickup before Saturday 2:00 PM",
  "Perte définitive de l'ouvrage emprunté par la médiathèque de Vancouver": "Permanent loss of borrowed book by Vancouver media library",

  // Job Interview
  "Refus immédiat de la candidature transmise à l'entreprise de Québec": "Immediate rejection of job application submitted to Quebec company",
  "Convocation à un examen écrit dans les locaux de l'entreprise de Québec": "Summons to a written examination at Quebec company premises",
  "Confirmation d'un entretien d'embauche par visioconférence ce vendredi à 11h": "Confirmation of a video job interview this Friday at 11:00 AM",
  "Refus immédiat de la candidature transmise à l'entreprise de Ottawa": "Immediate rejection of job application submitted to Ottawa company",
  "Convocation à un examen écrit dans les locaux de l'entreprise de Ottawa": "Summons to a written examination at Ottawa company premises",
  "Confirmation d'un entretien d'embauche par visioconférence ce vendredi à 12h": "Confirmation of a video job interview this Friday at 12:00 PM",
  "Refus immédiat de la candidature transmise à l'entreprise de Vancouver": "Immediate rejection of job application submitted to Vancouver company",
  "Convocation à un examen écrit dans les locaux de l'entreprise de Vancouver": "Summons to a written examination at Vancouver company premises",
  "Confirmation d'un entretien d'embauche par visioconférence ce vendredi à 13h": "Confirmation of a video job interview this Friday at 1:00 PM",

  // B1 Citizen reaction
  "Refus massif des habitants de Québec face aux récents travaux d'aménagement routier": "Mass rejection by Quebec residents of recent road development works",
  "Approbation par 68% des citoyens de Québec des nouvelles pistes cyclables et bus": "Approval by 68% of Quebec citizens of new bike and bus lanes",
  "Augmentation brutale des tarifs de transport en commun dans la ville de Québec": "Sharp increase in public transit fares in the city of Quebec",
  "Refus massif des habitants de Ottawa face aux récents travaux d'aménagement routier": "Mass rejection by Ottawa residents of recent road development works",
  "Approbation par 71% des citoyens de Ottawa des nouvelles pistes cyclables et bus": "Approval by 71% of Ottawa citizens of new bike and bus lanes",
  "Augmentation brutale des tarifs de transport en commun dans la ville de Ottawa": "Sharp increase in public transit fares in the city of Ottawa",
  "Refus massif des habitants de Vancouver face aux récents travaux d'aménagement routier": "Mass rejection by Vancouver residents of recent road development works",
  "Approbation par 73% des citoyens de Vancouver des nouvelles pistes cyclables et bus": "Approval by 73% of Vancouver citizens of new bike and bus lanes",
  "Augmentation brutale des tarifs de transport en commun dans la ville de Vancouver": "Sharp increase in public transit fares in the city of Vancouver",

  // 4-day workweek
  "Obligation pour les salariés de Québec de réaliser des heures supplémentaires le week-end": "Requirement for Quebec employees to work overtime on weekends",
  "Réduction de l'épuisement professionnel de 31% et maintien de la productivité à Québec": "31% reduction in burnout and maintenance of productivity in Quebec",
  "Obligation pour les salariés de Ottawa de réaliser des heures supplémentaires le week-end": "Requirement for Ottawa employees to work overtime on weekends",
  "Réduction de l'épuisement professionnel de 33% et maintien de la productivité à Ottawa": "33% reduction in burnout and maintenance of productivity in Ottawa",
  "Obligation pour les salariés de Vancouver de réaliser des heures supplémentaires le week-end": "Requirement for Vancouver employees to work overtime on weekends",
  "Réduction de l'épuisement professionnel de 34% et maintien de la productivité à Vancouver": "34% reduction in burnout and maintenance of productivity in Vancouver",

  // Culture / Festival
  "Fermeture définitive de la principale salle de spectacle de la ville de Québec": "Permanent closure of the main entertainment venue in Quebec",
  "Valorisation de 16 groupes régionaux et de la scène musicale locale à Québec": "Promotion of 16 regional music groups and local music scene in Quebec",
  "Fermeture définitive de la principale salle de spectacle de la ville de Ottawa": "Permanent closure of the main entertainment venue in Ottawa",
  "Valorisation de 19 groupes régionaux et de la scène musicale locale à Ottawa": "Promotion of 19 regional music groups and local music scene in Ottawa",
  "Fermeture définitive de la principale salle de spectacle de la ville de Vancouver": "Permanent closure of the main entertainment venue in Vancouver",
  "Valorisation de 22 groupes régionaux et de la scène musicale locale à Vancouver": "Promotion of 22 regional music groups and local music scene in Vancouver",

  // Bulk grocery
  "Disparition complète des commerces de proximité dans le centre-ville de Québec": "Complete disappearance of local convenience stores in downtown Quebec",
  "Économies de 16% sur le budget alimentaire et élimination des emballages plastiques à Québec": "16% savings on grocery budgets and elimination of plastic packaging in Quebec",
  "Disparition complète des commerces de proximité dans le centre-ville de Ottawa": "Complete disappearance of local convenience stores in downtown Ottawa",
  "Économies de 18% sur le budget alimentaire et élimination des emballages plastiques à Ottawa": "18% savings on grocery budgets and elimination of plastic packaging in Ottawa",
  "Disparition complète des commerces de proximité dans le centre-ville de Vancouver": "Complete disappearance of local convenience stores in downtown Vancouver",
  "Économies de 19% sur le budget alimentaire et élimination des emballages plastiques à Vancouver": "19% savings on grocery budgets and elimination of plastic packaging in Vancouver",

  // Senior solidarity
  "Soutien bénévole et visites de convivialité pour 140 séniors isolés à Québec": "Volunteer support and friendly home visits for 140 isolated seniors in Quebec",
  "Soutien bénévole et visites de convivialité pour 160 séniors isolés à Ottawa": "Volunteer support and friendly home visits for 160 isolated seniors in Ottawa",
  "Soutien bénévole et visites de convivialité pour 180 séniors isolés à Vancouver": "Volunteer support and friendly home visits for 180 isolated seniors in Vancouver",

  // Ecotourism
  "Engouement de 24% pour les hébergements écologiques et mobilités douces à Québec": "24% increase in demand for eco-lodges and soft mobility in Quebec",
  "Engouement de 26% pour les hébergements écologiques et mobilités douces à Ottawa": "26% increase in demand for eco-lodges and soft mobility in Ottawa",
  "Engouement de 28% pour les hébergements écologiques et mobilités douces à Vancouver": "28% increase in demand for eco-lodges and soft mobility in Vancouver",

  // B2 debates topics
  "L'augmentation de la productivité horaire constatée dans les entreprises pilotes de Québec": "Hourly productivity gains observed in Quebec pilot businesses",
  "L'approvisionnement exclusif auprès des fermes régionales entourant la ville de Québec": "Exclusive sourcing from regional farms surrounding Quebec City",
  "Le passage au vaisselle lavable et réutilisable dans tous les fast-foods de Québec": "Transition to washable reusable tableware in all Quebec fast-food outlets",
  "Le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à Québec": "Mandatory parking in designated bays to prevent sidewalk clutter in Quebec",
  "La préservation de la biodiversité locale contre le grignotage immobilier autour de Québec": "Local biodiversity protection against urban sprawl around Quebec City",
  "L'octroi d'une prime de transition pour le raccordement au réseau de chaleur de Québec": "Provision of a transition grant for connection to Quebec City's heating grid",
  "L'interdiction d'envoyer des courriels professionnels le week-end aux employés de Québec": "Prohibition of sending work emails on weekends to Quebec employees",

  "L'augmentation de la productivité horaire constatée dans les entreprises pilotes d'Ottawa": "Hourly productivity gains observed in Ottawa pilot businesses",
  "L'approvisionnement exclusif auprès des fermes régionales entourant la ville d'Ottawa": "Exclusive sourcing from regional farms surrounding Ottawa",
  "Le passage au vaisselle lavable et réutilisable dans tous les fast-foods d'Ottawa": "Transition to washable reusable tableware in all Ottawa fast-food outlets",
  "Le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à Ottawa": "Mandatory parking in designated bays to prevent sidewalk clutter in Ottawa",
  "La préservation de la biodiversité locale contre le grignotage immobilier autour d'Ottawa": "Local biodiversity protection against urban sprawl around Ottawa",
  "L'octroi d'une prime de transition pour le raccordement au réseau de chaleur d'Ottawa": "Provision of a transition grant for connection to Ottawa's heating grid",
  "L'interdiction d'envoyer des courriels professionnels le week-end aux employés d'Ottawa": "Prohibition of sending work emails on weekends to Ottawa employees",

  "La collecte séparée des biodéchets ménagers dans tous les quartiers de Toronto": "Separate collection of household organic waste in all Toronto neighborhoods",
  "La préservation du sommeil des riverains par l'arrêt des atterrissages entre 23h et 6h à Toronto": "Preservation of residents' sleep by halting nighttime flight landings between 11:00 PM and 6:00 AM in Toronto",

  // C1/C2 Philosophy & Science
  "L'intégration de la ventilation naturelle et du végétal dans la conception architecturale": "Integration of natural ventilation and living greenery in architectural design",
  "Le dépassement du biais partisan par l'institution de jurés citoyens décisionnaires": "Overcoming partisan bias through empowered citizen decision-making juries",
  "La stricte distinction entre thérapie génique réparatrice et eugénisme d'amélioration": "The strict distinction between restorative gene therapy and enhancement eugenics",
  "L'illusion du passage du temps absolu au sein du continuum espace-temps quadridimensionnel": "The illusion of absolute time flow within the four-dimensional spacetime continuum",
  "La fragmentation de la narration visant à déstabiliser l'illusion d'une vérité unique": "Narrative fragmentation aimed at destabilizing the illusion of a single truth",
  "La détection d'activités cérébrales prédictives antérieures à la prise de conscience de la décision": "Detection of predictive neural activity prior to conscious decision awareness"
};
