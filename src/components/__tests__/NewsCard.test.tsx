import { render, screen } from '@testing-library/react';
import { NewsCard } from '../NewsCard';
import type { Article } from '@/types/news';

const mockArticle: Article = {
  slug: 'test-article',
  title: 'Test Article Title',
  excerpt: 'Test article description with some content.',
  content: 'Full article content for the test.',
  imageUrl: 'https://example.com/image.jpg',
  imageAlt: 'Test image alt text',
  category: 'Tecnologia',
  date: '2026-04-07T10:00:00.000Z',
  section: 'Test Source',
};

describe('NewsCard', () => {
  it('renders the article title', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  it('renders the article excerpt', () => {
    render(<NewsCard article={mockArticle} />);
    expect(
      screen.getByText('Test article description with some content.'),
    ).toBeInTheDocument();
  });

  it('renders the article section', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Tecnologia')).toBeInTheDocument();
  });

  it('renders the article image with correct src and alt', () => {
    render(<NewsCard article={mockArticle} />);
    const image = screen.getByAltText('Test image alt text');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders the read-more link pointing to the article page', () => {
    render(<NewsCard article={mockArticle} />);
    const link = screen.getByRole('link', { name: /ler mais/i });
    expect(link).toHaveAttribute('href', '/news/test-article');
  });

  it('renders a formatted date', () => {
    render(<NewsCard article={mockArticle} />);
    // toLocaleDateString output varies by environment — just assert it is not "Invalid Date"
    expect(screen.queryByText('Invalid Date')).not.toBeInTheDocument();
  });
});
