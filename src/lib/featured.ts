// What the home page features, in order.
//
// `featured`: the three LMU projects in the Featured Projects grid, strongest first.
//   The title, summary, course, date and photo come from each project's index.md
//   (src/content/projects/<slug>/). Here you only add the measured result:
//   `results` are the rows of the small table on the card (usually Predicted, then
//   Measured; the last row is shown in bold), and `note` is one short line under it.
//   Copy the numbers from the project page.
//
// `punahou`: the three photo tiles in the Punahou School band near the bottom.
//   `position` picks which part of the photo stays in view ('50% 0%' = top, '50% 50%' = middle).
import lanakila from '../assets/featured/lanakila-express.jpg';
import zootopia from '../assets/featured/waikiki-zootopia.jpg';
import goKart from '../assets/featured/go-kart.jpg';

export const featured = [
  {
    slug: 'rope-climbing-robot',
    results: [
      { label: 'Predicted', value: '0.134 ft/s' },
      { label: 'Measured', value: '0.115 ft/s' },
    ],
    note: 'About 86% of predicted. The gap likely comes from slip on the rope and drivetrain friction.',
  },
  {
    slug: 'wind-turbine',
    results: [
      { label: 'Wind tunnel', value: '3 speeds, 208 to 422 RPM' },
      { label: 'Measured power', value: 'up to 6.2 mW' },
    ],
    note: 'Traced why output fell short of the 0.05 to 0.33 W ideal model: motor friction, drag and blade imbalance.',
  },
  {
    slug: 'pantograph',
    results: [
      { label: 'Target', value: '2.0x' },
      { label: 'Measured', value: '1.98x to 2.0x' },
    ],
    note: 'Exactly 2.0x on a 2 in line, never over 2.0x on a 2 x 2 in box.',
  },
] satisfies {
  slug: string;
  results: { label: string; value: string }[];
  note: string;
}[];

export const punahou = [
  {
    title: 'Lanakila Express',
    href: '/punahou/#lanakila-express',
    image: lanakila,
    alt: 'The Lanakila Express train carrying riders at the Punahou carnival',
  },
  {
    title: 'Waikiki Zootopia',
    href: '/punahou/ke-kilohana/waikiki-zootopia/',
    image: zootopia,
    alt: 'Annotated CAD of the hanging leaf enrichment toy for a sloth',
    fit: 'contain',
  },
  {
    title: 'Go-Kart',
    href: '/punahou/engineering-iii/go-kart/',
    image: goKart,
    alt: 'Go-kart frame with steering and drive system during assembly',
  },
] satisfies {
  title: string;
  href: string;
  image: ImageMetadata;
  alt: string;
  position?: string;
  fit?: 'cover' | 'contain';
}[];
