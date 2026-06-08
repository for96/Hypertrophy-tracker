/* =====================================================================
   PROTOCOLLO IPERTROFIA — 3+1 split
   PWA — vanilla JS + localStorage + vite-plugin-pwa
   ===================================================================== */

import { registerSW } from 'virtual:pwa-register';

// SW: alla nuova versione mostriamo un banner discreto
const updateSW = registerSW({
  onNeedRefresh() {
    showUpdateBanner(() => updateSW(true));
  },
  onOfflineReady() {
    showToast('Offline ready');
  }
});

/* ============== DEFAULT PROGRAM ============== */
const DEFAULT_PROGRAM = {
  lun: {
    name: 'Dorso & Tricipiti + Avambracci',
    label: 'Giorno 1 · Lunedì',
    exercises: [
      { id:'l1', name:'Lat Machine (pulldown)', target:'Gran dorsale, bicipiti', sets:4, reps:'8-12', rest:120,
        cue:'Petto in fuori, scapole giù e indietro. Tira con i gomiti — non con le mani. Sbarra al petto alto, eccentrica controllata 2-3 sec.',
        video:'lat pulldown tutorial corretto' },
      { id:'l2', name:'Rematore / Row machine', target:'Mid-back, romboidi, dorso', sets:4, reps:'8-10', rest:120,
        cue:'Busto inclinato 30-45°, schiena neutra. Tira al basso sterno spingendo i gomiti dietro. Niente strappi col bacino.',
        video:'rematore bilanciere forma corretta' },
      { id:'l3', name:'Pulley basso (seated row)', target:'Mid-back, gran dorsale', sets:3, reps:'10-12', rest:90,
        cue:'Schiena dritta, scapole abbassate. Tira fino all\'ombelico, 1 sec di squeeze in contrazione.',
        video:'pulley basso seduto tecnica' },
      { id:'l4', name:'Pull-over al cavo alto', target:'Gran dorsale (stretch)', sets:3, reps:'12-15', rest:75,
        cue:'Braccia leggermente piegate FISSE, scendi tirando con i dorsali. Cerca il massimo allungamento in alto.',
        video:'straight arm pulldown lat' },
      { id:'l5', name:'Push-down cavi con sbarra', target:'Tricipiti (capo lungo+laterale)', sets:4, reps:'8-12', rest:90,
        cue:'Gomiti incollati ai fianchi e fermi. Estendi solo l\'avambraccio. Pausa 1 sec in contrazione massima.',
        video:'pushdown cavi sbarra tricipiti' },
      { id:'l6', name:'French press con manubrio', target:'Tricipiti (capo lungo)', sets:3, reps:'10-12', rest:90,
        cue:'Gomiti stretti vicino alla testa, scendi dietro la nuca lentamente. Solo l\'avambraccio si muove.',
        video:'french press manubrio overhead extension' },
      { id:'l7', name:'Push-down corda', target:'Tricipiti (capo laterale)', sets:3, reps:'12-15', rest:60,
        cue:'In basso ruota i polsi verso l\'esterno e allarga la corda per massima contrazione del laterale.',
        video:'pushdown corda tricipiti rope' },
      { id:'l8', name:'Avambracci proni (reverse curl)', target:'Brachioradiale, estensori', sets:3, reps:'12-15', rest:60,
        cue:'Bilanciere piccolo con presa pronata (palmi giù). Gomiti fissi, eccentrica lenta 3 sec.',
        video:'reverse curl bilanciere avambracci' },
      { id:'l9', name:'Avambracci supini (wrist curl)', target:'Flessori avambraccio', sets:3, reps:'15-20', rest:45,
        cue:'Avambracci appoggiati sulle cosce, palmi in su. Solo i polsi si muovono, range completo flessione-estensione.',
        video:'wrist curl flessori avambraccio' }
    ]
  },
  mer: {
    name: 'Gambe & Spalle',
    label: 'Giorno 2 · Mercoledì',
    exercises: [
      { id:'m1', name:'Hack Squat', target:'Quadricipiti, glutei', sets:4, reps:'8-10', rest:150,
        cue:'Piedi a metà pedana, larghezza spalle. Scendi controllato fino a coscia parallela. Spingi dai talloni, non bloccare ginocchia in alto.',
        video:'hack squat machine tutorial' },
      { id:'m2', name:'Pressa 45°', target:'Quadricipiti, glutei', sets:4, reps:'10-12', rest:120,
        cue:'Piedi alti+larghi → più glutei/femorali. Piedi bassi+stretti → più quadricipiti. Schiena sempre piatta sullo schienale.',
        video:'pressa 45 gradi tecnica' },
      { id:'m3', name:'Leg Extension', target:'Quadricipiti', sets:3, reps:'12-15', rest:75,
        cue:'Estendi completamente, contrai 1 sec in alto. Eccentrica controllata 2-3 sec. Niente slancio.',
        video:'leg extension corretto quadricipiti' },
      { id:'m4', name:'Leg Curl', target:'Femorali', sets:4, reps:'10-12', rest:90,
        cue:'Spingi le anche verso il pad, non staccare il bacino. Range completo, 1 sec di squeeze in contrazione.',
        video:'leg curl femorali sdraiato' },
      { id:'m5', name:'Calf (pressa o standing)', target:'Polpacci', sets:4, reps:'12-15', rest:60,
        cue:'Massima estensione in alto (1 sec pausa), massimo allungamento in basso (1 sec pausa). Lavora il ROM completo.',
        video:'calf raise polpacci pressa' },
      { id:'m6', name:'Lento avanti con manubri', target:'Deltoidi anteriori+laterali, tricipiti', sets:4, reps:'8-12', rest:120,
        cue:'Schiena appoggiata, gomiti leggermente avanti rispetto alle spalle (non sul piano frontale puro). Non bloccare i gomiti.',
        video:'shoulder press manubri seduto' },
      { id:'m7', name:'Alzate laterali', target:'Deltoide laterale', sets:4, reps:'12-15', rest:60,
        cue:'Leggera flessione busto in avanti. I gomiti guidano. Mignolo leggermente più alto del pollice in alto. Niente swing.',
        video:'alzate laterali deltoide tutorial' },
      { id:'m8', name:'Alzate frontali', target:'Deltoide anteriore', sets:3, reps:'12-15', rest:60,
        cue:'Solleva fino all\'altezza spalla. Eccentrica controllata. Evita di compensare con il trapezio.',
        video:'alzate frontali manubri' },
      { id:'m9', name:'Rear delt (face pull o reverse fly)', target:'Deltoide posteriore, rotatori', sets:4, reps:'12-15', rest:60,
        cue:'Tira con i gomiti, separa le mani all\'altezza degli occhi. Squeeze scapolare. KEY per postura.',
        video:'face pull rear delt tutorial' }
    ]
  },
  ven: {
    name: 'Petto & Bicipiti + Avambracci',
    label: 'Giorno 3 · Venerdì',
    exercises: [
      { id:'v1', name:'Panca piana bilanciere', target:'Pettorali, deltoidi ant., tricipiti', sets:4, reps:'6-8', rest:150,
        cue:'Scapole retratte e abbassate (arco fisiologico). Bilanciere tocca leggermente lo sterno. Spingi anche con i piedi a terra.',
        video:'panca piana bilanciere tecnica corretta' },
      { id:'v2', name:'Panca inclinata con manubri (30-45°)', target:'Pettorale alto, deltoidi ant.', sets:4, reps:'8-10', rest:120,
        cue:'Manubri in linea con i capezzoli, palmi avanti. Scendi controllato, in alto non far toccare i manubri (mantieni tensione).',
        video:'panca inclinata manubri 30 gradi' },
      { id:'v3', name:'Chest press macchina', target:'Pettorale medio', sets:3, reps:'10-12', rest:90,
        cue:'Schiena appoggiata, impugnatura in linea coi capezzoli. Pausa 1 sec di squeeze al picco.',
        video:'chest press macchina petto' },
      { id:'v4', name:'Pectoral machine (croci)', target:'Pettorale (adduzione)', sets:3, reps:'12-15', rest:75,
        cue:'Gomiti leggermente piegati e fissi. Focus sulla contrazione, non sul peso. Squeeze 1 sec al centro.',
        video:'pectoral machine croci petto' },
      { id:'v5', name:'Curl cavo basso con sbarra', target:'Bicipiti (entrambi i capi)', sets:4, reps:'8-12', rest:90,
        cue:'Gomiti FISSI ai fianchi. Niente swing del busto. Solo gli avambracci si muovono. Eccentrica 2 sec.',
        video:'curl cavo basso sbarra bicipiti' },
      { id:'v6', name:'Curl con manubri', target:'Bicipiti (capo lungo)', sets:3, reps:'10-12', rest:90,
        cue:'Supina il polso ruotando durante la salita (palmo verso l\'alto). Picco di contrazione 1 sec.',
        video:'curl manubri bicipiti tecnica' },
      { id:'v7', name:'Hammer curl (martello)', target:'Brachiale, brachioradiale', sets:3, reps:'10-12', rest:75,
        cue:'Presa neutra fissa per tutto il movimento. Gomiti fermi. Costruisce volume "spessore" del braccio.',
        video:'hammer curl bicipiti brachiale' },
      { id:'v8', name:'Avambracci proni (reverse curl)', target:'Brachioradiale, estensori', sets:3, reps:'12-15', rest:60,
        cue:'Bilanciere piccolo, presa pronata. Gomiti fissi. Eccentrica lenta.',
        video:'reverse curl bilanciere avambracci' },
      { id:'v9', name:'Avambracci supini (wrist curl)', target:'Flessori avambraccio', sets:3, reps:'15-20', rest:45,
        cue:'Avambracci appoggiati, palmi in su. Range completo. Ottimo come finisher.',
        video:'wrist curl flessori avambraccio' }
    ]
  },
  extra: {
    name: 'Richiamo Upper (opzionale)',
    label: 'Giorno 4 · Bonus',
    exercises: [
      { id:'x1', name:'Lat machine (presa stretta)', target:'Dorso, bicipiti', sets:3, reps:'10-12', rest:90,
        cue:'Variante alla seduta del lunedì. Presa stretta neutra/supina per più coinvolgimento dorso basso.',
        video:'lat pulldown presa stretta' },
      { id:'x2', name:'Chest press o panca inclinata', target:'Pettorale', sets:3, reps:'10-12', rest:90,
        cue:'Carica al 70-80% di quanto fai il venerdì. Obiettivo: volume aggiuntivo a freschezza.',
        video:'chest press tutorial' },
      { id:'x3', name:'Alzate laterali (drop set)', target:'Deltoide laterale', sets:3, reps:'12+8+6', rest:60,
        cue:'Ultima serie: drop set triplice. Carico iniziale moderato → scendi 2 volte senza recupero.',
        video:'alzate laterali drop set' },
      { id:'x4', name:'Curl manubri o cavo', target:'Bicipiti', sets:3, reps:'12-15', rest:60,
        cue:'Range alto-rep per pump. Variante diversa da quella del venerdì.',
        video:'curl bicipiti high rep' },
      { id:'x5', name:'Push-down corda', target:'Tricipiti', sets:3, reps:'12-15', rest:60,
        cue:'Pump finale, ROM completo, focus sulla contrazione del capo laterale.',
        video:'pushdown corda tricipiti pump' },
      { id:'x6', name:'Face pull', target:'Rear delt, rotatori (postura)', sets:3, reps:'15-20', rest:45,
        cue:'Sempre presente nei richiami: rinforza i muscoli posturali, equilibrio con pressori.',
        video:'face pull postura rotatori' }
    ]
  },
  free: {
    name: 'Sessione libera',
    label: 'Allenamento senza scheda',
    exercises: []
  }
};

