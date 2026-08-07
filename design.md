# Design language

The reference this was pixel-matched from is a restrained, editorial personal site: one centered column, almost no chrome, type and whitespace doing all the work. This document is the system extracted from it — tokens and components, not a copy of the source's identity (logo mark, wordmark, copy voice are original to this site).

## Palette

Warm, not neutral-gray. A pure `#000`/`#fff` pair reads sterile; a slight warm bias reads considered.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FAFAF8` | `#121210` | Page background |
| `--bg-raised` | `#FFFFFF` | `#1B1A17` | Work-preview frames, raised surfaces |
| `--ink` | `#1A1A18` | `#F2F1EA` | Headings, name, primary text |
| `--ink-secondary` | `#55534C` | `#B8B6AC` | Body paragraphs |
| `--ink-muted` | `#8C8A81` | `#706E64` | Section labels, dates, company names |
| `--rule` | `#E5E3DC` | `#2A2924` | Hairline dividers |

Each case study carries its own accent, pulled from the project's real brand where one exists — never invented for decoration:

| Project | Accent |
|---|---|
| HH Global | `#9C6B1F` (their actual warm brass/gold token) |
| Medexa | `#2C39FF` / `#010ED0` (their actual card-border and primary blue) |
| ARA Assessment | `#1D5FBF` (clinical blue) |
| Cookiya | `#6B5B95` (Fraunces-adjacent plum, unused elsewhere) |
| motions | `#3A7D5C` (a quiet green, distinct from every other accent) |

## Type

**Inter** for everything. **IBM Plex Mono** for anything tabular: experience dates, case-study meta lines, stack tags. Both loaded from Google Fonts — reliable, no self-hosting fragility, and the weights that matter (400/500/600) are all that's loaded.

| Token | Size | Line-height | Use |
|---|---|---|---|
| `--text-xs` | 12px | 1.5 | Footer, fine print |
| `--text-sm` | 14px | 1.5 | Section labels (lowercase), meta |
| `--text-base` | 16px | 1.7 | Body copy |
| `--text-lg` | 18px | 1.6 | Intro paragraph |
| `--text-xl` | 22px | 1.4 | Case-study section headings |
| `--text-2xl` | 28px | 1.3 | Case-study title |

Section labels (`selected work`, `experiences`, `services`, `stack`, `contact`) are lowercase, `--ink-muted`, `--text-sm`, no letter-spacing tricks — the reference's restraint comes from *not* decorating labels, not from adding small-caps or tracking.

## Layout

- Single centered column, `max-width: 680px`
- Vertical rhythm in multiples of 8px; section gaps are large (64–96px) — the whitespace is the structure, not a rule or a card border
- No shadows. No card borders except the work-preview frames and the case-study accent rule
- Mobile: same column, tighter margins, no layout change — this design doesn't need a different mobile pattern

## Components

- **Header** — a small original two-shape monogram (not the reference's logo) + theme toggle (sun/moon), same row
- **Intro** — plain paragraphs, key nouns (name, role, current employer) as understated underlined inline links where they have somewhere to go
- **Work scroller** — horizontal snap-scroll of `--bg-raised` frames, each showing a device-style preview; peeks past the viewport edge on wider screens so it visibly continues
- **Timeline** — two-column list: date range in `--ink-muted` mono, role + company inline (role in `--ink`, company in `--ink-muted`)
- **Link list** — plain stacked list, no bullets, no icons (services / stack / contact all use this one pattern)
- **Footer** — one line: location + local UTC offset, real and current

## Motion

None beyond: the theme toggle's color transition (200ms), and the work scroller's native CSS scroll-snap. No entrance animations, no hover-lift cards — matches the reference's confidence in staying still.

## Voice

Direct, factual, first person, short sentences. States what was built and what it did — no adjectives doing the work that a specific detail could do instead.
