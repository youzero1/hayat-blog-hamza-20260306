import Link from 'next/link';
import { CategoryType } from '@/types';

interface CategoryBadgeProps {
  category: CategoryType;
  className?: string;
}

const categoryColorMap: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  lifestyle: 'bg-sage-100 text-sage-700 hover:bg-sage-200',
  travel: 'bg-sky-100 text-sky-700 hover:bg-sky-200',
  'food-recipes': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
};

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const colorClass =
    categoryColorMap[category.slug] || 'bg-warm-100 text-warm-700 hover:bg-warm-200';

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full transition-colors ${colorClass} ${className}`}
    >
      {category.name}
    </Link>
  );
}
