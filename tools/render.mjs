// Renders the recipe background of each theme variant with headless
// Chromium. tools/render.html draws it.
//
//   node tools/render.mjs                         render all themes and variants
//   node tools/render.mjs mocha latte             render the named themes
//   VARIANTS=day node tools/render.mjs            render only these variants
//   PREVIEW=1 OUT=/tmp/x node tools/render.mjs mocha
//                                                 write small JPEGs to $OUT
//   SIZE=3840x2160 node tools/render.mjs          render at another 16:9 size
//
// Needs `chromium` on PATH.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { themes, VARIANTS } from './palettes.mjs';
import { launch, logoPaths } from './cdp.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PREVIEW = !!process.env.PREVIEW;
const OUT = process.env.OUT || ROOT;
const WORKERS = Number(process.env.WORKERS || 3);
const LOGO_SVG = process.env.LOGO_SVG || '/usr/share/omarchy/logo.svg';
// Output size of the backgrounds. 6144x3456 is 6K at 16:9.
const SIZE = (process.env.SIZE || '6144x3456').split('x').map(Number);
const ONLY = process.env.VARIANTS ? process.env.VARIANTS.split(',') : VARIANTS.map(v => v.key);

// Background kinds and their file names. tools/photo.mjs renders the other
// backgrounds as photographs.
export const BACKGROUNDS = [
  ['recipe', '2-recipe'],
];
const KINDS = process.env.KINDS ? process.env.KINDS.split(',') : BACKGROUNDS.map(([k]) => k);

// The object that the renderer page draws from.
export function renderTheme(t, v) {
  const { variants, ...rest } = t;
  return { ...rest, name: v.name, base: t.name, slug: v.install, colors: v.colors, ansi: v.ansi, second: v.second };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const wanted = process.argv.slice(2);
  const list = wanted.length ? themes.filter(t => wanted.includes(t.slug)) : themes;
  const logo = logoPaths(readFileSync(LOGO_SVG, 'utf8'));
  const browser = await launch();

  const queue = [];
  for (const [kind, file] of BACKGROUNDS.filter(([k]) => KINDS.includes(k))) {
    for (const t of list) {
      for (const { key } of VARIANTS.filter(v => ONLY.includes(v.key))) {
        const dir = PREVIEW ? OUT : join(OUT, t.slug, key, 'backgrounds');
        mkdirSync(dir, { recursive: true });
        queue.push([renderTheme(t, t.variants[key]), kind, join(dir, PREVIEW ? `${t.slug}-${key}-${file}.jpg` : `${file}.jpg`)]);
      }
    }
  }

  let done = 0;
  const total = queue.length, started = Date.now();
  await Promise.all(Array.from({ length: Math.min(WORKERS, queue.length) }, async () => {
    const page = await browser.open(pathToFileURL(join(ROOT, 'tools/render.html')).href);
    await page.evaluate(`setLogo(${JSON.stringify(logo)})`);
    while (queue.length) {
      const [theme, kind, file] = queue.shift();
      const [width, height] = PREVIEW ? [960, 540] : SIZE;
      // Chromium encodes the JPEG. A PNG at 6K takes seconds to encode and convert.
      const url = await page.evaluate(`renderImage(${JSON.stringify(theme)}, ${JSON.stringify(kind)}, ${width}, ${height}, 'image/jpeg', ${PREVIEW ? .85 : .9})`);
      writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
      done++;
      process.stdout.write(`\r${done}/${total} images, ${((Date.now() - started) / 1000).toFixed(0)}s   `);
    }
    page.close();
  }));
  process.stdout.write('\n');
  await browser.close();
}
