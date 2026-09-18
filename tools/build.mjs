/**
 * Build del sitio: un único diccionario de contenido por idioma -> /es/ y /en/.
 *
 *   node tools/build.mjs
 *
 * Sin dependencias y sin framework: la salida de dist/ es HTML, CSS y JS
 * estáticos que se pueden subir a cualquier hosting tal cual.
 *
 * Reglas que impone el build (y por las que falla en vez de avisar):
 *  · es.json y en.json deben tener exactamente las mismas claves.
 *  · Toda clave usada en una plantilla debe existir en el diccionario.
 *  · Las rutas a assets son relativas a la profundidad de cada página, así que
 *    el sitio funciona igual en la raíz del dominio, en un subdirectorio o
 *    abierto desde el disco.
 */
import { readFile, writeFile, mkdir, cp, rm, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';

const SRC = 'src';
const OUT = 'dist';
const SITE_URL = 'https://aintegralimited.com';

/* ---------- utilidades de plantilla ------------------------------------- */

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Único marcado permitido dentro del contenido: **negrita**. Se aplica DESPUÉS
 * de escapar, así que el diccionario nunca puede inyectar HTML aunque alguien
 * pegue una etiqueta dentro de una cadena.
 */
const emphasise = (s) => s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

/** Resuelve 'a.b.c' dentro de un objeto; lanza si no existe. */
function lookup(ctx, path, where) {
  if (path === '.') return ctx['.'];
  let cur = ctx;
  for (const part of path.split('.')) {
    if (cur == null || !(part in cur)) {
      throw new Error(`Clave de contenido inexistente: "${path}" (en ${where})`);
    }
    cur = cur[part];
  }
  return cur;
}

/**
 * Motor mínimo:
 *   {{clave.anidada}}          texto escapado (admite **negrita**)
 *   {{&clave}}                 HTML sin escapar (bloques generados por el build)
 *   {{#each lista}}…{{/each}}  itera; dentro, {{this}}, {{this.campo}} y {{@n}}
 *
 * Los bucles se resuelven emparejando aperturas y cierres a mano en lugar de
 * con una expresión regular, para que se puedan anidar (una lista de personas
 * con una lista de aptitudes dentro, por ejemplo).
 */
function render(tpl, ctx, where) {
  const OPEN = /\{\{#each ([\w.]+)\}\}/g;
  const m = OPEN.exec(tpl);
  if (!m) return substitute(tpl, ctx, where);

  const [openTag, path] = m;
  const bodyStart = m.index + openTag.length;

  // Recorre hacia delante contando aperturas para encontrar SU cierre.
  let depth = 1;
  let i = bodyStart;
  const TOKEN = /\{\{#each [\w.]+\}\}|\{\{\/each\}\}/g;
  TOKEN.lastIndex = bodyStart;
  let t;
  while ((t = TOKEN.exec(tpl))) {
    depth += t[0] === '{{/each}}' ? -1 : 1;
    if (depth === 0) { i = t.index; break; }
  }
  if (depth !== 0) throw new Error(`{{#each ${path}}} sin cerrar (en ${where})`);

  const body = tpl.slice(bodyStart, i);
  const rest = tpl.slice(i + '{{/each}}'.length);

  const list = lookup(ctx, path, where);
  if (!Array.isArray(list)) throw new Error(`"${path}" no es una lista (en ${where})`);

  // Cada elemento se renderiza CON su propio contexto, para que {{this}} y
  // {{@n}} se resuelvan aquí dentro y no más tarde con el contexto de fuera.
  const out = list
    .map((item, n) => render(body, { ...ctx, this: item, '@n': String(n + 1) }, `${where} > each ${path}`))
    .join('');

  // El trozo anterior al bucle ya no contiene bucles: se sustituye directo.
  return substitute(tpl.slice(0, m.index), ctx, where) + out + render(rest, ctx, where);
}

function substitute(tpl, ctx, where) {
  return tpl.replace(/\{\{(&?)\s*([\w.@]+)\s*\}\}/g, (_, raw, path) => {
    const value = path === '@n' ? ctx['@n'] : lookup(ctx, path, where);
    return raw ? String(value) : emphasise(escapeHtml(value));
  });
}

/* ---------- comprobación de paridad ES/EN -------------------------------- */

function keyPaths(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('_')) continue;
    const path = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) out.push(`${path}[]`);
    else if (v && typeof v === 'object') out.push(...keyPaths(v, path));
    else out.push(path);
  }
  return out;
}

function assertParity(dicts) {
  const [a, b] = Object.keys(dicts);
  const setA = new Set(keyPaths(dicts[a]));
  const setB = new Set(keyPaths(dicts[b]));
  const missingInB = [...setA].filter((k) => !setB.has(k));
  const missingInA = [...setB].filter((k) => !setA.has(k));
  if (missingInA.length || missingInB.length) {
    const lines = [
      ...missingInB.map((k) => `  falta en ${b}.json: ${k}`),
      ...missingInA.map((k) => `  falta en ${a}.json: ${k}`),
    ];
    throw new Error(`Los diccionarios ES/EN no coinciden:\n${lines.join('\n')}`);
  }
}

/* ---------- rutas -------------------------------------------------------- */

/** URL del sitio para una página en un idioma: siempre con barra final. */
const pageUrl = (page, lang) => {
  const slug = page.slug[lang];
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
};

/** Prefijo relativo desde una página hasta la raíz de dist/. */
const basePrefix = (page, lang) => (page.slug[lang] ? '../../' : '../');

/* ---------- bloques generados ------------------------------------------- */

function buildNav(cfg, dict, pages, current, lang, base) {
  const items = cfg.nav
    .map((id) => {
      const p = pages[id];
      const href = base + pageUrl(p, lang).slice(1);
      const isCurrent = id === current;
      return `<li><a href="${href}"${isCurrent ? ' aria-current="page"' : ''}>${escapeHtml(dict.nav[id])}` +
        (isCurrent ? ` <span class="visually-hidden">(${escapeHtml(dict.ui.currentPage)})</span>` : '') +
        `</a></li>`;
    })
    .join('\n          ');
  return items;
}

function buildLangSwitch(cfg, dicts, page, lang, base) {
  return cfg.langs
    .map((l) => {
      const href = base + pageUrl(page, l).slice(1);
      const label = dicts[l].site.langName;
      const isCurrent = l === lang;
      // El nombre del idioma va en su propio idioma y marcado con lang=, para
      // que el lector de pantalla lo pronuncie con la voz correcta. El grupo ya
      // se anuncia como "Idioma" por el aria-label del <nav>, así que no se
      // repite dentro de cada enlace.
      return `<a href="${href}" hreflang="${l}" lang="${l}"${isCurrent ? ' aria-current="true"' : ''}>` +
        `${escapeHtml(label)}` +
        (isCurrent ? `<span class="visually-hidden" lang="${lang}"> (${escapeHtml(dicts[lang].ui.currentLang)})</span>` : '') +
        `</a>`;
    })
    .join('\n        ');
}

function buildHreflang(cfg, page) {
  const tags = cfg.langs.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}${pageUrl(page, l)}">`
  );
  tags.push(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${pageUrl(page, cfg.defaultLang)}">`);
  return tags.join('\n  ');
}

function buildFooterLegal(cfg, dict, pages, lang, base) {
  return cfg.footerLegal
    .map((id) => {
      const href = base + pageUrl(pages[id], lang).slice(1);
      return `<li><a href="${href}">${escapeHtml(dict.legal[id].title)}</a></li>`;
    })
    .join('\n            ');
}

/* ---------- build -------------------------------------------------------- */

async function main() {
  const cfg = JSON.parse(await readFile(join(SRC, 'content/pages.json'), 'utf8'));
  const dicts = {};
  for (const l of cfg.langs) dicts[l] = JSON.parse(await readFile(join(SRC, `content/${l}.json`), 'utf8'));
  assertParity(dicts);

  const pages = Object.fromEntries(cfg.pages.map((p) => [p.id, p]));
  const layout = await readFile(join(SRC, 'templates/layout.html'), 'utf8');

  // Huella del CSS y del JS. Va como ?v= en cada enlace, así que cuando cambia
  // una hoja de estilo el navegador pide la nueva en vez de servir la vieja de
  // caché. Sin esto, un cambio de diseño puede tardar días en verse.
  const fingerprint = await assetHash(['styles', 'scripts']);
  // El juego de iconos se define una vez por página y se referencia con <use>.
  const icons = await readFile(join(SRC, 'templates/icons.html'), 'utf8');
  const a11yPanel = await readFile(join(SRC, 'templates/a11y.html'), 'utf8');

  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const urls = [];

  for (const lang of cfg.langs) {
    const dict = dicts[lang];

    for (const page of cfg.pages) {
      const base = basePrefix(page, lang);
      const tpl = await readFile(join(SRC, 'templates', page.template), 'utf8');
      const where = `${page.id} [${lang}]`;

      const ctx = {
        ...dict,
        page: { id: page.id, ...(dict.legal[page.id] ?? {}) },
        // Los slugs cambian por idioma (producto/product), así que las
        // plantillas enlazan por id y el build resuelve la ruta.
        slug: Object.fromEntries(cfg.pages.map((q) => [q.id, q.slug[lang]])),
        lang,
        base,
      };

      const content = render(tpl, ctx, where);

      const html = render(
        layout,
        {
          ...ctx,
          title: dict.meta[page.id].title,
          description: dict.meta[page.id].description,
          canonical: SITE_URL + pageUrl(page, lang),
          _nav: buildNav(cfg, dict, pages, page.id, lang, base),
          _lang: buildLangSwitch(cfg, dicts, page, lang, base),
          _hreflang: buildHreflang(cfg, page),
          _legal: buildFooterLegal(cfg, dict, pages, lang, base),
          _content: content,
          _icons: icons,
          _a11y: render(a11yPanel, ctx, `a11y [${lang}]`),
          v: fingerprint,
        },
        `layout ${where}`
      );

      const dest = join(OUT, pageUrl(page, lang).slice(1), 'index.html');
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, html);
      urls.push(SITE_URL + pageUrl(page, lang));
      console.log(`  ${pageUrl(page, lang)}`);
    }
  }

  // Assets: se copian tal cual.
  await cp(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });
  await cp(join(SRC, 'styles'), join(OUT, 'styles'), { recursive: true });
  if (await exists(join(SRC, 'scripts'))) await cp(join(SRC, 'scripts'), join(OUT, 'scripts'), { recursive: true });

  // Raíz: elige idioma sin depender del servidor (funciona en cualquier hosting).
  await writeFile(join(OUT, 'index.html'), rootRedirect(cfg));

  // sitemap.xml y robots.txt
  await writeFile(
    join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
      `\n</urlset>\n`
  );
  await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

  console.log(`\n${urls.length} páginas generadas en ${OUT}/`);
}

