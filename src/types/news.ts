import { z } from 'zod';

export const ArticleSchema = z.object({
  slug: z.string(),
  title: z.string().min(1),
  excerpt: z.string(),
  content: z.string(),
  imageUrl: z.url(),
  imageAlt: z.string(),
  category: z.enum(['Tecnologia', 'Política', 'Esportes', 'Money', 'Mundo', 'Agro', 'Cultura']),
  date: z.string(),
  section: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const NewsResponseSchema = z.object({
  articles: z.array(ArticleSchema),
  totalResults: z.number(),
});

export type NewsResponse = z.infer<typeof NewsResponseSchema>;
