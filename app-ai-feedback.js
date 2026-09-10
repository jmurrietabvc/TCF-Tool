/* ============================================================
   app-ai-feedback.js — TCF EE Studio X — AI Feedback Module
   Uses Gemini API (REST) for structured TCF writing evaluation.
   ============================================================ */

// ─── Configuration ───────────────────────────────────────────
const AI_CONFIG = {
  API_URL: 'https://generativelanguage.googleapis.com/v1beta/interactions',
  MODEL: 'gemini-2.5-flash-lite',
  MODELS: ['gemini-2.5-flash-lite', 'gemini-3.6-flash', 'gemini-3.1-flash-lite'],
  MAX_RETRIES: 2,
  DEFAULT_API_KEY: '',
  STORAGE_KEY_API: 'tcf_gemini_api_key',
  STORAGE_KEY_HISTORY: 'tcf_ai_feedback_history',
};

// ─── JSON Schema for structured output ───────────────────────
const TCF_FEEDBACK_SCHEMA = {
  type: 'object',
  properties: {
    nclc_level: {
      type: 'string',
      description: 'Estimated NCLC level',
      enum: ['NCLC 4', 'NCLC 5', 'NCLC 6', 'NCLC 7', 'NCLC 8', 'NCLC 9', 'NCLC 10+']
    },
    cefr_level: {
      type: 'string',
      description: 'Equivalent CEFR level',
      enum: ['A2', 'B1', 'B2', 'C1', 'C2']
    },
    score_sur_20: {
      type: 'integer',
      description: 'Estimated score out of 20 based on TCF EE grading criteria'
    },
    criteria: {
      type: 'object',
      properties: {
        pertinence: {
          type: 'object',
          properties: {
            score: { type: 'integer', description: 'Score from 1 to 5' },
            comment: { type: 'string', description: 'Brief comment in French explaining the score' }
          },
          required: ['score', 'comment']
        },
        coherence: {
          type: 'object',
          properties: {
            score: { type: 'integer', description: 'Score from 1 to 5' },
            comment: { type: 'string', description: 'Brief comment in French explaining the score' }
          },
          required: ['score', 'comment']
        },
        lexique: {
          type: 'object',
          properties: {
            score: { type: 'integer', description: 'Score from 1 to 5' },
            comment: { type: 'string', description: 'Brief comment in French explaining the score' }
          },
          required: ['score', 'comment']
        },
        grammaire: {
          type: 'object',
          properties: {
            score: { type: 'integer', description: 'Score from 1 to 5' },
            comment: { type: 'string', description: 'Brief comment in French explaining the score' }
          },
          required: ['score', 'comment']
        }
      },
      required: ['pertinence', 'coherence', 'lexique', 'grammaire']
    },
    corrections: {
      type: 'array',
      description: 'Prioritized list of corrections (max 8, most important first)',
      items: {
        type: 'object',
        properties: {
          original: { type: 'string', description: 'The incorrect phrase from the student text' },
          corrected: { type: 'string', description: 'The corrected version' },
          explanation: { type: 'string', description: 'Brief explanation of the error in French' },
          category: {
            type: 'string',
            description: 'Error category',
            enum: ['grammaire', 'orthographe', 'vocabulaire', 'syntaxe', 'conjugaison', 'ponctuation', 'registre', 'coherence']
          }
        },
        required: ['original', 'corrected', 'explanation', 'category']
      }
    },
    rewrite: {
      type: 'string',
      description: 'Complete C1-level rewrite of the student text, keeping the same ideas but with richer vocabulary and better structure'
    },
    next_step: {
      type: 'string',
      description: 'One specific, actionable suggestion in French for the student to improve'
    },
    strengths: {
      type: 'array',
      description: 'List of 2-3 positive aspects of the writing in French',
      items: { type: 'string' }
    }
  },
  required: ['nclc_level', 'cefr_level', 'score_sur_20', 'criteria', 'corrections', 'rewrite', 'next_step', 'strengths']
};

// ─── API Key Management ──────────────────────────────────────

function getGeminiApiKey() {
  return localStorage.getItem(AI_CONFIG.STORAGE_KEY_API) || AI_CONFIG.DEFAULT_API_KEY || '';
}

function setGeminiApiKey(key) {
  localStorage.setItem(AI_CONFIG.STORAGE_KEY_API, key.trim());
}

function hasGeminiApiKey() {
  return getGeminiApiKey().length > 10;
}

