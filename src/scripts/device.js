/* La animación oficial respeta el sistema y la pausa del panel de accesibilidad. */
(function () {
  'use strict';
  var images = document.querySelectorAll('[data-motion-src]');
  if (!images.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function update() {
    var paused = reduce.matches || document.documentElement.hasAttribute('data-a11y-motion') || document.documentElement.hasAttribute('data-a11y-images');
    Array.prototype.forEach.call(images, function (image) {
      var source = image.getAttribute(paused ? 'data-still-src' : 'data-motion-src');
      if (image.getAttribute('src') !== source) image.setAttribute('src', source);
    });
  }
  new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ['data-a11y-motion', 'data-a11y-images'] });
  reduce.addEventListener('change', update);
  update();
})();
