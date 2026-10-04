// Palette source for all coffee themes. Each theme has a night variant and a
// day variant. The table below sets the character of each drink. The math
// under it turns that into 2 complete Omarchy palettes, and it raises or
// lowers the lightness of each color until it reaches its contrast target.

// Fields of each theme:
//   bg      night background as OKLCH [lightness, chroma, hue]
//   accent  signature color as [hue, chroma, night lightness]
//   second  second color for borders and drawings, same form as accent
//   chroma  chroma of the 6 ANSI hues
//   warm    0 to 1. Pulls the cool ANSI hues to the warm side and lowers their chroma.
//   roast   0 to 1. Color of the beans and the coffee in the backgrounds.
//   art     top view of the drink in the latte art background. tools/render.html
//           has one function for each value.
//   vessel  cup or glass of the drink
//   layers  recipe from the bottom to the top, as [ingredient, parts]
//   notes   brew facts for the recipe background
//   origin  country or region of a regional drink
//   temp    end temperature of a roast in degrees Celsius

const CATEGORIES = {
  espresso: 'Espresso drinks',
  brewed: 'Brewing methods',
  iced: 'Iced and cold drinks',
  regional: 'Regional drinks',
  flavored: 'Flavored drinks',
  beans: 'Coffee beans',
  roasts: 'Roast levels',
};

const L = (...layers) => layers;

