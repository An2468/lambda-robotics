(function(){
'use strict';
const cfg=window.LAMBDA_CONFIG||{};
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
{const y=$('#year');if(y)y.textContent=new Date().getFullYear();}
const safe=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const T=window.LAMBDA_T||((k,f,v)=>v?String(f).replace(/\{(\w+)\}/g,(m,x)=>v[x]??m):f);
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
if(minds)(cfg.members||[]).forEach((m,i)=>{
 const cell=document.createElement('article');
 cell.className='mind';cell.style.setProperty('--i',i);
 cell.innerHTML=(m.photo?`<img class="mind-photo" src="${safe(m.photo)}" alt="${safe(T('js.portrait','Portrait of {name}',{name:m.name}))}" loading="lazy"/>`:plate(m.name,m.role,i%3===0))+
  `<div class="mind-scrim"></div><span class="mind-n">${String(i+1).padStart(2,'0')}</span>`+
  `<div class="mind-meta"><div class="mind-name">${safe(m.name)}</div><span class="mind-role">${safe(m.role)}</span></div><span class="mind-rule"></span>`;
 minds.appendChild(cell);
});
// stagger the entrance once the grid scrolls in — variety from motion, not from size
if(minds){const mo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){minds.classList.add('in');mo.disconnect()}}),{threshold:.08});mo.observe(minds)}

// Repeat the set until it is wide enough to cover any screen, then duplicate it once
// so the CSS translateX(-50%) loop lands seamlessly. ponytail: fixed repeat count, not measured.
function fillMarquee(el,items,render){if(!el||!items.length)return;
 const base=Array.from({length:Math.ceil(9/items.length)},()=>items).flat();
 el.innerHTML=[...base,...base].map(render).join('');
 el.querySelectorAll('[aria-hidden="pending"]').forEach((n,i)=>n.setAttribute('aria-hidden',i>=base.length?'true':'false'))}
fillMarquee($('#galleryTrack'),cfg.gallery||[],g=>`<figure class="shot" aria-hidden="pending"><div class="frame">${g.src?`<img src="${safe(g.src)}" alt="${safe(g.caption)}" loading="lazy"/>`:'<div class="shot-ph">\u03bb</div>'}</div><figcaption>${safe(g.caption)}</figcaption></figure>`);
const sponsorLogo=s=>{
 const inner=s.logo
  ? `<span class="logo-plate"><img src="${safe(s.logo)}" alt="${safe(T('js.logo','{name} logo',{name:s.name}))}" loading="lazy"/></span>`
  : `<span class="logo-plate is-slot"><b>${safe(s.name)}</b><i>${T('js.partner','PARTNER')}</i></span>`;
 return s.url?`<a class="sponsor-logo" href="${safe(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${safe(s.name)}" aria-hidden="pending">${inner}</a>`:`<div class="sponsor-logo" aria-hidden="pending">${inner}</div>`};
