import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const POST_CATEGORIES = ['Rehberlik', 'Denemeler', 'Kitap ve sinema'] as const;

const yazilar = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/yazilar' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(POST_CATEGORIES),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    coverCaption: z.string().optional()
  })
});

const duygular = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/duygular' }),
  schema: z.object({
    term: z.string(),
    handwrittenLine: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    location: z.string().optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional()
  })
});

const kitaplik = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/kitaplik' }),
  schema: z.object({
    title: z.string(),
    creator: z.string(),
    kind: z.enum(['Kitap', 'Film']),
    audience: z.enum(['Genel', 'Öğrenci', 'Veli']),
    status: z.enum(['Okundu', 'Şu an okunuyor', 'İzlendi']),
    quote: z.string().optional(),
    note: z.string(),
    order: z.number().default(100)
  })
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string()
  })
});

export const collections = {
  yazilar,
  duygular,
  kitaplik,
  pages
};
