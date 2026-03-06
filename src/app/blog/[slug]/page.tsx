import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { Product } from '@/entities/Product';
import { formatDate } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const ds = await getDataSource();
  const postRepo = ds.getRepository(Post);
  const productRepo = ds.getRepository(Product);

  const post = await postRepo.findOne({
    where: { slug: params.slug, isPublished: true },
    relations: ['category', 'tags'],
  });

  if (!post) {
    notFound();
  }

  // Get related products from same category
  let relatedProducts: Product[] = [];
  if (post.categoryId) {
    relatedProducts = await productRepo.find({
      where: { categoryId: post.categoryId },
      take: 3,
    });
  }

  // Get related posts
  const relatedPosts = await postRepo.find({
    where: { isPublished: true, categoryId: post.categoryId || undefined },
    relations: ['category'],
    take: 3,
    order: { publishedAt: 'DESC' },
  });
  const filteredRelated = relatedPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <article className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-warm-500 mb-6">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary-600">Blog</Link>
            {post.category && (
              <>
                <span>/</span>
                <Link href={`/categories/${post.category.slug}`} className="hover:text-primary-600">
                  {post.category.name}
                </Link>
              </>
            )}
          </nav>

          {/* Post Header */}
          <header className="mb-8">
            {post.category && (
              <Link
                href={`/categories/${post.category.slug}`}
                className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-4 hover:bg-primary-200"
              >
                {post.category.name}
              </Link>
            )}
            <h1 className="text-4xl font-bold text-warm-900 mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-warm-500 text-sm">
              <time dateTime={post.publishedAt?.toString()}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </header>

          {/* Featured Image Placeholder */}
          <div className="w-full h-64 bg-gradient-to-br from-primary-200 to-warm-300 rounded-2xl mb-8 flex items-center justify-center">
            <span className="text-6xl">📖</span>
          </div>

          {/* Post Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-warm-200">
              <h3 className="text-sm font-semibold text-warm-600 uppercase tracking-wide mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-warm-100 text-warm-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Share */}
          <div className="mt-8 pt-6 border-t border-warm-200">
            <h3 className="text-sm font-semibold text-warm-600 uppercase tracking-wide mb-3">Share this post</h3>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Twitter
              </button>
              <button className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900">
                Facebook
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
                WhatsApp
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
              <h3 className="text-lg font-bold text-warm-900 mb-4">Related Products</h3>
              <div className="space-y-4">
                {relatedProducts.map((product) => (
                  <div key={product.id} className="flex items-start gap-3 pb-4 border-b border-warm-100 last:border-0 last:pb-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-warm-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🛍️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-warm-900 text-sm mb-1 line-clamp-2">{product.name}</h4>
                      <p className="text-primary-600 font-bold text-sm">${Number(product.price).toFixed(2)}</p>
                      <Link href={`/products/${product.id}`} className="text-xs text-warm-500 hover:text-primary-600">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {filteredRelated.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
              <h3 className="text-lg font-bold text-warm-900 mb-4">Related Posts</h3>
              <div className="space-y-4">
                {filteredRelated.map((relPost) => (
                  <div key={relPost.id} className="pb-4 border-b border-warm-100 last:border-0 last:pb-0">
                    <Link href={`/blog/${relPost.slug}`}>
                      <h4 className="font-medium text-warm-900 text-sm hover:text-primary-600 leading-tight line-clamp-2">
                        {relPost.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-warm-500 mt-1">{formatDate(relPost.publishedAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
