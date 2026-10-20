# Rediseño AIntegra · octubre de 2026

Referencia: presentación VDS y lámina de identidad aportadas por Nerea.
Paleta clara: navy #0C3862, periwinkle #ABC4FA, lavanda #C4BDFA, hielo #F2F3FC y blanco.

## Hitos

- [x] 1. Mensaje y recorrido: beneficio, ecosistema, ejemplo de uso, públicos, confianza, demo.
- [x] 2. Dirección visual: cristal perlado, producto a escala protagonista, composición y logotipos coherentes; extender a las páginas interiores.
- [x] 3. Verificación: ES/EN, escritorio/móvil, teclado, panel de accesibilidad, enlaces y compilación.

## Función de los recursos

- AIntegra: ojo y wordmark en cabecera/cierre.
- CATY con estela: marca conjunta del ecosistema, transparente.
- C.A.T. plateado: hardware, con escala suficiente para apreciar el dispositivo.
- Icono cuadrado perlado: software.
- CATY con tres pilares: comunicación, adaptación y seguridad.
- Imágenes antiguas: no mezclar con el conjunto perlado actual.

## Límites

Se mantiene la web local, el formulario existente y las funciones de accesibilidad.
Las secuencias interactivas se identifican como ilustraciones, no como una demo funcional del producto.
No se inventan clientes, testimonios, certificaciones ni resultados. Precio confirmado: 80 € + 15 €/mes; objetivo de financiación: 300.000 €.

## Resultado de verificación

- Build ES/EN: 18 páginas más la entrada de idioma.
- Auditoría HTML y 34 combinaciones de contraste: sin fallos.
- Archivos y anclas internas: 19 HTML comprobados sin referencias rotas.
- Sin IDs ni atributos duplicados. Sintaxis de `experience.js` correcta.
- Ejemplos: selección por clic, flechas, panel correcto y anuncio accesible.
- Formulario: errores en campos vacíos, preparación local de solicitud y vuelta a edición; no se envía ninguna solicitud de prueba.
- Móvil: inicio, producto, seguridad, inversores, demo y privacidad sin desbordar a 390 px con texto 150 %, alto contraste, enlaces resaltados, espaciado, pausa e imágenes ocultas activados simultáneamente.
- Persistencia de preferencias al recargar y navegar; cierre del panel con Escape.
- Pausar animaciones también detiene y restablece el giro del dispositivo y la mirada decorativa del gato.
- Revisión visual en escritorio y móvil de portada, ecosistema, ejemplo, producto, precios, seguridad e inversores.

La evaluación manual no equivale a una certificación ni sustituye pruebas con personas usuarias de tecnologías de apoyo. La web permanece local; no se ha publicado.

## Ajuste de marketing y olas (20 de octubre, revisión con capturas)

- Eliminada la frase sobre fotografías de la primera serie en ES/EN.
- C.A.T.: «El gato que se come al ratón», un párrafo y tres beneficios breves.
- CATY: resumen breve y burbujas recortadas mediante SVG de la ilustración original, sin etiquetas «Pilar».
- Retirado el halo adicional azul/gris de las ilustraciones.
- Logotipo centrado en la esfera; fondos periwinkle y lavanda reforzados y olas animadas.
- Pausa de animaciones verificada; movimiento reducido del sistema respetado.
- Producto sin desbordamiento a 390 px con texto al 150 %.
- Contraste ampliado a 38 combinaciones, sin fallos.

## Fondo continuo, marca y app

- Un único fondo por pestaña, con olas animadas continuas y superficies blancas translúcidas para destacar contenido.
- Logotipo del ecosistema ampliado en la principal, sobre esfera con interior blanco para conservar la Y lavanda.
- Nuevo icono de app facilitado por Nerea en `caty-app-icon.png`.
- Nombre C.A.T.Y. con puntos en los textos; retirado «copiloto». Mensaje central: controlar el ordenador hablando.
- Compatibilidad de C.A.T. anunciada con el teclado.
- El relato de producto aparece debajo del ejemplo de uso en la principal y se comparte con Producto mediante `templates/ecosystem.html`.
- Pausa del fondo, ocultación de imágenes, contraste y reflujo móvil al 150 % comprobados.
- Build ES/EN, auditoría y referencias internas sin errores.

## Originales de marca, producto y cierre azul

- Burbujas independientes de comunicación, adaptación y seguridad facilitadas por Nerea; sustituyen los recortes de la imagen compuesta.
- Wordmarks originales de C.A.T. y C.A.T.Y. en el relato de producto y en precios. Nombres textuales disponibles para lectores de pantalla y al ocultar imágenes o activar contraste alto.
- Icono azul oficial de C.A.T. en su tarjeta de 80 €; se mantiene el nuevo icono perlado de la app C.A.T.Y.
- Relato compartido Inicio/Producto más concreto: trackpad, gestos, calibración y teclado; voz, lectura, resumen y navegación. Versión inglesa sincronizada.
- Franja final azul marino, titular lila/blanco y botón blanco. Extremo más oscuro del degradado: 6,83:1 sobre azul.
- Escena de olas recortada al contenido principal y pie opaco por encima de esa capa: contacto y enlaces visibles.
- Reflujo comprobado a 320 px con texto 150 % y todas las preferencias activadas. Sin desbordamiento de titulares ni tarjetas de precios; restaurados los ajustes al terminar.
- Corregido el contraste del enlace de demo del menú cuando se activan contraste alto o enlaces resaltados.
- `npm run check`: 18 páginas ES/EN, 19 HTML auditados y 41 combinaciones de contraste sin fallos. Archivos y anclas internas comprobados sin errores.

