# Coffee themes for Omarchy

[![All 164 themes, from the darkest night to the lightest day.](site/assets/mosaic.jpg)](https://bjarneo.github.io/coffee-themes)

This repo has 82 coffee themes for [Omarchy](https://omarchy.org), from espresso to Italian roast. Each theme has a night variant and a day variant. That makes 164 Omarchy themes. Each variant has a 16-color ANSI palette and 5 backgrounds at 6K.

- Site: [bjarneo.github.io/coffee-themes](https://bjarneo.github.io/coffee-themes)
- Promo video: [`site/assets/promo.mp4`](site/assets/promo.mp4), all 82 drinks, one per beat
- Backgrounds: 820 at 6K, 6144×3456

## Variants

| Variant | Theme name | What it is | Lowest ANSI contrast | Lowest text contrast |
| --- | --- | --- | --- | --- |
| Night | `mocha-night` | A dark coffee background with warm colors. For the evening and dim rooms. | 6.2:1 | 12.3:1 |
| Day | `mocha-day` | A cream background with the same hues. For bright rooms and daylight. | 4.5:1 | 11.8:1 |

The contrast columns show the lowest WCAG contrast ratio against the background, over all 82 themes. The script raises or lowers the lightness of each color until it reaches its target. The 6 main ANSI colors reach at least 4.5:1, the WCAG AA level. The muted color for comments reaches at least 3.8:1. Each variant is a complete Omarchy theme with its own folder, so you can install any mix of them.

## Backgrounds

Each variant has 5 backgrounds. Omarchy shows them in this order. To show the next one, run `omarchy theme bg next`.

| File | What it shows |
| --- | --- |
| `0-omarchy-wordmark.jpg` | The Omarchy wordmark with coffee ring stains. The ANSI colors sit under it as coffee beans. |
| `1-latte-art.jpg` | A top view of the drink on a table: latte art, crema, cream, ice or cocoa dust. |
| `2-recipe.jpg` | A cross-section of the drink with the share of each part. Roast levels show the roast curve. Coffee beans show a coffee cherry. |
| `3-crema-swirl.jpg` | Cream that swirls into coffee, with a thin ribbon of the accent color. |
| `4-coffee-beans.jpg` | Roasted beans in the roast color of the theme. |

## Install

`install.sh` copies themes into `~/.config/omarchy/themes`. Each theme variant becomes a normal Omarchy theme folder. The script installs the night and day variants of a theme unless you name one with `--variant`.

### Install one theme without a clone

The script downloads only the themes that you name:

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- mocha --set
```

To install one variant only, add `--variant`:

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- mocha latte --variant day
```

`--set` applies the first installed variant of the last theme.

### Install from a clone

```bash
git clone --depth 1 https://github.com/bjarneo/coffee-themes ~/.local/share/coffee-themes
cd ~/.local/share/coffee-themes
./install.sh --all
omarchy theme set mocha-night
```

The full repo is about 1150 MB because it has 820 backgrounds at 6K. To download less, use the `curl` command above. It downloads only the folders that you name.

### Options

| Command | Result |
| --- | --- |
| `install.sh mocha latte` | Installs the night and day variants of the named themes |
| `install.sh mocha --variant day` | Installs only this variant |
| `install.sh --all` | Installs all 164 themes |
| `install.sh --list` | Lists the 82 theme names |
| `install.sh mocha --set` | Installs the theme, then applies its night variant |
| `install.sh --update` | Installs again every theme variant that the script installed |
| `install.sh --remove mocha` | Removes the variants of a theme that the script installed |
| `install.sh --link mocha` | Links to the clone instead of copying. Run `git pull` in the clone to update. |
| `install.sh --force mocha` | Replaces a theme with the same name that the script did not install |

The variant names are `night` and `day`. The script writes a `.coffee-themes` marker file in each theme that it copies. `--update` and `--remove` use this file, so they never change a theme that you made.

### Apply with Aether

[Aether](https://github.com/omacom/aether) can apply a theme straight from the [site](https://bjarneo.github.io/coffee-themes). Open a drink, pick a variant and a background, and select 1 of these buttons:

| Button | Result |
| --- | --- |
| Apply with Aether | Aether loads the palette and the background, then applies them at once through its own theme. |
| Install as Omarchy theme | Aether adds the variant to `~/.config/omarchy/themes` and activates it at once. This stops if a theme with the same name exists, for example after `install.sh`. |
| Open in editor | Aether opens the palette in its editor. Nothing changes until you select Apply. |

Aether stops a download after 60 seconds. On a slow connection, a 6K background can take longer, so the links download a 3840×2160 copy from `site/assets/aether/`. GitHub does not render `aether://` links, so use the site or build a link yourself:

```text
aether://apply?colors=https://bjarneo.github.io/coffee-themes/mocha/night/colors.toml&wallpaper=https://bjarneo.github.io/coffee-themes/assets/aether/mocha/night/1-latte-art.jpg&silent=true
```

Add `&as_omarchy_theme=mocha-night` to install the variant. Use `&edit=true` instead of `&silent=true` to open the editor.

### Name conflicts

All theme names end in `-night` or `-day`, so they do not collide with the themes that ship with Omarchy. The script does not replace a theme that it did not install. If `~/.config/omarchy/themes/mocha-night` exists, the script skips it and tells you. Rename your theme, or use `--force` to replace it.

The single espresso shot is called Espresso Solo. Its names are `espresso-solo-night` and `espresso-solo-day`, so they do not collide with `espresso-day` from [100-themes](https://github.com/bjarneo/100-themes).

`omarchy theme install <url>` does not work with this repo. That command expects one theme at the root of a repo.

## Switch themes and backgrounds

```bash
omarchy theme set mocha-night   # apply a theme
omarchy theme set mocha-day     # the same drink in daylight
omarchy theme bg next           # show the next background of the current theme
```

## The menu

| Category | Drinks |
| --- | --- |
| Espresso drinks | [Espresso Solo](#espresso-solo), [Doppio](#doppio), [Ristretto](#ristretto), [Lungo](#lungo), [Americano](#americano), [Long Black](#long-black), [Macchiato](#macchiato), [Cortado](#cortado), [Gibraltar](#gibraltar), [Piccolo](#piccolo), [Flat White](#flat-white), [Cappuccino](#cappuccino), [Latte](#latte), [Latte Macchiato](#latte-macchiato), [Mocha](#mocha), [White Mocha](#white-mocha), [Breve](#breve), [Con Panna](#con-panna), [Romano](#romano), [Affogato](#affogato), [Marocchino](#marocchino), [Corretto](#corretto), [Red Eye](#red-eye), [Black Eye](#black-eye), [Dead Eye](#dead-eye) |
| Brewing methods | [Drip Coffee](#drip-coffee), [Pour-Over](#pour-over), [French Press](#french-press), [AeroPress](#aeropress), [Chemex](#chemex), [Siphon](#siphon), [Moka Pot](#moka-pot), [Percolator](#percolator), [Cold Brew](#cold-brew), [Nitro Cold Brew](#nitro-cold-brew), [Turkish Coffee](#turkish-coffee), [Cowboy Coffee](#cowboy-coffee) |
| Iced and cold drinks | [Iced Coffee](#iced-coffee), [Iced Latte](#iced-latte), [Shakerato](#shakerato), [Espresso Tonic](#espresso-tonic), [Japanese Iced Coffee](#japanese-iced-coffee), [Greek Frappé](#greek-frappé), [Dalgona Coffee](#dalgona-coffee), [Mazagran](#mazagran) |
| Regional drinks | [Irish Coffee](#irish-coffee), [Café au Lait](#café-au-lait), [Café Cubano](#café-cubano), [Cortadito](#cortadito), [Café Bombón](#café-bombón), [Carajillo](#carajillo), [Café de Olla](#café-de-olla), [Cà Phê Sữa Đá](#cà-phê-sữa-đá), [Cà Phê Trứng](#cà-phê-trứng), [Kopi](#kopi), [Yuanyang](#yuanyang), [Galão](#galão), [Wiener Melange](#wiener-melange), [Einspänner](#einspänner), [Pharisäer](#pharisäer), [Kaffeost](#kaffeost), [Qahwa](#qahwa), [Bicerin](#bicerin) |
| Flavored drinks | [Caramel Macchiato](#caramel-macchiato), [Vanilla Latte](#vanilla-latte), [Hazelnut Latte](#hazelnut-latte), [Peppermint Mocha](#peppermint-mocha), [Pumpkin Spice Latte](#pumpkin-spice-latte), [Honey Latte](#honey-latte), [Lavender Latte](#lavender-latte), [Dirty Chai](#dirty-chai) |
| Coffee beans | [Arabica](#arabica), [Robusta](#robusta), [Liberica](#liberica), [Excelsa](#excelsa) |
| Roast levels | [Cinnamon Roast](#cinnamon-roast), [Light Roast](#light-roast), [City Roast](#city-roast), [Full City Roast](#full-city-roast), [Vienna Roast](#vienna-roast), [French Roast](#french-roast), [Italian Roast](#italian-roast) |

## Espresso drinks

### Espresso Solo

[![Espresso Solo at night and in the day](site/assets/shots/espresso-solo/pair.webp)](https://bjarneo.github.io/coffee-themes/#espresso-solo)

`01` · Folder: [`espresso-solo/`](espresso-solo/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#espresso-solo)

A short, strong shot of coffee. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`espresso-solo-night`](espresso-solo/night/) | `#160a05` | `#eeddd4` | `#e4a249` | `Yaru-yellow` |
| Day | [`espresso-solo-day`](espresso-solo/day/) | `#fcf0e4` | `#392b1b` | `#98630c` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#261810` `#e48875` `#a1bd77` `#fbb960` `#6db4df` `#d990bd` `#67cbc3` `#d8c6bd` | `#836c60` `#f1a493` `#bad198` `#fed7a6` `#90c9ed` `#e9abd1` `#90dfd8` `#fdf5f1` |
| Day | `#eeddcc` `#a44937` `#5c762b` `#986303` `#116b96` `#944c7b` `#107a74` `#594a3b` | `#877767` `#923523` `#4a630f` `#7e5101` `#005981` `#83396a` `#0c6560` `#1f1308` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- espresso-solo --set
```

### Doppio

[![Doppio at night and in the day](site/assets/shots/doppio/pair.webp)](https://bjarneo.github.io/coffee-themes/#doppio)

`02` · Folder: [`doppio/`](doppio/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#doppio)

A double shot of espresso. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`doppio-night`](doppio/night/) | `#170b06` | `#f0ddd5` | `#f19a4b` | `Yaru` |
| Day | [`doppio-day`](doppio/day/) | `#fef0e3` | `#3a2a1a` | `#a75c00` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#281912` `#ec8279` `#9dbf6f` `#feb763` `#68b3e9` `#df8bbf` `#52cdcb` `#dac6bd` | `#846b61` `#f99f97` `#b7d392` `#fdd6ad` `#8cc8f5` `#eea7d2` `#84e0de` `#fdf5f1` |
| Day | `#f0ddcb` `#ac403b` `#58781e` `#9b6109` `#016a9f` `#9a467d` `#127b7a` `#5a4a3b` | `#887767` `#9a2a29` `#466500` `#825107` `#055885` `#88336c` `#0c6665` `#1f1307` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- doppio --set
```

### Ristretto

[![Ristretto at night and in the day](site/assets/shots/ristretto/pair.webp)](https://bjarneo.github.io/coffee-themes/#ristretto)

`03` · Folder: [`ristretto/`](ristretto/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#ristretto)

A short pull with less water. It tastes sweeter and stronger. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`ristretto-night`](ristretto/night/) | `#150704` | `#f1dcd6` | `#fb9167` | `Yaru` |
| Day | [`ristretto-day`](ristretto/day/) | `#fdf0e6` | `#3c291a` | `#b84b17` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#26140f` `#ef816b` `#9fbe70` `#faba5d` `#63b5e3` `#e08cbc` `#59cdc9` `#dbc5be` | `#866a62` `#fb9f8c` `#b8d393` `#fed7a5` `#89caf0` `#efa8d0` `#88e0dd` `#fdf5f2` |
| Day | `#f2dcca` `#af3e2b` `#5a7821` `#96640a` `#0b6b95` `#9a477a` `#0c7a78` `#5b493a` | `#8a7666` `#9d2713` `#476303` `#7d5309` `#03597d` `#893369` `#086563` `#201307` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- ristretto --set
```

### Lungo

[![Lungo at night and in the day](site/assets/shots/lungo/pair.webp)](https://bjarneo.github.io/coffee-themes/#lungo)

`04` · Folder: [`lungo/`](lungo/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#lungo)

A long pull with more water. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`lungo-night`](lungo/night/) | `#1b1109` | `#edded3` | `#d4a965` | `Yaru-yellow` |
| Day | [`lungo-day`](lungo/day/) | `#fbf1e5` | `#382b1b` | `#916508` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2c2017` `#dc8d7b` `#a0bc80` `#e9c17a` `#77b3db` `#d593b9` `#71c9c6` `#d7c7bc` | `#826f60` `#eaa898` `#b9d19f` `#fbd9a0` `#98c8ea` `#e5aecd` `#97ddda` `#fcf5f0` |
| Day | `#ecdecd` `#9d4f3e` `#5b7638` `#90680f` `#276a92` `#905077` `#127b7a` `#574b3b` | `#857867` `#8b3c2b` `#496321` `#785503` `#0a5981` `#7f3e66` `#006766` `#1e1408` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- lungo --set
```

### Americano

[![Americano at night and in the day](site/assets/shots/americano/pair.webp)](https://bjarneo.github.io/coffee-themes/#americano)

`05` · Folder: [`americano/`](americano/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#americano)

Espresso with hot water added. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`americano-night`](americano/night/) | `#1a120c` | `#ecded6` | `#dfa360` | `Yaru-yellow` |
| Day | [`americano-day`](americano/day/) | `#f9f1e8` | `#372b1f` | `#9c610b` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2a201a` `#e48682` `#98bf7a` `#f6bb6f` `#77b0e9` `#da8fbf` `#5bcccb` `#d6c7be` | `#806f64` `#f1a29e` `#b2d39a` `#fed7a8` `#97c6f5` `#eaaad2` `#89dfdf` `#fcf5f1` |
| Day | `#eaded1` `#a54746` `#52792f` `#996306` `#29669f` `#954b7c` `#007a7a` `#564b3e` | `#84786a` `#933335` `#3f6616` `#7f5105` `#0f558e` `#84386b` `#0f6565` `#1d140a` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- americano --set
```

### Long Black

[![Long Black at night and in the day](site/assets/shots/long-black/pair.webp)](https://bjarneo.github.io/coffee-themes/#long-black)

`06` · Folder: [`long-black/`](long-black/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#long-black)

Hot water with espresso poured on top. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`long-black-night`](long-black/night/) | `#110a07` | `#ebded8` | `#dda552` | `Yaru-yellow` |
| Day | [`long-black-day`](long-black/day/) | `#f9f1ea` | `#362c21` | `#96650a` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#211814` `#e48780` `#8dc283` `#f1be67` `#6db3e4` `#dc8eb9` `#5fccc6` `#d5c7c0` | `#7e6e65` `#f2a39c` `#aad6a2` `#fed89b` `#90c8f1` `#ebaacc` `#8bdfda` `#fdf5f1` |
| Day | `#e9ded4` `#a54743` `#457b3b` `#92670c` `#136a9a` `#974a77` `#0e7c78` `#564b40` | `#84786c` `#933331` `#2f6724` `#7a5400` `#005885` `#853766` `#086662` `#1d140c` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- long-black --set
```

### Macchiato

[![Macchiato at night and in the day](site/assets/shots/macchiato/pair.webp)](https://bjarneo.github.io/coffee-themes/#macchiato)

`07` · Folder: [`macchiato/`](macchiato/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#macchiato)

Espresso marked with a spot of milk foam. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`macchiato-night`](macchiato/night/) | `#150a05` | `#eeded5` | `#eaddc1` | `Yaru-yellow` |
| Day | [`macchiato-day`](macchiato/day/) | `#fcf0e5` | `#392b1c` | `#7f6c45` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#251811` `#dc8b87` `#a2bc80` `#f2bc7f` `#78b2da` `#d693b7` `#74c9c3` `#d8c7bd` | `#826c61` `#eba6a1` `#bbd19f` `#fed6ab` `#98c7e9` `#e6aecb` `#99ddd8` `#fdf5f1` |
| Day | `#edddce` `#9e4d4a` `#5d7637` `#98631b` `#2a6a91` `#915075` `#077c77` `#584a3c` | `#877768` `#8c3a39` `#4b6322` `#815004` `#0f5981` `#803e64` `#036661` `#1e1408` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- macchiato --set
```

### Cortado

[![Cortado at night and in the day](site/assets/shots/cortado/pair.webp)](https://bjarneo.github.io/coffee-themes/#cortado)

`08` · Folder: [`cortado/`](cortado/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cortado)

Espresso cut with an equal amount of warm milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cortado-night`](cortado/night/) | `#1d140d` | `#ecded4` | `#e1a362` | `Yaru-yellow` |
| Day | [`cortado-day`](cortado/day/) | `#faf1e6` | `#382b1c` | `#9f5f01` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2e231a` `#e6857f` `#a1bd75` `#f6bb6f` `#70b3e4` `#d98fbe` `#60cbcc` `#d6c7bd` | `#837063` `#f3a29b` `#bad297` `#fed7a8` `#92c8f1` `#e9aad1` `#8cdfdf` `#fcf5f0` |
| Day | `#ebdece` `#a74542` `#5c7728` `#996304` `#1b699a` `#954b7c` `#127b7c` `#574b3c` | `#857868` `#953130` `#4a640a` `#7e5104` `#085884` `#83396b` `#0e6667` `#1d1409` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cortado --set
```

### Gibraltar

[![Gibraltar at night and in the day](site/assets/shots/gibraltar/pair.webp)](https://bjarneo.github.io/coffee-themes/#gibraltar)

`09` · Folder: [`gibraltar/`](gibraltar/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#gibraltar)

A cortado in a short Gibraltar glass. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`gibraltar-night`](gibraltar/night/) | `#0d1519` | `#d7e4ea` | `#72bed1` | `Yaru-prussiangreen` |
| Day | [`gibraltar-day`](gibraltar/day/) | `#eaf4f9` | `#213038` | `#16788b` | `Yaru-prussiangreen` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#1b2429` `#e48682` `#96c076` `#f4bc6e` `#6cb2eb` `#da8ec1` `#52cade` `#bfcdd4` | `#64757d` `#f1a29e` `#b1d497` `#ffd7a3` `#8fc8f7` `#eaaad4` `#83deee` `#f0f8fc` |
| Day | `#d5e3ea` `#a54746` `#507a2a` `#976401` `#1168a1` `#954a7f` `#127988` `#415057` | `#6d7d85` `#933334` `#3b660b` `#7d5202` `#045789` `#84376e` `#0c6571` `#0c181e` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- gibraltar --set
```

### Piccolo

[![Piccolo at night and in the day](site/assets/shots/piccolo/pair.webp)](https://bjarneo.github.io/coffee-themes/#piccolo)

`10` · Folder: [`piccolo/`](piccolo/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#piccolo)

A ristretto with warm milk in a small glass. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`piccolo-night`](piccolo/night/) | `#1d140c` | `#ecdfd4` | `#d1ab64` | `Yaru-yellow` |
| Day | [`piccolo-day`](piccolo/day/) | `#faf1e5` | `#372c1c` | `#8e6704` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d231a` `#dc8d7a` `#a2bc7f` `#e9c17a` `#77b3db` `#d693b8` `#71c9c7` `#d6c8bc` | `#827162` `#eaa897` `#bbd19e` `#fbd9a0` `#97c8ea` `#e6aecc` `#97dddb` `#fcf5f0` |
| Day | `#ebdece` `#9d4f3d` `#5d7636` `#90680f` `#276a92` `#915076` `#127b7a` `#574b3c` | `#857868` `#8b3d2a` `#4b6320` `#785503` `#095981` `#803e65` `#0d6564` `#1d1408` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- piccolo --set
```

### Flat White

[![Flat White at night and in the day](site/assets/shots/flat-white/pair.webp)](https://bjarneo.github.io/coffee-themes/#flat-white)

`11` · Folder: [`flat-white/`](flat-white/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#flat-white)

Espresso with thin, velvety microfoam. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`flat-white-night`](flat-white/night/) | `#1f1913` | `#e9e0d5` | `#e6d6b3` | `Yaru-yellow` |
| Day | [`flat-white-day`](flat-white/day/) | `#f8f1e8` | `#352c1f` | `#7e6c45` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#302921` `#d4908c` `#9fbc8b` `#edbe86` `#81b1d5` `#ce97b8` `#7ec6c6` `#d3c9bd` | `#807466` `#e4aaa6` `#b8d1a8` `#fed7a9` `#9fc6e4` `#dfb1cc` `#a0dada` `#fbf6f0` |
| Day | `#e8dfd2` `#965350` `#597644` `#936527` `#36698c` `#8b5576` `#257a7a` `#554c3f` | `#82796b` `#85413f` `#476331` `#7f5003` `#22587b` `#7a4365` `#086566` `#1c150a` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- flat-white --set
```

### Cappuccino

[![Cappuccino at night and in the day](site/assets/shots/cappuccino/pair.webp)](https://bjarneo.github.io/coffee-themes/#cappuccino)

`12` · Folder: [`cappuccino/`](cappuccino/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cappuccino)

Espresso with equal parts steamed milk and foam. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cappuccino-night`](cappuccino/night/) | `#1f130b` | `#efddd3` | `#e3a072` | `Yaru` |
| Day | [`cappuccino-day`](cappuccino/day/) | `#fdf0e3` | `#3a2b1a` | `#a05d29` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#302118` `#e4877b` `#9dbe79` `#fcb774` `#6eb4e1` `#d990be` `#63cbc7` `#d9c6bc` | `#856e60` `#f1a398` `#b6d39a` `#fdd6b2` `#91c9ef` `#e9abd1` `#8edfdb` `#fdf5f1` |
| Day | `#efddcb` `#a5483d` `#57782e` `#a05e09` `#156a98` `#944c7c` `#037a78` `#594a3a` | `#877766` `#93342b` `#436413` `#874e00` `#005982` `#83396b` `#016563` `#1f1307` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cappuccino --set
```

### Latte

[![Latte at night and in the day](site/assets/shots/latte/pair.webp)](https://bjarneo.github.io/coffee-themes/#latte)

`13` · Folder: [`latte/`](latte/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#latte)

Espresso with a lot of steamed milk and a thin layer of foam. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`latte-night`](latte/night/) | `#271d13` | `#ebdfd2` | `#e9cd9d` | `Yaru-yellow` |
| Day | [`latte-day`](latte/day/) | `#fbf1e3` | `#372c1a` | `#866a37` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#382d21` `#d79080` `#9fbc8b` `#e3c288` `#80b2d4` `#cf97b7` `#7ec6c5` `#d5c8ba` | `#887765` `#e6aa9c` `#b9d1a8` `#f5daaa` `#9ec7e4` `#e0b1cb` `#a0dad9` `#fbf6f0` |
| Day | `#ebdecb` `#995243` `#5b7745` `#896929` `#34698b` `#8b5575` `#257a79` `#574b3a` | `#857866` `#874031` `#476330` `#77560a` `#1f587a` `#7a4364` `#086565` `#1d1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- latte --set
```

### Latte Macchiato

[![Latte Macchiato at night and in the day](site/assets/shots/latte-macchiato/pair.webp)](https://bjarneo.github.io/coffee-themes/#latte-macchiato)

`14` · Folder: [`latte-macchiato/`](latte-macchiato/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#latte-macchiato)

Steamed milk with espresso poured on top. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`latte-macchiato-night`](latte-macchiato/night/) | `#231b11` | `#eae0d2` | `#dea45f` | `Yaru-yellow` |
| Day | [`latte-macchiato-day`](latte-macchiato/day/) | `#faf1e4` | `#362c1b` | `#9a6207` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#342b1f` `#dc8b87` `#9cbd82` `#efbe72` `#77b2dc` `#d593ba` `#6fc9c7` `#d4c9ba` | `#847664` `#eba6a2` `#b6d2a1` `#fed79e` `#97c7ea` `#e5aece` `#96dddb` `#fbf6f0` |
| Day | `#eadfcc` `#9e4d4b` `#57773a` `#936400` `#276993` `#905078` `#077a79` `#564c3b` | `#847967` `#8c3a3a` `#426323` `#7a5302` `#095882` `#7f3e67` `#076564` `#1c1507` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- latte-macchiato --set
```

### Mocha

[![Mocha at night and in the day](site/assets/shots/mocha/pair.webp)](https://bjarneo.github.io/coffee-themes/#mocha)

`15` · Folder: [`mocha/`](mocha/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#mocha)

A latte with chocolate. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`mocha-night`](mocha/night/) | `#1f0f0b` | `#f1dcd6` | `#db997b` | `Yaru` |
| Day | [`mocha-day`](mocha/day/) | `#fdf0e6` | `#3c291a` | `#a15d3e` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#301d19` `#e48877` `#a2bd77` `#ecc06a` `#6db4df` `#e08ead` `#66cbc6` `#dbc5bf` | `#886b64` `#f1a495` `#bbd298` `#fdd894` `#90c9ed` `#efaac3` `#90dfda` `#fdf5f2` |
| Day | `#f2dcca` `#a5483a` `#5d762b` `#8e6703` `#136b96` `#9b4a6c` `#0d7a76` `#5b493a` | `#8a7666` `#933527` `#4a630e` `#765607` `#005981` `#89375b` `#0a6562` `#201308` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- mocha --set
```

### White Mocha

[![White Mocha at night and in the day](site/assets/shots/white-mocha/pair.webp)](https://bjarneo.github.io/coffee-themes/#white-mocha)

`16` · Folder: [`white-mocha/`](white-mocha/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#white-mocha)

A latte with white chocolate. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`white-mocha-night`](white-mocha/night/) | `#1f1a11` | `#e9e0d4` | `#ecdeb1` | `Yaru-yellow` |
| Day | [`white-mocha-day`](white-mocha/day/) | `#f8f2e7` | `#352c1e` | `#7c6e40` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#30291f` `#d49187` `#a1bb89` `#e9bf8a` `#80b1d4` `#cf97b8` `#7ec6c7` `#d3c9bc` | `#817566` `#e4aaa2` `#bad0a6` `#fbd7ac` `#9ec6e4` `#e0b1cc` `#a0dadb` `#fbf6f0` |
| Day | `#e8dfd1` `#96534b` `#5d7744` `#90672e` `#35698b` `#8b5575` `#257a7b` `#544c3e` | `#82796a` `#84413a` `#49632f` `#7c5211` `#20587b` `#7a4365` `#086567` `#1c150a` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- white-mocha --set
```

### Breve

[![Breve at night and in the day](site/assets/shots/breve/pair.webp)](https://bjarneo.github.io/coffee-themes/#breve)

`17` · Folder: [`breve/`](breve/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#breve)

A latte made with half-and-half. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`breve-night`](breve/night/) | `#1f170d` | `#eadfd2` | `#e8cf8c` | `Yaru-yellow` |
| Day | [`breve-day`](breve/day/) | `#faf1e4` | `#372c1b` | `#856b1c` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2f261a` `#dc8c80` `#a3bc7e` `#e4c379` `#7ab2dc` `#d693b7` `#71c9c7` `#d4c8ba` | `#817260` `#eaa79c` `#bcd19e` `#f6db9f` `#9ac7eb` `#e6aecb` `#97dddb` `#fbf6f0` |
| Day | `#eadfcd` `#9e4e43` `#5e7535` `#8a6908` `#2c6993` `#915075` `#127b7a` `#564b3b` | `#847967` `#8c3b31` `#4b621e` `#745700` `#145882` `#803e64` `#0d6564` `#1d1508` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- breve --set
```

### Con Panna

[![Con Panna at night and in the day](site/assets/shots/con-panna/pair.webp)](https://bjarneo.github.io/coffee-themes/#con-panna)

`18` · Folder: [`con-panna/`](con-panna/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#con-panna)

Espresso with whipped cream. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`con-panna-night`](con-panna/night/) | `#160a05` | `#efddd5` | `#f1ebd5` | `Yaru` |
| Day | [`con-panna-day`](con-panna/day/) | `#fdf0e4` | `#3a2a1b` | `#786d44` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#261811` `#e4877c` `#a2bd76` `#f7ba6f` `#6eb3e2` `#dc8fb8` `#63cbc6` `#d9c6bd` | `#836c61` `#f1a399` `#bbd297` `#fed6a8` `#91c8ef` `#ebaacc` `#8edfda` `#fdf5f1` |
| Day | `#eeddcc` `#a5483f` `#5d7629` `#996307` `#166a98` `#974b76` `#087c78` `#594a3b` | `#877767` `#93342d` `#4a630c` `#7f5106` `#025882` `#853866` `#036663` `#1f1308` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- con-panna --set
```

### Romano

[![Romano at night and in the day](site/assets/shots/romano/pair.webp)](https://bjarneo.github.io/coffee-themes/#romano)

`19` · Folder: [`romano/`](romano/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#romano)

Espresso with a slice of lemon. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`romano-night`](romano/night/) | `#150c05` | `#edded3` | `#e0d653` | `Yaru-olive` |
| Day | [`romano-day`](romano/day/) | `#fbf1e5` | `#382b1b` | `#77700b` | `Yaru-olive` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#261a11` `#ec8273` `#9ac06f` `#e2c741` `#66b3ec` `#e28aba` `#4cceca` `#d7c7bc` | `#806d5f` `#f8a092` `#b5d492` `#f4de7b` `#8bc9f8` `#f1a6ce` `#81e1dd` `#fcf5f0` |
| Day | `#ecdecd` `#ac4134` `#55791e` `#816e00` `#09699f` `#9d4578` `#007c79` `#574b3b` | `#857867` `#9a2b20` `#436405` `#6a5a00` `#005787` `#8b3167` `#0c6563` `#1e1408` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- romano --set
```

### Affogato

[![Affogato at night and in the day](site/assets/shots/affogato/pair.webp)](https://bjarneo.github.io/coffee-themes/#affogato)

`20` · Folder: [`affogato/`](affogato/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#affogato)

Espresso poured over ice cream. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`affogato-night`](affogato/night/) | `#1a0f07` | `#eeded4` | `#ecdeaa` | `Yaru-yellow` |
| Day | [`affogato-day`](affogato/day/) | `#fcf0e4` | `#392b1b` | `#7d6e37` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2a1d14` `#dc8d7e` `#9ebd82` `#ddc67a` `#7ab2dc` `#d693b7` `#71c9c9` `#d8c7bc` | `#826d5f` `#eba89b` `#b8d2a1` `#f0dd9f` `#99c7eb` `#e6aecb` `#97dddd` `#fcf5f1` |
| Day | `#edddcc` `#9d4e41` `#59773a` `#826b05` `#2b6993` `#915075` `#117b7c` `#584a3b` | `#877767` `#8b3b2e` `#466424` `#6d5900` `#125882` `#803e64` `#0f6667` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- affogato --set
```

### Marocchino

[![Marocchino at night and in the day](site/assets/shots/marocchino/pair.webp)](https://bjarneo.github.io/coffee-themes/#marocchino)

`21` · Folder: [`marocchino/`](marocchino/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#marocchino)

Espresso with cocoa powder and milk foam. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`marocchino-night`](marocchino/night/) | `#1c0d08` | `#f1dcd5` | `#e69e79` | `Yaru` |
| Day | [`marocchino-day`](marocchino/day/) | `#ffefe2` | `#3b2a19` | `#a35a32` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d1b15` `#e38974` `#a0bd78` `#ecc16a` `#71b3e1` `#da90bc` `#65cbc8` `#dbc5bd` | `#866b60` `#f1a492` `#b9d299` `#fdd995` `#93c8ef` `#eaabcf` `#8fdfdc` `#fdf5f2` |
| Day | `#f1dcc9` `#a44935` `#5b772d` `#8d6802` `#1d6a98` `#954c79` `#0f7b79` `#5b493a` | `#897665` `#923521` `#496412` `#745504` `#025885` `#843969` `#0b6665` `#201307` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- marocchino --set
```

### Corretto

[![Corretto at night and in the day](site/assets/shots/corretto/pair.webp)](https://bjarneo.github.io/coffee-themes/#corretto)

`22` · Folder: [`corretto/`](corretto/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#corretto)

Espresso with a shot of grappa. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`corretto-night`](corretto/night/) | `#140d05` | `#eadfd3` | `#e7d89b` | `Yaru-yellow` |
| Day | [`corretto-day`](corretto/day/) | `#f9f1e6` | `#362c1c` | `#7e6e2c` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#241b12` `#e48878` `#a1bd75` `#e2c56a` `#6fb3e3` `#db8fba` `#60cbc9` `#d4c8bc` | `#7d6f5f` `#f1a496` `#bad297` `#f4dd94` `#92c8f1` `#ebaace` `#8cdfdc` `#fbf6f0` |
| Day | `#eadfcf` `#a5483a` `#5c7729` `#866c01` `#19699a` `#964b78` `#137b7a` `#564b3c` | `#847968` `#933527` `#4a640b` `#6e5904` `#055884` `#853867` `#0f6665` `#1c1509` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- corretto --set
```

### Red Eye

[![Red Eye at night and in the day](site/assets/shots/red-eye/pair.webp)](https://bjarneo.github.io/coffee-themes/#red-eye)

`23` · Folder: [`red-eye/`](red-eye/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#red-eye)

Drip coffee with 1 shot of espresso. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`red-eye-night`](red-eye/night/) | `#190b09` | `#f0dcd9` | `#fe8b83` | `Yaru-red` |
| Day | [`red-eye-day`](red-eye/day/) | `#feefe5` | `#3b2a1d` | `#c33839` | `Yaru-red` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#291917` `#f9786a` `#9bc063` `#ffb850` `#56b5f0` `#e886bc` `#33d0cd` `#dac5c1` | `#846b66` `#ff9c8f` `#b5d489` `#fdd7a6` `#80cafb` `#f6a4d0` `#75e3e0` `#fdf4f3` |
| Day | `#f0dcce` `#b73129` `#567900` `#976403` `#0c6a9a` `#a13f7a` `#077a79` `#5a493d` | `#897669` `#a51011` `#476404` `#7d5200` `#005882` `#8f2969` `#016564` `#201309` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- red-eye --set
```

### Black Eye

[![Black Eye at night and in the day](site/assets/shots/black-eye/pair.webp)](https://bjarneo.github.io/coffee-themes/#black-eye)

`24` · Folder: [`black-eye/`](black-eye/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#black-eye)

Drip coffee with 2 shots of espresso. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`black-eye-night`](black-eye/night/) | `#100b14` | `#e5deec` | `#bca1ed` | `Yaru-purple` |
| Day | [`black-eye-day`](black-eye/day/) | `#f6effc` | `#322a39` | `#7d5fad` | `Yaru-purple` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#1f1924` `#eb8372` `#8ec372` `#f0bf59` `#60b3f0` `#d08fda` `#3acfd2` `#cfc7d6` | `#776d7f` `#f8a091` `#abd795` `#ffd88d` `#87c9fb` `#e1abe9` `#78e2e4` `#f9f5fc` |
| Day | `#e5dced` `#ac4133` `#467a22` `#8c680b` `#0269a1` `#8c4a97` `#027b7e` `#524959` | `#7f7687` `#9a2c1e` `#316700` `#765600` `#035787` `#7b3786` `#006669` `#19131f` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- black-eye --set
```

### Dead Eye

[![Dead Eye at night and in the day](site/assets/shots/dead-eye/pair.webp)](https://bjarneo.github.io/coffee-themes/#dead-eye)

`25` · Folder: [`dead-eye/`](dead-eye/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#dead-eye)

Drip coffee with 3 shots of espresso. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`dead-eye-night`](dead-eye/night/) | `#050b06` | `#dae5db` | `#79c77c` | `Yaru-sage` |
| Day | [`dead-eye-day`](dead-eye/day/) | `#ecf5ee` | `#253227` | `#257f2f` | `Yaru-sage` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#111913` `#f37c70` `#7ac775` `#fdb947` `#59b2fa` `#e585c8` `#1ad0d5` `#c2cec4` | `#67766a` `#ff9b8f` `#9cda97` `#ffd79d` `#89c8fe` `#f3a3d9` `#68e4e7` `#f2f9f3` |
| Day | `#d8e4da` `#b33831` `#297f27` `#956500` `#0468a5` `#9f3e85` `#007b7e` `#445146` | `#6f7d71` `#a01f1d` `#016b04` `#7d5400` `#02568b` `#8d2974` `#0c6668` `#0f1911` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- dead-eye --set
```

## Brewing methods

### Drip Coffee

[![Drip Coffee at night and in the day](site/assets/shots/drip-coffee/pair.webp)](https://bjarneo.github.io/coffee-themes/#drip-coffee)

`26` · Folder: [`drip-coffee/`](drip-coffee/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#drip-coffee)

A machine drips hot water through ground coffee. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`drip-coffee-night`](drip-coffee/night/) | `#1b110c` | `#edded6` | `#fe8b83` | `Yaru-red` |
| Day | [`drip-coffee-day`](drip-coffee/day/) | `#fbf1e6` | `#382b1d` | `#bf3f3d` | `Yaru-red` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2c2019` `#f47b74` `#9ac06c` `#ecc258` `#68b2ef` `#e08ac2` `#50d0ba` `#d7c7be` | `#826e64` `#fd9c94` `#b4d490` `#fdda88` `#8cc8fb` `#eea7d4` `#83e3d1` `#fdf5f1` |
| Day | `#ecded0` `#b33636` `#547919` `#896a0a` `#0368a5` `#9a457f` `#037d6e` `#574a3d` | `#867869` `#a11b22` `#436500` `#715708` `#03578b` `#88316e` `#0e675b` `#1e1409` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- drip-coffee --set
```

### Pour-Over

[![Pour-Over at night and in the day](site/assets/shots/pour-over/pair.webp)](https://bjarneo.github.io/coffee-themes/#pour-over)

`27` · Folder: [`pour-over/`](pour-over/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#pour-over)

Hot water poured by hand through a filter. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`pour-over-night`](pour-over/night/) | `#1c140d` | `#ebdfd4` | `#ed9c55` | `Yaru` |
| Day | [`pour-over-day`](pour-over/day/) | `#f9f1e6` | `#372c1d` | `#a65c03` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d231a` `#e48682` `#90c180` `#fdb769` `#71b2e7` `#dc8ebb` `#5cccc8` `#d5c8bc` | `#7f7061` `#f1a29d` `#acd59f` `#ffd6ac` `#93c7f4` `#ebaace` `#89dfdc` `#fcf6f0` |
| Day | `#eaded0` `#a54745` `#487b37` `#9d6000` `#1e689d` `#974a79` `#047c79` `#564b3d` | `#847869` `#933334` `#33671f` `#824e00` `#01578a` `#853768` `#006663` `#1d1409` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- pour-over --set
```

### French Press

[![French Press at night and in the day](site/assets/shots/french-press/pair.webp)](https://bjarneo.github.io/coffee-themes/#french-press)

`28` · Folder: [`french-press/`](french-press/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#french-press)

Coffee steeps in water, then a metal mesh presses it down. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`french-press-night`](french-press/night/) | `#171008` | `#eadfd3` | `#d6a95b` | `Yaru-yellow` |
| Day | [`french-press-day`](french-press/day/) | `#f9f1e6` | `#362c1c` | `#926706` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#271f15` `#e38973` `#9cbe79` `#ecc16a` `#6db3e3` `#db8fba` `#61ccc6` `#d4c8bc` | `#7d6f5f` `#f1a592` `#b5d399` `#fdd995` `#90c8f0` `#ebaace` `#8ddfda` `#fbf6f0` |
| Day | `#eadfcf` `#a44934` `#56782e` `#8d6802` `#146a99` `#964b78` `#007c78` `#564b3c` | `#847968` `#923520` `#436514` `#745504` `#005884` `#853867` `#006764` `#1c1509` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- french-press --set
```

### AeroPress

[![AeroPress at night and in the day](site/assets/shots/aeropress/pair.webp)](https://bjarneo.github.io/coffee-themes/#aeropress)

`29` · Folder: [`aeropress/`](aeropress/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#aeropress)

Air pressure pushes the coffee through a filter. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`aeropress-night`](aeropress/night/) | `#0e1216` | `#dbe2ea` | `#fe8f5b` | `Yaru` |
| Day | [`aeropress-day`](aeropress/day/) | `#edf3fa` | `#262f37` | `#b74c05` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#1d2125` `#f47c6e` `#8cc372` `#f0bf58` `#65b2f3` `#e289c0` `#38cde0` `#c3ccd5` | `#69737d` `#fd9d90` `#a9d794` `#ffd88d` `#8ac8fe` `#f0a6d3` `#77e1f0` `#f2f7fd` |
| Day | `#d8e1eb` `#b3372e` `#457c24` `#8c680b` `#0668a6` `#9c437e` `#137986` `#464e57` | `#727b85` `#a11d18` `#2e6800` `#765600` `#04568c` `#8a2f6d` `#0b656f` `#10171e` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- aeropress --set
```

### Chemex

[![Chemex at night and in the day](site/assets/shots/chemex/pair.webp)](https://bjarneo.github.io/coffee-themes/#chemex)

`30` · Folder: [`chemex/`](chemex/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#chemex)

A pour-over in a glass flask with a thick paper filter. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`chemex-night`](chemex/night/) | `#1d1710` | `#e9e0d5` | `#dfa36d` | `Yaru` |
| Day | [`chemex-day`](chemex/day/) | `#f8f1e8` | `#352c1f` | `#9d6020` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d261e` `#dc8c82` `#9fbd7f` `#f2bc7e` `#78b2de` `#d693b8` `#6dc9c9` `#d3c9bd` | `#7f7264` `#eba79e` `#b8d29f` `#fed6ab` `#98c7ec` `#e6adcc` `#94dddc` `#fbf6f0` |
| Day | `#e8dfd2` `#9e4e46` `#5a7736` `#98631a` `#286994` `#924f76` `#007a7a` `#554c3f` | `#82796b` `#8c3b34` `#476420` `#805003` `#0c5884` `#803d65` `#006565` `#1c150a` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- chemex --set
```

### Siphon

[![Siphon at night and in the day](site/assets/shots/siphon/pair.webp)](https://bjarneo.github.io/coffee-themes/#siphon)

`31` · Folder: [`siphon/`](siphon/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#siphon)

Vapor pressure and a vacuum brew the coffee. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`siphon-night`](siphon/night/) | `#091018` | `#d9e2ef` | `#5dbee9` | `Yaru-blue` |
| Day | [`siphon-day`](siphon/day/) | `#ebf3fe` | `#242f3d` | `#00769d` | `Yaru-blue` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#171f28` `#ec8279` `#91c26d` `#f8bb5b` `#51b6ee` `#e08ac4` `#2fcfd7` `#c1ccd9` | `#667383` `#f99f97` `#add691` `#fed7a0` `#7dcbfa` `#efa6d7` `#74e2e8` `#f2f7fe` |
| Day | `#d6e2f1` `#ac403b` `#497a19` `#936402` `#0d6b96` `#9b4482` `#067b80` `#434e5c` | `#707b8b` `#9a2a29` `#386600` `#7b5304` `#03597f` `#893071` `#01666b` `#0e1721` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- siphon --set
```

### Moka Pot

[![Moka Pot at night and in the day](site/assets/shots/moka-pot/pair.webp)](https://bjarneo.github.io/coffee-themes/#moka-pot)

`32` · Folder: [`moka-pot/`](moka-pot/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#moka-pot)

Steam pressure on a stovetop makes a strong coffee. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`moka-pot-night`](moka-pot/night/) | `#150e08` | `#ebdfd6` | `#f8907c` | `Yaru` |
| Day | [`moka-pot-day`](moka-pot/day/) | `#f8f1e8` | `#362c1f` | `#b64b38` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#241c16` `#eb8370` `#9ebe6b` `#eec158` `#60b5e9` `#df8bc0` `#4bcecd` `#d5c8be` | `#7d6e63` `#f8a08f` `#b7d28f` `#ffda88` `#87caf6` `#eea7d3` `#80e1e0` `#fcf5f0` |
| Day | `#e9dfd3` `#ab4231` `#597817` `#8a690a` `#006b9b` `#9a467e` `#137b7b` `#554b3f` | `#83786b` `#992c1c` `#486400` `#745700` `#065981` `#88326d` `#0e6666` `#1c140b` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- moka-pot --set
```

### Percolator

[![Percolator at night and in the day](site/assets/shots/percolator/pair.webp)](https://bjarneo.github.io/coffee-themes/#percolator)

`33` · Folder: [`percolator/`](percolator/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#percolator)

The pot cycles boiling water through the grounds again and again. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`percolator-night`](percolator/night/) | `#0a131a` | `#d7e3ee` | `#79b8ed` | `Yaru-blue` |
| Day | [`percolator-day`](percolator/day/) | `#e9f4fe` | `#21303c` | `#2b72a8` | `Yaru-blue` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#18222a` `#e48680` `#98bf77` `#f5bb6e` `#6db2e8` `#dc8ebd` `#56cdcb` `#bfccd8` | `#637482` `#f1a29c` `#b2d397` `#ffd6a3` `#90c8f5` `#ebaad0` `#86e0de` `#f1f8fd` |
| Day | `#d3e2f0` `#a54744` `#53792b` `#986402` `#14699f` `#974a7a` `#087c7a` `#414f5b` | `#6d7c8a` `#933332` `#40660f` `#7e5203` `#005789` `#853769` `#026665` `#0c1721` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- percolator --set
```

### Cold Brew

[![Cold Brew at night and in the day](site/assets/shots/cold-brew/pair.webp)](https://bjarneo.github.io/coffee-themes/#cold-brew)

`34` · Folder: [`cold-brew/`](cold-brew/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cold-brew)

Coffee that steeps in cold water for 12 to 24 hours. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cold-brew-night`](cold-brew/night/) | `#070d13` | `#d9e2ed` | `#8ad0eb` | `Yaru-prussiangreen` |
| Day | [`cold-brew-day`](cold-brew/day/) | `#ecf3fc` | `#242f3b` | `#237692` | `Yaru-prussiangreen` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#141b23` `#dc8c82` `#96bf81` `#eebe7c` `#67b6dd` `#d692bc` `#64cacf` `#c1ccd7` | `#667381` `#eba79e` `#b1d3a0` `#fed7a1` `#8ccbeb` `#e6add0` `#8edee2` `#f2f7fd` |
| Day | `#d7e2ed` `#9e4e46` `#4f7939` `#946614` `#0c6c91` `#914f7a` `#0a7b80` `#434e5a` | `#707c88` `#8c3b34` `#3c6623` `#7c5308` `#065a7a` `#803c69` `#09666b` `#0e1720` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cold-brew --set
```

### Nitro Cold Brew

[![Nitro Cold Brew at night and in the day](site/assets/shots/nitro-cold-brew/pair.webp)](https://bjarneo.github.io/coffee-themes/#nitro-cold-brew)

`35` · Folder: [`nitro-cold-brew/`](nitro-cold-brew/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#nitro-cold-brew)

Cold brew with nitrogen gas. It has a creamy texture. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`nitro-cold-brew-night`](nitro-cold-brew/night/) | `#0b0d11` | `#dde1eb` | `#ecd4ab` | `Yaru-yellow` |
| Day | [`nitro-cold-brew-day`](nitro-cold-brew/day/) | `#eef3fb` | `#292e38` | `#826b41` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#191c21` `#dc8b85` `#94c084` `#e6c27a` `#77b1e2` `#d493bf` `#66cacc` `#c5cbd5` | `#6c727d` `#eaa6a0` `#b0d4a2` `#f7da9f` `#97c7f0` `#e4aed2` `#8fdedf` `#f3f7fe` |
| Day | `#dbe0ec` `#9e4d49` `#4e793c` `#8c6809` `#286899` `#8f4f7d` `#117b7d` `#484d57` | `#757a86` `#8c3b37` `#3a6626` `#755701` `#0c5788` `#7e3d6c` `#0f6668` `#12161e` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- nitro-cold-brew --set
```

### Turkish Coffee

[![Turkish Coffee at night and in the day](site/assets/shots/turkish-coffee/pair.webp)](https://bjarneo.github.io/coffee-themes/#turkish-coffee)

`36` · Folder: [`turkish-coffee/`](turkish-coffee/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#turkish-coffee)

Very fine grounds boiled in a cezve and not filtered. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`turkish-coffee-night`](turkish-coffee/night/) | `#170904` | `#f0ddd4` | `#f39762` | `Yaru` |
| Day | [`turkish-coffee-day`](turkish-coffee/day/) | `#fff0e2` | `#3b2a19` | `#b15306` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#28170f` `#eb846b` `#9fbe6b` `#f0bf58` `#69b2ec` `#e18bbe` `#4bcecd` `#dac6bc` | `#856b5f` `#f8a18c` `#b8d38f` `#fed88d` `#8dc8f8` `#f0a7d1` `#80e1e0` `#fdf5f1` |
| Day | `#f1dcc9` `#ab432b` `#5a7817` `#8c680b` `#0669a3` `#9b457c` `#137b7b` `#5b4939` | `#897765` `#992d13` `#486306` `#765600` `#075788` `#89316b` `#0e6666` `#1f1307` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- turkish-coffee --set
```

### Cowboy Coffee

[![Cowboy Coffee at night and in the day](site/assets/shots/cowboy-coffee/pair.webp)](https://bjarneo.github.io/coffee-themes/#cowboy-coffee)

`37` · Folder: [`cowboy-coffee/`](cowboy-coffee/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cowboy-coffee)

Grounds boiled in a pot of water. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cowboy-coffee-night`](cowboy-coffee/night/) | `#120906` | `#edddd8` | `#fe8f5b` | `Yaru` |
| Day | [`cowboy-coffee-day`](cowboy-coffee/day/) | `#faf0e8` | `#382b1f` | `#b84b03` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#211613` `#f87963` `#99c164` `#f6bd43` `#54b5f1` `#e786bf` `#30d1c9` `#d7c6c1` | `#806c66` `#fe9c8a` `#b3d58a` `#ffd88f` `#7fcafc` `#f5a4d2` `#74e4dd` `#fdf5f2` |
| Day | `#ebded2` `#b7321f` `#537a00` `#8d6804` `#056a9b` `#a13f7d` `#007b76` `#574a3f` | `#86776b` `#a51300` `#446401` `#765605` `#075881` `#8f2a6c` `#0d6662` `#1e140b` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cowboy-coffee --set
```

## Iced and cold drinks

### Iced Coffee

[![Iced Coffee at night and in the day](site/assets/shots/iced-coffee/pair.webp)](https://bjarneo.github.io/coffee-themes/#iced-coffee)

`38` · Folder: [`iced-coffee/`](iced-coffee/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#iced-coffee)

Brewed coffee served over ice. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`iced-coffee-night`](iced-coffee/night/) | `#0a1317` | `#d6e4eb` | `#97d6ea` | `Yaru-prussiangreen` |
| Day | [`iced-coffee-day`](iced-coffee/day/) | `#e9f4fa` | `#203038` | `#2f768b` | `Yaru-prussiangreen` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#182227` `#e48681` `#92c178` `#f5bb6e` `#6eb1ed` `#dc8dbe` `#50cae0` `#becdd5` | `#63757e` `#f1a29c` `#add599` `#ffd6a3` `#90c7f9` `#eba9d1` `#82def0` `#f0f8fc` |
| Day | `#d4e3eb` `#a54744` `#4b7b2d` `#986402` `#1767a3` `#97497c` `#0c7989` `#405058` | `#6c7d86` `#933332` `#366711` `#7e5203` `#00568d` `#86366b` `#066573` `#0b181e` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- iced-coffee --set
```

### Iced Latte

[![Iced Latte at night and in the day](site/assets/shots/iced-latte/pair.webp)](https://bjarneo.github.io/coffee-themes/#iced-latte)

`39` · Folder: [`iced-latte/`](iced-latte/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#iced-latte)

Espresso and cold milk over ice. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`iced-latte-night`](iced-latte/night/) | `#111a1d` | `#d6e4e9` | `#eddcb9` | `Yaru-yellow` |
| Day | [`iced-latte-day`](iced-latte/day/) | `#eaf5f8` | `#203136` | `#7f6c45` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#1f2a2d` `#dc8b86` `#94c084` `#e5c379` `#69b6dc` `#d792ba` `#66cacc` `#beced3` | `#65787e` `#eaa6a1` `#b0d4a3` `#f7dba0` `#8ecbeb` `#e7adce` `#8fdedf` `#f0f9fb` |
| Day | `#d4e3e8` `#9e4d4a` `#4d793c` `#8d6a0c` `#016c93` `#924e78` `#117b7d` `#405056` | `#6c7e84` `#8c3a39` `#396627` `#755701` `#005a7b` `#803c67` `#0f6668` `#0b181d` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- iced-latte --set
```

### Shakerato

[![Shakerato at night and in the day](site/assets/shots/shakerato/pair.webp)](https://bjarneo.github.io/coffee-themes/#shakerato)

`40` · Folder: [`shakerato/`](shakerato/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#shakerato)

Espresso shaken with ice and sugar. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`shakerato-night`](shakerato/night/) | `#150e06` | `#ebdfd4` | `#d6a95b` | `Yaru-yellow` |
| Day | [`shakerato-day`](shakerato/day/) | `#faf1e6` | `#372c1d` | `#926706` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#251c13` `#e4877c` `#9bbe78` `#eebf6b` `#6eb3e4` `#dc8fba` `#5fccc7` `#d5c8bc` | `#7e6e60` `#f1a399` `#b5d298` `#fed894` `#91c8f2` `#ecaace` `#8bdfdb` `#fcf6f0` |
| Day | `#eadecf` `#a5483f` `#56782d` `#8f6704` `#16699b` `#974a77` `#0e7c78` `#564b3d` | `#847869` `#93342d` `#436512` `#775609` `#015885` `#853766` `#076663` `#1d1409` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- shakerato --set
```

### Espresso Tonic

[![Espresso Tonic at night and in the day](site/assets/shots/espresso-tonic/pair.webp)](https://bjarneo.github.io/coffee-themes/#espresso-tonic)

`41` · Folder: [`espresso-tonic/`](espresso-tonic/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#espresso-tonic)

Espresso poured over tonic water. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`espresso-tonic-night`](espresso-tonic/night/) | `#061212` | `#d4e5e6` | `#b4b943` | `Yaru-olive` |
| Day | [`espresso-tonic-day`](espresso-tonic/day/) | `#e7f6f6` | `#1c3233` | `#707300` | `Yaru-olive` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#132122` `#ec8279` `#85c574` `#d9cb53` `#65b1f8` `#e089c6` `#22d0d4` `#bccfd0` | `#5f7778` `#f99f97` `#a4d996` `#ede285` `#90c7fc` `#efa6d8` `#6fe3e6` `#f0f9f9` |
| Day | `#d1e5e6` `#ac403c` `#3b7e27` `#7b7007` `#0966ab` `#9b4383` `#0a7b7d` `#3d5152` | `#697f80` `#9a2a29` `#226a03` `#665d07` `#035590` `#892f72` `#036668` `#08191a` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- espresso-tonic --set
```

### Japanese Iced Coffee

[![Japanese Iced Coffee at night and in the day](site/assets/shots/japanese-iced-coffee/pair.webp)](https://bjarneo.github.io/coffee-themes/#japanese-iced-coffee)

`42` · Folder: [`japanese-iced-coffee/`](japanese-iced-coffee/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#japanese-iced-coffee)

Hot coffee brewed directly onto ice. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`japanese-iced-coffee-night`](japanese-iced-coffee/night/) | `#091016` | `#d7e3ec` | `#fd8c7b` | `Yaru-red` |
| Day | [`japanese-iced-coffee-day`](japanese-iced-coffee/day/) | `#eaf4fb` | `#22303a` | `#bf4031` | `Yaru-red` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#171f26` `#f47d68` `#8cc371` `#edc158` `#66b1f5` `#e089c4` `#2fcfd5` `#c0cdd6` | `#647480` `#fd9d8c` `#a9d794` `#fed988` `#8ec7fd` `#efa6d6` `#73e2e6` `#f1f8fd` |
| Day | `#d5e2ec` `#b33827` `#437b21` `#8a690a` `#0067ab` `#9b4481` `#067b7f` `#414f59` | `#6e7d87` `#a11e0c` `#306803` `#745700` `#005690` `#893071` `#00666a` `#0d171f` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- japanese-iced-coffee --set
```

### Greek Frappé

[![Greek Frappé at night and in the day](site/assets/shots/greek-frappe/pair.webp)](https://bjarneo.github.io/coffee-themes/#greek-frappe)

`43` · Folder: [`greek-frappe/`](greek-frappe/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#greek-frappe)

Instant coffee shaken into a thick foam. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`greek-frappe-night`](greek-frappe/night/) | `#09121c` | `#d7e3f0` | `#6bb9f8` | `Yaru-blue` |
| Day | [`greek-frappe-day`](greek-frappe/day/) | `#ebf4fd` | `#212f3e` | `#0c74b5` | `Yaru-blue` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#17212d` `#ec817b` `#89c472` `#eac258` `#62b2f5` `#e089c5` `#29cfd7` `#bfccda` | `#637385` `#f89f98` `#a7d895` `#fbda88` `#8bc8fd` `#efa6d7` `#71e2e8` `#f2f7fd` |
| Day | `#d2e2f4` `#ac403e` `#407d24` `#886a09` `#0967a6` `#9b4382` `#127a7f` `#404f5e` | `#6d7c8c` `#9a2a2c` `#296900` `#725800` `#05568b` `#892f71` `#0a666a` `#0c1722` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- greek-frappe --set
```

### Dalgona Coffee

[![Dalgona Coffee at night and in the day](site/assets/shots/dalgona-coffee/pair.webp)](https://bjarneo.github.io/coffee-themes/#dalgona-coffee)

`44` · Folder: [`dalgona-coffee/`](dalgona-coffee/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#dalgona-coffee)

Whipped instant coffee on top of milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`dalgona-coffee-night`](dalgona-coffee/night/) | `#1e130b` | `#edded3` | `#e2a355` | `Yaru-yellow` |
| Day | [`dalgona-coffee-day`](dalgona-coffee/day/) | `#fcf1e4` | `#382b1a` | `#9b6203` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2f2218` `#e48685` `#9ebe76` `#f8ba6b` `#71b2e6` `#da8fbd` `#5fccc7` `#d7c7bb` | `#826f5f` `#f2a2a0` `#b7d397` `#fdd7a9` `#93c7f3` `#eaaad0` `#8bdfdb` `#fcf5f0` |
| Day | `#eddecc` `#a54649` `#59782a` `#996308` `#1e689c` `#964b7b` `#0e7c78` `#584b3b` | `#867867` `#933237` `#46650e` `#7e5106` `#015788` `#84386a` `#0b6764` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- dalgona-coffee --set
```

### Mazagran

[![Mazagran at night and in the day](site/assets/shots/mazagran/pair.webp)](https://bjarneo.github.io/coffee-themes/#mazagran)

`45` · Folder: [`mazagran/`](mazagran/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#mazagran)

Iced coffee with lemon. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`mazagran-night`](mazagran/night/) | `#171008` | `#e9e0d3` | `#e2d552` | `Yaru-olive` |
| Day | [`mazagran-day`](mazagran/day/) | `#f9f1e6` | `#362c1c` | `#78700a` | `Yaru-olive` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#271f15` `#ec8273` `#96c16d` `#ddc943` `#63b3ef` `#e08ac2` `#3fced1` `#d3c9bb` | `#7c6f5e` `#f8a092` `#b1d591` `#f0e07c` `#89c8fb` `#efa7d4` `#7ae1e3` `#fbf6f0` |
| Day | `#e9dfcf` `#ac4135` `#517a1b` `#7c6e00` `#0069a3` `#9b457f` `#0d7b7d` `#554c3c` | `#837968` `#9a2b21` `#406603` `#675b00` `#005789` `#89316f` `#076668` `#1c1508` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- mazagran --set
```

## Regional drinks

### Irish Coffee

[![Irish Coffee at night and in the day](site/assets/shots/irish-coffee/pair.webp)](https://bjarneo.github.io/coffee-themes/#irish-coffee)

`46` · Origin: Ireland · Folder: [`irish-coffee/`](irish-coffee/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#irish-coffee)

Coffee, Irish whiskey, sugar and cream. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`irish-coffee-night`](irish-coffee/night/) | `#071009` | `#d8e5da` | `#e4a249` | `Yaru-yellow` |
| Day | [`irish-coffee-day`](irish-coffee/day/) | `#ebf6ec` | `#233226` | `#98630c` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#141f16` `#ec817a` `#82c57e` `#fbb95e` `#67b2f1` `#e28abe` `#3fced2` `#c1cfc3` | `#667768` `#f89f97` `#a1d99e` `#fed7a5` `#8cc8fc` `#f1a7d1` `#7ae1e4` `#f2f9f3` |
| Day | `#d5e5d8` `#ac403d` `#367e35` `#97640b` `#0068a7` `#9c447c` `#0d7b7d` `#435245` | `#6f7f72` `#9a2a2b` `#1b6a1c` `#7d5208` `#00578c` `#8a306b` `#076668` `#0e1910` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- irish-coffee --set
```

### Café au Lait

[![Café au Lait at night and in the day](site/assets/shots/cafe-au-lait/pair.webp)](https://bjarneo.github.io/coffee-themes/#cafe-au-lait)

`47` · Origin: France · Folder: [`cafe-au-lait/`](cafe-au-lait/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cafe-au-lait)

Brewed coffee with hot milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cafe-au-lait-night`](cafe-au-lait/night/) | `#201910` | `#eadfd3` | `#ebc892` | `Yaru-yellow` |
| Day | [`cafe-au-lait-day`](cafe-au-lait/day/) | `#f9f1e6` | `#362c1c` | `#8b682d` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#31281e` `#dc8b87` `#9ebd80` `#e7c27a` `#80afe2` `#d493bd` `#6dc9ca` `#d4c9bb` | `#837564` `#eba6a2` `#b7d29f` `#f9daa0` `#9ec5f0` `#e4aed0` `#94dddd` `#fbf6f0` |
| Day | `#e9dfcf` `#9e4d4b` `#587738` `#8d680a` `#356699` `#90507a` `#007a7b` `#554c3c` | `#837968` `#8c3a39` `#466422` `#775602` `#215588` `#7e3e6a` `#006566` `#1c1509` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cafe-au-lait --set
```

### Café Cubano

[![Café Cubano at night and in the day](site/assets/shots/cafe-cubano/pair.webp)](https://bjarneo.github.io/coffee-themes/#cafe-cubano)

`48` · Origin: Cuba · Folder: [`cafe-cubano/`](cafe-cubano/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cafe-cubano)

Espresso sweetened with sugar during the brew. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cafe-cubano-night`](cafe-cubano/night/) | `#180c05` | `#eeded3` | `#e1a447` | `Yaru-yellow` |
| Day | [`cafe-cubano-day`](cafe-cubano/day/) | `#fdf0e3` | `#392b1a` | `#966506` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#291b11` `#ec817d` `#97c071` `#f9ba5c` `#63b4ea` `#e18bbe` `#4ccecb` `#d8c7bb` | `#836c5e` `#f99f9a` `#b2d493` `#ffd7a0` `#89c9f7` `#f0a7d1` `#80e1de` `#fcf5f1` |
| Day | `#eeddca` `#ac3f40` `#517a22` `#966508` `#0b6a9c` `#9b457b` `#007c7a` `#594a3a` | `#877766` `#9a292e` `#3e6503` `#7c5306` `#015884` `#89316a` `#0c6564` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cafe-cubano --set
```

### Cortadito

[![Cortadito at night and in the day](site/assets/shots/cortadito/pair.webp)](https://bjarneo.github.io/coffee-themes/#cortadito)

`49` · Origin: Cuba · Folder: [`cortadito/`](cortadito/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cortadito)

A café cubano with steamed milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cortadito-night`](cortadito/night/) | `#1e130b` | `#edded3` | `#e2a355` | `Yaru-yellow` |
| Day | [`cortadito-day`](cortadito/day/) | `#fcf1e4` | `#382b1a` | `#9b6203` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2f2218` `#ec8278` `#99c06f` `#fbb95d` `#69b2ec` `#e28abb` `#4bcdd0` `#d7c7bb` | `#826f5f` `#f99f96` `#b3d493` `#fed7a4` `#8cc8f8` `#f1a7ce` `#7fe1e2` `#fcf5f0` |
| Day | `#eddecc` `#ac403a` `#53791f` `#97640b` `#0669a3` `#9d4578` `#127b7d` `#584b3b` | `#867867` `#9a2a27` `#416600` `#7d5208` `#075788` `#8b3168` `#0e6668` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cortadito --set
```

### Café Bombón

[![Café Bombón at night and in the day](site/assets/shots/cafe-bombon/pair.webp)](https://bjarneo.github.io/coffee-themes/#cafe-bombon)

`50` · Origin: Spain · Folder: [`cafe-bombon/`](cafe-bombon/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cafe-bombon)

Espresso with sweetened condensed milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cafe-bombon-night`](cafe-bombon/night/) | `#1a0f07` | `#edded3` | `#edd5a3` | `Yaru-yellow` |
| Day | [`cafe-bombon-day`](cafe-bombon/day/) | `#fcf1e4` | `#392b1a` | `#836b37` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2a1d14` `#eb8278` `#99bf7b` `#eac16a` `#6db3e3` `#d990bf` `#60cbc9` `#d7c7bb` | `#816d5e` `#f7a095` `#b4d39b` `#fbda94` `#90c8f0` `#e9abd2` `#8cdfdc` `#fcf5f0` |
| Day | `#eddecc` `#ab413a` `#537930` `#8c6801` `#136a99` `#944b7c` `#137b7a` `#584b3b` | `#867867` `#992c27` `#416618` `#745706` `#005884` `#82386b` `#0f6665` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cafe-bombon --set
```

### Carajillo

[![Carajillo at night and in the day](site/assets/shots/carajillo/pair.webp)](https://bjarneo.github.io/coffee-themes/#carajillo)

`51` · Origin: Spain and Mexico · Folder: [`carajillo/`](carajillo/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#carajillo)

Coffee with brandy or Licor 43. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`carajillo-night`](carajillo/night/) | `#160d04` | `#ebdfd2` | `#daa843` | `Yaru-yellow` |
| Day | [`carajillo-day`](carajillo/day/) | `#fbf1e3` | `#372c1a` | `#8e670b` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#261c10` `#eb8370` `#97c071` `#f4bd5a` `#68b3ec` `#e08bbf` `#4cceca` `#d5c8ba` | `#7f6e5c` `#f8a08f` `#b2d493` `#ffd896` `#8dc8f9` `#efa7d2` `#80e1de` `#fbf6f0` |
| Day | `#ebdecb` `#ab4230` `#517a22` `#926701` `#0369a2` `#9b457d` `#007c7a` `#574b3a` | `#857866` `#992c1b` `#3e6503` `#795401` `#045788` `#89326c` `#0c6563` `#1d1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- carajillo --set
```

### Café de Olla

[![Café de Olla at night and in the day](site/assets/shots/cafe-de-olla/pair.webp)](https://bjarneo.github.io/coffee-themes/#cafe-de-olla)

`52` · Origin: Mexico · Folder: [`cafe-de-olla/`](cafe-de-olla/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cafe-de-olla)

Coffee with cinnamon and piloncillo sugar. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cafe-de-olla-night`](cafe-de-olla/night/) | `#1b0a06` | `#f3dbd5` | `#f0995b` | `Yaru` |
| Day | [`cafe-de-olla-day`](cafe-de-olla/day/) | `#fef0e5` | `#3d2919` | `#ab5809` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d1813` `#ec8274` `#a0be6d` `#fdb674` `#69b3e9` `#e08bbd` `#53cdc8` `#ddc4be` | `#886961` `#f8a093` `#b9d391` `#ffd5af` `#8dc8f6` `#efa7d0` `#84e0dc` `#fdf5f2` |
| Day | `#f3dbc9` `#ac4136` `#5b771b` `#a25f07` `#0669a0` `#9b467b` `#137b78` `#5c493a` | `#8c7767` `#9a2b22` `#496404` `#874e03` `#085885` `#89336a` `#0d6664` `#201308` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cafe-de-olla --set
```

### Cà Phê Sữa Đá

[![Cà Phê Sữa Đá at night and in the day](site/assets/shots/ca-phe-sua-da/pair.webp)](https://bjarneo.github.io/coffee-themes/#ca-phe-sua-da)

`53` · Origin: Vietnam · Folder: [`ca-phe-sua-da/`](ca-phe-sua-da/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#ca-phe-sua-da)

Strong iced coffee with condensed milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`ca-phe-sua-da-night`](ca-phe-sua-da/night/) | `#150a04` | `#eeded4` | `#ebd6a3` | `Yaru-yellow` |
| Day | [`ca-phe-sua-da-day`](ca-phe-sua-da/day/) | `#f8ece0` | `#392b1b` | `#7e6934` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#251810` `#f07f76` `#99c06e` `#ecc158` `#66b3ed` `#e08bc0` `#49cec9` `#d8c7bc` | `#826d5f` `#fc9d95` `#b4d491` `#fdda88` `#8bc9f9` `#efa7d3` `#7fe1dc` `#fcf5f1` |
| Day | `#e9d9c8` `#af3c38` `#517618` `#866703` `#0769a1` `#9b457e` `#067975` `#584a3b` | `#847564` `#9d2425` `#406300` `#705506` `#085786` `#89326d` `#026461` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- ca-phe-sua-da --set
```

### Cà Phê Trứng

[![Cà Phê Trứng at night and in the day](site/assets/shots/ca-phe-trung/pair.webp)](https://bjarneo.github.io/coffee-themes/#ca-phe-trung)

`54` · Origin: Vietnam · Folder: [`ca-phe-trung/`](ca-phe-trung/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#ca-phe-trung)

Coffee topped with whipped egg yolk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`ca-phe-trung-night`](ca-phe-trung/night/) | `#170d05` | `#edded3` | `#eccb61` | `Yaru-yellow` |
| Day | [`ca-phe-trung-day`](ca-phe-trung/day/) | `#fcf1e4` | `#382b1a` | `#856c08` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#271b11` `#eb836e` `#9cbf6d` `#e9c358` `#65b3eb` `#e18bbe` `#4bcece` `#d7c7bb` | `#816d5e` `#f8a08d` `#b5d391` `#fadb88` `#8ac9f7` `#f0a7d1` `#80e1e1` `#fcf5f0` |
| Day | `#eddecc` `#ab422e` `#56791c` `#876b09` `#036a9f` `#9b457b` `#137b7b` `#584b3b` | `#867867` `#992c18` `#466505` `#6f5808` `#075885` `#89316a` `#0e6667` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- ca-phe-trung --set
```

### Kopi

[![Kopi at night and in the day](site/assets/shots/kopi/pair.webp)](https://bjarneo.github.io/coffee-themes/#kopi)

`55` · Origin: Malaysia and Singapore · Folder: [`kopi/`](kopi/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#kopi)

Strong coffee with condensed milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`kopi-night`](kopi/night/) | `#170d05` | `#edded3` | `#abbb67` | `Yaru-olive` |
| Day | [`kopi-day`](kopi/day/) | `#f7eddf` | `#382b1a` | `#657303` | `Yaru-olive` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#271b11` `#ec817c` `#a3bd68` `#faba5d` `#67b3ec` `#e28abb` `#4dcec9` `#d7c7bb` | `#816d5e` `#f99f99` `#bbd28d` `#fed7a4` `#8cc8f8` `#f1a7ce` `#81e1dd` `#fcf5f0` |
| Day | `#e9dac8` `#ac403f` `#5d750c` `#936202` `#0069a2` `#9d4578` `#0f7875` `#584b3a` | `#847665` `#9a2a2d` `#4c6100` `#7b5104` `#025788` `#8b3168` `#096361` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- kopi --set
```

### Yuanyang

[![Yuanyang at night and in the day](site/assets/shots/yuanyang/pair.webp)](https://bjarneo.github.io/coffee-themes/#yuanyang)

`56` · Origin: Hong Kong · Folder: [`yuanyang/`](yuanyang/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#yuanyang)

Coffee mixed with milk tea. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`yuanyang-night`](yuanyang/night/) | `#1c1109` | `#edded3` | `#e1a263` | `Yaru` |
| Day | [`yuanyang-day`](yuanyang/day/) | `#fcf1e4` | `#382b1a` | `#9f5f04` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2c2016` `#ec8277` `#9ac06f` `#feb760` `#68b2ec` `#df8bc0` `#4cceca` `#d7c7bb` | `#826f5f` `#f99f95` `#b4d492` `#fed6aa` `#8cc8f8` `#eea7d3` `#80e1dd` `#fcf5f0` |
| Day | `#eddecc` `#ac4039` `#54791e` `#9b6103` `#0369a2` `#9a467e` `#007c7a` `#584b3b` | `#867867` `#9a2a26` `#436600` `#825103` `#055788` `#88326d` `#0c6563` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- yuanyang --set
```

### Galão

[![Galão at night and in the day](site/assets/shots/galao/pair.webp)](https://bjarneo.github.io/coffee-themes/#galao)

`57` · Origin: Portugal · Folder: [`galao/`](galao/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#galao)

Espresso with foamed milk in a tall glass. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`galao-night`](galao/night/) | `#0f171f` | `#d8e3ee` | `#81b4f6` | `Yaru-blue` |
| Day | [`galao-day`](galao/day/) | `#eaf4fe` | `#222f3c` | `#3970b3` | `Yaru-blue` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#1d2630` `#e4877e` `#96c077` `#ecc06a` `#79aeef` `#db8ebf` `#54cdcb` `#c0ccd9` | `#667584` `#f2a39b` `#b1d498` `#fcd994` `#98c4fa` `#eaaad2` `#85e0de` `#f2f7fd` |
| Day | `#d5e2f0` `#a54741` `#507a2b` `#8f6906` `#2c64a5` `#964a7d` `#007c7b` `#424e5c` | `#6e7c8a` `#93332f` `#3c660e` `#765607` `#145294` `#84376c` `#006766` `#0d1721` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- galao --set
```

### Wiener Melange

[![Wiener Melange at night and in the day](site/assets/shots/wiener-melange/pair.webp)](https://bjarneo.github.io/coffee-themes/#wiener-melange)

`58` · Origin: Austria · Folder: [`wiener-melange/`](wiener-melange/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#wiener-melange)

Espresso with steamed milk and foam. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`wiener-melange-night`](wiener-melange/night/) | `#1b0d0c` | `#f0dcda` | `#f49191` | `Yaru-red` |
| Day | [`wiener-melange-day`](wiener-melange/day/) | `#feefe5` | `#3b291d` | `#b14c51` | `Yaru-red` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2c1c1a` `#e68581` `#9dbe79` `#edc06a` `#71b3e2` `#da8fbc` `#63cbc8` `#dac5c3` | `#856a68` `#f3a19d` `#b7d299` `#fed895` `#93c8f0` `#e9aacf` `#8edfdb` `#fef4f3` |
| Day | `#f1dcce` `#a74545` `#58782e` `#8e6703` `#1c6999` `#954b7a` `#027a78` `#5b493d` | `#897669` `#953133` `#446412` `#755405` `#005885` `#833869` `#016563` `#201309` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- wiener-melange --set
```

### Einspänner

[![Einspänner at night and in the day](site/assets/shots/einspanner/pair.webp)](https://bjarneo.github.io/coffee-themes/#einspanner)

`59` · Origin: Austria · Folder: [`einspanner/`](einspanner/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#einspanner)

Espresso with a thick layer of whipped cream. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`einspanner-night`](einspanner/night/) | `#170d06` | `#edded4` | `#eace8c` | `Yaru-yellow` |
| Day | [`einspanner-day`](einspanner/day/) | `#fbf1e5` | `#382b1c` | `#876b1c` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#271b13` `#e48879` `#9abf7a` `#e9c26a` `#71b2e4` `#dc8fb9` `#60cbc9` `#d7c7bc` | `#816d60` `#f2a497` `#b4d39b` `#fada94` `#93c7f1` `#ebaacd` `#8cdfdc` `#fcf5f1` |
| Day | `#eddecd` `#a5483b` `#547830` `#8c6a04` `#1d699b` `#974b77` `#137b7a` `#584a3c` | `#867868` `#933428` `#416516` `#735705` `#015888` `#853867` `#0f6665` `#1e1408` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- einspanner --set
```

### Pharisäer

[![Pharisäer at night and in the day](site/assets/shots/pharisaer/pair.webp)](https://bjarneo.github.io/coffee-themes/#pharisaer)

`60` · Origin: Germany · Folder: [`pharisaer/`](pharisaer/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#pharisaer)

Coffee with rum and whipped cream. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`pharisaer-night`](pharisaer/night/) | `#160a05` | `#efddd5` | `#ed9c55` | `Yaru` |
| Day | [`pharisaer-day`](pharisaer/day/) | `#fdf0e4` | `#3a2a1b` | `#a65c03` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#261811` `#ec8274` `#9ebe6d` `#ffb668` `#61b5e8` `#e18bbc` `#4fcdcd` `#d9c6be` | `#836c61` `#f8a092` `#b7d390` `#fed6ae` `#88caf5` `#f0a7d0` `#82e0df` `#fdf5f1` |
| Day | `#efddcd` `#ac4135` `#59781a` `#9d600a` `#036b99` `#9b457a` `#037a7a` `#594a3b` | `#887767` `#9a2b22` `#486403` `#854f00` `#095980` `#893169` `#006565` `#1f1308` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- pharisaer --set
```

### Kaffeost

[![Kaffeost at night and in the day](site/assets/shots/kaffeost/pair.webp)](https://bjarneo.github.io/coffee-themes/#kaffeost)

`61` · Origin: Finland and Sweden · Folder: [`kaffeost/`](kaffeost/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#kaffeost)

Hot coffee poured over cubes of cheese. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`kaffeost-night`](kaffeost/night/) | `#1a160b` | `#e6e1d3` | `#ecd78a` | `Yaru-yellow` |
| Day | [`kaffeost-day`](kaffeost/day/) | `#f7f2e6` | `#342d1c` | `#836d03` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#292519` `#dc8c80` `#9ebd80` `#dec679` `#7bb1df` `#d693b9` `#6ec9c7` `#d0cabb` | `#7a735f` `#eaa79c` `#b7d29f` `#f1dd9f` `#9ac6ed` `#e6aecd` `#94dddb` `#f9f7ef` |
| Day | `#e7e0ce` `#9e4e44` `#587738` `#856c08` `#2e6896` `#914f77` `#037c7b` `#534c3c` | `#817a68` `#8c3b32` `#466421` `#6e5800` `#175785` `#803d65` `#016665` `#1b1508` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- kaffeost --set
```

### Qahwa

[![Qahwa at night and in the day](site/assets/shots/qahwa/pair.webp)](https://bjarneo.github.io/coffee-themes/#qahwa)

`62` · Origin: Arabian Peninsula · Folder: [`qahwa/`](qahwa/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#qahwa)

Light-roast coffee with cardamom. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`qahwa-night`](qahwa/night/) | `#161105` | `#e8e0d1` | `#a9bb71` | `Yaru-olive` |
| Day | [`qahwa-day`](qahwa/day/) | `#f9f2e3` | `#362d19` | `#657621` | `Yaru-olive` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#262012` `#e48780` `#a2bd73` `#f0bf67` `#6db3e4` `#d98fbf` `#5eccc8` `#d2cab9` | `#7b705b` `#f2a39c` `#bbd295` `#ffd897` `#90c8f1` `#e9aad1` `#8bdfdc` `#faf6ef` |
| Day | `#e9dfcb` `#a54743` `#5d7726` `#906607` `#126a9a` `#954b7c` `#0d7c79` `#554c3a` | `#837966` `#933331` `#4b6404` `#795500` `#085882` `#83386c` `#066664` `#1c1507` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- qahwa --set
```

### Bicerin

[![Bicerin at night and in the day](site/assets/shots/bicerin/pair.webp)](https://bjarneo.github.io/coffee-themes/#bicerin)

`63` · Origin: Italy · Folder: [`bicerin/`](bicerin/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#bicerin)

Espresso, chocolate and cream in layers. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`bicerin-night`](bicerin/night/) | `#1a0b07` | `#f1dcd6` | `#e79c7e` | `Yaru` |
| Day | [`bicerin-day`](bicerin/day/) | `#fdf0e6` | `#3c291a` | `#a65a3b` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2b1913` `#e48879` `#a1bd77` `#eebf6b` `#6db4df` `#da8fbb` `#65cbc7` `#dbc5be` | `#866a62` `#f2a497` `#bad298` `#ffd894` `#90c9ed` `#eaaace` `#8fdfdb` `#fdf5f2` |
| Day | `#f2dcca` `#a5483c` `#5c772c` `#8f6605` `#126b96` `#964b78` `#0c7a77` `#5b493a` | `#8a7666` `#933429` `#4a6411` `#775508` `#005981` `#843967` `#096563` `#201307` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- bicerin --set
```

## Flavored drinks

### Caramel Macchiato

[![Caramel Macchiato at night and in the day](site/assets/shots/caramel-macchiato/pair.webp)](https://bjarneo.github.io/coffee-themes/#caramel-macchiato)

`64` · Folder: [`caramel-macchiato/`](caramel-macchiato/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#caramel-macchiato)

Vanilla, milk, espresso and a caramel drizzle. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`caramel-macchiato-night`](caramel-macchiato/night/) | `#1d1107` | `#eeded1` | `#eb9e41` | `Yaru-yellow` |
| Day | [`caramel-macchiato-day`](caramel-macchiato/day/) | `#fdf0e1` | `#3a2b18` | `#9d6002` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2e1f13` `#ec817b` `#9ebe6d` `#ffb75d` `#66b3ea` `#df8bc0` `#51cec6` `#d8c7ba` | `#846e5d` `#f89f98` `#b7d390` `#ffd6a8` `#8bc9f6` `#eea7d3` `#83e1da` `#fcf5f0` |
| Day | `#efddc8` `#ac403e` `#59781b` `#9a6206` `#076a9e` `#9a467e` `#097a75` `#594a38` | `#877764` `#9a2a2c` `#486404` `#805002` `#005886` `#88336d` `#036561` `#1e1406` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- caramel-macchiato --set
```

### Vanilla Latte

[![Vanilla Latte at night and in the day](site/assets/shots/vanilla-latte/pair.webp)](https://bjarneo.github.io/coffee-themes/#vanilla-latte)

`65` · Folder: [`vanilla-latte/`](vanilla-latte/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#vanilla-latte)

A latte with vanilla syrup. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`vanilla-latte-night`](vanilla-latte/night/) | `#1d170e` | `#e8e0d3` | `#efdda9` | `Yaru-yellow` |
| Day | [`vanilla-latte-day`](vanilla-latte/day/) | `#f8f2e6` | `#352c1c` | `#7f6d37` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d271b` `#dc8c7f` `#a1bc7f` `#e2c479` `#7bb1de` `#d693b8` `#6fc9c6` `#d2c9bb` | `#7e7361` `#eaa79b` `#bad19e` `#f4dc9f` `#9ac7ec` `#e6aecc` `#96ddda` `#faf6ef` |
| Day | `#e8dfce` `#9e4e42` `#5c7636` `#886a08` `#2e6895` `#924f75` `#0c7c7a` `#554c3c` | `#827968` `#8c3c30` `#496320` `#725800` `#175784` `#803d64` `#086664` `#1c1508` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- vanilla-latte --set
```

### Hazelnut Latte

[![Hazelnut Latte at night and in the day](site/assets/shots/hazelnut-latte/pair.webp)](https://bjarneo.github.io/coffee-themes/#hazelnut-latte)

`66` · Folder: [`hazelnut-latte/`](hazelnut-latte/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#hazelnut-latte)

A latte with hazelnut syrup. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`hazelnut-latte-night`](hazelnut-latte/night/) | `#1c1109` | `#edded3` | `#dfa36d` | `Yaru` |
| Day | [`hazelnut-latte-day`](hazelnut-latte/day/) | `#fcf1e4` | `#392b1a` | `#9d6020` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d2016` `#e48682` `#9bbe79` `#fab872` `#72b2e5` `#da8fbc` `#60cbcc` `#d7c7bb` | `#836e60` `#f1a29d` `#b5d299` `#fed6ad` `#94c7f2` `#eaaacf` `#8cdfdf` `#fcf5f0` |
| Day | `#eddecc` `#a54745` `#56782e` `#9f6104` `#20699b` `#964b7a` `#127b7c` `#584b3b` | `#867867` `#933333` `#436515` `#845003` `#065788` `#843869` `#0e6667` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- hazelnut-latte --set
```

### Peppermint Mocha

[![Peppermint Mocha at night and in the day](site/assets/shots/peppermint-mocha/pair.webp)](https://bjarneo.github.io/coffee-themes/#peppermint-mocha)

`67` · Folder: [`peppermint-mocha/`](peppermint-mocha/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#peppermint-mocha)

Chocolate, peppermint, espresso and milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`peppermint-mocha-night`](peppermint-mocha/night/) | `#1a0a08` | `#f1dcd8` | `#fe8a88` | `Yaru-red` |
| Day | [`peppermint-mocha-day`](peppermint-mocha/day/) | `#fdf0e6` | `#3c291a` | `#c33740` | `Yaru-red` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2b1815` `#f97677` `#93c268` `#f8bc44` `#59b4f3` `#e586c2` `#41d1b9` `#dcc5c0` | `#866a64` `#ff9a98` `#afd68d` `#ffd893` `#82cafe` `#f3a3d4` `#7be4cf` `#fdf4f3` |
| Day | `#f3dbcb` `#b72e39` `#4d7b0d` `#906809` `#05699f` `#9f3f80` `#007c6c` `#5c493b` | `#8b7667` `#a40b26` `#3f6605` `#775505` `#055884` `#8d2a6e` `#0b6759` `#201208` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- peppermint-mocha --set
```

### Pumpkin Spice Latte

[![Pumpkin Spice Latte at night and in the day](site/assets/shots/pumpkin-spice-latte/pair.webp)](https://bjarneo.github.io/coffee-themes/#pumpkin-spice-latte)

`68` · Folder: [`pumpkin-spice-latte/`](pumpkin-spice-latte/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#pumpkin-spice-latte)

Pumpkin and spices with espresso and milk. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`pumpkin-spice-latte-night`](pumpkin-spice-latte/night/) | `#1c0d07` | `#f0ddd4` | `#fd923e` | `Yaru` |
| Day | [`pumpkin-spice-latte-day`](pumpkin-spice-latte/day/) | `#fff0e2` | `#3b2a19` | `#ac5701` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d1c14` `#f27e65` `#9bc065` `#feb76a` `#5ab5ef` `#e487c2` `#3bd0c8` `#dac6bc` | `#856b5f` `#fe9d86` `#b5d48b` `#fdd6b0` `#83cafb` `#f3a4d5` `#79e3dc` `#fdf5f1` |
| Day | `#f1dcc9` `#b23a21` `#567903` `#9d600a` `#076a9b` `#9e4080` `#027c77` `#5b4939` | `#897765` `#9f2201` `#476500` `#845005` `#005884` `#8c2b6e` `#006763` `#1f1307` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- pumpkin-spice-latte --set
```

### Honey Latte

[![Honey Latte at night and in the day](site/assets/shots/honey-latte/pair.webp)](https://bjarneo.github.io/coffee-themes/#honey-latte)

`69` · Folder: [`honey-latte/`](honey-latte/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#honey-latte)

A latte sweetened with honey. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`honey-latte-night`](honey-latte/night/) | `#1d140a` | `#ebdfd2` | `#e2a520` | `Yaru-yellow` |
| Day | [`honey-latte-day`](honey-latte/day/) | `#fbf1e3` | `#372c1a` | `#906606` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2e2317` `#eb846c` `#96c071` `#f9bc41` `#67b3ec` `#e08bbe` `#4bcecc` `#d5c8ba` | `#80705e` `#f8a18c` `#b1d493` `#fed897` `#8cc9f8` `#efa7d1` `#80e1e0` `#fbf6f0` |
| Day | `#ebdecb` `#ab432b` `#517a23` `#906600` `#0069a2` `#9b457c` `#007c7b` `#574b3a` | `#857866` `#992d14` `#3e6504` `#785500` `#015888` `#89316b` `#0c6565` `#1d1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- honey-latte --set
```

### Lavender Latte

[![Lavender Latte at night and in the day](site/assets/shots/lavender-latte/pair.webp)](https://bjarneo.github.io/coffee-themes/#lavender-latte)

`70` · Folder: [`lavender-latte/`](lavender-latte/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#lavender-latte)

A latte with lavender syrup. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`lavender-latte-night`](lavender-latte/night/) | `#17111a` | `#e6deeb` | `#bba3e8` | `Yaru-purple` |
| Day | [`lavender-latte-day`](lavender-latte/day/) | `#f7effb` | `#342938` | `#7c61a8` | `Yaru-purple` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#27202a` `#e4877e` `#93c17a` `#e6c36a` `#73b0ec` `#cc93d5` `#53cdce` `#d0c6d5` | `#7a6e7f` `#f2a39b` `#afd59a` `#f8db94` `#94c6f7` `#ddaee5` `#84e0e1` `#f9f5fc` |
| Day | `#e7dcec` `#a54742` `#4c7a2f` `#896a00` `#2167a2` `#894f92` `#10797b` `#534958` | `#817686` `#93332f` `#376613` `#725806` `#005591` `#783d81` `#0e6667` `#1a131e` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- lavender-latte --set
```

### Dirty Chai

[![Dirty Chai at night and in the day](site/assets/shots/dirty-chai/pair.webp)](https://bjarneo.github.io/coffee-themes/#dirty-chai)

`71` · Folder: [`dirty-chai/`](dirty-chai/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#dirty-chai)

A chai latte with a shot of espresso. The recipe background shows the recipe.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`dirty-chai-night`](dirty-chai/night/) | `#1c0d07` | `#f0ddd4` | `#f69557` | `Yaru` |
| Day | [`dirty-chai-day`](dirty-chai/day/) | `#fff0e2` | `#3b2a19` | `#ae5507` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d1c14` `#ef8168` `#a3bd6a` `#eec158` `#61b5e6` `#e28bb9` `#54cdc7` `#dac6bc` | `#856b5f` `#fb9f89` `#bcd28f` `#ffda88` `#88caf3` `#f1a7cd` `#84e0da` `#fdf5f1` |
| Day | `#f1dcc9` `#af3f26` `#5f7615` `#8b690a` `#046b98` `#9c4577` `#007c78` `#5b4939` | `#897765` `#9d280b` `#4e6207` `#755700` `#005980` `#8a3166` `#0c6561` `#1f1307` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- dirty-chai --set
```

## Coffee beans

### Arabica

[![Arabica at night and in the day](site/assets/shots/arabica/pair.webp)](https://bjarneo.github.io/coffee-themes/#arabica)

`72` · Folder: [`arabica/`](arabica/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#arabica)

Sweet and bright. About 60 percent of the coffee in the world. The recipe background shows a coffee cherry in cross-section.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`arabica-night`](arabica/night/) | `#190b09` | `#f0dcd9` | `#fe8a88` | `Yaru-red` |
| Day | [`arabica-day`](arabica/day/) | `#feefe5` | `#3b2a1d` | `#c7303c` | `Yaru-red` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#291917` `#fd736d` `#81c674` `#f4be42` `#52b5f4` `#e885bf` `#1bd1cf` `#dac5c1` | `#846b66` `#fe9b94` `#a1d996` `#ffd88a` `#82cafd` `#f6a3d2` `#6ee4e1` `#fdf4f3` |
| Day | `#f0dcce` `#bc282d` `#337d25` `#8c6803` `#006a9e` `#a23e7c` `#137a78` `#5a493d` | `#897669` `#a8031a` `#186a01` `#735501` `#015884` `#90286c` `#0c6564` `#201309` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- arabica --set
```

### Robusta

[![Robusta at night and in the day](site/assets/shots/robusta/pair.webp)](https://bjarneo.github.io/coffee-themes/#robusta)

`73` · Folder: [`robusta/`](robusta/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#robusta)

Strong and bitter, with almost twice the caffeine of Arabica. The recipe background shows a coffee cherry in cross-section.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`robusta-night`](robusta/night/) | `#0f0a05` | `#e8e0d5` | `#c5b164` | `Yaru-yellow` |
| Day | [`robusta-day`](robusta/day/) | `#f3eee4` | `#342d1f` | `#7f6a0c` | `Yaru-yellow` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#1e1910` `#e48876` `#a0bd75` `#e1c66a` `#6db4e2` `#dc8fba` `#60cbcb` `#d1c9bd` | `#7a7061` `#f1a494` `#b9d297` `#f4dd94` `#90c9f0` `#ebabce` `#8cdfde` `#faf6ef` |
| Day | `#e3dbce` `#a44938` `#5a7528` `#816a0b` `#126a99` `#974b78` `#0b7878` `#544c3e` | `#7e7668` `#923524` `#466106` `#6b5600` `#005883` `#853867` `#086363` `#1b150a` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- robusta --set
```

### Liberica

[![Liberica at night and in the day](site/assets/shots/liberica/pair.webp)](https://bjarneo.github.io/coffee-themes/#liberica)

`74` · Folder: [`liberica/`](liberica/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#liberica)

Large beans with a smoky, floral taste. The recipe background shows a coffee cherry in cross-section.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`liberica-night`](liberica/night/) | `#160c11` | `#ecdce3` | `#dd96cd` | `Yaru-magenta` |
| Day | [`liberica-day`](liberica/day/) | `#feefea` | `#3b2923` | `#9c548d` | `Yaru-magenta` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#261a1f` `#ec817d` `#91c273` `#f8bb5c` `#65b3ee` `#de8bc5` `#43cecf` `#d7c5cc` | `#806b74` `#f99f9a` `#add695` `#fed7a0` `#8ac9fa` `#eda7d7` `#7ce1e1` `#fcf4f8` |
| Day | `#f0dbd5` `#ac3f41` `#4b7b25` `#956506` `#0369a2` `#994683` `#12797a` `#5b4842` | `#8a756f` `#9a292e` `#356700` `#7b5304` `#055788` `#873272` `#0f6666` `#20120e` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- liberica --set
```

### Excelsa

[![Excelsa at night and in the day](site/assets/shots/excelsa/pair.webp)](https://bjarneo.github.io/coffee-themes/#excelsa)

`75` · Folder: [`excelsa/`](excelsa/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#excelsa)

Tart and fruity. It grows on tall trees in Southeast Asia. The recipe background shows a coffee cherry in cross-section.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`excelsa-night`](excelsa/night/) | `#16090b` | `#f0dcde` | `#fc8999` | `Yaru-red` |
| Day | [`excelsa-day`](excelsa/day/) | `#fcf0e9` | `#3c291f` | `#b94259` | `Yaru-red` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#271719` `#f37b7d` `#90c367` `#f5be43` `#56b4f5` `#e785c0` `#19d1d0` `#dac4c7` | `#846a6d` `#ff9a9a` `#acd78d` `#ffd98f` `#84c9fd` `#f5a3d2` `#6ee4e3` `#fdf4f5` |
| Day | `#f2dbd0` `#b23640` `#497c0c` `#8d6804` `#08699f` `#a13e7d` `#127a79` `#5c483f` | `#8a756b` `#a01c2d` `#3b6703` `#745502` `#075885` `#8f286c` `#0b6565` `#20120b` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- excelsa --set
```

## Roast levels

### Cinnamon Roast

[![Cinnamon Roast at night and in the day](site/assets/shots/cinnamon-roast/pair.webp)](https://bjarneo.github.io/coffee-themes/#cinnamon-roast)

`76` · Folder: [`cinnamon-roast/`](cinnamon-roast/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#cinnamon-roast)

The lightest roast. Light brown and grainy, with high acidity. The recipe background shows the roast curve.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`cinnamon-roast-night`](cinnamon-roast/night/) | `#2c1e14` | `#efded2` | `#f9a870` | `Yaru` |
| Day | [`cinnamon-roast-day`](cinnamon-roast/day/) | `#fdf0e1` | `#3a2b18` | `#aa590c` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#3e2e22` `#e58871` `#99bf7a` `#edc06a` `#6eb3e4` `#d98fbf` `#5eccc9` `#d9c7ba` | `#8e7766` `#f3a491` `#b3d39a` `#fed994` `#91c8f2` `#e9aad2` `#8bdfdc` `#fcf5f0` |
| Day | `#efddc8` `#a64832` `#53792f` `#8e6703` `#166a9b` `#954b7d` `#087a78` `#594a38` | `#887764` `#94341e` `#3f6514` `#765607` `#025886` `#83396c` `#056564` `#1e1406` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- cinnamon-roast --set
```

### Light Roast

[![Light Roast at night and in the day](site/assets/shots/light-roast/pair.webp)](https://bjarneo.github.io/coffee-themes/#light-roast)

`77` · Folder: [`light-roast/`](light-roast/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#light-roast)

Light brown and dry, with a bright, fruity taste. The recipe background shows the roast curve.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`light-roast-night`](light-roast/night/) | `#261a10` | `#eeded2` | `#e3a165` | `Yaru` |
| Day | [`light-roast-day`](light-roast/day/) | `#fcf0e2` | `#392b19` | `#a15d0d` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#38291e` `#e48681` `#adba6c` `#f9b971` `#71b2e6` `#d98fbf` `#5eccc8` `#d8c7ba` | `#897464` `#f1a29d` `#c4cf90` `#fed6ac` `#93c8f3` `#e9aad2` `#8bdfdc` `#fcf5f0` |
| Day | `#eeddc9` `#a54745` `#697318` `#9d6000` `#1d699c` `#944b7d` `#087a78` `#584a39` | `#877865` `#933333` `#576003` `#835000` `#015789` `#83386c` `#056563` `#1e1406` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- light-roast --set
```

### City Roast

[![City Roast at night and in the day](site/assets/shots/city-roast/pair.webp)](https://bjarneo.github.io/coffee-themes/#city-roast)

`78` · Folder: [`city-roast/`](city-roast/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#city-roast)

Medium brown. The roast stops just after the first crack. The recipe background shows the roast curve.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`city-roast-night`](city-roast/night/) | `#21150c` | `#eeded3` | `#ea9d60` | `Yaru` |
| Day | [`city-roast-day`](city-roast/day/) | `#fcf0e3` | `#392b19` | `#a95a00` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#32241a` `#e4877d` `#9bbe79` `#fcb86e` `#6db4e2` `#dc8fb9` `#60cbcb` `#d8c7bb` | `#857060` `#f2a39a` `#b5d29a` `#fed6ae` `#90c9f0` `#ebaacd` `#8cdfde` `#fcf5f0` |
| Day | `#eeddca` `#a54740` `#55782f` `#9d6003` `#126a99` `#974b77` `#127b7b` `#584a3a` | `#877866` `#93332e` `#436515` `#824e01` `#095881` `#863866` `#0e6666` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- city-roast --set
```

### Full City Roast

[![Full City Roast at night and in the day](site/assets/shots/full-city-roast/pair.webp)](https://bjarneo.github.io/coffee-themes/#full-city-roast)

`79` · Folder: [`full-city-roast/`](full-city-roast/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#full-city-roast)

Medium dark. The roast stops at the edge of the second crack. The recipe background shows the roast curve.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`full-city-roast-night`](full-city-roast/night/) | `#1c1109` | `#eeded4` | `#ed9a67` | `Yaru` |
| Day | [`full-city-roast-day`](full-city-roast/day/) | `#fcf0e4` | `#392b1b` | `#ac5716` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#2d1f17` `#e68774` `#9fbd76` `#edc06b` `#6eb3e3` `#db8fba` `#60cbca` `#d8c7bc` | `#836e60` `#f3a392` `#b8d297` `#fed895` `#90c8f0` `#ebaace` `#8cdfdd` `#fcf5f1` |
| Day | `#edddcc` `#a64735` `#5a772a` `#8f6704` `#156a99` `#964b78` `#137b7a` `#584a3b` | `#877767` `#943321` `#47640e` `#775608` `#005884` `#853867` `#0f6665` `#1e1407` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- full-city-roast --set
```

### Vienna Roast

[![Vienna Roast at night and in the day](site/assets/shots/vienna-roast/pair.webp)](https://bjarneo.github.io/coffee-themes/#vienna-roast)

`80` · Folder: [`vienna-roast/`](vienna-roast/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#vienna-roast)

Dark brown with spots of oil and a bittersweet taste. The recipe background shows the roast curve.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`vienna-roast-night`](vienna-roast/night/) | `#180c06` | `#eeddd4` | `#ef996c` | `Yaru` |
| Day | [`vienna-roast-day`](vienna-roast/day/) | `#fcf0e4` | `#392b1b` | `#ad5520` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#281a13` `#e68776` `#a1bd76` `#edc06a` `#73b2e3` `#e08eae` `#62cbcb` `#d8c6bd` | `#836c60` `#f3a395` `#bad298` `#fdd994` `#94c7f1` `#efaac3` `#8ddfde` `#fdf5f1` |
| Day | `#eeddcc` `#a64738` `#5c772a` `#8e6703` `#20699a` `#9b4a6c` `#007a7b` `#594a3b` | `#877767` `#943225` `#4a640e` `#765607` `#075887` `#89375b` `#006566` `#1f1308` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- vienna-roast --set
```

### French Roast

[![French Roast at night and in the day](site/assets/shots/french-roast/pair.webp)](https://bjarneo.github.io/coffee-themes/#french-roast)

`81` · Folder: [`french-roast/`](french-roast/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#french-roast)

Very dark and oily, with a smoky taste. The recipe background shows the roast curve.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`french-roast-night`](french-roast/night/) | `#120805` | `#edddd7` | `#eb9a75` | `Yaru` |
| Day | [`french-roast-day`](french-roast/day/) | `#f7ece3` | `#382b1e` | `#a7542c` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#221611` `#e48878` `#9ebe78` `#f3bc6d` `#71b3e2` `#db8fba` `#63cbc9` `#d8c6bf` | `#816c63` `#f1a496` `#b7d299` `#fdd7a2` `#93c8f0` `#eaaace` `#8edfdc` `#fdf5f1` |
| Day | `#e8d9cc` `#a5483a` `#56742a` `#926208` `#1c6999` `#964b78` `#007977` `#584a3d` | `#837467` `#933527` `#43620e` `#785007` `#005885` `#843867` `#006463` `#1e140a` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- french-roast --set
```

### Italian Roast

[![Italian Roast at night and in the day](site/assets/shots/italian-roast/pair.webp)](https://bjarneo.github.io/coffee-themes/#italian-roast)

`82` · Folder: [`italian-roast/`](italian-roast/) · [Open on the site](https://bjarneo.github.io/coffee-themes/#italian-roast)

The darkest roast. Nearly black and very oily. The recipe background shows the roast curve.

| Variant | Theme name | `background` | `foreground` | `accent` | Icons |
| --- | --- | --- | --- | --- | --- |
| Night | [`italian-roast-night`](italian-roast/night/) | `#0c0604` | `#ecded9` | `#e89b80` | `Yaru` |
| Day | [`italian-roast-day`](italian-roast/day/) | `#f5ede6` | `#372b21` | `#a5573c` | `Yaru` |

<details>
<summary>All 16 ANSI colors of each variant</summary>

| Variant | Normal, 0 to 7 | Bright, 8 to 15 |
| --- | --- | --- |
| Night | `#1b130f` `#dc8d7a` `#a2bc80` `#f2bc7f` `#7ab2db` `#d693b6` `#73c9c5` `#d6c7c1` | `#7f6d67` `#eaa897` `#bbd19f` `#fed6ab` `#9ac7ea` `#e6aeca` `#99ddda` `#fdf5f2` |
| Day | `#e5dad1` `#9d4f3d` `#5b7436` `#956016` `#2c6992` `#925074` `#127876` `#564b40` | `#83766b` `#8b3c2a` `#496120` `#7f4e01` `#145881` `#803e63` `#006462` `#1d140c` |

</details>

```bash
curl -fsSL https://bjarneo.github.io/coffee-themes/install.sh | bash -s -- italian-roast --set
```


## How the themes are made

The scripts in [`tools/`](tools/) make every file in this repo. They need Node.js 22 or later, Chromium, ImageMagick and ffmpeg.

| Script | Output |
| --- | --- |
| `tools/palettes.mjs` | The drink table and the color math. Every other script reads it. |
| `tools/build.mjs` | `colors.toml` and `icons.theme` of each variant, and `site/assets/themes.js` |
| `tools/render.mjs` | The 5 backgrounds of each variant at 6K. `tools/render.html` draws them on a canvas. |
| `tools/preview.mjs` | `preview.png` of each variant and the site screenshots. `tools/preview.html` draws an Omarchy desktop. |
| `tools/assets.mjs` | The site previews, the thumbnails, the Aether copies and the mosaic |
| `tools/promo.mjs` | `site/assets/promo.mp4`. `tools/promo.html` draws the frames. |
| `tools/readme.mjs` | This README |

To build everything again, run the scripts in this order:

```bash
node tools/build.mjs
node tools/render.mjs
node tools/preview.mjs
node tools/assets.mjs
node tools/promo.mjs song.mp3
node tools/readme.mjs
```

To change a drink, edit its row in `tools/palettes.mjs`, then run the scripts with the theme name, for example `node tools/render.mjs mocha`.

The site in [`site/`](site/) is a static page. The workflow in `.github/workflows/pages.yml` copies `install.sh` and every `colors.toml` into it and publishes it to GitHub Pages.
