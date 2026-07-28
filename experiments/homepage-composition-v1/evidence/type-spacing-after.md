# Typography and spacing after report

Audit completed on branch `website-redesign`. Measurements are visible `getBoundingClientRect()` values in CSS pixels from the rendered page. All roles use the local `"DM Sans", sans-serif` family. Control labels are reported as one rendered text line even when the control box is taller than its line box.

## Final spacing tokens

| Token | Value |
| --- | ---: |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 40px |
| `--space-8` | 48px |
| `--space-9` | 64px |
| `--space-10` | 80px |
| `--space-11` | 96px |
| `--space-12` | 128px |
| `--space-13` | 144px |

## Final type tokens

| Role | Size | Weight | Line height | Tracking |
| --- | --- | ---: | ---: | ---: |
| Display headline | `clamp(58px, 5.25vw, 76px)` | 600 | 1 | -0.055em |
| Section headline | `clamp(42px, 3.3vw, 48px)` | 600 | 1.04 | -0.04em |
| Body large | 19px | 400 | 1.58 | normal |
| Body standard | 16px | 400 | 1.55 | normal |
| Chapter title | 20px | 600 | 1.3 | -0.01em |
| Eyebrow | 12px | 700 | 1.5 | 0.1em |
| Navigation and button label | 15px | 600 or 700 by control role | 1.2 | normal |

Responsive role adjustments remain within these roles: display becomes `clamp(48px, 5.15vw, 54px)` below 1100 pixels and uses 1.01 line height below 560 pixels; section headline becomes 32 pixels at sticky tablet widths and `clamp(34px, 8.35vw, 38px)` in normal-flow layouts; active and inactive sticky chapter titles become 18 and 16 pixels at 1024 pixels; labels become 14 pixels below 1100 pixels.

## Shared role attributes

| Role | Color | Weight |
| --- | --- | ---: |
| Header navigation | `rgb(23, 32, 51)` | 600 desktop; native mobile-menu toggle label is 400 |
| Hero eyebrow | `rgb(22, 160, 133)` | 700 |
| Hero headline | `rgb(23, 32, 51)` | 600 |
| Hero supporting copy | `rgba(23, 32, 51, 0.72)` | 400 |
| Primary CTA label | `rgb(255, 255, 255)` | 700 |
| Section 2 eyebrow and chapter numbers | `rgb(113, 218, 202)` | 700 |
| Section 2 headline and active chapter title | `rgb(255, 255, 255)` | 600 |
| Section 2 introduction and chapter descriptions | `rgb(209, 215, 224)` | 400 |
| Inactive chapter title | `rgb(189, 198, 211)` | 600 |

## Exact computed text styles

Entries use `size / line-height / letter-spacing / visible width / rendered lines`.

### 1440 by 1000

| Role | Computed values |
| --- | --- |
| Header navigation | 15px / 18px / normal / 57.81px / 1 |
| Hero eyebrow | 12px / 18px / 1.2px / 468.28px / 1 |
| Hero headline | 75.6px / 75.6px / -4.158px / 461.56px / 3 |
| Hero supporting copy | 19px / 30.02px / normal / 468.28px / 4 |
| CTA label | 15px / 18px / normal / 166px / 1 |
| Section 2 eyebrow | 12px / 18px / 1.2px / 429.38px / 1 |
| Section 2 headline | 47.52px / 49.4208px / -1.9008px / 429.38px / 3 |
| Section 2 introduction | 16px / 24.8px / normal / 429.38px / 3 |
| Chapter number | 12px / normal / 0.96px / 36px / 1 |
| Active chapter title | 20px / 26px / -0.2px / 377.38px / 1 |
| Inactive chapter title | 18px / 23.4px / -0.18px / 377.38px / 1 |
| Chapter description | 16px / 24.8px / normal / 350px / 3 |

### 1280 by 800

