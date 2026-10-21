/* Práctica guiada de EE a partir de los temas de los sujetos 1–2 del PDF del usuario. */
(() => {
  'use strict';

  const EXERCISES = {
    t1: [
      {
        context: 'Laura te pide información sobre una sala de deporte cercana. Completa una respuesta amistosa con ubicación, cursos y precio.',
        source: 'Tema adaptado del sujeto 1, Tâche 1, pág. 7 del PDF.',
        items: [
          { sentence: 'Salut Laura, je te recommande [ ... ] salle de sport près de chez nous.', answer: 'une', cue: 'un artículo indefinido', form: 'Artículo indefinido femenino singular', rule: 'Salle es femenino: une salle de sport.' },
          { sentence: 'Elle [ ... ] près du parc et propose des cours de yoga.', answer: 'se trouve', cue: 'se trouver', form: 'Présent de l’indicatif · elle', rule: 'Elle se trouve: el verbo va en tercera persona singular.' },
          { sentence: 'La première séance [ ... ] dix euros.', answer: 'coûte', cue: 'coûter', form: 'Présent de l’indicatif · elle', rule: 'La séance coûte: sujeto singular; conserva el acento circunflejo en coûte.' }
        ]
      },
      {
        context: 'Invita a tus amigos a visitar un castillo. Menciona el día, la hora de salida y el alojamiento.',
        source: 'Tema adaptado del sujeto 2, Tâche 1, pág. 9 del PDF.',
        items: [
          { sentence: 'Salut les amis, je vous [ ... ] de visiter le château samedi.', answer: 'propose', cue: 'proposer', form: 'Présent de l’indicatif · je', rule: 'Je propose de + infinitivo: je vous propose de visiter.' },
          { sentence: 'Nous [ ... ] partir à neuf heures.', answer: 'pourrions', cue: 'pouvoir', form: 'Conditionnel présent · nous', rule: 'Nous pourrions + infinitivo expresa una sugerencia cortés.' },
          { sentence: 'Je peux [ ... ] un hébergement près du château.', answer: 'réserver', cue: 'réserver', form: 'Infinitivo después de peux', rule: 'Después de je peux se usa el infinitivo: réserver.' }
        ]
      }
    ],
    t2: [
      {
        context: 'Cuenta una fiesta que recuerdas y di qué fue lo que más apreciaste.',
        source: 'Tema adaptado del sujeto 1, Tâche 2, pág. 7 del PDF.',
        items: [
          { sentence: 'Samedi dernier, j’[ ... ] à une fête de famille.', answer: 'ai participé', cue: 'participer', form: 'Passé composé · hecho terminado', rule: 'J’ai participé: un hecho concreto en el pasado. Participer à + evento.' },
          { sentence: 'L’ambiance [ ... ] chaleureuse.', answer: 'était', cue: 'être', form: 'Imparfait · descripción de fondo', rule: 'L’ambiance était: el imparfait describe cómo era el ambiente.' },
          { sentence: 'J’[ ... ] surtout les moments passés avec mes proches.', answer: 'ai apprécié', cue: 'apprécier', form: 'Passé composé · reacción terminada', rule: 'J’ai apprécié: recuerda el auxiliar ai y el acento en apprécié.' }
        ]
      },
      {
        context: 'Cuenta que asististe a un festival y explica por qué te decepcionó.',
        source: 'Tema adaptado del sujeto 2, Tâche 2, pág. 9 del PDF.',
        items: [
          { sentence: 'La semaine dernière, j’[ ... ] à un festival.', answer: 'ai assisté', cue: 'assister', form: 'Passé composé · hecho terminado', rule: 'J’ai assisté à + evento. Incluye el auxiliar ai.' },
          { sentence: 'L’organisation [ ... ] décevante.', answer: 'était', cue: 'être', form: 'Imparfait · descripción', rule: 'L’organisation était: describe el estado de la organización.' },
          { sentence: 'Je ne [ ... ] pas cet événement.', answer: 'recommande', cue: 'recommander', form: 'Présent de l’indicatif · je', rule: 'Je ne recommande pas: recomendación actual tras la experiencia.' }
        ]
      }
    ],
    t3: [
      {
        context: 'Documento 1: obligar a leer puede desmotivar. Documento 2: leer juntos aporta beneficios. Resume ambas ideas y toma postura.',
        source: 'Documentos resumidos del sujeto 1, Tâche 3, pág. 8 del PDF.',
        items: [
          { sentence: 'Le premier document [ ... ] que forcer les enfants à lire peut être contre-productif.', answer: 'souligne', cue: 'souligner', form: 'Présent de l’indicatif · le document', rule: 'Le document es singular: il souligne.' },
          { sentence: 'Le second [ ... ] en avant les bénéfices de la lecture partagée.', answer: 'met', cue: 'mettre en avant', form: 'Présent de l’indicatif · le document', rule: 'Mettre en avant: le second document met en avant.' },
          { sentence: 'À mon avis, les parents [ ... ] proposer des histoires courtes.', answer: 'devraient', cue: 'devoir', form: 'Conditionnel présent · les parents', rule: 'Les parents es plural: ils devraient.' }
        ]
      },
      {
        context: 'Documento 1: la ciudad ofrece actividades. Documento 2: el campo es tranquilo. Resume ambas ideas y toma postura.',
        source: 'Documentos resumidos del sujeto 2, Tâche 3, pág. 10 del PDF.',
        items: [
          { sentence: 'Le premier document [ ... ] les avantages de la ville.', answer: 'présente', cue: 'présenter', form: 'Présent de l’indicatif · le document', rule: 'Le document es singular: il présente.' },
          { sentence: 'Le second [ ... ] en avant le calme de la campagne.', answer: 'met', cue: 'mettre en avant', form: 'Présent de l’indicatif · le document', rule: 'Le second document met en avant: no mette.' },
          { sentence: 'À mon avis, chacun [ ... ] choisir selon ses besoins.', answer: 'devrait', cue: 'devoir', form: 'Conditionnel présent · chacun', rule: 'Chacun es singular: il devrait.' }
        ]
      }
    ]
  };

  const $ = id => document.getElementById(id);
  const pendingKey = 'tcf-ee-transfer-pending-v2';
  const pending = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(pendingKey) || '[]');
    if (Array.isArray(saved)) saved.forEach(id => pending.add(id));
  } catch {}

  let task = 't1';
  const variant = { t1: 0, t2: 0, t3: 0 };
  const position = { t1: 0, t2: 0, t3: 0 };
  let answered = false;

  function current() {
    return EXERCISES[task][variant[task]].items[position[task]];
  }

  function itemId() {
    return `${task}-${variant[task]}-${position[task]}`;
  }

  function savePending() {
    try { localStorage.setItem(pendingKey, JSON.stringify([...pending])); } catch {}
    $('transferPending').textContent = `Errores EE pendientes: ${pending.size}`;
  }

  function render(message = '') {
    const exercise = EXERCISES[task][variant[task]];
    const item = current();
    $('transferPrompt').textContent = exercise.context;
    $('transferSource').textContent = exercise.source;
    $('transferPosition').textContent = `Frase ${position[task] + 1} de ${exercise.items.length}`;
    $('transferSentence').textContent = item.sentence;
    $('transferForm').textContent = `Pista: ${item.cue} · Tiempo / forma: ${item.form}`;
    const input = $('transferAnswer');
    input.value = '';
    input.disabled = false;
    $('transferCheck').disabled = false;
    $('transferNext').disabled = true;
    answered = false;
    const feedback = $('transferFeedback');
    feedback.className = 'transfer-feedback';
    feedback.textContent = message;
    document.querySelectorAll('[data-transfer-task]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.transferTask === task));
    });
    savePending();
  }

  function check() {
    if (answered) return;
    const input = $('transferAnswer');
    const given = input.value.trim().replace(/\s+/gu, ' ').toLocaleLowerCase('fr');
    if (!given) return;
    const item = current();
    const expected = item.answer.toLocaleLowerCase('fr');
    const feedback = $('transferFeedback');
    if (given === expected) {
      pending.delete(itemId());
      savePending();
      answered = true;
      input.disabled = true;
      $('transferCheck').disabled = true;
      $('transferNext').disabled = false;
      feedback.className = 'transfer-feedback correct';
      feedback.textContent = `✅ Correcto. ${item.rule}`;
    } else {
      pending.add(itemId());
      savePending();
      const noAccent = value => value.normalize('NFD').replace(/[\u0300-\u036f]/gu, '');
      const accentHint = noAccent(given) === noAccent(expected) ? 'Te falta un acento. ' : '';
      feedback.className = 'transfer-feedback wrong';
      feedback.textContent = `❌ ${accentHint}Forma esperada: «${item.answer}». ${item.rule} Corrige el campo y comprueba otra vez.`;
    }
  }

  $('transferCheck').addEventListener('click', check);
  $('transferAnswer').addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (answered) next(); else check();
  });

  function next() {
    if (!answered) return;
    position[task]++;
    if (position[task] >= EXERCISES[task][variant[task]].items.length) {
      position[task] = 0;
      variant[task] = (variant[task] + 1) % EXERCISES[task].length;
      render('Terminaste este tema. Ahora practica otro contexto.');
    } else {
      render();
    }
    $('transferAnswer').focus();
  }

  $('transferNext').addEventListener('click', next);
  $('transferVariant').addEventListener('click', () => {
    variant[task] = (variant[task] + 1) % EXERCISES[task].length;
    position[task] = 0;
    render();
    $('transferAnswer').focus();
  });
  document.querySelectorAll('[data-transfer-task]').forEach(button => {
    button.addEventListener('click', () => {
      task = button.dataset.transferTask;
      render();
      $('transferAnswer').focus();
    });
  });

  render();
})();
