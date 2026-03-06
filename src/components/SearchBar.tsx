'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(value)}
        placeholder="Search posts..."
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent bg-white"
      />
      {value && (
        <button
          onClick={() => { setValue(''); handleSearch(''); }}
          className="absolute inset-y-0 right-12 flex items-center pr-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
      <button
        onClick={() => handleSearch(value)}
        className="absolute inset-y-0 right-0 flex items-center px-4 bg-forest-600 text-white rounded-r-xl hover:bg-forest-700 transition-colors"
      >
        Go
      </button>
    </div>
  );
}
