import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '../CategoryFilter';

describe('CategoryFilter', () => {
  it('renders all category buttons', () => {
    render(<CategoryFilter selected="all" onChange={() => {}} />);
    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Tecnologia')).toBeInTheDocument();
    expect(screen.getByText('Política')).toBeInTheDocument();
    expect(screen.getByText('Esportes')).toBeInTheDocument();
    expect(screen.getByText('Money')).toBeInTheDocument();
    expect(screen.getByText('Mundo')).toBeInTheDocument();
    expect(screen.getByText('Agro')).toBeInTheDocument();
    expect(screen.getByText('Cultura')).toBeInTheDocument();
  });

  it('highlights the selected category', () => {
    render(<CategoryFilter selected="Tecnologia" onChange={() => {}} />);
    expect(screen.getByText('Tecnologia')).toHaveClass('bg-blue-600');
  });

  it('does not highlight unselected categories', () => {
    render(<CategoryFilter selected="Tecnologia" onChange={() => {}} />);
    expect(screen.getByText('Política')).not.toHaveClass('bg-blue-600');
  });

  it('highlights "Todas" when selected is "all"', () => {
    render(<CategoryFilter selected="all" onChange={() => {}} />);
    expect(screen.getByText('Todas')).toHaveClass('bg-blue-600');
  });

  it('calls onChange with the correct category value', () => {
    const handleChange = jest.fn();
    render(<CategoryFilter selected="all" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Tecnologia'));
    expect(handleChange).toHaveBeenCalledWith('Tecnologia');
  });

  it('calls onChange with "all" when clicking "Todas"', () => {
    const handleChange = jest.fn();
    render(<CategoryFilter selected="Política" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Todas'));
    expect(handleChange).toHaveBeenCalledWith('all');
  });
});