fillMarquee($('#sponsorTrack'),cfg.sponsors||[],sponsorLogo);   // footer wall
fillMarquee($('#heroSponsorTrack'),cfg.sponsors||[],sponsorLogo);
// Sponsor showcase: the card above the logo row shows whichever sponsor is picked.
const backerCard=$('#backerCard'),backerRow=$('#backerRow'),backers=cfg.sponsors||[];
let backerOn=-1;
function showBacker(i){
 if(i===backerOn||!backers[i])return;
 backerOn=i;const s=backers[i];
 [...backerRow.children].forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-pressed',String(j===i))});
 const mark=s.logo?`<img src="${safe(s.logo)}" alt="${safe(T('js.logo','{name} logo',{name:s.name}))}"/>`:`<span class="ph">${safe(s.name)}</span>`;
 backerCard.innerHTML=(s.url?`<a class="backer-mark" style="--d:0" href="${safe(s.url)}" target="_blank" rel="noopener noreferrer">${mark}</a>`:`<div class="backer-mark" style="--d:0">${mark}</div>`)+
  `<div style="--d:1"><div class="backer-count">${String(i+1).padStart(2,'0')} / ${String(backers.length).padStart(2,'0')} \u00b7 ${T('js.sponsor','SPONSOR')}</div><h3>${safe(s.name)}</h3>`+
  `${s.about?`<p>${safe(s.about)}</p>`:''}${s.url?`<a class="backer-link" href="${safe(s.url)}" target="_blank" rel="noopener noreferrer">${T('js.learn','Learn more \u2197')}</a>`:''}</div>`;
}
if(backerCard&&backerRow){
backers.forEach((s,i)=>{
 const b=document.createElement('button');b.type='button';b.className='backer-logo';
 b.setAttribute('aria-label',T('js.show','Show {name}',{name:s.name}));
 b.innerHTML=s.logo?`<img src="${safe(s.logo)}" alt=""/>`:`<b>${safe(s.name)}</b>`;
 ['click','mouseenter','focus'].forEach(ev=>b.addEventListener(ev,()=>showBacker(i)));
 backerRow.appendChild(b);
});
if(backers.length)showBacker(0);else{const sec=$('#sponsors');if(sec)sec.hidden=true}
}


