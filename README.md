# Qwark website


Personal portfolio for Qwark (Abdul Moiz) — Android apps.
Deployed at **abdulmoizofficial0.github.io**.

## How the site works

Every project on the site is defined in one file: `projects.json`.
The homepage and the individual project pages both read from this file at runtime, so **you never have to edit HTML to add or update a project** — you only edit JSON.

```
├── index.html            ← Homepage (hero, featured, grid)
├── project.html          ← Universal project detail page (loads by ?id=)
├── projects.json         ← ★ All project data lives here
├── assets/
│   ├── css/styles.css
│   ├── js/main.js        ← Renders the homepage from projects.json
│   ├── js/project.js     ← Renders a single project page from projects.json
│   ├── icons/            ← One icon per project
│   └── screenshots/      ← Subfolder per project for phone screenshots
├── al-quran/             ← Existing subsite (kept as-is)
├── privacy-policy.html
├── app-ads.txt
└── README.md
```

---

## Adding phone screenshots later

1. Open the folder `assets/screenshots/<project-id>/` (e.g. `assets/screenshots/homegym/`).
2. Drop your phone screenshot PNGs / JPGs in there. Use whatever filenames you like — for example `1.png`, `2.png`, `3.png`.
3. Open `projects.json`, find your project, and add the filenames to the `"screenshots"` array:

```json
"screenshots": [
  "assets/screenshots/homegym/1.png",
  "assets/screenshots/homegym/2.png",
  "assets/screenshots/homegym/3.png"
]
```

4. Commit and push. Done. The project detail page will render them automatically.

**Tip:** Play Store phone screenshots are the perfect size — just drop those in.

---

## Adding a new project

1. Copy an app icon (512×512 PNG) into `assets/icons/` — e.g. `mynewapp.png`.
2. Open `projects.json` and add a new object to the `projects` array:

```json
{
  "id": "mynewapp",
  "featured": false,
  "name": "My New App",
  "subtitle": "Short subtitle",
  "tagline": "One-line pitch.",
  "shortDescription": "Sentence shown on the project card on the homepage.",
  "longDescription": "Longer paragraph shown on the project detail page.",
  "status": "live",
  "statusLabel": "Live on Google Play",
  "icon": "assets/icons/mynewapp.png",
  "playStoreUrl": "https://play.google.com/store/apps/details?id=...",
  "packageId": "com.example.mynewapp",
  "accentColor": "#e0b962",
  "backgroundTint": "#1a1230",
  "screenshots": [],
  "features": [
    "Highlight one",
    "Highlight two",
    "Highlight three",
    "Highlight four"
  ]
}
```

3. Commit + push. It shows up on the homepage grid and gets its own page at `project.html?id=mynewapp`. No HTML edits, no JS edits.

**Field guide:**
- `id` — url-safe slug, must be unique. This is the `?id=` in the project URL.
- `featured: true` — makes this the big featured card on the homepage. Only one project should be featured. If you want to promote a different one, set the old one to `false` and the new one to `true`.
- `accentColor` — hex color used for tags and highlights on that project's card/page.
- `backgroundTint` — hex color used for the subtle glow behind that card.
- `playStoreUrl` — leave as `""` if not published yet; the site will show a "coming soon" pill.
- `privacyPolicyUrl` — optional. Adds a "Privacy policy" button to the project page.

---

## Replacing the placeholder icons

The 4 icons in `assets/icons/` are SVG placeholders that resemble your real app icons. When you want to swap in the real Play Console 512×512 PNGs:

1. Download the PNG from Play Console → Store presence → Main store listing → App icon.
2. Save it as `assets/icons/homegym.png` (or `crux.png`, `alquran.png`, `quranmajeed.png`).
3. Open `projects.json` and change the `"icon"` field of that project from `.svg` to `.png`. That's it.

---

## Local preview

```bash
# from the project root
python -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` in your browser — but a local server is required because the site loads `projects.json` via `fetch()`, and browsers block `fetch` on `file://` URLs.

---

## Deploying

Push to `main` on your `abdulmoizofficial0.github.io` repo. GitHub Pages picks up changes within ~30 seconds.

---

## Adding social links later

Open `index.html` and find the footer block. Add anchors like:

```html
<a href="https://instagram.com/yourhandle" target="_blank" rel="noopener">Instagram</a>
```
