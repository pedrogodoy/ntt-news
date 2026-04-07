import { render, screen } from '@testing-library/react';
import { NewsCard } from '../NewsCard';
import type { Article } from '@/types/news';

const mockArticle: Article = {
  id: '1',
  title: 'Test Article Title',
  description: 'Test article description with some content.',
  url: 'https://example.com/article',
  imageUrl: 'https://example.com/image.jpg',
  source: 'Test Source',
  publishedAt: '2026-04-07T10:00:00.000Z',
  category: 'technology',
};

describe('NewsCard', () => {
  it('renders the article title', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  it('renders the article description', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Test article description with some content.')).toBeInTheDocument();
  });

  it('renders the article source', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('technology')).toBeInTheDocument();
  });

  it('renders the article image when imageUrl is provided', () => {
    render(<NewsCard article={mockArticle} />);
    const image = screen.getByAltText('Test Article Title');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('does not render image when imageUrl is absent', () => {
    const articleWithoutImage = { ...mockArticle, imageUrl: undefined };
    render(<NewsCard article={articleWithoutImage} />);
    expect(screen.queryByAltText('Test Article Title')).not.toBeInTheDocument();
  });

  it('renders the read-more link with correct href', () => {
    render(<NewsCard article={mockArticle} />);
    const link = screen.getByRole('link', { name: /ler mais/i });
    expect(link).toHaveAttribute('href', 'https://example.com/article');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