| Role | Computed values |
| --- | --- |
| Header navigation | 15px / 18px / normal / 57.81px / 1 |
| Hero eyebrow | 12px / 18px / 1.2px / 429.69px / 1 |
| Hero headline | 67.2px / 67.2px / -3.696px / 410.22px / 3 |
| Hero supporting copy | 19px / 30.02px / normal / 429.69px / 4 |
| CTA label | 15px / 18px / normal / 166px / 1 |
| Section 2 eyebrow | 12px / 18px / 1.2px / 397.98px / 1 |
| Section 2 headline | 42.24px / 43.9296px / -1.6896px / 397.98px / 3 |
| Section 2 introduction | 16px / 24.8px / normal / 397.98px / 3 |
| Chapter number | 12px / normal / 0.96px / 36px / 1 |
| Active chapter title | 20px / 26px / -0.2px / 345.98px / 1 |
| Inactive chapter title | 18px / 23.4px / -0.18px / 345.98px / 1 |
| Chapter description | 16px / 24.8px / normal / 345.98px / 3 |

### 1024 by 768

| Role | Computed values |
| --- | --- |
| Header navigation | 14px / 16.8px / normal / 53.95px / 1 |
| Hero eyebrow | 12px / 18px / 1.2px / 334.08px / 1 |
| Hero headline | 52.736px / 52.736px / -2.90048px / 321.94px / 3 |
| Hero supporting copy | 16px / 25.28px / normal / 334.08px / 4 |
| CTA label | 14px / 16.8px / normal / 145px / 1 |
| Section 2 eyebrow | 12px / 18px / 1.2px / 322.31px / 1 |
| Section 2 headline | 32px / 33.28px / -1.28px / 322.31px / 3 |
| Section 2 introduction | 16px / 24.8px / normal / 322.31px / 3 |
| Chapter number | 12px / normal / 0.96px / 36px / 1 |
| Active chapter title | 18px / 23.4px / -0.18px / 270.31px / 1 |
| Inactive chapter title | 16px / 20.8px / -0.16px / 270.31px / 1 |
| Chapter description | 16px / 24.8px / normal / 270.31px / 3 |

### 768 by 1024

| Role | Computed values |
| --- | --- |
| Mobile navigation toggle label | 13.3333px / normal / normal / 46px / 1 |
| Hero eyebrow | 12px / 18px / 1.2px / 728px / 1 |
| Hero headline | 48px / 48px / -2.64px / 293.05px / 3 |
| Hero supporting copy | 16px / 25.28px / normal / 470px / 3 |
| CTA label | 14px / 16.8px / normal / 145px / 1 |
| Section 2 eyebrow | 12px / 18px / 1.2px / 392px / 1 |
| Section 2 headline | 38px / 39.52px / -1.52px / 392px / 3 |
| Section 2 introduction | 16px / 24.8px / normal / 392px / 3 |
| Chapter number | 12px / 18px / 1.2px / 392px / 1 |
| Chapter title | 20px / 26px / -0.2px / 392px / 1 |
| Chapter description | 16px / 24.8px / normal / 392px / 2 |

### 430 by 932

| Role | Computed values |
| --- | --- |
| Mobile navigation toggle label | 13.3333px / normal / normal / 46px / 1 |
| Hero eyebrow | 12px / 18px / 1.2px / 390px / 2 |
| Hero headline | 54px / 54.54px / -2.97px / 329.69px / 3 |
| Hero supporting copy | 16px / 25.28px / normal / 390px / 4 |
| CTA label | 14px / 16.8px / normal / 390px / 1 |
| Section 2 eyebrow | 12px / 18px / 1.2px / 392px / 1 |
| Section 2 headline | 38px / 39.52px / -1.52px / 392px / 3 |
| Section 2 introduction | 16px / 24.8px / normal / 392px / 3 |
| Chapter number | 12px / 18px / 1.2px / 392px / 1 |
| Chapter title | 20px / 26px / -0.2px / 392px / 1 |
| Chapter description | 16px / 24.8px / normal / 392px / 2 |

### 390 by 844

| Role | Computed values |
| --- | --- |
| Mobile navigation toggle label | 13.3333px / normal / normal / 46px / 1 |
| Hero eyebrow | 12px / 18px / 1.2px / 350px / 2 |
| Hero headline | 51.87px / 52.3887px / -2.85285px / 316.67px / 3 |
| Hero supporting copy | 16px / 25.28px / normal / 350px / 4 |
| CTA label | 14px / 16.8px / normal / 350px / 1 |
| Section 2 eyebrow | 12px / 18px / 1.2px / 352px / 1 |
| Section 2 headline | 35.88px / 37.3152px / -1.4352px / 352px / 3 |
| Section 2 introduction | 16px / 24.8px / normal / 352px / 3 |
| Chapter number | 12px / 18px / 1.2px / 352px / 1 |
| Chapter title | 20px / 26px / -0.2px / 352px / 1 |
| Chapter description | 16px / 24.8px / normal / 352px / 3 |

