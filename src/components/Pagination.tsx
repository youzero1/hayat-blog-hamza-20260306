interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-earth-200 text-earth-600 hover:bg-earth-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            p === currentPage
              ? 'bg-hayat-600 text-white border-hayat-600'
              : 'border-earth-200 text-earth-600 hover:bg-earth-50'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-earth-200 text-earth-600 hover:bg-earth-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
