'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-forest-400 hover:text-forest-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-forest-600 text-white'
              : 'border border-gray-200 text-gray-600 hover:border-forest-400 hover:text-forest-600'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-forest-400 hover:text-forest-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
