// Writes colors.toml and icons.theme for every theme and variant, and the
// theme data for the site.
//
//   node tools/build.mjs

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { themes, VARIANTS, CATEGORIES, colorsToml } from './palettes.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

for (const t of themes) {
  for (const { key } of VARIANTS) {
    const v = t.variants[key];
    const dir = join(ROOT, t.slug, key);
    mkdirSync(join(dir, 'backgrounds'), { recursive: true });
    writeFileSync(join(dir, 'colors.toml'), colorsToml(v));
    writeFileSync(join(dir, 'icons.theme'), `${v.icons}\n`);
  }
}

// Theme data for site/index.html.
const data = {
  variants: VARIANTS.map(({ key, label, suffix }) => ({ key, label, suffix })),
  categories: Object.entries(CATEGORIES).map(([key, label]) => ({ key, label })),
  themes: themes.map(t => ({
    index: t.index, name: t.name, slug: t.slug, cat: t.cat, desc: t.desc, origin: t.origin, recipe: t.recipe,
    variants: Object.fromEntries(VARIANTS.map(({ key }) => {
      const v = t.variants[key];
      return [key, { install: v.install, name: v.name, icons: v.icons, colors: v.colors, ansi: v.ansi, second: v.second }];
    })),
  })),
};
mkdirSync(join(ROOT, 'site', 'assets'), { recursive: true });
writeFileSync(join(ROOT, 'site', 'assets', 'themes.js'), `window.THEMES = ${JSON.stringify(data)};\n`);

console.log(`wrote ${themes.length} themes x ${VARIANTS.length} variants`);
