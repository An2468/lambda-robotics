/* English is the page as written in index.html. Vietnamese replaces the
   marked text before script.js builds the dynamic sections, and config.js
   carries a `vi` block for the content the team edits. Switching saves the
   choice and reloads, so every generated section is rebuilt in one language. */
(function(){
'use strict';
const KEY='lambda-lang';
const q=new URLSearchParams(location.search).get('lang');
let saved=null;try{saved=localStorage.getItem(KEY)}catch(e){}
const lang=(q==='vi'||q==='en')?q:saved||((navigator.language||'').toLowerCase().startsWith('vi')?'vi':'en');
window.LAMBDA_LANG=lang;
document.documentElement.lang=lang;

const VI={
 'meta.description':'Lambda Robotics, đội FTC #36789. Mười học sinh, một khát vọng. Khám phá robot, gặp gỡ đội ngũ và trở thành đối tác của chúng tôi.',
 'nav.main':'Điều hướng chính',
 'nav.about':'GIỚI THIỆU','nav.team':'ĐỘI NGŨ','nav.build':'CHẾ TẠO','nav.sponsors':'NHÀ TÀI TRỢ','nav.partner':'HỢP TÁC','nav.contact':'LIÊN HỆ',
 'nav.ticker':'FTC #36789 · MÙA GIẢI 2026/2027 · ĐANG CHẾ TẠO',
 'nav.lang':'Đổi ngôn ngữ','nav.pill':'TRỞ THÀNH ĐỐI TÁC ↗','nav.menu':'Mở menu',

 'hero.stage':'Mô hình 3D tương tác. Kéo để xoay.',
 'hero.intro':'<strong>10 bộ óc. Một sứ mệnh.</strong>Chế tạo để thi đấu.<br>Dẫn lối bằng sáng tạo.',
 'hero.cta1':'Trở thành đối tác ↗','hero.cta2':'Gặp gỡ đội ngũ',
 'hud.team':'ĐỘI','hud.members':'THÀNH VIÊN','hud.season':'MÙA GIẢI','hud.based':'TRỤ SỞ','hud.city':'TP. HỒ CHÍ MINH','hud.status':'TRẠNG THÁI','hud.building':'ĐANG CHẾ TẠO',
 'hero.partners':'ĐỐI TÁC','strip.aria':'Nhà tài trợ',


 // --- build page ---
 'nav.home':'\u2190 TRANG CH\u1ee6','nav.journey':'H\u00c0NH TR\u00ccNH','nav.build':'CH\u1ebe T\u1ea0O',
 'journey.kicker':'03 / H\u00c0NH TR\u00ccNH','journey.h':'\u0110ANG<br>T\u1ea0O N\u00caN.',
 'journey.lead':'T\u1eeb m\u1ed9t \u00fd t\u01b0\u1edfng \u0111\u1ebfn con robot tr\u00ean s\u00e2n \u0111\u1ea5u. \u0110\u00e2y l\u00e0 ch\u1eb7ng ch\u00fang t\u00f4i \u0111ang \u0111i.',
 'bn.kicker':'LAMBDA / X\u01af\u1edeNG',
 'bn.t1':'PH\u00cdA SAU','bn.t2':'CU\u1ed8C CH\u1ebe T\u1ea0O.',
 'bn.lead':'\u1ea2nh t\u1eeb x\u01b0\u1edfng v\u00e0 t\u1eeb nh\u1eefng c\u0103n ph\u00f2ng ch\u00fang t\u00f4i b\u01b0\u1edbc v\u00e0o. Thay t\u1eebng \u00f4 trong config.js khi b\u1ea1n ch\u1ee5p \u0111\u01b0\u1ee3c.',
 'bn.scroll':'CU\u1ed8N',
 'bn.ch1':'B\u00c0N L\u00c0M VI\u1ec6C','bn.ch2':'X\u01af\u1edeNG','nav.minds':'TH\u00c0NH VI\u00caN','nav.aboutSub':'Ch\u00fang t\u00f4i l\u00e0 ai, v\u00e0 v\u00ec sao','nav.mindsSub':'M\u01b0\u1eddi ng\u01b0\u1eddi trong \u0111\u1ed9i','nav.journeySub':'M\u00f9a gi\u1ea3i \u0111ang \u1edf \u0111\u00e2u','nav.backers':'AI \u0110\u1ed2NG H\u00c0NH','nav.backersSub':'Nh\u1eefng c\u00e1i t\u00ean \u0111\u00e3 \u1edf b\u00ean ch\u00fang t\u00f4i','nav.tiers':'C\u00c1C G\u00d3I T\u00c0I TR\u1ee2','nav.tiersSub':'S\u1ef1 h\u1ed7 tr\u1ee3 mang l\u1ea1i g\u00ec','nav.build2':'QU\u00c1 TR\u00ccNH','bn.ch2Sub':'B\u00ean trong x\u01b0\u1edfng','bn.ch3Sub':'Ra v\u1edbi c\u1ed9ng \u0111\u1ed3ng','bn.ch3':'C\u1ed8NG \u0110\u1ed2NG',
 'bn.ch1h':'B\u00c0N L\u00c0M VI\u1ec6C.',
 'bn.ch1p':'Kh\u00f4ng g\u00ec \u0111\u1ebfn m\u00e0 \u0111\u00e3 ho\u00e0n thi\u1ec7n. M\u1ecdi chi ti\u1ebft \u0111\u1ec1u \u0111\u01b0\u1ee3c c\u1eaft, khoan, l\u1eafp th\u1eed v\u00e0 c\u1eaft l\u1ea1i cho \u0111\u1ebfn khi kh\u1edbp.',
 'bn.ch1r':'L\u1eaeP R\u00c1P',
 'bn.ch2h':'X\u01b0\u1edfng.',
 'bn.ch2p':'Nguy\u00ean m\u1eabu, nh\u1eefng \u0111\u00eam l\u1eafp r\u00e1p, v\u00e0 nh\u1eefng kho\u1ea3nh kh\u1eafc gi\u1eefa ch\u00fang.',
 'bn.ch3h':'C\u1ed9ng \u0111\u1ed3ng.',
 'bn.ch3p':'Hackathon ch\u00fang t\u00f4i t\u1ed5 ch\u1ee9c v\u00e0 l\u1edbp h\u1ecdc ch\u00fang t\u00f4i \u0111\u1ebfn.',
 'bn.ch4h':'TI\u1ebeP THEO.',
 'bn.ch4p':'M\u00f9a thi \u0111\u1ea5u, th\u00eam ho\u1ea1t \u0111\u1ed9ng c\u1ed9ng \u0111\u1ed3ng, v\u00e0 m\u1ed9t con robot kh\u00f4ng ng\u1eebng thay \u0111\u1ed5i. \u0110\u1ed3ng h\u00e0nh c\u00f9ng ch\u00fang t\u00f4i.',
 'bn.cta1':'Xem c\u00e1c g\u00f3i \u2197','bn.cta2':'Li\u00ean h\u1ec7',
 'bn.slot':'\u00d4 TR\u1ed0NG','bn.slotH':'Ch\u01b0\u01a1ng tr\u00ecnh ti\u1ebfp theo',
 'bn.slotP':'Th\u00eam v\u00e0o outreach[] trong config.js: t\u00ean, ng\u00e0y, m\u1ed9t d\u00f2ng m\u00f4 t\u1ea3 v\u00e0 m\u1ed9t t\u1ea5m \u1ea3nh.',
 'bn.visit':'Truy c\u1eadp','bn.addPhoto':'TH\u00caM \u1ea2NH',
 'about.kicker':'01 / BẢN SẮC',
 'about.h1':'KHÔNG CHỈ','about.h2':'<i class="muted" style="font-style:normal">CHẾ TẠO.</i>',
 'about.h3':'<em style="font-style:normal;text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:9px">VƯƠN LÊN.</em>',
 'about.manifesto':'Mười học sinh tại TP. Hồ Chí Minh. Không chương trình của trường. Không ngân sách. Không xưởng. Chúng tôi tự tìm chỗ, tự học CAD, và chế tạo một con robot thi đấu được. Mùa giải FTC đầu tiên. Chúng tôi sẽ khiến mọi người khó quên.',
 'about.foot':'Độc lập và tự chủ tài chính. Mọi công cụ và mọi linh kiện đều đến từ mười chúng tôi, và từ những đối tác đồng hành.',
 'about.stat1':'THÀNH VIÊN','about.stat2':'SỨ MỆNH CHUNG','about.stat3':'SỰ TÒ MÒ',

 'team.kicker':'02 / CON NGƯỜI','team.title':'NHỮNG<br>BỘ ÓC.',
 'team.lead':'Nhà thiết kế, thợ chế tạo, lập trình viên và người giải quyết vấn đề. Mỗi người một thế mạnh. Chung một robot. Hãy làm quen với những con người đứng sau Lambda.',
 'team.foot1':'MƯỜI NGƯỜI THỢ · MỘT ROBOT','team.foot2':'HÌNH MINH HỌA TẠO TỪ TÊN MỖI NGƯỜI · ẢNH SẼ CẬP NHẬT KHI CÓ',
 'team.bottom':'ĐỘC LẬP. TỰ CHỦ TÀI CHÍNH. XÂY DỰNG TỪ CHUNG MỘT KHÁT VỌNG.','team.count':'10 / 10 THÀNH VIÊN',

 'build.kicker':'03 / CHẾ TẠO','build.title':'ĐANG<br>CHẾ TẠO.',
 'build.lead':'Kỹ thuật xuất sắc là một quá trình không ngừng. Theo dõi trải nghiệm, nguyên mẫu và những cột mốc tiếp theo của đội.',
 'build.story':'CÂU CHUYỆN CỦA CHÚNG TÔI / TỪNG BƯỚC','build.rail':'Chuyển đến một cột mốc',
 'build.nav':'XEM TỪNG MỐC — BẤM VÀO MỘT ĐIỂM HOẶC DÙNG ← →','build.prev':'Cột mốc trước','build.next':'Cột mốc tiếp theo','build.panel':'Chi tiết cột mốc',
 'build.shotsH':'HẬU TRƯỜNG.','build.shotsP':'Những nguyên mẫu, những buổi chế tạo muộn và mọi khoảnh khắc ở giữa.',
 'build.gallery':'Thư viện ảnh của đội, tự động cuộn',
 'build.nextH':'TIẾP THEO LÀ GÌ? ↗',
 'build.nextP':'Thử nghiệm robot, các sự kiện FTC sắp tới và hoạt động của đội sẽ được cập nhật tại đây khi được xác nhận. <strong>Các ngày trên lịch chỉ là tạm thời cho đến khi Lambda công bố lịch chính thức.</strong>',

 'sp.kicker':'04 / NHÀ TÀI TRỢ','sp.title':'NHÀ<br>TÀI TRỢ.',
 'sp.lead':'Những công ty và tổ chức giúp mùa giải của Lambda thành hiện thực. Chọn một logo để tìm hiểu thêm về từng đơn vị.',
 'sp.row':'Nhà tài trợ',

 'pt.kicker':'05 / HỢP TÁC CÙNG CHÚNG TÔI','pt.title':'ĐỒNG HÀNH<br>ĐỂ <span style="color:#697180">TIẾN XA.</span>',
 'pt.lead':'Chúng tôi là một đội độc lập, tự chủ tài chính, cùng chung niềm đam mê kỹ thuật. Hãy giúp chúng tôi biến những thiết kế thành hiện thực và tiến thêm một bước trên hành trình FTC.',
 'pt.ways':'CÁC CẤP ĐỘ HỢP TÁC · MỖI CẤP BAO GỒM CẤP TRƯỚC','pt.rail':'Các cấp độ hợp tác','pt.swipe':'VUỐT HOẶC CHỌN MỘT CẤP ĐỘ',
 'pt.buys':'SỰ HỖ TRỢ CỦA BẠN DÀNH CHO',
 'pt.f1':'Phần cứng robot','pt.f2':'Gia công','pt.f3':'Thiết bị','pt.f4':'Phí thi đấu','pt.f5':'Di chuyển','pt.f6':'Hoạt động cộng đồng',

 'm.close':'Đóng','m.eyebrow':'TRỞ THÀNH ĐỐI TÁC','m.title':'CÙNG NHAU<br><span>CHẾ TẠO.</span>',
 'm.h3':'Đồng hành cùng chúng tôi với tư cách đối tác sáng lập.',
 'm.p':'Dù bạn có thể hỗ trợ tài chính, vật liệu, công cụ hay chuyên môn kỹ thuật, chúng tôi rất mong được trò chuyện cùng bạn. Hãy cho chúng tôi biết bạn muốn hỗ trợ như thế nào; chúng tôi sẽ liên hệ lại qua email.',
 'm.quick':'CHỈ BỐN MỤC NGẮN · KHÔNG CẦN THANH TOÁN','m.follow':'Theo dõi hành trình của chúng tôi:',
 'f.eyebrow':'TRỞ THÀNH ĐỐI TÁC CỦA LAMBDA / 01—04',
 'f.l1':'01 / TÊN CÔNG TY HOẶC NGƯỜI LIÊN HỆ','f.p1':'Tên công ty hoặc người liên hệ',
 'f.l2':'02 / BẠN MUỐN HỖ TRỢ CHÚNG TÔI NHƯ THẾ NÀO?',
 'f.s1':'Tài trợ tài chính','f.s2':'Thiết bị hoặc vật liệu','f.s3':'Cố vấn kỹ thuật / chuyên môn','f.notsure':'Chưa chắc chắn',
 'f.l3':'03 / CẤP ĐỘ TÀI TRỢ',
 'f.t1':'Đồng','f.t2':'Bạc','f.t3':'Vàng','f.t4':'Kim cương','f.t5':'Nhà tài trợ chính danh','f.t6':'Đóng góp cá nhân',
 'f.l4':'04 / ĐỊA CHỈ EMAIL CỦA BẠN','f.p4':'ban@congty.com',
 'f.consent':'Tôi đồng ý để Lambda liên hệ về yêu cầu này.','f.submit':'GỬI YÊU CẦU HỢP TÁC',
 'f.note':'Nếu chưa cấu hình điểm nhận biểu mẫu bảo mật, nút này sẽ mở một email nháp để bạn tự gửi. Trang sẽ không báo đã gửi khi thực tế chưa gửi.',

 'ft.backed':'ĐƯỢC TÀI TRỢ BỞI','ft.team':'ĐỘI FTC #36789','ft.indie':'ĐỘI ROBOT HỌC SINH ĐỘC LẬP','ft.top':'LÊN ĐẦU TRANG ↑',
 'ft.newsH':'GHI CHÉP TỪ XƯỞNG.','ft.newsP':'Thỉnh thoảng cập nhật về quá trình chế tạo và các cột mốc của đội.',
 'ft.newsIn':'ĐỊA CHỈ EMAIL CỦA BẠN','ft.newsAria':'Email nhận bản tin','ft.sub':'Đăng ký',
 'ft.motto':'CHẾ TẠO ĐỂ TỐT HƠN MỖI NGÀY.','ft.city':'TP. HỒ CHÍ MINH, VIỆT NAM',

 // strings built by script.js
 'js.portrait':'Chân dung {name}','js.logo':'Logo {name}','js.partner':'ĐỐI TÁC','js.sponsor':'NHÀ TÀI TRỢ',
 'js.learn':'Tìm hiểu thêm ↗','js.show':'Xem {name}','js.milestone':'Cột mốc {n}: {title}',
 'js.COMPLETE':'HOÀN THÀNH','js.ACTIVE':'ĐANG DIỄN RA','js.UPCOMING':'SẮP TỚI',
 'js.level':'CẤP {n} / {total}','js.partnerAt':'Hợp tác cấp {name} ↗','js.talk':'Liên hệ với chúng tôi ↗',
 'js.robotAlt':'Robot FTC của Lambda',
 'js.instaMissing':'Hãy thêm đường dẫn Instagram trong config.js','js.tiktokMissing':'Hãy thêm đường dẫn TikTok trong config.js',
 'js.preparing':'Đang chuẩn bị yêu cầu…','js.sent':'Yêu cầu của bạn đã được gửi. Cảm ơn bạn đã liên hệ với Lambda!',
 'js.failed':'Gửi không thành công. Vui lòng thử lại hoặc liên hệ với chúng tôi qua email.',
 'js.mailSubject':'Lambda Robotics — Yêu cầu tài trợ',
 'js.mailBody':'Công ty/người liên hệ: {company}\nHình thức: {support}\nCấp độ: {tier}\nEmail liên hệ: {email}\n\nVui lòng liên hệ với tôi để trao đổi về việc tài trợ cho Lambda Robotics FTC #36789.',
 'js.draft':'Đã mở email nháp. Vui lòng gửi từ ứng dụng email của bạn.',
 'js.draftNoTo':'Đã mở email nháp. Hãy nhập email của đội Lambda làm người nhận trước khi gửi.',
 'js.subOk':'Đã nhận yêu cầu đăng ký.','js.subFail':'Hiện chưa thể đăng ký. Vui lòng thử lại sau.',
 'js.subSoon':'Tính năng đăng ký bản tin sẽ sớm ra mắt. Hãy thêm newsletter endpoint trong config.js.'
};

// T('key', 'English fallback', {vars}) — English lives at the call site.
window.LAMBDA_T=function(key,fallback,vars){
 let s=lang==='vi'&&VI[key]!=null?VI[key]:fallback;
 if(vars)s=String(s).replace(/\{(\w+)\}/g,(m,k)=>vars[k]!=null?vars[k]:m);
 return s;
};

// Overlay config.vi onto the English content, item by item.
const cfg=window.LAMBDA_CONFIG||{};
if(lang==='vi'&&cfg.vi){
 Object.keys(cfg.vi).forEach(k=>{
  const v=cfg.vi[k],base=cfg[k];
  if(!Array.isArray(v)||!Array.isArray(base))return;
  cfg[k]=base.map((item,i)=>{
   const o=v[i];if(o==null)return item;
   return(typeof item==='object'&&typeof o==='object')?Object.assign({},item,o):o;
  });
 });
}

if(lang==='vi'){
 const font=document.createElement('link');font.rel='stylesheet';
 font.href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap';
 document.head.appendChild(font);
 const md=document.querySelector('meta[name="description"]');if(md)md.content=VI['meta.description'];
 document.querySelectorAll('[data-i18n]').forEach(el=>{const v=VI[el.dataset.i18n];if(v!=null)el.innerHTML=v});
 document.querySelectorAll('[data-i18n-attr]').forEach(el=>{
  el.dataset.i18nAttr.split(',').forEach(pair=>{const[attr,k]=pair.split(':');if(VI[k]!=null)el.setAttribute(attr.trim(),VI[k])});
 });
}

// EN / VI controls: the nav button and the mobile menu entry.
document.querySelectorAll('[data-lang-toggle]').forEach(b=>{
 if(b.id==='language')b.innerHTML=`<span class="${lang==='en'?'on':''}">EN</span> / <span class="${lang==='vi'?'on':''}">VI</span>`;
 else b.textContent=lang==='vi'?'ENGLISH':'TIẾNG VIỆT';
 b.addEventListener('click',()=>{
  const next=lang==='vi'?'en':'vi';
  try{localStorage.setItem(KEY,next);sessionStorage.setItem('lambda-scroll',String(window.scrollY))}catch(e){}
  const u=new URL(location.href);
  if(u.searchParams.has('lang')){u.searchParams.delete('lang');location.replace(u.href)}
  else location.reload();
 });
});
// put the reader back where they were after the reload
let back=null;try{back=sessionStorage.getItem('lambda-scroll');sessionStorage.removeItem('lambda-scroll')}catch(e){}
if(back!==null){
 if('scrollRestoration' in history)history.scrollRestoration='manual';
 addEventListener('load',()=>{
  const y=+back;
  document.documentElement.style.scrollBehavior='auto';
  scrollTo(0,y);requestAnimationFrame(()=>{scrollTo(0,y);document.documentElement.style.scrollBehavior=''});
 });
}
})();
