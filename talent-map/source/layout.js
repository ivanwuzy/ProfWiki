const fs=require('fs'),path=require('path');
const DIR=__dirname,D=JSON.parse(fs.readFileSync(path.join(DIR,'map_data.json'),'utf8')),P=Object.fromEntries(D.people.map(p=>[p.name,p]));
const laneDept={'IIIS':'交叉信息研究院','AI学院':'人工智能学院','AIR':'AIR','计算机':'计算机系','电子':'电子工程系','自动化':'自动化系','机械':'机械工程系','SIGS':'深圳国际研究生院'};
const ownerLab=l=>laneDept[l[0]]||({'智能绿色车辆国重室':'车辆与运载学院','机器学习课题组':'软件学院','CBICR':'精密仪器系','神经工程实验室':'生物医学工程学院','SUNIST':'工程物理系','REAL Lab':'工程物理系'}[l[1]]);
const notes=p=>[...(p.responsibility?[p.responsibility]:[]),...p.mentorNotes,...p.companyNotes].flatMap(t=>{let a=[];for(let i=0;i<t.length;i+=15)a.push(t.slice(i,i+15));return a;});
for(const p of D.people){p.bubbles=D.instances.filter(c=>c.person===p.name);p.notes=notes(p);}
function arrangeGroup(g){
 const ncol=g.full?6:2,cw=(g.w-.24)/ncol;let y=g.lab?1.48:.46;g.bands=[];
 const depth=Object.fromEntries(g.members.map(p=>[p.name,p.currentFaculty?0:1]));
 for(let k=0;k<g.members.length;k++)for(const [a,b,l,t] of D.mentor){if(a in depth&&b in depth&&t!=='collab')depth[b]=Math.max(depth[b],depth[a]+1);}
 g.members.forEach(p=>p.displayDepth=depth[p.name]);
 for(const lv of [...new Set(Object.values(depth))].sort((a,b)=>a-b)){
  const sk=p=>p.identity.includes('院士')?0:/负责人|所长|带头人|创立者/.test(p.responsibility)?1:p.identity.includes('教授')&&!/副|助理/.test(p.identity)?2:3;
  const members=g.members.filter(p=>depth[p.name]===lv).sort((a,b)=>sk(a)-sk(b));if(!members.length)continue;
  let by=y;y+=.30;
  for(let i=0;i<members.length;i+=ncol){
   const row=members.slice(i,i+ncol);let mh=0;
   row.forEach((p,j)=>{
    const nc=p.bubbles.length,halfSpan=Math.max(0,nc-1)*.83,offset=.74+halfSpan;
    p.x=.16+cw*j+.59;p.y=y+offset;p.d=1.20;p.group=g.key;
    p.bubbles.forEach((c,k)=>{c.x=.16+cw*j+1.89;c.y=p.y+(nc>1?(k-(nc-1)/2)*1.66:0);c.d=1.0;});
    p.noteX=.16+cw*j;p.noteY=p.y+halfSpan+(nc?1.20:.78);p.noteW=cw-.10;
    mh=Math.max(mh,p.noteY-y+p.notes.length*.22+.13);
   });y+=mh+.10;
  }
  g.bands.push({level:lv,y:by,h:y-by,label:lv===0?'教研人员｜身份见人物':members.some(p=>p.currentFaculty)?'培养线索｜保留现任身份':'研究培养成员与校友｜不代表职级'});y+=.07;
 }
 if(!g.members.length)y+=.48;
 g.h=y+.08;
}
const order=['交叉信息研究院','计算机系','电子工程系','自动化系','人工智能学院','机械工程系','AIR','深圳国际研究生院','院系待核','车辆与运载学院','工程物理系','精密仪器系','软件学院','生物医学工程学院','物理系','微纳电子系（历史）'];
const fixedColumns={"交叉信息研究院":{"col":0,"groups":{"交叉信息研究院/ISR Lab":0,"交叉信息研究院/VAR / EVAR Lab":1,"交叉信息研究院/TEA Lab":2,"交叉信息研究院/MARS Lab":2,"交叉信息研究院/3DVICI Lab":0,"交叉信息研究院/AI Theory Group":1,"交叉信息研究院/Embryo Labs":2,"交叉信息研究院/IDEAL Lab":0,"交叉信息研究院/李建课题组":2,"交叉信息研究院/徐葳课题组":1}},"计算机系":{"col":1,"groups":{"计算机系/TSAIL":0,"计算机系/THUNLP":1,"计算机系/KEG":2,"计算机系/智能技术与系统实验室":2,"计算机系/人机交互与媒体集成所":0}},"电子工程系":{"col":2,"groups":{"电子工程系/NICS-EFC":0,"电子工程系/Sigma Lab":1,"电子工程系/视觉计算实验室":2,"电子工程系/计算机视觉与具身研究室":1,"电子工程系/SATLab":2}},"自动化系":{"col":3,"groups":{"自动化系/机器人控制实验室":0,"自动化系/脑与认知科学研究所":1,"自动化系/控制与决策研究所":2,"自动化系/导航与控制研究所":2,"自动化系/信息处理研究所":1}},"人工智能学院":{"col":3,"groups":{"人工智能学院/MEOW LAB":0,"人工智能学院/LIU Lab":1,"人工智能学院/Delta-I Lab":2,"人工智能学院/AI Agent课题组":0,"人工智能学院/T-STAR Lab":1,"人工智能学院/交互式具身课题组":2,"人工智能学院/科学智能与物理感知":0,"人工智能学院/多模态智能课题组":1,"人工智能学院/李一鸣 · 培养关系":2}},"机械工程系":{"col":1,"groups":{"机械工程系/制造工程研究所":0,"机械工程系/机械电子工程研究所":1,"机械工程系/设计工程研究所":2}},"AIR":{"col":2,"groups":{"AIR/AIR机器人方向":0,"AIR/张亚勤 · 培养关系":1}},"深圳国际研究生院":{"col":0,"groups":{"深圳国际研究生院/双螺旋中心":0,"深圳国际研究生院/AI&Robot实验室":1,"深圳国际研究生院/王学谦 · 培养关系":2}},"院系待核":{"col":1,"groups":{}},"车辆与运载学院":{"col":2,"groups":{"车辆与运载学院/智能绿色车辆国重室":0}},"工程物理系":{"col":0,"groups":{"工程物理系/SUNIST":0,"工程物理系/REAL Lab":1}},"精密仪器系":{"col":3,"groups":{"精密仪器系/CBICR":0}},"软件学院":{"col":1,"groups":{"软件学院/机器学习课题组":0}},"生物医学工程学院":{"col":3,"groups":{"生物医学工程学院/神经工程实验室":0}},"物理系":{"col":2,"groups":{}},"微纳电子系（历史）":{"col":0,"groups":{}}};
const cards=[];
for(const dept of order){
 const card={dept,w:17.4,groups:[],head:D.heads[dept]};const ps=D.people.filter(p=>p.dept===dept),assigned=new Set();
 if(card.head&&P[card.head[0]]?.dept===dept){card.headPerson=P[card.head[0]];assigned.add(card.headPerson.name);}
 for(const l of D.labs.filter(l=>ownerLab(l)===dept)){
  const m=ps.filter(p=>p.lab===l[1]&&!assigned.has(p.name));
  for(const e of D.mentor){if(m.some(p=>p.name===e[0])&&P[e[1]]?.dept===dept&&!assigned.has(e[1])&&!m.some(p=>p.name===e[1])&&!P[e[1]].lab&&e[3]==='mentor')m.push(P[e[1]]);}
  m.forEach(p=>assigned.add(p.name));card.groups.push({name:l[1],lab:true,members:m});
 }
 for(const p of ps){if(assigned.has(p.name))continue;const children=D.mentor.filter(e=>e[0]===p.name&&P[e[1]]?.dept===dept&&!assigned.has(e[1])&&!P[e[1]].lab&&e[3]!=='collab').map(e=>P[e[1]]);
  if(children.length){let m=[p,...children];m.forEach(p=>assigned.add(p.name));card.groups.push({name:p.name+' · 培养关系',lab:false,members:m});}}
 for(const [label,filter] of [['教研人员｜实验室未细分',p=>p.currentFaculty],['在读、博士后与校友｜未归入已核实验室',p=>!p.currentFaculty]]){
  const m=ps.filter(p=>!assigned.has(p.name)&&filter(p));if(m.length){m.forEach(p=>assigned.add(p.name));card.groups.push({name:label,lab:false,full:true,members:m});}}
 let b=[2.38,2.38,2.38];
 card.groups.forEach((g,i)=>{g.key=dept+'/'+g.name;g.w=g.full?17.02:5.54;arrangeGroup(g);
  if(g.full){g.x=.19;g.y=Math.max(...b)+.12;b=b.map(()=>g.y+g.h+.135);}
  else{const col=fixedColumns[dept].groups[g.key];g.x=.19+col*5.7;g.y=b[col];b[col]=g.y+g.h+.15;}
 });
 card.h=Math.max(...b)+.12;cards.push(card);
}
// Balanced faculty panels; grouping is by department, not by visual column.
let bottoms=[5.40,5.40,5.40,5.40];
for(const card of cards){let col=fixedColumns[card.dept].col;card.col=col;card.x=.5+col*17.65;card.y=bottoms[col];bottoms[col]=card.y+card.h+.255;
 for(const g of card.groups){g.x+=card.x;g.y+=card.y;for(const p of g.members){p.x+=g.x;p.y+=g.y;p.noteX+=g.x;p.noteY+=g.y;p.card=card.dept;for(const c of p.bubbles){c.x+=g.x;c.y+=g.y;}}}
 if(card.headPerson){const p=card.headPerson;p.group='HEAD:'+card.dept;p.card=card.dept;p.x=card.x+4.1;p.y=card.y+1.05;p.d=1.20;p.noteX=card.x+8.2;p.noteY=card.y+.9;p.noteW=8.5;if(card.dept==='自动化系'){p.noteX=card.x+12.15;p.noteW=4.9;}p.bubbles.forEach((c,k)=>{c.x=card.x+5.7+k*1.7;c.y=card.y+1.05;c.d=1.0;});}
}
const W=72,H=Math.ceil(Math.max(...bottoms)+.7);
module.exports={DIR,D,P,cards,W,H};
if(require.main===module)console.log(JSON.stringify({W,H,bottoms,cards:cards.map(c=>[c.dept,+c.h.toFixed(2),c.col])}));
