const {wikiUrl}=require('./wiki-links');
const {DIR,D,P,cards,W,H,PW}=require('./layout');const fs=require('fs'),path=require('path');
const px=72; let svg=[],overlay=[],geometry=[];

// ---------------------------------------------------------------------------
// Design tokens. Saturated ink is rationed: green = 创办, blue = 任职, amber =
// 待核, purple = 培养. Everything else is a neutral so those four read at a
// glance. Departments are told apart by position and label, not by hue.
// ---------------------------------------------------------------------------
const HEX={
 paper:'F8FAFC', surface:'FFFFFF', sunken:'F1F5F9', band:'EEF2F7',
 ink:'0F2436', ink2:'47617A', ink3:'8598A9',
 line:'E2E8F0', lineStrong:'CBD5E1',
 chip:'0F2436', onChip:'FFFFFF',
 founder:'0E9F6E', industry:'2E7FC2', pending:'C98A14', none:'94A3B8',
 mentor:'7C5CAF',
 core:'1D4E89', support:'64748B', cross:'94A3B8',
 coCoreFill:'0B3B2E', coCoreInk:'FFFFFF', coPlainFill:'E9F6F0', coPlainInk:'0B5140',
 coPendFill:'FDF6E8', coPendInk:'8A6410',
};
// Every paint is a CSS variable with a light-mode fallback, so the inline SVG
// can follow the page theme without regenerating.
const C=Object.fromEntries(Object.entries(HEX).map(([k,v])=>[k,`var(--m-${k},#${v})`]));
// Seven-step type ladder. Nothing outside this list may be passed to text().
const T={xs:11, sm:13, base:16, lg:20, xl:26, xxl:34, hero:44};
const LADDER=new Set(Object.values(T));

const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const attr=cls=>cls?` class="${cls}"`:'';

function text(t,x,y,w,h,size=T.sm,color=C.ink2,bold=false,align='center',cls=''){
 if(!LADDER.has(size))throw new Error('font-size off ladder: '+size);
 const lines=String(t).split('\n').flatMap(line=>{let rows=[],row='',width=0;for(const ch of line){const advance=size*(/[ -ÿ]/.test(ch)?.56:1);if(width+advance>w*px&&row){rows.push(row);row='';width=0;}row+=ch;width+=advance;}rows.push(row);if(rows.length>1&&rows.at(-1).length===1&&rows.at(-2).length>3){const previous=rows[rows.length-2],cut=Math.ceil((previous.length+1)/2);rows[rows.length-2]=previous.slice(0,cut);rows[rows.length-1]=previous.slice(cut)+rows.at(-1);}return rows;}),step=size*1.32,cy=(y+h/2)*px-(lines.length-1)*step/2+size*.34;
 svg.push(`<text${attr(cls)} x="${(align==='left'?x:align==='right'?x+w:x+w/2)*px}" y="${cy}" font-size="${size}" fill="${color}" font-weight="${bold?600:400}" text-anchor="${align==='left'?'start':align==='right'?'end':'middle'}">${lines.map((s,i)=>`<tspan x="${(align==='left'?x:align==='right'?x+w:x+w/2)*px}" dy="${i?step:0}">${esc(s)}</tspan>`).join('')}</text>`);
}
function rect(x,y,w,h,fill,stroke=fill,r=.06,cls='',sw=1){svg.push(`<rect${attr(cls)} x="${x*px}" y="${y*px}" width="${w*px}" height="${h*px}" rx="${r*px}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`);}
function line(x1,y1,x2,y2,col=C.lineStrong,width=.7,dash=false,arrow=false,cls=''){svg.push(`<line${attr(cls)} x1="${x1*px}" y1="${y1*px}" x2="${x2*px}" y2="${y2*px}" stroke="${col}" stroke-width="${width}"${dash?' stroke-dasharray="1 5" stroke-linecap="round"':''}${arrow?` marker-end="url(#arrow-${arrow})"`:''}/>`);}
function bubble(type,name,x,y,d,fill,stroke,width=1.3,dash=false,cls=''){svg.push(`<circle${attr(cls)} cx="${x*px}" cy="${y*px}" r="${d*px/2}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"${dash?' stroke-dasharray="3 4" stroke-linecap="round"':''}/>`);geometry.push({type,name,x:x-d/2,y:y-d/2,w:d,h:d,cx:x,cy:y});}
function node(type,name,x,y,w,h){geometry.push({type,name,x:x-w/2,y:y-h/2,w,h,cx:x,cy:y});}
const wrap=(s,n=8)=>String(s).split('\n').flatMap(t=>{let a=[];for(let i=0;i<t.length;i+=n)a.push(t.slice(i,i+n));return a;}).join('\n');

