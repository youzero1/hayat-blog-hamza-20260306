import Link from 'next/link';
import { Post } from '@/entities/Post';
import { formatDate, generateExcerpt } from '@/lib/utils';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const excerpt = post.excerpt || generateExcerpt(post.content, 120);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-warm-200 flex items-center justify-center">
        <span className="text-4xl">📖</span>
      </div>

      <div className="p-5">
        {/* Category */}
        {post.category && (
          <Link
            href={`/categories/${post.category.slug}`}
            className="inline-block text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2 hover:text-primary-700"
          >
            {post.category.name}
          </Link>
        )}

        {/* Title */}
        <h3 className="font-bold text-warm-900 text-lg mb-2 leading-tight line-clamp-2 group-hover:text-primary-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-warm-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <time className="text-xs text-warm-400">
            {formatDate(post.publishedAt || post.createdAt)}
          </time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
