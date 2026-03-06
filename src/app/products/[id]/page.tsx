import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description?.substring(0, 160),
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <div className="py-12 px-4">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-forest-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-forest-600">Products</Link>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative h-80 md:h-full min-h-[400px] bg-gray-50">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-6xl">
                  🛍️
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {product.category && (
                <Link href={`/categories/${product.category.slug}`}>
                  <span className="badge-forest mb-4">{product.category.name}</span>
                </Link>
              )}

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-900 mb-4">
                {product.name}
              </h1>

              <div className="text-4xl font-bold text-forest-600 mb-6">
                ${Number(product.price).toFixed(2)}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="space-y-4">
                {product.affiliateLink && (
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-full bg-gold-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-gold-600 transition-colors duration-200 flex items-center justify-center gap-2 text-center"
                  >
                    🛒 Buy Now — ${Number(product.price).toFixed(2)}
                  </a>
                )}
                <Link
                  href="/products"
                  className="w-full block text-center border-2 border-forest-600 text-forest-600 py-3 px-8 rounded-xl font-semibold hover:bg-forest-600 hover:text-white transition-colors duration-200"
                >
                  ← Back to Products
                </Link>
              </div>

              <p className="text-xs text-gray-400 mt-6">
                * This is an affiliate link. We may earn a commission if you purchase through this link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
