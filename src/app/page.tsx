import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { Product } from '@/entities/Product';
import { Category } from '@/entities/Category';
import BlogCard from '@/components/BlogCard';
import ProductCard from '@/components/ProductCard';
import NewsletterSignup from '@/components/NewsletterSignup';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const ds = await getDataSource();
  const postRepo = ds.getRepository(Post);
  const productRepo = ds.getRepository(Product);
  const categoryRepo = ds.getRepository(Category);

  const latestPosts = await postRepo.find({
    where: { isPublished: true },
    relations: ['category'],
    order: { publishedAt: 'DESC' },
    take: 6,
  });

  const featuredProducts = await productRepo.find({
    where: { isFeatured: true },
    relations: ['category'],
    take: 4,
  });

  const categories = await categoryRepo.find({
    order: { name: 'ASC' },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-warm-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Hayat Blog
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Discover inspiration for life, style, technology, and wellness
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors"
            >
              Read the Blog
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-white border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="px-4 py-2 bg-warm-100 text-warm-700 rounded-full text-sm font-medium hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Latest Posts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-warm-900" style={{ fontFamily: 'Georgia, serif' }}>
                Latest Posts
              </h2>
              <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            {latestPosts.length === 0 && (
              <div className="text-center py-12 text-warm-500">
                <p>No posts yet. Check back soon!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Featured Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-warm-900">Featured Products</h3>
                <Link href="/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="flex items-start gap-3 pb-4 border-b border-warm-100 last:border-0 last:pb-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-warm-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🛍️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-warm-900 text-sm leading-tight mb-1 line-clamp-2">{product.name}</h4>
                      <p className="text-primary-600 font-bold text-sm">${Number(product.price).toFixed(2)}</p>
                      <Link
                        href={`/products/${product.id}`}
                        className="text-xs text-warm-500 hover:text-primary-600"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
              <h3 className="text-xl font-bold text-warm-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-warm-50 text-warm-700 hover:text-primary-600 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-warm-400">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-warm-900" style={{ fontFamily: 'Georgia, serif' }}>
              Shop Our Picks
            </h2>
            <Link href="/products" className="text-primary-600 hover:text-primary-700 font-medium">
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-16">
          <NewsletterSignup />
        </section>
      </div>
    </div>
  );
}
