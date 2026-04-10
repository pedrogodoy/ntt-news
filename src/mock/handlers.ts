import { http, HttpResponse } from 'msw';
import { noticias } from './data-news';

export const handlers = [
  http.get('/api/news', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    const filtered =
      category && category !== 'all'
        ? noticias.filter((n) => n.category === category)
        : noticias;

    return HttpResponse.json({
      articles: filtered,
      totalResults: filtered.length,
    });
  }),
];
