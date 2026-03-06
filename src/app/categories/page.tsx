import Link from 'next/link';
import { CategoryType } from '@/types';

async function getCategories(): Promise<CategoryType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

const categoryColors = [
  'from-blue-500 to-indigo-600',
  'from-green-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-sky-600',
];

const categoryIcons: Record<string, string> = {
  technology: '💻',
  lifestyle: '🌿',
  travel: '✈️',
  'food-recipes': '🍽️',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-warm-900 mb-4">Categories</h1>
        <p className="text-warm-500 text-lg max-w-xl mx-auto">
          Browse posts by topic. Find the subjects that interest you most.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`h-32 bg-gradient-to-br ${categoryColors[idx % categoryColors.length]} flex items-center justify-center`}
                >
                  <span className="text-5xl">
                    {categoryIcons[category.slug] || '📚'}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-warm-500 text-sm mb-3 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-warm-400 bg-warm-100 px-3 py-1 rounded-full">
                      {category.postCount || 0} posts
                    </span>
                    <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Browse →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-warm-700 mb-2">No categories yet</h3>
          <p className="text-warm-500">Categories will appear here once posts are created.</p>
        </div>
      )}
    </div>
  );
}
