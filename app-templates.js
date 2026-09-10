/* ============================================================
   app-templates.js — TCF EE Studio X
   Modèles & Structures de Rédaction (Cadres Écrivance)
   Contient les 10 modèles officiels TCF Écrivance :
   - Tâche 1 : Invitation, Demande, Remerciement, Excuse, Annulation
   - Tâche 2 : Article, Courriel formel, Avis / Témoignage
   - Tâche 3 : Synthèse & Opinion, Débat Pour/Contre
   ============================================================ */

const ECRIVANCE_TEMPLATES = [
  {
    id: "t1-inviter",
    tache: "1",
    intention: "Inviter à un événement",
    intentionBadge: "INVITATION",
    label: "Inviter quelqu'un",
    description: "Proposer un événement, une sortie ou une activité à un proche.",
    connecteurs: ["D'ailleurs,", "En plus,", "Si tu veux,", "À ce propos,", "Justement,"],
    leger: `Bonjour [prénom],

[Salutation + contexte / pourquoi vous écrivez]

[Invitation + détails : quoi / quand / où]

[Question sur la disponibilité]

[Clôture chaleureuse]
[Votre prénom]`,
    complet: `Bonjour [prénom],

J'espère que tu vas bien ! Je t'écris parce que [raison / occasion].

Je voudrais t'inviter à [événement ou activité] qui aura lieu le [date] à [lieu / heure]. Ce serait l'occasion idéale de [activité prévue / se retrouver].

Est-ce que tu serais disponible ? Fais-moi savoir si cette date te convient ou si tu préfères un autre moment.

J'espère vraiment que tu pourras venir !
À très vite,
[Votre prénom]`
  },
  {
    id: "t1-demander",
    tache: "1",
    intention: "Demander un service",
    intentionBadge: "DEMANDE",
    label: "Demander de l'aide",
    description: "Solliciter un service ou une aide concrète à un ami ou un voisin.",
    connecteurs: ["En fait,", "C'est pourquoi", "Si possible,", "En retour,", "D'avance merci,"],
    leger: `Bonjour [prénom],

[Salutation + contexte]

[Demande précise + explication de la situation]

[Proposition de réciprocité ou remerciement anticipé]

[Clôture + signature]`,
    complet: `Bonjour [prénom],

Comment vas-tu ? Je me permets de t'écrire parce que j'aurais un petit service à te demander.

En fait, [explication brève de la situation / du problème]. Est-ce qu'il te serait possible de [service précis demandé] le [date ou moment] ?

Si ce n'est pas possible, ne t'inquiète surtout pas, je comprendrai tout à fait. En retour, je serais ravi(e) de [proposition d'aide en échange].

Merci d'avance pour ton aide précieuse !
Amicalement,
[Votre prénom]`
  },
  {
    id: "t1-remercier",
    tache: "1",
    intention: "Remercier quelqu'un",
    intentionBadge: "REMERCIEMENT",
    label: "Exprimer sa gratitude",
    description: "Remercier un proche pour un geste, une aide ou un cadeau.",
    connecteurs: ["Grâce à toi,", "En effet,", "Particulièrement,", "Pour te remercier,", "Encore merci"],
    leger: `Bonjour [prénom],

[Remerciement direct + ce pour quoi vous remerciez]

[Impact concret de ce geste sur vous]

[Offre de réciprocité + clôture]
[Signature]`,
    complet: `Bonjour [prénom],

Je voulais absolument t'écrire pour te remercier chaleureusement pour [le cadeau / l'aide / l'invitation / le geste].

Grâce à toi, [impact positif concret ou ce que ça a changé pour vous]. C'était vraiment attentionné de ta part et ça m'a fait énormément plaisir.

La prochaine fois, c'est moi qui régale ! J'aimerais beaucoup t'inviter à [déjeuner / prendre un café] pour passer un bon moment ensemble.

Encore un grand merci et à très bientôt,
[Votre prénom]`
  },
  {
    id: "t1-excuser",
    tache: "1",
    intention: "S'excuser / expliquer un problème",
    intentionBadge: "EXCUSE",
    label: "S'excuser ou signaler un problème",
    description: "Présenter des excuses sincères et proposer une solution.",
    connecteurs: ["Malheureusement,", "C'est pourquoi", "Cependant,", "Pour cette raison,", "Malgré tout,"],
    leger: `Bonjour [prénom],

[Description du problème / situation]

[Expression des excuses + impact pour l'autre]

[Solution proposée + question]

[Clôture ouverte + signature]`,
    complet: `Bonjour [prénom],

Je t'écris pour te parler d'un problème qui vient de se produire. Malheureusement, [description du problème / situation].

Je suis vraiment désolé(e) pour [conséquence pour la personne]. Ce n'était absolument pas mon intention.

Pour arranger les choses, je te propose de [solution concrète]. Est-ce que ça te convient ?

J'espère que tu comprendras. À bientôt,
[Votre prénom]`
  },
  {
    id: "t1-annuler",
    tache: "1",
    intention: "Annuler ou reporter un rendez-vous",
    intentionBadge: "ANNULATION",
    label: "Annuler / reporter",
    description: "Prévenir un proche d'un changement de plans et proposer une alternative.",
    connecteurs: ["Malheureusement,", "C'est pourquoi", "Cependant,", "En revanche,", "D'un autre côté,"],
    leger: `Bonjour [prénom],

[Annonce de l'annulation + événement concerné]

[Raison brève + excuses]

[Proposition d'une alternative / nouvelle date]

[Clôture + signature]`,
    complet: `Bonjour [prénom],

Je t'écris parce que, malheureusement, je dois annuler / reporter notre [rendez-vous / réunion / sortie] prévu(e) le [date].

La raison est que [explication brève et honnête]. Je suis vraiment désolé(e) pour ce changement de dernière minute.

Est-ce que tu serais disponible le [nouvelle date] ou le [autre date] ? Je reste totalement flexible.

Encore toutes mes excuses. J'espère qu'on pourra se retrouver bientôt !
[Votre prénom]`
  },
  {
    id: "t2-article",
    tache: "2",
    intention: "Article de journal ou de blog",
    intentionBadge: "ARTICLE",
    label: "Article de presse / blog",
    description: "Rédiger un article informatif et bien structuré pour un journal ou blog.",
    connecteurs: ["D'abord,", "Ensuite,", "De plus,", "Cependant,", "En conclusion,", "En effet,", "Par exemple,", "Ainsi,"],
    leger: `[Titre]

[Introduction : contexte + pourquoi c'est important aujourd'hui]

[Argument 1 + exemple]

[Argument 2 + exemple]

[Conclusion + message fort ou recommandation]`,
    complet: `[Titre accrocheur]

De nos jours, [phrase d'introduction sur le sujet et son actualité]. C'est une question qui touche de nombreux Canadiens, car [contextualisation].

D'abord, [premier argument ou fait principal]. En effet, [développement + exemple ou chiffre concret].

Ensuite, [deuxième aspect ou argument]. Par exemple, [illustration concrète ou témoignage].

Cependant, [nuance, limite ou point de vue opposé si pertinent].

En conclusion, [résumé de la position principale]. Il est important que [recommandation ou réflexion finale pour le lecteur].`
  },
  {
    id: "t2-courriel",
    tache: "2",
    intention: "Courriel ou lettre formelle",
    intentionBadge: "COURRIEL FORMEL",
    label: "Courriel ou lettre officielle",
    description: "Rédiger un message formel à une organisation, une entreprise ou une institution.",
    connecteurs: ["En effet,", "C'est pourquoi", "Par conséquent,", "Je vous prie de", "Dans l'attente de", "Je reste à votre disposition"],
    leger: `Objet : [...]

Madame, Monsieur,

[Présentation + raison du contact]

[Détails de la demande / situation]

[Action souhaitée + délai]

[Formule de politesse]
[Signature]`,
    complet: `Objet : [Sujet clair et précis]

Madame, Monsieur,

Je me permets de vous contacter au sujet de [contexte / situation précise]. Je suis [votre rôle] et je souhaiterais [objectif principal du message].

En effet, [explication détaillée du problème ou de la demande]. Cette situation [impact concret].

Je vous serais reconnaissant(e) de bien vouloir [action souhaitée] dans les meilleurs délais.

Dans l'attente de votre retour,

Cordialement,
[Prénom Nom]`
  },
  {
    id: "t2-avis",
    tache: "2",
    intention: "Avis ou témoignage en ligne",
    intentionBadge: "TÉMOIGNAGE",
    label: "Avis / témoignage en ligne",
    description: "Partager une expérience personnelle sur une plateforme ou un site communautaire.",
    connecteurs: ["En effet,", "D'un autre côté,", "Par exemple,", "Personnellement,", "En résumé,", "Je dirais que"],
    leger: `[Titre résumant l'expérience]

[Contexte de votre expérience]

[Point fort ou faible principal + exemple]

[Nuance ou second point]

[Recommandation finale + conseil]`,
    complet: `[Titre : résumé de votre expérience en une phrase]

J'ai récemment [vécu / visité / essayé] [sujet de l'avis] et je voulais partager mon expérience.

Ce qui m'a le plus [impressionné / déçu / surpris], c'est [point principal]. En effet, [explication détaillée + exemple concret].

D'un autre côté, [nuance ou second point]. Personnellement, je pense que [votre opinion claire].

En résumé, je [recommanderais / ne recommanderais pas] [sujet] parce que [raison principale].`
  },
  {
    id: "t3-synthese-opinion",
    tache: "3",
    intention: "Synthèse + opinion personnelle",
    intentionBadge: "ESSAI",
    label: "Synthèse et prise de position",
    description: "Résumer les documents et défendre clairement votre point de vue.",
    connecteurs: ["Tout d'abord,", "Ensuite,", "De plus,", "En revanche,", "Cependant,", "En conclusion,", "À mon avis,", "Il me semble que", "Par conséquent,", "En effet,"],
    leger: `[Reformulation du sujet]

Partie 1 : Ce que les documents disent
[Synthèse des 2 documents — idées principales + lien entre eux]

Partie 2 : Mon opinion
[Position claire] + [Argument 1 + exemple] + [Argument 2 + exemple]

[Conclusion — réaffirmation + recommandation]`,
    complet: `[Reformulation de la question centrale sous forme d'affirmation]

Partie 1 – Ce que les documents présentent
Les documents abordent la question de [thème principal]. Le premier document met en avant [idée principale du doc 1]. Le deuxième souligne, quant à lui, [idée principale du doc 2]. Ces deux sources montrent que [lien commun ou tension entre les deux].

Partie 2 – Mon opinion
À mon avis, [votre position clairement affirmée].

Tout d'abord, [premier argument personnel] + [exemple ou explication concrète].

Ensuite, [deuxième argument] + [développement / illustration].

En conclusion, [réaffirmation de votre position]. Il me semble essentiel que [recommandation ou ouverture sur l'avenir].`
  },
  {
    id: "t3-pour-contre",
    tache: "3",
    intention: "Argumentation pour ou contre",
    intentionBadge: "DÉBAT",
    label: "Défendre une position : pour ou contre",
    description: "Prendre position sur une controverse et argumenter de façon structurée.",
    connecteurs: ["Premièrement,", "Deuxièmement,", "De surcroît,", "Bien sûr,", "Cependant,", "Néanmoins,", "Pour conclure,", "En définitive,", "Il convient de noter que"],
    leger: `[Reformulation du sujet]

Partie 1 : Les documents (résumé des 2 points de vue)
[Idée doc 1] / [Idée doc 2]

Partie 2 : Ma position
[Pour/contre + Argument 1] + [Argument 2] + [Contre-argument + réfutation]

[Conclusion ferme]`,
    complet: `[Reformulation du sujet]

Partie 1 – Ce que disent les documents
Les documents présentent différentes perspectives sur [thème]. D'un côté, [argument/fait du premier doc]. De l'autre, [argument/fait du deuxième doc].

Partie 2 – Ma position
Personnellement, je suis [pour / contre / mitigé(e)] sur cette question.

Premièrement, [argument fort + exemple ou statistique].

Deuxièmement, [argument complémentaire + illustration].

Bien sûr, certains pourraient dire que [contre-argument]. Cependant, [votre réfutation].

Pour conclure, je maintiens que [réaffirmation de votre position].`
  }
];

