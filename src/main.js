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
      { id:'m7', name:'Alzate laterali', variants:['Manubri','Cavo basso','Cavigliera al cavo','Multi flight'], target:'Deltoide laterale', sets:4, reps:'12-15', rest:60,
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
      { id:'x3', name:'Alzate laterali', variants:['Manubri','Cavo basso','Cavigliera al cavo','Multi flight'], target:'Deltoide laterale', sets:3, reps:'12-15', rest:60,
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

/* Esercizi sempre disponibili nella libreria, anche per installazioni esistenti. */
const BASE_EXERCISE_LIBRARY = [
  { id:'base-squat', name:'Squat', variants:['Bilanciere','Front squat','Goblet squat'], target:'Quadricipiti, glutei, core', sets:4, reps:'6-10', rest:150, cue:'Schiena neutra, ginocchia in linea con i piedi e discesa controllata.', video:'squat tecnica corretta' },
  { id:'base-deadlift', name:'Stacco', variants:['Convenzionale','Rumeno','Sumo'], target:'Catena posteriore, dorso, core', sets:3, reps:'6-10', rest:150, cue:'Crea tensione prima di partire e mantieni il carico vicino al corpo.', video:'deadlift tecnica corretta' },
  { id:'base-hip-thrust', name:'Hip thrust', variants:['Bilanciere','Macchina','Smith machine'], target:'Glutei', sets:4, reps:'8-12', rest:120, cue:'Mentone leggermente chiuso e bacino in retroversione al picco.', video:'hip thrust tecnica' },
  { id:'base-lunges', name:'Affondi', variants:['Manubri','Bilanciere','Camminati','Indietro'], target:'Quadricipiti, glutei', sets:3, reps:'8-12 per lato', rest:90, cue:'Passo stabile e ginocchio in linea con il piede.', video:'affondi tecnica corretta' },
  { id:'base-bulgarian', name:'Bulgarian split squat', variants:['Manubri','Bilanciere','Smith machine'], target:'Quadricipiti, glutei', sets:3, reps:'8-12 per lato', rest:90, cue:'Carica la gamba davanti e mantieni il bacino stabile.', video:'bulgarian split squat tecnica' },
  { id:'base-leg-curl', name:'Leg curl', variants:['Seduto','Sdraiato','In piedi'], target:'Femorali', sets:3, reps:'10-15', rest:75, cue:'Bacino fermo e chiusura completa senza slancio.', video:'leg curl tecnica' },
  { id:'base-calf-raise', name:'Calf raise', variants:['Seduto','In piedi','Pressa'], target:'Polpacci', sets:4, reps:'12-20', rest:60, cue:'Pausa in massimo allungamento e massima contrazione.', video:'calf raise tecnica' },
  { id:'base-adductor', name:'Adductor machine', variants:[], target:'Adduttori', sets:3, reps:'12-20', rest:60, cue:'Movimento controllato, senza rimbalzo in apertura.', video:'adductor machine tecnica' },

  { id:'base-pullup', name:'Trazioni', variants:['Presa prona','Presa supina','Presa neutra','Assistite'], target:'Gran dorsale, bicipiti', sets:4, reps:'6-10', rest:120, cue:'Parti con scapole attive e completa la discesa in controllo.', video:'trazioni tecnica corretta' },
  { id:'base-row', name:'Rematore', variants:['Bilanciere','Manubrio','T-bar','Row machine'], target:'Dorso, romboidi, bicipiti', sets:4, reps:'8-12', rest:120, cue:'Busto stabile e gomiti verso il retro, senza strattoni.', video:'rematore tecnica corretta' },
  { id:'base-lat-machine', name:'Lat machine', variants:['Presa larga','Presa neutra','Presa stretta','Presa supina'], target:'Gran dorsale, bicipiti', sets:4, reps:'8-12', rest:90, cue:'Petto alto e gomiti verso i fianchi senza oscillare col busto.', video:'lat machine tecnica' },
  { id:'base-seated-row', name:'Pulley basso', variants:['Triangolo','Presa larga','Corda'], target:'Dorso, romboidi', sets:3, reps:'10-15', rest:90, cue:'Non oscillare con il busto; chiudi i gomiti dietro.', video:'pulley basso tecnica' },

  { id:'base-flat-bench', name:'Panca piana', variants:['Bilanciere','Manubri','Smith machine','Presa stretta'], target:'Pettorali, tricipiti', sets:4, reps:'6-10', rest:120, cue:'Scapole addotte e traiettoria stabile durante tutta la ripetizione.', video:'panca piana tecnica' },
  { id:'base-incline-bench', name:'Panca inclinata', variants:['Bilanciere','Manubri','Smith machine'], target:'Pettorale alto, tricipiti', sets:4, reps:'8-12', rest:120, cue:'Panca moderatamente inclinata e scapole ferme.', video:'panca inclinata tecnica' },
  { id:'base-dips', name:'Dip alle parallele', variants:['Focus petto','Focus tricipiti','Assistite'], target:'Pettorali, tricipiti', sets:3, reps:'6-12', rest:120, cue:'Discesa controllata e spalle lontane dalle orecchie.', video:'dip parallele tecnica' },
  { id:'base-cable-fly', name:'Croci ai cavi', variants:['Dall’alto','Orizzontali','Dal basso'], target:'Pettorali', sets:3, reps:'12-15', rest:60, cue:'Gomiti morbidi e traiettoria ad arco senza perdere tensione.', video:'croci ai cavi tecnica' },
  { id:'base-pushup', name:'Piegamenti', variants:['Standard','Piedi rialzati','Zavorrati'], target:'Pettorali, tricipiti, core', sets:3, reps:'AMRAP tecnico', rest:75, cue:'Corpo in linea e petto verso il pavimento.', video:'push up tecnica corretta' },

  { id:'base-shoulder-press', name:'Shoulder press', variants:['Manubri','Bilanciere','Arnold press','Macchina'], target:'Deltoidi, tricipiti', sets:4, reps:'8-12', rest:120, cue:'Addome attivo e traiettoria controllata senza sollevare le spalle.', video:'shoulder press tecnica' },
  { id:'base-lateral-raise', name:'Alzate laterali', variants:['Manubri','Cavo basso','Cavigliera al cavo','Multi flight'], target:'Deltoide laterale', sets:4, reps:'12-20', rest:60, cue:'Guida con i gomiti, mantieni il polso neutro e limita lo slancio.', video:'alzate laterali tecnica' },
  { id:'base-rear-delt', name:'Deltoide posteriore', variants:['Reverse pec deck','Croci ai cavi','Manubri'], target:'Deltoide posteriore, romboidi', sets:4, reps:'12-20', rest:60, cue:'Petto stabile e braccia aperte senza compensare col trapezio.', video:'rear delt fly tecnica' },

  { id:'base-curl', name:'Curl bicipiti', variants:['Bilanciere EZ','Manubri','Panca Scott','Manubri su inclinata','Cavo basso'], target:'Bicipiti', sets:3, reps:'8-12', rest:75, cue:'Gomiti fermi e discesa completa in controllo.', video:'curl bicipiti tecnica' },
  { id:'base-hammer-curl', name:'Hammer curl', variants:['Manubri','Corda al cavo'], target:'Brachiale, brachioradiale', sets:3, reps:'10-15', rest:75, cue:'Presa neutra e gomiti fermi vicino ai fianchi.', video:'hammer curl tecnica' },
  { id:'base-overhead-triceps', name:'Estensioni tricipiti sopra la testa', variants:['Cavo','Manubrio','Bilanciere EZ'], target:'Tricipite capo lungo', sets:3, reps:'10-15', rest:75, cue:'Gomiti stretti e allungamento completo dietro la testa.', video:'overhead triceps extension tecnica' },
  { id:'base-pushdown', name:'Push-down', variants:['Sbarra','Corda','Presa inversa'], target:'Tricipiti', sets:3, reps:'10-15', rest:75, cue:'Gomiti fermi ai fianchi ed estensione completa.', video:'triceps pushdown tecnica' },

  { id:'base-cable-crunch', name:'Crunch', variants:['Cavo','Macchina','Corpo libero'], target:'Retto addominale', sets:3, reps:'12-20', rest:60, cue:'Fletti il busto con l’addome senza tirare con le braccia.', video:'crunch addominali tecnica' },
  { id:'base-leg-raise', name:'Leg raise', variants:['Alla sbarra','Alle parallele','Su panca'], target:'Addome, flessori anca', sets:3, reps:'8-15', rest:60, cue:'Evita lo slancio e chiudi il bacino verso le costole.', video:'leg raise tecnica' },
  { id:'base-plank', name:'Plank', variants:['Frontale','Laterale','Zavorrato'], target:'Core', sets:3, reps:'30-60 sec', rest:60, cue:'Glutei stretti e bacino neutro.', video:'plank tecnica corretta' }
];

const LEGACY_BASE_PARENT_IDS = new Map(Object.entries({
  'base-squat-barbell':'base-squat', 'base-front-squat':'base-squat',
  'base-rdl':'base-deadlift', 'base-deadlift':'base-deadlift',
  'base-hip-thrust':'base-hip-thrust', 'base-lunges-db':'base-lunges',
  'base-bulgarian':'base-bulgarian', 'base-leg-curl-seated':'base-leg-curl',
  'base-calf-seated':'base-calf-raise', 'base-adductor':'base-adductor',
  'base-pullup':'base-pullup', 'base-chinup':'base-pullup',
  'base-row-barbell':'base-row', 'base-row-db':'base-row', 'base-row-tbar':'base-row',
  'base-lat-neutral':'base-lat-machine', 'base-lat-wide':'base-lat-machine',
  'base-seated-row-neutral':'base-seated-row',
  'base-bench-db':'base-flat-bench', 'base-close-grip-bench':'base-flat-bench',
  'base-incline-barbell':'base-incline-bench', 'base-dips-chest':'base-dips',
  'base-cable-fly-high':'base-cable-fly', 'base-cable-fly-low':'base-cable-fly',
  'base-pushup':'base-pushup', 'base-ohp-barbell':'base-shoulder-press',
  'base-arnold-press':'base-shoulder-press',
  'base-lateral-db':'base-lateral-raise', 'base-lateral-cable':'base-lateral-raise',
  'base-lateral-ankle':'base-lateral-raise', 'base-lateral-multiflight':'base-lateral-raise',
  'base-rear-delt-machine':'base-rear-delt',
  'base-curl-ez':'base-curl', 'base-preacher-curl':'base-curl', 'base-incline-curl':'base-curl',
  'base-overhead-triceps':'base-overhead-triceps', 'base-skullcrusher':'base-overhead-triceps',
  'base-cable-crunch':'base-cable-crunch', 'base-hanging-raise':'base-leg-raise',
  'base-plank':'base-plank'
}));

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
  exerciseLibrary: [],
  session: { day: null, date: null, sets: {} },
  sessions: {},
  history: [],
  activeDay: 'lun',
  programDay: 'lun',
  view: 'workout',
  expanded: new Set(),
  editingExerciseId: null,
  editingParentId: null,
  editingProgramDay: null,
  deletedExerciseParents: new Set(),
  libraryMode: 'session',
  librarySelection: new Set(),
  timer: { remaining: 0, total: 0, intervalId: null, exId: null, audioContext: null }
};

/* ============== STORAGE LAYER (localStorage) ============== */
const KEYS = {
  PROGRAM: 'program-v1',
  LIBRARY: 'exercise-library-v1',
  LIBRARY_SCHEMA: 'exercise-library-schema-v1',
  DELETED_EXERCISES: 'exercise-library-deleted-v1',
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
  const librarySchema = await storageGet(KEYS.LIBRARY_SCHEMA, 1);
  state.deletedExerciseParents = new Set(await storageGet(KEYS.DELETED_EXERCISES, []));
  state.program = normalizeProgramExercises(
    await storageGet(KEYS.PROGRAM, DEFAULT_PROGRAM),
    state.deletedExerciseParents
  );
  for (const d of [...LIBRARY_DAYS, 'free']) {
    if (!state.program[d]) {
      const fallbackDay = JSON.parse(JSON.stringify(DEFAULT_PROGRAM[d]));
      fallbackDay.exercises = fallbackDay.exercises
        .map(cloneExercise)
        .filter(exercise => !state.deletedExerciseParents.has(exercise.parentId));
      state.program[d] = fallbackDay;
    }
  }
  state.exerciseLibrary = normalizeExerciseLibrary(
    await storageGet(KEYS.LIBRARY, null),
    state.program,
    {
      deletedParents: state.deletedExerciseParents,
      migrateDefaults: librarySchema < 2
    }
  );
  if (librarySchema < 2) syncProgramVariantsFromLibrary(state.program, state.exerciseLibrary);
  await storageSet(KEYS.PROGRAM, state.program);
  await storageSet(KEYS.LIBRARY, state.exerciseLibrary);
  await storageSet(KEYS.LIBRARY_SCHEMA, 2);
  await storageSet(KEYS.DELETED_EXERCISES, [...state.deletedExerciseParents]);
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
    sets: session && session.sets && typeof session.sets === 'object' ? session.sets : {},
    exercises: Array.isArray(session?.exercises)
      ? session.exercises.map(cloneExerciseWithKnownVariants)
      : initialExercisesForDay(day)
  };
  return normalized;
}

