---
title: 555-Timer Electronic Piano
summary: An 8-key breadboard piano that plays C4 to C5 using an LM555 timer, with every note checked on a multimeter and oscilloscope.
course: ENGR 100 Intro to Engineering (ECE module)
date: Fall 2023
team: Kasin Ito-Sato, Rylie Brenden, Ayiana Olavarria
role: Three-person team. Resistor calculations, breadboard build and measurement.
tools: [Circuit Design, Breadboarding, Oscilloscope, DMM Measurement, Troubleshooting]
size: small
order: 11
cover: ./00b_breadboard_still.jpg
coverAlt: The 555-timer piano circuit on a breadboard
video:
  file: piano-playing.mp4
  poster: piano-playing.jpg
  caption: Playing the piano (sound on)
gallery:
  - images:
      - { src: ./01_square_wave_plot_key_C.png, caption: Square wave output for key C }
      - { src: ./02_oscilloscope_capture_1.jpg, caption: Oscilloscope capture }
      - { src: ./03_oscilloscope_capture_2.jpg, caption: Oscilloscope capture }
      - { src: ./04_oscilloscope_capture_3.jpg, caption: Oscilloscope capture }
documents:
  - { title: Piano Technical Memo, file: piano-technical-memo.pdf, embed: true }
---

Built an 8-key electronic piano on a breadboard, using an LM555 timer in astable mode to play one octave, C4 to C5 (261.63 to 523.25 Hz), at 5 V.

- Rearranged the 555 frequency equation, f = 1 / (0.693 (R_A + 2R_B) C), to solve for R_B for each note, with R_A = 1.1 kOhm and C = 0.1 uF (R_B ranged from about 27 kOhm down to 13.2 kOhm)
- Chained the resistors in series so that each button taps a different total resistance, picking standard values from the differences between notes
- Checked every note's frequency with a multimeter and captured the waveform on an oscilloscope in both the time and frequency domains
