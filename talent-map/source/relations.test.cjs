const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {compileRelations} = require('./relations.cjs');
const source = require('./map_data.json');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const data = JSON.parse(html.match(/<script id="map-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
const items = new Map(data.items.map(item => [item.id, item]));
const edges = new Map(data.relations.map(edge => [edge.id, edge]));
const incident = id => items.get(id).relationIds.map(id => edges.get(id));
const neighbors = id => [...new Set(incident(id).flatMap(edge => [edge.source, edge.target]))].sort();

test('snapshot relations are complete, resolvable and not duplicated', () => {
  assert.equal(data.relations.length, source.mentor.length + source.instances.length);
  assert.equal(edges.size, data.relations.length);
  assert.equal(items.size, data.items.length);
  for (const edge of data.relations) {
    assert.ok(items.has(edge.source)); assert.ok(items.has(edge.target));
    // Preserve the snapshot's references, including historical page names.
    // This interaction change does not claim to revalidate the underlying evidence.
    const knownRefs = new Set([...source.people.map(person => person.path), ...source.instances.flatMap(c => c.sources || [])]);
    for (const ref of edge.sources) assert.ok(knownRefs.has(ref), ref);
  }
  for (const item of data.items) {
    assert.equal(new Set(item.relationIds).size, item.relationIds.length);
    for (const id of item.relationIds) assert.ok(edges.has(id));
    for (const link of item.links) assert.ok(items.has(link.target));
  }
});

test('person selection is exactly one hop, with both incoming and outgoing edges', () => {
  assert.deepEqual(neighbors('刘松铭'), ['LiberAI@刘松铭', '刘松铭', '朱军'].sort());
  assert.deepEqual(items.get('刘松铭').links.map(link => link.target).sort(), ['LiberAI@刘松铭', '朱军'].sort());
  assert.ok(!neighbors('朱军').some(id => id.startsWith('LiberAI@')));
  for (const item of data.items.filter(item => item.kind === 'person')) {
    const expected = data.relations.filter(edge => edge.source === item.id || edge.target === item.id);
    assert.deepEqual(new Set(item.relationIds), new Set(expected.map(edge => edge.id)));
  }
});

test('company selection joins its instances without adding founders’ mentors', () => {
  for (const id of ['LiberAI@刘松铭', 'LiberAI@林凡淇']) {
    assert.deepEqual(neighbors(id), ['LiberAI@刘松铭', 'LiberAI@林凡淇', '刘松铭', '林凡淇'].sort());
    assert.deepEqual(items.get(id).links.map(link => link.target).sort(), ['刘松铭', '林凡淇'].sort());
  }
  assert.equal(items.get('LiberAI@刘松铭').entityId, items.get('LiberAI@林凡淇').entityId);
  assert.notEqual(items.get('LiberAI@刘松铭').id, items.get('LiberAI@林凡淇').id);
});

test('cross-department mentor direction is independent of the selected endpoint', () => {
  const edge = incident('于超').find(edge => edge.source === '汪玉');
  assert.equal(edge.target, '于超'); assert.equal(edge.type, 'mentor');
  assert.ok(items.get('汪玉').relationIds.includes(edge.id));
  assert.ok(items.get('于超').links.some(link => link.label.includes('汪玉 → 于超')));
});

test('collaboration, pending, employment and historical participation retain their meaning', () => {
  const collab = incident('高阳').find(edge => edge.target === '吕雪广');
  assert.equal(collab.type, 'collab'); assert.equal(collab.label, '博后合作');
  assert.ok(!items.get('吕雪广').links.find(link => link.target === '高阳').label.includes('→'));
  const pending = incident('陈建宇').find(edge => edge.target === '胡钰承');
  assert.equal(pending.pending, true);
  assert.match(items.get('胡钰承').links[0].label, /待核/);
  const historical = incident('星海图@许华哲').find(edge => edge.source === '许华哲');
  assert.equal(historical.historical, true); assert.equal(historical.type, 'historical');
  assert.match(items.get('星海图@许华哲').links.find(link => link.target === '许华哲').label, /已离任.*历史参与/);
  for (const edge of data.relations.filter(edge => edge.label === '首席顾问')) assert.equal(edge.type, 'industry');
});

test('every rendered connector starts and ends on its actual node boundary', () => {
  const onBoundary = (point, item) => {
    const [x, y] = point, tolerance = .001;
    if (item.kind === 'company') {
      const dx = (x - item.x - item.w / 2) / (item.w / 2);
      const dy = (y - item.y - item.h / 2) / (item.h / 2);
      return Math.abs(dx * dx + dy * dy - 1) < tolerance;
    }
    return x >= item.x - tolerance && x <= item.x + item.w + tolerance &&
      y >= item.y - tolerance && y <= item.y + item.h + tolerance &&
      [x - item.x, x - item.x - item.w, y - item.y, y - item.y - item.h].some(n => Math.abs(n) < tolerance);
  };
  for (const edge of data.relations) {
    assert.ok(edge.points.flat().every(Number.isFinite), edge.id);
    assert.ok(onBoundary(edge.points[0], items.get(edge.source)), edge.id);
    assert.ok(onBoundary(edge.points.at(-1), items.get(edge.target)), edge.id);
  }
});

test('SVG has one active path per relation and a group per selectable person/company', () => {
  assert.equal((html.match(/class="relation-path d2"/g) || []).length, data.relations.length);
  assert.equal((html.match(/class="map-node"/g) || []).length, source.people.length + source.instances.length);
});

test('missing endpoints, duplicate relations and unrecognized roles fail explicitly', () => {
  const copyItems = () => structuredClone(data.items);
  const broken = structuredClone(source); broken.mentor.push(['missing', '朱军', '导师', 'mentor']);
  assert.throws(() => compileRelations(broken, copyItems()), /Missing relation endpoint/);
  const duplicate = structuredClone(source); duplicate.mentor.push(duplicate.mentor[0]);
  assert.throws(() => compileRelations(duplicate, copyItems()), /Duplicate relation/);
  const role = structuredClone(source); role.instances.find(c => !c.pending && !c.historical).role = '新角色待分类';
  assert.throws(() => compileRelations(role, copyItems()), /Unmapped company role/);
});

test('no explicit relation means no inferred neighbors', () => {
  const compiled = compileRelations({...source, mentor: [], instances: []}, structuredClone(data.items));
  assert.deepEqual(compiled, []);
  const isolated = data.items.filter(item => item.kind === 'person' && !item.relationIds.length);
  assert.ok(isolated.length > 0);
  for (const item of isolated) assert.deepEqual(item.links, []);
});

test('research guidance does not imply lab membership, employment or a personal mentor for teammates', () => {
  const {P} = require('./layout');
  assert.deepEqual(neighbors('李忆唐'), ['弋力', '李忆唐'].sort());
  assert.equal(incident('李忆唐')[0].label, '研究指导');
  assert.ok(!P['李忆唐'].group.includes('3DVICI'));
  assert.deepEqual(neighbors('白雨石'), ['李涓子', '白雨石'].sort());
  assert.ok(!P['白雨石'].group.includes('KEG'));
  assert.deepEqual(incident('罗长盛'), []);
  const appointment = incident('潘佳')[0];
  assert.equal(appointment.type, 'industry');
  assert.match(appointment.label, /2023年公告/);
  assert.match(items.get('潘佳').info.join(' '), /最新任职待核/);
});

test('pending arrival and disputed lab names remain visible without inventing formal members', () => {
  for (const name of ['郭钰铎', '王同翰']) {
    assert.match(items.get(name).info.join(' '), /正式到岗待核/);
    assert.equal(source.people.find(person => person.name === name).currentFaculty, false);
  }
  assert.ok(!items.has('李昊展'));
  assert.ok(!items.has('VAR / EVAR Lab'));
  assert.match(items.get('VAR Lab').info.join(' '), /EVAR.*待核/);
  for (const id of ['VAR Lab', 'MARS Lab', '求之科技@周谷越']) assert.ok(items.get(id).wikiUrl);
});

test('new department panels contain finite coordinates and keep their members inside the panel', () => {
  for (const card of data.cards) {
    assert.ok([card.x, card.y, card.w, card.h].every(Number.isFinite), card.name);
    assert.ok(card.x >= 0 && card.y >= 0 && card.x + card.w <= data.width && card.y + card.h <= data.height, card.name);
  }
  for (const person of source.people.filter(person => person.date === '2026-09-11')) {
    const item = items.get(person.name), card = data.cards.find(card => card.name === person.dept);
    assert.ok([item.x, item.y, item.w, item.h].every(Number.isFinite), item.id);
    assert.ok(item.x >= card.x && item.y >= card.y && item.x + item.w <= card.x + card.w && item.y + item.h <= card.y + card.h, item.id);
    assert.ok(item.wikiUrl, item.id);
  }
});