function emptySession(day) {
  return {
    day,
    date: dateKey(new Date()),
    sets: {},
    exercises: initialExercisesForDay(day)
  };
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
      ? session.exercises.map(cloneExerciseWithKnownVariants)
      : (state.program?.extra?.exercises || []).map(cloneExercise)
  };
}

function cloneExercise(ex) {
  const variants = normalizeVariants(ex?.variants, ex?.variant);
  let name = ex?.family && ex?.variant ? ex.family : ex.name;
  if (exerciseNameKey(name) === 'alzate laterali (drop set)') name = 'Alzate laterali';
  const legacyParentId = LEGACY_BASE_PARENT_IDS.get(ex?.id);
  const baseExercise = BASE_EXERCISE_LIBRARY.find(base =>
    base.id === legacyParentId || exerciseNameKey(base.name) === exerciseNameKey(name)
  );
  const parentId = ex?.parentId || legacyParentId || baseExercise?.id || ex.id;
  if (legacyParentId && baseExercise) name = baseExercise.name;
  const selectedVariant = variants.includes(ex?.selectedVariant)
    ? ex.selectedVariant
    : (variants[0] || '');
  return {
    id: ex.id || parentId,
    parentId,
    name,
    variants,
    selectedVariant,
    target: ex.target || '',
    sets: Math.max(1, Number(ex.sets) || 3),
    reps: ex.reps || '8-12',
    rest: Math.max(15, Number(ex.rest) || 90),
    cue: ex.cue || '',
    video: ex.video || `${ex.name} tutorial`,
    ...(ex.sourceDay ? { sourceDay: ex.sourceDay } : {})
  };
}