// ─── UI Modal for Templates ──────────────────────────────────

function openTemplatesModal() {
  let modal = document.getElementById('templatesModal');
  if (!modal) {
    createTemplatesModalHtml();
    modal = document.getElementById('templatesModal');
  }
  
  // Filter by currently active task if known
  const curTask = String(typeof currentTask !== 'undefined' ? currentTask : 1);
  renderTemplatesList(curTask);
  modal.style.display = 'flex';
}

function closeTemplatesModal() {
  const modal = document.getElementById('templatesModal');
  if (modal) modal.style.display = 'none';
}

function createTemplatesModalHtml() {
  const div = document.createElement('div');
  div.id = 'templatesModal';
  div.className = 'templates-modal-overlay';
  div.innerHTML = `
    <div class="templates-modal">
      <div class="templates-modal-header">
        <div>
          <h2>📋 Modèles & Structures de Rédaction (Écrivance)</h2>
          <p class="muted">Choisissez un cadre méthodologique adapté à votre tâche pour structurer vos écrits.</p>
        </div>
        <button class="templates-close-btn" onclick="closeTemplatesModal()">✕</button>
      </div>

      <div class="templates-task-filter">
        <button class="tpl-filter-btn active" onclick="filterTemplates('1', this)">Tâche 1 (Message)</button>
        <button class="tpl-filter-btn" onclick="filterTemplates('2', this)">Tâche 2 (Article/Courriel)</button>
        <button class="tpl-filter-btn" onclick="filterTemplates('3', this)">Tâche 3 (Argumentation)</button>
        <button class="tpl-filter-btn" onclick="filterTemplates('all', this)">Tous</button>
      </div>

      <div id="templatesListContainer" class="templates-list"></div>
    </div>
  `;
  document.body.appendChild(div);
}

