# MyTA Static Website

This repository contains the static marketing website for MyTA.

## Files

- `index.html`: Homepage for professors, instructors, academic technology teams, and university stakeholders.
- `demo/index.html`: Dedicated demo page available at `/demo/`.
- `styles.css`: Shared styling, layout, logo treatment, responsive rules, and product visual styles.
- `assets/js/site.js`: Shared form handling and lightweight analytics event tracking.
- `assets/screenshots/myta-assignment-ai-tutor.png`: Real MyTA assignment screen used as the homepage hero visual.
- `assets/screenshots/myta-ai-tutor.png`: Real MyTA AI Tutor product screenshot available for future site use.
- `assets/screenshots/myta-ai-tutor-crop.png`: Cropped version of the real MyTA AI Tutor screenshot available for future site use.
- `assets/screenshots/myta-login.png`: Real MyTA login product screenshot available for future site use.
- `assets/screenshots/myta-dashboard.png`: Original real MyTA product dashboard screenshot.
- `assets/screenshots/myta-dashboard-crop.png`: Cropped version of the same real screenshot used as a secondary homepage visual.
- `README.md`: Maintenance notes for the site.

## Replace The Demo Video

Open `demo/index.html` and find the iframe inside the demo video section.

Replace:

```html
src="about:blank"
```

with the final embed URL from YouTube, Vimeo, Loom, or another trusted video host.

After adding the real video, remove the `video-placeholder` block if you do not want placeholder text over the video.

## Edit Text And Contact Information

- Homepage copy lives in `index.html`.
- Demo page copy lives in `demo/index.html`.
- Shared colors, spacing, buttons, logo, and responsive styles live in `styles.css`.
- The email appears as `mytaeducation@gmail.com`.
- The phone number appears as `(812) 705 1008`.

Use search in your editor to update repeated contact details.

## Forms

The homepage pilot waitlist form and demo page feedback form are wired for Formspree, but the placeholder endpoints must be replaced before launch.

Replace these values:

- `https://formspree.io/f/xwvydkla` in `index.html`
- `https://formspree.io/f/mojroqew` in `demo/index.html`

Recommended setup:

1. Create two Formspree forms, one for pilot waitlist signups and one for demo feedback.
2. Set email notifications for both forms to `mytaeducation@gmail.com`.
3. Use the Formspree dashboard as the stored response archive, or connect Formspree to Google Sheets if a sheet workflow is preferred.
4. Replace the placeholder endpoints with the live form URLs.
5. Submit one test response to each form from the deployed site and confirm the response appears in Formspree and an email arrives at `mytaeducation@gmail.com`.

Until the live endpoints are added, the forms show an error state instead of sending data.

## Analytics

The site includes Vercel Web Analytics using the static HTML script loader and tracks:

- Demo page views
- Demo page scroll depth
- Feedback form starts
- Feedback form submissions
- Pilot waitlist form starts
- Pilot waitlist form submissions
- Major CTA clicks

Analytics are visible in the Vercel project dashboard under Analytics after Web Analytics is enabled and the site is deployed. Custom events may require a Vercel plan that supports Web Analytics custom events.

## Fonts

The site uses Poppins from Google Fonts and keeps an Open Sauce style fallback for headings:

```css
"Open Sauce One", "Open Sauce Sans", "Poppins", system-ui, sans-serif
```

If exact Open Sauce One font files are added later, place them in an `assets/fonts` folder and add `@font-face` rules near the top of `styles.css`.

## Preview Locally

From this folder, run:


```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy On Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Keep the framework preset as static or other.
4. Leave the build command empty.
5. Leave the output directory empty.

Vercel will serve `index.html` as the homepage and `demo/index.html` at `/demo/`.