async function testGeminiApiKey(key) {
  try {
    const resp = await fetch(AI_CONFIG.API_URL + '?key=' + encodeURIComponent(key), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_CONFIG.MODEL,
        input: 'Reponds uniquement "ok".'
      })
    });
    if (!resp.ok) {
      const err = await resp.json().catch(function() { return {}; });
      return { ok: false, error: (err.error && err.error.message) || ('HTTP ' + resp.status) };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ─── Build the evaluation prompt ─────────────────────────────

function buildEvaluationPrompt(taskNumber, consigne, studentText) {
  var wordCount = studentText.trim().split(/\s+/).filter(function(w) { return w; }).length;

  var taskDescriptions = {
    1: 'Tache 1 — Message / Courriel (60 a 120 mots, environ 15 minutes)',
    2: 'Tache 2 — Recit d\'experience / Compte-rendu (120 a 150 mots, environ 20 minutes)',
    3: 'Tache 3 — Comparaison d\'opinions et prise de position argumentee (120 a 180 mots, environ 25 minutes)'
  };

  var wordRanges = {
    1: { min: 60, max: 120 },
    2: { min: 120, max: 150 },
    3: { min: 120, max: 180 }
  };

  var range = wordRanges[taskNumber] || wordRanges[1];

  return 'Tu es un évaluateur officiel et bienveillant du TCF Canada (Expression Écrite), formé selon les critères réels et le guide d\'évaluation officiel de France Éducation International (FEI).\n\n' +
    'PHILOSOPHIE D\'ÉVALUATION DES EXAMINATEURS OFFICIELS DU TCF :\n' +
    '- Les examinateurs réels évaluent la compétence globale de communication et ce que l\'apprenant RÉUSSIT À TRANSMETTRE, et non pas chaque détail négatif.\n' +
    '- TOLÉRANCE RÉELLE AUX ACCENTS ET À LA PONCTUATION : Le TCF se passe sur ordinateur avec des claviers variés (QWERTY, etc.). Les oublis d\'accents occasionnels (ex. "deja", "evenement", "a" pour "à"), les coquilles de frappe ou les erreurs légères de ponctuation NE DOIVENT PAS pénaliser le niveau NCLC si le sens est parfaitement compréhensible. Ne retire JAMAIS de points pour de simples accents manquants.\n' +
    '- Le niveau B2 (NCLC 7) N\'EXIGE PAS la perfection ! Un candidat B2 fait régulièrement des erreurs de genre, d\'accords ou de temps complexes, mais il sait raconter, expliquer, structurer avec des connecteurs et se faire comprendre sans ambiguïté.\n' +
    '- Si le texte respecte la consigne, a une organisation logique claire et un volume de mots adéquat, le niveau visé de NCLC 7 (B2) est légitime même avec des imperfections.\n\n' +
    'CONTEXTE DE L\'ÉVALUATION :\n' +
    '- ' + (taskDescriptions[taskNumber] || taskDescriptions[1]) + '\n' +
    '- Nombre de mots attendu : ' + range.min + '–' + range.max + ' mots\n' +
    '- Nombre de mots du texte soumis : ' + wordCount + ' mots\n\n' +
    'CONSIGNE / SUJET :\n' +
    (consigne || '(Pas de consigne fournie — évalue le texte selon le type de tâche)') + '\n\n' +
    'TEXTE DE L\'APPRENANT :\n' +
    studentText + '\n\n' +
    'GRILLE D\'ÉVALUATION OFFICIELLE (4 CRITÈRES FEI) :\n' +
    '1. Pertinence et adéquation : respect de la consigne, adéquation au type de texte (lettre amicale, réclamation, synthèse), respect du registre (tu vs vous).\n' +
    '2. Cohérence et cohésion : présence de paragraphes, progression des idées, emploi de connecteurs logiques (d\'abord, ensuite, cependant, en effet, etc.).\n' +
    '3. Compétence lexicale : vocabulaire adapté au thème, variété des mots. Tolère les approximations tant que le message passe.\n' +
    '4. Compétence grammaticale : structures de phrases, temps verbaux usuels. Ne pénalise pas les accents manquants comme des fautes graves de grammaire.\n\n' +
    'BARÈME NCLC RÉALISTE (comme un vrai examinateur) :\n' +
    '- NCLC 4 (A2) = 4-5/20 : phrases isolées très simples, incompréhension fréquente ou hors-sujet complet.\n' +
    '- NCLC 5-6 (B1) = 6-9/20 : message compréhensible mais phrases courtes, vocabulaire basique, peu de connecteurs.\n' +
    '- NCLC 7 (B2) = 10-11/20 : texte bien développé, respect de la consigne, connecteurs variés, argumentation ou récit clair, quelques erreurs grammaticales tolérées.\n' +
    '- NCLC 8 (C1) = 12-13/20 : texte fluide, vocabulaire riche, bonne maîtrise syntaxique.\n' +
    '- NCLC 9-10+ (C1/C2) = 14-20/20 : style remarquable, nuances subtiles, aisance quasi-native.\n\n' +
    'INSTRUCTIONS PARTICULIÈRES :\n' +
    '1. Attribue un score de 1 à 5 pour chaque critère avec commentaire explicatif en ESPAGNOL.\n' +
    '2. Donne une liste de corrections prioritaires (max 6) : concentre-toi sur les vraies erreurs de structure, de sens ou de grammaire impactantes, PAS sur les petits accents manquants ou de simples virgules. Explications en ESPAGNOL.\n' +
    '3. Réécriture de référence C1 en FRANÇAIS élégant.\n' +
    '4. Conseil bienveillant et actionnable (next_step) et 2-3 points forts (strengths) en ESPAGNOL.\n' +
    'IMPORTANT: Toutes les explications d\'erreurs, commentaires et conseils d\'amélioration doivent être rédigés en ESPAGNOL afin d\'aider l\'étudiant hispanophone. La réécriture C1 reste en FRANÇAIS.';
}

// ─── Call Gemini API ─────────────────────────────────────────

async function callGeminiForFeedback(taskNumber, consigne, studentText) {
  var apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  var prompt = buildEvaluationPrompt(taskNumber, consigne, studentText);

  var modelsToTry = AI_CONFIG.MODELS || ['gemini-2.5-flash-lite', 'gemini-3.6-flash'];
  var lastError;

  for (var mi = 0; mi < modelsToTry.length; mi++) {
    var currentModel = modelsToTry[mi];

    var body = {
      model: currentModel,
      input: prompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: TCF_FEEDBACK_SCHEMA
      }
    };

    try {
      var resp = await fetch(AI_CONFIG.API_URL + '?key=' + encodeURIComponent(apiKey), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!resp.ok) {
        var errData = await resp.json().catch(function() { return {}; });
        var msg = (errData.error && errData.error.message) || ('HTTP ' + resp.status);

        // If rate limit or quota exceeded, fallback to next model
        if (resp.status === 429 || msg.includes('Quota exceeded') || msg.includes('RESOURCE_EXHAUSTED')) {
          console.warn('Modelo ' + currentModel + ' con cuota agotada. Intentando siguiente modelo...', msg);
          lastError = new Error(msg);
          continue;
        }
        throw new Error(msg);
      }

      var data = await resp.json();
      console.log('Gemini API response:', data);

      // Extract text from the Interactions API response
      var outputText = '';
      if (data.output_text) {
        outputText = data.output_text;
      } else if (Array.isArray(data.steps)) {
        for (var si = 0; si < data.steps.length; si++) {
          var step = data.steps[si];
          if (step.type === 'model_output') {
            if (Array.isArray(step.content)) {
              for (var ci = 0; ci < step.content.length; ci++) {
                var cItem = step.content[ci];
                if (cItem && cItem.text) outputText += cItem.text;
                else if (typeof cItem === 'string') outputText += cItem;
              }
            } else if (typeof step.content === 'string') {
              outputText += step.content;
            } else if (Array.isArray(step.parts)) {
              for (var pi = 0; pi < step.parts.length; pi++) {
                if (step.parts[pi] && step.parts[pi].text) outputText += step.parts[pi].text;
              }
            } else if (step.text) {
              outputText += step.text;
            }
          }
        }
      } else if (Array.isArray(data.outputs)) {
        for (var oi = 0; oi < data.outputs.length; oi++) {
          var out = data.outputs[oi];
          if (out && out.text) outputText += out.text;
          else if (out && out.content) outputText += typeof out.content === 'string' ? out.content : (out.content.text || '');
        }
      } else if (data.candidates && data.candidates[0]) {
        var cand = data.candidates[0];
        if (cand.content && Array.isArray(cand.content.parts)) {
          for (var p = 0; p < cand.content.parts.length; p++) {
            if (cand.content.parts[p] && cand.content.parts[p].text) outputText += cand.content.parts[p].text;
          }
        }
      }

      // If data already contains feedback directly
      if (!outputText && data.nclc_level && data.criteria) {
        return data;
      }

      if (!outputText) {
        console.error('Empty outputText from data:', JSON.stringify(data));
        throw new Error('La reponse de l\'IA est vide ou non reconnue.');
      }

      // Parse JSON from response
      var feedback;
      try {
        var jsonMatch = outputText.match(/```json\s*([\s\S]*?)```/) ||
                        outputText.match(/```\s*([\s\S]*?)```/);
        var jsonStr = jsonMatch ? jsonMatch[1].trim() : outputText.trim();
        feedback = JSON.parse(jsonStr);
      } catch (parseErr) {
        console.error('Failed to parse JSON:', outputText, parseErr);
        throw new Error('Impossible de parser la reponse IA en JSON: ' + parseErr.message);
      }

      return feedback;

    } catch (e) {
      lastError = e;
      if (e.message === 'NO_API_KEY') throw e;
      console.warn('Error con modelo ' + currentModel + ':', e.message);
    }
  }

  // If all models failed, provide helpful explanation
  var finalMsg = lastError ? lastError.message : 'Error desconocido';
  if (finalMsg.includes('Quota exceeded') || finalMsg.includes('429')) {
    finalMsg = 'Has alcanzado temporalmente el límite de peticiones por minuto de Google. Por favor espera 30-45 segundos y vuelve a pulsar el botón.';
  }
  throw new Error(finalMsg);
}

