import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    highlight: z.string(),
    accentVar: z.string(),
    status: z.string(),
    stack: z.array(z.string()),
    link: z.string().url().optional(),
    linkLabel: z.string().optional(),
    order: z.number(),
    category: z.enum(["ai-adapted", "product-design"]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const cases = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    titleRest: z.string().optional(),
    angle: z.string(),
    order: z.number(),
    meta: z.array(z.object({ label: z.string(), value: z.string() })),
    ndaRecreated: z.boolean(),
    widget: z.enum(["before-after", "record-chain", "copilot", "agent-console", "density", "tour"]),
    widgetIntro: z.string(),
    stats: z.array(z.object({ value: z.string(), unit: z.string(), label: z.string() })).optional(),
    problem: z.array(z.string()),
    constraints: z.array(z.string()),
    decisionsIntro: z.string().optional(),
    decisions: z.array(z.object({ title: z.string(), body: z.string() })),
    states: z.array(z.object({ name: z.string(), note: z.string() })),
    evidence: z.array(z.string()),
    measures: z.array(z.string()),
    next: z.string(),
  }),
});

export const collections = { work, cases };
