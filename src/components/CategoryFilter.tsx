'use client';

import type { Article } from '@/types/news';

type Category = Article['category'] | 'all';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'technology', label: 'Tecnologia' },
  { value: 'business', label: 'Negócios' },
  { value: 'sports', label: 'Esportes' },
  { value: 'entertainment', label: 'Entretenimento' },
  { value: 'science', label: 'Ciência' },
  { value: 'health', label: 'Saúde' },
];

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selected === value
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
