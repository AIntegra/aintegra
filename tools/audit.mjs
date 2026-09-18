/**
 * Auditoría del sitio construido.
 *
 *   node tools/audit.mjs
 *
 * Comprueba sobre el HTML de dist/ las reglas que no pueden depender de que
 * alguien se acuerde de cumplirlas. Sale con código 1 si alguna falla.
 *
 *   1. Toda imagen lleva atributo alt (vacío solo si es decorativa a propósito).
 *   2. Todo vídeo va dentro de <figure class="video"> con su <figcaption>, y esa
 *      descripción tiene cuerpo suficiente para contar lo que se ve y se dice.
 *   3. Una sola <h1> por página y ningún salto en la jerarquía de encabezados.
 *   4. Cada página declara lang, title, description, canonical y hreflang.
 *   5. Ninguna afirmación de certificación que no tenemos, y ningún resto de
 *      los nombres antiguos del asistente.
 *   6. Todo enlace target="_blank" avisa de que se abre en otra pestaña.
 *
 * Además informa (sin fallar) de cuántos huecos [PENDIENTE-LEGAL] quedan.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const OUT = 'dist';

/** Afirmaciones que no podemos hacer mientras no haya certificado formal. */
const FORBIDDEN = [
  { re: /\bcertificad[oa]s?\s+(por|en|conforme|según)\b/i, why: 'afirma tener certificación' },
  { re: /\bestamos\s+certificad/i,     why: 'afirma tener certificación' },
  { re: /\bwe\s+are\s+certified\b/i,   why: 'afirma tener certificación' },
  { re: /\bcertified\s+(by|to|against)\b/i, why: 'afirma tener certificación' },
  { re: /\bya\s+cumplimos\b/i,         why: '«ya cumplimos» suena a conformidad acreditada' },
  { re: /already\s+comply\b/i,         why: '«already comply» suena a conformidad acreditada' },
  { re: /\bnormas?\s+certificadas?\b/i, why: 'afirma tener certificación' },
  { re: /\bKira\b/,                    why: 'nombre antiguo del asistente: es C.A.T.Y.' },
  { re: /\bKai\b/,                     why: 'nombre antiguo del asistente: es C.A.T.Y.' },
];

/** Longitud mínima de la descripción de un vídeo, en caracteres. Un alt corto
 *  no cumple la regla: hace falta contar lo que se ve y lo que se dice. */
const MIN_VIDEO_DESC = 180;

const errors = [];
const notes = [];

const fail = (file, msg) => errors.push(`${file}: ${msg}`);

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith('.html')) out.push(path);
  }
  return out;
}

/** Quita comentarios: lo que va en un comentario no es contenido publicado. */
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

function checkImages(file, html) {
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt\s*=/.test(tag)) fail(file, `<img> sin atributo alt: ${tag.slice(0, 90)}…`);
  }
}

function checkVideos(file, html) {
  const videos = [...html.matchAll(/<video\b/g)];
  if (!videos.length) return;

  // Cada <video> tiene que vivir dentro de una <figure class="video"> que
  // incluya <figcaption>. Se comprueba figura a figura.
  const figures = [...html.matchAll(/<figure\b[^>]*class="[^"]*\bvideo\b[^"]*"[^>]*>([\s\S]*?)<\/figure>/g)];
  if (figures.length < videos.length) {
    fail(file, `${videos.length} vídeo(s) pero solo ${figures.length} <figure class="video">: hay un vídeo sin descripción`);
    return;
  }
  for (const [, inner] of figures) {
    if (!/<video\b/.test(inner)) continue;
    const caption = /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/.exec(inner);
    if (!caption) {
      fail(file, 'vídeo sin <figcaption>: todo vídeo lleva descripción en texto');
      continue;
    }
    const text = caption[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length < MIN_VIDEO_DESC) {
      fail(file, `descripción de vídeo demasiado corta (${text.length} caracteres, mínimo ${MIN_VIDEO_DESC}): tiene que contar lo que se ve y lo que se dice`);
    }
  }
}

function checkHeadings(file, html) {
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  const h1 = levels.filter((l) => l === 1).length;
  if (h1 !== 1) fail(file, `${h1} elementos <h1> (tiene que haber exactamente uno)`);

  let prev = 0;
  for (const level of levels) {
    if (prev && level > prev + 1) {
      fail(file, `salto en la jerarquía de encabezados: h${prev} seguido de h${level}`);
      break;
    }
    prev = level;
  }
}

function checkHead(file, html) {
  const need = [
    [/<html\b[^>]*\blang="[a-z]{2}"/, 'atributo lang en <html>'],
    [/<title>[^<]{10,}<\/title>/, '<title> con contenido'],
    [/<meta\s+name="description"\s+content="[^"]{50,}"/, 'meta description de al menos 50 caracteres'],
    [/<link\s+rel="canonical"/, 'canonical'],
    [/<link\s+rel="alternate"\s+hreflang="es"/, 'hreflang es'],
    [/<link\s+rel="alternate"\s+hreflang="en"/, 'hreflang en'],
    [/hreflang="x-default"/, 'hreflang x-default'],
  ];
  for (const [re, what] of need) if (!re.test(html)) fail(file, `falta ${what}`);
}

function checkNewTabLinks(file, html) {
  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>[\s\S]{0,400}?<\/a>/g)) {
    if (!/visually-hidden/.test(tag) && !/aria-label/.test(tag)) {
      fail(file, 'enlace que abre pestaña nueva sin avisarlo a lectores de pantalla');
    }
  }
}

/** Marcas de que la frase es una NEGACIÓN o una PREGUNTA, no una afirmación:
 *  «no estamos certificados» y «¿está certificado?» son exactamente lo que la
 *  web tiene que poder decir. Se mira la ventana de texto anterior al hallazgo. */
const DENIAL = /\b(no|not|never|sin|todav[íi]a|a[úu]n|nunca|yet)\b|¿/i;

function checkCopy(file, html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  for (const { re, why } of FORBIDDEN) {
    const global = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    for (const hit of text.matchAll(global)) {
      const before = text.slice(Math.max(0, hit.index - 45), hit.index);
      if (DENIAL.test(before)) continue;   // es una negación o una pregunta
      fail(file, `«${hit[0].trim()}» — ${why}`);
    }
  }
}

async function main() {
  const files = await htmlFiles(OUT);
  let pending = 0;

  for (const path of files) {
    const file = relative(OUT, path).replace(/\\/g, '/');
    // La raíz es solo el conmutador de idioma, no una página de contenido.
    if (file === 'index.html') continue;

    const raw = await readFile(path, 'utf8');
    const html = stripComments(raw);

    pending += (html.match(/\[PENDIENTE-LEGAL\]/g) ?? []).length;

    checkHead(file, html);
    checkHeadings(file, html);
    checkImages(file, html);
    checkVideos(file, html);
    checkNewTabLinks(file, html);
    checkCopy(file, html);
  }

  if (pending) notes.push(`${pending} hueco(s) [PENDIENTE-LEGAL] a la espera de los datos legales (Hito 4).`);

  console.log(`AUDITORÍA — ${files.length} páginas\n`);
  for (const e of errors) console.log(`  FALLA  ${e}`);
  for (const n of notes) console.log(`  nota   ${n}`);
  console.log(`\n${errors.length} fallo(s).`);
  process.exit(errors.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
