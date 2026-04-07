import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import type { Article } from '@/types/news';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      {article.imageUrl && (
        <div className="h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <CategoryIcon sx={{ fontSize: 12 }} />
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <AccessTimeIcon sx={{ fontSize: 12 }} />
            {formattedDate}
          </span>
        </div>

        <h2 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 dark:text-gray-50">
          {article.title}
        </h2>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {article.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {article.source}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            Ler mais
            <OpenInNewIcon sx={{ fontSize: 12 }} />
          </a>
        </div>
      </div>
    </article>
  );
}