// Journey: all four milestones laid out at once. No controls, no swapping —
// the old stepper hid three of four behind a rail and two arrows.
const tline=$('#tline');
if(tline){
 const stones=cfg.milestones||[];
 const state=s=>{const v=(s||'').toUpperCase();
  return v==='COMPLETE'?'done':v==='ACTIVE'?'now':'todo'};
 tline.style.setProperty('--n',stones.length);
 tline.innerHTML=stones.map((m,i)=>{
  const st=state(m.status);
  return `<li class="tstep ${st}"><i></i>`+
   `<span class="tstep-date">${safe(m.date)}</span>`+
   `<span class="tstep-lab">${safe(m.index)} / ${safe(m.label)}</span>`+
   `<h3>${safe(m.title)}</h3><p>${safe(m.body)}</p>`+
   `<span class="tstep-tag"><b></b>${safe(m.status)}</span></li>`;
 }).join('');
}

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
// Partnership levels as a selectable carousel. Tiers are cumulative, so each
// card lists everything it includes and marks what that level adds.
const rail=$('#tierRail'),dots=$('#tierDots');
const tiers=cfg.tiers||[];
const tick=(n)=>`<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8"/><path d="M4.6 8.2l2.2 2.2 4.6-4.8" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function benefitsFor(i){
 const seen=new Set(),rows=[];
 tiers.slice(0,i).forEach(t=>t.benefits.forEach(x=>{if(!/benefits$/i.test(x)&&!seen.has(x)){seen.add(x);rows.push([x,false])}}));
 tiers[i].benefits.forEach(x=>{if(!/benefits$/i.test(x)&&!seen.has(x)){seen.add(x);rows.push([x,true])}});
 return rows;
}
if(rail&&dots){
tiers.forEach((t,i)=>{
 const c=document.createElement('button');
 c.type='button';c.className='tcard';c.setAttribute('role','tab');c.setAttribute('aria-selected','false');
 c.innerHTML=`<span class="tcard-n">${T('js.level','LEVEL {n} / {total}',{n:String(i+1).padStart(2,'0'),total:String(tiers.length).padStart(2,'0')})}</span>`+
  `<h3>${safe(t.name)}</h3><p class="tcard-note">${safe(t.note)}</p>`+
  `<ul>${benefitsFor(i).map(([x,isNew])=>`<li class="${isNew?'new':''}">${tick()}<span>${safe(x)}</span></li>`).join('')}</ul>`+
  `<span class="tcard-cta">${safe(T('js.partnerAt','Partner at {name} ↗',{name:t.name}))}</span>`;
 c.addEventListener('click',e=>{
  if(e.target.closest('.tcard-cta')&&c.classList.contains('sel')){
   if(window.openPartnerModal)window.openPartnerModal(t.name);
   return;
  }
  pick(i,true);
 });
 rail.appendChild(c);
 const d=document.createElement('button');
 d.type='button';d.setAttribute('aria-label',T('js.show','Show {name}',{name:t.name}));
 d.addEventListener('click',()=>pick(i,true));
 dots.appendChild(d);
});
const cards=$$('.tcard');
let picked=-1;
function pick(i,scroll){
 picked=Math.max(0,Math.min(cards.length-1,i));
 cards.forEach((c,j)=>{c.classList.toggle('sel',j===picked);c.setAttribute('aria-selected',j===picked?'true':'false')});
 [...dots.children].forEach((d,j)=>d.classList.toggle('on',j===picked));
 if(scroll&&cards[picked])cards[picked].scrollIntoView({inline:'center',block:'nearest',behavior:reduced?'auto':'smooth'});
}
rail.addEventListener('keydown',e=>{
 if(e.key==='ArrowRight'){pick(picked+1,true);e.preventDefault()}
 if(e.key==='ArrowLeft'){pick(picked-1,true);e.preventDefault()}
});
pick(tiers.length>2?2:0,false);
}


// Packet footnotes, and the two offers that sit outside the tier ladder.
const tierNotes=$('#tierNotes');
if(tierNotes&&(cfg.tierFootnotes||[]).length)
 tierNotes.innerHTML=cfg.tierFootnotes.map(t=>`<li>${safe(t)}</li>`).join('');
const extrasEl=$('#extras');
if(extrasEl&&(cfg.extras||[]).length)
 extrasEl.innerHTML=cfg.extras.map(e=>
  `<div class="extra"><h4>${safe(e.name)}</h4><p>${safe(e.body)}</p><a href="#contact" data-tier="${safe(e.name)}">${T('js.talk','Talk to us \u2197')}</a></div>`).join('');

const mobile=$('#mobileMenu'),menuBtn=$('#menuButton');
if(mobile&&menuBtn){menuBtn.addEventListener('click',()=>{mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(mobile.classList.contains('open')))});
 mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));}
const instagram=$('#insta'),tiktok=$('#tiktok');if(cfg.instagram&&cfg.instagram!=='#')instagram.href=cfg.instagram;else instagram.addEventListener('click',e=>{e.preventDefault();alert(T('js.instaMissing','Add your Instagram URL in config.js'))});if(cfg.tiktok&&cfg.tiktok!=='#')tiktok.href=cfg.tiktok;else tiktok.addEventListener('click',e=>{e.preventDefault();alert(T('js.tiktokMissing','Add your TikTok URL in config.js'))});
// Canvas-free CSS 3D model. A real robot photograph can replace the first cube.
// Measure each drawn path so the stroke animation draws at a consistent rate.
const draft=$('#heroDraft');
if(draft){
 if(cfg.robotImage){draft.querySelector('.draft').outerHTML=`<img class="draft-photo" src="${safe(cfg.robotImage)}" alt="${safe(T('js.robotAlt',"Lambda's FTC robot"))}"/>`}
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
 navLinks.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id||a.dataset.also===e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(sec=>spy.observe(sec));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(x=>observer.observe(x));

// Partner modal. The contact section became a dialog so the page stops at four
// sections; anything pointing at #contact opens it instead of scrolling.
const modal=$('#contact');
if(modal){
 const card=modal.querySelector('.modal-card');
 let lastFocus=null;
 const focusable=()=>[...card.querySelectorAll('button,[href],input,select,textarea')].filter(el=>!el.disabled&&el.offsetParent!==null);
 function openModal(tier){
  lastFocus=document.activeElement;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('locked');
  const sel=$('#sponsorTier');
  const want=String(tier||'').toLowerCase(),opt=sel&&[...sel.options].find(o=>o.value.toLowerCase()===want||o.text.toLowerCase()===want);
  if(opt)sel.value=opt.value;
  const first=$('#company')||focusable()[0];
  if(first)setTimeout(()=>first.focus(),60);
 }
 function closeModal(){
  modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('locked');
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
 }
 modal.addEventListener('click',e=>{if(e.target.hasAttribute('data-close'))closeModal()});
 addEventListener('keydown',e=>{
  if(!modal.classList.contains('open'))return;
  if(e.key==='Escape'){closeModal();return}
  if(e.key!=='Tab')return;
  const f=focusable();if(!f.length)return;
  const first=f[0],last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault()}
  else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault()}
 });
 // every existing route to the old contact section now opens the dialog
 document.addEventListener('click',e=>{
  const t=e.target.closest('[href="#contact"],[data-partner]');
  if(!t)return;
  e.preventDefault();
  openModal(t.dataset.tier);
 });
 window.openPartnerModal=openModal;
}

