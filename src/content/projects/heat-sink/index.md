---
# DRAFT write-up (written from the lab reports and your project portfolio). Review before publishing.
title: Heat Sink and Forced-Convection Testing
summary: Built an Arduino thermocouple setup to measure how a fin array and moving air pull heat from a heated block and cylinder.
course: MECH 3230 Heat Transfer Lab
date: Spring 2026
team: Evan Soleimani, Kasin Ito-Sato, Andy Salgado
role: Three-person lab team. Data acquisition setup, testing and data reduction.
tools: [Arduino, Thermocouples, Data Acquisition, Conduction, Convection, Lab Reports]
size: small
order: 13
---

Built an Arduino UNO data-acquisition setup with MAX6675 thermocouples to log steady-state temperatures, then reduced the data to convection coefficients and thermal resistance.

- **Fin array:** At 6 W, adding the heat sink dropped the block from 137.5 to 89.0 °C. The convection coefficient was about 12.8 W/m²K in still air and 48.3 W/m²K with a fan blowing over the fins.
- **Transient cooling:** Logged the bare block cooling in still air to check the lumped-capacitance assumption.
- **Cylinder in cross-flow:** Tested a heated cylinder at 4.3, 5.8 and 6.2 m/s (Reynolds number about 6,400 to 9,200), splitting the power into convection and radiation losses. Thermal resistance fell from about 3.6 to 2.9 K/W as air speed rose, and heat transfer rose with Reynolds number as flow theory predicts.

| Air speed (m/s) | Power (W) | Ambient (°C) | Steady state (°C) | R = ΔT / Q (K/W) |
| --- | --- | --- | --- | --- |
| 4.3 | 10 | 21 | 57.25 | 3.62 |
| 5.8 | 12 | 21 | 56.75 | 2.98 |
| 6.2 | 14.06 | 21 | 61.75 | 2.90 |
