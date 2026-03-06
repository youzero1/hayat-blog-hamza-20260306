import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';
import { Post } from '@/entities/Post';
import { formatPrice } from '@/lib/utils';
import BlogCard from '@/components/BlogCard';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const ds = await getDataSource();
  const productRepo = ds.getRepository(Product);
  const postRepo = ds.getRepository(Post);

  const product = await productRepo.findOne({
    where: { id: parseInt(params.id) },
    relations: ['category'],
  });

  if (!product) {
    notFound();
  }

  // Related blog posts from same category
  let relatedPosts: Post[] = [];
  if (product.categoryId) {
    relatedPosts = await postRepo.find({
      where: { isPublished: true, categoryId: product.categoryId },
      relations: ['category'],
      take: 3,
      order: { publishedAt: 'DESC' },
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-warm-500 mb-8">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary-600">Products</Link>
        <span>/</span>
        <span className="text-warm-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-warm-200 rounded-2xl flex items-center justify-center">
          <span className="text-8xl">🛍️</span>
        </div>

        {/* Product Info */}
        <div>
          {product.category && (
            <Link
              href={`/categories/${product.category.slug}`}
              className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-4 hover:bg-primary-200"
            >
              {product.category.name}
            </Link>
          )}
          {product.isFeatured && (
            <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-medium px-3 py-1 rounded-full mb-4 ml-2">
              ⭐ Featured
            </span>
          )}
          <h1 className="text-3xl font-bold text-warm-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {product.name}
          </h1>
          <div className="text-3xl font-bold text-primary-600 mb-6">
            {formatPrice(product.price)}
          </div>
          <p className="text-warm-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {product.affiliateLink && (
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold text-center hover:bg-primary-700 transition-colors"
              >
                Buy Now →
              </a>
            )}
            <Link
              href="/products"
              className="border-2 border-warm-300 text-warm-700 px-8 py-3 rounded-full font-semibold text-center hover:border-primary-400 hover:text-primary-600 transition-colors"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-warm-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
