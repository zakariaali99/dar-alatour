# Dar Al-Atour Perfumes Company — Website

A small bilingual company-introduction site for **شركة دار العطور لاستيراد العطور ومواد الزينة** (Dar Al-Atour Perfumes Company), Tripoli, Libya.

Single page, five sections: Home · About · Services · Why us · Contact.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4 (CSS-first theme tokens)
- GSAP + ScrollTrigger for reveals and the hero timeline
- Lenis for smooth scrolling

## Features

- **Bilingual AR/EN** with full RTL support. Arabic is the default; the choice is remembered, and `?lang=en` / `?lang=ar` makes it shareable in a link.
- **Light / dark mode**, following the OS by default until the visitor chooses. Applied before first paint, so there is no flash.
- **Motion** — hero word-by-word entrance, scroll reveals, pointer-tilt and orbiting rings on the crest, parallax, hover micro-interactions. All of it is skipped when the visitor prefers reduced motion.
- **WhatsApp-first contact** — every call to action opens a chat with a pre-filled message.
- Mobile navigation is a side drawer.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Content

All copy lives in [`src/content.ts`](src/content.ts) — both languages side by side. Phone number and WhatsApp target are the `CONTACT` object at the top of that file.

Verified company details are in [`reffrence/company_facts.md`](reffrence/company_facts.md). Note that the commercial licence and registry numbers recorded there are **deliberately not published on the site**, per the client.

## Assets

- `public/logo.png` — the crest, for light backgrounds.
- `public/logo-dark.png` — the same crest with its baked-in white glow stripped, for dark backgrounds.

Both are served by `src/components/Crest.tsx`, which picks the right one for the active theme.
