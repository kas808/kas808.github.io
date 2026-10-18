// The projects in the home page's Featured Projects carousel, in order.
// To change one: swap the photo import, title, text or link below.
// `position` picks which part of the photo stays in view ('50% 0%' = top, '50% 50%' = middle).
import rope from '../content/projects/rope-climbing-robot/02_robot_on_rope.jpg';
import turbine from '../content/projects/wind-turbine/01_final_turbine_photo.jpg';
import pantograph from '../content/projects/pantograph/01_pantograph_final_build.jpg';
import lanakila from '../assets/featured/lanakila-express.jpg';
import zootopia from '../assets/featured/waikiki-zootopia.jpg';
import goKart from '../assets/featured/go-kart.jpg';

export const featured = [
  {
    title: 'Rope Climbing Robot',
    text: 'As a team of four, Mackenzie, Yasmine, Marianne, and I designed and built a motorized robot that climbs along a rope to carry itself across a "river." When our original two-arm linkage design proved unreliable in testing, we switched to a constrained screw-slider drive, built on a laser-cut plywood chassis with a 3D printed PLA gear train. On the final outdoor run, the robot crossed 38 ft in 5.5 minutes, reaching about 86% of our predicted speed.',
    href: '/projects/rope-climbing-robot/',
    image: rope,
    alt: 'Rope climbing robot hanging on the rope',
  },
  {
    title: 'Small Wind Turbine Design',
    text: 'For my Fluid Mechanics course at LMU, my teammates Mia Vazquez and Andy Salgado and I designed, built, and wind-tunnel tested a small-scale wind turbine. We sized NACA 0012 blades with hand calculations, modeled the rotor in SolidWorks, ran CFD on the airfoil, and 3D printed a four-blade rotor driving a DC motor. The turbine reached 422 RPM and 6.2 mW of measured output, and we compared it against our predicted power to identify where the losses came from.',
    href: '/projects/wind-turbine/',
    image: turbine,
    alt: 'Finished 3D printed wind turbine',
    position: '50% 12%',
  },
  {
    title: '2x Magnifying Pantograph',
    text: 'For my Design and Manufacturing course at LMU, my partner Evan Soleimani and I designed and built a pantograph that magnifies a drawing by 2.0x. We modeled the linkage in CAD, machined the aluminum arms on the mill and horizontal bandsaw, 3D printed the pen holder and pivot blocks, and used true position tolerancing to size the pivot holes. In testing, it hit exactly 2.0x on a straight line and 1.98x to 2.0x on a square.',
    href: '/projects/pantograph/',
    image: pantograph,
    alt: 'Aluminum pantograph on an optical breadboard',
  },
  {
    title: 'Lanakila Express',
    text: 'With carnival rides canceled during Covid-19, our class built a ride-on train as the only ride. I helped machine the couplings and worked on the solar charger, and the finished train safely carried riders up through sixth grade.',
    href: '/punahou/#lanakila-express',
    image: lanakila,
    alt: 'The Lanakila Express train carrying riders at the Punahou carnival',
  },
  {
    title: 'Waikiki Zootopia',
    text: 'The Waikiki Zootopia project aims for us to collaborate with fifth graders at Waikiki Elementary School to create enrichment toys for the animals at the Honolulu Zoo. My partner and I were paired with two girls from Waikiki Elementary who wanted to make a toy for a sloth. They tasked us with creating a hanging leaf structure that could hold food for the sloths.',
    href: '/punahou/ke-kilohana/waikiki-zootopia/',
    image: zootopia,
    alt: 'Annotated CAD of the hanging leaf enrichment toy for a sloth',
    fit: 'contain',
  },
  {
    title: 'Go-Kart',
    text: 'In Engineering III, three classmates and I built a battery-powered go-kart. I focused on the drive and steering parts: the axle mount bearing, brake disc and sprocket mounts, spacers, and the steering cap. We got it fully assembled, but it did not fully work by the end of the class.',
    href: '/punahou/engineering-iii/go-kart/',
    image: goKart,
    alt: 'Go-kart frame with steering and drive system during assembly',
  },
] satisfies {
  title: string;
  text: string;
  href: string;
  image: ImageMetadata;
  alt: string;
  position?: string;
  fit?: 'cover' | 'contain';
}[];
