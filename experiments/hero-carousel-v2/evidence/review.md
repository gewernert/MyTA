# Rendered evidence review

## Concrete screenshot observations

- Desktop: the assignment workspace is now the dominant visual evidence. Its top aligns with the headline, its problem/support split is recognizable without zooming, and the compact indicators sit 20 pixels below it. Dashboard and Study form visible, untinted stacked previews rather than faint duplicates.
- Tablet: the copy and carousel remain in a compact two-column composition at 1024 pixels. The active screenshot and controls are both visible in the first viewport, and the CTA pair remains on one line.
- Mobile: source order remains eyebrow, headline, supporting copy, actions, then carousel. The real assignment screenshot is cropped responsively inside a 3:2 frame so the problem and MyTA support panel are legible while most left navigation is excluded. Preview cards and autoplay are removed; arrows and indicators remain directly attached below the frame.
- Slide 2: the dashboard becomes the sharp lead image and the other two screenshots reorder as one continuous stack.
- Remaining reference differences are constraint-driven: DM Sans replaces the reference's serif-like headline; the supplied full-color MyTA logo replaces the reference's dark square mark; and the uncropped desktop/tablet source screenshots remain proportionally wider and shallower than the reference mockup.

## Functional checks

- Previous, next, and indicator controls: passed in the in-app browser.
- Pause and play: passed; play resumed the five-second rotation after focus left the carousel.
- Five-second automatic rotation: passed from assignment to dashboard.
- Mobile automatic rotation: passed as disabled; the assignment remained active beyond five seconds and the rotation control was hidden and disabled.
- Mobile-to-desktop behavior: passed; autoplay resumed when no manual stop existed and remained stopped after a manual mobile slide change.
- Pointer/focus pause: passed while the carousel was targeted; focus-only pause was separately verified for more than five seconds.
- Manual interaction stops automatic rotation: passed; dashboard remained active beyond five seconds after a manual selection and focus moved outside the carousel.
- Keyboard Left/Right, Home, and End behavior: passed in the carousel region.
- Mobile menu Escape close and focus return: passed.
- Touch swipe: the swipe handler and threshold are present, but the in-app browser API did not expose touch-event synthesis for a live gesture check.
- Reduced motion: the media query removes transitions and the runtime prevents autoplay when matched; the in-app browser session did not expose media-feature emulation for a live reduced-motion run.
- Horizontal overflow: passed at 1440, 1024, and 390 CSS pixels.
- Images: passed; every image completed loading with declared dimensions matching its natural dimensions, and the first product image is eager/high-priority.
- Local serving: passed from the documented static-server route.
- Runtime errors: no visible page error occurred and all controls initialized; the in-app browser API did not expose a console-message stream for a separate console audit.

## Persona acceptance audit

- Professional product and web designer: pass for founder review; the product proof, stack depth, controls, and copy now read as one deliberate composition.
- University instructor: pass; the Hero explains bounded AI support without surveillance or inflated claims.
- Teaching and learning leader: pass; course context, guided help, and visibility into breakdowns are communicated directly.
- University decision maker: pass; the header, product evidence, and pilot action feel credible and mature.
- IT, privacy, security, accessibility, or procurement reviewer: pass; no compliance, integration, or institutional claims were added.
- Early-stage B2B SaaS marketer: pass; the pilot CTA is prominent and meaningful product evidence appears in the first view at all three target sizes.
- MyTA founder and brand steward: pass for visual gate; locked copy, approved colors, supplied logo, and real product screenshots are preserved.
- Student and accessibility advocate: pass with the two live-emulation limitations recorded above; controls are labeled, keyboard accessible, and motion can be stopped.
- Codex execution risk reviewer: pass; the work is isolated to `experiments/hero-carousel-v2/` and production files remain untouched.
