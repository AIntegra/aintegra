/**
 * El guiño del gato.
 *
 * C.A.T. también significa gato, y el producto viene a sustituir al ratón. El
 * chiste se cuenta una vez, en el pie: el gato sigue el cursor con la mirada y
 * se despierta un poco cuando te acercas.
 *
 * Reglas que se respetan por si acaso alguien se anima a convertir esto en algo
 * más grande:
 *  · No es un juego. No se puede pulsar, no puntúa, no persigue por la pantalla.
 *  · Es decorativo: va con aria-hidden y no aporta ninguna información. Quien
 *    no lo vea no se pierde nada.
 *  · Con prefers-reduced-motion no se mueve. Ni la mirada.
 *  · No hace nada en pantallas táctiles, donde no hay cursor que seguir.
 */
(function () {
  'use strict';

  var wink = document.getElementById('catwink');
  if (!wink) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function motionPaused() { return reduce.matches || document.documentElement.hasAttribute('data-a11y-motion'); }

  var svg = wink.querySelector('.catwink__svg');
  var pupils = wink.querySelectorAll('.catwink__pupil');
  var MAX = 2.6;    // desplazamiento máximo de la pupila, en unidades del viewBox
  var NEAR = 260;   // a partir de aquí el gato "se despierta", en píxeles

  var pending = false;
  var lastEvent = null;

  function update() {
    pending = false;
    if (motionPaused()) return;
    // Se mide el dibujo, no su contenedor: el <div> ocupa toda la columna
    // del pie y su centro cae lejos de donde está el gato.
    var box = svg.getBoundingClientRect();
    if (box.width === 0) return;

    var cx = box.left + box.width / 2;
    var cy = box.top + box.height / 2;
    var dx = lastEvent.clientX - cx;
    var dy = lastEvent.clientY - cy;
    var distance = Math.sqrt(dx * dx + dy * dy);

    wink.dataset.near = distance < NEAR ? 'true' : 'false';

    // La mirada se satura enseguida: no hace falta que el ojo persiga el cursor
    // hasta el otro extremo de la pantalla para que se entienda el gesto.
    var scale = Math.min(1, distance / 160) / (distance || 1);
    var ox = dx * scale * MAX;
    var oy = dy * scale * MAX;

    Array.prototype.forEach.call(pupils, function (pupil) {
      pupil.style.transform = 'translate(' + ox.toFixed(2) + 'px, ' + oy.toFixed(2) + 'px)';
    });
  }

  window.addEventListener('pointermove', function (event) {
    if (event.pointerType === 'touch' || motionPaused()) return;
    lastEvent = event;
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  // Si el sistema empieza a pedir menos movimiento a mitad de sesión, el gato
  // se queda mirando al frente.
  function resetWhenPaused() {
    if (!motionPaused()) return;
    wink.dataset.near = 'false';
    Array.prototype.forEach.call(pupils, function (pupil) { pupil.style.transform = ''; });
  }
  reduce.addEventListener('change', resetWhenPaused);
  new MutationObserver(resetWhenPaused).observe(document.documentElement, { attributes: true, attributeFilter: ['data-a11y-motion'] });
})();