const states={founder:C.founder,industry:C.industry,pending:C.pending,none:C.none};
const arrowTokens=['mentor','pending','none'];
const defs=`<defs>${arrowTokens.map(k=>`<marker id="arrow-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C[k]}"/></marker>`).join('')}</defs>`;

// --- top strip: research entry points (title / stats / legend live in the page chrome)
text('并列研究入口：先看具身核心，再看技术支撑；交叉学科保留为独立观察入口。',.85,.44,70,.28,T.base,C.ink2,true,'left','d2');
const entries=[['感知与交互','电子 · 计算机 · 自动化'],['具身模型与学习','IIIS · AI学院 · AIR'],['控制与决策','自动化 · IIIS · 车辆'],['本体与操作','机械 · SIGS · 精仪'],['基础模型与芯片算力','计算机 · 电子 · 软件']];
entries.forEach(([t,u],i)=>{const x=.85+i*16.75;rect(x,.99,16.35,.85,C.surface,C.line,.10,'d2');rect(x,.99,.06,.85,C.core,C.core,.03,'d2');text(t,x+.30,1.10,15.8,.32,T.lg,C.ink,true,'left','d2');text(u,x+.30,1.46,15.8,.26,T.xs,C.ink3,false,'left','d3');});
text('院系上栏显示管理职务；人物内部只写清华身份。组内纵向用于展开已记录培养关系，不跨实验室比较高低。',.85,2.06,70,.26,T.sm,C.ink3,false,'left','d3');

