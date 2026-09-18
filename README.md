# Web de AIntegra Limited

HTML, CSS y JavaScript estáticos. Sin framework y sin dependencias en tiempo de
ejecución: `dist/` se sube tal cual a cualquier hosting.

## Comandos

```bash
node tools/build.mjs      # genera dist/ desde src/ (es + en)
node tools/contrast.mjs   # comprueba el contraste de la paleta (WCAG 2.2)
node tools/audit.mjs      # audita el HTML generado
```

Los tres tienen que pasar antes de publicar. Para ver el sitio en local:

```bash
python -m http.server 4321 --directory dist
```

Herramientas de un solo uso, ya ejecutadas: `tools/fetch-fonts.mjs` descarga las
woff2 y `tools/logo-assets.py` recorta los logos y genera los favicons.

## Estructura

```
src/
  content/   pages.json (rutas y slugs por idioma) + es.json / en.json
  templates/ layout.html + una plantilla por página
  styles/    tokens → base → components → patterns (en ese orden de cascada)
  assets/    fonts (self-hosted), img, video
tools/       build y auditorías
dist/        salida; se regenera entera en cada build, no se edita a mano
```

El contenido vive **solo** en los JSON. Las plantillas no llevan texto: si hay
una frase escrita en una plantilla, es un error.

## Reglas que el build y las auditorías hacen cumplir

Estas no dependen de que alguien se acuerde. Si se incumplen, el comando falla.

**Certificación.** AIntegra no está certificada en ISO/IEC 27701, ISO 27001 ni
WCAG 2.2. Solo se puede escribir «diseñado conforme a», «alineado con» o «en
camino a la certificación de». `audit.mjs` rechaza cualquier afirmación de
certificación (y distingue las negaciones y las preguntas, que sí valen).

**Vídeo.** Ningún vídeo va solo. Todo `<video>` tiene que estar dentro de un
`<figure class="video">` con un `<figcaption>` que describa lo que se ve y lo
que se dice, de al menos 180 caracteres. No es un alt: es contenido redactado al
mismo nivel que el resto de la página, para quien navega sin sonido, con lector
de pantalla o con el vídeo bloqueado.

**Nombres.** El asistente es CATY. «Kira» y «Kai» son nombres descartados de una
versión antigua y el auditor los rechaza.

**Financiación.** No se publican cifras de financiación levantada.

**Paridad de idiomas.** `es.json` y `en.json` tienen que tener exactamente las
mismas claves. No se puede publicar una página a medio traducir.

**Color.** La paleta está cerrada: ocho colores, sin derivados. `#357FB2` no
llega a 4.5:1 sobre blanco (4,35) ni sobre azul noche (4,03), así que nunca es
texto normal ni relleno de botón con texto; se reserva a hover, foco, bordes,
iconografía y texto grande. El relleno primario es `#0C3862`.

**Accesibilidad.** Una sola `<h1>` por página, sin saltos en la jerarquía de
encabezados, `alt` en toda imagen, aviso a lectores de pantalla en los enlaces
que abren pestaña nueva, y `lang`, `title`, `description`, `canonical` y
`hreflang` en todas.

## Pendiente

- **Constitución de la sociedad.** AIntegra no está constituida todavía. El aviso
  legal lo dice expresamente y nombra a las dos personas físicas responsables. El
  8 de octubre de 2025 se solicitó la certificación de denominación social en el
  Registro Mercantil Central. Cuando la constitución se complete hay que añadir
  en `legal.aviso` la denominación exacta, el NIF, el domicilio social y los
  datos registrales, y cambiar el responsable del tratamiento en
  `legal.privacidad`.
- **Domicilio.** El aviso legal no publica ninguno, porque los responsables son
  personas físicas y su domicilio particular no tiene por qué ser público. Al
  constituir la sociedad conviene fijar el domicilio social —la dirección de
  IAtecUV o del Parc Científic serviría— y publicarlo.
- **Fotos.** Las de los fundadores salen del PDF del pitch y son de 200×200 px.
  Del dispositivo C.A.T. no hay fotografía: se usa una ilustración esquemática a
  propósito, para no aparentar un producto ya fabricado.
- **Logo.** Los originales son PNG con el fondo quemado. `tools/logo-assets.py`
  los recorta y les devuelve la transparencia, pero no hay vectorial: hace falta
  vectorizar para animar el trazo y derivar la ilustración del gato.
- **Logos de los apoyos.** Las seis tarjetas de «Incubación y apoyos» ya enlazan
  a la web de cada institución, pero salen con un monograma porque no tenemos
  los archivos. Al dejar un PNG o SVG en `src/assets/img/` basta con rellenar el
  campo `logo` del apoyo en `es.json` y `en.json` para que sustituya al
  monograma. Faltan: IAtecUV, Universitat de València, UVemprén, Parc Científic
  UV, INCIBE y Startup Valencia.

## Materiales de marca

`--caty-sheen` y `--caty-glow` son el acento holográfico de CATY; `--cat-sheen`
y `--cat-glow`, el plateado del dispositivo. No son colores de marca nuevos: son
acabados, compuestos con blancos y azules de la paleta, y solo entran donde se
habla de ese producto. El degradado de CATY solo cumple AA sobre el azul noche,
así que la palabra LOCAL vive dentro de un panel oscuro y las tres paradas del
gradiente están auditadas en `tools/contrast.mjs`.
