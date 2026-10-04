// Writes README.md from the theme data.
//
//   node tools/readme.mjs

import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { themes, VARIANTS, CATEGORIES, contrast } from './palettes.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'https://github.com/bjarneo/coffee-themes';
const SITE = 'https://bjarneo.github.io/coffee-themes';

// Lowest contrast of the 6 normal ANSI colors and the text, per variant.
function stats(key) {
  let normal = 99, text = 99;
  for (const t of themes) {
    const v = t.variants[key], bg = v.colors.background;
    v.ansi.slice(1, 7).forEach(h => normal = Math.min(normal, contrast(h, bg)));
    text = Math.min(text, contrast(v.colors.foreground, bg));
  }
  return { normal: normal.toFixed(1), text: text.toFixed(1) };
}

const anchor = s => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}\- ]/gu, '').replace(/ /g, '-');
const pad = n => String(n).padStart(2, '0');
const sizeMb = Math.round(Number(execFileSync('du', ['-sm', '--exclude=.git', '--exclude=.capture', ROOT]).toString().split('\t')[0]) / 10) * 10;

const USE = {
  night: 'A dark coffee background with warm colors. For the evening and dim rooms.',
  day: 'A cream background with the same hues. For bright rooms and daylight.',
};

const variantTable = VARIANTS.map(v => {
  const s = stats(v.key);
  return `| ${v.label} | \`mocha${v.suffix}\` | ${USE[v.key]} | ${s.normal}:1 | ${s.text}:1 |`;
}).join('\n');

const RECIPE = { drink: 'the recipe', roast: 'the roast curve', cherry: 'a coffee cherry in cross-section' };

const signatures = themes.filter(t => t.signature).map(t => `[${t.name}](#${anchor(t.name)})`).join(', ');

const menu = Object.entries(CATEGORIES).map(([key, label]) => {
  const list = themes.filter(t => t.cat === key);
  return `| ${label} | ${list.map(t => `[${t.name}](#${anchor(t.name)})`).join(', ')} |`;
}).join('\n');

const sections = Object.entries(CATEGORIES).map(([key, label]) => {
  const list = themes.filter(t => t.cat === key);
  return `## ${label}

${list.map(t => {
    const rows = VARIANTS.map(v => {
      const tv = t.variants[v.key], c = tv.colors;
      return `| ${v.label} | [\`${tv.install}\`](${t.slug}/${v.key}/) | \`${c.background}\` | \`${c.foreground}\` | \`${c.accent}\` | \`${tv.icons}\` |`;
    }).join('\n');
    const colors = VARIANTS.map(v => {
      const a = t.variants[v.key].ansi;
      return `| ${v.label} | ${a.slice(0, 8).map(h => `\`${h}\``).join(' ')} | ${a.slice(8).map(h => `\`${h}\``).join(' ')} |`;
    }).join('\n');
    const origin = (t.signature ? ' · Signature palette' : '') + (t.origin ? ` · Origin: ${t.origin}` : '');
    return `### ${t.name}

[![${t.name} at night and in the day](site/assets/shots/${t.slug}/pair.webp)](${SITE}/#${t.slug})

\`${pad(t.index)}\`${origin} · Folder: [\`${t.slug}/\`](${t.slug}/) · [Open on the site](${SITE}/#${t.slug})

${t.desc} The recipe background shows ${RECIPE[t.recipe]}.

| Variant | Theme name | \`background\` | \`foreground\` | \`accent\` | Icons |
| --- | --- | --- | --- | --- | --- |
${rows}

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
${colors}

</details>

\`\`\`bash
curl -fsSL ${SITE}/install.sh | bash -s -- ${t.slug} --set
\`\`\`
`;
  }).join('\n')}`;
}).join('\n');

const readme = `# Coffee themes for Omarchy

[![All 164 themes, from the darkest night to the lightest day.](site/assets/mosaic.jpg)](${SITE})