for(const card of cards){
 rect(card.x,card.y,card.w,card.h,C.surface,C.line,.16,'',1);
 rect(card.x+.02,card.y+.02,card.w-.04,.09,C.chip,C.chip,0);
 const lab=card.dept==='AIR'?'AIR\n智能产业研究院':card.dept==='院系待核'?'清华校友\n院系待核':card.dept==='交叉信息研究院'?'IIIS\n交叉信息研究院':card.dept==='微纳电子系（历史）'?'微纳电子\n历史学籍':wrap(card.dept,7);
 bubble('department',card.dept,card.x+1.24,card.y+1.09,1.94,C.chip,C.chip,1,false,'d2');text(lab,card.x+.30,card.y+.52,1.88,1.14,T.lg,C.onChip,true,'center','d2');
 text(`${D.people.filter(p=>p.dept===card.dept).length} 位主体人物`,card.x+2.45,card.y+.26,3,.24,T.xs,C.ink3,true,'left','d3');
 if(card.head){const headLeft=card.headPerson?4.55-PW/2-.06:3.95;
  line(card.x+2.24,card.y+1.09,card.x+headLeft,card.y+1.09,C.line,1.4,false,false,'d3');text('组织管理',card.x+2.36,card.y+.76,1.4,.22,T.xs,C.ink3,false,'center','d3');
  if(card.dept==='人工智能学院'){text('院长：姚期智（人物见IIIS）',card.x+4.25,card.y+.84,7,.44,T.base,C.ink,true,'left','d3');}
  else if(!card.headPerson){const p=D.contextPeople.find(p=>p.name===card.head[0]);
   bubble('context',p.name,card.x+4.55,card.y+1.09,1.02,C.sunken,C.lineStrong,1.4,false,'d2');
   text(p.name,card.x+4.04,card.y+.78,1.02,.34,T.base,C.ink2,true,'center','d2');text(p.id,card.x+4.04,card.y+1.16,1.02,.24,T.xs,C.ink3,false,'center','d3');
   text('官网组织负责人 · 背景节点',card.x+5.55,card.y+.96,6,.32,T.xs,C.ink3,false,'left','d3');}
 }else text(card.dept==='院系待核'?'只确认清华关联；具体院系、实验室另待核实':'历史学籍归属；不套用现任管理关系',card.x+2.6,card.y+.80,12,.64,T.sm,C.ink3,false,'left','d3');
 if(card.dept==='自动化系'){bubble('platform','EIR',card.x+9.1,card.y+1.09,1.06,C.sunken,C.lineStrong,1.2,false,'d2');text('EIR',card.x+8.57,card.y+.80,1.06,.30,T.base,C.ink2,true,'center','d2');text('跨院平台',card.x+8.57,card.y+1.16,1.06,.24,T.xs,C.ink3,false,'center','d3');text('张涛：院长\n何潇 / 孙富春：副院长',card.x+9.95,card.y+.76,3.2,.62,T.xs,C.ink3,false,'left','d3');}
 text(D.deptThemes[card.dept],card.x+2.6,card.y+1.88,14.3,.28,T.sm,C.ink2,true,'left','d3');

 for(const g of card.groups){rect(g.x,g.y,g.w,g.h,C.paper,C.line,.12,'d2');
  if(g.lab){const m=D.labMeta[g.name],sc=m.scope==='核心'?C.core:m.scope==='支撑'?C.support:C.cross;
   bubble('lab',g.name,g.x+.70,g.y+.64,1.02,C.surface,sc,1.3,false,'d2');
   let t=g.name==='VAR / EVAR Lab'?'VAR / EVAR\nLab':g.name==='AI Theory Group'?'AI Theory\nGroup':wrap(g.name,/^[\x00-\x7F]+$/.test(g.name)?12:6);
   text(t,g.x+.11,g.y+.33,1.18,.62,T.xs,sc,true,'center','d2 t-lab');
   text(wrap(m.cn+(m.explanatory?'†':''),17),g.x+1.40,g.y+.22,g.w-1.54,.62,T.base,C.ink,true,'left','d2 t-labcn');
   text(m.scope==='核心'?'具身核心':'相关'+m.scope,g.x+1.40,g.y+1.04,1.15,.24,T.xs,sc,true,'left','d3');
   text(m.direction,g.x+2.62,g.y+1.04,g.w-2.77,.24,T.xs,C.ink3,false,'left','d3');
   if(g.name==='KEG')text('主任归属待核；核心教授并列',g.x+1.40,g.y+1.32,g.w-1.6,.20,T.xs,C.pending,false,'left','d3');
  } else text(g.name,g.x+.16,g.y+.12,g.w-.32,.28,T.sm,C.ink2,true,'left','d2');
  for(const b of g.bands){rect(g.x+.07,g.y+b.y,g.w-.14,b.h,C.band,C.band,.04,'d3');rect(g.x+.07,g.y+b.y,.04,b.h,C.lineStrong,C.lineStrong,0,'d3');text(b.label,g.x+.19,g.y+b.y+.07,g.w-.36,.24,T.xs,C.ink3,true,'left','d3');}
  if(!g.members.length)text('原表暂无已确认成员',g.x+.16,g.y+1.62,g.w-.32,.26,T.xs,C.ink3,false,'center','d3');
 }
}

