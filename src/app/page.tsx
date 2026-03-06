import { Metadata } from 'next';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Hayat Blog — Live Better Every Day',
  description: 'Your guide to lifestyle, health, travel, food, and technology. Discover curated articles and top product recommendations.',
};

async function getFeaturedPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?featured=true&limit=3`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

async function getLatestPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?limit=6`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

async function getFeaturedProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products?limit=4`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
    });
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

export default async function HomePage() {
  const [featuredPosts, latestPosts, products, categories] = await Promise.all([
    getFeaturedPosts(),
    getLatestPosts(),
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest-800 via-forest-700 to-forest-600 text-white py-24 px-4">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="container-custom relative z-10 text-center">
          <span className="badge bg-gold-500 text-white mb-4 text-sm px-4 py-1.5">
            Welcome to Hayat Blog
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Live Better,
            <br />
            <span className="text-gold-400">Every Day</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your guide to a fuller, healthier, and more intentional life. Explore stories, tips, and curated products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="bg-white text-forest-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cream-100 transition-colors duration-200">
              Read the Blog
            </Link>
            <Link href="/products" className="bg-gold-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-600 transition-colors duration-200">
              Shop Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-cream-50 hover:bg-forest-50 border border-cream-200 hover:border-forest-300 rounded-full text-sm font-medium text-gray-700 hover:text-forest-700 transition-all duration-200"
              >
                <span>{categoryIcons[cat.slug] || '📌'}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Featured Stories</h2>
              <p className="section-subtitle">Our editors' top picks just for you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post: any) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Showcase */}
      {products.length > 0 && (
        <section className="py-16 px-4 bg-cream-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Curated Products</h2>
              <p className="section-subtitle">Carefully selected products we love and recommend</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/products" className="btn-outline">
                View All Products →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="section-title mb-1">Latest Posts</h2>
                <p className="text-gray-500">Fresh content published regularly</p>
              </div>
              <Link href="/blog" className="btn-primary hidden sm:inline-block">
                View All Posts
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/blog" className="btn-primary">
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter / CTA Banner */}
      <section className="py-16 px-4 bg-forest-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join the Hayat Community
          </h2>
          <p className="text-forest-200 text-lg mb-8 max-w-xl mx-auto">
            Have a question, story, or just want to say hello? We'd love to hear from you.
          </p>
          <Link href="/contact" className="bg-gold-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-600 transition-colors duration-200 inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
