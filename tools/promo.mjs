// Renders site/assets/promo.mp4: the 5 backgrounds, night and day, then
// every drink, one per beat. Each beat starts at night and pours into day.
// The clips are the real screenshots from tools/capture.sh.
//
//   node tools/promo.mjs <song.mp3>
//
// Environment:
//   BPM        tempo of the song (default 72, the tempo of calm-lofi.mp3)
//   FIRST_BEAT time of the first beat in seconds (default 0.813)
//   URL        text on the outro card
//
// Run tools/render.mjs, tools/capture.sh and tools/assets.mjs first.
// Needs `chromium` and `ffmpeg`.

import { spawn } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { themes, CATEGORIES } from './palettes.mjs';
import { launch, logoPaths } from './cdp.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SONG = process.argv[2];
if (!SONG) { console.error('Usage: node tools/promo.mjs <song.mp3>'); process.exit(1); }

const FPS = 30;
const BEAT = 60 / Number(process.env.BPM || 72);
const FIRST_BEAT = Number(process.env.FIRST_BEAT || 0.813);
const URL_TEXT = process.env.URL || 'bjarneo.github.io/coffee-themes';
const OUT = join(ROOT, 'site', 'assets', 'promo.mp4');
const file = (...p) => pathToFileURL(join(ROOT, ...p)).href;
mkdirSync(dirname(OUT), { recursive: true });

const frameAt = beat => Math.round((FIRST_BEAT + beat * BEAT) * FPS);
const hero = themes.find(t => t.slug === 'cappuccino');
const pick = (t, key) => ({ colors: t.variants[key].colors, ansi: t.variants[key].ansi, second: t.variants[key].second });

const BACKGROUNDS = [
  ['0-omarchy-wordmark', 'Wordmark'], ['1-latte-art', 'Latte art'], ['2-recipe', 'Recipe'],
  ['3-crema-swirl', 'Crema swirl'], ['4-coffee-beans', 'Coffee beans'],
];

const clips = themes.map(t => ({
  name: t.name, index: t.index, category: CATEGORIES[t.cat],
  src: { night: file('.capture', t.slug, 'night.png'), day: file('.capture', t.slug, 'day.png') },
  night: pick(t, 'night'), day: pick(t, 'day'),
}));

// Intro 4 beats, 5 backgrounds, night and day 2 beats, then a card before
// each category and one beat for each drink, then the outro.
const segments = [{ kind: 'intro', from: 0, to: frameAt(4) }];
let beat = 4;
BACKGROUNDS.forEach((_, i) => { segments.push({ kind: 'backgrounds', i, from: frameAt(beat), to: frameAt(beat + 1) }); beat++; });
for (const part of [0, 1]) { segments.push({ kind: 'nightday', part, from: frameAt(beat), to: frameAt(beat + 1) }); beat++; }
Object.entries(CATEGORIES).forEach(([key, label], ci) => {
  const list = themes.filter(t => t.cat === key);
  segments.push({ kind: 'section', label, part: ci + 1, count: list.length, theme: pick(list[0], 'night'), from: frameAt(beat), to: frameAt(beat + 1) });
  beat++;
  for (const t of list) {
    segments.push({ kind: 'clip', index: themes.indexOf(t), from: frameAt(beat), to: frameAt(beat + 1) });
    beat++;
  }
});
segments.push({ kind: 'outro', from: frameAt(beat), to: frameAt(beat + 8) });
const total = segments[segments.length - 1].to;
const seconds = total / FPS;

const browser = await launch();
const page = await browser.open(pathToFileURL(join(ROOT, 'tools/promo.html')).href);
await page.evaluate(`setup(${JSON.stringify({
  logo: logoPaths(readFileSync('/usr/share/omarchy/logo.svg', 'utf8')),
  wall: file('site', 'assets', 'mosaic.jpg'),
  url: URL_TEXT,
  intro: pick(hero, 'night'),
  introDay: pick(hero, 'day'),
  hero: [file(hero.slug, 'night', 'backgrounds', '1-latte-art.jpg'), file('.capture', hero.slug, 'night.png'), file('.capture', hero.slug, 'day.png')],
  backgrounds: BACKGROUNDS.map(([f, label]) => ({ label, src: file('site', 'assets', 'aether', hero.slug, 'night', `${f}.jpg`) })),
  clips,
})})`);

const ffmpeg = spawn('ffmpeg', [
  '-v', 'error', '-y',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-i', SONG,
  '-map', '0:v', '-map', '1:a',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '160k', '-af', `afade=t=out:st=${(seconds - 3).toFixed(2)}:d=3`,
  '-t', seconds.toFixed(3), '-movflags', '+faststart', OUT,
], { stdio: ['pipe', 'inherit', 'inherit'] });

let written = 0;
for (const seg of segments) {
  if (seg.kind === 'clip') await page.evaluate(`prepare(${seg.index})`);
  const n = seg.to - seg.from;
  for (let f = 0; f < n; f++) {
    const url = await page.evaluate(`frame(${JSON.stringify(seg)}, ${f}, ${n})`);
    const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
    if (!ffmpeg.stdin.write(buf)) await new Promise(r => ffmpeg.stdin.once('drain', r));
    written++;
  }
  process.stdout.write(`\r${written}/${total} frames`);
}
ffmpeg.stdin.end();
await new Promise(r => ffmpeg.on('close', r));
process.stdout.write(`\nwrote ${OUT} (${seconds.toFixed(1)}s)\n`);
page.close();
await browser.close();
