# MyTA art-direction study method report

## Scope

This study covers only:

- The first desktop viewport.
- The first mobile viewport.
- The central MyTA assignment-workflow spread at desktop and mobile sizes.

It does not select a direction, combine directions, build the full homepage, or modify production.

The requested `design-references/reference_manifest.json` was not present. The study used `design-references/reference_manifest_v3.json`, which matches the approved 12-reference capture report and evidence board.

## Shared safeguards

- The supplied MyTA logo is placed in HTML.
- Locked Hero copy and both locked actions are placed in HTML.
- ImageGen was not asked to typeset website copy or recreate the logo.
- Generated assets contain no intentional readable product features, student names, grades, percentages, outcomes, customers, integrations, certifications, testimonials, or claims.
- Abstract interface content is provisional and is not represented as a current product screenshot.
- DM Sans and the approved MyTA color family are used.
- Body copy is at least 16 pixels.
- Focus states are visible.
- No meaning depends on motion.
- The studies introduce no fake claims or product facts.

## Direction A: Interface authority

### Reference roles used

- Linear: product scale, precision, restrained hierarchy, one dominant interface.
- Class Companion: immediate assignment-level comprehension.
- Turnitin Clarity: assignment-specific evidence and instructor-controlled support.

### ImageGen prompts used

#### Hero asset

```text
Use case: ui-mockup
Asset type: MyTA marketing art-direction hero anchor, landscape
Primary request: Create a polished, product-first visual centered on one dominant assignment interface composition for a higher-education learning product. Show one large continuous application surface where an instructor context rail, a student working area, and a restrained instructor insight pane coexist as parts of the same assignment. The student work area must have the strongest visual focus.
Style/medium: premium editorial product visualization, crisp interface geometry, subtle depth, restrained realism
Composition/framing: wide 3:2 landscape, asymmetrical, interface occupies nearly the entire frame, one dominant canvas rather than multiple equal cards, close enough to feel authoritative
Color palette: MyTA blue #2563eb, teal #16a085, cyan #38bdf8, dark neutral #172033, warm white #fafaf7
Materials/textures: matte screen surface, subtle paper-like course material texture, controlled borders and small radii
Constraints: no readable text, no logos, no student names, no grades, no percentages, no metrics, no feature claims, no identifiable people; interface areas may contain only abstract lines, diagrams, document blocks, and nonverbal marks; visually communicate instructor context, active student work, and returning learning signals
Avoid: dark Linear identity, generic dashboard grid, glassmorphism, blue-purple gradient, glowing orb, robots, brains, neural networks, sparkles, circuit patterns, floating chat bubbles, stock classroom, random 3D objects, three equal cards, arrows, timeline, watermark
```

#### Workflow asset

```text
Use case: ui-mockup
Asset type: MyTA assignment-workflow art-direction anchor, landscape
Primary request: Create a polished precision-product visual showing one assignment moving through instructor context, active student reasoning, and returning learning signals inside a single coherent application surface. Make the transitions visible through changing focus and spatial depth inside the same interface, not separate cards.
Style/medium: premium editorial interface visualization, crisp, restrained, professional higher education
Composition/framing: wide 3:2, one continuous interface plane with a large student reasoning canvas at center, instructor setup embedded at left, returning signal/action region integrated at right; no equal columns
Color palette: #2563eb, #16a085, #38bdf8, #172033, #fafaf7, white
Constraints: no readable text, logos, names, grades, percentages, metrics, claims, or people; use abstract course-material lines, equations, annotations, and nonverbal signal clusters only
Avoid: boxes-and-arrows infographic, timeline, stepper, three equal cards, generic dashboard, dark identity, glassmorphism, generic blue-purple gradient, robots, brains, orbs, sparkles, chat bubbles, stock classroom, random 3D objects, watermark
```

### Generated assets

- `assets/direction-a-hero.png`
- `assets/direction-a-workflow.png`

### HTML and CSS decisions

- Desktop uses a copy-to-interface asymmetry with the interface occupying most of the viewport.
- Mobile crops into the interface rather than scaling the entire desktop composition down.
- The workflow uses a dark stage and a single large interface, with HTML stage annotations outside the generated asset.

### Known limitations

- The interface is intentionally abstract and cannot validate actual product behavior.
- The generated mathematical marks are decorative course-work placeholders, not a claimed MyTA feature.

## Direction B: Education-first brand expression

### Reference roles used

- Google for Education: education-specific visual identity and continuity from promise to product.
- OpenAI Education: calm institutional hierarchy.
- Linear: restraint and one dominant anchor.

### ImageGen prompts used

#### Hero asset

```text
Use case: stylized-concept
Asset type: MyTA education-first marketing hero anchor, landscape
Primary request: Create a distinctive higher-education assignment environment where physical course materials and a calm digital learning interface belong to the same visual world. Show a large open assignment folio with layered syllabus pages, annotated reasoning marks, and subtle interface panes emerging from the paper. Suggest instructor-set context at the top edge, active student work in the center, and concise signals returning along the margin.
Style/medium: sophisticated editorial collage, tactile paper, ink, subtle screen light, human and academic without showing people
Composition/framing: wide 3:2, asymmetrical tabletop-like plane viewed at a refined oblique angle; one large folio dominates; generous but controlled negative space
Color palette: warm white #fafaf7, dark neutral #172033, MyTA blue #2563eb, teal #16a085, cyan #38bdf8, small graphite accents
Constraints: no readable text, no logo, no names, grades, numbers, percentages, customers, claims, integrations, certifications, or identifiable people; academic marks must be abstract and nonverbal
Avoid: Google colors, OpenAI identity, campus photos, stock classroom, generic SaaS dashboard, floating cards, glassmorphism, blue-purple gradient, robots, brains, neural networks, glowing orbs, sparkles, circuit patterns, chat bubbles, random 3D objects, watermark
```

