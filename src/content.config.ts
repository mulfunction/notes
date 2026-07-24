import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Helper to sanitize tags (remove leading # if present in Obsidian tags)
const tagSchema = z.array(z.string()).default([]).transform((tags) => 
  tags.map(t => t.replace(/^#/, ''))
);

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().default(''),
    date: z.coerce.date().optional(),
    created: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    tags: tagSchema,
    category: z.string().default('Notes'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }).transform((data) => ({
    ...data,
    date: data.date || data.created || new Date(),
    title: data.title || 'Untitled Note',
  })),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reports' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().default(''),
    date: z.coerce.date().optional(),
    created: z.coerce.date().optional(),
    weekNumber: z.number().optional(),
    tags: tagSchema,
    category: z.string().default('Weekly Report'),
    draft: z.boolean().default(false),
  }).transform((data) => ({
    ...data,
    date: data.date || data.created || new Date(),
    title: data.title || 'Weekly Report',
  })),
});

export const collections = { notes, reports };
