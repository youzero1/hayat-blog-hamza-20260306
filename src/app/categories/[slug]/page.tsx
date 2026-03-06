import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostType, CategoryType } from '@/types';

async function getCategoryBySlug(slug: string): Promise<CategoryType | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories?slug=${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

async function getPostsByCategory(slug: string): Promise<PostType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?category=${slug}&published=true&limit=20`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) return { title: 'Category Not Found' };
  return {
    title: `${cat.name} Articles`,
    description: cat.description || `Browse all ${cat.name} articles on Hayat Blog`,
  };
}

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700',
  lifestyle: 'bg-purple-100 text-purple-700',
  travel: 'bg-green-100 text-green-700',
  food: 'bg-orange-100 text-orange-700',
  health: 'bg-red-100 text-red-700',
  business: 'bg-yellow-100 text-yellow-700',
};

const categoryGradients: Record<string, string> = {
  technology: 'from-blue-600 to-blue-800',
  lifestyle: 'from-purple-600 to-purple-800',
  travel: 'from-green-600 to-green-800',
  food: 'from-orange-600 to-orange-800',
  health: 'from-red-500 to-red-700',
  business: 'from-yellow-600 to-yellow-800',
};

const categoryIcons: Record<string, string> = {
  technology: '💻',
  lifestyle: '✨',
  travel: '✈️',
  food: '🍽️',
  health: '💚',
  business: '📈',
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, posts] = await Promise.all([
    getCategoryBySlug(params.slug),
    getPostsByCategory(params.slug),
  ]);

  if (!category) notFound();

  const gradient = categoryGradients[params.slug] || 'from-hayat-600 to-hayat-800';
  const colorClass = categoryColors[params.slug] || 'bg-gray-100 text-gray-700';

  return (
    <div className="min-h-screen bg-hayat-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">{categoryIcons[params.slug] || '📝'}</div>
          <h1 className="text-4xl font-bold mb-3">{category.name}</h1>
          <p className="text-white/80 max-w-xl mx-auto">{category.description}</p>
          <p className="mt-3 text-white/60 text-sm">{posts.length} articles</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-earth-500 text-lg">No articles in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-xl overflow-hidden shadow-sm blog-card-hover h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.thumbnailUrl || 'https://picsum.photos/seed/default/400/250'}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
                      {category.name}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-earth-900 text-lg leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-earth-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-earth-400 border-t border-earth-100 pt-3">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author?.avatarUrl || 'https://picsum.photos/seed/avatar/32/32'}
                          alt={post.author?.name || 'Author'}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="font-medium text-earth-600">{post.author?.name}</span>
                      </div>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-hayat-600 hover:text-hayat-700 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}
