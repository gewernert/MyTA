# MyTA Public Website Redesign Specification

This document is the binding specification for the public MyTA website redesign. It preserves the approved strategy before implementation begins.

Do not begin implementation without reading this document in full.

## Repository Context

Repository: MyTA static marketing website

Current branch: `website-redesign`

Architecture: Static HTML, CSS, and JavaScript

Existing public routes:

- `/`
- `/demo/`

New public routes required:

- `/educators/`
- `/students/`

Existing hidden routes that must remain hidden and untouched:

- `/stem-instructor-feedback/`
- `/anti-dilution-scheduling/`

Do not convert the project to React, Next.js, or another framework.

## Binding Strategic Position

MyTA is not another generic AI tutor.

MyTA is:

The assessment layer for seeing and shaping how students learn with AI.

The three core messaging pillars are:

1. Visible learning

Instructors see how students reason, struggle, seek help, revise, and improve.

2. Course grounded guidance

Students receive support shaped by instructor approved course materials, objectives, examples, and assignment rules.

3. Instructor control

The instructor determines the course context, learning objectives, AI boundaries, and support experience.

Academic integrity should be presented as an outcome of a better learning process.

Do not lead with cheating detection, surveillance, punishment, bans, forced AI, or lockdown language.

## Primary Audiences

1. University instructors
2. Academic departments
3. Institutions and teaching innovation teams
4. Students as an important secondary audience

## Public Website Architecture

Homepage:

`/`

Educators:

`/educators/`

Students:

`/students/`

Demo:

`/demo/`

Contact:

Visible address:

[contact@mytaeducation.com](mailto:contact@mytaeducation.com)

Exact link:

`mailto:contact@mytaeducation.com`

Do not create a separate contact page.

Do not use the old hello address anywhere on the redesigned public website.

## Public Navigation

Use:

1. Home
2. Educators
3. Students
4. Demo
5. Contact
6. Request a Pilot

Destinations:

Home:

`/`

Educators:

`/educators/`

Students:

`/students/`

Demo:

`/demo/`

Contact:

`mailto:contact@mytaeducation.com`

Request a Pilot:

`/educators/#pilot`

Never link the hidden survey or scheduler publicly.

## Homepage Narrative Order

The final homepage must follow this exact sequence:

1. Hero
2. The challenge
3. How MyTA works
4. Product storytelling
5. Outcomes by audience
6. LMS workflow
7. Trust and data boundaries
8. Why MyTA is different
9. Research backed learning principles
10. Why this matters now
11. Get started
12. FAQ
13. Footer

Do not insert unrelated sections.

Do not replace this sequence with the current homepage structure.

## Homepage Hero

Eyebrow:

AI NATIVE ASSESSMENT

Headline:

See how students learn with AI.

Supporting copy:

MyTA turns homework into a course grounded, guided learning process and shows instructors where students struggle, ask for help, and improve.

Primary action:

Request a Pilot

Destination:

`/educators/#pilot`

Secondary action:

Watch the Demo

Destination:

`/demo/`

Hero visual:

Create a polished visual that explains the entire product loop:

1. Instructor context
2. Guided student work
3. Instructor signals

Instructor context should show approved slides, notes, examples, readings, objectives, and assignment rules entering MyTA.

Guided student work should show a student completing an assignment while the AI asks questions, offers hints, requests explanations, and references course material.

Instructor signals should show confusion points, help requests, revisions, engagement, and progress.

The hero should explain the product even when the viewer does not read the supporting paragraph.

Use realistic computer, laptop, or browser interface graphics.

Do not use generic AI spheres, robots, stock photography, graduation caps, meaningless charts, or decorative graphics unrelated to the workflow.

## The Challenge

Heading:

The final answer hides the learning process.

Introduction:

Students are already using AI. The problem is that current assignments reveal what was submitted, not how students reached it.

Pain point 1:

Instructors see the result, not the struggle.

Description:

Assignments show the final submission, but not where students became confused, used support, revised their thinking, or stopped engaging.

Pain point 2:

Students reach for AI without course context.

Description:

Generic AI tools do not know the instructor's materials, expectations, learning objectives, or boundaries.

Pain point 3:

Institutions are choosing between two weak options.

Description:

Banning AI ignores how students already work. Unmanaged AI use weakens trust, consistency, and learning.

Use a simple connected layout.

