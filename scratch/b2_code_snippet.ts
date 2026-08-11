function getB2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
} {
  switch (sceneIdx % 80) {
    case 0:
      return {
        opt: [
          "La mise en place d'un étiquetage obligatoire des contenus générés par algorithme à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Régulation de l'IA générative dans les médias de Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant régulation de l'ia générative dans les médias de montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la mise en place d'un étiquetage obligatoire des contenus générés par algorithme à montréal.",
        en: "Speaker 1: The debate concerning régulation de l'ia générative dans les médias de montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la mise en place d'un étiquetage obligatoire des contenus générés par algorithme à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 1:
      return {
        opt: [
          "La péréquation des recettes fiscales communales entre Montréal et ses villes dortoirs",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Taxation du télétravail transfrontalier interprovincial à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant taxation du télétravail transfrontalier interprovincial à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la péréquation des recettes fiscales communales entre montréal et ses villes dortoirs.",
        en: "Speaker 1: The debate concerning taxation du télétravail transfrontalier interprovincial à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la péréquation des recettes fiscales communales entre montréal et ses villes dortoirs.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 2:
      return {
        opt: [
          "La réduction des émissions toxiques tout en développant le réseau de tramway à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des véhicules thermiques dans l'hypercentre de Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant interdiction des véhicules thermiques dans l'hypercentre de montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la réduction des émissions toxiques tout en développant le réseau de tramway à montréal.",
        en: "Speaker 1: The debate concerning interdiction des véhicules thermiques dans l'hypercentre de montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la réduction des émissions toxiques tout en développant le réseau de tramway à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 3:
      return {
        opt: [
          "L'obligation pour les conditionneurs d'utiliser 40% de matières recyclées à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Quotas de plastique recyclé dans l’agroalimentaire à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant quotas de plastique recyclé dans l’agroalimentaire à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure l'obligation pour les conditionneurs d'utiliser 40% de matières recyclées à montréal.",
        en: "Speaker 1: The debate concerning quotas de plastique recyclé dans l’agroalimentaire à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains l'obligation pour les conditionneurs d'utiliser 40% de matières recyclées à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 4:
      return {
        opt: [
          "Une prise en charge de 35% des coûts d'équipement photovoltaïque pour les propriétaires de Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Subventions aux installations solaires raccordées à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant subventions aux installations solaires raccordées à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure une prise en charge de 35% des coûts d'équipement photovoltaïque pour les propriétaires de montréal.",
        en: "Speaker 1: The debate concerning subventions aux installations solaires raccordées à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains une prise en charge de 35% des coûts d'équipement photovoltaïque pour les propriétaires de montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 5:
      return {
        opt: [
          "Le développement du sentiment citoyen et l'aménagement d'espaces verts collectifs à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Service civique environnemental obligatoire pour les jeunes à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant service civique environnemental obligatoire pour les jeunes à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure le développement du sentiment citoyen et l'aménagement d'espaces verts collectifs à montréal.",
        en: "Speaker 1: The debate concerning service civique environnemental obligatoire pour les jeunes à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains le développement du sentiment citoyen et l'aménagement d'espaces verts collectifs à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 6:
      return {
        opt: [
          "La dénonciation par les syndicats des risques de surmenage et d'intrusion dans la vie privée à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Contrôle algorithmique de la cadence de travail à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant contrôle algorithmique de la cadence de travail à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la dénonciation par les syndicats des risques de surmenage et d'intrusion dans la vie privée à montréal.",
        en: "Speaker 1: The debate concerning contrôle algorithmique de la cadence de travail à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la dénonciation par les syndicats des risques de surmenage et d'intrusion dans la vie privée à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 7:
      return {
        opt: [
          "La pénalisation de la fast-fashion au profit d'ateliers textiles locaux durables à Montréal",
          "L'interdiction stricte de toute innovation technique dans la région de Montréal",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Montréal",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Ecotaxe sur l'habillement synthétique importé à Montréal",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant ecotaxe sur l'habillement synthétique importé à montréal suscite des discussions passionnées à Montréal.\nLocutrice 2: Toutefois, la priorité demeure la pénalisation de la fast-fashion au profit d'ateliers textiles locaux durables à montréal.",
        en: "Speaker 1: The debate concerning ecotaxe sur l'habillement synthétique importé à montréal sparks passionate discussion in Montréal.\nSpeaker 2: However, the main priority remains la pénalisation de la fast-fashion au profit d'ateliers textiles locaux durables à montréal.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 8:
      return {
        opt: [
          "Le plafonnement à 90 jours de location annuelle pour préserver le logement locatif à Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Responsabilité juridique des plateformes d'hébergement touristique à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant responsabilité juridique des plateformes d'hébergement touristique à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure le plafonnement à 90 jours de location annuelle pour préserver le logement locatif à québec.",
        en: "Speaker 1: The debate concerning responsabilité juridique des plateformes d'hébergement touristique à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains le plafonnement à 90 jours de location annuelle pour préserver le logement locatif à québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 9:
      return {
        opt: [
          "La tarification de la congestion pour financer l'électrification du réseau d'autobus de Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Péage urbain dynamique à l'entrée de la ville de Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant péage urbain dynamique à l'entrée de la ville de québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure la tarification de la congestion pour financer l'électrification du réseau d'autobus de québec.",
        en: "Speaker 1: The debate concerning péage urbain dynamique à l'entrée de la ville de québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains la tarification de la congestion pour financer l'électrification du réseau d'autobus de québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 10:
      return {
        opt: [
          "La gratuité des volumes vitaux suivie d'une surtaxe sur le gaspillage d'eau à Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Tarification progressive de l'eau potable résidentielle à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant tarification progressive de l'eau potable résidentielle à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure la gratuité des volumes vitaux suivie d'une surtaxe sur le gaspillage d'eau à québec.",
        en: "Speaker 1: The debate concerning tarification progressive de l'eau potable résidentielle à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains la gratuité des volumes vitaux suivie d'une surtaxe sur le gaspillage d'eau à québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 11:
      return {
        opt: [
          "L'obligation pour les bailleurs d'isoler les bâtiments avant toute révision de loyer à Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de rénovation thermique pour les passoires énergétiques à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant obligation de rénovation thermique pour les passoires énergétiques à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure l'obligation pour les bailleurs d'isoler les bâtiments avant toute révision de loyer à québec.",
        en: "Speaker 1: The debate concerning obligation de rénovation thermique pour les passoires énergétiques à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains l'obligation pour les bailleurs d'isoler les bâtiments avant toute révision de loyer à québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 12:
      return {
        opt: [
          "La fixation d'un loyer de référence au mètre carré pour freiner la spéculation immobilière à Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Encadrement des loyers dans le secteur privé de Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant encadrement des loyers dans le secteur privé de québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure la fixation d'un loyer de référence au mètre carré pour freiner la spéculation immobilière à québec.",
        en: "Speaker 1: The debate concerning encadrement des loyers dans le secteur privé de québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains la fixation d'un loyer de référence au mètre carré pour freiner la spéculation immobilière à québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 13:
      return {
        opt: [
          "L'intégration sous conditions d'efficacité des thérapies complémentaires au régime de Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Remboursement des soins de médecine alternative par la santé publique à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant remboursement des soins de médecine alternative par la santé publique à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure l'intégration sous conditions d'efficacité des thérapies complémentaires au régime de québec.",
        en: "Speaker 1: The debate concerning remboursement des soins de médecine alternative par la santé publique à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains l'intégration sous conditions d'efficacité des thérapies complémentaires au régime de québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 14:
      return {
        opt: [
          "La suppression des réclames pour les lignes réalisables en moins de 3 heures de train depuis Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction de la publicité pour les vols aériens courts à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant interdiction de la publicité pour les vols aériens courts à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure la suppression des réclames pour les lignes réalisables en moins de 3 heures de train depuis québec.",
        en: "Speaker 1: The debate concerning interdiction de la publicité pour les vols aériens courts à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains la suppression des réclames pour les lignes réalisables en moins de 3 heures de train depuis québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 15:
      return {
        opt: [
          "Le retour des bouteilles réutilisables dans tous les supermarchés de la région de Québec",
          "L'interdiction stricte de toute innovation technique dans la région de Québec",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Québec",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Déploiement de la consigne en verre consignée à Québec",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant déploiement de la consigne en verre consignée à québec suscite des discussions passionnées à Québec.\nLocutrice 2: Toutefois, la priorité demeure le retour des bouteilles réutilisables dans tous les supermarchés de la région de québec.",
        en: "Speaker 1: The debate concerning déploiement de la consigne en verre consignée à québec sparks passionate discussion in Québec.\nSpeaker 2: However, the main priority remains le retour des bouteilles réutilisables dans tous les supermarchés de la région de québec.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 16:
      return {
        opt: [
          "L'augmentation de la productivité horaire constatée dans les entreprises pilotes d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Semaine de travail de 32 heures sans perte de salaire à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant semaine de travail de 32 heures sans perte de salaire à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'augmentation de la productivité horaire constatée dans les entreprises pilotes d'ottawa.",
        en: "Speaker 1: The debate concerning semaine de travail de 32 heures sans perte de salaire à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'augmentation de la productivité horaire constatée dans les entreprises pilotes d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 17:
      return {
        opt: [
          "L'approvisionnement exclusif auprès des fermes régionales entourant la ville d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Introduction de repas 100% biologiques et locaux dans les cantines d'Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant introduction de repas 100% biologiques et locaux dans les cantines d'ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'approvisionnement exclusif auprès des fermes régionales entourant la ville d'ottawa.",
        en: "Speaker 1: The debate concerning introduction de repas 100% biologiques et locaux dans les cantines d'ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'approvisionnement exclusif auprès des fermes régionales entourant la ville d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 18:
      return {
        opt: [
          "Le passage au vaisselle lavable et réutilisable dans tous les fast-foods d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des emballages plastiques à usage unique pour la restauration à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant interdiction des emballages plastiques à usage unique pour la restauration à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure le passage au vaisselle lavable et réutilisable dans tous les fast-foods d'ottawa.",
        en: "Speaker 1: The debate concerning interdiction des emballages plastiques à usage unique pour la restauration à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains le passage au vaisselle lavable et réutilisable dans tous les fast-foods d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 19:
      return {
        opt: [
          "L'autorisation d'accès limitée aux véhicules transportant au moins trois occupants à Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des voies réservées au covoiturage sur autoroute à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant développement des voies réservées au covoiturage sur autoroute à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'autorisation d'accès limitée aux véhicules transportant au moins trois occupants à ottawa.",
        en: "Speaker 1: The debate concerning développement des voies réservées au covoiturage sur autoroute à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'autorisation d'accès limitée aux véhicules transportant au moins trois occupants à ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 20:
      return {
        opt: [
          "Le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Régulation des trottinettes électriques en libre-service à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant régulation des trottinettes électriques en libre-service à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à ottawa.",
        en: "Speaker 1: The debate concerning régulation des trottinettes électriques en libre-service à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains le stationnement obligatoire dans des emplacements délimités pour éviter l'encombrement à ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 21:
      return {
        opt: [
          "La préservation de la biodiversité locale contre le grignotage immobilier autour d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'une réserve naturelle périurbaine protégée à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant création d'une réserve naturelle périurbaine protégée à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure la préservation de la biodiversité locale contre le grignotage immobilier autour d'ottawa.",
        en: "Speaker 1: The debate concerning création d'une réserve naturelle périurbaine protégée à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains la préservation de la biodiversité locale contre le grignotage immobilier autour d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 22:
      return {
        opt: [
          "L'octroi d'une prime de transition pour le raccordement au réseau de chaleur d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Aide financière au remplacement des chaudières au fioul à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant aide financière au remplacement des chaudières au fioul à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'octroi d'une prime de transition pour le raccordement au réseau de chaleur d'ottawa.",
        en: "Speaker 1: The debate concerning aide financière au remplacement des chaudières au fioul à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'octroi d'une prime de transition pour le raccordement au réseau de chaleur d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 23:
      return {
        opt: [
          "L'interdiction d'envoyer des courriels professionnels le week-end aux employés d'Ottawa",
          "L'interdiction stricte de toute innovation technique dans la région de Ottawa",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Ottawa",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Droit à la déconnexion numérique après les heures de bureau à Ottawa",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant droit à la déconnexion numérique après les heures de bureau à ottawa suscite des discussions passionnées à Ottawa.\nLocutrice 2: Toutefois, la priorité demeure l'interdiction d'envoyer des courriels professionnels le week-end aux employés d'ottawa.",
        en: "Speaker 1: The debate concerning droit à la déconnexion numérique après les heures de bureau à ottawa sparks passionate discussion in Ottawa.\nSpeaker 2: However, the main priority remains l'interdiction d'envoyer des courriels professionnels le week-end aux employés d'ottawa.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 24:
      return {
        opt: [
          "La collecte séparée des biodéchets ménagers dans tous les quartiers de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Mise en place du compostage obligatoire pour les ménages de Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant mise en place du compostage obligatoire pour les ménages de toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la collecte séparée des biodéchets ménagers dans tous les quartiers de toronto.",
        en: "Speaker 1: The debate concerning mise en place du compostage obligatoire pour les ménages de toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la collecte séparée des biodéchets ménagers dans tous les quartiers de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 25:
      return {
        opt: [
          "La préservation du sommeil des riverains par l'arrêt des atterrissages entre 23h et 6h à Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des vols de nuit à l'aéroport métropolitain de Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant interdiction des vols de nuit à l'aéroport métropolitain de toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la préservation du sommeil des riverains par l'arrêt des atterrissages entre 23h et 6h à toronto.",
        en: "Speaker 1: The debate concerning interdiction des vols de nuit à l'aéroport métropolitain de toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la préservation du sommeil des riverains par l'arrêt des atterrissages entre 23h et 6h à toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 26:
      return {
        opt: [
          "L'absorption des eaux de pluie et le rafraîchissement des immeubles neufs de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Installation systématique de toitures végétalisées sur les neufs à Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant installation systématique de toitures végétalisées sur les neufs à toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure l'absorption des eaux de pluie et le rafraîchissement des immeubles neufs de toronto.",
        en: "Speaker 1: The debate concerning installation systématique de toitures végétalisées sur les neufs à toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains l'absorption des eaux de pluie et le rafraîchissement des immeubles neufs de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 27:
      return {
        opt: [
          "La distribution d'un crédit annuel pour l'achat de livres et billets de théâtre à Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'un chèque culture annuel pour la jeunesse de Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant création d'un chèque culture annuel pour la jeunesse de toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la distribution d'un crédit annuel pour l'achat de livres et billets de théâtre à toronto.",
        en: "Speaker 1: The debate concerning création d'un chèque culture annuel pour la jeunesse de toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la distribution d'un crédit annuel pour l'achat de livres et billets de théâtre à toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 28:
      return {
        opt: [
          "La production maraîchère locale en circuit court sur les toits d'immeubles de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des fermes urbaines verticales en centre-ville de Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant développement des fermes urbaines verticales en centre-ville de toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la production maraîchère locale en circuit court sur les toits d'immeubles de toronto.",
        en: "Speaker 1: The debate concerning développement des fermes urbaines verticales en centre-ville de toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la production maraîchère locale en circuit court sur les toits d'immeubles de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 29:
      return {
        opt: [
          "L'attribution d'un bonus réparation pour prolonger la durée de vie des appareils à Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien financier aux réparateurs d'appareils électroniques à Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant soutien financier aux réparateurs d'appareils électroniques à toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure l'attribution d'un bonus réparation pour prolonger la durée de vie des appareils à toronto.",
        en: "Speaker 1: The debate concerning soutien financier aux réparateurs d'appareils électroniques à toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains l'attribution d'un bonus réparation pour prolonger la durée de vie des appareils à toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 30:
      return {
        opt: [
          "La baisse des accidents mortels et du niveau sonore dans les rues de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Limitation à 30 km/h de la vitesse de circulation en zone résidentielle à Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant limitation à 30 km/h de la vitesse de circulation en zone résidentielle à toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure la baisse des accidents mortels et du niveau sonore dans les rues de toronto.",
        en: "Speaker 1: The debate concerning limitation à 30 km/h de la vitesse de circulation en zone résidentielle à toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains la baisse des accidents mortels et du niveau sonore dans les rues de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 31:
      return {
        opt: [
          "L'imposition de quotas de représentation équilibrée au sein des directions d'entreprises de Toronto",
          "L'interdiction stricte de toute innovation technique dans la région de Toronto",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toronto",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de parité hommes-femmes dans les conseils d'administration à Toronto",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant obligation de parité hommes-femmes dans les conseils d'administration à toronto suscite des discussions passionnées à Toronto.\nLocutrice 2: Toutefois, la priorité demeure l'imposition de quotas de représentation équilibrée au sein des directions d'entreprises de toronto.",
        en: "Speaker 1: The debate concerning obligation de parité hommes-femmes dans les conseils d'administration à toronto sparks passionate discussion in Toronto.\nSpeaker 2: However, the main priority remains l'imposition de quotas de représentation équilibrée au sein des directions d'entreprises de toronto.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 32:
      return {
        opt: [
          "La desserte automatique des zones industrielles excentrées de la région de Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Déploiement des navettes autonomes électriques sans chauffeur à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant déploiement des navettes autonomes électriques sans chauffeur à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure la desserte automatique des zones industrielles excentrées de la région de vancouver.",
        en: "Speaker 1: The debate concerning déploiement des navettes autonomes électriques sans chauffeur à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains la desserte automatique des zones industrielles excentrées de la région de vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 33:
      return {
        opt: [
          "La prise en charge des urgences animales pour les propriétaires sous le seuil de pauvreté à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Financement des centres de soins vétérinaires publics à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant financement des centres de soins vétérinaires publics à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure la prise en charge des urgences animales pour les propriétaires sous le seuil de pauvreté à vancouver.",
        en: "Speaker 1: The debate concerning financement des centres de soins vétérinaires publics à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains la prise en charge des urgences animales pour les propriétaires sous le seuil de pauvreté à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 34:
      return {
        opt: [
          "Le gel des prix de l'énergie hivernale pour éviter la précarité énergétique à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Plafonnement des tarifs d'électricité pendant les vagues de froid à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant plafonnement des tarifs d'électricité pendant les vagues de froid à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure le gel des prix de l'énergie hivernale pour éviter la précarité énergétique à vancouver.",
        en: "Speaker 1: The debate concerning plafonnement des tarifs d'électricité pendant les vagues de froid à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains le gel des prix de l'énergie hivernale pour éviter la précarité énergétique à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 35:
      return {
        opt: [
          "L'aménagement d'axes cyclables sécurisés et séparés reliant les banlieues à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création de pistes de super-cyclisme éclairées la nuit à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant création de pistes de super-cyclisme éclairées la nuit à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure l'aménagement d'axes cyclables sécurisés et séparés reliant les banlieues à vancouver.",
        en: "Speaker 1: The debate concerning création de pistes de super-cyclisme éclairées la nuit à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains l'aménagement d'axes cyclables sécurisés et séparés reliant les banlieues à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 36:
      return {
        opt: [
          "L'offre systématique d'une alternative végétale équilibrée dans les restaurants municipaux de Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de menus végétariens quotidiens dans la restauration collective à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant obligation de menus végétariens quotidiens dans la restauration collective à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure l'offre systématique d'une alternative végétale équilibrée dans les restaurants municipaux de vancouver.",
        en: "Speaker 1: The debate concerning obligation de menus végétariens quotidiens dans la restauration collective à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains l'offre systématique d'une alternative végétale équilibrée dans les restaurants municipaux de vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 37:
      return {
        opt: [
          "La protection des milieux marins et fluviaux en amont du traitement des eaux à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des produits cosmétiques contenant des microplastiques à Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant interdiction des produits cosmétiques contenant des microplastiques à vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure la protection des milieux marins et fluviaux en amont du traitement des eaux à vancouver.",
        en: "Speaker 1: The debate concerning interdiction des produits cosmétiques contenant des microplastiques à vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains la protection des milieux marins et fluviaux en amont du traitement des eaux à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 38:
      return {
        opt: [
          "L'accompagnement des jeunes diplômés par des retraités bénévoles expérimentés à Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement du mentorat intergénérationnel dans les universités de Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant développement du mentorat intergénérationnel dans les universités de vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure l'accompagnement des jeunes diplômés par des retraités bénévoles expérimentés à vancouver.",
        en: "Speaker 1: The debate concerning développement du mentorat intergénérationnel dans les universités de vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains l'accompagnement des jeunes diplômés par des retraités bénévoles expérimentés à vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 39:
      return {
        opt: [
          "La mise à disposition d'outils numériques modernes dans les équipements publics de Vancouver",
          "L'interdiction stricte de toute innovation technique dans la région de Vancouver",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Vancouver",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Légalisation des espaces de travail partagés dans les bibliothèques de Vancouver",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant légalisation des espaces de travail partagés dans les bibliothèques de vancouver suscite des discussions passionnées à Vancouver.\nLocutrice 2: Toutefois, la priorité demeure la mise à disposition d'outils numériques modernes dans les équipements publics de vancouver.",
        en: "Speaker 1: The debate concerning légalisation des espaces de travail partagés dans les bibliothèques de vancouver sparks passionate discussion in Vancouver.\nSpeaker 2: However, the main priority remains la mise à disposition d'outils numériques modernes dans les équipements publics de vancouver.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 40:
      return {
        opt: [
          "L'installation de caméras mobiles et la hausse des amendes forfaitaires à Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Renforcement des sanctions contre les dépôts sauvages de déchets à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant renforcement des sanctions contre les dépôts sauvages de déchets à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure l'installation de caméras mobiles et la hausse des amendes forfaitaires à calgary.",
        en: "Speaker 1: The debate concerning renforcement des sanctions contre les dépôts sauvages de déchets à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains l'installation de caméras mobiles et la hausse des amendes forfaitaires à calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 41:
      return {
        opt: [
          "L'octroi de parcelles cultivables gratuites aux associations de quartier de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création de jardins partagés au pied des ensembles résidentiels à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant création de jardins partagés au pied des ensembles résidentiels à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure l'octroi de parcelles cultivables gratuites aux associations de quartier de calgary.",
        en: "Speaker 1: The debate concerning création de jardins partagés au pied des ensembles résidentiels à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains l'octroi de parcelles cultivables gratuites aux associations de quartier de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 42:
      return {
        opt: [
          "La création d'un tarif postal préférentiel pour l'envoi de livres par les commerces de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien aux librairies indépendantes face à la vente en ligne à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant soutien aux librairies indépendantes face à la vente en ligne à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure la création d'un tarif postal préférentiel pour l'envoi de livres par les commerces de calgary.",
        en: "Speaker 1: The debate concerning soutien aux librairies indépendantes face à la vente en ligne à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains la création d'un tarif postal préférentiel pour l'envoi de livres par les commerces de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 43:
      return {
        opt: [
          "Le remplacement des vieux poêles par des foyers à granules hautement performants à Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction du chauffage au bois individuel non certifié à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant interdiction du chauffage au bois individuel non certifié à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure le remplacement des vieux poêles par des foyers à granules hautement performants à calgary.",
        en: "Speaker 1: The debate concerning interdiction du chauffage au bois individuel non certifié à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains le remplacement des vieux poêles par des foyers à granules hautement performants à calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 44:
      return {
        opt: [
          "L'accès nocturne aux gymnases pour encourager la pratique sportive chez les travailleurs de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Extension des horaires d'ouverture des équipements sportifs municipaux à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant extension des horaires d'ouverture des équipements sportifs municipaux à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure l'accès nocturne aux gymnases pour encourager la pratique sportive chez les travailleurs de calgary.",
        en: "Speaker 1: The debate concerning extension des horaires d'ouverture des équipements sportifs municipaux à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains l'accès nocturne aux gymnases pour encourager la pratique sportive chez les travailleurs de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 45:
      return {
        opt: [
          "La reconnaissance comptable des heures d'engagement associatif dans le régime de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Mise en place d'un passeport bénévole valorisable pour la retraite à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant mise en place d'un passeport bénévole valorisable pour la retraite à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure la reconnaissance comptable des heures d'engagement associatif dans le régime de calgary.",
        en: "Speaker 1: The debate concerning mise en place d'un passeport bénévole valorisable pour la retraite à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains la reconnaissance comptable des heures d'engagement associatif dans le régime de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 46:
      return {
        opt: [
          "L'information transparente des acheteurs sur la consommation d'énergie des logements de Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de bilans thermiques gratuits avant toute vente immobilière à Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant obligation de bilans thermiques gratuits avant toute vente immobilière à calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure l'information transparente des acheteurs sur la consommation d'énergie des logements de calgary.",
        en: "Speaker 1: The debate concerning obligation de bilans thermiques gratuits avant toute vente immobilière à calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains l'information transparente des acheteurs sur la consommation d'énergie des logements de calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 47:
      return {
        opt: [
          "La réservation de wagons sans téléphone pour préserver la tranquillité des usagers à Calgary",
          "L'interdiction stricte de toute innovation technique dans la région de Calgary",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Calgary",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des zones de silence dans les transports publics de Calgary",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant développement des zones de silence dans les transports publics de calgary suscite des discussions passionnées à Calgary.\nLocutrice 2: Toutefois, la priorité demeure la réservation de wagons sans téléphone pour préserver la tranquillité des usagers à calgary.",
        en: "Speaker 1: The debate concerning développement des zones de silence dans les transports publics de calgary sparks passionate discussion in Calgary.\nSpeaker 2: However, the main priority remains la réservation de wagons sans téléphone pour préserver la tranquillité des usagers à calgary.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 48:
      return {
        opt: [
          "La baisse des prix de stationnement pour les résidents et la hausse pour les visiteurs à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Régulation des tarifs des parkings souterrains du centre de Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant régulation des tarifs des parkings souterrains du centre de bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure la baisse des prix de stationnement pour les résidents et la hausse pour les visiteurs à bordeaux.",
        en: "Speaker 1: The debate concerning régulation des tarifs des parkings souterrains du centre de bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains la baisse des prix de stationnement pour les résidents et la hausse pour les visiteurs à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 49:
      return {
        opt: [
          "La fourniture d'outils et de conseils techniques gratuits pour entretenir sa bicyclette à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'ateliers municipaux d'auto-réparation de vélos à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant création d'ateliers municipaux d'auto-réparation de vélos à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure la fourniture d'outils et de conseils techniques gratuits pour entretenir sa bicyclette à bordeaux.",
        en: "Speaker 1: The debate concerning création d'ateliers municipaux d'auto-réparation de vélos à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains la fourniture d'outils et de conseils techniques gratuits pour entretenir sa bicyclette à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 50:
      return {
        opt: [
          "L'extinction des panneaux lumineux nocturnes pour économiser l'électricité à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des écrans publicitaires vidéo énergivores dans les rues de Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant interdiction des écrans publicitaires vidéo énergivores dans les rues de bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'extinction des panneaux lumineux nocturnes pour économiser l'électricité à bordeaux.",
        en: "Speaker 1: The debate concerning interdiction des écrans publicitaires vidéo énergivores dans les rues de bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'extinction des panneaux lumineux nocturnes pour économiser l'électricité à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 51:
      return {
        opt: [
          "Le versement d'une allocation mensuelle conditionnée au suivi d'une formation à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Expérimentation du revenu d'autonomie pour les jeunes de 18 à 25 ans à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant expérimentation du revenu d'autonomie pour les jeunes de 18 à 25 ans à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure le versement d'une allocation mensuelle conditionnée au suivi d'une formation à bordeaux.",
        en: "Speaker 1: The debate concerning expérimentation du revenu d'autonomie pour les jeunes de 18 à 25 ans à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains le versement d'une allocation mensuelle conditionnée au suivi d'une formation à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 52:
      return {
        opt: [
          "L'installation de prises publiques sur les parkings de tous les supermarchés de Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Multiplication des bornes de recharge rapide pour véhicules électriques à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant multiplication des bornes de recharge rapide pour véhicules électriques à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'installation de prises publiques sur les parkings de tous les supermarchés de bordeaux.",
        en: "Speaker 1: The debate concerning multiplication des bornes de recharge rapide pour véhicules électriques à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'installation de prises publiques sur les parkings de tous les supermarchés de bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 53:
      return {
        opt: [
          "L'aide financière aux particuliers pour l'arrosage écologique des jardins à Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Subvention à l'achat de cuves de récupération d'eau de pluie à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant subvention à l'achat de cuves de récupération d'eau de pluie à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'aide financière aux particuliers pour l'arrosage écologique des jardins à bordeaux.",
        en: "Speaker 1: The debate concerning subvention à l'achat de cuves de récupération d'eau de pluie à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'aide financière aux particuliers pour l'arrosage écologique des jardins à bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 54:
      return {
        opt: [
          "L'établissement d'une bande sanitaire de protection sans produits chimiques autour de Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Encadrement de l'utilisation des pesticides à proximité des habitations de Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant encadrement de l'utilisation des pesticides à proximité des habitations de bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'établissement d'une bande sanitaire de protection sans produits chimiques autour de bordeaux.",
        en: "Speaker 1: The debate concerning encadrement de l'utilisation des pesticides à proximité des habitations de bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'établissement d'une bande sanitaire de protection sans produits chimiques autour de bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 55:
      return {
        opt: [
          "L'organisation d'une grande foire dédiée aux objets d'occasion sur la place centrale de Bordeaux",
          "L'interdiction stricte de toute innovation technique dans la région de Bordeaux",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Bordeaux",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'un marché mensuel du réemploi et de la seconde main à Bordeaux",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant création d'un marché mensuel du réemploi et de la seconde main à bordeaux suscite des discussions passionnées à Bordeaux.\nLocutrice 2: Toutefois, la priorité demeure l'organisation d'une grande foire dédiée aux objets d'occasion sur la place centrale de bordeaux.",
        en: "Speaker 1: The debate concerning création d'un marché mensuel du réemploi et de la seconde main à bordeaux sparks passionate discussion in Bordeaux.\nSpeaker 2: However, the main priority remains l'organisation d'une grande foire dédiée aux objets d'occasion sur la place centrale de bordeaux.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 56:
      return {
        opt: [
          "La couverture des espaces de stationnement commerciaux par des panneaux solaires à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation d'ombrières photovoltaïques sur les grand parkings de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant obligation d'ombrières photovoltaïques sur les grand parkings de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure la couverture des espaces de stationnement commerciaux par des panneaux solaires à lyon.",
        en: "Speaker 1: The debate concerning obligation d'ombrières photovoltaïques sur les grand parkings de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains la couverture des espaces de stationnement commerciaux par des panneaux solaires à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 57:
      return {
        opt: [
          "La collecte et le reconditionnement des meubles usagés par des chantiers d'insertion à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des ressourceries de quartier pour le réemploi à Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant développement des ressourceries de quartier pour le réemploi à lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure la collecte et le reconditionnement des meubles usagés par des chantiers d'insertion à lyon.",
        en: "Speaker 1: The debate concerning développement des ressourceries de quartier pour le réemploi à lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains la collecte et le reconditionnement des meubles usagés par des chantiers d'insertion à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 58:
      return {
        opt: [
          "La vente exclusivement en vrac ou en filet réutilisable sur les marchés de Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des emballages individuels pour les fruits et légumes à Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant interdiction des emballages individuels pour les fruits et légumes à lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure la vente exclusivement en vrac ou en filet réutilisable sur les marchés de lyon.",
        en: "Speaker 1: The debate concerning interdiction des emballages individuels pour les fruits et légumes à lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains la vente exclusivement en vrac ou en filet réutilisable sur les marchés de lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 59:
      return {
        opt: [
          "L'accès illimité aux expositions temporaires et permanentes pour un tarif annuel fixe à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'une carte d'abonnement universelle pour tous les musées de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant création d'une carte d'abonnement universelle pour tous les musées de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure l'accès illimité aux expositions temporaires et permanentes pour un tarif annuel fixe à lyon.",
        en: "Speaker 1: The debate concerning création d'une carte d'abonnement universelle pour tous les musées de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains l'accès illimité aux expositions temporaires et permanentes pour un tarif annuel fixe à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 60:
      return {
        opt: [
          "L'autorisation donnée aux restaurateurs d'installer des bacs de plantes aromatiques à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Légalisation des terrasses végétalisées sur le domaine public de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant légalisation des terrasses végétalisées sur le domaine public de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure l'autorisation donnée aux restaurateurs d'installer des bacs de plantes aromatiques à lyon.",
        en: "Speaker 1: The debate concerning légalisation des terrasses végétalisées sur le domaine public de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains l'autorisation donnée aux restaurateurs d'installer des bacs de plantes aromatiques à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 61:
      return {
        opt: [
          "La mise à disposition de terrains municipaux à prix coûtant pour construire solidaire à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien aux coopératives d'habitation à coût abordable à Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant soutien aux coopératives d'habitation à coût abordable à lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure la mise à disposition de terrains municipaux à prix coûtant pour construire solidaire à lyon.",
        en: "Speaker 1: The debate concerning soutien aux coopératives d'habitation à coût abordable à lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains la mise à disposition de terrains municipaux à prix coûtant pour construire solidaire à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 62:
      return {
        opt: [
          "L'équipement systématique des classes en capteurs de CO2 et purificateurs d'air à Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Renforcement du contrôle de la qualité de l'air dans les écoles de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant renforcement du contrôle de la qualité de l'air dans les écoles de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure l'équipement systématique des classes en capteurs de co2 et purificateurs d'air à lyon.",
        en: "Speaker 1: The debate concerning renforcement du contrôle de la qualité de l'air dans les écoles de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains l'équipement systématique des classes en capteurs de co2 et purificateurs d'air à lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 63:
      return {
        opt: [
          "Le transport alternatif des citoyens par bateau électrique pour désengorger les ponts de Lyon",
          "L'interdiction stricte de toute innovation technique dans la région de Lyon",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Lyon",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Mise en place de navettes fluviales régulières sur les cours d'eau de Lyon",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant mise en place de navettes fluviales régulières sur les cours d'eau de lyon suscite des discussions passionnées à Lyon.\nLocutrice 2: Toutefois, la priorité demeure le transport alternatif des citoyens par bateau électrique pour désengorger les ponts de lyon.",
        en: "Speaker 1: The debate concerning mise en place de navettes fluviales régulières sur les cours d'eau de lyon sparks passionate discussion in Lyon.\nSpeaker 2: However, the main priority remains le transport alternatif des citoyens par bateau électrique pour désengorger les ponts de lyon.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 64:
      return {
        opt: [
          "La limitation des dimanches travaillés assortie d'une majoration salariale obligatoire à Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Encadrement des ouvertures dominicales des grands magasins à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant encadrement des ouvertures dominicales des grands magasins à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure la limitation des dimanches travaillés assortie d'une majoration salariale obligatoire à toulouse.",
        en: "Speaker 1: The debate concerning encadrement des ouvertures dominicales des grands magasins à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains la limitation des dimanches travaillés assortie d'une majoration salariale obligatoire à toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 65:
      return {
        opt: [
          "La mise à disposition de véhicules en libre-service dans chaque station de métro de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'un réseau métropolitain d'auto-partage de voitures électriques à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant création d'un réseau métropolitain d'auto-partage de voitures électriques à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure la mise à disposition de véhicules en libre-service dans chaque station de métro de toulouse.",
        en: "Speaker 1: The debate concerning création d'un réseau métropolitain d'auto-partage de voitures électriques à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains la mise à disposition de véhicules en libre-service dans chaque station de métro de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 66:
      return {
        opt: [
          "Le soutien financier aux agriculteurs pour préserver la biodiversité et les sols autour de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Subvention à la plantation de haies bocagères sur les terres agricoles près de Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant subvention à la plantation de haies bocagères sur les terres agricoles près de toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure le soutien financier aux agriculteurs pour préserver la biodiversité et les sols autour de toulouse.",
        en: "Speaker 1: The debate concerning subvention à la plantation de haies bocagères sur les terres agricoles près de toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains le soutien financier aux agriculteurs pour préserver la biodiversité et les sols autour de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 67:
      return {
        opt: [
          "Le blocage automatique des numéros d'entreprises non inscrites sur la liste rouge à Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction du démarchage téléphonique commercial non sollicité à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant interdiction du démarchage téléphonique commercial non sollicité à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure le blocage automatique des numéros d'entreprises non inscrites sur la liste rouge à toulouse.",
        en: "Speaker 1: The debate concerning interdiction du démarchage téléphonique commercial non sollicité à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains le blocage automatique des numéros d'entreprises non inscrites sur la liste rouge à toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 68:
      return {
        opt: [
          "L'utilisation de la chaleur des déchets pour chauffer les logements collectifs de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Extension du réseau de chauffage urbain issu de l'incinération à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant extension du réseau de chauffage urbain issu de l'incinération à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure l'utilisation de la chaleur des déchets pour chauffer les logements collectifs de toulouse.",
        en: "Speaker 1: The debate concerning extension du réseau de chauffage urbain issu de l'incinération à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains l'utilisation de la chaleur des déchets pour chauffer les logements collectifs de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 69:
      return {
        opt: [
          "L'accès gratuit à l'eau potable fraîche pour les promeneurs et sportifs de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de bornes fontaines d'eau potable dans tous les parcs de Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant obligation de bornes fontaines d'eau potable dans tous les parcs de toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure l'accès gratuit à l'eau potable fraîche pour les promeneurs et sportifs de toulouse.",
        en: "Speaker 1: The debate concerning obligation de bornes fontaines d'eau potable dans tous les parcs de toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains l'accès gratuit à l'eau potable fraîche pour les promeneurs et sportifs de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 70:
      return {
        opt: [
          "La mise à disposition d'ateliers partagés pour les jeunes créateurs et artisans de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien à la création de tiers-lieux d'artisanat d'art à Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant soutien à la création de tiers-lieux d'artisanat d'art à toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure la mise à disposition d'ateliers partagés pour les jeunes créateurs et artisans de toulouse.",
        en: "Speaker 1: The debate concerning soutien à la création de tiers-lieux d'artisanat d'art à toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains la mise à disposition d'ateliers partagés pour les jeunes créateurs et artisans de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 71:
      return {
        opt: [
          "L'aménagement de ralentisseurs sécurisés pour protéger les enfants aux abords des classes de Toulouse",
          "L'interdiction stricte de toute innovation technique dans la région de Toulouse",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Toulouse",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Mise en place de coussins berlinois pour freiner les voitures devant les écoles de Toulouse",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant mise en place de coussins berlinois pour freiner les voitures devant les écoles de toulouse suscite des discussions passionnées à Toulouse.\nLocutrice 2: Toutefois, la priorité demeure l'aménagement de ralentisseurs sécurisés pour protéger les enfants aux abords des classes de toulouse.",
        en: "Speaker 1: The debate concerning mise en place de coussins berlinois pour freiner les voitures devant les écoles de toulouse sparks passionate discussion in Toulouse.\nSpeaker 2: However, the main priority remains l'aménagement de ralentisseurs sécurisés pour protéger les enfants aux abords des classes de toulouse.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 72:
      return {
        opt: [
          "La gratuité totale des bus et tramways pour les étudiants et demandeurs d'emploi de Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Tarification solidaire des transports en commun selon les revenus à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q26) ?",
        tr: "Locuteur 1: Le débat concernant tarification solidaire des transports en commun selon les revenus à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure la gratuité totale des bus et tramways pour les étudiants et demandeurs d'emploi de nantes.",
        en: "Speaker 1: The debate concerning tarification solidaire des transports en commun selon les revenus à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains la gratuité totale des bus et tramways pour les étudiants et demandeurs d'emploi de nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 73:
      return {
        opt: [
          "L'intervention spécialisée contre les maltraitances et l'abandon d'animaux domestiques à Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Création d'une brigade municipale de protection des animaux à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q27) ?",
        tr: "Locuteur 1: Le débat concernant création d'une brigade municipale de protection des animaux à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure l'intervention spécialisée contre les maltraitances et l'abandon d'animaux domestiques à nantes.",
        en: "Speaker 1: The debate concerning création d'une brigade municipale de protection des animaux à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains l'intervention spécialisée contre les maltraitances et l'abandon d'animaux domestiques à nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 74:
      return {
        opt: [
          "La restriction temporaire de la combustion du bois non performant pour assainir l'air de Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Interdiction des feux de cheminée ouverts en période de pic de pollution à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q28) ?",
        tr: "Locuteur 1: Le débat concernant interdiction des feux de cheminée ouverts en période de pic de pollution à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure la restriction temporaire de la combustion du bois non performant pour assainir l'air de nantes.",
        en: "Speaker 1: The debate concerning interdiction des feux de cheminée ouverts en période de pic de pollution à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains la restriction temporaire de la combustion du bois non performant pour assainir l'air de nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 75:
      return {
        opt: [
          "La surveillance et l'analyse hebdomadaire des eaux pour permettre la nage estivale à Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Développement des zones de baignade naturelle sécurisées sur la rivière à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q29) ?",
        tr: "Locuteur 1: Le débat concernant développement des zones de baignade naturelle sécurisées sur la rivière à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure la surveillance et l'analyse hebdomadaire des eaux pour permettre la nage estivale à nantes.",
        en: "Speaker 1: The debate concerning développement des zones de baignade naturelle sécurisées sur la rivière à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains la surveillance et l'analyse hebdomadaire des eaux pour permettre la nage estivale à nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 76:
      return {
        opt: [
          "Le recyclage obligatoire des vêtements usagés pour éviter le jet à la poubelle à Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Obligation de tri des déchets textiles dans les bornes d'apport volontaire à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q30) ?",
        tr: "Locuteur 1: Le débat concernant obligation de tri des déchets textiles dans les bornes d'apport volontaire à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure le recyclage obligatoire des vêtements usagés pour éviter le jet à la poubelle à nantes.",
        en: "Speaker 1: The debate concerning obligation de tri des déchets textiles dans les bornes d'apport volontaire à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains le recyclage obligatoire des vêtements usagés pour éviter le jet à la poubelle à nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 77:
      return {
        opt: [
          "Le financement accompagné des projets professionnels des personnes exclues des banques à Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Soutien au micro-crédit pour les créateurs de micro-entreprises locales à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q31) ?",
        tr: "Locuteur 1: Le débat concernant soutien au micro-crédit pour les créateurs de micro-entreprises locales à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure le financement accompagné des projets professionnels des personnes exclues des banques à nantes.",
        en: "Speaker 1: The debate concerning soutien au micro-crédit pour les créateurs de micro-entreprises locales à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains le financement accompagné des projets professionnels des personnes exclues des banques à nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 78:
      return {
        opt: [
          "L'amélioration de la propreté et du paysage urbain dans le centre historique de Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Installation de conteneurs enterrés pour supprimer les bacs roulants à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q32) ?",
        tr: "Locuteur 1: Le débat concernant installation de conteneurs enterrés pour supprimer les bacs roulants à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure l'amélioration de la propreté et du paysage urbain dans le centre historique de nantes.",
        en: "Speaker 1: The debate concerning installation de conteneurs enterrés pour supprimer les bacs roulants à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains l'amélioration de la propreté et du paysage urbain dans le centre historique de nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    case 79:
      return {
        opt: [
          "La co-construction des équipements publics avec la participation active des habitants de Nantes",
          "L'interdiction stricte de toute innovation technique dans la région de Nantes",
          "La fermeture définitive des entreprises n'utilisant pas d'énergie solaire à Nantes",
          "La hausse obligatoire de 50% des taxes municipales pour l'ensemble des habitants"
        ],
        ans: 0,
        title: "Organisation de consultations citoyennes obligatoires avant tout grand projet à Nantes",
        text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat (Q33) ?",
        tr: "Locuteur 1: Le débat concernant organisation de consultations citoyennes obligatoires avant tout grand projet à nantes suscite des discussions passionnées à Nantes.\nLocutrice 2: Toutefois, la priorité demeure la co-construction des équipements publics avec la participation active des habitants de nantes.",
        en: "Speaker 1: The debate concerning organisation de consultations citoyennes obligatoires avant tout grand projet à nantes sparks passionate discussion in Nantes.\nSpeaker 2: However, the main priority remains la co-construction des équipements publics avec la participation active des habitants de nantes.",
        hint: "⚠️ Level B2 Guidance: Focus on the main priority statement introduced after the transition word 'toutefois'.",
        level: "B2"
      };
    default:
      return {
        opt: ["Option A", "Option B", "Option C", "Option D"],
        ans: 0,
        title: "Sujet B2",
        text: "Écoutez le document et choisissez la bonne réponse.",
        tr: "Transcription B2",
        en: "B2 Transcript",
        hint: "Conseil B2",
        level: "B2"
      };
  }
}
