# Final accessibility contrast check

Checked on branch `website-redesign` using the rendered page at desktop and mobile widths. Ratios use the WCAG relative-luminance formula.

## Semantic surface tokens

| Token | Value | Intended surface |
| --- | --- | --- |
| `--teal-on-light` | `#14806F` | Small teal text and meaningful teal indicators on white or similarly light surfaces |
| `--teal-on-dark` | `#16A085` | Teal text and meaningful teal indicators on the navy Section 2 surface |

## Rendered contrast results

| Use | Foreground | Rendered background | Contrast |
| --- | --- | --- | ---: |
| Hero eyebrow | `#14806F` / `rgb(20, 128, 111)` | `#FFFFFF` / `rgb(255, 255, 255)` | 4.831:1 |
| Active Hero carousel indicator | `#14806F` / `rgb(20, 128, 111)` | `#FFFFFF` / `rgb(255, 255, 255)` | 4.831:1 |
| Section 2 eyebrow | `#16A085` / `rgb(22, 160, 133)` | `#172033` / `rgb(23, 32, 51)` | 4.959:1 |
| Active chapter number | `#16A085` / `rgb(22, 160, 133)` | `#172033` / `rgb(23, 32, 51)` | 4.959:1 |
| Active chapter rule | `#16A085` / `rgb(22, 160, 133)` | `#172033` / `rgb(23, 32, 51)` | 4.959:1 |
| Light-surface focus outline | `#14806F` / `rgb(20, 128, 111)` | `#FFFFFF` / `rgb(255, 255, 255)` | 4.831:1 |
| Navy chapter-control focus outline | `#38BDF8` / `rgb(56, 189, 248)` | `#172033` / `rgb(23, 32, 51)` | 7.594:1 |

The 12px Hero eyebrow exceeds the required 4.5:1 text-contrast threshold. The small teal text and indicators on navy also exceed 4.5:1. Both focus treatments exceed the 3:1 non-text contrast threshold.

## Selectors changed

- `:root` defines `--teal-on-light` and `--teal-on-dark`.
- `:focus-visible` uses `--teal-on-light` for outlines drawn on light surfaces.
- `.eyebrow` uses `--teal-on-light`.
- `.carousel-indicators button[aria-current="true"]::before` uses `--teal-on-light`.
- `.story-eyebrow` uses `--teal-on-dark`.
- `.chapter-control::before` uses `--teal-on-dark`.
- `.chapter-control[aria-expanded="true"] .chapter-number` uses `--teal-on-dark`.
- `.mobile-chapter-number` uses `--teal-on-dark`.

The existing `h1 b` large punctuation accent remains on the original brand teal. The existing `.chapter-control:focus-visible` cyan-on-navy override remains unchanged.

## Regression confirmation

- No font family, font size, font weight, line height, letter spacing, text width, spacing token, margin, padding, gap, or alignment value changed.
- Computed typography and semantic gaps at 1440 by 1000 and 390 by 844 match the accepted typography report.
- Page-level horizontal overflow remains 0px at both verification widths.
- No layout, breakpoint, section pacing, screenshot, crop, copy, navigation, CTA, carousel behavior, chapter behavior, or JavaScript changed.
- The stylesheet query version in `index.html` changed only to ensure the corrected CSS is loaded.
- The browser console was empty after the final verification.
- `experiments/hero-carousel-v2/`, `experiments/section2-product-story-v1/`, and production files were untouched.
