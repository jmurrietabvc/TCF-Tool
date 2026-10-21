/* Micropráctica de producción: consignas resumidas del sujeto 1 (enero 2026), páginas 7–8 del PDF del usuario. */
(() => {
  'use strict';

  const TASKS = {
    t1: {
      prompt: `Laura te escribió:
«Bonjour, je souhaite commencer le sport dans une salle. Est-ce que tu pourrais me donner des informations sur les salles de sport près de chez nous ? Merci d’avance. Bisous, Laura.»

Responde a Laura en francés. Puedes inventar una sala y datos realistas.
1. Di qué sala recomiendas y dónde está.
2. Menciona uno o dos cursos que ofrece.
3. Indica el precio y cierra el mensaje. Usa «tu» porque Laura es una amiga.`,
      source: 'Práctica corta: bastan 2–3 frases. Fuente: sujeto 1, Tâche 1, pág. 7 del PDF. Una respuesta completa de examen exige 60–120 palabras.',
      checks: [
        '¿Respondí a Laura con un tono informal coherente (tu), sin mezclarlo con vous?',
        '¿Incluí lugar, cursos y precio concretos?',
        '¿Revisé los artículos y acuerdos: une salle, des cours, les tarifs?'
      ],
      example: 'Salut Laura, la salle près du centre propose des cours de yoga et de cardio. Elle se trouve à dix minutes de chez nous et l’abonnement coûte 30 euros par mois. Si tu veux, nous pouvons y aller samedi.'
    },
    t2: {
      prompt: `Un concurso te pide contar tu fiesta más bonita. Explica cómo transcurrió y qué recuerdas de ella.

Escribe 2–3 frases en francés:
1. Di cuándo o dónde fue.
2. Cuenta un hecho que ocurrió (passé composé).
3. Describe el ambiente (imparfait) y di qué te gustó.`,
      source: 'Práctica corta: bastan 2–3 frases. Fuente: sujeto 1, Tâche 2, pág. 7 del PDF. Una respuesta completa de examen exige 120–150 palabras.',
      checks: [
        '¿Conté al menos un hecho terminado en passé composé?',
        'Si describí el ambiente, ¿usé imparfait para el contexto?',
        '¿Expliqué qué me gustó o qué recuerdo de la fiesta?',
        '¿Revisé el acuerdo: une fête agréable, l’ambiance était chaleureuse?'
      ],
      example: 'Samedi dernier, j’ai fêté mon anniversaire avec mes amis. L’ambiance était chaleureuse et nous avons préparé un repas ensemble. J’ai surtout aimé nos conversations, car nous avons enfin passé du temps ensemble.'
    },
    t3: {
      prompt: `Tema: la lectura de los niños.
Documento 1: obligarlos a leer puede quitarles el gusto por la lectura.
Documento 2: leer juntos unos minutos les ayuda a aprender palabras y disfrutar del momento.

Escribe 2–3 frases en francés:
1. Resume la idea del documento 1.
2. Resume la idea del documento 2.
3. Da tu opinión y una razón.`,
      source: 'Práctica corta: bastan 2–3 frases. Documentos resumidos del sujeto 1, Tâche 3, pág. 8 del PDF. Una respuesta completa de examen exige 120–180 palabras.',
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
  const copyButton = document.getElementById('transferCopy');
  const copyStatus = document.getElementById('transferCopyStatus');
  const checkButton = document.getElementById('transferCheck');

  function wordCount(text) {
    return text.trim() ? text.trim().split(/\s+/u).length : 0;
  }

  function updateCount() {
    count.textContent = `${wordCount(input.value)} palabras · borrador guardado en este navegador`;
    copyButton.disabled = !input.value.trim();
    checkButton.disabled = !input.value.trim();
  }

  function showTask(nextTask) {
    task = nextTask;
    const data = TASKS[task];
    prompt.textContent = data.prompt;
    source.textContent = data.source;
    input.value = drafts[task] || '';
    copyStatus.textContent = '';
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
    copyStatus.textContent = '';
    updateCount();
  });

  copyButton.addEventListener('click', async () => {
    if (!input.value.trim()) return;
    const taskName = `Tâche ${task.slice(1)}`;
    const text = `TCF Canada EE — ${taskName}\n\nConsigna de mi práctica:\n${TASKS[task].prompt}\n\nMi respuesta:\n${input.value.trim()}\n\nPor favor: corrige mi respuesta cambiando lo mínimo, comprueba si cubro la consigna y explícame mis errores prioritarios de género, concordancia, conjugación, acentos y preposiciones. No asignes una nota oficial.`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const temporary = document.createElement('textarea');
        temporary.value = text;
        temporary.style.position = 'fixed';
        temporary.style.opacity = '0';
        document.body.append(temporary);
        temporary.select();
        const copied = document.execCommand('copy');
        temporary.remove();
        if (!copied) throw new Error('No se pudo copiar');
      }
      copyStatus.textContent = 'Copiado. Vuelve a este chat de Codex y pega el texto para recibir la corrección.';
    } catch {
      copyStatus.textContent = 'No se pudo copiar automáticamente. Selecciona tu respuesta y pégala en este chat.';
      input.focus();
      input.select();
    }
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
