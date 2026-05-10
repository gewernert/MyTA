# MyTA Static Website

This repository contains the static marketing website for MyTA.

## Files

- `index.html`: Homepage for professors, instructors, academic technology teams, and university stakeholders.
- `demo/index.html`: Dedicated demo page available at `/demo/`.
- `styles.css`: Shared styling, layout, logo treatment, responsive rules, and product visual styles.
- `assets/screenshots/myta-dashboard.png`: Original real MyTA product dashboard screenshot.
- `assets/screenshots/myta-dashboard-crop.png`: Cropped version of the same real screenshot used on the homepage.
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
