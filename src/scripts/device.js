/**
 * Giro del dispositivo C.A.T. con el cursor y con el teclado.
 *
 * Es un adorno con intención: el trackpad se mueve como se movería en la mano.
 * Por eso el guion entero es opcional —sin JavaScript la ilustración se ve
 * igual, solo que quieta— y se desactiva cuando el sistema pide menos
 * movimiento. La descripción de la figura ya cuenta lo mismo en texto, así que
 * no se pierde información por no poder usarlo.
 */
(function () {
  'use strict';

  var MAX = 11;          // grados máximos de inclinación
  var STEP = 4;          // grados por pulsación de flecha

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var devices = document.querySelectorAll('.device');
  if (!devices.length) return;

  Array.prototype.forEach.call(devices, function (device) {
    var tiltX = 0;
    var tiltY = 0;

    function apply() {
      device.style.setProperty('--tilt-x', tiltX.toFixed(2) + 'deg');
      device.style.setProperty('--tilt-y', tiltY.toFixed(2) + 'deg');
    }

    function reset() {
      tiltX = 0;
      tiltY = 0;
      device.style.setProperty('--gx', '50%');
      device.style.setProperty('--gy', '35%');
      apply();
    }

    // --- Cursor -------------------------------------------------------------
    device.addEventListener('pointermove', function (event) {
      // Un dedo sobre una pantalla táctil quiere hacer scroll, no girar nada.
      if (event.pointerType === 'touch' || reduce.matches) return;

      var box = device.getBoundingClientRect();
      var x = (event.clientX - box.left) / box.width;   // 0 … 1
      var y = (event.clientY - box.top) / box.height;

      tiltY = (x - 0.5) * 2 * MAX;
      tiltX = (0.5 - y) * 2 * (MAX * 0.6);
      device.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
      device.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      apply();
    });

    device.addEventListener('pointerleave', reset);

    // --- Teclado ------------------------------------------------------------
    // Lo mismo que hace el cursor, con las flechas. Quien navega con teclado no
    // se queda sin la parte divertida.
    device.addEventListener('keydown', function (event) {
      if (reduce.matches) return;

      var handled = true;
      switch (event.key) {
        case 'ArrowLeft':  tiltY = Math.max(tiltY - STEP, -MAX); break;
        case 'ArrowRight': tiltY = Math.min(tiltY + STEP, MAX); break;
        case 'ArrowUp':    tiltX = Math.min(tiltX + STEP, MAX); break;
        case 'ArrowDown':  tiltX = Math.max(tiltX - STEP, -MAX); break;
        case 'Escape':     reset(); break;
        default: handled = false;
      }
      if (handled) {
        event.preventDefault();
        apply();
      }
    });

    device.addEventListener('blur', reset);

    // Si el sistema empieza a pedir menos movimiento a mitad de sesión, el
    // dispositivo vuelve a su posición de reposo en ese momento.
    reduce.addEventListener('change', function () {
      if (reduce.matches) reset();
    });
  });
})();
