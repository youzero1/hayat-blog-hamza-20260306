import Link from 'next/link';
import { CategoryType } from '@/types';

interface SidebarProps {
  categories: CategoryType[];
}

const categoryColors: Record<string, string> = {
  technology: '💻',
  lifestyle: '🌿',
  travel: '✈️',
  'food-recipes': '🍽️',
};

export default function Sidebar({ categories }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Categories Widget */}
      <div className="bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-warm-100">
          <h3 className="font-bold text-warm-900">Browse Categories</h3>
        </div>
        <div className="p-3">
          {categories.length > 0 ? (
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-warm-50 group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{categoryColors[category.slug] || '📁'}</span>
                      <span className="text-sm font-medium text-warm-700 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs text-warm-400 bg-warm-100 px-2 py-0.5 rounded-full">
                      {category.postCount || 0}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-warm-400 px-3 py-2">No categories yet.</p>
          )}
        </div>
        <div className="px-5 py-3 border-t border-warm-100">
          <Link
            href="/categories"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 group"
          >
            View all categories
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
