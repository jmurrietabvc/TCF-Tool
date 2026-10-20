/* Micropráctica de producción: consignas resumidas del sujeto 1 (enero 2026), páginas 7–8 del PDF del usuario. */
(() => {
  'use strict';

  const TASKS = {
    t1: {
      prompt: 'Laura te pregunta por una sala de deporte cercana. En 2–3 frases, responde como a una amiga e incluye ubicación, tipos de cursos y precio.',
      source: 'Consigna resumida: sujeto 1, Tâche 1, pág. 7 del PDF. Ejercicio corto: la tarea real exige 60–120 palabras.',
      checks: [
        '¿Respondí a Laura con un tono informal coherente (tu), sin mezclarlo con vous?',
        '¿Incluí lugar, cursos y precio concretos?',
        '¿Revisé los artículos y acuerdos: une salle, des cours, les tarifs?'
      ],
      example: 'Salut Laura, la salle près du centre propose des cours de yoga et de cardio. Elle se trouve à dix minutes de chez nous et l’abonnement coûte 30 euros par mois. Si tu veux, nous pouvons y aller samedi.'
    },
    t2: {
      prompt: 'Cuenta una fiesta que recuerdas. En 2–3 frases, indica qué ocurrió y qué fue lo que más te gustó.',
      source: 'Consigna resumida: sujeto 1, Tâche 2, pág. 7 del PDF. Ejercicio corto: la tarea real exige 120–150 palabras.',
      checks: [
        '¿Conté al menos un hecho terminado en passé composé?',
        'Si describí el ambiente, ¿usé imparfait para el contexto?',
        '¿Expliqué qué me gustó o qué recuerdo de la fiesta?',
        '¿Revisé el acuerdo: une fête agréable, l’ambiance était chaleureuse?'
      ],
      example: 'Samedi dernier, j’ai fêté mon anniversaire avec mes amis. L’ambiance était chaleureuse et nous avons préparé un repas ensemble. J’ai surtout aimé nos conversations, car nous avons enfin passé du temps ensemble.'
    },
    t3: {
      prompt: 'Sobre la lectura infantil: un documento rechaza obligar a los niños a leer; el otro destaca los beneficios de leer juntos. En 2–3 frases, presenta ambas ideas y da tu opinión.',
      source: 'Documentos resumidos: sujeto 1, Tâche 3, pág. 8 del PDF. Ejercicio corto: la tarea real exige 120–180 palabras.',
      checks: [
        '¿Distinguí la idea del primer documento de la del segundo?',
        '¿Separé mi propia opinión de la síntesis?',
        '¿Di una razón concreta para mi opinión?',
        '¿Revisé el plural y las formas: les enfants, les parents, ils peuvent?'
      ],
      example: 'Le premier document déconseille de forcer les enfants à lire, tandis que le second souligne les bénéfices d’une lecture partagée. À mon avis, les parents devraient proposer des histoires courtes sans imposer cette activité, car le plaisir aide les enfants à prendre l’habitude de lire.'
    }
  };

  const storageKey = 'tcf-ee-transfer-drafts-v1';
  let drafts = {};
  try { drafts = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { drafts = {}; }
  let task = 't1';
  const prompt = document.getElementById('transferPrompt');
  const source = document.getElementById('transferSource');
  const input = document.getElementById('transferText');
  const count = document.getElementById('transferCount');
  const review = document.getElementById('transferReview');
  const checklist = document.getElementById('transferChecklist');
  const example = document.getElementById('transferExample');
  const exampleText = document.getElementById('transferExampleText');
  const checkButton = document.getElementById('transferCheck');

  function wordCount(text) {
    return text.trim() ? text.trim().split(/\s+/u).length : 0;
  }

  function updateCount() {
    count.textContent = `${wordCount(input.value)} palabras · borrador guardado en este navegador`;
    checkButton.disabled = !input.value.trim();
  }

  function showTask(nextTask) {
    task = nextTask;
    const data = TASKS[task];
    prompt.textContent = data.prompt;
    source.textContent = data.source;
    input.value = drafts[task] || '';
    review.hidden = true;
    example.open = false;
    document.querySelectorAll('[data-transfer-task]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.transferTask === task));
    });
    updateCount();
  }

  input.addEventListener('input', () => {
    drafts[task] = input.value;
    try { localStorage.setItem(storageKey, JSON.stringify(drafts)); } catch {}
    updateCount();
  });

  checkButton.addEventListener('click', () => {
    if (!input.value.trim()) return;
    checklist.replaceChildren();
    for (const item of TASKS[task].checks) {
      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      label.append(box, document.createTextNode(item));
      checklist.append(label);
    }
    exampleText.textContent = TASKS[task].example;
    example.open = false;
    review.hidden = false;
  });

  document.querySelectorAll('[data-transfer-task]').forEach(button => {
    button.addEventListener('click', () => showTask(button.dataset.transferTask));
  });

  showTask(task);
})();
