// Contenido de EJEMPLO. Más adelante, cada artículo real saldrá de su cuaderno.
const TAGS = [
  { id: 'champions',      nombre: 'Champions',      color: '#1ea7ff' },
  { id: 'liga-espanola',  nombre: 'Liga española',  color: '#e5372f' },
  { id: 'liga-francesa',  nombre: 'Liga francesa',  color: '#6b4be6' },
  { id: 'jugadores',      nombre: 'Jugadores',      color: '#111111' },
  { id: 'mundial',        nombre: 'Mundial',        color: '#1fb15a' },
];

const ARTICULOS = [
  { id: 'plan-luis-enrique', titulo: 'Plan de Luis Enrique',
    desc: 'Qué hay detrás del PSG y cómo Luis Enrique dominó Europa.',
    tags: ['champions', 'liga-francesa'], fecha: '2026-10-27', lenguajes: ['Python'], tipo: 'Análisis de datos' },
  { id: 'lamine-vs-grandes', titulo: 'Lamine vs equipos grandes',
    desc: '¿Lamine se pierde ante equipos grandes? Análisis estadístico de su desempeño.',
    tags: ['jugadores'], fecha: '2026-10-22', lenguajes: ['Python', 'SQL'], tipo: 'Análisis de datos' },
  { id: 'barcelona-madrid', titulo: 'Barcelona vs Real Madrid 25/10/26',
    desc: 'Análisis del resultado y del desempeño de los jugadores.',
    tags: ['liga-espanola'], fecha: '2026-10-28', lenguajes: ['Python'], tipo: 'Análisis de datos' },
  { id: 'raphinha-24-25', titulo: 'Raphinha 24/25',
    desc: 'Descripción de ejemplo.',
    tags: ['jugadores'], fecha: '2026-10-15', lenguajes: ['Python'], tipo: 'Limpieza de datos' },
  { id: 'prediccion-mundial', titulo: 'Predicción Mundial 2026',
    desc: 'Modelo que puntúa a las selecciones para predecir campeón y semifinalistas.',
    tags: ['mundial'], fecha: '2026-10-10', lenguajes: ['Python'], tipo: 'Modelo predictivo' },
];

// Tamaño y desplazamiento de cada portada para el efecto "burbuja" (solo en pantallas anchas).
const BURBUJA = [
  { w: 190, dy: 0 }, { w: 165, dy: 46 }, { w: 205, dy: -8 }, { w: 158, dy: 58 }, { w: 182, dy: 18 },
];

const tagPorId = Object.fromEntries(TAGS.map(t => [t.id, t]));
const abiertas = new Set();

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const el = (tag, attrs = {}, ...hijos) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else n.setAttribute(k, v);
  }
  hijos.forEach(h => n.append(h));
  return n;
};
const punto = id => el('span', { class: 'dot', style: `--c:${tagPorId[id].color}`, 'aria-hidden': 'true' });
const fechaCorta = iso => iso.split('-').reverse().join('/');
const visible = a => abiertas.size === 0 || a.tags.some(t => abiertas.has(t));

/* ---- Árbol de etiquetas ---- */
function pintarArbol() {
  const raiz = document.getElementById('tag-tree');
  TAGS.forEach(tag => {
    const lista = ARTICULOS.filter(a => a.tags.includes(tag.id));
    const panelId = `panel-${tag.id}`;
    const boton = el('button', { type: 'button', class: 'tag-btn', 'aria-expanded': 'false', 'aria-controls': panelId },
      punto(tag.id),
      el('span', { class: 'tag-name', text: tag.nombre }),
      el('span', { class: 'tag-count', text: String(lista.length) }));
    boton.insertAdjacentHTML('beforeend', '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>');

    const ul = el('ul');
    lista.forEach(a => ul.append(el('li', {}, el('a', { href: `#${a.id}`, text: a.titulo }))));
    const panel = el('div', { class: 'tag-panel', id: panelId }, ul);

    boton.addEventListener('click', () => {
      const abrir = !abiertas.has(tag.id);
      abrir ? abiertas.add(tag.id) : abiertas.delete(tag.id);
      boton.setAttribute('aria-expanded', String(abrir));
      panel.classList.toggle('is-open', abrir);
      actualizar();
    });
    raiz.append(el('div', { class: 'tag' }, boton, panel));
  });
}

/* ---- Muro de portadas ---- */
function pintarMuro() {
  const muro = document.getElementById('wall');
  ARTICULOS.forEach((a, i) => {
    const b = BURBUJA[i % BURBUJA.length];
    const marco = el('div', { class: 'cover-frame' },
      el('h3', { text: a.titulo }),
      el('p', { text: a.desc }),
      el('div', { class: 'cover-tags' }, ...a.tags.map(punto)));
    const portada = el('a', {
      class: 'cover', href: `#${a.id}`, 'data-id': a.id,
      style: `--c:${tagPorId[a.tags[0]].color};--w:${b.w}px;--dy:${b.dy}px`,
    }, marco);
    muro.append(portada);
  });
}

/* ---- Tabla ---- */
function pintarTabla() {
  const cuerpo = document.getElementById('rows');
  [...ARTICULOS].sort((x, y) => y.fecha.localeCompare(x.fecha)).forEach(a => {
    const tr = el('tr', { 'data-id': a.id });
    tr.append(
      el('td', {}, el('a', { href: `#${a.id}`, text: a.titulo })),
      el('td', {}, el('div', { class: 'row-tags' },
        ...a.tags.map(t => el('span', { class: 'row-tag' }, punto(t), tagPorId[t].nombre)))),
      el('td', { class: 'muted', text: fechaCorta(a.fecha) }),
      el('td', {}, ...a.lenguajes.map(l => el('span', { class: 'pill', text: l, style: 'margin-right:4px' }))),
      el('td', { text: a.tipo }),
    );
    tr.dataset.busqueda = norm([a.titulo, a.desc, a.tipo, ...a.lenguajes, ...a.tags.map(t => tagPorId[t].nombre)].join(' '));
    cuerpo.append(tr);
  });
}

/* ---- Filtros y búsqueda ---- */
function actualizar() {
  const termino = norm(document.getElementById('search').value.trim());

  document.querySelectorAll('.cover').forEach(c => {
    const a = ARTICULOS.find(x => x.id === c.dataset.id);
    c.classList.toggle('is-hidden', !visible(a));
  });

  let filas = 0;
  document.querySelectorAll('#rows tr').forEach(tr => {
    const a = ARTICULOS.find(x => x.id === tr.dataset.id);
    const coincide = visible(a) && (termino === '' || tr.dataset.busqueda.includes(termino));
    tr.hidden = !coincide;
    if (coincide) filas++;
  });
  document.getElementById('empty').hidden = filas > 0;

  const barra = document.getElementById('filter-bar');
  const chips = document.getElementById('filter-chips');
  chips.replaceChildren(...TAGS.filter(t => abiertas.has(t.id))
    .map(t => el('span', { class: 'chip' }, punto(t.id), t.nombre)));
  barra.hidden = abiertas.size === 0;
}

function quitarFiltros() {
  abiertas.clear();
  document.querySelectorAll('.tag-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
  document.querySelectorAll('.tag-panel').forEach(p => p.classList.remove('is-open'));
  actualizar();
}

pintarArbol();
pintarMuro();
pintarTabla();
document.getElementById('search').addEventListener('input', actualizar);
document.getElementById('filter-clear').addEventListener('click', quitarFiltros);
actualizar();