// ─── Feedback History ────────────────────────────────────────

function saveFeedbackToHistory(taskNumber, consigne, studentText, feedback) {
  try {
    var history = JSON.parse(localStorage.getItem(AI_CONFIG.STORAGE_KEY_HISTORY) || '[]');
    history.unshift({
      id: Date.now(),
      date: new Date().toISOString(),
      taskNumber: taskNumber,
      consigne: (consigne || '').substring(0, 200),
      wordCount: studentText.trim().split(/\s+/).filter(function(w) { return w; }).length,
      nclc: feedback.nclc_level,
      cefr: feedback.cefr_level,
      score: feedback.score_sur_20,
      criteria: feedback.criteria,
      corrections_count: (feedback.corrections || []).length,
    });
    if (history.length > 50) history.length = 50;
    localStorage.setItem(AI_CONFIG.STORAGE_KEY_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.warn('Could not save feedback history:', e);
  }
}

function getFeedbackHistory() {
  try {
    return JSON.parse(localStorage.getItem(AI_CONFIG.STORAGE_KEY_HISTORY) || '[]');
  } catch (e) { return []; }
}

// ─── Render Functions ────────────────────────────────────────

function getNclcColor(level) {
  var colors = {
    'NCLC 4': '#ef4444', 'NCLC 5': '#f97316', 'NCLC 6': '#eab308',
    'NCLC 7': '#22c55e', 'NCLC 8': '#3b82f6', 'NCLC 9': '#8b5cf6', 'NCLC 10+': '#ec4899'
  };
  return colors[level] || '#9598b0';
}

function getNclcProgress(level) {
  var values = {
    'NCLC 4': 15, 'NCLC 5': 28, 'NCLC 6': 42,
    'NCLC 7': 57, 'NCLC 8': 71, 'NCLC 9': 85, 'NCLC 10+': 100
  };
  return values[level] || 0;
}

function getCategoryIcon(cat) {
  var icons = {
    grammaire: '📐', orthographe: '✏️', vocabulaire: '📖', syntaxe: '🔗',
    conjugaison: '🔄', ponctuation: '❗', registre: '🎭', coherence: '🧩'
  };
  return icons[cat] || '📝';
}

function getCriteriaLabel(key) {
  var labels = {
    pertinence: 'Pertinence & Adéquation',
    coherence: 'Cohérence & Cohésion',
    lexique: 'Compétence Lexicale',
    grammaire: 'Compétence Grammaticale'
  };
  return labels[key] || key;
}

function getCriteriaIcon(key) {
  var icons = { pertinence: '🎯', coherence: '🔗', lexique: '📖', grammaire: '📐' };
  return icons[key] || '📝';
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, ' ');
}

