# Dar Al-Atour Perfumes Company — Website Project

## Company Facts (verified from official documents)

- **Registered name (AR):** شركة دار العطور لاستيراد العطور ومواد الزينة (ذ.م.م)
- **Registered name (EN):** Dar Al-Atour Perfumes Company
- **Activity:** Import, assembly, distribution and supply of perfumes and beauty/adornment products (مواد الزينة)
- **Location:** Hay Al-Andalus, Tripoli, Libya
- **General Manager:** Amin Mustafa Freiwan
- **Phone / WhatsApp:** 0914091100 (+218 91 409 1100)
- **Logo:** Emerald green + gold heraldic shield, monogram "D" merged with a perfume bottle silhouette and botanical leaf accents

Note: commercial license/registration numbers exist on file (see `reffrence/company_facts.md`) but **must not be published on the website** per client instruction.

## Site Scope (confirmed with client)

- Small, simple **company introduction site** — no product catalog, no e-commerce, no online checkout.
- No license/registration numbers displayed publicly.
- Bilingual: Arabic (RTL, primary) / English (LTR).
- Primary CTA: WhatsApp contact.

## Design Direction

- **Clean, simple, and beautiful** — not overly luxurious, not heavy on emerald green. Green + gold used sparingly as accent color only (buttons, links, icons, dividers), not as dominant background/theme.
- Neutral base palette (white / soft cream / light gray).
- Modern, readable typography — sans-serif body, tasteful serif or brand-matching accent for headings only.
- **Motion & visual effects:** scroll-reveal animations, smooth hover/transition states, subtle parallax/fade on hero, micro-interactions (button hover, image hover), smooth section transitions. Tasteful, not gimmicky. Built with GSAP (see skills below).
- Feels like a real, professional company — not a jewelry/luxury fragrance boutique.

## Pages

1. **Home** — hero, brief intro, brand highlights, CTA to Contact/WhatsApp
2. **About** — company story, mission, activity description
3. **Contact** — WhatsApp click-to-chat, phone, address (no license numbers)

## Tech Stack

- React + Vite (existing repo scaffold), Tailwind CSS
- GSAP for animations/transitions
- Bilingual AR/EN with RTL support
- Deployed via the repo: https://github.com/zakariaali99/dar-alatour.git

## UI/UX Skills (always use when building websites)

Cloned locally to `~/.claude/skills/web-design/` for reuse across projects — consult these for design patterns, component references, and animation techniques before/while building:

- `ui-ux-pro-max-skill/` — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- `claude-code/` — https://github.com/anthropics/claude-code
- `ui/` (shadcn/ui) — https://github.com/shadcn-ui/ui
- `awesome-design-skills/` — https://github.com/bergside/awesome-design-skills
- `gsap-skills/` — https://github.com/greensock/gsap-skills

## Repo Notes

- The GitHub repo `dar-alatour` already had a prior "ultra-luxury" React+Vite build with a full product catalog, wholesale calculator, and scent quiz — out of scope now given the simplified brief. Plan: strip product-catalog components and rebuild the three simple pages above, keeping `reffrence/` and `company_facts.md`.
