'use client';

import { useEffect, useState } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';
import { NewsCard } from '@/components/NewsCard';
import { NewsCardSkeleton } from '@/components/NewsCardSkeleton';
import { CategoryFilter } from '@/components/CategoryFilter';
import type { Article } from '@/types/news';

type Category = Article['category'] | 'all';

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);

    fetch(`/api/news?${params}`)
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  const filteredArticles = articles.filter(
    (article) =>
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-2">
            <NewspaperIcon className="text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">NTT News</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar notícias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>

        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {filteredArticles.length} notícia{filteredArticles.length !== 1 ? 's' : ''} encontrada
          {filteredArticles.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)
            : filteredArticles.map((article) => <NewsCard key={article.slug} article={article} />)}
        </div>

        {!isLoading && filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <NewspaperIcon sx={{ fontSize: 48 }} className="mb-3 opacity-40" />
            <p className="text-lg font-medium">Nenhuma notícia encontrada</p>
            <p className="text-sm">Tente outro termo ou categoria</p>
          </div>
        )}
      </main>
    </div>
  );
}