Do not frame students as dishonest.

## How MyTA Works

Heading:

Set the context. Guide the work. See the signals.

Step 1:

Set the course context

Description:

Connect approved slides, notes, examples, readings, learning objectives, and assignment rules.

Visual:

Course materials entering a controlled course knowledge layer.

Step 2:

Create the guided assignment

Description:

Define what students should accomplish and how AI may support them. MyTA uses the course context to provide questions, hints, explanations, and appropriate scaffolding.

Visual:

An instructor assignment editor with clear support settings.

Step 3:

See how learning unfolds

Description:

Students complete the work with course grounded support. Instructors see patterns in confusion, help seeking, revisions, and progress.

Visual:

An instructor dashboard showing a small set of meaningful learning signals.

The visual story must communicate:

Course context goes in.

Guided student work happens.

Learning signals come out.

## Product Storytelling

Heading:

See the learning process, not just the submission.

Use three product states:

1. Instructor setup
2. Student assignment
3. Instructor insights

State 1 caption:

Bring course context into the assignment.

Show:

- Approved materials
- Learning objectives
- Assignment expectations
- AI support settings

State 2 caption:

Guide students without replacing the thinking.

Show:

- Assignment content
- Student response area
- AI support panel
- Questions or hints
- Course references
- A check for understanding

State 3 caption:

See confusion, help seeking, and progress.

Show:

- Recurring confusion
- Help requests
- Revisions
- Engagement
- Concepts needing attention

Desktop:

Use a large realistic browser or computer screen.

A sticky or scroll linked story is allowed only when it remains simple, fast, accessible, and clear.

Mobile:

Use three stacked product screen cards.

Do not use difficult sticky interactions on mobile.

## Product Visual Requirements

Use existing real screenshots first:

- `assets/screenshots/myta-assignment-ai-tutor.png`
- `assets/screenshots/myta-ai-tutor.png`
- `assets/screenshots/myta-ai-tutor-crop.png`
- `assets/screenshots/myta-dashboard.png`
- `assets/screenshots/myta-dashboard-crop.png`
- `assets/screenshots/myta-login.png`

When a screenshot does not show the necessary state, build a polished product interface using semantic HTML, CSS, and simple SVG.

Do not make low fidelity wireframes.

Structure placeholders so real screenshots can replace them later without rebuilding the section.

Do not use the scheduler prank image publicly.

## Outcomes

Heading:

A better learning process for everyone involved.

Audience 1:

For instructors

Headline:

Know where support is needed before grading begins.

Outcomes:

- See recurring confusion
- Understand how students used support
- Improve assignments over time
- Focus teaching on the right concepts

Audience 2:

For students

Headline:

Get help that supports the thinking instead of replacing it.

Outcomes:

- Course specific explanations
- Clearer AI expectations
- Help at the moment of confusion
- More useful feedback and reflection

Audience 3:

For institutions

Headline:

Create a consistent way to use AI in assessed work.

Outcomes:

- Instructor control
- Shared policy implementation
- Course level boundaries
- More useful learning data

Do not claim measured or independently verified learning gains.

## LMS Workflow

Heading:

Works with the systems you already use.

Supporting copy:

Students should not need another disconnected course experience. MyTA is designed to fit inside the LMS workflow instructors and students already know.

Required status wording:

Designed for LMS integration through LTI.

Current integrations are in development.

Show the intended experience:

1. Students open MyTA from the course.
2. Instructors bring in course context.
3. Instructors publish guided assignments.
4. Approved grades can return to the LMS when integration is available.

Do not claim automatic sign in, roster sync, grade passback, assignment creation, or certified LMS integration unless current verified product documentation proves the claim.

Do not display certified Canvas, Brightspace, Blackboard, or Moodle badges.

## Trust And Data Boundaries

Heading:

Your course. Your rules. Your data.

Principle 1:

Course bound context

Description:

The AI responds from the materials, objectives, and instructions approved for that course.

Principle 2:

Role based access

Description:

Students, instructors, and administrators see only what their role requires.

Principle 3:

Purpose limited data

Description:

Course and student data should be used only to provide the authorized educational experience.

Principle 4:

Institution ready controls

Description:

Permissions, retention, exports, deletion, and audit visibility are designed for institutional requirements.

Supporting statement:

Designed to support FERPA aligned institutional deployments.

