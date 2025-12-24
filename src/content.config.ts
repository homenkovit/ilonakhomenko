import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/articles" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
    }),
});

export const collections = { articles };
