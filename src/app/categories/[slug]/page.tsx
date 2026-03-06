import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { PostType, CategoryType } from '@/types';

async function getCategoryPosts(
  slug: string,
  page: number = 1
): Promise<{ posts: PostType[]; total: number; totalPages: number; category?: CategoryType }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/posts?category=${slug}&page=${page}&limit=9`,
      { cache: 'no-store' }
    );
    if (!res.ok) return { posts: [], total: 0, totalPages: 0 };
    const data = await res.json();
    return {
      posts: data.data || [],
      total: data.total || 0,
      totalPages: data.totalPages || 0,
      category: data.category,
    };
  } catch {
    return { posts: [], total: 0, totalPages: 0 };
  }
}

async function getCategory(slug: string): Promise<CategoryType | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return null;
    const categories: CategoryType[] = await res.json();
    return categories.find((c) => c.slug === slug) || null;
  } catch {
    return null;
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const [category, { posts, total, totalPages }] = await Promise.all([
    getCategory(params.slug),
    getCategoryPosts(params.slug, page),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-warm-500 mb-8">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/categories" className="hover:text-primary-600 transition-colors">Categories</Link>
        <span>›</span>
        <span className="text-warm-700">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-gradient-to-br from-warm-900 to-sage-800 text-white rounded-2xl p-8 md:p-12 mb-10">
        <span className="text-primary-300 text-sm font-semibold uppercase tracking-wider">Category</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-3">{category.name}</h1>
        {category.description && (
          <p className="text-warm-300 text-lg max-w-2xl">{category.description}</p>
        )}
        <div className="mt-4 text-warm-400 text-sm">
          {total} {total === 1 ? 'post' : 'posts'} in this category
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl={`/categories/${params.slug}`}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-warm-700 mb-2">No posts yet</h3>
          <p className="text-warm-500">No posts have been published in this category yet.</p>
          <Link href="/posts" className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium">
            Browse all posts →
          </Link>
        </div>
      )}
    </div>
  );
}
