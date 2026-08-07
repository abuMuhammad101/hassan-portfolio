---
title: "ARA Assessment — AI Intake Agent Flow"
kicker: "Product design · Healthcare EMR · AI agent"
highlight: "Extended a clinical AI intake agent's conversational flow to handle an unnamed patient — reusing the product's own interaction patterns, additive only."
accentVar: "--ara"
status: "9 new frames · 0 edits to shipped work"
stack: ["Figma", "Conversational UX"]
order: 3
---

## The brief

An AI intake agent for a clinical EMR could already start a respiratory assessment when a patient was named up front — *"Start an ARA assessment for Dev."* I designed the branch for when it isn't: no name given at all.

## What I built

Nine new frames added to the product's existing "AI agent demo" file in Figma: chat opens empty, the user types the request with no name, the bot thinks, then asks — reusing the product's existing free-text "ask" bottom sheet, the same canonical pattern already used elsewhere for disambiguation, rather than inventing a new component. The user answers, the bot confirms, and the flow **rejoins the original, already-approved chain** — same downstream states, untouched.

## The design decision that mattered

Reuse over invention. The product already had a canonical pattern for "ask the user something, free-text or numbered picks" — used in the login journey for choosing an EMR integration. Cloning that pattern here kept the new branch visually and behaviorally consistent with everything else in the product, instead of introducing a one-off UI just for this flow.

## Non-negotiable

Every reaction on the new frames was newly wired — nothing on an existing node was touched. Traced the actual reaction graph to confirm the branch correctly rejoins the original chain, rather than assuming it would.
