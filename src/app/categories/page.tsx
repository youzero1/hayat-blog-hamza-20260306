import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Category } from '@/entities/Category';
import { Post } from '@/entities/Post';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const ds = await getDataSource();
  const categoryRepo = ds.getRepository(Category);
  const postRepo = ds.getRepository(Post);

  const categories = await categoryRepo.find({ order: { name: 'ASC' } });

  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => {
      const count = await postRepo.count({
        where: { isPublished: true, categoryId: cat.id },
      });
      return { ...cat, postCount: count };
    })
  );

  const categoryEmojis: Record<string, string> = {
    lifestyle: '🌿',
    technology: '💻',
    fashion: '👗',
    'health-wellness': '🧘',
    'home-living': '🏠',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-warm-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Categories
        </h1>
        <p className="text-warm-600 text-lg">Explore our content by topic</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCount.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="bg-white rounded-2xl p-8 shadow-sm border border-warm-100 hover:shadow-md hover:border-primary-200 transition-all group"
          >
            <div className="text-5xl mb-4">{categoryEmojis[cat.slug] || '📂'}</div>
            <h2 className="text-xl font-bold text-warm-900 group-hover:text-primary-600 mb-2">
              {cat.name}
            </h2>
            {cat.description && (
              <p className="text-warm-500 text-sm mb-4 leading-relaxed">{cat.description}</p>
            )}
            <div className="text-sm font-medium text-primary-600">
              {cat.postCount} post{cat.postCount !== 1 ? 's' : ''}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
