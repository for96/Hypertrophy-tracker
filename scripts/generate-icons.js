// Genera le icone PWA da un SVG sorgente.
// Output: public/icon-192.png, icon-512.png, icon-maskable.png, apple-touch-icon.png
//
// Esecuzione: `npm run icons`

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public');

const BG = '#0a0a0a';
const ACCENT = '#c8ff00';

// SVG "logo" stile Anton-uppercase. Per le icone normali useremo padding 12% del lato.
// Per la maskable il safe-zone è 80% centrale → contenuto al 64% del lato.
function buildSvg({ size, safe = 0.76, label = 'HY//', sub = '3+1' }) {
  const pad = (1 - safe) / 2 * size;
  const inner = size - pad * 2;
  // approx font sizes (Anton è molto stretto: ~0.78 em wide → posso andare grosso)
  const mainFs = Math.round(inner * 0.46);
  const subFs = Math.round(inner * 0.18);
  const mainY = Math.round(size * 0.52);
  const subY = Math.round(mainY + mainFs * 0.55);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <g font-family="Impact, 'Arial Black', 'Helvetica Neue', sans-serif" text-anchor="middle" font-weight="900">
    <text x="${size / 2}" y="${mainY}" font-size="${mainFs}" fill="#f0f0f0" letter-spacing="2">HY<tspan fill="${ACCENT}">//</tspan></text>
    <text x="${size / 2}" y="${subY}" font-size="${subFs}" fill="${ACCENT}" letter-spacing="6">${sub}</text>
  </g>
</svg>`;
}

async function render(svgString, outPath, size) {
  await sharp(Buffer.from(svgString)).resize(size, size).png().toFile(outPath);
  console.log(`✓ ${outPath}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // Standard 192 + 512 (padding 12% → contenuto 76%)
  await render(buildSvg({ size: 192, safe: 0.76 }), resolve(OUT, 'icon-192.png'), 192);
  await render(buildSvg({ size: 512, safe: 0.76 }), resolve(OUT, 'icon-512.png'), 512);

  // Maskable: safe area = 80% centrale → contenuto deve stare nel 64% centrale.
  await render(buildSvg({ size: 512, safe: 0.6 }), resolve(OUT, 'icon-maskable.png'), 512);

  // Apple touch icon 180×180, NO trasparenza (iOS comunque la riempie di nero ma meglio esplicito)
  await render(buildSvg({ size: 180, safe: 0.76 }), resolve(OUT, 'apple-touch-icon.png'), 180);

  // Favicon piccolo per browser desktop
  await render(buildSvg({ size: 32, safe: 0.86 }), resolve(OUT, 'favicon.png'), 32);

  console.log('\nFatto. Icone in public/');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
