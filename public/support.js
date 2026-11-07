/*
 * support.js — runtime mínimo para ejecutar el boceto en un navegador normal.
 *
 * El boceto (boceto/Main.dc.html) se hizo como "Design Component" de Claude:
 * usa <x-dc>, <helmet>, <sc-if>, <sc-for>, {{variables}} y una clase Component
 * que extiende DCLogic. Esa plataforma aporta su propio support.js, que no venía
 * en el zip. Este archivo lo reemplaza con lo justo para que la página funcione
 * igual: pintar la plantilla con los valores de renderVals() y, al cambiar el
 * estado, actualizar solo lo que cambió (así no se pierde el foco al escribir ni
 * se reinician las animaciones al pasar el cursor).
 */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var RE_SINGLE = /^\s*\{\{\s*([\w.$]+)\s*\}\}\s*$/;
  var RE_ANY = /\{\{\s*([\w.$]+)\s*\}\}/g;

  /* ---- Clase base que usa el Component del boceto ---- */
  function DCLogic(update) {
    this.state = {};
    this._update = update;
  }
  DCLogic.prototype.setState = function (patch) {
    var next = typeof patch === 'function' ? patch(this.state) : patch;
    this.state = Object.assign({}, this.state, next);
    this._update();
  };
  DCLogic.prototype.renderVals = function () { return {}; };
  window.DCLogic = DCLogic;

  /* ---- Valores y plantilla ---- */
  function lookup(path, scope) {
    var parts = path.trim().split('.');
    var v = scope[parts[0]];
    for (var i = 1; i < parts.length && v != null; i++) v = v[parts[i]];
    return v;
  }
  function interpolate(str, scope) {
    return str.replace(RE_ANY, function (_, p) {
      var v = lookup(p, scope);
      return v == null ? '' : String(v);
    });
  }

  // Convierte un nodo de la plantilla en nodos reales, empujándolos a "out".
  function render(node, scope, out) {
    if (node.nodeType === 3) {
      out.push(document.createTextNode(interpolate(node.nodeValue, scope)));
      return;
    }
    if (node.nodeType !== 1) return; // comentarios y otros

    var tag = node.localName;
    if (tag === 'helmet') return;

    if (tag === 'sc-if') {
      var mi = RE_SINGLE.exec(node.getAttribute('value') || '');
      if (mi && lookup(mi[1], scope)) renderChildren(node, scope, out);
      return;
    }

    if (tag === 'sc-for') {
      var mf = RE_SINGLE.exec(node.getAttribute('list') || '');
      var list = (mf && lookup(mf[1], scope)) || [];
      var as = node.getAttribute('as') || 'item';
      list.forEach(function (item, i) {
        var inner = Object.assign({}, scope);
        inner[as] = item;
        inner.$index = i;
        renderChildren(node, inner, out);
      });
      return;
    }

    var el = node.namespaceURI === SVG_NS
      ? document.createElementNS(SVG_NS, node.localName)
      : document.createElement(node.localName);

    Array.prototype.forEach.call(node.attributes, function (attr) {
      var name = attr.name;
      if (name.indexOf('hint-placeholder') === 0) return;
      if (name.indexOf('on') === 0) {            // onclick, oninput, onmouseenter, onfocus
        var m = RE_SINGLE.exec(attr.value);
        var fn = m && lookup(m[1], scope);
        if (typeof fn === 'function') {
          el.__h = el.__h || {};
          el.__h[name] = fn;
          el[name] = fn;
        }
        return;
      }
      // data-dc-src="{{x}}" se publica como src="..." (ver scripts/generar_index.py)
      var finalName = name.indexOf('data-dc-') === 0 ? name.slice(8) : name;
      el.setAttribute(finalName, interpolate(attr.value, scope));
    });

    var kids = [];
    renderChildren(node, scope, kids);
    kids.forEach(function (k) { el.appendChild(k); });
    out.push(el);
  }

  function renderChildren(node, scope, out) {
    Array.prototype.forEach.call(node.childNodes, function (c) { render(c, scope, out); });
  }

  /* ---- Actualización mínima del DOM ---- */
  function patchElement(oldEl, newEl) {
    Array.prototype.slice.call(oldEl.attributes).forEach(function (a) {
      if (!newEl.hasAttribute(a.name)) oldEl.removeAttribute(a.name);
    });
    Array.prototype.forEach.call(newEl.attributes, function (a) {
      if (oldEl.getAttribute(a.name) !== a.value) oldEl.setAttribute(a.name, a.value);
    });

    var names = {};
    Object.keys(oldEl.__h || {}).forEach(function (k) { names[k] = 1; });
    Object.keys(newEl.__h || {}).forEach(function (k) { names[k] = 1; });
    Object.keys(names).forEach(function (k) { oldEl[k] = (newEl.__h && newEl.__h[k]) || null; });
    oldEl.__h = newEl.__h;

    if (oldEl.localName === 'input') {
      var want = newEl.getAttribute('value') || '';
      if (oldEl.value !== want) oldEl.value = want;
    }
    morph(oldEl, newEl);
  }

  function morph(oldParent, newParent) {
    var fresh = Array.prototype.slice.call(newParent.childNodes);
    fresh.forEach(function (nn, i) {
      var on = oldParent.childNodes[i];
      if (!on) { oldParent.appendChild(nn); return; }
      if (on.nodeType === 3 && nn.nodeType === 3) {
        if (on.nodeValue !== nn.nodeValue) on.nodeValue = nn.nodeValue;
      } else if (on.nodeType === 1 && nn.nodeType === 1 &&
                 on.localName === nn.localName && on.namespaceURI === nn.namespaceURI) {
        patchElement(on, nn);
      } else {
        oldParent.replaceChild(nn, on);
      }
    });
    while (oldParent.childNodes.length > fresh.length) oldParent.removeChild(oldParent.lastChild);
  }

  /* ---- Arranque ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('x-dc');
    var script = document.querySelector('script[data-dc-script]');
    if (!root || !script) { console.error('support.js: falta <x-dc> o el script del componente.'); return; }

    // Estilos y fuentes del <helmet> pasan al <head>.
    Array.prototype.slice.call(root.querySelectorAll('helmet')).forEach(function (h) {
      Array.prototype.slice.call(h.children).forEach(function (c) { document.head.appendChild(c); });
    });

    // La plantilla se saca del documento para que sus {{...}} nunca se ejecuten.
    var template = document.createElement('div');
    while (root.firstChild) template.appendChild(root.firstChild);
    root.style.display = 'block';

    var Component = new Function('DCLogic', script.textContent + '\nreturn Component;')(DCLogic);
    var instance = new Component(update);

    function update() {
      try {
        var vals = instance.renderVals();
        var nodes = [];
        renderChildren(template, vals, nodes);
        var holder = document.createElement('div');
        nodes.forEach(function (n) { holder.appendChild(n); });
        morph(root, holder);
      } catch (err) {
        console.error('support.js: error al pintar la página', err);
      }
    }
    update();
  });
})();
