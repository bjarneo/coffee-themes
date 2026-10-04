// Renders an animated background for each theme variant:
// <theme>/<variant>/backgrounds/5-steam.mp4, 3840x2160, a 12 second loop.
// The Omarchy wordmark sits as latte art in a cup, and steam drifts over it.
//
//   node tools/steam.mjs                     render all themes and variants
//   node tools/steam.mjs mocha latte         render the named themes
//   VARIANTS=day node tools/steam.mjs        render only these variants
//   OUT=/tmp/x node tools/steam.mjs mocha    write the videos to $OUT
//   SKIP_EXISTING=1 node tools/steam.mjs     keep videos that exist
//   REDRAW_STEAM=1 node tools/steam.mjs      draw the steam frames again
//
// The steam does not depend on the theme, so the script draws its frames once
// into .capture/steam/ and reuses them. For each variant, tools/render.html
// draws one still of the cup, and ffmpeg lays the steam over it in a color of
// the theme. Needs `chromium` and `ffmpeg`.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { themes, VARIANTS, mix } from './palettes.mjs';
import { launch, logoPaths } from './cdp.mjs';
import { renderTheme } from './render.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FPS = 24, SECONDS = 12, FRAMES = FPS * SECONDS;
// Size of the steam frames. ffmpeg scales them up, and the steam is soft.
const STEAM_SIZE = [960, 540];
// The cup in the still, in design pixels: tools/render.html draws the hero cup
// at the middle of the frame, 20 px low, with a liquid radius of 540 x 1.3.
const CUP = { x: 1920, y: 1100, R: 702 };
const STEAM_DIR = join(ROOT, '.capture', 'steam');
const OUT = process.env.OUT;
const ONLY = process.env.VARIANTS ? process.env.VARIANTS.split(',') : VARIANTS.map(v => v.key);

// The steam is a light veil at night and a lighter, stronger veil in the day,
// because a light table hides white steam.
function steamColor(v) {
  const c = v.colors;
  return c.mode === 'light'
    ? { color: mix(c.background, '#ffffff', .6), opacity: .9 }
    : { color: mix(c.foreground, '#ffffff', .35), opacity: .45 };
}

const wanted = process.argv.slice(2);
const jobs = [];
for (const t of wanted.length ? themes.filter(x => wanted.includes(x.slug)) : themes) {
  for (const { key } of VARIANTS.filter(v => ONLY.includes(v.key))) {
    const out = OUT ? join(OUT, `${t.slug}-${key}-steam.mp4`) : join(ROOT, t.slug, key, 'backgrounds', '5-steam.mp4');
    if (process.env.SKIP_EXISTING && existsSync(out)) continue;
    jobs.push({ t, key, out });
  }
}

const browser = await launch();
const started = Date.now();

// 1. The steam frames, once
const haveSteam = existsSync(STEAM_DIR) && readdirSync(STEAM_DIR).filter(f => f.endsWith('.png')).length === FRAMES;
if (!haveSteam || process.env.REDRAW_STEAM) {
  rmSync(STEAM_DIR, { recursive: true, force: true });
  mkdirSync(STEAM_DIR, { recursive: true });
  const page = await browser.open(pathToFileURL(join(ROOT, 'tools/steam.html')).href);
  for (let f = 0; f < FRAMES; f++) {
    const url = await page.evaluate(`renderSteam(${f}, ${FRAMES}, ${SECONDS}, ${STEAM_SIZE[0]}, ${STEAM_SIZE[1]}, ${JSON.stringify(CUP)})`);
    writeFileSync(join(STEAM_DIR, `${String(f).padStart(3, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'));
    process.stdout.write(`\r${f + 1}/${FRAMES} steam frames, ${((Date.now() - started) / 1000).toFixed(0)}s   `);
  }
  process.stdout.write('\n');
  page.close();
}

// 2. One still and one video for each variant
const scratch = mkdtempSync(join(tmpdir(), 'theme-steam-'));
const page = await browser.open(pathToFileURL(join(ROOT, 'tools/render.html')).href);
await page.evaluate(`setLogo(${JSON.stringify(logoPaths(readFileSync('/usr/share/omarchy/logo.svg', 'utf8')))})`);
let done = 0;
for (const { t, key, out } of jobs) {
  const v = t.variants[key];
  const url = await page.evaluate(`renderImage(${JSON.stringify(renderTheme(t, v))}, 'cup-wordmark', 3840, 2160, 'image/jpeg', .95)`);
  const still = join(scratch, 'still.jpg');
  writeFileSync(still, Buffer.from(url.split(',')[1], 'base64'));
  const { color, opacity } = steamColor(v);
  const [r, g, b] = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16));
  mkdirSync(dirname(out), { recursive: true });
  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    '-loop', '1', '-framerate', String(FPS), '-i', still,
    '-framerate', String(FPS), '-i', join(STEAM_DIR, '%03d.png'),
    '-filter_complex', `[1:v]format=rgba,lutrgb=r=${r}:g=${g}:b=${b},colorchannelmixer=aa=${opacity},gblur=sigma=1.2,scale=3840:2160:flags=bicubic[s];[0:v][s]overlay=0:0:format=auto,format=yuv420p[v]`,
    '-map', '[v]', '-frames:v', String(FRAMES), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26',
    '-g', String(FPS * 2), '-an', '-movflags', '+faststart', out,
  ]);
  done++;
  process.stdout.write(`\r${done}/${jobs.length} videos, ${((Date.now() - started) / 1000).toFixed(0)}s   `);
}
process.stdout.write('\n');
page.close();
await browser.close();
rmSync(scratch, { recursive: true, force: true });
