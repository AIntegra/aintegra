/**
 * Panel de ajustes de accesibilidad.
 *
 * Cambia cómo se ve la web en el navegador de quien la visita y lo recuerda.
 * Todo ocurre en su equipo: los ajustes van a localStorage y no sale nada a
 * ningún servidor, igual que el resto del sitio.
 *
 * Por qué está hecho en casa y no con un overlay comprado: los overlays de
 * accesibilidad interfieren con los lectores de pantalla reales, cargan varios
 * guiones de terceros en cada página y, en una empresa que vende accesibilidad,
 * se leen como haber comprado un parche en vez de hacer el trabajo.
 *
 * Lo que este panel NO hace, a propósito: no incluye un «lector de pantalla».
 * La web ya está construida para funcionar con el que cada persona use, y un
 * lector de mentira por encima solo estorba al de verdad.
 *
 * Detalles que aquí no son opcionales:
 *  · El botón es la segunda parada del tabulador, después del salto al
 *    contenido: se encuentra sin buscarlo.
 *  · El panel es un diálogo modal de verdad: atrapa el tabulador, se cierra con
 *    Escape y devuelve el foco al botón que lo abrió.
 *  · Cada interruptor es un <button aria-pressed>, así que el lector de
 *    pantalla anuncia si está activado sin depender del color.
 *  · Los ajustes se aplican como atributos en <html>, y el CSS hace el resto.
 */
(function () {
  'use strict';

  var root = document.getElementById('a11y');
  if (!root) return;

  var html = document.documentElement;
  var toggle = document.getElementById('a11y-toggle');
  var panel = document.getElementById('a11y-panel');
  var title = document.getElementById('a11y-title');
  var status = document.getElementById('a11y-status');
  var KEY = 'aintegra-a11y';

  var SWITCHES = ['contrast', 'links', 'spacing', 'motion', 'images'];
  var state = { text: '100' };
  SWITCHES.forEach(function (k) { state[k] = false; });

  /* ---------- persistencia ------------------------------------------------ */

  function load() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(KEY) || '{}');
      if (saved && typeof saved === 'object') {
        if (saved.text) state.text = String(saved.text);
        SWITCHES.forEach(function (k) { state[k] = !!saved[k]; });
      }
    } catch (e) {
      // Navegación privada o almacenamiento bloqueado: se sigue sin recordar.
    }
  }

  function save() {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* si no se puede guardar, los ajustes valen para esta visita */ }
  }

  /* ---------- aplicar ------------------------------------------------------ */

  function apply() {
    html.setAttribute('data-a11y-text', state.text);
    SWITCHES.forEach(function (k) {
      if (state[k]) html.setAttribute('data-a11y-' + k, 'on');
      else html.removeAttribute('data-a11y-' + k);
    });

    var radio = panel.querySelector('input[name="a11y-text"][value="' + state.text + '"]');
    if (radio) radio.checked = true;
    SWITCHES.forEach(function (k) {
      var button = panel.querySelector('[data-a11y="' + k + '"]');
      if (button) button.setAttribute('aria-pressed', state[k] ? 'true' : 'false');
    });
  }

  /* ---------- diálogo ------------------------------------------------------ */

  function focusables() {
    return panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  }

  function open() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    root.setAttribute('data-open', 'true');
    title.focus();
    document.addEventListener('keydown', onKeydown, true);
  }

  function close() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    root.removeAttribute('data-open');
    document.removeEventListener('keydown', onKeydown, true);
    toggle.focus();
  }

  function onKeydown(event) {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;

    // El tabulador se queda dentro del diálogo mientras está abierto.
    var items = focusables();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    var active = document.activeElement;

    if (event.shiftKey && (active === first || active === title)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault(); first.focus();
    }
  }

  /* ---------- enganches ---------------------------------------------------- */

  toggle.addEventListener('click', function () {
    if (panel.hidden) open(); else close();
  });
  document.getElementById('a11y-close').addEventListener('click', close);

  panel.addEventListener('change', function (event) {
    if (event.target.name !== 'a11y-text') return;
    state.text = event.target.value;
    apply(); save();
  });

  SWITCHES.forEach(function (key) {
    var button = panel.querySelector('[data-a11y="' + key + '"]');
    if (!button) return;
    button.addEventListener('click', function () {
      state[key] = !state[key];
      apply(); save();
    });
  });

  document.getElementById('a11y-reset').addEventListener('click', function () {
    state = { text: '100' };
    SWITCHES.forEach(function (k) { state[k] = false; });
    apply(); save();
    status.textContent = root.dataset.statusReset || '';
  });

  // Sin JavaScript el botón no se enseña: no tiene sentido ofrecer controles
  // que no van a hacer nada.
  toggle.hidden = false;

  load();
  apply();
})();
