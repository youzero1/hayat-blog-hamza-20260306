import { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Discover our curated selection of top-quality products recommended by the Hayat Blog team.',
};

async function getProducts(category: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const params = new URLSearchParams({ ...(category && { category }) });
    const res = await fetch(`${baseUrl}/api/products?${params}`, { cache: 'no-store' });
    if (!res.ok) return { products: [] };
    return res.json();
  } catch {
    return { products: [] };
  }
}

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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category || '';

  const [{ products }, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ]);

  return (
    <div className="py-12 px-4">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest-800 mb-4">
            Our Products
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            Carefully curated products we use and recommend for a better life.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <CategoryFilter categories={categories} selected={category} paramName="category" />
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-2xl font-serif font-bold text-forest-700 mb-2">No products found</h3>
            <p className="text-gray-500">Check back soon for new recommendations.</p>
          </div>
        )}

        {/* Affiliate Disclaimer */}
        <div className="mt-16 p-6 bg-cream-100 border border-cream-300 rounded-xl text-sm text-gray-600">
          <p className="font-semibold text-gray-700 mb-1">📋 Affiliate Disclosure</p>
          <p>Some links on this page are affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you. This helps us continue creating great content. We only recommend products we genuinely believe in.</p>
        </div>
      </div>
    </div>
  );
}