const TABLE = [
  // Espresso drinks
  ['Espresso Solo', 'espresso', 'A short, strong shot of coffee.', { bg: [.16, .03, 50], accent: [72, .13], second: [40, .1], chroma: .11, warm: .6, roast: .75, art: 'crema', vessel: 'demitasse', layers: L(['espresso', 1], ['crema', .25]) }],
  ['Doppio', 'espresso', 'A double shot of espresso.', { bg: [.165, .032, 45], accent: [60, .14], second: [25, .12], chroma: .12, warm: .6, roast: .75, art: 'crema', vessel: 'demitasse', layers: L(['espresso', 2], ['crema', .3]) }],
  ['Ristretto', 'espresso', 'A short pull with less water. It tastes sweeter and stronger.', { bg: [.15, .035, 38], accent: [42, .14], second: [72, .11], chroma: .12, warm: .7, roast: .8, art: 'crema', vessel: 'demitasse', layers: L(['ristretto', .7], ['crema', .25]) }],
  ['Lungo', 'espresso', 'A long pull with more water.', { bg: [.19, .028, 60], accent: [78, .1], second: [55, .08], chroma: .1, warm: .5, roast: .7, art: 'crema', vessel: 'cup', layers: L(['long espresso', 2], ['crema', .2]) }],
  ['Americano', 'espresso', 'Espresso with hot water added.', { bg: [.19, .022, 55], accent: [68, .11], second: [250, .08], chroma: .11, warm: .4, roast: .7, art: 'black', vessel: 'mug', layers: L(['espresso', 1], ['hot water', 2]) }],
  ['Long Black', 'espresso', 'Hot water with espresso poured on top.', { bg: [.155, .018, 48], accent: [75, .12], second: [160, .07], chroma: .11, warm: .45, roast: .7, art: 'crema', vessel: 'cup', layers: L(['hot water', 2], ['espresso', 1], ['crema', .2]) }],
  ['Macchiato', 'espresso', 'Espresso marked with a spot of milk foam.', { bg: [.16, .028, 50], accent: [85, .04, .9], second: [55, .1], chroma: .1, warm: .55, roast: .7, art: 'dot', vessel: 'demitasse', layers: L(['espresso', 1], ['milk foam', .35]) }],
  ['Cortado', 'espresso', 'Espresso cut with an equal amount of warm milk.', { bg: [.2, .026, 58], accent: [66, .11], second: [28, .12], chroma: .11, warm: .5, roast: .65, art: 'heart', vessel: 'glass', layers: L(['espresso', 1], ['steamed milk', 1]) }],
  ['Gibraltar', 'espresso', 'A cortado in a short Gibraltar glass.', { bg: [.19, .018, 230], accent: [215, .08], second: [70, .11], chroma: .11, warm: .2, roast: .6, art: 'heart', vessel: 'glass', layers: L(['espresso', 1], ['steamed milk', 1], ['microfoam', .25]) }],
  ['Piccolo', 'espresso', 'A ristretto with warm milk in a small glass.', { bg: [.2, .026, 62], accent: [82, .1], second: [45, .1], chroma: .1, warm: .5, roast: .65, art: 'tulip', vessel: 'glass', layers: L(['ristretto', 1], ['steamed milk', 2], ['microfoam', .3]) }],
  ['Flat White', 'espresso', 'Espresso with thin, velvety microfoam.', { bg: [.22, .02, 70], accent: [86, .05, .88], second: [60, .09], chroma: .09, warm: .45, roast: .6, art: 'rosetta', vessel: 'cup', layers: L(['espresso', 2], ['steamed milk', 3], ['microfoam', .3]) }],
  ['Cappuccino', 'espresso', 'Espresso with equal parts steamed milk and foam.', { bg: [.2, .032, 52], accent: [55, .1], second: [85, .05, .88], chroma: .11, warm: .55, roast: .65, art: 'heart', vessel: 'cup', layers: L(['espresso', 1], ['steamed milk', 1], ['milk foam', 1]) }],
  ['Latte', 'espresso', 'Espresso with a lot of steamed milk and a thin layer of foam.', { bg: [.24, .03, 70], accent: [80, .07, .86], second: [55, .09], chroma: .09, warm: .45, roast: .55, art: 'rosetta', vessel: 'cup', layers: L(['espresso', 1], ['steamed milk', 3], ['milk foam', .4]) }],
  ['Latte Macchiato', 'espresso', 'Steamed milk with espresso poured on top.', { bg: [.23, .028, 75], accent: [70, .11], second: [88, .04, .9], chroma: .1, warm: .45, roast: .6, art: 'stain', vessel: 'tall', layers: L(['steamed milk', 3], ['espresso', 1], ['milk foam', 1]) }],
  ['Mocha', 'espresso', 'A latte with chocolate.', { bg: [.19, .035, 35], accent: [45, .09, .74], second: [25, .1], chroma: .11, warm: .6, roast: .7, art: 'dust', vessel: 'cup', layers: L(['chocolate', .5], ['espresso', 1], ['steamed milk', 2], ['milk foam', .4]) }],
  ['White Mocha', 'espresso', 'A latte with white chocolate.', { bg: [.22, .022, 75], accent: [92, .06, .9], second: [60, .08], chroma: .09, warm: .45, roast: .6, art: 'rosetta', vessel: 'cup', layers: L(['white chocolate', .5], ['espresso', 1], ['steamed milk', 2], ['milk foam', .4]) }],
  ['Breve', 'espresso', 'A latte made with half-and-half.', { bg: [.21, .028, 72], accent: [90, .09, .86], second: [60, .09], chroma: .1, warm: .5, roast: .6, art: 'heart', vessel: 'cup', layers: L(['espresso', 1], ['half-and-half', 2], ['foam', .5]) }],
  ['Con Panna', 'espresso', 'Espresso with whipped cream.', { bg: [.16, .03, 48], accent: [95, .03, .94], second: [55, .11], chroma: .11, warm: .55, roast: .75, art: 'cream', vessel: 'demitasse', layers: L(['espresso', 1], ['whipped cream', .9]) }],
  ['Romano', 'espresso', 'Espresso with a slice of lemon.', { bg: [.165, .028, 60], accent: [105, .15, .86], second: [65, .11], chroma: .12, warm: .5, roast: .75, art: 'lemon', vessel: 'demitasse', layers: L(['espresso', 1], ['crema', .25]) }],
  ['Affogato', 'espresso', 'Espresso poured over ice cream.', { bg: [.18, .03, 55], accent: [95, .07, .9], second: [45, .1], chroma: .1, warm: .5, roast: .7, art: 'affogato', vessel: 'bowl', layers: L(['vanilla gelato', 2], ['espresso', 1]) }],
  ['Marocchino', 'espresso', 'Espresso with cocoa powder and milk foam.', { bg: [.18, .035, 42], accent: [48, .1], second: [80, .05, .88], chroma: .11, warm: .6, roast: .7, art: 'dust', vessel: 'glass', layers: L(['cocoa powder', .2], ['espresso', 1], ['milk foam', 1], ['cocoa powder', .12]) }],
  ['Corretto', 'espresso', 'Espresso with a shot of grappa.', { bg: [.165, .025, 70], accent: [96, .08, .88], second: [50, .11], chroma: .11, warm: .5, roast: .75, art: 'crema', vessel: 'demitasse', layers: L(['espresso', 1], ['grappa', .4]) }],
  ['Red Eye', 'espresso', 'Drip coffee with 1 shot of espresso.', { bg: [.17, .03, 30], accent: [25, .16], second: [60, .1], chroma: .13, warm: .55, roast: .7, art: 'black', vessel: 'mug', layers: L(['drip coffee', 3], ['espresso', 1]) }],
  ['Black Eye', 'espresso', 'Drip coffee with 2 shots of espresso.', { bg: [.16, .025, 310], accent: [300, .11], second: [40, .09], chroma: .12, warm: .3, roast: .75, art: 'black', vessel: 'mug', layers: L(['drip coffee', 3], ['espresso', 2]) }],
  ['Dead Eye', 'espresso', 'Drip coffee with 3 shots of espresso.', { bg: [.14, .02, 150], accent: [145, .13], second: [70, .1], chroma: .13, warm: .3, roast: .8, art: 'black', vessel: 'mug', layers: L(['drip coffee', 3], ['espresso', 3]) }],

  // Brewing methods
  ['Drip Coffee', 'brewed', 'A machine drips hot water through ground coffee.', { bg: [.19, .025, 50], accent: [25, .15], second: [175, .08], chroma: .12, warm: .4, roast: .6, art: 'black', vessel: 'mug', layers: L(['drip coffee', 1]), notes: ['medium grind', '1:16 ratio', '5 min brew'] }],
  ['Pour-Over', 'brewed', 'Hot water poured by hand through a filter.', { bg: [.2, .024, 65], accent: [60, .13], second: [140, .07], chroma: .11, warm: .4, roast: .4, art: 'black', vessel: 'cup', layers: L(['pour-over coffee', 1]), notes: ['medium-fine grind', '1:16 ratio', '3 min pour'] }],
  ['French Press', 'brewed', 'Coffee steeps in water, then a metal mesh presses it down.', { bg: [.18, .025, 70], accent: [80, .11], second: [45, .09], chroma: .11, warm: .5, roast: .7, art: 'black', vessel: 'mug', layers: L(['coffee', 1], ['oils and fines', .08]), notes: ['coarse grind', '1:15 ratio', '4 min steep'] }],
  ['AeroPress', 'brewed', 'Air pressure pushes the coffee through a filter.', { bg: [.18, .012, 250], accent: [45, .15], second: [220, .07], chroma: .12, warm: .25, roast: .55, art: 'black', vessel: 'mug', layers: L(['coffee', 1]), notes: ['fine grind', '1:12 ratio', '2 min steep'] }],
  ['Chemex', 'brewed', 'A pour-over in a glass flask with a thick paper filter.', { bg: [.21, .02, 70], accent: [62, .1], second: [210, .05], chroma: .1, warm: .4, roast: .4, art: 'black', vessel: 'cup', layers: L(['coffee', 1]), notes: ['medium-coarse grind', '1:16 ratio', '4 min pour'] }],
  ['Siphon', 'brewed', 'Vapor pressure and a vacuum brew the coffee.', { bg: [.17, .025, 255], accent: [230, .11], second: [70, .11], chroma: .12, warm: .2, roast: .45, art: 'black', vessel: 'cup', layers: L(['coffee', 1]), notes: ['medium grind', '1:15 ratio', '90 s steep'] }],
  ['Moka Pot', 'brewed', 'Steam pressure on a stovetop makes a strong coffee.', { bg: [.17, .02, 60], accent: [32, .13], second: [240, .06], chroma: .12, warm: .5, roast: .75, art: 'crema', vessel: 'demitasse', layers: L(['moka coffee', 1], ['crema', .1]), notes: ['fine grind', '1:7 ratio', '5 min on the stove'] }],
  ['Percolator', 'brewed', 'The pot cycles boiling water through the grounds again and again.', { bg: [.18, .025, 245], accent: [245, .1], second: [60, .1], chroma: .11, warm: .3, roast: .75, art: 'black', vessel: 'enamel', layers: L(['percolated coffee', 1]), notes: ['coarse grind', '1:16 ratio', '8 min cycle'] }],
  ['Cold Brew', 'brewed', 'Coffee that steeps in cold water for 12 to 24 hours.', { bg: [.155, .02, 250], accent: [225, .08, .82], second: [70, .1], chroma: .1, warm: .15, roast: .7, art: 'ice', vessel: 'tumbler', layers: L(['cold brew', 2], ['ice', 1]), notes: ['coarse grind', '1:8 ratio', '18 h steep'] }],
  ['Nitro Cold Brew', 'brewed', 'Cold brew with nitrogen gas. It has a creamy texture.', { bg: [.16, .012, 265], accent: [82, .06, .88], second: [235, .06], chroma: .1, warm: .2, roast: .7, art: 'foam', vessel: 'tall', layers: L(['nitro cold brew', 3], ['cascade foam', .6]), notes: ['nitrogen gas', 'served cold', 'no ice'] }],
  ['Turkish Coffee', 'brewed', 'Very fine grounds boiled in a cezve and not filtered.', { bg: [.16, .035, 45], accent: [50, .13], second: [195, .09], chroma: .12, warm: .5, roast: .8, art: 'foam', vessel: 'demitasse', layers: L(['grounds', .35], ['coffee', 1], ['coffee foam', .25]), notes: ['powder-fine grind', '1:10 ratio', 'boiled in a cezve'] }],
  ['Cowboy Coffee', 'brewed', 'Grounds boiled in a pot of water.', { bg: [.15, .022, 40], accent: [45, .16], second: [240, .08], chroma: .13, warm: .5, roast: .8, art: 'black', vessel: 'enamel', layers: L(['grounds', .3], ['coffee', 2]), notes: ['coarse grind', '1:15 ratio', 'boiled on a fire'] }],

  // Iced and cold drinks
  ['Iced Coffee', 'iced', 'Brewed coffee served over ice.', { bg: [.18, .02, 230], accent: [220, .07, .84], second: [65, .11], chroma: .11, warm: .15, roast: .6, art: 'ice', vessel: 'tumbler', layers: L(['coffee', 2], ['ice', 1]) }],
  ['Iced Latte', 'iced', 'Espresso and cold milk over ice.', { bg: [.21, .018, 220], accent: [85, .05, .9], second: [225, .07], chroma: .1, warm: .2, roast: .6, art: 'ice', vessel: 'tumbler', layers: L(['cold milk', 2], ['espresso', 1], ['ice', 1]) }],
  ['Shakerato', 'iced', 'Espresso shaken with ice and sugar.', { bg: [.17, .025, 65], accent: [80, .11], second: [210, .04], chroma: .11, warm: .45, roast: .7, art: 'foam', vessel: 'coupe', layers: L(['espresso', 2], ['shaken foam', 1]) }],
  ['Espresso Tonic', 'iced', 'Espresso poured over tonic water.', { bg: [.17, .022, 200], accent: [112, .14], second: [195, .09], chroma: .12, warm: .1, roast: .55, art: 'ice', vessel: 'tumbler', layers: L(['tonic water', 2], ['espresso', 1], ['ice', 1]) }],
  ['Japanese Iced Coffee', 'iced', 'Hot coffee brewed directly onto ice.', { bg: [.17, .02, 240], accent: [30, .15], second: [215, .06], chroma: .12, warm: .2, roast: .45, art: 'ice', vessel: 'tumbler', layers: L(['flash-brewed coffee', 2], ['ice', 1]) }],
  ['Greek Frappé', 'iced', 'Instant coffee shaken into a thick foam.', { bg: [.18, .03, 250], accent: [245, .12], second: [85, .06, .88], chroma: .12, warm: .15, roast: .6, art: 'foam', vessel: 'tall', layers: L(['ice water', 1], ['milk', .5], ['frappé foam', 2]) }],
  ['Dalgona Coffee', 'iced', 'Whipped instant coffee on top of milk.', { bg: [.2, .03, 60], accent: [70, .12], second: [10, .07, .8], chroma: .11, warm: .45, roast: .6, art: 'dalgona', vessel: 'tumbler', layers: L(['cold milk', 2], ['ice', .6], ['whipped coffee', 1]) }],
  ['Mazagran', 'iced', 'Iced coffee with lemon.', { bg: [.18, .025, 75], accent: [104, .15, .86], second: [40, .11], chroma: .12, warm: .35, roast: .65, art: 'icelemon', vessel: 'tall', layers: L(['coffee', 2], ['lemon', .3], ['ice', 1]) }],

  // Regional drinks
  ['Irish Coffee', 'regional', 'Coffee, Irish whiskey, sugar and cream.', { origin: 'Ireland', bg: [.16, .025, 150], accent: [72, .13], second: [150, .11], chroma: .12, warm: .35, roast: .7, art: 'float', vessel: 'stemmed', layers: L(['irish whiskey', .6], ['coffee', 2], ['cream', 1]) }],
  ['Café au Lait', 'regional', 'Brewed coffee with hot milk.', { origin: 'France', bg: [.22, .025, 72], accent: [78, .08, .85], second: [255, .09], chroma: .1, warm: .4, roast: .55, art: 'foam', vessel: 'bowl', layers: L(['coffee', 1], ['hot milk', 1]) }],
  ['Café Cubano', 'regional', 'Espresso sweetened with sugar during the brew.', { origin: 'Cuba', bg: [.17, .032, 55], accent: [75, .13], second: [190, .09], chroma: .12, warm: .5, roast: .8, art: 'foam', vessel: 'demitasse', layers: L(['espresso', 1], ['espumita', .3]) }],
  ['Cortadito', 'regional', 'A café cubano with steamed milk.', { origin: 'Cuba', bg: [.2, .03, 60], accent: [70, .12], second: [195, .09], chroma: .12, warm: .5, roast: .75, art: 'heart', vessel: 'glass', layers: L(['café cubano', 1], ['steamed milk', 1]) }],
  ['Café Bombón', 'regional', 'Espresso with sweetened condensed milk.', { origin: 'Spain', bg: [.18, .03, 58], accent: [85, .07, .88], second: [28, .13], chroma: .11, warm: .5, roast: .7, art: 'crema', vessel: 'glass', layers: L(['condensed milk', 1], ['espresso', 1]) }],
  ['Carajillo', 'regional', 'Coffee with brandy or Licor 43.', { origin: 'Spain and Mexico', bg: [.17, .03, 70], accent: [82, .13], second: [40, .12], chroma: .12, warm: .5, roast: .7, art: 'foam', vessel: 'tumbler', layers: L(['licor 43', 1], ['espresso', 1], ['shaken foam', .25]) }],
  ['Café de Olla', 'regional', 'Coffee with cinnamon and piloncillo sugar.', { origin: 'Mexico', bg: [.17, .04, 35], accent: [55, .13], second: [30, .12], chroma: .12, warm: .6, roast: .7, art: 'cinnamon', vessel: 'clay', layers: L(['piloncillo', .3], ['coffee with cinnamon', 2]) }],
  ['Cà Phê Sữa Đá', 'regional', 'Strong iced coffee with condensed milk.', { origin: 'Vietnam', bg: [.16, .03, 55], accent: [88, .07, .88], second: [25, .14], chroma: .12, warm: .45, roast: .85, art: 'ice', vessel: 'tumbler', layers: L(['condensed milk', .7], ['phin coffee', 1.5], ['ice', 1]) }],
  ['Cà Phê Trứng', 'regional', 'Coffee topped with whipped egg yolk.', { origin: 'Vietnam', bg: [.17, .03, 60], accent: [92, .13, .85], second: [40, .1], chroma: .12, warm: .5, roast: .8, art: 'egg', vessel: 'cup', layers: L(['coffee', 1], ['egg cream', 1]) }],
  ['Kopi', 'regional', 'Strong coffee with condensed milk.', { origin: 'Malaysia and Singapore', bg: [.17, .03, 62], accent: [118, .11], second: [70, .1], chroma: .12, warm: .5, roast: .9, art: 'milky', vessel: 'cup', layers: L(['condensed milk', .5], ['kopi', 2]) }],
  ['Yuanyang', 'regional', 'Coffee mixed with milk tea.', { origin: 'Hong Kong', bg: [.19, .03, 60], accent: [65, .11], second: [25, .12], chroma: .12, warm: .5, roast: .7, art: 'milky', vessel: 'cup', layers: L(['milk tea', 2], ['coffee', 1]) }],
  ['Galão', 'regional', 'Espresso with foamed milk in a tall glass.', { origin: 'Portugal', bg: [.2, .025, 250], accent: [255, .11], second: [80, .06, .88], chroma: .11, warm: .25, roast: .65, art: 'foam', vessel: 'tall', layers: L(['espresso', 1], ['foamed milk', 3]) }],
  ['Wiener Melange', 'regional', 'Espresso with steamed milk and foam.', { origin: 'Austria', bg: [.18, .03, 25], accent: [20, .12], second: [80, .06, .86], chroma: .11, warm: .55, roast: .65, art: 'heart', vessel: 'cup', layers: L(['espresso', 1], ['steamed milk', 1], ['milk foam', 1]) }],
  ['Einspänner', 'regional', 'Espresso with a thick layer of whipped cream.', { origin: 'Austria', bg: [.17, .028, 55], accent: [88, .09, .86], second: [30, .1], chroma: .11, warm: .5, roast: .7, art: 'cream', vessel: 'glass', layers: L(['espresso', 2], ['whipped cream', 1.2]) }],
  ['Pharisäer', 'regional', 'Coffee with rum and whipped cream.', { origin: 'Germany', bg: [.16, .03, 45], accent: [60, .13], second: [95, .03, .92], chroma: .12, warm: .55, roast: .7, art: 'cream', vessel: 'cup', layers: L(['rum', .5], ['coffee', 2], ['whipped cream', 1]) }],
  ['Kaffeost', 'regional', 'Hot coffee poured over cubes of cheese.', { origin: 'Finland and Sweden', bg: [.2, .025, 90], accent: [95, .1, .88], second: [55, .09], chroma: .1, warm: .4, roast: .45, art: 'cheese', vessel: 'guksi', layers: L(['cheese', .6], ['coffee', 2]) }],
  ['Qahwa', 'regional', 'Light-roast coffee with cardamom.', { origin: 'Arabian Peninsula', bg: [.18, .03, 85], accent: [120, .1], second: [80, .12], chroma: .11, warm: .45, roast: .25, art: 'golden', vessel: 'finjan', layers: L(['qahwa with cardamom', 1]) }],
  ['Bicerin', 'regional', 'Espresso, chocolate and cream in layers.', { origin: 'Italy', bg: [.17, .035, 38], accent: [42, .1], second: [90, .04, .9], chroma: .11, warm: .6, roast: .75, art: 'float', vessel: 'glass', layers: L(['chocolate', 1], ['espresso', 1], ['cream', 1]) }],

  // Flavored drinks
  ['Caramel Macchiato', 'flavored', 'Vanilla, milk, espresso and a caramel drizzle.', { bg: [.19, .035, 60], accent: [68, .14], second: [90, .06, .88], chroma: .12, warm: .55, roast: .7, art: 'caramel', vessel: 'tall', layers: L(['vanilla syrup', .3], ['steamed milk', 3], ['espresso', 1], ['caramel', .2]) }],
  ['Vanilla Latte', 'flavored', 'A latte with vanilla syrup.', { bg: [.21, .025, 80], accent: [92, .07, .9], second: [40, .08], chroma: .1, warm: .45, roast: .6, art: 'rosetta', vessel: 'cup', layers: L(['vanilla syrup', .3], ['espresso', 1], ['steamed milk', 3], ['milk foam', .4]) }],
  ['Hazelnut Latte', 'flavored', 'A latte with hazelnut syrup.', { bg: [.19, .03, 58], accent: [62, .1], second: [130, .07], chroma: .11, warm: .5, roast: .65, art: 'tulip', vessel: 'cup', layers: L(['hazelnut syrup', .3], ['espresso', 1], ['steamed milk', 3], ['milk foam', .4]) }],
  ['Peppermint Mocha', 'flavored', 'Chocolate, peppermint, espresso and milk.', { bg: [.17, .035, 30], accent: [22, .16], second: [165, .1], chroma: .13, warm: .5, roast: .7, art: 'candy', vessel: 'mug', layers: L(['peppermint syrup', .3], ['chocolate', .5], ['espresso', 1], ['steamed milk', 2], ['whipped cream', .8]) }],
  ['Pumpkin Spice Latte', 'flavored', 'Pumpkin and spices with espresso and milk.', { bg: [.18, .035, 45], accent: [55, .16], second: [35, .12], chroma: .13, warm: .6, roast: .65, art: 'spice', vessel: 'mug', layers: L(['pumpkin spice sauce', .4], ['espresso', 1], ['steamed milk', 2], ['whipped cream', .6]) }],
  ['Honey Latte', 'flavored', 'A latte sweetened with honey.', { bg: [.2, .03, 70], accent: [80, .15], second: [55, .11], chroma: .12, warm: .5, roast: .6, art: 'heart', vessel: 'cup', layers: L(['honey', .3], ['espresso', 1], ['steamed milk', 3], ['milk foam', .4]) }],
  ['Lavender Latte', 'flavored', 'A latte with lavender syrup.', { bg: [.19, .025, 315], accent: [300, .1], second: [80, .06, .88], chroma: .11, warm: .25, roast: .6, art: 'rosetta', vessel: 'cup', layers: L(['lavender syrup', .3], ['espresso', 1], ['steamed milk', 3], ['milk foam', .4]) }],
  ['Dirty Chai', 'flavored', 'A chai latte with a shot of espresso.', { bg: [.18, .035, 45], accent: [52, .14], second: [125, .08], chroma: .12, warm: .6, roast: .65, art: 'chai', vessel: 'mug', layers: L(['chai', 2], ['espresso', 1], ['milk foam', .4]) }],

  // Coffee beans
  ['Arabica', 'beans', 'Sweet and bright. About 60 percent of the coffee in the world.', { bg: [.17, .03, 30], accent: [22, .17], second: [145, .11], chroma: .13, warm: .4, roast: .55, art: 'black', vessel: 'cup', layers: L(['coffee', 1]) }],
  ['Robusta', 'beans', 'Strong and bitter, with almost twice the caffeine of Arabica.', { bg: [.15, .02, 80], accent: [95, .1], second: [45, .09], chroma: .11, warm: .5, roast: .85, art: 'crema', vessel: 'demitasse', layers: L(['coffee', 1]) }],
  ['Liberica', 'beans', 'Large beans with a smoky, floral taste.', { bg: [.17, .025, 350], accent: [335, .11], second: [75, .11], chroma: .12, warm: .4, roast: .7, art: 'black', vessel: 'cup', layers: L(['coffee', 1]) }],
  ['Excelsa', 'beans', 'Tart and fruity. It grows on tall trees in Southeast Asia.', { bg: [.16, .03, 10], accent: [12, .14], second: [345, .11], chroma: .13, warm: .4, roast: .6, art: 'black', vessel: 'cup', layers: L(['coffee', 1]) }],

  // Roast levels
  ['Cinnamon Roast', 'roasts', 'The lightest roast. Light brown and grainy, with high acidity.', { bg: [.25, .035, 58], accent: [55, .12, .8], second: [80, .08], chroma: .11, warm: .45, roast: .08, temp: 196, art: 'golden', vessel: 'cup', layers: L(['coffee', 1]) }],
  ['Light Roast', 'roasts', 'Light brown and dry, with a bright, fruity taste.', { bg: [.23, .033, 60], accent: [62, .11], second: [100, .07], chroma: .11, warm: .45, roast: .22, temp: 205, art: 'golden', vessel: 'cup', layers: L(['coffee', 1]) }],
  ['City Roast', 'roasts', 'Medium brown. The roast stops just after the first crack.', { bg: [.21, .032, 58], accent: [58, .12], second: [30, .09], chroma: .11, warm: .5, roast: .38, temp: 212, art: 'black', vessel: 'cup', layers: L(['coffee', 1]) }],
  ['Full City Roast', 'roasts', 'Medium dark. The roast stops at the edge of the second crack.', { bg: [.19, .03, 55], accent: [52, .12], second: [80, .09], chroma: .11, warm: .5, roast: .52, temp: 220, art: 'black', vessel: 'cup', layers: L(['coffee', 1]) }],
  ['Vienna Roast', 'roasts', 'Dark brown with spots of oil and a bittersweet taste.', { bg: [.17, .03, 50], accent: [48, .12], second: [20, .1], chroma: .11, warm: .55, roast: .68, temp: 227, art: 'crema', vessel: 'demitasse', layers: L(['coffee', 1]) }],
  ['French Roast', 'roasts', 'Very dark and oily, with a smoky taste.', { bg: [.15, .025, 45], accent: [45, .11], second: [70, .09], chroma: .11, warm: .55, roast: .84, temp: 236, art: 'crema', vessel: 'demitasse', layers: L(['coffee', 1]) }],
  ['Italian Roast', 'roasts', 'The darkest roast. Nearly black and very oily.', { bg: [.13, .018, 42], accent: [40, .1], second: [60, .08], chroma: .1, warm: .55, roast: .96, temp: 245, art: 'black', vessel: 'demitasse', layers: L(['coffee', 1]) }],
];

