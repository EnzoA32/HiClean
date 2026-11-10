// héro : animation pilotée par le scroll (nettoyage, zoom, polissage, céramique), puis le site reprend
(()=>{const T=document.getElementById('cine');if(!T)return;
const g=i=>document.getElementById(i),cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),seg=(p,a,b)=>cl((p-a)/(b-a)),
rm=matchMedia('(prefers-reduced-motion:reduce)').matches,
V=[g('cv1'),g('cv2'),g('cv3')].map(e=>({e,c:0,t:0})),S=(id,v)=>{g(id).style.opacity=v.toFixed(3)},
dur=o=>(o.e.duration||5.04)-.05;
function render(p){
const w=seg(p,.04,.18);g('cdirty').style.clipPath=`inset(0 0 0 ${w*100}%)`;
const ln=g('cline');ln.style.left=w*100+'%';ln.style.opacity=w>0&&w<1?1:0;
V[0].t=seg(p,.18,.38)*dur(V[0]);V[1].t=seg(p,.54,.68)*dur(V[1]);V[2].t=seg(p,.82,.93)*dur(V[2]);
S('cpol',seg(p,.4,.48));g('cv1').style.opacity=1-seg(p,.48,.5);
S('cv2',seg(p,.5,.54));S('ccou',seg(p,.69,.72));S('ccom',seg(p,.73,.77));S('cv3',seg(p,.78,.82));
const win=(a,b)=>seg(p,a,a+.03)*(1-seg(p,b-.03,b));
S('cp1',win(.07,.18));S('cp2',win(.36,.52));S('cp3',win(.56,.8));
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