function normalizeVariants(variants, legacyVariant = '') {
  const values = Array.isArray(variants) ? variants : [];
  return [...new Set([...values, legacyVariant]
    .map(value => String(value || '').trim())
    .filter(Boolean))];
}

function cloneExerciseWithKnownVariants(exercise) {
  const cloned = cloneExercise(exercise);
  const knownExercise = state.exerciseLibrary.find(item =>
    exerciseParentId(item) === cloned.parentId ||
    exerciseNameKey(item.name) === exerciseNameKey(cloned.name)
  ) || BASE_EXERCISE_LIBRARY.find(item =>
    item.id === cloned.parentId || exerciseNameKey(item.name) === exerciseNameKey(cloned.name)
  );
  return knownExercise ? mergeExerciseVariants(cloned, knownExercise) : cloned;
}

function exerciseNameKey(name) {
  return String(name || '').trim().toLocaleLowerCase('it');
}

function mergeExerciseVariants(target, source) {
  target.variants = normalizeVariants([...(target.variants || []), ...(source.variants || [])]);
  if (!target.selectedVariant || !target.variants.includes(target.selectedVariant)) {
    target.selectedVariant = target.variants[0] || '';
  }
  return target;
}

function normalizeProgramExercises(program, deletedParents = new Set()) {
  const source = program && typeof program === 'object' ? program : DEFAULT_PROGRAM;
  const normalized = JSON.parse(JSON.stringify(source));

  for (const dayKey of [...LIBRARY_DAYS, 'free']) {
    const day = normalized[dayKey];
    if (!day || !Array.isArray(day.exercises)) continue;
    day.exercises = day.exercises
      .map(cloneExercise)
      .filter(exercise => !deletedParents.has(exercise.parentId));
  }
  return normalized;
}

function initialExercisesForDay(day) {
  if (day === 'free') return [];
  return (state.program?.[day]?.exercises || []).map(cloneExercise);
}

function normalizeExerciseLibrary(storedLibrary, program, options = {}) {
  const deletedParents = options.deletedParents || new Set();
  const migrateDefaults = Boolean(options.migrateDefaults);
  const byParent = new Map();
  const addExercise = (rawExercise, mergeVariants = false) => {
    const exercise = cloneExercise(rawExercise);
    if (deletedParents.has(exercise.parentId)) return;
    const existing = byParent.get(exercise.parentId);
    if (existing) {
      if (mergeVariants) mergeExerciseVariants(existing, exercise);
      return;
    }
    exercise.id = exercise.parentId;
    byParent.set(exercise.parentId, exercise);
  };

  if (Array.isArray(storedLibrary)) {
    for (const ex of storedLibrary) if (ex?.id) addExercise(ex, true);
  }
  for (const dayKey of LIBRARY_DAYS) {
    for (const ex of program?.[dayKey]?.exercises || []) {
      addExercise({ ...ex, sourceDay: ex.sourceDay || dayKey }, migrateDefaults);
    }
  }
  for (const ex of BASE_EXERCISE_LIBRARY) addExercise(ex, migrateDefaults);
  return [...byParent.values()];
}

