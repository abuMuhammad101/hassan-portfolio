---
title: "motions — Remotion Starter Kit"
kicker: "Tooling · Remotion"
highlight: "A small reusable motion-graphics starter kit — the base the Medexa animation work was built on."
accentVar: "--motions"
status: "4 starter compositions · reused in production"
stack: ["Remotion", "TypeScript", "React"]
order: 5
---

## Why this exists

Client motion work shouldn't start from a blank file every time. Built a small, reusable starting point instead: one shared canvas config (resolution, fps, title-safe margin) that makes swapping the whole project to 4K/60fps a one-line change, four working example compositions — Title Card, Lower Third, Kinetic Text, Transparent Badge — intentionally plain so the *look* stays unopinionated while the *structure* is ready, and a shared Google Fonts loader with a plain CSS reset, no framework in the way.

![One of the starter kit's four example compositions, actually rendered](/media/motions-kinetic-text.gif)

This is the base the [Medexa](/work/medexa/) animation work was built on top of.