// Only documented within-group links get lines; other relationships are written with full names.
for(const [a,b,l,t] of D.mentor){const p=P[a],q=P[b];if(!p||!q||p.group!==q.group||p.group.startsWith('HEAD'))continue;const g=cards.flatMap(c=>c.groups).find(g=>g.key===p.group);const cok=t==='mentor'?'mentor':t==='pending'?'pending':'none',co=C[cok];
 if(Math.abs(p.y-q.y)<.1){line(p.x+p.w/2,p.y-.12,q.x-q.w/2,q.y-.12,co,1.6,t!=='mentor',cok,'d3');}
 // Cross-row links travel in the gutters between rows, never across a card.
 // The departure drops from the source's top-left corner rather than its centre:
 // a full-width leg over the card read as a box drawn around it.
 else{const rail=g.x+.12,dash=t!=='mentor';
  const exit=p.x-p.w/2+.18,top=q.y-q.h/2-.17,startY=p.y-p.h/2-.11;
  line(exit,p.y-p.h/2,exit,startY,co,1.6,dash,false,'d3');
  line(exit,startY,rail,startY,co,1.6,dash,false,'d3');
  line(rail,startY,rail,top,co,1.6,dash,false,'d3');
  line(rail,top,q.x,top,co,1.6,dash,false,'d3');
  line(q.x,top,q.x,q.y-q.h/2,co,1.6,dash,cok,'d3');}
}
for(const c of D.instances){const p=P[c.person];const color=c.pending?C.pending:c.historical?C.none:C.founder;
 if(p.group.startsWith('HEAD')&&p.bubbles.indexOf(c)>0){let rail=p.y-p.h/2-.18;line(p.x,p.y-p.h/2,p.x,rail,color,1.5,false,false,'d2');line(p.x,rail,c.x,rail,color,1.5,false,false,'d2');line(c.x,rail,c.x,c.y-c.d/2,color,1.5,false,false,'d2');}
 else line(p.x+p.w/2,p.y,c.x-c.d/2,c.y,color,1.5,c.pending||c.historical,false,'d2');}

// --- person nodes: rounded cards, status carried by an inset accent bar
for(const p of D.people){
 const st=states[p.state],x0=p.x-p.w/2,y0=p.y-p.h/2;
 rect(x0,y0,p.w,p.h,C.surface,C.line,.13,'d2',1.2);
 rect(x0+.11,y0+.15,.10,p.h-.30,st,st,.05,'d2');
 node('person',p.name,p.x,p.y,p.w,p.h);
 const tx=x0+.30,tw=p.w-.42;
 const name=p.name.replace(/（.*）/,'');
 text(name,tx,y0+.09,tw,.30,T.lg,C.ink,true,'left','d2 t-name');
 const qualifier=p.name==='张涛（EIR院长）'?' · EIR院长':p.name==='刘洋（AIR）'?' · AIR':'';
 text(p.identity+qualifier,tx,y0+.41,tw,.42,T.sm,C.ink2,false,'left','d3');
 if(p.notes.length)text(p.notes.join('\n'),p.noteX,p.noteY,p.noteW,p.notes.length*.22,T.xs,C.ink3,false,'left','d3');
}

for(const c of D.instances){const fill=c.pending?C.coPendFill:c.historical?C.sunken:c.core?C.coCoreFill:C.coPlainFill,stroke=c.pending?C.pending:c.historical?C.lineStrong:c.core?C.coCoreFill:C.founder,tc=c.core&&!c.pending&&!c.historical?C.coCoreInk:c.pending?C.coPendInk:C.coPlainInk;
 bubble('company',c.name+'@'+c.person,c.x,c.y,c.d,fill,stroke,1.4,c.pending||c.historical,'d2');
 text(wrap(c.name,/^[\x00-\x7F]+$/.test(c.name)?12:c.name.length===5?3:4),c.x-c.d*.49,c.y-c.d*.30,c.d*.98,c.d*.60,c.name.length>9?T.sm:T.base,tc,true,'center','d2');
 let role=c.role.replace('联合创始人','联创').replace('历史联合创始人','历史联创');
 text(wrap(role,10),c.x-.72,c.y+c.d/2+.13,1.44,.54,T.xs,c.pending?C.pending:C.ink3,false,'center','d3');
}

