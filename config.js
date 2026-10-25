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
};
