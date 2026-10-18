---
title: Mechanical Engineering Intern
organization: WSP in the US
location: Honolulu, HI
dates: May 2025 to January 2026
order: 1
summary: Designed HVAC, plumbing and fire protection systems alongside licensed mechanical engineers, ran load calculations in IES-VE and TRACE 700, and built three Excel tools the team adopted.
cover: ./00_wsp_team.jpg
coverAlt: Kasin with the WSP Honolulu intern class and a mentor in the office
coverPosition: 50% 35%
highlights:
  - Sized mechanical equipment from loads cross-checked in 2 models (IES-VE, TRACE 700), calculated airflow pressure losses, and coordinated equipment selection with manufacturers by reviewing their submittals against specifications.
  - Built 3 engineering analysis tools in Excel that the team adopted for pressurization, ventilation, and exhaust flow, on my own initiative, with step-by-step guides for each.
  - Revised mechanical layouts and drawings in Revit and AutoCAD through multiple design stages, and troubleshot a drawing vs. installation discrepancy on site with the install team.
tools: [Revit, AutoCAD, IES-VE, TRACE 700, Bluebeam, Excel, ASHRAE 62.1 and 90.1, IECC, Load Calculations, HVAC Design]
related: { title: "2D CAD and Technical Sketching", href: "/projects/2d-cad/" }
documents:
  - { title: End-of-Summer Presentation, file: wsp-end-of-summer-presentation.pdf, embed: true }
---

## Overview

During my internship at WSP, I worked with licensed mechanical engineers to design HVAC, plumbing, and fire protection systems for commercial and residential projects. I performed load calculations and drafting, and researched ASHRAE 62.1 and 90.1 standards, IECC codes, and industry practices to apply them to real project conditions. I gained experience using Revit, AutoCAD, TRACE 700, IES-VE, and Bluebeam to develop, revise, and coordinate mechanical system drawings, BIM documentation, and project submittals. I also created custom Excel sheets that looked at demand-controlled ventilation, building pressurization, and exhaust airflow requirements, and frequently revised specifications and CAD standards based on project feedback. I collaborated with manufacturers, architects, and contractors to discuss equipment selections, project changes, and design requirements. I attended multiple site visits to observe installed systems and interact with owners and field personnel. I also went to technical presentations and networking events with engineers across the AEC industry. This internship has strengthened my understanding of mechanical design, code compliance, and multidisciplinary coordination. It also introduced me to professional workflows such as RFI processing, submittal review, project deliverables, and the communication standards expected in engineering consulting.

I started at WSP in Honolulu, Hawaii, in May and later continued working for them remotely during the school year. The internship expanded my knowledge of HVAC, plumbing, and fire safety while I learned industry standards and grew my interest in the mechanical engineering field.

![WSP welcome slide for Kasin Ito-Sato, Mechanical Engineering Intern, Property and Buildings](./welcome_slide.png)

## Hawaii Prince Spa Mechanical Plans

The Hawaii Prince Spa project is what I spent the majority of my time on during the summer. It involved learning a lot about how to create an efficient HVAC system, along with how to work efficiently alongside an architect and owner. I designed and redesigned the HVAC system using Revit, along with creating other sheets needed for the deliverables in AutoCAD. I also talked to manufacturers to get equipment selections to meet the requirements of each room. Below, I have shown three pictures of the mechanical plan, which show some of the progress and changes the project went through. The first picture is an earlier design, which would have worked, but the owner had made some new changes to the scope of the project, which required me to redesign based on the new requirements. The second image is after the redesign, and the third is the finalized design after review with the owner and architect. Overall, this project taught me a lot about the design and engineering process. I gained skills in Revit/AutoCAD as well as the dynamic between engineer, architect, and owner.

![1. Earlier design of the M102 mechanical plan, before the owner changed the scope](./spa_plan_02.jpg)

![2. M102 mechanical plan after the redesign](./spa_plan_03.jpg)

![3. Final M102 mechanical plan after review with the owner and architect](./spa_plan_04.jpg)

### Load Calculation and Room Data Sheet

Below, I have two pictures, the first picture is of an IES-VE model that I created to run the load calculation to get the heat load in each room. This process required me to compare existing design sheets with the new intended sheets to ensure I modeled each room correctly for an accurate calculation. I also researched U-values for windows and walls, along with following ASHRAE standards of heat loads from internal people count, equipment, and more. I also conducted a load calculation using TRACE 700 and compared it to my IES-VE calculation. The second picture is of the room data sheet I created, which has all of the information regarding each room in our scope displayed.

