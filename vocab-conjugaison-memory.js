/* Banco breve de memorización: frases adaptadas de modelos del PDF proporcionado por el usuario. */
(() => {
  'use strict';

  const DATA = {
    t1: {
      intro:'T1 suele pedir un mensaje: memoriza un verbo + su complemento y dos adjetivos que puedas adaptar. Comprueba siempre si escribes a un amigo (tu) o a una institución (vous).',
      source:'Selección adaptada de los modelos de los sujetos 1, 3, 29, 54 y 73–76 del PDF (págs. 7, 11, 63, 113 y 151–157).',
      verbs:[
        ['écrire à','escribir a','Je vous écris pour demander une autre date.','À quelqu’un; a una institución usa vous.'],
        ['souhaiter','desear / solicitar','Je souhaiterais connaître le tarif.','Je souhaiterais + infinitivo: petición cortés.'],
        ['demander','pedir','Je vous demande une confirmation.','Un objeto directo: demander une confirmation.'],
        ['préciser','precisar','Pourriez-vous préciser l’horaire ?','Infinitivo después de pourriez-vous.'],
        ['confirmer','confirmar','Pourriez-vous confirmer la date ?','Fecha y destinatario claros.'],
        ['proposer','proponer','Je vous propose une autre date.','Je propose; nous proposons.'],
        ['informer','informar','Je vous informe de mon absence.','Informer quelqu’un de quelque chose.'],
        ['envoyer','enviar','Je vous envoie les documents.','J’envoie; nous envoyons.'],
        ['modifier','cambiar','Je souhaite modifier ma réservation.','Después de souhaite: infinitivo.'],
        ['réserver','reservar','Nous pourrions réserver une table.','Pourrions + infinitivo.'],
        ['convenir de','acordar','Nous pouvons convenir d’une date.','De + une → d’une.'],
        ['pouvoir','poder','Pourriez-vous me répondre ?','Pourriez-vous + infinitivo.']
      ],
      adjectives:[
        ['disponible','disponible','disponible · disponible · disponibles · disponibles','Je suis disponible vendredi.'],
        ['raisonnable','razonable','raisonnable · raisonnable · raisonnables · raisonnables','Le tarif est raisonnable.'],
        ['gratuit','gratis','gratuit · gratuite · gratuits · gratuites','La visite est gratuite.'],
        ['intéressant','interesante','intéressant · intéressante · intéressants · intéressantes','Cette offre est intéressante.'],
        ['proche','cercano','proche · proche · proches · proches','La salle est proche du centre.'],
        ['agréable','agradable','agréable · agréable · agréables · agréables','L’ambiance est agréable.'],
        ['précis','preciso','précis · précise · précis · précises','Une date précise m’aiderait.'],
        ['ouvert','abierto','ouvert · ouverte · ouverts · ouvertes','La salle est ouverte le samedi.']
      ]
    },
    t2: {
      intro:'T2 puede ser relato, reseña, mensaje o reclamación. Si cuentas una experiencia pasada, aprende los hechos en passé composé y el contexto en imparfait. Si la consigna no es un relato, adapta el registro.',
      source:'Selección adaptada de los modelos de los sujetos 1–3, 28–30, 54 y 73–76 del PDF (págs. 7–11, 61–65, 113 y 151–157).',
      verbs:[
        ['participer à','participar en','J’ai participé à un atelier.','Hecho terminado → passé composé; à + actividad.'],
        ['assister à','asistir a','J’ai assisté à une fête.','Assister à + evento; j’ai assisté.'],
        ['avoir lieu','tener lugar','La rencontre a eu lieu samedi.','Evento terminado: a eu lieu.'],
        ['se dérouler','desarrollarse','La visite s’est bien déroulée.','Con la visite, participio femenino: déroulée.'],
        ['découvrir','descubrir','J’ai découvert un nouveau quartier.','Participio: découvert.'],
        ['apprécier','apreciar / disfrutar','J’ai apprécié l’ambiance.','J’ai apprécié; acento é.'],
        ['rencontrer','conocer / encontrarse con','J’ai rencontré des bénévoles.','J’ai rencontré; no à delante de personas.'],
        ['commencer','comenzar','Nous avons commencé par une visite.','Passé composé para el primer hecho; commencer par.'],
        ['devoir','tener que','Nous avons dû changer de lieu.','Participio dû; la situación de fondo puede ir en imparfait.'],
        ['apprendre à','aprender a','J’ai appris à travailler en équipe.','J’ai appris à + infinitivo.'],
        ['recommander','recomendar','Je recommande cette activité.','Recomendación final en presente.'],
        ['être','ser / estar','L’ambiance était chaleureuse.','Descripción de fondo → imparfait: était.']
      ],
      adjectives:[
        ['chaleureux','cálido','chaleureux · chaleureuse · chaleureux · chaleureuses','L’ambiance était chaleureuse.'],
        ['convivial','acogedor','convivial · conviviale · conviviaux · conviviales','Un repas convivial.'],
        ['enrichissant','enriquecedor','enrichissant · enrichissante · enrichissants · enrichissantes','Une expérience enrichissante.'],
        ['décevant','decepcionante','décevant · décevante · décevants · décevantes','L’organisation était décevante.'],
        ['inoubliable','inolvidable','inoubliable · inoubliable · inoubliables · inoubliables','Une journée inoubliable.'],
        ['intéressant','interesante','intéressant · intéressante · intéressants · intéressantes','Des ateliers intéressants.'],
        ['agréable','agradable','agréable · agréable · agréables · agréables','Un moment agréable.'],
        ['difficile','difícil','difficile · difficile · difficiles · difficiles','Une situation difficile.']
      ]
    },
    t3: {
      intro:'T3 exige distinguir la síntesis de los documentos de tu opinión. Memoriza verbos de resumen y de efecto; usa adjetivos sencillos que puedas concordar sin dudar.',
      source:'Selección adaptada de los modelos de los sujetos 1–3, 28–30, 54 y 73–76 del PDF (págs. 8–12, 62–66, 114 y 152–158).',
      verbs:[
        ['présenter','presentar','Le document présente un avantage.','Le document = singular → présente.'],
        ['souligner','destacar','Le second document souligne une limite.','Il souligne; ils soulignent.'],
        ['mettre en avant','poner de relieve','Le premier document met en avant les bénéfices.','Met, no mette, con le document.'],
        ['défendre','defender','Le second auteur défend cette idée.','Défend con il/elle.'],
        ['permettre de','permitir','Cette mesure permet de réduire les coûts.','Permet de + infinitivo.'],
        ['favoriser','favorecer','La lecture favorise l’apprentissage.','Sujet singular: favorise.'],
        ['réduire','reducir','La ville pourrait réduire la pollution.','Pourrait + infinitivo.'],
        ['améliorer','mejorar','Ce projet pourrait améliorer les services.','Pourrait + infinitivo.'],
        ['entraîner','provocar','Cette décision peut entraîner des coûts.','Peut + infinitivo.'],
        ['nuire à','perjudicar','Une pratique excessive peut nuire à la santé.','Nuire à + nombre; à la santé.'],
        ['proposer','proponer','Le texte propose une autre solution.','Le texte = singular → propose.'],
        ['prendre en compte','tomar en cuenta','Il faut prendre en compte les besoins.','Il faut + infinitivo.']
      ],
      adjectives:[
        ['important','importante','important · importante · importants · importantes','Une différence importante.'],
        ['nécessaire','necesario','nécessaire · nécessaire · nécessaires · nécessaires','Une mesure nécessaire.'],
        ['efficace','eficaz','efficace · efficace · efficaces · efficaces','Une solution efficace.'],
        ['adapté','adecuado','adapté · adaptée · adaptés · adaptées','Une solution adaptée.'],
        ['accessible','accesible','accessible · accessible · accessibles · accessibles','Des services accessibles.'],
        ['positif','positivo','positif · positive · positifs · positives','Des effets positifs.'],
        ['équilibré','equilibrado','équilibré · équilibrée · équilibrés · équilibrées','Une approche équilibrée.'],
        ['durable','duradero','durable · durable · durables · durables','Des effets durables.']
      ]
    }
  };

  const $ = id => document.getElementById(id);
  const KEY = 'tcf-ee-memory-v1';
  let marked = {};
  try { marked = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { marked = {}; }
  let task = 't1', recall = false;
  const revealed = new Set();

  function makeEntry(item,kind,index) {
    const id = `${task}-${kind}-${index}`;
    const card = document.createElement('article'); card.className = 'memory-item';
    const top = document.createElement('div'); top.className = 'memory-item-top';
    const number = document.createElement('span'); number.className = 'memory-number'; number.textContent = String(index+1).padStart(2,'0');
    const meaning = document.createElement('strong'); meaning.textContent = item[1];
    top.append(number,meaning); card.append(top);
    const answer = document.createElement('div'); answer.className = 'memory-answer';
    const term = document.createElement('b'); term.textContent = item[0]; answer.append(term);
    if (kind === 'adjectives') { const forms = document.createElement('small'); forms.textContent = `masc. · fem. · masc. pl. · fem. pl.: ${item[2]}`; answer.append(forms); }
    const example = document.createElement('p'); example.textContent = item[kind === 'verbs' ? 2 : 3]; answer.append(example);
    if (kind === 'verbs') { const note = document.createElement('small'); note.textContent = item[3]; answer.append(note); }
    answer.hidden = recall && !revealed.has(id); card.append(answer);
    if (recall) {
      const show = document.createElement('button'); show.type = 'button'; show.className = 'memory-reveal';
      show.textContent = answer.hidden ? 'Mostrar francés' : 'Ocultar francés';
      show.setAttribute('aria-expanded',String(!answer.hidden));
      show.addEventListener('click',()=>{answer.hidden=!answer.hidden;show.textContent=answer.hidden?'Mostrar francés':'Ocultar francés';show.setAttribute('aria-expanded',String(!answer.hidden));if(answer.hidden)revealed.delete(id);else revealed.add(id);});
      card.append(show);
    }
    const label = document.createElement('label'); label.className = 'memory-mark';
    const box = document.createElement('input'); box.type='checkbox'; box.checked=!!marked[id];
    box.addEventListener('change',()=>{marked[id]=box.checked;try{localStorage.setItem(KEY,JSON.stringify(marked));}catch{}updateCount();});
    label.append(box,document.createTextNode(' Lo recordé sin mirar')); card.append(label);
    return card;
  }
  function updateCount() {
    const ids = [...DATA[task].verbs.map((_,i)=>`${task}-verbs-${i}`),...DATA[task].adjectives.map((_,i)=>`${task}-adjectives-${i}`)];
    $('memory-count').textContent = `${ids.filter(id=>marked[id]).length}/${ids.length} marcadas`;
  }
  function render() {
    const data=DATA[task]; $('memory-intro').textContent=data.intro; $('memory-source').textContent=data.source;
    for (const kind of ['verbs','adjectives']) {
      const list=$(`memory-${kind}`); list.replaceChildren();
      data[kind].forEach((item,index)=>list.append(makeEntry(item,kind,index)));
    }
    document.querySelectorAll('[data-task]').forEach(button=>{const active=button.dataset.task===task;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    $('memory-toggle').textContent=recall?'Mostrar lista completa':'Ocultar francés para recordar';
    $('memory-toggle').setAttribute('aria-pressed',String(recall));
    updateCount();
  }
  document.querySelectorAll('[data-task]').forEach(button=>button.addEventListener('click',()=>{task=button.dataset.task;revealed.clear();render();}));
  $('memory-toggle').addEventListener('click',()=>{recall=!recall;revealed.clear();render();});
  const drillCats={pastChoice:'past_narrative',demo:'demonstratif',agree:'accords',subject:'indicatif_pluriel',relative:'relatifs'};
  document.querySelectorAll('[data-drill]').forEach(button=>button.addEventListener('click',()=>{
    const category=drillCats[button.dataset.drill];
    if (!category || typeof window.onCategoryChange !== 'function') return;
    window.showPracticePanel?.('flashPanel');
    window.onCategoryChange(category);
    document.querySelector('.flashcard')?.scrollIntoView({behavior:'smooth',block:'start'});
  }));
  render();
})();
