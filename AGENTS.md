# MyTA Website Redesign Agent Instructions

Before implementing any public website redesign task, read `WEBSITE_REDESIGN_SPEC.md` in full.

## Architecture

This repository is a static HTML, CSS, and JavaScript website. Do not convert it to React, Next.js, or another framework. Do not add unnecessary dependencies.

Public routes:

- `/`
- `/demo/`
- `/educators/`
- `/students/`

Hidden routes that must remain isolated and unlinked:

- `/stem-instructor-feedback/`
- `/anti-dilution-scheduling/`

## Visual System

Use DM Sans only on public pages.

Approved public palette:

- Primary: `#2563eb`
- Secondary: `#16a085`
- Accent: `#38bdf8`
- Dark Neutral: `#172033`
- Light Neutral: `#fafaf7`
- Soft Accent: `#eaf2ff`
- White: `#ffffff`

Opacity variants derived from these colors are allowed. Do not introduce unrelated colors or fonts.

Layouts should be content driven. Avoid fixed heights, giant empty sections, decorative graphics unrelated to the product, and low fidelity wireframes. Use controlled whitespace, subtle borders, small radii, minimal shadows, and realistic product interfaces.

Respect `prefers-reduced-motion`.

## Product Visual Standards

The recurring visual motif is:

Course materials to assignment to student interaction to instructor insight.

Use existing real screenshots first:

- `assets/screenshots/myta-assignment-ai-tutor.png`
- `assets/screenshots/myta-ai-tutor.png`
- `assets/screenshots/myta-ai-tutor-crop.png`
- `assets/screenshots/myta-dashboard.png`
- `assets/screenshots/myta-dashboard-crop.png`
- `assets/screenshots/myta-login.png`

When screenshots do not show the needed state, build polished product interfaces with semantic HTML, CSS, and simple SVG. Do not use stock photography, generic AI spheres, robots, graduation caps, fake institutional logos, or the scheduler prank image publicly.

## Formspree Preservation

Preserve all public Formspree integrations:

- Pilot form endpoint: `https://formspree.io/f/xwvydkla`
- Demo feedback endpoint: `https://formspree.io/f/mojroqew`

Preserve method, field names, hidden fields, honeypot fields, validation hooks, analytics attributes, success redirects, success handling, and submission behavior unless a task explicitly authorizes a documented migration.

## Analytics Preservation

Preserve existing `data-analytics-event`, `data-analytics-location`, `data-form-name`, and `data-analytics-start` behavior. Do not interfere with `assets/js/site.js`.

Any new public marketing JavaScript must be isolated, dependency free, and scoped with `data-marketing-*` attributes.

## Video Preservation

Preserve the real demo video URL:

`https://s2qflve5hgjt1ibb.public.blob.vercel-storage.com/MyTA%20Demo.mp4`

Preserve native controls, `playsinline`, `preload="metadata"`, no autoplay, no default mute, fallback text, and responsive sizing.

Do not invent chapter timestamps. Do not activate seeking until exact timestamps are verified.

## Hidden Route Preservation

Do not edit, restyle, or link publicly to:

- `/stem-instructor-feedback/`
- `/anti-dilution-scheduling/`

The hidden survey endpoint, hidden survey draft key, scheduler table, scheduler date persistence, scheduler drag behavior, and scheduler Supabase behavior must remain unchanged.

Do not copy Supabase keys into documentation. State only that the existing Supabase configuration and behavior must remain unchanged.

## Claim Safety

MyTA positioning:

The assessment layer for seeing and shaping how students learn with AI.

Do not lead with cheating detection, surveillance, punishment, bans, forced AI, or lockdown language. Academic integrity should be presented as an outcome of a better learning process.

Do not claim:

- FERPA compliant
- SOC 2 compliant
- SOC 2 certified
- Certified LMS integrations
- Automatic sign in
- Roster sync
- Grade passback
- Proven learning gains
- Zero data retention
- Zero risk
- Locally trained AI
- Public model training exclusions

unless verified documentation exists in the repository.

Use status-aware language such as:

- Designed to support FERPA aligned institutional deployments.
- Designed for LMS integration through LTI.
- Current integrations are in development.
- Security and privacy documentation is available during pilot review.
- Designed around research backed learning principles.

## Accessibility

Use semantic HTML. Keep controls keyboard accessible. FAQ and product interactions must use real buttons, visible focus states, and appropriate ARIA attributes. Do not use color alone for meaning. Keep text contrast readable and tap targets usable.

## Responsive Testing

Test public pages at:

- 1440px
- 1280px
- 1024px
- 768px
- 390px
- 360px

Confirm no page-level horizontal overflow, no clipped headings, usable buttons, accessible interactions, and clean stacking.

## Implementation Discipline

Follow the task sequence in `WEBSITE_REDESIGN_SPEC.md`. Each implementation task must stop and report before the next begins. Do not combine tasks.