<div class="img-grid img-grid-2">

![IES-VE model used to run the room-by-room heat load calculation](./spa_05.png)

![Room data sheet with the information for each room in the project scope](./spa_06.png)

</div>

## Excel Calculation Tools

Exhaust airflow, building pressurization, and demand-controlled ventilation calculations came up on project after project and were slow to do by hand. On my own initiative, I researched the equations and code requirements and built three Excel tools that return consistent results from one set of inputs. The team first questioned them because they used newer data than the team usually worked from, then adopted them.

### Building Pressurization Excel Sheet

I created an Excel sheet to calculate the pressurization in a room and determine the required outside air to achieve a positive pressure in the room. I researched how building pressurization is calculated and what is considered under-pressurized, ideal, and over-pressurized. I used ASHRAE standards and values to create the Excel sheet below.

![Building pressurization Excel sheet walk-through](./building-pressurization-excel-sheet-walk-through.jpg)

### Demand Controlled Ventilation Excel Sheet

I created an Excel sheet to determine whether a room requires demand-controlled ventilation. I used the criteria in ASHRAE 90.1-2016 and combined them with ASHRAE room values to evaluate each room. The sheet pulls from the data already entered in a standard room data sheet, then flags whether the room requires demand-controlled ventilation and what needs to change if it does.

<div class="img-grid img-grid-2">

![Demand-controlled ventilation (DCV) Excel sheet walk-through](./dcv-excel-sheet-walk-through.jpg)

![Demand-controlled ventilation Excel sheet: flags whether each room needs DCV](./excel_03.png)

</div>

### Exhaust Rate Excel Sheet

I created an Excel sheet to calculate the amount of exhaust needed in each room. I used ASHRAE standards and values to create the Excel sheet below. It also includes room-specific notes that appear when that room type is selected.

<div class="img-grid img-grid-2">

![Exhaust rate Excel sheet walk-through](./exhaust-rate-excel-sheet-walk-through.jpg)

![Exhaust rate Excel sheet with room-specific notes](./excel_06.png)

</div>

## Site Visits

### Ulana Site Visit

During my site visit to the Ulana high-rise, I looked at equipment as well as compared the as-built equipment to our CAD design. While exploring the parking structure, we found an issue with the as-built storm drain design. It did not match our design, where the junction had to be vertical as per plumbing requirements, but the contractor had placed it horizontally. We discussed with the on-site architect as well as the plumbing head to highlight the problem. We then explored the HVAC and plumbing system that ran throughout the high-rise.

<div class="img-grid">

![Walking the Ulana site with the team](./ulana_03.jpg)

![As-built pump equipment at Ulana](./ulana_04.jpg)

![Our CAD design of the same equipment, for comparison with the as-built](./ulana_05.jpg)

![Inspecting the parking structure](./ulana_06.jpg)

![Checking the storm drain design on the drawings](./ulana_07.jpg)

![The as-built storm drain junction, placed horizontally instead of vertically](./ulana_08.jpg)

![HVAC equipment at Ulana](./ulana_09.jpg)

![Plumbing pumps and controls at Ulana](./ulana_10.jpg)

![Piping in the Ulana mechanical spaces](./ulana_11.jpg)

</div>

### Halekulani Site Visit

My site visit to the Halekulani hotel was to look at a burst plumbing pump. A manufacturer came with us to meet with the on-site engineers at Halekulani and discuss their options for dealing with the issue. It was interesting to see the dynamic between the on-site engineer, who needed a quick and cost-effective fix, and the manufacturer, who was there to help while also recommending their own products. We also explored the building, looking at HVAC, plumbing, and electrical equipment.

<div class="img-grid">

![Touring the Halekulani mechanical rooms](./halekulani_12.jpg)

![Plumbing pump equipment at the Halekulani](./halekulani_13.jpg)

![HVAC equipment at the Halekulani](./halekulani_14.jpg)

![Pumps and gauges at the Halekulani](./halekulani_15.jpg)

![Equipment at the Halekulani](./halekulani_16.jpg)

</div>

## Office and Industry Events

<div class="img-grid img-grid-2">

![WSP DSP: connecting with in-office engineers](./events_17.jpg)

![ASHRAE x IEEE networking event](./events_18.jpg)

</div>

**WSP DSP:** Connect with in-office engineers! **ASHRAE x IEEE:** Networking events!
