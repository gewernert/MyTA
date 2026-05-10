# MyTA Static Website

This is the first version of a simple static website for MyTA. It is built with plain HTML and CSS so it can be deployed on Vercel with almost no setup.

## Files

- `index.html`: Homepage with hero, problem, solution, product, validation, team, final call to action, and footer.
- `demo/index.html`: Dedicated demo page at `/demo/`.
- `styles.css`: Shared brand styling for both pages.
- `README.md`: Maintenance notes for the site.

## Replace The Demo Video

Open `demo/index.html` and find the large video block.

Replace this value:

```html
src="about:blank"
```

with the final embed URL from the video host, for example a YouTube, Vimeo, or Loom embed URL.

After adding the real video, remove the `video-placeholder` block if you do not want the placeholder text sitting over the video.

## Edit Text And Contact Information

- Homepage text lives in `index.html`.
- Demo page text lives in `demo/index.html`.
- Shared colors, spacing, cards, buttons, and responsive styles live in `styles.css`.
- The email appears as `mytaeducation@gmail.com`.
- The phone number appears as `(812) 705 1008`.

Use search in your editor to find any copy you want to update.

## Fonts

The CSS uses this heading stack:

```css
"Open Sauce One", "Open Sauce Sans", "Poppins", system-ui, sans-serif
```

The supporting text uses Poppins from Google Fonts. If you later get the exact Open Sauce One font files, place them in an `assets/fonts` folder and add `@font-face` rules near the top of `styles.css`.

## Preview Locally

Because this is a static site, you can preview it with a tiny local server.

For a local server preview from this folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy On Vercel

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Keep the framework preset as static or other.
4. Leave the build command empty.
5. Leave the output directory empty.

Vercel will serve `index.html` as the homepage and `demo/index.html` at `/demo/`.