const DAYS_ORDER = ['lun','mer','ven','free'];
const LIBRARY_DAYS = ['lun','mer','ven','extra'];
const LIBRARY_DAY_LABELS = {
  lun: 'Lunedì',
  mer: 'Mercoledì',
  ven: 'Venerdì',
  extra: 'Richiamo'
};

/* ============== STATE ============== */
let state = {
  program: null,
  session: { day: null, date: null, sets: {} },
  sessions: {},
  history: [],
  activeDay: 'lun',
  view: 'workout',
  expanded: new Set(),
  editingExerciseId: null,
  librarySelection: new Set(),
  timer: { remaining: 0, total: 0, intervalId: null, exId: null }
};

/* ============== STORAGE LAYER (localStorage) ============== */
const KEYS = {
  PROGRAM: 'program-v1',
  SESSION: 'session-current',
  SESSIONS: 'sessions-current-v2',
  HISTORY: 'history',
};

async function storageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}
async function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    showToast('Errore salvataggio');
  }
}

/* ============== INIT ============== */
async function init() {
  state.program = await storageGet(KEYS.PROGRAM, DEFAULT_PROGRAM);
  for (const d of [...LIBRARY_DAYS, 'free']) {
    if (!state.program[d]) state.program[d] = DEFAULT_PROGRAM[d];
  }
  state.history = await storageGet(KEYS.HISTORY, []);
  const storedLegacySession = await storageGet(KEYS.SESSION, { day:null, date:null, sets:{} });
  const legacySession = migrateLegacyFreeSession(storedLegacySession);
  const storedSessions = await storageGet(KEYS.SESSIONS, null);
  state.sessions = normalizeSessions(storedSessions, legacySession);

  const today = new Date();
  const dow = today.getDay();
  const todayDay = dayForDow(dow);
  const legacyDay = DAYS_ORDER.includes(legacySession.day) ? legacySession.day : null;
  state.activeDay = (legacyDay && (hasSessionData(legacySession) || isToday(legacySession.date)))
    ? legacyDay
    : (todayDay || legacyDay || 'lun');
  setActiveDay(state.activeDay);
  await persistSessions();

  bindEvents();
  render();

  setTimeout(async () => {
    if (checkUnclosedSession(state.activeDay)) {
      setActiveDay(state.activeDay);
      await persistSessions();
      render();
    }
  }, 100);
}

