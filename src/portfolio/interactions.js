/* V13 scroll-driven background and navigation interactions. */

export function initPortfolio(){'use strict';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let theme='dark';try{theme=localStorage.getItem('prasanth-preview-theme')||'dark'}catch(e){}const eventCleanups=[];const listen=(el,type,handler,options)=>{el.addEventListener(type,handler,options);eventCleanups.push(()=>el.removeEventListener(type,handler,options))};const setTheme=t=>{theme=t;root.dataset.theme=t;try{localStorage.setItem('prasanth-preview-theme',t)}catch(e){};$('#theme-btn').setAttribute('aria-label','Switch to '+(t==='dark'?'light':'dark')+' mode');$('#theme-icon').innerHTML=t==='dark'?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>':'<path d="M20.75 14.25A8.5 8.5 0 019.75 3.25 8.5 8.5 0 1020.75 14.25z"/>';};setTheme(theme);listen($('#theme-btn'),'click',()=>setTheme(theme==='dark'?'light':'dark'));const menuBtn=$('#menu-btn'),mobile=$('#mobile-menu');listen(menuBtn,'click',()=>{let open=mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation');});$$('#mobile-menu a').forEach(a=>listen(a,'click',()=>{mobile.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));$('#year').textContent=(new Date()).getFullYear();
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}})},{threshold:.08,rootMargin:'0px 0px -35px 0px'});$$('.reveal').forEach(e=>observer.observe(e));if(!reduce)root.classList.add('motion-ready');

/* V13 background: two GPU-friendly layers that follow the reading flow.
   1. #ambient-gl     – a WebGL "silk" field (domain-warped noise) rendered at reduced resolution.
   2. #ambient-canvas – a quiet particle constellation that morphs into one formation per chapter.
   Nothing behind the content is text, a panel or a diagram; the form and colour carry the story. */
const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n)),lerp=(a,b,u)=>a+(b-a)*u,smooth=u=>u*u*(3-2*u);
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)'),finePointer=matchMedia('(pointer: fine)').matches;
let still=motionQuery.matches;
const hex=h=>[0,2,4].map(i=>parseInt(h.slice(1+i,3+i),16)/255);
const mix3=(a,b,u)=>a.map((v,i)=>lerp(v,b[i],u));

// One entry per anchor, in reading order. Colours continue the V12 chapter palette.
const CHAPTERS=[
 {sel:'#top',               a:'#9aa8ff',b:'#6a8bb7',c:'#4a3b6e',focus:[.80,.92],warp:3.2,glow:.90,safe:.72,form:'horizon'},
 {sel:'#about',             a:'#a3adf7',b:'#7d8fc4',c:'#55406c',focus:[.86,.52],warp:3.6,glow:.85,safe:.40,form:'spiral'},
 {sel:'#experience-amazon', a:'#efa15f',b:'#c56e43',c:'#6b3d2a',focus:[.90,.46],warp:3.0,glow:.95,safe:.45,dim:.62,form:'pipeline'},
 {sel:'#experience-tesla',  a:'#e98189',b:'#9c4558',c:'#57304a',focus:[.88,.52],warp:4.0,glow:.90,safe:.45,dim:.8,form:'orgchart'},
 {sel:'#experience-intel',  a:'#79b6ed',b:'#527dd8',c:'#243c66',focus:[.90,.42],warp:2.4,glow:.95,safe:.45,dim:.75,form:'compiler'},
 {sel:'#experience-western',a:'#a18de5',b:'#677fdd',c:'#3a2f6b',focus:[.88,.56],warp:3.4,glow:.90,safe:.45,dim:.62,form:'dashboard'},
 {sel:'#experience-infosys',a:'#69bbbc',b:'#4b92c0',c:'#1f4a55',focus:[.86,.50],warp:2.8,glow:.85,safe:.45,dim:.62,form:'taxform'},
 {sel:'#skills',            a:'#a8a2f1',b:'#6d9bd2',c:'#2f3463',focus:[.50,.04],warp:3.0,glow:.80,safe:.30,form:'sphere'},
 {sel:'#contact',           a:'#a6b0ff',b:'#828ab9',c:'#4a3b6e',focus:[.50,.62],warp:3.4,glow:.90,safe:.55,form:'halo'},
];
CHAPTERS.forEach(c=>{c.A=hex(c.a);c.B=hex(c.b);c.Cc=hex(c.c)});
const LAST=CHAPTERS.length-1;

