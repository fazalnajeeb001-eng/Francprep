function getC1C2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
} {
  switch (sceneIdx % 60) {
    case 0:
      return {
        opt: [
          "La réduction de l'libre arbitre individuel sous l'influence des bulles de filtres algorithmiques",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'impact des algorithmes de prédiction comportementale sur l'autonomie décisionnelle à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à l'impact des algorithmes de prédiction comportementale sur l'autonomie décisionnelle à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la réduction de l'libre arbitre individuel sous l'influence des bulles de filtres algorithmiques.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning l'impact des algorithmes de prédiction comportementale sur l'autonomie décisionnelle à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la réduction de l'libre arbitre individuel sous l'influence des bulles de filtres algorithmiques.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 1:
      return {
        opt: [
          "L'obligation de rapatrier les infrastructures d'hébergement informatique sur le territoire national",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La souveraineté numérique et le stockage des données publiques stratégiques à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à la souveraineté numérique et le stockage des données publiques stratégiques à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'obligation de rapatrier les infrastructures d'hébergement informatique sur le territoire national.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning la souveraineté numérique et le stockage des données publiques stratégiques à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'obligation de rapatrier les infrastructures d'hébergement informatique sur le territoire national.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 2:
      return {
        opt: [
          "Le risque d'effets secondaires irréversibles sur la pluviométrie régionale globale",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'éthique de la géo-ingénierie solaire face au réchauffement climatique à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à l'éthique de la géo-ingénierie solaire face au réchauffement climatique à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le risque d'effets secondaires irréversibles sur la pluviométrie régionale globale.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning l'éthique de la géo-ingénierie solaire face au réchauffement climatique à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le risque d'effets secondaires irréversibles sur la pluviométrie régionale globale.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 3:
      return {
        opt: [
          "La remise en cause du principe du déterminisme absolu au profit d'une approche probabiliste",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Épistémologie des modèles prédictifs complexes en mécanique quantique à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à épistémologie des modèles prédictifs complexes en mécanique quantique à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la remise en cause du principe du déterminisme absolu au profit d'une approche probabiliste.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning épistémologie des modèles prédictifs complexes en mécanique quantique à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la remise en cause du principe du déterminisme absolu au profit d'une approche probabiliste.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 4:
      return {
        opt: [
          "La dépendance fondamentale de la pensée conceptuelle aux structures linguistiques locales",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La déconstruction du concept d'universalité dans la philosophie du langage à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à la déconstruction du concept d'universalité dans la philosophie du langage à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la dépendance fondamentale de la pensée conceptuelle aux structures linguistiques locales.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning la déconstruction du concept d'universalité dans la philosophie du langage à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la dépendance fondamentale de la pensée conceptuelle aux structures linguistiques locales.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 5:
      return {
        opt: [
          "Le risque d'éviction des banques commerciales traditionnelles au profit de la banque centrale",
          "La négation absolue de toute recherche scientifique menée à Montréal",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Montréal",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Macroéconomie monétaire et transition vers les monnaies numériques de banque centrale à Montréal",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Montréal, l'intervenant analyse les enjeux majeurs liés à macroéconomie monétaire et transition vers les monnaies numériques de banque centrale à montréal.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le risque d'éviction des banques commerciales traditionnelles au profit de la banque centrale.",
        en: "Speaker 1: In this academic lecture delivered in Montréal, the speaker analyzes major issues concerning macroéconomie monétaire et transition vers les monnaies numériques de banque centrale à montréal.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le risque d'éviction des banques commerciales traditionnelles au profit de la banque centrale.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 6:
      return {
        opt: [
          "L'attribution d'une responsabilité pénale aux concepteurs des logiciels de ciblage",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'évolution des normes juridiques face à l'autonomie des systèmes d'armes à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à l'évolution des normes juridiques face à l'autonomie des systèmes d'armes à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'attribution d'une responsabilité pénale aux concepteurs des logiciels de ciblage.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning l'évolution des normes juridiques face à l'autonomie des systèmes d'armes à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'attribution d'une responsabilité pénale aux concepteurs des logiciels de ciblage.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 7:
      return {
        opt: [
          "La création de sanctuaires marins d'interdiction totale de pêche industrielle",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La préservation de la biodiversité marine dans les zones économiques exclusives à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à la préservation de la biodiversité marine dans les zones économiques exclusives à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la création de sanctuaires marins d'interdiction totale de pêche industrielle.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning la préservation de la biodiversité marine dans les zones économiques exclusives à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la création de sanctuaires marins d'interdiction totale de pêche industrielle.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 8:
      return {
        opt: [
          "La précarisation des statuts professionnels déguisés sous la qualification d'indépendants",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Les mutations sociologiques du travail à l'ère de la plateforme collaborative à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à les mutations sociologiques du travail à l'ère de la plateforme collaborative à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la précarisation des statuts professionnels déguisés sous la qualification d'indépendants.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning les mutations sociologiques du travail à l'ère de la plateforme collaborative à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la précarisation des statuts professionnels déguisés sous la qualification d'indépendants.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 9:
      return {
        opt: [
          "L'impossibilité de réduire l'expérience phénoménale subjective à de simples calculs informatiques",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'aporie de la conscience artificielle dans la philosophie de l'esprit à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à l'aporie de la conscience artificielle dans la philosophie de l'esprit à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'impossibilité de réduire l'expérience phénoménale subjective à de simples calculs informatiques.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning l'aporie de la conscience artificielle dans la philosophie de l'esprit à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'impossibilité de réduire l'expérience phénoménale subjective à de simples calculs informatiques.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 10:
      return {
        opt: [
          "La démonstration que toute observation empirique est pré-orientée par un cadre théorique",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La critique du positivisme logique dans l'histoire des théories scientifiques à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à la critique du positivisme logique dans l'histoire des théories scientifiques à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la démonstration que toute observation empirique est pré-orientée par un cadre théorique.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning la critique du positivisme logique dans l'histoire des théories scientifiques à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la démonstration que toute observation empirique est pré-orientée par un cadre théorique.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 11:
      return {
        opt: [
          "Le risque de paralysie des filières de transition énergétique par goulot d'étranglement mondial",
          "La négation absolue de toute recherche scientifique menée à Québec",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Québec",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La géopolitique des terres rares et la dépendance industrielle technologique à Québec",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Québec, l'intervenant analyse les enjeux majeurs liés à la géopolitique des terres rares et la dépendance industrielle technologique à québec.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le risque de paralysie des filières de transition énergétique par goulot d'étranglement mondial.",
        en: "Speaker 1: In this academic lecture delivered in Québec, the speaker analyzes major issues concerning la géopolitique des terres rares et la dépendance industrielle technologique à québec.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le risque de paralysie des filières de transition énergétique par goulot d'étranglement mondial.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 12:
      return {
        opt: [
          "L'intégration de la ventilation naturelle et du végétal dans la conception architecturale",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'urbanisme bio-climatique et la résilience des métropoles du XXIe siècle à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à l'urbanisme bio-climatique et la résilience des métropoles du xxie siècle à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'intégration de la ventilation naturelle et du végétal dans la conception architecturale.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning l'urbanisme bio-climatique et la résilience des métropoles du xxie siècle à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'intégration de la ventilation naturelle et du végétal dans la conception architecturale.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 13:
      return {
        opt: [
          "Le dépassement du biais partisan par l'institution de jurés citoyens décisionnaires",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Les théories de la démocratie délibérative et les tirages au sort citoyens à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à les théories de la démocratie délibérative et les tirages au sort citoyens à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le dépassement du biais partisan par l'institution de jurés citoyens décisionnaires.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning les théories de la démocratie délibérative et les tirages au sort citoyens à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le dépassement du biais partisan par l'institution de jurés citoyens décisionnaires.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 14:
      return {
        opt: [
          "La stricte distinction entre thérapie génique réparatrice et eugénisme d'amélioration",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La régulation de la génétique médicale et l'édition du génome humain à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à la régulation de la génétique médicale et l'édition du génome humain à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la stricte distinction entre thérapie génique réparatrice et eugénisme d'amélioration.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning la régulation de la génétique médicale et l'édition du génome humain à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la stricte distinction entre thérapie génique réparatrice et eugénisme d'amélioration.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 15:
      return {
        opt: [
          "L'illusion du passage du temps absolu au sein du continuum espace-temps quadridimensionnel",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Ontologie du temps et relativité générale dans la physique contemporaine à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à ontologie du temps et relativité générale dans la physique contemporaine à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'illusion du passage du temps absolu au sein du continuum espace-temps quadridimensionnel.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning ontologie du temps et relativité générale dans la physique contemporaine à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'illusion du passage du temps absolu au sein du continuum espace-temps quadridimensionnel.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 16:
      return {
        opt: [
          "La fragmentation de la narration visant à déstabiliser l'illusion d'une vérité unique",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'esthétique de la déconstruction dans la littérature post-moderne à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à l'esthétique de la déconstruction dans la littérature post-moderne à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la fragmentation de la narration visant à déstabiliser l'illusion d'une vérité unique.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning l'esthétique de la déconstruction dans la littérature post-moderne à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la fragmentation de la narration visant à déstabiliser l'illusion d'une vérité unique.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 17:
      return {
        opt: [
          "La détection d'activités cérébrales prédictives antérieures à la prise de conscience de la décision",
          "La négation absolue de toute recherche scientifique menée à Ottawa",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Ottawa",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Neurobiologie de la décision et libre arbitre à la lumière de l'imagerie médicale à Ottawa",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Ottawa, l'intervenant analyse les enjeux majeurs liés à neurobiologie de la décision et libre arbitre à la lumière de l'imagerie médicale à ottawa.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la détection d'activités cérébrales prédictives antérieures à la prise de conscience de la décision.",
        en: "Speaker 1: In this academic lecture delivered in Ottawa, the speaker analyzes major issues concerning neurobiologie de la décision et libre arbitre à la lumière de l'imagerie médicale à ottawa.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la détection d'activités cérébrales prédictives antérieures à la prise de conscience de la décision.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 18:
      return {
        opt: [
          "Les tensions interculturelles liées à la revalorisation des espaces agricoles périurbains",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "Le renouvellement de la sociologie rurale face aux néo-ruraux à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à le renouvellement de la sociologie rurale face aux néo-ruraux à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur les tensions interculturelles liées à la revalorisation des espaces agricoles périurbains.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning le renouvellement de la sociologie rurale face aux néo-ruraux à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on les tensions interculturelles liées à la revalorisation des espaces agricoles périurbains.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 19:
      return {
        opt: [
          "L'obligation d'expliquer le fonctionnement interne des réseaux de neurones décisionnels",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La transparence algorithmique dans l'attribution des crédits bancaires à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la transparence algorithmique dans l'attribution des crédits bancaires à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'obligation d'expliquer le fonctionnement interne des réseaux de neurones décisionnels.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la transparence algorithmique dans l'attribution des crédits bancaires à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'obligation d'expliquer le fonctionnement interne des réseaux de neurones décisionnels.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 20:
      return {
        opt: [
          "L'imposition d'une taxe carbone globale sur les carburants lourds de la flotte internationale",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La fiscalité environnementale des transports maritimes transocéaniques à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la fiscalité environnementale des transports maritimes transocéaniques à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'imposition d'une taxe carbone globale sur les carburants lourds de la flotte internationale.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la fiscalité environnementale des transports maritimes transocéaniques à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'imposition d'une taxe carbone globale sur les carburants lourds de la flotte internationale.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 21:
      return {
        opt: [
          "La rupture du dilemme du prisonnier par l'instauration de sanctions commerciales réciproques",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie des jeux appliqués aux négociations climatiques mondiales à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la théorie des jeux appliqués aux négociations climatiques mondiales à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la rupture du dilemme du prisonnier par l'instauration de sanctions commerciales réciproques.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la théorie des jeux appliqués aux négociations climatiques mondiales à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la rupture du dilemme du prisonnier par l'instauration de sanctions commerciales réciproques.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 22:
      return {
        opt: [
          "L'ancrage corporel irréductible de toute appréhension subjective du monde environnant",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La phénoménologie de la perception spatiale chez Maurice Merleau-Ponty à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la phénoménologie de la perception spatiale chez maurice merleau-ponty à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'ancrage corporel irréductible de toute appréhension subjective du monde environnant.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la phénoménologie de la perception spatiale chez maurice merleau-ponty à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'ancrage corporel irréductible de toute appréhension subjective du monde environnant.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 23:
      return {
        opt: [
          "L'encadrement des flux financiers non bancaires pour prévenir un risque systémique global",
          "La négation absolue de toute recherche scientifique menée à Toronto",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toronto",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La régulation prudentielle des systèmes bancaires ombre (Shadow Banking) à Toronto",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toronto, l'intervenant analyse les enjeux majeurs liés à la régulation prudentielle des systèmes bancaires ombre (shadow banking) à toronto.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'encadrement des flux financiers non bancaires pour prévenir un risque systémique global.",
        en: "Speaker 1: In this academic lecture delivered in Toronto, the speaker analyzes major issues concerning la régulation prudentielle des systèmes bancaires ombre (shadow banking) à toronto.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'encadrement des flux financiers non bancaires pour prévenir un risque systémique global.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 24:
      return {
        opt: [
          "La reconversion des friches en lieux de création artistique et d'innovation sociale",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La patrimonialisation des paysages industriels déclassés à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la patrimonialisation des paysages industriels déclassés à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la reconversion des friches en lieux de création artistique et d'innovation sociale.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la patrimonialisation des paysages industriels déclassés à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la reconversion des friches en lieux de création artistique et d'innovation sociale.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 25:
      return {
        opt: [
          "La démonstration de la viabilité des gestions communautaires sans appropriation privée",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'analyse économique des biens communs selon Elinor Ostrom à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à l'analyse économique des biens communs selon elinor ostrom à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la démonstration de la viabilité des gestions communautaires sans appropriation privée.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning l'analyse économique des biens communs selon elinor ostrom à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la démonstration de la viabilité des gestions communautaires sans appropriation privée.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 26:
      return {
        opt: [
          "La nécessité de séparer étanchément les réseaux opérationnels d'Internet",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La cybersécurité des infrastructures critiques d'approvisionnement en eau à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la cybersécurité des infrastructures critiques d'approvisionnement en eau à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la nécessité de séparer étanchément les réseaux opérationnels d'internet.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la cybersécurité des infrastructures critiques d'approvisionnement en eau à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la nécessité de séparer étanchément les réseaux opérationnels d'internet.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 27:
      return {
        opt: [
          "Le redéploiement de la notion d'identité individuelle face aux prothèses cognitives",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La métaphysique du sujet pensant à l'ère de l'intelligence hybride à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la métaphysique du sujet pensant à l'ère de l'intelligence hybride à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le redéploiement de la notion d'identité individuelle face aux prothèses cognitives.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la métaphysique du sujet pensant à l'ère de l'intelligence hybride à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le redéploiement de la notion d'identité individuelle face aux prothèses cognitives.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 28:
      return {
        opt: [
          "La réduction de la complexité argumentative au profit de slogans émotionnels répétitifs",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La sémiotique du discours politique dans les médias d'information en continu à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la sémiotique du discours politique dans les médias d'information en continu à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la réduction de la complexité argumentative au profit de slogans émotionnels répétitifs.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la sémiotique du discours politique dans les médias d'information en continu à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la réduction de la complexité argumentative au profit de slogans émotionnels répétitifs.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 29:
      return {
        opt: [
          "La succession de longues périodes de stase et d'épisodes de spéciation très rapides",
          "La négation absolue de toute recherche scientifique menée à Vancouver",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Vancouver",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La dynamique des équilibres ponctués dans la biologie de l'évolution à Vancouver",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Vancouver, l'intervenant analyse les enjeux majeurs liés à la dynamique des équilibres ponctués dans la biologie de l'évolution à vancouver.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la succession de longues périodes de stase et d'épisodes de spéciation très rapides.",
        en: "Speaker 1: In this academic lecture delivered in Vancouver, the speaker analyzes major issues concerning la dynamique des équilibres ponctués dans la biologie de l'évolution à vancouver.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la succession de longues périodes de stase et d'épisodes de spéciation très rapides.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 30:
      return {
        opt: [
          "Le risque de biais de confirmation dans la publication des résultats cliniques",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'éthique de la recherche scientifique financée par des fonds privés à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à l'éthique de la recherche scientifique financée par des fonds privés à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le risque de biais de confirmation dans la publication des résultats cliniques.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning l'éthique de la recherche scientifique financée par des fonds privés à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le risque de biais de confirmation dans la publication des résultats cliniques.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 31:
      return {
        opt: [
          "L'archivage numérique et l'immersion linguistique scolaire précoce des jeunes enfants",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La préservation des langues autochtones menacées d'extinction à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à la préservation des langues autochtones menacées d'extinction à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'archivage numérique et l'immersion linguistique scolaire précoce des jeunes enfants.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning la préservation des langues autochtones menacées d'extinction à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'archivage numérique et l'immersion linguistique scolaire précoce des jeunes enfants.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 32:
      return {
        opt: [
          "Le déploiement accéléré des corridors de recharge à hydrogène vert",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La transition écologique des flottes de transport de marchandises par camion à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à la transition écologique des flottes de transport de marchandises par camion à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le déploiement accéléré des corridors de recharge à hydrogène vert.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning la transition écologique des flottes de transport de marchandises par camion à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le déploiement accéléré des corridors de recharge à hydrogène vert.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 33:
      return {
        opt: [
          "La tension permanente entre l'intention originelle des rédacteurs et l'interprétation vivante",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'herméneutique des textes juridiques constitutionnels à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à l'herméneutique des textes juridiques constitutionnels à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la tension permanente entre l'intention originelle des rédacteurs et l'interprétation vivante.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning l'herméneutique des textes juridiques constitutionnels à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la tension permanente entre l'intention originelle des rédacteurs et l'interprétation vivante.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 34:
      return {
        opt: [
          "Le rejet de la métaphore de l'esprit comme simple programme d'ordinateur désincarné",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La philosophie des sciences cognitives et l'embodiment (incarnation) à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à la philosophie des sciences cognitives et l'embodiment (incarnation) à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le rejet de la métaphore de l'esprit comme simple programme d'ordinateur désincarné.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning la philosophie des sciences cognitives et l'embodiment (incarnation) à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le rejet de la métaphore de l'esprit comme simple programme d'ordinateur désincarné.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 35:
      return {
        opt: [
          "L'orientation des choix individuels par la modification subtile de l'environnement décisionnel",
          "La négation absolue de toute recherche scientifique menée à Calgary",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Calgary",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'économie comportementale et l'effet Nudge dans la santé publique à Calgary",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Calgary, l'intervenant analyse les enjeux majeurs liés à l'économie comportementale et l'effet nudge dans la santé publique à calgary.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'orientation des choix individuels par la modification subtile de l'environnement décisionnel.",
        en: "Speaker 1: In this academic lecture delivered in Calgary, the speaker analyzes major issues concerning l'économie comportementale et l'effet nudge dans la santé publique à calgary.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'orientation des choix individuels par la modification subtile de l'environnement décisionnel.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 36:
      return {
        opt: [
          "Le fossé mesuré entre les intentions écologiques déclarées et les actes d'achat réels",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La sociologie de la consommation responsable et le greenwashing à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à la sociologie de la consommation responsable et le greenwashing à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le fossé mesuré entre les intentions écologiques déclarées et les actes d'achat réels.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning la sociologie de la consommation responsable et le greenwashing à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le fossé mesuré entre les intentions écologiques déclarées et les actes d'achat réels.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 37:
      return {
        opt: [
          "Le déploiement de la fibre optique associé à un accompagnement humain de proximité",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'accessibilité universelle de la culture numérique dans les territoires ruraux à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à l'accessibilité universelle de la culture numérique dans les territoires ruraux à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le déploiement de la fibre optique associé à un accompagnement humain de proximité.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning l'accessibilité universelle de la culture numérique dans les territoires ruraux à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le déploiement de la fibre optique associé à un accompagnement humain de proximité.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 38:
      return {
        opt: [
          "L'invocabilité directe du principe de précaution devant les juridictions administratives",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La protection constitutionnelle du droit à un environnement sain à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à la protection constitutionnelle du droit à un environnement sain à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'invocabilité directe du principe de précaution devant les juridictions administratives.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning la protection constitutionnelle du droit à un environnement sain à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'invocabilité directe du principe de précaution devant les juridictions administratives.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 39:
      return {
        opt: [
          "Le basculement discontinu d'un paradigme dominant vers un nouveau cadre conceptuel",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie des révolutions scientifiques selon Thomas Kuhn à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à la théorie des révolutions scientifiques selon thomas kuhn à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le basculement discontinu d'un paradigme dominant vers un nouveau cadre conceptuel.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning la théorie des révolutions scientifiques selon thomas kuhn à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le basculement discontinu d'un paradigme dominant vers un nouveau cadre conceptuel.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 40:
      return {
        opt: [
          "La structuration inconsciente de nos pensées quotidiennes par des schémas corporels",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'analyse linguistique de la métaphore conceptuelle selon Lakoff et Johnson à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à l'analyse linguistique de la métaphore conceptuelle selon lakoff et johnson à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la structuration inconsciente de nos pensées quotidiennes par des schémas corporels.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning l'analyse linguistique de la métaphore conceptuelle selon lakoff et johnson à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la structuration inconsciente de nos pensées quotidiennes par des schémas corporels.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 41:
      return {
        opt: [
          "La création d'institutions supranationales dotées d'un pouvoir de sanction contraignant",
          "La négation absolue de toute recherche scientifique menée à Bordeaux",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Bordeaux",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La gouvernance globale des biens publics mondiaux à Bordeaux",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Bordeaux, l'intervenant analyse les enjeux majeurs liés à la gouvernance globale des biens publics mondiaux à bordeaux.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la création d'institutions supranationales dotées d'un pouvoir de sanction contraignant.",
        en: "Speaker 1: In this academic lecture delivered in Bordeaux, the speaker analyzes major issues concerning la gouvernance globale des biens publics mondiaux à bordeaux.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la création d'institutions supranationales dotées d'un pouvoir de sanction contraignant.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 42:
      return {
        opt: [
          "La quantification financière de la captation du carbone et de la purification de l'eau",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'évaluation économique des services écosystémiques rendus par la forêt à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à l'évaluation économique des services écosystémiques rendus par la forêt à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la quantification financière de la captation du carbone et de la purification de l'eau.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning l'évaluation économique des services écosystémiques rendus par la forêt à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la quantification financière de la captation du carbone et de la purification de l'eau.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 43:
      return {
        opt: [
          "La relocalisation des cultures céréalières et maraîchères autour des bassins de vie",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La souveraineté alimentaire régionale et la réduction des dépendances d'importation à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à la souveraineté alimentaire régionale et la réduction des dépendances d'importation à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la relocalisation des cultures céréalières et maraîchères autour des bassins de vie.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning la souveraineté alimentaire régionale et la réduction des dépendances d'importation à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la relocalisation des cultures céréalières et maraîchères autour des bassins de vie.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 44:
      return {
        opt: [
          "Le renforcement du statut d'immunité pénale et la prise en charge des frais de justice",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La protection des lanceurs d'alerte dans les affaires de corruption industrielle à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à la protection des lanceurs d'alerte dans les affaires de corruption industrielle à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le renforcement du statut d'immunité pénale et la prise en charge des frais de justice.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning la protection des lanceurs d'alerte dans les affaires de corruption industrielle à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le renforcement du statut d'immunité pénale et la prise en charge des frais de justice.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 45:
      return {
        opt: [
          "La mise en évidence de la fabrication sociale des faits scientifiques en laboratoire",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'épistémologie du constructivisme social en sociologie des sciences à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à l'épistémologie du constructivisme social en sociologie des sciences à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la mise en évidence de la fabrication sociale des faits scientifiques en laboratoire.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning l'épistémologie du constructivisme social en sociologie des sciences à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la mise en évidence de la fabrication sociale des faits scientifiques en laboratoire.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 46:
      return {
        opt: [
          "La formalisation mathématique des notions de possibilité, de nécessité et de contingence",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La logique modale et la philosophie du langage formel à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à la logique modale et la philosophie du langage formel à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la formalisation mathématique des notions de possibilité, de nécessité et de contingence.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning la logique modale et la philosophie du langage formel à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la formalisation mathématique des notions de possibilité, de nécessité et de contingence.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 47:
      return {
        opt: [
          "L'instabilité intrinsèque des périodes de prospérité générant des bulles d'endettement",
          "La négation absolue de toute recherche scientifique menée à Lyon",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Lyon",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie des cycles financiers longs d'Hyman Minsky à Lyon",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Lyon, l'intervenant analyse les enjeux majeurs liés à la théorie des cycles financiers longs d'hyman minsky à lyon.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'instabilité intrinsèque des périodes de prospérité générant des bulles d'endettement.",
        en: "Speaker 1: In this academic lecture delivered in Lyon, the speaker analyzes major issues concerning la théorie des cycles financiers longs d'hyman minsky à lyon.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'instabilité intrinsèque des périodes de prospérité générant des bulles d'endettement.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 48:
      return {
        opt: [
          "La création de déserts administratifs pour les populations éloignées des outils numériques",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'impact de la numérisation des services publics sur la précarité administrative à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à l'impact de la numérisation des services publics sur la précarité administrative à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la création de déserts administratifs pour les populations éloignées des outils numériques.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning l'impact de la numérisation des services publics sur la précarité administrative à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la création de déserts administratifs pour les populations éloignées des outils numériques.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 49:
      return {
        opt: [
          "Le démontage et le recyclage systématique des métaux rares des avions en fin de vie",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La valorisation de l'économie circulaire dans l'industrie aéronautique à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la valorisation de l'économie circulaire dans l'industrie aéronautique à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le démontage et le recyclage systématique des métaux rares des avions en fin de vie.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la valorisation de l'économie circulaire dans l'industrie aéronautique à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le démontage et le recyclage systématique des métaux rares des avions en fin de vie.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 50:
      return {
        opt: [
          "La priorité absolue accordée à l'eau potable au détriment des loisirs et de l'irrigation",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La gestion économe de la ressource en eau en période de sécheresse sévère à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la gestion économe de la ressource en eau en période de sécheresse sévère à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la priorité absolue accordée à l'eau potable au détriment des loisirs et de l'irrigation.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la gestion économe de la ressource en eau en période de sécheresse sévère à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la priorité absolue accordée à l'eau potable au détriment des loisirs et de l'irrigation.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 51:
      return {
        opt: [
          "La dénonciation de la soumission de la raison humaine à la seule logique de rendement technologique",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie critique de l'École de Francfort et la rationalité instrumentale à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la théorie critique de l'école de francfort et la rationalité instrumentale à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la dénonciation de la soumission de la raison humaine à la seule logique de rendement technologique.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la théorie critique de l'école de francfort et la rationalité instrumentale à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la dénonciation de la soumission de la raison humaine à la seule logique de rendement technologique.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 52:
      return {
        opt: [
          "La preuve expérimentale de la non-localité fondamentale de l'univers physique",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La physique quantique et l'intrication à grande distance à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la physique quantique et l'intrication à grande distance à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la preuve expérimentale de la non-localité fondamentale de l'univers physique.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la physique quantique et l'intrication à grande distance à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la preuve expérimentale de la non-localité fondamentale de l'univers physique.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 53:
      return {
        opt: [
          "La maximisation de la situation des membres les plus désavantagés de la société",
          "La négation absolue de toute recherche scientifique menée à Toulouse",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Toulouse",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La philosophie politique de la justice distributive selon John Rawls à Toulouse",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Toulouse, l'intervenant analyse les enjeux majeurs liés à la philosophie politique de la justice distributive selon john rawls à toulouse.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la maximisation de la situation des membres les plus désavantagés de la société.",
        en: "Speaker 1: In this academic lecture delivered in Toulouse, the speaker analyzes major issues concerning la philosophie politique de la justice distributive selon john rawls à toulouse.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la maximisation de la situation des membres les plus désavantagés de la société.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 54:
      return {
        opt: [
          "La transformation des anciens hangars en espaces culturels et scientifiques intégrés",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La réhabilitation du patrimoine maritime et fluvial portuaire à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q34) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à la réhabilitation du patrimoine maritime et fluvial portuaire à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la transformation des anciens hangars en espaces culturels et scientifiques intégrés.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning la réhabilitation du patrimoine maritime et fluvial portuaire à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la transformation des anciens hangars en espaces culturels et scientifiques intégrés.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 55:
      return {
        opt: [
          "L'intégration de clauses sociales contraignantes dans tous les marchés de la ville",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La promotion de l'économie sociale et solidaire dans la commande publique à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q35) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à la promotion de l'économie sociale et solidaire dans la commande publique à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'intégration de clauses sociales contraignantes dans tous les marchés de la ville.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning la promotion de l'économie sociale et solidaire dans la commande publique à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'intégration de clauses sociales contraignantes dans tous les marchés de la ville.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 56:
      return {
        opt: [
          "Le ralentissement naturel des crues par la réhumidification des marais et vallées",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La prévention des risques d'inondation par la restauration des zones humides à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q36) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à la prévention des risques d'inondation par la restauration des zones humides à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur le ralentissement naturel des crues par la réhumidification des marais et vallées.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning la prévention des risques d'inondation par la restauration des zones humides à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on le ralentissement naturel des crues par la réhumidification des marais et vallées.",
        hint: "⚠️ Level C1 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C1"
      };
    case 57:
      return {
        opt: [
          "La reconnaissance d'autres modes de relation au vivant non centrés sur l'exceptionnalisme humain",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'anthropologie de la nature et le dépassement du dualisme nature/culture selon Philippe Descola à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q37) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à l'anthropologie de la nature et le dépassement du dualisme nature/culture selon philippe descola à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur la reconnaissance d'autres modes de relation au vivant non centrés sur l'exceptionnalisme humain.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning l'anthropologie de la nature et le dépassement du dualisme nature/culture selon philippe descola à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on la reconnaissance d'autres modes de relation au vivant non centrés sur l'exceptionnalisme humain.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 58:
      return {
        opt: [
          "L'émergence de propriétés globales imprévisibles à partir d'interactions locales simples",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "La théorie des systèmes complexes auto-organisés en écologie globale à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q38) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à la théorie des systèmes complexes auto-organisés en écologie globale à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'émergence de propriétés globales imprévisibles à partir d'interactions locales simples.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning la théorie des systèmes complexes auto-organisés en écologie globale à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'émergence de propriétés globales imprévisibles à partir d'interactions locales simples.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    case 59:
      return {
        opt: [
          "L'impératif catégorique de préserver l'existence d'une vie humaine authentique sur Terre",
          "La négation absolue de toute recherche scientifique menée à Nantes",
          "L'imposition d'un tarif douanier fixe de 80% sur les exportations régionales de Nantes",
          "La suppression définitive de l'enseignement des sciences humaines à l'université"
        ],
        ans: 0,
        title: "L'éthique de la responsabilité pour les générations futures selon Hans Jonas à Nantes",
        text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation (Q39) ?",
        tr: "Locuteur 1: Lors de cet exposé académique tenu à Nantes, l'intervenant analyse les enjeux majeurs liés à l'éthique de la responsabilité pour les générations futures selon hans jonas à nantes.\nLocutrice 2: Il souligne de manière décisive que la thèse fondamentale repose sur l'impératif catégorique de préserver l'existence d'une vie humaine authentique sur terre.",
        en: "Speaker 1: In this academic lecture delivered in Nantes, the speaker analyzes major issues concerning l'éthique de la responsabilité pour les générations futures selon hans jonas à nantes.\nSpeaker 2: He conclusively emphasizes that the core thesis rests on l'impératif catégorique de préserver l'existence d'une vie humaine authentique sur terre.",
        hint: "⚠️ Level C2 Guidance: Identify the core thesis formulated with high-register academic vocabulary.",
        level: "C2"
      };
    default:
      return {
        opt: ["Option A", "Option B", "Option C", "Option D"],
        ans: 0,
        title: "Conférence C1-C2",
        text: "Écoutez l'exposé et choisissez la bonne réponse.",
        tr: "Transcription C1-C2",
        en: "C1-C2 Transcript",
        hint: "Conseil C1-C2",
        level: "C1"
      };
  }
}
