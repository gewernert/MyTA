# Screenshot review

## Initial desktop render, 1440 by 1000

- The headline, supporting copy, and two actions formed a clear left-column hierarchy.
- The assignment workspace was the dominant visual and the verified split between the problem pane and MyTA support pane was recognizable.
- The conceptual setup rail overlapped too much of the problem pane. This reduced product legibility and made the setup layer feel closer to the captured interface than intended.
- The continuous line reached the workflow below, but the rail needed cleaner separation from the student product to make the evidence boundary explicit.

## Initial mobile render, 390 by 844

- Copy and actions appeared first, and both actions measured at least 44 pixels high.
- The setup layer correctly preceded the student workspace.
- The setup layer used too much vertical space, leaving only the workspace header at the bottom of the first viewport.
- There was no page-level horizontal overflow, but the first-view product evidence needed stronger legibility.

## Narrow correction pass

- Shifted the desktop workspace to the right of the conceptual rail so the rail no longer obscures the problem or support panes.
- Kept the blue connector entering the assignment header while preserving a visible gap between conceptual and verified surfaces.
- Reworked the mobile setup layer into a compact three-column rail and reduced the gap before it.
- Raised all meaningful mobile text to at least 14 pixels and retained 44-pixel minimum controls.
- Reduced the desktop right extension until `scrollWidth` matched the browser `clientWidth`.

## Final desktop render, 1440 by 1000

- The conceptual rail ends before the assignment workspace begins, with a visible connector spanning the gap.
- The problem title, neutral fluid-dynamics prompt, student reasoning area, support question, Hint, Explain concept, Check reasoning, progression, and review action are legible together.
- The product remains more visually prominent than the path, setup rail, or workflow decoration.
- The first workflow heading begins immediately below the hero, so the assignment story reads as continuous rather than as a separate feature section.
- Browser measurements: `scrollWidth` 1440 pixels and `clientWidth` 1440 pixels.

## Final mobile render, 390 by 844

- The source order is copy, actions, conceptual setup, then student workspace.
- The conceptual rail is visibly labeled and its disclaimer remains readable before the product surface begins.
- The workspace header and problem progression enter the first viewport, while the full problem and support panes remain readable through vertical scrolling with no sideways scrolling.
- The continuous path becomes a vertical line adjacent to each numbered workflow stage, keeping labels close to their evidence.
- Browser measurements: `scrollWidth` 390 pixels and `clientWidth` 390 pixels; meaningful text is at least 14 pixels; interactive controls are at least 44 pixels high.

## Remaining concern

- The instructor setup and instructor action fragments are intentionally conceptual. They require founder review as art direction and must not be treated as evidence of current instructor product screens.
