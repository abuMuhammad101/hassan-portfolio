# Portfolio v2: brief

The single source of truth for rebuilding hassan-portfolio. Written 12 Nov 2026 from Hassan's Notion page "BrainStorm", the Hatch Conference 2026 talks, Rishi Sharma's article "How to Survive as a Product Designer in 2026–27", the three design references, and an audit of this repo.

Whoever builds from this (Claude in a Claude.ai session, or Claude Code on Hassan's machine): read the whole brief before touching code, follow the non-negotiables exactly, and treat every `TODO-HASSAN` as a question to ask, never a gap to fill with invented content.

---

## 1. The job of the site

Get a hiring manager or client to believe one thing within a minute: **Hassan decides what's right for the people using a product, ships it, and owns what happens next.** The site itself must prove it. Its quality, restraint and honesty are the first case study.

Audience: design leads, founders and recruiters hiring senior product designers for complex products (healthcare, AI, B2B, marketplaces), in Pakistan, the GCC and remote.

Market context (Sharma, Oct 2026): a designer's value is moving from "I make the screens" to "I decide what's right and can prove it." Screens are no longer scarce. What's scarce: the states nobody prompted for, presence in the architecture conversation, and evidence behind taste.

---

## 2. The story

**Brand line (Hassan's, used quietly throughout, never as a slogan block):** Lesser the noise. Maximize the recognition. Backed by what's real.

**Headline (chosen):** Less noise. Real products. Owned end to end.

**Sub-line (draft):** I'm Hassan, a senior product designer in Karachi. Healthcare compliance, AI copilots, dense business software and local marketplaces: I decide what's right for the people using them, ship it, and own what happens next.

**Four beliefs**, each linked to the case studies that prove it:

| Belief | Proven by |
|---|---|
| I solve the problem, not the tool. Tools, hype and skill boundaries don't decide the answer. | Pilgrim Transport Booking, Quick-Service Ordering App |
| I ship with agents; people stay in charge. | Clinical Copilot Overlay, Claims Agent Console |
| I'm at home in ambiguity. | Clicker, isTyme |
| I own the consequences. | Therapy Documentation Platform, HH Global |

---

## 3. Non-negotiables

### 3.1 NDA
- **No real client or product names and no real final designs** anywhere public: pages, alt text, image file names, meta tags, URLs and slugs, the resume, the PDF.
- Designs are **re-created or re-enacted**, at a quality above the source, never generic AI-looking containers. Every re-created visual carries a small, quiet label: "Re-created for NDA".
- Public names to use:

| Public name | Real name? |
|---|---|
| Therapy Documentation Platform (US, Medicare) | Placeholder |
| Clinical Copilot Overlay | Placeholder |
| Claims Agent Console (GCC revenue cycle) | Placeholder |
| Pilgrim Transport Booking | Placeholder |
| Quick-Service Ordering App (Saudi Arabia) | Placeholder |
| HH Global | Real name (confirmed) |
| Clicker | Real name (confirmed) |
| isTyme | Real name (confirmed) |

- This repo is public, so the mapping from placeholders to real client names is **not stored here**. It lives in Hassan's private Notion page "BrainStorm". Never add it to the repo, commit messages or pull requests.
- Also scrub: exact internal figures that fingerprint a client (document page counts, ticket numbers), Figma file names and keys, repo and folder names, client logos (the current client logo animation GIF in `public/media/` must go), real patient, customer or worker data, links to private prototypes (the private prototype link in the current healthcare-AI motion card must go).
- Employer names on the resume (AST, Tafsol, Legendesk, Fossphorus, TRC) stay.
- Enforced by a build-time check (see §9.4).

### 3.2 Keep the AI factor quiet
- AI and agents are **method, not identity**. Across the whole home page, mention agents once (the "How I work" section). Tool names (Claude Code, Figma, Cursor) appear only in a Tools line.
- Describe AI work by **what it did for the user**, never by which tool made it.
- No "built with Claude" badges, no prompt screenshots as hero content.

### 3.3 Honesty
- Hassan's projects mostly have no measured outcomes (teams didn't scope them). **Never invent or imply a metric.** Use the evidence types in §6.2 and a "How I'd measure it" block instead.
- Write "designed to prevent X" or "the team shipped Y", never "reduced errors by Z%".

### 3.4 Quality floor
- Mobile first. Works at 360px with no horizontal scroll.
- Light and dark themes (the existing toggle stays).
- WCAG 2.1 AA: contrast, focus states, keyboard access for every widget, `prefers-reduced-motion` honored (all GSAP and Lenis effects off or reduced).
- Fast: static output, images optimized, JS only where a widget needs it.

---

## 4. Information architecture

```
/                 Home
/work/<slug>/     Case study (8)
/resume/          Resume (and /resume.pdf)
/more/            Archive of earlier work (optional, see §4.3)
```

### 4.1 Home, top to bottom
1. **Header**: monogram, theme toggle, links to Work, Resume and Contact.
2. **Hero**: headline, sub-line, proof strip: `8 products · PK · GCC · US · healthcare · ERP · marketplaces · 5+ years`.
3. **Beliefs**: the four beliefs, each linking to its case studies.
4. **Work**: an index list in story order (§4.2), not a carousel.
5. **How I work**: five short lines, including the single agents mention. Draft:
   - I start from the person using it and the rules they live under.
   - I map the states nobody asked for: empty, error, partial failure, edge cases.
   - I work with agents the way a lead works with a fast team: they draft, I decide.
   - I ship in small, reversible steps, and I sit in the architecture conversation.
   - I own what ships, including what goes wrong.
6. **Experience**: the existing timeline, kept.
7. **Contact**: Resume, LinkedIn, GitHub, layers.to, Email.
8. **Footer**: Karachi, Pakistan · UTC+5.

### 4.2 Work order (story, not date)

| # | Public name | Format | Why here |
|---|---|---|---|
| 1 | Pilgrim Transport Booking | Full case | The thesis in one project: an agent built it, Hassan made it work for people. Short and sharp, so it opens. |
| 2 | Therapy Documentation Platform | Full case, flagship | Depth. Compliance. Errors designed out. |
| 3 | Clinical Copilot Overlay | Full case | The copilot interaction itself. |
| 4 | Claims Agent Console | Full case | A whole agent system made legible to the humans who own it. |
| 5 | Clicker | Full case | Solo, founder mindset, density done right. |
| 6 | isTyme | Full case | Minimal, local, human. |
| 7 | Quick-Service Ordering App | Short card | Audit to market-ready. |
| 8 | HH Global | Short card | Sketch to ship for a US business. |

### 4.3 Current content: what happens to it

| Current content | Action |
|---|---|
| `hh-global.md` | Keep, rewrite to template, becomes a short card |
| The healthcare-AI motion and prototype card | Replace with Claims Agent Console under a new slug. Remove the logo GIF, the prototype link and the brand accent. Delete the old file and route. |
| The AI intake agent card | Fold into Therapy Documentation Platform. Delete the old file and route. |
| `cookiya.md`, `motions.md` | Remove from home. Optional `/more/` list. `motions.md` names a client: scrub it. |
| `inventory-management.md`, `online-exam-prep.md`, `landlord-app.md`, `meal-wallet.md` | Remove from home, optional `/more/` list. |
| The two client accent tokens in `global.css` | Delete. New accents per §5.3. |

---

## 5. Design direction

### 5.1 The references and what to take from each

These are inspirations for the visual language. **Do not copy their components, code or assets** (several Flowbase items are paid "Pro" components). Build originals.

**paper.design**: the base mood.
- Warm off-white paper ground with a faint texture; restrained, almost no chrome.
- **Two-tone headlines**: first line in ink, continuation lines in a mid grey ("design incredible / the connected canvas for…"). Use this for the hero and section headings.
- **Construction-line motif**: thin hairlines crossing the page, with tiny square handles at the intersections, like a selected frame on a canvas. This is the site's signature: Hassan is a designer working on a canvas. Keep it subtle and use it sparingly (hero and section transitions).
- Real product UI shown inside realistic frames, with an agent log panel overlapping one of them. Use it once, in the copilot case study, never as a hero gimmick.
- Lowercase, friendly navigation. One quiet accent.

**Flowbase · Wonder** (design-studio language): the structure for lists and process.
- **Numbered index list with dotted leaders** and superscript years (`Project Monarch²⁴ ········ Brand · UI/UX  +`). Use this for the home work list: number, public name, superscript year, dotted leader, tags, a plus icon that expands to a one-line angle.
- **Numbered accordion "process" rows** where the open row reveals an image beside its text. Use this for "Decisions" in case studies.
- Small dot-prefixed section labels (`• Our process`), dark pill CTAs, generous light-grey surfaces.
- Testimonial row pairing a quote with one big stat. Reuse the pattern for "evidence" (a big number with a superscript unit, plus a quote) only where the number is real.

**Flowbase · Antik** (museum and archive language): the structure for case-study storytelling.
- **Big numerals with a small superscript unit** (`500 ᴮᶜᴱ`). Use this for real scale facts: `8 products`, `3 Plan of Care paths`, `5 agents`.
- **Vertical timeline scrubber** on the side with dated stops. Use it as the case-study progress rail: Problem, Constraints, Decisions, States, Evidence, Measure.
- **Inline image chips inside headlines** ("Greek [◐] Ancient Artifacts"). Use these for case-study titles, e.g. "Golden [thread icon] Thread".
- Artifact-catalog framing: each case study is an exhibit, with a small caption-style meta line.

### 5.2 Synthesis
Keep the current system's restraint and warm neutrals (they are already close to paper.design). Add three signature moves and no more:
1. Two-tone headlines.
2. Construction lines with selection handles.
3. Exhibit-style case studies: a big numeral, the scrubber rail and inline chips.

Everything else stays quiet. Put the boldness in those three places.

### 5.3 Tokens (starting point; refine in the build)
- **Ground:** keep `--bg #FAF9F7` and add a very low-opacity paper texture (an SVG noise data URI). Dark: keep `#121210`.
- **Ink:** keep `--ink`, `--ink-secondary`, `--ink-muted`. Add `--ink-tone2` for second-tone headline lines (≈ `#9A978D` light, `#6F6D64` dark; check AA for large text).
- **Lines:** `--construct` for construction lines (≈ `#D9D6CC` light, `#2E2D28` dark).
- **Accent:** one site accent for interactive states, a deep ink-blue (≈ `#2F4BD8`; check contrast in both themes). Per-case accents only inside that case study's widget, chosen from the project's domain, never a real client brand color.
- **Type:**
  - Display: **Instrument Sans** (Google Fonts; a light, wide grotesk close to paper.design's feel). Use 400 and 500 weights at large sizes.
  - Body: **Inter** (kept).
  - Mono: **IBM Plex Mono** (kept) for meta, numerals' units, dates and tags.
  - Scale: add `--text-3xl 2.5rem` and `--text-hero clamp(2.6rem, 6vw, 4.5rem)`.
- **Layout:** the home stays a calm single column (`max-width 680px`) for reading. Case studies widen to `1080px` for exhibits and widgets, with text still capped at about 65ch.

### 5.4 Motion
- **Lenis** smooth scroll (respect reduced motion: disable entirely).
- **GSAP + ScrollTrigger** for:
  - **The one orchestrated moment:** hero construction lines draw in, and the handles pop at the intersections (under 1.2s total).
  - Section reveals (replacing the current IntersectionObserver reveal) with the same gentle feel: 20px travel, staggered.
  - The case-study scrubber rail tracking the reading position.
- Widgets animate on interaction, not on load.
- Everything readable at rest. Nothing waits at `opacity: 0` for JS.

---

## 6. Case studies

### 6.1 Template (same order on every page)
1. **Exhibit header**: public name (with an inline chip), one-line angle, a meta line in mono (Role · Timeline · Team · Platform), the "Re-created for NDA" label where it applies.
2. **The problem, in the user's words.** Who was struggling, and with what.
3. **Constraints.** Team, time, compliance, legacy code, no access to data.
4. **Decisions.** Two or three key calls as Wonder-style accordion rows, each with the options rejected and why.
5. **The interactive proof.** One re-created widget (§6.3).
6. **The states nobody prompted for.** A grid: empty, error, partial failure, permission, accessibility, scale.
7. **Agents in the process** (only where true). Which steps agents did, and **one place Hassan overruled them**.
8. **Evidence.** From the list in §6.2.
9. **How I'd measure it.** Two or three metrics he'd track with access.
10. **What I'd do next.**
11. **Next case** link.

### 6.2 Evidence without metrics (use what's real)
- Errors designed out (what the system now makes impossible).
- Severity-ranked findings (audits).
- Shipped status: live, in the store, released, proposal approved by the lead reviewer, investor demo delivered.
- Scale handled (only where it doesn't fingerprint a client).
- Paths not taken: the zoom-out to the rejected options.
- A quote from a developer, clinician or client (`TODO-HASSAN`: collect).

### 6.3 Per project

**1 · Pilgrim Transport Booking**
- Angle: An agent built the site; I gave back what people need from it.
- Context: a private driver service for pilgrims. Hassan was handed an existing, agent-built site. Backend unchanged; front end redesigned (hero, browse by destination and vehicle, why choose us, testimonials, FAQs; an Explore page with a detail drawer; booking flow next).
- Widget: a before and after slider on the same page inside a browser frame (re-created).
- States: no vehicle available on a date, booking fails mid-way, slow connection on a phone.
- Measure: booking completion rate, enquiry to booking.
- `TODO-HASSAN`: live status, your role and timeline, one decision you'd highlight.

**2 · Therapy Documentation Platform** (absorbs the existing AI intake agent card)
- Angle: The Golden Thread: a system-driven experience that still feels comfortable, built so deliberate measures stop the slips that would cause future errors.
- Context: Medicare compliance for PT/OT/ST/RT therapy documentation. Hassan works as product owner and architect across design, documentation and strategy.
- Decisions to feature: the Plan of Care template, three architectural paths explored before choosing a guided flow; Re-Eval unlocking only after three certified Recerts, with Re-Eval, Recert and Addendum kept as distinct records; decoupling sessions from goals in the daily note (goal optional, not a required parent); a functional-scoring widget with six variants across four entry points.
- Widget: "Try to sign a note with a missing goal": the Golden Thread blocks it and explains why, with a path to fix it.
- States: unsigned note, expired certification, recert due, goal missing, co-sign pending.
- Evidence: errors designed out; release notes shipped; proposal approved by the lead reviewer.
- Measure: notes rejected at audit, time per note, unsigned notes past deadline.
- `TODO-HASSAN`: which of these you're comfortable showing in abstract form; timeline; team size.

**3 · Clinical Copilot Overlay**
- Angle: An agentic UX wizard that cuts the noise: a true copilot, not a chat box.
- Context: an overlay that appears after a clinician commands an action, adapts to any flow, and is deliberately monochrome so it can ship as an SDK across product lines.
- Widget: type or pick a command; the overlay appears, adapts to the flow, shows what it's doing, and offers accept, edit or undo. Include one deliberately wrong suggestion that the user corrects.
- States: AI is wrong, answer cut off, low confidence, user correction, undo.
- Measure: accept, edit and reject rates; time to finish the task.
- `TODO-HASSAN`: the design story; one place you overruled the AI.

**4 · Claims Agent Console**
- Angle: Exploration and design thinking with agents as a superpower, keeping a multi-agent billing system legible and steerable for the humans who own it.
- Context: AI revenue-cycle automation for healthcare providers in the GCC. Claim agent dashboard: a live agent pipeline row, priority queue, denial-loop alert, persistent copilot rail.
- Widget: claims flowing through a five-stage agent pipeline, with one claim stuck in a denial loop and handed to a human.
- States: agent stuck, denial loop, low confidence, human override.
- Measure: time to resolve a denial, share of claims needing a human.
- `TODO-HASSAN`: whether "five agents" fingerprints the client (if so, say "multi-agent"); keep the motion and logo work out.

**5 · Clicker** (real name)
- Angle: An ERP that makes sense: density in its most digestible shape, owned solo from schema to screen.
- Context: a schema-driven ERP for small businesses (a clean-room alternative to Odoo). Django and PostgreSQL backend, React frontend. Density rules: 34px rows, no zebra striping, right-aligned 168px labels, tabular figures, one ink-violet accent. Demo journeys: a water-utility bulk-billing manager and a port import-clearance company.
- Widget: a 4,000-row table at Clicker's density, with a toggle to compare against a typical cluttered ERP.
- States: 4,000 rows, empty module, import errors, missing permissions.
- Evidence: working product, decision log, investor demo.
- Measure: time to first useful record, tasks completed per session.

**6 · isTyme** (real name)
- Angle: The power of minimal; a place rooted in the local and the human.
- Context: a marketplace connecting customers with electricians, plumbers and other skilled workers in Karachi, with GCC expansion planned. App built; Hassan led the UX audit and premium redesign. Workers verify their identity (national ID) before taking jobs. Logo: a hand-drawn cursive "is" that morphs into a smile, then a clock at 10:10. Hassan joined on-ground worker onboarding.
- Widget: a phone frame showing the worker verification journey: browse jobs, verification pending (with the reason and live status), verified, first offer.
- States: unverified worker, no jobs nearby, weak signal on a low-end phone.
- Measure: drop-off at verification, time to verify, first completed job.
- `TODO-HASSAN`: Play Store status; anything learned on the ground.

**7 · Quick-Service Ordering App** (short card)
- Angle: A UX audit that gave stakeholders enough context to make the app ready to compete.
- Context: a mobile app for a quick-service restaurant chain in Saudi Arabia.
- Widget (small): tap hotspots on a re-created app screen to reveal findings by heuristic and severity.
- Measure: store rating, order completion.
- `TODO-HASSAN`: the top three findings and what changed.

**8 · HH Global** (real name; short card)
- Angle: Sketch to ship, solo, for a US business.
- Context: a quote-request wholesale storefront for garments and leather goods, live, with a five-tab admin. Existing write-up and walkthrough GIF can be reused after rewriting to the template.
- Widget (small): the quote request flow inside a browser frame.
- Measure: quotes per week, quote to order.

---

## 7. Resume

Keep the resume's **visual design** (it matches Hassan's own original resume: Playfair Display italic name, Lora body, violet accent, two-column screen layout, single-column PDF for ATS). Rewrite the **copy** to tell the same story, with the AI factor quiet.

**Summary (draft):**
> Senior Product Designer with 5+ years shipping SaaS and mobile products end to end, from research to production. I work in rule-heavy, high-stakes domains (healthcare compliance, AI copilots and agent workflows, dense business software) and I own what ships.

**AST bullets (draft):**
- Own product design for a US therapy documentation platform: Medicare compliance workflows, clinician tools and the design system behind them, from research through developer handoff.
- Designed the billing and claims data model and an 8-screen compliance flow that enforces clinical documentation standards, extending the existing design system rather than adding one-off patterns.
- Designed an AI intake agent's conversational flow to handle real edge cases (for example, a patient not named up front), reusing the product's own interaction patterns without changing shipped work.
- Set up a design-to-ship workflow (interactive prototypes and automated design-file updates) that shortens the path from a design decision to a working, verified flow.

**Lists:**
- Competencies: replace "AI-Assisted Design Workflows" with "AI product design (copilots and agents)". It's a domain, not a tool.
- Tools: keep Claude Code here, and only here.

**Fixes:**
- LinkedIn URL: the site and resume use `linkedin.com/in/muhammad-hassan-khan`. `TODO-HASSAN`: confirm the right one (another note says `muhammad-hassan-khan-ui-ux-designer`).
- The AST link on the home page points to GitHub. `TODO-HASSAN`: the company URL, or no link.
- Tafsol ends "Jun 2026" and AST starts "Jun 2026": confirm this is correct.
- Regenerate `public/resume.pdf` with `npm run resume:pdf` and check the text extraction order.

---

## 8. Content model changes

Extend `src/content/config.ts`:

```ts
const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),              // public name only
    angle: z.string(),              // one line
    format: z.enum(["full", "short"]),
    order: z.number(),
    year: z.number(),
    role: z.string(),
    tags: z.array(z.string()),
    platform: z.string(),           // web · iOS · Android
    ndaRecreated: z.boolean(),      // shows the "Re-created for NDA" label
    widget: z.string().optional(),  // component name in src/components/widgets/
    stats: z.array(z.object({ value: z.string(), unit: z.string(), label: z.string() })).optional(),
    measures: z.array(z.string()),
    status: z.string().optional(),  // e.g. "Live", "Released", "Demo"
    link: z.string().url().optional(),
  }),
});
```

Slugs use public names: `pilgrim-transport`, `therapy-documentation`, `clinical-copilot`, `claims-agent-console`, `clicker`, `istyme`, `quick-service-app`, `hh-global`.

---

## 9. Build plan

### 9.1 Stack
Keep Astro 4 static on Vercel with plain CSS. Add `gsap` (with ScrollTrigger) and `lenis` from npm, imported in one client script. Widgets are Astro components with small vanilla-JS islands; no React unless a widget truly needs it.

### 9.2 New components
- `ConstructionLines.astro`: SVG hairlines and handles; a GSAP draw-in on the hero.
- `TwoToneHeading.astro`: first line in ink, the rest in `--ink-tone2`.
- `IndexList.astro`: the Wonder-style numbered work list with dotted leaders and expandable rows.
- `ExhibitHeader.astro`: title with an inline chip, angle, mono meta line, NDA label.
- `ScrubberRail.astro`: sticky side rail of section stops, tracking the reading position (hidden on mobile, replaced by a top progress bar).
- `BigNumber.astro`: value plus a superscript unit and a label.
- `DecisionAccordion.astro`: numbered rows with a revealed image or text.
- `StatesGrid.astro`, `MeasureList.astro`.
- `BrowserFrame.astro`, `PhoneFrame.astro`: realistic, minimal device frames.
- `widgets/*`: one per project (§6.3).

### 9.3 Phases (each ends with a pull request and a Vercel preview for Hassan to review)

| Phase | Scope | Hassan reviews |
|---|---|---|
| 0 | This brief | The brief (now) |
| 1 | Foundation: tokens, fonts, texture, motion setup, frames, construction lines, NDA check script, remove or scrub old content | A preview with the new look on the existing pages |
| 2 | Home: hero, beliefs, index list, how I work, experience, contact | The home page |
| 3 | Case-study template and wave 1: Pilgrim Transport, Therapy Documentation, Clinical Copilot (with widgets) | Three case studies |
| 4 | Wave 2: Claims Agent Console, Clicker, isTyme, Quick-Service App, HH Global | Five case studies |
| 5 | Resume copy and PDF | Resume |
| 6 | QA pass (§10) and launch | Final preview, then merge to `main` |

### 9.4 NDA check (runs in `npm run build`)
`scripts/nda-check.mjs` scans `src/`, `public/` (file names, plus text inside SVG and HTML) and the built `dist/`, case-insensitively, for a deny-list, and fails the build on any hit.

The deny-list is **not committed** (this repo is public). The script reads it from the `NDA_DENYLIST` environment variable (comma-separated), set in Vercel's project settings and in a local, git-ignored `.env`. If the variable is missing, the build prints a clear warning. The list itself is kept in Hassan's private Notion page.

---

## 10. QA checklist (before each merge)
- [ ] `npm run build` passes (astro check and the NDA check)
- [ ] Screenshots at 360, 768 and 1280 px, light and dark; no horizontal scroll
- [ ] Every widget works by keyboard alone; visible focus; screen-reader labels
- [ ] Reduced motion: Lenis off, GSAP reveals instant, widgets still usable
- [ ] Contrast AA, including the second-tone headline color
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on home and one case study
- [ ] No real names (NDA check), and no invented metrics (manual read)
- [ ] AI mentions on the home page: agents exactly once; tool names only in the Tools line
- [ ] Resume PDF regenerated; text extraction order correct

---

## 11. Open items for Hassan (`TODO-HASSAN`)
1. Live or public status for each project.
2. Any quote from a developer, clinician or client (one per project is ideal).
3. Role, timeline and team size for each case study.
4. Pilgrim Transport: one decision to highlight. Copilot Overlay: one place you overruled the AI. Quick-Service App: top three audit findings.
5. LinkedIn URL, AST link, June 2026 dates.
6. Extra deny-list names for the NDA check.
7. Whether to keep an archive page (`/more/`) for older agency work, or drop it.