### 360 by 800

| Role | Computed values |
| --- | --- |
| Mobile navigation toggle label | 13.3333px / normal / normal / 46px / 1 |
| Hero eyebrow | 12px / 18px / 1.2px / 320px / 2 |
| Hero headline | 48px / 48.48px / -2.64px / 293.05px / 3 |
| Hero supporting copy | 16px / 25.28px / normal / 320px / 5 |
| CTA label | 14px / 16.8px / normal / 320px / 1 |
| Section 2 eyebrow | 12px / 18px / 1.2px / 322px / 1 |
| Section 2 headline | 34px / 35.36px / -1.36px / 322px / 3 |
| Section 2 introduction | 16px / 24.8px / normal / 322px / 3 |
| Chapter number | 12px / 18px / 1.2px / 322px / 1 |
| Chapter title | 20px / 26px / -0.2px / 322px / 1 |
| Chapter description | 16px / 24.8px / normal / 322px / 3 |

## Exact visible gaps

| Relationship | 1440 | 1280 | 1024 | 768 | 430 | 390 | 360 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Header bottom to Hero eyebrow | 68 | 68 | 48 | 48 | 32 | 32 | 32 |
| Hero eyebrow to headline | 24 | 24 | 24 | 24 | 16 | 16 | 16 |
| Hero headline to supporting copy | 28 | 28 | 24 | 24 | 20 | 20 | 20 |
| Supporting copy to CTA row | 32 | 32 | 24 | 24 | 24 | 24 | 24 |
| CTA row to Hero boundary | 80 | 80 | 64 | 415 | 408 | 381.33 | 361.33 |
| Boundary to Section 2 eyebrow | 128 | 128 | 128 | 80 | 80 | 80 | 80 |
| Section 2 eyebrow to headline | 24 | 24 | 24 | 24 | 24 | 24 | 24 |
| Section 2 headline to introduction | 40 | 40 | 24 | 24 | 24 | 24 | 24 |
| Introduction to chapter navigation/first chapter | 48 | 48 | 24 | 49 | 49 | 49 | 49 |
| Active chapter title to description | 16 | 16 | 16 | 20 | 20 | 20 | 20 |
| Chapter row pitch/chapter-to-chapter sequence | 165.39 | 165.39 | 142.78 | 812.53 | 812.53 | 776.72 | 731.27 |
| Product frame to adjacent text column | 69.11 | 61.44 | 28 | n/a | n/a | n/a | n/a |
| Mobile CTA to CTA | n/a | n/a | n/a | n/a | 12 | 12 | 12 |
| Mobile CTAs to product frame | n/a | n/a | n/a | n/a | 25 | 25 | 25 |
| Mobile product frame to controls | n/a | n/a | n/a | n/a | 13 | 13 | 13 |
| Mobile Hero controls to dark boundary | n/a | n/a | n/a | n/a | 64 | 64 | 64 |
| Mobile chapter description to product image | n/a | n/a | n/a | 24 | 24 | 24 | 24 |

The large CTA-to-boundary values at 768 pixels and below include the product frame, controls, and their normal-flow gaps; they are not empty space. Sticky desktop chapter rows have zero empty row-to-row gap and use a divider; the reported pitch is the distance between row starts. Normal-flow chapter pitch includes each real product image.

## Before and after

