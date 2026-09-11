// Compile only relationships explicitly present in the reviewed map snapshot.
const companyRoles = {
  founder: ['创始人·CEO', '创办者', '联合创始人·首席科学家', '联合创始人', '联创·CTO',
    '联合创始人·CTO', '联合创始人·CEO', '共同创业', '创始人·首席科学家',
    '联合创始人·非执行董事', '联创·CEO', '联合发起人·首席算法负责人', '转化发起'],
  industry: ['首席顾问', '多模态首席科学家', '首席科学家', '首席技术顾问', 'CTO',
    '核心技术高管', 'CEO', '董事长·CEO', '首席科学家（2023年公告）'],
  historical: ['历史联创·已离任', '历史联合创始人', '历史创始人·CEO', '历史合伙人·CTO',
    '历史创办', '管理与研发（历史）', 'CTO（历史报道）'],
  collab: ['科研合作'],
  pending: ['关联待核'],
};
const roleTypes = new Map(Object.entries(companyRoles).flatMap(([type, roles]) => roles.map(role => [role, type])));
const personRelationId = (a, b, type, label) => JSON.stringify(['person', a, b, type, label]);
const companyRelationId = c => JSON.stringify(['company', c.person, c.name]);

function compileRelations(data, items) {
  const byId = new Map(items.map(item => [item.id, item]));
  if (byId.size !== items.length) throw new Error('Duplicate map item IDs');
  const people = new Map(data.people.map(person => [person.name, person]));
  for (const item of items) {
    item.entityId = `${item.kind}:${item.kind === 'company' ? item.name : item.id}`;
    item.relationIds = [];
    if (item.kind === 'person' || item.kind === 'company') item.links = [];
  }
  const relations = [], seen = new Set();
  const add = edge => {
    if (!byId.has(edge.source) || !byId.has(edge.target)) throw new Error(`Missing relation endpoint: ${edge.id}`);
    if (edge.source === edge.target) throw new Error(`Self relation: ${edge.id}`);
    if (seen.has(edge.id)) throw new Error(`Duplicate relation: ${edge.id}`);
    seen.add(edge.id);
    relations.push(edge);
  };
  for (const [source, target, label, type] of data.mentor) {
    if (!['mentor', 'pending', 'collab'].includes(type)) throw new Error(`Unknown person relation: ${type}`);
    add({id: personRelationId(source, target, type, label), kind: 'person', source, target, type, label,
      pending: type === 'pending', historical: false,
      sources: [...new Set([people.get(source)?.path, people.get(target)?.path].filter(Boolean))]});
  }
  for (const c of data.instances) {
    const type = c.pending ? 'pending' : c.historical ? 'historical' : roleTypes.get(c.role);
    if (!type) throw new Error(`Unmapped company role: ${c.role}`);
    const target = `${c.name}@${c.person}`;
    if (byId.get(target)?.kind !== 'company' || byId.get(target)?.name !== c.name)
      throw new Error(`Company instance mismatch: ${target}`);
    add({id: companyRelationId(c), kind: 'company', source: c.person, target, type, label: c.role,
      pending: Boolean(c.pending) || type === 'pending', historical: Boolean(c.historical) || type === 'historical',
      sources: c.sources || [], urls: c.urls || []});
  }
  const companyInstances = new Map();
  for (const item of items.filter(item => item.kind === 'company')) {
    if (!companyInstances.has(item.entityId)) companyInstances.set(item.entityId, []);
    companyInstances.get(item.entityId).push(item);
  }
  for (const edge of relations) {
    const source = byId.get(edge.source), target = byId.get(edge.target);
    const status = [edge.pending ? '待核' : '', edge.historical ? '历史参与' : ''].filter(Boolean);
    const label = `${edge.label}${status.length ? `（${status.join(' · ')}）` : ''}`;
    const describe = other => edge.kind === 'person'
      ? `${source.name} ${edge.type === 'mentor' ? '→' : '—'} ${target.name}｜${label}`
      : `${other.name}｜${label}`;
    // Undirected selection; arrow direction remains an independent semantic property.
    source.relationIds.push(edge.id);
    source.links.push({target: target.id, label: describe(target)});
    for (const instance of edge.kind === 'company' ? companyInstances.get(target.entityId) : [target]) {
      instance.relationIds.push(edge.id);
      instance.links.push({target: source.id, label: describe(source)});
    }
  }
  return relations;
}

module.exports = {compileRelations, personRelationId, companyRelationId};