function dayForDow(dow) {
  const dowToDay = { 1:'lun', 3:'mer', 5:'ven' };
  return dowToDay[dow] || null;
}

function normalizeSessions(storedSessions, legacySession) {
  const sessions = {};
  if (storedSessions && typeof storedSessions === 'object' && !Array.isArray(storedSessions)) {
    for (const day of DAYS_ORDER) {
      if (storedSessions[day]) sessions[day] = normalizeSession(storedSessions[day], day);
    }
    if (!sessions.free && storedSessions.extra) {
      sessions.free = normalizeSession(migrateLegacyFreeSession(storedSessions.extra), 'free');
    }
  }
  if (legacySession && DAYS_ORDER.includes(legacySession.day)) {
    const current = sessions[legacySession.day];
    if (!current || hasSessionData(legacySession) || (!hasSessionData(current) && isToday(legacySession.date))) {
      sessions[legacySession.day] = normalizeSession(legacySession, legacySession.day);
    }
  }
  return sessions;
}

function normalizeSession(session, day) {
  const normalized = {
    day,
    date: session && session.date ? session.date : dateKey(new Date()),
    sets: session && session.sets && typeof session.sets === 'object' ? session.sets : {}
  };
  if (day === 'free') {
    normalized.exercises = Array.isArray(session?.exercises)
      ? session.exercises.map(cloneExercise)
      : [];
  }
  return normalized;
}

function emptySession(day) {
  const session = { day, date: dateKey(new Date()), sets: {} };
  if (day === 'free') session.exercises = [];
  return session;
}

function migrateLegacyFreeSession(session) {
  if (!session || session.day !== 'extra') return session;
  if (!hasSessionData(session)) {
    return { day: 'free', date: session.date || dateKey(new Date()), sets: {}, exercises: [] };
  }
  return {
    ...session,
    day: 'free',
    exercises: Array.isArray(session.exercises)
      ? session.exercises
      : (state.program?.extra?.exercises || []).map(cloneExercise)
  };
}

function cloneExercise(ex) {
  return {
    id: ex.id,
    name: ex.name,
    target: ex.target || '',
    sets: Math.max(1, Number(ex.sets) || 3),
    reps: ex.reps || '8-12',
    rest: Math.max(15, Number(ex.rest) || 90),
    cue: ex.cue || '',
    video: ex.video || `${ex.name} tutorial`,
    ...(ex.sourceDay ? { sourceDay: ex.sourceDay } : {})
  };
}

