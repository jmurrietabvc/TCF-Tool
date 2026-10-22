/* Rondas de gramática para EE: formas verificables y decisión de tiempos en contexto. */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const adjectives = [
    { base: 'gratuit', forms: ['gratuit', 'gratuite', 'gratuits', 'gratuites'], nouns: ['un cours', 'une visite', 'des cours', 'des visites'] },
    { base: 'intéressant', forms: ['intéressant', 'intéressante', 'intéressants', 'intéressantes'], nouns: ['un atelier', 'une offre', 'des ateliers', 'des offres'] },
    { base: 'précis', forms: ['précis', 'précise', 'précis', 'précises'], nouns: ['un horaire', 'une date', 'des horaires', 'des dates'] },
    { base: 'ouvert', forms: ['ouvert', 'ouverte', 'ouverts', 'ouvertes'], nouns: ['un centre', 'une salle', 'des centres', 'des salles'] },
    { base: 'chaleureux', forms: ['chaleureux', 'chaleureuse', 'chaleureux', 'chaleureuses'], nouns: ['un accueil', 'une ambiance', 'des échanges', 'des ambiances'] },
    { base: 'convivial', forms: ['convivial', 'conviviale', 'conviviaux', 'conviviales'], nouns: ['un repas', 'une fête', 'des repas', 'des fêtes'] },
    { base: 'enrichissant', forms: ['enrichissant', 'enrichissante', 'enrichissants', 'enrichissantes'], nouns: ['un atelier', 'une expérience', 'des ateliers', 'des expériences'] },
    { base: 'décevant', forms: ['décevant', 'décevante', 'décevants', 'décevantes'], nouns: ['un événement', 'une visite', 'des événements', 'des visites'] },
    { base: 'important', forms: ['important', 'importante', 'importants', 'importantes'], nouns: ['un problème', 'une décision', 'des problèmes', 'des décisions'] },
    { base: 'adapté', forms: ['adapté', 'adaptée', 'adaptés', 'adaptées'], nouns: ['un programme', 'une solution', 'des programmes', 'des solutions'] },
    { base: 'positif', forms: ['positif', 'positive', 'positifs', 'positives'], nouns: ['un effet', 'une conséquence', 'des effets', 'des conséquences'] },
    { base: 'équilibré', forms: ['équilibré', 'équilibrée', 'équilibrés', 'équilibrées'], nouns: ['un choix', 'une approche', 'des choix', 'des approches'] },
    { base: 'nécessaire', forms: ['nécessaire', 'nécessaire', 'nécessaires', 'nécessaires'], nouns: ['un changement', 'une mesure', 'des changements', 'des mesures'] },
    { base: 'efficace', forms: ['efficace', 'efficace', 'efficaces', 'efficaces'], nouns: ['un moyen', 'une méthode', 'des moyens', 'des méthodes'] },
    { base: 'agréable', forms: ['agréable', 'agréable', 'agréables', 'agréables'], nouns: ['un séjour', 'une journée', 'des séjours', 'des journées'] },
    { base: 'accessible', forms: ['accessible', 'accessible', 'accessibles', 'accessibles'], nouns: ['un service', 'une activité', 'des services', 'des activités'] }
  ];

  const labels = ['masculino singular', 'femenino singular', 'masculino plural', 'femenino plural'];
  const adjectiveCards = adjectives.flatMap((entry, adjectiveIndex) => entry.forms.map((answer, formIndex) => ({
    id: `adj-${adjectiveIndex}-${formIndex}`,
    formIndex,
    prompt: `${entry.nouns[formIndex]} [ ... ]`,
    hint: `Adjetivo base: ${entry.base} · Forma pedida: ${labels[formIndex]}. Escribe solo el adjetivo.`,
    answer,
    rule: `${entry.nouns[formIndex]} ${answer}: el adjetivo concuerda con el sustantivo (${labels[formIndex]}).`
  })));

  const participleCards = [
    ['J’ai [ ... ] à un atelier. (participer)', 'participé', 'Con avoir y sin objeto directo anterior: participé.'],
    ['J’ai [ ... ] l’ambiance. (apprécier)', 'apprécié', 'Con avoir, el objeto l’ambiance está después: apprécié no concuerda.'],
    ['Nous avons [ ... ] un problème. (rencontrer)', 'rencontré', 'Con avoir y objeto posterior: rencontré.'],
    ['Ils ont [ ... ] changer de salle. (devoir)', 'dû', 'El participio irregular de devoir es dû.'],
    ['J’ai [ ... ] une lettre. (écrire)', 'écrit', 'El objeto une lettre está después de avoir: écrit.'],
    ['La lettre que j’ai [ ... ] était courte. (écrire)', 'écrite', 'La lettre es objeto directo anterior y femenino: écrite.'],
    ['Les lettres que j’ai [ ... ] étaient courtes. (écrire)', 'écrites', 'Les lettres es objeto directo anterior y femenino plural: écrites.'],
    ['La décision que j’ai [ ... ] était difficile. (prendre)', 'prise', 'La décision es objeto directo anterior y femenino: prise.'],
    ['Les décisions que j’ai [ ... ] étaient difficiles. (prendre)', 'prises', 'Les décisions es objeto directo anterior y femenino plural: prises.'],
    ['Elle est [ ... ] à neuf heures. (arriver)', 'arrivée', 'Con être, el participio concuerda con elle: arrivée.'],
    ['Ils sont [ ... ] à neuf heures. (arriver)', 'arrivés', 'Con être, el participio concuerda con ils: arrivés.'],
    ['Elles sont [ ... ] à neuf heures. (arriver)', 'arrivées', 'Con être, el participio concuerda con elles: arrivées.'],
    ['La visite s’est bien [ ... ]. (se dérouler)', 'déroulée', 'Verbo pronominal: la visita es femenina singular, déroulée.'],
    ['Les moyens qu’ils ont [ ... ] en place sont utiles. (mettre)', 'mis', 'Mettre tiene participio mis; el masculino plural mantiene la misma grafía.'],
    ['La méthode doit être [ ... ]. (utiliser)', 'utilisée', 'Voz pasiva: utilisée concuerda con la méthode. No es passé composé.'],
    ['Les méthodes doivent être [ ... ]. (utiliser)', 'utilisées', 'Voz pasiva: utilisées concuerda con les méthodes, femenino plural.']
  ].map(([prompt, answer, rule], index) => ({
    id: `pp-${index}`, prompt,
    hint: 'Escribe solo el participio pasado que falta, sin el auxiliar. El verbo está entre paréntesis.',
    answer, rule
  }));

  const pastCards = [
    ['L’ambiance [ ... ] chaleureuse pendant toute la fête. (être)', 'imp', 'L’ambiance était chaleureuse.', 'Describe el ambiente de fondo.'],
    ['Samedi, j’[ ... ] à un atelier. (participer)', 'pc', 'Samedi, j’ai participé à un atelier.', 'Cuenta una participación terminada.'],
    ['Il y [ ... ] beaucoup de participants dans la salle. (avoir)', 'imp', 'Il y avait beaucoup de participants dans la salle.', 'Describe el escenario.'],
    ['L’activité [ ... ] à neuf heures. (commencer)', 'pc', 'L’activité a commencé à neuf heures.', 'Marca el inicio de un hecho.'],
    ['Avant, nous nous [ ... ] chaque vendredi. (se réunir)', 'imp', 'Avant, nous nous réunissions chaque vendredi.', 'Describe una costumbre repetida en el pasado.'],
    ['Vendredi dernier, nous nous [ ... ] pour préparer la fête. (se réunir)', 'pc', 'Vendredi dernier, nous nous sommes réunis pour préparer la fête.', 'Cuenta una reunión concreta; el ejemplo usa un grupo masculino o mixto.'],
    ['Je [ ... ] avec les bénévoles quand le directeur est arrivé. (discuter)', 'imp', 'Je discutais avec les bénévoles quand le directeur est arrivé.', 'La conversación estaba en curso cuando ocurrió otro hecho.'],
    ['Je discutais avec les bénévoles quand le directeur [ ... ]. (arriver)', 'pc', 'Je discutais avec les bénévoles quand le directeur est arrivé.', 'La llegada interrumpe la acción de fondo.'],
    ['Au début, la tâche [ ... ] difficile. (sembler)', 'imp', 'Au début, la tâche semblait difficile.', 'Describe una impresión de ese momento.'],
    ['Ensuite, nous [ ... ] une solution. (trouver)', 'pc', 'Ensuite, nous avons trouvé une solution.', 'Expresa un resultado alcanzado.'],
    ['Il [ ... ] froid lorsque nous sommes arrivés. (faire)', 'imp', 'Il faisait froid lorsque nous sommes arrivés.', 'El clima es el contexto de fondo.'],
    ['Il faisait froid lorsque nous [ ... ] sur place. (arriver)', 'pc', 'Il faisait froid lorsque nous sommes arrivés sur place.', 'La llegada es un hecho terminado.']
  ].map(([prompt, answer, example, rule], index) => ({
    id: `past-${index}`, prompt,
    hint: 'Elige el tiempo para el verbo entre paréntesis. La forma conjugada se muestra después de responder.',
    answer, example, rule
  }));

  const BANK = { adjectives: adjectiveCards, participles: participleCards, past: pastCards };
  const storageKey = 'tcf-ee-grammar-errors-v1';
  const pending = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) saved.forEach(id => pending.add(id));
  } catch {}
  let mode = 'adjectives';
  let deck = [];
  let index = 0;
  let firstCorrect = 0;
  let triedCurrent = false;
  let solvedCurrent = false;
  let selectedChoice = null;

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function savePending() {
    try { localStorage.setItem(storageKey, JSON.stringify([...pending])); } catch {}
    $('grammarPending').textContent = `Errores pendientes: ${pending.size}`;
    $('grammarReviewErrors').disabled = !BANK[mode].some(item => pending.has(item.id));
  }

  function updateScore() {
    $('grammarScore').textContent = `Primera respuesta: ${firstCorrect}/${deck.length}`;
  }

  function setChoice(choice) {
    if (solvedCurrent) return;
    selectedChoice = choice;
    document.querySelectorAll('[data-grammar-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.grammarChoice === choice));
    });
  }

  function render() {
    savePending();
    updateScore();
    if (index >= deck.length) {
      $('grammarQuestion').hidden = true;
      $('grammarSummary').hidden = false;
      $('grammarSummary').textContent = `Ronda terminada: ${firstCorrect} de ${deck.length} correctas al primer intento. Usa «Otra ronda» o «Repetir errores pendientes» para seguir.`;
      $('grammarPosition').textContent = 'Ronda terminada';
      return;
    }
    $('grammarQuestion').hidden = false;
    $('grammarSummary').hidden = true;
    $('grammarPosition').textContent = `Pregunta ${index + 1} de ${deck.length}`;
    const item = deck[index];
    $('grammarPrompt').textContent = item.prompt;
    $('grammarHint').textContent = item.hint;
    const isChoice = mode === 'past';
    $('grammarAnswer').hidden = isChoice;
    $('grammarAnswerLabel').hidden = isChoice;
    $('grammarAccents').hidden = isChoice;
    $('grammarChoices').hidden = !isChoice;
    $('grammarAnswer').value = '';
    $('grammarAnswer').disabled = false;
    selectedChoice = null;
    document.querySelectorAll('[data-grammar-choice]').forEach(button => {
      button.setAttribute('aria-pressed', 'false');
      button.disabled = false;
    });
    triedCurrent = false;
    solvedCurrent = false;
    $('grammarCheck').disabled = false;
    $('grammarNext').disabled = true;
    $('grammarFeedback').textContent = '';
    $('grammarFeedback').className = 'grammar-feedback';
    document.querySelectorAll('[data-grammar-mode]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.grammarMode === mode));
    });
  }

  function startRound(errorsOnly = false) {
    const cards = BANK[mode];
    const prioritized = shuffle(cards.filter(item => pending.has(item.id)));
    const other = shuffle(cards.filter(item => !pending.has(item.id)));
    if (errorsOnly) {
      deck = prioritized.slice(0, 12);
    } else if (mode === 'adjectives') {
      // Incluye masculino/femenino y singular/plural en cada ronda normal.
      deck = prioritized.slice(0, 12);
      const remaining = other.filter(item => !deck.some(chosen => chosen.id === item.id));
      for (let formIndex = 0; formIndex < 4 && deck.length < 12; formIndex++) {
        while (deck.filter(item => item.formIndex === formIndex).length < 3 && deck.length < 12) {
          const nextIndex = remaining.findIndex(item => item.formIndex === formIndex);
          if (nextIndex < 0) break;
          deck.push(remaining.splice(nextIndex, 1)[0]);
        }
      }
      deck.push(...remaining.slice(0, 12 - deck.length));
      deck = shuffle(deck);
    } else {
      deck = [...prioritized, ...other].slice(0, 12);
    }
    index = 0;
    firstCorrect = 0;
    render();
  }

  function check() {
    if (solvedCurrent || index >= deck.length) return;
    const item = deck[index];
    const given = mode === 'past' ? selectedChoice : $('grammarAnswer').value.trim().replace(/\s+/gu, ' ').toLocaleLowerCase('fr');
    if (!given) return;
    const expected = item.answer.toLocaleLowerCase('fr');
    const feedback = $('grammarFeedback');
    const isCorrect = given === expected;
    if (isCorrect) {
      if (!triedCurrent) firstCorrect++;
      pending.delete(item.id);
      savePending();
      updateScore();
      solvedCurrent = true;
      $('grammarAnswer').disabled = true;
      document.querySelectorAll('[data-grammar-choice]').forEach(button => { button.disabled = true; });
      $('grammarCheck').disabled = true;
      $('grammarNext').disabled = false;
      feedback.className = 'grammar-feedback correct';
      feedback.textContent = mode === 'past'
        ? `✅ ${item.answer === 'pc' ? 'Passé composé' : 'Imparfait'}. ${item.rule} Forma completa: ${item.example}`
        : `✅ ${item.answer}. ${item.rule}`;
    } else {
      triedCurrent = true;
      pending.add(item.id);
      savePending();
      feedback.className = 'grammar-feedback wrong';
      if (mode === 'past') {
        feedback.textContent = `❌ Corresponde ${item.answer === 'pc' ? 'passé composé' : 'imparfait'}: ${item.rule} Elige ese tiempo para resolverla.`;
      } else {
        const withoutAccents = value => value.normalize('NFD').replace(/[\u0300-\u036f]/gu, '');
        const accentHint = withoutAccents(given) === withoutAccents(expected) ? 'Falta un acento. ' : '';
        feedback.textContent = `❌ ${accentHint}Forma esperada: «${item.answer}». ${item.rule} Corrige el campo y vuelve a comprobar.`;
      }
    }
  }

  $('grammarCheck').addEventListener('click', check);
  $('grammarNext').addEventListener('click', () => {
    if (!solvedCurrent) return;
    index++;
    render();
    if (index < deck.length && mode !== 'past') $('grammarAnswer').focus();
  });
  $('grammarAnswer').addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (solvedCurrent) $('grammarNext').click(); else check();
  });
  document.querySelectorAll('[data-grammar-accent]').forEach(button => {
    button.addEventListener('click', () => {
      if (solvedCurrent || mode === 'past') return;
      const input = $('grammarAnswer');
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      input.value = input.value.slice(0, start) + button.dataset.grammarAccent + input.value.slice(end);
      input.focus();
      input.selectionStart = input.selectionEnd = start + 1;
    });
  });
  document.querySelectorAll('[data-grammar-choice]').forEach(button => {
    button.addEventListener('click', () => setChoice(button.dataset.grammarChoice));
  });
  document.querySelectorAll('[data-grammar-mode]').forEach(button => {
    button.addEventListener('click', () => { mode = button.dataset.grammarMode; startRound(); });
  });
  $('grammarNewRound').addEventListener('click', () => startRound());
  $('grammarReviewErrors').addEventListener('click', () => startRound(true));
  startRound();
})();
