const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../data.js'),'utf8'),context);
const data=context.window.HK_MAP;
test('all entity identities and references resolve without double-counting people',()=>{
 const nodes=[...data.people,...data.companies,...data.groups,...data.schools];
 const ids=new Set(nodes.map(n=>n.id));assert.equal(ids.size,nodes.length);
 const members=data.groups.flatMap(g=>g.members);assert.equal(new Set(members).size,data.people.length);
 for(const g of data.groups)for(const p of g.members)assert.ok(ids.has(p));
 for(const e of data.edges){assert.ok(ids.has(e.source));assert.ok(ids.has(e.target));for(const f of e.evidence)assert.ok(fs.existsSync(path.join(root,f)),f);}
 for(const a of data.affiliations){assert.ok(ids.has(a.person));assert.ok(ids.has(a.school));}
 for(const n of nodes){if(n.path)assert.ok(fs.existsSync(path.join(root,n.path)),n.path);for(const s of n.sources||[])assert.match(s.url,/^https?:\/\//);}
});
test('regional scope retains five Hong Kong schools and two distinct mainland institutions',()=>{
 assert.equal(data.schools.filter(s=>!s.related).length,5);
 assert.equal(data.schools.find(s=>s.id==='hkustgz').location,'广州');
 assert.equal(data.schools.find(s=>s.id==='cuhksz').location,'深圳');
 assert.notEqual(data.schools.find(s=>s.id==='hkust').id,data.schools.find(s=>s.id==='hkustgz').id);
});
test('high-risk relationships retain employment, collaboration, and historical boundaries',()=>{
 const person=name=>data.people.find(p=>p.name===name);
 const edge=(name,c)=>data.edges.find(e=>e.source===person(name).id&&e.target===`company:${c}`);
 assert.equal(edge('潘佳','逐际动力').type,'industry');
 assert.equal(edge('沈劭劼','卓驭科技').type,'industry');
 assert.equal(edge('赵恒爽','银河通用').type,'collab');
 assert.equal(edge('李泽湘','大疆').type,'industry');
 assert.match(person('王煜').role,/历史/);
 assert.match(person('段默龙').role,/副主任/);
 assert.notEqual(person('邓胜亮').group,person('赵恒爽').group);
 for(const e of data.edges.filter(e=>e.quote))assert.ok(fs.readFileSync(path.join(root,e.evidence[0]),'utf8').includes(e.quote));
});
test('homepage puts Hong Kong immediately after Tsinghua with square official emblem',()=>{
 const home=fs.readFileSync(path.join(root,'site/home.md'),'utf8');
 assert.match(home,/清华具身人才交互地图[^\n]+\n- \[香港高校人才交互地图/);
 const component=fs.readFileSync(path.join(root,'site/components/TalentMapLink.tsx'),'utf8');
 assert.ok(component.indexOf('href: "talent-map/"')<component.indexOf('href: "hong-kong-talent-map/"'));
 assert.ok(fs.existsSync(path.join(root,'site/quartz/static/hong-kong-emblem.gif')));
});
test('four-school additions are complete and preserve qualified roles',()=>{
 const names=['于欣格','孙宇翔','李文荣','Xiaoling Hu','殷骏','李海洲','吴保元','胡君杰','武执政','Yuancheng Wang','俞江帆','朱熹','李镇','刘浩','徐巍','陈力','訾云龙','吴佳莹'];
 for(const name of names){const matches=data.people.filter(p=>p.name===name);assert.equal(matches.length,1,name);assert.ok(matches[0].sources.length,name);}
 for(const name of ['AI-Motion-Sports','Linkerbot','Sanas','智科自动化','泰康诺生物科技','泽康科技','翼机器人']){
  const c=data.companies.find(c=>c.id===`company:${name}`);assert.ok(c,name);
  const edges=data.edges.filter(e=>e.target===c.id);assert.ok(edges.length,name);assert.ok(edges.every(e=>e.type!=='founder'),name);
 }
 assert.match(data.people.find(p=>p.name==='武执政').role,/礼任教授/);
 assert.match(data.people.find(p=>p.name==='陈力').role,/核心成员/);
 assert.match(data.people.find(p=>p.name==='李文荣').role,/待核/);
 for(const id of ['胡君杰-港中深AI','Yuancheng-Wang-港中深语音']){
  const relation=data.edges.find(e=>e.target===id);assert.equal(relation.type,'collab');assert.match(relation.label,/非师承|导师待核/);
 }
});
test('company team origins cite real organizations without invented people',()=>{
 for(const [company,org] of [['翼机器人','香港城市大学先进设计及系统工程学系'],['泰康诺生物科技','香港城市大学神经科学系']]){
  const e=data.edges.find(e=>e.target===`company:${company}`);const g=data.groups.find(g=>g.id===e.source);
  assert.equal(g.file,org);assert.equal(g.synthetic,false);assert.equal(g.members.length,0);
  const text=fs.readFileSync(path.join(root,g.path),'utf8');assert.ok(text.includes(e.quote));assert.ok(text.includes(`${company}.md`));
 }
});
test('new directions and cross-school roles resolve against source evidence',()=>{
 const domains=new Set(data.domains.map(d=>d[0]));
 for(const p of data.people)for(const d of p.domains)assert.ok(domains.has(d));
 for(const [name,d] of [['李海洲','speech'],['殷骏','energy'],['朱熹','science']])assert.ok(data.people.find(p=>p.name===name).domains.includes(d));
 for(const a of data.affiliations)assert.ok(fs.readFileSync(path.join(root,a.evidence[0]),'utf8').includes(a.quote));
 const wu=data.affiliations.find(a=>a.person==='吴佳莹-港科广先进材料');assert.equal(wu.school,'hkust');assert.match(wu.label,/联聘/);
});