- Hero eyebrow: 11px, 0.075em tracking, 1.5 line height to 12px, 0.1em tracking, 1.5 line height.
- Section 2 eyebrow: 12px, 0.16em tracking, 1.2 line height to the shared 12px, 0.1em, 1.5 eyebrow role.
- Hero display tracking: -0.062em to -0.055em. Existing headline sizes, weights, and intentional three-line breaks remain.
- Tablet and mobile Hero body: 15px to 16px. Desktop Hero body remains 19px.
- Section 2 introduction: 17px desktop and 15px tablet/mobile to the shared 16px body-standard role.
- Chapter descriptions: 15px desktop and 14px tablet to the shared 16px body-standard role.
- Mobile chapter titles: 27px to the shared 20px chapter-title role.
- Desktop story entry: accumulated centered/translated values measured as 128px at 1440, 36.23px at 1280, and 149.27px at 1024 to a consistent 128px.
- Normal-flow story entry: 38px to 80px.
- Mobile semantic relationships changed from 12px eyebrow-to-headline, 17px headline-to-body, 18px body-to-CTA, 10px CTA-to-CTA, 19px CTAs-to-product, and 38px controls-to-boundary to 16px, 20px, 24px, 12px, 25px visible, and 64px.
- The 1024-pixel secondary CTA received a 12px horizontal optical inset so the frozen label remains one line.

## Values intentionally left unchanged

- Hero and Section 2 headline clamp ranges, weights, three-line copy spans, and text-column proportions.
- Brand colors, page grids, logo, navigation, button heights, screenshots, screenshot crops, borders, shadows, and carousel geometry.
- Desktop Hero body size and line height.
- Active/inactive desktop chapter hierarchy and existing contrast colors.
- Desktop Hero semantic gaps that already formed a clear hierarchy.
- White-to-navy composition, sticky/normal-flow breakpoint, chapter interaction, carousel interaction, and source order.

## Non-token and optical exceptions

- `19px` mobile story horizontal padding is retained so the one-pixel product-frame border aligns visually with the Hero's 20-pixel content edge.
- `1.01` mobile display line height is a glyph-level optical correction that keeps the three display lines from crowding without altering paragraph leading.
- The visible 49px introduction-to-first-chapter measurement is `--space-8` plus the one-pixel chapter divider.
- The visible 25px CTA-to-product and 13px product-to-controls measurements are token gaps plus the product frame's one-pixel border.
- The 28px sticky tablet column gap is retained from the approved Section 2 proportion because forcing it to 24 or 32 pixels visibly changes the product-frame scale.
- Computed display and section sizes between breakpoint endpoints are intentional results of the two allowed `clamp()` roles, not one-off values.
- Inactive sticky chapter titles are a 2px state reduction from the chapter-title role; normal-flow chapters use only the 20px chapter-title role.
- Screenshot crop offsets, frame borders, control hit areas, and image aspect ratios remain component geometry rather than semantic spacing tokens.

## Optical alignment and wrapping

- Hero and Section 2 text columns retain their approved optical left edges.
- Both eyebrows use one role and align to their headline columns.
- CTA labels and header navigation remain vertically centered; the 1024-pixel secondary CTA no longer wraps.
- The active teal rule remains aligned with the expanded chapter content.
- Hero and Section 2 headlines remain three intentional lines at every required viewport.
- No heading ends with an avoidable single-word widow.
- Product frames retain their editorial anchors and do not overlap adjacent text.

## Runtime verification

- Horizontal overflow: 0px at 1440, 1280, 1024, 768, 430, 390, and 360 pixels.
- Console: no warnings or errors in the final in-app browser session.
- Keyboard: carousel Arrow keys, Home, and End work; mobile Escape closes navigation and returns focus; skip-link focus shows a 3px cyan outline.
- Carousel: desktop autoplay advances; manual interaction stops rotation; mobile autoplay remains disabled and manual controls remain functional.
- Section 2: chapter buttons work and natural desktop scrolling activates chapters 1, 2, and 3 at the expected scroll steps.
- Reduced motion: two CSS `prefers-reduced-motion: reduce` rules are present and both component scripts retain their media-query behavior.

## Remaining documented differences and constraints

- The integrated desktop story opening is intentionally 128px below the boundary, placing its content approximately 56 to 61 pixels higher than the isolated Section 2 evidence while matching the approved combined-page pacing.
- The integrated product frame is approximately 8px wider than the isolated Section 2 frame because the combined page's shared grid is retained.
- At 390 by 844, the Hero product controls fall just below the initial viewport after restoring 16px body text and semantic gaps; the product frame itself remains visible in the first viewport and the controls follow immediately in normal flow.
- The locked Hero eyebrow color computes to approximately 3.28:1 against white at 12px. It is preserved because this audit explicitly prohibits color changes; this remains the only identified small-text contrast exception.
- No source experiment, production file, screenshot asset, copy, JavaScript interaction, or product crop was changed.
