'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
  );

  const renderPage = (page: number) => {
    const isActive = page === currentPage;
    const className = `w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-primary-500 text-white shadow-sm'
        : 'text-warm-600 hover:bg-warm-100 hover:text-warm-900'
    }`;

    if (onPageChange) {
      return (
        <button key={page} onClick={() => onPageChange(page)} className={className}>
          {page}
        </button>
      );
    }

    return (
      <Link
        key={page}
        href={`${baseUrl}?page=${page}`}
        className={className}
      >
        {page}
      </Link>
    );
  };

  const renderNav = (direction: 'prev' | 'next') => {
    const isPrev = direction === 'prev';
    const targetPage = isPrev ? currentPage - 1 : currentPage + 1;
    const disabled = isPrev ? currentPage <= 1 : currentPage >= totalPages;
    const label = isPrev ? '←' : '→';

    const className = `w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
      disabled
        ? 'text-warm-300 cursor-not-allowed'
        : 'text-warm-600 hover:bg-warm-100 hover:text-warm-900'
    }`;

    if (disabled) {
      return <span className={className}>{label}</span>;
    }

    if (onPageChange) {
      return (
        <button onClick={() => onPageChange(targetPage)} className={className}>
          {label}
        </button>
      );
    }

    return (
      <Link href={`${baseUrl}?page=${targetPage}`} className={className}>
        {label}
      </Link>
    );
  };

  let lastRendered = 0;
  const elements: React.ReactNode[] = [];

  elements.push(renderNav('prev'));

  visiblePages.forEach((page) => {
    if (lastRendered && page - lastRendered > 1) {
      elements.push(
        <span key={`ellipsis-${page}`} className="w-9 h-9 flex items-center justify-center text-warm-400 text-sm">
          ...
        </span>
      );
    }
    elements.push(renderPage(page));
    lastRendered = page;
  });

  elements.push(renderNav('next'));

  return (
    <div className="flex items-center justify-center gap-1">
      {elements}
    </div>
  );
}
