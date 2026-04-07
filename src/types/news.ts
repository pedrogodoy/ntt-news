import { z } from 'zod';

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  url: z.string().url(),
  imageUrl: z.string().url().optional(),
  source: z.string(),
  publishedAt: z.string().datetime(),
  category: z.enum(['technology', 'business', 'sports', 'entertainment', 'science', 'health']),
});

export type Article = z.infer<typeof ArticleSchema>;

export const NewsResponseSchema = z.object({
  articles: z.array(ArticleSchema),
  totalResults: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type NewsResponse = z.infer<typeof NewsResponseSchema>;
