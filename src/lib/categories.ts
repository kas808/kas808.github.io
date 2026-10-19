// The skill categories, in the order they show everywhere on the site.
// Each one gets its own page at /<slug>/ (for example /thermal/).
//
// To put a project in a category, add it to that project's index.md, like this:
//   categories:
//     - { category: thermal, order: 2, blurb: "One or two sentences for the card.", anchor: results }
// `category` must be one of the slugs below (a typo stops the build).
// `order` sets its place on the category page (lower shows first).
// `anchor` is optional: the heading id the card opens the page at.

export const categorySlugs = [
  'aerodynamics',
  'thermal',
  'fluids',
  'design',
  'manufacturing',
  'testing',
  'controls',
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export type Category = {
  slug: CategorySlug;
  name: string;
  intro: string; // one line under the title; also the description in search results and link previews
  skills: string[];
  // Link preview photo: the first card with a photo, unless this names a page (like '/projects/wind-turbine/')
  shareFrom?: string;
};

export const categories: Category[] = [
  {
    slug: 'aerodynamics',
    name: 'Aerodynamics & Propulsion',
    intro: 'Airfoil selection, CFD and electric propulsion layout, from a wind-tunnel tested turbine to an SAE Aero cargo plane.',
    skills: ['Airfoil selection (NACA 0012, NACA 64(2)-415)', 'SolidWorks Flow Simulation', 'Wind tunnel testing', 'Lift, torque and power hand calculations', 'Motor, ESC and battery integration', 'Trade studies'],
    shareFrom: '/projects/wind-turbine/',
  },
  {
    slug: 'thermal',
    name: 'Thermal & HVAC',
    intro: 'HVAC load calculations and equipment sizing on real buildings at WSP, plus heat transfer testing and modeling at LMU.',
    skills: ['IES-VE', 'TRACE 700', 'Equipment selection', 'Duct pressure', 'ASHRAE 62.1/90.1', 'IECC', 'Excel calculation tools', 'Conduction and convection', 'Thermocouple DAQ', 'MATLAB'],
  },
  {
    slug: 'fluids',
    name: 'Fluid Systems',
    intro: 'Pipe networks, pumps, flow simulation and filtration, worked out by hand and in MATLAB.',
    skills: ['Major and minor head loss', 'Colebrook-White friction factor', 'MATLAB network solving', 'Pump curve selection', 'Hydronic piping', 'SolidWorks Flow Simulation', 'Turbidity testing'],
  },
  {
    slug: 'design',
    name: 'Mechanical Design & CAD',
    intro: 'Taking parts and mechanisms from concept sketches and design matrices to SolidWorks models and toleranced drawings.',
    skills: ['SolidWorks (parts, assemblies, drawings)', 'GD&T (ASME Y14.5)', 'Tolerance analysis', 'Design for manufacturing', 'Linkage and gear train design', 'AutoCAD', 'Rhino', 'Concept selection'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Fabrication',
    intro: 'Hands-on shop work at LMU and Punahou: milling, turning, cutting, welding and 3D printing parts I designed.',
    skills: ['Mill', 'Lathe', 'Horizontal bandsaw', 'Waterjet', 'Laser cutting', '3D printing (PLA)', 'Welding', 'Sheet metal flat patterns', 'Tapping'],
  },
  {
    slug: 'testing',
    name: 'Testing & Instrumentation',
    intro: 'Planning tests, building data acquisition and comparing measured results against theory.',
    skills: ['Fatigue, buckling and ASTM E8 tensile testing', 'Instron 4505', 'Arduino thermocouple DAQ', 'Wind tunnel testing', 'Dimensional checks with calipers', 'Data reduction and lab reports'],
  },
  {
    slug: 'controls',
    name: 'Controls & Mechatronics',
    intro: 'Motors, sensors and circuits: reading encoders, tuning controllers and building drivetrains that move things.',
    skills: ['Arduino (C++) and interrupts', 'Quadrature encoders', 'MATLAB/Simulink', 'Root locus, PI/PID', 'Gear trains', 'LM555 timer circuits', 'Oscilloscope and DMM'],
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
