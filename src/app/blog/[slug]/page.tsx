import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import ProductCard from '@/components/ProductCard';

async function getPost(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryId: number, currentSlug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?category_id=${categoryId}&limit=3`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.posts || []).filter((p: any) => p.slug !== currentSlug).slice(0, 2);
  } catch {
    return [];
  }
}

async function getFeaturedProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products?limit=3`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const [relatedPosts, products] = await Promise.all([
    post.categoryId ? getRelatedPosts(post.categoryId, post.slug) : [],
    getFeaturedProducts(),
  ]);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="py-8 px-4">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-forest-600">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-forest-600">Blog</Link>
              <span>/</span>
              <span className="text-gray-700 truncate">{post.title}</span>
            </nav>

            {/* Category Badge */}
            {post.category && (
              <Link href={`/categories/${post.category.slug}`}>
                <span className="badge-forest mb-4">{post.category.name}</span>
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-forest-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 font-bold text-sm">
                  {post.author?.[0]?.toUpperCase() || 'A'}
                </div>
                <span className="font-medium text-gray-700">{post.author}</span>
              </div>
              <span>·</span>
              <time dateTime={post.createdAt}>{formattedDate}</time>
              {post.isFeatured && (
                <>
                  <span>·</span>
                  <span className="badge-gold">⭐ Featured</span>
                </>
              )}
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div
              className="blog-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                {post.category && (
                  <Link href={`/categories/${post.category.slug}`} className="badge-forest">
                    {post.category.name}
                  </Link>
                )}
                <Link href="/blog" className="badge bg-gray-100 text-gray-600">
                  All Posts
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-xl text-forest-800 mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.map((related: any) => (
                    <Link key={related.id} href={`/blog/${related.slug}`} className="block group">
                      <div className="flex gap-3">
                        {related.coverImage && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={related.coverImage} alt={related.title} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 group-hover:text-forest-600 transition-colors line-clamp-2 text-sm">
                            {related.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{related.author}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Products */}
            {products.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-xl text-forest-800 mb-4">🛍️ Recommended Products</h3>
                <div className="space-y-4">
                  {products.map((product: any) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="block group">
                      <div className="flex gap-3">
                        {product.imageUrl && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 group-hover:text-forest-600 transition-colors text-sm line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-forest-600 font-bold text-sm">${Number(product.price).toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/products" className="block text-center mt-4 text-sm text-forest-600 hover:text-forest-700 font-medium">
                  View All Products →
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
