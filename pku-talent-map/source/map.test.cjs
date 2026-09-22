const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../data.js'),'utf8'),ctx);
const d=ctx.window.PKU_MAP;
test('selected entities, relationships and evidence all resolve without duplicate people',()=>{
 const nodes=[...d.people,...d.groups,...d.schools,...d.companies],ids=new Set(nodes.map(n=>n.id));
 assert.equal(ids.size,nodes.length);assert.equal(new Set(d.groups.flatMap(g=>g.members)).size,d.people.length);
 for(const n of nodes){if(n.path)assert.ok(fs.existsSync(path.join(root,n.path)),n.path);if(!n.synthetic)assert.ok(n.sources?.length,n.name);}
 for(const e of d.edges){assert.ok(ids.has(e.source));assert.ok(ids.has(e.target));for(const f of e.evidence)assert.ok(fs.existsSync(path.join(root,f)));if(e.quote)assert.ok(fs.readFileSync(path.join(root,e.evidence[0]),'utf8').includes(e.quote));}
});
test('primary PKU routes and cross-platform roles remain distinct',()=>{
 for(const id of ['amr','sai','cs','ai','sz','cross'])assert.ok(d.schools.some(s=>s.id===id));
 const group=file=>d.groups.find(g=>g.file===file);
 assert.notEqual(group('北京大学具身智能与机器人研究中心').id,group('北京大学机器人研究中心').id);
 assert.equal(group('北京大学-CoRe-Lab').school,'cross');
 assert.ok(d.edges.some(e=>e.source===group('北京大学具身智能与机器人研究中心').id&&e.target==='王启宁-北大机器人'&&e.label.includes('不推定全职')));
 assert.equal(d.edges.find(e=>e.source==='董豪-北大计算机'&&e.target==='company:启元机器人').type,'industry');
 assert.equal(d.edges.find(e=>e.source==='鄂维南-北大数学'&&e.target==='company:深势科技').type,'industry');
 assert.ok(!d.edges.some(e=>e.source==='杨耀东-灵初智能'&&e.target==='company:逆矩阵科技'&&e.type==='founder'));
 assert.ok(d.edges.some(e=>e.source==='仉尚航-北大计算机'&&e.target==='刘家铭-北大计算机'&&e.type==='mentor'));
});
test('homepage and publisher expose the PKU map with explicit asset allowlist',()=>{
 for(const f of ['site/home.md','site/components/TalentMapLink.tsx','site/scripts/publish-talent-map.mjs','.github/workflows/deploy.yml'])assert.ok(fs.readFileSync(path.join(root,f),'utf8').includes('pku-talent-map/'),f);
 for(const f of ['index.html','app.js','style.css','data.js'])assert.ok(fs.existsSync(path.join(__dirname,'..',f)));
 assert.ok(!fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').includes('香港'));
});
