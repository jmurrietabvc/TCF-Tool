/*
 * Registre de signalements — TCF Canada, expression écrite, septembre 2026.
 *
 * Les entrées sont volontairement séparées de la banque historique pour pouvoir
 * les vérifier, les enrichir ou les retirer sans modifier les contenus existants.
 * Une même combinaison ne doit être ajoutée qu'une seule fois : `id` est la clé
 * stable de déduplication. Les documents de Tâche 3 ne sont jamais reconstitués
 * à partir d'un résumé de candidat.
 */
(function () {
  var septemberReports = [
    {
      id: 'tcf-ca-ee-2026-09-07-concordia-montreal',
      month: 9,
      year: 2026,
      active: true,
      isStarter: false,
      title: 'Colocation, spectacle de comédie et publicité destinée aux enfants',
      tache1Title: 'Recherche d’un colocataire pour un grand appartement',
      tache1Prompt: 'Vous habitez dans un grand appartement et vous cherchez un colocataire. Décrivez le type de colocation proposé ainsi que les caractéristiques de l’appartement.',
      tache2Title: 'Article de blog : spectacle d’une troupe de comédie',
      tache2Prompt: 'Une troupe de comédie est arrivée dans votre ville et vous avez assisté à l’un de ses spectacles. Rédigez un article de blog pour raconter et décrire votre expérience.',
      tache3Title: 'L’influence de la publicité sur les enfants : pour ou contre ?',
      tache3Prompt: 'À partir de deux documents aux points de vue opposés, présentez le débat sur l’influence de la publicité sur les enfants, puis donnez votre opinion.',
      tache3Doc1: 'Texte du document non reproduit dans le compte rendu de candidat.',
      tache3Doc2: 'Texte du document non reproduit dans le compte rendu de candidat.',
      sourceMonthRaw: 'septembre-2026-07-concordia-montreal',
      reportDate: '7 septembre 2026',
      reportLocation: 'Concordia, Montréal',
      reportConfidence: 'Élevée — récit de première main',
      reportSource: 'Fil communautaire Reddit TCF Canada ; candidat ayant passé l’examen',
      reportType: 'firsthand',
      createdAt: '2026-09-09T00:00:00.000Z'
    },
    {
      id: 'tcf-ca-ee-2026-09-08-af-ottawa',
      month: 9,
      year: 2026,
      active: true,
      isStarter: false,
      title: 'Voyage, cours sportif et livraison de nourriture',
      tache1Title: 'Conseiller une ville à visiter dans votre pays',
      tache1Prompt: 'Votre ami vient passer des vacances dans votre pays. Recommandez-lui une ville à visiter et des activités à y faire.',
      tache2Title: 'Article de blog : cours dans un centre sportif',
      tache2Prompt: 'Rédigez un article de blog sur votre expérience après avoir suivi un cours dans un centre sportif.',
      tache3Title: 'La livraison de nourriture : bonne ou mauvaise chose ?',
      tache3Prompt: 'À partir de deux documents aux points de vue opposés, présentez le débat sur la livraison de nourriture, puis donnez votre opinion.',
      tache3Doc1: 'Texte du document non reproduit dans le compte rendu de candidat.',
      tache3Doc2: 'Texte du document non reproduit dans le compte rendu de candidat.',
      sourceMonthRaw: 'septembre-2026-08-alliance-francaise-ottawa',
      reportDate: '8 septembre 2026',
      reportLocation: 'Alliance Française Ottawa',
      reportConfidence: 'Élevée — récit de première main',
      reportSource: 'Fil communautaire Reddit TCF Canada ; candidat ayant passé l’examen',
      reportType: 'firsthand',
      createdAt: '2026-09-09T00:00:00.000Z'
    }
  ];

  window.ECRIVANCE_THEMES = window.ECRIVANCE_THEMES || [];
  var knownIds = new Set(window.ECRIVANCE_THEMES.map(function (theme) { return theme.id; }));
  septemberReports.forEach(function (report) {
    if (!knownIds.has(report.id)) window.ECRIVANCE_THEMES.unshift(report);
  });
}());
