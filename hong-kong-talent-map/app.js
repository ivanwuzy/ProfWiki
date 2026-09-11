(() => {
 'use strict';
 const data=window.HK_MAP, $=id=>document.getElementById(id);
 const people=new Map(data.people.map(p=>[p.id,p])), companies=new Map(data.companies.map(c=>[c.id,c]));
 const schools=new Map(data.schools.map(s=>[s.id,s])), groups=new Map(data.groups.map(g=>[g.id,g]));
 const entities=new Map([...people,...companies,...groups,...schools]);
 const domains=new Map(data.domains), viewport=$('viewport'),board=$('board'),space=$('map-space');
 let school='',domain='',industry=false,related=false,selected=null,zoom=1,visibleGroups=[],lastFocus=null;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const button=(cls,text,click)=>{const b=el('button',cls,text);b.type='button';b.addEventListener('click',click);return b;};
 const link=(text,url,cls)=>{const a=el('a',cls,text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
 const companyEdges=id=>data.edges.filter(e=>e.source===id&&companies.has(e.target));
 const schoolPeople=id=>new Set([...data.people.filter(p=>p.school===id).map(p=>p.id),...data.affiliations.filter(a=>a.school===id).map(a=>a.person)]);
 const state=id=>{const types=companyEdges(id).map(e=>e.type);return ['founder','industry','collab','historical'].find(t=>types.includes(t))||'academic';};
 const schoolLabel=id=>schools.get(id)?.name||'';
 $('updated').textContent=data.updated;
 data.domains.forEach(([value,label])=>{const o=el('option','',label);o.value=value;$('domain').append(o);});
 function nav(){
  $('schools').replaceChildren();
  const add=(id,code,name,count)=>{const b=button('',undefined,()=>{school=id;selected=null;closeDetail(false);render();fit();viewport.scrollTo(0,0);});b.setAttribute('aria-pressed',String(school===id));b.dataset.school=id;b.append(el('span','school-mark',code),el('span','nav-label',name),el('span','nav-count',count));$('schools').append(b);};
  add('','ALL',related?'全部高校':'香港五校','↗');
  data.schools.filter(s=>related||!s.related).forEach(s=>add(s.id,s.short,s.name,schoolPeople(s.id).size));
 }
 function matches(p){return (!domain||p.domains.includes(domain))&&(!industry||companyEdges(p.id).length>0);}
 function displayGroups(s){
  const list=data.groups.filter(g=>g.school===s.id).map(g=>({...g,members:g.members.filter(id=>matches(people.get(id)))})).filter(g=>g.members.length||((!domain||g.domain===domain)&&(!industry||companyEdges(g.id).length>0)));
  const affiliates=data.affiliations.filter(a=>a.school===s.id&&matches(people.get(a.person)));
  if(affiliates.length)list.push({id:`cross-${s.id}`,school:s.id,name:'跨校学缘与历史任职',parent:'同一人物 · 分阶段记录',members:affiliates.map(a=>a.person),affiliates,synthetic:true});
  return list;
 }
 function personCard(id,affiliation){
  const p=people.get(id),wrap=el('div','person-wrap');wrap.dataset.person=id;
  const b=button(`person ${state(id)}`,undefined,()=>selectEntity(id));b.dataset.entity=id;b.append(el('strong','',p.name),el('small','',p.role));
  if(affiliation)b.append(el('small','affiliation-label',affiliation));
  wrap.append(b);
  const stack=companyStack(id);if(stack)wrap.append(stack);
  return wrap;
 }
 function companyStack(id){
  const edges=companyEdges(id);
  if(edges.length){
   const stack=el('div','company-stack');
   edges.forEach(e=>{
    const c=companies.get(e.target),entry=el('div','company-entry');
    const cb=button(`company ${e.type}`,undefined,()=>selectEntity(c.id));
    cb.dataset.entity=c.id;cb.setAttribute('aria-label',`${c.name}，${e.label}`);
    cb.append(el('span','',c.name));
    entry.append(cb,el('small','company-label',e.label));stack.append(entry);
   });
   return stack;
  }
  return null;
 }
 function groupCard(g){
  const card=el('section',`group${g.affiliates?' cross-group':''}`);card.dataset.group=g.id;
  const head=el('div','group-head');
  if(g.synthetic)head.append(el('div','group-title',g.name));
  else {const title=button('group-title',g.name,()=>selectEntity(g.id));title.dataset.entity=g.id;head.append(title);}
  if(!g.synthetic&&domains.has(g.domain))head.append(el('span','domain-tag',domains.get(g.domain)));
  card.append(head,el('p','group-parent',g.parent));
  const grid=el('div','people-grid');g.members.forEach(id=>grid.append(personCard(id,g.affiliates?.find(a=>a.person===id)?.label)));card.append(grid);
  if(!g.members.length)card.append(el('p','group-note',g.note));
  const stack=companyStack(g.id);if(stack){stack.classList.add('group-companies');card.append(stack);}
  return card;
 }
 function render(){
  nav();board.replaceChildren();visibleGroups=[];
  const ids=new Set(),companyIds=new Set();let groupCount=0;
  for(const s of data.schools.filter(s=>(related||!s.related)&&(!school||school===s.id))){
   const gs=displayGroups(s);if(!gs.length)continue;
   visibleGroups.push(...gs);groupCount+=gs.filter(g=>!g.affiliates).length;
   const ps=new Set(gs.flatMap(g=>g.members));ps.forEach(id=>{ids.add(id);companyEdges(id).forEach(e=>companyIds.add(e.target));});
   gs.forEach(g=>companyEdges(g.id).forEach(e=>companyIds.add(e.target)));
   const panel=el('section',`school-panel${s.related?' related-school':''}`);panel.dataset.school=s.id;
   const top=el('div','school-top'),name=button('school-name',undefined,()=>selectEntity(s.id));
   name.append(el('strong','',s.name),el('span','',s.theme));top.append(name,el('span','school-code',s.short));
   panel.append(top,el('p','school-count',`${ps.size} 位收录人物 · ${gs.filter(g=>!g.affiliates).length} 个团队 / 阅读分组${s.related?' · '+s.location:''}`));
   const grid=el('div','group-grid');gs.forEach(g=>grid.append(groupCard(g)));panel.append(grid);board.append(panel);
  }
  board.classList.toggle('single',Boolean(school));
  $('empty').hidden=board.children.length>0;space.hidden=!board.children.length;
  $('view-title').textContent=school?schoolLabel(school):related?'香港高校及关联网络':'香港五校';
  $('stats').replaceChildren(...[[ids.size,'人物 · 去重'],[companyIds.size,'关联公司'],[groupCount,'团队 / 分组']].map(([n,label])=>{const d=el('div');d.append(el('strong','',n),el('span','',label));return d;}));
  updateSelection();requestAnimationFrame(measure);
 }
 function measure(){
  space.style.width=Math.ceil(board.offsetWidth*zoom)+'px';space.style.height=Math.ceil(board.offsetHeight*zoom)+'px';
  $('connections').setAttribute('width',space.offsetWidth);$('connections').setAttribute('height',space.offsetHeight);
  drawConnections();
 }
 function setZoom(next,anchor){
  const old=zoom;zoom=Math.max(.28,Math.min(1.7,next));
  board.style.transform=`scale(${zoom})`;board.classList.toggle('compact',zoom<.72);$('zoom-level').value=Math.round(zoom*100)+'%';
  measure();if(anchor){viewport.scrollLeft=(viewport.scrollLeft+anchor.x)*zoom/old-anchor.x;viewport.scrollTop=(viewport.scrollTop+anchor.y)*zoom/old-anchor.y;}
  requestAnimationFrame(measure);
 }
 function fit(){
  const mobile=innerWidth<800;
  // A phone starts with readable school panels, horizontally scrollable;
  // fitting all seven schools into one screen would hide every name.
  const width=mobile?570:board.offsetWidth;
  setZoom(Math.min(1,(viewport.clientWidth-(mobile?26:48))/width));
  viewport.scrollTo(0,0);
 }
 function selectedEdges(){return data.edges.filter(e=>e.source===selected||e.target===selected);}
 function updateSelection(){
  const connected=new Set(selectedEdges().flatMap(e=>[e.source,e.target]));
  board.classList.toggle('has-selection',Boolean(selected&&(people.has(selected)||companies.has(selected)||groups.has(selected))));
  board.querySelectorAll('[data-entity]').forEach(n=>{n.classList.toggle('selected',n.dataset.entity===selected);n.classList.toggle('connected',connected.has(n.dataset.entity)&&n.dataset.entity!==selected);});
  board.querySelectorAll('.person-wrap').forEach(n=>n.classList.toggle('related-person',connected.has(n.dataset.person)||n.dataset.person===selected));
  drawConnections();
 }
 function drawConnections(){
  const svg=$('connections');svg.replaceChildren();if(!selected)return;
  const origin=space.getBoundingClientRect(), nodes=[...board.querySelectorAll('[data-entity]')];
  const point=id=>{const node=nodes.find(n=>n.dataset.entity===id&&n.getClientRects().length);if(!node)return null;const b=node.getBoundingClientRect();return {x:b.left-origin.left+b.width/2,y:b.top-origin.top+b.height/2,w:b.width,h:b.height};};
  const ns='http://www.w3.org/2000/svg',defs=document.createElementNS(ns,'defs');
  const marker=document.createElementNS(ns,'marker');Object.entries({id:'relation-arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:5,markerHeight:5,orient:'auto-start-reverse'}).forEach(([k,v])=>marker.setAttribute(k,v));const arrow=document.createElementNS(ns,'path');arrow.setAttribute('d','M0 0L10 5L0 10z');arrow.setAttribute('fill','context-stroke');marker.append(arrow);defs.append(marker);svg.append(defs);
  for(const e of selectedEdges()){
   if(companies.has(e.target))continue; // company edges already have a short local branch
   const a=point(e.source),b=point(e.target);if(!a||!b)continue;
   const p=document.createElementNS(ns,'path'),right=b.x>=a.x;
   const x1=a.x+(right?1:-1)*a.w/2,x2=b.x+(right?-1:1)*b.w/2;
   const bend=Math.max(35,Math.abs(x2-x1)*.4);
   p.setAttribute('d',`M${x1},${a.y} C${x1+(right?bend:-bend)},${a.y} ${x2+(right?-bend:bend)},${b.y} ${x2},${b.y}`);
   p.setAttribute('fill','none');p.setAttribute('stroke',e.type==='pending'?'var(--pending)':e.type==='collab'?'var(--collab)':'var(--mentor)');p.setAttribute('stroke-width','2');
   if(e.type!=='mentor')p.setAttribute('stroke-dasharray','5 5');else p.setAttribute('marker-end','url(#relation-arrow)');
   const title=document.createElementNS(ns,'title');title.textContent=e.label;p.append(title);svg.append(p);
  }
 }
 function closeDetail(focus=true){$('detail').hidden=true;selected=null;updateSelection();if(focus&&lastFocus?.isConnected)lastFocus.focus();requestAnimationFrame(measure);}
 function selectEntity(id,jump=false){
  const item=entities.get(id);if(!item)return;
  lastFocus=document.activeElement;
  if(jump){
   let target=people.get(id)||entities.get(data.edges.find(e=>e.target===id)?.source);let destination=target?.school||item.school||(schools.has(id)?id:null);
   if(destination){if(schools.get(destination).related){related=true;$('related').checked=true;}if(school&&school!==destination)school=destination;domain='';industry=false;$('domain').value='';$('industry').checked=false;render();}
  }
  selected=id;const detail=$('detail');detail.hidden=false;
  $('detail-kind').textContent=item.kind==='person'?'人物':item.kind==='company'?'公司 / 创业项目':schools.has(id)?'高校':'研究团队 / 平台';
  $('detail-name').textContent=item.name;$('detail-role').textContent=item.role||item.parent||item.location||'';
  $('detail-body').replaceChildren();
  if(item.summary)$('detail-body').append(el('p','',item.summary));
  if(people.has(id)){
   $('detail-body').append(el('p','scope-note',item.domains.map(d=>domains.get(d)).join(' · ')));
   $('detail-body').append(el('p','scope-note',`${schoolLabel(item.school)} · ${groups.get(item.group).name}`));
   data.affiliations.filter(a=>a.person===id).forEach(a=>$('detail-body').append(el('p','scope-note',`${schoolLabel(a.school)}：${a.label}`)));
  }
  if(id==='company:雅可比机器人')$('detail-body').append(el('p','scope-note','创业关系依据2024年校方访谈与2025年校方报道，当前经营和学籍仍待核。'));
  if(item.kind==='company')$('detail-body').append(el('p','scope-note','高校关联来自具名人物或组织的公开关系；具体创办、任职、团队来源与科研合作分别标注。'));
  const relations=$('detail-relations');relations.replaceChildren();
  const edges=selectedEdges();
  if(edges.length){relations.append(el('h3','',`相关人物、组织与公司 · ${edges.length}`));for(const edge of edges){const outgoing=edge.source===id,target=entities.get(outgoing?edge.target:edge.source);const b=button('',undefined,()=>selectEntity(target.id,true));const label=outgoing?edge.label:edge.type==='mentor'?`培养关系：${target.name} → ${item.name}`:edge.label;b.append(el('strong','',target.name),el('small','',label));relations.append(b);}}
  if(groups.has(id)){const g=groups.get(id);if(g.members.length){relations.append(el('h3','','收录人物'));g.members.forEach(pid=>relations.append(button('',people.get(pid).name,()=>selectEntity(pid,true))));}}
  if(schools.has(id))relations.append(button('',`聚焦${item.name}`,()=>{school=id;related=related||item.related;$('related').checked=related;closeDetail(false);render();fit();}));
  const sources=$('detail-sources');sources.replaceChildren();
  if(item.wikiUrl)sources.append(link('查看知识库详情 ↗',item.wikiUrl,'wiki-link'));
  if(item.sources?.length){sources.append(el('h3','','公开来源'));item.sources.forEach(s=>sources.append(link(s.label==='公开来源'?new URL(s.url).hostname:s.label,s.url)));}
  if(item.date)sources.append(el('p','evidence-date',`资料核验：${item.date}`));
  updateSelection();
  if(jump)requestAnimationFrame(()=>{
   const node=[...board.querySelectorAll('[data-entity]')].find(n=>n.dataset.entity===id&&n.getClientRects().length);
   if(node){if(zoom<.72&&companies.has(id))setZoom(.9);const r=node.getBoundingClientRect(),v=viewport.getBoundingClientRect();viewport.scrollBy({left:r.left-v.left-30,top:r.top-v.top-65,behavior:'instant'});}
   measure();
  });
  $('close-detail').focus({preventScroll:true});
 }
 const search=$('search'),results=$('results');
 function hideResults(){results.hidden=true;search.setAttribute('aria-expanded','false');}
 search.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();results.replaceChildren();if(!q){hideResults();return;}
  const items=[...people.values(),...companies.values(),...groups.values()].filter(i=>!i.synthetic&&[i.name,...(i.aliases||[]),i.summary,schoolLabel(i.school)].join(' ').toLowerCase().includes(q));
  items.sort((a,b)=>Number(b.name.toLowerCase().includes(q))-Number(a.name.toLowerCase().includes(q)));
  results.hidden=false;search.setAttribute('aria-expanded','true');results.append(el('p','',`${items.length} 个结果 · 搜索全部七校关联网络`));
  items.slice(0,60).forEach(i=>{const b=button('',undefined,()=>{hideResults();selectEntity(i.id,true);});b.append(el('span','',i.name),el('small','',i.kind==='company'?'公司 / 创业项目':`${schoolLabel(i.school)} · ${i.role||'研究团队'}`));results.append(b);});
 });
 search.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();results.querySelector('button')?.focus();}if(e.key==='Enter'){e.preventDefault();results.querySelector('button')?.click();}if(e.key==='Escape')hideResults();});
 results.addEventListener('keydown',e=>{const bs=[...results.querySelectorAll('button')],i=bs.indexOf(document.activeElement);if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();bs[(i+(e.key==='ArrowDown'?1:-1)+bs.length)%bs.length]?.focus();}if(e.key==='Escape'){hideResults();search.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.search'))hideResults();});
 $('domain').addEventListener('change',e=>{domain=e.target.value;closeDetail(false);render();fit();});
 $('industry').addEventListener('change',e=>{industry=e.target.checked;closeDetail(false);render();fit();});
 $('related').addEventListener('change',e=>{related=e.target.checked;if(schools.get(school)?.related&&!related)school='';closeDetail(false);render();fit();});
 const center=()=>({x:viewport.clientWidth/2,y:viewport.clientHeight/2});
 $('zoom-in').onclick=()=>setZoom(zoom*1.2,center());$('zoom-out').onclick=()=>setZoom(zoom/1.2,center());$('fit').onclick=fit;
 function reset(){school='';domain='';industry=false;related=false;$('related').checked=false;$('domain').value='';$('industry').checked=false;search.value='';hideResults();closeDetail(false);render();fit();}
 $('reset').onclick=reset;$('reset-empty').onclick=reset;$('close-detail').onclick=()=>closeDetail();
 viewport.addEventListener('wheel',e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();const r=viewport.getBoundingClientRect();setZoom(zoom*Math.exp(-e.deltaY*.008),{x:e.clientX-r.left,y:e.clientY-r.top});},{passive:false});
 let drag=null;
 viewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button,a,input,select'))return;drag={x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');});
 viewport.addEventListener('pointermove',e=>{if(!drag)return;viewport.scrollLeft=drag.left+drag.x-e.clientX;viewport.scrollTop=drag.top+drag.y-e.clientY;});
 const stopDrag=()=>{drag=null;viewport.classList.remove('dragging');};viewport.addEventListener('pointerup',stopDrag);viewport.addEventListener('pointercancel',stopDrag);
 document.addEventListener('keydown',e=>{
  const typing=/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName);
  if(e.key==='Escape'){hideResults();if(!$('detail').hidden)closeDetail();}
  if(e.key==='/'&&!typing){e.preventDefault();search.focus();}
  if(document.activeElement===viewport){const ds={ArrowLeft:[-90,0],ArrowRight:[90,0],ArrowUp:[0,-90],ArrowDown:[0,90]};if(ds[e.key]){e.preventDefault();viewport.scrollBy(...ds[e.key]);}if(e.key==='+')setZoom(zoom*1.2,center());if(e.key==='-')setZoom(zoom/1.2,center());if(e.key==='0')fit();}
 });
 new ResizeObserver(measure).observe(board);
 let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(fit,120);});
 render();requestAnimationFrame(fit);
})();