function syncProgramVariantsFromLibrary(program, library) {
  const variantsByParent = new Map(library.map(ex => [ex.parentId, ex.variants]));
  for (const dayKey of [...LIBRARY_DAYS, 'free']) {
    for (const exercise of program?.[dayKey]?.exercises || []) {
      const variants = variantsByParent.get(exercise.parentId);
      if (!variants) continue;
      exercise.variants = [...variants];
      if (!exercise.variants.includes(exercise.selectedVariant)) {
        exercise.selectedVariant = exercise.variants[0] || '';
      }
    }
  }
}

function selectedExerciseVariant(ex) {
  const variants = normalizeVariants(ex?.variants);
  return variants.includes(ex?.selectedVariant)
    ? ex.selectedVariant
    : (variants[0] || '');
}

function exerciseDisplayName(ex, includeVariant = true) {
  const variant = selectedExerciseVariant(ex);
  return includeVariant && variant ? `${ex.name} · ${variant}` : ex.name;
}

function exerciseParentId(ex) {
  return ex?.parentId || ex?.id || '';
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
          exerciseVariants: exerciseVariantsForSession(session),
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
  document.getElementById('btnProgramView').classList.toggle('active', state.view === 'program');
  document.getElementById('btnHistoryView').classList.toggle('active', state.view === 'history');
  renderTabs();
  document.getElementById('workoutView').classList.toggle('hidden', state.view !== 'workout');
  document.getElementById('historyView').classList.toggle('hidden', state.view !== 'history');
  document.getElementById('programView').classList.toggle('hidden', state.view !== 'program');
  document.getElementById('workoutDays').classList.toggle('hidden', state.view !== 'workout');

  if (state.view === 'workout') {
    renderDay();
  } else if (state.view === 'history') {
    renderHistory();
  } else {
    renderProgram();
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

  document.getElementById('btnAddExercise').textContent = '+ Scegli esercizi salvati';
}

function exercisesForActiveSession() {
  if (!Array.isArray(state.session.exercises)) {
    state.session.exercises = initialExercisesForDay(state.activeDay);
  }
  return state.session.exercises;
}

function renderProgram() {
  const day = state.program[state.programDay];
  document.querySelectorAll('[data-program-day]').forEach(button => {
    button.classList.toggle('active', button.dataset.programDay === state.programDay);
  });
  document.getElementById('programDayLabel').textContent = day.label;
  document.getElementById('programDayTitle').textContent = day.name;
  document.getElementById('programExerciseCount').textContent =
    `${day.exercises.length} ${day.exercises.length === 1 ? 'esercizio' : 'esercizi'}`;

  const container = document.getElementById('programExercises');
  if (day.exercises.length === 0) {
    container.innerHTML = `
      <div class="free-empty">
        <strong>Nessun esercizio iniziale</strong>
        <span>Aggiungi esercizi salvati o creane uno nuovo per costruire questa giornata.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = day.exercises.map((ex, idx) => `
    <div class="program-exercise" data-id="${esc(ex.id)}">
      <span class="ex-num">${String(idx + 1).padStart(2, '0')}</span>
      <div class="program-exercise-main">
        <strong>${esc(exerciseDisplayName(ex, false))}</strong>
        <span>${ex.variants.length > 1 ? `${ex.variants.length} varianti · ` : ''}${ex.sets}x${esc(ex.reps)} · rec ${ex.rest}s · ${esc(ex.target)}</span>
      </div>
      <div class="program-exercise-actions">
        <button class="mini-btn" data-program-action="up" ${idx === 0 ? 'disabled' : ''}>Su</button>
        <button class="mini-btn" data-program-action="down" ${idx === day.exercises.length - 1 ? 'disabled' : ''}>Giù</button>
        <button class="mini-btn" data-program-action="edit">Modifica</button>
        <button class="mini-btn danger" data-program-action="remove">Togli</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.program-exercise').forEach(card => {
    const exId = card.dataset.id;
    card.querySelector('[data-program-action="up"]').addEventListener('click', () => moveTemplateExercise(exId, -1));
    card.querySelector('[data-program-action="down"]').addEventListener('click', () => moveTemplateExercise(exId, 1));
    card.querySelector('[data-program-action="edit"]').addEventListener('click', () => openEdit(exId, state.programDay));
    card.querySelector('[data-program-action="remove"]').addEventListener('click', () => removeExerciseFromTemplate(exId));
  });
}

