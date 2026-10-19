---
title: Multi-Media Water Filter
summary: Two iterations of a gravity filter from anthracite, sand and gravel. The sand-heavy redesign cut turbidity by about 60%.
course: ENGR 100 Intro to Engineering
date: Fall 2023
team: Kasin Ito-Sato, Nathan Liclican, Tristyn Kelly
role: Three-person team. Filter design, testing, data analysis and technical memo.
tools: [Experimental Design, Data-Driven Iteration, Technical Memo Writing]
size: small
order: 10
cover: ./01_filter_testing.jpg
coverAlt: Testing the water filter column
gallery:
  - title: Build and test
    images:
      - { src: ./01_filter_testing.jpg, caption: Filter testing }
      - { src: ./02_filter_column.jpg, caption: Filter column }
  - title: Filter layers
    images:
      - { src: ./03_filter1_layers.png, caption: "Iteration 1 layers: mostly anthracite" }
      - { src: ./04_filter2_layers.png, caption: "Iteration 2 layers: sand-heavy" }
  - title: Results
    images:
      - { src: ./05_filter1_turbidity_vs_time.png, caption: Iteration 1 turbidity vs. time }
      - { src: ./06_filter2_turbidity_vs_time.png, caption: Iteration 2 turbidity vs. time }
      - { src: ./07_turbidity_calibration_curve.png, caption: Turbidity meter calibration curve }
      - { src: ./08_class_results_table.png, caption: Results from all ten teams in the class }
documents:
  - { title: Water Filter Technical Memo, file: water-filter-technical-memo.pdf, embed: true }
  - { title: Water Filter Presentation, file: water-filter-presentation.pdf }
categories:
  - category: fluids
    order: 4
    blurb: "Compared results from all ten teams and redesigned around a sand-heavy bed, cutting average turbidity from 86 to 34.1 NTU, about 60% lower."
    anchor: iteration-2
---

**Goal:** Design a gravity filter from anthracite, sand and gravel that turns 1.2 L of dirty water into at least 1 L of clean water, aiming for the EPA's 5 NTU turbidity limit.

**Iteration 1:** Based on full-scale treatment plants (mostly anthracite): 9 in anthracite, 5 in #20 sand, 2 in gravel in a 21 in column. We picked the sand grain size using Kawamura's equation. Average turbidity: 86 NTU.

<div id="iteration-2" class="anchor"></div>

**Iteration 2:** We compared our results against all ten teams in the class and saw that sand-heavy filters did better. We switched to 3 in anthracite, 5 in #20 sand, 8 in finer #30 sand and 2 in gravel. Average turbidity: 34.1 NTU, about 60% lower than the first design. Less anthracite also meant less anthracite dust in the filtered water.

**Takeaways:** For a single small run, a sand-heavy bed works best. A full-scale plant would go back toward more anthracite because it lasts longer between backwashes. For a third version we'd add more #30 sand and pre-rinse the media, while staying under the 10-minute filtering limit.
