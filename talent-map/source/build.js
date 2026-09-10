const {DIR,D,P,cards,W,H}=require('./layout');const fs=require('fs'),path=require('path');
const px=72; let svg=[],geometry=[];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function text(t,x,y,w,h,size=12,color='223F55',bold=false,align='center'){

 size = Math.max(size,12);
 const lines=String(t).split('\n').flatMap(line=>{let rows=[],row='',width=0;for(const ch of line){const advance=size*(/[\u0000-\u00ff]/.test(ch)?.56:1);if(width+advance>w*px&&row){rows.push(row);row='';width=0;}row+=ch;width+=advance;}rows.push(row);if(rows.length>1&&rows.at(-1).length===1&&rows.at(-2).length>3){const previous=rows[rows.length-2],cut=Math.ceil((previous.length+1)/2);rows[rows.length-2]=previous.slice(0,cut);rows[rows.length-1]=previous.slice(cut)+rows.at(-1);}return rows;}),step=size*1.30,cy=(y+h/2)*px-(lines.length-1)*step/2+size*.34;
 svg.push(`<text x="${(align==='left'?x:x+w/2)*px}" y="${cy}" font-family="PingFang SC,Arial" font-size="${size}" fill="#${color}" font-weight="${bold?600:400}" text-anchor="${align==='left'?'start':'middle'}">${lines.map((s,i)=>`<tspan x="${(align==='left'?x:x+w/2)*px}" dy="${i?step:0}">${esc(s)}</tspan>`).join('')}</text>`);
}
function line(x1,y1,x2,y2,col='BDCAD7',width=.7,dash=false,arrow=false){svg.push(`<line x1="${x1*px}" y1="${y1*px}" x2="${x2*px}" y2="${y2*px}" stroke="#${col}" stroke-width="${width}" ${dash?'stroke-dasharray="4 3"':''}/>`);}
function rect(x,y,w,h,fill,stroke=fill,r=.06){svg.push(`<rect x="${x*px}" y="${y*px}" width="${w*px}" height="${h*px}" rx="${r*px}" fill="#${fill}" stroke="#${stroke}" stroke-width=".5"/>`);}
function bubble(type,name,x,y,d,fill,stroke,width=1.3,dash=false){svg.push(`<circle cx="${x*px}" cy="${y*px}" r="${d*px/2}" fill="#${fill}" stroke="#${stroke}" stroke-width="${width}" ${dash?'stroke-dasharray="4 3"':''}/>`);geometry.push({type,name,x:x-d/2,y:y-d/2,w:d,h:d,cx:x,cy:y});}
const wrap=(s,n=8)=>String(s).split('\n').flatMap(t=>{let a=[];for(let i=0;i<t.length;i+=n)a.push(t.slice(i,i+n));return a;}).join('\n');
const states={founder:'159274',industry:'3788BE',pending:'CDA044',none:'A8B5C4'},tierColors=['748EA7','748EA7','748EA7','748EA7'],tierFills=['F2F6FB','F5F8FC','F5F8FC','F5F8FC'],tierLabels=[];
const cols=['416CA1','7163A3','298A8E','4D8876','9C7950'];
const deptColor=dep=>cols[{'交叉信息研究院':0,'AIR':0,'计算机系':1,'人工智能学院':1,'电子工程系':2,'深圳国际研究生院':2,'自动化系':3,'机械工程系':3}[dep]??4];
rect(0,0,W,3.18,'112E45');text('清华人才地图',.85,.47,18,.65,42,'FFFFFF',true,'left');text('具身研究主线 × 清华身份 × 公司角色',.9,1.32,25,.47,24,'BDD4E3',false,'left');text(`${D.people.length}位主体人物 + ${D.contextPeople.length}位组织负责人  ·  ${new Set(D.instances.map(c=>c.name)).size}家公司 / 平台  ·  ${D.instances.length}个具名关系气泡`,.9,2.12,31,.34,16,'D5E5EF',false,'left');
bubble('university','清华大学',35,1.4,1.60,'284E6A','95B9CE',1.4);text('清华\n大学',34.3,.92,1.4,.95,25,'FFFFFF',true);
[['159274','创办 / 历史创办'],['3788BE','任职 / 顾问 / 合作'],['A8B5C4','库内未见公开创业'],['CDA044','创业线索待核']].forEach(([c,t],i)=>{let x=39.2+(i%2)*15.8,y=.68+Math.floor(i/2)*.55;bubble('legend',t,x,y,.22,'112E45',c,2);text(t,x+.24,y-.17,15,.33,13,'E1ECF4',false,'left');});
text('同名公司可在多位核心人物旁出现；历史角色单独标注。',39,1.93,31,.31,14,'FFFFFF',true,'left');text('灰线：归属  ·  紫线：培养  ·  虚线：合作 / 待核',39,2.43,31,.25,12,'B4CBDC',false,'left');
text('并列研究入口：先看具身核心，再看技术支撑；交叉学科保留为独立观察入口。',.85,3.31,70,.25,13,'607B90',false,'left');
 const entries=[['感知与交互','电子 · 计算机 · 自动化','268E89'],['具身模型与学习','IIIS · AI学院 · AIR','268E89'],['控制与决策','自动化 · IIIS · 车辆','268E89'],['本体与操作','机械 · SIGS · 精仪','268E89'],['基础模型与芯片算力','计算机 · 电子 · 软件','537EA4']];entries.forEach(([t,u,c],i)=>{const x=.8+i*14.12;rect(x,3.79,13.78,.85,'EAF1F6','D6E2EC',.08);text(t,x+.2,3.89,13.38,.3,17,c,true);text(u,x+.2,4.28,13.38,.22,11,'6E889C');});
 text('院系上栏显示管理职务；人物内部只写清华身份。组内纵向用于展开已记录培养关系，不跨实验室比较高低。',.85,4.83,70,.24,12,'70869B',false,'left');