const exists = (p) => readdir(p).then(() => true, () => false);

/** Hash corto del contenido de varias carpetas de src/. */
async function assetHash(dirs) {
  const hash = createHash('sha256');
  for (const dir of dirs.sort()) {
    const base = join(SRC, dir);
    if (!(await exists(base))) continue;
    for (const name of (await readdir(base)).sort()) {
      hash.update(name);
      hash.update(await readFile(join(base, name)));
    }
  }
  return hash.digest('hex').slice(0, 8);
}

/** Página raíz: redirige al idioma del navegador, con enlace manual si el JS
 *  está desactivado. Nunca deja a nadie en una página en blanco. */
function rootRedirect(cfg) {
  return `<!doctype html>
<html lang="${cfg.defaultLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AIntegra Limited</title>
<link rel="canonical" href="${SITE_URL}/${cfg.defaultLang}/">
${cfg.langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/${cfg.defaultLang}/">
<meta http-equiv="refresh" content="0; url=./${cfg.defaultLang}/">
<script>
  var l = (navigator.language || '${cfg.defaultLang}').slice(0, 2);
  location.replace(${JSON.stringify(cfg.langs)}.indexOf(l) >= 0 ? './' + l + '/' : './${cfg.defaultLang}/');
</script>
</head>
<body>
  <p><a href="./es/">Continuar en español</a> · <a href="./en/">Continue in English</a></p>
</body>
</html>
`;
}

main().catch((e) => {
  console.error(`\nBuild detenido: ${e.message}\n`);
  process.exit(1);
});