let gcv=$('#ambient-gl');
if(!gcv){gcv=document.createElement('canvas');gcv.id='ambient-gl';gcv.setAttribute('aria-hidden','true');$('#ambient-canvas').before(gcv);gcv.dataset.injected='1'}
const pcv=$('#ambient-canvas'),pctx=pcv.getContext('2d');
let ww=0,hh=0,small=false,scene=0,target=0,time=0,rafId=0,scrollRaf=0,lastNow=0,glAcc=0,ptAcc=0;
const ptr={x:0,y:0,tx:0,ty:0};

/* ---------- Layer 1: WebGL silk field ---------- */
const FRAG=`precision mediump float;
uniform vec2 uRes;uniform float uTime,uWarp,uGlow,uLight,uSafe;uniform vec3 uA,uB,uC;uniform vec2 uFocus,uPtr;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/uRes;float asp=uRes.x/uRes.y;float t=uTime;
 vec2 p=vec2(uv.x*asp,uv.y)*.85+uPtr*.05;
 vec2 q=vec2(fbm(p+vec2(0.,t*.035)),fbm(p+vec2(5.2,1.3)-t*.03));
 vec2 r=vec2(fbm(p+uWarp*q+vec2(1.7,9.2)+t*.05),fbm(p+uWarp*q+vec2(8.3,2.8)-t*.04));
 float f=fbm(p+uWarp*r);
 float silk=pow(1.-abs(sin(f*5.5+r.x*3.-t*.16)),5.);
 vec2 fc=vec2(uFocus.x,1.-uFocus.y)+uPtr*vec2(.03,-.03);
 vec2 d=(uv-fc)*vec2(asp,1.);
 float halo=exp(-dot(d,d)*1.7);
 float field=smoothstep(.28,1.05,f*1.3);
 vec3 col=mix(uA,uB,clamp(q.y*1.6-.3,0.,1.));
 col=mix(col,uC,clamp(r.x-.3,0.,1.)*.85);
 float a=(field*.55+silk*.38)*(.16+halo*1.2)*uGlow;
 a*=1.-uSafe*exp(-pow((uv.x-.5)/.25,2.));
 a*=mix(.46,.26,uLight);
 a=clamp(a+(hash(gl_FragCoord.xy+fract(t))-.5)/255.,0.,1.);
 gl_FragColor=vec4(col*a,a);
}`;
const VERT='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
let gl=null,U={},ctx2=null;
function initGL(){
 try{gl=gcv.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false,powerPreference:'low-power'})}catch(e){gl=null}
 if(!gl){ctx2=gcv.getContext('2d');return}
 const sh=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s};
 try{
  const prog=gl.createProgram();gl.attachShader(prog,sh(gl.VERTEX_SHADER,VERT));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,FRAG));gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);
  const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  ['uRes','uTime','uWarp','uGlow','uLight','uSafe','uA','uB','uC','uFocus','uPtr'].forEach(n=>U[n]=gl.getUniformLocation(prog,n));
 }catch(e){gl=null;ctx2=null}
}
initGL();
const onLost=e=>{e.preventDefault();gl=null};
const onRestored=()=>{initGL();resize();render(true)};
listen(gcv,'webglcontextlost',onLost);listen(gcv,'webglcontextrestored',onRestored);