function ensureDaySession(day) {
  let session = normalizeSession(state.sessions[day], day);
  if (!isToday(session.date) && !hasSessionData(session)) {
    session = emptySession(day);
  }
  state.sessions[day] = session;
  return session;
}

function checkUnclosedSession(day) {
  let session = state.sessions[day];
  if (!session) return false;
  
  session = normalizeSession(session, day);
  
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay()+6)%7));
  monday.setHours(0,0,0,0);
  
  if (session.date) {
    const sessionDate = dateFromKey(session.date);
    if (sessionDate < monday && hasSessionData(session)) {
      const formattedDate = fmtDate(session.date);
      const dayName = (state.program && state.program[day]) ? state.program[day].name : day;
      
      if (confirm(`Rilevata sessione non chiusa per "${dayName}" del ${formattedDate}.\n\nVuoi SALVARLA nello storico prima di iniziare il nuovo allenamento?\n\n(Cliccando su OK verrà salvata, su Annulla verrà cancellata)`)) {
        state.history.push({
          date: session.date,
          day: session.day,
          exerciseNames: exerciseNamesForSession(session),
          sets: JSON.parse(JSON.stringify(session.sets))
        });
        storageSet(KEYS.HISTORY, state.history);
        showToast('Sessione precedente salvata');
      } else {
        showToast('Sessione precedente cancellata');
      }
      state.sessions[day] = emptySession(day);
      return true;
    }
  }
  return false;
}

function setActiveDay(day) {
  state.activeDay = day;
  state.session = ensureDaySession(day);
}

async function persistSessions() {
  state.sessions[state.activeDay] = state.session;
  await storageSet(KEYS.SESSIONS, state.sessions);
  await storageSet(KEYS.SESSION, state.session);
}

function isToday(dateStr) {
  if (!dateStr) return false;
  return dateStr === dateKey(new Date());
}
function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}
function dateFromKey(dateStr) {
  const [y, m, d] = String(dateStr).split('-').map(Number);
  return new Date(y, m - 1, d);
}
function fmtDate(dateStr) {
  if (!dateStr) return '—';
  const d = dateFromKey(dateStr);
  return d.toLocaleDateString('it-IT', { weekday:'short', day:'2-digit', month:'short' });
}

/* ============== RENDER ============== */
function render() {
  document.getElementById('btnViewToggle').textContent = state.view === 'workout' ? 'Storico' : 'Allenamento';
  renderTabs();
  if (state.view === 'workout') {
    document.getElementById('workoutView').classList.remove('hidden');
    document.getElementById('historyView').classList.add('hidden');
    renderDay();
  } else {
    document.getElementById('workoutView').classList.add('hidden');
    document.getElementById('historyView').classList.remove('hidden');
    renderHistory();
  }
  renderStats();
}

function renderTabs() {
  document.querySelectorAll('nav.days button').forEach(b => {
    b.classList.toggle('active', b.dataset.day === state.activeDay);
  });
}

function renderDay() {
  const day = state.program[state.activeDay];
  const dateStr = state.session.date ? ` · ${fmtDate(state.session.date)}` : '';
  document.getElementById('dayNum').textContent = day.label + dateStr;
  document.getElementById('dayTitle').textContent = day.name;

  const container = document.getElementById('exercises');
  container.innerHTML = '';

  const exercises = exercisesForActiveSession();
  if (state.activeDay === 'free' && exercises.length === 0) {
    container.innerHTML = `
      <div class="free-empty">
        <strong>Parti da una sessione vuota</strong>
        <span>Aggiungi gli esercizi già salvati nelle tue schede e allenati nell'ordine che preferisci.</span>
      </div>
    `;
  }

  exercises.forEach((ex, idx) => {
    container.appendChild(exerciseCard(ex, idx));
  });

  document.getElementById('btnAddExercise').textContent =
    state.activeDay === 'free' ? '+ Scegli esercizi salvati' : '+ Aggiungi esercizio';
}

function exercisesForActiveSession() {
  if (state.activeDay === 'free') {
    if (!Array.isArray(state.session.exercises)) state.session.exercises = [];
    return state.session.exercises;
  }
  return state.program[state.activeDay].exercises;
}

