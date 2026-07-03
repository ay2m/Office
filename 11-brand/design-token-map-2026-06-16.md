# Fly GACA — Design Token Map (Design Mirror)
**2026-06-16 · Source: flygaca.com (live) · Target: flygaca/ (local)**

## Finding: live = local (no drift)
The deployed `flygaca.com/assets/css/tokens.css` is **byte-for-byte identical** to the local `flygaca/assets/css/tokens.css`. The live site and the local codebase share one canonical design system — there is nothing external to mirror and no drift to reconcile. This document captures that canonical system and the accessibility QA, so it can serve as the design-system reference.

## The Falcon palette
| Token | Value | Role |
|---|---|---|
| `--falcon-night` | `#0A0E12` | primary canvas (page bg) |
| `--falcon-deep` | `#0F1A24` | elevated card surface |
| `--surface-raised` | `#13212E` | hover / raised card |
| `--falcon-mist` | `#1A2A38` | dividers / borders |
| `--border-bright` | `#26384A` | brighter border |
| `--falcon-teal` | `#2D6E8A` | primary brand (fills, buttons) |
| `--teal-bright` | `#4A9CB8` | hover, links, focus rings |
| `--falcon-sage` | `#8FC9A8` | secondary accent / success |
| `--sage-bright` | `#B5DDC2` | highlight / focus |
| `--falcon-gold` | `#C8A04A` | heritage accent (sparingly) |
| `--ivory` | `#F5F2ED` | light reading surface |

Text: `--text #E8EDF2` · `--text-muted #9DA9B4` · `--text-dim #8A95A1` · `--text-on-brand #FFFFFF`.
Gradients: `--grad-brand` (teal→sage 102°), `--grad-wing` (155°). Glows: `--glow-teal`, `--glow-sage` (mark/hero only).

## Typography
- Family: `'Cairo', system-ui, …` (bilingual EN/AR, Cairo carries Arabic). Mono: SF Mono / JetBrains Mono stack.
- Fluid scale: display `clamp(2.6→4.6rem)`, h1 `clamp(2→3rem)`, h2 `clamp(1.55→2.15rem)`, h3 `1.3rem`, lg `1.15`, base `1`, sm `0.9`, xs `0.78`.
- Weights 400/500/600/700/800. Line-heights: tight 1.15 · snug 1.35 · body 1.65.

## Spacing · radii · elevation · layout
- Spacing (4px base): 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8 rem.
- Radii: sm 8 · md 14 · lg 20 · xl 28 · pill 999 px (brand tile radius = 0.22 × side).
- Shadows: sm, card `0 8px 28px rgba(0,0,0,.45)`, pop `0 18px 50px rgba(0,0,0,.55)`.
- Layout: container 1180 · narrow 760 · nav-height 68px. Motion: ease `cubic-bezier(.4,0,.2,1)`, dur 0.2s/0.4s.

## Accessibility QA — WCAG contrast (computed on the Falcon palette)
| Pair | Ratio | Verdict |
|---|---|---|
| `--text` on `--bg` | 16.44:1 | PASS AA |
| `--text-muted` on `--bg` | 8.09:1 | PASS AA |
| `--text-dim` on `--bg` | 6.36:1 | PASS AA |
| `--link` (teal-bright) on `--bg` | 6.21:1 | PASS AA |
| `--text-dim` on `--surface` | 5.78:1 | PASS AA |
| `--text-on-brand` (#fff) on `--brand` | 5.66:1 | PASS AA |
| `--gold` on `--bg` | 7.91:1 | PASS AA |
| `--falcon-teal` AS text on `--bg` | 3.42:1 | Large-text/UI only — **correctly avoided** |

Every body/text token meets AA for normal text. The only sub-AA value is the brand teal used *as text*, which the system deliberately avoids — it routes link/text colour through `--link` (#4A9CB8) instead, per the token comment. The action plan's §4.6 contrast fix (`--text-dim` → `#8A95A1`) is already in place (6.36:1).

## Verdict
No restyle applied — none warranted. The design system is internally consistent, already on-brand, dark-first, bilingual/RTL-ready, and passes WCAG AA across its text tokens. If you want to genuinely re-skin Fly GACA, point Design Mirror at an *external* inspiration site (with Bright Data credentials set) and I'll translate that design language onto this token layer.
