import Link from 'next/link';
import Image from 'next/image';
import { PostType } from '@/types';
import CategoryBadge from './CategoryBadge';

interface PostCardProps {
  post: PostType;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <Link href={`/posts/${post.id}`}>
        <div className="relative h-48 bg-warm-100 overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-warm-200 to-warm-300">
              <span className="text-4xl opacity-50">📄</span>
            </div>
          )}
          {post.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        {post.category && (
          <div className="mb-3">
            <CategoryBadge category={post.category} />
          </div>
        )}

        <Link href={`/posts/${post.id}`}>
          <h2 className="text-lg font-bold text-warm-900 leading-snug mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="text-warm-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-warm-600">{post.author}</span>
          </div>
          <time className="text-xs text-warm-400" dateTime={post.createdAt}>
            {formattedDate}
          </time>
        </div>
      </div>
    </article>
  );
}