text('† 中文译名或说明名，并非已确认的官方中文名。方向标签为阅读归类；培养、历史任职及待核按证据标注。未见公开创业不等于确认未创业。',.85,H-.60,63,.26,T.sm,C.ink3,false,'left','d3');
text('AA计划 · 研究主线与身份版',W-9.3,H-.62,8.3,.30,T.sm,C.ink3,true,'right','d3');

// --- overview layer: the only thing drawn when the map is zoomed far out.
// Sized for the far-zoom tier (~15%), so it is deliberately off the reading ladder.
const ovText=(t,cx,cy,size,color)=>overlay.push(`<text class="ov" x="${cx*px}" y="${cy*px+size*.36}" font-size="${size}" fill="${color}" font-weight="600" text-anchor="middle">${esc(t)}</text>`);
for(const card of cards){
 const n=D.people.filter(p=>p.dept===card.dept),f=n.filter(p=>p.state==='founder').length;
 const label=card.dept==='交叉信息研究院'?'IIIS 交叉信息研究院':card.dept==='AIR'?'AIR 智能产业研究院':card.dept;
 ovText(label,card.x+card.w/2,card.y+1.5,132,C.ink);
 ovText(`${n.length} 人 · ${f} 位已创业`,card.x+card.w/2,card.y+3.3,88,f?C.founder:C.ink3);
}

const doc=`<svg id="map" aria-label="清华大学具身人才地图" xmlns="http://www.w3.org/2000/svg" width="${W*px}" height="${H*px}" viewBox="0 0 ${W*px} ${H*px}" font-family="PingFang SC,Arial">${defs}<rect width="${W*px}" height="${H*px}" fill="${C.paper}"/>${svg.join('\n')}\n<g id="overview">${overlay.join('\n')}</g></svg>`;
const items=geometry.filter(g=>['person','context','company','lab','department','platform'].includes(g.type)).map(g=>{
 let name=g.name, info=[], urls=[], links=[];
 if(g.type==='person'){const p=P[name];info=[p.dept,p.identity,p.detail,...p.notes,...(p.extraInfo||[])];links=p.bubbles.map(c=>({label:`${c.name}｜${c.role}${c.historical?'（历史参与）':''}`,target:c.name+'@'+c.person}));}
 else if(g.type==='company'){const c=D.instances.find(c=>c.name+'@'+c.person===name);name=c.name; info=[...(c.historical?['历史参与，以图中标记为准']:[]),...(c.extraInfo||[])];urls=c.urls||[];links=[{label:`${c.person}｜${c.role}`,target:c.person}];}
 else if(g.type==='lab'){const m=D.labMeta[name]; info=m?[m.cn,m.scope,m.direction,...(m.explanatory?['中文为译名或说明名']:[])]:[];}
 else if(g.type==='context'){const p=D.contextPeople.find(p=>p.name===name);info=[p?.id||'组织负责人'];}
 return {id:g.name,name,kind:g.type,wikiUrl:wikiUrl(g.type,name,P[name]?.path),info,urls,links,x:g.x*px,y:g.y*px,w:g.w*px,h:g.h*px};
});
const stats={people:D.people.length,heads:D.contextPeople.length,companies:new Set(D.instances.map(c=>c.name)).size,bubbles:D.instances.length};
const data={width:W*px,height:H*px,stats,items,cards:cards.map(c=>({name:c.dept,kind:'department',isCard:true,info:[D.deptThemes[c.dept]],wikiUrl:wikiUrl('department',c.dept),x:c.x*px,y:c.y*px,w:c.w*px,h:c.h*px}))};
const target=path.join(DIR,'../index.html');let html=fs.readFileSync(target,'utf8');
html=html.replace(/<svg id="map"[\s\S]*?<\/svg>/,()=>doc).replace(/(<script id="map-data"[^>]*>)[\s\S]*?(<\/script>)/,(_,a,b)=>a+JSON.stringify(data).replace(/</g,'\\u003c')+b);
fs.writeFileSync(target,html);console.log(JSON.stringify({...stats,width:data.width,height:data.height}));
