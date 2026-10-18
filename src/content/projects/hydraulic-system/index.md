---
title: Hydraulic System Design for a School in Waslala, Nicaragua
summary: Designed the potable water system for a rural school and sized its pump with a MATLAB pipe network solver. Required pump head was 23.4 m.
course: MECH 3100 Fluid Mechanics
date: Fall 2025
team: Kasin Ito-Sato, Mia Vazquez, Andy Salgado
role: Three-person team. Supply check, piping layout and material selection, MATLAB network solver, pump selection.
tools: [Pipe Network Analysis, Major and Minor Head Loss, Colebrook-White Friction Factor, MATLAB Numerical Solving, Pump Curve Selection, Material Selection for Sustainable Infrastructure]
size: small
order: 15
cover: ./01_piping_schematic.png
coverAlt: Piping schematic from the city supply to three outlets at 5 m, 8 m and 12 m
gallery:
  - title: Design
    images:
      - { src: ./01_piping_schematic.png, caption: "Piping schematic: 4 in main and riser, two 2 in branches at 5 m and 8 m, and a 4 in branch at 12 m" }
      - { src: ./06_original_piping_sketch.png, caption: Original hand sketch of the piping layout }
  - title: Analysis
    images:
      - { src: ./05_hand_calcs_supply_head.png, caption: "Hand calculations: city supply head check" }
      - { src: ./07_matlab_script_part1.png, caption: MATLAB network solver, part 1 }
      - { src: ./08_matlab_script_part2.png, caption: MATLAB network solver, part 2 }
      - { src: ./09_matlab_script_part3.png, caption: MATLAB network solver, part 3 }
  - title: Results
    images:
      - { src: ./03_matlab_final_results.png, caption: "MATLAB output: required pump head and flow to each branch" }
      - { src: ./02_branch_flow_distribution.png, caption: "Flow to outlets 1, 2 and 3: 141, 103 and 77 gpm" }
      - { src: ./04_pump_curve_selection.png, caption: "Pump selection: single-stage centrifugal, 1750 RPM, 9 in impeller, about 80 ft at 320 gpm. Pump curve image: \"Typical Single Stage Pump Curve,\" Pumps & Systems." }
documents:
  - { title: Hydraulic System Design Report, file: hydraulic-system-report.pdf }
---

**Goal:** Design the potable water system for a new school building in rural Waslala, Nicaragua, running from the city supply line to three outlets at 5 m, 8 m and 12 m elevation. Check whether the city line has enough pressure, size a pump if it doesn't, and pick pipe and fittings that will last with little maintenance.

**Supply check:** The city line delivers 320.65 gpm at 15 kPa. That's only about 1.85 m of total head (1.53 m pressure head plus 0.32 m velocity head), but the top outlet is 12 m above the inlet. The city line can't reach it, so the system needs a pump.

**Design:**

- A 4 in main line (20 m) feeds a 4 in riser. Two 2 in branches (15 m each) come off flanged 4x2x4 tees at 5 m and 8 m, and a 4 in branch (15 m) leaves from a long-radius elbow at 12 m
- A gate valve isolates the main, and each branch has a globe valve
- PVC with flanged fittings: cheap, resists corrosion, light enough to install by hand, and long-lasting, which matters for a rural school with limited maintenance
- Modeled with the roughness of used copper (2 µm) instead of smooth PVC to account for sediment buildup over time, so the pump estimate carries some margin

**Analysis:** We built and checked a MATLAB solver for the branched network. It applies conservation of mass at each tee and the energy (Bernoulli) equation along every path from the inlet to each outlet, including major losses (f L/D V^2/2g) and minor losses (K V^2/2g) for the tees, elbows and valves. It gets the friction factor from the Colebrook-White equation, solved iteratively with fzero as the Reynolds number changes, then returns the pump head and the flow to each branch and checks continuity.

**Results:**

- Required pump head: 23.4 m (76.8 ft)
- Flow to outlets 1, 2 and 3: 141, 103 and 77 gpm (total 320.65 gpm)
- Selected pump: single-stage centrifugal at 1750 RPM with a 9 in impeller, at about 80 ft of head and 320 gpm

**What I'd change:** The flow split is uneven. The top floor gets about 77 gpm and the lowest outlet gets 141 gpm, against an even split of about 107 gpm each. Changing pipe lengths would waste material, so the next step is to resize the pipes, with a larger branch on the top floor and a smaller one on the lowest floor to balance the head loss. Balancing valves would also help.
