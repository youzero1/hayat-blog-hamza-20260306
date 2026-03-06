'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  paramName?: string;
}

export default function CategoryFilter({
  categories,
  selected,
  paramName = 'category',
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set(paramName, slug);
      } else {
        params.delete(paramName);
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams, paramName]
  );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleSelect('')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !selected
            ? 'bg-forest-600 text-white'
            : 'bg-white border border-gray-200 text-gray-600 hover:border-forest-400 hover:text-forest-600'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleSelect(cat.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat.slug
              ? 'bg-forest-600 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-forest-400 hover:text-forest-600'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
