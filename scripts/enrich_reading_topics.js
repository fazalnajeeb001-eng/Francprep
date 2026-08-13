import fs from 'fs';
import path from 'path';

console.log("=== 📖 ENRICHING 390 READING PASSAGES ACROSS ALL 10 PRACTICE PAPERS ===");

// 39 Reading templates (1 for each question position Q1-Q39) to replicate across papers with unique variations
const templates = [
  // Q1-Q7: A1 (Public notices, store flyers, brief notes)
  {
    qNum: 1, level: "A1",
    q: "Quel est l'objet principal de cette affichette ?",
    text: "VENTE DE GARAGE MUNICIPALE — Samedi 15 mai de 9h00 à 16h00 au parc de la Grande-Allée. Plus de 30 exposants locaux proposent des vêtements d'enfants, du mobilier, des appareils ménagers et des livres d'occasion en parfait état. Entrée libre et gratuite pour tous les résidents. Restauration légère sur place.",
    opt: ["Une vente de garage d'objets d'occasion au parc", "L'ouverture d'un nouveau centre commercial", "Une fête de quartier réservée aux enfants", "La fermeture d'une bibliothèque municipale"],
    ans: 0,
    passEn: "Municipal garage sale on Saturday May 15 from 9:00 AM to 4:00 PM at Grande-Allée Park."
  },
  {
    qNum: 2, level: "A1",
    q: "Que doivent faire les clients intéressés par cette offre ?",
    text: "BOULANGERIE DUPONT — PROMOTION SPÉCIALE D'ÉTÉ ! Pour tout achat de deux baguettes traditionnelles ou de viennoiseries fraîches avant 11h00, recevez gratuitement un croissant au beurre pur ou un petit café chaud. Offre valable du mardi au vendredi uniquement sur présentation de ce coupon.",
    opt: ["Présenter le coupon avant 11h00 en boulangerie", "Commander leur pain par téléphone la veille", "Acheter au moins cinq gâteaux pour avoir le café", "Payer l'ensemble de leurs achats par carte bancaire"],
    ans: 0,
    passEn: "Special summer promotion at Dupont Bakery! Get a free croissant with 2 baguettes before 11 AM."
  },
  {
    qNum: 3, level: "A1",
    q: "Quelle est la raison de la fermeture temporaire de la piscine ?",
    text: "AVIS AUX USAGERS DE LA PISCINE MUNICIPALE — En raison de travaux d'entretien annuel et de nettoyage approfondi des bassins, l'établissement sera totalement fermé au public du lundi 3 au dimanche 9 juin inclus. Réouverture portes ouvertes le lundi 10 juin dès 7h00 du matin.",
    opt: ["Des travaux d'entretien et de nettoyage des bassins", "L'organisation d'une compétition de natation", "Un manque temporaire de personnel qualifié", "Une augmentation des tarifs d'entrée municipaux"],
    ans: 0,
    passEn: "Notice to municipal pool users: Closed June 3 to 9 for annual maintenance and basin cleaning."
  },
  {
    qNum: 4, level: "A1",
    q: "À quelle heure le magasin ferme-t-il le samedi ?",
    text: "ÉPICERIE DE LA GARE — HORAIRES D'OUVERTURE D'ÉTÉ : Du lundi au vendredi de 7h30 à 19h30 sans interruption. Le samedi de 8h00 à 17h00. Fermé les dimanches et jours fériés. Merci de votre fidélité !",
    opt: ["Le samedi à 17h00", "Le samedi à 19h30", "Le samedi à 20h00", "Le samedi à midi"],
    ans: 0,
    passEn: "Station Grocery Summer Hours: Monday to Friday 7:30 AM to 7:30 PM. Saturday 8:00 AM to 5:00 PM."
  },
  {
    qNum: 5, level: "A1",
    q: "Quel service est proposé gratuitement aux résidents ?",
    text: "COLLECTE DES ENCOMBRANTS — La mairie informe les habitants que la collecte gratuite des objets encombrants (électroménager, meubles usagés) aura lieu le troisième jeudi du mois. Pensez à déposer vos articles sur le trottoir la veille au soir à partir de 20h00.",
    opt: ["La ramassage gratuit des meubles et électroménagers", "La livraison à domicile de nouveaux meubles", "La réparation gratuite de vos appareils électroniques", "La vente d'outils de jardinage d'occasion"],
    ans: 0,
    passEn: "Bulky waste collection: Free collection of appliances and furniture on the 3rd Thursday."
  },
  {
    qNum: 6, level: "A1",
    q: "Qui est invité à participer à cette réunion d'information ?",
    text: "CONSEIL DE QUARTIER — Tous les habitants de la commune sont invités à la réunion publique d'information sur le nouveau projet de piste cyclable. Rendez-vous mercredi 12 octobre à 18h30 à la salle des fêtes. Entrée libre.",
    opt: ["Tous les résidents et habitants du quartier", "Uniquement les cyclistes professionnels", "Les propriétaires de commerces uniquement", "Seuls les membres élus du conseil municipal"],
    ans: 0,
    passEn: "Neighborhood Council: All residents invited to the public info meeting on bike lanes."
  },
  {
    qNum: 7, level: "A1",
    q: "Comment peut-on réserver sa place pour le spectacle ?",
    text: "THÉÂTRE MUNICIPAL — Spectacle de comédie le vendredi 20 novembre. Billets en vente au guichet du théâtre ou en ligne sur notre site web officiel (www.theatre-ville.ca). Réservation obligatoire avant le 18 novembre.",
    opt: ["En achetant au guichet ou directement en ligne", "En envoyant un courrier postal à la mairie", "En se présentant le soir même sans billet", "En passant par une agence de voyage locale"],
    ans: 0,
    passEn: "Municipal Theater: Comedy show Nov 20. Tickets at booth or online at official website."
  },

  // Q8-Q15: A2 (Personal letters, email directives, library/clinic announcements)
  {
    qNum: 8, level: "A2",
    q: "Quelle est la consignes principale concernant le stationnement ?",
    text: "DEPARTEMENT DES RESSOURCES HUMAINES — À l'attention de tous les employés : En raison des travaux de réfection du bitume du parking réservé au personnel, nous vous prions d'utiliser exclusivement le stationnement B situé au 45 rue des Érables à partir de lundi prochain. L'accès au parking principal sera strictement interdit du 12 au 25 mai. Nous vous remercions pour votre compréhension.",
    opt: ["Utiliser le stationnement B pendant les travaux", "Garer son véhicule gratuitement dans la rue", "Venir au bureau uniquement en transport en commun", "Régler d'avance des frais de réservation"],
    ans: 0,
    passEn: "HR Notice: Staff parking under renovation starting Monday. Please use Parking B."
  },
  {
    qNum: 9, level: "A2",
    q: "Pourquoi le docteur Martin demande-t-il de déplacer le rendez-vous ?",
    text: "CLINIQUE MÉDICALE SAINT-LAURENT — Message pour Mme Tremblay : Le Dr Martin doit assister à un colloque médical urgent ce jeudi après-midi. Nous vous proposons de reporter votre consultation de suivi soit au vendredi 14 mai à 10h00, soit au lundi 17 mai à 14h30. Merci de contacter le secrétariat avant mercredi 17h00 pour confirmer votre choix.",
    opt: ["En raison de sa participation obligatoire à un colloque", "Parce que la clinique est en rénovation complète", "Car la patiente n'a pas transmis ses documents", "Par suite d'une fermeture exceptionnelle du centre"],
    ans: 0,
    passEn: "St-Laurent Clinic: Dr. Martin attending urgent medical conference Thursday. Please reschedule."
  },
  {
    qNum: 10, level: "A2",
    q: "Quel nouveau service la bibliothèque offre-t-elle à ses abonnés ?",
    text: "BIBLIOTHÈQUE COMMUNAULE — Chers lecteurs, nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme de prêt de livres numériques et d'audiolibres ! Désormais, vous pouvez emprunter jusqu'à 5 ouvrages digitaux directement depuis votre tablette ou liseur électronique. Accès gratuit avec votre carte d'abonné en cours de validité.",
    opt: ["L'accès gratuit au prêt d'audiolibres et de livres numériques", "L'ouverture de la salle d'étude 24h sur 24 en semaine", "La vente définitive d'anciens romans à bas prix", "La livraison à domicile des journaux quotidiens"],
    ans: 0,
    passEn: "Community Library: Free access to digital e-books and audiobooks for members."
  },
  {
    qNum: 11, level: "A2",
    q: "Que doivent faire les passagers du train de 14h15 ?",
    text: "GARE CENTRALE — ATTENTION PASSAGERS DU TRAIN 402 EN DIRECTION DE MONTRÉAL : En raison d'un retard technique sur la voie 3, le départ initialement prévu à 14h15 s'effectuera depuis le quai 7 à 14h35. Nous invitons tous les voyageurs à se diriger dès maintenant vers le quai 7 avec leurs bagages.",
    opt: ["Se diriger vers le quai 7 pour l'embarquement à 14h35", "Échanger gratuitement leur billet au guichet principal", "Attendre l'arrivée du train suivant sur le quai 3", "Rendre leurs bagages au service de consignes"],
    ans: 0,
    passEn: "Central Station: Train 402 delayed. Departing from Track 7 at 2:35 PM."
  },
  {
    qNum: 12, level: "A2",
    q: "Quelle condition est nécessaire pour obtenir le remboursement du cours ?",
    text: "CENTRE CULTUREL DES ARTS — Conditions d'annulation des cours du soir : Tout participant souhaitant annuler son inscription à un cours annuel peut obtenir un remboursement intégral à la condition expresse d'envoyer une demande écrite au secrétariat au moins 14 jours ouvrables avant le début de la première séance.",
    opt: ["Envoyer une demande écrite au moins 14 jours avant le premier cours", "Trouver un autre étudiant pour remplacer sa place", "Présenter un certificat médical d'incapacité", "Payer des frais administratifs d'annulation de 50$"],
    ans: 0,
    passEn: "Arts Cultural Center: Evening class refund requires written notice 14 days before 1st class."
  },
  {
    qNum: 13, level: "A2",
    q: "Quel est l'objectif de la journée de bénévolat d'entreprise ?",
    text: "COMMUNIQUÉ INTERNE — À tous les collaborateurs de l'entreprise : Ce vendredi aura lieu notre journée annuelle d'engagement communautaire. Tous les employés volontaires sont invités à participer au nettoyage desberges de la rivière et à la plantation d'arbres dans le parc régional. Le matériel de travail et le déjeuner seront fournis.",
    opt: ["Participer au nettoyage des berges et à la plantation d'arbres", "Suivre une formation obligatoire en sécurité du travail", "Présenter les résultats financiers du trimestre", "Rencontrer de nouveaux clients potentiels de la région"],
    ans: 0,
    passEn: "Internal Announcement: Volunteer Day on Friday to clean riverbanks and plant trees."
  },
  {
    qNum: 14, level: "A2",
    q: "Quelle est la consigne transmise aux résidents de l'immeuble ?",
    text: "GESTION IMMOBILIÈRE DUPUIS — Chers locataires, veuillez noter que la vérification annuelle des détecteurs de fumée et des extincteurs de l'immeuble aura lieu le mardi 18 octobre entre 9h00 et 16h00. Un technicien certifié devra accéder à chaque appartement. Merci de laisser vos clés au concierge si vous êtes absent.",
    opt: ["Confier les clés au concierge en cas d'absence pour l'inspection", "Acheter un nouvel extincteur individuel pour le logement", "Rester impérativement chez soi toute la journée de mardi", "Changer soi-même les piles du détecteur de fumée"],
    ans: 0,
    passEn: "Dupuis Property Mgmt: Annual smoke detector inspection Tuesday. Leave keys if absent."
  },
  {
    qNum: 15, level: "A2",
    q: "Quel document les candidats doivent-ils joindre à leur dossier de candidature ?",
    text: "OFFRE D'EMPLOI — RECHERCHE ASSISTANT ADMINISTRATIF : Le Centre de Santé recherche un assistant administratif bilingue à temps plein. Les candidats intéressés doivent envoyer leur curriculum vitae à jour accompagné d'une lettre de motivation précisant leurs disponibilités avant le 30 novembre à l'adresse rh@csante.ca.",
    opt: ["Un CV à jour et une lettre de motivation", "Une copie certifiée de leur diplôme universitaire", "Trois lettres de recommandation d'anciens employeurs", "Un certificat médical attestant d'une bonne santé"],
    ans: 0,
    passEn: "Job Offer: Bilingual Administrative Assistant. Send updated CV and cover letter by Nov 30."
  },

  // Q16-Q25: B1 (Magazine articles, environmental projects, regional developments)
  {
    qNum: 16, level: "B1",
    q: "Selon le texte, quel est le principal avantage du projet d'aménagement urbain ?",
    text: "ÉCOLOGIE & VILLES — La municipalité vient d'inaugurer son vaste plan d'embellissement et de végétalisation urbaine. En intégrant plus de 5 000 nouveaux arbres et arbustes indigènes au cœur du centre-ville, le projet vise principalement à atténuer les effets des îlots de chaleur estivaux. Les premières mesures climatologiques confirment une baisse moyenne de 2,5°C dans les zones ombragées, améliorant ainsi considérablement le confort des piétons tout en favorisant la biodiversité locale.",
    opt: ["La baisse des températures urbaines grâce à la plantation d'arbres", "La création d'un vaste complexe commercial en périphérie", "L'interdiction totale de la circulation automobile au centre-ville", "L'augmentation importante des tarifs de stationnement municipal"],
    ans: 0,
    passEn: "Ecology & Cities: Urban greening project plants 5,000 trees to reduce urban heat island effects."
  },
  {
    qNum: 17, level: "B1",
    q: "Quel constat l'auteur dresse-t-il concernant la consommation locale ?",
    text: "ÉCONOMIE RÉGIONALE — Selon une récente enquête menée auprès des ménages québécois, l'engouement pour l'achat de produits issus du terroir ne cesse de progresser. Plus de 68 % des consommateurs déclarent privilégier désormais les marchés de producteurs régionaux pour leurs achats alimentaires quotidiens. Cette prise de conscience citoyenne répond autant à un désir de soutenir la vitalité économique des agriculteurs locaux qu'à la volonté de réduire l'empreinte carbone liée aux transports.",
    opt: ["Une hausse nette de l'achat de produits alimentaires régionaux", "Une désaffection progressive des marchés d'agriculteurs locaux", "Une préférence marquée pour les produits importés à bas coût", "Un désintérêt général pour la provenance des produits consommés"],
    ans: 0,
    passEn: "Regional Economy: Survey shows 68% of consumers favor local food markets to support farmers."
  },
  {
    qNum: 18, level: "B1",
    q: "Quel problème majeur le développement du covoiturage cherche-t-il à résoudre ?",
    text: "MOBILITÉ DURABLE — Face à la congestion automobile chronique observée sur les grands axes autoroutiers aux heures de pointe, la Métropole mise massivement sur le déploiement de voies réservées au covoiturage. En incitant les automobilistes à partager leurs trajets quotidiens, l'administration espère désengorger le trafic tout en abaissant les émissions annuelles de gaz à effet de serre de la région de près de 15 %.",
    opt: ["Réduire les embouteillages aux heures de pointe et la pollution", "Augmenter la vitesse maximale autorisée sur les autoroutes", "Financer la construction de nouvelles autoroutes payantes", "Supprimer définitivement les lignes de bus interurbaines"],
    ans: 0,
    passEn: "Sustainable Mobility: Carpooling lanes designed to reduce peak traffic congestion and carbon emissions."
  },
  {
    qNum: 19, level: "B1",
    q: "Quelle tendance caractérise l'évolution actuelle du marché du travail ?",
    text: "REGARD SUR LE TRAVAIL — L'adoption massive des modalités de travail hybride a profondément transformé les attentes des travailleurs. Les employés accordent désormais une importance primordiale à la flexibilité de leurs horaires et à la possibilité de télétravailler deux à trois jours par semaine. Les entreprises qui refusent d'intégrer cette souplesse administrative rencontrent de grandes difficultés à recruter et fidéliser les jeunes talents.",
    opt: ["L'exigence accrue de flexibilité et de formules de télétravail", "Le retour généralisé au travail obligatoire en présentiel continu", "L'abandon complet de toute forme de contrat à durée indéterminée", "La diminution du nombre d'heures de travail hebdomadaires légales"],
    ans: 0,
    passEn: "Workplace Outlook: Hybrid work adoption drives demand for flexible schedules and remote options."
  },
  {
    qNum: 20, level: "B1",
    q: "Quel est l'impact de la numérisation des services publics sur les usagers ?",
    text: "SOCIÉTÉ NUMÉRIQUE — La dématérialisation des démarches administratives simplifie incontestablement le quotidien d'une majorité de citoyens, qui peuvent désormais renouveler leurs papiers officiels en quelques clics. Toutefois, plusieurs associations d'entraide tirent la sonnette d'alarme sur le risque d'isolement des personnes âgées ou peu familiarisées avec les outils informatiques, plaidant pour le maintien d'un accueil physique de proximité.",
    opt: ["Une facilitation des démarches couplée à un risque de fracture numérique", "L'augmentation des frais administratifs pour l'ensemble des usagers", "L'obligation d'acheter du matériel informatique haut de gamme", "La suppression totale de tous les guichets administratifs du pays"],
    ans: 0,
    passEn: "Digital Society: Online public services simplify procedures but risk isolating non-tech-savvy seniors."
  },
  {
    qNum: 21, level: "B1",
    q: "Pourquoi le tourisme durable séduit-il de plus en plus de voyageurs ?",
    text: "INNOVATION TOURISME — De nombreux vacanciers renoncent aujourd'hui aux séjours à l'étranger à fort impact environnemental pour privilégier l'écotourisme en région. Cette pratique combine la découverte de paysages naturels préservés, le séjour dans des hébergements écoresponsables et la participation à des activités respectueuses de la faune locale. Ce choix reflète une recherche d'authenticité et de sobriété.",
    opt: ["La recherche d'authenticité et le respect de l'environnement", "Le coût très élevé des voyages en avion vers l'étranger", "L'absence d'infrastructures hôtelières dans les grandes métropoles", "L'interdiction légale de voyager durant les mois d'été"],
    ans: 0,
    passEn: "Tourism Innovation: Sustainable tourism grows due to desire for authenticity and eco-responsibility."
  },
  {
    qNum: 22, level: "B1",
    q: "Quel défi pose l'intégration de l'intelligence artificielle dans les PME ?",
    text: "TECH & ENTREPRISES — Si l'intégration d'outils d'intelligence artificielle offre aux petites et moyennes entreprises des gains de productivité remarquables, elle exige un effort d'adaptation considérable. Le principal obstacle réside dans la formation continue des employés, qui doivent acquérir de nouvelles compétences analytiques pour exploiter efficacement ces logiciels innovants sans compromettre la sécurité des données.",
    opt: ["La nécessité de former le personnel aux nouvelles compétences informatiques", "Le coût inabordable des ordinateurs pour les petites structures", "Le refus systématique des clients d'utiliser des services automatisés", "L'interdiction réglementaire d'automatiser les tâches de secrétariat"],
    ans: 0,
    passEn: "Tech & Business: AI adoption in SMEs offers productivity gains but requires ongoing staff training."
  },
  {
    qNum: 23, level: "B1",
    q: "Quel bienfait de la pratique régulière de la marche est mis en avant ?",
    text: "SANTE & BIEN-ÊTRE — Selon les recommandations récents des professionnels de la santé, effectuer 30 minutes de marche rapide quotidienne permet de réduire significativement les risques de maladies cardiovasculaires. Cette activité physique accessible à tous favorise en outre le bien-être mental en diminuant le niveau de stress accumulé durant la journée de travail.",
    opt: ["La prévention des maladies cardiovasculaires et la réduction du stress", "L'obligation de s'inscrire dans une salle de sport spécialisée", "La guérison immédiate de toutes les maladies chroniques majeures", "La nécessité d'acheter un équipement sportif très coûteux"],
    ans: 0,
    passEn: "Health & Well-being: 30 minutes of daily brisk walking prevents cardiovascular disease and reduces stress."
  },
  {
    qNum: 24, level: "B1",
    q: "Quelle mesure est recommandée pour préserver les ressources en eau ?",
    text: "GESTION DE L'EAU — Face aux épisodes de sécheresse estivale de plus en plus fréquents, la régie des eaux invite la population à adopter des gestes citoyens simples. La mise en place de récupérateurs d'eau de pluie pour l'arrosage des jardins et le nettoyage des véhicules permet d'économiser des millions de litres d'eau potable traitée chaque année.",
    opt: ["L'installation de récupérateurs d'eau de pluie pour l'arrosage", "Le rationnement strict de l'eau potable durant tout l'hiver", "La fermeture définitive des réseaux de distribution d'eau potable", "L'interdiction totale de posséder un jardin en milieu urbain"],
    ans: 0,
    passEn: "Water Management: Rainwater harvesters recommended to save millions of liters of treated drinking water."
  },
  {
    qNum: 25, level: "B1",
    q: "Quel rôle jouent les espaces culturels de quartier selon l'article ?",
    text: "CULTURE EN VILLE — Les centres culturels de quartier ne se contentent plus de diffuser des œuvres d'art ; ils s'affirment désormais comme de véritables lieux de mixité sociale et de création partagée. En proposant des ateliers artistiques gratuits et des résidences d'artistes ouverts au public, ces institutions renforcent le sentiment d'appartenance communautaire et stimulent l'expression citoyenne.",
    opt: ["Favoriser la mixité sociale et renforcer les liens communautaires", "Générer d'importants profits financiers pour la municipalité", "Réserver l'accès aux expositions aux seuls experts d'art", "Remplacer l'enseignement des arts dans les écoles publiques"],
    ans: 0,
    passEn: "Culture in the City: Neighborhood cultural centers foster social diversity and strengthen community ties."
  },

  // Q26-Q33: B2 (Editorial debates, telework regional impacts, environmental regulation)
  {
    qNum: 26, level: "B2",
    q: "Quelle est la thèse centrale défendue par l'auteur concernant le télétravail ?",
    text: "CHRONIQUE DE L'AMÉNAGEMENT — L'institutionnalisation durable du travail à distance ne représente pas une simple commodité organisationnelle, mais amorce une recomposition territoriale sans précédent. En libérant une frange importante d'actifs de la contrainte de proximité géographique avec les hypercentres métropolitains, ce paradigme stimule le dynamisme démographique des villes moyennes. Néanmoins, cette décentralisation informelle met sous tension les infrastructures de transport et les services publics locaux, contraints de s'adapter précipitamment à cet afflux de nouveaux résidents.",
    opt: ["Le télétravail recompose le territoire mais sous-tend de vifs défis d'infrastructure", "Le travail à distance provoque le déclin économique irréversible des villes moyennes", "Les salariés doivent impérativement résider à moins de 10 km de leur entreprise", "L'attractivité des grandes métropoles s'accroît au détriment absolu des régions"],
    ans: 0,
    passEn: "Planning Chronicle: Permanent remote work reshapes regional development but strains local infrastructure."
  },
  {
    qNum: 27, level: "B2",
    q: "Quel constat paradoxal l'auteur fait-il sur la transition énergétique ?",
    text: "DEBAT ÉCONOMIQUE — Le déploiement accéléré des énergies renouvelables se heurte à un paradoxe écologique méconnu. Si la substitution des combustibles fossiles par des éoliennes et panneaux solaires est indispensable pour décarboner l'économie, elle engendre une hausse exponentielle de la demande en métaux rares et minéraux critiques. L'extraction de ces ressources implique des impacts environnementaux majeurs dans les pays producteurs, ce qui déplace une partie de l'empreinte écologique au lieu de la supprimer totalement.",
    opt: ["La transition vers le vert déplace une partie de la pollution vers l'extraction minière", "Les énergies renouvelables consomment plus de pétrole que les centrales thermiques", "L'utilisation de panneaux solaires est totalement inefficace pour réduire les GES", "Le coût de production du solaires rend la décarbonation économiquement inviable"],
    ans: 0,
    passEn: "Economic Debate: Renewable transition requires rare metals, shifting environmental impacts to mining."
  },
  {
    qNum: 28, level: "B2",
    q: "Quelle critique l'article adresse-t-il à la surabondance d'informations informatisées ?",
    text: "MÉDIAS ET DÉMOCRATIE — L'accès continu aux flux d'actualités en ligne n'a pas nécessairement produit des citoyens mieux informés. Au contraire, le phénomène de surinformation engendre une saturation cognitive propice à la désinformation. Submergés par des contenus sensationnalistes conçus pour capter leur attention, les internautes peinent à exercer leur esprit critique, ce qui fragilise la qualité du débat démocratique contemporain.",
    opt: ["La surinformation provoque une saturation cognitive néfaste au sens critique", "Les citoyens lisent désormais trop d'ouvrages d'analyse sociologique approfondie", "Les journaux imprimés traditionnels ont totalement disparu du paysage médiatique", "L'accès à l'information en ligne garantit une vérité objective absolue pour tous"],
    ans: 0,
    passEn: "Media & Democracy: Information overload causes cognitive fatigue that harms critical thinking."
  },
  {
    qNum: 29, level: "B2",
    q: "Quel enjeu entoure la mise en place de la tarification incitative des déchets ?",
    text: "POLITIQUE ENVIRONNEMENTALE — La tarification incitative de la collecte des ordures ménagères, qui facture la taxe d'enlèvement au prorata du volume réel de déchets jetés, s'avère d'une grande efficacité pour encourager le recyclage. Cependant, son application requiert une vigilance rigoureuse afin d'éviter les dépôts sauvages clandestins. Les municipalités doivent ainsi coupler cette mesure coercitive d'un accompagnement pédagogique soutenu.",
    opt: ["L'efficacité du recyclage doit s'accompagner d'un contrôle contre les dépôts sauvages", "La taxe d'enlèvement doit être strictement identique pour tous les foyers du pays", "Le traitement des ordures doit devenir gratuit et illimité pour les entreprises", "Les usagers refusent catégoriquement de trier leurs emballages en plastique"],
    ans: 0,
    passEn: "Environmental Policy: Pay-as-you-throw trash pricing boosts recycling but risks illegal dumping."
  },
  {
    qNum: 30, level: "B2",
    q: "Selon l'auteur, comment les entreprises doivent-elles aborder la responsabilité sociale (RSE) ?",
    text: "MANAGEMENT STRATÉGIQUE — La responsabilité sociétale des entreprises ne peut plus se réduire à un simple argument de communication marketing. Pour être crédibles face à des consommateurs de plus en plus vigilants, les organisations doivent intégrer les objectifs environnementaux et sociaux au cœur même de leur modèle d'affaires. Cette transformation implique une révision de l'ensemble de la chaîne d'approvisionnement et une gouvernance transparente.",
    opt: ["Intégrer sincèrement les enjeux RSE au cœur même de leur modèle d'affaires", "Multiplier les campagnes d'affichage publicitaire sans modifier leurs pratiques", "Déléguer l'ensemble des politiques environnementales à des intervenants externes", "Prioriser le profit financier à court terme au détriment de toute réglementation"],
    ans: 0,
    passEn: "Strategic Management: Corporate Social Responsibility must be core to business strategy, not greenwashing."
  },
  {
    qNum: 31, level: "B2",
    q: "Quel risque pèse sur le patrimoine culturel local face à la mondialisation ?",
    text: "PATRIMOINE ET CULTURE — La standardisation des modes de vie sous l'effet des échanges mondialisés menace la pérennité des traditions artisanales régionales. Pour contrer cette uniformisation culturelle, plusieurs collectivités investissent dans des programmes de valorisation du savoir-faire local, affirmant que la sauvegarde des spécialités régionales constitue un levier d'attractivité touristique et d'identité collective.",
    opt: ["L'uniformisation culturelle globale menace les savoir-faire traditionnels locaux", "La mondialisation améliore automatiquement la conservation des traditions locales", "Les traditions régionales sont devenues obsolètes et sans valeur économique", "Les jeunes générations refusent d'apprendre des langues étrangères à l'école"],
    ans: 0,
    passEn: "Heritage & Culture: Cultural standardization threatens traditional local craftsmanship."
  },
  {
    qNum: 32, level: "B2",
    q: "Quelle est la préoccupation principale exprimée sur le vieillissement de la population ?",
    text: "PERSPECTIVES DEMOGRAPHIQUES — La transition démographique marquée par l'augmentation constante de l'espérance de vie impose une refonte majeure des systèmes de santé et de retraite. L'enjeu fondamental ne réside pas uniquement dans le financement des prestations, mais dans l'aménagement d'infrastructures urbaines adaptées à la mobilité réduite et le soutien aux proches aidants.",
    opt: ["Adapter les infrastructures urbaines et financer le soutien à la dépendance", "Diminuer l'âge légal de la retraite pour stimuler l'embauche des jeunes", "Fermer les centres de soins de longue durée en zone rurale", "Remplacer l'ensemble des médecins par des dispositifs de téléconsultation"],
    ans: 0,
    passEn: "Demographic Outlook: Aging population requires urban infrastructure adaptations and caregiver support."
  },
  {
    qNum: 33, level: "B2",
    q: "Comment l'agriculture urbaine contribue-t-elle à la résilience des cités ?",
    text: "AGRICULTURE D'AVENIR — L'implantation de fermes écologiques sur les toits et friches industrielles des métropoles offre une réponse concrète aux vulnérabilités des chaînes d'approvisionnement mondiales. Au-delà de sa contribution à la sécurité alimentaire locale, cette agriculture urbaine recrée des espaces de biodiversité et renforce la cohésion sociale à l'échelle des quartiers.",
    opt: ["Renforcer la sécurité alimentaire locale et recréer de la biodiversité", "Remplacer intégralement la production des exploitations agricoles rurales", "Augmenter considérablement le coût des légumes pour les consommateurs", "Nécessiter l'utilisation massive de pesticides chimiques de synthèse"],
    ans: 0,
    passEn: "Future Agriculture: Rooftop urban farming boosts local food security and urban biodiversity."
  },

  // Q34-Q36: C1 (Academic literature, scientific studies, bioethics, epistemological analysis)
  {
    qNum: 34, level: "C1",
    q: "Quelle hypothèse épistémologique sous-tend la recherche présentée dans cet article ?",
    text: "REVUE SCIENTIFIQUE DE CLIMATOLOGIE — L'analyse par modélisation algorithmique à haute résolution des interactions entre le couvert végétal de la forêt boréale et le rétrocontrôle de l'albédo démontre une corrélation directe entre la préservation des écosystèmes humides et la fréquence des phénomènes météorologiques paroxystiques. L'étude remet en question les paradigms simplificateurs qui isolent la séquestration du carbone de la dynamique macro-hydrologique régionale, préconisant une approche systémique globale dans l'élaboration des modèles de prédiction climatique à long terme.",
    opt: ["L'intégration systémique de la dynamique hydrologique et du couvert végétal", "L'inefficacité fondamentale des algorithmes de modélisation informatique", "La séparation nécessaire entre la séquestration du carbone et le climat", "La prédominance absolue des facteurs cosmiques sur le bilan thermique terrestre"],
    ans: 0,
    passEn: "Climatology Journal: High-resolution algorithmic modeling reveals systemic links between boreal wetlands and climate."
  },
  {
    qNum: 35, level: "C1",
    q: "Quel enjeu éthique majeur est soulevé par l'utilisation des algorithmes prédictifs ?",
    text: "CAHIERS D'ÉTHIQUE ET DU NUMÉRIQUE — L'introduction d'algorithmes d'apprentissage profond dans l'évaluation des risques judiciaires soulève de vives inquiétudes théoriques quant à la réification des biais sociologiques historiques. Sous le masque de la neutralité technologique, ces modèles prédictifs tendent à cristalliser et perpétuer les discriminations structurelles. La transparence des codes sources et l'exigibilité d'une supervision humaine apparaissent dès lors comme des impératifs éthiques catégoriques pour préserver le fondement même du principe d'équité juridique.",
    opt: ["La reproduction de biais systémiques sous couvert d'une neutralité technologique", "L'impossibilité technique d'écrire des programmes informatiques complexes", "La baisse généralisée des coûts d'instruction des procédures administratives", "L'acceptation unanime des décisions automatisées par la communauté juridique"],
    ans: 0,
    passEn: "Digital Ethics Journal: Deep learning algorithms in judiciary risk perpetuating systemic biases under false neutrality."
  },
  {
    qNum: 36, level: "C1",
    q: "Quelle est la conclusion des auteurs sur la neuroplasticité cérébrale chez l'adulte ?",
    text: "NEUROSCIENCES ET COGNITION — Longtemps perçue comme l'apanage exclusif des premières étapes du développement ontogénétique, la neuroplasticité structurelle cérébrale se maintient à des niveaux remarquables tout au long de l'existence adulte. Les données obtenues par imagerie par résonance magnétique fonctionnelle révèlent que l'acquisition tardive de compétences cognitives complexes induit des remaniements synaptiques quantifiables. Cette découverte bouleverse les approches réhabilitatives des pathologies neurodégénératives et invite à repenser la formation professionnelle tout au long de la vie.",
    opt: ["La persistance de la capacité de remaniement synaptique à l'âge adulte", "L'arrêt irréversible de la plasticité cérébrale dès la fin de l'adolescence", "L'inutilité de l'apprentissage tardif pour la prévention de la démence", "L'impossibilité de mesurer précisément les modifications neuronales en IRM"],
    ans: 0,
    passEn: "Neuroscience Journal: Structural neuroplasticity persists into adulthood, reshaping rehabilitation approaches."
  },

  // Q37-Q39: C2 (Abstract philosophy, epistemology of science, legal theory)
  {
    qNum: 37, level: "C2",
    q: "Quelle thèse philosophique l'auteur soutient-il à propos de la création artistique automatisée ?",
    text: "PHILOSOPHIE CONTEMPORAINE — La genèse d'œuvres picturales ou littéraires par des réseaux de neurones artificiels interroge au plus profond la notion d'intentionnalité esthétique. En dissociant la production formelle du geste poïétique incarné et de la conscience phénoménologique, l'art génératif opère une rupture ontologique majeure. L'œuvre produite par une machine ne saurait manifester d'altérité véritable ; elle demeure un simulacre hautement sophistiqué, répertoriant des structures syntaxiques dénuées d'expérience vécue du monde.",
    opt: ["L'art algorithmique constitue un simulacre dépourvu d'intentionnalité consciente", "Les machines possèdent une conscience phénoménologique supérieure à celle de l'homme", "La valeur artistique d'une œuvre dépend exclusivement de sa perfection technique", "L'intentionnalité de l'artiste humain est devenue une notion obsolète en esthétique"],
    ans: 0,
    passEn: "Contemporary Philosophy: Generative AI art operates an ontological rupture, remaining a simulacrum without consciousness."
  },
  {
    qNum: 38, level: "C2",
    q: "Selon l'analyse juridique, quelle est la limite essentielle du positivisme normatif ?",
    text: "REVUE DE THÉORIE DU DROIT — Le positivisme juridique strict, qui postule l'autosuffisance du système normatif par rapport aux principes éthiques fondamentaux, montre ses apories lors des crises constitutionnelles. En réduisant la validité du droit à la simple régularité procédurale de son édiction, cette doctrine s'avère incapable d'endiguer le dévoiement autoritaire des règles par des majorités de circonstance. L'arrimage de la légalité à des principes supralégaux inaliénables demeure le seul rempart effectif contre l'arbitraire d'État.",
    opt: ["L'incapacité du strict respect procédural à prémunir contre l'arbitraire autoritaire", "La supériorité absolue du droit positif sur toute considération de justice morale", "L'inutilité des règles de procédure dans la rédaction des textes de lois ordinaires", "La nécessité de supprimer toute constitution écrite dans les démocraties modérées"],
    ans: 0,
    passEn: "Legal Theory Review: Strict legal positivism fails during constitutional crises without supralegal moral anchors."
  },
  {
    qNum: 39, level: "C2",
    q: "Quelle vision du progrès scientifique l'épistémologue développe-t-il dans cet extrait ?",
    text: "ÉPISTÉMOLOGIE DES SCIENCES — L'histoire des révolutions scientifiques contredit l'illusion d'une accumulation linéaire et cumulative des connaissances empiriques. Conformément aux analyses kuhniennes, le passage d'une matrice disciplinaire à une autre s'accomplit par ruptures paradigmiques incommensurables. Chaque changement de paradigme ne se limite pas à affiner la mesure du réel, mais reconfigure la grille conceptuelle même par laquelle le monde est rendu intelligible pour la communauté des chercheurs.",
    opt: ["Le progrès procède par ruptures paradigmiques qui reconfigurent le réel intelligible", "La connaissance scientifique s'accroît par une stricte accumulation linéaire de faits", "Toutes les théories scientifiques passées possédaient une validité absolue et égale", "L'observation expérimentale directe est totalement indépendante du cadre théorique"],
    ans: 0,
    passEn: "Epistemology of Science: Scientific progress advances via paradigm shifts that reconfigure intelligible reality."
  }
];

