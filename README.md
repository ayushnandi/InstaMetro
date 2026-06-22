# lyne. — Delhi Metro App

Marketing website for **lyne.**, a Delhi Metro navigation app built with Expo and React Native.

---

## What is lyne.

lyne. is a clean, offline-capable Delhi Metro app covering all 303 stations across 10 lines. It offers step-by-step route planning, fare calculation, digital QR tickets, a live journey map, and platform direction guidance in Hindi and English.

The app is unofficial and not affiliated with DMRC.

---

## This repository

This is the Next.js marketing website for lyne. Built with:

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4**
- **Framer Motion** for scroll-driven and entry animations
- **next-themes** for light/dark mode
- **DM Sans + DM Mono** (Google Fonts)

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, network map, tech stack, testimonials |
| `/privacy-policy` | Full privacy policy |
| `/terms-of-use` | Terms of use |
| `/contact` | Contact and support with FAQ |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build       # production build
npm run start       # serve production build locally
npx tsc --noEmit    # type-check only
```

---

## Project structure

```
src/
  app/                    # Next.js App Router pages
    page.tsx              # Home / landing page
    privacy-policy/       # Privacy policy page
    terms-of-use/         # Terms of use page
    contact/              # Contact and support page
    layout.tsx            # Root layout (fonts, metadata, theme)
    globals.css           # Tailwind v4 + design tokens
  components/
    layout/               # Nav, Footer
    sections/             # Hero, About, Features, NetworkMap, TechStack, Integrations, Testimonials, CTA
    phone/                # Phone shell + screen mockups (ScreenHome, ScreenLive, ScreenTicket)
    ui/                   # AnimatedSection, StoreBadge, ThemeToggle, NetworkSVG
  lib/
    tokens.ts             # Design tokens (colors, layout constants)
```

---

## Design system

All colors and typography come from CSS variables in `globals.css`. Theme tokens under `:root` (light) and `.dark` (dark). No hardcoded hex values in component files.

Key tokens: `--bg`, `--surface1/2/3`, `--text`, `--text-dim`, `--text-mute`, `--accent`, `--money`, `--amber-c`, `--hairline`.

---

## Mobile app

The React Native app lives at [https://github.com/ayushnandi/lyne](https://github.com/ayushnandi/lyne).

---

## Author

Built by Ayush Nandi. Not affiliated with DMRC.
