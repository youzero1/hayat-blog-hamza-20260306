import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CategoryBadge from '@/components/CategoryBadge';
import CommentSection from '@/components/CommentSection';
import PostCard from '@/components/PostCard';
import { PostType } from '@/types';

async function getPost(id: string): Promise<PostType | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryId: number, currentPostId: number): Promise<PostType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?limit=3`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).filter((p: PostType) => p.id !== currentPostId).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category?.id || 0, post.id);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-warm-50">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-72 md:h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warm-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/posts" className="hover:text-primary-600 transition-colors">Posts</Link>
          <span>›</span>
          <span className="text-warm-700 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Post Header */}
        <header className="mb-10">
          {post.category && (
            <div className="mb-4">
              <CategoryBadge category={post.category} />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-warm-900 leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-warm-500 text-sm border-b border-warm-200 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-warm-700">{post.author}</span>
            </div>
            <span>·</span>
            <time dateTime={post.createdAt}>{formattedDate}</time>
            {post.comments && (
              <>
                <span>·</span>
                <span>{post.comments.length} comments</span>
              </>
            )}
          </div>
        </header>

        {/* Post Content */}
        <article
          className="prose prose-lg max-w-none text-warm-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            lineHeight: '1.8',
          }}
        />

        {/* Tags / Share */}
        <div className="mt-10 pt-8 border-t border-warm-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {post.category && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-warm-500">Category:</span>
                <CategoryBadge category={post.category} />
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-sm text-warm-500">Share:</span>
              <button className="text-warm-400 hover:text-primary-600 transition-colors text-sm font-medium">
                Twitter
              </button>
              <button className="text-warm-400 hover:text-primary-600 transition-colors text-sm font-medium">
                Facebook
              </button>
              <button className="text-warm-400 hover:text-primary-600 transition-colors text-sm font-medium">
                LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <CommentSection postId={post.id} initialComments={post.comments || []} />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-warm-100 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-warm-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
