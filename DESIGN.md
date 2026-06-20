# DESIGN — Utah Accident Firm · "Calma cálida"

⚠️ Provisional until a real logo/identity is supplied. Token **names** are stable
(see `src/styles/global.css`); swapping values later won't touch markup.

## Direction
Committed color strategy, light theme, warm. A deep blue-green (teal) carries
trust without the generic insurance-navy; warm amber owns the CTAs; surfaces are
warm cream/bone. Feels like "a calm person just took over."

Scene sentence: *a rattled driver on the shoulder of I-15 in West Valley City,
squinting at a cracked phone in bright Utah midday sun, needs to feel someone
calm just took over* → light, airy, high-legibility, warm.

Anchor refs: Wealthsimple (calm warmth), Oscar Health (human healthcare),
Headspace (relief).

## Color (OKLCH, no pure black/white)
- Brand teal: `--color-brand` 0.46/0.072/201 · deep 0.38 · soft 0.95 · band 0.42
- Ink (headings): `--color-ink` 0.28/0.035/212
- Accent amber (CTAs): `--color-accent` 0.80/0.135/72 · deep 0.71 · soft 0.94
- Warm neutrals: paper 0.986/0.012/84 · paper-2 0.966 · line 0.90 · fg 0.33 · muted 0.52
- Feedback: success 0.60/0.12/155 · danger 0.57/0.17/27

## Typography
- Display: **Bricolage Grotesque Variable** (headlines; humanist warmth, dependable)
- Body: **Hanken Grotesk Variable** (legible at mobile sizes, friendly)
- Self-hosted via `@fontsource-variable/*`. Fluid `clamp()` headings, ≥1.25 steps.
- Deliberately avoids Inter / DM Sans / Playfair (reflex defaults).

## Layout & components
- Long-scroll home; header nav scrolls to anchors. Mobile sticky bottom CTA bar.
- Vary section layouts (no repeated icon-card grid): editorial numbered rows,
  connected step path, two-column contrast, chip cluster, warm stat band.
- Radii: card 1.25rem, pill full. Elevation via `--shadow-soft` / `--shadow-lift`.

## Motion
- Scroll reveal: CSS `.reveal` + IntersectionObserver, `--ease-out-quint`.
- Accordion: animate `grid-template-rows` (0fr→1fr), not height.
- Testimonials carousel + form: React islands with Motion.
- Full `prefers-reduced-motion` support.

## Bans honored
No gradient text, no side-stripe borders, no glassmorphism-by-default, no
hero-metric template, no identical card grids, no em dashes in copy.