function exerciseCard(ex, idx) {
  const card = document.createElement('div');
  card.className = 'exercise';
  card.dataset.id = ex.id;
  if (state.expanded.has(ex.id)) card.classList.add('expanded');

  const sessSets = state.session.sets[ex.id] || initSets(ex.sets);
  state.session.sets[ex.id] = sessSets;
  const doneCount = sessSets.filter(s => s.done).length;
  if (doneCount === sessSets.length && sessSets.length > 0) card.classList.add('complete');

  const last = findLastSessionFor(ex.id);

  card.innerHTML = `
    <div class="ex-head">
      <span class="ex-num">${String(idx+1).padStart(2,'0')}</span>
      <div class="ex-title-wrap">
        <div class="ex-title">${esc(ex.name)}</div>
        <div class="ex-sub"><b>${ex.sets}x${esc(ex.reps)}</b> · rec <b>${ex.rest}s</b> · ${esc(ex.target)}</div>
      </div>
      <span class="ex-sub" style="font-family:'JetBrains Mono',monospace;color:${doneCount===sessSets.length && doneCount>0?'var(--accent)':'var(--text-dimmer)'};">${doneCount}/${sessSets.length}</span>
      <span class="ex-chevron">▸</span>
    </div>
    <div class="ex-body">
      <div class="cue">
        <span class="cue-label">TECNICA</span>
        ${esc(ex.cue)}
      </div>
      <a class="video-link" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.video)}">
        Guarda su YouTube · ${esc(ex.video)}
      </a>
      ${last ? `<div class="history-line">Ultima volta (${fmtDate(last.date)}): <b>${last.summary}</b> <span class="pr" style="margin-left: 8px;">★ Migliore: ${last.top.w}×${last.top.r}</span></div>` : ''}
      <div class="sets-wrap">
        <div class="sets-header">
          <div>Set</div>
          <div>Kg</div>
          <div>Reps</div>
          <div>Target</div>
          <div>OK</div>
        </div>
        ${sessSets.map((s, i) => `
          <div class="set-row ${s.done?'done':''}" data-set="${i}">
            <div class="set-num">${i+1}</div>
            <input class="set-input" data-field="w" type="number" inputmode="decimal" step="0.5" value="${s.w ?? ''}" placeholder="—">
            <input class="set-input" data-field="r" type="number" inputmode="numeric" value="${s.r ?? ''}" placeholder="—">
            <div class="set-hint">${esc(ex.reps)}</div>
            <button class="set-check" data-action="toggle">${s.done?'✓':''}</button>
          </div>
        `).join('')}
      </div>
      <div class="set-actions">
        <div class="left">
          <button class="mini-btn" data-action="addset">+ serie</button>
          <button class="mini-btn" data-action="removeset">− serie</button>
          <button class="mini-btn" data-action="reset">Reset</button>
        </div>
        <div class="right">
          ${state.activeDay === 'free'
            ? '<button class="mini-btn danger" data-action="remove">Rimuovi</button>'
            : '<button class="mini-btn" data-action="edit">Modifica</button><button class="mini-btn danger" data-action="delete">Elimina</button>'}
        </div>
      </div>
    </div>
  `;

  card.querySelector('.ex-head').addEventListener('click', (e) => {
    if (e.target.closest('button, input, a')) return;
    toggleExpand(ex.id);
  });

  card.querySelectorAll('.set-row').forEach(row => {
    const setIdx = parseInt(row.dataset.set);
    row.querySelectorAll('.set-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        const val = e.target.value === '' ? null : parseFloat(e.target.value);
        sessSets[setIdx][field] = isNaN(val) ? null : val;
        saveSession();
      });
    });
    row.querySelector('[data-action="toggle"]').addEventListener('click', () => {
      sessSets[setIdx].done = !sessSets[setIdx].done;
      if (sessSets[setIdx].done) {
        startRestTimer(ex.rest, ex.name + ' · serie ' + (setIdx+1), ex.id);
      }
      saveSession();
      render();
    });
  });

  card.querySelector('[data-action="addset"]').addEventListener('click', () => {
    sessSets.push({ w:null, r:null, done:false });
    saveSession();
    render();
  });
  card.querySelector('[data-action="removeset"]').addEventListener('click', () => {
    if (sessSets.length > 1) {
      sessSets.pop();
      saveSession();
      render();
    }
  });
  card.querySelector('[data-action="reset"]').addEventListener('click', () => {
    if (confirm('Cancellare i dati di questa sessione per ' + ex.name + '?')) {
      state.session.sets[ex.id] = initSets(ex.sets);
      saveSession();
      render();
    }
  });
  const editButton = card.querySelector('[data-action="edit"]');
  const deleteButton = card.querySelector('[data-action="delete"]');
  const removeButton = card.querySelector('[data-action="remove"]');
  if (editButton) editButton.addEventListener('click', () => openEdit(ex.id));
  if (deleteButton) deleteButton.addEventListener('click', () => deleteExercise(ex.id));
  if (removeButton) removeButton.addEventListener('click', () => removeExerciseFromFreeSession(ex.id));

  return card;
}

function initSets(n) {
  return Array.from({length: n}, () => ({ w:null, r:null, done:false }));
}

function toggleExpand(id) {
  if (state.expanded.has(id)) state.expanded.delete(id);
  else state.expanded.add(id);
  render();
}

function esc(s) {
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ============== STATS ============== */
function renderStats() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay()+6)%7));
  monday.setHours(0,0,0,0);
  document.getElementById('weekNum').textContent = isoWeek(now);

  let vol = 0, setsCount = 0;
  const sessions = [
    ...state.history,
    ...Object.values(state.sessions || {}).filter(s => s && s.day && s.sets)
  ];
  for (const s of sessions) {
    const d = dateFromKey(s.date);
    if (d >= monday) {
      for (const exId in s.sets) {
        for (const set of s.sets[exId]) {
          if (isCompletedSet(set)) {
            vol += Number(set.w) * Number(set.r);
            setsCount++;
          }
        }
      }
    }
  }
  document.getElementById('weekVol').textContent = vol.toLocaleString('it-IT');
  document.getElementById('weekSets').textContent = setsCount;
}

function isoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
  return Math.ceil((((date - yearStart) / 86400000) + 1)/7);
}

/* ============== HISTORY ============== */
function findLastSessionFor(exId) {
  for (let i = state.history.length - 1; i >= 0; i--) {
    const s = state.history[i];
    if (s.sets[exId]) {
      const done = s.sets[exId].filter(isCompletedSet);
      if (done.length === 0) continue;
      const top = done.reduce((a,b) => (Number(a.w)*Number(a.r) > Number(b.w)*Number(b.r) ? a : b));
      const summary = done.map(x => `${x.w}×${x.r}`).join(', ');
      return { date: s.date, summary, top };
    }
  }
  return null;
}

