import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostType } from '@/types';

async function getPost(slug: string): Promise<PostType | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?slug=${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.[0] || null;
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryId: number, currentId: number): Promise<PostType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/posts?categoryId=${categoryId}&limit=3&published=true`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).filter((p: PostType) => p.id !== currentId).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.thumbnailUrl }],
    },
  };
}

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700',
  lifestyle: 'bg-purple-100 text-purple-700',
  travel: 'bg-green-100 text-green-700',
  food: 'bg-orange-100 text-orange-700',
  health: 'bg-red-100 text-red-700',
  business: 'bg-yellow-100 text-yellow-700',
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  const relatedPosts = post.categoryId
    ? await getRelatedPosts(post.categoryId, post.id)
    : [];

  const categorySlug = post.category?.slug || '';
  const colorClass = categoryColors[categorySlug] || 'bg-gray-100 text-gray-700';

  return (
    <div className="min-h-screen bg-hayat-50">
      {/* Hero Image */}
      <div className="relative h-72 lg:h-96 w-full overflow-hidden">
        <Image
          src={post.thumbnailUrl || 'https://picsum.photos/seed/default/1200/600'}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-8">
            {post.category && (
              <Link href={`/categories/${post.category.slug}`}>
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${colorClass}`}>
                  {post.category.name}
                </span>
              </Link>
            )}
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-earth-200">
          <div className="flex items-center gap-3">
            <Image
              src={post.author?.avatarUrl || 'https://picsum.photos/seed/avatar/48/48'}
              alt={post.author?.name || 'Author'}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-earth-800">{post.author?.name}</p>
              <p className="text-earth-400 text-xs">{post.author?.bio?.substring(0, 60)}...</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-earth-500 ml-auto">
            <span>📅 {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>⏱️ {post.readTime} min read</span>
            <span>👁️ {post.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Content */}
        <article
          className="prose-content max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags / Share */}
        <div className="mt-10 pt-6 border-t border-earth-200">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-earth-500 text-sm font-medium">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || '') + '/blog/' + post.slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-sky-600 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || '') + '/blog/' + post.slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Author Bio */}
        {post.author && (
          <div className="mt-8 bg-earth-50 rounded-xl p-6 flex gap-4">
            <Image
              src={post.author.avatarUrl || 'https://picsum.photos/seed/avatar/80/80'}
              alt={post.author.name}
              width={80}
              height={80}
              className="rounded-full flex-shrink-0"
            />
            <div>
              <h3 className="font-bold text-earth-800 text-lg">{post.author.name}</h3>
              <p className="text-earth-400 text-xs mb-2">{post.author.email}</p>
              <p className="text-earth-600 text-sm leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-earth-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm blog-card-hover">
                    <Image
                      src={rp.thumbnailUrl || 'https://picsum.photos/seed/default/300/200'}
                      alt={rp.title}
                      width={300}
                      height={200}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold text-earth-800 text-sm line-clamp-2">{rp.title}</h4>
                      <p className="text-earth-400 text-xs mt-1">{rp.readTime} min read</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-hayat-600 hover:text-hayat-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}