for(const card of cards){const col=deptColor(card.dept);rect(card.x,card.y,card.w,card.h,'FFFFFF','DCE4EE',.13);rect(card.x+.02,card.y+.02,card.w-.04,.07,col,col,0);
 const lab=card.dept==='AIR'?'AIR\n智能产业研究院':card.dept==='院系待核'?'清华校友\n院系待核':card.dept==='交叉信息研究院'?'IIIS\n交叉信息研究院':card.dept==='微纳电子系（历史）'?'微纳电子\n历史学籍':wrap(card.dept,7);
 bubble('department',card.dept,card.x+1.16,card.y+1.07,1.87,col,col);text(lab,card.x+.24,card.y+.50,1.84,1.14,22,'FFFFFF',true);
 text(`${D.people.filter(p=>p.dept===card.dept).length} 位主体人物`,card.x+2.33,card.y+.24,3,.23,11,col,true,'left');
 if(card.head){line(card.x+2.09,card.y+1.07,card.x+3.58,card.y+1.07,'AFBFCE',1);text('组织管理',card.x+2.20,card.y+.75,1.3,.2,9,'7D90A2');
  if(card.dept==='人工智能学院'){text('院长：姚期智（人物见IIIS）',card.x+3.85,card.y+.83,7,.43,15,'385875',true,'left');}
  else if(!card.headPerson){const p=D.contextPeople.find(p=>p.name===card.head[0]);bubble('context',p.name,card.x+4.1,card.y+1.05,.98,'F1F4F8','8DA2B4',1.6);text(p.name,card.x+3.62,card.y+.75,.96,.35,15,'2E506B',true);text(p.id,card.x+3.62,card.y+1.14,.96,.24,9,'73899B');text('官网组织负责人 · 背景节点',card.x+5.05,card.y+.93,6,.32,11,'8B9DAD',false,'left');}
 }else text(card.dept==='院系待核'?'只确认清华关联；具体院系、实验室另待核实':'历史学籍归属；不套用现任管理关系',card.x+2.4,card.y+.77,12,.64,13,'7E91A2',false,'left');
 if(card.dept==='自动化系'){bubble('platform','EIR',card.x+8.3,card.y+1.05,1.02,'EEF3F8','7F9AB0',1.2);text('EIR',card.x+7.84,card.y+.76,.92,.3,18,'4F728E',true);text('跨院平台',card.x+7.85,card.y+1.13,.9,.22,8,'7992A6');text('张涛：院长\n何潇 / 孙富春：副院长',card.x+9.05,card.y+.74,2.75,.61,11,'6D8599',false,'left');}
 text(D.deptThemes[card.dept],card.x+2.4,card.y+1.85,14.3,.27,12.5,col,true,'left');
 for(const g of card.groups){rect(g.x,g.y,g.w,g.h,'FBFCFE','DCE5EF',.10);
  if(g.lab){const m=D.labMeta[g.name],sc=m.scope==='核心'?'268E89':m.scope==='支撑'?'547FA5':'8E8C8A';bubble('lab',g.name,g.x+.66,g.y+.62,.97,'ECF2F8',sc,1);let t=g.name==='VAR / EVAR Lab'?'VAR / EVAR\nLab':g.name==='AI Theory Group'?'AI Theory\nGroup':wrap(g.name,/^[\x00-\x7F]+$/.test(g.name)?12:6);text(t,g.x+.09,g.y+.31,1.14,.62,g.name.length>15?8:9.2,col,true);text(wrap(m.cn+(m.explanatory?'†':''),17),g.x+1.31,g.y+.21,g.w-1.45,.62,17,'31516B',true,'left');
   text(m.scope==='核心'?'具身核心':'相关'+m.scope,g.x+1.31,g.y+1.03,1.05,.23,9,sc,true,'left');text(m.direction,g.x+2.38,g.y+1.03,g.w-2.53,.23,9,sc,false,'left');
   if(g.name==='KEG')text('主任归属待核；核心教授并列',g.x+1.31,g.y+1.32,g.w-1.5,.18,7.7,'9B864C',false,'left');
  } else text(g.name,g.x+.14,g.y+.11,g.w-.28,.26,12,'637C91',true,'left');
  for(const b of g.bands){rect(g.x+.06,g.y+b.y,g.w-.12,b.h,tierFills[b.level],tierFills[b.level],.02);rect(g.x+.06,g.y+b.y,.035,b.h,tierColors[b.level],tierColors[b.level],0);text(b.label,g.x+.17,g.y+b.y+.065,g.w-.32,.23,10,tierColors[b.level],true,'left');}
  if(!g.members.length)text('原表暂无已确认成员',g.x+.15,g.y+1.60,g.w-.3,.25,10,'8DA0B1');
 }
}
// Only documented within-group links get lines; other relationships are written with full names.
for(const [a,b,l,t] of D.mentor){const p=P[a],q=P[b];if(!p||!q||p.group!==q.group||p.group.startsWith('HEAD'))continue;const g=cards.flatMap(c=>c.groups).find(g=>g.key===p.group);const co=t==='mentor'?'8C6DA5':t==='pending'?'C39B4F':'9CAEBB';
 if(Math.abs(p.y-q.y)<.1){line(p.x+p.d/2,p.y-.10,q.x-q.d/2,q.y-.10,co,.9,t!=='mentor',true);}
 else{const rail=g.x+.11,top=q.y-q.d/2-.15;const startY=p.y-p.d/2-.10;line(p.x,p.y-p.d/2,p.x,startY,co,.9,t!=='mentor');line(p.x,startY,rail,startY,co,.9,t!=='mentor');line(rail,startY,rail,top,co,.9,t!=='mentor');line(rail,top,q.x,top,co,.9,t!=='mentor');line(q.x,top,q.x,q.y-q.d/2,co,.9,t!=='mentor',true);}
}
for(const c of D.instances){const p=P[c.person];const color=c.pending?'C9A358':c.historical?'8BA0B6':'7196A8';if(p.group.startsWith('HEAD')&&p.bubbles.indexOf(c)>0){let rail=p.y-.51;line(p.x,p.y-p.d/2,p.x,rail,color,1.1);line(p.x,rail,c.x,rail,color,1.1);line(c.x,rail,c.x,c.y-c.d/2,color,1.1);}else line(p.x+p.d/2,p.y,c.x-c.d/2,c.y,color,1.1,c.pending||c.historical);}
for(const p of D.people){let d=1.20;p.d=d;bubble('person',p.name,p.x,p.y,d,'FFFFFF',states[p.state],2.1,p.state==='pending');
 let n=p.name==='张涛（EIR院长）'?'张涛\n自动化 / EIR':p.name==='刘洋（AIR）'?'刘洋\nAIR':p.name;
 text(n,p.x-d*.48,p.y-(n.includes('\n')?.51:.43),d*.96,.36,n.includes('\n')?13.5:p.name==='Haofei Lu'?16:20.3,'1B4059',true);
 let id=p.identity;text(id,p.x-d*.45,p.y+.02,d*.90,.45,10.5,'4E687D');
 if(p.notes.length)text(p.notes.join('\n'),p.noteX,p.noteY,p.noteW,p.notes.length*.22,10,'4E687D',false,'left');
}
for(const c of D.instances){const fill=c.pending?'FFF9EC':c.historical?'ECF2F8':c.core?'193F5A':'E6F2F2',stroke=c.pending?'CBA052':c.historical?'7895AE':c.core?'193F5A':'71A3A7',tc=c.core&&!c.pending&&!c.historical?'FFFFFF':c.pending?'947438':'416A82';
 bubble('company',c.name+'@'+c.person,c.x,c.y,c.d,fill,stroke,1.25,c.pending||c.historical);
 text(wrap(c.name,/^[\x00-\x7F]+$/.test(c.name)?12:c.name.length===5?3:4),c.x-c.d*.49,c.y-c.d*.30,c.d*.98,c.d*.60,c.name.length>9?13:15,tc,true);
 let role=c.role.replace('联合创始人','联创').replace('历史联合创始人','历史联创').replace('首席科学家','首席科学家');
 text(wrap(role,10),c.x-.69,c.y+c.d/2+.12,1.38,.54,10,c.pending?'AA8745':'4E687D');
}
text('† 中文译名或说明名，并非已确认的官方中文名。方向标签为阅读归类；培养、历史任职及待核按证据标注。未见公开创业不等于确认未创业。',.85,H-.58,63,.25,12,'74899B',false,'left');text('AA计划 · 研究主线与身份版',62.7,H-.6,8.3,.29,13,'526F87',true,'right');

