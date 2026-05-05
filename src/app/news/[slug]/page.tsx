'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useMSWReady } from '@/components/MSWProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import type { Article } from '@/types/news';


export default function ArticlePage() {
  const mswReady = useMSWReady();
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!mswReady) return;
    fetch(`/api/news/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setArticle(data);
      })
      .finally(() => setIsLoading(false));
  }, [slug, mswReady]);

  const formattedDate = article
    ? new Date(article.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          Voltar
        </Link>
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-64 w-full rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
              ))}
            </div>
          </div>
        )}

        {notFound && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <NewspaperIcon sx={{ fontSize: 48 }} className="mb-3 opacity-40" />
            <p className="text-lg font-medium">Artigo não encontrado</p>
          </div>
        )}

        {article && (
          <article className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <CategoryIcon sx={{ fontSize: 12 }} />
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <AccessTimeIcon sx={{ fontSize: 12 }} />
                  {formattedDate}
                </span>
                <span>{article.section}</span>
              </div>
              <h1 className="text-2xl font-bold leading-snug text-gray-900 dark:text-white sm:text-3xl">
                {article.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{article.excerpt}</p>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <img
                src={article.imageUrl}
                alt={article.imageAlt}
                className="h-72 w-full object-cover sm:h-96"
              />
            </div>

            <div className="prose prose-gray max-w-none dark:prose-invert">
              {article.content.split('\n').map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ) : null,
              )}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
