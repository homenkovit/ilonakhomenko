import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articleSchema = z.object({
	articleId: z.string().uuid(),
	title: z.string(),
	pubDate: z.date(),
	description: z.string().optional(),
});

const testSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
});

const articlesRu = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/articles/ru" }),
	schema: articleSchema,
});

const articlesEn = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/articles/en" }),
	schema: articleSchema,
});

const testsRu = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/tests/ru" }),
	schema: testSchema,
});

const testsEn = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/tests/en" }),
	schema: testSchema,
});

export const collections = { articlesRu, articlesEn, testsRu, testsEn };
