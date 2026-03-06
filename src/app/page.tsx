import Link from 'next/link';
import Image from 'next/image';
import { PostType, CategoryType } from '@/types';

async function getFeaturedPost(): Promise<PostType | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?limit=1&published=true`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.[0] || null;
  } catch {
    return null;
  }
}

async function getLatestPosts(): Promise<PostType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?limit=6&published=true&page=1`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function getCategories(): Promise<CategoryType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700',
  lifestyle: 'bg-purple-100 text-purple-700',
  travel: 'bg-green-100 text-green-700',
  food: 'bg-orange-100 text-orange-700',
  health: 'bg-red-100 text-red-700',
  business: 'bg-yellow-100 text-yellow-700',
};

const categoryIcons: Record<string, string> = {
  technology: '💻',
  lifestyle: '✨',
  travel: '✈️',
  food: '🍽️',
  health: '💚',
  business: '📈',
};

export default async function HomePage() {
  const [featuredPost, latestPosts, categories] = await Promise.all([
    getFeaturedPost(),
    getLatestPosts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hayat-800 via-hayat-700 to-earth-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-hayat-400 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Welcome to Hayat Blog
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Life is a Story.
                <br />
                <span className="text-hayat-300">Tell it Well.</span>
              </h1>
              <p className="text-lg text-hayat-100 mb-8 leading-relaxed">
                Hayat — meaning &ldquo;Life&rdquo; — is your destination for inspiring stories about
                technology, travel, food, health, and the beautiful complexity of modern living.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="bg-white text-hayat-700 font-semibold px-6 py-3 rounded-lg hover:bg-hayat-50 transition-colors"
                >
                  Explore Articles
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-hayat-700 transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
            {featuredPost && (
              <div className="hidden lg:block">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={featuredPost.thumbnailUrl || 'https://picsum.photos/seed/hero/600/400'}
                      alt={featuredPost.title}
                      width={600}
                      height={400}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-hayat-300 text-sm font-medium">
                        {featuredPost.category?.name || 'Article'}
                      </span>
                      <h3 className="text-white font-bold text-xl mt-1 line-clamp-2">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        {featuredPost.readTime} min read · {featuredPost.views.toLocaleString()} views
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-white border-b border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm font-medium text-earth-500 whitespace-nowrap">Browse:</span>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-1.5 bg-hayat-50 hover:bg-hayat-100 text-hayat-700 text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors"
              >
                <span>{categoryIcons[cat.slug] || '📝'}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-earth-900">Latest Stories</h2>
            <p className="text-earth-500 mt-1">Fresh perspectives from our community</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-hayat-600 font-semibold hover:text-hayat-700 transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {latestPosts.length === 0 ? (
          <div className="text-center py-12 text-earth-500">
            <p className="text-xl">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, index) => (
              <PostCard key={post.id} post={post} featured={index === 0} />
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/blog"
            className="inline-block bg-hayat-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-hayat-700 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-earth-900">Explore Topics</h2>
            <p className="text-earth-500 mt-2">Find stories that resonate with you</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-2">{categoryIcons[cat.slug] || '📝'}</div>
                <h3 className="font-semibold text-earth-800 group-hover:text-hayat-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-earth-400 text-xs mt-1 line-clamp-2">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-hayat-700 text-white py-16">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-hayat-200 mb-8">
            Join thousands of readers who get the best stories delivered to their inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-earth-900 focus:outline-none focus:ring-2 focus:ring-hayat-300"
            />
            <button className="bg-hayat-400 hover:bg-hayat-300 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-hayat-300 text-xs mt-3">No spam, unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}

function PostCard({ post, featured = false }: { post: PostType; featured?: boolean }) {
  const categorySlug = post.category?.slug || '';
  const colorClass = categoryColors[categorySlug] || 'bg-gray-100 text-gray-700';

  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className={`bg-white rounded-xl overflow-hidden shadow-sm blog-card-hover cursor-pointer h-full flex flex-col ${
          featured ? 'sm:col-span-2 lg:col-span-1' : ''
        }`}
      >
        <div className="relative overflow-hidden">
          <Image
            src={post.thumbnailUrl || 'https://picsum.photos/seed/default/400/250'}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          {post.category && (
            <span
              className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}
            >
              {post.category.name}
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-earth-900 text-lg leading-snug mb-2 line-clamp-2 hover:text-hayat-600 transition-colors">
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
            <div className="flex items-center gap-3">
              <span>{post.readTime} min</span>
              <span>·</span>
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
