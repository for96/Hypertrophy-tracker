# Hypertrophy Tracker · PWA

Tracker per il protocollo di ipertrofia: 3 allenamenti settimanali configurabili (Lun/Mer/Ven) + una sessione libera componibile con gli esercizi salvati. Vanilla JS + Vite + vite-plugin-pwa, deployabile su Vercel, installabile su iPhone come app standalone.

## Sviluppo locale

```bash
npm install
npm run icons      # genera le icone in public/ (solo prima volta o dopo modifiche)
npm run dev        # http://localhost:5173
```

In dev mode il service worker NON è attivo (è normale): per testare la PWA serve la build.

## Build + preview locale (test PWA)

```bash
npm run build
npm run preview    # http://localhost:4173
```

Apri DevTools → Application:
- **Manifest**: deve mostrare nome, icone, theme color
- **Service Workers**: status "activated and is running"
- **Cache Storage**: presente con asset

Poi Network → toggle **Offline** → reload: deve continuare a caricare.

## Deploy su Vercel

1. Crea repo GitHub:
   ```bash
   git init
   git add .
   git commit -m "init: pwa scaffold"
   git branch -M main
   git remote add origin git@github.com:<tuo-utente>/hypertrophy-tracker.git
   git push -u origin main
   ```
2. Su [vercel.com/new](https://vercel.com/new): importa il repo.
3. Framework Preset: **Vite** (auto-detect).
4. Deploy. L'URL è `https://hypertrophy-tracker-cyan.vercel.app`.

Ogni push su `main` rideploya automaticamente.

## Installazione su iPhone

1. Apri l'URL Vercel **in Safari iOS** (non Chrome, non in-app browser tipo Instagram/Telegram).
2. Tasto Condividi (quadrato con freccia in alto) → **"Aggiungi alla schermata Home"**.
3. Conferma il nome → l'icona compare in home.
4. Aprila dall'icona: parte full-screen, status bar nera translucida, niente barra Safari.
5. Funziona offline a partire dalla seconda apertura (prima visita pre-cacha tutto).

I dati sono salvati in `localStorage` del browser Safari/PWA. Persistono finché non disinstalli l'app o pulisci il sito da Impostazioni iOS.

## Struttura

```
.
├── index.html              ← markup + meta iOS
├── src/
│   ├── main.js             ← logica app + storage + registerSW
│   └── style.css           ← UI
├── public/                 ← icone (generate da script)
├── scripts/
│   └── generate-icons.js   ← rigenera icone via sharp
├── vite.config.js          ← config PWA / Workbox
└── package.json
```

## Scheda ed esercizi

La sezione **Scheda** definisce lo stato iniziale persistente di LUN/MER/VEN: permette di aggiungere esercizi salvati, crearne di nuovi, modificarli, rimuoverli dal giorno e cambiarne l'ordine.

La libreria include già una selezione ampia di esercizi fondamentali. Le varianti per attrezzo o presa appartengono allo stesso esercizio padre: per esempio "Alzate laterali" contiene Manubri, Cavo basso, Cavigliera al cavo e Multi flight. La variante si sceglie nella sessione e quella utilizzata viene conservata nello storico. I nuovi esercizi di base vengono aggiunti anche alle installazioni esistenti senza modificare le giornate configurate dall'utente.

Durante un allenamento gli esercizi si possono aggiungere o togliere liberamente senza modificare la Scheda. Alla chiusura o al reset, una nuova sessione standard riparte dal relativo stato iniziale. La Sessione libera riparte invece vuota.

Ogni serie può contenere uno o più segmenti **drop set**, ciascuno con peso e ripetizioni propri. Volume e storico includono anche i segmenti drop. Il timer di recupero usa un avviso sonoro a tre toni e, quando supportata, una vibrazione finale.

Programma, libreria esercizi, sessioni e storico persistono in `localStorage`. Per un reset completo cancella le chiavi `program-v1`, `exercise-library-v1`, `sessions-current-v2`, `session-current` e `history`.

## Note tecniche

- **Storage**: solo locale (localStorage, ~5 MB). Niente backend.
- **Service Worker**: aggiornamento "prompt": quando esce una nuova build appare un banner "Aggiorna" in basso a destra.
- **iOS Safari quirks**: la chiave `apple-mobile-web-app-capable` può sembrare deprecata ma è ancora richiesta per il fullscreen su iOS ≤ 17.
- **Persistenza dati su iOS**: dopo 7 giorni senza utilizzo, iOS può fare eviction del localStorage di siti non aggiunti alla home. PWA installate sono esenti.