function exerciseCard(ex, idx) {
  const card = document.createElement('div');
  card.className = 'exercise';
  card.dataset.id = ex.id;
  if (state.expanded.has(ex.id)) card.classList.add('expanded');

  const sessSets = (state.session.sets[ex.id] || initSets(ex.sets)).map(normalizeSet);
  state.session.sets[ex.id] = sessSets;
  const doneCount = sessSets.filter(isCompletedSet).length;
  if (doneCount === sessSets.length && sessSets.length > 0) card.classList.add('complete');

  const last = findLastSessionFor(ex);
  const variants = normalizeVariants(ex.variants);
  const activeVariant = selectedExerciseVariant(ex);

  card.innerHTML = `
    <div class="ex-head">
      <span class="ex-num">${String(idx+1).padStart(2,'0')}</span>
      <div class="ex-title-wrap">
        <div class="ex-title">${esc(exerciseDisplayName(ex, false))}</div>
        <div class="ex-sub">${activeVariant ? `<b>${esc(activeVariant)}</b> · ` : ''}${ex.sets}x${esc(ex.reps)} · rec ${ex.rest}s · ${esc(ex.target)}</div>
      </div>
      <span class="ex-sub ex-progress" style="font-family:'JetBrains Mono',monospace;color:${doneCount===sessSets.length && doneCount>0?'var(--accent)':'var(--text-dimmer)'};">${doneCount}/${sessSets.length}</span>
      <span class="ex-chevron">▸</span>
    </div>
    <div class="ex-body">
      ${variants.length > 1 ? `
        <label class="variant-picker">
          <span>Variante per questa sessione</span>
          <select data-action="variant" aria-label="Variante di ${esc(ex.name)}">
            ${variants.map(variant => `<option value="${esc(variant)}" ${variant === activeVariant ? 'selected' : ''}>${esc(variant)}</option>`).join('')}
          </select>
        </label>
      ` : ''}
      <div class="cue">
        <span class="cue-label">TECNICA</span>
        ${esc(ex.cue)}
      </div>
      <a class="video-link" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.video)}">
        Guarda su YouTube · ${esc(ex.video)}
      </a>
      ${last ? `<div class="history-line">Ultima volta (${fmtDate(last.date)}): <b>${last.summary}</b> <span class="pr" style="margin-left: 8px;">★ Migliore: ${last.topSummary}</span></div>` : ''}
      <div class="sets-wrap">
        <div class="sets-header">
          <div>Set</div>
          <div>Kg</div>
          <div>Reps</div>
          <div>Target</div>
          <div>OK</div>
        </div>
        ${sessSets.map((s, i) => `
          <div class="set-block" data-set="${i}">
            <div class="set-row ${isCompletedSet(s)?'done':''}">
              <div class="set-num">${i+1}</div>
              <input class="set-input" data-field="w" type="number" inputmode="decimal" min="0" step="0.5" value="${s.w ?? ''}" placeholder="—">
              <input class="set-input" data-field="r" type="number" inputmode="numeric" min="1" step="1" value="${s.r ?? ''}" placeholder="—">
              <div class="set-hint">${esc(ex.reps)}</div>
              <button class="set-check" data-action="toggle" aria-label="Completa serie ${i+1}">${isCompletedSet(s)?'✓':''}</button>
            </div>
            <div class="drop-zone">
              ${s.drops.map((drop, dropIdx) => `
                <div class="drop-row" data-drop="${dropIdx}">
                  <span>Drop ${dropIdx + 1}</span>
                  <input class="drop-input" data-field="w" type="number" inputmode="decimal" min="0" step="0.5" value="${drop.w ?? ''}" placeholder="Kg">
                  <input class="drop-input" data-field="r" type="number" inputmode="numeric" min="1" step="1" value="${drop.r ?? ''}" placeholder="Reps">
                  <button class="drop-remove" aria-label="Rimuovi drop ${dropIdx + 1}">×</button>
                </div>
              `).join('')}
              <button class="drop-add" data-action="adddrop">+ Drop set</button>
            </div>
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
          <button class="mini-btn danger" data-action="remove">Rimuovi</button>
        </div>
      </div>
    </div>
  `;

  card.querySelector('.ex-head').addEventListener('click', (e) => {
    if (e.target.closest('button, input, a')) return;
    toggleExpand(ex.id);
  });

  const variantSelect = card.querySelector('[data-action="variant"]');
  if (variantSelect) {
    variantSelect.addEventListener('change', () => {
      if (variantSelect.value === activeVariant) return;
      if (sessSets.some(hasSetEntry)) {
        const shouldReset = confirm('Cambiare variante cancellerà le serie già inserite per questo esercizio. Continuare?');
        if (!shouldReset) {
          variantSelect.value = activeVariant;
          return;
        }
        state.session.sets[ex.id] = initSets(ex.sets);
        if (state.timer.exId === ex.id) stopTimer();
      }
      ex.selectedVariant = variantSelect.value;
      saveSession();
      render();
    });
  }

  const refreshCompletionUi = () => {
    const completed = sessSets.filter(isCompletedSet).length;
    const progress = card.querySelector('.ex-progress');
    if (progress) {
      progress.textContent = `${completed}/${sessSets.length}`;
      progress.style.color = completed === sessSets.length && completed > 0
        ? 'var(--accent)'
        : 'var(--text-dimmer)';
    }
    card.classList.toggle('complete', completed === sessSets.length && completed > 0);
  };

  const markSetDirty = (set, row) => {
    if (!set.done) return;
    set.done = false;
    row.classList.remove('done');
    row.querySelector('[data-action="toggle"]').textContent = '';
    refreshCompletionUi();
  };

  card.querySelectorAll('.set-block').forEach(block => {
    const setIdx = parseInt(block.dataset.set);
    const row = block.querySelector('.set-row');
    row.querySelectorAll('.set-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        const val = e.target.value === '' ? null : parseFloat(e.target.value);
        sessSets[setIdx][field] = isNaN(val) ? null : val;
        markSetDirty(sessSets[setIdx], row);
        saveSession();
      });
    });
    row.querySelector('[data-action="toggle"]').addEventListener('click', () => {
      if (!sessSets[setIdx].done && !hasCompleteSetData(sessSets[setIdx])) {
        showToast('Inserisci kg e reps per tutta la serie');
        return;
      }
      sessSets[setIdx].done = !sessSets[setIdx].done;
      if (sessSets[setIdx].done) {
        unlockTimerAudio();
        startRestTimer(ex.rest, exerciseDisplayName(ex) + ' · serie ' + (setIdx+1), ex.id);
      }
      saveSession();
      render();
    });
    block.querySelectorAll('.drop-row').forEach(dropRow => {
      const dropIdx = parseInt(dropRow.dataset.drop);
      dropRow.querySelectorAll('.drop-input').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = e.target.dataset.field;
          const val = e.target.value === '' ? null : parseFloat(e.target.value);
          sessSets[setIdx].drops[dropIdx][field] = isNaN(val) ? null : val;
          markSetDirty(sessSets[setIdx], row);
          saveSession();
        });
      });
      dropRow.querySelector('.drop-remove').addEventListener('click', () => {
        sessSets[setIdx].drops.splice(dropIdx, 1);
        markSetDirty(sessSets[setIdx], row);
        saveSession();
        render();
      });
    });
    block.querySelector('[data-action="adddrop"]').addEventListener('click', () => {
      sessSets[setIdx].done = false;
      sessSets[setIdx].drops.push({ w:null, r:null });
      saveSession();
      render();
    });
  });

  card.querySelector('[data-action="addset"]').addEventListener('click', () => {
    sessSets.push(emptySet());
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
    if (confirm('Cancellare i dati di questa sessione per ' + exerciseDisplayName(ex) + '?')) {
      state.session.sets[ex.id] = initSets(ex.sets);
      saveSession();
      render();
    }
  });
  const removeButton = card.querySelector('[data-action="remove"]');
  if (removeButton) removeButton.addEventListener('click', () => removeExerciseFromSession(ex.id));

  return card;
}

function initSets(n) {
  return Array.from({length: n}, emptySet);
}

function emptySet() {
  return { w:null, r:null, done:false, drops:[] };
}

function normalizeSet(set) {
  const normalized = {
    w: set?.w ?? null,
    r: set?.r ?? null,
    done: false,
    drops: Array.isArray(set?.drops)
      ? set.drops.map(drop => ({ w:drop?.w ?? null, r:drop?.r ?? null }))
      : []
  };
  normalized.done = Boolean(set?.done && hasCompleteSetData(normalized));
  return normalized;
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
            vol += setVolume(set);
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
function findLastSessionFor(exercise) {
  const exId = exercise.id;
  const currentVariant = selectedExerciseVariant(exercise);
  for (let i = state.history.length - 1; i >= 0; i--) {
    const s = state.history[i];
    if (s.sets[exId]) {
      const previousVariant = s.exerciseVariants?.[exId] || '';
      if (currentVariant && previousVariant && currentVariant !== previousVariant) continue;
      const done = s.sets[exId].filter(isCompletedSet);
      if (done.length === 0) continue;
      const top = done.reduce((a,b) => (setVolume(a) > setVolume(b) ? a : b));
      const summary = done.map(formatSetSummary).join(', ');
      return { date: s.date, summary, topSummary: formatSetSummary(top) };
    }
  }
  return null;
}

function exerciseNamesForSession(session) {
  return (session.exercises || []).reduce((names, ex) => {
    names[ex.id] = exerciseDisplayName(ex);
    return names;
  }, {});
}

function exerciseVariantsForSession(session) {
  return (session.exercises || []).reduce((variants, ex) => {
    variants[ex.id] = selectedExerciseVariant(ex);
    return variants;
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
        const name = s.exerciseNames?.[exId] || (exDef ? exerciseDisplayName(exDef) : exId);
        return `<div class="h-ex"><b>${esc(name)}</b><span class="sets">${sets.map(formatSetSummary).join(' · ')}</span></div>`;
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
    (set.r !== null && set.r !== undefined && set.r !== '') ||
    (Array.isArray(set.drops) && set.drops.some(drop =>
      hasNumericValue(drop?.w) || hasNumericValue(drop?.r)
    ))
  ));
}

function hasNumericValue(value) {
  return value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value));
}

function hasValidWeight(value) {
  return hasNumericValue(value) && Number(value) >= 0;
}

function hasValidReps(value) {
  return hasNumericValue(value) && Number(value) > 0;
}

function hasCompleteSetData(set) {
  return Boolean(
    set && hasValidWeight(set.w) && hasValidReps(set.r) &&
    (!Array.isArray(set.drops) || set.drops.every(drop =>
      hasValidWeight(drop?.w) && hasValidReps(drop?.r)
    ))
  );
}

function isCompletedSet(set) {
  return Boolean(set?.done && hasCompleteSetData(set));
}

function setVolume(set) {
  const main = hasValidWeight(set?.w) && hasValidReps(set?.r)
    ? Number(set.w) * Number(set.r)
    : 0;
  const drops = (set?.drops || []).reduce((total, drop) => {
    if (!hasValidWeight(drop?.w) || !hasValidReps(drop?.r)) return total;
    return total + Number(drop.w) * Number(drop.r);
  }, 0);
  return main + drops;
}

function formatSetSummary(set) {
  const parts = [`${set.w}×${set.r}`];
  for (const drop of set.drops || []) {
    if (hasValidWeight(drop.w) && hasValidReps(drop.r)) {
      parts.push(`${drop.w}×${drop.r}`);
    }
  }
  return parts.join(' → ');
}

function hasSessionData(session) {
  return Object.values(session.sets || {}).some(arr =>
    Array.isArray(arr) && arr.some(hasSetEntry)
  );
}

async function saveProgram() {
  await storageSet(KEYS.PROGRAM, state.program);
}

async function saveExerciseLibrary() {
  await storageSet(KEYS.LIBRARY, state.exerciseLibrary);
  await storageSet(KEYS.DELETED_EXERCISES, [...state.deletedExerciseParents]);
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
    exerciseVariants: exerciseVariantsForSession(state.session),
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
  if (!confirm('Cancellare i dati di oggi e ripristinare lo stato iniziale della sessione?')) return;
  state.session = emptySession(state.activeDay);
  state.sessions[state.activeDay] = state.session;
  await persistSessions();
  stopTimer();
  render();
  showToast(state.activeDay === 'free' ? 'Sessione svuotata' : 'Stato iniziale ripristinato');
}

async function clearHistory() {
  if (!confirm('CANCELLARE TUTTO LO STORICO? Operazione irreversibile.')) return;
  state.history = [];
  await storageSet(KEYS.HISTORY, []);
  render();
}

/* ============== EXERCISE LIBRARY ============== */
function savedExerciseLibrary() {
  return state.exerciseLibrary
    .map(cloneExercise)
    .sort((a, b) => a.name.localeCompare(b.name, 'it'));
}

function openExerciseLibrary(mode = 'session') {
  state.libraryMode = mode;
  state.librarySelection.clear();
  document.getElementById('librarySearch').value = '';
  document.getElementById('libraryTitle').textContent =
    mode === 'program' ? 'Aggiungi allo stato iniziale' : 'Aggiungi alla sessione';
  document.getElementById('libraryIntro').textContent =
    mode === 'program'
      ? 'Gli esercizi scelti saranno presenti all’inizio di ogni nuova sessione di questa giornata.'
      : 'Gli esercizi scelti valgono solo per l’allenamento corrente.';
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
  const targetExercises = state.libraryMode === 'program'
    ? state.program[state.programDay].exercises
    : state.session.exercises;
  const existingParents = new Set((targetExercises || []).map(exerciseParentId));
  const library = savedExerciseLibrary().filter(ex => {
    if (!query) return true;
    return `${ex.name} ${(ex.variants || []).join(' ')} ${ex.target} ${LIBRARY_DAY_LABELS[ex.sourceDay] || ''}`
      .toLocaleLowerCase('it')
      .includes(query);
  });

  if (library.length === 0) {
    container.innerHTML = '<div class="library-empty">Nessun esercizio trovato.</div>';
  } else {
    container.innerHTML = library.map(ex => {
      const alreadyAdded = existingParents.has(exerciseParentId(ex));
      const selected = state.librarySelection.has(ex.id);
      return `
        <label class="library-item ${alreadyAdded ? 'disabled' : ''} ${selected ? 'selected' : ''}">
          <input type="checkbox" value="${esc(ex.id)}" ${alreadyAdded ? 'disabled' : ''} ${selected ? 'checked' : ''}>
          <span>
            <span class="library-name">${esc(exerciseDisplayName(ex, false))}</span>
            <span class="library-target">${ex.variants.length > 1 ? `Varianti: ${esc(ex.variants.join(', '))} · ` : ''}${esc(ex.target)}</span>
          </span>
          <span class="${alreadyAdded ? 'library-added' : 'library-source'}">
            ${alreadyAdded ? 'Aggiunto' : 'Salvato'}
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
  const targetExercises = state.libraryMode === 'program'
    ? state.program[state.programDay].exercises
    : state.session.exercises;
  const existingParents = new Set((targetExercises || []).map(exerciseParentId));
  const chosen = savedExerciseLibrary()
    .filter(ex => state.librarySelection.has(ex.id) && !existingParents.has(exerciseParentId(ex)))
    .map(cloneExercise);

  if (state.libraryMode === 'program') {
    state.program[state.programDay].exercises.push(...chosen);
    await saveProgram();
  } else {
    state.session.exercises.push(...chosen);
    for (const ex of chosen) {
      state.session.sets[ex.id] = initSets(ex.sets);
    }
    await persistSessions();
  }
  closeExerciseLibrary();
  render();
  showToast(chosen.length === 1 ? 'Esercizio aggiunto' : `${chosen.length} esercizi aggiunti`);
}