// Blend the per-chapter parameters for the current (fractional) scene.
function blendChapter(s){
 const k=Math.floor(clamp(s,0,LAST)),n=Math.min(k+1,LAST),u=smooth(clamp(s-k));const a=CHAPTERS[k],b=CHAPTERS[n];
 return {A:mix3(a.A,b.A,u),B:mix3(a.B,b.B,u),C:mix3(a.Cc,b.Cc,u),focus:[lerp(a.focus[0],b.focus[0],u),lerp(a.focus[1],b.focus[1],u)],
  warp:lerp(a.warp,b.warp,u),glow:lerp(a.glow,b.glow,u),safe:lerp(a.safe,b.safe,u),k,n,u};
}
function drawField(P){
 const light=root.dataset.theme==='light';
 if(gl){
  gl.viewport(0,0,gcv.width,gcv.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
  const tone=c=>light?c.map(v=>v*.82):c;
  gl.uniform2f(U.uRes,gcv.width,gcv.height);gl.uniform1f(U.uTime,time);gl.uniform1f(U.uWarp,P.warp);gl.uniform1f(U.uGlow,P.glow);
  gl.uniform1f(U.uLight,light?1:0);gl.uniform1f(U.uSafe,P.safe);
  gl.uniform3fv(U.uA,tone(P.A));gl.uniform3fv(U.uB,tone(P.B));gl.uniform3fv(U.uC,tone(P.C));
  gl.uniform2f(U.uFocus,P.focus[0],P.focus[1]);gl.uniform2f(U.uPtr,ptr.x,ptr.y);
  gl.drawArrays(gl.TRIANGLES,0,3);
 }else if(ctx2){
  // Fallback without WebGL: the same palette as two soft washes.
  const w=gcv.width,h=gcv.height,rgba=(c,al)=>`rgba(${c.map(v=>Math.round(v*255)).join(',')},${al})`;
  ctx2.clearRect(0,0,w,h);
  const g=ctx2.createRadialGradient(w*P.focus[0],h*P.focus[1],0,w*P.focus[0],h*P.focus[1],w*.6);
  g.addColorStop(0,rgba(P.A,light?.12:.18));g.addColorStop(.45,rgba(P.B,light?.05:.07));g.addColorStop(1,rgba(P.B,0));
  ctx2.fillStyle=g;ctx2.fillRect(0,0,w,h);
 }
}

/* ---------- Layer 2: particle constellation ---------- */
// Seeded random numbers keep every formation identical between visits and resizes.
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
let N=0,pts=[];
function buildParticles(){
 seed=7;N=small?150:300;pts=[];
 for(let i=0;i<N;i++)pts.push({r1:rnd(),r2:rnd(),r3:rnd(),r4:rnd(),delay:rnd()*.38,x:0,y:0,al:0,sz:0});
}
const TAU=Math.PI*2;
// Product formations live in a box on the side of the page with the most breathing room.
let R={x:0,y:0,w:1,h:1},TREE=[],LEAVES=[],CODE=[],CODE_LINES=1,AST=[];
function buildPlans(){
 R=small?{x:ww*.06,y:hh*.24,w:ww*.88,h:hh*.56}:{x:ww*.62,y:hh*.14,w:ww*.36,h:hh*.74};
 let s2=11;const r2=()=>(s2=(s2*16807)%2147483647)/2147483647;
 // Tesla: an organisation with HR at the top, managers, teams and employees
 const levels=[1,3,9,small?9:18],ys=[.08,.34,.6,.86];TREE=[];
 levels.forEach((count,l)=>{const start=TREE.length,prevStart=l?start-levels[l-1]:0,per=l?count/levels[l-1]:0;
  for(let k=0;k<count;k++)TREE.push({x:(k+.5)/count,y:ys[l],l,p:l?prevStart+Math.floor(k/per):-1,ph:r2()*TAU})});
 LEAVES=[];for(let n=TREE.length-levels[3];n<TREE.length;n++){const path=[];let c=n;while(c>=0){path.unshift(c);c=TREE[c].p}LEAVES.push(path)}
 // Intel: indented source code, a syntax tree, and machine code
 CODE=[];CODE_LINES=small?8:14;const indents=[0,1,2,2,1,2,3,3,2,1,0,1,1,0];
 for(let li=0;li<CODE_LINES;li++){let x=.02+indents[li%14]*.035;const n=1+Math.floor(r2()*3);
  for(let k=0;k<n&&x<.32;k++){const w=Math.min(.04+r2()*.08,.33-x);CODE.push({x,w,y:.06+li*.88/(CODE_LINES-1),line:li});x+=w+.015}}
 AST=[];for(let n=0;n<15;n++){const l=Math.floor(Math.log2(n+1)),k=n-(2**l-1);AST.push({x:.40+.26*(k+.5)/2**l,y:.2+l*.2,l,p:n?Math.floor((n-1)/2):-1})}
}
const out={x:0,y:0,a:0,s:1,w:0,h:0,c:0,link:-1};
const fx=u=>R.x+u*R.w,fy=v=>R.y+v*R.h,bez=(a0,a1,a2,u)=>(1-u)*(1-u)*a0+2*(1-u)*u*a1+u*u*a2;
function perim(u,x,y,w,h){let d=u*2*(w+h);if(d<w){out.x=x+d;out.y=y;return}d-=w;if(d<h){out.x=x+w;out.y=y+d;return}d-=h;if(d<w){out.x=x+w-d;out.y=y+h;return}d-=w;out.x=x;out.y=y+h-d}
const FORMS={
 horizon(p,i,t){ // a luminous horizon rising to the right, below the hero copy
  const k=i%5,u=p.r1;out.x=(u*1.1-.05)*ww;
  out.y=hh*(.80+.035*k)-u*hh*.17+Math.sin(u*6+k*1.3+t*.25)*hh*.024+Math.sin(u*13+t*.4+k)*hh*.007;
  out.a=(.2+.8*u)*(.55+.45*Math.sin(t*.8+p.r2*TAU));out.s=.8+p.r3*1.1},
 spiral(p,i,t){ // three arms gathering into one centre
  const S=Math.min(ww,hh)*.4,rr=Math.sqrt(p.r1)*S,ang=(i%3)*TAU/3+rr/S*3.4+t*.05+(p.r2-.5)*.5;
  out.x=ww*.80+Math.cos(ang)*rr*1.15;out.y=hh*.52+Math.sin(ang)*rr*.72;out.a=1-rr/S*.65;out.s=.7+(1-rr/S)*1.4},
 pipeline(p,i,t){ // Amazon: a partner sales pipeline. Deal cards advance stage by stage and close; revenue rises behind
  const cols=4,rows=small?4:6,cards=cols*rows,colW=R.w/cols,cw=colW*.8,ch=Math.min(R.h*(small?.11:.09),46),gap=R.h*.035;
  const card=k=>{const row=Math.floor(k/cols),g=t*.07+row*.37,st=Math.floor(g),mv=smooth(clamp((g-st-.75)/.25)),pos=(k%cols+st)%(cols+1),nxt=(pos+1)%(cols+1);
   let cx=pos+mv,a=1;if(pos===cols){cx=0;a=mv}else if(nxt===cols){cx=pos+mv*.45;a=1-mv}
   return [R.x+(cx+.5)*colW,R.y+R.h*.1+row*(ch+gap)+ch/2,a]};
  if(i<cols){out.x=R.x+(i+.5)*colW;out.y=R.y+R.h*.03;out.w=cw*.55;out.h=3;out.a=.8;out.c=1;return}
  let j=i-cols;
  if(j<cards){const [x,y,a]=card(j);out.x=x;out.y=y;out.w=cw;out.h=ch;out.a=.12*a;out.c=0;return}
  j-=cards;
  if(j<cards*2){const [x,y,a]=card(j>>1),l=j&1,lw=cw*(l?.38:.62);out.x=x-cw/2+cw*.1+lw/2;out.y=y-ch*.15+l*ch*.32;out.w=lw;out.h=2.5;out.a=.45*a;out.c=0;return}
  j-=cards*2;
  if(j<cards){const [x,y,a]=card(j);out.x=x+cw*.34;out.y=y-ch*.12;out.s=2.2;out.a=.85*a;out.c=1;return}
  const q=(p.r1+t*.025)%1;out.x=fx(q);out.y=fy(.98-.85*q**1.4)+Math.sin(q*9+t*.4)*4+(p.r2-.5)*10;
  out.a=.45*Math.sin(Math.PI*q);out.s=.7+p.r3*.8;out.c=p.r4<.5?0:1},
 orgchart(p,i,t){ // Tesla: the HR system everyone depends on. HR at the top, people below, requests and approvals in motion
  const n=TREE.length;
  if(i<n*2){const nd=TREE[i>>1],sz=[6.5,5,4.2,3.6][nd.l]*(small?.75:1)*(1+.06*Math.sin(t*1.2+nd.ph)),x=fx(nd.x),y=fy(nd.y);out.c=nd.l===0?1:0;
   if(i&1){out.x=x;out.y=y+sz*2.3;out.w=sz*3;out.h=sz*1.9;out.a=.6}
   else{out.x=x;out.y=y;out.s=sz;out.a=.9;if(nd.p>=0)out.link=nd.p*2+1}return}
  const path=LEAVES[Math.floor(p.r1*LEAVES.length)];let pr=(p.r2+t*.09)%1;if(p.r3<.5)pr=1-pr;
  const segs=path.length-1,pos=pr*segs,s=Math.min(segs-1,Math.floor(pos)),f=pos-s,A=TREE[path[s]],B=TREE[path[s+1]];
  out.x=fx(lerp(A.x,B.x,f));out.y=fy(lerp(A.y+.04,B.y,f));out.a=.9*Math.sin(Math.PI*pr);out.s=1.8;out.c=1},
 compiler(p,i,t){ // Intel: source code is parsed into a tree and emitted as machine code
  const nc=CODE.length;
  if(i<nc){const k=CODE[i],on=Math.floor(t*1.1)%CODE_LINES===k.line;out.x=fx(k.x+k.w/2);out.y=fy(k.y);out.w=k.w*R.w;out.h=3.5;out.a=on?1:.55;out.c=on?1:0;return}
  let j=i-nc;
  if(j<AST.length){const nd=AST[j],vis=Math.floor(t*3)%AST.length===j;out.x=fx(nd.x);out.y=fy(nd.y);out.s=(nd.l?2.8:3.6)*(vis?1.5:1);out.a=vis?1:.8;out.c=1;out.link=nd.p>=0?nc+nd.p:-1;return}
  j-=AST.length;const BC=6,BR=small?6:12;
  if(j<BC*BR){const col=j%BC,row=Math.floor(j/BC),h=Math.sin(j*12.9898+Math.floor(t*1.6+p.r1*4)*78.233)*43758.5453,on=h-Math.floor(h)>.5;
   out.x=fx(.74+col*.045);out.y=fy(.08+row*.84/(BR-1));if(on){out.w=2.6;out.h=9;out.a=.8;out.c=0}else{out.s=1.6;out.a=.25;out.c=1}return}
  const pr=(p.r1+t*.07)%1;out.x=fx(bez(.36,.53,.72,pr));out.y=fy(bez(.08+p.r2*.84,.45,.08+p.r3*.84,pr));out.a=.6*Math.sin(Math.PI*pr);out.s=1.2;out.c=pr<.5?0:1},
 dashboard(p,i,t){ // Western Digital: raw events aggregate into an analytics dashboard
  const bars=small?6:8,rows=small?6:10,nb=bars*rows,bw=.5/bars;
  if(i<nb){const b=i%bars,r=Math.floor(i/bars),cell=Math.min(bw*R.w*.62,R.h*.36/rows*.8),hgt=.35+.55*(.5+.5*Math.sin(b*.9+t*.35));
   out.x=fx(.02+(b+.5)*bw);out.y=fy(.94-r*.36/rows);out.w=out.h=cell;out.a=(r+1)/rows<=hgt?.6:.07;out.c=b===bars-2?1:0;return}
  let j=i-nb;const K=small?18:32;
  if(j<K){const u=j/(K-1);out.x=fx(.02+u*.5);out.y=fy(.42-.24*u-.06*Math.sin(u*7+t*.45));out.s=j===K-1?3:1.6;out.a=.85;out.c=1;out.link=j<K-1?i+1:-1;return}
  j-=K;const M=small?24:44;
  if(j<M){const u=j/M,ang=u*TAU+t*.08,rad=Math.min(R.w,R.h)*.2,cuts=[.38,.64,.84,1],sg=cuts.findIndex(c=>u<c);
   out.x=fx(.78)+Math.cos(ang)*rad;out.y=fy(.3)+Math.sin(ang)*rad;out.s=2;out.a=cuts.some(c=>Math.abs(u-c)<.015)?0:[.85,.55,.35,.2][sg];out.c=sg%2;return}
  j-=M;
  if(j<3){out.x=fx(.79);out.y=fy(.64+j*.12);out.w=R.w*.32;out.h=Math.min(R.h*.08,40);out.a=.16;out.c=0;return}
  if(j<6){j-=3;out.x=fx(.68);out.y=fy(.64+j*.12);out.w=R.w*.06+R.w*.04*(.5+.5*Math.sin(t*.6+j*2));out.h=3;out.a=.7;out.c=1;return}
  const pr=(p.r1+t*.06)%1,bx=.02+(Math.floor(p.r2*bars)+.5)*bw;
  out.x=fx(lerp(-.4,bx,pr));out.y=fy(lerp(.1+p.r3*.8,.6,pr*pr));out.a=.5*Math.sin(Math.PI*pr);out.s=1;out.c=0},
 taxform(p,i,t){ // Infosys: the online tax portal. A return is filled field by field, validated and filed
  const x0=fx(.18),y0=fy(.14),pw=R.w*.64,ph=R.h*.8,cyc=(t*.08)%1,F=5,per=small?36:56,back=small?0:32;let j=i;
  if(j===0){out.x=x0+pw/2;out.y=y0+ph/2;out.w=pw;out.h=ph;out.a=.07;out.c=0;return}j--;
  if(j<per){perim(j/per,x0,y0,pw,ph);out.s=1;out.a=.45;out.c=0;return}j-=per;
  if(j<back){perim(j/back,x0+R.w*.035,y0-R.h*.03,pw,ph);out.s=.9;out.a=.16;out.c=0;return}j-=back;
  if(j<4){const act=Math.min(3,Math.floor(cyc*4));out.x=x0+pw*(.18+j*.213);out.y=y0-R.h*.07;out.s=j===act?3.4:2.2;out.a=j<=act?.9:.35;out.c=j<=act?1:0;out.link=j<3?i+1:-1;return}j-=4;
  if(j===0){out.x=x0+pw*.33;out.y=y0+ph*.07;out.w=pw*.5;out.h=6;out.a=.6;out.c=1;return}j--;
  if(j<F*3){const f=Math.floor(j/3),kind=j%3,ry=y0+ph*(.2+f*.12),lx=x0+pw*.08,full=pw*.84,bh=Math.min(16,ph*.045);
   if(kind===0){out.x=lx+pw*.09;out.y=ry;out.w=pw*.18;out.h=3;out.a=.45;out.c=0}
   else if(kind===1){out.x=lx+full/2;out.y=ry+ph*.045;out.w=full;out.h=bh;out.a=.14;out.c=0}
   else{const fill=clamp(cyc*F*1.25-f),w=Math.max(.5,full*.86*fill);out.x=lx+full*.05+w/2;out.y=ry+ph*.045;out.w=w;out.h=3;out.a=fill>0?.75:0;out.c=1}
   return}
  j-=F*3;const done=smooth(clamp((cyc-.82)/.08));
  if(j===0){out.x=x0+pw*.23;out.y=y0+ph*.86;out.w=pw*.3;out.h=Math.min(18,ph*.05);out.a=.25+.5*done;out.c=1;return}j--;
  if(j<12){const u=j/11,sz=pw*.12,cx=x0+pw*.78,cy=y0+ph*.86,px=u<.35?u/.35*.35:.35+(u-.35)/.65*.65,py=u<.35?.5+u/.35*.4:.9-(u-.35)/.65*.9;
   out.x=cx+(px-.5)*sz;out.y=cy+(py-.5)*sz;out.s=2;out.a=.95*clamp(done*12-j);out.c=1;return}
  const pr=(p.r1+t*.05)%1,ang=p.r2*TAU,rr=(1-pr)*Math.max(R.w,R.h)*.7+pw*.4;
  out.x=x0+pw/2+Math.cos(ang)*rr;out.y=y0+ph/2+Math.sin(ang)*rr*.8;out.a=.45*Math.sin(Math.PI*pr)*pr;out.s=1;out.c=0},
 sphere(p,i,t){ // a slowly turning globe of tools; neighbours along the spiral are linked
  const phi=Math.acos(1-2*(i+.5)/N),th=Math.PI*(1+Math.sqrt(5))*i+t*.1;
  const x=Math.cos(th)*Math.sin(phi),y=Math.cos(phi),z=Math.sin(th)*Math.sin(phi),tl=.38;
  const y2=y*Math.cos(tl)-z*Math.sin(tl),z2=y*Math.sin(tl)+z*Math.cos(tl),Rr=Math.min(ww,hh)*(small?.46:.42);
  out.x=ww*.5+x*Rr;out.y=hh*.48+y2*Rr;out.a=.15+.85*(.5+.5*z2);out.s=.6+(.5+.5*z2)*1.5;out.link=i+1<N?i+1:-1},
 halo(p,i,t){ // everything drifts inward toward the call to action
  const S=Math.min(ww,hh),u=((p.r1-t*.018)%1+1)%1,rr=S*(.30+.34*u),ang=p.r2*TAU+t*.06*(1.2-u);
  out.x=ww*.5+Math.cos(ang)*rr*(small?1:1.35);out.y=hh*.5+Math.sin(ang)*rr*.82;out.a=Math.sin(Math.PI*u)*(1-u*.4);out.s=.7+(1-u)*1.3},
};
const reset=i=>{out.w=0;out.h=0;out.s=1;out.c=i%3===0?1:0;out.link=-1};
let sprites={};
function sprite(c,light){ // a tiny pre-rendered glow, rebuilt only when the colour moves noticeably
 const key=c.map(v=>Math.round(v*24)).join()+light;if(sprites[key])return sprites[key];
 const s=document.createElement('canvas');s.width=s.height=32;const x=s.getContext('2d'),g=x.createRadialGradient(16,16,0,16,16,16);
 const col=c.map(v=>Math.round(v*255)).join(',');g.addColorStop(0,`rgba(${col},${light?.55:.7})`);g.addColorStop(.35,`rgba(${col},${light?.16:.22})`);g.addColorStop(1,`rgba(${col},0)`);
 x.fillStyle=g;x.fillRect(0,0,32,32);if(Object.keys(sprites).length>40)sprites={};return sprites[key]=s;
}
const BUCKETS=8,paths=[...Array(BUCKETS*2)].map(()=>[]),linksA=[],linksB=[];
function drawParticles(P,t){
 const light=root.dataset.theme==='light',a=CHAPTERS[P.k],b=CHAPTERS[P.n];
 pctx.clearRect(0,0,ww,hh);
 const fa=FORMS[a.form],fb=FORMS[b.form],tone=c=>light?c.map(v=>v*.62):c;
 const colA=tone(P.A),colB=tone(P.B),strength=(light?.7:1)*(small?.55:1),safe=P.safe*.85;
 const px=ptr.x*14,py=ptr.y*10;
 paths.forEach(q=>q.length=0);linksA.length=0;linksB.length=0;
 for(let i=0;i<N;i++){
  const p=pts[i];
  reset(i);fa(p,i,t);const ax=out.x,ay=out.y,aa=out.a,as=out.s,aw=out.w,ah=out.h,ac=out.c,al=out.link;
  let x=ax,y=ay,al2=aa,s=as,w=aw,h=ah,c=ac,u=0;
  if(P.u>0&&b!==a){reset(i);fb(p,i,t);u=smooth(clamp((P.u-p.delay)/(1-.38)));
   // particles travel on a slight arc between formations so the morph reads as motion, not a fade
   const lift=Math.sin(Math.PI*u)*(p.r3-.5)*hh*.12;
   x=lerp(ax,out.x,u);y=lerp(ay,out.y,u)+lift;al2=lerp(aa,out.a,u);s=lerp(as,out.s,u);w=lerp(aw,out.w,u);h=lerp(ah,out.h,u);if(u>.5)c=out.c;
   if(out.link>=0)linksB.push(i,out.link,u)}
  if(al>=0)linksA.push(i,al,1-u);
  const depth=.4+p.r3*.6;x+=px*depth;y+=py*depth;
  const cx=(x/ww-.5)/.24,col=Math.exp(-cx*cx);
  const alpha=clamp(al2*(1-safe*col))*strength*lerp(a.dim||1,b.dim||1,u);
  p.x=x;p.y=y;p.al=alpha;p.sz=s;p.w=w;p.h=h;
  if(alpha<.02||x<-60||x>ww+60||y<-60||y>hh+60)continue;
  paths[(c?BUCKETS:0)+Math.min(BUCKETS-1,Math.floor(alpha*BUCKETS))].push(i);
 }
 // links first, beneath the points
 pctx.lineWidth=.8;
 const strokeLinks=(list,col)=>{if(!list.length)return;pctx.strokeStyle=`rgb(${col.map(v=>Math.round(v*255)).join(',')})`;
  const far=Math.min(ww,hh)*.6;
  for(let lvl=1;lvl<=3;lvl++){pctx.beginPath();let any=false;
   for(let j=0;j<list.length;j+=3){const p=pts[list[j]],q=pts[list[j+1]];if(!q||Math.ceil(list[j+2]*3)!==lvl)continue;
    if(Math.abs(p.x-q.x)+Math.abs(p.y-q.y)>far||p.al<.03)continue;
    pctx.moveTo(p.x,p.y);pctx.lineTo(q.x,q.y);any=true}
   if(any){pctx.globalAlpha=(light?.16:.24)*lvl/3;pctx.stroke()}}};
 strokeLinks(linksA,colB);strokeLinks(linksB,colB);
 // points and interface shapes, batched by colour and opacity
 const rr=!!pctx.roundRect;
 for(let g=0;g<paths.length;g++){const list=paths[g];if(!list.length)continue;
  const col=g>=BUCKETS?colB:colA,lvl=(g%BUCKETS+.6)/BUCKETS;
  pctx.globalAlpha=lvl;pctx.fillStyle=`rgb(${col.map(v=>Math.round(v*255)).join(',')})`;pctx.beginPath();
  for(const i of list){const p=pts[i];
   if(p.w>1.5||p.h>1.5){const w=Math.max(p.w,1),h=Math.max(p.h,1);rr?pctx.roundRect(p.x-w/2,p.y-h/2,w,h,Math.min(2.5,h/2)):pctx.rect(p.x-w/2,p.y-h/2,w,h)}
   else{pctx.moveTo(p.x+p.sz,p.y);pctx.arc(p.x,p.y,p.sz,0,TAU)}}
  pctx.fill();
  if(g%BUCKETS>=BUCKETS-2){const spr=sprite(col,light);pctx.globalAlpha=lvl*.8;for(const i of list){const p=pts[i];if(p.w>1.5)continue;const r=p.sz*6;pctx.drawImage(spr,p.x-r,p.y-r,r*2,r*2)}}
 }
 pctx.globalAlpha=1;
}

/* ---------- scroll → scene ---------- */
const anchors=CHAPTERS.map(c=>$(c.sel));
function sceneFromScroll(){
 // Each section "owns" the scene while its middle is near the middle of the viewport;
 // the morph happens in the space between two sections, so the art matches what you are reading.
 const probe=innerHeight*.5,mids=anchors.map(el=>{if(!el)return 0;const r=el.getBoundingClientRect();return r.top+Math.min(r.height,innerHeight)*.5});
 if(probe<=mids[0])return 0;
 for(let i=0;i<LAST;i++){if(probe<mids[i+1]){const raw=(probe-mids[i])/Math.max(1,mids[i+1]-mids[i]);return i+smooth(clamp((raw-.22)/.56))}}
 return LAST;
}
function resize(){
 ww=innerWidth;hh=innerHeight;small=ww<670;
 const dpr=Math.min(devicePixelRatio||1,2);
 pcv.width=Math.round(ww*dpr);pcv.height=Math.round(hh*dpr);pcv.style.width=ww+'px';pcv.style.height=hh+'px';pctx.setTransform(dpr,0,0,dpr,0,0);
 // The silk field is soft by nature, so it renders at a fraction of the screen and the browser scales it up.
 const scale=small?.32:(dpr>1?.42:.5);
 gcv.width=Math.max(2,Math.round(ww*scale));gcv.height=Math.max(2,Math.round(hh*scale));gcv.style.width=ww+'px';gcv.style.height=hh+'px';
 if(!pts.length||N!==(small?150:300))buildParticles();
 buildPlans();
}
function render(force){const P=blendChapter(scene);drawField(P);drawParticles(P,time);if(force)gcv.classList.add('ready')}
function frame(now){
 rafId=requestAnimationFrame(frame);
 const dt=Math.min(64,now-(lastNow||now));lastNow=now;
 scene+=(target-scene)*(1-Math.pow(.9,dt/16.7));if(Math.abs(target-scene)<.0005)scene=target;
 ptr.x+=(ptr.tx-ptr.x)*(1-Math.pow(.94,dt/16.7));ptr.y+=(ptr.ty-ptr.y)*(1-Math.pow(.94,dt/16.7));
 time+=dt/1000;
 const P=blendChapter(scene);
 // the field moves slowly, so ~30fps is indistinguishable; particles get every frame on desktop
 glAcc+=dt;if(glAcc>=32){glAcc=0;drawField(P)}
 ptAcc+=dt;if(ptAcc>=(small?32:15)){ptAcc=0;drawParticles(P,time)}
}
function start(){cancelAnimationFrame(rafId);lastNow=0;if(still){scene=target;render(true)}else{render(true);rafId=requestAnimationFrame(frame)}}
const onMotionChange=e=>{still=e.matches;if(still)root.classList.remove('motion-ready');start()};
listen(motionQuery,'change',onMotionChange);
if(finePointer)listen(window,'pointermove',e=>{ptr.tx=e.clientX/innerWidth*2-1;ptr.ty=e.clientY/innerHeight*2-1},{passive:true});
const themeWatch=new MutationObserver(()=>{if(still)render()});themeWatch.observe(root,{attributes:true,attributeFilter:['data-theme']});
if(still)time=14; // a composed, static frame for reduced motion

function updateScroll(){
 const progress=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
 $('#progress').style.transform='scaleX('+clamp(progress)+')';
 const tl=$('#timeline'),r=tl.getBoundingClientRect(),span=Math.max(1,r.height-20),amt=clamp((innerHeight*.48-r.top)/span);
 $('#timeline-progress').style.height=(amt*span)+'px';
 $$('.career-entry').forEach(el=>{const box=el.getBoundingClientRect();el.classList.toggle('is-active',box.top<innerHeight*.66&&box.bottom>innerHeight*.30)});
 let selected='';for(const id of ['about','work','skills','contact']){let el=document.getElementById(id);if(el.getBoundingClientRect().top<innerHeight*.54)selected=id}
 $$('.nav-links a').forEach(a=>a.classList.toggle('active',a.hash==='#'+selected));
 target=sceneFromScroll();if(still){scene=target;render()}
}
const onScroll=()=>{if(!scrollRaf)scrollRaf=requestAnimationFrame(()=>{scrollRaf=0;updateScroll()})};
listen(window,'scroll',onScroll,{passive:true});listen(window,'resize',()=>{resize();updateScroll();if(still)render()});
resize();updateScroll();scene=target;start();
return ()=>{eventCleanups.forEach(cleanup=>cleanup());observer.disconnect();themeWatch.disconnect();cancelAnimationFrame(rafId);cancelAnimationFrame(scrollRaf);root.classList.remove('motion-ready');
 if(gl){const lose=gl.getExtension('WEBGL_lose_context');if(lose)lose.loseContext()}
 if(gcv.dataset.injected)gcv.remove()};
}
