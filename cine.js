// héro : animation pilotée par le scroll (nettoyage, zoom, polissage, céramique), puis le site reprend
(()=>{const T=document.getElementById('cine');if(!T)return;
const g=i=>document.getElementById(i),cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),seg=(p,a,b)=>cl((p-a)/(b-a)),
rm=matchMedia('(prefers-reduced-motion:reduce)').matches,
V=[g('cv1'),g('cv2')].map(e=>({e,c:0,t:0})),S=(id,v)=>{g(id).style.opacity=v.toFixed(3)},
dur=o=>(o.e.duration||5.04)-.05;
function render(p){
const w=seg(p,.04,.2);g('cdirty').style.clipPath=`inset(0 0 0 ${w*100}%)`;
const ln=g('cline');ln.style.left=w*100+'%';ln.style.opacity=w>0&&w<1?1:0;
V[0].t=seg(p,.2,.42)*dur(V[0]);V[1].t=seg(p,.62,.78)*dur(V[1]);
S('cpol',seg(p,.46,.55));g('cv1').style.opacity=1-seg(p,.55,.57);
S('cv2',seg(p,.58,.62));S('ccou',seg(p,.8,.84));S('cgou',seg(p,.86,.9));
const win=(a,b)=>seg(p,a,a+.03)*(1-seg(p,b-.03,b));
S('cp1',win(.07,.2));S('cp2',win(.44,.6));S('cp3',win(.64,.88));
T.querySelector('.cin').style.opacity=1-seg(p,.02,.06);
const f=seg(p,.9,.94);g('cf').style.opacity=f;g('cf').style.pointerEvents=f>.5?'auto':'none';
T.querySelectorAll('.cph').forEach(e=>e.style.pointerEvents='none')}
if(rm){T.style.height='100svh';render(1);return}
let last=-1;
(function loop(){if(T.getClientRects().length){const r=T.getBoundingClientRect(),p=cl(-r.top/(T.offsetHeight-innerHeight));
if(p!==last){last=p;render(p)}
V.forEach(o=>{o.c+=(o.t-o.c)*.18;if(Math.abs(o.t-o.c)>.002&&o.e.readyState>1)o.e.currentTime=o.c})}
requestAnimationFrame(loop)})();
})();
