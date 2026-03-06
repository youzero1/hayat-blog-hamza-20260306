'use client';

import { CategoryType } from '@/types';

interface CategoryFilterProps {
  categories: CategoryType[];
  selected: string;
  onChange: (slug: string) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !selected
            ? 'bg-hayat-600 text-white'
            : 'bg-white text-earth-600 hover:bg-hayat-50 border border-earth-200'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.slug)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === cat.slug
              ? 'bg-hayat-600 text-white'
              : 'bg-white text-earth-600 hover:bg-hayat-50 border border-earth-200'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