// Signature palettes. Like Osaka Jade or Miasma in Omarchy, these themes fill
// the 6 ANSI slots with the colors of the drink, so a slot can hold a color
// that is not its name: the yellow of Cold Brew is coffee amber, and the blue
// of Pumpkin Spice Latte is pumpkin. Each slot is "hue chroma lightness" in
// OKLCH, in the order red, green, yellow, blue, magenta, cyan. The lightness
// is for night. The contrast check still raises or lowers every color.
const SIGNATURE = {
  'Espresso Solo': '30 .13 .68, 110 .09 .80, 80 .13 .86, 55 .07 .74, 5 .09 .76, 190 .05 .82',
  'Ristretto': '28 .15 .66, 95 .10 .80, 70 .14 .84, 45 .09 .72, 0 .10 .76, 75 .05 .90',
  'Mocha': '12 .14 .68, 125 .08 .78, 70 .12 .84, 45 .08 .72, 350 .10 .78, 80 .04 .90',
  'White Mocha': '30 .10 .72, 115 .07 .80, 90 .10 .90, 65 .05 .76, 10 .07 .80, 200 .04 .86',
  'Affogato': '30 .11 .70, 125 .07 .78, 92 .10 .90, 55 .06 .74, 5 .08 .78, 200 .04 .86',
  'Romano': '35 .13 .68, 130 .13 .80, 105 .16 .90, 80 .09 .76, 55 .11 .74, 150 .08 .84',
  'Red Eye': '25 .17 .64, 140 .09 .78, 60 .14 .80, 15 .11 .72, 355 .13 .76, 35 .06 .88',
  'Black Eye': '355 .13 .70, 155 .07 .78, 85 .10 .86, 285 .11 .72, 320 .13 .76, 265 .07 .84',
  'Dead Eye': '25 .13 .66, 140 .15 .78, 115 .14 .86, 165 .09 .72, 90 .09 .80, 185 .10 .84',
  'Siphon': '20 .12 .72, 170 .08 .78, 80 .10 .86, 262 .13 .72, 295 .10 .76, 225 .11 .84',
  'Percolator': '25 .12 .72, 160 .08 .78, 80 .10 .86, 250 .12 .72, 285 .07 .78, 230 .07 .86',
  'Cold Brew': '25 .09 .72, 175 .08 .80, 75 .10 .86, 245 .10 .74, 280 .07 .78, 215 .09 .84',
  'Nitro Cold Brew': '40 .08 .72, 155 .06 .80, 82 .07 .90, 250 .07 .74, 300 .05 .78, 220 .06 .84',
  'Turkish Coffee': '40 .14 .70, 155 .09 .78, 82 .12 .86, 255 .12 .72, 15 .12 .72, 195 .10 .82',
  'Cowboy Coffee': '35 .16 .66, 130 .08 .76, 72 .15 .84, 250 .09 .74, 15 .10 .70, 60 .06 .90',
  'Espresso Tonic': '30 .12 .72, 130 .13 .80, 105 .15 .90, 210 .09 .76, 60 .10 .76, 185 .09 .86',
  'Japanese Iced Coffee': '32 .16 .66, 140 .07 .78, 85 .10 .86, 265 .10 .72, 355 .10 .78, 225 .07 .84',
  'Greek Frappé': '25 .12 .72, 170 .08 .78, 85 .08 .90, 252 .13 .72, 230 .08 .80, 205 .10 .86',
  'Dalgona Coffee': '15 .11 .72, 120 .07 .78, 75 .13 .84, 50 .08 .74, 355 .09 .82, 85 .04 .90',
  'Irish Coffee': '30 .13 .70, 150 .13 .78, 75 .13 .84, 165 .09 .70, 60 .10 .76, 180 .08 .86',
  'Café de Olla': '30 .14 .66, 120 .07 .76, 70 .13 .84, 45 .08 .72, 15 .10 .76, 85 .05 .90',
  'Cà Phê Sữa Đá': '30 .13 .70, 130 .08 .78, 88 .08 .90, 50 .07 .74, 15 .09 .76, 190 .05 .84',
  'Kopi': '30 .12 .70, 135 .12 .78, 95 .11 .88, 60 .07 .74, 15 .08 .76, 155 .07 .86',
  'Yuanyang': '30 .12 .70, 115 .08 .78, 75 .11 .86, 55 .07 .74, 15 .08 .76, 190 .05 .84',
  'Galão': '25 .12 .72, 170 .08 .78, 85 .08 .90, 255 .12 .72, 240 .08 .80, 222 .09 .86',
  'Wiener Melange': '20 .14 .66, 150 .07 .78, 85 .11 .86, 10 .09 .74, 350 .09 .80, 80 .04 .90',
  'Qahwa': '35 .12 .70, 125 .11 .80, 85 .13 .86, 150 .07 .72, 60 .09 .76, 100 .06 .90',
  'Bicerin': '25 .12 .70, 120 .06 .78, 80 .09 .88, 40 .07 .72, 5 .08 .78, 200 .04 .86',
  'Caramel Macchiato': '35 .14 .70, 110 .08 .78, 72 .14 .84, 55 .08 .74, 15 .09 .76, 88 .05 .90',
  'Peppermint Mocha': '22 .17 .66, 160 .12 .78, 85 .08 .90, 180 .09 .72, 355 .12 .78, 165 .07 .88',
  'Pumpkin Spice Latte': '30 .15 .66, 120 .09 .76, 75 .15 .84, 50 .12 .74, 15 .10 .72, 85 .06 .90',
  'Honey Latte': '40 .13 .70, 115 .09 .78, 85 .15 .88, 70 .10 .76, 25 .09 .74, 100 .06 .90',
  'Lavender Latte': '355 .12 .72, 150 .07 .78, 85 .08 .88, 285 .10 .74, 315 .11 .78, 262 .07 .84',
  'Dirty Chai': '35 .14 .66, 125 .09 .76, 80 .12 .84, 50 .08 .72, 15 .09 .76, 90 .05 .90',
  'Arabica': '20 .17 .64, 145 .12 .76, 85 .11 .86, 165 .07 .72, 0 .12 .76, 115 .06 .84',
  'Robusta': '50 .08 .66, 120 .08 .76, 92 .10 .84, 100 .06 .72, 40 .07 .74, 80 .05 .88',
  'Liberica': '10 .12 .70, 140 .08 .78, 80 .10 .86, 300 .07 .74, 340 .11 .78, 60 .05 .90',
  'Excelsa': '15 .15 .66, 130 .09 .78, 70 .12 .84, 345 .10 .72, 0 .13 .78, 30 .06 .90',
  'Cinnamon Roast': '45 .12 .72, 110 .08 .80, 80 .11 .88, 60 .07 .76, 30 .08 .74, 200 .03 .86',
  'Light Roast': '40 .12 .70, 115 .09 .78, 78 .12 .86, 58 .07 .74, 25 .08 .76, 200 .03 .86',
  'City Roast': '38 .12 .69, 115 .08 .77, 75 .12 .85, 55 .07 .73, 22 .08 .75, 200 .03 .85',
  'Full City Roast': '35 .12 .68, 112 .08 .76, 72 .12 .84, 52 .07 .72, 20 .08 .74, 200 .03 .84',
  'Vienna Roast': '32 .11 .67, 110 .07 .75, 70 .11 .83, 50 .06 .71, 18 .07 .73, 200 .03 .84',
  'French Roast': '30 .10 .66, 105 .06 .74, 68 .10 .82, 48 .06 .70, 15 .07 .72, 200 .03 .83',
  'Italian Roast': '28 .09 .65, 100 .05 .73, 65 .09 .81, 45 .05 .69, 12 .06 .71, 200 .03 .82',
};

