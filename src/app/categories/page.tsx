import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all categories on Hayat Blog — from lifestyle and health to travel and technology.',
};

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch {
    return [];
  }
}

const categoryIcons: Record<string, string> = {
  lifestyle: '🌿',
  'health-wellness': '💚',
  technology: '💻',
  travel: '✈️',
  'food-recipes': '🍽️',
};

const categoryColors: Record<string, string> = {
  lifestyle: 'from-green-400 to-emerald-600',
  'health-wellness': 'from-teal-400 to-cyan-600',
  technology: 'from-blue-400 to-indigo-600',
  travel: 'from-orange-400 to-amber-600',
  'food-recipes': 'from-red-400 to-rose-600',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="py-12 px-4">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest-800 mb-4">
            Categories
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            Find the topics that matter most to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: any) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <div className="card group cursor-pointer h-full">
                <div className={`bg-gradient-to-br ${categoryColors[category.slug] || 'from-gray-400 to-gray-600'} p-10 text-center text-white`}>
                  <span className="text-5xl block mb-3">
                    {categoryIcons[category.slug] || '📌'}
                  </span>
                  <h2 className="text-2xl font-serif font-bold group-hover:underline">
                    {category.name}
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {category.description || 'Explore all posts and products in this category.'}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="badge-forest">
                      {category._count?.posts ?? category.postCount ?? 0} Posts
                    </span>
                    <span className="badge-gold">
                      {category._count?.products ?? category.productCount ?? 0} Products
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
