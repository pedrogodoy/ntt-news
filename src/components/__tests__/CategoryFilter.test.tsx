import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '../CategoryFilter';

describe('CategoryFilter', () => {
  it('renders all category buttons', () => {
    render(<CategoryFilter selected="all" onChange={() => {}} />);
    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Tecnologia')).toBeInTheDocument();
    expect(screen.getByText('Negócios')).toBeInTheDocument();
    expect(screen.getByText('Esportes')).toBeInTheDocument();
    expect(screen.getByText('Entretenimento')).toBeInTheDocument();
    expect(screen.getByText('Ciência')).toBeInTheDocument();
    expect(screen.getByText('Saúde')).toBeInTheDocument();
  });

  it('highlights the selected category', () => {
    render(<CategoryFilter selected="technology" onChange={() => {}} />);
    const techButton = screen.getByText('Tecnologia');
    expect(techButton).toHaveClass('bg-blue-600');
  });

  it('calls onChange with the correct category value', () => {
    const handleChange = jest.fn();
    render(<CategoryFilter selected="all" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Tecnologia'));
    expect(handleChange).toHaveBeenCalledWith('technology');
  });
});
