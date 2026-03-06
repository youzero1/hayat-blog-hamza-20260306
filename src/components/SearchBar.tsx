'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  initialValue = '',
  placeholder = 'Search posts...',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <svg
          className="absolute left-3.5 text-warm-400 w-4 h-4 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-2.5 border border-warm-300 rounded-xl bg-warm-50 text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 text-warm-400 hover:text-warm-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 bg-primary-500 hover:bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
