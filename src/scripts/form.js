/**
 * Formulario de solicitud de demo.
 *
 * Valida en el navegador y, si todo está bien, abre el programa de correo con
 * el mensaje ya redactado. No hay servidor nuestro ni de terceros: lo que se
 * escribe aquí no sale del ordenador de la persona hasta que le da a enviar.
 *
 * El día que haya backend propio solo cambia `send()`. La validación, los
 * mensajes y el marcado se quedan igual.
 *
 * Decisiones de accesibilidad, que aquí no son opcionales:
 *  · `novalidate` en el <form> para sustituir los globos del navegador por
 *    mensajes propios, que sí se pueden redactar y traducir.
 *  · Al fallar, un resumen con enlaces a cada campo recibe el foco: quien
 *    navega con lector de pantalla se entera de qué pasó y llega al campo sin
 *    ir a buscarlo.
 *  · Cada campo con error lleva aria-invalid y su mensaje enlazado por
 *    aria-describedby, que se retira en cuanto se corrige.
 *  · Los mensajes vienen del diccionario de contenido, no del código.
 */
(function () {
  'use strict';

  var form = document.getElementById('demo-form');
  if (!form) return;

  var summary = document.getElementById('form-errors');
  var summaryList = summary.querySelector('ul');
  var ready = document.getElementById('form-ready');
  var status = document.getElementById('ready-status');

  // La llamada desde Inversores conserva el motivo de la conversación.
  var profile = new URLSearchParams(window.location.search).get('perfil');
  form.querySelectorAll('[data-profile]').forEach(function (field) {
    if (field.getAttribute('data-profile') === profile) field.checked = true;
  });

  /** Campos obligatorios, con su comprobación y su mensaje. */
  var RULES = [
    { id: 'f-name', msg: form.dataset.errName, ok: function (v) { return v.trim().length > 0; } },
    { id: 'f-email', msg: form.dataset.errEmail, ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
    { id: 'f-task', msg: form.dataset.errTask, ok: function (v) { return v.trim().length > 0; } },
  ];

  function clearError(field) {
    var box = document.getElementById(field.id + '-error');
    field.removeAttribute('aria-invalid');
    box.textContent = '';
    // Se devuelve el describedby a como estaba, sin el mensaje de error.
    var described = (field.getAttribute('aria-describedby') || '')
      .split(/\s+/).filter(function (id) { return id && id !== field.id + '-error'; });
    if (described.length) field.setAttribute('aria-describedby', described.join(' '));
    else field.removeAttribute('aria-describedby');
  }

  function showError(field, message) {
    var box = document.getElementById(field.id + '-error');
    field.setAttribute('aria-invalid', 'true');
    box.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" style="flex:none">' +
      '<circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M10 5v6M10 14v.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '<span></span>';
    box.querySelector('span').textContent = message;

    var described = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (described.indexOf(field.id + '-error') === -1) described.push(field.id + '-error');
    field.setAttribute('aria-describedby', described.join(' '));
  }

  function validate() {
    var failed = [];
    RULES.forEach(function (rule) {
      var field = document.getElementById(rule.id);
      clearError(field);
      if (!rule.ok(field.value)) {
        showError(field, rule.msg);
        failed.push({ id: rule.id, msg: rule.msg });
      }
    });
    return failed;
  }

  function showSummary(failed) {
    summaryList.innerHTML = '';
    failed.forEach(function (item) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + item.id;
      link.textContent = item.msg;
      link.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById(item.id).focus();
      });
      li.appendChild(link);
      summaryList.appendChild(li);
    });
    summary.hidden = false;
    summary.focus();
  }

  /** Redacta el cuerpo del correo con lo que se ha rellenado. */
  function compose() {
    var get = function (id) { return (document.getElementById(id).value || '').trim(); };
    var perfil = form.querySelector('input[name="perfil"]:checked');
    var d = form.dataset;

    var lines = [d.intro, ''];
    if (perfil) lines.push(d.lProfile + ': ' + perfil.value);
    lines.push(d.lName + ': ' + get('f-name'));
    if (get('f-org')) lines.push(d.lOrg + ': ' + get('f-org'));
    lines.push('', d.lTask + ':', get('f-task'), '', d.outro, get('f-name'));
    return lines.join('\n');
  }

  /**
   * Antes esto hacía `location.href = mailto:...` y punto. En un ordenador sin
   * programa de correo de escritorio —que hoy es la mayoría: la gente usa el
   * correo en el navegador— el navegador no hace nada y parece que el botón
   * está roto. Ahora el formulario da paso a un panel con las tres salidas:
   * Gmail, programa de correo, o copiar el mensaje.
   */
  function send() {
    var d = form.dataset;
    var body = compose();
    var to = encodeURIComponent(d.mailto);
    var su = encodeURIComponent(d.subject);
    var bo = encodeURIComponent(body);

    document.getElementById('ready-gmail').href =
      'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + su + '&body=' + bo;
    document.getElementById('ready-mailto').href =
      'mailto:' + d.mailto + '?subject=' + su + '&body=' + bo;
    document.getElementById('ready-body').value = body;

    status.textContent = '';
    form.hidden = true;
    ready.hidden = false;
    ready.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var failed = validate();
    if (failed.length) {
      showSummary(failed);
      return;
    }
    summary.hidden = true;
    send();
  });

  // --- Panel de envío -------------------------------------------------------
  document.getElementById('ready-copy').addEventListener('click', function () {
    var text = document.getElementById('ready-body').value;
    var done = function () { status.textContent = form.dataset.copied || ''; };
    var failed = function () {
      status.textContent = form.dataset.copyFail || '';
      document.getElementById('ready-body').select();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, failed);
    } else {
      failed();
    }
  });

  document.getElementById('ready-back').addEventListener('click', function () {
    ready.hidden = true;
    form.hidden = false;
    document.getElementById('f-name').focus();
  });

  // El error de un campo desaparece en cuanto se corrige, sin esperar a
  // reenviar: corregir a ciegas es de las cosas que más cansan de un formulario.
  RULES.forEach(function (rule) {
    var field = document.getElementById(rule.id);
    field.addEventListener('input', function () {
      if (field.hasAttribute('aria-invalid') && rule.ok(field.value)) clearError(field);
    });
  });
})();