Status note:

Security and privacy documentation is available during pilot review.

Do not claim:

- FERPA compliant
- SOC 2 compliant
- SOC 2 certified
- Locally trained AI
- Zero data retention
- Zero risk
- Public model training exclusions

unless verified documentation exists in the repository.

Do not show unearned compliance badges.

## Why MyTA Is Different

Heading:

AI was added to existing homework platforms. MyTA is designed around the AI assisted learning process.

Use four comparison categories:

1. AI detection tools
2. Traditional assessment platforms with AI
3. Generic AI tutors
4. MyTA

Comparison row 1:

When intervention happens

AI detection tools:

After submission

Traditional assessment platforms with AI:

During work inside supported platform content

Generic AI tutors:

Whenever a student opens the tool

MyTA:

Inside the instructor defined assignment process

Comparison row 2:

Course context

AI detection tools:

Limited

Traditional assessment platforms with AI:

Platform or publisher content

Generic AI tutors:

Whatever the student provides

MyTA:

Instructor approved course materials and assignment rules

Comparison row 3:

Instructor control

AI detection tools:

Policy and review controls

Traditional assessment platforms with AI:

Platform level configuration

Generic AI tutors:

Little or no course level control

MyTA:

Course, assignment, and support boundaries

Comparison row 4:

Learning process visibility

AI detection tools:

Risk signals

Traditional assessment platforms with AI:

Scores and platform activity

Generic AI tutors:

Usually outside the course workflow

MyTA:

Help seeking, confusion, revisions, and guided interactions

Comparison row 5:

Content flexibility

AI detection tools:

Not designed for instruction

Traditional assessment platforms with AI:

Strongest inside proprietary ecosystems

Generic AI tutors:

Broad but instructor uncontrolled

MyTA:

Designed for instructor created materials and existing courses

Do not name individual competitors on the initial public website.

Do not claim competitors lack guided AI, personalization, analytics, or course alignment.

Mobile must not use an unusable horizontally scrolling table.

Use stacked or MyTA centered comparison layouts on mobile.

## Research Backed Learning

Heading:

Designed around how learning actually works.

Supporting copy:

MyTA uses established learning principles to guide support, prompt reflection, and surface useful information before the final submission.

Principle 1:

Guided self explanation

Description:

Ask students to explain their reasoning, compare approaches, and reflect on revisions.

MyTA application:

Students justify steps and identify what they do not understand.

Principle 2:

Retrieval practice

Description:

Prompt students to recall concepts before immediately revealing an explanation.

MyTA application:

Short recall prompts and comprehension checks can appear before hints.

Principle 3:

Adaptive scaffolding

Description:

Provide structured support early and reduce that support as understanding develops.

MyTA application:

Use progressive hints, partial examples, and fading assistance.

Principle 4:

Formative assessment

Description:

Use information about student understanding to adjust teaching before the final assessment.

MyTA application:

Turn confusion signals, reflections, revisions, and help seeking into instructor summaries.

Supporting label:

Informed by self explanation research, retrieval practice, worked example research, formative assessment, and the ICAP framework.

Use:

Designed around research backed learning principles.

Do not say:

Scientifically proven to improve learning.

## Why This Matters Now

Heading:

AI use is already normal. The learning workflow is what has to change.

Use exactly three main statistics.

Statistic 1:

94%

Description:

of surveyed undergraduates reported using generative AI to help with assessed work.

Source label:

HEPI and Kortext Student Generative AI Survey, 2026

Statistic 2:

90%

Description:

of surveyed college faculty said generative AI would diminish students' critical thinking skills.

Source label:

Elon University and AAC&U Faculty Survey

Statistic 3:

79%

Description:

said the typical teaching model in their department would be affected by generative AI.

Source label:

Elon University and AAC&U Faculty Survey

Do not use the old homepage statistics.

Do not present these numbers as MyTA outcomes.

Keep the source labels visible.

Do not create external links until exact verified source URLs are available.

## Get Started

Heading:

Start with one assignment.

Supporting copy:

Bring us one course, one assignment, and one question you want better insight into. We will help configure a focused pilot with minimal instructor setup.

Step 1:

Choose the assignment.

Step 2:

Set the course context and support rules.

Step 3:

Review what students and instructors learned.

Primary action:

Request a Pilot

Destination:

`/educators/#pilot`

