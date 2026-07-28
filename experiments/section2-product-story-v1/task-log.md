# Section 2 product story task log

## Implementation plan

### Files to create

- `index.html`: semantic three-chapter prototype.
- `context-preview.html`: static approved Hero image followed by the implemented Section 2.
- `styles.css`: approved desktop sticky composition, tablet adjustments, mobile normal-flow sequence, focus states, and reduced-motion behavior.
- `section2.js`: native scroll-driven chapter state and chapter-control navigation.
- `README.md`: local run and review instructions.
- `evidence/review.md`: screenshot observations and two correction-pass notes.
- `evidence/*.png`: required desktop, tablet, mobile, and context captures.

### Verified product structures represented

- Chapter 1 uses the real instructor Course Material screen, focused on Upload Material, class and material-type controls, and Uploaded Materials.
- Chapter 2 uses the real student assignment workspace with the problem pane, MyTA pane, student hint request, and returned hint.
- Chapter 3 uses the real instructor dashboard weekly briefing as the primary state and the real grading/upcoming assignment queues as a subordinate supporting crop.

### Truth boundaries

- Course Material is evidence of course context and approved references, not assignment-level support-rule configuration.
- The guided-support image is a real student-side hint interaction.
- The weekly briefing and queues show instructor attention surfaces, not validated mastery analytics or a verified intervention destination.

### Screenshot review sequence

1. Capture all three desktop chapter states at 1440 × 1000.
2. Capture Chapter 2 at 1024 × 768.
3. Capture the full mobile page at 390 pixels wide.
4. Capture the static approved-Hero-to-Section-2 context at 1440 × 1600.
5. Review composition, crops, hierarchy, overflow, and accessibility.
6. Perform correction pass 1 and recapture.
7. Perform final restraint correction pass 2 and overwrite the final evidence.

## Render observations

### First render

- The desktop product canvas sat too high relative to the active chapter.
- The Course Material crop retained unnecessary application navigation.
- The guided-support crop retained a beige edge and unused workspace.
- The instructor crop did not keep the weekly briefing visible.
- The tablet headline wrapped beyond the approved three-line hierarchy.
- The browser's stitched full-page mode duplicated responsive mobile content.

### Correction pass 1

- Lowered the product canvas to align it with the editorial hierarchy.
- Tightened the Course Material and guided-support crops around verified evidence.
- Reduced the tablet headline and gap while keeping the sticky two-column pattern.
- Tightened mobile chapter spacing and changed the mobile Course Material crop to show both upload controls and uploaded materials.
- Replaced the unreliable stitched full-page mode with exact overlapping in-app browser captures.

### Correction pass 2

- Focused the desktop instructor crop on the weekly briefing and the real assignment queues.
- Refined the mobile weekly briefing and queue crops to match the approved evidence hierarchy.
- Removed visible browser scrollbar artifacts without changing scrolling behavior.
- Re-captured every required final evidence file and verified its dimensions.

## Final visual refinement

- Standardized all desktop chapter states on the same product-frame geometry and made inactive states hidden only after their transition completes, preventing Chapter 3 from being captured dimmed.
- Tightened the desktop crops around upload controls, the assignment-and-hint exchange, and the weekly briefing with assignment queues.
- Added a dedicated 1024-pixel two-column layout with a shorter product frame and tighter editorial spacing.
- Replaced the mobile Stage 2 full-screen reduction with two aligned crops from the same real screenshot: problem context followed by guided support.
- Reframed mobile Stage 1 around upload controls and the first three materials, and mobile Stage 3 around the briefing plus only the most relevant queue rows.
- Added only a one-pixel neutral boundary in `context-preview.html`; the approved Hero image itself was not changed.
- Captured the final desktop, tablet, mobile-stage, full-mobile, and Hero-transition evidence after transitions settled.
