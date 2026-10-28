/* EDIT THIS FILE TO CUSTOMIZE YOUR TEAM'S WEBSITE */
window.LAMBDA_CONFIG = {
  teamNumber: '36789',
  season: '2026 / 2027',
  email: 'teamlambdarobotics@gmail.com',
  instagram: '#', // Replace with Instagram profile URL
  tiktok: '#', // Replace with TikTok profile URL
  inquiryEndpoint: '', // Optional: HTTPS endpoint accepting POST JSON; leave blank for email-draft fallback
  newsletterEndpoint: '', // Optional: HTTPS endpoint accepting POST JSON
  robotImage: '', // Optional path such as assets/robot.webp. Empty keeps 3D placeholder cube.
  teamPhoto: '', // Optional team image
  // Gallery: drop photos in assets/ and set src. Empty src renders a styled placeholder tile.
  gallery: [
    {src:'', caption:'Build session / chassis v1'},
    {src:'', caption:'CAD review'},
    {src:'', caption:'Drivetrain prototype'},
    {src:'', caption:'Wiring and electronics'},
    {src:'', caption:'Software testing'},
    {src:'', caption:'Team workspace'},
    {src:'', caption:'Intake mechanism'},
    {src:'', caption:'Practice field'}
  ],
  // Sponsors: set logo to a path in assets/ when you have the real file.
  // White or light logos on a transparent background (SVG/PNG) look best on the dark Sponsors section.
  // about is the text on the sponsor card; url adds a "Learn more" link.
  sponsors: [
    {name:'OpenAI', logo:'assets/sponsors/openai.png', url:'https://openai.com', about:'The AI research and deployment company behind ChatGPT, on a mission to ensure artificial general intelligence benefits all of humanity.'},
    {name:'LotusHacks', logo:'assets/sponsors/lotushacks.png', url:'https://lotushack.org', about:'A hackathon bringing together young builders and innovators in Vietnam.'},
    {name:'sixonefour labs', logo:'assets/sponsors/sixonefour-labs.png', url:'https://sixonefourlabs.com', about:'Proud sponsor of Lambda Robotics.'},
    {name:'Symbotic', logo:'assets/sponsors/symbotic.png', url:'https://www.symbotic.com', about:'A robotics and AI company transforming supply chains with automated warehouse systems.'}
  ],
  members: [
    {name:'Sonic Nguyen',role:'Team Captain',photo:'assets/team/member-01.jpg'},
    {name:'Bond Pham',role:'Head of Technical & Mechanical',photo:'assets/team/member-02.jpg'},
    {name:'James Ho',role:'Head of CAD & Electrical',photo:'assets/team/member-03.jpg'},
    {name:'Duy An',role:'Co-head of Software',photo:'assets/team/member-04.jpg'},
    {name:'Minh Nhat',role:'Co-head of Software',photo:'assets/team/member-05.jpg'},
    {name:'Duc Duong',role:'Sr. Full Stack Engineer',photo:'assets/team/member-06.jpg'},
    {name:'Felix Diep',role:'Mechanical & Build Team',photo:'assets/team/member-07.jpg'},
    {name:'Duy Anh',role:'Software & Build Team',photo:'assets/team/member-08.jpg'},
    {name:'Member 09',role:'Outreach',photo:''},
    {name:'Member 10',role:'Operations',photo:''}
  ],
  // Community outreach. The first two are from the 2026 sponsorship packet;
  // the rest are slots — fill in title/date/body/photo and they render.
  outreach: [
    {title:'LotusHacks', kind:'FOUNDED', date:'2025',
     body:'Vietnam\u2019s largest student hackathon, taken from concept to execution by this team. The same habit we bring to the robot: plan it, build it, ship it.',
     stat:'1,000+', statLabel:'BUILDERS REACHED', url:'https://lotushack.org', photo:''},
    {title:'STEM in local schools', kind:'ONGOING', date:'2026',
     body:'Hands-on robotics sessions for students in Ho Chi Minh City \u2014 letting people drive a real robot is still the fastest way to make engineering feel possible.',
     stat:'', statLabel:'', url:'', photo:''},
    {title:'', kind:'', date:'', body:'', stat:'', statLabel:'', url:'', photo:''},
    {title:'', kind:'', date:'', body:'', stat:'', statLabel:'', url:'', photo:''}
  ],
  outreachStats: [
    {n:'1,000+', label:'BUILDERS REACHED'},
    {n:'', label:'SCHOOLS VISITED'},
    {n:'', label:'WORKSHOP HOURS'}
  ],
  milestones: [
    {index:'01',date:'MAY 2026',label:'THE BEGINNING',title:'An independent team takes shape.',body:'Ten students unite around a shared interest in robotics, engineering and competition.',status:'COMPLETE'},
    {index:'02',date:'SEP 2026',label:'KICKOFF',title:'BioBuzz season started.',body:'A brand-new game is revealed. We break down the rules, study the field and map out our strategy for the 2026–2027 season.',status:'COMPLETE'},
    {index:'03',date:'SEP–JAN',label:'BUILD SEASON',title:'Build time!',body:'From September to January, ideas turn into hardware: CAD models, rapid prototypes, test drives, and rebuild after rebuild until every mechanism earns its place on the robot.',status:'ACTIVE'},
    {index:'04',date:'JAN 2027',label:'SCRIMMAGE',title:'Lambda Robotics Scrimmage.',body:'We host the first-ever FTC scrimmage in Southern Vietnam, bringing teams together to test their robots before the championship.',status:'UPCOMING'},
    {index:'05',date:'FEB 2027',label:'NATIONALS',title:'Vietnam Championship.',body:'Competing on the national stage against the best FTC teams in Vietnam.',status:'UPCOMING'}
  ],
  // Official tiers from the 2026 sponsorship packet. Cumulative: each tier
  // includes everything below it. `amount` is stored but NOT rendered.
  tiers: [
    {name:'Bronze',amount:'$500',note:'Get your name on the team',benefits:[
      'Social media feature',
      'Company logo on team uniform and event banner',
      'Company logo on our website']},
    {name:'Silver',amount:'$1,000',note:'Ride along on the robot',benefits:[
      'Company logo on the robot',
      'Individual social media post',
      'Special thank-you on the team standee']},
    {name:'Gold',amount:'$2,000',note:'Show up at competition',benefits:[
      'Promotional video played at our booth (2 min)',
      'Distribute your product at our booth',
      'Exclusive banner / standee at team events and our booth']},
    {name:'Diamond',amount:'$4,000',note:'Front and centre, all season',benefits:[
      'Company logo on team giveaway merchandise',
      'Primary sponsor placement across all team assets',
      'Special recognition across every channel we publish on',
      'Team appearance with the robot and a live presentation at your event']}
  ],
  // Shown under the tiers; these are offers, not levels.
  tierFootnotes: [
    'Logo size and placement scale with tier \u2014 higher tiers get priority positioning.',
    'Promotional video length: 2 minutes at Gold, 3 minutes at Diamond.',
    'Team appearances are subject to scheduling, with priority for events in Vietnam.'
  ],
  extras: [
    {name:'Presenting Sponsor',body:'The team competes as Lambda Robotics presented by your company for the whole season. One partner only \u2014 get in touch to discuss it.'},
    {name:'Individual Contribution',body:'Any amount helps. Individual gifts go straight to robot parts, tools, competition registration and travel.'}
  ],

  // Vietnamese. Each list matches the English list above, item by item, in the
  // same order; only the fields given here change. Anything left out stays English.
  vi: {
    gallery: [
      {caption:'Buổi chế tạo / khung xe v1'},
      {caption:'Họp duyệt CAD'},
      {caption:'Nguyên mẫu hệ truyền động'},
      {caption:'Đi dây và điện tử'},
      {caption:'Kiểm thử phần mềm'},
      {caption:'Không gian làm việc'},
      {caption:'Cơ cấu nạp'},
      {caption:'Sân tập'}
    ],
    sponsors: [
      {about:'Công ty nghiên cứu và triển khai AI đứng sau ChatGPT, với sứ mệnh đảm bảo trí tuệ nhân tạo tổng quát mang lại lợi ích cho toàn nhân loại.'},
      {about:'Cuộc thi hackathon quy tụ những người trẻ đam mê sáng tạo và công nghệ tại Việt Nam.'},
      {about:'Tự hào là nhà tài trợ của Lambda Robotics.'},
      {about:'Công ty robot và AI đang thay đổi chuỗi cung ứng bằng hệ thống kho hàng tự động.'}
    ],
    members: [
      {role:'Đội trưởng'},
      {role:'Trưởng ban Kỹ thuật & Cơ khí'},
      {role:'Trưởng ban CAD & Điện'},
      {role:'Đồng trưởng ban Phần mềm'},
      {role:'Đồng trưởng ban Phần mềm'},
      {role:'Kỹ sư Full Stack cấp cao'},
      {role:'Cơ khí & Chế tạo'},
      {role:'Phần mềm & Chế tạo'},
      {name:'Thành viên 09',role:'Cộng đồng'},
      {name:'Thành viên 10',role:'Vận hành'}
    ],
    milestones: [
      {date:'05/2026',label:'KHỞI ĐẦU',title:'Một đội độc lập ra đời.',body:'Mười học sinh cùng chung niềm đam mê robot, kỹ thuật và thi đấu.'},
      {date:'09/2026',label:'KHAI MẠC',title:'Mùa giải BioBuzz bắt đầu.',body:'Thể thức thi đấu mới được công bố. Chúng tôi phân tích luật, nghiên cứu sân đấu và lên chiến lược cho mùa giải 2026–2027.'},
      {date:'T9–T1',label:'MÙA CHẾ TẠO',title:'Đến giờ chế tạo!',body:'Từ tháng 9 đến tháng 1, ý tưởng trở thành phần cứng: mô hình CAD, nguyên mẫu nhanh, chạy thử, và chế tạo lại hết lần này đến lần khác cho đến khi mọi cơ cấu xứng đáng có mặt trên robot.'},
      {date:'01/2027',label:'GIAO HỮU',title:'Giải giao hữu Lambda Robotics.',body:'Chúng tôi tổ chức giải giao hữu FTC đầu tiên tại miền Nam Việt Nam, quy tụ các đội để thử nghiệm robot trước giải vô địch.'},
      {date:'02/2027',label:'TOÀN QUỐC',title:'Giải Vô địch Quốc gia.',body:'Tranh tài trên đấu trường quốc gia cùng những đội FTC mạnh nhất Việt Nam.'}
    ],
    tiers: [
      {name:'Đồng',note:'Ghi danh cùng đội',benefits:[
        'Giới thiệu trên mạng xã hội',
        'Logo công ty trên đồng phục đội và băng rôn sự kiện',
        'Logo công ty trên website của đội']},
      {name:'Bạc',note:'Đồng hành trên robot',benefits:[
        'Logo công ty trên robot',
        'Bài đăng mạng xã hội riêng',
        'Lời cảm ơn đặc biệt trên standee của đội']},
      {name:'Vàng',note:'Hiện diện tại giải đấu',benefits:[
        'Video quảng bá phát tại gian hàng của đội (2 phút)',
        'Phân phát sản phẩm của bạn tại gian hàng',
        'Băng rôn / standee riêng tại sự kiện và gian hàng của đội']},
      {name:'Kim cương',note:'Nổi bật suốt cả mùa giải',benefits:[
        'Logo công ty trên quà tặng của đội',
        'Vị trí nhà tài trợ chính trên mọi ấn phẩm của đội',
        'Ghi nhận đặc biệt trên mọi kênh truyền thông của đội',
        'Đội mang robot đến và trình diễn trực tiếp tại sự kiện của bạn']}
    ],
    tierFootnotes: [
      'Kích thước và vị trí logo tăng theo cấp độ \u2014 cấp cao hơn được ưu tiên vị trí.',
      'Thời lượng video quảng bá: 2 phút với cấp Vàng, 3 phút với cấp Kim cương.',
      'Lịch xuất hiện của đội tùy thuộc vào thời gian, ưu tiên các sự kiện tại Việt Nam.'
    ],
    extras: [
      {name:'Nhà tài trợ chính danh',body:'Đội thi đấu với tên gọi \u201cLambda Robotics presented by\u201d công ty của bạn trong suốt mùa giải. Chỉ dành cho một đối tác \u2014 hãy liên hệ để trao đổi.'},
      {name:'Đóng góp cá nhân',body:'Mọi khoản đóng góp đều quý giá. Đóng góp cá nhân được dùng trực tiếp cho linh kiện robot, công cụ, phí đăng ký thi đấu và chi phí di chuyển.'}
    ]
  }
};
