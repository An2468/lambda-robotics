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
  // White or light logos on a transparent background (SVG/PNG) look best on the dark Sponsors section.
  // about is the text on the sponsor card; url adds a "Learn more" link.
  sponsors: [
    {name:'OpenAI', logo:'assets/sponsors/openai.png', url:'https://openai.com', about:'The AI research and deployment company behind ChatGPT, on a mission to ensure artificial general intelligence benefits all of humanity.'},
    {name:'LotusHacks', logo:'assets/sponsors/lotushacks.png', url:'', about:'A hackathon bringing together young builders and innovators in Vietnam.'},
    {name:'sixonefour labs', logo:'assets/sponsors/sixonefour-labs.png', url:'https://sixonefourlabs.com', about:'Proud sponsor of Lambda Robotics.'}
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
    {index:'01',date:'MAY 2026',label:'THE BEGINNING',title:'An independent team takes shape.',body:'Ten students unite around a shared interest in robotics, engineering and competition.',status:'COMPLETE'},
    {index:'02',date:'SEP 2026',label:'KICKOFF',title:'BioBuzz season started.',body:'A brand-new game is revealed. We break down the rules, study the field and map out our strategy for the 2026–2027 season.',status:'COMPLETE'},
    {index:'03',date:'SEP–JAN',label:'BUILD SEASON',title:'Build time!',body:'From September to January, ideas turn into hardware: CAD models, rapid prototypes, test drives, and rebuild after rebuild until every mechanism earns its place on the robot.',status:'ACTIVE'},
    {index:'04',date:'JAN 2027',label:'SCRIMMAGE',title:'Lambda Robotics Scrimmage.',body:'We host the first-ever FTC scrimmage in Southern Vietnam, bringing teams together to test their robots before the championship.',status:'UPCOMING'},
    {index:'05',date:'FEB 2027',label:'NATIONALS',title:'Vietnam Championship.',body:'Competing on the national stage against the best FTC teams in Vietnam.',status:'UPCOMING'}
  ],
  tiers: [
    {name:'Supporter',amount:'TBD',note:'Make a difference',benefits:['Recognition on our website','Team thank-you message']},
    {name:'Bronze',amount:'TBD',note:'Back the build',benefits:['Supporter recognition','Sponsor logo on website','Social media thank-you']},
    {name:'Silver',amount:'TBD',note:'Help us grow',benefits:['Bronze benefits','Enhanced sponsor visibility','Recognition in season updates']},
    {name:'Gold',amount:'TBD',note:'Power the journey',benefits:['Silver benefits','Priority website placement','Potential recognition on team materials']},
    {name:'Platinum',amount:'TBD',note:'Build with us',benefits:['Gold benefits','Custom partnership discussion','Potential robot demonstration']}
  ]
};
