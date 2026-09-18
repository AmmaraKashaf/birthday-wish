# Happy 23rd Birthday, Areeba 💖

A three-part birthday site: an animated landing page, a full-screen photo
slideshow, and a birthday wish. Plain HTML, CSS and JavaScript — no build step,
no dependencies, nothing to install.

---

## 1. Add the photos

Copy the pictures into **`public/images/`**, then pick the one for the wish page
and name it exactly **`special.jpg`**.

Then tell the site which photos to show — easiest way:

> Right-click **`update-photos.ps1`** → **Run with PowerShell**

It scans `public/images/`, fills in the photo list in `config.js`, and leaves
`special.jpg` out of the slideshow. Run it again any time you add more photos.

*(Prefer doing it by hand? Just list the file names under `photos:` in
`config.js`.)*

Photos listed but missing are skipped silently — the site never breaks.

## 2. Write the wish

Everything you'd want to change lives in **`config.js`** — it's the only file
you need to touch:

| What | Where in `config.js` |
|---|---|
| **The birthday wish** | `wish:` — between the backticks. Blank line = new paragraph |
| Card heading | `wishTitle:` |
| Sign-off | `signoff:` |
| The two hero lines | `heroLine1:`, `heroLine2:` |
| Slideshow heading | `galleryTitle:`, `gallerySubtitle:` |
| Seconds per slide | `slideDuration:` (milliseconds) |
| Which photo the wish page uses | `specialPhoto:` |

## 3. Have a look

Double-click `index.html`. That's it — it runs straight from the file system.

---

## Deploying to Vercel

You'll get a free `something.vercel.app` address. Pick whichever route suits you.

### Option A — GitHub (no software to install, auto-deploys on every change)

1. Create a new **empty** repository on [github.com](https://github.com/new).
2. In this folder, run:

   ```sh
   git init
   git add .
   git commit -m "Areeba's birthday site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and
   import the repository.
4. Leave every setting on its default — **Framework Preset: Other**, no build
   command — and press **Deploy**.
5. About a minute later you get your link. Every future `git push` redeploys it
   automatically.

### Option B — Vercel CLI

This one needs Node.js, which isn't installed on this machine yet. Grab the LTS
installer from [nodejs.org](https://nodejs.org/), then **open a new terminal**
(so `npm` is on your PATH) and run:

```sh
npm i -g vercel
cd "C:\Users\Administrator\Desktop\areeba"
vercel login
vercel          # preview deployment
vercel --prod   # the real, shareable link
```

### Option C — drag and drop

On [vercel.com](https://vercel.com), create a new project and drop this whole
folder onto the upload area. Quickest one-off, but you'd re-upload by hand to
change anything later.

### A note on `vercel.json`

It sets `"outputDirectory": "."` deliberately. When a project has no build step,
Vercel defaults its output directory to `public/` **if that folder exists** —
which would serve `public/` as the site root and leave `index.html` unreachable.
Pinning it to `.` keeps the real root, so `public/images/...` resolves properly.
Don't remove that line.

---

## Optional: background music

Drop an `.mp3` at **`public/audio/song.mp3`**. A small music toggle appears in
the top-right corner by itself, and fades the track in and out.

If the file isn't there, the button stays hidden — nothing to configure. Browsers
won't autoplay audio, so it always starts on a tap.

## Files

| File | What it's for |
|---|---|
| `config.js` | **All the words and settings.** The only file you need to edit |
| `index.html` | Page structure |
| `styles.css` | All the styling and animations |
| `app.js` | Slideshow, animations, music toggle |
| `update-photos.ps1` | Fills in the photo list from `public/images/` |
| `vercel.json` | Deployment settings and caching |

## Good to know

- **Responsive** down to ~390px; the slideshow supports swipe on touch screens
  and ← / → on a keyboard.
- The slideshow pauses while you hover it or when the section is off-screen.
- Respects **reduced-motion** settings — the floating decorations switch off for
  anyone who's asked their device to limit animation.
- Keep photos under ~2 MB each so it stays quick on phones.