async function removeExerciseFromSession(exId) {
  const ex = state.session.exercises?.find(item => item.id === exId);
  if (!ex) return;
  const hasEnteredData = (state.session.sets[exId] || []).some(hasSetEntry);
  const displayName = exerciseDisplayName(ex);
  if (hasEnteredData && !confirm(`Rimuovere "${displayName}" e i dati inseriti da questa sessione?`)) return;
  if (!hasEnteredData && !confirm(`Rimuovere "${displayName}" da questa sessione?`)) return;
  state.session.exercises = state.session.exercises.filter(item => item.id !== exId);
  delete state.session.sets[exId];
  state.expanded.delete(exId);
  if (state.timer.exId === exId) stopTimer();
  await persistSessions();
  render();
  showToast('Esercizio rimosso');
}

async function removeExerciseFromTemplate(exId) {
  const day = state.program[state.programDay];
  const ex = day.exercises.find(item => item.id === exId);
  if (!ex) return;
  if (!confirm(`Togliere "${exerciseDisplayName(ex)}" dallo stato iniziale di questa giornata? L’esercizio resterà tra i salvati.`)) return;
  day.exercises = day.exercises.filter(item => item.id !== exId);
  await saveProgram();
  render();
  showToast('Stato iniziale aggiornato');
}

