// Renders the photographic backgrounds of each theme variant on the GPU:
//
//   0-omarchy-wordmark.jpg   the Omarchy wordmark spelled in coffee beans
//   1-latte-art.jpg          the drink in its cup or glass
//   3-crema-swirl.jpg        cream that swirls into coffee, up close
//   4-coffee-beans.jpg       roasted beans, from a low angle
//
// tools/photo.html ray-marches the scenes. tools/render.html draws the surface
// of each drink, which the latte scene uses as a texture.
//
//   node tools/photo.mjs                    render all themes and variants
//   node tools/photo.mjs mocha latte        render the named themes
//   VARIANTS=day node tools/photo.mjs       render only these variants
//   KINDS=beans,crema node tools/photo.mjs  render only these kinds
//   SAMPLES=24 node tools/photo.mjs         samples for each pixel (default 24)
//   PREVIEW=1 OUT=/tmp/x node tools/photo.mjs mocha
//                                           write small JPEGs to $OUT
//   SIZE=3840x2160 node tools/photo.mjs     render at another 16:9 size
//   RESUME=1 node tools/photo.mjs           skip images that this run already wrote
//
// The run lists each finished image in .capture/photo-done.txt, so RESUME=1
// continues a stopped run. Needs `chromium` with a GPU that Vulkan can use.

import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { themes, VARIANTS } from './palettes.mjs';
import { launch, logoPaths } from './cdp.mjs';
import { renderTheme } from './render.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const PHOTOS = [
  ['wordmark', '0-omarchy-wordmark'],
  ['latte', '1-latte-art'],
  ['crema', '3-crema-swirl'],
  ['beans', '4-coffee-beans'],
];
const PREVIEW = !!process.env.PREVIEW;
const OUT = process.env.OUT || ROOT;
const SAMPLES = Number(process.env.SAMPLES || (PREVIEW ? 16 : 24));
const SIZE = (process.env.SIZE || (PREVIEW ? '960x540' : '6144x3456')).split('x').map(Number);
const ONLY = process.env.VARIANTS ? process.env.VARIANTS.split(',') : VARIANTS.map(v => v.key);
const KINDS = process.env.KINDS ? process.env.KINDS.split(',') : PHOTOS.map(([k]) => k);
const DONE = join(ROOT, '.capture', 'photo-done.txt');

// Opens the two pages: tools/render.html for the drink surfaces and
// tools/photo.html for the photos. steam.mjs uses this too.
export async function openPhotoPages() {
  const logo = logoPaths(readFileSync('/usr/share/omarchy/logo.svg', 'utf8'));
  const browser = await launch({ gpu: true });
  const art = await browser.open(pathToFileURL(join(ROOT, 'tools/render.html')).href);
  await art.evaluate(`setLogo(${JSON.stringify(logo)})`);
  const photo = await browser.open(pathToFileURL(join(ROOT, 'tools/photo.html')).href);
  await photo.evaluate(`setup(${JSON.stringify(logo)})`);
  const scratch = mkdtempSync(join(tmpdir(), 'theme-photo-'));
  // Draws one photo and returns the JPEG as a Buffer. The photo page must be
  // the front tab: Chromium skips the GPU work of a hidden tab.
  async function shoot(scene, theme, width, height, samples) {
    let art_ = '';
    if (scene === 'latte' || scene === 'top') {
      const surfaceTheme = scene === 'top' ? { ...theme, art: 'wordmark' } : theme;
      const url = await art.evaluate(`renderImage(${JSON.stringify(surfaceTheme)}, 'surface', 2048, 2048, 'image/png')`);
      const file = join(scratch, 'surface.png');
      writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
      art_ = `, art: ${JSON.stringify(pathToFileURL(file).href + '?' + Date.now())}`;
      const strip = await art.evaluate(`renderImage(${JSON.stringify(theme)}, 'layers', 512, 32, 'image/png')`);
      const stripFile = join(scratch, 'layers.png');
      writeFileSync(stripFile, Buffer.from(strip.split(',')[1], 'base64'));
      art_ += `, layers: ${JSON.stringify(pathToFileURL(stripFile).href + '?' + Date.now())}`;
    }
    await photo.send('Page.bringToFront');
    const url = await photo.evaluate(`renderPhoto({ scene: '${scene}', width: ${width}, height: ${height}, samples: ${samples}, theme: ${JSON.stringify(theme)}${art_} })`);
    return Buffer.from(url.split(',')[1], 'base64');
  }
  async function close() { await browser.close(); rmSync(scratch, { recursive: true, force: true }); }
  return { shoot, close };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const wanted = process.argv.slice(2);
  const done = new Set(process.env.RESUME && existsSync(DONE) ? readFileSync(DONE, 'utf8').split('\n') : []);
  if (!process.env.RESUME && !PREVIEW) { mkdirSync(dirname(DONE), { recursive: true }); writeFileSync(DONE, ''); }
  const jobs = [];
  for (const [kind, file] of PHOTOS.filter(([k]) => KINDS.includes(k))) {
    for (const t of wanted.length ? themes.filter(x => wanted.includes(x.slug)) : themes) {
      for (const { key } of VARIANTS.filter(v => ONLY.includes(v.key))) {
        const id = `${t.slug}/${key}/${file}`;
        if (done.has(id)) continue;
        const out = PREVIEW ? join(OUT, `${t.slug}-${key}-${file}.jpg`) : join(OUT, t.slug, key, 'backgrounds', `${file}.jpg`);
        jobs.push({ t, key, kind, out, id });
      }
    }
  }
  const pages = await openPhotoPages();
  const started = Date.now();
  let n = 0;
  for (const { t, key, kind, out, id } of jobs) {
    const jpeg = await pages.shoot(kind, renderTheme(t, t.variants[key]), SIZE[0], SIZE[1], SAMPLES);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, jpeg);
    if (!PREVIEW) appendFileSync(DONE, id + '\n');
    n++;
    const left = (Date.now() - started) / n * (jobs.length - n) / 60000;
    process.stdout.write(`\r${n}/${jobs.length} photos, about ${left.toFixed(0)} min left   `);
  }
  process.stdout.write('\n');
  await pages.close();
}
