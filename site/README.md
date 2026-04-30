# GFX Passion — Static Site

Direction A · **Neon Brutalist**. Pure HTML/CSS/JS — no build step.

## Files
- `index.html` — markup & SEO meta
- `styles.css` — all styling (CSS variables, responsive)
- `app.js` — content rendering + interactions (marquee, FAQ, form, mobile nav, cursor halo, scroll reveal)

## Run locally
Just open `index.html` in a browser. Or serve it:
```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy
This is a static site — drop the `site/` folder into any host:

- **Netlify** — drag `site/` onto netlify.com/drop
- **Vercel** — `vercel deploy` from inside `site/`
- **GitHub Pages** — commit the folder, point Pages at it
- **Cloudflare Pages** — connect the repo, set build output to `site/`
- **S3 / Nginx / Apache** — copy the three files anywhere static

## Customize
- **Accent color** — edit `--accent` in `styles.css` (currently `#cfff3a`)
- **Copy / sections** — content arrays live at the top of `app.js` (CLIENTS, SERVICES, WORK, PROCESS, TEAM, TESTIMONIALS, TIERS, FAQS, CHIPS)
- **Fonts** — Google Fonts link in `<head>` of `index.html`
- **Form endpoint** — currently opens `gfxpassion@outlook.com`. Swap `initForm()` in `app.js` to POST to Formspree, Netlify Forms, or your own backend.
