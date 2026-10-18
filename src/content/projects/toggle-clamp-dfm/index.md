---
title: Toggle Clamp + Left Support DFM
summary: Modeled a full toggle clamp assembly in SolidWorks, then redesigned its left support twice, as a machined part and as sheet metal, with full GD&T.
course: MECH 2100 Design & Manufacturing
date: Fall 2024
team: "Partner: Evan Soleimani"
role: Two-person team. SolidWorks parts and assembly, drawings and BOM, and both DFM redesigns.
tools: [SolidWorks, Assembly Drawings, BOMs, Tapped Hole Callouts, Drawing Tolerances, Design for Manufacturing, Machining, Sheet Metal, GD&T, Flat Patterns]
featured: true
order: 3
cover: ./01_assembly_drawing_with_BOM.png
coverAlt: Toggle clamp assembly drawing with exploded view and bill of materials
gallery:
  - title: Toggle clamp assembly
    images:
      - { src: ./01_assembly_drawing_with_BOM.png, caption: Assembly drawing with exploded view and bill of materials }
      - { src: ./02_interface_plate_drawing.png, caption: "Interface plate: 75 x 75 mm with four M8 x 1.25 tapped holes" }
  - title: "Left support: machined vs. sheet metal"
    images:
      - { src: ./dfm_01_machined_part_drawing_GDT.png, caption: Machined aluminum version with GD&T }
      - { src: ./dfm_02_sheet_metal_bent_drawing_GDT.png, caption: Bent sheet metal version with GD&T }
      - { src: ./dfm_03_sheet_metal_flat_pattern.png, caption: Sheet metal flat pattern }
  - title: Before the redesign
    images:
      - { src: ./dfm_04_original_part_E_toleranced.png, caption: Original left support (Part E) before the redesign }
  - title: More toleranced drawings
    images:
      - { src: ./dfm_05_extra_part_A_toleranced.png, caption: Part A toleranced drawing }
      - { src: ./dfm_06_extra_part_F_toleranced.png, caption: Part F toleranced drawing }
documents:
  - { title: "DFM Write-Up: Machined vs. Sheet Metal", file: dfm-write-up.pdf, embed: true }
  - { title: Clamp Assembly + Interface Drawing, file: clamp-assembly-drawing.pdf }
  - { title: Interface Plate Drawing, file: interface-plate-drawing.pdf }
  - { title: Left Support, Machined Drawing, file: left-support-machined-drawing.pdf }
  - { title: Left Support, Sheet Metal Drawing, file: left-support-sheet-metal-drawing.pdf }
  - { title: Left Support, Flat Pattern, file: left-support-flat-pattern.pdf }
---

## Toggle Clamp Assembly

Modeled a manual toggle clamp in SolidWorks as a full assembly: arm, grip, handle, left and right supports, lever, stop, pins, nuts, and an interface block, mounted with four M8 x 12 mm bolts and washers. Produced an assembly drawing with an exploded view and a bill of materials, plus a detailed drawing of the 75 x 75 mm interface plate with four M8 x 1.25 tapped holes, 12 mm deep, and a tolerance block for every decimal place.

## Left Support: Design for Manufacturing, Two Ways

Took a preliminary bracket design (the clamp's left support) and redesigned it twice: once as a machined aluminum part and once as a bent steel sheet metal part. Each version followed the design rules for its process and had full GD&T callouts.

**Machined version:**

- Can be made in three setup orientations with one main surface per setup, so holes and chamfers stay accurate without re-fixturing
- Uses standard 6 mm and 9 mm drills; the 9 mm drill also cuts the 4.5 mm inner radius, so no extra tool is needed
- Through holes instead of blind holes for easier chip removal; chamfers instead of fillets to make it stronger and simpler to machine

**Sheet metal version:**

- 3 mm steel for strength and bendability, with consistent bend radii and a slight overbend for spring-back
- Laser-cut flat pattern, adjusted for bend stretch and nested to cut scrap

Both drawings use position tolerances referenced to datums A and B.