async function moveTemplateExercise(exId, offset) {
  const exercises = state.program[state.programDay].exercises;
  const index = exercises.findIndex(ex => ex.id === exId);
  const nextIndex = index + offset;
  if (index < 0 || nextIndex < 0 || nextIndex >= exercises.length) return;
  [exercises[index], exercises[nextIndex]] = [exercises[nextIndex], exercises[index]];
  await saveProgram();
  renderProgram();
}

/* ============== EDIT MODAL ============== */
function openEdit(exId, programDay = state.programDay) {
  state.editingExerciseId = exId;
  state.editingProgramDay = programDay;
  const templateExercise = state.program[programDay].exercises.find(e => e.id === exId);
  const parentId = exerciseParentId(templateExercise) || exId;
  const ex = templateExercise
    || state.exerciseLibrary.find(e => exerciseParentId(e) === parentId);
  if (!ex) return;
  state.editingParentId = parentId;
  document.getElementById('editTitle').textContent = 'Modifica · ' + exerciseDisplayName(ex, false);
  document.getElementById('ed-name').value = ex.name;
  document.getElementById('ed-variants').value = (ex.variants || []).join('\n');
  document.getElementById('ed-target').value = ex.target;
  document.getElementById('ed-sets').value = ex.sets;
  document.getElementById('ed-reps').value = ex.reps;
  document.getElementById('ed-rest').value = ex.rest;
  document.getElementById('ed-cue').value = ex.cue;
  document.getElementById('ed-video').value = ex.video;
  document.getElementById('ed-delete').classList.remove('hidden');
  document.getElementById('editModal').classList.add('active');
}

function openAdd(programDay = state.programDay) {
  state.editingExerciseId = null;
  state.editingParentId = null;
  state.editingProgramDay = programDay;
  document.getElementById('editTitle').textContent = 'Nuovo esercizio';
  document.getElementById('ed-name').value = '';
  document.getElementById('ed-variants').value = '';
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
  state.editingParentId = null;
  state.editingProgramDay = null;
}