Secondary action:

Contact Us

Exact destination:

`mailto:contact@mytaeducation.com`

The finished homepage should not contain the full pilot form.

## FAQ

Use exactly these seven questions and answers.

Question 1:

Is MyTA an LMS replacement?

Answer:

No. MyTA is designed as an AI native assessment layer that works alongside systems such as Canvas and Brightspace rather than replacing the LMS.

Question 2:

Does MyTA give students the answers?

Answer:

MyTA is designed to guide reasoning with questions, hints, course references, and checks for understanding rather than simply completing the work.

Question 3:

What course materials can instructors provide?

Answer:

Instructors can provide approved slides, notes, examples, readings, learning objectives, assignment directions, and other course specific resources.

Question 4:

What can instructors see about student work?

Answer:

MyTA is designed to show patterns in confusion, help seeking, revisions, engagement, and progress. The exact information available should follow the course and institution's approved settings.

Question 5:

How does MyTA work with Canvas or Brightspace?

Answer:

MyTA is designed for LMS integration through LTI. Current integrations are in development, and pilot workflows may begin with a focused standalone experience.

Question 6:

How is student and course data handled?

Answer:

MyTA is designed around course level boundaries, role based access, and purpose limited data use. Detailed security and privacy documentation is reviewed during institutional pilots.

Question 7:

What does a pilot require?

Answer:

A pilot can begin with one course, one assignment, a small student group, and one learning question the instructor wants to understand better.

FAQ requirements:

1. Accessible accordion
2. Real button controls
3. Keyboard accessible
4. `aria-expanded`
5. `aria-controls`
6. Visible focus states
7. Content should remain available without JavaScript when practical

## Footer

MyTA description:

The assessment layer for seeing and shaping how students learn with AI.

Visible email:

[contact@mytaeducation.com](mailto:contact@mytaeducation.com)

Exact email href:

`mailto:contact@mytaeducation.com`

Product links:

- How It Works
- Demo
- Educators
- Students

Company:

- Contact
- Privacy policy coming soon
- Accessibility statement coming soon

Do not create fake privacy or accessibility routes.

Coming soon items should be non-link text unless approved pages exist.

Bottom row:

© 2026 MyTA

Built for learning, not shortcuts.

## Educators Page

Route:

`/educators/`

Hero headline:

See what students need before grading begins.

Supporting copy:

MyTA gives instructors a course grounded way to guide AI use during assignments and gives institutions a clearer, more consistent learning workflow.

Primary action:

Request a Pilot

Destination:

`#pilot`

Secondary action:

Watch the Demo

Destination:

`/demo/`

Instructor section heading:

Designed around the instructor workflow.

Instructor feature 1:

Bring your course context

Copy:

Use approved slides, notes, examples, readings, objectives, and assignment instructions to shape student support.

Instructor feature 2:

Define the support boundaries

Copy:

Set what students should accomplish, when guidance is appropriate, and how the AI should respond.

Instructor feature 3:

See where students need help

Copy:

Review patterns in confusion, help seeking, revisions, and progress before grading begins.

Instructor feature 4:

Improve the next assignment

Copy:

Use learning signals to identify unclear prompts, missing context, and concepts that need more teaching attention.

Instructor value summary:

- Less guesswork
- More useful assignment insight
- Clearer AI expectations
- Minimal setup
- Course level control

Institution section heading:

A consistent approach to AI assisted assessment.

Institution area 1:

LMS and LTI architecture

Copy:

MyTA is designed to launch from the LMS and support identity, roles, course context, assignments, and grade workflows as integrations develop.

Institution area 2:

Role management

Copy:

Separate student, instructor, and administrative permissions around course responsibilities.

Institution area 3:

Data boundaries

Copy:

Keep course materials and learning activity within clear course and institutional boundaries.

Institution area 4:

Pilot measurement

Copy:

Evaluate instructor value, student experience, learning signals, implementation effort, and readiness for broader adoption.

Institution area 5:

Procurement readiness

Copy:

Provide security, privacy, accessibility, data flow, and implementation documentation as the product reaches each review milestone.

Do not claim completed certifications.

Implementation section heading:

Start focused. Learn quickly. Expand carefully.

Steps:

1. Select one course and assignment.
2. Define course context and pilot goals.
3. Run a focused student experience.
4. Review instructor and student feedback.
5. Decide what to improve or expand.