const doc=`<svg id="map" aria-label="清华大学具身人才地图" xmlns="http://www.w3.org/2000/svg" width="${W*px}" height="${H*px}" viewBox="0 0 ${W*px} ${H*px}"><rect width="100%" height="100%" fill="#F4F6FA"/>${svg.join('\n')}</svg>`;
const items=geometry.filter(g=>['person','context','company','lab','department','platform'].includes(g.type)).map(g=>{
 let name=g.name, info=[], urls=[];
 if(g.type==='person'){const p=P[name];info=[p.dept,p.identity,p.detail,...p.notes,...p.bubbles.map(c=>`${c.name}｜${c.role}${c.historical?'（历史参与）':''}`),...(p.extraInfo||[])];}
 else if(g.type==='company'){const c=D.instances.find(c=>c.name+'@'+c.person===name);name=c.name; info=[`${c.person}｜${c.role}`,...(c.historical?['历史参与，以图中标记为准']:[]),...(c.extraInfo||[])];urls=c.urls||[];}
 else if(g.type==='lab'){const m=D.labMeta[name]; info=m?[m.cn,m.scope,m.direction,...(m.explanatory?['中文为译名或说明名']:[])]:[];}
 else if(g.type==='context'){const p=D.contextPeople.find(p=>p.name===name);info=[p?.id||'组织负责人'];}
 return {name,kind:g.type,info,urls,x:g.x*px,y:g.y*px,w:g.w*px,h:g.h*px};
});
const data={width:W*px,height:H*px,items,cards:cards.map(c=>({name:c.dept,x:c.x*px,y:c.y*px,w:c.w*px,h:c.h*px}))};
const target=path.join(DIR,'../index.html');let html=fs.readFileSync(target,'utf8');
html=html.replace(/<svg id="map"[\s\S]*?<\/svg>/,()=>doc).replace(/(<script id="map-data"[^>]*>)[\s\S]*?(<\/script>)/,(_,a,b)=>a+JSON.stringify(data).replace(/</g,'\\u003c')+b);
fs.writeFileSync(target,html);console.log(JSON.stringify({people:D.people.length,companies:new Set(D.instances.map(c=>c.name)).size,bubbles:D.instances.length,width:data.width,height:data.height}));
