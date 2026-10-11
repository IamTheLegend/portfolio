/* Approved V12 scroll-driven animation and navigation interactions. */

export function initPortfolio() { 'use strict';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let theme='dark';try{theme=localStorage.getItem('prasanth-preview-theme')||'dark'}catch(e){}const eventCleanups=[];const listen=(el,type,handler,options)=>{el.addEventListener(type,handler,options);eventCleanups.push(()=>el.removeEventListener(type,handler,options))};const setTheme=t=>{theme=t;root.dataset.theme=t;try{localStorage.setItem('prasanth-preview-theme',t)}catch(e){};$('#theme-btn').setAttribute('aria-label','Switch to '+(t==='dark'?'light':'dark')+' mode');$('#theme-icon').innerHTML=t==='dark'?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>':'<path d="M20.75 14.25A8.5 8.5 0 019.75 3.25 8.5 8.5 0 1020.75 14.25z"/>';};setTheme(theme);listen($('#theme-btn'),'click',()=>setTheme(theme==='dark'?'light':'dark'));const menuBtn=$('#menu-btn'),mobile=$('#mobile-menu');listen(menuBtn,'click',()=>{let open=mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation');});$$('#mobile-menu a').forEach(a=>listen(a,'click',()=>{mobile.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));$('#year').textContent=(new Date()).getFullYear();
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}})},{threshold:.08,rootMargin:'0px 0px -35px 0px'});$$('.reveal').forEach(e=>observer.observe(e));if(!reduce)root.classList.add('motion-ready');
const cvs=$('#ambient-canvas'),ctx=cvs.getContext('2d');
let ww=0,hh=0,t=0,scene=0,target=0,scrollRaf=0,rafId=0;
const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
const lerp=(a,b,t)=>a+(b-a)*t;
function resize(){ww=innerWidth;hh=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);cvs.width=Math.round(ww*dpr);cvs.height=Math.round(hh*dpr);cvs.style.width=ww+'px';cvs.style.height=hh+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
function rounded(x,y,w,h,r=9){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
function paintRect(x,y,w,h,color,r=0){ctx.fillStyle=color;r?rounded(x,y,w,h,r):ctx.beginPath();if(!r)ctx.rect(x,y,w,h);ctx.fill()}
function strokeRect(x,y,w,h,color,r=0,lw=1){ctx.strokeStyle=color;ctx.lineWidth=lw;r?rounded(x,y,w,h,r):ctx.beginPath();if(!r)ctx.rect(x,y,w,h);ctx.stroke()}
function text(t,x,y,size=12,color,weight=500){ctx.fillStyle=color||C.ink;ctx.font=`${weight} ${size}px Inter,system-ui,-apple-system,sans-serif`;ctx.textBaseline='alphabetic';ctx.fillText(t,x,y)}
function line(x1,y1,x2,y2,color=C.line,lw=1){ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
function dot(x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}
function pill(x,y,w,label,color=C.accent){paintRect(x,y,w,22,C.pill,10);dot(x+12,y+11,3.1,color);text(label,x+23,y+15,9.5,C.ink,650)}
function stripes(x,y,w,n=3,opacity=1){for(let i=0;i<n;i++)paintRect(x,y+i*14,w*(.85+(i%3)*.075),4,C.faint,2)}
function card(x,y,w,h){paintRect(x,y,w,h,C.card,11);strokeRect(x,y,w,h,C.stroke,11,.8)}
let C={};
const scenes=[
  {type:'workspace',title:'Digital workspace',subtitle:'A look at the kinds of software I build',sidebar:['Overview','Products','Activity','Reports'],accent:'#eaa083'},
  {type:'amazon',title:'Partner & sales workspace',subtitle:'Opportunities and partner workflows',sidebar:['Overview','Pipeline','Partners','Reports'],accent:'#efa15f'},
  {type:'tesla',title:'Employee operations',subtitle:'People, training and internal tools',sidebar:['People','Learning','Recognition','Teams'],accent:'#e98189'},
  {type:'intel',title:'Compiler tools',subtitle:'Builds, diagnostics and automated tests',sidebar:['Workspace','Build','Tests','Diagnostics'],accent:'#79b6ed'},
  {type:'western',title:'Analytics workspace',subtitle:'Reporting and decisions from data',sidebar:['Overview','Dashboards','Datasets','Reports'],accent:'#938dee'},
  {type:'infosys',title:'Online tax services',subtitle:'A straightforward digital filing journey',sidebar:['Home','Returns','Documents','Help'],accent:'#69bbbc'},
  {type:'skills',title:'Engineering toolkit',subtitle:'From interfaces through data and AI',sidebar:['Frontend','Services','Data','Cloud'],accent:'#a8a2f1'},
  {type:'contact',title:'Built across industries',subtitle:'Different products, one engineering approach',sidebar:['Products','Systems','People','Impact'],accent:'#eea484'},
];
function setColors(a){const dark=theme==='dark';C={
 ink:dark?'#e8edf4':'#27394c',muted:dark?'#a6afc1':'#5e7184',faint:dark?'rgba(175,192,215,.20)':'rgba(72,91,119,.20)',
 paper:dark?'rgba(16,22,31,.87)':'rgba(252,253,255,.94)',card:dark?'rgba(37,44,57,.91)':'rgba(238,244,251,.94)',
 inner:dark?'rgba(29,35,47,.97)':'rgba(248,250,254,.98)',stroke:dark?'rgba(182,196,219,.25)':'rgba(62,92,125,.23)',
 line:dark?'rgba(173,194,224,.24)':'rgba(68,109,167,.20)',pill:dark?'rgba(65,72,86,.9)':'rgba(226,235,246,.95)',
 accent:a,success:dark?'#80d8b7':'#198b70',shade:dark?'rgba(19,25,34,.45)':'rgba(237,243,251,.45)'}
}
function smallIcon(x,y,type,color=C.accent){ctx.save();ctx.translate(x,y);ctx.strokeStyle=color;ctx.lineWidth=1.65;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();
 if(type==='cloud'){ctx.moveTo(-7,3);ctx.bezierCurveTo(-12,-2,-7,-8,-2,-7);ctx.bezierCurveTo(1,-14,11,-8,11,-2);ctx.bezierCurveTo(19,-1,17,8,9,8);ctx.lineTo(-5,8);ctx.bezierCurveTo(-13,8,-13,3,-7,3)}
 else if(type==='code'){ctx.moveTo(-6,-5);ctx.lineTo(-12,0);ctx.lineTo(-6,5);ctx.moveTo(6,-5);ctx.lineTo(12,0);ctx.lineTo(6,5);ctx.moveTo(3,-9);ctx.lineTo(-3,9)}
 else if(type==='bars'){ctx.moveTo(-11,9);ctx.lineTo(-11,1);ctx.moveTo(-2,9);ctx.lineTo(-2,-9);ctx.moveTo(7,9);ctx.lineTo(7,-3)}
 else if(type==='check'){ctx.moveTo(-9,0);ctx.lineTo(-2,7);ctx.lineTo(11,-8)}
 else if(type==='gear'){ctx.arc(0,0,7,0,Math.PI*2);ctx.moveTo(0,-12);ctx.lineTo(0,-8);ctx.moveTo(0,8);ctx.lineTo(0,12);ctx.moveTo(12,0);ctx.lineTo(8,0);ctx.moveTo(-12,0);ctx.lineTo(-8,0)}
 else if(type==='users'){ctx.arc(-4,-4,4,0,Math.PI*2);ctx.moveTo(-12,10);ctx.quadraticCurveTo(-4,-1,5,10);ctx.moveTo(9,-1);ctx.arc(8,-5,3,0,Math.PI*2);ctx.moveTo(6,4);ctx.quadraticCurveTo(12,2,13,10)}
 else {ctx.moveTo(-9,8);ctx.lineTo(-9,-7);ctx.lineTo(0,-11);ctx.lineTo(9,-7);ctx.lineTo(9,8);ctx.closePath()}
 ctx.stroke();ctx.restore()}
function baseWindow(d,st){
 // A single consistent app shell makes each chapter feel part of one journey.
 const a=d.accent;setColors(a);ctx.shadowColor=theme==='dark'?'rgba(7,11,20,.28)':'rgba(70,91,122,.12)';ctx.shadowBlur=26;ctx.shadowOffsetY=12;
 paintRect(0,0,540,352,C.paper,17);ctx.shadowBlur=0;ctx.shadowOffsetY=0;strokeRect(0,0,540,352,C.stroke,17,1.2);
 paintRect(0,0,540,35,C.inner,17);paintRect(0,18,540,17,C.inner);line(0,35,540,35,C.stroke);
 for(let i=0;i<3;i++)dot(18+i*13,18,3.3,[a,C.muted,C.faint][i]);
 paintRect(135,10,269,17,C.card,6);text('prasanth / interactive portfolio',152,22,8.5,C.muted,500);
 paintRect(0,35,106,317,C.inner,0);line(106,35,106,352,C.stroke);
 paintRect(18,52,72,23,C.card,6);smallIcon(31,63,'code',a);text('PORTFOLIO',44,67,8.3,C.ink,700);
 for(let i=0;i<4;i++){if(i===0)paintRect(9,101+i*42,88,29,C.pill,6);dot(24,115+i*42,3.1,i===0?a:C.muted);text(d.sidebar[i],34,119+i*42,9.4,i===0?C.ink:C.muted,i===0?700:500)}
 line(15,290,90,290,C.stroke);dot(24,320,7,a);text('Prasanth',37,323,9.6,C.ink,650);
 text(d.title,126,67,18,C.ink,720);text(d.subtitle,126,86,9.7,C.muted,480);
 paintRect(479,54,43,22,C.pill,7);text('LIVE',490,69,9,a,750);
 line(126,99,522,99,C.stroke);
}
function metric(x,y,w,label,value,color){card(x,y,w,57);text(label,x+12,y+19,9.3,C.muted,550);text(value,x+12,y+43,21,color||C.ink,710)}
function chart(x,y,w,h,phase,color){
 line(x,y+h,x+w,y+h,C.line);for(let k=1;k<4;k++)line(x,y+h*k/4,x+w,y+h*k/4,C.stroke,.55);
 const pts=[];for(let j=0;j<24;j++){let yy=.56-.24*Math.sin(j*.3+phase*.9)-.11*Math.sin(j*.78+phase*.4)+.06*Math.cos(j*.27);pts.push([x+j*w/23,y+clamp(yy,.1,.9)*h])}
 ctx.beginPath();pts.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.strokeStyle=color||C.accent;ctx.lineWidth=2.5;ctx.stroke();dot(pts[pts.length-1][0],pts[pts.length-1][1],3.6,color||C.accent)
}

/* Signals, not an application screen. Figures are the user's reported reach / performance,
   while the animated curves are abstract decoration, not a chart of measured time-series data. */
function drawHeroSignals(d,tm){
  setColors('#efa889');
  const dark=theme==='dark';
  const warm=dark?'rgba(255,174,134,':'rgba(174,96,65,';
  const cool=dark?'rgba(134,181,236,':'rgba(66,114,184,';
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
  // Calibrated dots and hairlines without any browser frame or overlapping cards.
  for(let c=0;c<9;c++)for(let r=0;r<6;r++){
    let px=42+c*61,py=59+r*47;
    dot(px,py,1.05,(c+r)%4===0?warm+'.21)':cool+'.11)');
  }
  for(let r=0;r<4;r++)line(29,85+r*60,536,85+r*60,C.line,.7);
  // Three distinct curves. No axes or fabricated trend labels.
  const streams=[
    {color:warm+'.73)',width:2.3,base:236,amplitude:20,phase:0},
    {color:cool+'.58)',width:1.6,base:176,amplitude:17,phase:2.2},
    {color:warm+'.26)',width:1,base:296,amplitude:11,phase:4.2}
  ];
  streams.forEach((b,i)=>{
    ctx.beginPath();
    for(let j=0;j<=104;j++){
      let x=25+j*5.05;
      let bend=b.base-(x/540)*(i===0?53:i===1?15:37);
      let y=bend + b.amplitude*Math.sin(x*.014+b.phase+tm*.19)+10*Math.sin(x*.032+b.phase*.5+tm*.12);
      j?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.strokeStyle=b.color;ctx.lineWidth=b.width;ctx.stroke();
    const q=((tm*(i===0?31:18)+i*146)%508)+25;
    const y=b.base-(q/540)*(i===0?53:i===1?15:37)+b.amplitude*Math.sin(q*.014+b.phase+tm*.19)+10*Math.sin(q*.032+b.phase*.5+tm*.12);
    dot(q,y,i===0?4.3:2.7,i===1?cool+'.92)':warm+'.92)');
    ctx.beginPath();ctx.arc(q,y,i===0?11:7,0,2*Math.PI);ctx.strokeStyle=i===1?cool+'.35)':warm+'.31)';ctx.lineWidth=.8;ctx.stroke();
  });
  // Metrics are compact annotations to the abstract visual, never floating screens.
  const ink=dark?'rgba(243,241,244,.90)':'rgba(32,47,68,.92)';
  const secondary=dark?'rgba(190,196,210,.7)':'rgba(90,105,125,.78)';
  line(444,68,532,68,warm+'.50)',1);
  text('120K',459,101,29,ink,735);
  text('PARTNERS REACHED',460,119,9,secondary,670);
  line(332,289,526,289,cool+'.44)',1);
  text('57%',332,324,26,ink,735);
  text('FASTER PAGE LOADS',333,340,9,secondary,670);
  ctx.restore();
}
function drawWorkspace(d,tm){baseWindow(d);metric(126,113,118,'ACTIVE MODULES','12');metric(254,113,118,'SERVICES','08');metric(382,113,140,'HEALTH','99.9%',C.success);
 card(126,183,262,153);text('Product overview',140,207,12,C.ink,700);chart(140,220,231,85,tm*.35,d.accent);
 card(400,183,122,153);text('Activity',414,207,12,C.ink,680);['Build','Review','Deploy'].forEach((x,i)=>{dot(415,231+i*34,3.2,i===1?d.accent:C.success);text(x,427,235+i*34,9.4,C.ink,610);paintRect(427,242+i*34,76-(i*9),3,C.faint,2)})}
function drawAmazon(d,tm){baseWindow(d);pill(128,109,117,'Pipeline active',d.accent);pill(256,109,109,'Partner view',C.success);
 const names=['New','In progress','Completed'],cols=[130,262,394];for(let i=0;i<3;i++){card(cols[i],147,123,185);text(names[i],cols[i]+11,168,10.8,C.ink,700);text(['06 opportunities','12 opportunities','09 opportunities'][i],cols[i]+11,184,8.6,C.muted);for(let j=0;j<2;j++){paintRect(cols[i]+10,199+j*61,102,49,C.inner,7);strokeRect(cols[i]+10,199+j*61,102,49,C.stroke,7,.6);paintRect(cols[i]+19,210+j*61,44+(j*11),4,C.faint,3);paintRect(cols[i]+19,222+j*61,72,4,C.faint,3);pill(cols[i]+17,230+j*61,76,i===2?'Approved':'In review',i===2?C.success:d.accent)}}
 const step=Math.floor(tm*.7)%3;ctx.save();ctx.globalAlpha=.85;dot(cols[step]+108,190,4.5,d.accent);ctx.restore()}
function drawTesla(d,tm){baseWindow(d);metric(126,112,120,'EMPLOYEE TOOLS','05');metric(257,112,120,'TRAINING','87%',C.success);metric(388,112,134,'WORKFLOWS','24');
 card(126,182,219,151);text('People & teams',141,204,12,C.ink,700);[['AK','Training complete'],['RS','Profile updated'],['PM','Recognition sent']].forEach(([ini,label],i)=>{dot(153,228+i*33,11.4,[d.accent,'#8cafe3',C.success][i]);text(ini,145,231+i*33,8,'#14202c',750);text(label,174,231+i*33,9.5,C.ink,610);});
 card(357,182,165,151);text('Learning progress',371,204,11.5,C.ink,700);[.72,.9,.54].forEach((v,i)=>{text(['Onboarding','Security','Learning'][i],372,229+i*32,9,C.muted);paintRect(372,234+i*32,127,6,C.pill,3);paintRect(372,234+i*32,127*clamp(v+.03*Math.sin(tm+i)),6,i===1?C.success:d.accent,3)})}
function drawIntel(d,tm){baseWindow(d);card(125,108,271,228);card(407,108,115,228);
 paintRect(126,110,269,26,C.inner,9);text('compiler / validation.cpp',139,127,10,C.muted,680);
 const rows=[['01','int validate() {'],['02','  auto result = compile();'],['03','  if (!result.ok()) {'],['04','    report(result);'],['05','  }'],['06','  return 0;'],['07','}']];rows.forEach(([n,code],i)=>{text(n,141,152+i*24,9,C.muted,500);text(code,163,152+i*24,10.4,i===2?d.accent:C.ink,520)});
 const cursor=(Math.floor(tm*1.3)%7);paintRect(160,157+cursor*24,188,1.3,d.accent,1);
 text('TEST RUN',418,128,9.7,C.muted,750);[['Parsing','PASS'],['Compile','PASS'],['Validate','PASS'],['Report','PASS']].forEach(([k,v],i)=>{dot(420,155+i*41,3.8,C.success);text(k,431,158+i*41,9.1,C.ink,580);text(v,431,170+i*41,8.3,C.success,750)});}
function drawWestern(d,tm){baseWindow(d);metric(126,112,120,'DATA SOURCES','18');metric(257,112,120,'DASHBOARDS','12');metric(388,112,134,'PIPELINES','LIVE',C.success);
 card(126,182,254,152);text('Performance over time',140,203,11.5,C.ink,700);chart(142,221,216,94,tm*.25,d.accent);
 card(391,182,131,152);text('Data processed',404,203,10.8,C.ink,690);for(let i=0;i<9;i++){let barH=14+22*(.5+.5*Math.sin(i*.7+tm*.3));paintRect(403+i*12,314-barH,8,barH,i%3===0?d.accent:C.muted,3)}line(402,315,509,315,C.stroke)}
function drawInfosys(d,tm){baseWindow(d);pill(127,110,145,'Return in progress',d.accent);
 const steps=['Prepare','Validate','Submit'];steps.forEach((label,i)=>{const x=145+i*133;dot(x,160,11,i===Math.floor(tm*.22)%3?d.accent:C.card);strokeRect(x-11,149,22,22,C.stroke,11);text(String(i+1),x-3,164,10,C.ink,690);text(label,x+19,164,11,C.ink,650);if(i<2)line(x+70,160,x+108,160,C.line)});
 card(126,187,249,146);text('Return details',141,210,12,C.ink,700);[['Personal information','Complete'],['Documents','Verified'],['Review status','In progress']].forEach(([l,r],i)=>{text(l,142,238+i*30,9.4,C.ink,590);text(r,293,238+i*30,8.5,i<2?C.success:d.accent,640);line(140,245+i*30,358,245+i*30,C.stroke,.5)});
 card(386,187,136,146);smallIcon(416,225,'check',C.success);text('Secure filing',397,266,11.7,C.ink,710);text('Step by step',397,286,9.2,C.muted);paintRect(398,299,96,6,C.pill,3);paintRect(398,299,96*(.5+.25*Math.sin(tm*.3)),6,d.accent,3)}
function drawSkills(d,tm){baseWindow(d);const nodes=[{x:130,y:113,t:'Frontend',sub:'React · Angular',ico:'code'},{x:333,y:113,t:'Services',sub:'Java · Python',ico:'gear'},{x:130,y:224,t:'Data',sub:'SQL · Analytics',ico:'bars'},{x:333,y:224,t:'Cloud & AI',sub:'AWS · Agents',ico:'cloud'}];
 nodes.forEach((n,i)=>{card(n.x,n.y,187,96);smallIcon(n.x+27,n.y+30,n.ico,i===Math.floor(tm*.33)%4?d.accent:C.muted);text(n.t,n.x+46,n.y+33,13,C.ink,720);text(n.sub,n.x+14,n.y+66,9.3,C.muted);});line(316,158,333,158,d.accent,1.5);line(316,269,333,269,C.line,1.5);line(226,208,226,224,C.line,1.5);line(425,208,425,224,C.line,1.5);dot(324,158,3.2,d.accent)}
function drawContact(d,tm){baseWindow(d);const boxes=[['Partners','#efa15f'],['People','#e98189'],['Compilers','#79b6ed'],['Analytics','#938dee'],['Tax services','#69bbbc']];
 boxes.forEach(([n,col],i)=>{const colNum=i%2,row=Math.floor(i/2),x=128+colNum*196,y=112+row*69;card(x,y,181,58);dot(x+22,y+28,8,col);text(n,x+39,y+31,12,C.ink,650);paintRect(x+126,y+26,36,4,C.faint,2)});
 ctx.save();ctx.globalAlpha=.46;ctx.strokeStyle=d.accent;ctx.beginPath();ctx.moveTo(309,142);ctx.bezierCurveTo(323,142,324,210,332,211);ctx.bezierCurveTo(322,255,321,278,309,279);ctx.stroke();ctx.restore()}
const renderers=[drawHeroSignals,drawAmazon,drawTesla,drawIntel,drawWestern,drawInfosys,drawSkills,drawContact];

const atmospheres=[
 ['#e89d85','#6a8bb7'], // hero: warm graphite and blue details
 ['#eeaa62','#c56e43'], // Amazon: warm amber
 ['#db6472','#9c4558'], // Tesla: restrained crimson
 ['#6eb6ed','#527dd8'], // Intel: cool electric blue
 ['#a18de5','#677fdd'], // Western Digital: violet and indigo
 ['#66bcb4','#4b92c0'], // Infosys: teal
 ['#9e9bdf','#6d9bd2'], // skills: connected technologies
 ['#e0a380','#828ab9']  // contact: return to the portfolio palette
];
function rgb(hex){let h=hex.replace('#','');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}
function rgba(arr,alpha){return `rgba(${arr.map(v=>Math.round(v)).join(',')},${alpha})`}
function hueBlend(a,b,u){return a.map((v,i)=>lerp(v,b[i],u))}
function drawAtmosphere(){
  const k=Math.floor(clamp(scene,0,7)),n=Math.min(k+1,7),u=clamp(scene-k);
  const a=hueBlend(rgb(atmospheres[k][0]),rgb(atmospheres[n][0]),u),
        b=hueBlend(rgb(atmospheres[k][1]),rgb(atmospheres[n][1]),u);
  const dark=theme==='dark';
  const main=ctx.createRadialGradient(ww*.85,hh*.53,ww*.035,ww*.81,hh*.53,ww*.62);
  main.addColorStop(0,rgba(a,dark?.185:.132));
  main.addColorStop(.30,rgba(a,dark?.10:.073));
  main.addColorStop(.70,rgba(b,dark?.045:.033));
  main.addColorStop(1,rgba(a,0));
  ctx.fillStyle=main;ctx.fillRect(0,0,ww,hh);
  const spill=ctx.createRadialGradient(ww*.69,hh*.97,10,ww*.69,hh*.97,ww*.45);
  spill.addColorStop(0,rgba(b,dark?.097:.073));spill.addColorStop(1,rgba(b,0));
  ctx.fillStyle=spill;ctx.fillRect(0,0,ww,hh);
  // Intentionally no vertical filaments or vignette bars: the narrative
  // geometry is drawn directly in the canvas above the ambient wash.
}

function drawUI(index,opacity,offset,tm){if(opacity<=.002)return;ctx.save();ctx.globalAlpha=opacity;ctx.translate(0,offset);renderers[index](scenes[index],tm);ctx.restore()}
function sceneFromScroll(){
 /* Continuous scene interpolation from hero to about with no hard jump. */
 // Distinct anchors make the imagery follow the actual content in the viewport.
 const nodes=[document.querySelector('.hero'),document.getElementById('about'),...$$('.career-entry'),document.getElementById('skills'),document.getElementById('contact')];
 const stages=[0,.30,1,2,3,4,5,6,7];const currentY=scrollY+innerHeight*.60;
 const positions=nodes.map(n=>n?window.scrollY+n.getBoundingClientRect().top:0);
 if(currentY<=positions[0]+innerHeight*.2)return 0;
 for(let i=1;i<positions.length;i++){const before=positions[i-1],after=positions[i];if(currentY<after){const raw=clamp((currentY-before)/Math.max(1,after-before));const start=i<=2?.22:.67,span=i<=2?.48:.26;let u=clamp((raw-start)/span);u=u*u*(3-2*u);return lerp(stages[i-1],stages[i],u)}}return 7;
}


/* V12: One continuous story drawn as exposed vectors and signals. No screen surfaces,
   dark boxes, gradient masks, image frames, or private application UI. Each chapter
   describes the kind of software built, not a recreation of proprietary applications. */
function draw(){
 ctx.clearRect(0,0,ww,hh);
 if(!ww||!hh)return;
 drawAtmosphere();
 const dark=theme==='dark',mobile=ww<670;
 const pulse=reduce?1.7:t*.001;
 const curr=clamp(scene,0,7),before=Math.floor(curr),after=Math.min(7,before+1);
 const blend=clamp(curr-before);
 const a=hueBlend(rgb(atmospheres[before][0]),rgb(atmospheres[after][0]),blend);
 const b=hueBlend(rgb(atmospheres[before][1]),rgb(atmospheres[after][1]),blend);
 const fog=dark?[179,189,214]:[70,104,145];
 const coordLeft=mobile?ww*.18:ww*(curr<.65?.45:.61);
 const coordTop=hh*(mobile?.07:.065);
 const drawWidth=mobile?ww*.93:ww*(curr<.65?.66:.52);
 const drawHeight=hh*.86;
 const globalAlpha=(mobile?(dark?.38:.28):(dark?.68:.50));
 const sX=drawWidth/720,sY=drawHeight/640;
 const solid=(v,alpha)=>rgba(v,alpha);
 const wave=(x,n,sh=1)=>Math.sin(x*.012+2*n+pulse*.35)*12*sh+Math.cos(x*.024+n+pulse*.21)*5*sh;
 const P=(x,y,r,col,alpha=1)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=solid(col,alpha);ctx.fill()};
 const L=(x1,y1,x2,y2,col,alpha=.5,width=1)=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.lineWidth=width;ctx.strokeStyle=solid(col,alpha);ctx.stroke()};
 const R=(x,y,r,col,alpha=.35,width=1)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.lineWidth=width;ctx.strokeStyle=solid(col,alpha);ctx.stroke()};
 const T=(str,x,y,size=12,col=fog,alpha=.58,weight=600)=>{ctx.save();ctx.globalAlpha*=alpha;ctx.fillStyle=solid(col,1);ctx.font=`${weight} ${size}px Inter, ui-sans-serif, system-ui,sans-serif`;ctx.letterSpacing='0.07px';ctx.fillText(str,x,y);ctx.restore()};
 const C=(startX,startY,endX,endY,col,alpha=.55,width=1.2,offset=0)=>{
   ctx.beginPath();ctx.moveTo(startX,startY);
   ctx.bezierCurveTo(startX+(endX-startX)*.44,startY+offset,endX-(endX-startX)*.45,endY-offset,endX,endY);
   ctx.lineWidth=width;ctx.strokeStyle=solid(col,alpha);ctx.stroke();
 };
 const trail=(x1,y1,x2,y2,col,progress,size=3)=>{
   let u=((progress%1)+1)%1;
   const px=x1+(x2-x1)*u,py=y1+(y2-y1)*u;
   P(px,py,size,col,.91);R(px,py,size*3.0,col,.18,.8);
 };
 const group=(n,x,y,col)=>{
   for(let j=0;j<n;j++){
     let dx=(j%3)*18+(Math.floor(j/3)%2)*8,dy=Math.floor(j/3)*20;
     R(x+dx,y+dy,5.2,col,.7,1.3);C(x+dx-6,y+dy+12,x+dx+6,y+dy+12,col,.48,1.2,-5);
   }
 };
 // A permanent, slowly breathing signal bed ties the scenes together.
 ctx.save();
 ctx.translate(coordLeft,coordTop);ctx.scale(sX,sY);
 const trackOpacity=curr<.7?.36:.17;
 for(let i=0;i<7;i++){
   const color=i%3===0?b:(i%2?a:fog);
   ctx.beginPath();
   for(let j=0;j<=78;j++){
     const u=j/78,x=-45+u*855;
     const y=470-170*u+(i-3)*21+wave(x,i,1.5)*Math.sin(Math.PI*u);
     j?ctx.lineTo(x,y):ctx.moveTo(x,y);
   }
   const grad=ctx.createLinearGradient(-45,0,790,0);
   grad.addColorStop(0,solid(color,0));grad.addColorStop(.25,solid(color,.12*trackOpacity));
   grad.addColorStop(.68,solid(color,.66*trackOpacity));grad.addColorStop(1,solid(color,.15*trackOpacity));
   ctx.lineWidth=i%3===0?1.4:.8;ctx.strokeStyle=grad;ctx.stroke();
 }
 ctx.restore();

 // Storyboard art is frameless. Its change in form is the visual narrative.
 const drawChapter=(id,alpha)=>{
   if(alpha<.005)return;
   ctx.save();ctx.globalAlpha*=alpha*globalAlpha;
   ctx.translate(coordLeft,coordTop);ctx.scale(sX,sY);
   ctx.lineJoin='round';ctx.lineCap='round';
   let primary=rgb(atmospheres[id][0]),secondary=rgb(atmospheres[id][1]);
   const tt=pulse;
   if(id===0){
     // HERO: soft signal curves plus measured-feeling annotations (not fake data).
     for(let k=0;k<3;k++){
       const col=k===1?secondary:primary;
       ctx.beginPath();
       for(let j=0;j<=90;j++){
         const u=j/90,x=15+u*690,y=410-k*70-u*(k===0?185:90)+Math.sin(u*7.4+k*1.6+tt*.35)*(19+k*5);
         j?ctx.lineTo(x,y):ctx.moveTo(x,y);
       }
       ctx.lineWidth=k===0?2.4:1.3;ctx.strokeStyle=solid(col,k===0?.82:.56);ctx.stroke();
       const pos=((tt*(k+1)*.040+.12*k)%1),px=15+pos*690;
       const py=410-k*70-pos*(k===0?185:90)+Math.sin(pos*7.4+k*1.6+tt*.35)*(19+k*5);
       P(px,py,3.6,col,.92);R(px,py,12,col,.21,.8);
     }
     for(let i=0;i<5;i++)L(96+i*138,148,96+i*138,500,fog,.065,.8);
     for(let i=0;i<5;i++)L(20,150+i*78,710,150+i*78,fog,.045,.8);
     for(let j=0;j<19;j++)P(70+j*35,485+Math.sin(j*.6+tt*.2)*14,1.1,j%3?secondary:primary,.36);
   }else if(id===1){
     // AMAZON: nodes and flowing paths map generic partner opportunity stages.
     const xs=[68,258,454,644],yy=[332,241,350,256];
     ['LEAD','QUALIFY','CONNECT','GROW'].forEach((label,i)=>{
       const y=yy[i],x=xs[i];
       R(x,y,22,primary,.68,1.5);R(x,y,30,secondary,.18,.75);
       P(x,y,5.1,i===3?secondary:primary,.95);
       T(label,x-24,y+48,10,fog,.74,650);
       if(i>0){C(xs[i-1]+23,yy[i-1],x-23,y,primary,.64,1.6,60*(i%2?1:-1));
         const u=(tt*.12+(i*.23))%1;
         const sx=xs[i-1]+23,sy=yy[i-1],ex=x-23,ey=y;
         const px=(1-u)**3*sx+3*(1-u)**2*u*(sx+(ex-sx)*.44)+3*(1-u)*u*u*(ex-(ex-sx)*.45)+u**3*ex;
         const py=(1-u)**3*sy+3*(1-u)**2*u*(sy+60*(i%2?1:-1))+3*(1-u)*u*u*(ey-60*(i%2?1:-1))+u**3*ey;
         P(px,py,3,secondary,.97);R(px,py,11,secondary,.14,.7);
       }
     });
     for(let j=0;j<3;j++)C(165,360+j*14,395,390+j*26,secondary,.16,1.1,-60);
     T('PARTNER COLLABORATION',245,148,12,primary,.62,690);
   }else if(id===2){
     // TESLA: employees progressing through the human-resources journey.
     const stages=['JOIN','LEARN','GROW','RECOGNIZE'];
     const xs=[90,266,440,612];
     stages.forEach((s,i)=>{
       const x=xs[i],y=292+Math.sin(i*1.1)*38;
       R(x,y,40,primary,.38,1.3);R(x,y,26,secondary,.56,1.1);
       P(x,y-8,8,primary,.8);
       C(x-13,y+15,x+13,y+15,secondary,.75,2,-18);
       T(s,x-30,y+64,10,primary,.78,690);
       if(i){C(xs[i-1]+41,292+Math.sin((i-1)*1.1)*38,x-41,y,secondary,.56,1.5,-36);
         const u=(tt*.11+i*.22)%1;
         const y0=292+Math.sin((i-1)*1.1)*38,y1=y;
         P(xs[i-1]+41+(x-41-xs[i-1]-41)*u, y0+(y1-y0)*u-36*Math.sin(Math.PI*u),3.3,primary,.9);
       }
     });
     for(let i=0;i<7;i++)P(180+i*46,462+Math.sin(i*1.2+tt*.7)*3,1.5,secondary,.28);
     T('EMPLOYEE EXPERIENCE',233,153,12,primary,.64,690);
   }else if(id===3){
     // INTEL: source fragments feed a compiler pipeline and validation output.
     const codeLines=[126,174,149,205,130,171,94,184];
     for(let i=0;i<codeLines.length;i++){
       let y=130+i*35;L(43,y,43+codeLines[i],y,i%3===0?primary:fog,.44,2.2);
       P(30,y,2,secondary,.55);
     }
     const stages=[['LEX',275],['PARSE',407],['CHECK',551]];
     stages.forEach(([label,x],i)=>{
       const y=288;
       R(x,y,35,i===2?secondary:primary,.57,1.5);
       for(let j=0;j<4;j++)L(x-12,y-13+j*9,x+12,y-13+j*9,secondary,.4,.9);
       T(label,x-23,y+60,11,primary,.72,670);
       if(i){L(stages[i-1][1]+38,y,x-38,y,secondary,.65,1.4);trail(stages[i-1][1]+38,y,x-38,y,primary,(tt*.2+i*.25)%1,3)}
     });
     for(let j=0;j<5;j++){let x=570+j*18,y=162+j*16;P(x,y,2,j===3?primary:secondary,.55)}
     T('COMPILER VALIDATION',259,143,12,primary,.66,700);
   }else if(id===4){
     // WESTERN DIGITAL: individual events aggregate into business intelligence.
     for(let k=0;k<35;k++){
       const x=30+(k%7)*30,y=154+Math.floor(k/7)*40;
       P(x+Math.sin(tt*.3+k)*2,y,1.3,k%4===0?primary:secondary,.5);
       if(k%7!==6)L(x+4,y,x+23,y,secondary,.13,.65);
     }
     for(let j=0;j<8;j++){
       const x=275+j*46,height=95+63*(.5+.5*Math.sin(j*.62+tt*.22));
       L(x,444,x,444-height,primary,.52,10);
       P(x,444-height,2.8,secondary,.8);
     }
     ctx.beginPath();for(let k=0;k<85;k++){
       const u=k/84,x=245+u*430,y=300-75*u+Math.sin(u*11+tt*.2)*35+Math.cos(u*22)*12;
       k?ctx.lineTo(x,y):ctx.moveTo(x,y);
     }ctx.strokeStyle=solid(secondary,.84);ctx.lineWidth=2.1;ctx.stroke();
     T('EVENTS  →  INSIGHTS',309,131,12,primary,.74,690);
     for(let j=0;j<9;j++)C(224,152+j*28,271,265+j*14,secondary,.24,.7,-15);
   }else if(id===5){
     // INFOSYS: a citizen-service filing journey with document outlines and checks.
     const xs=[92,263,438,615],labs=['START','DETAILS','VALIDATE','SUBMIT'];
     xs.forEach((x,i)=>{
       const y=300+(i%2?-25:18);
       ctx.beginPath();ctx.moveTo(x-22,y-32);ctx.lineTo(x+18,y-32);ctx.lineTo(x+28,y-21);ctx.lineTo(x+28,y+32);ctx.lineTo(x-22,y+32);ctx.closePath();
       ctx.strokeStyle=solid(i===3?secondary:primary,.59);ctx.lineWidth=1.5;ctx.stroke();
       for(let j=0;j<3;j++)L(x-12,y-14+j*12,x+11+(j===1?5:0),y-14+j*12,secondary,.55,1.1);
       T(labs[i],x-25,y+57,10,primary,.78,690);
       if(i){C(xs[i-1]+30,300+((i-1)%2?-25:18),x-26,y,primary,.57,1.2,-16);
         trail(xs[i-1]+30,312,x-26,y,secondary,tt*.15+i*.14,2.5)}
     });
     R(615,300-25,43,secondary,.29,.85);T('PUBLIC SERVICES',280,155,12,primary,.73,690);
   }else if(id===6){
     // SKILLS: the same disciplines shown in the foreground form a connected system.
     const labs=['FRONTEND','BACKEND','DATA','CLOUD','AI','DEVOPS'];
     const pts=[[355,120],[565,218],[545,447],[331,513],[129,395],[145,202]];
     pts.forEach(([x,y],i)=>{C(348,319,x,y,i%2?primary:secondary,.31,1.4,15);R(x,y,29,primary,.53,1.25);P(x,y,3,secondary,.86);
       T(labs[i],x-33,y+51,10,primary,.66,670);});
     R(348,319,57,secondary,.45,1.4);R(348,319,37,secondary,.23,.85);P(348,319,6,primary,.87);
     R(348,319,80,primary,.095,.7);T('ENGINEERING',301,321,11,fog,.78,720);
   }else{
     // CONTACT: paths from all five disciplines converge on one clear end state.
     for(let i=0;i<5;i++){
       const y=94+i*105,ey=332;
       C(42,y,566,ey,i%2?secondary:primary,.49,1.3,(i-2)*16);
       P(42,y,3.8,i%2?secondary:primary,.69);
       const u=(tt*.055+i*.19)%1;
       trail(42,y,566,ey,primary,u,2.6);
     }
     R(566,332,52,primary,.57,1.3);R(566,332,77,secondary,.17,.8);
     P(566,332,7,secondary,.93);T('LET\'S CONNECT',496,427,12,primary,.78,690);
   }
   ctx.restore();
 };
 // Smoothly fade from the previous chapter to the next; no position jumps.
 // About carries a quiet introduction to the five-stop journey.
 if(curr<1){
   drawChapter(0,0.85*(1-clamp((curr-.35)/.65)));
   if(curr>.20)drawChapter(1,clamp((curr-.20)/.80)*.6);
 }else{
   const k=Math.floor(curr),v=clamp(curr-k);
   const eased=v*v*(3-2*v);
   drawChapter(k,1-eased);if(k<7)drawChapter(k+1,eased);
 }
}
function updateScene(){target=sceneFromScroll()}
function updateScroll(){
 const progress=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
 $('#progress').style.transform='scaleX('+clamp(progress)+')';
 const tl=$('#timeline'),r=tl.getBoundingClientRect(),span=Math.max(1,r.height-20),amt=clamp((innerHeight*.48-r.top)/span);
 $('#timeline-progress').style.height=(amt*span)+'px';
 $$('.career-entry').forEach(el=>{const box=el.getBoundingClientRect();el.classList.toggle('is-active',box.top<innerHeight*.66&&box.bottom>innerHeight*.30)});
 let selected='';for(const id of ['about','work','skills','contact']){let el=document.getElementById(id);if(el.getBoundingClientRect().top<innerHeight*.54)selected=id}
 $$('.nav-links a').forEach(a=>a.classList.toggle('active',a.hash==='#'+selected));
 updateScene();if(reduce){scene=target;draw()}
}
const onScroll=()=>{if(!scrollRaf)scrollRaf=requestAnimationFrame(()=>{scrollRaf=0;updateScroll()})};
listen(window,'scroll',onScroll,{passive:true});listen(window,'resize',()=>{resize();updateScroll()});
resize();updateScroll();
let lastFrame=0;function animate(now){if(now-lastFrame>(ww<670?43:28)){t=now;scene+=clamp((target-scene)*.12,-.18,.18);draw();lastFrame=now;}if(!reduce)rafId=requestAnimationFrame(animate)}
if(!reduce)rafId=requestAnimationFrame(animate);else draw();
return ()=>{eventCleanups.forEach(cleanup=>cleanup());observer.disconnect();cancelAnimationFrame(rafId);cancelAnimationFrame(scrollRaf);root.classList.remove('motion-ready')};

}
