# Route inventory

Statuses describe the authenticated preview observed on July 26, 2026. “Fully working” means the relevant rendered state loaded and its primary evidence was usable during inspection. No product data was created or edited.

| Route or navigation path | Role | What the screen proves | Status | Screenshot |
|---|---|---|---|---|
| `/teacher` | Teacher | Teacher home with classes, grading queue, upcoming assignments, weekly briefing, calendar, and MyTA topic area | Fully working | `04-instructor-signals-1440x1000.png`, `05-instructor-action-1440x1000.png` |
| `/teacher/course-knowledge` | Teacher | Course-scoped uploaded materials, material types, and an upload surface for approved course references | Fully working | `01-instructor-control-1440x1000.png` |
| `/assignments` | Teacher | Assignment library with class filters, submission counts, and create-assignment entry point | Fully working as a library; create action did not open during inspection | None |
| `/classes` | Teacher | Teacher class navigation is present | Present; not needed for a stronger evidence target | None |
| `/student` | Student | Dashboard with active assignment, classes, upcoming work, calendar, recommended study, and insight areas | Fully working | `06-student-dashboard-1440x1000.png` |
| `/assignments` | Student | Searchable, course-filtered assignment library with titles, status, topics, and dates | Fully working | `08-assignments-library-1440x1000.png` |
| `/student/assignment/0d3a0002-0000-4000-8000-000000000016` | Student | Problem Set 5 assignment detail and entry into the assignment workspace | Fully working | Supporting navigation only |
| Assignment workspace opened from the route above | Student | Real problem, progression, MyTA support pane, Hint, Explain concept, Check reasoning, and review/turn-in action | Fully working on desktop; responsive single-pane mode on mobile | `02-student-assignment-1440x1000.png`, `03-guided-support-1440x1000.png`, `mobile-student-assignment-390x844.png`, `mobile-guided-support-390x844.png` |
| `/student/study` | Student | Study sessions, resource formats, creation entry points, filters, and a populated study library | Fully working | `07-study-workspace-1440x1000.png` |
| `/classes` | Student | Class navigation is present | Present; not captured | None |
| `/team-projects` | Student | Team Projects navigation is present | Present; not captured | None |
| `/calendar` | Student | Calendar navigation is present | Present; not captured | None |
| `/student/grades` | Student | Grades navigation is present | Present; not captured | None |
| `/student/notebook` | Student | Notebook navigation is present | Present; not captured | None |
| `/whiteboard` | Student | Whiteboard navigation is present | Present; not captured | None |
| `/student/tutor` | Student | AI Tutor navigation is present | Present; not captured | None |
| `/live-polls` | Student and teacher | Live Polls navigation is present for both roles | Present; not captured | None |

## Role and data observations

- Separate seeded student and teacher accounts were available and used only for inspection.
- The student assignment, dashboard, Study, and assignments-library states were populated.
- The teacher dashboard and course-material screens were populated.
- The teacher assignment cards showed submission progress, but card selection did not expose a verified assignment-detail analytics screen during this inspection.
- The create-assignment control was visible but did not open a setup flow through the available browser control, so assignment expectations, AI support rules, and checks for understanding remain unverified.