const sponsorForm=$('#sponsorForm');sponsorForm.addEventListener('submit',async e=>{e.preventDefault();if(!sponsorForm.reportValidity())return;const data=Object.fromEntries(new FormData(sponsorForm));data.team='Lambda FTC 36789';delete data.consent;const status=$('#formStatus');status.textContent=T('js.preparing','Preparing inquiry…');if(cfg.inquiryEndpoint){try{const res=await fetch(cfg.inquiryEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!res.ok)throw Error('Submission failed');status.textContent=T('js.sent','Your inquiry was submitted. Thank you for contacting Lambda!');sponsorForm.reset()}catch(err){status.textContent=T('js.failed','Submission failed. Please try again or contact us by email.')}}else{const recipient=(cfg.email||'').includes('REPLACE_')?'':cfg.email;const subject=encodeURIComponent(T('js.mailSubject','Lambda Robotics — Sponsorship Inquiry'));const body=encodeURIComponent(T('js.mailBody','Company/contact: {company}\nType: {support}\nTier: {tier}\nContact email: {email}\n\nPlease contact me to discuss sponsoring Lambda Robotics FTC #36789.',data));const mail=`mailto:${recipient}?subject=${subject}&body=${body}`;window.location.href=mail;status.textContent=recipient?T('js.draft','Email draft opened. Please send it from your email app.'):T('js.draftNoTo','Email draft opened. Enter Lambda’s team email as the recipient before sending.');setTimeout(()=>{const m=$('#contact');if(m&&m.classList.contains('open'))m.querySelector('.modal-x').click()},1800)}});
const newsForm=$('#newsletterForm');
if(newsForm)newsForm.addEventListener('submit',async e=>{e.preventDefault();const email=$('#newsletterEmail').value.trim(),status=$('#newsletterStatus');if(!email)return;if(cfg.newsletterEndpoint){try{const res=await fetch(cfg.newsletterEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});if(!res.ok)throw Error();status.textContent=T('js.subOk','Subscription request received.');newsForm.reset()}catch{status.textContent=T('js.subFail','Could not subscribe right now. Please try again later.')}}else{status.textContent=T('js.subSoon','Newsletter subscription will be available soon. Add a newsletter endpoint in config.js.')}});
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

