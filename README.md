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
  styles/    tokens → base → components → patterns → brand → a11y
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

**Financiación.** Solo se publican cifras confirmadas por el equipo; en esta
iteración se han aprobado las de la presentación VDS.

**Paridad de idiomas.** `es.json` y `en.json` tienen que tener exactamente las
mismas claves. No se puede publicar una página a medio traducir.

**Color.** La identidad 2026 conserva el azul marino y amplía las superficies con
periwinkle `#ABC4FA`, lavanda `#C4BDFA` y hielo perlado `#F2F3FC`.
`brand.css` aplica el acabado sobre la base, antes de las preferencias de
accesibilidad; los tonos pastel no se usan como texto sobre claro. `#357FB2` no
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
- **Fotos.** Las fotografías de los fundadores proceden del pitch y tienen
  resolución limitada. Se mantienen pequeñas. El hardware se representa con
  la ilustración oficial, no con una fotografía de una unidad fabricada.
- **Originales.** Se conservan los recursos facilitados en la carpeta de logos.
  Las copias de la web identifican su función: empresa, ecosistema, hardware,
  software y pilares. Los favicons usan el nuevo emblema.

## Actualización de identidad (octubre de 2026)

Cabecera con los originales `logo.png` y `ojo.png`, portadas claras, ondas
decorativas estáticas y tarjetas perladas. Se conserva Atkinson Hyperlegible
Next para lectura y la estructura, los vídeos y los ajustes de accesibilidad.
Los ajustes prevalecen sobre la marca y se recuerdan entre páginas.

Precios y financiación confirmados con la presentación VDS: dispositivo 80 €,
suscripción 15 €/mes, objetivo 300.000 €, conseguido 15.000 € (5 %).
La comprobación de contraste incluye las nuevas superficies y el hover de
los botones. Las auditorías automáticas no sustituyen una evaluación manual
completa con tecnologías de apoyo.

## Rediseño de composición y marketing (20 de octubre)

El recorrido de la portada es beneficio → ecosistema → ejemplo de uso →
propósito → públicos → privacidad → confianza → conversación. La identidad
se concentra en `src/styles/brand.css`, antes de la capa de accesibilidad.
El hardware y el software tienen composiciones amplias; las superficies de
cristal se alternan con bloques editoriales abiertos. Se mantienen ambos
idiomas y las páginas interiores.

`src/scripts/experience.js` cambia tres ejemplos ilustrativos en el navegador.
No ejecuta el producto ni transmite datos. Funciona con botones y teclado;
sin JavaScript se muestran los tres ejemplos completos. El pitch y el vídeo
de marca conservan controles nativos y descripción en texto.

La solicitud se prepara localmente y ofrece las salidas de envío existentes.
No se ha añadido un backend ni se ha publicado la web. Hitos y verificación
en `docs/rediseno-2026.md`.