function renderFeedbackPanel(feedback, studentText) {
  var color = getNclcColor(feedback.nclc_level);
  var progress = getNclcProgress(feedback.nclc_level);

  var strengthsHtml = '';
  if (feedback.strengths && feedback.strengths.length) {
    strengthsHtml = '<div class="ai-section ai-strengths"><h4>💪 Points forts</h4><ul>' +
      feedback.strengths.map(function(s) { return '<li>✅ ' + escapeHtml(s) + '</li>'; }).join('') +
      '</ul></div>';
  }

  var criteriaHtml = ['pertinence', 'coherence', 'lexique', 'grammaire'].map(function(key) {
    var c = feedback.criteria[key];
    if (!c) return '';
    var pct = (c.score / 5) * 100;
    var barColor = c.score >= 4 ? '#22c55e' : c.score >= 3 ? '#eab308' : '#ef4444';
    return '<div class="ai-criteria-card">' +
      '<div class="ai-criteria-header">' +
        '<span class="ai-criteria-icon">' + getCriteriaIcon(key) + '</span>' +
        '<span class="ai-criteria-name">' + getCriteriaLabel(key) + '</span>' +
        '<span class="ai-criteria-score" style="color:' + barColor + ';">' + c.score + '/5</span>' +
      '</div>' +
      '<div class="ai-criteria-bar-wrap"><div class="ai-criteria-bar" style="width:' + pct + '%;background:' + barColor + ';"></div></div>' +
      '<p class="ai-criteria-comment">' + escapeHtml(c.comment) + '</p>' +
    '</div>';
  }).join('');

  var correctionsHtml = '';
  if (feedback.corrections && feedback.corrections.length) {
    correctionsHtml = '<div class="ai-section"><h4>🔍 Corrections prioritaires</h4><div class="ai-corrections-list">' +
      feedback.corrections.map(function(c, i) {
        return '<div class="ai-correction-item">' +
          '<div class="ai-correction-header">' +
            '<span class="ai-correction-num">#' + (i + 1) + '</span>' +
            '<span class="ai-correction-cat">' + getCategoryIcon(c.category) + ' ' + c.category + '</span>' +
          '</div>' +
          '<div class="ai-correction-diff">' +
            '<div class="ai-diff-wrong">❌ ' + escapeHtml(c.original) + '</div>' +
            '<div class="ai-diff-right">✅ ' + escapeHtml(c.corrected) + '</div>' +
          '</div>' +
          '<p class="ai-correction-explain">💡 ' + escapeHtml(c.explanation) + '</p>' +
          '<button class="ai-btn-recycle" onclick="addErrorFromAI(\'' + escapeAttr(c.original) + '\',\'' + escapeAttr(c.corrected) + '\')">♻️ Ajouter aux erreurs recyclées</button>' +
        '</div>';
      }).join('') +
    '</div></div>';
  }

  var rewriteHtml = '';
  if (feedback.rewrite) {
    rewriteHtml = '<div class="ai-section"><h4>✍️ Réécriture de référence C1</h4>' +
      '<div class="ai-rewrite-tabs">' +
        '<button class="ai-rewrite-tab active" onclick="switchRewriteTab(this,\'original\')">📝 Votre texte</button>' +
        '<button class="ai-rewrite-tab" onclick="switchRewriteTab(this,\'rewrite\')">✨ Version C1</button>' +
        '<button class="ai-rewrite-tab" onclick="switchRewriteTab(this,\'side\')">⚡ Côte à côte</button>' +
      '</div>' +
      '<div class="ai-rewrite-content" id="aiRewriteContent">' +
        '<div class="ai-rewrite-pane ai-rewrite-original active">' + escapeHtml(studentText).replace(/\n/g, '<br>') + '</div>' +
        '<div class="ai-rewrite-pane ai-rewrite-model">' + escapeHtml(feedback.rewrite).replace(/\n/g, '<br>') + '</div>' +
        '<div class="ai-rewrite-pane ai-rewrite-side">' +
          '<div class="ai-side-col"><div class="ai-side-label">Votre texte</div><div class="ai-side-text">' + escapeHtml(studentText).replace(/\n/g, '<br>') + '</div></div>' +
          '<div class="ai-side-col"><div class="ai-side-label">Version C1</div><div class="ai-side-text">' + escapeHtml(feedback.rewrite).replace(/\n/g, '<br>') + '</div></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  var nextStepHtml = '';
  if (feedback.next_step) {
    nextStepHtml = '<div class="ai-section ai-next-step"><h4>📌 Prochain pas</h4><p>' + escapeHtml(feedback.next_step) + '</p></div>';
  }

  return '<div class="ai-feedback-panel">' +
    '<div class="ai-disclaimer">⚠️ Estimation IA — Ce n\'est pas un score officiel TCF. Feedback généré par IA et peut contenir des erreurs.</div>' +
    '<div class="ai-score-summary">' +
      '<div class="ai-score-main">' +
        '<div class="ai-nclc-badge" style="background:' + color + '20;border-color:' + color + ';color:' + color + ';">' + feedback.nclc_level + '</div>' +
        '<div class="ai-score-details">' +
          '<div class="ai-score-number">' + feedback.score_sur_20 + '<span class="ai-score-total">/20</span></div>' +
          '<div class="ai-score-cefr">' + feedback.cefr_level + ' — ' + feedback.nclc_level + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="ai-nclc-bar-wrap">' +
        '<div class="ai-nclc-bar" style="width:' + progress + '%;background:linear-gradient(90deg,#ef4444,#eab308,#22c55e,#3b82f6,#8b5cf6);"></div>' +
        '<div class="ai-nclc-marker" style="left:' + progress + '%;"><div class="ai-nclc-marker-dot" style="background:' + color + ';"></div></div>' +
        '<div class="ai-nclc-labels"><span>A2</span><span>B1</span><span>B2</span><span>C1</span><span>C2</span></div>' +
      '</div>' +
    '</div>' +
    strengthsHtml +
    '<div class="ai-section"><h4>📊 Critères d\'évaluation TCF</h4><div class="ai-criteria-grid">' + criteriaHtml + '</div></div>' +
    correctionsHtml +
    rewriteHtml +
    nextStepHtml +
    '<div class="ai-actions">' +
      '<button class="ai-btn-copy" onclick="copyFeedbackText()">📋 Copier le feedback</button>' +
      '<button class="ai-btn-close" onclick="closeAiFeedback()">✕ Fermer</button>' +
    '</div>' +
  '</div>';
}

function renderLoadingState() {
  return '<div class="ai-feedback-panel ai-loading">' +
    '<div class="ai-loading-content">' +
      '<div class="ai-loading-spinner"></div>' +
      '<h4>🤖 Analyse en cours…</h4>' +
      '<p>L\'IA évalue votre texte selon les 4 critères TCF.<br>Cela prend environ 10-15 secondes.</p>' +
      '<div class="ai-loading-steps">' +
        '<div class="ai-loading-step active">📝 Lecture du texte</div>' +
        '<div class="ai-loading-step">📊 Évaluation des critères</div>' +
        '<div class="ai-loading-step">🔍 Détection des erreurs</div>' +
        '<div class="ai-loading-step">✍️ Rédaction de la réécriture C1</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderErrorState(errorMsg) {
  if (errorMsg === 'NO_API_KEY') {
    return '<div class="ai-feedback-panel ai-error">' +
      '<div class="ai-error-content">' +
        '<h4>🔑 Clé API Gemini requise</h4>' +
        '<p>Pour utiliser le feedback IA, configurez votre clé API Gemini gratuite.</p>' +
        '<div class="ai-api-setup">' +
          '<div class="ai-api-steps">' +
            '<div class="ai-api-step"><span class="ai-step-num">1</span><span>Allez sur <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a></span></div>' +
            '<div class="ai-api-step"><span class="ai-step-num">2</span><span>Cliquez "Create API Key" (gratuit)</span></div>' +
            '<div class="ai-api-step"><span class="ai-step-num">3</span><span>Collez votre clé ci-dessous</span></div>' +
          '</div>' +
          '<div class="ai-api-input-row">' +
            '<input type="password" id="aiApiKeyInput" placeholder="Collez votre clé API ici…" class="ai-api-input" />' +
            '<button class="ai-btn-toggle-vis" onclick="toggleApiKeyVis()" title="Afficher/masquer">👁</button>' +
          '</div>' +
          '<div class="ai-api-actions">' +
            '<button class="ai-btn-save-key" onclick="saveApiKeyFromPanel()">💾 Enregistrer la clé</button>' +
            '<button class="ai-btn-test-key" onclick="testApiKeyFromPanel()">🧪 Tester la connexion</button>' +
          '</div>' +
          '<div id="aiApiKeyResult" class="ai-api-result"></div>' +
        '</div>' +
      '</div>' +
      '<div class="ai-actions"><button class="ai-btn-close" onclick="closeAiFeedback()">✕ Fermer</button></div>' +
    '</div>';
  }

  return '<div class="ai-feedback-panel ai-error">' +
    '<div class="ai-error-content">' +
      '<h4>❌ Erreur</h4>' +
      '<p>' + escapeHtml(errorMsg) + '</p>' +
      '<button class="ai-btn-retry" onclick="retryAiFeedback()">🔄 Réessayer</button>' +
    '</div>' +
    '<div class="ai-actions"><button class="ai-btn-close" onclick="closeAiFeedback()">✕ Fermer</button></div>' +
  '</div>';
}

// ─── Tab Switching ───────────────────────────────────────────

function switchRewriteTab(btn, mode) {
  var container = document.getElementById('aiRewriteContent');
  if (!container) return;
  var tabs = btn.parentElement.querySelectorAll('.ai-rewrite-tab');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  btn.classList.add('active');
  var panes = container.querySelectorAll('.ai-rewrite-pane');
  for (var j = 0; j < panes.length; j++) panes[j].classList.remove('active');
  if (mode === 'original') { var el = container.querySelector('.ai-rewrite-original'); if (el) el.classList.add('active'); }
  else if (mode === 'rewrite') { var el2 = container.querySelector('.ai-rewrite-model'); if (el2) el2.classList.add('active'); }
  else if (mode === 'side') { var el3 = container.querySelector('.ai-rewrite-side'); if (el3) el3.classList.add('active'); }
}

// ─── API Key Panel Functions ─────────────────────────────────

function toggleApiKeyVis() {
  var inp = document.getElementById('aiApiKeyInput');
  if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
}

function saveApiKeyFromPanel() {
  var inp = document.getElementById('aiApiKeyInput');
  var result = document.getElementById('aiApiKeyResult');
  if (!inp || !inp.value.trim()) {
    if (result) { result.textContent = '❌ Veuillez entrer une clé API.'; result.className = 'ai-api-result error'; }
    return;
  }
  setGeminiApiKey(inp.value.trim());
  if (result) { result.textContent = '✅ Clé enregistrée ! Cliquez "Tester la connexion" pour vérifier.'; result.className = 'ai-api-result success'; }
}

async function testApiKeyFromPanel() {
  var inp = document.getElementById('aiApiKeyInput');
  var result = document.getElementById('aiApiKeyResult');
  var key = (inp && inp.value ? inp.value : '').trim() || getGeminiApiKey();
  if (!key) {
    if (result) { result.textContent = '❌ Aucune clé à tester.'; result.className = 'ai-api-result error'; }
    return;
  }
  if (result) { result.textContent = '⏳ Test en cours…'; result.className = 'ai-api-result'; }
  var res = await testGeminiApiKey(key);
  if (res.ok) {
    setGeminiApiKey(key);
    if (result) { result.textContent = '✅ Connexion réussie ! La clé fonctionne.'; result.className = 'ai-api-result success'; }
  } else {
    if (result) { result.textContent = '❌ Erreur : ' + res.error; result.className = 'ai-api-result error'; }
  }
}

// ─── Main Entry Point ────────────────────────────────────────

var _lastFeedbackContext = null;

async function requestAiFeedback() {
  var panel = document.getElementById('aiFeedbackPanel');
  if (!panel) return;

  var taskNum = typeof currentTask !== 'undefined' ? currentTask : 1;
  var editor = document.getElementById('editor');
  var studentText = editor ? editor.value.trim() : '';

  if (!studentText || studentText.split(/\s+/).length < 10) {
    panel.innerHTML = renderErrorState('Veuillez écrire au moins 10 mots avant de demander un feedback.');
    panel.style.display = 'block';
    return;
  }

  var consigne = '';
  try {
    var taskContent = document.getElementById('taskContent');
    if (taskContent) consigne = taskContent.textContent.trim().substring(0, 1000);
  } catch (e) {}

  _lastFeedbackContext = { taskNum: taskNum, consigne: consigne, studentText: studentText };

  panel.innerHTML = renderLoadingState();
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  animateLoadingSteps();

  try {
    var feedback = await callGeminiForFeedback(taskNum, consigne, studentText);
    saveFeedbackToHistory(taskNum, consigne, studentText, feedback);
    panel.innerHTML = renderFeedbackPanel(feedback, studentText);
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) {
    panel.innerHTML = renderErrorState(e.message);
  }
}

function retryAiFeedback() {
  if (_lastFeedbackContext) {
    requestAiFeedback();
  }
}

function closeAiFeedback() {
  var panel = document.getElementById('aiFeedbackPanel');
  if (panel) {
    panel.style.display = 'none';
    panel.innerHTML = '';
  }
  if (window._aiLoadingInterval) {
    clearInterval(window._aiLoadingInterval);
  }
}

function animateLoadingSteps() {
  var steps = document.querySelectorAll('.ai-loading-step');
  if (!steps.length) return;
  var idx = 0;
  var interval = setInterval(function() {
    idx++;
    if (idx >= steps.length) { clearInterval(interval); return; }
    steps[idx].classList.add('active');
  }, 3000);
  window._aiLoadingInterval = interval;
}

// ─── Error Recycling Integration ─────────────────────────────

function addErrorFromAI(wrong, right) {
  if (typeof addErrorDirect === 'function') {
    addErrorDirect(wrong, right);
  } else {
    try {
      var errors = JSON.parse(localStorage.getItem('tcf_errors') || '[]');
      var exists = false;
      for (var i = 0; i < errors.length; i++) { if (errors[i].wrong === wrong) { exists = true; break; } }
      if (!exists) {
        errors.push({ wrong: wrong, right: right, date: new Date().toISOString(), quizzed: 0, correct: 0 });
        localStorage.setItem('tcf_errors', JSON.stringify(errors));
      }
    } catch (e) {}
  }

  if (event && event.target) {
    event.target.textContent = '✅ Ajouté !';
    event.target.disabled = true;
    event.target.style.opacity = '0.6';
  }
}

// ─── Copy Feedback ───────────────────────────────────────────

function copyFeedbackText() {
  var panel = document.querySelector('.ai-feedback-panel');
  if (!panel) return;
  var text = panel.innerText;
  navigator.clipboard.writeText(text).then(function() {
    var btn = document.querySelector('.ai-btn-copy');
    if (btn) {
      var orig = btn.textContent;
      btn.textContent = '✅ Copié !';
      setTimeout(function() { btn.textContent = orig; }, 2000);
    }
  });
}

// ─── Profile API Key Section Renderer ────────────────────────

function renderApiKeySection() {
  var key = getGeminiApiKey();
  var masked = key ? Array(Math.min(key.length - 4, 20) + 1).join('•') + key.slice(-4) : '';

  return '<div class="card" style="margin-top:14px;">' +
    '<h3 class="h3">🤖 Clé API Gemini (Feedback IA)</h3>' +
    '<p class="muted" style="margin-bottom:12px">' +
      'Configurez votre clé API Gemini gratuite pour activer le feedback IA sur vos productions. ' +
      '<a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style="color:var(--gold);">Obtenir une clé gratuite →</a>' +
    '</p>' +
    '<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;">' +
      '<input type="password" id="profileApiKey" value="' + escapeAttr(key) + '" placeholder="AIzaSy..." ' +
             'style="flex:1;background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--fg);font-family:monospace;font-size:13px;" />' +
      '<button onclick="document.getElementById(\'profileApiKey\').type = document.getElementById(\'profileApiKey\').type === \'password\' ? \'text\' : \'password\'" class="btn btn-ghost btn-sm">👁</button>' +
    '</div>' +
    '<div class="btn-row">' +
      '<button class="btn btn-primary btn-sm" onclick="saveProfileApiKey()">💾 Enregistrer</button>' +
      '<button class="btn btn-ghost btn-sm" onclick="testProfileApiKey()">🧪 Tester la connexion</button>' +
    '</div>' +
    '<div id="profileApiKeyResult" style="margin-top:8px;font-size:12px;font-weight:600;"></div>' +
    (key ? '<p style="margin-top:8px;font-size:11px;color:var(--sub);">Clé actuelle : ' + masked + '</p>' : '') +
  '</div>';
}

function saveProfileApiKey() {
  var inp = document.getElementById('profileApiKey');
  var result = document.getElementById('profileApiKeyResult');
  if (inp && inp.value.trim()) {
    setGeminiApiKey(inp.value.trim());
    if (result) { result.textContent = '✅ Clé enregistrée !'; result.style.color = '#22c55e'; }
  } else {
    if (result) { result.textContent = '❌ Veuillez entrer une clé API.'; result.style.color = '#ef4444'; }
  }
}

async function testProfileApiKey() {
  var inp = document.getElementById('profileApiKey');
  var result = document.getElementById('profileApiKeyResult');
  var key = (inp && inp.value ? inp.value : '').trim() || getGeminiApiKey();
  if (!key) {
    if (result) { result.textContent = '❌ Aucune clé à tester.'; result.style.color = '#ef4444'; }
    return;
  }
  if (result) { result.textContent = '⏳ Test en cours…'; result.style.color = 'var(--sub)'; }
  var res = await testGeminiApiKey(key);
  if (res.ok) {
    setGeminiApiKey(key);
    if (result) { result.textContent = '✅ Connexion réussie !'; result.style.color = '#22c55e'; }
  } else {
    if (result) { result.textContent = '❌ Erreur : ' + res.error; result.style.color = '#ef4444'; }
  }
}

console.log('✅ app-ai-feedback.js loaded');
