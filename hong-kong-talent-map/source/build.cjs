const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const yaml=require('../../site/node_modules/js-yaml');
const selection=require('./selection.cjs');
const root=path.resolve(__dirname,'../..');
const tracked=new Set(execFileSync('git',['ls-files','-z','--','wiki'],{cwd:root,encoding:'utf8'}).split('\0'));
const plain=s=>String(s||'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[*`]/g,'').trim();
const slug=file=>file.slice(0,-3).split('/').map(s=>encodeURIComponent(s.replace(/\s/g,'-').replace(/&/g,'-and-').replace(/%/g,'-percent').replace(/[?#]/g,''))).join('/');
const cache=new Map();
function article(file){
 if(cache.has(file))return cache.get(file);
 const text=fs.readFileSync(path.join(root,file),'utf8');
 const meta=yaml.load(text.split('---')[1]);
 const paragraph=text.match(/## 一句话判断\s*\n([^#]+?)(?=\n##|\n> |$)/)?.[1]?.trim();
 const rawPaths=[...text.matchAll(/\]\(([^)]+\.md)\)/g)].map(m=>path.resolve(path.dirname(path.join(root,file)),m[1])).filter(p=>p.startsWith(path.join(root,'raw/'))&&fs.existsSync(p));
 const rawUrls=rawPaths.flatMap(p=>{const t=fs.readFileSync(p,'utf8');return [...t.matchAll(/(?:Source|URL|source_url|来源链接)[：:]\s*["']?(https?:\/\/[^\s<>"']+)/g)].map(m=>m[1]);});
 const direct=[...text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g)].map(m=>({label:plain(m[1]),url:m[2]}));
 const sources=[...direct,...rawUrls.map(url=>({label:'公开来源',url}))].filter((s,i,a)=>a.findIndex(x=>x.url===s.url)===i).slice(-8);
 const date=meta.last_verified;
 const value={text,meta,path:file,name:plain(meta.name),summary:plain(paragraph||''),date:date instanceof Date?date.toISOString().slice(0,10):String(date||''),sources,wikiUrl:tracked.has(file)?`../${slug(file)}`:null};
 cache.set(file,value);return value;
}
const publicFields=a=>({path:a.path,name:a.name,summary:a.summary,date:a.date,sources:a.sources,wikiUrl:a.wikiUrl});
const people=new Map(), companies=new Map();
const groups=selection.groups.map(g=>{
 const a=g.synthetic?null:article(`wiki/orgs/${g.file}.md`);
 const group={...g,members:[],...(a?publicFields(a):{}),name:g.title,parent:a?.meta.parent||'阅读分组 · 不表示同一实验室',note:''};
 if(!g.members.length)group.note=a?.summary||'研究平台；点击查看合作与组织边界。';
 if(g.synthetic)group.note='按研究或职业关系聚合；具体归属见人物详情。';
 for(const file of g.members){
  const p=article(`wiki/people/${file}.md`);
  if(a&&!a.text.includes(`${file}.md`))throw new Error(`Unproven group membership: ${file} / ${g.file}`);
  if(people.has(file))throw new Error(`Duplicate primary person: ${file}`);
  const override=selection.overrides[file]||{};
  people.set(file,{...publicFields(p),id:file,kind:'person',school:g.school,group:g.id,domain:g.domain,
   aliases:p.meta.aliases||[],role:({professor:'教研人员',student:'博士生',founder:'创业者',researcher:'研究人员'}[p.meta.role_type]||'教研人员'),
   affiliation:plain((p.meta.affiliations||[p.meta.current_affiliation||'']).join('；')),
   ...override,domains:override.domains||selection.personDomains[override.name||p.name]||[g.domain]});
  group.members.push(file);
 }
 return group;
});
const edges=[];
for(const [person,file,label,type,quote] of selection.companyRelations){
 const c=article(`wiki/companies/${file}.md`),p=people.get(person);
 if(!p)throw new Error(`Missing person ${person}`);
 const a=article(p.path);
 const explicitQuote=p.name==='赵恒爽'&&file==='银河通用'?'以及银河通用、北大研究者':null;
 if((quote&&!a.text.includes(quote))||(!a.text.includes(`${file}.md`)&&!(explicitQuote&&a.text.includes(explicitQuote))&&!(quote&&a.text.includes(quote))))throw new Error(`Missing company evidence: ${person}/${file}`);
 const id=`company:${file}`;
 if(!companies.has(id))companies.set(id,{...publicFields(c),id,kind:'company'});
 edges.push({source:person,target:id,label,type,evidence:[p.path,c.path],...(quote?{quote}:{})});
}
for(const [org,file,label,type,quote] of selection.groupCompanyRelations){
 const g=groups.find(g=>!g.synthetic&&g.file===org),c=article(`wiki/companies/${file}.md`);
 if(!g)throw new Error(`Missing organization: ${org}`);
 const a=article(g.path);
 if(!a.text.includes(`${file}.md`)||!quote||!a.text.includes(quote))throw new Error(`Missing organization company evidence: ${org}/${file}`);
 const id=`company:${file}`;
 if(!companies.has(id))companies.set(id,{...publicFields(c),id,kind:'company'});
 edges.push({source:g.id,target:id,label,type,evidence:[g.path,c.path],quote});
}
for(const [source,target,label,type,evidence,quote] of selection.relationships){
 const file=`wiki/people/${evidence}.md`;
 if(!people.has(source)||!people.has(target)||!article(file).text.includes(quote))throw new Error(`Missing relationship evidence: ${source}/${target}/${quote}`);
 edges.push({source,target,label,type,evidence:[file],quote});
}
const affiliations=selection.affiliations.map(([person,school,label,evidence,quote])=>{
 const file=`wiki/people/${evidence}.md`;
 if(!people.has(person)||!article(file).text.includes(quote))throw new Error(`Missing affiliation evidence: ${person}`);
 return {person,school,label,evidence:[file],quote};
});
const schools=selection.schools.map(s=>({...publicFields(article(s.path)),...s,summary:s.theme}));
const data={updated:'2026-09-11',title:'香港高校人才地图',domains:[['perception','感知与空间智能'],['learning','具身模型与学习'],['control','控制与自主系统'],['hardware','本体与操作'],['foundation','基础模型与算力'],['medical','医疗与脑机交叉'],['speech','语音与生成AI'],['energy','能源与材料'],['science','AI科学实验']],schools,groups,people:[...people.values()],companies:[...companies.values()],edges,affiliations};
fs.writeFileSync(path.join(__dirname,'../data.js'),`// Generated by source/build.cjs; edit the selection, then rebuild.\nwindow.HK_MAP = ${JSON.stringify(data,null,2).replace(/</g,'\\u003c')};\n`);
console.log(`Hong Kong map: ${schools.length} schools, ${groups.length} reading groups, ${people.size} unique people, ${companies.size} companies, ${edges.length} relationships.`);