Pilot section anchor:

`#pilot`

Pilot heading:

Tell us about your course.

Supporting copy:

A focused pilot can begin with one course, one assignment, and a clear question about student learning.

Move the existing working homepage pilot form to this section.

Do not permanently duplicate it.

Migration order:

1. Recreate the existing form at `/educators/#pilot`.
2. Preserve every integration detail.
3. Test the Educators form.
4. Only after it works, remove the homepage form.
5. Replace the homepage form with the approved Get Started CTA.

Preserve the existing pilot form:

Endpoint:

`https://formspree.io/f/xwvydkla`

Form name:

`pilot_waitlist`

Preserve:

- method
- field names
- hidden fields
- honeypot
- success redirect
- validation hooks
- analytics attributes
- success handling
- submission behavior

Existing important field names:

- `name`
- `email`
- `university_or_organization`
- `role`
- `course_name_or_number`
- `approximate_class_size`
- `when_interested_in_piloting`
- `academic_integrity_issue`
- `optional_notes`
- `pilot_contact_agreement`
- `_gotcha`

Current success redirect:

`/#pilot-submitted`

Update the success destination only if required after moving the form, and document the reason.

Contact should be visible in the pilot area:

[contact@mytaeducation.com](mailto:contact@mytaeducation.com)

Exact href:

`mailto:contact@mytaeducation.com`

## Students Page

Route:

`/students/`

Hero headline:

Get help without giving up the learning.

Supporting copy:

MyTA provides course grounded guidance inside the assignment so students can move forward, understand the material, and use AI within clear expectations.

Primary action:

Watch the Demo

Destination:

`/demo/`

Secondary action:

Contact Us

Destination:

`mailto:contact@mytaeducation.com`

Student value 1:

Help that knows the course.

Copy:

MyTA uses the instructor approved materials, objectives, examples, and assignment directions for that course.

Student value 2:

Guidance, not answer delivery.

Copy:

The support is designed to ask questions, provide hints, explain concepts, and help students reflect instead of simply completing the work.

Student value 3:

Support at the moment of confusion.

Copy:

Students can ask for help while they are working rather than waiting until after the assignment is submitted.

Student value 4:

Clear AI expectations.

Copy:

The assignment experience shows how AI may be used and keeps that support connected to the instructor's learning goals.

Student value 5:

A transparent learning process.

Copy:

Students should understand what information is shared with instructors and why it is useful for teaching and support.

Student visual must show:

1. Assignment question
2. Student work
3. AI support panel
4. Course content reference
5. Reflection or check for understanding
6. Clear approved support boundaries

Do not use punitive language.

Do not use:

- Surveillance
- Tracking
- Forced AI
- Lockdown
- Cheating prevention
- Catching students

## Demo Page

Route:

`/demo/`

Hero headline:

Watch the learning process unfold.

Supporting copy:

Follow one assignment from instructor setup through student support and instructor insight.

Preserve exact video URL:

`https://s2qflve5hgjt1ibb.public.blob.vercel-storage.com/MyTA%20Demo.mp4`

Preserve:

- native controls
- `playsinline`
- `preload="metadata"`
- no autoplay
- no default mute
- fallback text
- responsive sizing

Display three chapter descriptions:

1. Instructor setup and course context
2. Student assignment and guided support
3. Instructor visibility and learning signals

Do not invent timestamps.

Do not activate seeking until exact timestamps are verified.

Until timestamps are verified:

1. Do not show fake times.
2. Do not imply seeking works.
3. Keep the layout ready for later activation.

What to watch for:

1. How instructor context shapes the support
2. How the AI guides without simply supplying the answer
3. How student activity becomes useful instructor insight

Preserve the existing demo feedback form.

Endpoint:

`https://formspree.io/f/mojroqew`

Form name:

`demo_feedback`

Preserve:

- method
- field names
- hidden fields
- honeypot
- success redirect
- validation
- analytics attributes
- success handling
- submission behavior

## Visual System

Use DM Sans only on public pages.

Approved colors only:

- `#2563eb`
- `#16a085`
- `#38bdf8`
- `#172033`
- `#fafaf7`
- `#eaf2ff`
- `#ffffff`

Opacity variations derived from these colors are allowed.

Do not introduce another font.

Do not introduce unrelated colors.

The design should feel:

