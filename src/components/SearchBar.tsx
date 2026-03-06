'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search articles...', defaultValue = '' }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border border-earth-200 rounded-lg px-4 py-2 text-sm text-earth-800 focus:outline-none focus:ring-2 focus:ring-hayat-400"
      />
      <button
        type="submit"
        className="bg-hayat-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hayat-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
