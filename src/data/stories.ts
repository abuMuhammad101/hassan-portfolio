/* The story each interactive prototype tells when it plays on its own.
   Each chapter is a tab in the story window. Its steps are the clicks that
   produce the state its caption describes; selectors point into the
   widget's own markup. */
import type { Chapter } from "../components/StoryDirector.astro";

export interface Story {
  chapters: Chapter[];
  reset?: string;
  accent?: string;
  address?: string;
  pad?: boolean;
}

export const stories: Record<string, Story> = {
  "before-after": {
    accent: "#a87810",
    address: "pilgrimdrivers.example",
    reset: '[data-open="0"], [data-route-btn="airport"]',
    chapters: [
      {
        tab: "Before",
        icon: "clock-counter-clockwise",
        title: "The site an agent built",
        note: "Everything a traveller needed was on the page, at the same volume. A rental template, with nothing that said pilgrims.",
        steps: [{ tab: true }, { run: '[data-show="before"]' }],
      },
      {
        tab: "After",
        icon: "layout",
        title: "Same content, reshaped",
        note: "Nothing removed. The same backend and routes, in the order a pilgrim's family actually asks, in a voice that fits the journey.",
        steps: [{ tab: true }, { run: '[data-show="after"]' }],
      },
      {
        tab: "Book",
        icon: "map-trifold",
        title: "Three kinds of ride, one card",
        note: "Airport, between the cities, or ziyarat. Each sets the route and shows a fixed fare before anything else is asked.",
        steps: [{ click: '[data-route-btn="cities"]', settle: 1400 }, { click: '[data-route-btn="ziyarat"]' }],
      },
      {
        tab: "Vehicles",
        icon: "van",
        title: "Chosen by people and bags",
        note: "Families choose by how many travel and how much they carry, not by car model.",
        steps: [{ point: ".car.pick" }],
      },
      {
        tab: "Updates",
        icon: "chat-circle-text",
        title: "Told where they already are",
        note: "The driver, the car and the plate arrive on WhatsApp the night before. No app to install.",
        steps: [{ click: '[data-open="1"]', settle: 900 }, { click: '[data-open="2"]' }],
      },
    ],
  },

  "record-chain": {
    accent: "#4b4fd6",
    address: "app.strandhealth.example/patients/arthur-bell",
    reset: "[data-reset]",
    chapters: [
      {
        tab: "Record chain",
        icon: "link",
        title: "Every record ties back",
        note: "Evaluation, plan of care, daily notes, progress: one chain. Each record exists because the one before it does.",
        steps: [{ point: ".node.done" }, { point: ".node.poc" }],
      },
      {
        tab: "Daily note",
        icon: "lock-simple",
        title: "She tries to start a note",
        note: "The plan isn't certified yet, so the daily note is locked, and the screen says why instead of failing at audit later.",
        steps: [{ click: "[data-new]", settle: 150 }, { click: "[data-pick]", settle: 200 }],
      },
      {
        tab: "Certify",
        icon: "seal-check",
        title: "The fix is one click away",
        note: "Request certification right from the record. The physician signs, and the chain turns gold.",
        steps: [{ click: "[data-cert]", settle: 1900 }],
      },
      {
        tab: "Visit 1",
        icon: "note-pencil",
        title: "Now the note opens",
        note: "Visit 1 of 12 starts, already linked to the certified plan. Nothing to remember, nothing to chase.",
        steps: [{ click: "[data-new]", settle: 150 }, { click: "[data-pick]" }],
      },
    ],
  },

  copilot: {
    accent: "#4a4ad6",
    reset: "[data-reset-cp]",
    pad: true,
    chapters: [
      {
        tab: "Say it",
        icon: "microphone",
        title: "Say it once",
        note: "The clinician taps the mic and asks for a breathing test. The copilot hears it and finds Arthur.",
        steps: [{ click: "[data-mic]", settle: 2700 }],
      },
      {
        tab: "Confirm",
        icon: "user-circle-check",
        title: "Confirm, don't type",
        note: "One tap confirms the patient, and it finds the spirometer nearby on its own.",
        steps: [{ click: '[data-go="device"]', settle: 2000 }],
      },
      {
        tab: "Missing",
        icon: "question",
        title: "Only what's missing",
        note: "It asks for the one thing it can't know: his height. Everything else is already filled in.",
        steps: [{ click: '[data-go="details"]' }],
      },
      {
        tab: "Correct",
        icon: "pencil-simple",
        title: "Correct it by voice",
        note: "Change a value the way you'd say it. The form updates; the clinician doesn't hunt for a field.",
        steps: [{ click: '[data-go="edit"]', settle: 200 }, { click: '[data-go="details-set"]' }],
      },
      {
        tab: "Start",
        icon: "play-circle",
        title: "You stay in charge",
        note: "Nothing starts until the clinician says so. Then the test runs, and every step can be undone.",
        steps: [{ click: '[data-go="ready"]', settle: 200 }, { click: '[data-go="done"]' }],
      },
    ],
  },

  "agent-console": {
    accent: "#0f7a6a",
    address: "app.relayclaims.example/control-room",
    reset: "[data-reset]",
    chapters: [
      {
        tab: "Pipeline",
        icon: "flow-arrow",
        title: "Five agents, one screen",
        note: "Intake to denials, laid out as a pipeline with counts. Anyone can see where work is piling up without asking a bot.",
        steps: [{ point: ".stages" }, { point: ".queue" }],
      },
      {
        tab: "Denial loop",
        icon: "arrows-clockwise",
        title: "A loop gets a person",
        note: "A claim denied three times stops retrying and raises its hand, with what was tried and why it failed.",
        steps: [{ point: ".alert.sw-loop" }, { click: "[data-open]" }],
      },
      {
        tab: "Approve",
        icon: "check-circle",
        title: "Approve the fix",
        note: "The agent suggests a fix with its confidence shown. One click resubmits, logged under the person's name.",
        steps: [{ click: "[data-approve]" }],
      },
      {
        tab: "Take over",
        icon: "hand",
        title: "Or take it over",
        note: "Not convinced? Take the claim. The agents stop touching it until it's handed back.",
        steps: [{ click: "[data-undo]", settle: 150 }, { click: "[data-open]", settle: 150 }, { click: "[data-take]" }],
      },
    ],
  },

  // HH: the cursor clicks the window's own tabs, the way a buyer browses.
  "site-tour": {
    accent: "#9a6b2f",
    address: "hhglobalcompany.com",
    chapters: [
      {
        tab: "Home",
        icon: "house",
        title: "One promise",
        note: "The home page says what they make and gives one way in: view the collection or ask for a quote.",
        steps: [{ tab: true }, { run: '[data-k="home"]' }],
      },
      {
        tab: "Catalogue",
        icon: "squares-four",
        title: "A trade catalogue",
        note: "Products by catalogue number, with style counts and material, the way wholesale buyers read.",
        steps: [{ tab: true }, { run: '[data-k="catalogue"]' }],
      },
      {
        tab: "Proof",
        icon: "chart-bar",
        title: "Proof up front",
        note: "The numbers a buyer checks first sit on the home page, not on a buried about page.",
        steps: [{ tab: true }, { run: '[data-k="about"]' }],
      },
      {
        tab: "How it works",
        icon: "path",
        title: "What happens next",
        note: "Spec to shipped in four steps, so a first-time buyer knows what follows a request.",
        steps: [{ tab: true }, { run: '[data-k="process"]' }],
      },
      {
        tab: "Quote",
        icon: "clipboard-text",
        title: "Several products, one quote",
        note: "Each line with category, type, colour, quantity and a reference photo. That's how a wholesale order is described.",
        steps: [{ tab: true }, { run: '[data-k="quote"]' }],
      },
    ],
  },
};
