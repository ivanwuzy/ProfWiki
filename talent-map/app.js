const data = JSON.parse(document.getElementById('map-data').textContent);
const $ = id => document.getElementById(id);
const view = $('viewport'), canvas = $('canvas'), map = $('map');
const highlight = $('highlight'), hoverRing = $('hover'), detail = $('detail');
const labels = {person:'人物',context:'学术 / 管理背景人物',company:'公司 / 项目',lab:'实验室 / 平台',department:'院系',platform:'平台'};
const byId = new Map(data.items.map(i => [i.id, i]));

const mapWidth = data.width, mapHeight = data.height;
// Render only the visible SVG viewport instead of scaling a giant CSS layer.
map.setAttribute('preserveAspectRatio', 'none');
for (const ring of [highlight, hoverRing]) canvas.after(ring);
const ringBounds = new Map();

let scale = 1, x = 0, y = 0, fitScale = 1, viewportMode = 'reading', tier = '';

/* Stats belong to the page chrome now, not to a banner baked into the SVG. */
if (data.stats) {
  const rows = [['主体人物', data.stats.people], ['公司 / 平台', data.stats.companies], ['具名关系', data.stats.bubbles]];
  $('stats').replaceChildren(...rows.map(([label, value]) => {
    const wrap = document.createElement('div');
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value;
    wrap.append(dd, dt); return wrap;
  }));
}

/* --- viewport ------------------------------------------------------------ */
/* Semantic zoom: below these thresholds the reading detail is unreadable
   anyway, so the SVG swaps to a coarser tier instead of rendering mud. */
function setTier() {
  const next = scale < .34 ? 'z-far' : scale < .70 ? 'z-mid' : 'z-near';
  if (next === tier) return;
  if (tier) map.classList.remove(tier);
  map.classList.add(next); tier = next;
}
let drawFrame = 0;
function draw() {
  if (drawFrame) return;
  drawFrame = requestAnimationFrame(() => {
    drawFrame = 0;
    setTier();
    map.setAttribute('viewBox', `${-x / scale} ${-y / scale} ${view.clientWidth / scale} ${view.clientHeight / scale}`);
    for (const [ring, bounds] of ringBounds) {
      const {item, pad} = bounds;
      Object.assign(ring.style, {
        left: (x + (item.x - pad) * scale) + 'px',
        top: (y + (item.y - pad) * scale) + 'px',
        width: ((item.w + pad * 2) * scale) + 'px',
        height: ((item.h + pad * 2) * scale) + 'px'
      });
    }
    $('zoom').value = Math.round(scale * 100) + '%';
  });
}
function measureFit() {
  fitScale = Math.min((view.clientWidth - 24) / mapWidth, (view.clientHeight - 24) / mapHeight);
}
function fit() {
  viewportMode = 'overview'; measureFit(); scale = fitScale;
  x = (view.clientWidth - mapWidth * scale) / 2;
  y = (view.clientHeight - mapHeight * scale) / 2;
  draw();
}
function reading() {
  viewportMode = 'reading'; measureFit(); scale = 1.1; x = 24; y = 18; draw();
}
function zoom(factor, cx = view.clientWidth / 2, cy = view.clientHeight / 2) {
  viewportMode = 'custom';
  const next = Math.max(fitScale * .7, Math.min(3, scale * factor));
  x = cx - (cx - x) * next / scale; y = cy - (cy - y) * next / scale; scale = next;
  draw();
}

/* --- detail drawer ------------------------------------------------------- */
function openDetail() {
  detail.hidden = false;
  requestAnimationFrame(() => detail.classList.add('open'));
}
function closeDetail() {
  detail.classList.remove('open');
  setTimeout(() => { if (!detail.classList.contains('open')) detail.hidden = true; }, 260);
}
function clearFocus() {
  highlight.hidden = true; closeDetail();
}