function exerciseNamesForSession(session) {
  const exercises = session.day === 'free'
    ? (session.exercises || [])
    : (state.program[session.day]?.exercises || []);
  return exercises.reduce((names, ex) => {
    names[ex.id] = ex.name;
    return names;
  }, {});
}

function renderHistory() {
  const container = document.getElementById('historyList');
  if (state.history.length === 0) {
    container.innerHTML = '<div class="empty">Nessuna sessione registrata. Completa una giornata e chiudila per vederla qui.</div>';
    return;
  }
  container.innerHTML = '';
  const sorted = [...state.history].reverse();
  for (const s of sorted) {
    const day = state.program[s.day];
    const card = document.createElement('div');
    card.className = 'history-card';
    const exNames = day ? day.name : s.day;
    card.innerHTML = `
      <h4>${esc(exNames)}</h4>
      <div class="h-date">${fmtDate(s.date)}</div>
      ${Object.keys(s.sets).map(exId => {
        const sets = s.sets[exId].filter(isCompletedSet);
        if (sets.length === 0) return '';
        const exDef = day && day.exercises.find(e => e.id === exId);
        const name = s.exerciseNames?.[exId] || (exDef ? exDef.name : exId);
        return `<div class="h-ex"><b>${esc(name)}</b><span class="sets">${sets.map(x => x.w+'×'+x.r).join(' · ')}</span></div>`;
      }).join('')}
    `;
    container.appendChild(card);
  }
}

/* ============== SAVE ============== */
let saveTimer = null;
function saveSession() {
  clearTimeout(saveTimer);
  state.sessions[state.activeDay] = state.session;
  saveTimer = setTimeout(() => persistSessions(), 400);
}

function hasSetEntry(set) {
  return Boolean(set && (
    set.done ||
    (set.w !== null && set.w !== undefined && set.w !== '') ||
    (set.r !== null && set.r !== undefined && set.r !== '')
  ));
}

function hasNumericValue(value) {
  return value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value));
}

function isCompletedSet(set) {
  return Boolean(set && set.done && hasNumericValue(set.w) && hasNumericValue(set.r));
}

function hasSessionData(session) {
  return Object.values(session.sets || {}).some(arr =>
    Array.isArray(arr) && arr.some(hasSetEntry)
  );
}

async function saveProgram() {
  await storageSet(KEYS.PROGRAM, state.program);
}

async function finishDay() {
  const hasData = Object.values(state.session.sets).some(arr =>
    arr.some(isCompletedSet)
  );
  if (!hasData) {
    if (!confirm('Nessuna serie completata. Chiudere comunque senza salvare nello storico?')) return;
    state.session = emptySession(state.activeDay);
    state.sessions[state.activeDay] = state.session;
    await persistSessions();
    stopTimer();
    render();
    return;
  }
  if (!confirm('Chiudere la sessione e salvarla nello storico?')) return;
  state.history.push({
    date: state.session.date,
    day: state.session.day,
    exerciseNames: exerciseNamesForSession(state.session),
    sets: JSON.parse(JSON.stringify(state.session.sets))
  });
  await storageSet(KEYS.HISTORY, state.history);
  state.session = emptySession(state.activeDay);
  state.sessions[state.activeDay] = state.session;
  await persistSessions();
  stopTimer();
  showToast('Sessione salvata');
  render();
}

async function resetDay() {
  if (!confirm('Cancellare i dati di oggi (non ancora salvati nello storico)?')) return;
  state.session = emptySession(state.activeDay);
  state.sessions[state.activeDay] = state.session;
  await persistSessions();
  stopTimer();
  render();
}

async function clearHistory() {
  if (!confirm('CANCELLARE TUTTO LO STORICO? Operazione irreversibile.')) return;
  state.history = [];
  await storageSet(KEYS.HISTORY, []);
  render();
}

/* ============== FREE SESSION LIBRARY ============== */
function savedExerciseLibrary() {
  const seen = new Set();
  const library = [];
  for (const dayKey of LIBRARY_DAYS) {
    const exercises = state.program[dayKey]?.exercises || [];
    for (const ex of exercises) {
      if (seen.has(ex.id)) continue;
      seen.add(ex.id);
      library.push({ ...cloneExercise(ex), sourceDay: dayKey });
    }
  }
  return library;
}

function openExerciseLibrary() {
  state.librarySelection.clear();
  document.getElementById('librarySearch').value = '';
  document.getElementById('libraryModal').classList.add('active');
  renderExerciseLibrary();
  document.getElementById('librarySearch').focus();
}

function closeExerciseLibrary() {
  document.getElementById('libraryModal').classList.remove('active');
  state.librarySelection.clear();
}

