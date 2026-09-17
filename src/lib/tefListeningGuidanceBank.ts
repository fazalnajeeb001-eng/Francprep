/**
 * 🇨🇦 Official TEF Canada Listening Guidance Bank (Paper 1)
 * Strictly zero-leak pre-submission guidance + exhaustive post-submission distractor breakdown.
 */

export interface TefListeningGuidance {
  id: string;
  trapAlert: string;
  trapAlertEn: string;
  audioCoach: string;
  audioCoachEn: string;
  detailedExplanation: string;
  detailedExplanationEn: string;
}

export const TEF_PAPER_1_LISTENING_GUIDANCE: Record<string, TefListeningGuidance> = {
  "tef-p1-co-q01": {
    id: "tef-p1-co-q01",
    trapAlert: "⚠️ Piège A1 : Attention à l'inversion de numéro de voie ! La voyageuse mentionne la voie 4, mais l'agent rectifie immédiatement en annonçant la voie 7.",
    trapAlertEn: "⚠️ A1 Trap: Watch out for the platform number switch! The traveler asks about track 4, but the agent corrects her by stating track 7.",
    audioCoach: "🎯 Stratégie TEF : Isolez les mots-clés de l'environnement ferroviaire ('train pour Québec', 'quai', 'voie', 'départ').",
    audioCoachEn: "🎯 TEF Strategy: Isolate railway keywords ('train pour Québec', 'quai', 'voie', 'départ').",
    detailedExplanation: "🎯 Réponse exacte : Une voyageuse demandant son quai de départ à un agent ferroviaire.\n\n• Justification textuelle :\nLa voyageuse demande : « est-ce que le train pour Québec part bien de la voie 4 ? », et l'agent répond : « Il partira de la voie 7 dans dix minutes. ».\n\n• Analyse des distracteurs :\n- Billet de cinéma : Aucun terme lié à une salle de spectacle.\n- Enregistrement aéroportuaire : Il s'agit d'un train et non d'un vol aérien.\n- Station-service : Le cadre est expressément un quai de gare.",
    detailedExplanationEn: "🎯 Correct Answer: A traveler asking a railway agent for her departure platform.\n\n• Textual Evidence:\nThe passenger asks: 'is the train for Quebec City really departing from platform 4?', and the station agent replies: 'It will depart from platform 7 in ten minutes.'\n\n• Distractor Breakdown:\n- Cinema ticket: No film-related terminology.\n- Airport check-in: It refers to a train, not an aircraft.\n- Gas station: The setting is clearly a railway station."
  },
  "tef-p1-co-q02": {
    id: "tef-p1-co-q02",
    trapAlert: "⚠️ Piège A1 : Ne confondez pas le lieu de vente avec un restaurant ou une épicerie en entendant 'prendre'.",
    trapAlertEn: "⚠️ A1 Trap: Do not confuse the bakery counter with a restaurant when hearing 'prendre'.",
    audioCoach: "🎯 Stratégie TEF : Repérez les produits de boulangerie traditionnels ('baguettes bien cuites', 'croissants au beurre').",
    audioCoachEn: "🎯 TEF Strategy: Spot traditional bakery items ('baguettes bien cuites', 'croissants au beurre').",
    detailedExplanation: "🎯 Réponse exacte : Du pain et des viennoiseries dans une boulangerie.\n\n• Justification textuelle :\nLe client commande : « deux baguettes bien cuites et trois croissants au beurre ».\n\n• Analyse des distracteurs :\n- Fruits et légumes : Aucun produit maraîcher n'est cité.\n- Pharmacie : Aucun rapport avec des médicaments.\n- Restaurant rapide : La commande porte sur des produits artisanaux de boulangerie.",
    detailedExplanationEn: "🎯 Correct Answer: Bread and pastries in a bakery.\n\n• Textual Evidence:\nThe customer orders: 'two well-done baguettes and three butter croissants'.\n\n• Distractor Breakdown:\n- Fruits & veggies: No market produce mentioned.\n- Pharmacy: No medical goods.\n- Fast food: The order strictly concerns artisanal bakery goods."
  },
  "tef-p1-co-q03": {
    id: "tef-p1-co-q03",
    trapAlert: "⚠️ Piège A2 : Ne confondez pas le médecin traitant avec un accueil administratif d'entreprise.",
    trapAlertEn: "⚠️ A2 Trap: Do not mistake the medical clinic for a corporate front desk.",
    audioCoach: "🎯 Stratégie TEF : Identifiez les termes médicaux clés ('docteur', 'rappel de vaccin', 'salle d'attente').",
    audioCoachEn: "🎯 TEF Strategy: Identify medical terminology ('docteur', 'rappel de vaccin', 'salle d'attente').",
    detailedExplanation: "🎯 Réponse exacte : À l'accueil d'un cabinet médical.\n\n• Justification textuelle :\nLe patient déclare : « j'ai rendez-vous avec le docteur Laurent (...) pour mon rappel de vaccin », et la secrétaire l'invite à patienter en « salle d'attente ».\n\n• Analyse des distracteurs :\n- Bibliothèque : Incompatible avec un acte médical.\n- Caisse de supermarché : Aucun achat de marchandises.\n- Hall d'hôtel : La mention explicite du docteur et du vaccin l'écarte formellement.",
    detailedExplanationEn: "🎯 Correct Answer: At the reception of a medical practice.\n\n• Textual Evidence:\nThe patient states: 'I have an appointment with Dr. Laurent (...) for my booster vaccine', and the secretary tells him to wait in the 'waiting room'.\n\n• Distractor Breakdown:\n- Library: Incompatible with a medical procedure.\n- Supermarket: No retail items purchased.\n- Hotel: The doctor and vaccine references rule this out."
  },
  "tef-p1-co-q04": {
    id: "tef-p1-co-q04",
    trapAlert: "⚠️ Piège A2 : Distinguez bien la réparation technique de l'achat ou de la location d'un engin.",
    trapAlertEn: "⚠️ A2 Trap: Distinguish mechanical repairs from equipment rentals or sales.",
    audioCoach: "🎯 Stratégie TEF : Écoutez l'objet de l'avarie mécanique ('câble de mon frein arrière', 'patins', 'remplace le câble').",
    audioCoachEn: "🎯 TEF Strategy: Listen for the mechanical failure ('câble de mon frein arrière', 'patins', 'remplace le câble').",
    detailedExplanation: "🎯 Réponse exacte : La réparation mécanique d'un système de freinage de vélo.\n\n• Justification textuelle :\nLe cycliste explique : « le câble de mon frein arrière s'est détendu (...) Vous pourriez y jeter un coup d'œil ? ».\n\n• Analyse des distracteurs :\n- Casque de protection : Aucun achat d'équipement n'est envisagé.\n- Location de trottinette : Le cycliste apporte son propre vélo personnel.\n- Gonflage automobile : Il s'agit d'un cycle à pédales et non d'une voiture.",
    detailedExplanationEn: "🎯 Correct Answer: Mechanical repair of a bicycle braking system.\n\n• Textual Evidence:\nThe cyclist notes: 'the cable on my rear brake became loose (...) Could you take a look at it?'.\n\n• Distractor Breakdown:\n- Helmet: No protective accessory purchase.\n- Scooter rental: The cyclist brings his personal bike.\n- Car tire: It concerns a bicycle, not an automobile."
  },
  "tef-p1-co-q05": {
    id: "tef-p1-co-q05",
    trapAlert: "⚠️ Piège A2 : L'agent ne résilie pas la visite, il la reprogramme ('décaler le rendez-vous à samedi matin').",
    trapAlertEn: "⚠️ A2 Trap: The agent is not canceling the viewing, but rescheduling it ('décaler le rendez-vous').",
    audioCoach: "🎯 Stratégie TEF : Repérez le verbe d'action chronologique ('décaler') et le nouveau créneau proposé.",
    audioCoachEn: "🎯 TEF Strategy: Focus on the scheduling verb ('décaler') and the new proposed slot.",
    detailedExplanation: "🎯 Réponse exacte : Repousser l'horaire d'une visite de logement à une date ultérieure.\n\n• Justification textuelle :\n« Le propriétaire ayant un empêchement (...) nous devrons décaler le rendez-vous à samedi matin 10 heures. ».\n\n• Analyse des distracteurs :\n- Augmentation de loyer : Non mentionnée.\n- Annulation définitive : Il s'agit d'un report temporaire de 24h.\n- Signature de bail : La transaction en est au stade de la première visite.",
    detailedExplanationEn: "🎯 Correct Answer: Postponing an apartment viewing to a later date.\n\n• Textual Evidence:\n'As the owner has a work conflict (...) we must reschedule the visit to Saturday morning at 10 AM.'\n\n• Distractor Breakdown:\n- Rent hike: Not mentioned.\n- Permanent cancellation: It is a 24-hour postponement.\n- Lease signing: The process is merely at the viewing stage."
  },
  "tef-p1-co-q06": {
    id: "tef-p1-co-q06",
    trapAlert: "⚠️ Piège A2 : Attention, le train n'est pas supprimé, il subit un retard de 20 minutes.",
    trapAlertEn: "⚠️ A2 Trap: Note that the train is not canceled, it is delayed by 20 minutes.",
    audioCoach: "🎯 Stratégie TEF : Repérez la cause ('dysfonctionnement de la signalisation') et la conséquence temporelle ('retard').",
    audioCoachEn: "🎯 TEF Strategy: Spot the cause ('signaling malfunction') and temporal effect ('retard').",
    detailedExplanation: "🎯 Réponse exacte : Un départ différé provoqué par une anomalie technique.\n\n• Justification textuelle :\n« En raison d'un dysfonctionnement de la signalisation en amont, le train (...) subira un retard d'environ vingt minutes. ».\n\n• Analyse des distracteurs :\n- Annulation complète : Le train circule avec du retard.\n- Changement de rame : Non requis.\n- Grève : La cause est purement technique (signalisation).",
    detailedExplanationEn: "🎯 Correct Answer: A delayed departure caused by a technical anomaly.\n\n• Textual Evidence:\n'Due to a signaling malfunction up the line, the train (...) will experience an approximate twenty-minute delay.'\n\n• Distractor Breakdown:\n- Full cancellation: Train is still operating.\n- Transferring cars: Not required.\n- Strike: The cause is explicitly technical."
  },
  "tef-p1-co-q07": {
    id: "tef-p1-co-q07",
    trapAlert: "⚠️ Piège B1 : Le garagiste a déjà diagnostiqué la panne ; il attend désormais l'approbation du devis.",
    trapAlertEn: "⚠️ B1 Trap: The mechanic already inspected the car; he is now waiting for quote approval.",
    audioCoach: "🎯 Stratégie TEF : Écoutez l'expression d'attente finale : 'Nous attendons votre feu vert avant d'engager les réparations'.",
    audioCoachEn: "🎯 TEF Strategy: Listen for the closing expectation: 'Nous attendons votre feu vert'.",
    detailedExplanation: "🎯 Réponse exacte : Son accord préalable sur le montant des travaux supplémentaires.\n\n• Justification textuelle :\nLe garagiste indique le devis (« 420 dollars ») et conclut : « Nous attendons votre feu vert avant d'engager les réparations. ».\n\n• Analyse des distracteurs :\n- Règlement immédiat : Le paiement intervient après exécution des travaux.\n- Récupération immédiate : La voiture est encore démontée dans l'atelier.\n- Clés de secours : Aucune mention des clés.",
    detailedExplanationEn: "🎯 Correct Answer: Her prior approval regarding the cost of additional repair work.\n\n• Textual Evidence:\nThe mechanic states the quote ('420 dollars') and concludes: 'We await your go-ahead before beginning repairs.'\n\n• Distractor Breakdown:\n- Immediate payment: Payment occurs upon job completion.\n- Pick up car: The vehicle is in parts.\n- Spare keys: Not mentioned."
  },
  "tef-p1-co-q08": {
    id: "tef-p1-co-q08",
    trapAlert: "⚠️ Piège B1 : Les cabines sont fermées, il est interdit de s'y diriger.",
    trapAlertEn: "⚠️ B1 Trap: Fitting rooms are closed; shoppers must head directly to checkout.",
    audioCoach: "🎯 Stratégie TEF : Repérez l'injonction directe de déplacement : 'vous diriger dès à présent vers les caisses centrales'.",
    audioCoachEn: "🎯 TEF Strategy: Spot the direct movement instruction: 'vous diriger dès à présent vers les caisses'.",
    detailedExplanation: "🎯 Réponse exacte : Se rendre sans attendre aux caisses de paiement.\n\n• Justification textuelle :\n« Nous vous prions de bien vouloir vous diriger dès à présent vers les caisses centrales (...) pour régler vos achats. ».\n\n• Analyse des distracteurs :\n- Cabines : L'annonce précise qu'elles sont désormais « inaccessibles ».\n- Quitter sans payer : Totalement contraire au paiement exigé.\n- Bon d'achat : Aucune remise promotionnelle annoncée.",
    detailedExplanationEn: "🎯 Correct Answer: Proceed immediately to the checkout registers.\n\n• Textual Evidence:\n'Please proceed right now to the central registers (...) to settle your purchases.'\n\n• Distractor Breakdown:\n- Fitting rooms: The announcement notes they are now closed.\n- Leave without paying: Contradicts register settlement.\n- Voucher: No store promo mentioned."
  },
  "tef-p1-co-q09": {
    id: "tef-p1-co-q09",
    trapAlert: "⚠️ Piège B1 : Ne confondez pas 'avancé à 9 heures' (horaire plus tôt) avec 'reporté' (horaire plus tard).",
    trapAlertEn: "⚠️ B1 Trap: Do not confuse 'avancé' (moved earlier) with 'reporté' (postponed).",
    audioCoach: "🎯 Stratégie TEF : En français professionnel, 'avancer une réunion' signifie la tenir plus tôt dans la journée.",
    audioCoachEn: "🎯 TEF Strategy: In professional French, 'avancer une réunion' means rescheduling to an earlier time.",
    detailedExplanation: "🎯 Réponse exacte : L'avancement de l'horaire d'un rassemblement d'équipe.\n\n• Justification textuelle :\n« notre point de cadrage budgétaire est avancé à 9 heures demain matin (...) au lieu de 15 heures. ».\n\n• Analyse des distracteurs :\n- Annulation : La réunion a bien lieu le lendemain.\n- Départ en congé : La directrice effectue un vol professionnel ponctuel.\n- Report à la semaine suivante : Elle a lieu le lendemain matin.",
    detailedExplanationEn: "🎯 Correct Answer: Moving forward the time of a team alignment meeting.\n\n• Textual Evidence:\n'our budget alignment meeting is moved up to 9 AM tomorrow morning (...) instead of 3 PM.'\n\n• Distractor Breakdown:\n- Cancellation: The meeting still takes place.\n- Leave of absence: The director is taking an ad-hoc business flight.\n- Postponed to next week: It is held the next morning."
  },
  "tef-p1-co-q10": {
    id: "tef-p1-co-q10",
    trapAlert: "⚠️ Piège B1 : L'enregistrement en soute des bagages non étiquetés se fait 'sans frais supplémentaires' (gratuit).",
    trapAlertEn: "⚠️ B1 Trap: Gate checking unlabeled bags is 'sans frais supplémentaires' (free of charge).",
    audioCoach: "🎯 Stratégie TEF : Isolez la condition ('non étiquetés') et l'action ('enregistrés en soute sans frais').",
    audioCoachEn: "🎯 TEF Strategy: Isolate condition ('non étiquetés') and action ('enregistrés en soute sans frais').",
    detailedExplanation: "🎯 Réponse exacte : L'enregistrement gratuit en soute en l'absence d'étiquette.\n\n• Justification textuelle :\n« tous les bagages cabine non étiquetés devront être enregistrés en soute sans frais supplémentaires. ».\n\n• Analyse des distracteurs :\n- Supplément tarifaire : L'annonce stipule formellement « sans frais ».\n- Interdiction des liquides : Non abordée ici.\n- Bagage des enfants : Aucune mention d'une restriction pour les enfants.",
    detailedExplanationEn: "🎯 Correct Answer: Complimentary cargo hold check-in if lacking an identification tag.\n\n• Textual Evidence:\n'all unlabeled cabin bags must be checked into the hold at no additional charge.'\n\n• Distractor Breakdown:\n- Surcharge fee: Announcement explicitly says 'without fee'.\n- Liquids: Not discussed.\n- Children baggage: No special limit for children cited."
  },
  "tef-p1-co-q11": {
    id: "tef-p1-co-q11",
    trapAlert: "⚠️ Piège B1 : Attention à la modalité de transmission : le document doit être 'téléversé' (mis en ligne), non apporté en personne.",
    trapAlertEn: "⚠️ B1 Trap: Note the delivery medium: the certificate must be uploaded online, not brought in person.",
    audioCoach: "🎯 Stratégie TEF : Repérez le document exigé ('certificats médicaux') et l'action numérique ('téléversés').",
    audioCoachEn: "🎯 TEF Strategy: Focus on the document ('certificats médicaux') and digital upload ('téléversés').",
    detailedExplanation: "🎯 Réponse exacte : La transmission en ligne d'une attestation de santé récente.\n\n• Justification textuelle :\n« les certificats médicaux (...) datant de moins de trois mois devront impérativement être téléversés lors de la saisie. ».\n\n• Analyse des distracteurs :\n- Paiement espèces : L'inscription se déroule sur le portail citoyen en ligne.\n- Brevet de secourisme : Non demandé pour des cours d'apprentissage.\n- Séance d'essai : Non mentionnée.",
    detailedExplanationEn: "🎯 Correct Answer: Online upload of a recent medical health certificate.\n\n• Textual Evidence:\n'medical fitness certificates dated under three months must be uploaded during submission.'\n\n• Distractor Breakdown:\n- Cash payment: Handled via the online portal.\n- Lifeguard badge: Not required for student lessons.\n- Trial session: Not mentioned."
  },
  "tef-p1-co-q12": {
    id: "tef-p1-co-q12",
    trapAlert: "⚠️ Piège B1 : Le cabinet ne renvoie pas le patient chez un confrère extérieur, il propose deux options de rendez-vous en interne.",
    trapAlertEn: "⚠️ B1 Trap: The clinic does not refer out, but offers two internal appointment options.",
    audioCoach: "🎯 Stratégie TEF : Écoutez les deux choix offerts : 'ce vendredi à 11 heures ou lundi prochain à 16 heures'.",
    audioCoachEn: "🎯 TEF Strategy: Listen for the two choices: 'vendredi à 11h ou lundi prochain à 16h'.",
    detailedExplanation: "🎯 Réponse exacte : Deux alternatives d'horaires pour reprogrammer son soin.\n\n• Justification textuelle :\n« nous pouvons vous intégrer (...) ce vendredi à 11 heures ou lundi prochain à 16 heures. Rappelez notre standard pour nous indiquer votre choix. ».\n\n• Analyse des distracteurs :\n- Confrère extérieur : Le soin reste pris en charge par le même cabinet.\n- Antidouleurs : Il s'agit d'un simple détartrage préventif.\n- Remise financière : Aucune compensation financière évoquée.",
    detailedExplanationEn: "🎯 Correct Answer: Two schedule alternatives to reschedule his routine appointment.\n\n• Textual Evidence:\n'we can fit you into a priority slot this Friday at 11 AM or next Monday at 4 PM. Please call our desk back to indicate your choice.'\n\n• Distractor Breakdown:\n- External colleague: Care remains within the same practice.\n- Painkillers: It is a routine cleaning.\n- Financial discount: No discount offered."
  },
  "tef-p1-co-q13": {
    id: "tef-p1-co-q13",
    trapAlert: "⚠️ Piège B1 Micro-trottoir : Julien emploie un ton enthousiaste ('libération indispensable'), écartant toute réserve ou hésitation.",
    trapAlertEn: "⚠️ B1 Vox-pop Trap: Julien uses enthusiastic language ('libération indispensable'), leaving no room for hesitation.",
    audioCoach: "🎯 Stratégie TEF : Identifiez le champ lexical laudatif : 'libération indispensable', 'fini le vacarme', 'les rues appartiennent aux piétons'.",
    audioCoachEn: "🎯 TEF Strategy: Pinpoint the positive praise vocabulary: 'libération indispensable', 'fini le vacarme'.",
    detailedExplanation: "🎯 Réponse exacte : Il y est totalement favorable en raison des gains environnementaux et de sécurité.\n\n• Justification textuelle :\nJulien affirme : « Pour moi, c'est une libération indispensable ! Fini le vacarme permanent, la pollution de l'air (...) et la peur de se faire renverser ».\n\n• Analyse des distracteurs :\n- Prématuré : Julien n'exprime aucune réserve de délai.\n- Perte d'attractivité : C'est l'argument des commerçants opposés.\n- Week-end seulement : Il soutient la piétonnisation intégrale permanente.",
    detailedExplanationEn: "🎯 Correct Answer: He is completely supportive due to environmental and safety gains.\n\n• Textual Evidence:\nJulien states: 'For me, it is an indispensable liberation! No more permanent din, stifling air pollution (...) and fear of being hit'.\n\n• Distractor Breakdown:\n- Premature: Julien voices no delay concerns.\n- Loss of vitality: That is the opposing merchants' claim.\n- Weekends only: He backs a complete permanent pedestrian zone."
  },
  "tef-p1-co-q14": {
    id: "tef-p1-co-q14",
    trapAlert: "⚠️ Piège B1 Micro-trottoir : Chantal parle de 'catastrophe annoncée', ce qui marque une opposition catégorique sans condition positive.",
    trapAlertEn: "⚠️ B1 Vox-pop Trap: Chantal terms it a 'foretold disaster', signifying unequivocal opposition.",
    audioCoach: "🎯 Stratégie TEF : Repérez l'expression idiomatique de ruine : 'mettre la clé sous la porte' (faire faillite).",
    audioCoachEn: "🎯 TEF Strategy: Spot the bankruptcy idiom: 'mettre la clé sous la porte' (go out of business).",
    detailedExplanation: "🎯 Réponse exacte : Elle s'y oppose fermement par crainte d'une désertion commerciale.\n\n• Justification textuelle :\nChantal dénonce : « C'est une catastrophe annoncée pour le petit commerce ! (...) ils iront tous dans les centres commerciaux en périphérie et nous mettrons la clé sous la porte. ».\n\n• Analyse des distracteurs :\n- Soutien sous condition : Elle ne pose aucune condition de soutien, son rejet est total.\n- Chiffre d'affaires en hausse : Elle prédit exactement l'inverse (la faillite).\n- Gratuité des transports : Elle ne mentionne pas les transports publics, uniquement le stationnement auto.",
    detailedExplanationEn: "🎯 Correct Answer: She firmly opposes it fearing a decline in retail customers.\n\n• Textual Evidence:\nChantal protests: 'It is a foretold disaster for independent retail! (...) they will all go to suburban shopping malls and we will be forced out of business.'\n\n• Distractor Breakdown:\n- Conditional support: She offers zero conditional backing; rejection is absolute.\n- Increased revenue: She predicts the exact opposite (closure).\n- Free transit: She focuses on parking, not public transit."
  },
  "tef-p1-co-q15": {
    id: "tef-p1-co-q15",
    trapAlert: "⚠️ Piège B2 Micro-trottoir : Marc approuve l'écologie ('L'intention écologique est louable'), mais critique sévèrement l'absence de transports pour les banlieues.",
    trapAlertEn: "⚠️ B2 Vox-pop Trap: Marc endorses ecology ('intention louable'), but sharply criticizes missing suburban transit options.",
    audioCoach: "🎯 Stratégie TEF : Repérez la structure concessive : 'L'intention est louable, mais la méthode est injuste'.",
    audioCoachEn: "🎯 TEF Strategy: Spot the concessive concession: 'L'intention est louable, mais la méthode est injuste'.",
    detailedExplanation: "🎯 Réponse exacte : Partagé : favorable à l'objectif mais critique face au déficit d'infrastructures de substitution.\n\n• Justification textuelle :\nMarc nuance : « L'intention écologique est louable, mais la méthode est injuste. (...) Si on m'interdit l'accès sans parkings relais modernes ni métros réguliers (...) c'est une exclusion sociale ».\n\n• Analyse des distracteurs :\n- Totalement enthousiaste : Contredit par sa dénonciation de l'exclusion sociale.\n- Indifférent : Il habite en périphérie et se déplace en ville.\n- Confiant dans la fin des bouchons : Il ne mentionne pas la résolution des embouteillages.",
    detailedExplanationEn: "🎯 Correct Answer: Nuanced: supportive of the goal but critical of lacking transit alternatives.\n\n• Textual Evidence:\nMarc qualifies: 'The environmental intent is commendable, but the method is unfair. (...) If I am banned without modern park-and-ride hubs or frequent subway service (...) it amounts to social exclusion'.\n\n• Distractor Breakdown:\n- Fully enthusiastic: Contradicted by his social exclusion warning.\n- Indifferent: He commutes downtown from suburbs.\n- Solves traffic: Not mentioned."
  },
  "tef-p1-co-q16": {
    id: "tef-p1-co-q16",
    trapAlert: "⚠️ Piège B2 Micro-trottoir : Soraya n'est pas contre le projet, elle trouve qu'il ne va pas assez vite ni assez loin ('timidité politique coupable').",
    trapAlertEn: "⚠️ B2 Vox-pop Trap: Soraya is not anti-project; she criticizes that it is too timid and delayed ('timidité politique').",
    audioCoach: "🎯 Stratégie TEF : Décelez l'appel à l'accélération : 'attendre 2030 relève de la timidité (...) accélérer le calendrier et étendre le périmètre'.",
    audioCoachEn: "🎯 TEF Strategy: Notice the call to hasten: 'attendre 2030 relève de la timidité (...) accélérer le calendrier'.",
    detailedExplanation: "🎯 Réponse exacte : Un calendrier d'application trop lent et une portée géographique trop restreinte.\n\n• Justification textuelle :\nSoraya critique : « attendre 2030 relève de la timidité politique coupable. (...) Il faudrait accélérer le calendrier et étendre le périmètre aux premières couronnes dès demain. ».\n\n• Analyse des distracteurs :\n- Coût excessif : Elle ne formule aucune critique budgétaire.\n- Absence de concertation : Elle ne remet pas en cause le processus de vote.\n- Ponctualité des bus : Non évoquée dans ses propos.",
    detailedExplanationEn: "🎯 Correct Answer: An overly sluggish timeline and an overly restricted geographic perimeter.\n\n• Textual Evidence:\nSoraya laments: 'waiting until 2030 reflects culpable political timidity. (...) We should expedite the timeline and expand the perimeter to inner rings tomorrow.'\n\n• Distractor Breakdown:\n- Excessive cost: No budget critique made.\n- Lack of consultation: Not her objection.\n- Bus punctuality: Not mentioned."
  },
  "tef-p1-co-q17": {
    id: "tef-p1-co-q17",
    trapAlert: "⚠️ Piège B2 Micro-trottoir : Alain ne demande pas d'annuler la transition pour le plaisir, mais exige une aide financière pour compenser le prix des utilitaires électriques.",
    trapAlertEn: "⚠️ B2 Vox-pop Trap: Alain doesn't reject ecology for fun, but insists on subsidies for electric commercial vans.",
    audioCoach: "🎯 Stratégie TEF : Isolez le rapport de proportionnalité économique : 'coûtent le triple' et la condition sine qua non : 'Sans subventions intégrales'.",
    audioCoachEn: "🎯 TEF Strategy: Isolate the financial comparison: 'coûtent le triple' and the condition: 'Sans subventions intégrales'.",
    detailedExplanation: "🎯 Réponse exacte : Un soutien financier massif pour compenser le surcoût des véhicules propres.\n\n• Justification textuelle :\nAlain explique : « Les fourgonnettes électriques coûtent le triple d'un utilitaire standard. Sans subventions intégrales, les artisans déserteront le centre-ville ».\n\n• Analyse des distracteurs :\n- Autorisation générale des particuliers : Il défend le statut des artisans professionnels.\n- Exonération de cotisations sociales : Il parle du coût d'achat des véhicules, pas des charges sociales.\n- Voies souterraines : Non mentionnées.",
    detailedExplanationEn: "🎯 Correct Answer: Massive financial assistance to absorb the extra cost of clean utility fleets.\n\n• Textual Evidence:\nAlain explains: 'Electric vans cost triple what standard utilities do. Without comprehensive subsidies, craftsmen will abandon downtown'.\n\n• Distractor Breakdown:\n- General car privileges: He speaks on behalf of trade artisans.\n- Payroll tax exemption: He targets vehicle capital costs, not social contributions.\n- Underground tunnels: Not cited."
  },
  "tef-p1-co-q18": {
    id: "tef-p1-co-q18",
    trapAlert: "⚠️ Piège B2 Micro-trottoir : Élodie n'est ni purement pour ni purement contre ; elle suspend son jugement au bon fonctionnement des futures navettes.",
    trapAlertEn: "⚠️ B2 Vox-pop Trap: Elodie is neither purely pro nor con; her verdict hinges on future shuttle quality.",
    audioCoach: "🎯 Stratégie TEF : Repérez l'aveu d'indécision : 'Franchement, je n'arrive pas à me prononcer (...) Tout dépendra de la qualité des navettes'.",
    audioCoachEn: "🎯 TEF Strategy: Note the statement of indecision: 'Franchement, je n'arrive pas à me prononcer (...) Tout dépendra'.",
    detailedExplanation: "🎯 Réponse exacte : Hésitante, subordonnant son jugement final à l'efficacité des services d'assistance.\n\n• Justification textuelle :\nÉlodie déclare : « Franchement, je n'arrive pas à me prononcer. D'un côté, j'apprécie le calme (...) mais d'un autre côté, mes petits-enfants ne peuvent plus venir me chercher (...) Tout dépendra de la qualité des navettes ».\n\n• Analyse des distracteurs :\n- Résolument hostile : Elle apprécie le calme de la piétonnisation.\n- Confiante dans la technologie : Elle exprime de réels doutes sur le service rendu.\n- Désintéressée : Elle est personnellement impactée pour ses rendez-vous médicaux.",
    detailedExplanationEn: "🎯 Correct Answer: Hesitant, conditioning her final verdict upon the efficacy of feeder transit.\n\n• Textual Evidence:\nElodie states: 'Frankly, I cannot make up my mind. On one hand, I appreciate the quiet (...) but on the other hand, my grandchildren can no longer pick me up (...) Everything will hinge on the quality of the shuttles'.\n\n• Distractor Breakdown:\n- Resolutely hostile: She appreciates the quiet streets.\n- Technologically confident: She expresses real concerns.\n- Unconcerned: She is directly impacted for her hospital visits."
  },
  "tef-p1-co-q19": {
    id: "tef-p1-co-q19",
    trapAlert: "⚠️ Piège B2 Radio : Les tourbières ne sont pas reboisées, elles sont réhumidifiées pour capturer du carbone.",
    trapAlertEn: "⚠️ B2 Radio Trap: Peatlands are not being reforested, but re-wetted to trap carbon.",
    audioCoach: "🎯 Stratégie TEF : Repérez la fonction écologique maîtresse : 'restaurent un piège à carbone naturel dont l'efficacité surpasse celle des forêts'.",
    audioCoachEn: "🎯 TEF Strategy: Note the chief ecological function: 'piège à carbone naturel surpasse celle des forêts'.",
    detailedExplanation: "🎯 Réponse exacte : Réactiver la capacité naturelle de séquestration du carbone de ces écosystèmes.\n\n• Justification textuelle :\n« En réhumidifiant ces sols spongieux (...) les biologistes restaurent un piège à carbone naturel dont l'efficacité surpasse celle des forêts boréales. ».\n\n• Analyse des distracteurs :\n- Pâturage intensif : C'était l'ancien usage agricole rejeté aujourd'hui.\n- Exploitation thermique : Le projet vise la protection et non l'extraction de combustible.\n- Tourisme hôtelier : Aucune construction touristique n'est prévue.",
    detailedExplanationEn: "🎯 Correct Answer: Reactivate the natural carbon sequestration capacity of these ecosystems.\n\n• Textual Evidence:\n'By re-wetting these spongy soils (...) biologists are restoring a natural carbon sink whose efficacy surpasses boreal forests.'\n\n• Distractor Breakdown:\n- Livestock grazing: Former legacy practice now halted.\n- Thermal mining: The project protects peat rather than mining it.\n- Eco-hotels: No resort development planned."
  },
  "tef-p1-co-q20": {
    id: "tef-p1-co-q20",
    trapAlert: "⚠️ Piège B2 Radio : Les coopératives ne reçoivent pas de subventions d'État ; leur succès vient de la suppression des marges intermédiaires.",
    trapAlertEn: "⚠️ B2 Radio Trap: Cooperatives receive no state grants; their edge comes from eliminating distributor markups.",
    audioCoach: "🎯 Stratégie TEF : Suivez le mécanisme de fixation des prix : 'En éliminant les marges des distributeurs intermédiaires'.",
    audioCoachEn: "🎯 TEF Strategy: Follow the pricing mechanism: 'En éliminant les marges des distributeurs intermédiaires'.",
    detailedExplanation: "🎯 Réponse exacte : La suppression des intermédiaires commerciaux qui stabilise les prix de vente.\n\n• Justification textuelle :\n« En éliminant les marges des distributeurs intermédiaires, les producteurs parviennent à garantir des tarifs stables aux consommateurs ».\n\n• Analyse des distracteurs :\n- Subventions d'État : Aucune aide publique exceptionnelle n'est mentionnée.\n- Coûts maritimes : Il s'agit de production maraîchère locale, sans fret maritime.\n- Bénévolat : Les producteurs tirent un « revenu décent » de leur activité professionnelle.",
    detailedExplanationEn: "🎯 Correct Answer: The elimination of retail middlemen which stabilizes end-consumer prices.\n\n• Textual Evidence:\n'By eliminating intermediary distributor margins, farmers succeed in securing stable prices for shoppers'.\n\n• Distractor Breakdown:\n- State subsidies: No exceptional state grants cited.\n- Freight costs: This is hyper-local farming with no ocean shipping.\n- Volunteer labor: Producers earn a 'decent income' through paid work."
  },
  "tef-p1-co-q21": {
    id: "tef-p1-co-q21",
    trapAlert: "⚠️ Piège B2 Radio : La manufacture n'est pas détruite pour bâtir des tours de bureaux ; elle est préservée et convertie en pôle culturel.",
    trapAlertEn: "⚠️ B2 Radio Trap: The mill is not demolished for towers; it is preserved as an arts hub.",
    audioCoach: "🎯 Stratégie TEF : Notez la vocation plurielle du nouveau tiers-lieu : ateliers d'artisans, salle de concert mutualisée, jardin communautaire.",
    audioCoachEn: "🎯 TEF Strategy: Note the multifaceted mission: craft studios, concert hall, community garden.",
    detailedExplanation: "🎯 Réponse exacte : Un espace hybride alliant création artistique, spectacle vivant et cohésion locale.\n\n• Justification textuelle :\n« Plutôt que de raser ce témoin (...) la municipalité a confié le site à un collectif artistique. Dès le printemps, le complexe abritera des ateliers d'artisans, une salle de concert mutualisée et un jardin maraîcher communautaire. ».\n\n• Analyse des distracteurs :\n- Hôtel d'affaires : Option rejetée par le refus des « tours de verre ».\n- Plateforme logistique : Aucune activité d'e-commerce.\n- Logements fermés : Le lieu est ouvert à l'ensemble des citoyens.",
    detailedExplanationEn: "🎯 Correct Answer: A hybrid venue uniting arts creation, live performances, and community cohesion.\n\n• Textual Evidence:\n'Rather than demolishing this relic (...) the complex will host craft workshops, a shared concert venue, and an urban garden.'\n\n• Distractor Breakdown:\n- Business hotel: Rejected alongside glass towers.\n- Logistics warehouse: No warehouse activity.\n- Gated housing: It is an open public-facing cultural commons."
  },
  "tef-p1-co-q22": {
    id: "tef-p1-co-q22",
    trapAlert: "⚠️ Piège B2 Radio : La découverte ne concerne pas un nouveau plastique synthétique, mais une bactérie capable de détruire le plastique existant.",
    trapAlertEn: "⚠️ B2 Radio Trap: The discovery is not a new plastic polymer, but a bacterium destroying existing plastic.",
    audioCoach: "🎯 Stratégie TEF : Focalisez-vous sur le double critère de prouesse : rapidité (48h) et innocuité (sans dégagement toxique).",
    audioCoachEn: "🎯 TEF Strategy: Focus on the dual breakthrough criteria: speed (48 hours) and safety (zero toxic byproducts).",
    detailedExplanation: "🎯 Réponse exacte : La rapidité de biodégradation enzymatique sans résidus polluants nocifs.\n\n• Justification textuelle :\n« capable de dégrader enzymatiquement le polyéthylène téréphtalate en seulement quarante-huit heures, sans dégagement toxique. ».\n\n• Analyse des distracteurs :\n- Nouveau polymère : La recherche traite de la dégradation et non de la création de polymères.\n- Contenants jetables : N'a aucun lien avec la fabrication de vaisselle jetable.\n- Pétrole en Arctique : Hors sujet absolu.",
    detailedExplanationEn: "🎯 Correct Answer: The rapid enzymatic biodegradation process yielding zero toxic pollutants.\n\n• Textual Evidence:\n'capable of enzymatically breaking down polyethylene terephthalate in just forty-eight hours with zero toxic byproducts.'\n\n• Distractor Breakdown:\n- New polymer: Research focuses on breakdown, not manufacturing.\n- Disposable wares: No connection to tableware production.\n- Arctic oil: Completely off-topic."
  },
  "tef-p1-co-q23": {
    id: "tef-p1-co-q23",
    trapAlert: "⚠️ Piège B2 Radio : La pause recommandée n'implique aucun exercice physique épuisant ; elle repose sur le repos calme sans écran.",
    trapAlertEn: "⚠️ B2 Radio Trap: The recommended break involves no strenuous exercise; it centers on calm, screen-free rest.",
    audioCoach: "🎯 Stratégie TEF : Notez le protocole précis : 'véritable coupure de vingt minutes après le repas de midi, sans écran ni notification'.",
    audioCoachEn: "🎯 TEF Strategy: Note the exact protocol: 'twenty-minute break after lunch, free of screens or work pings'.",
    detailedExplanation: "🎯 Réponse exacte : Une déconnexion numérique absolue pendant la pause de mi-journée.\n\n• Justification textuelle :\n« s'accorder une véritable coupure de vingt minutes après le repas de midi, sans écran ni notification professionnelle, améliore la concentration cognitive de 35 % ».\n\n• Analyse des distracteurs :\n- Exercices cardiovasculaires : Aucune activité sportive intense n'est préconisée.\n- Boissons énergisantes : Non mentionnées et contraires au repos biologique.\n- Heures supplémentaires le soir : L'étude porte sur la récupération à mi-journée.",
    detailedExplanationEn: "🎯 Correct Answer: Absolute digital disconnection during the midday post-lunch break.\n\n• Textual Evidence:\n'granting oneself a genuine twenty-minute break after lunch, free of screens or work pings, enhances afternoon cognitive concentration by 35%.'\n\n• Distractor Breakdown:\n- Cardio workout: No strenuous sport suggested.\n- Energy drinks: Unmentioned and antithetical to neurological rest.\n- Late night hours: Study focuses on midday recovery."
  },
  "tef-p1-co-q24": {
    id: "tef-p1-co-q24",
    trapAlert: "⚠️ Piège B2 Radio : Le tarif unique ne vise pas à limiter l'affluence des passagers, mais au contraire à attirer les automobilistes individuels vers le rail.",
    trapAlertEn: "⚠️ B2 Radio Trap: The pass does not cap ridership; it aims to draw solo motorists onto public transit.",
    audioCoach: "🎯 Stratégie TEF : Décelez le public cible visé : 'convaincre les automobilistes solos d'abandonner l'autoroute saturée'.",
    audioCoachEn: "🎯 TEF Strategy: Identify the target audience: 'convaincre les automobilistes solos d'abandonner l'autoroute'.",
    detailedExplanation: "🎯 Réponse exacte : Inciter les conducteurs solitaires à se reporter vers les réseaux en commun.\n\n• Justification textuelle :\n« cette mesure vise à convaincre les automobilistes solos d'abandonner l'autoroute saturée aux heures de pointe. ».\n\n• Analyse des distracteurs :\n- Élargissement d'autoroutes : Le but est d'éviter la circulation automobile, non d'agrandir les voies.\n- Plafonnement du nombre d'usagers : Le réseau cherche au contraire à accroître sa fréquentation.\n- Remplacement par des robots : Aucune suppression de conducteurs n'est mentionnée.",
    detailedExplanationEn: "🎯 Correct Answer: Incentivize solo commuter motorists to transition towards public transport networks.\n\n• Textual Evidence:\n'this measure aims to persuade single-occupancy drivers to forgo highway gridlock during peak hours.'\n\n• Distractor Breakdown:\n- Highway widening: Goal is avoiding car travel, not building asphalt.\n- Ridership cap: The authority seeks to expand commuter volume.\n- Autonomous buses: Driver replacement is not mentioned."
  },
  "tef-p1-co-q25": {
    id: "tef-p1-co-q25",
    trapAlert: "⚠️ Piège B2 Radio : Le principe n'est pas d'interdire le bricolage individuel, mais de remplacer l'achat d'un outil par son emprunt partagé.",
    trapAlertEn: "⚠️ B2 Radio Trap: The concept does not ban DIY work, but substitutes tool ownership with collaborative borrowing.",
    audioCoach: "🎯 Stratégie TEF : Retenez l'argument fondateur : 'Pourquoi acheter une perceuse (...) utilisée douze minutes ? (...) primauté de l'usage'.",
    audioCoachEn: "🎯 TEF Strategy: Grasp the core premise: borrowing access over individual ownership.",
    detailedExplanation: "🎯 Réponse exacte : La primauté de l'usage partagé sur la propriété individuelle d'équipements.\n\n• Justification textuelle :\n« Face à l'absurdité de la surconsommation d'outillage, les bibliothèques d'objets se multiplient (...) chacun peut emprunter tondeuses, tentes (...) tout en bénéficiant de conseils ».\n\n• Analyse des distracteurs :\n- Obligation de recycler après 2 ans : Pure invention de distracteur.\n- Gratuité du dépannage privé : Le service est un prêt d'outils, pas une prestation artisanale à domicile.\n- Interdiction de fabrication : Le marché commercial privé subsiste librement.",
    detailedExplanationEn: "🎯 Correct Answer: The primacy of collaborative utility access over individual asset ownership.\n\n• Textual Evidence:\n'Faced with the absurdity of overconsuming tools, neighborhood lending tool-libraries are multiplying (...) anyone can borrow lawnmowers, tents'.\n\n• Distractor Breakdown:\n- Mandatory recycling rule: Fabricated distractor.\n- Free home repairs: The initiative lends equipment, not handyman labor.\n- Manufacturing ban: Commercial market remains uninhibited."
  },
  "tef-p1-co-q26": {
    id: "tef-p1-co-q26",
    trapAlert: "⚠️ Piège B2 Radio : La réglementation n'interdit pas l'accès nocturne à Internet ; elle impose la désactivation par défaut des fonctionnalités addictives.",
    trapAlertEn: "⚠️ B2 Radio Trap: The regulation does not impose a night curfew; it mandates deactivating addictive algorithmic loops.",
    audioCoach: "🎯 Stratégie TEF : Notez les fonctionnalités ciblées : 'défilement infini et récompenses algorithmiques quotidiennes'.",
    audioCoachEn: "🎯 TEF Strategy: Note targeted mechanics: infinite scroll and gamified algorithmic rewards.",
    detailedExplanation: "🎯 Réponse exacte : La désactivation automatique des mécanismes favorisant la dépendance chez les jeunes.\n\n• Justification textuelle :\n« Les fonctionnalités de défilement infini et les récompenses algorithmiques quotidiennes devront obligatoirement être désactivées par défaut pour tous les comptes d'utilisateurs âgés de moins de seize ans. ».\n\n• Analyse des distracteurs :\n- Couvre-feu numérique à 22h : Aucune coupure horaire n'est ordonnée.\n- Empreinte rétinienne : Aucune exigence biométrique oculaire.\n- Suppression totale de la publicité : La directive cible les ressorts addictifs, non la publicité globale.",
    detailedExplanationEn: "🎯 Correct Answer: Automatic deactivation of addictive design loops for young user accounts.\n\n• Textual Evidence:\n'Infinite scroll algorithms and gamified daily engagement streaks must mandatorily be toggled off by default for all user accounts under the age of sixteen.'\n\n• Distractor Breakdown:\n- 10 PM curfew: No scheduled curfew ordered.\n- Iris biometric scan: No biometric verification required.\n- Ban all ads: Target is algorithmic addiction, not all advertising."
  },
  "tef-p1-co-q27": {
    id: "tef-p1-co-q27",
    trapAlert: "⚠️ Piège B2 Radio : Les autorités refusent précisément d'édifier de nouvelles digues de béton austères ; elles choisissent des solutions naturelles fondées sur la nature.",
    trapAlertEn: "⚠️ B2 Radio Trap: Authorities deliberately refuse new concrete dikes, favoring nature-based flood solutions.",
    audioCoach: "🎯 Stratégie TEF : Écoutez l'alternative adoptée : 'réhabilitent les zones humides d'expansion de crues, permettant d'absorber naturellement les surplus'.",
    audioCoachEn: "🎯 TEF Strategy: Listen to the chosen approach: natural wetlands to buffer flood surpluses.",
    detailedExplanation: "🎯 Réponse exacte : La restauration d'espaces tampons naturels capables d'absorber les débordements.\n\n• Justification textuelle :\n« Pour protéger les zones habitées sans construire des digues de béton austères, les urbanistes réhabilitent les zones humides d'expansion de crues, permettant d'absorber naturellement les surplus d'eau ».\n\n• Analyse des distracteurs :\n- Barrages géants : Rejetés au profit de solutions douces.\n- Démantèlement des villes : Les mesures visent précisément à protéger les zones habitées.\n- Dragage profond en mer : Inefficace et non mentionné.",
    detailedExplanationEn: "🎯 Correct Answer: The restoration of natural ecological floodplain buffers to absorb surges.\n\n• Textual Evidence:\n'To protect settled residential zones without erecting sterile concrete dikes, planners are re-naturalizing upstream flood absorption wetlands'.\n\n• Distractor Breakdown:\n- Giant dams: Rejected in favor of natural soft engineering.\n- City demolition: Measures exist precisely to safeguard residential zones.\n- Ocean dredging: Ineffective and unmentioned."
  },
  "tef-p1-co-q28": {
    id: "tef-p1-co-q28",
    trapAlert: "⚠️ Piège B2 Radio : L'école en plein air ne supprime pas les devoirs ni les mathématiques ; elle utilise la nature comme support d'apprentissage des matières fondamentales.",
    trapAlertEn: "⚠️ B2 Radio Trap: Outdoor school does not abolish homework or math; it uses nature to teach core subjects.",
    audioCoach: "🎯 Stratégie TEF : Repérez l'impact cognitif mesuré : 'stimule la curiosité et réduit drastiquement les troubles de l'attention'.",
    audioCoachEn: "🎯 TEF Strategy: Note measured cognitive impact: stimulates curiosity and curbs attention disorders.",
    detailedExplanation: "🎯 Réponse exacte : L'amélioration des facultés de concentration grâce à l'apprentissage sensoriel concret.\n\n• Justification textuelle :\n« Mesurer la circonférence d'un tronc pour les mathématiques (...) ce contact direct stimule la curiosité et réduit drastiquement les troubles de l'attention. ».\n\n• Analyse des distracteurs :\n- Moins d'heures d'école : Le volume horaire global reste strictement identique.\n- Fin des devoirs : Les matières académiques fondamentales continuent d'être enseignées.\n- Sport d'endurance exclusif : La sortie aborde la géométrie et les sciences naturelles.",
    detailedExplanationEn: "🎯 Correct Answer: Improved cognitive focus facilitated by immersive, hands-on sensory learning.\n\n• Textual Evidence:\n'Measuring tree circumferences for geometry (...) direct sensory contact ignites curiosity and reduces attention deficits.'\n\n• Distractor Breakdown:\n- Fewer school hours: Statutory weekly instruction time remains unchanged.\n- Abolish homework: Core academic subjects continue to be assessed.\n- Pure endurance sports: Outdoor excursions integrate math and science."
  },
  "tef-p1-co-q29": {
    id: "tef-p1-co-q29",
    trapAlert: "⚠️ Piège B2 Grand Entretien : Dr. Vasseur ne critique pas le manque d'heures de travail, mais l'illusion du présentéisme physique sur une chaise.",
    trapAlertEn: "⚠️ B2 Interview Trap: Dr. Vasseur does not bemoan short working hours, but the illusion of desk-bound presenteeism.",
    audioCoach: "🎯 Stratégie TEF : Saisissez l'opposition conceptuelle centrale : 'obsédé par le présentéisme physique (...) plutôt que par l'efficience réelle'.",
    audioCoachEn: "🎯 TEF Strategy: Grasp the core dichotomy: physical presenteeism vs genuine productive efficiency.",
    detailedExplanation: "🎯 Réponse exacte : La valorisation artificielle de la présence temporelle au détriment de l'efficacité réelle.\n\n• Justification textuelle :\n« notre modèle salarial reste obsédé par le présentéisme physique, c'est-à-dire le temps passé sur une chaise, plutôt que par l'efficience réelle. ».\n\n• Analyse des distracteurs :\n- Refus de la vidéoconférence : Les salariés utilisent déjà ces outils numériques.\n- Insuffisance d'heures : Il affirme au contraire que les journées actuelles contiennent trop d'heures improductives.\n- Absence de hiérarchie : Le sociologue pointe un excès de réunions et de contrôle managérial.",
    detailedExplanationEn: "🎯 Correct Answer: The artificial valorization of desk-bound face-time over genuine output efficiency.\n\n• Textual Evidence:\n'our labor culture remains obsessed with physical presenteeism—sitting in a chair—rather than actual value output.'\n\n• Distractor Breakdown:\n- Video tools resistance: Staff already utilize these digital utilities.\n- Insufficient hours: He asserts current schedules contain too many unproductive hours.\n- Flat hierarchy: He points to excessive meetings and managerial micromanagement."
  },
  "tef-p1-co-q30": {
    id: "tef-p1-co-q30",
    trapAlert: "⚠️ Piège B2 Grand Entretien : Les réticences patronales ne sont pas de nature financière, mais culturelles et psychologiques ('angoisse de perte de contrôle').",
    trapAlertEn: "⚠️ B2 Interview Trap: Management hesitation is not financial, but psychological ('anxiety over losing control').",
    audioCoach: "🎯 Stratégie TEF : Décelez la négation explicite : 'Ce n'est pas un blocage économique, mais une angoisse culturelle de perte de contrôle'.",
    audioCoachEn: "🎯 TEF Strategy: Notice the explicit negation: 'Not an economic hurdle, but a cultural anxiety over control'.",
    detailedExplanation: "🎯 Réponse exacte : D'une appréhension psychologique liée à la délégation de l'autonomie aux salariés.\n\n• Justification textuelle :\n« Ce n'est pas un blocage économique, mais une angoisse culturelle de perte de contrôle. Beaucoup de managers assimilent l'autonomie accordée à un risque de relâchement. ».\n\n• Analyse des distracteurs :\n- Surcoût financier : Il précise formellement que l'obstacle n'est pas financier.\n- Opposition des syndicats : Les syndicats soutiennent généralement la réduction du temps de travail.\n- Code du travail : Aucune impossibilité légale n'est évoquée.",
    detailedExplanationEn: "🎯 Correct Answer: From psychological anxieties over delegating day-to-day autonomy to workers.\n\n• Textual Evidence:\n'It is not an economic hurdle, but a cultural anxiety over losing oversight. Many managers equate granting autonomy with risking widespread slacking.'\n\n• Distractor Breakdown:\n- Financial cost: He explicitly states the hurdle is not economic.\n- Union resistance: Unions generally advocate for reduced hours.\n- Labor code: No legal barriers cited."
  },
  "tef-p1-co-q31": {
    id: "tef-p1-co-q31",
    trapAlert: "⚠️ Piège C1 Grand Entretien : Les entreprises n'ont pas augmenté leurs salaires pour attirer les candidats ; c'est la semaine de 4 jours elle-même qui fait office d'aimant à talents.",
    trapAlertEn: "⚠️ C1 Interview Trap: Companies did not raise pay; the four-day schedule itself acts as a talent magnet.",
    audioCoach: "🎯 Stratégie TEF : Notez le double chiffre d'impact : -65 % d'épuisement professionnel et division par deux du turnover.",
    audioCoachEn: "🎯 TEF Strategy: Note the dual metric: -65% burnout absenteeism and halving of turnover.",
    detailedExplanation: "🎯 Réponse exacte : Une diminution drastique des arrêts maladie et une fidélisation renforcée du personnel.\n\n• Justification textuelle :\n« le taux d'absentéisme pour épuisement professionnel s'est effondré de 65 %. Par ailleurs, le turnover a chuté de moitié (...) attire les meilleurs profils sans avoir à surenchérir sur les salaires. ».\n\n• Analyse des distracteurs :\n- Mobilier de bureau : Détail superficiel sans rapport avec l'étude.\n- Robotisation intégrale : Non abordée ici.\n- Abandon des vacances : Les congés payés annuels demeurent inchangés.",
    detailedExplanationEn: "🎯 Correct Answer: A drastic reduction in sick leave and markedly reinforced employee retention.\n\n• Textual Evidence:\n'absenteeism tied to professional burnout plummeted by 65%. Furthermore, employee turnover was halved (...) attracts top-tier talent without having to inflate salaries.'\n\n• Distractor Breakdown:\n- Ergonomic furniture: Trivial off-target detail.\n- Robotization: Not mentioned.\n- Forfeit vacations: Statutory annual leave remains intact."
  },
  "tef-p1-co-q32": {
    id: "tef-p1-co-q32",
    trapAlert: "⚠️ Piège C1 Grand Entretien : L'invité refuse formellement d'exclure les hôpitaux ou les transports, car cela créerait une fracture sociale intolérable.",
    trapAlertEn: "⚠️ C1 Interview Trap: The expert rejects excluding hospitals, as it would cause intolerable social fracture.",
    audioCoach: "🎯 Stratégie TEF : Suivez la solution de péréquation : 'embauches compensatoires financées par les gains de productivité globaux et des allègements fiscaux'.",
    audioCoachEn: "🎯 TEF Strategy: Follow the equalization solution: compensatory hires financed by productivity gains and tax relief.",
    detailedExplanation: "🎯 Réponse exacte : L'embauche de personnel d'appoint financée par des mécanismes d'allègement fiscal.\n\n• Justification textuelle :\n« Dans les services continus, la solution passe par des embauches compensatoires financées par les gains de productivité globaux et des allègements fiscaux ciblés ».\n\n• Analyse des distracteurs :\n- Exclusion des soignants : L'intervenant alerte que cela créerait une « fracture sociale explosive ».\n- Accélération des cadences : Rejetée car génératrice d'accidents et d'épuisement.\n- Abandon du projet : L'expert propose une adaptation solidaire, non l'abandon.",
    detailedExplanationEn: "🎯 Correct Answer: Compensatory staffing hires underwritten by targeted fiscal incentive mechanisms.\n\n• Textual Evidence:\n'In round-the-clock operations, the remedy requires compensatory hiring financed through macro productivity gains and targeted tax relief'.\n\n• Distractor Breakdown:\n- Exclude healthcare: He warns this would ignite 'explosive social fracture'.\n- Accelerated shift speed: Rejected as counterproductive and exhausting.\n- Abandon project: He champions an adaptive solution rather than capitulation."
  },
  "tef-p1-co-q33": {
    id: "tef-p1-co-q33",
    trapAlert: "⚠️ Piège C1 Grand Entretien : Si la direction impose la réforme d'en haut sans consulter les équipes, le modèle échoue ('on court droit au désastre').",
    trapAlertEn: "⚠️ C1 Interview Trap: If management enforces the policy top-down, it fails ('désastre et surcharge cognitive').",
    audioCoach: "🎯 Stratégie TEF : Isolez le levier d'action démocratique : 'refonte démocratique du travail (...) que chaque collectif d'employés décide collectivement'.",
    audioCoachEn: "🎯 TEF Strategy: Isolate the democratic mechanism: workers collectively determine dispensable tasks.",
    detailedExplanation: "🎯 Réponse exacte : Une concertation participative où les employés redéfinissent eux-mêmes leurs tâches.\n\n• Justification textuelle :\n« C'est la refonte démocratique du travail au sein des équipes. (...) Il faut que chaque collectif d'employés décide collectivement quelles tâches accessoires doivent être supprimées. ».\n\n• Analyse des distracteurs :\n- Objectifs stricts imposés d'en haut : Décrit explicitement comme la recette du désastre.\n- Suppression des pauses : Aggraverait le surmenage.\n- Surveillance par consultants : Contraire à la confiance et à l'autonomie participative.",
    detailedExplanationEn: "🎯 Correct Answer: Participatory deliberation where team members self-determine dispensable tasks.\n\n• Textual Evidence:\n'It is the democratic re-engineering of tasks from within workgroups. (...) Collective teams must determine democratically which dispensable micro-tasks to scrap.'\n\n• Distractor Breakdown:\n- Top-down volumetric quotas: Explicitly identified as a recipe for disaster.\n- Scrap pauses: Would exacerbate cognitive overload.\n- Outside surveillance: Contradicts participatory autonomy."
  },
  "tef-p1-co-q34": {
    id: "tef-p1-co-q34",
    trapAlert: "⚠️ Piège C1 Grand Entretien : La fin de l'intervention élargit le débat au modèle de société : la richesse n'est plus l'argent matériel accumulé, mais le temps libre.",
    trapAlertEn: "⚠️ C1 Interview Trap: The closing broadens the topic to societal values: wealth is liberated time rather than material goods.",
    audioCoach: "🎯 Stratégie TEF : Décelez la conclusion philosophique : 'le bien le plus précieux n'est plus l'accumulation matérielle, mais le temps disponible'.",
    audioCoachEn: "🎯 TEF Strategy: Note the philosophical takeaway: precious asset is disposable time, not material accumulation.",
    detailedExplanation: "🎯 Réponse exacte : Une réorientation sociétale valorisant le temps libéré plutôt que la consommation matérielle.\n\n• Justification textuelle :\n« le bien le plus précieux n'est plus l'accumulation matérielle, mais le temps disponible pour le soin aux proches, l'engagement civique et l'épanouissement personnel. ».\n\n• Analyse des distracteurs :\n- Retour à 6 jours : Incompatible avec les gains de l'automatisation et de l'IA.\n- Travail précaire généralisé : L'essai défend le progrès social et la qualité de vie.\n- Stagnation des gains : L'auteur rappelle que les gains technologiques permettent justement de réduire le temps travaillé.",
    detailedExplanationEn: "🎯 Correct Answer: A societal shift valuing liberated personal time over material consumerism.\n\n• Textual Evidence:\n'our most precious asset is no longer material hoarding, but disposable time for caretaking, civic engagement, and self-actualization.'\n\n• Distractor Breakdown:\n- 6-day week: Incompatible with automation gains.\n- Gig precariousness: He defends high-quality social contracts.\n- Stagnant technology: He notes tech efficiency enables shorter workweeks."
  },
  "tef-p1-co-q35": {
    id: "tef-p1-co-q35",
    trapAlert: "⚠️ Piège B1 Graphique : 65 % correspond au pic d'urgence temporaire de 2020, et 8 % au taux initial de 2019. Le plateau stabilisé actuel est de 42 %.",
    trapAlertEn: "⚠️ B1 Graph Trap: 65% was the 2020 emergency peak, and 8% the 2019 baseline. The stabilized plateau is 42%.",
    audioCoach: "🎯 Stratégie TEF : Associez les trois jalons temporels énoncés : 2019 (8 %) ➔ 2020 (65 %) ➔ depuis 2023 (plateau durable à 42 %).",
    audioCoachEn: "🎯 TEF Strategy: Map the 3 chronological milestones: 2019 (8%) ➔ 2020 (65%) ➔ since 2023 (plateau at 42%).",
    detailedExplanation: "🎯 Réponse exacte : Un plateau pérenne établi autour de 42 % des salariés.\n\n• Justification textuelle :\n« depuis 2023, nous observons un plateau durable où exactement 42 % des effectifs effectuent deux à trois jours par semaine depuis leur domicile. ».\n\n• Analyse des distracteurs :\n- Retour à 8 % : C'était le chiffre d'avant la crise sanitaire.\n- Pic à 65 % : C'était un niveau exceptionnel non pérennisé.\n- Baisse à zéro : Le télétravail hybride est solidement implanté.",
    detailedExplanationEn: "🎯 Correct Answer: A permanent plateau established around 42% of workforce personnel.\n\n• Textual Evidence:\n'since 2023, we observe a steady plateau where exactly 42% of personnel work two to three days weekly from home.'\n\n• Distractor Breakdown:\n- Baseline 8%: Pre-crisis metric.\n- Peak 65%: Emergency anomaly.\n- Drop to zero: Remote work is permanently established."
  },
  "tef-p1-co-q36": {
    id: "tef-p1-co-q36",
    trapAlert: "⚠️ Piège B2 Graphique : Ne confondez pas la part des transports en commun (38 %) avec celle des mobilités actives cumulées (34 %).",
    trapAlertEn: "⚠️ B2 Graph Trap: Do not confuse public mass transit (38%) with active mobility (34%).",
    audioCoach: "🎯 Stratégie TEF : Additionnez mentalement le binôme 'vélo et marche' mentionné à '34 % de l'ensemble des trajets'.",
    audioCoachEn: "🎯 TEF Strategy: Group the paired 'cycling and walking' cited at 34% of all journeys.",
    detailedExplanation: "🎯 Réponse exacte : La part cumulée du vélo et de la marche à pied représentant 34 % des trajets.\n\n• Justification textuelle :\n« le vélo et la marche réunissent désormais 34 % de l'ensemble des trajets quotidiens enregistrés. ».\n\n• Analyse des distracteurs :\n- Voiture solo à 55 % : Le texte précise qu'elle s'est contractée à 28 %.\n- Transports collectifs à moins de 15 % : Ils représentent en réalité 38 %.\n- Égalité à 25 % : Les parts sont fortement asymétriques.",
    detailedExplanationEn: "🎯 Correct Answer: The combined cycling and walking share accounting for 34% of trips.\n\n• Textual Evidence:\n'cycling and walking now account for 34% of all logged daily journeys.'\n\n• Distractor Breakdown:\n- Car solo at 55%: Text indicates it shrank to 28%.\n- Transit below 15%: Actual transit share is 38%.\n- Equal 25%: Proportions are asymmetrical."
  },
  "tef-p1-co-q37": {
    id: "tef-p1-co-q37",
    trapAlert: "⚠️ Piège B2 Graphique : Repérez la hiérarchie des barres : verre (86 %, barre la plus haute), carton (72 %), plastique (23 %, barre basse).",
    trapAlertEn: "⚠️ B2 Graph Trap: Note bar heights: glass (86%, highest), cardboard (72%), plastic (23%, lowest).",
    audioCoach: "🎯 Stratégie TEF : Associez le matériau 'verre' à son qualificatif 'taux exemplaire de 86 %'.",
    audioCoachEn: "🎯 TEF Strategy: Associate 'glass' with its performance descriptor: 'exemplary 86%'.",
    detailedExplanation: "🎯 Réponse exacte : La barre culminante affichant une performance supérieure de 86 %.\n\n• Justification textuelle :\n« Alors que le verre atteint un taux exemplaire de réemploi et de recyclage effectif de 86 % (...) la filière des plastiques composites stagne dramatiquement à seulement 23 % ».\n\n• Analyse des distracteurs :\n- Barre médiane à 50 % : Le carton est à 72 %.\n- Barre la plus faible à 23 % : Elle représente le plastique et non le verre.\n- Inexistante : Les données statistiques sont expressément fournies.",
    detailedExplanationEn: "🎯 Correct Answer: The peak bar displaying an outstanding recovery performance of 86%.\n\n• Textual Evidence:\n'While glass attains an exemplary closed-loop recovery and recycling rate of 86% (...) composite plastics languish at 23%'.\n\n• Distractor Breakdown:\n- Mid bar at 50%: Cardboard is 72%.\n- Lowest bar at 23%: That depicts plastic, not glass.\n- Nonexistent: Verified statistical data is explicitly cited."
  },
  "tef-p1-co-q38": {
    id: "tef-p1-co-q38",
    trapAlert: "⚠️ Piège C1 Discrimination : Les mots employés ('formidable', 'brillante stratégie') sont élogieux au sens littéral, mais le ton sarcastique indique le contraire.",
    trapAlertEn: "⚠️ C1 Discrimination Trap: Words ('formidable', 'brillante') seem complimentary, but sarcastic intonation signals scathing mockery.",
    audioCoach: "🎯 Stratégie TEF : Décelez l'absurdité logique soulignée par l'intonation : 'réduire le budget de 30 % juste au moment où les concurrents triplent'.",
    audioCoachEn: "🎯 TEF Strategy: Spot logical absurdity underlined by cadence: cutting budget while rivals triple theirs.",
    detailedExplanation: "🎯 Réponse exacte : Il exprime une critique acerbe et ironique d'une décision qu'il juge absurde.\n\n• Justification textuelle :\n« Ah formidable ! Réduire le budget (...) juste au moment où tous nos concurrents mondiaux triplent leurs investissements... Quelle brillante stratégie visionnaire ! ».\nLe contraste entre les louanges de façade et l'absurdité du contexte établit une antiphrase ironique évidente.\n\n• Analyse des distracteurs :\n- Félicitations sincères : Contredit par l'intonation railleuse.\n- Doubler ses heures : Aucune proposition de travail personnel.\n- Investissement personnel : Hors de propos.",
    detailedExplanationEn: "🎯 Correct Answer: He voices sharp, ironic criticism against a decision he deems absurd.\n\n• Textual Evidence:\n'Oh marvelous! Slashing our budget (...) right when rivals triple investments... What a brilliant strategy!'.\nContrasting surface compliments with obvious absurdity constitutes classic irony.\n\n• Distractor Breakdown:\n- Sincere praise: Disproved by mocking tone.\n- Double hours: No personal overtime offered.\n- Personal investment: Irrelevant."
  },
  "tef-p1-co-q39": {
    id: "tef-p1-co-q39",
    trapAlert: "⚠️ Piège C1 Discrimination : La phrase utilise 'Si les conditions étaient validées (...) nous pourrions', marquant une hypothèse irréelle ou incertaine, non un fait accompli.",
    trapAlertEn: "⚠️ C1 Discrimination Trap: Phrase uses 'Si + imparfait (...) conditionnel présent', indicating a hypothetical event, not a settled certainty.",
    audioCoach: "🎯 Stratégie TEF : Repérez le conditionnel présent 'nous pourrions signer', subordonné à la condition 'Si les conditions étaient validées'.",
    audioCoachEn: "🎯 TEF Strategy: Identify the conditional 'nous pourrions', contingent upon the 'Si' clause.",
    detailedExplanation: "🎯 Réponse exacte : Il s'agit d'une simple éventualité subordonnée à une approbation préalable.\n\n• Justification textuelle :\n« Si les conditions de financement étaient validées (...) nous pourrions signer le protocole d'accord dès le début de la semaine suivante. ».\nL'emploi de la concordance hypothétique (si + imparfait ➔ conditionnel présent) traduit formellement une potentialité incertaine.\n\n• Analyse des distracteurs :\n- Signature définitivement arrêtée : Rejeté car subordonné au vote du conseil.\n- Accord rejeté : Il n'est pas rejeté, il est en attente d'examen.\n- Litige judiciaire : Aucun conflit juridique cité.",
    detailedExplanationEn: "🎯 Correct Answer: It represents a mere eventuality conditioned upon prior formal approval.\n\n• Textual Evidence:\n'If financing conditions were validated (...) we could sign the memorandum of understanding'.\nHypothetical conditional structure grammatically signifies an unverified contingency.\n\n• Distractor Breakdown:\n- Definitively confirmed: False, conditioned upon board vote.\n- Rejected: Not rejected, under review.\n- Lawsuit: No legal dispute mentioned."
  },
  "tef-p1-co-q40": {
    id: "tef-p1-co-q40",
    trapAlert: "⚠️ Piège C2 Discrimination : En diplomatie, l'expression 'réserver notre arbitrage pour des cycles ultérieurs' est la formule consacrée pour dire NON sans froisser l'interlocuteur.",
    trapAlertEn: "⚠️ C2 Discrimination Trap: In diplomatic register, 'réserver notre arbitrage pour des cycles ultérieurs' is a veiled refusal.",
    audioCoach: "🎯 Stratégie TEF : Repérez le pivot d'opposition feutrée : 'Votre proposition témoigne d'une grande audace (...) Toutefois (...) il nous paraît opportun de réserver notre arbitrage'.",
    audioCoachEn: "🎯 TEF Strategy: Note the soft-pivot connector: 'Toutefois (...) réserver notre arbitrage'.",
    detailedExplanation: "🎯 Réponse exacte : Un refus courtois dissimulant une fin de non-recevoir diplomatique.\n\n• Justification textuelle :\n« Toutefois, au vu des impératifs budgétaires (...) il nous paraît opportun de réserver notre arbitrage pour des cycles ultérieurs. ».\nDans le registre diplomatique soutenu, ajourner sine die en invoquant le budget constitue un refus poli mais ferme.\n\n• Analyse des distracteurs :\n- Acceptation et déblocage de crédits : L'orateur évoque précisément des « impératifs budgétaires » contraignants pour ne pas financer.\n- Rédaction de contrat : Aucun contrat ne sera rédigé à ce stade.\n- Mise en demeure agressive : Le ton demeure parfaitement policé et respectueux.",
    detailedExplanationEn: "🎯 Correct Answer: A courteous refusal conveying a diplomatic, veiled rejection.\n\n• Textual Evidence:\n'However, in light of current budgetary constraints (...) we consider it opportune to reserve our ruling for subsequent cycles.'\nIn formal administrative diplomacy, shelving indefinitely citing budget constraints represents an implicit refusal.\n\n• Distractor Breakdown:\n- Acceptance with funds: He invokes budget limits specifically to avoid disbursement.\n- Contract drafting: No agreement will be drafted.\n- Cease-and-desist: The tone remains impeccably polite."
  }
};