// ---------- color math ----------

function rng(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// OKLCH to linear sRGB.
function lin(L, C, h) {
  h *= Math.PI / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l = (L + .3963377774 * a + .2158037573 * b) ** 3;
  const m = (L - .1055613458 * a - .0638541728 * b) ** 3;
  const s = (L - .0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + .2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - .3413193965 * s,
    -.0041960863 * l - .7034186147 * m + 1.707614701 * s,
  ];
}

// OKLCH to hex. Chroma drops until the color fits in sRGB.
export function oklchHex(L, C, h) {
  let c = C, r = lin(L, c, h);
  while (c > 0 && r.some(v => v < -.001 || v > 1.001)) { c -= .005; r = lin(L, c, h); }
  return '#' + r.map(v => {
    v = Math.min(1, Math.max(0, v));
    v = v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055;
    return Math.round(v * 255).toString(16).padStart(2, '0');
  }).join('');
}

// Hex to OKLCH.
export function hexOklch(hex) {
  const [r, g, b] = [1, 3, 5].map(i => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
  });
  const l = Math.cbrt(.4122214708 * r + .5363325363 * g + .0514459929 * b);
  const m = Math.cbrt(.2119034982 * r + .6806995451 * g + .1073969566 * b);
  const s = Math.cbrt(.0883024619 * r + .2817188376 * g + .6299787005 * b);
  const L = .2104542553 * l + .7936177850 * m - .0040720468 * s;
  const A = 1.9779984951 * l - 2.4285922050 * m + .4505937099 * s;
  const B = .0259040371 * l + .7827717662 * m - .8086757660 * s;
  return { L, C: Math.hypot(A, B), h: (Math.atan2(B, A) * 180 / Math.PI + 360) % 360 };
}