function renderExerciseLibrary() {
  const container = document.getElementById('libraryList');
  const query = document.getElementById('librarySearch').value.trim().toLocaleLowerCase('it');
  const existingIds = new Set((state.session.exercises || []).map(ex => ex.id));
  const library = savedExerciseLibrary().filter(ex => {
    if (!query) return true;
    return `${ex.name} ${ex.target} ${LIBRARY_DAY_LABELS[ex.sourceDay] || ''}`
      .toLocaleLowerCase('it')
      .includes(query);
  });

  if (library.length === 0) {
    container.innerHTML = '<div class="library-empty">Nessun esercizio trovato.</div>';
  } else {
    container.innerHTML = library.map(ex => {
      const alreadyAdded = existingIds.has(ex.id);
      const selected = state.librarySelection.has(ex.id);
      return `
        <label class="library-item ${alreadyAdded ? 'disabled' : ''} ${selected ? 'selected' : ''}">
          <input type="checkbox" value="${esc(ex.id)}" ${alreadyAdded ? 'disabled' : ''} ${selected ? 'checked' : ''}>
          <span>
            <span class="library-name">${esc(ex.name)}</span>
            <span class="library-target">${esc(ex.target)}</span>
          </span>
          <span class="${alreadyAdded ? 'library-added' : 'library-source'}">
            ${alreadyAdded ? 'Aggiunto' : esc(LIBRARY_DAY_LABELS[ex.sourceDay] || ex.sourceDay)}
          </span>
        </label>
      `;
    }).join('');
  }

  container.querySelectorAll('input[type="checkbox"]:not(:disabled)').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) state.librarySelection.add(input.value);
      else state.librarySelection.delete(input.value);
      input.closest('.library-item').classList.toggle('selected', input.checked);
      updateLibraryCount();
    });
  });
  updateLibraryCount();
}

function updateLibraryCount() {
  const count = state.librarySelection.size;
  document.getElementById('libraryCount').textContent = count;
  document.getElementById('libraryAdd').disabled = count === 0;
}

async function addSelectedExercises() {
  if (state.librarySelection.size === 0) return;
  const existingIds = new Set((state.session.exercises || []).map(ex => ex.id));
  const chosen = savedExerciseLibrary()
    .filter(ex => state.librarySelection.has(ex.id) && !existingIds.has(ex.id))
    .map(cloneExercise);

  state.session.exercises.push(...chosen);
  for (const ex of chosen) {
    state.session.sets[ex.id] = initSets(ex.sets);
  }
  await persistSessions();
  closeExerciseLibrary();
  render();
  showToast(chosen.length === 1 ? 'Esercizio aggiunto' : `${chosen.length} esercizi aggiunti`);
}

async function removeExerciseFromFreeSession(exId) {
  const ex = state.session.exercises?.find(item => item.id === exId);
  if (!ex) return;
  if (!confirm(`Rimuovere "${ex.name}" da questa sessione?`)) return;
  state.session.exercises = state.session.exercises.filter(item => item.id !== exId);
  delete state.session.sets[exId];
  state.expanded.delete(exId);
  if (state.timer.exId === exId) stopTimer();
  await persistSessions();
  render();
  showToast('Esercizio rimosso');
}

/* ============== EDIT MODAL ============== */
function openEdit(exId) {
  state.editingExerciseId = exId;
  const day = state.program[state.activeDay];
  const ex = day.exercises.find(e => e.id === exId);
  if (!ex) return;
  document.getElementById('editTitle').textContent = 'Modifica · ' + ex.name;
  document.getElementById('ed-name').value = ex.name;
  document.getElementById('ed-target').value = ex.target;
  document.getElementById('ed-sets').value = ex.sets;
  document.getElementById('ed-reps').value = ex.reps;
  document.getElementById('ed-rest').value = ex.rest;
  document.getElementById('ed-cue').value = ex.cue;
  document.getElementById('ed-video').value = ex.video;
  document.getElementById('ed-delete').classList.remove('hidden');
  document.getElementById('editModal').classList.add('active');
}

function openAdd() {
  state.editingExerciseId = null;
  document.getElementById('editTitle').textContent = 'Nuovo esercizio';
  document.getElementById('ed-name').value = '';
  document.getElementById('ed-target').value = '';
  document.getElementById('ed-sets').value = 3;
  document.getElementById('ed-reps').value = '10-12';
  document.getElementById('ed-rest').value = 90;
  document.getElementById('ed-cue').value = '';
  document.getElementById('ed-video').value = '';
  document.getElementById('ed-delete').classList.add('hidden');
  document.getElementById('editModal').classList.add('active');
}

function closeEdit() {
  document.getElementById('editModal').classList.remove('active');
  state.editingExerciseId = null;
}

async function saveEdit() {
  const day = state.program[state.activeDay];
  const editingId = state.editingExerciseId;
  const wasEditing = Boolean(editingId);
  const data = {
    name: document.getElementById('ed-name').value.trim() || 'Esercizio',
    target: document.getElementById('ed-target').value.trim(),
    sets: Math.max(1, parseInt(document.getElementById('ed-sets').value) || 3),
    reps: document.getElementById('ed-reps').value.trim() || '8-12',
    rest: Math.max(15, parseInt(document.getElementById('ed-rest').value) || 90),
    cue: document.getElementById('ed-cue').value.trim(),
    video: document.getElementById('ed-video').value.trim() || (document.getElementById('ed-name').value + ' tutorial')
  };
  if (wasEditing) {
    const ex = day.exercises.find(e => e.id === editingId);
    if (!ex) return;
    const sess = state.session.sets[ex.id];
    if (sess) {
      const removedSets = sess.slice(data.sets);
      if (removedSets.some(hasSetEntry) && !confirm('Ridurre il numero di serie eliminera dati compilati. Continuare?')) return;
      while (sess.length < data.sets) sess.push({ w:null, r:null, done:false });
      while (sess.length > data.sets) sess.pop();
    }
    Object.assign(ex, data);
  } else {
    const newId = 'u' + Date.now();
    day.exercises.push({ id:newId, ...data });
    state.session.sets[newId] = initSets(data.sets);
  }
  await saveProgram();
  await persistSessions();
  closeEdit();
  render();
  showToast(wasEditing ? 'Esercizio aggiornato' : 'Esercizio aggiunto');
}

