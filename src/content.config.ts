import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'lowercase letters, digits and dashes only'),
    tagline: z.string(),
    status: z.enum(['live', 'wip', 'archived']),
    /** Full URL of the deployed app, e.g. https://timemesh.bleedcode.space */
    url: z.url().optional(),
    /** GitHub "owner/name". */
    repo: z.string().regex(/^[\w.-]+\/[\w.-]+$/, 'use owner/name').optional(),
    stack: z.array(z.string()).min(1),
    kind: z.enum(['personal', 'academic']),
    featured: z.boolean(),
    order: z.number().int(),
    monogram: z.string().min(1).max(3),
    /** Public path to a square logo, e.g. /logos/meium.svg */
    logo: z.string().optional(),
    /** Optional screenshots for the detail page (public paths). */
    screenshots: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
  }),
});

export const collections = { projects };
