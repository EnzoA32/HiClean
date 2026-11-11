// héro : animation pilotée par le scroll. Ordinateur = vidéos ; mobile = séquences d'images sur canvas
(()=>{const T=document.getElementById('cine');if(!T)return;
const g=i=>document.getElementById(i),cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),seg=(p,a,b)=>cl((p-a)/(b-a)),
rm=matchMedia('(prefers-reduced-motion:reduce)').matches,
mob=matchMedia('(max-width:820px),(pointer:coarse)').matches,
S=(id,v)=>{g(id).style.opacity=v.toFixed(3)},
SEQ={cv1:['zoom',41],cv2:['goutte',41],cv4:['ceramique',41],cv3:['dezoom',21]};
const V=['cv1','cv2','cv4','cv3'].map(id=>{const e=g(id),o={id,e,c:0,t:0,k:-1};
 if(mob){const cv=document.createElement('canvas');cv.className=e.className;cv.id=id;cv.setAttribute('aria-hidden','true');e.replaceWith(cv);
  o.e=cv;o.n=SEQ[id][1];o.im=[];o.x=cv.getContext('2d')}
 else e.src=e.dataset.src;
 return o});
// mobile : chargement progressif des images (premières images d'abord)
if(mob){const Q=[];V.forEach(o=>Q.push([o,0]));V.forEach(o=>{for(let i=1;i<o.n;i++)Q.push([o,i])});let act=0;
 const pump=()=>{while(act<6&&Q.length){const[o,i]=Q.shift(),im=new Image();act++;im.onload=im.onerror=()=>{act--;o.k=-1;pump()};
  im.src=`assets/seq/${SEQ[o.id][0]}/${String(i).padStart(3,'0')}.webp`;o.im[i]=im}};pump()}
const ok=im=>im&&im.complete&&im.naturalWidth;
function draw(o){const f=o.c*(o.n-1),i=Math.floor(f),a=f-i,key=f.toFixed(2);if(key===o.k)return;
 let A=i;while(A>0&&!ok(o.im[A]))A--;if(!ok(o.im[A]))return;
 const c=o.e,x=o.x,w=o.im[A].naturalWidth,h=o.im[A].naturalHeight;if(c.width!==w){c.width=w;c.height=h}
 x.globalAlpha=1;x.drawImage(o.im[A],0,0);
 if(a>.02&&i+1<o.n&&ok(o.im[i+1])){x.globalAlpha=a;x.drawImage(o.im[i+1],0,0)}o.k=key}
const dur=o=>(o.e.duration||5.04)-.05;
function render(p){
const w=seg(p,.04,.17);g('cdirty').style.clipPath=`inset(0 0 0 ${w*100}%)`;
const ln=g('cline');ln.style.left=w*100+'%';ln.style.opacity=w>0&&w<1?1:0;
V[0].t=seg(p,.17,.35);V[1].t=seg(p,.48,.6);V[2].t=seg(p,.63,.79);V[3].t=seg(p,.82,.93);
S('cpol',seg(p,.37,.44));g('cv1').style.opacity=1-seg(p,.44,.46);
S('cv2',seg(p,.46,.48));S('cv4',seg(p,.61,.63));S('cv3',seg(p,.8,.82));
const win=(a,b)=>seg(p,a,a+.03)*(1-seg(p,b-.03,b));
S('cp1',win(.07,.17));S('cp2',win(.33,.48));S('cp3',win(.5,.78));
T.querySelector('.cin').style.opacity=1-seg(p,.02,.06);
const f=seg(p,.94,.97);g('cf').style.opacity=f;g('cf').style.pointerEvents=f>.5?'auto':'none';
T.querySelectorAll('.cph').forEach(e=>e.style.pointerEvents='none')}
if(rm)T.style.height='100svh';
let last=-1;
(function loop(){if(T.getClientRects().length){
 const r=T.getBoundingClientRect(),p=rm?1:cl(-r.top/(T.offsetHeight-innerHeight));
 if(p!==last){last=p;render(p)}
 V.forEach(o=>{o.c+=(o.t-o.c)*(rm?1:.2);if(Math.abs(o.t-o.c)<.0005)o.c=o.t;
  if(mob)draw(o);else if(Math.abs(o.c*dur(o)-o.e.currentTime)>.002&&o.e.readyState>1)o.e.currentTime=o.c*dur(o)})}
 requestAnimationFrame(loop)})();
})();