function fillDetail(item) {
  $('detail-kind').textContent = labels[item.kind] || '';
  $('detail-name').textContent = item.name;
  const wikiLink = $('detail-wiki');
  wikiLink.hidden = !item.wikiUrl;
  if (item.wikiUrl) wikiLink.href = item.wikiUrl;
  else wikiLink.removeAttribute('href');

  /* Related entities are buttons, not prose: the graph stays navigable. */
  $('detail-links').replaceChildren(...(item.links || []).map(link => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = link.label;
    const target = byId.get(link.target);
    if (target) b.onclick = () => focus(target); else b.disabled = true;
    return b;
  }));

  const info = (item.info || []).filter(Boolean).map(t => {
    const p = document.createElement('p'); p.textContent = t; return p;
  });
  for (const [index, url] of (item.urls || []).entries()) {
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.textContent = '查看公开来源 ' + (index + 1);
    const p = document.createElement('p'); p.append(a); info.push(p);
  }
  $('detail-info').replaceChildren(...info);
}

function place(el, item, pad) {
  ringBounds.set(el, {item, pad});
  draw();
  el.hidden = false;
}

function focus(item, card = item.isCard === true) {
  viewportMode = 'custom';
  const inset = Math.min(330, view.clientWidth * .4);
  scale = card
    ? Math.min((view.clientWidth - inset - 40) / item.w, (view.clientHeight - 40) / item.h)
    : Math.min(1.5, view.clientWidth / 520);
  /* Leave room for the drawer so the picked node never lands underneath it. */
  x = (view.clientWidth - inset) / 2 - (item.x + item.w / 2) * scale;
  y = view.clientHeight * (card ? .5 : .44) - (item.y + item.h / 2) * scale;
  place(highlight, item, card ? 10 : 9);
  hoverRing.hidden = true;
  draw();
  fillDetail(item); openDetail();
}

/* --- controls ------------------------------------------------------------ */
/* The drawer and the zoom pad sit inside #viewport so they align to the map
   area rather than the page, which means their pointer traffic would otherwise
   reach the pan/zoom handlers underneath. */
for (const panel of [detail, $('controls')]) {
  panel.addEventListener('pointerenter', () => {
    hoverRing.hidden = true; view.classList.remove('pointing');
  });
  for (const type of ['pointerdown', 'pointermove', 'wheel'])
    panel.addEventListener(type, e => e.stopPropagation());
}

$('plus').onclick = () => zoom(1.35);
$('minus').onclick = () => zoom(1 / 1.35);
$('fit').onclick = () => { fit(); clearFocus(); $('dept').value = ''; };
$('reading').onclick = () => { reading(); clearFocus(); };
$('close-detail').onclick = () => clearFocus();

for (const [i, c] of data.cards.entries()) {
  const o = document.createElement('option');
  o.value = i; o.textContent = c.name; $('dept').append(o);
}
$('dept').onchange = e => { if (e.target.value !== '') focus(data.cards[Number(e.target.value)], true); };

/* --- search -------------------------------------------------------------- */
const results = $('results'), query = $('query');
query.oninput = () => {
  const q = query.value.trim().toLowerCase();
  results.replaceChildren(); results.hidden = !q;
  if (!q) return;
  const matches = data.items
    .filter(i => (i.name + ' ' + i.info.join(' ') + ' ' + (i.links || []).map(l => l.label).join(' ')).toLowerCase().includes(q))
    .sort((a, b) => {
      const rank = i => i.name.toLowerCase() === q ? 0 : i.name.toLowerCase().includes(q) ? 1 : 2;
      return rank(a) - rank(b);
    });
  const count = document.createElement('p');
  count.textContent = matches.length ? `${matches.length} 个结果` : '未找到匹配项';
  results.append(count);
  for (const item of matches.slice(0, 60)) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = item.name;
    const small = document.createElement('small');
    small.textContent = labels[item.kind] + ' · ' + item.info.slice(0, 2).join(' / ');
    b.append(small);
    b.onclick = () => { focus(item); results.hidden = true; };
    results.append(b);
  }
};
query.onkeydown = e => {
  if (e.key === 'Escape') { results.hidden = true; query.blur(); }
  if (e.key === 'ArrowDown') { e.preventDefault(); results.querySelector('button')?.focus(); }
  if (e.key === 'Enter') results.querySelector('button')?.click();
};
document.addEventListener('click', e => { if (!e.target.closest('.search')) results.hidden = true; });
document.addEventListener('keydown', e => {
  const typing = /^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement?.tagName);
  if (e.key === '/' && !typing) { e.preventDefault(); query.focus(); query.select(); }
  else if (e.key === 'Escape' && !typing) clearFocus();
});

