// The order of the cards on the Projects page (/projects).
// To reshuffle, move lines up or down, or between the two lists.
// Every project (shown here or not) still appears in the "All projects" list.
//
// LMU projects:     { project: '<folder name in src/content/projects>' }
//   Their title, summary, tags, course, date and photo come from that project's index.md.
//
// Punahou projects: { punahou: '<section>/<page folder in src/content/punahou>', ... }
//   Punahou pages have no summary, tags or date of their own, so those are written here.
//   Leave `tools` off when the page doesn't say which tools were used.
//   `date` is empty until filled in (ASK: when was each Punahou project?).
import goKart from '../assets/featured/go-kart.jpg';
import lanakila from '../assets/featured/lanakila-express.jpg';
import zootopia from '../assets/featured/waikiki-zootopia.jpg';

type LmuCard = { project: string };
type PunahouCard = {
  punahou: string;
  title?: string; // defaults to the Punahou page's title
  summary: string;
  tools?: string[];
  date?: string;
  href?: string; // where the card links; defaults to the Punahou page
  cover?: ImageMetadata; // defaults to the page's banner photo
  coverAlt?: string;
  coverPosition?: string;
  fit?: 'cover' | 'contain';
};
export type CardEntry = LmuCard | PunahouCard;

// Top: six large cards, the same projects and order as the home page carousel
export const largeCards: CardEntry[] = [
  {
    punahou: 'engineering-iii/go-kart',
    summary: 'Built a battery-powered go-kart with three classmates. I focused on drive and steering parts: the axle mount bearing, brake disc and sprocket mounts, spacers, and the steering cap body.',
    tools: ['CAD', '3D Printing', 'Welding', 'Chassis Fabrication', 'Steering System', 'Drive System'],
    date: '',
    cover: goKart,
    coverAlt: 'Go-kart frame with steering and drive system during assembly',
  },
  { project: 'rope-climbing-robot' },
  { project: 'wind-turbine' },
  { project: 'pantograph' },
  {
    punahou: 'lanakila-express/solar-charger',
    title: 'Lanakila Express',
    summary: 'With carnival rides canceled during Covid-19, our class built a ride-on train as the only ride. I helped machine the couplings and worked on the solar charger.',
    tools: ['Horizontal Bandsaw', 'Mill', 'CAD', 'Prototyping', 'Charge Controller'],
    date: '',
    href: '/punahou/#lanakila-express', // same link as the home page carousel
    cover: lanakila,
    coverAlt: 'The Lanakila Express train carrying riders at the Punahou carnival',
  },
  {
    punahou: 'ke-kilohana/waikiki-zootopia',
    summary: 'My partner and I worked with two fifth graders from Waikiki Elementary to make a hanging leaf enrichment toy for a sloth at the Honolulu Zoo, and the sloth used it to eat.',
    tools: ['CAD', 'Client Feedback', 'Gluing and Assembly'],
    date: '',
    cover: zootopia,
    coverAlt: 'Annotated CAD of the hanging leaf enrichment toy for a sloth',
    fit: 'contain',
  },
];

// Below: eight smaller cards
export const smallCards: CardEntry[] = [
  { project: 'sae-aero' },
  { project: 'toggle-clamp-dfm' },
  { project: 'heat-sink' },
  { project: 'structural-materials-testing' },
  { project: 'hydraulic-system' },
  { project: 'encoder-motor' },
  { project: 'rube-goldberg' },
  {
    punahou: 'engineering-iii/toolbox',
    summary: 'Drew and modeled a toolbox in Rhino, then water jetted the aluminum pieces, welded them together and added a PVC pipe handle.',
    date: '',
  },
];
