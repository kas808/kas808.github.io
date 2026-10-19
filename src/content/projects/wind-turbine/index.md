---
# DRAFT write-up (written from the project report). Review before publishing.
title: Small Wind Turbine Design
summary: Designed, 3D printed and wind-tunnel tested a four-blade turbine, then compared measured power against hand calculations and CFD.
course: MECH 3100 Fluid Mechanics
date: Fall 2025
team: Mia Vazquez, Kasin Ito-Sato, Andy Salgado
role: Three-person team. Airfoil selection, hand calculations, SolidWorks model and flow simulation, wind tunnel testing.
tools: [SolidWorks, SolidWorks Flow Simulation, 3D Printing, Wind Tunnel Testing, Airfoil Selection, Hand Calculations]
featured: true
order: 1
cover: ./01_final_turbine_photo.jpg
coverAlt: Finished 3D printed four-blade wind turbine held in the lab
coverPosition: 50% 12%
gallery:
  - title: Design
    images:
      - { src: ./07_sketch_concept.jpg, caption: Early concept sketch }
      - { src: ./08_sketch_rotor_layout.jpg, caption: Rotor layout sketch }
      - { src: ./09_sketch_airfoil_blade.jpg, caption: Airfoil blade sketch }
      - { src: ./02_solidworks_rotor_front.png, caption: SolidWorks rotor assembly, front view }
      - { src: ./03_solidworks_rotor_iso.png, caption: SolidWorks rotor assembly, isometric view }
  - title: Analysis
    images:
      - { src: ./10_hand_calcs_lift_force.png, caption: Hand calculations for lift force }
      - { src: ./11_hand_calcs_power_efficiency.png, caption: Hand calculations for torque, power and efficiency }
      - { src: ./12_hand_calcs_reynolds.png, caption: Reynolds number calculation }
      - { src: ./06_efficiency_vs_reynolds.png, caption: Efficiency vs. Reynolds number }
      - { src: ./04_cfd_velocity_cutplot.png, caption: "CFD cut plot: velocity around the airfoil at 12.5 degrees" }
      - { src: ./05_cfd_pressure_cutplot.png, caption: "CFD cut plot: pressure around the airfoil at 12.5 degrees" }
  - title: Testing
    images:
      - { src: ./13_wind_tunnel_test_data.png, caption: Wind tunnel and voltmeter data for three trials }
documents:
  - { title: Wind Turbine Design Report, file: wind-turbine-report.pdf, embed: true }
categories:
  - category: aerodynamics
    order: 2
    blurb: "Picked a NACA 0012 airfoil with a 20 mm chord at 12.5 degrees (lift coefficient about 1.11). Ran a SolidWorks flow simulation at 9.5 m/s to plot velocity and pressure around the blade."
    anchor: design
  - category: fluids
    order: 3
    blurb: "Calculated chord Reynolds numbers of about 7,400 to 13,300 across the three wind tunnel runs, and plotted how efficiency fell from about 2.7% to 1.9% as Reynolds number rose."
    anchor: analysis-and-testing
  - category: testing
    order: 3
    blurb: "Wind-tunnel tested at three speeds (208 to 422 RPM) and traced why measured power (1.4 to 6.2 mW) fell far short of the 0.05 to 0.33 W prediction."
    anchor: results
---

**Goal:** Design, 3D print and wind-tunnel test a small four-blade wind turbine, then compare the power it actually produced against hand calculations and a CFD model.

<div id="design" class="anchor"></div>

**Design:** We used a NACA 0012 airfoil with a 20 mm chord at a 12.5 degree angle of attack, which gives a lift coefficient of about 1.11. It is a simple symmetric airfoil with well documented lift data, so it was easy to model, analyze and print at this scale. We sketched the rotor and blades by hand, modeled the blades and nose in SolidWorks, and 3D printed the turbine to drive a small DC motor.

<div id="analysis-and-testing" class="anchor"></div>

**Analysis and testing:**

- Calculated lift force, torque, mechanical power, electrical power, efficiency and Reynolds number by hand for each test
- Ran a SolidWorks flow simulation at 9.5 m/s to plot velocity and pressure around the airfoil: faster, lower pressure flow over the top surface, higher pressure underneath, and a low velocity wake behind it
- Tested in the wind tunnel at three speeds (208 to 422 RPM), measuring voltage and current from the motor

<div id="results" class="anchor"></div>

**Results:** Calculated power was 0.05 to 0.33 W, but measured power was only 1.4 to 6.2 mW, with efficiency under 3%. The ideal model leaves out motor friction, drag, and imbalance from the 3D printed, hand-filed blades.

**Lessons learned:** More precise blades (laser cut acrylic or wood) and lighter, stiffer materials would reduce imbalance and bring measured power closer to the prediction.
