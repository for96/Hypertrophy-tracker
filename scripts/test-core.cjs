const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

let source = fs.readFileSync('src/main.js', 'utf8');
source = source.replace(
  "import { registerSW } from 'virtual:pwa-register';",
  'const registerSW = () => () => {};'
);
source = source.replace(/init\(\);\s*$/, `
  globalThis.__core = {
    DEFAULT_PROGRAM,
    normalizeProgramExercises,
    normalizeExerciseLibrary,
    exerciseParentId,
    normalizeSet,
    hasCompleteSetData,
    isCompletedSet,
    setVolume
  };
`);

const sandbox = {
  console,
  setTimeout: () => 0,
  clearTimeout: () => {},
  setInterval: () => 0,
  clearInterval: () => {},
  window: {},
  document: {},
  localStorage: {}
};
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: 'src/main.js' });

const {
  DEFAULT_PROGRAM,
  normalizeProgramExercises,
  normalizeExerciseLibrary,
  exerciseParentId,
  normalizeSet,
  hasCompleteSetData,
  isCompletedSet,
  setVolume
} = sandbox.__core;

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function programWith(exercises) {
  return {
    lun: { name: 'Test', label: 'Test', exercises },
    mer: { name: 'Test', label: 'Test', exercises: [] },
    ven: { name: 'Test', label: 'Test', exercises: [] },
    extra: { name: 'Test', label: 'Test', exercises: [] },
    free: { name: 'Libera', label: 'Libera', exercises: [] }
  };
}

const duplicateSlots = normalizeProgramExercises(programWith([
  { id: 'slot-a', parentId: 'same-parent', name: 'Squat', sets: 3, reps: '8', rest: 90 },
  { id: 'slot-b', parentId: 'same-parent', name: 'Squat', sets: 5, reps: '5', rest: 150 }
]));
assert.deepEqual(
  plain(duplicateSlots.lun.exercises.map(ex => [ex.id, ex.sets, ex.reps])),
  [['slot-a', 3, '8'], ['slot-b', 5, '5']],
  'normalization must preserve separate template slots for the same parent'
);

const migratedLibrary = normalizeExerciseLibrary([
  { id: 'base-lateral-db', name: 'Alzate laterali', variants: ['Manubri'], sets: 3, reps: '12', rest: 60 },
  { id: 'base-lateral-cable', name: 'Alzate laterali', variants: ['Cavo basso'], sets: 3, reps: '12', rest: 60 }
], programWith([]), { migrateDefaults: true });
const lateralExercises = migratedLibrary.filter(ex => exerciseParentId(ex) === 'base-lateral-raise');
assert.equal(lateralExercises.length, 1, 'legacy variants must migrate into one parent exercise');
assert.ok(lateralExercises[0].variants.includes('Manubri'));
assert.ok(lateralExercises[0].variants.includes('Cavo basso'));

const persistedLibrary = migratedLibrary.map(ex => ({ ...plain(ex) }));
const lateral = persistedLibrary.find(ex => ex.parentId === 'base-lateral-raise');
lateral.variants = ['Manubri'];
const reloadedLibrary = normalizeExerciseLibrary(persistedLibrary, plain(DEFAULT_PROGRAM), {
  migrateDefaults: false
});
assert.deepEqual(
  plain(reloadedLibrary.find(ex => ex.parentId === 'base-lateral-raise').variants),
  ['Manubri'],
  'removed built-in variants must not return after reload'
);

const deletedParents = new Set(['base-lateral-raise']);
const programAfterDelete = normalizeProgramExercises(plain(DEFAULT_PROGRAM), deletedParents);
assert.equal(
  [...programAfterDelete.mer.exercises, ...programAfterDelete.extra.exercises]
    .some(ex => ex.parentId === 'base-lateral-raise'),
  false,
  'deleted parent must disappear from every template occurrence'
);
assert.equal(
  normalizeExerciseLibrary(persistedLibrary, programAfterDelete, {
    deletedParents,
    migrateDefaults: false
  }).some(ex => ex.parentId === 'base-lateral-raise'),
  false,
  'deleted built-ins must not be restored to the library'
);

assert.equal(hasCompleteSetData({ w: 80, r: 6, drops: [{ w: 60, r: 4 }] }), true);
assert.equal(hasCompleteSetData({ w: 80, r: 6, drops: [{ w: 60, r: null }] }), false);
assert.equal(hasCompleteSetData({ w: -1, r: 6, drops: [] }), false);
assert.equal(hasCompleteSetData({ w: 80, r: 0, drops: [] }), false);
assert.equal(isCompletedSet({ w: 80, r: 6, done: false, drops: [] }), false);
assert.equal(isCompletedSet({ w: 80, r: 6, done: true, drops: [] }), true);
assert.equal(normalizeSet({ w: 80, r: null, done: true, drops: [] }).done, false);
assert.equal(normalizeSet({ w: 80, r: 6, done: true, drops: [] }).done, true);
assert.equal(setVolume({ w: 80, r: 6, drops: [{ w: 60, r: 4 }] }), 720);

console.log('Core regression tests passed');
