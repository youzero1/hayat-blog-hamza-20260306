import Link from 'next/link';
import FeaturedPost from '@/components/FeaturedPost';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import Newsletter from '@/components/Newsletter';
import Pagination from '@/components/Pagination';
import { PostType, CategoryType } from '@/types';

async function getFeaturedPosts(): Promise<PostType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?featured=true&limit=3`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function getLatestPosts(page: number = 1): Promise<{ posts: PostType[]; totalPages: number }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?page=${page}&limit=6`, {
      cache: 'no-store',
    });
    if (!res.ok) return { posts: [], totalPages: 0 };
    const data = await res.json();
    return { posts: data.data || [], totalPages: data.totalPages || 0 };
  } catch {
    return { posts: [], totalPages: 0 };
  }
}

async function getCategories(): Promise<CategoryType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const [featuredPosts, { posts: latestPosts, totalPages }, categories] = await Promise.all([
    getFeaturedPosts(),
    getLatestPosts(page),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-900 via-warm-800 to-sage-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-primary-400/30">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
            Welcome to Hayat Blog
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Stories That
            <span className="text-primary-400"> Inspire</span>
          </h1>
          <p className="text-xl md:text-2xl text-warm-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore thoughtful articles on technology, lifestyle, travel, and culinary arts.
            A place where ideas come alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/posts"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Browse All Posts
            </Link>
            <Link
              href="/categories"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold text-lg border border-white/20 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-warm-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-primary-600 text-sm font-semibold uppercase tracking-wider">Featured</span>
                <h2 className="text-3xl font-serif font-bold text-warm-900 mt-1">Editor\'s Picks</h2>
              </div>
              <Link
                href="/posts"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1 group"
              >
                View all
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts[0] && (
                <div className="lg:row-span-2">
                  <FeaturedPost post={featuredPosts[0]} large />
                </div>
              )}
              {featuredPosts.slice(1).map((post) => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts + Sidebar */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-primary-600 text-sm font-semibold uppercase tracking-wider">Latest</span>
                  <h2 className="text-3xl font-serif font-bold text-warm-900 mt-1">Recent Posts</h2>
                </div>
              </div>

              {latestPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {latestPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="mt-10">
                      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/" />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 text-warm-500">
                  <p className="text-xl">No posts yet. Check back soon!</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <Sidebar categories={categories} />
              <div className="mt-8">
                <Newsletter />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