async function saveEdit() {
  const dayKey = state.editingProgramDay || state.programDay;
  const day = state.program[dayKey];
  const editingId = state.editingExerciseId;
  const editingParentId = state.editingParentId;
  const wasEditing = Boolean(editingId);
  const data = {
    name: document.getElementById('ed-name').value.trim() || 'Esercizio',
    variants: normalizeVariants(document.getElementById('ed-variants').value.split(/\r?\n|,/)),
    target: document.getElementById('ed-target').value.trim(),
    sets: Math.max(1, parseInt(document.getElementById('ed-sets').value) || 3),
    reps: document.getElementById('ed-reps').value.trim() || '8-12',
    rest: Math.max(15, parseInt(document.getElementById('ed-rest').value) || 90),
    cue: document.getElementById('ed-cue').value.trim(),
    video: document.getElementById('ed-video').value.trim() || (document.getElementById('ed-name').value + ' tutorial')
  };
  data.selectedVariant = data.variants[0] || '';
  if (wasEditing) {
    const ex = state.exerciseLibrary.find(e => exerciseParentId(e) === editingParentId);
    if (!ex) return;
    Object.assign(ex, data, { id:editingParentId, parentId:editingParentId });
    const sharedData = {
      name: data.name,
      variants: [...data.variants],
      selectedVariant: data.selectedVariant,
      target: data.target,
      cue: data.cue,
      video: data.video
    };
    for (const programDay of LIBRARY_DAYS) {
      for (const templateExercise of state.program[programDay]?.exercises || []) {
        if (exerciseParentId(templateExercise) !== editingParentId) continue;
        Object.assign(templateExercise, sharedData);
        if (programDay === dayKey && templateExercise.id === editingId) {
          Object.assign(templateExercise, data);
        }
      }
    }
  } else {
    const newId = 'u' + Date.now();
    const newExercise = cloneExercise({ id:newId, ...data, sourceDay: dayKey });
    state.deletedExerciseParents.delete(newExercise.parentId);
    state.exerciseLibrary = state.exerciseLibrary.filter(item =>
      exerciseParentId(item) !== newExercise.parentId
    );
    state.exerciseLibrary.push({ ...cloneExercise(newExercise), id:newExercise.parentId });
    day.exercises.push(newExercise);
  }
  await saveExerciseLibrary();
  await saveProgram();
  closeEdit();
  render();
  showToast(wasEditing ? 'Esercizio salvato' : 'Esercizio creato');
}

async function deleteExercise(exId) {
  const templateExercise = state.program[state.editingProgramDay || state.programDay]?.exercises
    .find(item => item.id === exId);
  const parentId = state.editingParentId || exerciseParentId(templateExercise) || exId;
  const ex = state.exerciseLibrary.find(e => exerciseParentId(e) === parentId);
  if (!ex) return;
  if (!confirm(`Eliminare definitivamente "${exerciseDisplayName(ex)}" dagli esercizi salvati e da tutti gli stati iniziali?`)) return;
  state.deletedExerciseParents.add(parentId);
  state.exerciseLibrary = state.exerciseLibrary.filter(item => exerciseParentId(item) !== parentId);
  for (const dayKey of LIBRARY_DAYS) {
    if (state.program[dayKey]) {
      state.program[dayKey].exercises = state.program[dayKey].exercises
        .filter(item => exerciseParentId(item) !== parentId);
    }
  }
  state.expanded.delete(exId);
  await saveExerciseLibrary();
  await saveProgram();
  closeEdit();
  render();
  showToast('Esercizio salvato eliminato');
}

/* ============== REST TIMER ============== */
function unlockTimerAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!state.timer.audioContext) state.timer.audioContext = new AudioContextClass();
    if (state.timer.audioContext.state === 'suspended') {
      state.timer.audioContext.resume().catch(() => {});
    }
    return state.timer.audioContext;
  } catch (e) {
    return null;
  }
}

function playTimerCompleteSound() {
  const ctx = state.timer.audioContext;
  if (!ctx) return;

  const scheduleNotes = () => {
    if (ctx.state !== 'running') return;
    const start = ctx.currentTime + 0.02;
    [740, 880, 1040].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = index === 2 ? 'square' : 'sine';
      osc.frequency.value = frequency;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const noteStart = start + index * 0.24;
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(index === 2 ? 0.2 : 0.16, noteStart + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.18);
      osc.start(noteStart);
      osc.stop(noteStart + 0.2);
    });
  };

  if (ctx.state === 'suspended') {
    ctx.resume().then(scheduleNotes).catch(() => {});
  } else {
    scheduleNotes();
  }
}

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
      playTimerCompleteSound();
      // vibrazione su mobile (se supportata)
      try { if (navigator.vibrate) navigator.vibrate([180, 80, 180, 80, 280]); } catch(e) {}
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
  document.addEventListener('pointerdown', unlockTimerAudio, { once:true });
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

  document.getElementById('btnProgramView').addEventListener('click', () => {
    state.view = state.view === 'program' ? 'workout' : 'program';
    render();
  });
  document.getElementById('btnHistoryView').addEventListener('click', () => {
    state.view = state.view === 'history' ? 'workout' : 'history';
    render();
  });
  document.getElementById('btnBackToWorkout').addEventListener('click', () => {
    state.view = 'workout';
    render();
  });

  document.getElementById('btnResetDay').addEventListener('click', resetDay);
  document.getElementById('btnFinishDay').addEventListener('click', finishDay);
  document.getElementById('btnAddExercise').addEventListener('click', () => openExerciseLibrary('session'));
  document.getElementById('btnProgramAddSaved').addEventListener('click', () => openExerciseLibrary('program'));
  document.getElementById('btnProgramNewExercise').addEventListener('click', () => openAdd(state.programDay));
  document.querySelectorAll('[data-program-day]').forEach(button => {
    button.addEventListener('click', () => {
      state.programDay = button.dataset.programDay;
      renderProgram();
    });
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
