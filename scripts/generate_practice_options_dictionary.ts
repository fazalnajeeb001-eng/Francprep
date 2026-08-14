import * as fs from "fs";

const uniqueOpts: string[] = JSON.parse(fs.readFileSync("scratch/unique_french_options.json", "utf-8"));

console.log(`Building translation dictionary for ${uniqueOpts.length} options...`);

export function translateFrenchOptionText(fr: string): string {
  const t = fr.trim();

  // Pattern-based and exact dictionary translations
  const exactMap: Record<string, string> = {
    // Platform announcements
    "Départ du train express pour la gare centrale de Montréal voie 2 à 11h15": "Departure of the express train to Montreal Central Station from track 2 at 11:15 AM",
    "Fermeture temporaire du guichet de vente des billets de la gare de Montréal": "Temporary closure of the ticket sales counter at Montreal station",
    "Annulation complète du trajet vers Montréal en raison d'un problème technique": "Complete cancellation of the trip to Montreal due to a technical issue",
    "Changement de destination du train vers la gare du Nord à 11h15": "Change of train destination to North Station at 11:15 AM",

    "Départ du train express pour la gare centrale de Québec voie 3 à 12h15": "Departure of the express train to Quebec Central Station from track 3 at 12:15 PM",
    "Fermeture temporaire du guichet de vente des billets de la gare de Québec": "Temporary closure of the ticket sales counter at Quebec station",
    "Annulation complète du trajet vers Québec en raison d'un problème technique": "Complete cancellation of the trip to Quebec due to a technical issue",
    "Changement de destination du train vers la gare du Nord à 12h15": "Change of train destination to North Station at 12:15 PM",

    "Départ du train express pour la gare centrale de Ottawa voie 4 à 13h15": "Departure of the express train to Ottawa Central Station from track 4 at 1:15 PM",
    "Fermeture temporaire du guichet de vente des billets de la gare de Ottawa": "Temporary closure of the ticket sales counter at Ottawa station",
    "Annulation complète du trajet vers Ottawa en raison d'un problème technique": "Complete cancellation of the trip to Ottawa due to a technical issue",
    "Changement de destination du train vers la gare du Nord à 13h15": "Change of train destination to North Station at 1:15 PM",

    "Départ du train express pour la gare centrale de Vancouver voie 5 à 14h15": "Departure of the express train to Vancouver Central Station from track 5 at 2:15 PM",
    "Fermeture temporaire du guichet de vente des billets de la gare de Vancouver": "Temporary closure of the ticket sales counter at Vancouver station",
    "Annulation complète du trajet vers Vancouver en raison d'un problème technique": "Complete cancellation of the trip to Vancouver due to a technical issue",
    "Changement de destination du train vers la gare du Nord à 14h15": "Change of train destination to North Station at 2:15 PM",

    "Départ du train express pour la gare centrale de Toronto voie 6 à 15h15": "Departure of the express train to Toronto Central Station from track 6 at 3:15 PM",
    "Fermeture temporaire du guichet de vente des billets de la gare de Toronto": "Temporary closure of the ticket sales counter at Toronto station",
    "Annulation complète du trajet vers Toronto en raison d'un problème technique": "Complete cancellation of the trip to Toronto due to a technical issue",
    "Changement de destination du train vers la gare du Nord à 15h15": "Change of train destination to North Station at 3:15 PM",

    // Store promotions
    "Fermeture exceptionnelle du magasin de Montréal en raison de travaux": "Exceptional closure of the Montreal store due to construction work",
    "Distribution gratuite de cartes de fidélité à l'accueil du magasin de Montréal": "Free loyalty card distribution at the Montreal store reception desk",
    "Offre promotionnelle au rayon n°1 à Montréal avec le 3e article à demi-prix": "Special promotion in aisle 1 in Montreal with the 3rd item at half price",
    "Arrivée de nouveaux produits d'entretien écologiques au rayon n°1": "Arrival of new eco-friendly cleaning products in aisle 1",

    "Fermeture exceptionnelle du magasin de Québec en raison de travaux": "Exceptional closure of the Quebec store due to construction work",
    "Distribution gratuite de cartes de fidélité à l'accueil du magasin de Québec": "Free loyalty card distribution at the Quebec store reception desk",
    "Offre promotionnelle au rayon n°2 à Québec avec le 3e article à demi-prix": "Special promotion in aisle 2 in Quebec with the 3rd item at half price",
    "Arrivée de nouveaux produits d'entretien écologiques au rayon n°2": "Arrival of new eco-friendly cleaning products in aisle 2",

    "Fermeture exceptionnelle du magasin de Ottawa en raison de travaux": "Exceptional closure of the Ottawa store due to construction work",
    "Distribution gratuite de cartes de fidélité à l'accueil du magasin de Ottawa": "Free loyalty card distribution at the Ottawa store reception desk",
    "Offre promotionnelle au rayon n°3 à Ottawa avec le 3e article à demi-prix": "Special promotion in aisle 3 in Ottawa with the 3rd item at half price",
    "Arrivée de nouveaux produits d'entretien écologiques au rayon n°3": "Arrival of new eco-friendly cleaning products in aisle 3",

    "Fermeture exceptionnelle du magasin de Vancouver en raison de travaux": "Exceptional closure of the Vancouver store due to construction work",
    "Distribution gratuite de cartes de fidélité à l'accueil du magasin de Vancouver": "Free loyalty card distribution at the Vancouver store reception desk",
    "Offre promotionnelle au rayon n°4 à Vancouver avec le 3e article à demi-prix": "Special promotion in aisle 4 in Vancouver with the 3rd item at half price",
    "Arrivée de nouveaux produits d'entretien écologiques au rayon n°4": "Arrival of new eco-friendly cleaning products in aisle 4",

    "Fermeture exceptionnelle du magasin de Toronto en raison de travaux": "Exceptional closure of the Toronto store due to construction work",
    "Distribution gratuite de cartes de fidélité à l'accueil du magasin de Toronto": "Free loyalty card distribution at the Toronto store reception desk",
    "Offre promotionnelle au rayon n°5 à Toronto avec le 3e article à demi-prix": "Special promotion in aisle 5 in Toronto with the 3rd item at half price",
    "Arrivée de nouveaux produits d'entretien écologiques au rayon n°5": "Arrival of new eco-friendly cleaning products in aisle 5",

    // Weather options
    "Chute de neige abondante à Montréal bloquant la circulation routière": "Heavy snowfall in Montreal blocking road traffic",
    "Vague de chaleur et soleil radieux toute la journée sur Montréal": "Heatwave and bright sunshine all day over Montreal",
    "Prévision de vent fort et pluie à Montréal avec une température de 13°C": "Forecast of strong wind and rain in Montreal with a temperature of 13°C",
    "Aucun changement climatique annoncé pour le week-end à Montréal": "No weather changes announced for the weekend in Montreal",

    "Chute de neige abondante à Québec bloquant la circulation routière": "Heavy snowfall in Quebec blocking road traffic",
    "Vague de chaleur et soleil radieux toute la journée sur Québec": "Heatwave and bright sunshine all day over Quebec",
    "Prévision de vent fort et pluie à Québec avec une température de 14°C": "Forecast of strong wind and rain in Quebec with a temperature of 14°C",
    "Aucun changement climatique annoncé pour le week-end à Québec": "No weather changes announced for the weekend in Quebec",

    "Chute de neige abondante à Ottawa bloquant la circulation routière": "Heavy snowfall in Ottawa blocking road traffic",
    "Vague de chaleur et soleil radieux toute la journée sur Ottawa": "Heatwave and bright sunshine all day over Ottawa",
    "Prévision de vent fort et pluie à Ottawa avec une température de 15°C": "Forecast of strong wind and rain in Ottawa with a temperature of 15°C",
    "Aucun changement climatique annoncé pour le week-end à Ottawa": "No weather changes announced for the weekend in Ottawa",

    "Chute de neige abondante à Vancouver bloquant la circulation routière": "Heavy snowfall in Vancouver blocking road traffic",
    "Vague de chaleur et soleil radieux toute la journée sur Vancouver": "Heatwave and bright sunshine all day over Vancouver",
    "Prévision de vent fort et pluie à Vancouver avec une température de 16°C": "Forecast of strong wind and rain in Vancouver with a temperature of 16°C",
    "Aucun changement climatique annoncé pour le week-end à Vancouver": "No weather changes announced for the weekend in Vancouver",

    "Chute de neige abondante à Toronto bloquant la circulation routière": "Heavy snowfall in Toronto blocking road traffic",
    "Vague de chaleur et soleil radieux toute la journée sur Toronto": "Heatwave and bright sunshine all day over Toronto",
    "Prévision de vent fort et pluie à Toronto avec une température de 17°C": "Forecast of strong wind and rain in Toronto with a temperature of 17°C",
    "Aucun changement climatique annoncé pour le week-end à Toronto": "No weather changes announced for the weekend in Toronto",

    // Doctor appointment reminder
    "Changement d'adresse du cabinet médical de quartier à Montréal": "Address change of the local medical clinic in Montreal",
    "Annulation définitive de la consultation médicale du docteur Tremblay": "Definitive cancellation of Dr. Tremblay's medical consultation",
    "Rappel du rendez-vous médical de suivi à Montréal fixé à mardi à 9h30": "Reminder of the follow-up medical appointment in Montreal scheduled for Tuesday at 9:30 AM",
    "Demande d'envoi des résultats d'analyse médicale par courrier": "Request to send medical lab test results by mail",

    "Changement d'adresse du cabinet médical de quartier à Québec": "Address change of the local medical clinic in Quebec",
    "Annulation définitive de la consultation médicale du docteur Roy": "Definitive cancellation of Dr. Roy's medical consultation",
    "Rappel du rendez-vous médical de suivi à Québec fixé à mardi à 9h30": "Reminder of the follow-up medical appointment in Quebec scheduled for Tuesday at 9:30 AM",
    "Demande d'envoi des résultats d'analyse médicale par courrier": "Request to send medical lab test results by mail",

    "Changement d'adresse du cabinet médical de quartier à Ottawa": "Address change of the local medical clinic in Ottawa",
    "Annulation définitive de la consultation médicale du docteur Gagnon": "Definitive cancellation of Dr. Gagnon's medical consultation",
    "Rappel du rendez-vous médical de suivi à Ottawa fixé à mardi à 9h30": "Reminder of the follow-up medical appointment in Ottawa scheduled for Tuesday at 9:30 AM",

    "Changement d'adresse du cabinet médical de quartier à Vancouver": "Address change of the local medical clinic in Vancouver",
    "Annulation définitive de la consultation médicale du docteur Bouchard": "Definitive cancellation of Dr. Bouchard's medical consultation",
    "Rappel du rendez-vous médical de suivi à Vancouver fixé à mardi à 9h30": "Reminder of the follow-up medical appointment in Vancouver scheduled for Tuesday at 9:30 AM",

    "Changement d'adresse du cabinet médical de quartier à Toronto": "Address change of the local medical clinic in Toronto",
    "Annulation définitive de la consultation médicale du docteur Gauthier": "Definitive cancellation of Dr. Gauthier's medical consultation",
    "Rappel du rendez-vous médical de suivi à Toronto fixé à mardi à 9h30": "Reminder of the follow-up medical appointment in Toronto scheduled for Tuesday at 9:30 AM",

    // Garage repair
    "Retard des travaux au garage de Montréal en raison d'une pièce manquante": "Delay in repair work at the Montreal garage due to a missing part",
    "Fermeture annuelle du garage automobile de Montréal dès ce soir": "Annual closure of the Montreal auto repair garage starting this evening",
    "Obligation de laisser la voiture au garage de Montréal tout le week-end": "Requirement to leave the car at the Montreal garage for the entire weekend",
    "Véhicule prêt au garage de Montréal après révision et freins pour un montant de 195$": "Vehicle ready at the Montreal garage after service and brakes for an amount of $195",

    "Retard des travaux au garage de Québec en raison d'une pièce manquante": "Delay in repair work at the Quebec garage due to a missing part",
    "Fermeture annuelle du garage automobile de Québec dès ce soir": "Annual closure of the Quebec auto repair garage starting this evening",
    "Obligation de laisser la voiture au garage de Québec tout le week-end": "Requirement to leave the car at the Quebec garage for the entire weekend",
    "Véhicule prêt au garage de Québec après révision et freins pour un montant de 207$": "Vehicle ready at the Quebec garage after service and brakes for an amount of $207",

    "Retard des travaux au garage de Ottawa en raison d'une pièce manquante": "Delay in repair work at the Ottawa garage due to a missing part",
    "Fermeture annuelle du garage automobile de Ottawa dès ce soir": "Annual closure of the Ottawa auto repair garage starting this evening",
    "Obligation de laisser la voiture au garage de Ottawa tout le week-end": "Requirement to leave the car at the Ottawa garage for the entire weekend",
    "Véhicule prêt au garage de Ottawa après révision et freins pour un montant de 219$": "Vehicle ready at the Ottawa garage after service and brakes for an amount of $219",

    "Retard des travaux au garage de Vancouver en raison d'une pièce manquante": "Delay in repair work at the Vancouver garage due to a missing part",
    "Fermeture annuelle du garage automobile de Vancouver dès ce soir": "Annual closure of the Vancouver auto repair garage starting this evening",
    "Obligation de laisser la voiture au garage de Vancouver tout le week-end": "Requirement to leave the car at the Vancouver garage for the entire weekend",
    "Véhicule prêt au garage de Vancouver après révision et freins pour un montant de 231$": "Vehicle ready at the Vancouver garage after service and brakes for an amount of $231",

    "Retard des travaux au garage de Toronto en raison d'une pièce manquante": "Delay in repair work at the Toronto garage due to a missing part",
    "Fermeture annuelle du garage automobile de Toronto dès ce soir": "Annual closure of the Toronto auto repair garage starting this evening",
    "Obligation de laisser la voiture au garage de Toronto tout le week-end": "Requirement to leave the car at the Toronto garage for the entire weekend",
    "Véhicule prêt au garage de Toronto après révision et freins pour un montant de 243$": "Vehicle ready at the Toronto garage after service and brakes for an amount of $243",

    // Parcel locker
    "Impossibilité de livrer le colis n°8037 en raison d'une adresse erronée": "Unable to deliver parcel N°8037 due to an incorrect address",
    "Colis n°8037 disponible en consigne automatique à Montréal avec le code 4011": "Parcel N°8037 available in automated locker in Montreal with access code 4011",
    "Retour obligatoire du colis n°8037 à l'expéditeur dès demain": "Mandatory return of parcel N°8037 to sender starting tomorrow",
    "Paiement de frais de douane requis avant la livraison du colis": "Payment of customs fees required before parcel delivery",

    "Impossibilité de livrer le colis n°8074 en raison d'une adresse erronée": "Unable to deliver parcel N°8074 due to an incorrect address",
    "Colis n°8074 disponible en consigne automatique à Québec avec le code 4022": "Parcel N°8074 available in automated locker in Quebec with access code 4022",
    "Retour obligatoire du colis n°8074 à l'expéditeur dès demain": "Mandatory return of parcel N°8074 to sender starting tomorrow",

    "Impossibilité de livrer le colis n°8111 en raison d'une adresse erronée": "Unable to deliver parcel N°8111 due to an incorrect address",
    "Colis n°8111 disponible en consigne automatique à Ottawa avec le code 4033": "Parcel N°8111 available in automated locker in Ottawa with access code 4033",
    "Retour obligatoire du colis n°8111 à l'expéditeur dès demain": "Mandatory return of parcel N°8111 to sender starting tomorrow",

    "Impossibilité de livrer le colis n°8148 en raison d'une adresse erronée": "Unable to deliver parcel N°8148 due to an incorrect address",
    "Colis n°8148 disponible en consigne automatique à Vancouver avec le code 4044": "Parcel N°8148 available in automated locker in Vancouver with access code 4044",
    "Retour obligatoire du colis n°8148 à l'expéditeur dès demain": "Mandatory return of parcel N°8148 to sender starting tomorrow",

    "Impossibilité de livrer le colis n°8185 en raison d'une adresse erronée": "Unable to deliver parcel N°8185 due to an incorrect address",
    "Colis n°8185 disponible en consigne automatique à Toronto avec le code 4055": "Parcel N°8185 available in automated locker in Toronto with access code 4055",
    "Retour obligatoire du colis n°8185 à l'expéditeur dès demain": "Mandatory return of parcel N°8185 to sender starting tomorrow",

    // Real estate visit
    "Confirmation de la visite de l'appartement à Montréal ce jeudi à 11h00": "Confirmation of the apartment viewing in Montreal this Thursday at 11:00 AM",
    "Annulation du rendez-up car le logement à Montréal a déjà été loué": "Cancellation of the appointment because the apartment in Montreal has already been rented",
    "Augmentation du montant du loyer mensuel demandé pour l'appartement": "Increase in monthly rent amount requested for the apartment",
    "Report de la visite de l'appartement à Montréal à la fin du mois prochain": "Postponement of the apartment viewing in Montreal to the end of next month",

    "Confirmation de la visite de l'appartement à Québec ce jeudi à 12h00": "Confirmation of the apartment viewing in Quebec this Thursday at 12:00 PM",
    "Annulation du rendez-up car le logement à Québec a déjà été loué": "Cancellation of the appointment because the apartment in Quebec has already been rented",
    "Report de la visite de l'appartement à Québec à la fin du mois prochain": "Postponement of the apartment viewing in Quebec to the end of next month",

    "Confirmation de la visite de l'appartement à Ottawa ce jeudi à 13h00": "Confirmation of the apartment viewing in Ottawa this Thursday at 1:00 PM",
    "Annulation du rendez-up car le logement à Ottawa a déjà été loué": "Cancellation of the appointment because the apartment in Ottawa has already been rented",
    "Report de la visite de l'appartement à Ottawa à la fin du mois prochain": "Postponement of the apartment viewing in Ottawa to the end of next month",

    "Confirmation de la visite de l'appartement à Vancouver ce jeudi à 14h00": "Confirmation of the apartment viewing in Vancouver this Thursday at 2:00 PM",
    "Annulation du rendez-up car le logement à Vancouver a déjà été loué": "Cancellation of the appointment because the apartment in Vancouver has already been rented",
    "Report de la visite de l'appartement à Vancouver à la fin du mois prochain": "Postponement of the apartment viewing in Vancouver to the end of next month",

    "Confirmation de la visite de l'appartement à Toronto ce jeudi à 15h00": "Confirmation of the apartment viewing in Toronto this Thursday at 3:00 PM",
    "Annulation du rendez-up car le logement à Toronto a déjà été loué": "Cancellation of the appointment because the apartment in Toronto has already been rented",
    "Report de la visite de l'appartement à Toronto à la fin du mois prochain": "Postponement of the apartment viewing in Toronto to the end of next month",

    // Hair salon appointment change
    "Proposition de modifier le rendez-vous au salon de Montréal à jeudi à 10h en raison d'une absence": "Proposal to change the Montreal salon appointment to Thursday at 10:00 AM due to staff absence",
    "Confirmation du rendez-vous de vendredi au salon de Montréal sans aucun changement": "Confirmation of Friday's appointment at the Montreal salon without any changes",
    "Fermeture définitive du salon de coiffure de Montréal pour travaux": "Permanent closure of the Montreal hair salon for renovations",
    "Offre d'une réduction exceptionnelle sur les soins capillaires au salon": "Offer of an exceptional discount on hair care treatments at the salon",

    "Proposition de modifier le rendez-vous au salon de Québec à jeudi à 11h en raison d'une absence": "Proposal to change the Quebec salon appointment to Thursday at 11:00 AM due to staff absence",
    "Confirmation du rendez-vous de vendredi au salon de Québec sans aucun changement": "Confirmation of Friday's appointment at the Quebec salon without any changes",
    "Fermeture définitive du salon de coiffure de Québec pour travaux": "Permanent closure of the Quebec hair salon for renovations",

    "Proposition de modifier le rendez-vous au salon de Ottawa à jeudi à 12h en raison d'une absence": "Proposal to change the Ottawa salon appointment to Thursday at 12:00 PM due to staff absence",
    "Confirmation du rendez-vous de vendredi au salon de Ottawa sans aucun changement": "Confirmation of Friday's appointment at the Ottawa salon without any changes",
    "Fermeture définitive du salon de coiffure de Ottawa pour travaux": "Permanent closure of the Ottawa hair salon for renovations",

    "Proposition de modifier le rendez-vous au salon de Vancouver à jeudi à 13h en raison d'une absence": "Proposal to change the Vancouver salon appointment to Thursday at 1:00 PM due to staff absence",
    "Confirmation du rendez-vous de vendredi au salon de Vancouver sans aucun changement": "Confirmation of Friday's appointment at the Vancouver salon without any changes",
    "Fermeture définitive du salon de coiffure de Vancouver pour travaux": "Permanent closure of the Vancouver hair salon for renovations",

    "Proposition de modifier le rendez-vous au salon de Toronto à jeudi à 14h en raison d'une absence": "Proposal to change the Toronto salon appointment to Thursday at 2:00 PM due to staff absence",
    "Confirmation du rendez-vous de vendredi au salon de Toronto sans aucun changement": "Confirmation of Friday's appointment at the Toronto salon without any changes",
    "Fermeture définitive du salon de coiffure de Toronto pour travaux": "Permanent closure of the Toronto hair salon for renovations",

    // Sports club pool
    "Déplacement de l'entraînement de natation au bassin extérieur à Montréal ce samedi à 9h": "Relocation of swim practice to the outdoor pool in Montreal this Saturday at 9:00 AM",
    "Annulation pure et simple de l'activité sportive du week-end à Montréal": "Outright cancellation of the weekend sporting activity in Montreal",
    "Organisation d'un tournoi régional de natation ouvert à tous": "Organization of a regional swimming tournament open to all",
    "Fermeture définitive du centre sportif municipal de Montréal": "Permanent closure of the Montreal municipal sports center",

    "Déplacement de l'entraînement de natation au bassin extérieur à Québec ce samedi à 10h": "Relocation of swim practice to the outdoor pool in Quebec this Saturday at 10:00 AM",
    "Annulation pure et simple de l'activité sportive du week-end à Québec": "Outright cancellation of the weekend sporting activity in Quebec",
    "Fermeture définitive du centre sportif municipal de Québec": "Permanent closure of the Quebec municipal sports center",

    "Déplacement de l'entraînement de natation au bassin extérieur à Ottawa ce samedi à 11h": "Relocation of swim practice to the outdoor pool in Ottawa this Saturday at 11:00 AM",
    "Annulation pure et simple de l'activité sportive du week-end à Ottawa": "Outright cancellation of the weekend sporting activity in Ottawa",
    "Fermeture définitive du centre sportif municipal de Ottawa": "Permanent closure of the Ottawa municipal sports center",

    "Déplacement de l'entraînement de natation au bassin extérieur à Vancouver ce samedi à 12h": "Relocation of swim practice to the outdoor pool in Vancouver this Saturday at 12:00 PM",
    "Annulation pure et simple de l'activité sportive du week-end à Vancouver": "Outright cancellation of the weekend sporting activity in Vancouver",
    "Fermeture définitive du centre sportif municipal de Vancouver": "Permanent closure of the Vancouver municipal sports center",

    "Déplacement de l'entraînement de natation au bassin extérieur à Toronto ce samedi à 13h": "Relocation of swim practice to the outdoor pool in Toronto this Saturday at 1:00 PM",
    "Annulation pure et simple de l'activité sportive du week-end à Toronto": "Outright cancellation of the weekend sporting activity in Toronto",
    "Fermeture définitive du centre sportif municipal de Toronto": "Permanent closure of the Toronto municipal sports center",

    // Pharmacy pickup
    "Ordonnance prête à être récupérée à la pharmacie de Montréal jusqu'à 20h": "Prescription ready for pickup at the Montreal pharmacy until 8:00 PM",
    "Rupture de stock définitive du médicament commandé à Montréal": "Permanent out-of-stock status of the medication ordered in Montreal",
    "Demande d'une nouvelle prescription médicale du médecin traitant": "Request for a new medical prescription from the treating physician",
    "Changement des horaires d'ouverture de la pharmacie le week-end": "Change in weekend opening hours for the pharmacy",

    "Ordonnance prête à être récupérée à la pharmacie de Québec jusqu'à 20h": "Prescription ready for pickup at the Quebec pharmacy until 8:00 PM",
    "Rupture de stock définitive du médicament commandé à Québec": "Permanent out-of-stock status of the medication ordered in Quebec",
    "Ordonnance prête à être récupérée à la pharmacie de Ottawa jusqu'à 20h": "Prescription ready for pickup at the Ottawa pharmacy until 8:00 PM",
    "Rupture de stock définitive du médicament commandé à Ottawa": "Permanent out-of-stock status of the medication ordered in Ottawa",
    "Ordonnance prête à être récupérée à la pharmacie de Vancouver jusqu'à 20h": "Prescription ready for pickup at the Vancouver pharmacy until 8:00 PM",
    "Rupture de stock définitive du médicament commandé à Vancouver": "Permanent out-of-stock status of the medication ordered in Vancouver",
    "Ordonnance prête à être récupérée à la pharmacie de Toronto jusqu'à 20h": "Prescription ready for pickup at the Toronto pharmacy until 8:00 PM",
    "Rupture de stock définitive du médicament commandé à Toronto": "Permanent out-of-stock status of the medication ordered in Toronto",

    // Library reservation
    "Livre réservé disponible pour retrait à la bibliothèque de Montréal sous 5 jours": "Reserved book available for pickup at the Montreal library within 5 days",
    "Perte définitive de l'ouvrage demandé par l'usager de Montréal": "Permanent loss of the book requested by the Montreal patron",
    "Application d'une pénalité de retard pour un emprunt non rendu": "Application of a late penalty fee for an unreturned borrowed item",
    "Prolongation automatique de tous les prêts en cours de la bibliothèque": "Automatic renewal of all current library loans",

    "Livre réservé disponible pour retrait à la bibliothèque de Québec sous 5 jours": "Reserved book available for pickup at the Quebec library within 5 days",
    "Perte définitive de l'ouvrage demandé par l'usager de Québec": "Permanent loss of the book requested by the Quebec patron",
    "Livre réservé disponible pour retrait à la bibliothèque de Ottawa sous 5 jours": "Reserved book available for pickup at the Ottawa library within 5 days",
    "Perte définitive de l'ouvrage demandé par l'usager de Ottawa": "Permanent loss of the book requested by the Ottawa patron",
    "Livre réservé disponible pour retrait à la bibliothèque de Vancouver sous 5 jours": "Reserved book available for pickup at the Vancouver library within 5 days",
    "Perte définitive de l'ouvrage demandé par l'usager de Vancouver": "Permanent loss of the book requested by the Vancouver patron",
    "Livre réservé disponible pour retrait à la bibliothèque de Toronto sous 5 jours": "Reserved book available for pickup at the Toronto library within 5 days",
    "Perte définitive de l'ouvrage demandé par l'usager de Toronto": "Permanent loss of the book requested by the Toronto patron"
  };

  if (exactMap[t]) return exactMap[t];
  return "";
}

console.log("Dictionary builder configured.");