// Real gear geometry. One shared module m sets the tooth size for the whole
// train; addendum is 1m above the pitch circle and dedendum 1.25m below, so a
// tip has somewhere to go when it drops into the mating gear's valley.
function gearShape(teeth,pitchR,m,bore,spokes){
 const sh=new THREE.Shape(),step=Math.PI*2/teeth,tip=pitchR+m,valley=pitchR-1.25*m;
 for(let i=0;i<teeth;i++){
  const a=i*step;
  // tooth spans the first half of the pitch, so its centre sits at 0.25 and the gap centre at 0.75
  [[0,valley],[.10,tip],[.40,tip],[.50,valley]].forEach(([f,r],k)=>{
   const ang=a+step*f,x=Math.cos(ang)*r,y=Math.sin(ang)*r;
   (i===0&&k===0)?sh.moveTo(x,y):sh.lineTo(x,y);
  });
 }
 sh.closePath();
 const hole=new THREE.Path();hole.absarc(0,0,bore,0,Math.PI*2,true);sh.holes.push(hole);
 for(let i=0;i<spokes;i++){                      // lightening holes — reads as a machined part
  const a=i/spokes*Math.PI*2,r=valley*.58,rr=valley*.17;
  const h=new THREE.Path();h.absarc(Math.cos(a)*r,Math.sin(a)*r,rr,0,Math.PI*2,true);sh.holes.push(h);
 }
 return sh;
}
function gearMesh(teeth,pitchR,m,mat,depth,spokes){
 const g=new THREE.ExtrudeGeometry(gearShape(teeth,pitchR,m,pitchR*.3,spokes),
  {depth,bevelEnabled:true,bevelThickness:m*.45,bevelSize:m*.45,bevelSegments:2,curveSegments:10});
 g.center();
 return new THREE.Mesh(g,mat);
}
const anodised=new THREE.MeshStandardMaterial({color:POP,metalness:.12,roughness:.46,envMapIntensity:.3,emissive:POP,emissiveIntensity:.05});
const chrome  =new THREE.MeshStandardMaterial({color:0xf2f6fb,metalness:1,roughness:.07,envMapIntensity:2.6});
const graphite=new THREE.MeshStandardMaterial({color:0x2b3037,metalness:.92,roughness:.34,envMapIntensity:1.3});

const rig=new THREE.Group();scene.add(rig);
const train=new THREE.Group();rig.add(train);
const G=[
 {teeth:26,r:1.00,mat:anodised,depth:.2 ,spokes:5,z:0},
 {teeth:17,r:.655,mat:chrome  ,depth:.17,spokes:4,z:.02},
 {teeth:13,r:.50 ,mat:graphite,depth:.15,spokes:0,z:-.02}
];
const MOD=2*G[0].r/G[0].teeth;                 // shared module — every gear uses it
G.forEach(g=>g.step=Math.PI*2/g.teeth);

// Centres sit exactly one pitch-radius sum apart, and each gear is phased so a
// tooth of the driver lands in a gap of the driven one. Gear 3's direction is
// snapped onto one of gear 2's tooth angles so all three mesh at once.
const A12=.295, LAY23=-1.30;
G[0].pos=[0,0];
G[0].phase=A12-.25*G[0].step;
G[1].phase=A12+Math.PI-.75*G[1].step;
const d12=G[0].r+G[1].r, d23=G[1].r+G[2].r;
G[1].pos=[Math.cos(A12)*d12,Math.sin(A12)*d12];
const k=Math.round((LAY23-G[1].phase)/G[1].step-.25);
const A23=G[1].phase+(k+.25)*G[1].step;
G[2].pos=[G[1].pos[0]+Math.cos(A23)*d23, G[1].pos[1]+Math.sin(A23)*d23];
G[2].phase=A23+Math.PI-.75*G[2].step;
// every mesh reverses direction and scales by the tooth ratio
G[0].rate=1; G[1].rate=-G[0].teeth/G[1].teeth; G[2].rate=-G[1].rate*G[1].teeth/G[2].teeth;

const gears=G.map(d=>{
 const mesh=gearMesh(d.teeth,d.r,MOD,d.mat,d.depth,d.spokes);
 mesh.position.set(d.pos[0],d.pos[1],d.z);
 mesh.userData=d;
 train.add(mesh);return mesh;
});
// a shaft through the big gear, so it reads as assembled hardware
const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.9,24),chrome);
shaft.rotation.x=Math.PI/2;train.add(shaft);
// centre the train on its own bounds so rig.position frames the whole cluster,
// not gear one's axle
{const b=new THREE.Box3().setFromObject(train),c=b.getCenter(new THREE.Vector3());
 train.position.set(-c.x,-c.y,0);}