function filterTemplates(tache, btn) {
  document.querySelectorAll('.tpl-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderTemplatesList(tache);
}

function renderTemplatesList(tacheFilter) {
  const container = document.getElementById('templatesListContainer');
  if (!container) return;

  const filtered = (tacheFilter === 'all') 
    ? ECRIVANCE_TEMPLATES 
    : ECRIVANCE_TEMPLATES.filter(t => t.tache === tacheFilter);

  if (!filtered.length) {
    container.innerHTML = '<p class="empty-state">Aucun modèle pour cette tâche.</p>';
    return;
  }

  container.innerHTML = filtered.map(t => `
    <div class="template-card">
      <div class="template-card-header">
        <div class="template-badges">
          <span class="tpl-task-badge">Tâche ${t.tache}</span>
          <span class="tpl-badge">${t.intentionBadge}</span>
        </div>
        <h3 class="template-title">${escapeHtml(t.label)}</h3>
        <p class="template-desc">${escapeHtml(t.description)}</p>
      </div>

      <div class="template-connectors">
        <strong>Connecteurs suggérés :</strong>
        <div class="tpl-conn-tags">
          ${t.connecteurs.map(c => `<span class="tpl-conn-tag">${escapeHtml(c)}</span>`).join('')}
        </div>
      </div>

      <div class="template-actions">
        <button class="btn btn-ghost btn-sm" onclick="previewTemplate('${t.id}', 'leger')">👁 Aperçu squelette</button>
        <button class="btn btn-ghost btn-sm" onclick="previewTemplate('${t.id}', 'complet')">👁 Aperçu complet</button>
        <button class="btn btn-sm" style="background:var(--accent);color:#fff" onclick="applyTemplate('${t.id}', 'leger')">⚡ Insérer Squelette</button>
        <button class="btn btn-primary btn-sm" onclick="applyTemplate('${t.id}', 'complet')">✨ Insérer Modèle Complet</button>
      </div>

      <div id="tpl-preview-${t.id}" class="template-preview-box" style="display:none;"></div>
    </div>
  `).join('');
}

function previewTemplate(id, mode) {
  const tpl = ECRIVANCE_TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  const box = document.getElementById('tpl-preview-' + id);
  if (!box) return;

  const content = (mode === 'leger') ? tpl.leger : tpl.complet;
  const title = (mode === 'leger') ? '🦴 Squelette / Cadre Léger' : '📜 Modèle Complet';

  if (box.style.display === 'block' && box.getAttribute('data-mode') === mode) {
    box.style.display = 'none';
    return;
  }

  box.innerHTML = `
    <div style="font-weight:700;font-size:12px;margin-bottom:6px;color:var(--accent)">${title}</div>
    <pre style="white-space:pre-wrap;font-family:inherit;font-size:12.5px;line-height:1.6;margin:0">${escapeHtml(content)}</pre>
  `;
  box.setAttribute('data-mode', mode);
  box.style.display = 'block';
}

function applyTemplate(id, mode) {
  const tpl = ECRIVANCE_TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  const editor = document.getElementById('editor');
  if (!editor) return;

  const textToInsert = (mode === 'leger') ? tpl.leger : tpl.complet;

  if (editor.value.trim().length > 0) {
    if (!confirm("Voulez-vous remplacer le texte actuel par ce modèle ?")) {
      return;
    }
  }

  editor.value = textToInsert;
  if (typeof onEditorInput === 'function') {
    onEditorInput();
  }

  closeTemplatesModal();
  editor.focus();

  // Show notification
  const msg = document.getElementById('editorFooterDoneMsg');
  if (msg) {
    msg.textContent = `📋 Modèle "${tpl.label}" inséré dans l'éditeur !`;
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 4000);
  }
}

