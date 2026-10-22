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

  // Una sola corrección delimitada por frase para que la respuesta sea inequívoca.
  const proofreadingCards = [
    ['acuerdo', 'T1 · Les salles de sport [donne] aussi des cours.', 'donnent', 'Les salles es plural; el verbo termina en -ent.'],
    ['acuerdo', 'T1 · Je te recommande [un] salle près de chez toi.', 'une', 'Salle es femenino singular.'],
    ['acuerdo', 'T2 · Les activités étaient [intéressant].', 'intéressantes', 'Activités es femenino plural; el adjetivo también.'],
    ['acuerdo', 'T2 · Elle est [arrivé] à neuf heures.', 'arrivée', 'Con être, el participio concuerda con elle.'],
    ['acuerdo', 'T3 · Les deux documents [présente] des avis différents.', 'présentent', 'Les deux documents es plural; usa présentent.'],
    ['acuerdo', 'T3 · Une solution [adapté] aux besoins serait utile.', 'adaptée', 'Solution es femenino singular.'],
    ['género', 'T1 · [Ce] salle est près de chez moi.', 'Cette', 'Salle es femenino singular: cette salle.'],
    ['género', 'T1 · [Ma] amie connaît cette salle.', 'Mon', 'Ante un nombre femenino que empieza por vocal: mon amie.'],
    ['género', 'T1 · [Cet] cours commence lundi.', 'Ce', 'Cours es masculino y empieza por consonante: ce cours.'],
    ['género', 'T2 · [Ces] expérience a été enrichissante.', 'Cette', 'Expérience es singular: cette expérience.'],
    ['género', 'T3 · [Le] solution proposée est simple.', 'La', 'Solution es femenino singular: la solution.'],
    ['género', 'T3 · [Cet] mesure pourrait aider les habitants.', 'Cette', 'Mesure es femenino singular: cette mesure.'],
    ['verbo', 'T1 · Tu devras [payes] dix euros.', 'payer', 'Después de devras, el segundo verbo va en infinitivo.'],
    ['verbo', 'T1 · Cette salle [proposent] plusieurs cours.', 'propose', 'Cette salle es singular; usa propose.'],
    ['verbo', 'T2 · Nous avons [participer] à un atelier.', 'participé', 'Después de avons, usa el participio pasado.'],
    ['verbo', 'T2 · J’ai [apprécier] l’ambiance.', 'apprécié', 'Después de ai, usa el participio pasado.'],
    ['verbo', 'T3 · Il faut [amélioré] les services.', 'améliorer', 'Después de il faut, el verbo va en infinitivo.'],
    ['verbo', 'T3 · Ce projet peut [réduit] la pollution.', 'réduire', 'Después de peut, el segundo verbo va en infinitivo.'],
    ['ortografía', 'T1 · La [premiere] séance est gratuite.', 'première', 'Première lleva acento grave en la segunda e.'],
    ['ortografía', 'T1 · Peux-tu me donner une [reponse] avant lundi ?', 'réponse', 'Réponse lleva acento agudo en la primera e.'],
    ['ortografía', 'T2 · L’ambiance était très [agreable].', 'agréable', 'Agréable lleva acento agudo.'],
    ['ortografía', 'T2 · Cette [experience] m’a beaucoup appris.', 'expérience', 'Expérience lleva acento agudo en la segunda e.'],
    ['ortografía', 'T3 · Cette mesure est [necessaire].', 'nécessaire', 'Nécessaire lleva acento agudo en la primera e.'],
    ['ortografía', 'T3 · Il faut [ameliorer] les transports.', 'améliorer', 'Améliorer lleva acento agudo.'],
    ['ortografía', 'T1 · Je voudrais obtenir des [rensegnements].', 'renseignements', 'Renseignements contiene ign: rensei-gnements.'],
    ['ortografía', 'T1 · Cette salle est-elle [disponnible] samedi ?', 'disponible', 'Disponible se escribe con una sola n.'],
    ['ortografía', 'T2 · Nous avons rencontré [plusieures] personnes.', 'plusieurs', 'Plusieurs se escribe igual ante nombres masculinos y femeninos.'],
    ['ortografía', 'T3 · Il faut protéger l’[environement].', 'environnement', 'Environnement lleva dos n después de o.'],
    ['ortografía', 'T3 · Cette solution est utile [parceque elle] est simple.', 'parce qu’elle', 'Parce que se escribe separado; ante elle se elide en parce qu’elle.'],
    ['estructura', 'T1 · La salle se trouve [dans à côté de] l’entrée principale.', 'à côté de', 'À côté de indica ubicación; elimina dans.'],
    ['estructura', 'T1 · Elle propose [des autres] cours.', 'd’autres', 'Antes de autres, des se contrae en d’.'],
    ['estructura', 'T2 · J’ai participé [de] un atelier.', 'à', 'Participer se construye con à: participer à un atelier.'],
    ['estructura', 'T2 · Nous avons parlé [à] ce problème.', 'de', 'Parler de un problema: parler de ce problème.'],
    ['estructura', 'T3 · Cette décision dépend [à] plusieurs facteurs.', 'de', 'Dépendre se construye con de.'],
    ['estructura', 'T3 · Les citoyens ont besoin [à] services accessibles.', 'de', 'Avoir besoin de quelque chose.']
  ].map(([category, prompt, answer, rule], index) => ({
    id: `proof-${index}`, category, prompt,
    hint: 'Corrige solo la parte resaltada. No copies el resto de la frase.',
    answer, rule
  }));

  const BANK = { adjectives: adjectiveCards, participles: participleCards, past: pastCards, proofreading: proofreadingCards };
  const storageKey = 'tcf-ee-grammar-errors-v1';
  const pending = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) saved.forEach(id => pending.add(id));
  } catch {}
  let mode = 'proofreading';
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
    $('grammarFocus').hidden = mode !== 'proofreading';
    $('grammarCategory').textContent = mode === 'proofreading' ? item.category : '';
    const prompt = $('grammarPrompt');
    prompt.textContent = '';
    if (mode === 'proofreading') {
      const [before, wrong, after] = item.prompt.split(/\[([^\]]+)\]/u);
      const mark = document.createElement('mark');
      mark.className = 'grammar-error-fragment';
      mark.textContent = wrong;
      prompt.append(document.createTextNode(before), mark, document.createTextNode(after));
    } else {
      prompt.textContent = item.prompt;
    }
    $('grammarHint').textContent = item.hint;
    const isChoice = mode === 'past';
    $('grammarAnswerLabel').textContent = mode === 'proofreading'
      ? 'Escribe solo la parte corregida:'
      : 'Escribe solo lo que falta en [ ... ]:';
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
    } else if (mode === 'adjectives' || mode === 'proofreading') {
      // Cubre las cuatro formas o tipos de error en cada ronda normal.
      deck = prioritized.slice(0, 12);
      const remaining = other.filter(item => !deck.some(chosen => chosen.id === item.id));
      const groups = mode === 'adjectives' ? [0, 1, 2, 3] : ['género', 'acuerdo', 'verbo', 'ortografía', 'estructura'];
      const targets = mode === 'adjectives' ? [3, 3, 3, 3] : [3, 2, 3, 3, 1];
      const groupOf = item => mode === 'adjectives' ? item.formIndex : item.category;
      for (const [groupIndex, group] of groups.entries()) {
        while (deck.filter(item => groupOf(item) === group).length < targets[groupIndex] && deck.length < 12) {
          const nextIndex = remaining.findIndex(item => groupOf(item) === group);
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
    const normalize = value => value.trim().replace(/\s+/gu, ' ').replace(/[’‘ʼ]/gu, "'").toLocaleLowerCase('fr');
    const given = mode === 'past' ? selectedChoice : normalize($('grammarAnswer').value);
    if (!given) return;
    const expected = normalize(item.answer);
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
