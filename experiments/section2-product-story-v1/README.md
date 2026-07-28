# MyTA Section 2 product story prototype

This directory contains the isolated implementation of the approved Section 2 visual targets. It does not modify or integrate with the Hero or production website.

## Run locally

From the repository root:

```powershell
python -m http.server 4226 --bind 127.0.0.1
```

Open:

- `http://127.0.0.1:4226/experiments/section2-product-story-v1/`
- `http://127.0.0.1:4226/experiments/section2-product-story-v1/context-preview.html`

## Review behavior

- At 900 pixels and wider, the section uses a sticky two-column chapter stage. Natural scrolling changes the active chapter.
- Each chapter title is a keyboard-accessible control that scrolls to its chapter.
- Below 900 pixels, the section becomes a normal-flow mobile sequence with no sticky state or image replacement.
- Reduced-motion preferences remove smooth scrolling and product crossfades.