This repo has 82 coffee themes for [Omarchy](https://omarchy.org), from espresso to Italian roast. Each theme has a night variant and a day variant. That makes 164 Omarchy themes. Each variant has a 16-color ANSI palette, 5 backgrounds at 6K and 2 animated backgrounds.

- Site: [${SITE.replace('https://', '')}](${SITE})
- Promo video: [\`site/assets/promo.mp4\`](site/assets/promo.mp4), all 82 drinks, one per beat
- Screenshots: real captures of an Omarchy desktop with each variant applied
- Backgrounds: 820 images at 6K, 6144×3456, and 328 videos at 3840×2160

## Variants

| Variant | Theme name | What it is | Lowest ANSI contrast | Lowest text contrast |
| --- | --- | --- | --- | --- |
${variantTable}

The contrast columns show the lowest WCAG contrast ratio against the background, over all 82 themes. The script raises or lowers the lightness of each color until it reaches its target. The 6 main ANSI colors reach at least 4.5:1, the WCAG AA level. The muted color for comments reaches at least 3.8:1. Each variant is a complete Omarchy theme with its own folder, so you can install any mix of them.

## Signature palettes

${themes.filter(t => t.signature).length} drinks use a signature palette. Like Osaka Jade and Miasma in Omarchy, they fill the 6 ANSI slots with the colors of the drink, so a slot can hold a color that is not its name. The yellow of Cold Brew is coffee amber, the blue of Pumpkin Spice Latte is pumpkin, and the roast levels use the browns of their roast. The other drinks keep a classic palette, where red is red and blue is blue.

The contrast targets above apply to both kinds. A check also keeps the 6 slots apart, so no 2 slots look the same.

Signature palettes: ${signatures}.

## Backgrounds

Each variant has 7 backgrounds: 5 images and 2 videos. Omarchy shows them in this order. To show the next one, run \`omarchy theme bg next\`.

| File | What it shows |
| --- | --- |
| \`0-omarchy-wordmark.jpg\` | The Omarchy wordmark with coffee ring stains. The ANSI colors sit under it as coffee beans. |
| \`1-latte-art.jpg\` | A top view of the drink on a table: latte art, crema, cream, ice or cocoa dust. |
| \`2-recipe.jpg\` | A cross-section of the drink with the share of each part. Roast levels show the roast curve. Coffee beans show a coffee cherry. |
| \`3-crema-swirl.jpg\` | Cream that swirls into coffee, with a thin ribbon of the accent color. |
| \`4-coffee-beans.jpg\` | Roasted beans in the roast color of the theme. |
| \`5-steam.mp4\` | A 12 second loop at 3840×2160. The Omarchy wordmark is latte art in a cappuccino, and steam drifts over the cup. |
| \`6-pour.mp4\` | A 37 second loop at 3840×2160. It shows the 5 images in turn, and each one pours into the next behind a creamy milk front, like the transition of the promo video. |

## Install

\`install.sh\` copies themes into \`~/.config/omarchy/themes\`. Each theme variant becomes a normal Omarchy theme folder. The script installs the night and day variants of a theme unless you name one with \`--variant\`.

### Install one theme without a clone

The script downloads only the themes that you name:

\`\`\`bash
curl -fsSL ${SITE}/install.sh | bash -s -- mocha --set
\`\`\`

To install one variant only, add \`--variant\`:

\`\`\`bash
curl -fsSL ${SITE}/install.sh | bash -s -- mocha latte --variant day
\`\`\`

\`--set\` applies the first installed variant of the last theme.

### Install from a clone

\`\`\`bash
git clone --depth 1 ${REPO} ~/.local/share/coffee-themes
cd ~/.local/share/coffee-themes
./install.sh --all
omarchy theme set mocha-night
\`\`\`

The full repo is about ${sizeMb} MB because it has 820 backgrounds at 6K. To download less, use the \`curl\` command above. It downloads only the folders that you name.

### Options

| Command | Result |
| --- | --- |
| \`install.sh mocha latte\` | Installs the night and day variants of the named themes |
| \`install.sh mocha --variant day\` | Installs only this variant |
| \`install.sh --all\` | Installs all 164 themes |
| \`install.sh --list\` | Lists the 82 theme names |
| \`install.sh mocha --set\` | Installs the theme, then applies its night variant |
| \`install.sh --update\` | Installs again every theme variant that the script installed |
| \`install.sh --remove mocha\` | Removes the variants of a theme that the script installed |
| \`install.sh --link mocha\` | Links to the clone instead of copying. Run \`git pull\` in the clone to update. |
| \`install.sh --force mocha\` | Replaces a theme with the same name that the script did not install |

The variant names are \`night\` and \`day\`. The script writes a \`.coffee-themes\` marker file in each theme that it copies. \`--update\` and \`--remove\` use this file, so they never change a theme that you made.

### Apply with Aether

[Aether](https://github.com/omacom/aether) can apply a theme straight from the [site](${SITE}). Open a drink, pick a variant and a background, and select 1 of these buttons:

| Button | Result |
| --- | --- |
| Apply with Aether | Aether loads the palette and the background, then applies them at once through its own theme. |
| Install as Omarchy theme | Aether adds the variant to \`~/.config/omarchy/themes\` and activates it at once. This stops if a theme with the same name exists, for example after \`install.sh\`. |
| Open in editor | Aether opens the palette in its editor. Nothing changes until you select Apply. |

Aether stops a download after 60 seconds. On a slow connection, a 6K background can take longer, so the links download a 3840×2160 copy from \`site/assets/aether/\`. GitHub does not render \`aether://\` links, so use the site or build a link yourself:

\`\`\`text
aether://apply?colors=${SITE}/mocha/night/colors.toml&wallpaper=${SITE}/assets/aether/mocha/night/1-latte-art.jpg&silent=true
\`\`\`

Add \`&as_omarchy_theme=mocha-night\` to install the variant. Use \`&edit=true\` instead of \`&silent=true\` to open the editor.

### Name conflicts

All theme names end in \`-night\` or \`-day\`, so they do not collide with the themes that ship with Omarchy. The script does not replace a theme that it did not install. If \`~/.config/omarchy/themes/mocha-night\` exists, the script skips it and tells you. Rename your theme, or use \`--force\` to replace it.

The single espresso shot is called Espresso Solo. Its names are \`espresso-solo-night\` and \`espresso-solo-day\`, so they do not collide with \`espresso-day\` from [100-themes](https://github.com/bjarneo/100-themes).

\`omarchy theme install <url>\` does not work with this repo. That command expects one theme at the root of a repo.

## Switch themes and backgrounds

\`\`\`bash
omarchy theme set mocha-night   # apply a theme
omarchy theme set mocha-day     # the same drink in daylight
omarchy theme bg next           # show the next background of the current theme
\`\`\`

## The menu

| Category | Drinks |
| --- | --- |
${menu}

${sections}

## How the themes are made

The scripts in [\`tools/\`](tools/) make every file in this repo. They need Node.js 22 or later, Chromium, ImageMagick and ffmpeg. \`tools/capture.sh\` also needs Omarchy, Hyprland and grim.

| Script | Output |
| --- | --- |
| \`tools/palettes.mjs\` | The drink table and the color math. Every other script reads it. |
| \`tools/build.mjs\` | \`colors.toml\` and \`icons.theme\` of each variant, and \`site/assets/themes.js\` |
| \`tools/render.mjs\` | The 5 backgrounds of each variant at 6K. \`tools/render.html\` draws them on a canvas. |
| \`tools/steam.mjs\` | The steam video of each variant. \`tools/steam.html\` draws the steam once, \`tools/render.html\` draws the cup, and ffmpeg lays the steam over the cup. |
| \`tools/pour.mjs\` | The pour video of each variant. \`tools/pour.html\` draws the pour once, and ffmpeg pours each image into the next. |
| \`tools/capture.sh\` | \`preview.png\` of each variant and the site screenshots. It applies each variant on this desktop and takes a screenshot of workspace 8. |
| \`tools/assets.mjs\` | The site previews, the thumbnails, the Aether copies and the mosaic |
| \`tools/promo.mjs\` | \`site/assets/promo.mp4\`. \`tools/promo.html\` draws the frames. |
| \`tools/readme.mjs\` | This README |

To build everything again, run the scripts in this order:

\`\`\`bash
node tools/build.mjs
node tools/render.mjs
node tools/steam.mjs
node tools/pour.mjs
tools/capture.sh
node tools/assets.mjs
node tools/promo.mjs song.mp3
node tools/readme.mjs
\`\`\`

\`tools/capture.sh\` takes about 25 minutes. It changes the theme of the desktop 164 times and shows workspace 8 the whole time. Open the windows that you want in the screenshots on workspace 8 first. If you switch to another workspace, the script stops and restores your theme. Run it again to continue where it stopped.

To change a drink, edit its row in \`tools/palettes.mjs\`, then run the scripts with the theme name, for example \`node tools/render.mjs mocha\` and \`tools/capture.sh mocha\`.

The site in [\`site/\`](site/) is a static page. The workflow in \`.github/workflows/pages.yml\` copies \`install.sh\` and every \`colors.toml\` into it and publishes it to GitHub Pages.
`;

writeFileSync(join(ROOT, 'README.md'), readme);
console.log(`wrote README.md (${themes.length} themes)`);
