import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import ProductCard from '@/components/ProductCard';

async function getCategory(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getCategory(params.slug);
  if (!data) return { title: 'Category Not Found' };
  return {
    title: data.category.name,
    description: data.category.description,
  };
}

const categoryIcons: Record<string, string> = {
  lifestyle: '🌿',
  'health-wellness': '💚',
  technology: '💻',
  travel: '✈️',
  'food-recipes': '🍽️',
};

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const data = await getCategory(params.slug);
  if (!data) notFound();

  const { category, posts, products } = data;

  return (
    <div className="py-12 px-4">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-forest-600">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-forest-600">Categories</Link>
          <span>/</span>
          <span className="text-gray-700">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">{categoryIcons[category.slug] || '📌'}</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest-800 mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <div className="flex gap-4 justify-center mt-4">
            <span className="badge-forest">{posts.length} Posts</span>
            <span className="badge-gold">{products.length} Products</span>
          </div>
        </div>

        {/* Posts Section */}
        {posts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
              Posts in {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Products Section */}
        {products.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
              Products in {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && products.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-serif font-bold text-forest-700 mb-2">Nothing here yet</h3>
            <p className="text-gray-500">Check back soon for new content in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