/* --- pan / zoom / pick --------------------------------------------------- */
const hitTest = (clientX, clientY) => {
  const r = view.getBoundingClientRect();
  const px = (clientX - r.left - x) / scale, py = (clientY - r.top - y) / scale;
  return (tier === 'z-far' ? data.cards : data.items).find(i => px >= i.x && px <= i.x + i.w && py >= i.y && py <= i.y + i.h);
};

view.addEventListener('wheel', e => {
  e.preventDefault();
  const r = view.getBoundingClientRect();
  zoom(Math.exp(-e.deltaY * .002), e.clientX - r.left, e.clientY - r.top);
}, {passive: false});

const pointers = new Map();
let moved = false, travel = 0;

view.onpointerdown = e => {
  view.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});
  moved = pointers.size > 1; travel = 0;
  view.classList.add('dragging'); hoverRing.hidden = true;
};
view.onpointermove = e => {
  if (!pointers.size && e.pointerType === 'mouse') {
    /* Hover affordance: the map had no pick feedback before the click. */
    const item = hitTest(e.clientX, e.clientY);
    view.classList.toggle('pointing', !!item);
    if (item) place(hoverRing, item, 7); else hoverRing.hidden = true;
    return;
  }
  if (!pointers.has(e.pointerId)) return;
  const prev = pointers.get(e.pointerId), next = {x: e.clientX, y: e.clientY};
  travel += Math.hypot(next.x - prev.x, next.y - prev.y);
  if (travel > 4) moved = true;
  if (pointers.size === 2) {
    const other = [...pointers.entries()].find(([id]) => id !== e.pointerId)[1];
    const oldDist = Math.hypot(prev.x - other.x, prev.y - other.y);
    const dist = Math.hypot(next.x - other.x, next.y - other.y);
    const r = view.getBoundingClientRect();
    if (oldDist > 0) zoom(dist / oldDist, (prev.x + other.x) / 2 - r.left, (prev.y + other.y) / 2 - r.top);
    x += (next.x - prev.x) / 2; y += (next.y - prev.y) / 2;
  } else { x += next.x - prev.x; y += next.y - prev.y; }
  pointers.set(e.pointerId, next); draw();
};
view.onpointerup = e => {
  if (!moved && pointers.size === 1) {
    const item = hitTest(e.clientX, e.clientY);
    if (item) focus(item); else clearFocus();
  }
  pointers.delete(e.pointerId);
  if (!pointers.size) view.classList.remove('dragging');
};
view.onpointercancel = e => { pointers.delete(e.pointerId); view.classList.remove('dragging'); };
view.onpointerleave = () => { hoverRing.hidden = true; view.classList.remove('pointing'); };

view.onkeydown = e => {
  if (['+', '=', '-', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault();
  if (e.key === '+' || e.key === '=') zoom(1.3);
  else if (e.key === '-') zoom(1 / 1.3);
  else if (e.key === '0') { fit(); clearFocus(); }
  else {
    const delta = {ArrowLeft: [60, 0], ArrowRight: [-60, 0], ArrowUp: [0, 60], ArrowDown: [0, -60]}[e.key];
    if (delta) { x += delta[0]; y += delta[1]; draw(); }
  }
};

let previousWidth = view.clientWidth, previousHeight = view.clientHeight;
new ResizeObserver(() => {
  const w = view.clientWidth, h = view.clientHeight;
  if (viewportMode === 'reading') reading();
  else if (viewportMode === 'overview') fit();
  else { measureFit(); x += (w - previousWidth) / 2; y += (h - previousHeight) / 2; draw(); }
  previousWidth = w; previousHeight = h;
}).observe(view);

/* A 110% keyhole onto a 6000px map is useless on a phone; the overview tier
   is now legible, so narrow screens open there instead. */
if (view.clientWidth < 800) fit(); else reading();