#### Workflow asset

```text
Use case: stylized-concept
Asset type: MyTA education-first assignment-workflow spread, landscape
Primary request: Create a sophisticated editorial spread showing one university assignment as a living folio. Instructor-authored course context appears as layered source pages at the upper left, student reasoning develops through handwritten diagrams and revision marks across the large center fold, and concise instructor-facing signal tabs gather organically along the outer right margin. It must feel like one continuous academic artifact, not software cards.
Style/medium: tactile print editorial plus restrained digital interface accents, premium higher-education art direction
Composition/framing: wide 3:2 overhead-oblique composition, one dominant open folio, irregular but controlled overlap, central reasoning region largest
Color palette: warm white #fafaf7, graphite #172033, blue #2563eb, teal #16a085, cyan #38bdf8
Constraints: no readable text, logo, names, grades, percentages, metrics, outcomes, claims, integrations, certifications, or people; abstract annotations and nonverbal marks only
Avoid: generic dashboard, three cards, stepper, timeline, arrows, Google colors, OpenAI identity, campus photography, stock classroom, floating chat bubbles, glassmorphism, robots, brains, neural networks, orbs, sparkles, blue-purple gradient, random 3D objects, watermark
```

### Generated assets

- `assets/direction-b-hero.png`
- `assets/direction-b-workflow.png`

### HTML and CSS decisions

- Desktop uses a dark editorial field and a large folio that enters from outside the frame.
- Mobile gives the folio the upper half and places the locked Hero content on a dark lower field.
- Workflow annotations act like margin notes over one continuous academic surface.

### Known limitations

- The folio is a visual metaphor, not a literal MyTA product screen.
- Some generated handwritten marks resemble notation but are not intended to be read.

## Direction C: Continuous assignment story

### Reference roles used

- Granola: lifecycle continuity.
- Gradescope: recognizable coursework and practical workflow clarity.
- IgniteAI: instructor control and calm confidence.

### ImageGen prompts used

#### Hero asset

```text
Use case: stylized-concept
Asset type: MyTA continuous assignment-story marketing hero anchor, landscape
Primary request: Create one continuous folded assignment ribbon that travels through a higher-education learning process: it begins as instructor-defined course context, widens into an active student work surface, then folds upward into concise learning signals returning to an instructor decision point. The transitions must feel like one physical-digital object, never separate steps.
Style/medium: refined editorial product sculpture, matte paper and screen surfaces, precise and credible
Composition/framing: wide 3:2, sweeping diagonal path with strong depth, central student-work fold largest, beginning and return visible at opposite edges
Color palette: #fafaf7, #172033, #2563eb, #16a085, #38bdf8, white
Constraints: no readable text, logo, people, student names, grades, percentages, metrics, claims, or icons implying surveillance; abstract marks and course diagrams only
Avoid: generic timeline, stepper, boxes and arrows, three equal cards, generic dashboard, glowing ribbon, neon, blue-purple gradient, robots, brains, neural networks, orbs, sparkles, circuit patterns, floating chat bubbles, stock classroom, glassmorphism, random 3D objects, watermark
```

#### Workflow asset

```text
Use case: stylized-concept
Asset type: MyTA continuous assignment workflow spread, landscape
Primary request: Create a single flowing assignment surface that visibly transforms from instructor setup into active student reasoning and then into returning learning signals and a final instructor action zone. Use folds, cutouts, and changes in material density so the same surface tells the full loop without separate panels.
Style/medium: refined physical-digital paper engineering, matte editorial sculpture, precise higher-education product storytelling
Composition/framing: wide 3:2, serpentine but calm continuous path across the frame, beginning visible at left, central work area largest and closest, return fold rises at right and subtly turns back toward the beginning
Color palette: warm white #fafaf7, dark neutral #172033, #2563eb, #16a085, #38bdf8
Constraints: no readable text, logo, people, names, grades, percentages, metrics, claims, or surveillance cues; use abstract course diagrams, writing lines, revision marks, and concise signal dots only
Avoid: three equal cards, generic timeline, stepper, boxes and arrows, dashboard grid, glowing ribbon, neon, blue-purple gradient, glassmorphism, robots, brains, neural networks, orbs, sparkles, circuit patterns, chat bubbles, stock classroom, random 3D objects, watermark
```

### Generated assets

- `assets/direction-c-hero.png`
- `assets/direction-c-workflow.png`

### HTML and CSS decisions

- Desktop lets the folded assignment object sweep beneath the locked Hero content.
- Mobile deliberately separates the visual field from a blue copy field rather than stacking a scaled desktop composition.
- Workflow labels follow different points on the physical path and remain HTML, not generated text.

### Known limitations

- The folded surface communicates continuity but does not specify exact product navigation.
- The workflow labels are interpretive annotations for review, not production microcopy.

## Material difference confirmation

At thumbnail scale:

- Direction A is recognized by a large precision interface and dark workflow stage.
- Direction B is recognized by a tactile academic folio and margin-note logic.
- Direction C is recognized by a continuous folded assignment object and path-based labels.

They differ in composition, anchor, copy-to-visual relationship, background behavior, workflow storytelling, and mobile treatment. They are not template variations.
