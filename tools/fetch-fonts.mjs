/**
 * Descarga los woff2 de las dos fuentes de marca desde Google Fonts para
 * self-hosting. NO se llama a Google Fonts en runtime: este script se ejecuta
 * una sola vez y deja los ficheros en src/assets/fonts/.
 *
 *   node tools/fetch-fonts.mjs
 *
 * Solo se descargan los subsets 'latin' y 'latin-ext' (suficiente para ES/EN).
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const OUT = 'src/assets/fonts';
const SUBSETS = new Set(['latin', 'latin-ext']);

/** slug de salida -> query family de Google Fonts */
const FAMILIES = {
  'archivo': 'Archivo:wght@400..700',
  'atkinson-hyperlegible-next': 'Atkinson+Hyperlegible+Next:wght@400..700',
};

async function main() {
  await mkdir(OUT, { recursive: true });
  const manifest = [];

  for (const [slug, family] of Object.entries(FAMILIES)) {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`, {
        headers: { 'User-Agent': UA },
      })
    ).text();

    // Cada bloque va precedido de un comentario con el nombre del subset.
    const blocks = css.split('/*').slice(1);
    for (const block of blocks) {
      const subset = block.slice(0, block.indexOf('*/')).trim();
      if (!SUBSETS.has(subset)) continue;

      const url = /src:\s*url\((https:[^)]+)\)/.exec(block)?.[1];
      const weight = /font-weight:\s*([^;]+);/.exec(block)?.[1].trim();
      const range = /unicode-range:\s*([^;]+);/.exec(block)?.[1].trim();
      if (!url) continue;

      const file = `${slug}-${subset}-${weight.replace(/\s+/g, '-')}.woff2`;
      const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
      await writeFile(join(OUT, file), buf);
      manifest.push({ slug, subset, weight, range, file, bytes: buf.length });
      console.log(`${file}  ${(buf.length / 1024).toFixed(1)} KB`);
    }
  }

  await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  const total = manifest.reduce((n, m) => n + m.bytes, 0);
  console.log(`\n${manifest.length} ficheros, ${(total / 1024).toFixed(0)} KB en total`);
}

main();
