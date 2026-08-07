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
  }),
});

export const collections = { work };