// ── Direct Practice Loader from Écrivance Hub ────────────────
function checkEcrivanceDirectLoad() {
  if (window.location.search.includes('load_ecrivance=true')) {
    try {
      const raw = localStorage.getItem('tcf_direct_practice_combo');
      if (raw) {
        const combo = JSON.parse(raw);
        if (typeof activeMonthSlug !== 'undefined') activeMonthSlug = 'ecrivance';
        if (typeof combos !== 'undefined') combos = [combo];
        if (typeof activeCombIdx !== 'undefined') activeCombIdx = 0;
        
        let av = [1];
        if (typeof availableTasks === 'function') {
          av = availableTasks(combo);
        }
        if (typeof activeTask !== 'undefined') activeTask = av[0] || 1;

        const sEmpty = document.getElementById('sujetEmpty');
        const sCont = document.getElementById('sujetContent');
        const sBadge = document.getElementById('comboBadge');
        if (sEmpty) sEmpty.style.display = 'none';
        if (sCont) sCont.style.display = 'block';
        if (sBadge) sBadge.textContent = combo.num || 'Écrivance VIP';

        if (typeof renderSujet === 'function') renderSujet();
        if (typeof loadDraft === 'function') loadDraft();
        if (typeof updateFocusBar === 'function') updateFocusBar();
        if (typeof showView === 'function') showView('studio');

        setTimeout(() => {
          const msg = document.getElementById('editorFooterDoneMsg');
          if (msg) {
            msg.textContent = `🚀 Sujet officiel Écrivance (${combo.num}) chargé dans le Studio !`;
            msg.style.display = 'block';
            setTimeout(() => { msg.style.display = 'none'; }, 5000);
          }
        }, 500);
      }
    } catch(e) {
      console.error('Error loading Ecrivance combo:', e);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(checkEcrivanceDirectLoad, 200);
});

console.log('✅ app-templates.js loaded (10 Écrivance templates available)');