// Linear sRGB mix, the same math that Omarchy uses for derived shades.
export function mix(a, b, t) {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.floor(v * (1 - t) + pb[i] * t + .5).toString(16).padStart(2, '0')).join('');
}

// WCAG contrast ratio of two hex colors.
export function contrast(a, b) {
  const lum = hex => {
    const [r, g, bl] = [1, 3, 5].map(i => {
      const v = parseInt(hex.slice(i, i + 2), 16) / 255;
      return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
    });
    return .2126 * r + .7152 * g + .0722 * bl;
  };
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}

// The first color at or above lightness L that reaches the target contrast.
function lighten(L, C, h, bg, target) {
  let hex = oklchHex(L, C, h);
  while (contrast(hex, bg) < target && L < 1) { L = Math.min(1, L + .005); hex = oklchHex(L, C, h); }
  return hex;
}

// The first color at or below lightness L that reaches the target contrast.
function darken(L, C, h, bg, target) {
  let hex = oklchHex(L, C, h);
  while (contrast(hex, bg) < target && L > 0) { L = Math.max(0, L - .005); hex = oklchHex(L, C, h); }
  return hex;
}

// Converts names with accents, such as Café or Pharisäer, to folder names.
export function slugify(name) {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd')
    .toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const hueDist = (a, b) => { const d = Math.abs(((a - b) % 360 + 540) % 360 - 180); return d; };
const hueDelta = (from, to) => ((to - from) % 360 + 540) % 360 - 180;

// Yaru icon themes that ship with Omarchy, keyed by OKLCH hue.
const YARU = [
  [15, 'Yaru-red'], [45, 'Yaru'], [85, 'Yaru-yellow'], [115, 'Yaru-olive'],
  [150, 'Yaru-sage'], [200, 'Yaru-prussiangreen'], [255, 'Yaru-blue'],
  [300, 'Yaru-purple'], [345, 'Yaru-magenta'], [375, 'Yaru-red'],
];

function iconTheme(hex) {
  const { h, C } = hexOklch(hex);
  if (C < .03) return 'Yaru';
  let best = YARU[0], dist = Infinity;
  for (const entry of YARU) {
    const d = Math.min(Math.abs(entry[0] - h), Math.abs(entry[0] - (h + 360)));
    if (d < dist) { dist = d; best = entry; }
  }
  return best[1];
}

// ---------- palette generator ----------

// ANSI order: red, green, yellow, blue, magenta, cyan.
const BASE_HUE = [27, 140, 88, 250, 340, 200];
// Night and day start lightness of each hue, before the contrast check.
const NIGHT_L = [.72, .76, .83, .74, .74, .78];
const DAY_L = [.52, .54, .6, .5, .52, .54];
// Contrast targets against the background.
const TARGET = { night: { normal: 5.5, bright: 7.5, muted: 3.8, accent: 6, second: 4.5, fg: 11 }, day: { normal: 4.5, bright: 6, muted: 3.8, accent: 4.5, second: 4, fg: 11 } };

// The 6 hues of a theme. Warm themes move blue, cyan, green and magenta to the
// warm side and lower their chroma. The slot nearest to the accent moves up to
// 20 degrees to the accent hue, so each palette carries its drink color.
// The second color moves another slot up to 12 degrees. Red moves 6 degrees at most.
function ansiHues(t, r) {
  const w = t.warm;
  const h = [24 + 4 * w, 140 - 22 * w, 88 - 8 * w, 250 - 18 * w, 340 + 8 * w, 200 - 14 * w];
  // The table chroma spreads out around .1, so lively drinks differ more from calm ones.
  const chroma = .1 + (t.chroma - .1) * 1.6;
  const c = [1, 1 - .25 * w, 1, 1 - .3 * w, 1 - .15 * w, 1 - .3 * w].map(x => x * chroma);
  // The accent pulls its nearest slot. Then the second color pulls the nearest
  // other slot by less.
  const taken = new Set();
  for (const [hue, C, max] of [[t.accent[0], t.accent[1], 20], [t.second[0], t.second[1], 12]]) {
    let best = -1, bd = 999;
    h.forEach((x, k) => { const d = hueDist(x, hue); if (!taken.has(k) && d < bd) { bd = d; best = k; } });
    if (best < 0 || bd >= 50 || C <= .06) continue;
    taken.add(best);
    // Red stays red, because it marks errors.
    const m = best === 0 ? 6 : max;
    h[best] += Math.max(-m, Math.min(m, hueDelta(h[best], hue) * .7));
    c[best] = Math.max(c[best], Math.min(C, chroma * 1.3));
  }
  return { h: h.map(x => (x + (r() - .5) * 6 + 360) % 360), c };
}

// The 6 slots of a theme as { h, c, night, day }, where night and day are the
// start lightness before the contrast check.
function slots(t, r) {
  if (t.sig) return t.sig.map(([h, c, L]) => ({ h, c, night: L, day: .5 + (L - .74) * .6 }));
  const { h, c } = ansiHues(t, r);
  return h.map((x, k) => ({ h: x, c: c[k], night: NIGHT_L[k], day: DAY_L[k] }));
}

function oklabDistance(a, b) {
  const p = hexOklch(a), q = hexOklch(b);
  const rad = Math.PI / 180;
  return Math.hypot(p.L - q.L, p.C * Math.cos(p.h * rad) - q.C * Math.cos(q.h * rad), p.C * Math.sin(p.h * rad) - q.C * Math.sin(q.h * rad));
}

// Two slots that look the same waste a color. When 2 slots are closer than
// MIN_DISTANCE in OKLab, the later one moves away in lightness: lighter at
// night and darker in the day, which also keeps its contrast.
const MIN_DISTANCE = .06;
function separate(colors, list, step, fit) {
  const out = [...colors];
  for (let j = 1; j < out.length; j++) {
    for (let n = 0; n < 8 && out.slice(0, j).some(x => oklabDistance(x, out[j]) < MIN_DISTANCE); n++) {
      const { L } = hexOklch(out[j]);
      out[j] = fit(Math.min(.96, Math.max(.2, L + step)), list[j].c, list[j].h);
    }
  }
  return out;
}

function nightPalette(t, r) {
  // The table chroma of the background is a little strong for large areas.
  const [bl, bc, bh] = [t.bg[0], t.bg[1] * .8, t.bg[2]];
  const bg = oklchHex(bl, bc, bh);
  const list = slots(t, r);
  const T = TARGET.night;
  const fit = (L, C, h) => lighten(L, C, h, bg, T.normal);
  const normal = separate(list.map(s => fit(s.night, s.c, s.h)), list, .03, fit);
  const bright = list.map((s, k) => lighten(Math.min(.95, hexOklch(normal[k]).L + .07), s.c * .82, s.h, bg, T.bright));
  const fg = lighten(.91, Math.min(bc * .6 + .008, .03), bh, bg, T.fg);
  const ansi = [
    oklchHex(bl + .065, bc * 1.1, bh), ...normal, oklchHex(.84, Math.min(bc * .6 + .01, .03), bh),
    lighten(.55, Math.min(bc + .01, .05), bh, bg, T.muted), ...bright, oklchHex(.975, .01, bh),
  ];
  const accent = lighten(t.accent[2] || .76, t.accent[1], t.accent[0], bg, T.accent);
  const second = lighten(t.second[2] || .72, t.second[1], t.second[0], bg, T.second);
  const orange = orangeFor(normal[0], normal[2], bg, l => lighten(l.L, l.C, l.h, bg, T.normal));
  return {
    ansi, accent, second,
    colors: {
      mode: 'dark', accent, selection: mix(bg, accent, .28), muted: ansi[8],
      background: bg, dark_background: mix(bg, '#000000', .25), darker_background: mix(bg, '#000000', .5), lighter_background: ansi[0],
      foreground: fg, dark_foreground: mix(fg, bg, .38), light_foreground: ansi[7], bright_foreground: ansi[15],
      red: normal[0], yellow: normal[2], orange, green: normal[1], cyan: normal[5], blue: normal[3], magenta: normal[4],
      brown: lighten(.5, .08, 55, bg, 3),
      bright_red: bright[0], bright_yellow: bright[2], bright_green: bright[1], bright_cyan: bright[5], bright_blue: bright[3], bright_magenta: bright[4],
    },
  };
}

// The day background is a cream tone. Warm hues move halfway to the hue of
// cream, so a brown night background does not turn pink in daylight. Cool
// hues stay. Darker roasts get a slightly darker cream.
function dayBackground(t) {
  const [, bc, bh] = t.bg;
  const h = bh < 130 || bh > 330 ? bh + hueDelta(bh, 85) * .5 : bh;
  return [.962 - (t.roast > .8 ? .012 : 0), Math.min(Math.max(bc * .7, .012), .026), (h + 360) % 360];
}

function dayPalette(t, r) {
  const [dl, dc, dh] = dayBackground(t);
  const bg = oklchHex(dl, dc, dh);
  const list = slots(t, r);
  const T = TARGET.day;
  const fit = (L, C, h) => darken(L, C * 1.08, h, bg, T.normal);
  const normal = separate(list.map(s => fit(s.day, s.c, s.h)), list, -.03, fit);
  const bright = list.map((s, k) => darken(hexOklch(normal[k]).L - .06, s.c * 1.12, s.h, bg, T.bright));
  const fg = darken(.3, Math.min(t.bg[1] * .8 + .01, .04), dh, bg, T.fg);
  const ansi = [
    oklchHex(dl - .055, dc * 1.4, dh), ...normal, oklchHex(.42, Math.min(t.bg[1] * .7 + .01, .035), dh),
    darken(.6, Math.min(t.bg[1] * .7 + .01, .035), dh, bg, T.muted), ...bright, oklchHex(.2, Math.min(t.bg[1] * .6 + .01, .03), dh),
  ];
  const accent = darken(Math.min(t.accent[2] || .55, .55), Math.max(t.accent[1] * 1.1, .06), t.accent[0], bg, T.accent);
  const second = darken(Math.min(t.second[2] || .55, .58), Math.max(t.second[1] * 1.1, .05), t.second[0], bg, T.second);
  const orange = orangeFor(normal[0], normal[2], bg, l => darken(l.L, l.C, l.h, bg, T.normal));
  return {
    ansi, accent, second,
    colors: {
      mode: 'light', accent, selection: mix(bg, accent, .22), muted: ansi[8],
      background: bg, dark_background: oklchHex(dl - .03, dc * 1.2, dh), darker_background: oklchHex(dl - .07, dc * 1.3, dh), lighter_background: ansi[0],
      foreground: fg, dark_foreground: darken(.5, Math.min(dc + .01, .03), dh, bg, 5), light_foreground: ansi[7], bright_foreground: ansi[15],
      red: normal[0], yellow: normal[2], orange, green: normal[1], cyan: normal[5], blue: normal[3], magenta: normal[4],
      brown: darken(.45, .08, 55, bg, 5),
      bright_red: bright[0], bright_yellow: bright[2], bright_green: bright[1], bright_cyan: bright[5], bright_blue: bright[3], bright_magenta: bright[4],
    },
  };
}

// Orange sits between the red and yellow hues of each palette.
function orangeFor(red, yellow, bg, fit) {
  const a = hexOklch(red), b = hexOklch(yellow);
  return fit({ L: (a.L + b.L) / 2, C: (a.C + b.C) / 2, h: a.h + hueDelta(a.h, b.h) / 2 });
}

// Variant order, labels, and the suffix of the installed theme name.
export const VARIANTS = [
  { key: 'night', label: 'Night', suffix: '-night', mode: 'dark' },
  { key: 'day', label: 'Day', suffix: '-day', mode: 'light' },
];

export { CATEGORIES };

export const themes = TABLE.map(([name, cat, desc, o], i) => {
  const slug = slugify(name);
  const t = { warm: .4, roast: .65, ...o };
  if (SIGNATURE[name]) t.sig = SIGNATURE[name].split(',').map(x => x.trim().split(/\s+/).map(Number));
  const make = (key, build) => {
    const v = VARIANTS.find(x => x.key === key);
    const p = build(t, rng(i * 7919 + 13));
    return { variant: key, label: v.label, install: `${slug}${v.suffix}`, name: `${name} ${v.label}`, ansi: p.ansi, second: p.second, icons: iconTheme(p.accent), colors: p.colors };
  };
  return {
    index: i + 1, name, slug, cat, category: CATEGORIES[cat], desc, origin: t.origin || '',
    art: t.art, vessel: t.vessel, layers: t.layers, notes: t.notes || [], roast: t.roast, temp: t.temp || 0,
    recipe: cat === 'roasts' ? 'roast' : cat === 'beans' ? 'cherry' : 'drink', signature: !!t.sig,
    variants: { night: make('night', nightPalette), day: make('day', dayPalette) },
  };
});

export function colorsToml(v) {
  const k = v.colors;
  return `mode = "${k.mode}"

accent = "${k.accent}"
selection = "${k.selection}"
muted = "${k.muted}"

background = "${k.background}"
dark_background = "${k.dark_background}"
darker_background = "${k.darker_background}"
lighter_background = "${k.lighter_background}"

foreground = "${k.foreground}"
dark_foreground = "${k.dark_foreground}"
light_foreground = "${k.light_foreground}"
bright_foreground = "${k.bright_foreground}"

hyprland_active_border = "rgba(${k.accent.slice(1)}ee) rgba(${v.second.slice(1)}ee) 45deg"
hyprland_inactive_border = "rgba(${k.muted.slice(1)}aa)"

red = "${k.red}"
yellow = "${k.yellow}"
orange = "${k.orange}"
green = "${k.green}"
cyan = "${k.cyan}"
blue = "${k.blue}"
magenta = "${k.magenta}"
brown = "${k.brown}"

bright_red = "${k.bright_red}"
bright_yellow = "${k.bright_yellow}"
bright_green = "${k.bright_green}"
bright_cyan = "${k.bright_cyan}"
bright_blue = "${k.bright_blue}"
bright_magenta = "${k.bright_magenta}"
`;
}
