---
title: "Medexa — Motion, Prototype & Design System"
kicker: "Motion · Prototyping · Design system"
highlight: "A client's logo animated two ways, an interactive prototype built from three Figma screens, and a real Style Guide page — three deliverables, one client."
accentVar: "--medexa"
status: "2 renders · 1 interactive prototype · 1 style guide"
stack: ["Remotion", "TypeScript", "Figma"]
order: 2
category: "ai-adapted"
image: "/media/medexa-logo-reveal.gif"
imageAlt: "The actual rendered logo reveal — three bars, staggered spring, two twinkling stars"
---

## The brief

A healthcare AI product needed its logo animated for use as a video overlay, a working prototype of its three core screens, and a proper design system to keep the product consistent as it grows.

## Motion — two variations of a 3-bar logo mark

Both exported with a genuine alpha channel for overlay use. **Reveal**: bars slide in with a staggered, critically-damped spring — calm and confident, not bouncy — while two accent stars twinkle and spin into place. **Cinematic Swipe**: after the reveal, the bars keep trading positions in a continuous adjacent-pair swap.

Two real motion bugs solved along the way: an isotropic blur that smeared the bars into an unreadable blob, fixed with a directional blur elongated along the swipe direction — and two identical bars merging into one shape mid-crossing, fixed with a small vertical arc so they visibly weave past each other.

![The actual rendered output — three bars, staggered spring, two twinkling stars](/media/medexa-logo-reveal.gif)

## Prototype — three Figma screens, made real

Turned SOAP Notes, Billing Intelligence, and Patient Summary into an actual interactive card carousel — draggable, tappable, keyboard- and dot-navigable — pixel-matched to the design's own tokens, down to the exact border color and corner radius.

[Open the live interactive prototype →](https://claude.ai/code/artifact/51bed233-d387-4453-82fc-4d1ce64a52e2)

## Design system — a real Style Guide page

Built directly inside the product's Figma file: color (brand core, Primary Blue and Secondary Dark ramps, the ambient gradient, the AI-listening glow effect), the full Inter type scale, an 8pt spacing scale, a 7-step radius scale, 4 shadow depths, and a first component set assembled from those tokens.