- AI forward
- Warm
- Clear
- Product led
- Modern
- Trustworthy
- Simple
- Built for higher education

Recurring visual motif:

Course materials to assignment to student interaction to instructor insight.

Use one main idea and one dominant visual per section.

Prefer realistic product interfaces.

Use controlled whitespace.

Use small radii.

Use subtle borders.

Use minimal shadows.

Keep section heights content driven.

Avoid fixed heights.

Avoid giant empty spaces.

Respect `prefers-reduced-motion`.

## Technical Rules

1. Static HTML, CSS, and JavaScript only.
2. No framework.
3. No unnecessary dependency.
4. Preserve `assets/js/site.js` behavior.
5. Any marketing JavaScript must be isolated.
6. Use `data-marketing-*` attributes for new public interactions.
7. Do not interfere with form logic.
8. Preserve analytics attributes.
9. Preserve all Formspree integrations.
10. Preserve the real demo video.
11. Preserve hidden pages.
12. Preserve scheduler Supabase behavior.
13. Do not expose hidden routes.
14. Use semantic HTML.
15. Keep controls keyboard accessible.
16. Keep load performance reasonable.
17. Do not use em dashes in visible copy.

## Hidden Routes

Keep completely isolated during the public redesign:

- `/stem-instructor-feedback/`
- `/anti-dilution-scheduling/`

Do not edit their HTML, CSS, or JavaScript.

Do not link them publicly.

Do not apply public marketing styles to them.

Existing hidden survey endpoint:

`https://formspree.io/f/xeedlaal`

Existing hidden survey draft key:

`myta_stem_instructor_feedback_draft_v3`

Existing scheduler table:

`meeting_availability`

Existing scheduler upsert conflict:

`week_start,participant_name`

Do not copy a Supabase key into this documentation. The existing Supabase configuration and behavior must remain unchanged.

## Implementation Task Sequence

Task 0:

Create persistent specification

Task 1:

Shared public foundation, navigation, footer, and page shells

Task 2:

Homepage hero, challenge, How MyTA Works, and product storytelling

Task 3:

Homepage outcomes, LMS, trust, comparison, research, evidence, Get Started, and FAQ

Task 4:

Educators page and migration of the working pilot form

Task 5:

Students page

Task 6:

Demo page

Task 7:

Final regression, accessibility, responsive, claim, and integration review

Each task must stop and report before the next begins.

Do not combine tasks.

## Traceability Matrix

