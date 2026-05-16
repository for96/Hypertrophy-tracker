# Hypertrophy Tracker · PWA

Tracker per il protocollo di ipertrofia 3+1: 3 allenamenti settimanali (Lun/Mer/Ven) + un richiamo opzionale. Vanilla JS + Vite + vite-plugin-pwa, deployabile su Vercel, installabile su iPhone come app standalone.

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

## Modifica esercizi

L'editor è dentro l'app (pulsante "Modifica" su ogni esercizio). Modifiche, aggiunte e cancellazioni persistono in localStorage. Per resettare alla scheda di default: in DevTools → Application → Local Storage → cancella la chiave `program-v1`.

## Note tecniche

- **Storage**: solo locale (localStorage, ~5 MB). Niente backend.
- **Service Worker**: aggiornamento "prompt": quando esce una nuova build appare un banner "Aggiorna" in basso a destra.
- **iOS Safari quirks**: la chiave `apple-mobile-web-app-capable` può sembrare deprecata ma è ancora richiesta per il fullscreen su iOS ≤ 17.
- **Persistenza dati su iOS**: dopo 7 giorni senza utilizzo, iOS può fare eviction del localStorage di siti non aggiunti alla home. PWA installate sono esenti.
