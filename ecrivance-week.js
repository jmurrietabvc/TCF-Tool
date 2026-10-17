/* A closed seven-day study selection. Bank material is not an official forecast. */
(function () {
  'use strict';

  var writingSource = 'https://www.freetcf.com/writing?pageType=test&category=writing&paperId=';
  var october = writingSource + 'octobre-2026';
  var addedThemes = [
    {
      id: 'week-octobre-2026-comb1', sourceMonthRaw: 'octobre-2026-comb1',
      title: 'Festival, restaurant et voyage en solitaire',
      tache1Title: 'Inviter un ami à un festival musical',
      tache1Prompt: 'Vous envoyez une lettre à votre ami pour l’inviter à participer à un festival musical organisé dans votre ville. Vous lui précisez les détails essentiels (la date, le lieu, les artistes invités, etc.).',
      tache2Title: 'Votre dernière expérience au restaurant',
      tache2Prompt: 'Sur votre blog, racontez votre dernière expérience dans un restaurant (le lieu, les plats, le service, etc.). Décrivez votre expérience et expliquez ce qui vous a particulièrement plu.',
      tache3Title: 'Le voyage en solitaire',
      tache3Doc1: 'Faire un voyage seul est une expérience unique qui présente de nombreux points positifs. Tout d’abord, cela donne la possibilité de préparer son voyage comme on le souhaite et de choisir librement ses activités, sans dépendre des choix des autres. On peut alors découvrir les endroits visités à son rythme et profiter tranquillement de chaque moment. Surtout, voyager seul aide à sortir de ses habitudes et à rencontrer de nouvelles personnes, notamment des habitants et d’autres touristes, ce qui permet de découvrir de nouvelles façons de penser et de s’enrichir personnellement.',
      tache3Doc2: 'Bien que le voyage en solitaire ait de nombreux points positifs, il présente également quelques limites qu’il ne faut pas oublier. Tout d’abord, voyager seul peut provoquer un sentiment de solitude, notamment pendant les moments difficiles. Sans compagnon, il est aussi plus compliqué de faire face à certains imprévus ou problèmes. Par ailleurs, certaines activités, comme découvrir des lieux éloignés ou voyager dans des régions où les conditions sont difficiles, sont plus sécurisées en groupe. Enfin, pouvoir partager ses souvenirs et ses émotions avec ses proches constitue un avantage important du voyage accompagné.'
    },
    {
      id: 'week-octobre-2026-comb3', sourceMonthRaw: 'octobre-2026-comb3',
      title: 'Hôtel, travail à l’étranger et jeux vidéo',
      tache1Title: 'Proposer un hôtel pour vos vacances entre amis',
      tache1Prompt: 'Vous prévoyez de partir en voyage avec vos amis et vous avez trouvé un hôtel qui semble sympa. Écrivez un message pour leur fournir des informations sur cet hôtel (situation, prix, équipements, etc.) et proposez-leur de procéder à la réservation.',
      tache2Title: 'Commencer un emploi à l’étranger',
      tache2Prompt: 'Vous avez commencé un emploi à l’étranger. Vous écrivez un message à vos amis pour leur parler de cette nouvelle expérience professionnelle et leur dire ce que vous avez le plus apprécié.',
      tache3Title: 'Jeux vidéo : un loisir utile ou dangereux ?',
      tache3Doc1: 'Des recherches ont montré que certaines parties du cerveau des adultes peuvent se développer grâce aux jeux vidéo. Ainsi, jouer peut être bénéfique, car cela aide, par exemple, à renforcer l’analyse, la prise de décision et la rapidité de réaction. C’est une bonne nouvelle, puisque 83 % des joueurs sont des adultes. Toutefois, il faut rester vigilant, car certains jeux vidéo n’apportent pas ces effets positifs sur le cerveau.',
      tache3Doc2: 'Durant trois ans, des chercheurs ont observé des enfants de 8 à 17 ans pour étudier les effets des jeux vidéo. Les conclusions indiquent que les enfants qui y jouent beaucoup deviennent plus violents, plus tendus et plus stressés que les autres. Ils réussissent aussi moins bien à l’école. C’est pourquoi il est conseillé aux parents de faire attention et de contrôler le temps passé devant les jeux vidéo.'
    }
  ];
  window.ECRIVANCE_THEMES = window.ECRIVANCE_THEMES || [];
  addedThemes.forEach(function (theme) {
    if (!window.ECRIVANCE_THEMES.some(function (existing) { return existing.id === theme.id; })) {
      window.ECRIVANCE_THEMES.push(theme);
    }
  });

  var packs = [
    { day: 1, key: 'octobre-2026-comb1', label: 'Octubre 2026 · Combinación 1', source: october },
    { day: 2, key: 'juillet-2026-comb3', label: 'Julio 2026 · Combinación 3', source: writingSource + 'juillet-2026' },
    { day: 3, key: 'octobre-2026-comb3', label: 'Octubre 2026 · Combinación 3', source: october },
    { day: 4, key: 'avril-2026-comb8', label: 'Abril 2026 · Combinación 8', source: writingSource + 'avril-2026' },
    { day: 5, key: 'avril-2026-comb10', label: 'Abril 2026 · Combinación 10', source: writingSource + 'avril-2026' },
    { day: 6, key: 'decembre-2025-comb4', label: 'Diciembre 2025 · Combinación 4', source: writingSource + 'decembre-2025' }
  ];
  var oral = [
    { id: 'eo-1', task: 1, title: 'Présentez-vous', source: 'https://www.freetcf.com/tests/speaking', location: 'Présentation personnelle',
      prompt: 'Présentez-vous.',
      help: 'Practica hablar sobre tu situación actual, trabajo o estudios, vida en Ottawa, aprendizaje del francés, aficiones y proyectos. Responde también a preguntas de seguimiento.', time: '2 minutos · presentación y preguntas' },
    { id: 'eo-2-apartment', task: 2, title: 'Chercher un appartement au Canada', location: 'Octubre 2026 · Partie 3',
      prompt: 'Vous venez d’arriver au Canada et vous souhaitez trouver un appartement. Vous me demandez des renseignements (type, procédures, quartier, etc.).' },
    { id: 'eo-2-canada', task: 2, title: 'Préparer un séjour au Canada', location: 'Octubre 2026 · Partie 3',
      prompt: 'Je suis un(e) ami(e). Je viens de rentrer d’un séjour de deux semaines au Canada. Vous partez bientôt et vous me demandez des renseignements pratiques (prix, habitants, repas, climat, transports, etc.).' },
    { id: 'eo-2-mountain', task: 2, title: 'Se renseigner sur un voyage à la montagne', location: 'Octubre 2026 · Partie 3',
      prompt: 'Je suis un(e) ami(e). Je viens de planifier un voyage à la montagne. Vous souhaitez en savoir plus et vous me demandez des informations (hébergement, coût, activités, saison, etc.).' },
    { id: 'eo-3-abroad', task: 3, title: 'Travailler à l’étranger : sans difficultés ?', location: 'Économie · Question 213',
      prompt: 'S’installer à l’étranger pour travailler ne présente pas de difficultés. Êtes-vous d’accord ? Expliquez pourquoi.', category: 'economie' },
    { id: 'eo-3-salary', task: 3, title: 'Le même salaire pour tout le monde ?', location: 'Économie · Question 211',
      prompt: 'Dans une entreprise, tout le monde devrait avoir le même salaire. Que pensez-vous de cette affirmation ?', category: 'economie' },
    { id: 'eo-3-language', task: 3, title: 'Quelle langue parler aux enfants après une expatriation ?', location: 'Éducation · Question 276',
      prompt: 'Quand une famille s’installe à l’étranger, est-il préférable de parler aux enfants dans la langue du pays d’accueil ou dans la langue d’origine ? Pourquoi ?', category: 'education' }
  ];
  oral.forEach(function (item) {
    if (item.task === 2) {
      item.source = 'https://www.freetcf.com/speaking/tache2?pageType=test&category=speaking&paperId=tache2-octobre-2026';
      item.time = '2 min de preparación + 3 min 30 de interacción';
      item.help = 'Formula preguntas, escucha la respuesta y haz preguntas de seguimiento. Puedes practicar con otra persona en el papel indicado.';
    } else if (item.task === 3) {
      item.source = 'https://www.freetcf.com/speaking/tache3?pageType=test&category=speaking&paperId=tache3-' + item.category;
      item.time = '4 min 30 · sin preparación';
      item.help = 'Expresa tu postura, desarrolla argumentos con ejemplos y matiza tu opinión. Grábate con tu teléfono para revisar después.';
    }
  });

  var progress = readStore('ecrivance_week_progress_v1');
  var notes = readStore('ecrivance_week_oral_notes_v1');
  function readStore(key) {
    try {
      var data = JSON.parse(localStorage.getItem(key) || '{}');
      return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
    } catch (error) { return {}; }
  }
  function writeStore(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) {
      document.getElementById('weekProgress').textContent = 'No se pudo guardar: conserva una copia de tu trabajo.';
      return false;
    }
    return true;
  }
  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function sourceLink(url, text) {
    var link = element('a', 'week-source', text);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }
  function setProgress(id, checked) {
    progress[id] = checked;
    var saved = writeStore('ecrivance_week_progress_v1', progress);
    document.querySelectorAll('[data-week-done]').forEach(function (input) {
      if (input.dataset.weekDone === id) input.checked = checked;
    });
    if (saved) updateProgress();
  }
  function doneLabel(id, text) {
    var label = element('label', 'week-done');
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.weekDone = id;
    input.checked = progress[id] === true;
    input.addEventListener('change', function () { setProgress(id, input.checked); });
    label.append(input, document.createTextNode(text || 'Practicado'));
    return label;
  }
  function exerciseId(day, task) { return 'ee-' + day + '-' + task; }
  function updateProgress() {
    var ids = oral.map(function (item) { return item.id; });
    packs.forEach(function (pack) {
      [1, 2, 3].forEach(function (task) { ids.push(exerciseId(pack.day, task)); });
    });
    var completed = ids.filter(function (id) { return progress[id] === true; }).length;
    document.getElementById('weekProgress').textContent = completed + ' de ' + ids.length + ' ejercicios practicados';
  }

  function renderWriting() {
    var list = document.getElementById('weekWritingList');
    packs.forEach(function (pack) {
      pack.theme = window.ECRIVANCE_THEMES.find(function (theme) { return theme.sourceMonthRaw === pack.key; });
      var card = element('article', 'week-pack');
      card.appendChild(element('span', 'week-kicker', 'DÍA ' + pack.day + ' · EE'));
      card.appendChild(element('h2', '', pack.label));
      card.appendChild(sourceLink(pack.source, 'Consultar en Free TCF ↗'));
      if (!pack.theme) {
        card.appendChild(element('p', 'week-help', 'No se pudo cargar esta combinación. Abre la fuente para practicarla.'));
        list.appendChild(card);
        return;
      }
      var grid = element('div', 'week-task-grid');
      [1, 2, 3].forEach(function (task) {
        var item = element('div', 'week-task');
        item.appendChild(element('span', 'week-task-label', 'Tâche ' + task + ' · ' + ['60–120', '120–150', '120–180'][task - 1] + ' mots'));
        item.appendChild(element('h3', '', pack.theme['tache' + task + 'Title']));
        var link = element('a', 'btn-secondary', 'Escribir →');
        link.href = '#week/ee/' + pack.day + '/' + task;
        item.append(link, doneLabel(exerciseId(pack.day, task)));
        grid.appendChild(item);
      });
      card.appendChild(grid);
      list.appendChild(card);
    });
  }
  function renderOral() {
    var list = document.getElementById('weekOralList');
    [1, 2, 3].forEach(function (task) {
      var section = element('section', 'week-oral-group');
      section.appendChild(element('h2', '', 'Tâche ' + task + ' · ' + ['Présentation', 'Interaction', 'Point de vue'][task - 1]));
      oral.filter(function (item) { return item.task === task; }).forEach(function (item) {
        var card = element('article', 'week-oral-card');
        card.appendChild(element('h3', '', item.title));
        card.appendChild(element('p', 'week-task-label', item.time));
        var prompt = element('p', 'week-oral-prompt', item.prompt);
        prompt.lang = 'fr';
        card.appendChild(prompt);
        card.appendChild(element('p', 'week-help', item.help));
        card.appendChild(sourceLink(item.source, 'Free TCF · ' + item.location + ' ↗'));
        var details = element('details', 'week-notes');
        details.appendChild(element('summary', '', 'Mis notas y correcciones'));
        var label = element('label', '', 'Qué mejorar para la próxima práctica');
        label.htmlFor = 'week-notes-' + item.id;
        var textarea = document.createElement('textarea');
        textarea.id = label.htmlFor;
        textarea.rows = 3;
        textarea.value = typeof notes[item.id] === 'string' ? notes[item.id] : '';
        textarea.placeholder = 'Vocabulario que faltó, errores repetidos, argumentos por desarrollar…';
        textarea.addEventListener('input', function () {
          notes[item.id] = textarea.value;
          writeStore('ecrivance_week_oral_notes_v1', notes);
        });
        details.append(label, textarea);
        card.append(details, doneLabel(item.id));
        section.appendChild(card);
      });
      list.appendChild(section);
    });
  }
  window.updateWeekPracticeBar = function (day, task) {
    document.getElementById('weekPracticeBar').hidden = false;
    document.getElementById('weekPracticeLabel').textContent = 'Día ' + day + ' · EE · Tâche ' + task;
    var input = document.getElementById('weekPracticeDone');
    input.dataset.weekDone = exerciseId(day, task);
    input.checked = progress[input.dataset.weekDone] === true;
    input.onchange = function () { setProgress(input.dataset.weekDone, input.checked); };
  };
  function showCompetence(competence) {
    document.getElementById('weekEePanel').hidden = competence !== 'ee';
    document.getElementById('weekEoPanel').hidden = competence !== 'eo';
    ['ee', 'eo'].forEach(function (value) {
      var button = document.getElementById(value === 'ee' ? 'weekEeTab' : 'weekEoTab');
      button.className = value === competence ? 'btn-primary' : 'btn-secondary';
      button.setAttribute('aria-pressed', String(value === competence));
    });
  }
  function route() {
    var hash = window.location.hash;
    var match = /^#week\/ee\/([1-6])\/([1-3])$/.exec(hash);
    if (match) {
      var pack = packs[Number(match[1]) - 1];
      if (pack.theme) window.openEcrivanceWeek(pack.theme, pack.day, Number(match[2]));
      else window.switchView('week');
    } else if (hash === '#week' || hash === '#week/eo') {
      window.switchView('week');
      showCompetence(hash === '#week/eo' ? 'eo' : 'ee');
      if (hash === '#week/eo') history.replaceState(null, '', '#week/eo');
    } else if (/^#(practice|cadres|themes|settings)$/.test(hash)) {
      window.switchView(hash.substring(1));
    }
  }
  window.addEventListener('DOMContentLoaded', function () {
    renderWriting();
    renderOral();
    updateProgress();
    document.getElementById('weekEeTab').addEventListener('click', function () {
      showCompetence('ee'); history.replaceState(null, '', '#week');
    });
    document.getElementById('weekEoTab').addEventListener('click', function () {
      showCompetence('eo'); history.replaceState(null, '', '#week/eo');
    });
    window.addEventListener('hashchange', route);
    route();
  });
}());