| Requirement | Page | Section | Intended file | Implementation task | Acceptance check |
|---|---|---|---|---|---|
| Static HTML, CSS, and JavaScript architecture | All | Architecture | Public HTML, `styles.css`, optional public JS | Task 1 | No framework or dependency added |
| Public route `/` | Homepage | Full page | `index.html` | Task 1 | Homepage loads at `/` |
| Public route `/educators/` | Educators | Full page | `educators/index.html` | Task 1, Task 4 | Educators page loads at `/educators/` |
| Public route `/students/` | Students | Full page | `students/index.html` | Task 1, Task 5 | Students page loads at `/students/` |
| Public route `/demo/` | Demo | Full page | `demo/index.html` | Task 6 | Demo page loads at `/demo/` |
| Hidden survey remains hidden | Hidden survey | Route isolation | `stem-instructor-feedback/` unchanged | Task 7 | No public links to `/stem-instructor-feedback/` |
| Hidden scheduler remains hidden | Hidden scheduler | Route isolation | `anti-dilution-scheduling/` unchanged | Task 7 | No public links to `/anti-dilution-scheduling/` |
| Public nav: Home, Educators, Students, Demo, Contact, Request a Pilot | All public | Header | Public HTML files | Task 1 | All links visible and point to approved destinations |
| Contact uses exact mailto | All public | Header, footer, CTAs | Public HTML files | Task 1 | Link href is `mailto:contact@mytaeducation.com` |
| Request a Pilot goes to `/educators/#pilot` | All public | Header, CTAs | Public HTML files | Task 1 | CTA destination is `/educators/#pilot` |
| Homepage order is canonical | Homepage | All sections | `index.html` | Task 2, Task 3 | Section sequence matches specification |
| Homepage hero copy | Homepage | Hero | `index.html` | Task 2 | Eyebrow, headline, copy, and CTAs match exact text |
| Hero product loop visual | Homepage | Hero visual | `index.html`, `styles.css`, optional graphics | Task 2 | Visual shows instructor context, guided student work, instructor signals |
| Challenge copy and pain points | Homepage | The challenge | `index.html` | Task 2 | Heading, intro, and all three pain points match |
| How MyTA works steps | Homepage | How MyTA works | `index.html` | Task 2 | Three steps and visual story are present |
| Product storytelling states | Homepage | Product storytelling | `index.html`, `styles.css`, optional `assets/js/marketing.js` | Task 2 | Three product states present and mobile stacks them |
| Product visual asset priority | Homepage, Educators, Students | Product visuals | Public HTML, `styles.css`, `assets/screenshots/` | Task 2, Task 4, Task 5 | Existing screenshots used first when relevant |
| No scheduler prank image publicly | All public | Assets | Public HTML and CSS | Task 7 | Public files do not reference `kissin-dude-prank.jpg` |
| Outcomes by audience | Homepage | Outcomes | `index.html` | Task 3 | Instructors, students, institutions outcomes match |
| No measured learning gain claim | Homepage | Outcomes | `index.html` | Task 3, Task 7 | No independent learning gain claim appears |
| LMS workflow copy and status | Homepage | LMS workflow | `index.html` | Task 3 | Required LTI and integration in development language appears |
| No certified LMS badges | Homepage | LMS workflow | `index.html` | Task 3, Task 7 | No certified LMS badge appears |
| Trust principles | Homepage | Trust and data boundaries | `index.html` | Task 3 | Four trust principles, supporting statement, and status note appear |
| Claim restrictions | All public | Claim safety | Public HTML | Task 7 | Restricted claims are absent unless verified |
| Category comparison | Homepage | Why MyTA is different | `index.html` | Task 3 | Four categories and five comparison rows appear |
| Mobile comparison usability | Homepage | Why MyTA is different | `styles.css` | Task 3 | Mobile uses stacked or usable layout, not unusable table |
| Research backed learning principles | Homepage | Research backed learning | `index.html` | Task 3 | Four principles and applications appear |
| Prohibited science claim absent | Homepage | Research backed learning | `index.html` | Task 3, Task 7 | Does not say scientifically proven to improve learning |
| Three evidence statistics | Homepage | Why this matters now | `index.html` | Task 3 | 94%, 90%, and 79% stats and source labels appear |
| No fake external source links | Homepage | Why this matters now | `index.html` | Task 3 | No source links unless exact URLs are verified |
| Get Started CTA | Homepage | Get started | `index.html` | Task 3 | Heading, copy, three steps, and two CTAs match |
| Homepage full pilot form removed | Homepage | Get started | `index.html` | Task 4 | Homepage has CTA only, not the full pilot form |
| FAQ exact questions and answers | Homepage | FAQ | `index.html` | Task 3 | All seven exact FAQs appear |
| FAQ accessibility | Homepage | FAQ | `index.html`, optional `assets/js/marketing.js` | Task 3 | Buttons have `aria-expanded`, `aria-controls`, keyboard support |
| Footer exact description and groups | All public | Footer | Public HTML files | Task 1, Task 3 | Footer description, email, product links, company items, bottom row appear |
| Coming soon items are non-links | All public | Footer | Public HTML files | Task 1 | Privacy and accessibility coming soon are not fake routes |
| Educators hero | Educators | Hero | `educators/index.html` | Task 4 | Headline, copy, and CTAs match |
| Educators instructor pathway | Educators | Instructor workflow | `educators/index.html` | Task 4 | Four instructor features and value summary appear |
| Educators institution pathway | Educators | Institution workflow | `educators/index.html` | Task 4 | Five institution areas appear with status-aware copy |
| Educators implementation flow | Educators | Implementation flow | `educators/index.html` | Task 4 | Five implementation steps appear |
| Educators pilot anchor | Educators | Pilot form | `educators/index.html` | Task 4 | `#pilot` anchor exists |
| Pilot form migration sequence | Educators, Homepage | Pilot form | `educators/index.html`, `index.html` | Task 4 | Form works on Educators before homepage form is removed |
| Pilot Formspree endpoint preserved | Educators | Pilot form | `educators/index.html` | Task 4 | Endpoint remains `https://formspree.io/f/xwvydkla` |
| Pilot form field names preserved | Educators | Pilot form | `educators/index.html` | Task 4 | Existing field names remain |
| Pilot form analytics preserved | Educators | Pilot form | `educators/index.html`, `assets/js/site.js` unchanged | Task 4 | `data-form-name` and `data-analytics-start` remain |
| Students hero | Students | Hero | `students/index.html` | Task 5 | Headline, copy, and CTAs match |
| Student value sections | Students | Value sections | `students/index.html` | Task 5 | Five student value sections appear |
| Student visual requirements | Students | Student visual | `students/index.html`, `styles.css` | Task 5 | Visual shows assignment, work, support panel, reference, reflection, boundaries |
| Student punitive language prohibited | Students | Full page | `students/index.html` | Task 5, Task 7 | Prohibited terms are absent |
| Demo hero copy | Demo | Hero | `demo/index.html` | Task 6 | Headline and supporting copy match |
| Demo video URL preserved | Demo | Video | `demo/index.html` | Task 6 | MP4 URL unchanged |
| Demo native video behavior preserved | Demo | Video | `demo/index.html` | Task 6 | Controls, playsinline, metadata preload, fallback text remain |
| Demo chapter descriptions | Demo | Chapters | `demo/index.html` | Task 6 | Three descriptions appear without fake timestamps |
| Demo feedback form preserved | Demo | Feedback form | `demo/index.html` | Task 6 | Endpoint, names, hidden fields, honeypot, validation, success handling remain |
| Demo feedback endpoint preserved | Demo | Feedback form | `demo/index.html` | Task 6 | Endpoint remains `https://formspree.io/f/mojroqew` |
| DM Sans only | All public | Visual system | `styles.css` | Task 1 | Public computed font is DM Sans |
| Approved colors only | All public | Visual system | `styles.css` | Task 1, Task 7 | Source scan finds only approved colors or approved opacity variants |
| Content driven layout | All public | Layout | `styles.css` | Task 1 through Task 7 | No fixed-height empty sections |
| Reduced motion | All public | Interactions | `styles.css`, optional `assets/js/marketing.js` | Task 6 | `prefers-reduced-motion` respected |
| Marketing JS isolation | All public | Interactions | optional `assets/js/marketing.js` | Task 6 | Uses `data-marketing-*`, does not alter form logic |
| Analytics preservation | All public | Analytics | Public HTML, `assets/js/site.js` unchanged | Task 1 through Task 7 | Existing analytics hooks remain functional |
| Shared public form logic preserved | Public forms | Forms | `assets/js/site.js` unchanged | Task 4, Task 6 | Blank required forms still show validation |
| Hidden survey endpoint preserved | Hidden survey | Form | `stem-instructor-feedback/` unchanged | Task 7 | Endpoint remains unchanged |
| Hidden survey draft key preserved | Hidden survey | Persistence | `stem-instructor-feedback/survey.js` unchanged | Task 7 | Draft key remains `myta_stem_instructor_feedback_draft_v3` |
| Hidden scheduler table preserved | Hidden scheduler | Supabase | `anti-dilution-scheduling/scheduling.js` unchanged | Task 7 | Table remains `meeting_availability` |
| Hidden scheduler upsert conflict preserved | Hidden scheduler | Supabase | `anti-dilution-scheduling/scheduling.js` unchanged | Task 7 | Conflict remains `week_start,participant_name` |
| Supabase configuration preservation | Hidden scheduler | Supabase | `anti-dilution-scheduling/scheduling.js` unchanged | Task 7 | Existing configuration and behavior untouched |
| No Supabase key copied into docs | Documentation | Security | `AGENTS.md`, `WEBSITE_REDESIGN_SPEC.md` | Task 0 | Docs describe preservation without key value |
| Responsive requirements | All public | Layout | Public HTML, `styles.css` | Task 7 | Tested at 1440, 1280, 1024, 768, 390, 360 |
| Accessibility requirements | All public | Structure and interaction | Public HTML, `styles.css`, optional `assets/js/marketing.js` | Task 7 | Semantic headings, labels, buttons, focus states, ARIA verified |
| No em dashes in visible copy | All public | Copy | Public HTML | Task 7 | Source scan confirms no em dashes in visible copy |
| Each task stops before the next | Process | Implementation sequence | Planning and reports | Task 0 through Task 7 | Each task reports completion before next starts |
