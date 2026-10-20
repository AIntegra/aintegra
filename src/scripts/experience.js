/* Ejemplos ilustrativos locales: no ejecutan el producto ni envían datos. */
(function () {
  'use strict';
  document.querySelectorAll('[data-experience]').forEach(function (root) {
    var buttons = Array.from(root.querySelectorAll('[data-example]'));
    var panels = Array.from(root.querySelectorAll('.experience__panel'));
    function select(button) {
      buttons.forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      panels.forEach(function (panel) { panel.hidden = panel.id !== button.getAttribute('aria-controls'); });
    }
    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () { select(button); });
      button.addEventListener('keydown', function (event) {
        var next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next === undefined) return;
        event.preventDefault(); select(buttons[next]); buttons[next].focus();
      });
    });
  });
})();
