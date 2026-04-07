'use client';

import { useState } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';
import { NewsCard } from '@/components/NewsCard';
import { NewsCardSkeleton } from '@/components/NewsCardSkeleton';
import { CategoryFilter } from '@/components/CategoryFilter';
import type { Article } from '@/types/news';

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Next.js 15 traz melhorias significativas de performance',
    description:
      'A nova versão do framework Next.js chega com Turbopack estável, melhorias no caching e novas APIs de otimização que prometem reduzir o tempo de build em até 70%.',
    url: 'https://example.com/nextjs-15',
    imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Tech',
    source: 'Tech News',
    publishedAt: '2026-04-07T10:00:00.000Z',
    category: 'technology',
  },
  {
    id: '2',
    title: 'Mercado de ações atinge recorde histórico em abril',
    description:
      'Bolsas de valores ao redor do mundo registram alta expressiva impulsionadas por resultados corporativos acima das expectativas e queda nos juros globais.',
    url: 'https://example.com/stock-market',
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Business',
    source: 'Economia Hoje',
    publishedAt: '2026-04-07T08:30:00.000Z',
    category: 'business',
  },
  {
    id: '3',
    title: 'Descoberta científica pode revolucionar tratamento do câncer',
    description:
      'Pesquisadores da USP anunciam um novo mecanismo de detecção precoce baseado em inteligência artificial com 97% de precisão em testes clínicos.',
    url: 'https://example.com/cancer-research',
    imageUrl: 'https://placehold.co/600x400/a855f7/ffffff?text=Science',
    source: 'Ciência BR',
    publishedAt: '2026-04-06T15:00:00.000Z',
    category: 'science',
  },
  {
    id: '4',
    title: 'Brasil garante vaga nas semifinais da Copa do Mundo',
    description:
      'A seleção brasileira venceu por 3x1 e avançou para a fase semifinal do torneio, com destaque para o hat-trick de Vinicius Jr.',
    url: 'https://example.com/brazil-soccer',
    imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Sports',
    source: 'Esporte Total',
    publishedAt: '2026-04-06T22:00:00.000Z',
    category: 'sports',
  },
  {
    id: '5',
    title: 'Novo estudo aponta benefícios da dieta mediterrânea para longevidade',
    description:
      'Pesquisa acompanhou 10 mil pessoas por 20 anos e concluiu que hábitos alimentares mediterrâneos reduzem em 35% o risco de doenças cardiovasculares.',
    url: 'https://example.com/mediterranean-diet',
    imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Health',
    source: 'Saúde & Vida',
    publishedAt: '2026-04-05T12:00:00.000Z',
    category: 'health',
  },
  {
    id: '6',
    title: 'Festival de cinema de Cannes anuncia filmes brasileiros na seleção oficial',
    description:
      'Três produções brasileiras disputarão a Palma de Ouro neste ano, o maior número de representações do país no festival em toda sua história.',
    url: 'https://example.com/cannes-brazil',
    imageUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=Entertainment',
    source: 'Cultura Viva',
    publishedAt: '2026-04-05T09:00:00.000Z',
    category: 'entertainment',
  },
];

type Category = Article['category'] | 'all';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading] = useState(false);

  const filteredArticles = MOCK_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            : filteredArticles.map((article) => <NewsCard key={article.id} article={article} />)}
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
