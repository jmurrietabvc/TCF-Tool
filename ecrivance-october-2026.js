/*
 * Registre de signalements — TCF Canada, expression écrite, octobre 2026.
 * Les documents de Tâche 3 ne sont jamais reconstitués depuis un récit de candidat.
 */
(function () {
  var octoberReports = [
    {
      id: 'tcf-ca-ee-2026-10-05-alliance-francaise-vancouver',
      month: 10,
      year: 2026,
      active: true,
      isStarter: false,
      title: 'Invitation d’anniversaire, installation à la campagne et caméras à l’école',
      tache1Title: 'Inviter un groupe d’amis à votre fête d’anniversaire',
      tache1Prompt: 'Rédigez un message pour inviter un groupe d’amis à votre fête d’anniversaire.',
      tache2Title: 'Récit : s’installer à la campagne après avoir vécu en ville',
      tache2Prompt: 'Vous venez de quitter la ville pour vous installer dans une zone rurale. Racontez votre expérience.',
      tache3Title: 'Installer des caméras dans les écoles : pour ou contre ?',
      tache3Prompt: 'À partir de deux documents aux points de vue opposés, présentez le débat sur l’installation de caméras dans les écoles, puis donnez votre opinion.',
      tache3Doc1: 'Texte du document non reproduit dans le compte rendu de candidat.',
      tache3Doc2: 'Texte du document non reproduit dans le compte rendu de candidat.',
      sourceMonthRaw: 'octobre-2026-05-alliance-francaise-vancouver',
      reportDate: '5 octobre 2026',
      reportLocation: 'Alliance Française Vancouver',
      reportConfidence: 'Élevée — récit de première main ; formulation abrégée du candidat',
      reportSource: 'Compte rendu direct d’un candidat sur Reddit TCF Canada',
      reportType: 'firsthand',
      createdAt: '2026-10-08T00:00:00.000Z'
    }
  ];

  window.ECRIVANCE_THEMES = window.ECRIVANCE_THEMES || [];
  var knownIds = new Set(window.ECRIVANCE_THEMES.map(function (theme) { return theme.id; }));
  octoberReports.forEach(function (report) {
    if (!knownIds.has(report.id)) window.ECRIVANCE_THEMES.unshift(report);
  });
}());
