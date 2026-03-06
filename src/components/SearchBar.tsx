'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialValue?: string;
}

export default function SearchBar({ initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/blog');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-1 max-w-md">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2 border border-warm-200 rounded-full focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-white"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400">🔍</span>
      </div>
      <button
        type="submit"
        className="bg-primary-600 text-white px-5 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors text-sm"
      >
        Search
      </button>
    </form>
  );
}
