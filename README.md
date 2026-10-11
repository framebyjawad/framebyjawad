# FRAME Photography Portfolio — Beginner Guide

This is a responsive, one-page photography portfolio. It includes a mobile menu, animated section reveals, photo categories, a photo lightbox, and a simple built-in editor.

## Files
- `index.html` — the website's text, sections, image URLs, links and layout structure.
- `style.css` — colors, fonts, spacing, responsive/mobile styling and animations.
- `script.js` — menu, filters, lightbox and built-in editor behaviour.

## 1. Preview on your laptop
1. Extract the ZIP file.
2. Open the `photography_portfolio` folder.
3. Double-click `index.html` to preview it in Chrome or Edge.
4. Internet is needed for the demo photos and Google Fonts because the sample images are loaded from Unsplash.

You can also open the folder in VS Code and use the Live Server extension, if installed.

## 2. Use the built-in editor
1. Open the site in your browser.
2. Click **Edit website** at the bottom.
3. Click text with the dashed outline and type to change it.
4. Click a photo to select a replacement image from your device.
5. Click **Save changes**. Text and chosen images are stored in this browser on this device.

**Important limitation:** the built-in editor saves in your current browser only. It does not upload changes to your live website. To make edits public for all visitors, use the file-editing workflow below and publish the updated files again. Very large images may fill browser storage; for the live site, use image files in the website folder.

## 3. Change the website name and text permanently
1. Open `index.html` in VS Code.
2. Press `Ctrl + F` and search for the current text, e.g. `FRAME`, `your name`, or `hello@example.com`.
3. Replace it with your own name, bio, email, Instagram URL, and photo captions.
4. Save with `Ctrl + S`.
5. Refresh the browser to see the changes.

Change the page title near the top of `index.html`, too:
`<title>FRAME — Photography Portfolio</title>`

## 4. Add your own photos (recommended)
1. Create a folder named `images` inside this project folder.
2. Copy your photos into it, using simple filenames such as `portrait-01.jpg`.
3. In `index.html`, find an image tag such as:
   `<img src="https://images.unsplash.com/..."`
4. Change its `src` to a relative path, e.g.:
   `<img src="images/portrait-01.jpg" alt="Portrait in natural light">`
5. Add a clear `alt` description for accessibility.
6. Keep image filenames simple (lowercase, no spaces). Resize/compress very large photos before publishing for faster loading.

## 5. Publish for free using GitHub Pages
You need a free GitHub account. The steps are normally:
1. Sign in to GitHub and create a **public** repository, for example `my-photo-portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, and your `images` folder (if using one) into the repository's top/root level.
3. Open repository **Settings → Pages**.
4. Under the build/deployment section, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then save.
6. Wait for GitHub Pages to publish. It will show the public website URL in the Pages settings, usually `https://YOUR-USERNAME.github.io/my-photo-portfolio/`.

GitHub's labels may change slightly. If you use a custom domain later, it usually costs money; the GitHub Pages hosting itself is free for a public repository.

## 6. Publish updates
After editing files locally:
1. Save them.
2. Upload/replace the changed files in your GitHub repository (or commit and push using Git).
3. Wait a minute or two and refresh your public website.

## Notes
- This is a static website; it does not have an online admin account or server-side database.
- The built-in editor is deliberately simple and local to your browser. For a true online admin panel where edits instantly appear for everyone, a CMS or website platform is needed.
- The sample photographs are remote demo images. Replace them with your own photos before using the portfolio professionally.
