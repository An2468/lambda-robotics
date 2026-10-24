(function(){
'use strict';
const cfg=window.LAMBDA_CONFIG||{};
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
$('#year').textContent=new Date().getFullYear();
const safe=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// THE MINDS. No portraits exist yet, so each member gets an ID plate drawn
// deterministically from their name — same name, same plate, every load.
// Primitives match the hero's language: gear rings, bolt circles, traces.
// A real `photo` in config.js covers the plate instead.
const minds=$('#minds');
function seedOf(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rngFrom(seed){let x=seed||1;return()=>{x^=x<<13;x>>>=0;x^=x>>>17;x^=x<<5;x>>>=0;return x/4294967296}}
function plate(name,role,accent){
 const r=rngFrom(seedOf(name+'|'+role));
 const pick=a=>a[Math.floor(r()*a.length)];
 const ink='#aab4c4',dim='#55606f',hot='#f4511e';
 let g='';
 // ground: a dotted survey grid, offset per member
 const off=Math.floor(r()*9);
 g+=`<pattern id="p${off}${seedOf(name)%97}" width="17" height="17" patternUnits="userSpaceOnUse" patternTransform="translate(${off} ${off})"><circle cx="1.5" cy="1.5" r="1" fill="#ffffff14"/></pattern>`;
 const pid=`p${off}${seedOf(name)%97}`;
 let body=`<rect width="200" height="200" fill="url(#${pid})"/>`;
 // primary form
 const form=pick(['gear','bolts','arcs']);
 const cx=50+r()*100, cy=46+r()*100, rad=38+r()*44;
 if(form==='gear'){
  const teeth=9+Math.floor(r()*12);let d='';
  for(let i=0;i<teeth;i++){const s0=i/teeth*Math.PI*2,s1=(i+.46)/teeth*Math.PI*2;
   d+=`${i?'L':'M'}${(cx+Math.cos(s0)*rad).toFixed(1)} ${(cy+Math.sin(s0)*rad).toFixed(1)}`+
      `L${(cx+Math.cos(s0)*(rad+8)).toFixed(1)} ${(cy+Math.sin(s0)*(rad+8)).toFixed(1)}`+
      `L${(cx+Math.cos(s1)*(rad+8)).toFixed(1)} ${(cy+Math.sin(s1)*(rad+8)).toFixed(1)}`+
      `L${(cx+Math.cos(s1)*rad).toFixed(1)} ${(cy+Math.sin(s1)*rad).toFixed(1)}`;}
  body+=`<g class="spin"><path d="${d}Z" fill="none" stroke="${ink}" stroke-width="1.4" opacity=".62"/>`+
        `<circle cx="${cx}" cy="${cy}" r="${(rad*.34).toFixed(1)}" fill="none" stroke="${dim}" stroke-width="1.4"/></g>`;
 }else if(form==='bolts'){
  const n=5+Math.floor(r()*7);let c='';
  for(let i=0;i<n;i++){const a2=i/n*Math.PI*2;
   c+=`<circle cx="${(cx+Math.cos(a2)*rad).toFixed(1)}" cy="${(cy+Math.sin(a2)*rad).toFixed(1)}" r="4.2" fill="none" stroke="${ink}" stroke-width="1.3"/>`;}
  body+=`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${dim}" stroke-width="1.2" stroke-dasharray="4 5"/><g class="spin">${c}</g>`;
 }else{
  let c='';
  for(let i=0;i<3+Math.floor(r()*3);i++){const rr=(rad-i*13).toFixed(1);
   c+=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="${i%2?dim:ink}" stroke-width="1.3" opacity=".7" stroke-dasharray="${(30+r()*70).toFixed(0)} ${(10+r()*30).toFixed(0)}"/>`;}
  body+=`<g class="spin">${c}</g>`;
 }
 // secondary: traces or a hatched band
 if(r()>.5){
  let t='',y=18+r()*40;
  for(let i=0;i<3;i++){const yy=(y+i*26).toFixed(1),bx=(40+r()*90).toFixed(1);
   t+=`<path d="M-4 ${yy}H${bx}l14 14H214" fill="none" stroke="${dim}" stroke-width="1.1" opacity=".75"/>`+
      `<circle cx="${bx}" cy="${yy}" r="2.6" fill="${i===1?hot:dim}"/>`;}
  body+=t;
 }else{
  let h='';const x0=r()*90;
  for(let i=0;i<14;i++)h+=`<line x1="${(x0+i*9).toFixed(1)}" y1="210" x2="${(x0+i*9+52).toFixed(1)}" y2="-10" stroke="${dim}" stroke-width="1" opacity=".45"/>`;
  body+=`<g>${h}</g>`;
 }
 if(accent)body+=`<circle cx="${(16+r()*168).toFixed(1)}" cy="${(16+r()*168).toFixed(1)}" r="5" fill="${hot}"/>`;
 return `<svg class="mind-art" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${g}</defs>${body}</svg>`;
}
(cfg.members||[]).forEach((m,i)=>{
 const cell=document.createElement('article');
 cell.className='mind';cell.style.setProperty('--i',i);
 cell.innerHTML=(m.photo?`<img class="mind-photo" src="${safe(m.photo)}" alt="Portrait of ${safe(m.name)}" loading="lazy"/>`:plate(m.name,m.role,i%3===0))+
  `<div class="mind-scrim"></div><span class="mind-n">${String(i+1).padStart(2,'0')}</span>`+
  `<div class="mind-meta"><div class="mind-name">${safe(m.name)}</div><span class="mind-role">${safe(m.role)}</span></div><span class="mind-rule"></span>`;
 minds.appendChild(cell);
});
// stagger the entrance once the grid scrolls in — variety from motion, not from size
if(minds){const mo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){minds.classList.add('in');mo.disconnect()}}),{threshold:.08});mo.observe(minds)}

// Journey: a timeline you step through. One panel swaps in place, so the
// section stays about a screen tall instead of scrolling through every card.
const panel=$('#mpanel'),points=$('#journeyPoints'),railFill=$('#journeyRailFill'),counter=$('#journeyCounter');
const stones=cfg.milestones||[];
stones.forEach((m,i)=>{
 const btn=document.createElement('button');btn.type='button';btn.className='journey-point';
 btn.setAttribute('aria-label',`Milestone ${i+1}: ${m.title}`);
 btn.innerHTML=`<span class="point-date">${safe(m.date)}</span><span class="point-label">${safe(m.label)}</span>`;
 btn.addEventListener('click',()=>show(i));
 points.appendChild(btn);
});
let step=0;
function show(i){
 if(!stones.length)return;
 step=(i+stones.length)%stones.length;
 const m=stones[step];
 [...points.children].forEach((n,j)=>{
  n.classList.toggle('active',j===step);
  n.classList.toggle('passed',j<step);
  n.setAttribute('aria-current',j===step?'step':'false');
 });
 const node=points.children[step];
 if(node)railFill.style.width=`${node.offsetLeft+node.offsetWidth/2}px`;
 counter.textContent=`${String(step+1).padStart(2,'0')} \u2014 ${String(stones.length).padStart(2,'0')}`;
 panel.dataset.status=m.status||'';
 panel.innerHTML=`<div class="m-side" style="--d:0"><div class="m-idx">${safe(m.index)} / ${safe(m.label)}</div><div class="m-date">${safe(m.date)}</div></div>`+
  `<div class="m-body" style="--d:1"><h3>${safe(m.title)}</h3><p>${safe(m.body)}</p><span class="m-tag"><i></i>${safe(m.status)}</span></div>`+
  `<div class="m-ghost" aria-hidden="true">${safe(m.index)}</div>`;
}
$('#timelinePrev').addEventListener('click',()=>show(step-1));
$('#timelineNext').addEventListener('click',()=>show(step+1));
panel.addEventListener('keydown',e=>{
 if(e.key==='ArrowRight'){show(step+1);e.preventDefault()}
 if(e.key==='ArrowLeft'){show(step-1);e.preventDefault()}
});
addEventListener('resize',()=>show(step),{passive:true});
show(0);

// About: the manifesto lights up word by word as the section crosses the screen.
const manifesto=$('#manifesto');
if(manifesto){
 const words=[];
 (function wrap(node){
  [...node.childNodes].forEach(n=>{
   if(n.nodeType===3){
    const frag=document.createDocumentFragment();
    n.textContent.split(/(\s+)/).forEach(tok=>{
     if(!tok.trim())return frag.appendChild(document.createTextNode(tok));
     const w=document.createElement('w');w.textContent=tok;words.push(w);frag.appendChild(w);
    });
    node.replaceChild(frag,n);
   }else if(n.nodeType===1)wrap(n);
  });
 })(manifesto);
 let rafW=0;
 const sweep=()=>{rafW=0;
  const r=manifesto.getBoundingClientRect();
  const p=(innerHeight*.86-r.top)/(r.height+innerHeight*.28);
  const n=Math.round(Math.max(0,Math.min(1,p))*words.length);
  words.forEach((w,i)=>w.classList.toggle('lit',i<n));
 };
 if(reduced)words.forEach(w=>w.classList.add('lit'));
 else{addEventListener('scroll',()=>{if(!rafW)rafW=requestAnimationFrame(sweep)},{passive:true});sweep()}
}

// Stat counters roll up once, when they first come into view.
const counters=$$('.stat strong[data-count]');
if(counters.length){
 const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;co.unobserve(e.target);
  const end=+e.target.dataset.count,t0=performance.now(),pad=String(end).length>1?2:2;
  (function tick(now){const p=Math.min(1,(now-t0)/900);
   e.target.textContent=String(Math.round(end*(1-Math.pow(1-p,3)))).padStart(pad,'0');
   if(p<1)requestAnimationFrame(tick)})(t0);
 }),{threshold:.6});
 counters.forEach(c=>co.observe(c));
}
// Sponsor ladder. Tiers are cumulative, so selecting one charges every rung
// beneath it and the detail panel marks the inherited benefits as inherited.
const ladder=$('#ladder'),tierDetail=$('#tierDetail');
const tiers=cfg.tiers||[];
tiers.forEach((t,i)=>{
 const b=document.createElement('button');
 b.type='button';b.className='rung';b.style.setProperty('--i',i);
 b.setAttribute('aria-pressed','false');
 b.innerHTML=`<span class="rung-bar"><i></i></span><span class="rung-label"><b>${safe(t.name)}</b><em>${String(i+1).padStart(2,'0')}</em></span><span class="rung-amt">${safe(t.amount)}</span>`;
 b.addEventListener('click',()=>renderTier(i));
 ladder.appendChild(b);
});
const rungs=$$('.rung');
function renderTier(index){
 const tier=tiers[index];if(!tier)return;
 rungs.forEach((el,i)=>{
  el.classList.toggle('on',i<=index);
  el.classList.toggle('sel',i===index);
  el.style.setProperty('--d',Math.max(0,index-i));   // charges from the picked rung downward
  el.setAttribute('aria-pressed',i===index?'true':'false');
 });
 // everything the lower tiers already give you, plus what this one adds
 const inherited=tiers.slice(0,index).flatMap(t=>t.benefits).filter(x=>!/benefits$/i.test(x));
 const own=tier.benefits.filter(x=>!/benefits$/i.test(x));
 const seen=new Set(),rows=[];
 inherited.forEach(x=>{if(!seen.has(x)){seen.add(x);rows.push([x,true])}});
 own.forEach(x=>{if(!seen.has(x)){seen.add(x);rows.push([x,false])}});
 tierDetail.innerHTML=`<div class="tier-count">LEVEL ${String(index+1).padStart(2,'0')} / ${String(tiers.length).padStart(2,'0')} \u00b7 ${safe(tier.note).toUpperCase()}</div>`+
  `<h3>${safe(tier.name)}.</h3><div class="amount">CONTRIBUTION \u00b7 ${safe(tier.amount)}</div>`+
  `<ul>${rows.map(([x,inh],i)=>`<li class="${inh?'inherited':''}" style="--d:${i}">${safe(x)}</li>`).join('')}</ul>`+
  `<a class="tier-cta" href="#contact" id="chooseTier">Talk about ${safe(tier.name)} \u2197</a>`;
 $('#chooseTier').addEventListener('click',()=>{const f=$('#sponsorTier');if(f)f.value=tier.name});
}
renderTier(2);
const mobile=$('#mobileMenu');$('#menuButton').addEventListener('click',()=>{mobile.classList.toggle('open');$('#menuButton').setAttribute('aria-expanded',String(mobile.classList.contains('open')))});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
const instagram=$('#insta'),tiktok=$('#tiktok');if(cfg.instagram&&cfg.instagram!=='#')instagram.href=cfg.instagram;else instagram.addEventListener('click',e=>{e.preventDefault();alert('Add your Instagram URL in config.js')});if(cfg.tiktok&&cfg.tiktok!=='#')tiktok.href=cfg.tiktok;else tiktok.addEventListener('click',e=>{e.preventDefault();alert('Add your TikTok URL in config.js')});
// Canvas-free CSS 3D model. A real robot photograph can replace the first cube.
// Measure each drawn path so the stroke animation draws at a consistent rate.
const draft=$('#heroDraft');
if(draft){
 if(cfg.robotImage){draft.querySelector('.draft').outerHTML=`<img class="draft-photo" src="${safe(cfg.robotImage)}" alt="Lambda's FTC robot"/>`}
 else{draft.querySelectorAll('.draft .p').forEach((el,i)=>{
  let len=1400; try{len=Math.ceil(el.getTotalLength())||1400}catch{}
  el.style.setProperty('--len',len);el.style.setProperty('--i',i)})}
}

if(!reduced){let pending=false;window.addEventListener('scroll',()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{const y=window.scrollY;if(draft&&y<window.innerHeight*1.4){draft.style.translate=`0 ${Math.min(90,y*.1)}px`;draft.style.opacity=String(Math.max(0,1-y/(window.innerHeight*.95)))}pending=false})},{passive:true});const glow=$('#glow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='.7'},{passive:true})}

// Sheet tilts a little toward the cursor — reads as a drawing lying on a table.
if(draft&&!reduced){let praf=0,tx=0,ty=0;
 window.addEventListener('pointermove',e=>{tx=(e.clientX/window.innerWidth-.5)*14;ty=(e.clientY/window.innerHeight-.5)*10;
  if(!praf)praf=requestAnimationFrame(()=>{praf=0;draft.style.transform=`perspective(1400px) rotateY(${tx*.5}deg) rotateX(${-ty*.5}deg)`})},{passive:true});
 draft.style.transition='transform .5s cubic-bezier(.2,.7,.3,1)'}

// Nav rail highlights whichever section fills the viewport.
const navLinks=$$('.navlinks a[href^="#"]');
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
 navLinks.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(sec=>spy.observe(sec));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(x=>observer.observe(x));
const sponsorForm=$('#sponsorForm');sponsorForm.addEventListener('submit',async e=>{e.preventDefault();if(!sponsorForm.reportValidity())return;const data=Object.fromEntries(new FormData(sponsorForm));data.team='Lambda FTC 36789';delete data.consent;const status=$('#formStatus');status.textContent='Preparing inquiry…';if(cfg.inquiryEndpoint){try{const res=await fetch(cfg.inquiryEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!res.ok)throw Error('Submission failed');status.textContent='Your inquiry was submitted. Thank you for contacting Lambda!';sponsorForm.reset()}catch(err){status.textContent='Submission failed. Please try again or contact us by email.'}}else{const recipient=(cfg.email||'').includes('REPLACE_')?'':cfg.email;const subject=encodeURIComponent('Lambda Robotics — Sponsorship Inquiry');const body=encodeURIComponent(`Company/contact: ${data.company}\nType: ${data.support}\nTier: ${data.tier}\nContact email: ${data.email}\n\nPlease contact me to discuss sponsoring Lambda Robotics FTC #36789.`);const mail=`mailto:${recipient}?subject=${subject}&body=${body}`;window.location.href=mail;status.textContent=recipient?'Email draft opened. Please send it from your email app.':'Email draft opened. Enter Lambda’s team email as the recipient before sending.'}});
$('#newsletterForm').addEventListener('submit',async e=>{e.preventDefault();const email=$('#newsletterEmail').value.trim(),status=$('#newsletterStatus');if(!email)return;if(cfg.newsletterEndpoint){try{const res=await fetch(cfg.newsletterEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});if(!res.ok)throw Error();status.textContent='Subscription request received.';$('#newsletterForm').reset()}catch{status.textContent='Could not subscribe right now. Please try again later.'}}else{status.textContent='Newsletter subscription will be available soon. Add a newsletter endpoint in config.js.'}});
$('#language').addEventListener('click',()=>{alert('English is live. Vietnamese translations are reserved for phase two; this control will switch languages once translations are added.')});
})();


/* ---------------------------------------------------------------------
   Hero — a machined gear train. Generic on purpose: it reveals nothing
   about the real robot, and gear geometry is generated from maths so it
   comes out clean rather than lumpy.
   ponytail: tooth profile is a trapezoid, not a true involute. Nobody
   can tell at this scale; swap in involute flanks if it ever matters.
   --------------------------------------------------------------------- */
(function gears(){
const host=document.getElementById('stage');
if(!host||!window.THREE)return;
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'})}
catch(e){host.style.display='none';return}
if(!renderer.getContext()){host.style.display='none';return}

const POP=0xf4511e;   // one anodised part; change this to re-accent the hero
const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(36,1,.1,100);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.toneMapping=THREE.LinearToneMapping;
renderer.toneMappingExposure=1.0;
host.appendChild(renderer.domElement);

// Metal needs something to reflect. Build a studio out of a gradient.
(function env(){
 const c=document.createElement('canvas');c.width=512;c.height=256;
 const g=c.getContext('2d');
 const sky=g.createLinearGradient(0,0,0,256);
 sky.addColorStop(0,'#9aa8bd');sky.addColorStop(.42,'#5a6475');sky.addColorStop(.52,'#23272e');sky.addColorStop(1,'#0a0b0d');
 g.fillStyle=sky;g.fillRect(0,0,512,256);
 g.fillStyle='#e8eef7';g.fillRect(40,18,190,30);          // key strip
 g.fillStyle='#8fa6c8';g.fillRect(330,30,120,16);          // cool bounce
 g.fillStyle='#ff8a5c';g.globalAlpha=.75;g.fillRect(250,96,80,12);g.globalAlpha=1; // warm kicker
 const tex=new THREE.CanvasTexture(c);
 tex.mapping=THREE.EquirectangularReflectionMapping;tex.encoding=THREE.sRGBEncoding;
 const pm=new THREE.PMREMGenerator(renderer);pm.compileEquirectangularShader();
 scene.environment=pm.fromEquirectangular(tex).texture;
 tex.dispose();pm.dispose();
})();

scene.add(new THREE.AmbientLight(0x6b7585,.55));
const key=new THREE.DirectionalLight(0xffffff,.5);key.position.set(3.4,4.2,1.2);scene.add(key);
const rim=new THREE.DirectionalLight(0x9fb4d4,1.25);rim.position.set(-3.6,.6,-2.2);scene.add(rim);
const pop=new THREE.PointLight(POP,7,9);pop.position.set(-2.2,-1.6,-1.8);scene.add(pop);  // warm kick from behind, not a spotlight on the face

function gearShape(teeth,root,tip,bore,spokes){
 const sh=new THREE.Shape(),step=Math.PI*2/teeth;
 for(let i=0;i<teeth;i++){
  const a=i*step;
  [[0,root],[.16,tip],[.34,tip],[.5,root]].forEach(([f,r],k)=>{
   const ang=a+step*f,x=Math.cos(ang)*r,y=Math.sin(ang)*r;
   (i===0&&k===0)?sh.moveTo(x,y):sh.lineTo(x,y);
  });
 }
 sh.closePath();
 const hole=new THREE.Path();hole.absarc(0,0,bore,0,Math.PI*2,true);sh.holes.push(hole);
 for(let i=0;i<spokes;i++){                      // lightening holes — reads as a machined part
  const a=i/spokes*Math.PI*2,r=root*.58,rr=root*.17;
  const h=new THREE.Path();h.absarc(Math.cos(a)*r,Math.sin(a)*r,rr,0,Math.PI*2,true);sh.holes.push(h);
 }
 return sh;
}
function gearMesh(teeth,root,mat,depth,spokes){
 const g=new THREE.ExtrudeGeometry(gearShape(teeth,root,root*1.17,root*.3,spokes),
  {depth,bevelEnabled:true,bevelThickness:root*.035,bevelSize:root*.035,bevelSegments:2,curveSegments:10});
 g.center();
 return new THREE.Mesh(g,mat);
}
const anodised=new THREE.MeshStandardMaterial({color:POP,metalness:.12,roughness:.46,envMapIntensity:.3,emissive:POP,emissiveIntensity:.05});
const chrome  =new THREE.MeshStandardMaterial({color:0xf2f6fb,metalness:1,roughness:.07,envMapIntensity:2.6});
const graphite=new THREE.MeshStandardMaterial({color:0x2b3037,metalness:.92,roughness:.34,envMapIntensity:1.3});

const rig=new THREE.Group();scene.add(rig);
// pitch radii touch, so the teeth visibly drive one another
const G=[
 {teeth:26,root:1.00,mat:anodised,depth:.2 ,spokes:5,pos:[0,0,0]},
 {teeth:17,root:.655,mat:chrome  ,depth:.17,spokes:4,pos:[1.72,.52,.02]},
 {teeth:13,root:.50 ,mat:graphite,depth:.15,spokes:0,pos:[1.4,-1.42,-.02]}
];
const gears=G.map((d,i)=>{
 const m=gearMesh(d.teeth,d.root,d.mat,d.depth,d.spokes);
 m.position.set(...d.pos);
 m.userData={teeth:d.teeth,i};
 rig.add(m);return m;
});
// a shaft through the big gear, so it reads as assembled hardware
const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.9,24),chrome);
shaft.rotation.x=Math.PI/2;rig.add(shaft);

const slow=matchMedia('(prefers-reduced-motion: reduce)').matches;
let w=0,h=0;
function size(){
 w=host.clientWidth;h=host.clientHeight;if(!w||!h)return;
 renderer.setSize(w,h,false);cam.aspect=w/h;
 const wide=w>1080;
 cam.position.set(0,0,wide?7.4:(w<760?8.6:7.8));
 cam.lookAt(0,0,0);
 rig.position.x=wide?1.55:.2;
 rig.position.y=wide?.1:-1.05;
 cam.updateProjectionMatrix();
}
size();addEventListener('resize',size,{passive:true});

let spin=0,vel=.26,yaw=-.22,pitch=.16,tYaw=-.22,tPitch=.16,down=false,px=0,py=0;
const el=renderer.domElement;
el.addEventListener('pointerdown',e=>{down=true;px=e.clientX;py=e.clientY;el.setPointerCapture(e.pointerId)});
el.addEventListener('pointermove',e=>{if(!down)return;
 const dx=e.clientX-px,dy=e.clientY-py;
 tYaw+=dx*.006;tPitch=Math.max(-.6,Math.min(.6,tPitch+dy*.004));
 vel=Math.max(-3.2,Math.min(3.2,vel+dx*.012));      // fling the train
 px=e.clientX;py=e.clientY});
['pointerup','pointercancel'].forEach(k=>el.addEventListener(k,()=>down=false));

let boom=0;
addEventListener('scroll',()=>{boom=Math.min(1,scrollY/(innerHeight*.9))},{passive:true});

const t0=performance.now();
function frame(now){
 requestAnimationFrame(frame);
 if(!w||!h){size();return}
 const t=(now-t0)/1000;
 const intro=slow?1:Math.min(1,t/.72);
 const ease=1-Math.pow(1-intro,4);
 const overshoot=slow?1:1+Math.sin(intro*Math.PI)*.12;

 if(!down)vel+=(.26-vel)*.02;
 spin+=vel*.016;
 yaw+=(tYaw-yaw)*.08;pitch+=(tPitch-pitch)*.08;
 rig.rotation.y=yaw+boom*.5;rig.rotation.x=pitch;
 rig.scale.setScalar(ease*overshoot*(1-boom*.28));
 rig.position.z=-boom*2.4;
 shaft.position.set(gears[0].position.x,gears[0].position.y,0);

 gears.forEach((g,i)=>{
  // every mesh reverses direction and scales by the tooth ratio
  const ratio=i===0?1:gears[0].userData.teeth/g.userData.teeth;
  g.rotation.z=(i%2?-1:1)*spin*ratio+(i*.11);
  g.material.opacity=1;
 });
 renderer.render(scene,cam);
}
requestAnimationFrame(frame);
})();