const slow=matchMedia('(prefers-reduced-motion: reduce)').matches;
let w=0,h=0;
function size(){
 w=host.clientWidth;h=host.clientHeight;if(!w||!h)return;
 renderer.setSize(w,h,false);cam.aspect=w/h;
 const wide=w>1080;
 cam.position.set(0,0,wide?7.9:(w<760?10.4:8.6));
 cam.lookAt(0,0,0);
 rig.position.x=wide?1.62:.1;
 rig.position.y=wide?0:-1.3;
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

 gears.forEach(g=>{g.rotation.z=g.userData.phase+g.userData.rate*spin});
 renderer.render(scene,cam);
}
requestAnimationFrame(frame);
})();

/* ---------------------------------------------------------------------
   BUILD PAGE. Each chapter is a tall section whose inner .chapter-pin
   sticks; progress through that scroll range feeds in as --p (0..1) and
   drives the animation. Everything here no-ops on the main page.
   --------------------------------------------------------------------- */
(function buildPage(){
// own scope: the helpers above live inside the main IIFE
const $=(sel,root)=>(root||document).querySelector(sel);
const $$=(sel,root)=>Array.from((root||document).querySelectorAll(sel));
const cfg=window.LAMBDA_CONFIG||{};
const safe=(x)=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T=window.LAMBDA_T||((k,f)=>f);
const chapters=$$('.chapter');
if(!chapters.length)return;
const slow=matchMedia('(prefers-reduced-motion: reduce)').matches;

// 01 — parts scattered off the bench, converging as the chapter plays
const bench=$('#benchParts'),benchPct=$('#benchPct');
const PARTS=[
 {w:150,h:150,label:'FRAME',   svg:'<rect x="12" y="12" width="76" height="76" rx="6" fill="none" stroke="currentColor" stroke-width="3"/><rect x="28" y="28" width="44" height="44" rx="3" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/>'},
 {w:120,h:120,label:'GEAR',    svg:'<circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2"/>'+Array.from({length:10},(_,i)=>{const a=i/10*Math.PI*2;return `<rect x="${(50+Math.cos(a)*36-4).toFixed(1)}" y="${(50+Math.sin(a)*36-4).toFixed(1)}" width="8" height="8" fill="currentColor" opacity=".8"/>`}).join('')},
 {w:132,h:96, label:'BRACKET', svg:'<path d="M14 80V20h30v24h42v36z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>'},
 {w:104,h:104,label:'BEARING', svg:'<circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="3"/>'+Array.from({length:8},(_,i)=>{const a=i/8*Math.PI*2;return `<circle cx="${(50+Math.cos(a)*25).toFixed(1)}" cy="${(50+Math.sin(a)*25).toFixed(1)}" r="4" fill="currentColor" opacity=".7"/>`}).join('')},
 {w:150,h:76, label:'RAIL',    svg:'<rect x="8" y="38" width="84" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M22 38v24M50 38v24M78 38v24" stroke="currentColor" stroke-width="2" opacity=".5"/>'},
 {w:112,h:112,label:'WHEEL',   svg:'<circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" stroke-width="3"/>'+Array.from({length:6},(_,i)=>{const a=i/6*Math.PI*2;return `<path d="M50 50L${(50+Math.cos(a)*32).toFixed(1)} ${(50+Math.sin(a)*32).toFixed(1)}" stroke="currentColor" stroke-width="2" opacity=".5"/>`}).join('')}
];
if(bench){
 bench.innerHTML=PARTS.map(p=>
  `<div class="bpart" style="width:${p.w}px;height:${p.h}px"><svg viewBox="0 0 100 100">${p.svg}</svg><span>${p.label}</span></div>`).join('');
 const els=$$('.bpart',bench);
 // where each part starts (scattered) and lands (a neat row)
 PARTS.forEach((p,i)=>{
  const t=(i/(PARTS.length-1))-0.5;                 // -0.5 .. 0.5 across the bench
  els[i]._to={x:t*560,y:(i%2?1:-1)*26,r:0};
  els[i]._from={x:t*1500+(i%2?240:-240),y:(i%2?-1:1)*420,r:(i%2?1:-1)*(28+i*11)};
 });
 bench._els=els;
}

// 02 — frames develop one at a time
const sheet=$('#sheet');
if(sheet){
 const shots=(cfg.gallery||[]).slice(0,12);
 sheet.innerHTML=shots.map((g,i)=>
  `<figure class="frameShot">${g.src?`<img src="${safe(g.src)}" alt="${safe(g.caption)}" loading="lazy"/>`:'<span class="ph">λ</span>'}<b>${String(i+1).padStart(2,'0')} ${safe(g.caption)}</b></figure>`).join('');
 sheet._els=$$('.frameShot',sheet);
}

// 03 — outreach: filled entries render, blanks render as marked slots
const fieldStats=$('#fieldStats'),fieldGrid=$('#fieldGrid');
if(fieldStats)
 fieldStats.innerHTML=(cfg.outreachStats||[]).map(s=>
  `<div class="fstat"><b class="${s.n?'':'empty'}" data-n="${safe(s.n)}">${s.n?'0':'—'}</b><span>${safe(s.label)}</span></div>`).join('');
if(fieldGrid)
 fieldGrid.innerHTML=(cfg.outreach||[]).map(o=>{
  if(!o.title)return `<div class="fcard slot"><div class="fcard-k">${T('bn.slot','OPEN SLOT')}</div><h3>${T('bn.slotH','Your next programme')}</h3><p>${T('bn.slotP','Add it to outreach[] in config.js — title, date, a line of copy and a photo.')}</p></div>`;
  return `<div class="fcard"><div class="fcard-k">${safe(o.kind)}</div><span class="fdate">${safe(o.date)}</span>`+
   `<h3>${safe(o.title)}</h3><p>${safe(o.body)}</p>`+
   (o.url?`<a href="${safe(o.url)}" target="_blank" rel="noopener noreferrer">${T('bn.visit','Visit')} ↗</a>`:'')+`</div>`;
 }).join('');

// progress pump: one rAF-throttled pass sets --p on every chapter
let raf=0;
function run(){
 raf=0;
 chapters.forEach(ch=>{
  const r=ch.getBoundingClientRect();
  const span=Math.max(1,r.height-innerHeight);
  const p=Math.max(0,Math.min(1,-r.top/span));
  ch.style.setProperty('--p',p.toFixed(4));
  const id=ch.id;
  if(id==='bench'&&bench&&bench._els){
   const e=1-Math.pow(1-p,3);
   bench._els.forEach(el=>{
    const f=el._from,t=el._to;
    const x=f.x+(t.x-f.x)*e, y=f.y+(t.y-f.y)*e, rot=f.r+(t.r-f.r)*e;
    el.style.transform=`translate(-50%,-50%) translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
    el.classList.toggle('set',e>.92);
   });
   if(benchPct)benchPct.textContent=Math.round(e*100)+'%';
  }
  if(id==='prints'&&sheet&&sheet._els){
   const n=Math.round(p*sheet._els.length*1.25);
   sheet._els.forEach((el,i)=>el.classList.toggle('dev',i<n));
  }
  if(id==='field'){
   const cards=$$('.fcard',ch);
   cards.forEach((c,i)=>c.classList.toggle('in',p*cards.length*1.4>i));
   $$('.fstat b[data-n]',ch).forEach(b=>{
    const raw=b.dataset.n;if(!raw)return;
    const num=parseInt(raw.replace(/[^0-9]/g,''),10);if(!num)return;
    const v=Math.round(num*Math.min(1,p*2));
    b.textContent=v.toLocaleString()+(/\+/.test(raw)&&v>=num?'+':'');
   });
  }
 });
}
if(slow){
 $$('.frameShot').forEach(e=>e.classList.add('dev'));
 $$('.fcard').forEach(e=>e.classList.add('in'));
 $$('.fstat b[data-n]').forEach(b=>{if(b.dataset.n)b.textContent=b.dataset.n});
}else{
 addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(run)},{passive:true});
 addEventListener('resize',()=>{if(!raf)raf=requestAnimationFrame(run)},{passive:true});
 run();
}
})();
