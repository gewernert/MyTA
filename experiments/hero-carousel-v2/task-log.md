# MyTA hero carousel v2 task log

## Preflight

- Repository: `C:\Users\gewer\OneDrive\Documents\GitHub\MyTA`
- Active branch: `website-redesign`
- Initial `git status --short`: `?? design-exploration/` and `?? experiments/`
- Target directory status before creation: absent
- Existing work will remain untouched outside `experiments/hero-carousel-v2/`.
- `.openai/hosting.json`: absent

## Approved reference geometry map

- Header: approximately 94 pixels tall at a 1440 pixel viewport, full-width white surface, quiet bottom rule.
- Main container: approximately 1320 pixels wide.
- Hero split: approximately 38 percent copy and 62 percent carousel, with a 56 to 60 pixel gap.
- Hero spacing: copy and active image vertically centered within a generous white canvas; eyebrow begins roughly 100 pixels below the header.
- Headline lines: `Make learning` / `visible in the` / `age of AI.`
- Screenshot scale: active screenshot is the dominant proof and occupies about 82 percent of the carousel stage width.
- Card stack: second card about 82 pixels right at 0.94 scale; third about 142 pixels right at 0.88 scale.
- Controls: circular previous and next buttons at the horizontal edges of the stage; progress indicators and pause/play centered below.
- Background: white page with a very restrained soft-blue wash behind and below the carousel only.
- Mobile adaptation: quiet logo/menu header; copy first; full-width stacked actions; one deliberate crop of the active real screenshot; arrows and indicators directly below; no autoplay, preview cards, or horizontal overflow.

## Verified source images

- Approved Hero reference: 1672 by 941 pixels.
- Assignment workspace: 1917 by 908 pixels.
- Student dashboard: 1903 by 910 pixels.
- Study workspace: 1904 by 906 pixels.
- MyTA logo: 202 by 184 pixels.

## Files to create

- `index.html`
- `styles.css`
- `carousel.js`
- `README.md`
- `task-log.md`
- `assets/approved-hero-reference.png`
- `assets/product-assignment.png`
- `assets/product-dashboard.png`
- `assets/product-study.png`
- `evidence/desktop-1440x1000.png`
- `evidence/tablet-1024x768.png`
- `evidence/mobile-390x844.png`
- `evidence/desktop-slide-2.png`
- `evidence/review.md`

## Screenshot correction passes

1. Desktop composition: moved the Hero upward, kept the eyebrow on one line, and increased the assignment workspace's prominence while retaining the specified 84 percent maximum card width.
2. Responsive composition: compacted the stacked tablet rhythm so product evidence enters the 1024 by 768 capture, and allowed the mobile eyebrow to wrap without clipping. The mobile product stack remains a single uncropped active image.

No alternate direction or additional section was created.

## Final evidence

- Desktop: 1440 by 1000 pixels.
- Desktop slide 2: 1440 by 1000 pixels.
- Tablet: 1024 by 768 pixels.
- Mobile: 390 by 844 pixels.
- Browser layout widths matched each target with no page-level horizontal overflow.
- All four supplied images retained their original SHA-256 hashes after copying.

## Revision preflight: visual failures

- Product proof too small
- Excess carousel stage height
- Weak carousel depth
- Excess white space below the Hero
- Tablet product evidence arriving too late
- Mobile screenshot unreadability

The revision keeps the approved direction and corrects only these execution issues.

## Revision evidence passes

1. Product prominence pass: changed the desktop composition to 36/64 columns, enlarged the active screenshot to 93 percent of the carousel stage, strengthened the two preview cards, reduced stage height, and placed controls 20 pixels below the screenshot.
2. Balance and mobile crop pass: kept the 1024 pixel layout in two columns, aligned the product within the first viewport, and used a centered 3:2 crop of the unedited assignment screenshot on mobile.
3. Restraint pass: kept both tablet actions in one row and tightened the mobile screenshot/control relationship without adding elements.

Final browser observations:

- Desktop active screenshot: approximately 770 pixels wide, full opacity, natural aspect ratio.
- Tablet active screenshot and controls: both visible in the initial 1024 by 768 capture.
- Mobile product frame: begins in the initial 390 by 844 capture, isolates the assignment problem and MyTA support panel, and retains the original screenshot file.
- Mobile autoplay: disabled by the 560 pixel media query; manual controls remain enabled.
- Moving from mobile to desktop resumes autoplay only when no manual stop was recorded.
- Horizontal overflow: zero at 1440, 1024, and 390 CSS pixels.
