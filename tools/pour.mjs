// Renders a second animated background for each theme variant:
// <theme>/<variant>/backgrounds/6-pour.mp4, 3840x2160, a 37.5 second loop.
// The video shows the 5 images of the variant in turn. Each change is a
// creamy pour, the transition of the promo video, and the last image pours
// back into the first.
//
//   node tools/pour.mjs                     render all themes and variants
//   node tools/pour.mjs mocha latte         render the named themes
//   VARIANTS=day node tools/pour.mjs        render only these variants
//   OUT=/tmp/x node tools/pour.mjs mocha    write the videos to $OUT
//   SKIP_EXISTING=1 node tools/pour.mjs     keep videos that exist
//   REDRAW_POUR=1 node tools/pour.mjs       draw the pour frames again
//
// The pour does not depend on the theme, so the script draws its frames once
// into .capture/pour/. For each variant, ffmpeg holds each image for 6
// seconds and pours it into the next in 1.5 seconds, with the milk front in a
// cream color of the theme. Run tools/render.mjs first. Needs `chromium` and
// `ffmpeg`.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { themes, VARIANTS, mix } from './palettes.mjs';
import { launch } from './cdp.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FPS = 24, HOLD = 6, POUR = 1.5;
const HOLD_FRAMES = HOLD * FPS, POUR_FRAMES = Math.round(POUR * FPS);
const IMAGES = ['0-omarchy-wordmark', '1-latte-art', '2-recipe', '3-crema-swirl', '4-coffee-beans'];
const POUR_DIR = join(ROOT, '.capture', 'pour');
const OUT = process.env.OUT;
const ONLY = process.env.VARIANTS ? process.env.VARIANTS.split(',') : VARIANTS.map(v => v.key);

// The milk front: cream at night, and a light caramel in the day, because a
// white front does not show on light images.
function creamColor(v) {
  const c = v.colors;
  return c.mode === 'light' ? mix(c.accent, '#ffffff', .6) : mix(c.foreground, '#fff3e0', .45);
}

// One filter graph for a variant: 5 holds and 5 pours, joined in a loop.
function filterGraph(color) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16));
  const n = IMAGES.length, ids = [...Array(n).keys()];
  const repeat = (label, frames) => `loop=loop=${frames - 1}:size=1:start=0,setpts=N/${FPS}/TB[${label}]`;
  const lines = [];
  ids.forEach(i => lines.push(`[${i}:v]scale=3840:2160:flags=lanczos,format=rgb24,split=3[h${i}][a${i}][b${i}]`));
  lines.push(`[${n}:v]format=gray,split=${n}${ids.map(i => `[m${i}]`).join('')}`);
  lines.push(`[${n + 1}:v]format=rgba,lutrgb=r=${r}:g=${g}:b=${b},split=${n}${ids.map(i => `[e${i}]`).join('')}`);
  ids.forEach(i => {
    const next = (i + 1) % n;
    lines.push(`[h${i}]${repeat(`H${i}`, HOLD_FRAMES)}`);
    lines.push(`[a${i}]${repeat(`A${i}`, POUR_FRAMES)}`);
    lines.push(`[b${next}]${repeat(`B${i}`, POUR_FRAMES)}`);
    lines.push(`[B${i}][m${i}]alphamerge[N${i}]`);
    lines.push(`[A${i}][N${i}]overlay=format=auto[P${i}]`);
    lines.push(`[P${i}][e${i}]overlay=format=auto,format=rgb24[T${i}]`);
  });
  lines.push(`${ids.map(i => `[H${i}][T${i}]`).join('')}concat=n=${n * 2}:v=1:a=0,format=yuv420p[v]`);
  return lines.join(';');
}

const wanted = process.argv.slice(2);
const jobs = [];
for (const t of wanted.length ? themes.filter(x => wanted.includes(x.slug)) : themes) {
  for (const { key } of VARIANTS.filter(v => ONLY.includes(v.key))) {
    const out = OUT ? join(OUT, `${t.slug}-${key}-pour.mp4`) : join(ROOT, t.slug, key, 'backgrounds', '6-pour.mp4');
    if (process.env.SKIP_EXISTING && existsSync(out)) continue;
    jobs.push({ t, key, out });
  }
}

const started = Date.now();

// 1. The pour frames, once
const count = dir => existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith('.png')).length : 0;
if (count(join(POUR_DIR, 'mask')) !== POUR_FRAMES || count(join(POUR_DIR, 'edge')) !== POUR_FRAMES || process.env.REDRAW_POUR) {
  rmSync(POUR_DIR, { recursive: true, force: true });
  const browser = await launch();
  const page = await browser.open(pathToFileURL(join(ROOT, 'tools/pour.html')).href);
  for (const kind of ['mask', 'edge']) {
    mkdirSync(join(POUR_DIR, kind), { recursive: true });
    for (let f = 0; f < POUR_FRAMES; f++) {
      const url = await page.evaluate(`renderPour('${kind}', ${f}, ${POUR_FRAMES})`);
      writeFileSync(join(POUR_DIR, kind, `${String(f).padStart(2, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'));
    }
  }
  page.close();
  await browser.close();
}

// 2. One video for each variant
let done = 0;
for (const { t, key, out } of jobs) {
  const dir = join(ROOT, t.slug, key, 'backgrounds');
  mkdirSync(dirname(out), { recursive: true });
  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    ...IMAGES.flatMap(f => ['-i', join(dir, `${f}.jpg`)]),
    '-framerate', String(FPS), '-i', join(POUR_DIR, 'mask', '%02d.png'),
    '-framerate', String(FPS), '-i', join(POUR_DIR, 'edge', '%02d.png'),
    '-filter_complex', filterGraph(creamColor(t.variants[key])),
    '-map', '[v]', '-r', String(FPS), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26', '-tune', 'stillimage',
    '-g', String(FPS * 10), '-an', '-movflags', '+faststart', out,
  ]);
  done++;
  process.stdout.write(`\r${done}/${jobs.length} videos, ${((Date.now() - started) / 1000).toFixed(0)}s   `);
}
process.stdout.write('\n');
