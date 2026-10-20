/**
 * Auditoría de contraste del sistema de diseño (WCAG 2.2).
 *
 *   node tools/contrast.mjs
 *
 * Comprueba cada combinación color/fondo que el sistema declara usar y falla
 * con código de salida 1 si alguna baja del umbral que le corresponde. Se
 * ejecuta en cada hito: si alguien introduce una combinación nueva que no
 * cumple, salta aquí y no en una auditoría externa.
 *
 * Umbrales: 4.5 texto normal · 3.0 texto grande (≥24px o ≥18.66px bold)
 *           3.0 componentes de interfaz y gráficos con significado (1.4.11)
 */

const P = {
  night:  '#081A2E',
  blue:   '#0C3862',
  mid:    '#245E8D',
  bright: '#357FB2',
  sky:    '#7FA8C9',
  ice:    '#DCE6EE',
  // Tonos altos del degradado holográfico de CATY. No son colores de marca:
  // son los extremos del gradiente que ahora recorta la palabra LOCAL, así que
  // tienen que cumplir como texto igual que cualquier otro.
  catyMid: '#A9C7FF',
  catyTop: '#C9BFFF',
  warm:   '#F5F8FA',
  white:  '#FFFFFF',
  pearl: '#F2F3FC',
  heroBlue: '#E4EDFF',
  heroLavender: '#E9E4FF',
  vividIce: '#DCD7FA',
  vividBlue: '#CCD9FC',
  lavender: '#C4BDFA',
};

const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** [uso, color, fondo, umbral] */
const CHECKS = [
  ...['lavender', 'pearl', 'white'].map((fg) => [
    ['cierre azul: texto y degradado ' + fg, P[fg], P.blue, 4.5],
  ]).flat(),
  ...['pearl', 'heroBlue', 'heroLavender', 'vividIce', 'vividBlue'].flatMap((bg) => [
    ['marca: texto principal sobre ' + bg, P.blue, P[bg], 4.5],
    ['marca: texto secundario sobre ' + bg, P.mid, P[bg], 4.5],
  ]),
  ['botón primario hover', P.white, P.mid, 4.5],
  // Texto sobre superficie clara
  ['texto principal sobre blanco cálido',      P.night,  P.warm,  4.5],
  ['texto principal sobre azul hielo',         P.night,  P.ice,   4.5],
  ['texto principal sobre blanco',             P.night,  P.white, 4.5],
  ['texto secundario sobre blanco cálido',     P.mid,    P.warm,  4.5],
  ['texto secundario sobre azul hielo',        P.mid,    P.ice,   4.5],
  ['titular de tarjeta sobre blanco',          P.blue,   P.white, 4.5],
  ['enlace sobre claro',                       P.blue,   P.warm,  4.5],

  // Texto sobre superficie oscura
  ['texto principal sobre azul noche',         P.warm,   P.night, 4.5],
  ['texto secundario sobre azul noche',        P.sky,    P.night, 4.5],
  ['texto sobre tarjeta azul marca',           P.warm,   P.blue,  4.5],
  ['enlace sobre oscuro',                      P.sky,    P.night, 4.5],
  ['enlace sobre tarjeta oscura',              P.sky,    P.blue,  4.5],

  // Botones
  ['botón primario claro (texto/relleno)',     P.white,  P.blue,  4.5],
  ['botón primario oscuro (texto/relleno)',    P.night,  P.warm,  4.5],
  ['botón secundario claro (texto/fondo)',     P.blue,   P.warm,  4.5],
  ['botón secundario oscuro (texto/fondo)',    P.warm,   P.night, 4.5],
  ['botón secundario hover claro',             P.blue,   P.ice,   4.5],

  // Texto grande (umbral 3.0) — único hueco donde entra --brand-bright
  ['titular grande brillante sobre noche',     P.bright, P.night, 3.0],

  // Degradado de CATY recortado sobre la palabra LOCAL, en sus tres paradas
  ['LOCAL, parada baja del degradado',         P.sky,     P.night, 4.5],
  ['LOCAL, parada media del degradado',        P.catyMid, P.night, 4.5],
  ['LOCAL, parada alta del degradado',         P.catyTop, P.night, 4.5],

  // Componentes de interfaz (umbral 3.0)
  ['borde de campo de formulario',             P.bright, P.white, 3.0],
  ['borde de campo sobre fondo cálido',        P.bright, P.warm,  3.0],
  ['anillo de foco sobre claro',               P.bright, P.warm,  3.0],
  ['anillo de foco sobre oscuro',              P.warm,   P.night, 3.0],
  ['borde de botón secundario',                P.bright, P.warm,  3.0],
  ['regla del antetítulo',                     P.bright, P.warm,  3.0],
];

/** Combinaciones prohibidas: se comprueba que efectivamente NO cumplen, para
 *  dejar constancia de por qué el sistema no las usa. */
const FORBIDDEN = [
  ['#357FB2 como texto normal sobre blanco', P.bright, P.white, 4.5],
  ['blanco como texto normal sobre #357FB2', P.white,  P.bright, 4.5],
  ['#357FB2 como texto normal sobre noche',  P.bright, P.night, 4.5],
];

let failures = 0;
console.log('CONTRASTE — combinaciones en uso\n');
for (const [name, fg, bg, min] of CHECKS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failures++;
  console.log(`${ok ? 'OK  ' : 'FALLA'} ${r.toFixed(2).padStart(6)}:1  (min ${min})  ${name}`);
}

console.log('\nCOMBINACIONES DESCARTADAS — se comprueba que siguen sin cumplir\n');
for (const [name, fg, bg, min] of FORBIDDEN) {
  const r = ratio(fg, bg);
  console.log(`${r < min ? 'confirmado' : 'REVISAR   '} ${r.toFixed(2)}:1 < ${min}  ${name}`);
}

console.log(`\n${CHECKS.length} combinaciones comprobadas, ${failures} fallo(s).`);
process.exit(failures ? 1 : 0);
