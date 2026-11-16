/* The story each interactive prototype tells when it plays on its own.
   Each chapter's steps are the clicks that produce the state its caption
   describes. Selectors point into the widget's own markup. */
import type { Chapter } from "../components/StoryDirector.astro";

export interface Story {
  chapters: Chapter[];
  reset?: string;
  accent?: string;
}

export const stories: Record<string, Story> = {
  "before-after": {
    accent: "#a87810",
    reset: '[data-open="0"]',
    chapters: [
      {
        title: "The site an agent built",
        note: "Everything a traveller needed was on the page, at the same volume. A rental template, with nothing that said pilgrims.",
        steps: [{ click: '[data-show="before"]' }],
      },
      {
        title: "Same content, reshaped",
        note: "Nothing removed. The same backend and routes, in an order a pilgrim's family actually asks in, with a voice that fits the journey.",
        steps: [{ click: '[data-show="after"]' }],
      },
      {
        title: "One place to explore",
        note: "Airport, Makkah to Madinah, Ziyarat: the routes people book most, one swipe apart.",
        steps: [{ click: "[data-next]", settle: 200 }, { click: "[data-next]" }],
      },
      {
        title: "Vehicles by people and bags",
        note: "Families choose by how many travel and how much they carry, not by car model.",
        steps: [{ point: ".car" }],
      },
      {
        title: "Reasons, then proof",
        note: "Three short reasons a family can scan, then reviews from travellers in their own words.",
        steps: [{ click: '[data-open="1"]' }, { click: '[data-open="2"]' }],
      },
    ],
  },

  "record-chain": {
    accent: "#b07a12",
    reset: "[data-reset]",
    chapters: [
      {
        title: "Every record ties back",
        note: "Evaluation, plan of care, daily notes, progress: one chain. Each record exists because the one before it does.",
        steps: [{ point: ".node.done" }, { point: ".node.poc" }],
      },
      {
        title: "She tries to start a note",
        note: "The plan isn't certified yet, so the daily note is locked, and the screen says why instead of failing at audit later.",
        steps: [{ click: "[data-new]", settle: 150 }, { click: "[data-pick]", settle: 200 }],
      },
      {
        title: "The fix is one click away",
        note: "Request certification right from the record. The physician signs, and the chain turns gold.",
        steps: [{ click: "[data-cert]", settle: 1900 }],
      },
      {
        title: "Now the note opens",
        note: "Visit 1 of 12 starts, already linked to the certified plan. Nothing to remember, nothing to chase.",
        steps: [{ click: "[data-new]", settle: 150 }, { click: "[data-pick]" }],
      },
    ],
  },

  copilot: {
    accent: "#4a4ad6",
    reset: "[data-reset-cp]",
    chapters: [
      {
        title: "Say it once",
        note: "The clinician taps the mic and asks for a breathing test. The copilot hears it and finds Arthur.",
        steps: [{ click: "[data-mic]", settle: 2700 }],
      },
      {
        title: "Confirm, don't type",
        note: "One tap confirms the patient, and it finds the spirometer nearby on its own.",
        steps: [{ click: '[data-go="device"]', settle: 2000 }],
      },
      {
        title: "Only what's missing",
        note: "It asks for the one thing it can't know: his height. Everything else is already filled in.",
        steps: [{ click: '[data-go="details"]' }],
      },
      {
        title: "Correct it by voice",
        note: "Change a value the way you'd say it. The form updates; the clinician doesn't hunt for a field.",
        steps: [{ click: '[data-go="edit"]', settle: 200 }, { click: '[data-go="details-set"]' }],
      },
      {
        title: "You stay in charge",
        note: "Nothing starts until the clinician says so. Then the test runs, and every step can be undone.",
        steps: [{ click: '[data-go="ready"]', settle: 200 }, { click: '[data-go="done"]' }],
      },
    ],
  },

  "agent-console": {
    accent: "#0f7a6a",
    reset: "[data-reset]",
    chapters: [
      {
        title: "Five agents, one screen",
        note: "Intake to denials, laid out as a pipeline with counts. Anyone can see where work is piling up without asking a bot.",
        steps: [{ point: ".stages" }, { point: ".queue" }],
      },
      {
        title: "A loop gets a person",
        note: "A claim denied three times stops retrying and raises its hand, with what was tried and why it failed.",
        steps: [{ point: ".alert.sw-loop" }, { click: "[data-open]" }],
      },
      {
        title: "Approve the fix",
        note: "The agent suggests a fix with its confidence shown. One click resubmits, logged under the person's name.",
        steps: [{ click: "[data-approve]" }],
      },
      {
        title: "Or take it over",
        note: "Not convinced? Take the claim. The agents stop touching it until it's handed back.",
        steps: [{ click: "[data-undo]", settle: 150 }, { click: "[data-open]", settle: 150 }, { click: "[data-take]" }],
      },
    ],
  },

  "site-tour": {
    accent: "#1a1a1a",
    chapters: [
      {
        title: "One promise",
        note: "The home page says what they make and gives one way in: view the collection or ask for a quote.",
        steps: [{ click: '[data-k="home"]' }],
      },
      {
        title: "Browse like a buyer",
        note: "A real recording: hero, category browse, then a product with its variants.",
        steps: [{ click: '[data-k="walk"]' }],
      },
      {
        title: "A trade catalogue",
        note: "Products by catalogue number, with style counts and material, the way wholesale buyers read.",
        steps: [{ click: '[data-k="catalogue"]' }],
      },
      {
        title: "Proof up front",
        note: "The numbers a buyer checks first sit on the home page, not on a buried about page.",
        steps: [{ click: '[data-k="about"]' }],
      },
      {
        title: "What happens next",
        note: "Spec to shipped in four steps, so a first-time buyer knows what follows a request.",
        steps: [{ click: '[data-k="process"]' }],
      },
      {
        title: "Several products, one quote",
        note: "Each line with category, type, colour, quantity and a reference photo. That's how a wholesale order is described.",
        steps: [{ click: '[data-k="quote"]' }],
      },
    ],
  },
};
