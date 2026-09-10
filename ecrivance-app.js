/* ============================================================
   ecrivance-app.js — Controlador de Écrivance ("Le Cahier")
   100% en Español, integración fluida de plantillas, temas e IA.
   ============================================================ */

(function() {
  'use strict';

  // ─── Estado de la Aplicación ────────────────────────────────
  var state = {
    activeView: 'practice',
    currentTask: 1,
    currentThemeIndex: 0,
    currentTheme: null,
    drafts: { 1: '', 2: '', 3: '' },
    wordRanges: {
      1: { min: 60, max: 120, time: 15 },
      2: { min: 120, max: 150, time: 20 },
      3: { min: 120, max: 180, time: 25 }
    },
    timerInterval: null,
    timerSeconds: 0,
    timerRunning: false,
    selectedCadreId: null
  };

  // ─── Inicialización ─────────────────────────────────────────
  window.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initThemesAndCadres();
    loadDrafts();
    checkApiStatus();
    renderCadresLibrary();
    renderThemesLibrary();
    switchTask(1);
    setupEventListeners();
  });

  // ─── Control de Tema Oscuro / Claro ─────────────────────────
  window.toggleThemeMode = function() {
    var html = document.documentElement;
    var current = html.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('ecrivance_theme', next); } catch (e) {}
    updateThemeBtn(next);
  };

  function initTheme() {
    var saved = 'dark';
    try { saved = localStorage.getItem('ecrivance_theme') || 'dark'; } catch (e) {}
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeBtn(saved);
  }

  function updateThemeBtn(theme) {
    var btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    if (theme === 'dark') {
      btn.innerHTML = '<span>☀️</span> Claro';
    } else {
      btn.innerHTML = '<span>🌙</span> Oscuro';
    }
  }

  function initThemesAndCadres() {
    var themes = window.ECRIVANCE_THEMES || [];
    if (themes.length > 0) {
      var starterIndex = themes.findIndex(function(t) { return t.isStarter; });
      if (starterIndex === -1) starterIndex = 0;
      state.currentThemeIndex = starterIndex;
      state.currentTheme = themes[starterIndex];
    } else {
      state.currentTheme = {
        title: 'Communication et relations amicales',
        tache1Title: 'Inviter un ami',
        tache1Prompt: "Écris un courriel à ton ami pour l'inviter à passer une journée ensemble chez toi.",
        tache2Title: 'Partager une expérience',
        tache2Prompt: "Racontez une expérience de bénévolat ou de voyage qui a changé votre vision du monde.",
        tache3Title: 'Le télétravail',
        tache3Doc1: "Le télétravail améliore la qualité de vie des employés en éliminant les trajets quotidiens.",
        tache3Doc2: "Le télétravail isole les salariés et détruit la cohésion d'équipe."
      };
    }
  }

  function loadDrafts() {
    try {
      var saved = localStorage.getItem('ecrivance_drafts');
      if (saved) {
        state.drafts = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error loading drafts', e);
    }
  }

  function saveDrafts() {
    try {
      localStorage.setItem('ecrivance_drafts', JSON.stringify(state.drafts));
    } catch (e) {}
  }

  function checkApiStatus() {
    var pill = document.getElementById('apiStatusPill');
    if (!pill) return;
    var hasKey = typeof hasGeminiApiKey === 'function' ? hasGeminiApiKey() : (localStorage.getItem('tcf_gemini_api_key') || '').length > 10;
    if (hasKey) {
      pill.className = 'api-status-pill connected';
      pill.innerHTML = '<span class="api-dot"></span> Gemini Conectado';
    } else {
      pill.className = 'api-status-pill missing';
      pill.innerHTML = '<span class="api-dot"></span> Configurar Clave API';
    }
  }

  // ─── Navegación de Vistas ───────────────────────────────────
  window.switchView = function(viewName) {
    state.activeView = viewName;
    document.querySelectorAll('.nav-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });
    document.querySelectorAll('.view-section').forEach(function(sec) {
      sec.classList.toggle('active', sec.id === 'view-' + viewName);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Cambio de Tarea (Tâche 1, 2, 3) ────────────────────────
  window.switchTask = function(taskNum) {
    var editor = document.getElementById('notebookEditor');
    if (editor) {
      state.drafts[state.currentTask] = editor.value;
      saveDrafts();
    }

    state.currentTask = taskNum;

    document.querySelectorAll('.task-tab').forEach(function(tab) {
      tab.classList.toggle('active', parseInt(tab.dataset.task, 10) === taskNum);
    });

    renderConsigne();

    if (editor) {
      editor.value = state.drafts[taskNum] || '';
      updateWordCount();
    }

    var report = document.getElementById('feedbackReportCard');
    if (report) report.style.display = 'none';

    updateRecommendedCadreBtn();
  };

  // ─── Renderizado de la Consigna / Tema Oficial ──────────────
  function renderConsigne() {
    var t = state.currentTheme;
    if (!t) return;
    var taskNum = state.currentTask;
    var range = state.wordRanges[taskNum];

    var tagEl = document.getElementById('consigneTag');
    var goalEl = document.getElementById('consigneWordGoal');
    var titleEl = document.getElementById('consigneTitle');
    var textEl = document.getElementById('consigneText');
    var t3Docs = document.getElementById('tache3DocsGrid');

    if (tagEl) {
      tagEl.textContent = (t.sourceMonthRaw ? t.sourceMonthRaw.replace(/-/g, ' ').toUpperCase() : 'TCF CANADA') + ' · TÂCHE ' + taskNum;
    }
    if (goalEl) {
      goalEl.innerHTML = '🎯 Objetivo: <strong>' + range.min + '–' + range.max + ' palabras</strong> (~' + range.time + ' min)';
    }

    if (taskNum === 1) {
      if (titleEl) titleEl.textContent = t.tache1Title || 'Message ou courriel';
      if (textEl) textEl.textContent = t.tache1Prompt || 'Rédigez un message respectant la consigne.';
      if (t3Docs) t3Docs.style.display = 'none';
    } else if (taskNum === 2) {
      if (titleEl) titleEl.textContent = t.tache2Title || "Récit d'expérience";
      if (textEl) textEl.textContent = t.tache2Prompt || 'Racontez votre expérience selon la consigne.';
      if (t3Docs) t3Docs.style.display = 'none';
    } else if (taskNum === 3) {
      if (titleEl) titleEl.textContent = t.tache3Title || 'Prise de position argumentée';
      if (textEl) textEl.textContent = 'Consigne officielle : Vous devez comparer les deux opinions suivantes et exprimer clairement votre point de vue personnel argumenté (120 à 180 mots).';
      if (t3Docs) {
        t3Docs.style.display = 'grid';
        var d1 = document.getElementById('tache3Doc1Content');
        var d2 = document.getElementById('tache3Doc2Content');
        if (d1) d1.textContent = t.tache3Doc1 || 'Document 1 non disponible.';
        if (d2) d2.textContent = t.tache3Doc2 || 'Document 2 non disponible.';
      }
    }
  }

  function updateRecommendedCadreBtn() {
    var btn = document.getElementById('btnRecommendedCadre');
    if (!btn) return;
    var taskNum = state.currentTask;
    var label = '📋 Ver Plantilla Recomendada';
    if (taskNum === 1) label = '📋 Plantillas Tâche 1 (Invitación / Demanda)';
    if (taskNum === 2) label = '📋 Plantillas Tâche 2 (Artículo / Experiencia)';
    if (taskNum === 3) label = '📋 Plantillas Tâche 3 (Síntesis y Opinión)';
    btn.innerHTML = label;
  }

  // ─── Contador de Palabras Inteligente ───────────────────────
  window.updateWordCount = function() {
    var editor = document.getElementById('notebookEditor');
    if (!editor) return;
    var text = editor.value.trim();
    var words = text ? text.split(/\s+/).filter(function(w) { return w; }).length : 0;
    state.drafts[state.currentTask] = editor.value;
    saveDrafts();

    var range = state.wordRanges[state.currentTask];
    var badge = document.getElementById('wordBadge');
    var status = document.getElementById('wordStatusText');

    if (!badge || !status) return;

    badge.textContent = words + ' / ' + range.min + '–' + range.max;

    if (words === 0) {
      badge.className = 'word-badge under';
      status.textContent = 'Comienza a escribir tu texto en francés...';
    } else if (words < range.min) {
      badge.className = 'word-badge under';
      var left = range.min - words;
      status.textContent = 'Te faltan ' + left + ' palabra' + (left > 1 ? 's' : '') + ' para el mínimo (' + range.min + ')';
    } else if (words <= range.max) {
      badge.className = 'word-badge in-range';
      status.textContent = '✨ ¡Rango ideal de palabras! Mantén este volumen.';
    } else {
      badge.className = 'word-badge over';
      var over = words - range.max;
      status.textContent = '⚠️ Te pasaste por ' + over + ' palabra' + (over > 1 ? 's' : '') + ' del máximo (' + range.max + ')';
    }
  };

  // ─── Inserción de Acentos Franceses ─────────────────────────
  window.insertAccent = function(char) {
    var editor = document.getElementById('notebookEditor');
    if (!editor) return;
    var start = editor.selectionStart;
    var end = editor.selectionEnd;
    var val = editor.value;

    if (char === '« »') {
      editor.value = val.substring(0, start) + '« ' + val.substring(start, end) + ' »' + val.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
    } else {
      editor.value = val.substring(0, start) + char + val.substring(end);
      editor.selectionStart = editor.selectionEnd = start + char.length;
    }
    editor.focus();
    updateWordCount();
  };

  // ─── Cambio Aleatorio de Tema ───────────────────────────────
  window.randomTheme = function() {
    var themes = window.ECRIVANCE_THEMES || [];
    if (themes.length === 0) return;
    var rand = Math.floor(Math.random() * themes.length);
    state.currentThemeIndex = rand;
    state.currentTheme = themes[rand];
    renderConsigne();
    showToast('🎲 Tema cambiado: ' + (state.currentTheme.title || 'Nuevo examen'));
  };

  // ─── Modal de Plantilla Rápida ──────────────────────────────
  window.openQuickCadreModal = function() {
    var modal = document.getElementById('quickCadreModal');
    var body = document.getElementById('quickCadreModalContent');
    if (!modal || !body) return;

    var cadres = window.ECRIVANCE_TEMPLATES || [];
    var filtered = cadres.filter(function(c) { return parseInt(c.tache, 10) === state.currentTask; });

    var html = '<h2 style="font-family:var(--font-display);font-size:22px;margin-bottom:6px;">📋 Plantillas Oficiales para Tâche ' + state.currentTask + '</h2>';
    html += '<p style="color:var(--ink-muted);font-size:13.5px;margin-bottom:18px;">Selecciona una plantilla para insertarla directamente en tu cuaderno con corchetes [...] listos para rellenar.</p>';

    filtered.forEach(function(c) {
      html += '<div style="background:var(--paper-card);border:1px solid var(--rule);border-radius:var(--radius-md);padding:16px;margin-bottom:14px;">';
      html += '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">';
      html += '    <span class="cadre-intent-badge">' + (c.intentionBadge || c.intention) + '</span>';
      html += '    <button class="btn-primary" style="font-size:12px;padding:5px 12px;" onclick="insertCadreIntoEditor(\'' + c.id + '\'); closeQuickCadreModal();">⚡ Insertar en Cuaderno</button>';
      html += '  </div>';
      html += '  <h3 style="font-family:var(--font-display);font-size:16px;margin-bottom:4px;">' + c.label + '</h3>';
      html += '  <p style="font-size:13px;color:var(--ink-muted);margin-bottom:10px;">' + c.description + '</p>';
      html += '  <div style="background:var(--paper);border:1px solid var(--rule-subtle);border-radius:var(--radius-sm);padding:10px;font-size:12.5px;line-height:1.5;white-space:pre-wrap;color:#2c351f;">' + escapeHtml(c.complet) + '</div>';
      if (c.conseil) {
        html += '  <div style="font-family:var(--font-hand);font-size:19px;color:#1e2715;margin-top:8px;">💡 Consejo del examinador: ' + escapeHtml(c.conseil) + '</div>';
      }
      html += '</div>';
    });

    body.innerHTML = html;
    modal.classList.add('active');
  };

  window.closeQuickCadreModal = function() {
    var modal = document.getElementById('quickCadreModal');
    if (modal) modal.classList.remove('active');
  };

  window.insertCadreIntoEditor = function(cadreId) {
    var cadres = window.ECRIVANCE_TEMPLATES || [];
    var cadre = cadres.find(function(c) { return c.id === cadreId; });
    if (!cadre) return;

    var editor = document.getElementById('notebookEditor');
    if (!editor) return;

    if (editor.value.trim().length > 10) {
      if (!confirm('¿Deseas reemplazar el texto actual en tu cuaderno con esta plantilla?')) {
        return;
      }
    }

    editor.value = cadre.complet;
    editor.focus();
    updateWordCount();
    showToast('✨ Plantilla "' + cadre.label + '" insertada. ¡Completa los corchetes [...]!');
  };

  // ─── Renderizado de Biblioteca de Cadres (Pestaña 2) ────────
  function renderCadresLibrary(filterTask) {
    var container = document.getElementById('cadresListContainer');
    if (!container) return;

    var cadres = window.ECRIVANCE_TEMPLATES || [];
    if (filterTask && filterTask !== 'all') {
      cadres = cadres.filter(function(c) { return c.tache === String(filterTask); });
    }

    var html = '';
    cadres.forEach(function(c) {
      html += '<div class="cadre-card">';
      html += '  <div class="cadre-card-header">';
      html += '    <div class="cadre-badge-group">';
      html += '      <span class="cadre-intent-badge">' + (c.intentionBadge || c.intention) + '</span>';
      html += '      <span class="cadre-task-badge">TÂCHE ' + c.tache + '</span>';
      html += '    </div>';
      html += '    <button class="btn-primary" style="font-size:12.5px;padding:6px 14px;" onclick="useCadreInPractice(\'' + c.id + '\', ' + c.tache + ')">✍️ Practicar con esta Plantilla</button>';
      html += '  </div>';
      html += '  <h2 class="cadre-name">' + c.label + '</h2>';
      html += '  <p class="cadre-desc">' + c.description + '</p>';
      html += '  <div class="cadre-parts-grid">';
      html += '    <div class="cadre-part-box">';
      html += '      <div class="cadre-part-title"><span>🧠 Estructura Mental (Memorizar)</span></div>';
      html += '      <pre class="cadre-code-pre">' + escapeHtml(c.leger) + '</pre>';
      html += '    </div>';
      html += '    <div class="cadre-part-box">';
      html += '      <div class="cadre-part-title"><span>📝 Plantilla Completa (Con huecos)</span></div>';
      html += '      <pre class="cadre-code-pre">' + escapeHtml(c.complet) + '</pre>';
      html += '    </div>';
      html += '  </div>';
      if (c.connecteurs && c.connecteurs.length > 0) {
        html += '  <div style="font-size:12px;font-weight:700;color:var(--ink-muted);margin-top:10px;">CONECTORES CLAVE PARA ESTA TAREA:</div>';
        html += '  <div class="cadre-connectors">';
        c.connecteurs.forEach(function(conn) {
          html += '    <span class="connector-chip">' + conn + '</span>';
        });
        html += '  </div>';
      }
      if (c.conseil) {
        html += '  <div class="cadre-tip-box"><strong>💡 Consejo del Examinador:</strong> ' + escapeHtml(c.conseil) + '</div>';
      }
      html += '</div>';
    });

    container.innerHTML = html;
  }

  window.filterCadres = function(taskVal, btn) {
    document.querySelectorAll('.cadres-filter-row .btn-secondary').forEach(function(b) {
      b.style.background = 'var(--paper-card)';
      b.style.borderColor = 'var(--paper-border)';
      b.style.color = 'var(--ink)';
    });
    if (btn) {
      btn.style.background = 'var(--ink)';
      btn.style.borderColor = 'var(--ink)';
      btn.style.color = 'var(--paper)';
    }
    renderCadresLibrary(taskVal);
  };

  window.useCadreInPractice = function(cadreId, taskNum) {
    switchView('practice');
    switchTask(taskNum);
    insertCadreIntoEditor(cadreId);
  };

  // ─── Renderizado de Temas / Sujets (Pestaña 3) ───────────────
  function renderThemesLibrary(query) {
    var container = document.getElementById('themesListContainer');
    if (!container) return;

    var themes = window.ECRIVANCE_THEMES || [];
    if (query) {
      var q = query.toLowerCase();
      themes = themes.filter(function(t) {
        return (t.title && t.title.toLowerCase().includes(q)) ||
               (t.tache1Title && t.tache1Title.toLowerCase().includes(q)) ||
               (t.tache2Title && t.tache2Title.toLowerCase().includes(q)) ||
               (t.tache3Title && t.tache3Title.toLowerCase().includes(q)) ||
               (t.sourceMonthRaw && t.sourceMonthRaw.toLowerCase().includes(q));
      });
    }

    var html = '';
    var displayThemes = themes.slice(0, 50);
    displayThemes.forEach(function(t) {
      var realIdx = (window.ECRIVANCE_THEMES || []).indexOf(t);
      html += '<div class="theme-card">';
      html += '  <div class="theme-info">';
      html += '    <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--ink-subtle);margin-bottom:3px;">' + (t.sourceMonthRaw ? t.sourceMonthRaw.replace(/-/g, ' ') : 'Examen') + '</div>';
      html += '    <h3>' + (t.title || "Sujet d'examen TCF") + '</h3>';
      html += '    <p><strong>T1:</strong> ' + (t.tache1Title || 'Message') + ' · <strong>T2:</strong> ' + (t.tache2Title || 'Récit') + ' · <strong>T3:</strong> ' + (t.tache3Title || 'Débat') + '</p>';
      html += '  </div>';
      html += '  <button class="btn-primary" style="white-space:nowrap;font-size:12.5px;padding:6px 14px;" onclick="selectThemeFromLibrary(' + realIdx + ')">✍️ Practicar</button>';
      html += '</div>';
    });

    if (displayThemes.length === 0) {
      html = '<div style="text-align:center;padding:40px;color:var(--ink-muted);">No se encontraron temas con esa búsqueda.</div>';
    }

    container.innerHTML = html;
  }

  window.onThemeSearchInput = function(e) {
    renderThemesLibrary(e.target.value);
  };

  window.selectThemeFromLibrary = function(index) {
    var themes = window.ECRIVANCE_THEMES || [];
    if (!themes[index]) return;
    state.currentThemeIndex = index;
    state.currentTheme = themes[index];
    switchView('practice');
    renderConsigne();
    showToast('✨ Tema cargado en el cuaderno: ' + (state.currentTheme.title || ''));
  };

  // ─── Evaluación con Inteligencia Artificial (Gemini 3.6) ────
  window.evaluateCurrentWriting = async function() {
    var editor = document.getElementById('notebookEditor');
    if (!editor) return;
    var text = editor.value.trim();

    var words = text ? text.split(/\s+/).filter(function(w) { return w; }).length : 0;
    if (words < 15) {
      alert('Por favor escribe al menos 15-20 palabras antes de solicitar la evaluación de la IA.');
      editor.focus();
      return;
    }

    var hasKey = typeof hasGeminiApiKey === 'function' ? hasGeminiApiKey() : (localStorage.getItem('tcf_gemini_api_key') || '').length > 10;
    if (!hasKey) {
      alert('Para obtener correcciones automáticas gratuitas necesitas ingresar tu clave API de Google Gemini en la pestaña ⚙️ Mi Clave API.');
      switchView('settings');
      return;
    }

    var btn = document.getElementById('btnAiEvaluate');
    var prevHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="ai-loading-spinner"></span> Evaluando con Gemini...';
    }

    var consigneText = '';
    var t = state.currentTheme;
    if (state.currentTask === 1) consigneText = (t.tache1Title || '') + ': ' + (t.tache1Prompt || '');
    if (state.currentTask === 2) consigneText = (t.tache2Title || '') + ': ' + (t.tache2Prompt || '');
    if (state.currentTask === 3) consigneText = (t.tache3Title || '') + '\nDoc 1: ' + (t.tache3Doc1 || '') + '\nDoc 2: ' + (t.tache3Doc2 || '');

    try {
      var feedback = await callGeminiForFeedback(state.currentTask, consigneText, text);
      renderFeedbackReport(feedback);
      showToast('🎉 ¡Evaluación completada con éxito!');
    } catch (err) {
      console.error('Error evaluating text:', err);
      alert('Error al comunicarse con la IA: ' + err.message);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = prevHtml;
      }
    }
  };

  function renderFeedbackReport(fb) {
    var card = document.getElementById('feedbackReportCard');
    if (!card) return;

    var nclcBadge = document.getElementById('reportNclcBadge');
    var scoreVal = document.getElementById('reportScoreVal');
    var subtitle = document.getElementById('reportNclcSubtitle');

    if (nclcBadge) nclcBadge.textContent = fb.nclc_level || 'NCLC 7';
    if (scoreVal) scoreVal.textContent = (fb.score_sur_20 || 11) + '/20';
    if (subtitle) {
      subtitle.textContent = 'Equivalente MCER: ' + (fb.cefr_level || 'B2') + ' · Objetivo Express Entry Canadá';
    }

    var grid = document.getElementById('reportCriteriaGrid');
    if (grid && fb.criteria) {
      var cHtml = '';
      var names = {
        pertinence: '🎯 Pertinencia y Consigna',
        coherence: '🔗 Coherencia y Estructura',
        lexique: '📖 Riqueza de Vocabulario',
        grammaire: '✍️ Gramática y Sintaxis'
      };
      for (var key in fb.criteria) {
        var c = fb.criteria[key];
        cHtml += '<div class="criterion-card">';
        cHtml += '  <div class="criterion-header">';
        cHtml += '    <span class="criterion-name">' + (names[key] || key) + '</span>';
        cHtml += '    <span class="criterion-score-pill">' + c.score + ' / 5</span>';
        cHtml += '  </div>';
        cHtml += '  <p class="criterion-comment">' + escapeHtml(c.comment) + '</p>';
        cHtml += '</div>';
      }
      grid.innerHTML = cHtml;
    }

    var corrList = document.getElementById('reportCorrectionsList');
    if (corrList) {
      var listHtml = '';
      if (fb.corrections && fb.corrections.length > 0) {
        fb.corrections.forEach(function(err) {
          listHtml += '<div class="correction-item">';
          listHtml += '  <div class="correction-diff">';
          listHtml += '    <span class="diff-wrong">' + escapeHtml(err.original) + '</span>';
          listHtml += '    <span class="diff-arrow">➔</span>';
          listHtml += '    <span class="diff-correct">' + escapeHtml(err.corrected) + '</span>';
          listHtml += '    <span class="diff-badge">' + (err.category || 'grammaire') + '</span>';
          listHtml += '  </div>';
          listHtml += '  <div class="correction-explanation">' + escapeHtml(err.explanation) + '</div>';
          listHtml += '</div>';
        });
      } else {
        listHtml = '<div style="color:var(--wash-mint-text);font-weight:600;padding:12px;">✨ ¡Excelente! No se detectaron errores graves en esta producción.</div>';
      }
      corrList.innerHTML = listHtml;
    }

    var rewriteEl = document.getElementById('reportRewriteText');
    if (rewriteEl) {
      rewriteEl.textContent = fb.rewrite || '(No disponible)';
    }

    var noteEl = document.getElementById('reportTeacherNote');
    if (noteEl) {
      var noteText = (fb.next_step || 'Sigue practicando la variación de conectores lógicos.') + 
                     (fb.strengths && fb.strengths.length > 0 ? ' Puntos fuertes: ' + fb.strengths.join(', ') : '');
      noteEl.textContent = '« ' + noteText + ' »';
    }

    card.style.display = 'block';
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ─── Configuración de Clave API (Pestaña 4) ─────────────────
  window.saveApiKeyAction = function() {
    var input = document.getElementById('apiKeyInput');
    if (!input) return;
    var key = input.value.trim();
    if (typeof setGeminiApiKey === 'function') {
      setGeminiApiKey(key);
    } else {
      localStorage.setItem('tcf_gemini_api_key', key);
    }
    checkApiStatus();
    showToast('✅ Clave API guardada con éxito');
  };

  window.testApiKeyAction = async function() {
    var input = document.getElementById('apiKeyInput');
    var resEl = document.getElementById('apiKeyTestResult');
    if (!input || !resEl) return;
    var key = input.value.trim() || (localStorage.getItem('tcf_gemini_api_key') || '');
    if (!key) {
      resEl.innerHTML = '<span style="color:#b91c1c;">❌ Por favor introduce una clave API primero.</span>';
      return;
    }

    resEl.innerHTML = '<span style="color:var(--ink-muted);"><span class="ai-loading-spinner"></span> Probando conexión con Gemini 3.6 Flash...</span>';
    var res = await testGeminiApiKey(key);
    if (res.ok) {
      resEl.innerHTML = '<span style="color:#15803d;font-weight:700;">✅ ¡Conexión exitosa con Gemini 3.6 Flash! La IA está lista para evaluar tus textos.</span>';
      checkApiStatus();
    } else {
      resEl.innerHTML = '<span style="color:#b91c1c;font-weight:700;">❌ Error de conexión: ' + escapeHtml(res.error) + '</span>';
    }
  };

  // ─── Minutero Opcional ───────────────────────────────────────
  window.toggleTimer = function() {
    var btn = document.getElementById('timerToggleBtn');
    var display = document.getElementById('notebookTimerDisplay');
    if (state.timerRunning) {
      clearInterval(state.timerInterval);
      state.timerRunning = false;
      if (btn) btn.textContent = '⏱️ Iniciar Minutero';
    } else {
      state.timerRunning = true;
      if (btn) btn.textContent = '⏸️ Pausar';
      state.timerInterval = setInterval(function() {
        state.timerSeconds++;
        var mins = Math.floor(state.timerSeconds / 60);
        var secs = state.timerSeconds % 60;
        if (display) {
          display.textContent = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
        }
      }, 1000);
    }
  };

  // ─── Limpiar Cuaderno ───────────────────────────────────────
  window.clearNotebook = function() {
    if (confirm('¿Estás seguro de que deseas borrar el texto del cuaderno para esta tarea?')) {
      var editor = document.getElementById('notebookEditor');
      if (editor) {
        editor.value = '';
        state.drafts[state.currentTask] = '';
        saveDrafts();
        updateWordCount();
      }
      var report = document.getElementById('feedbackReportCard');
      if (report) report.style.display = 'none';
      showToast('Cuaderno limpio.');
    }
  };

  // ─── Utilidades ─────────────────────────────────────────────
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
  }

  function showToast(msg) {
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--paper);padding:10px 20px;border-radius:var(--radius-pill);font-size:13.5px;font-weight:600;box-shadow:var(--shadow-float);z-index:999;animation:fadeIn 0.2s ease-out;';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
  }

  function setupEventListeners() {
    var editor = document.getElementById('notebookEditor');
    if (editor) {
      editor.addEventListener('input', updateWordCount);
    }

    var apiInput = document.getElementById('apiKeyInput');
    if (apiInput) {
      var saved = typeof getGeminiApiKey === 'function' ? getGeminiApiKey() : localStorage.getItem('tcf_gemini_api_key');
      if (saved) apiInput.value = saved;
    }
  }

})();
