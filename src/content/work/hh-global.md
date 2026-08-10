---
title: "HH Global — Wholesale Quote Store"
kicker: "Full-stack build · Live in production"
highlight: "A live quote-request storefront for a wholesale manufacturer — Supabase-backed catalog, a five-tab admin CMS, and real production bugs caught and fixed."
accentVar: "--hh-global"
status: "Live at hhglobalcompany.com"
stack: ["Next.js 16", "Tailwind v4", "Supabase", "Vercel"]
link: "https://hhglobalcompany.com"
linkLabel: "Visit the live site"
order: 1
category: "ai-adapted"
image: "/media/hh-global-walkthrough.gif"
imageAlt: "Real recording of the live site — hero, category browse, product detail with variants"
---

## The brief

A wholesale garments-and-leather manufacturer needed a Phase 1 storefront — browse the catalog, request a quote, no cart or payments yet. I owned this end to end: storefront, admin CMS, and data model, with Claude Code as my day-to-day build partner rather than a one-off code generator.

## What shipped

- A Supabase-backed product catalog (garments and leather goods, with style/finish variants) that falls back to a static file automatically if the database has a bad day
- A five-tab admin panel — Quotes CRM, Products, Categories, Media, Content CMS — scoped so the non-technical owner can run the entire site alone
- A real multi-photo gallery system: reorderable uploads in admin, a storefront viewer with thumbnails, keyboard navigation, and click-to-zoom
- A proper admin login and dashboard, replacing a raw browser Basic Auth popup

## Bugs caught before they became support tickets

The quote form's photo uploader looked finished in review — clicking it just did nothing. Root cause: the actual `<input type="file">` element was missing from the component. Found it, fixed it, then found the same failure mode one level up — nearly every admin form reported "Saved" even when the save had failed, because nothing ever checked the response. Fixed across every form at once, not just the one that got reported.

## How it holds up when things go wrong

If Supabase is unreachable, the storefront reads from a static JSON fallback instead of going dark — buyers still see the catalog, quote requests still route to the admin CRM once the database is back.