async function deleteExercise(exId) {
  const day = state.program[state.activeDay];
  const ex = day.exercises.find(e => e.id === exId);
  if (!ex) return;
  if (!confirm('Eliminare definitivamente "' + ex.name + '" dal programma?')) return;
  day.exercises = day.exercises.filter(e => e.id !== exId);
  delete state.session.sets[exId];
  state.expanded.delete(exId);
  if (state.timer.exId === exId) stopTimer();
  await saveProgram();
  await persistSessions();
  closeEdit();
  render();
  showToast('Esercizio eliminato');
}

/* ============== REST TIMER ============== */
function startRestTimer(seconds, label, exId) {
  stopTimer();
  state.timer.total = seconds;
  state.timer.exId = exId;
  state.timer.endTime = Date.now() + seconds * 1000;
  document.getElementById('restLabel').textContent = label;
  const elTimer = document.getElementById('restTimer');
  elTimer.classList.add('active');
  elTimer.classList.remove('warn','done');
  
  const getRemaining = () => Math.max(0, Math.round((state.timer.endTime - Date.now()) / 1000));
  state.timer.remaining = getRemaining();
  updateTimerDisplay();
  
  state.timer.intervalId = setInterval(() => {
    const remaining = getRemaining();
    state.timer.remaining = remaining;
    
    if (remaining <= 10 && remaining > 0) {
      elTimer.classList.add('warn');
    } else {
      elTimer.classList.remove('warn');
    }
    
    if (remaining <= 0) {
      elTimer.classList.remove('warn');
      elTimer.classList.add('done');
      document.getElementById('restTime').textContent = 'GO';
      clearInterval(state.timer.intervalId);
      state.timer.intervalId = null;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        osc.start(); osc.stop(ctx.currentTime + 0.4);
      } catch(e) {}
      // vibrazione su mobile (se supportata)
      try { if (navigator.vibrate) navigator.vibrate([120, 60, 120]); } catch(e) {}
      setTimeout(() => { elTimer.classList.remove('active','done'); }, 4000);
      return;
    }
    updateTimerDisplay();
  }, 1000);
}
function updateTimerDisplay() {
  const r = Math.max(0, state.timer.remaining);
  const m = Math.floor(r/60), s = r%60;
  document.getElementById('restTime').textContent =
    String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}
function stopTimer() {
  if (state.timer.intervalId) clearInterval(state.timer.intervalId);
  state.timer.intervalId = null;
  state.timer.remaining = 0;
  document.getElementById('restTimer').classList.remove('active','warn','done');
}

/* ============== TOAST + UPDATE BANNER ============== */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

function showUpdateBanner(onAccept) {
  let banner = document.getElementById('updateBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'updateBanner';
    banner.className = 'update-banner';
    banner.innerHTML = '<span>Nuova versione</span> <button>Aggiorna</button>';
    document.body.appendChild(banner);
  }
  banner.classList.add('show');
  banner.querySelector('button').onclick = () => {
    banner.classList.remove('show');
    onAccept();
  };
}

/* ============== EVENTS ============== */
function bindEvents() {
  document.querySelectorAll('nav.days button').forEach(b => {
    b.addEventListener('click', async () => {
      const nextDay = b.dataset.day;
      if (state.activeDay !== nextDay) {
        state.sessions[state.activeDay] = state.session;
        checkUnclosedSession(nextDay);
        setActiveDay(nextDay);
        stopTimer();
        await persistSessions();
      }
      state.view = 'workout';
      render();
    });
  });

  document.getElementById('btnViewToggle').addEventListener('click', () => {
    state.view = (state.view === 'workout') ? 'history' : 'workout';
    document.getElementById('btnViewToggle').textContent = state.view === 'workout' ? 'Storico' : 'Allenamento';
    render();
  });

  document.getElementById('btnResetDay').addEventListener('click', resetDay);
  document.getElementById('btnFinishDay').addEventListener('click', finishDay);
  document.getElementById('btnAddExercise').addEventListener('click', () => {
    if (state.activeDay === 'free') openExerciseLibrary();
    else openAdd();
  });
  document.getElementById('btnClearHistory').addEventListener('click', clearHistory);

  document.getElementById('librarySearch').addEventListener('input', renderExerciseLibrary);
  document.getElementById('libraryCancel').addEventListener('click', closeExerciseLibrary);
  document.getElementById('libraryAdd').addEventListener('click', addSelectedExercises);
  document.getElementById('libraryModal').addEventListener('click', (e) => {
    if (e.target.id === 'libraryModal') closeExerciseLibrary();
  });

  document.getElementById('ed-cancel').addEventListener('click', closeEdit);
  document.getElementById('ed-save').addEventListener('click', saveEdit);
  document.getElementById('ed-delete').addEventListener('click', () => {
    if (state.editingExerciseId) deleteExercise(state.editingExerciseId);
  });
  document.getElementById('editModal').addEventListener('click', (e) => {
    if (e.target.id === 'editModal') closeEdit();
  });

  document.getElementById('restSkip').addEventListener('click', stopTimer);
  document.getElementById('restAdd15').addEventListener('click', () => {
    if (state.timer.intervalId && state.timer.endTime) {
      state.timer.endTime += 15000;
      state.timer.remaining = Math.max(0, Math.round((state.timer.endTime - Date.now()) / 1000));
      updateTimerDisplay();
    }
  });
}

/* ============== GO ============== */
init();
