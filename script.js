const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// défilement fluide
if(window.Lenis&&!rm){const l=new Lenis({lerp:.08});window.lenis=l;(function r(t){l.raf(t);requestAnimationFrame(r)})(0)}
history.scrollRestoration='manual';
// titre hero + découpe des titres en mots
$('#h1').innerHTML=$('#h1').textContent.split(' ').map((w,i)=>`<span style="--i:${i}">${w}</span> `).join('');
$$('[data-sp]').forEach(e=>{e.innerHTML=e.textContent.trim().split(/\s+/).map((w,i)=>`<span class="wd"><span style="--i:${i}">${w}</span></span>`).join(' ');e.classList.add('sp')});
// apparition progressive liée au scroll
const rvs=$$('.rv'),sps=$$('.sp'),cp=(v,a=0,b=1)=>Math.min(Math.max(v,a),b);
rvs.forEach(e=>e._d=parseFloat(e.style.getPropertyValue('--d'))||0);sps.forEach(e=>e._w=[...e.querySelectorAll('.wd>span')]);
function rvUpdate(){const vh=innerHeight;
rvs.forEach(e=>{if(!e.getClientRects().length)return;const r=e.getBoundingClientRect(),p=rm?1:cp((vh*.96-e._d*90-(r.top-(e._ty||0)))/(vh*.3));if(e._p!==p){e._p=p;e._ty=(1-p)*26;e.style.setProperty('--o',(.12+.88*p).toFixed(3));e.style.setProperty('--ty',e._ty.toFixed(1)+'px')}});
sps.forEach(h=>{if(!h.getClientRects().length)return;const r=h.getBoundingClientRect(),p=rm?1:cp((vh*.94-r.top)/(vh*.28)),n=h._w.length;h._w.forEach((w,i)=>{const q=cp(p*1.6-(i/n)*.6);if(w._q!==q){w._q=q;w.style.opacity=(.12+.88*q).toFixed(3);w.style.transform=`translateY(${((1-q)*105).toFixed(1)}%)`}})})}
// surbrillance interne qui suit le curseur
document.addEventListener('pointermove',e=>{const t=e.target.closest&&e.target.closest('.spot');if(!t)return;const r=t.getBoundingClientRect();t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px')});
// titres : surbrillance fluide au survol
$$('h1 span,h2.sp .wd>span').forEach(e=>e.classList.add('u'));$$('h3').filter(e=>!e.closest('.panel')).forEach(e=>e.classList.add('u'));
const act=new Set();
document.addEventListener('pointermove',e=>{const h=e.target.closest&&e.target.closest('h1,h2,h3');if(!h)return;(h.matches('h3')?[h]:[...h.querySelectorAll('.u')]).forEach(u=>{const r=u.getBoundingClientRect();u._tx=e.clientX-r.left;u._ty=e.clientY-r.top;if(!act.has(u)){u._x=u._tx;u._y=u._ty}act.add(u)})});
(function L(){act.forEach(u=>{u._x+=(u._tx-u._x)*.14;u._y+=(u._ty-u._y)*.14;u.style.setProperty('--mx',u._x+'px');u.style.setProperty('--my',u._y+'px');if(Math.abs(u._tx-u._x)+Math.abs(u._ty-u._y)<.4)act.delete(u)});requestAnimationFrame(L)})();
// storytelling collant
const imgs=$$('.stk img'),stp=$$('.stp'),caps=['Lavage soigné','Polissage','Protection céramique'];
const so=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){const i=stp.indexOf(x.target);stp.forEach((s,j)=>s.classList.toggle('on',i===j));imgs.forEach((m,j)=>m.classList.toggle('on',i===j));$('#cap').textContent=caps[i]}}),{rootMargin:'-45% 0px -45% 0px'});
stp.forEach(s=>so.observe(s));
// galerie horizontale lissée
const stt=$('#stats'),nums=$$('#stats [data-n]'),bars=$$('#stats .fig i'),rg=$('.rg'),dot=$('.dot'),cl=(v,a=0,b=1)=>Math.min(Math.max(v,a),b);let cur=0,sp=0;
function loop(){rvUpdate();
if(stt.offsetHeight){const r=stt.getBoundingClientRect(),t=rm?1:cl((innerHeight*.92-r.top)/(innerHeight*.7));sp+=(t-sp)*.07;const e=1-Math.pow(1-sp,2);rg.style.strokeDashoffset=817*(1-e);dot.setAttribute('transform',`rotate(${e*360} 140 140)`);nums.forEach((n,i)=>{const f=+(n.dataset.f||0),p=cl((sp-i*.09)/.73),v=Math.round(f+(+n.dataset.n-f)*(1-Math.pow(1-p,3)));n.textContent=(n.dataset.pre||'')+v;if(i&&bars[i-1])bars[i-1].style.transform=`scaleX(${p})`})}
$('#nav').classList.toggle('s',scrollY>40||['#reserver','#galerie','#tarifs'].includes(location.hash));requestAnimationFrame(loop)}loop();
// pages : accueil / réservation
const T0=document.title,TT={'#reserver':'Devis et réservation detailing | HiClean','#galerie':'Galerie de réalisations detailing | HiClean','#tarifs':'Tarifs detailing, polissage et céramique | HiClean'};
function route(){const h=location.hash,v={'#reserver':'book','#galerie':'galerie','#tarifs':'tarifs'}[h]||'home',was=!$('#home').hidden;document.title=TT[h]||T0;
[['home','#home'],['book','#book'],['galerie','#galerie'],['tarifs','#tarifs']].forEach(([k,s])=>$(s).hidden=k!==v);
$$('.nl>a:not(.btn)').forEach(a=>a.classList.toggle('on',a.getAttribute('href')===(h||'#accueil')));
if(v==='book'&&window.PRE){const[pv,ps]=window.PRE;window.PRE=null;[['o1',pv],['o2',ps]].forEach(([n,x])=>{const i=document.querySelector(`input[name=${n}][value="${x}"]`);if(i)i.checked=true});up()}
const go=(x,imm)=>{if(window.lenis)lenis.scrollTo(x,{immediate:imm,offset:x===0?0:-70});else scrollTo(0,x===0?0:x.getBoundingClientRect().top+scrollY-70)};
if(h==='#services')go($('#services'),!was);else go(0,!was||v!=='home');rvUpdate()}
addEventListener('hashchange',route);route();
// formulaire selon le véhicule
const TARIFS={}; // ex. {'SUV / 4x4':{'Polissage':'dès 250 €'}} : alimente la page Tarifs et le récapitulatif de réservation
const D={o1:['Citadine','Berline / break','SUV / 4x4','Sportive / premium','Utilitaire','Flotte'],o2:['Detailing intérieur','Detailing extérieur','Polissage','Traitement céramique','Fin de leasing','Flotte / autre'],o3:['À domicile','En entrepôt'],o4:['Particulier','Professionnel']};
Object.entries(D).forEach(([id,a])=>$('#'+id).innerHTML=a.map((o,i)=>`<label><input type="radio" name="${id}" value="${o}" ${i?'':'checked'}><span class="spot">${o}</span></label>`).join(''));
const val=n=>$(`input[name=${n}]:checked`).value;
function up(){const p=(TARIFS[val('o1')]||{})[val('o2')];$('#sm').innerHTML=`<strong>${val('o2')}</strong> · ${val('o1')} · ${val('o3')}<br>${p||'Tarif confirmé par devis, selon l’état du véhicule.'}`}
$('#f').addEventListener('change',up);up();
$('#f').addEventListener('submit',e=>{e.preventDefault();const b=`Bonjour,\n\nPrestation : ${val('o2')}\nVéhicule : ${val('o1')}${$('#mk').value?' ('+$('#mk').value+')':''}\nLieu : ${val('o3')}\nProfil : ${val('o4')}\nDate souhaitée : ${$('#dt').value||'à convenir'}\n\n${$('#ms').value}\n\nNom : ${$('#nm').value}\nContact : ${$('#ct').value}`;location.href=`mailto:contact@hiclean.be?subject=${encodeURIComponent('Réservation – '+val('o1')+' – '+val('o2'))}&body=${encodeURIComponent(b)}`});
// galerie : filtres + visionneuse
const figs=$$('#gg figure'),lb=$('#lb'),lbi=lb.querySelector('img'),lbc=lb.querySelector('p');let vis=[],li=0;
function lbo(i){vis=figs.filter(f=>!f.hidden);li=(i+vis.length)%vis.length;const f=vis[li];lbi.src=f.querySelector('img').src;lbi.alt=f.querySelector('img').alt;lbc.textContent=f.querySelector('figcaption').textContent;lb.hidden=false;if(window.lenis)lenis.stop()}
function lbx(){lb.hidden=true;if(window.lenis)lenis.start()}
$('#gg').onclick=e=>{const f=e.target.closest('figure');if(f)lbo(figs.filter(x=>!x.hidden).indexOf(f))};
lb.onclick=e=>{if(e.target.closest('.x')||e.target===lb)lbx();else if(e.target.closest('.pr'))lbo(li-1);else if(e.target.closest('.nx'))lbo(li+1)};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')lbx();if(e.key==='ArrowLeft')lbo(li-1);if(e.key==='ArrowRight')lbo(li+1)});
addEventListener('hashchange',()=>{if(!lb.hidden)lbx()});
// page tarifs
const TS=[['Detailing intérieur','Sièges, plastiques, tapis et vitres nettoyés en détail.'],['Detailing extérieur','Lavage soigné de la carrosserie, des jantes et des finitions.'],['Polissage','Correction des micro-rayures et des marques de lavage.'],['Traitement céramique','Protection de la peinture et effet hydrophobe.'],['Fin de leasing','Remise en état intérieur et extérieur.']],VT=['Citadine','Berline / break','SUV / 4x4','Sportive / premium','Utilitaire'];let tv=VT[0];
$('#tv').innerHTML=VT.map((o,i)=>`<label><input type="radio" name="tv" value="${o}" ${i?'':'checked'}><span class="spot">${o}</span></label>`).join('');
function drawT(){$('#trows').innerHTML=TS.map(([s,d],k)=>{const p=(TARIFS[tv]||{})[s];return `<a href="#reserver" class="tr spot" data-s="${s}" style="--k:${k}"><div><h3>${s}</h3><p>${d}</p></div><div class="pr2"><b>${p||'Sur devis'}</b><span>Réserver →</span></div></a>`}).join('');$$('#trows h3').forEach(e=>e.classList.add('u'))}
$('#tv').addEventListener('change',e=>{tv=e.target.value;drawT()});
$('#trows').addEventListener('click',e=>{const a=e.target.closest('.tr');if(a)window.PRE=[tv,a.dataset.s]});drawT();
// menu mobile
const mb=$('.mb'),cm=()=>{document.body.classList.remove('mo');mb.setAttribute('aria-expanded',false);if(window.lenis)lenis.start()};
mb.onclick=()=>{const o=document.body.classList.toggle('mo');mb.setAttribute('aria-expanded',o);if(window.lenis)o?lenis.stop():lenis.start()};
$$('.nl a').forEach(a=>a.addEventListener('click',cm));
