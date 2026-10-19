---
title: 2x Magnifying Pantograph
summary: Designed and built an aluminum linkage that enlarges a drawing by exactly 2.0x, with GD&T bar drawings and a tolerance analysis.
course: MECH 2100 Design & Manufacturing
date: Fall 2024
team: "Partner: Evan Soleimani"
role: Two-person team. Linkage layout, SolidWorks model, GD&T drawings, machining and testing.
tools: [Linkage Design, SolidWorks, GD&T, Milling, Bandsaw, 3D Printing, Tolerance Analysis, Prototyping]
featured: true
order: 2
cover: ./01_pantograph_final_build.jpg
coverAlt: Finished aluminum pantograph mounted on an optical breadboard
gallery:
  - title: Design and build
    images:
      - { src: ./01_pantograph_final_build.jpg, caption: Final build on the optical breadboard }
      - { src: ./02_solidworks_linkage_layout.jpg, caption: SolidWorks linkage layout }
      - { src: ./03_cad_pen_holder.png, caption: CAD of the 3D printed pen holder }
      - { src: ./04_cad_pivot_block.png, caption: CAD of the 3D printed pivot block }
      - { src: ./05_cardboard_soft_prototype.jpg, caption: Cardboard soft prototype }
      - { src: ./06_soft_prototype_vs_cad.jpg, caption: Soft prototype checked against the CAD linkage }
      - { src: ./07_long_bar_drawing_GDT.png, caption: Long bar drawing with GD&T }
      - { src: ./08_short_bar_drawing_GDT.png, caption: Short bar drawing with GD&T }
  - title: Results
    images:
      - { src: ./09_original_vs_2x_output.jpg, caption: Original drawing vs. 2x output }
      - { src: ./10_calibration_2in_line.jpg, caption: "Calibration: 2 in test line" }
      - { src: ./11_calibration_4in_measured.jpg, caption: "Calibration: output measured at 4 in" }
      - { src: ./12_calibration_box_original.jpg, caption: "Calibration: 2 x 2 in box, original" }
      - { src: ./13_calibration_box_2x.jpg, caption: "Calibration: 2 x 2 in box, 2x output" }
documents:
  - { title: Pantograph Design Report, file: pantograph-design-report.pdf, embed: true }
  - { title: Pantograph Slides, file: pantograph-slides.pdf }
  - { title: Bar Drawing, file: bar-drawing.pdf }
categories:
  - category: design
    order: 3
    blurb: "Laid out a 2x linkage in SolidWorks, tested it with a cardboard prototype, and drew the bars with GD&T true position callouts and a floating-fastener tolerance analysis."
    anchor: design-and-build
  - category: manufacturing
    order: 1
    blurb: "Cut the aluminum bars on a horizontal bandsaw and drilled the pivot holes on the mill using the digital readout. The finished linkage drew at 1.98x to 2.0x."
    anchor: design-and-build
---

**Goal:** Design and build a pantograph that repeatably enlarges a drawing by exactly 2.0x, mounts to an optical breadboard, uses at least two materials and three manufacturing processes, and holds a marker that is secure but easy to swap.

<div id="design-and-build" class="anchor"></div>

**Design and build:**

- Laid out the linkage geometry in SolidWorks, then tested it with a cardboard soft prototype before cutting metal
- Cut aluminum bars on the horizontal bandsaw and drilled the pivot holes on the mill using the digital readout for hole spacing; 3D printed the pen holder and pivot blocks
- Joined the links with 1/4-20 bolts; drew the bars with GD&T true position callouts and worked out a floating-fastener tolerance analysis

**Results:** A 2 in test line came out at exactly 2.0x. A 2 x 2 in box came out at 1.98x to 2.0x and never over 2.0x. Errors came from tracing by hand and from holes we had to redrill.

**Lessons learned:** Lock the hole sizes before machining, because redrilling added error. Also, a pen holder made to fit any pen gave up precision. Designing it for one marker would have been tighter.
