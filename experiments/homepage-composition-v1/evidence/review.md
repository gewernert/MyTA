# Final homepage composition QA

## Desktop measurements at 1440 by 1000

- Header brand and Hero text leading edge: 48 px.
- Section 2 text leading edge: 54 px, a 6 px difference from the Header and Hero text grid.
- Hero product-stage leading edge: 559.47 px.
- Section 2 product-stage leading edge: 552.48 px, a 6.99 px difference.
- Bottom of meaningful Hero content: 663.34 px.
- White-to-navy section boundary: 743.34 px.
- Hero content-to-boundary spacing: 80 px.
- Section 2 eyebrow top: 871.36 px.
- Boundary-to-eyebrow spacing: 128.02 px.
- Sticky offset: 0 px.
- Active Section 2 product frame: 833.52 by 520.94 px.
- Active Hero screenshot frame: 774 by 368 px.

## Breakpoint results

| Viewport | Hero bottom | Active Hero frame | Section 2 mode | Rotation control | Horizontal overflow | Console issues |
| --- | ---: | ---: | --- | --- | ---: | ---: |
| 1440 by 1000 | 743 px | 774 by 368 px | Sticky desktop | Visible | 0 px | 0 |
| 1280 by 800 | 711 px | 710 by 338 px | Sticky desktop | Visible | 0 px | 0 |
| 1024 by 768 | 583 px | 558 by 265 px | Sticky tablet | Visible | 0 px | 0 |
| 768 by 1024 | 879 px | 684 by 325 px | Normal-flow Section 2 | Visible | 0 px | 0 |
| 430 by 932 | 958 px | 388 by 258 px | Normal-flow Section 2 | Hidden | 0 px | 0 |
| 390 by 844 | 925 px | 348 by 231 px | Normal-flow Section 2 | Hidden | 0 px | 0 |
| 360 by 800 | 893 px | 318 by 211 px | Normal-flow Section 2 | Hidden | 0 px | 0 |

## Interaction and accessibility results

- Desktop carousel index changed from 1 to 2 after 5.25 seconds of automatic rotation.
- A manual next action changed the carousel to slide 3; it remained on slide 3 after another 5.25 seconds.
- Home selected slide 1, Arrow Right selected slide 2, and End selected slide 3.
- At 390 px, the carousel remained on slide 1 after 5.25 seconds; a manual next action selected slide 2 and it remained there after another 5.25 seconds.
- The mobile menu moved focus to Product when opened. Escape closed it and restored focus to the menu button.
- The skip link resolved uniquely and received a 3 px solid cyan focus outline.
- Section 2 remained on chapter 1 at 1 px before the section boundary and at 120 px after it. It changed to chapter 2 at the second 1000 px chapter step.
- Two reduced-motion media rules are present. Both carousel and Section 2 scripts query `prefers-reduced-motion`; the test environment reported the preference as off.
- Duplicate IDs: 0.

## Screenshot accuracy

- Desktop and tablet Section 2 evidence uses normal 1440 by 1000 or breakpoint-sized viewport screenshots after scrolling to the requested state.
- No desktop or tablet sticky evidence was stitched.
- Each Section 2 chapter screenshot contains one sticky stage.
- The mobile full-page evidence is assembled from five normal 390 by 844 viewport captures at scroll positions 0, 844, 1688, 2532, and 2667 px because Section 2 is non-sticky at that width.
- Final mobile full-page dimensions: 390 by 3511 px.

## Remaining visible differences from the approved source experiments

- The integrated desktop Section 2 editorial stage is 54 px higher than the isolated approved desktop stage so its eyebrow sits 128.02 px below the live section boundary.
- The integrated desktop Section 2 product frame is approximately 8 px wider than the isolated source frame to keep both section grids within 7 px of each other.
- At 390 by 844, the combined page places the mobile carousel control row approximately 15 to 24 px lower than the isolated Hero evidence; the row remains in normal flow and is fully visible with a short scroll.
