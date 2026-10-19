---
title: Rope Climbing Robot
summary: A motorized robot that climbs along a rope to carry itself across a "river." After the arm design failed in testing, a screw-slider redesign crossed 38 ft in 5.5 minutes.
course: MECH Machine Design
date: Spring 2026
team: Mackenzie, Yasmine, Marianne, Kasin Ito-Sato
role: Four-person team. Built, assembled and tested the 3-stage spur gear drivetrain (64T/32T/16T), and helped rebuild the mechanism as a constrained screw slider.
tools: [Concept Selection, SolidWorks, Motion Analysis, Kinematic Analysis, Laser Cutting, 3D Printing, Gear Trains, Testing and Iteration]
featured: true
order: 0
cover: ./02_robot_on_rope.jpg
coverAlt: The rope climbing robot hanging on the rope, with plush passengers riding in its plywood box
gallery:
  - title: Original arm design
    images:
      - { src: ./06_design_matrix.png, caption: "Concept selection design matrix: the two-arm concept scored highest (40/50)" }
      - { src: ./05_cad_assembly_arm_design.jpg, caption: CAD assembly of the original two-arm design }
      - { src: ./08_arm_drawing.png, caption: Drawing of the original hook arm }
  - title: "Redesign: screw slider"
    images:
      - { src: ./10_hook_arm_redesign.png, caption: Redesigned hook arm with the slot for the constrained screw slider }
      - { src: ./09_gear_train_top_view.jpg, caption: Gear train and screw slider from above }
      - { src: ./11_caliper_checks.jpg, caption: Checking the printed linkage with calipers against the CAD }
  - title: Wood and 3D printed build
    images:
      - { src: ./12_laser_cut_box_flat.png, caption: Laser-cut plywood box with finger-jointed walls, laid flat }
      - { src: ./13_box_drawing.png, caption: Drawing of the box panels }
      - { src: ./04_part_models.png, caption: Part models for the arms, gears, motor mount and box }
      - { src: ./14_final_robot_top_view.jpg, caption: Final robot from above }
  - title: Testing and results
    images:
      - { src: ./03_river_crossing.jpg, caption: The final outdoor run across the "river" }
      - { src: ./01_river_crossing_wide.jpg, caption: The robot partway across the rope }
      - { src: ./15_speed_hand_calcs.jpg, caption: Hand calculations for the predicted climbing speed (0.134 ft/s) }
categories:
  - category: design
    order: 1
    blurb: "After the top-scoring two-arm concept (40/50) failed on the rope, we redesigned it as a constrained screw slider so the hooks follow the same path every stroke. Checked the printed linkage against the CAD with calipers."
    anchor: redesign-screw-slider
  - category: manufacturing
    order: 3
    blurb: "Laser-cut a finger-jointed plywood chassis and 3D printed the gears, shafts, hooks and slider in PLA, so we could change the CAD and reprint parts after each test."
    anchor: wood--3d-printed-build
  - category: testing
    order: 4
    blurb: "Tested each iteration on a practice rope in the lab, then crossed 38 ft outdoors in 5.5 minutes at 0.115 ft/s, about 86% of the predicted 0.134 ft/s."
    anchor: testing--results
  - category: controls
    order: 2
    blurb: "Built and tested the 3-stage spur gear drivetrain (64T/32T/16T) that drives the hooks, and ran a motion analysis on the four-bar linkage to trace the hook path and predict climbing speed."
    anchor: original-arm-design
---

As a team of four (Mackenzie, Yasmine, Marianne, and I), we designed and built a motorized robot that climbs and travels along a rope to carry itself across a "river." The project took us from concept sketches and a weighted design matrix through CAD, motion analysis, fabrication, and several rounds of testing and redesign. Our final robot combines a laser-cut wooden chassis, a 3D-printed gear train, and a constrained screw-slider drive that grips and pulls the robot along the rope.

**Key Result:** Successfully crossed the river, traveling 38 ft in 5.5 minutes

## Original Arm Design

We explored four drive concepts (two gears, four gears, two arms, and four arms) and scored them in a design matrix on ease of manufacturing, cost, simplicity, weight, and efficiency. The two-arm concept scored highest (40/50), so our first design used a 3D-printed spur gear train (4 in, 2 in, and 1 in pitch diameter gears) to drive two hooked arms through laser-cut linkages. We modeled the robot in CAD and ran a motion analysis on the four-bar linkage to trace the hook path and predict the climbing speed. In testing, however, the arm and linkage mechanism didn't perform reliably on the rope, so we went back to the drawing board.

<figure class="inline-video">
  <video src="/media/rope-climbing-robot/linkage-motion-analysis.mp4" autoplay loop muted playsinline aria-label="Motion analysis of the four-bar linkage tracing the hook path"></video>
  <figcaption>Motion analysis of the four-bar linkage, tracing the hook path</figcaption>
</figure>

## Redesign: Screw Slider

To fix the arm design, we switched to a constrained screw-slider mechanism. Each 3D-printed hook arm has a slot, and a bolt riding in a fixed orange guide constrains its motion, so the hooks follow the same repeatable path on every stroke while the gear train drives them. This gave us much more reliable contact with the rope. We kept the gear train from the original design and went through several hook and slider iterations, testing each version on the rope. After printing, we measured the linkage with calipers to verify that the as-built dimensions matched our CAD.

## Wood & 3D-Printed Build

We built the chassis as a laser-cut plywood box with finger-jointed walls. We chose wood for sustainability: it is a renewable, low-impact material that is inexpensive and quick to cut, and the box still provides a rigid frame for the motor, battery, and drivetrain. The gears, shafts, hooks, and slider components were 3D printed in PLA so we could remake parts easily. Whenever a test exposed a problem, we could adjust the CAD model and print a new version, which let us iterate quickly on the mechanism without rebuilding the whole robot.

## Testing & Results

We tested each iteration on a practice rope in the lab, using the results to refine the hooks, slider, and gear engagement before the final run. On the final outdoor test, our robot successfully crossed the river:

- Distance: 38 ft
- Time: 5.5 minutes (about 6.9 ft/min)
- Average speed: 0.115 ft/s (predicted 0.134 ft/s)

Our kinematic analysis predicted a speed of 0.134 ft/s, so the robot reached about 86% of its predicted speed; the gap likely comes from slip on the rope and friction in the drivetrain. The biggest lesson from this project was the value of being willing to change course. Our original arm design looked best on paper, but testing showed it would not work, and switching to the constrained screw slider is what got us across. Building with wood and 3D-printed parts made that pivot possible, since we could redesign and remake components quickly.