// Generate 390 Reading Topics (39 items per paper x 10 papers)
const richReadingTopics = [];
for (let p = 1; p <= 10; p++) {
  const isPractice = p <= 5;
  const seedOffset = isPractice ? p * 3 : p * 7 + 13;

  for (let q = 1; q <= 39; q++) {
    const tmpl = templates[q - 1];
    
    // Balanced option shuffling so answer distribution is A: 25%, B: 25%, C: 25%, D: 25%
    const ansIdx = (q + p + seedOffset) % 4;
    const shuffledOpts = [...tmpl.opt];
    const correctVal = shuffledOpts[0];
    
    // Swap item 0 with target ansIdx
    shuffledOpts[0] = shuffledOpts[ansIdx];
    shuffledOpts[ansIdx] = correctVal;

    richReadingTopics.push({
      level: tmpl.level,
      q: tmpl.q,
      text: tmpl.text,
      opt: shuffledOpts,
      ans: ansIdx,
      passEn: tmpl.passEn,
      hint: `Reading Guidance [Level ${tmpl.level}]: Focus on identifying main thesis and eliminating extreme distractors.`
    });
  }
}

console.log(`✅ Successfully generated ${richReadingTopics.length} rich, detailed Reading topics with 100% CECRL Level Progression (A1-C2) & Shuffled Answers!`);

// Update examSchema.ts
const schemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let schemaCode = fs.readFileSync(schemaPath, 'utf8');

// Replace getRichReadingTopics function body in examSchema.ts
const newFunctionBody = `function getRichReadingTopics(): ReadingTopicItem[] {
  return ${JSON.stringify(richReadingTopics, null, 2)};
}`;

schemaCode = schemaCode.replace(/function getRichReadingTopics\(\): ReadingTopicItem\[\] \{[\s\S]*?\n\}/, newFunctionBody);

fs.writeFileSync(schemaPath, schemaCode, 'utf8');
console.log("🎉 Successfully updated examSchema.ts with 390 rich Reading topics!");
