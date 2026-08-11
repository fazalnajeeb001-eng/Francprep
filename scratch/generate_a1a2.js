import fs from 'fs';

// Helper to build 110 unique A1 & A2 TCF listening documents (10 papers * 11 questions)
const items = [];

const cities = ["Montréal", "Québec", "Ottawa", "Vancouver", "Toronto", "Calgary", "Sherbrooke", "Trois-Rivières", "Gatineau", "Moncton"];

for (let p = 1; p <= 10; p++) {
  const city = cities[(p - 1) % cities.length];
  
  // Q5 (A1 - Public Announcement / Station / Airport / Store / Weather)
  items.push({
    level: "A1",
    title: `Annonce Transport A1 P${p}Q5`,
    text: `Annonce gare de ${city} : Le train express N°${400 + p * 12} à destination de la gare centrale partira exceptionnellement de la voie ${p + 1} à ${10 + p}h15.`,
    opt: [
      `Départ du train express pour la gare centrale voie ${p + 1} à ${10 + p}h15`,
      `Annulation complète du trajet en raison d'un problème technique`,
      `Changement de destination du train vers la gare du Nord`,
      `Fermeture temporaire du guichet de vente des billets`
    ],
    ans: 0,
    tr: `Annonce gare de ${city} : Le train express N°${400 + p * 12} partira voie ${p + 1} à ${10 + p}h15.`,
    en: `Station announcement in ${city}: Express train N°${400 + p * 12} departs track ${p + 1} at ${10 + p}:15.`,
    hint: `⚠️ Trap Alert: Identify track number (voie ${p + 1}) and time (${10 + p}h15).`
  });

  // Q6 (A1 - Store Announcement / Supermarket Promotion)
  items.push({
    level: "A1",
    title: `Annonce Magasin A1 P${p}Q6`,
    text: `Annonce supermarché à ${city} : Offre spéciale aujourd'hui au rayon n°${p}. Pour deux articles achetés, le troisième est à moitié prix jusqu'à 19h.`,
    opt: [
      `Offre promotionnelle au rayon n°${p} avec le 3e article à demi-prix`,
      `Fermeture exceptionnelle du magasin en raison de travaux`,
      `Arrivée de nouveaux produits d'entretien écologiques`,
      `Distribution gratuite de cartes de fidélité à l'accueil`
    ],
    ans: 0,
    tr: `Annonce supermarché : Offre spéciale au rayon n°${p}, le 3e article est à demi-prix.`,
    en: `Store announcement: Special offer in aisle ${p}, 3rd item at half price.`,
    hint: `⚠️ Trap Alert: Note promotion deal (3rd item half price in aisle ${p}).`
  });

  // Q7 (A1 - Weather Alert / Hotel Notice / Service Update)
  items.push({
    level: "A1",
    title: `Annonce Météo & Service A1 P${p}Q7`,
    text: `Bulletin météo pour ${city} : Des rafales de vent accompagnées de fortes pluies sont prévues en fin d'après-midi. La température extérieure sera de ${12 + p}°C.`,
    opt: [
      `Prévision de vent fort et pluie avec une température de ${12 + p}°C`,
      `Vague de chaleur et soleil radieux toute la journée`,
      `Chute de neige abondante bloquant la circulation routière`,
      `Aucun changement climatique annoncé pour le week-end`
    ],
    ans: 0,
    tr: `Bulletin météo pour ${city} : Pluie et vent prévus avec ${12 + p}°C.`,
    en: `Weather forecast for ${city}: Rain and strong wind expected with ${12 + p}°C.`,
    hint: `⚠️ Trap Alert: Focus on weather warning (pluie/vent) and temperature (${12 + p}°C).`
  });

  // Q8 (A2 - Voicemail Doctor / Dentist Appointment)
  items.push({
    level: "A2",
    title: `Message Médical A2 P${p}Q8`,
    text: `Bonjour, ici le secrétariat médical du docteur Tremblay à ${city}. Nous vous rappellons votre rendez-up de suivi fixé à mardi prochain à ${9 + (p % 4)}h30. Merci d'apporter votre carte de santé.`,
    opt: [
      `Rappel du rendez-vous médical de suivi fixé à mardi à ${9 + (p % 4)}h30`,
      `Annulation définitive de la consultation par le médecin`,
      `Changement d'adresse du cabinet médical de quartier`,
      `Demande d'envoi des résultats d'analyse par courrier`
    ],
    ans: 0,
    tr: `Bonjour, ici le secrétariat médical. Votre rendez-vous de suivi est mardi à ${9 + (p % 4)}h30.`,
    en: `Hello, medical office calling. Your follow-up appointment is Tuesday at ${9 + (p % 4)}:30.`,
    hint: `⚠️ Trap Alert: Identify confirmed day (mardi) and time (${9 + (p % 4)}h30).`
  });

  // Q9 (A2 - Voicemail Garage / Mechanic Auto Repair)
  items.push({
    level: "A2",
    title: `Message Garage Auto A2 P${p}Q9`,
    text: `Bonjour, votre garage automobile de ${city} vous informe que la révision de votre véhicule et le remplacement des freins sont terminés. Le montant total est de ${180 + p * 15}$. Vous pouvez passer avant 18h.`,
    opt: [
      `Véhicule prêt après révision et freins pour un montant de ${180 + p * 15}$`,
      `Retard des travaux en raison d'une pièce manquante`,
      `Obligation de laisser la voiture au garage tout le week-end`,
      `Fermeture annuelle du garage automobile dès ce soir`
    ],
    ans: 0,
    tr: `Votre véhicule est prêt suite aux travaux de révision. Total: ${180 + p * 15}$.`,
    en: `Your car is ready after brake replacement and service. Total: $${180 + p * 15}.`,
    hint: `⚠️ Trap Alert: Identify completion status and total bill ($${180 + p * 15}).`
  });

  // Q10 (A2 - Voicemail Parcel Delivery / Locker Pickup)
  items.push({
    level: "A2",
    title: `Message Livraison Colis A2 P${p}Q10`,
    text: `Bonjour, le service de livraison vous informe que votre colis n°${8000 + p * 37} est disponible au guichet automatique de la rue Principale. Votre code d'accès est le ${4000 + p * 11}.`,
    opt: [
      `Colis disponible en consignes automatiques avec le code ${4000 + p * 11}`,
      `Impossibilité de livrer le colis en raison d'une adresse erronée`,
      `Retour du colis à l'expéditeur d'origine`,
      `Paiement obligatoire de frais de douane supplémentaires`
    ],
    ans: 0,
    tr: `Votre colis n°${8000 + p * 37} est disponible. Code d'accès: ${4000 + p * 11}.`,
    en: `Your parcel N°${8000 + p * 37} is ready in the locker. Access code: ${4000 + p * 11}.`,
    hint: `⚠️ Trap Alert: Identify access code (${4000 + p * 11}) and pickup location.`
  });

  // Q11 (A2 - Voicemail Real Estate Apartment Visit)
  items.push({
    level: "A2",
    title: `Message Agence Immobilière A2 P${p}Q11`,
    text: `Bonjour, l'agence immobilière de ${city} vous confirme la visite de l'appartement 3 pièces prévue ce jeudi à ${14 + (p % 4)}h00. Le point de rendez-vous est fixé devant l'immeuble.`,
    opt: [
      `Confirmation de la visite de l'appartement ce jeudi à ${14 + (p % 4)}h00`,
      `Annulation du rendez-up car le logement a été loué`,
      `Augmentation du montant du loyer mensuel demandé`,
      `Report de la visite à la fin du mois prochain`
    ],
    ans: 0,
    tr: `L'agence vous confirme la visite de l'appartement ce jeudi à ${14 + (p % 4)}h00.`,
    en: `Real estate agency confirms apartment viewing this Thursday at ${2 + (p % 4)}:00 PM.`,
    hint: `⚠️ Trap Alert: Identify confirmed visit day (jeudi) and time.`
  });

  // Q12 (A2 - Voicemail Hair Salon / Beauty Appointment)
  items.push({
    level: "A2",
    title: `Message Salon de Coiffure A2 P${p}Q12`,
    text: `Bonjour, le salon de coiffure de ${city} vous informe que votre coiffeuse habituelle sera absente vendredi. Nous vous proposons d'avancer votre rendez-vous à jeudi à ${11 + (p % 3)}h.`,
    opt: [
      `Proposition de modifier le rendez-vous à jeudi à ${11 + (p % 3)}h en raison d'une absence`,
      `Confirmation du rendez-up de vendredi sans aucun changement`,
      `Fermeture définitive du salon de coiffure pour travaux`,
      `Offre d'une réduction exceptionnelle sur les soins capillaires`
    ],
    ans: 0,
    tr: `Changement de rendez-vous proposé à jeudi à ${11 + (p % 3)}h suite à une absence.`,
    en: `Hair salon proposes moving appointment to Thursday at ${11 + (p % 3)} AM due to staff absence.`,
    hint: `⚠️ Trap Alert: Identify proposed alternative slot (jeudi) and reason (absence).`
  });

  // Q13 (A2 - Voicemail Sports Club / Gym Schedule Change)
  items.push({
    level: "A2",
    title: `Message Club de Sport A2 P${p}Q13`,
    text: `Bonjour, l'équipe du centre sportif de ${city} vous informe que la séance d'entraînement de natation de ce samedi est déplacée au bassin extérieur à partir de ${10 + (p % 3)}h.`,
    opt: [
      `Changement de lieu et d'horaire pour l'entraînement de natation ce samedi`,
      `Annulation définitive de l'inscription au club de sport`,
      `Augmentation de la cotisation annuelle pour les membres`,
      `Fermeture des vestiaires du centre pour travaux d'assainissement`
    ],
    ans: 0,
    tr: `L'entraînement de natation de samedi est déplacé au bassin extérieur à ${10 + (p % 3)}h.`,
    en: `Saturday swimming practice moved to outdoor pool at ${10 + (p % 3)} AM.`,
    hint: `⚠️ Trap Alert: Identify change of location (bassin extérieur) and start time.`
  });

  // Q14 (A2 - Voicemail Library / Book Reservation)
  items.push({
    level: "A2",
    title: `Message Médiathèque A2 P${p}Q14`,
    text: `Bonjour, la bibliothèque municipale de ${city} vous informe que le livre d'histoire que vous avez réservé est arrivé. Vous avez jusqu'à samedi ${16 + (p % 3)}h pour venir le récupérer.`,
    opt: [
      `Ouvrage réservé disponible à la bibliothèque à retirer avant samedi ${16 + (p % 3)}h`,
      `Obligation de payer une amende pour retard de restitution`,
      `Perte définitive de l'ouvrage emprunté par la médiathèque`,
      `Rappel de la date de renouvellement de la carte d'abonné`
    ],
    ans: 0,
    tr: `Votre livre réservé est disponible à la bibliothèque jusqu'à samedi ${16 + (p % 3)}h.`,
    en: `Reserved book is available at the library until Saturday ${4 + (p % 3)} PM.`,
    hint: `⚠️ Trap Alert: Identify pickup deadline (samedi) for reserved item.`
  });

  // Q15 (A2 - Voicemail HR / Job Interview)
  items.push({
    level: "A2",
    title: `Message Recrutement Emploi A2 P${p}Q15`,
    text: `Bonjour, le service des ressources humaines de l'entreprise à ${city} a bien reçu votre candidature. Nous souhaiterions vous proposer un entretien téléphonique lundi à ${14 + (p % 3)}h30.`,
    opt: [
      `Proposition d'entretien téléphonique préalable lundi à ${14 + (p % 3)}h30`,
      `Refus immédiat de la candidature transmise par le candidat`,
      `Demande d'envoi d'une lettre de recommandation imprimée`,
      `Convocation à un examen écrit dans les locaux de l'entreprise`
    ],
    ans: 0,
    tr: `Le service RH vous propose un entretien téléphonique lundi à ${14 + (p % 3)}h30.`,
    en: `HR offers a phone interview next Monday at ${2 + (p % 3)}:30 PM.`,
    hint: `⚠️ Trap Alert: Identify format of interview (téléphonique) and proposed time.`
  });
}

console.log(`Generated ${items.length} unique A1 & A2 items.`);
console.log("Sample Item 0 (P1Q5):", JSON.stringify(items[0], null, 2));
