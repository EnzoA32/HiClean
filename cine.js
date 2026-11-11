// héro : animation pilotée par le scroll (nettoyage, zoom, polissage, céramique), puis le site reprend
(()=>{const T=document.getElementById('cine');if(!T)return;
const g=i=>document.getElementById(i),cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),seg=(p,a,b)=>cl((p-a)/(b-a)),
rm=matchMedia('(prefers-reduced-motion:reduce)').matches,
V=[g('cv1'),g('cv2'),g('cv4'),g('cv3')].map(e=>({e,c:0,t:0})),S=(id,v)=>{g(id).style.opacity=v.toFixed(3)},
dur=o=>(o.e.duration||5.04)-.05;
function render(p){
const w=seg(p,.04,.17);g('cdirty').style.clipPath=`inset(0 0 0 ${w*100}%)`;
const ln=g('cline');ln.style.left=w*100+'%';ln.style.opacity=w>0&&w<1?1:0;
V[0].t=seg(p,.17,.35)*dur(V[0]);V[1].t=seg(p,.48,.6)*dur(V[1]);V[2].t=seg(p,.63,.78)*dur(V[2]);V[3].t=seg(p,.83,.93)*dur(V[3]);
S('cpol',seg(p,.37,.44));g('cv1').style.opacity=1-seg(p,.44,.46);
S('cv2',seg(p,.46,.48));S('cv4',seg(p,.61,.63));S('cv3',seg(p,.79,.83));
const win=(a,b)=>seg(p,a,a+.03)*(1-seg(p,b-.03,b));
S('cp1',win(.07,.17));S('cp2',win(.33,.48));S('cp3',win(.5,.78));
T.querySelector('.cin').style.opacity=1-seg(p,.02,.06);
const f=seg(p,.94,.97);g('cf').style.opacity=f;g('cf').style.pointerEvents=f>.5?'auto':'none';
T.querySelectorAll('.cph').forEach(e=>e.style.pointerEvents='none')}
if(rm){T.style.height='100svh';render(1);V.forEach(o=>o.e.addEventListener('loadedmetadata',()=>{o.e.currentTime=o.t}));return}
let last=-1;
(function loop(){if(T.getClientRects().length){const r=T.getBoundingClientRect(),p=cl(-r.top/(T.offsetHeight-innerHeight));
if(p!==last){last=p;render(p)}
V.forEach(o=>{o.c+=(o.t-o.c)*.18;if(Math.abs(o.t-o.c)>.002&&o.e.readyState>1)o.e.currentTime=o.c})}
requestAnimationFrame(loop)})();
})();