## Casos cotidianos y composición más ligera

- Leyenda de portada: «Un ecosistema a tu manera». Esfera reducida de 31 a 23 rem como máximo, con la marca proporcionada a ella.
- Ejemplos de uso renovados en ES/EN: escribir un correo con ayuda de la voz, navegar por una web sin la precisión del ratón y entender un documento largo. Cada caso utiliza su marca e icono correspondiente.
- Números de los tres pasos en una columna fija, con cifras tabulares y alineación de la primera línea; textos distintos en la escena y en los pasos para evitar repetición.
- `catGIF.webp` original de la carpeta de logos incorporado como `cat-gesture.webp`. El movimiento reducido, la pausa y ocultar imágenes cambian a la representación estática; retirado el giro adicional del cursor.
- `caty_contornoBlanco.png` integrado directamente en el titular de C.A.T.Y., sin placa blanca ni nombre duplicado. Nombre textual accesible cuando se ocultan imágenes o se activa contraste alto.
- Navegación de los ejemplos por clic y flechas comprobada; movimiento pausado y reflujo a 390 px con texto 150 % verificados. Build, sintaxis JS, HTML y las 41 combinaciones de contraste pasan.

## Narrativa por página y propuesta VDS

- Inicio presenta la idea y casos cotidianos, con dos tarjetas breves que enlazan a Producto. Retirado el bloque completo de producto compartido, el listado repetido de seguridad y la llamada duplicada a pilotos.
- Producto explica el dispositivo, el programa, el uso independiente y el objetivo de integrarlos. Precios identificados como previstos; no se presenta el hardware como disponible para compra.
- Confirmado por Nerea: la interacción de C.A.T. se simuló en una app móvil y se probó con personas ciegas, primer segmento. Buena acogida cualitativa; no se publican tamaños de muestra, métricas ni testimonios literales.
- Confirmado por Nerea: C.A.T.Y. tiene una demo funcional en Mac y puede utilizarse por separado. La inversión busca fabricar el primer hardware, evolucionar el modelo local, integrar el ecosistema e iniciar las ventas.
- Inversores reconstruida: propuesta, primer segmento, pruebas realizadas, modelo con precios previstos, mercado estimado del deck, reconocimiento, calendario, equipo y destino de la financiación. Los 15.000 € de premios y ayudas están separados del objetivo de 300.000 €.
- Retiradas la tabla de comparaciones categóricas y las afirmaciones sobre el negocio de otros asistentes. Los tamaños de mercado se presentan como estimaciones del plan.
- Apoyos visibles como logos, sin desplegable ni párrafos por tarjeta. Nombres textuales disponibles cuando se ocultan imágenes.
- Privacidad explica en lenguaje sencillo el trabajo de desarrollo; el modelo local más potente figura como próximo hito. Documentación técnica enlazada para quien necesite profundizar.
- Contacto cubre demostración, pilotos e inversión. Las llamadas desde Inversores seleccionan el perfil de inversión; no se envían mensajes durante la prueba.
- Revisión visual de Inversores, Producto y apoyos en escritorio. Reflujo a 320 px con texto 150 %, contraste, enlaces, espaciado, pausa e imágenes ocultas verificado en Inicio, Producto, Inversores, Seguridad y Contacto, además de Inversores en inglés.
- Build bilingüe, auditoría de 19 HTML, 41 combinaciones de contraste, sintaxis JS, archivos y anclas internas sin fallos.

## Burbujas, marcas y ciberseguridad protagonista

- TAM/SAM/SOM recuperados como esferas de cristal anidadas, con leyenda y nota que aclara que sus áreas son ilustrativas. En pantallas pequeñas y con ajustes de lectura se reorganizan para conservar todos los datos.
- Producto incorpora una composición de tres esferas: gestos, voz e integración. Sustituye la explicación repetida de «juntos» y mantiene separados el estado actual y el siguiente hito.
- Financiación con rótulos y valores alineados; hitos numerados con iconos y marcas. Hoja de ruta con nodos perlados e imágenes.
- El build integra los wordmarks originales al mencionar C.A.T. y C.A.T.Y. en texto visible, dejando intactos los atributos, textos ocultos y marcas ya maquetadas. Cada logo conserva un nombre textual para lectores de pantalla y preferencias sin imágenes o con contraste alto.
- Ciberseguridad reconstruida con LOCAL en gran formato, cuatro ilustraciones SVG propias y explicación visual de las capas de protección: modelo local, revisión y confirmación de acciones, permisos, contexto, modo seguro y verificación por gestos.
- Revisadas la arquitectura y las capas de seguridad del proyecto; el hardware, la optimización local y las funciones en desarrollo conservan su estado. No se anuncian certificaciones.
- OSCF Handbook y AGVS visibles junto con principios, riesgos, interacción, evaluación y enlaces directos a controles y arquitectura. Enlace al marco comprobado en navegador: borrador público v0.1.
- Revisión visual en escritorio de ciberseguridad, TAM/SAM/SOM, Producto y financiación. Valores y rótulos de financiación con coordenadas verticales coincidentes.
- A 320 px con texto al 150 %, contraste, enlaces, espaciado, pausa e imágenes ocultas: Inicio, Producto, Inversores y Ciberseguridad sin texto desbordado; alternativas textuales de las marcas visibles.
- Build y auditorías sin errores; 41 combinaciones de contraste, 19 HTML y 4 SVG comprobados. Metadatos y atributos sin marcado de logos accidental.
