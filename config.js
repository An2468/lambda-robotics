/* EDIT THIS FILE TO CUSTOMIZE YOUR TEAM'S WEBSITE */
window.LAMBDA_CONFIG = {
  teamNumber: '36789',
  season: '2026 / 2027',
  email: 'REPLACE_WITH_TEAM_EMAIL@example.com',
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
  sponsors: [
    {name:'Sponsor One', logo:'', url:''},
    {name:'Sponsor Two', logo:'', url:''},
    {name:'Sponsor Three', logo:'', url:''}
  ],
  members: [
    {name:'Member 01',role:'Team Lead',photo:''},
    {name:'Member 02',role:'CAD / Design',photo:''},
    {name:'Member 03',role:'Mechanical',photo:''},
    {name:'Member 04',role:'Software',photo:''},
    {name:'Member 05',role:'Build Team',photo:''},
    {name:'Member 06',role:'Mechanical',photo:''},
    {name:'Member 07',role:'Software',photo:''},
    {name:'Member 08',role:'CAD / Design',photo:''},
    {name:'Member 09',role:'Outreach',photo:''},
    {name:'Member 10',role:'Operations',photo:''}
  ],
  milestones: [
    {index:'01',date:'2026',label:'THE BEGINNING',title:'An independent team takes shape.',body:'Ten students unite around a shared interest in robotics, engineering and competition.',status:'COMPLETE'},
    {index:'02',date:'2026',label:'EXPERIENCE',title:'Experience beyond the arena.',body:'Our members bring experience from robotics projects and hackathon competitions.',status:'COMPLETE'},
    {index:'03',date:'NOW',label:'IN PROGRESS',title:'Ideas become prototypes.',body:'We are prototyping our first FTC robot, refining each design through testing and iteration.',status:'ACTIVE'},
    {index:'04',date:'TBD',label:'NEXT UP',title:'From workshop to competition.',body:'Upcoming testing, events and competition details will be shared as soon as they are confirmed.',status:'UPCOMING'}
  ],
  tiers: [
    {name:'Supporter',amount:'TBD',note:'Make a difference',benefits:['Recognition on our website','Team thank-you message']},
    {name:'Bronze',amount:'TBD',note:'Back the build',benefits:['Supporter recognition','Sponsor logo on website','Social media thank-you']},
    {name:'Silver',amount:'TBD',note:'Help us grow',benefits:['Bronze benefits','Enhanced sponsor visibility','Recognition in season updates']},
    {name:'Gold',amount:'TBD',note:'Power the journey',benefits:['Silver benefits','Priority website placement','Potential recognition on team materials']},
    {name:'Platinum',amount:'TBD',note:'Build with us',benefits:['Gold benefits','Custom partnership discussion','Potential robot demonstration']}
  ]
};
